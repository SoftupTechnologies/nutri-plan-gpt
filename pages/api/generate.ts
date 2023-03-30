import {
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { Configuration, OpenAIApi } from 'openai';

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
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  // const prompt: string = req.body.prompt;
  const prompt = `
      My weight is 70kg. My height is 175cm. My goal is to lose 3 kilograms in the next 5 months. I want to use intermittent fasting, using 16:8 plan with a fasting window of 10pm-6pm.
      Plan a meal plan that includes only the following ingredients: chicken, potatoes, ketchup, spinach, cheese
      Rules:
      Reply only with a csv (semicolon separator) containing the following columns: Weekday, Time (HH:mm) (Respect fasting window of 16:8), Meal Name, Ingredients, Preparation
      Respect fasting window for the meal time. i.e. if 16:8, you cannot eat outside of the 6-hour window.
      One weekday has multiple meals.
      Do not skip any fields from CSV.
  `

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
    console.log('answer', answer);
    
    res.status(200).json({answer: answer.data.choices[0].message?.content});
  } catch (error: any){
    console.log(error.response.status, error.response.data);
    
    res.status(500).json("Failed to generate the required test");
  }
}
