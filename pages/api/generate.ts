import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import Papa from "papaparse";
import requestIp from "request-ip";
import { FastingDataType, FastingRequestType } from "@/lib/types";
import { prepareFastingPromptForOpenAI } from "@/lib/utils";
import { fastingDataValidationSchema } from "@/lib/validation";
import rateLimit from "@/lib/rate-limiter";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY || "",
});
const openAi = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    if (!configuration.apiKey) {
      res.status(500).json({
        error: {
          message:
            "OpenAI API key not configured, please make sure you have provided the correct key",
        },
      });
      return;
    }

    // Rate limit (if configured)
    if (rateLimit) {
      const identifier = requestIp.getClientIp(req);
      const result = await rateLimit.limit(identifier!);
      res.setHeader("X-RateLimit-Limit", result.limit);
      res.setHeader("X-RateLimit-Remaining", result.remaining);

      if (!result.success) {
        res
          .status(429)
          .json(
            "Too many uploads in 1 minute. Please try again in a few minutes.",
          );
        return;
      }
    }

    const userData: FastingRequestType = JSON.parse(req.body);
    const isFastingDataValid = fastingDataValidationSchema.safeParse(
      userData,
    ) as { success: boolean; error: Zod.ZodError };

    if (!isFastingDataValid.success) {
      const errorMessage = isFastingDataValid.error.issues[0].message;
      res.status(400).json({
        error: {
          message: errorMessage,
        },
      });
      return;
    }

    const prompt = prepareFastingPromptForOpenAI(userData);

    try {
      const answer = await openAi.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a meal planner",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      const answerInCSVFormat = answer.data.choices[0].message?.content;

      if (answerInCSVFormat) {
        const answerInJSONFormat = Papa.parse(answerInCSVFormat, {
          header: true,
          delimiter: ";",
        });

        const fastingData: FastingDataType[] = JSON.parse(
          JSON.stringify(answerInJSONFormat.data),
        );

        const fastingDataInJSON = JSON.stringify(fastingData);

        res.status(200).json(fastingDataInJSON);
        return;
      }

      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    } catch (error: any) {
      // Consider adjusting the error handling logic for your use case
      if (error.response) {
        res.status(error.response.status).json(error.response.data);
      } else {
        res.status(500).json({
          error: {
            message: "An error occurred during your request.",
          },
        });
      }
    }
  } else {
    res.status(500).json({
      error: {
        message: "Method not supported",
      },
    });
  }
}
