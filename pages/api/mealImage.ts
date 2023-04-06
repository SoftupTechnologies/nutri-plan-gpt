import {
  NextApiRequest,
  NextApiResponse,
} from 'next';
import Replicate from 'replicate';
import { ImageRequestType } from '@/lib/types';
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
      const isImageDataValid = imageDataValidationSchema.safeParse(userDataObject);

      if (!isImageDataValid.success) {
        const errorMessage = isImageDataValid.error.issues[0].message;
        res.status(400).json({
          error: {
            message: errorMessage,
          }
        });
        return;
      }
      
      const prompt = prepareImagePromptForRequest(userDataObject.prompt);

      const startTime = process.hrtime()

      const output = await requestToReplicateEndPoint(prompt, 50);

      const endTime = process.hrtime(startTime)
      const durationInSecs = endTime[0] + endTime[1] / 1000000000

      await prisma.replicateMealImageResponseAnalytics.create({
        data: {
          answer: output.imageUrl,
          timeToRespond: durationInSecs,
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
        message: 'Method not supported',
      }
    });
  }
}
