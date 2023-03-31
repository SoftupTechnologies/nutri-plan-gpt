import {
  ImageRequestType,
  ImageResponseType,
} from '@/lib/types';

const getIngredientsImage = async (params: ImageRequestType): Promise<ImageResponseType | void> => {
  const body: ImageRequestType = {
    prompt: params.prompt,
  };

  try {
    const jsonBody = JSON.stringify(body);

    const response = await fetch('/api/ingredientsImage', {
      method: 'POST',
      body: jsonBody,
    });

    return response.json();
  } catch (error) {
    const { message: errorMessage } = error as { message: string };
    alert(errorMessage);
  }
};

export default getIngredientsImage;
