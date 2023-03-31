export const prepareImagePromptForRequest = (prompt: string, isLoadingImage?: boolean) => {
  const extraWordsForLoadingImage = ['separated ingredients, kitchen table'];
  const extraWordsForTableImage = ['delicious, plate, meal'];
  const extraWords = isLoadingImage ? extraWordsForLoadingImage : extraWordsForTableImage;

  const conjugatePrompt = extraWords.map((word) => prompt.concat(`, ${word}`));

  return conjugatePrompt;
};

export const prepareFastingPromptForOpenAI = (prompt: string, isLoadingImage?: boolean) => {
  const extraWordsForLoadingImage = ['separated ingredients, kitchen table'];
  const extraWordsForTableImage = ['delicious, plate, meal'];
  const extraWords = isLoadingImage ? extraWordsForLoadingImage : extraWordsForTableImage;

  const conjugatePrompt = extraWords.map((word) => prompt.concat(`, ${word}`));

  return conjugatePrompt;
};
