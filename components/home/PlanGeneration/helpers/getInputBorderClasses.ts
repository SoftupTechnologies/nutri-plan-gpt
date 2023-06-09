const getInputBorderClasses = (
  value: string | number,
  type: 'text' | 'number' | 'ingredients',
  shouldValidate = false,
) => {
  if (type === 'text') {
    return !value && shouldValidate
      ? 'border-red-300 border-red-300 focus:border-red-500 focus:ring-red-200 focus:ring-1'
      : 'border-gray-300 border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 focus:ring-1';
  }

  if (type === 'ingredients' && typeof value === 'string') {
    return (!value || value.split(',').length < 6) && shouldValidate
      ? 'border-red-300 border-red-300 focus:border-red-500 focus:ring-red-200 focus:ring-1'
      : 'border-gray-300 border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 focus:ring-1';
  }

  return (isNaN(+value) || value === 0) && shouldValidate
    ? 'border-red-300 border-red-300 focus:border-red-500 focus:ring-red-200 focus:ring-1'
    : 'border-gray-300 border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 focus:ring-1';
};


export default getInputBorderClasses;
