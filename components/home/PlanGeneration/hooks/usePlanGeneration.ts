import { useCallback, useContext, useState } from 'react';

import {
  CarouselImage,
  FastingDataType,
  FastingRequestType,
  GeneratePlanResponse,
} from '@/lib/types';

import generatePlan from '../helpers/generatePlan';
import getIngredientsImage from '../helpers/getIngredientsImage';
import { useRouter } from 'next/router';
import { HomeContext } from '../../Context/HomeContext';

interface PlanGenerationPayload {
  isGeneratingImage: boolean;
  isGeneratingPlan: boolean;
  sendRequest: VoidFunction;
  ingredientsImageUrl?: string;
  fastingPlan?: FastingDataType[];
  carouselImages?: CarouselImage[];
}

const usePlanGeneration = (params: FastingRequestType): PlanGenerationPayload => {
  const [ingredientsImageUrl, setIngredientsImageUrl] = useState<string>('');
  const [isGeneratingImage, setIsGeneratingImage] = useState<boolean>(false);
  const [fastingPlan, setFastingPlan] = useState<FastingDataType[]>();
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>();
  const [isGeneratingPlan, setIsGeneratingPlan] = useState<boolean>(false);
  const router=useRouter();
  const {setIsContentGenerated}=useContext(HomeContext);

  const setLoadingImage = useCallback((imageUrl: string) => {
    setIsGeneratingImage(false);
    setIngredientsImageUrl(imageUrl);
    router.push('#ingredientsImage');
    setIsContentGenerated(true);
  }, [router,setIsContentGenerated]);

  const setPlanAndImages = useCallback((generatePlanResponse: GeneratePlanResponse) => {
    setIsGeneratingPlan(false);
    setFastingPlan(generatePlanResponse.fastingData);
    router.push('#generatedPlan')
    setCarouselImages(generatePlanResponse.mealImages);
  }, [router]);

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
