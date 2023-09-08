import {
  NextApiRequest,
  NextApiResponse,
} from 'next';
import Replicate from 'replicate';
import {
  ImageRequestType,
  ZodValidationResponseType,
} from '@/lib/types';
import {
  prepareImagePromptForRequest,
  requestToReplicateEndPoint,
} from '@/lib/utils';
import { imageDataValidationSchema } from '@/lib/validation';
import { PrismaClient } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
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
          }
        });
        return;
      }
      
      // Generates prompt for Replicate
      const prompt = prepareImagePromptForRequest(userDataObject.prompt);

      const startTime = process.hrtime();

      const output = await requestToReplicateEndPoint(prompt, 50);

      const endTime = process.hrtime(startTime)
      const durationInSecs = endTime[0] + endTime[1] / 1000000000

      await prisma.aIInteractionLogs.create({
        data: {
          prompt,
          response: output.imageUrl,
          provider: "Replicate",
          responseTime: durationInSecs,
          endpointName: "mealImage",
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
            error: JSON.stringify(error),
          }
        });
      }   
    }
  } else {
    res.status(500).json({
      error: {
        message: 'Method not supported',
      }
    });
  }
}
