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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
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
      const output = await requestToReplicateEndPoint(prompt, 50);

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