import Replicate from 'replicate';

import {
  FastingDataType,
  FastingRequestType,
  WeekdayMeals,
} from './types';

export const prepareImagePromptForRequest = (prompt: string, isLoadingImage?: boolean) => {
  const extraWordsForLoadingImage = ['separated ingredients, kitchen table'];
  const extraWordsForTableImage = ['delicious, plate, meal'];
  const extraWords = isLoadingImage ? extraWordsForLoadingImage : extraWordsForTableImage;

  const conjugatePrompt = extraWords.map((word) => prompt.concat(`, ${word}`));

  return conjugatePrompt[0];
};

export const prepareFastingPromptForOpenAI = (prompt: FastingRequestType) => {
  const promptTemplate = `
    My weight is ${prompt.weight}kg. My height is ${prompt.height}cm. My goal is to lose ${prompt.weight - prompt.targetWeight} kilograms in the next ${prompt.periodToLoseWeight} months. 
    I want to use intermittent fasting, using fasting type ${prompt.fastingType}.
    Plan a meal plan that includes only the following ingredients: ${prompt.ingredients}\n
    Rules:
    - Reply only with a csv (semicolon separator) containing the following columns: weekday, time (the time format should be HH:mm), mealName (the mealName must be the name of the food that will be cooked, do not confuse mealName with meal), ingredients, preparation
    - Ingredients should be separated only with comma.
    - One weekday has multiple meals.
    - Do not skip any fields from CSV.
    - Always reply with CSV headers (weekday, time, mealName, ingredients, preparation)
    - Include all days of the week in your plan (Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday).
    - If fasting type is 18:6, meal hours should be within 12:00 to 18:00.
    - If fasting type is 16:8, meal hours should be within 10:00 to 18:00.\n\n
    
    IMPORTANT: REPLY ONLY WITH CSV, NO WORDING.
  `

  return promptTemplate;
};

export const requestToReplicateEndPoint = async (
  preparedPrompt: string,
  numInferenceSteps: number,
  index?: number,
) => {

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_KEY || "",
  });

  const model = "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf";
  const input = {
    prompt: preparedPrompt,
    num_inference_steps: numInferenceSteps,
  };

  const output: any = await replicate.run(model, { input });

  return { imageUrl: output[0], index };
}

const getRandomStrings = (array: string[], randomItems: number) => {
  const randomStrings: string[] = [];
  
  while (randomStrings.length < randomItems) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const randomString = array[randomIndex];
    
    if (!randomStrings.includes(randomString)) {
      randomStrings.push(randomString);
    }
  }
  
  return randomStrings;
}

export const generateFourRandomMealNames = (mealNames: string[]) => {
  const mealNamesSet = new Set(mealNames);
  const uniqueMealNames = Array.from(mealNamesSet);

  const fourRandomMealNames = getRandomStrings(uniqueMealNames, 4);

  return fourRandomMealNames;
}

export const organizeDataByDays = (fastingPlan: FastingDataType[]) => {
  const mealsByWeekday: WeekdayMeals = {};

  (fastingPlan).forEach((meal) => {
    if (!mealsByWeekday[meal.weekday]) {
      mealsByWeekday[meal.weekday] = [];
    }
    mealsByWeekday[meal.weekday].push(meal);
  });

  const mealsAsArray = Object.entries(mealsByWeekday)

  return mealsAsArray;
}
