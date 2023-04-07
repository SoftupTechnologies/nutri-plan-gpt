export type FastingRequestType = {
  height: number;
  weight: number;
  targetWeight: number;
  periodToLoseWeight: number;
  fastingType: '16:8' | '18:6';
  ingredients: string;
}

export type FastingDataType = {
  weekday: string,
  time: string,
  mealName: string,
  ingredients: string,
  preparation: string,
}

export type GeneratePlanResponse = {
  fastingData: FastingDataType[],
  mealImages: CarouselImage[],
};

export type ImageRequestType = {
  prompt: string;
}

export type ImageResponseType = {
  imageUrl: string;
}

export type WeekdayMeals = {
  [key: string]: FastingDataType[];
};

export type CarouselImage = {
  imageUrl:string
};

export type ZodValidationResponseType = { 
  success: boolean; 
  error: Zod.ZodError 
};

export type MealImages = {
  imageUrl:string;
  index?: number;
}

export type FastingTypeMap = {
  fastingType: string,
  prismaFastingType: string
}
