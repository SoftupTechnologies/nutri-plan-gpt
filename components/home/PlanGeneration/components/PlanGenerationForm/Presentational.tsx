import React, { ChangeEvent, useState } from "react";

import { FastingRequestType } from "../../../../../lib/types";

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
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <form className="plan-generation-form max-w-xxl mx-auto mb-6 grid grid-cols-2 gap-4 border-0 p-2 shadow-sm shadow-primary drop-shadow-sm	">
        <section className="bg-white  border-gray-50 border-r-[0.1px] p-6">
          <h2 className="mb-4 text-2xl font-bold">Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block" htmlFor="weight">
                Weight (kg):
              </label>
              <input
                onChange={(e) => handleInputChange(e)}
                value={formValues.weight}
                min={10}
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
                min={100}
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
                min={10}
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
                min={1}
                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 block w-full rounded-md focus:ring-1 focus:ring-opacity-50"
                type="number"
                id="periodToLoseWeight"
                name="periodToLoseWeight"
                required
              />
            </div>
            <div className="col-span-1 flex flex-col justify-between">
              <p>Fasting type:</p>
              <div className="">
                <input
                  checked={formValues.fastingType === "16:8"}
                  onChange={(e) => handleInputChange(e)}
                  id="fasting-opt-1"
                  type="radio"
                  value="16:8"
                  name="fastingType"
                  className="text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 focus:ring-0"
                />
                <label
                  htmlFor="fasting-opt-1"
                  className="text-gray-900 dark:text-gray-300 ml-2 text-sm font-medium"
                >
                  16 : 8
                </label>
              </div>
              <div className="">
                <input
                  checked={formValues.fastingType === "18:6"}
                  onChange={(e) => handleInputChange(e)}
                  id="fasting-opt-2"
                  type="radio"
                  value="18:6"
                  name="fastingType"
                  className="text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 focus:ring-0"
                />
                <label
                  htmlFor="fasting-opt-2"
                  className="text-gray-900 dark:text-gray-300 ml-2 text-sm font-medium"
                >
                  18 : 6
                </label>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white border-r-1 rounded-lg p-6">
          <h2 className="mb-4 text-2xl font-bold">Ingredients</h2>
          <label className="mb-2 block" htmlFor="ingredients">
            List of Ingredients (separated by comma):
          </label>
          <textarea
            onChange={(e) => handleInputChange(e)}
            className="border-gray-300	 focus:border-indigo-500 focus:ring-indigo-200 block w-full resize-none rounded-md focus:ring-1 focus:ring-opacity-50"
            id="ingredients"
            name="ingredients"
            placeholder="e.g. chicken, broccoli, rice"
            required
          />
        </section>
      </form>
      <button
        type="button"
        className="generate-button border-gray-800  text-md  mr-2 mb-2 w-[200px] rounded-lg border px-5 py-2.5 text-center font-medium  "
      >
        Generate
      </button>
    </>
  );
};

export default PlanGenerationForm;
