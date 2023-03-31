import { FastingRequestType } from '@/lib/types';

const generatePlan = async (params: FastingRequestType) => {
  const body: FastingRequestType = {
    height: params.height,
    weight: params.weight,
    targetWeight: params.targetWeight,
    periodToLoseWeight: params.periodToLoseWeight,
    fastingType: params.fastingType,
    ingredients: params.ingredients,
  };

  try {
    const jsonBody = JSON.stringify(body);

    const response = await fetch('/api/generate', {
      method: 'POST',
      body: jsonBody,
    });

    return response.json();
  } catch (error) {
    const { message: errorMessage } = error as { message: string };
    alert(errorMessage);
  }
};

export default generatePlan;
