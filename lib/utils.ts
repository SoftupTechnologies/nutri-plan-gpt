import {
  FastingDataType,
  FastingRequestType,
  WeekdayMeals,
} from './types';

const dummyData:FastingDataType[]=[
  {
    weekday: 'Monday',
    time: '13:00',
    mealName: 'Avocado and Egg Salad',
    ingredients: '1/2 Avocado, 2 Eggs, 2 slices Bacon',
    preparation: 'Boil the eggs and chop them, cook the bacon, and cut the avocado into chunks. Mix all the ingredients together for a tasty salad.'
  },
  {
    weekday: 'Monday',
    time: '19:00',
    mealName: 'Tomato and Egg Scramble',
    ingredients: '2 Eggs, 1 diced tomato',
    preparation: 'Scramble the eggs and mix in the diced tomato for a delicious and healthy dinner.'
  },
  {
    weekday: 'Tuesday',
    time: '10:00',
    mealName: 'Yogurt and Granola Bowl',
    ingredients: '1 cup Yogurt, 1/2 cup Granola',
    preparation: 'Mix the Yogurt and Granola together in a bowl for a light and satisfying breakfast.'
  },
  {
    weekday: 'Tuesday',
    time: '16:00',
    mealName: 'Bacon and Tomato Salad',
    ingredients: '2 slices Bacon, 1 Tomato',
    preparation: 'Cook the bacon and cut it into small pieces, then chop the tomato. Mix them together for a quick and easy salad.'
  },
  {
    weekday: 'Tuesday',
    time: '19:30',
    mealName: 'Avocado and Egg Wrap',
    ingredients: '1/2 Avocado, 1 Egg, 1 slice Bacon, 1 Tortilla',
    preparation: 'Cook the egg and bacon, then chop into small pieces. Slice the avocado and add it to the tortilla with the egg and bacon pieces. Roll up to create a delicious and filling wrap.'
  },
  {
    weekday: 'Wednesday',
    time: '12:00',
    mealName: 'Yogurt Parfait',
    ingredients: '1 cup Yogurt, 1/2 cup Granola, 1 chopped Tomato',
    preparation: 'Layer the Yogurt, Granola, and chopped Tomato in a glass for a beautiful and tasty parfait.'
  },
  {
    weekday: 'Wednesday',
    time: '18:00',
    mealName: 'Bacon and Egg Salad',
    ingredients: '2 Eggs, 2 slices Bacon',
    preparation: 'Boil the eggs and chop them, cook the bacon, and mix all ingredients together for a satisfying and protein-packed salad.'
  },
  {
    weekday: 'Thursday',
    time: '11:00',
    mealName: 'Avocado and Egg Toast',
    ingredients: '1/2 Avocado, 2 Eggs, 1 slice Bread',
    preparation: 'Toast the bread, smash the avocado on top of it. Cook the eggs as desired and place them over the avocado toast.'
  },
  {
    weekday: 'Thursday',
    time: '17:00',
    mealName: 'Tomato and Bacon Omelette',
    ingredients: '2 Eggs, 1 diced Tomato, 2 slices Bacon',
    preparation: 'Cook the bacon, then remove it and add the diced tomato. Pour in the whisked eggs and cook until set, then add the cooked bacon and fold the omelette.'
  },
  {
    weekday: 'Thursday',
    time: '19:30',
    mealName: 'Yogurt and Berry Smoothie',
    ingredients: '1 cup Yogurt, 1 cup mixed Berries, 1 cup Milk',
    preparation: 'Blend all ingredients together in a blender for a delicious and refreshing smoothie.'
  },
  {
    weekday: 'Friday',
    time: '9:00',
    mealName: 'Bacon and Egg Muffins',
    ingredients: '2 Eggs, 2 slices Bacon, 1 diced Tomato',
    preparation: 'Cook the bacon and chop it into small pieces. Mix it with the diced tomato and divide the mixture into muffin cups. Pour in whisked eggs and bake in the oven for 20 minutes.'
  },
  {
    weekday: 'Friday',
    time: '15:00',
    mealName: 'Tomato and Yogurt Dip',
    ingredients: '3 Tomatoes, 1 cup Yogurt',
    preparation: 'Remove the seeds from the tomatoes and chop them up, then mix them with the yogurt for a healthy dip. Serve with raw veggies or crackers.'
  },
  {
    weekday: 'Friday',
    time: '18:00',
    mealName: 'Avocado and Bacon Salad',
    ingredients: '1/2 Avocado, 2 slices Bacon',
    preparation: 'Cook the bacon and chop it into small pieces, then chop the avocado and mix them together for a tasty and satisfying salad.'
  }
]

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
    Reply only with a csv (semicolon separator) containing the following columns: weekday, time (the time format should be HH:mm and respect fasting window of ${prompt.fastingType}), mealName, ingredients, preparation
    Respect fasting window for the meal time. i.e. if ${prompt.fastingType}, you cannot eat outside of the 6-hour window.
    One weekday has multiple meals.
    Do not skip any fields from CSV.
  `

  return promptTemplate;
};

export const getMealNames = (fastingData: FastingDataType[]) => {
  const mealNames = fastingData.map((fastingItem) => fastingItem.mealName);

  return mealNames;
}


export const organizeDataByDays=()=>{

  const mealsByWeekday: WeekdayMeals={};

  dummyData.forEach((meal) => {
    if (!mealsByWeekday[meal.weekday]) {
      mealsByWeekday[meal.weekday] = [];
    }
    mealsByWeekday[meal.weekday].push(meal);
  });

const mealsAsArray=Object.entries(mealsByWeekday)  

return mealsAsArray;



}
