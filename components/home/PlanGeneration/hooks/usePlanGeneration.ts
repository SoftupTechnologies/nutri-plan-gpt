import {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';

import {
  CarouselImage,
  FastingDataType,
  FastingRequestType,
  GeneratePlanResponse,
} from '@/lib/types';

import { HomeContext } from '../../Context/HomeContext';
import generatePlan from '../helpers/generatePlan';
import getIngredientsImage from '../helpers/getIngredientsImage';

interface PlanGenerationPayload {
  isGeneratingImage: boolean;
  isGeneratingPlan: boolean;
  sendRequest: VoidFunction;
  ingredientsImageUrl?: string;
  fastingPlan?: FastingDataType[];
  carouselImages?: CarouselImage[];
  errorMessage?: string;
  clearError: VoidFunction;
}

const usePlanGeneration = (params: FastingRequestType): PlanGenerationPayload => {
  const router = useRouter();

  const [ingredientsImageUrl, setIngredientsImageUrl] = useState<string>('');
  const [isGeneratingImage, setIsGeneratingImage] = useState<boolean>(false);
  const [fastingPlan, setFastingPlan] = useState<FastingDataType[]>();
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>();
  const [isGeneratingPlan, setIsGeneratingPlan] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { setIsContentGenerated } = useContext(HomeContext);

  const clearError = () => {
    setErrorMessage('');
  };

  const errorCallback = useCallback((error: string) => {
    setIsGeneratingImage(false);
    setIsGeneratingPlan(false);
    setErrorMessage(error);
  }, []);

  const setLoadingImage = useCallback((imageUrl: string) => {
    setIsGeneratingImage(false);
    setIngredientsImageUrl(imageUrl);
    router.push('#ingredientsImage');
    setIsContentGenerated(true);
  }, [router, setIsContentGenerated]);

  const setPlanAndImages = useCallback((generatePlanResponse: GeneratePlanResponse) => {
    setIsGeneratingPlan(false);
    setFastingPlan(generatePlanResponse.fastingData);
    router.push('#generatedPlan');
    setCarouselImages(generatePlanResponse.mealImages);
  }, [router]);

  const sendRequest = useCallback(() => {
    if (params.ingredients) {
      setIsGeneratingImage(true);
      getIngredientsImage(
        { prompt: params.ingredients },
        (responseData) => setLoadingImage(responseData.imageUrl),
        errorCallback,
      );

      setIsGeneratingPlan(true);
      generatePlan(
        params,
        setPlanAndImages,
        errorCallback,
      );
    }
  }, [errorCallback, params, setLoadingImage, setPlanAndImages]);

  useEffect(() => {
    return () => {
      setIngredientsImageUrl('');
      setFastingPlan(undefined);
      setCarouselImages(undefined);
      setErrorMessage('');
    };
  }, []);

  return {
    isGeneratingImage,
    isGeneratingPlan,
    sendRequest,
    ingredientsImageUrl,
    fastingPlan,
    carouselImages,
    errorMessage,
    clearError,
  };
};

export default usePlanGeneration;
