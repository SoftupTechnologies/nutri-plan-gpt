import { prepareImagePromptForRequest } from '@/lib/utils';
import {
  NextApiRequest,
  NextApiResponse,
} from 'next';
import Replicate from 'replicate';

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse,
) {

  try{
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN || "",
    });

    const prompt: string = req.body.prompt;
    const preparedPrompt = prepareImagePromptForRequest(prompt, true);
    
    const model = "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf";
    const input = {
      prompt:  preparedPrompt,
      num_inference_steps: 20,
    };
    
    const output = await replicate.run(model, { input });
    
    res.status(201).json({ imageUrl: output });
  } catch (error){
    res.status(500).json("Failed to generate the image");
  }

}
