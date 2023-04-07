import { useCallback, useContext, useEffect, useState } from "react";

import {
  CarouselImage,
  FastingDataType,
  FastingRequestType,
  GeneratePlanResponse,
} from "@/lib/types";

import generatePlan from "../helpers/generatePlan";
import getIngredientsImage from "../helpers/getIngredientsImage";
import { GlobalContext } from "context/GlobalContext";

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

const usePlanGeneration = (
  params: FastingRequestType,
): PlanGenerationPayload => {
  const [ingredientsImageUrl, setIngredientsImageUrl] = useState<string>("");
  const [isGeneratingImage, setIsGeneratingImage] = useState<boolean>(false);
  const [fastingPlan, setFastingPlan] = useState<FastingDataType[]>();
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>();
  const [isGeneratingPlan, setIsGeneratingPlan] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { setIsContentGenerated } = useContext(GlobalContext);

  const clearError = () => {
    setErrorMessage("");
  };

  const errorCallback = useCallback(
    (error: string, isFastingPlan?: boolean) => {
      if (isFastingPlan) {
        setIsGeneratingPlan(false);
      } else {
        setIsGeneratingImage(false);
      }

      setErrorMessage(error);
    },
    [],
  );

  const setLoadingImage = useCallback(
    (imageUrl: string) => {
      setIsGeneratingImage(false);
      setIngredientsImageUrl(imageUrl);
      setIsContentGenerated(true);
    },
    [setIsContentGenerated],
  );

  const setPlanAndImages = useCallback(
    (generatePlanResponse: GeneratePlanResponse) => {
      setIsGeneratingPlan(false);
      setFastingPlan(generatePlanResponse.fastingData);
      setCarouselImages(generatePlanResponse.mealImages);
    },
    [],
  );

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
        (error: string) => errorCallback(error, true),
      );
    }
  }, [errorCallback, params, setLoadingImage, setPlanAndImages]);

  useEffect(() => {
    return () => {
      setIngredientsImageUrl("");
      setFastingPlan(undefined);
      setCarouselImages(undefined);
      setErrorMessage("");
    };
  }, []);

  useEffect(
    () => () => {
      setIngredientsImageUrl("");
      setFastingPlan(undefined);
      clearError();
    },
    [],
  );

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
