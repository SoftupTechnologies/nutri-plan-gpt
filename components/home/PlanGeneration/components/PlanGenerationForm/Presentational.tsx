import React, { useCallback, useContext, useState, ChangeEvent } from "react";
import cn from "classnames";
import { FastingRequestType } from "../../../../../lib/types";
import getInputBorderClasses from "../../helpers/getInputBorderClasses";
import IngredientsInput from "../IngredientsInput/Presentational";
import { GlobalContext } from "context/GlobalContext";
import router from "next/router";
import { InfoIcon } from "@/components/shared/icons";
import cuisines from "../../constants/cuisines";
import dietTypes from "../../constants/dietTypes";
import Tooltip from "@/components/shared/tooltip";

const PlanGenerationForm: React.FC = () => {
  const [validationMessage, setValidationMessage] = useState<string>("");
  const { setFormValues: setGlobalFormValues } = useContext(GlobalContext);
  const [formValues, setFormValues] = useState<FastingRequestType>({
    weight: 0,
    height: 0,
    targetWeight: 0,
    periodToLoseWeight: 1,
    fastingType: "16:8",
    ingredients: "",
    allergies: "",
    cuisine: "",
    dietType : "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    let newValue: number | string | undefined = e.target.value;

    if (!["fastingType", "ingredients", "cuisine", "dietType"].includes(e.target.name)) {
      newValue = newValue ? Number(newValue) : 0;
    }

    setFormValues({
      ...formValues,
      [e.target.name]: newValue,
    });
  };

  const submitForm = useCallback(() => {
    const { weight, height, targetWeight, periodToLoseWeight, ingredients } =
      formValues;

    if ([weight, height, targetWeight, periodToLoseWeight].includes(0)) {
      setValidationMessage(
        "Please fill all the required fields with your information.",
      );
    } else if (targetWeight > weight) {
      setValidationMessage(
        "Target weight should be smaller than actual weight",
      );
    } else if (ingredients?.split(",")?.length < 6) {
      setValidationMessage("Please enter at least six ingredient.");
    } else {
      setValidationMessage("");
      setGlobalFormValues(formValues);
      router.push("/menu");
    }
  }, [formValues, setGlobalFormValues]);

  const shouldValidate = Boolean(validationMessage);
  return (
    <>
      <h1 className="mx-auto mb-5 max-w-4xl text-center font-display text-2xl font-bold tracking-normal text-section-title sm:text-5xl">
        Create your personalized meal plan
      </h1>
      <h2 className="mx-auto mb-4 max-w-xl text-center text-lg leading-7 text-section-subtitle text-section-subtitle">
        Enter your information and a list of ingredients to get started
      </h2>
      <form className="border-1 mx-auto mb-6 flex max-w-4xl  flex-col gap-4 border  p-2">
        <section className="border-r-[0.1px]  border-gray-50 bg-white p-3 md:p-6">
          <h2 className="mb-4 text-2xl font-bold">Information</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                className='mb-2 block after:text-red-500 after:content-["*"]'
                htmlFor="weight"
              >
                Weight (kg):
              </label>
              <input
                aria-required
                onChange={(e) => handleInputChange(e)}
                value={formValues.weight.toString()}
                min={0}
                className={`${getInputBorderClasses(
                  formValues.weight,
                  "number",
                  shouldValidate,
                )} block w-full  rounded-md  focus:ring-opacity-50`}
                type="number"
                id="weight"
                name="weight"
                required
              />
            </div>
            <div className="col-span-1">
              <label
                className='mb-2 block after:text-red-500 after:content-["*"]'
                htmlFor="targetWeight"
              >
                Target Weight (kg):
              </label>
              <input
                aria-required
                onChange={(e) => handleInputChange(e)}
                value={formValues.targetWeight.toString()}
                min={0}
                className={`${getInputBorderClasses(
                  formValues.targetWeight,
                  "number",
                  shouldValidate,
                )} block w-full rounded-md focus:ring-opacity-50`}
                type="number"
                id="targetWeight"
                name="targetWeight"
                required
              />
            </div>
            <div>
              <label
                className='mb-2 block after:text-red-500 after:content-["*"]'
                htmlFor="height"
              >
                Height (cm):
              </label>
              <input
                aria-required
                onChange={(e) => handleInputChange(e)}
                value={formValues.height.toString()}
                min={0}
                className={`${getInputBorderClasses(
                  formValues.height,
                  "number",
                  shouldValidate,
                )} block w-full rounded-md focus:ring-opacity-50`}
                type="number"
                id="height"
                name="height"
                required
              />
            </div>
            <div className="col-span-1">
              <label
                className='mb-2 block after:text-red-500 after:content-["*"]'
                htmlFor="periodToLoseWeight"
              >
                Period to lose weight (month):
              </label>
              <input
                aria-required
                onChange={(e) => handleInputChange(e)}
                value={formValues.periodToLoseWeight.toString()}
                min={0}
                className={`${getInputBorderClasses(
                  formValues.periodToLoseWeight,
                  "number",
                  shouldValidate,
                )} block w-full rounded-md focus:ring-opacity-50`}
                type="number"
                id="periodToLoseWeight"
                name="periodToLoseWeight"
                required
              />
            </div>
            <div className="col-span-1 flex flex-col justify-between">
              <div className="flex ">
              <label
                htmlFor="fastingType"
                className='mb-2 block flex items-center text-sm font-medium text-gray-900 after:text-red-500 after:content-["*"]'
                defaultValue="16:8"
              >
                Select a fasting type
              </label>
         
                  <Tooltip content="X:Y (X hours of fasting followed by a window of consuming calories within a Y hour period)">
                    <h1><InfoIcon className="h-[25px] w-[25px] pl-1" /></h1>
                  </Tooltip>
        
                </div>
              <select
                name="fastingType"
                onChange={handleInputChange}
                value={formValues.fastingType}
                id="fastingType"
                className={`${getInputBorderClasses(
                  formValues.fastingType,
                  "text",
                  shouldValidate,
                )} block w-full rounded-lg border p-2.5 text-sm`}
              >
                <option value="16:8">16:8</option>
                <option value="18:6">18:6</option>
              </select>              
            </div>
            <div className="col-span-1 flex flex-col justify-between">
              <div className="flex ">
              <label
                htmlFor="cuisine"
                className='mb-2 block flex items-center text-sm font-medium text-gray-900'
                defaultValue=""
              >
                Select a cuisine (optional)
              </label>
                </div>
              <select
                name="cuisine"
                onChange={handleInputChange}
                value={formValues.cuisine}
                id="cuisine"
                className={`${getInputBorderClasses(
                  formValues.cuisine || "",
                  "text",
                  false,
                )} block w-full rounded-lg border p-2.5 text-sm`}
              > 
                <option value="">Not specified</option>
                {cuisines.map((cuisine)=>{
                  return <option key={cuisine} value={cuisine}>{cuisine}</option>
                })}
              </select>
              
            </div>
            <div className="col-span-1 flex flex-col justify-between">
              <div className="flex ">
              <label
                htmlFor="cuisine"
                className='mb-2 block flex items-center text-sm font-medium text-gray-900'
                defaultValue="16:8"
              >
                Select a diet type (optional)
              </label>
              </div>
              <select
                name="dietType"
                onChange={handleInputChange}
                value={formValues.dietType}
                id="dietType"
                className={`${getInputBorderClasses(
                  formValues.dietType || "",
                  "text",
                  false,
                )} block w-full rounded-lg border p-2.5 text-sm`}
              > 
                <option value="">Not specified</option>
                {dietTypes.map((diet)=>{
                  return <option key={diet} value={diet}>{diet}</option>
                })}
              </select>
            </div>
          </div>
        </section>
        <section className="border-r-1 rounded-lg bg-white p-6">
          <h2 className="mb-4 text-2xl font-bold">Ingredients</h2>
          <IngredientsInput
            ingredientType="common"
            shouldValidate={shouldValidate}
            updateIngredients={(newIngredients) => {
              setFormValues({
                ...formValues,
                ingredients: newIngredients.toString(),
              });
            }}
          />
        </section>
        <section className="border-r-1 rounded-lg bg-white p-6">
          <h2 className="mb-4 text-2xl font-bold">Allergies</h2>
          <IngredientsInput
            ingredientType="allergic"
            updateIngredients={(newAllergicIngredients) => {
              setFormValues({
                ...formValues,
                allergies: newAllergicIngredients.toString(),
              });
            }}
          />
        </section>
      </form>
      <div className="flex flex-col items-center">
        <button
          type="button"
          onClick={submitForm}
          className={cn(
            "text-md mr-2 mb-2 flex items-center rounded-lg border border-gray-800 px-5 py-2.5 text-center font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300",
          )}
        >
          Generate my plan
        </button>
        {validationMessage ? (
          <span className="text-center text-sm text-red-500">
            {validationMessage}
          </span>
        ) : null}
      </div>
    </>
  );
};

export default PlanGenerationForm;
