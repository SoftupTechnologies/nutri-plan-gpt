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
    My weight is ${prompt.weight}kg. My height is ${prompt.height}cm. My goal is to lose ${prompt.targetWeight} kilograms in the next ${prompt.periodToLoseWeight} months. 
    I want to use intermittent fasting, using ${prompt.fastingType} plan with a fasting window of 10pm-6pm.
    Plan a meal plan that includes only the following ingredients: ${prompt.ingredients}
    Rules:
    Reply only with a csv (semicolon separator) containing the following columns: weekday, time (the time format should be HH:mm and respect fasting window of ${prompt.fastingType}), mealName (the mealName must be the name of the food that will be cooked), ingredients, preparation
    Respect fasting window for the meal time. i.e. if ${prompt.fastingType}, you cannot eat outside of the 6-hour window.
    Ingredients should be separated only with comma.
    One weekday has multiple meals.
    Do not skip any fields from CSV.
    Always reply with CSV headers.
  `

  return promptTemplate;
};


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
