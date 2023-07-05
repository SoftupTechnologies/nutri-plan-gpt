import {
  ErrorResponse,
  FastingRequestType,
  GeneratePlanResponse,
} from '@/lib/types';

const generatePlan = async (
  params: FastingRequestType,
  successCallBack: (responseData: GeneratePlanResponse) => void,
  errorCallback: (error: string) => void,
): Promise<void> => {
  const body: FastingRequestType = {
    height: params.height,
    weight: params.weight,
    targetWeight: params.targetWeight,
    periodToLoseWeight: params.periodToLoseWeight,
    fastingType: params.fastingType,
    ingredients: params.ingredients,
    allergies : params.allergies,
    dietType : params.dietType,
    cuisine : params.dietType,
  };

  try {
    const jsonBody = JSON.stringify(body);

    const response = await fetch('/api/generate', {
      method: 'POST',
      body: jsonBody,
    });

    const responseData: GeneratePlanResponse & ErrorResponse = await response.json();

    if (responseData.error) {
      throw responseData.error;
    }

    successCallBack(responseData);
  } catch (error) {
    const { message: errorMessage } = error as { message: string; };
    errorCallback(errorMessage);
  }
};

export default generatePlan;
