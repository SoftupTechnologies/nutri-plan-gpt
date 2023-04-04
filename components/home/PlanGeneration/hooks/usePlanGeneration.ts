import { useCallback, useState } from 'react';

import {
  FastingDataType,
  FastingRequestType,
  GeneratePlanResponse,
} from '@/lib/types';

import generatePlan from '../helpers/generatePlan';
import getIngredientsImage from '../helpers/getIngredientsImage';

interface PlanGenerationPayload {
  isGeneratingImage: boolean;
  isGeneratingPlan: boolean;
  sendRequest: VoidFunction;
  ingredientsImageUrl?: string;
  fastingPlan?: FastingDataType[];
  carouselImages?: string[];
}

const usePlanGeneration = (params: FastingRequestType): PlanGenerationPayload => {
  const [ingredientsImageUrl, setIngredientsImageUrl] = useState<string>('');
  const [isGeneratingImage, setIsGeneratingImage] = useState<boolean>(false);
  const [fastingPlan, setFastingPlan] = useState<FastingDataType[]>();
  const [carouselImages, setCarouselImages] = useState<string[]>();
  const [isGeneratingPlan, setIsGeneratingPlan] = useState<boolean>(false);

  const setLoadingImage = (imageUrl: string) => {
    setIsGeneratingImage(false);
    setIngredientsImageUrl(imageUrl);
  };

  const setPlanAndImages = (generatePlanResponse: GeneratePlanResponse) => {
    setIsGeneratingPlan(false);
    setFastingPlan(generatePlanResponse.fastingData);
    setCarouselImages(generatePlanResponse.mealImages);
  };

  const sendRequest = useCallback(() => {
    if (params.ingredients) {
      setIsGeneratingImage(true);
      getIngredientsImage(
        { prompt: params.ingredients },
        (responseData) => setLoadingImage(responseData.imageUrl),
      );

      setIsGeneratingPlan(true);
      generatePlan(
        params,
        (responseData) => setPlanAndImages(responseData),
      );
    }
  }, [params]);

  return {
    isGeneratingImage,
    isGeneratingPlan,
    sendRequest,
    ingredientsImageUrl,
    fastingPlan,
    carouselImages,
  };
};

export default usePlanGeneration;
