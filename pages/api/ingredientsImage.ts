import {
  NextApiRequest,
  NextApiResponse,
} from 'next';
import Replicate from 'replicate';
import requestIp from 'request-ip';
import {
  ImageRequestType,
  ZodValidationResponseType,
} from '@/lib/types';
import { prepareImagePromptForRequest } from '@/lib/utils';
import { imageDataValidationSchema } from '@/lib/validation';
import rateLimit from '@/lib/rate-limiter';
import { PrismaClient } from '@prisma/client';

export const requestToReplicateEndPoint = async (
  preparedPrompt: string,
  numInferenceSteps: number,
  index?: number,
) => {
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_KEY || "",
  });

  const model =
    "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf";
  const input = {
    prompt: preparedPrompt,
    num_inference_steps: numInferenceSteps,
  };

  const output: any = await replicate.run(model, { input });

  return { imageUrl: output[0], index };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const prisma = new PrismaClient();

    try {
      const userDataObject: ImageRequestType = JSON.parse(req.body);

      // Validate user input
      const isImageDataValid = imageDataValidationSchema.safeParse(
        userDataObject
      ) as ZodValidationResponseType;

      if (!isImageDataValid.success) {
        const errorMessage = isImageDataValid.error.issues[0].message;
        res.status(400).json({
          error: {
            message: errorMessage,
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

      // Generates prompt for Replicate
      const prompt = prepareImagePromptForRequest(userDataObject.prompt, true);
    
      const startTime = process.hrtime()

      const output = await requestToReplicateEndPoint(prompt, 20);

      const endTime = process.hrtime(startTime)
      const durationInSecs = endTime[0] + endTime[1] / 1000000000

      await prisma.aIInteractionLogs.create({
        data: {
          prompt,
          response: output.imageUrl,
          provider: "Replicate",
          responseTime: durationInSecs,
          endpointName: "ingredientsImage",
          endpointResponse: JSON.stringify({ imageUrl: output.imageUrl })
        },
      })

      res.status(201).json({ imageUrl: output.imageUrl });
    } catch (error: any) {
      if (error.response) {
        res.status(error.response.status).json({
          error: {
            message: error.response.data.detail,
          }
        });
      } else {
        res.status(500).json({
          error: {
            message: 'An error occurred during your request.',
          }
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
