import {
  NextApiRequest,
  NextApiResponse,
} from 'next';
import Replicate from 'replicate';

import { ImageRequestType } from '@/lib/types';
import { prepareImagePromptForRequest } from '@/lib/utils';
import { imageDataValidationSchema } from '@/lib/validation';

export const requestToReplicateEndPoint = async (
  preparedPrompt: string,
  numInferenceSteps: number,
  index?: number,
) => {

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN || "",
  });

  const model = "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf";
  const input = {
    prompt: preparedPrompt,
    num_inference_steps: numInferenceSteps,
  };

  const output: any = await replicate.run(model, { input });

  return { imageUrl: output[0], index };
}

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

      const prompt = prepareImagePromptForRequest(userDataObject.prompt, true);
      const output = await requestToReplicateEndPoint(prompt, 20);

      res.status(201).json({ imageUrl: output.imageUrl });
    } catch (error) {
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  } else {
    res.status(500).json({
      error: {
        message: 'Method not supported',
      }
    });
  }
}
