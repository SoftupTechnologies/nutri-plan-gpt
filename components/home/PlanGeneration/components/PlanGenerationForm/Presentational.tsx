import React from 'react';

const PlanGenerationForm: React.FC = () => {
  return (
    <>
      <form className="plan-generation-form p-2 max-w-lg mx-auto mb-6">
        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2" htmlFor="weight">Weight (kg):</label>
              <input className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" type="number" id="weight" name="weight" required />
            </div>
            <div>
              <label className="block mb-2" htmlFor="height">Height (cm):</label>
              <input className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" type="number" id="height" name="height" required />
            </div>
            <div className="col-span-2">
              <label className="block mb-2" htmlFor="target-weight">Target Weight (kg):</label>
              <input className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" type="number" id="target-weight" name="target-weight" required />
            </div>
          </div>
        </section>
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
          <label className="block mb-2" htmlFor="ingredients">List of Ingredients (separated by comma):</label>
          <input className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" type="text" id="ingredients" name="ingredients" placeholder="e.g. chicken, broccoli, rice" required />
        </section>
      </form>
      <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110" type="submit">Generate my plan</button>
    </>
  );
};

export default PlanGenerationForm;
