import { useCallback, useContext, useEffect, useState } from 'react';

import {
  CarouselImage,
  FastingDataType,
  FastingRequestType,
  GeneratePlanResponse,
} from '@/lib/types';

import generatePlan from '../helpers/generatePlan';
import getIngredientsImage from '../helpers/getIngredientsImage';
import { useRouter } from 'next/router';
import { GlobalContext } from 'context/GlobalContext';

interface PlanGenerationPayload {
  isGeneratingImage: boolean;
  isGeneratingPlan: boolean;
  sendRequest: VoidFunction;
  ingredientsImageUrl?: string;
  fastingPlan?: FastingDataType[];
  carouselImages?: CarouselImage[];
}

const usePlanGeneration = (params: FastingRequestType): PlanGenerationPayload => {
  const [ingredientsImageUrl, setIngredientsImageUrl] = useState<string>();
  const [isGeneratingImage, setIsGeneratingImage] = useState<boolean>(false);
  const [fastingPlan, setFastingPlan] = useState<FastingDataType[]>();
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>();
  const [isGeneratingPlan, setIsGeneratingPlan] = useState<boolean>(false);
  const router=useRouter();
  const {setIsContentGenerated}=useContext(GlobalContext);

  const setLoadingImage = useCallback((imageUrl: string) => {
    setIsGeneratingImage(false);
    setIngredientsImageUrl(imageUrl);
    setIsContentGenerated(true);
  }, [setIsContentGenerated]);

  const setPlanAndImages = useCallback((generatePlanResponse: GeneratePlanResponse) => {
    setIsGeneratingPlan(false);
    setFastingPlan(generatePlanResponse.fastingData);
    setCarouselImages(generatePlanResponse.mealImages);
  }, []);

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
  }, [params,setLoadingImage,setPlanAndImages]);

  useEffect(() => () => {
    setIngredientsImageUrl(undefined);
    setFastingPlan(undefined);
  }, []);

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
