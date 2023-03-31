import {
  FastingDataType,
  FastingRequestType,
} from '@/lib/types';
import {
  getMealNames,
  prepareFastingPromptForOpenAI,
} from '@/lib/utils';
import { fastingDataValidationSchema } from '@/lib/validation';
import {
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { Configuration, OpenAIApi } from 'openai';
import Papa from 'papaparse';

import { requestToReplicateEndPoint } from './ingredientsImage';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_TOKEN || "",
})
const openAi = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse,
) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please make sure you have provided the correct key",
      }
    });
    return;
  }

  const userData: FastingRequestType = req.body;

  const isFastingDataValid = fastingDataValidationSchema.safeParse(userData) as { success: boolean; error: Zod.ZodError };
  
  if (!isFastingDataValid.success){
    const errorMessage = isFastingDataValid.error.issues[0].message;
    res.status(400).json({
      error: {
        message: errorMessage,
      }
    });
    return;
  }

  const prompt = prepareFastingPromptForOpenAI(userData);

  try{
    const answer = await openAi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": "You are a meal planner"
        }, 
        {
          "role": "user",
          "content": prompt
        }
      ]
    });
    
    const answerInCSVFormat = answer.data.choices[0].message?.content

    console.log("answerInCSVFormat", answerInCSVFormat);
    

    if(answerInCSVFormat){
      const answerInJSONFormat = Papa.parse(answerInCSVFormat, {header: true});  
      const fastingData: FastingDataType[] = JSON.parse(JSON.stringify(answerInJSONFormat.data));

      const mealNames = getMealNames(fastingData);

      const mealImageRequests = mealNames.map((mealName) => 
        requestToReplicateEndPoint(mealName, 100)
      );

      const mealImages = await Promise.all(mealImageRequests);

      const fastingDataWithMealImages = fastingData.map((fastingItem, index) => {
        const fastingItemWithMealImage = {
          ...fastingItem,
          mealImage: mealImages[index],
        }

        return fastingItemWithMealImage;
      }) 

      const fastingDataInJSON = JSON.stringify(fastingDataWithMealImages);
  
      res.status(200).json(fastingDataInJSON);
      return;
    }

    res.status(500).json({
      error: {
        message: 'An error occurred during your request.',
      }
    });
  } catch (error: any){    
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}
