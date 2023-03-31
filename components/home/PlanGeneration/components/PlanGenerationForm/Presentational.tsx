import React, {
  useState,
  ChangeEvent,
} from 'react';

import { FastingRequestType } from '../../../../../lib/types';

const PlanGenerationForm: React.FC = () => {
  const [formValues, setFormValues] = useState<FastingRequestType>({
    weight: 0,
    height: 0,
    targetWeight: 0,
    periodToLoseWeight: 0,
    fastingType: "16:8",
    ingredients: "",
  });

  const handleInputChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <form className="max-w-8xl border-1 mx-auto mb-6 grid grid-cols-2 gap-4 border p-2 ">
        <section className="border-r-[0.1px]  border-gray-50 bg-white p-6">
          <h2 className="mb-4 text-2xl font-bold">Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block" htmlFor="weight">
                Weight (kg):
              </label>
              <input
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
                Height (cm):
              </label>
              <input
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
                Target Weight (kg):
              </label>
              <input
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
                Period to lose weight (month):
              </label>
              <input
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
                Select a fasting type
              </label>
              <select
              name="fastingType"
                onChange={(e) => handleInputChange(e)}
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
            List of Ingredients (separated by comma):
          </label>
          <textarea
            onChange={(e) => handleInputChange(e)}
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
          className="mr-2 mb-2 rounded-lg border border-gray-800 px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300"
        >
          Generate my plan
        </button>
      </div>
    </>
  );
};

export default PlanGenerationForm;
