import {
  ErrorResponse,
  ImageRequestType,
  ImageResponseType,
} from '@/lib/types';

const getMealImage = async (
  params: ImageRequestType,
  successCallBack: (responseData: ImageResponseType) => void,
  errorCallback: (error: string) => void,
): Promise<ImageResponseType | void> => {
  const body: ImageRequestType = {
    prompt: params.prompt,
  };

  try {
    const jsonBody = JSON.stringify(body);

    const response = await fetch('/api/mealImage', {
      method: 'POST',
      body: jsonBody,
    });

    const responseData: ImageResponseType & ErrorResponse = await response.json();

    if (responseData.error) {
      throw responseData.error;
    }

    successCallBack(responseData);
  } catch (error) {
    const { message: errorMessage } = error as { message: string; };
    errorCallback(errorMessage);
  }
};

export default getMealImage;
