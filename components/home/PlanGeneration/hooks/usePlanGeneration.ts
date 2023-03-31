import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  FastingDataType,
  FastingRequestType,
} from '@/lib/types';

import generatePlan from '../helpers/generatePlan';
import getIngredientsImage from '../helpers/getIngredientsImage';

const usePlanGeneration = (params: FastingRequestType) => {
  const [ingredientsImageUrl, setIngredientsImageUrl] = useState<string>('');
  const [isGeneratingImage, setIsGeneratingImage] = useState<boolean>(false);
  const [fastingPlan, setFastingPlan] = useState<FastingDataType[]>();
  const [isGeneratingPlan, setIsGeneratingPlan] = useState<boolean>(false);

  const setLoadingImage = (imageUrl: string) => {
    setIsGeneratingImage(false);
    setIngredientsImageUrl(imageUrl);
  };

  const setPlan = (planData: FastingDataType[]) => {
    setIsGeneratingPlan(false);
    setFastingPlan(planData);
  };

  const sendRequest = useCallback(() => {
    if (params.ingredients) {
      setIsGeneratingImage(true);
      getIngredientsImage(
        { prompt: params.ingredients },
        (responseData) => setLoadingImage(responseData.imageUrl),
      );
    }
  }, [params.ingredients]);

  useEffect(() => {
    if (!fastingPlan && ingredientsImageUrl) {
      setIsGeneratingPlan(true);
      generatePlan(
        params,
        (responseData) => setPlan(responseData),
      );
    }
  }, [fastingPlan, ingredientsImageUrl, params]);

  return {
    isGeneratingImage,
    isGeneratingPlan,
    sendRequest,
    ingredientsImageUrl,
    fastingPlan,
  };
};

export default usePlanGeneration;
