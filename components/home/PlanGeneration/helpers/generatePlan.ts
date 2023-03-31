import {
  FastingDataType,
  FastingRequestType,
} from '@/lib/types';

const generatePlan = async (
  params: FastingRequestType,
  callBack: (responseData: FastingDataType[]) => void,
): Promise<void> => {
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

    const responseData: FastingDataType[] = await response.json();
    callBack(responseData);
  } catch (error) {
    const { message: errorMessage } = error as { message: string };
    alert(errorMessage);
  }
};

export default generatePlan;
