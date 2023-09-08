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
    - Reply only with a JSON containing the following keys: weekday, time (the time format should be HH:mm), mealName (the mealName must be the name of the food that will be cooked, do not confuse mealName with meal), ingredients, preparation
    - Ingredients should be separated only with comma.
    - One weekday has multiple meals, there can be either 2 or 3 meals.
    - Do not skip any keys in the JSON file.
    - Include all days of the week in your plan (Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday).
    - Include only the ingredients from the following list:  ${prompt.ingredients} .
    ${!!prompt.cuisine && `- The style of cooking of the meals should be prepared according to ${prompt.cuisine} cuisine .`} 
    ${!!prompt.dietType && `- Also the meals should be prepared according to ${prompt.dietType} diet type. Keep in mind the instructions when generating the preparations`} 
    - Meal names should be real meal names, not such as breakfast, dinner and lunch.
    - If fasting type is 18:6, meal hours should be within 12:00 to 18:00.
    - The meal plan must absolutely not contain any of the following ingredients: ${prompt.allergies} because I am allergic to those.\n
    - If fasting type is 16:8, meal hours should be within 10:00 to 18:00.\n\n

    Example response: 
    '[
    {
      "weekday": "Monday",
      "time": "10:00",
      "mealName": "Avocado Toast",
      "ingredients": "Avocado,Bread",
      "preparation": "Toast the bread and top it with sliced avocado."
    },
    {
      "weekday": "Monday",
      "time": "13:00",
      "mealName": "Beef Salad",
      "ingredients": "Beef,Tomato,Salad",
      "preparation": "Grill the beef to desired doneness and slice it. Combine the beef, tomato, and salad to make a refreshing salad."
    },
    {
      "weekday": "Monday",
      "time": "16:00",
      "mealName": "Berry Smoothie",
      "ingredients": "Berries",
      "preparation": "Blend the berries with water or your choice of liquid to make a smoothie."
    },
    {
      "weekday": "Tuesday",
      "time": "10:00",
      "mealName": "Avocado and Tomato Salad",
      "ingredients": "Avocado,Tomato,Salad",
      "preparation": "Slice the avocado and tomato, then toss them with the salad for a healthy and flavorful salad."
    },
    {
      "weekday": "Tuesday",
      "time": "13:00",
      "mealName": "Grilled Beef Wrap",
      "ingredients": "Beef,Bread,Salad",
      "preparation": "Grill the beef and slice it thinly. Place the beef slices, salad, and any additional desired ingredients on a piece of bread, then roll it up into a wrap."
    },
    {
      "weekday": "Tuesday",
      "time": "16:00",
      "mealName": "Berry Parfait",
      "ingredients": "Berries,Salad",
      "preparation": "Layer the berries and salad in a glass or bowl to create a delicious and nutritious parfait."
    },
    ...
  ]'.
  

  If fasting type is '18:6' the response should contain 2 meals per weekday such as specified below:
  '
  [{
    "weekday": "Monday",
    "time": "12:00",
    "mealName": "Avocado Toast",
    "ingredients": "Avocado,Bread",
    "preparation": "Toast the bread and top it with sliced avocado."
  },
  {
    "weekday": "Monday",
    "time": "18:00",
    "mealName": "Beef Salad",
    "ingredients": "Beef,Tomato,Salad",
    "preparation": "Grill the beef to desired doneness and slice it. Combine the beef, tomato, and salad to make a refreshing salad."
  },

  {
    "weekday": "Tuesday",
    "time": "12:00",
    "mealName": "Avocado and Tomato Salad",
    "ingredients": "Avocado,Tomato,Salad",
    "preparation": "Slice the avocado and tomato, then toss them with the salad for a healthy and flavorful salad."
  },
  {
    "weekday": "Tuesday",
    "time": "18:00",
    "mealName": "Grilled Beef Wrap",
    "ingredients": "Beef,Bread,Salad",
    "preparation": "Grill the beef and slice it thinly. Place the beef slices, salad, and any additional desired ingredients on a piece of bread, then roll it up into a wrap."
  }, ...
  ]
  '
  
  Same format must be generated for the other days: Wednesday, Thursday, Friday, Saturday, Sunday.
  Do not skip any days!
  
  IMPORTANT: REPLY ONLY WITH JSON IN THE RIGHT FORMAT AS SPECIFIED IN THE EXAMPLES, NO WORDING.
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
