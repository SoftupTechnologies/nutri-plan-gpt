const generateRandomStrings = (
  originalArray: string[],
  numberOfStringsToGenerate: number,
): string[] => {
  const result: string[] = [];
  const resultLength = numberOfStringsToGenerate < originalArray.length
    ? numberOfStringsToGenerate
    : originalArray.length - 1;

  const randomIndices = Array.from(
    { length: resultLength },
    () => Math.floor(Math.random() * originalArray.length)
  );

  randomIndices.forEach((index) => {
    result.push(originalArray[index]);
  });

  return result;
}

export default generateRandomStrings;
