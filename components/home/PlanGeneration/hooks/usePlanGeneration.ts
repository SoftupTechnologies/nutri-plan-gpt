import { useState } from 'react';

import { FastingRequestType } from '@/lib/types';

const usePlanGeneration = (params: FastingRequestType) => {
  const [isGeneratingImage, setIsGeneratingImage] = useState<boolean>(false);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState<boolean>(false);


  return {
    isGeneratingImage,
    isGeneratingPlan,
  };
};

export default usePlanGeneration;
