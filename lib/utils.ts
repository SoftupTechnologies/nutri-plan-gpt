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
    I want to use intermittent fasting, using ${prompt.fastingType} plan with a fasting window of 10pm-6pm.
    Plan a meal plan that includes only the following ingredients: ${prompt.ingredients}
    Rules:
    Reply only with a csv (semicolon separator) containing the following columns: weekday, time (the time format should be HH:mm and respect fasting window of ${prompt.fastingType}), mealName (the mealName must be the name of the food that will be cooked), ingredients, preparation
    Respect fasting window for the meal time. i.e. if ${prompt.fastingType}, you cannot eat outside of the 6-hour window.
    Ingredients should be separated only with comma.
    One weekday has multiple meals.
    Do not skip any fields from CSV.
    Always reply with CSV headers.
    It is very important that you respect the provided fasting type.
    Include all days of the week in your plan.
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
