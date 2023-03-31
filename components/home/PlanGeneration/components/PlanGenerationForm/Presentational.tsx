import React, {
  useCallback,
  useState,
  ChangeEvent,
} from 'react';
import cn from 'classnames';
import Image from 'next/image';

import MenuSection from '@/components/home/MenuSection/Presentational';
import { LoadingDots } from '@/components/shared/icons';

import { FastingRequestType } from '../../../../../lib/types';
import usePlanGeneration from '../../hooks/usePlanGeneration';

const PlanGenerationForm: React.FC = () => {
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [formValues, setFormValues] = useState<FastingRequestType>({
    weight: 0,
    height: 0,
    targetWeight: 0,
    periodToLoseWeight: 0,
    fastingType: "16:8",
    ingredients: "",
  });

  const {
    isGeneratingImage,
    isGeneratingPlan,
    sendRequest,
    ingredientsImageUrl,
    fastingPlan,
  } = usePlanGeneration(formValues);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = useCallback(() => {
    const { weight, height, targetWeight, periodToLoseWeight, ingredients } = formValues;

    if ([weight, height, targetWeight, periodToLoseWeight].includes(0)) {
      setValidationMessage('Please fill all the required fields with your information.');
    } else if (ingredients.length === 0) {
      setValidationMessage('Please enter at least one ingredient.');
    } else {
      setValidationMessage('');
      sendRequest();
    }
  }, [formValues, sendRequest]);

  if (isGeneratingPlan && ingredientsImageUrl) {
    return (
      <>
        <Image
          width={400}
          height={400}
          className="rounded-xl"
          src={ingredientsImageUrl}
          alt="plan-generating-image"
        />
        <h2 className="">Your plan is being generated ...</h2>
      </>
    );
  }

  if (fastingPlan) {
    return <MenuSection fastingPlan={fastingPlan} />;
  }

  return (
    <>
      <form className="max-w-8xl border-1 mx-auto mb-6 flex  gap-4 border p-2  flex-col">
        <section className="border-r-[0.1px]  border-gray-50 bg-white p-6">
          <h2 className="mb-4 text-2xl font-bold">Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block" htmlFor="weight">
                Weight (kg):*
              </label>
              <input
                aria-required
                onChange={(e) => handleInputChange(e)}
                value={formValues.weight}
                min={0}
                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 block w-full  rounded-md  focus:ring-1 focus:ring-opacity-50"
                type="number"
                id="weight"
                name="weight"
                required
              />
            </div>
            <div>
              <label className="mb-2 block" htmlFor="height">
                Height (cm):*
              </label>
              <input
                aria-required
                onChange={(e) => handleInputChange(e)}
                value={formValues.height}
                min={0}
                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 block w-full rounded-md focus:ring-1 focus:ring-opacity-50"
                type="number"
                id="height"
                name="height"
                required
              />
            </div>
            <div className="col-span-1">
              <label className="mb-2 block" htmlFor="targetWeight">
                Target Weight (kg):*
              </label>
              <input
                aria-required
                onChange={(e) => handleInputChange(e)}
                value={formValues.targetWeight}
                min={0}
                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 block w-full rounded-md focus:ring-1 focus:ring-opacity-50"
                type="number"
                id="target-weight"
                name="targetWeight"
                required
              />
            </div>
            <div className="col-span-1">
              <label className="mb-2 block" htmlFor="periodToLoseWeight">
                Period to lose weight (month):*
              </label>
              <input
                aria-required
                onChange={(e) => handleInputChange(e)}
                value={formValues.periodToLoseWeight}
                min={0}
                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 block w-full rounded-md focus:ring-1 focus:ring-opacity-50"
                type="number"
                id="periodToLoseWeight"
                name="periodToLoseWeight"
                required
              />
            </div>
            <div className="col-span-1 flex flex-col justify-between">
              <label
                htmlFor="countries"
                className="mb-2 block text-sm font-medium text-gray-900 "
                defaultValue="16:8"
              >
                Select a fasting type*
              </label>
              <select
                name="fastingType"
                onChange={handleInputChange}
                id="countries"
                className="block w-full rounded-lg border border-gray-300  p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
              >
                <option value="16:8">16:8</option>
                <option value="18:6">18:6</option>
              </select>
            </div>
          </div>
        </section>
        <section className="border-r-1 rounded-lg bg-white p-6">
          <h2 className="mb-4 text-2xl font-bold">Ingredients</h2>
          <label className="mb-2 block" htmlFor="ingredients">
            List of Ingredients (separated by comma):*
          </label>
          <textarea
            onChange={handleInputChange}
            className="block w-full resize-none rounded-md border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 focus:ring-opacity-50"
            id="ingredients"
            name="ingredients"
            placeholder="e.g. chicken, broccoli, rice"
            required
          />
        </section>
      </form>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={submitForm}
          className={cn("flex items-center mr-2 mb-2 rounded-lg border border-gray-800 px-5 py-2.5 text-center text-md font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300", isGeneratingImage && "disable-hover")}
        >
          Generate my plan
          {isGeneratingImage && <LoadingDots />}
        </button>
        {validationMessage
          ? <span className="text-red-500 text-sm text-center">{validationMessage}</span>
          : null
        }
      </div>
    </>
  );
};

export default PlanGenerationForm;
