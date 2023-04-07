import React, {
  useCallback,
  useContext,
  useState,
  ChangeEvent,
} from 'react';
import cn from 'classnames';
import Image from 'next/image';
import {
  motion,
  AnimatePresence,
} from 'framer-motion';

import { HomeContext } from '@/components/home/Context/HomeContext';
import MenuSection from '@/components/home/MenuSection/Presentational';
import { LoadingDots } from '@/components/shared/icons';
import Carousel from '@/components/shared/Carousel';

import { FastingRequestType } from '../../../../../lib/types';
import getInputBorderClasses from '../../helpers/getInputBorderClasses';
import usePlanGeneration from '../../hooks/usePlanGeneration';
import IngredientsInput from '../IngredientsInput/Presentational';

const PlanGenerationForm: React.FC = () => {
  const [validationMessage, setValidationMessage] = useState<string>("");
  const [formValues, setFormValues] = useState<FastingRequestType>({
    weight: 0,
    height: 0,
    targetWeight: 0,
    periodToLoseWeight: 1,
    fastingType: "16:8",
    ingredients: "",
  });
  const { modalIsOpen } = useContext(HomeContext);

  const {
    isGeneratingImage,
    isGeneratingPlan,
    sendRequest,
    ingredientsImageUrl,
    fastingPlan,
    carouselImages,
  } = usePlanGeneration(formValues);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    let newValue: number | string | undefined = e.target.value;

    if (!["fastingType", "ingredients"].includes(e.target.name)) {
      newValue = newValue ? Number(newValue) : undefined;
    }

    setFormValues({
      ...formValues,
      [e.target.name]: newValue,
    });
  };

  const animation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };
  const submitForm = useCallback(() => {
    const { weight, height, targetWeight, periodToLoseWeight, ingredients } =
      formValues;

    if ([weight, height, targetWeight, periodToLoseWeight].includes(0)) {
      setValidationMessage("Please fill all the required fields with your information.");
    } else if (targetWeight > weight) {
      setValidationMessage("Target weight should be smaller than actual weight");
    } else if (ingredients?.split(',')?.length < 6) {
      setValidationMessage("Please enter at least six ingredient.");
    } else {
      setValidationMessage("");
      sendRequest();
    }
  }, [formValues, sendRequest]);

  if (isGeneratingPlan && ingredientsImageUrl) {
    return (
      <AnimatePresence>
        <motion.div
          id="ingredientsImage"
          initial={animation.initial}
          animate={animation.animate}
          exit={animation.exit}
          className="flex min-h-[500px] w-full flex-col items-center justify-center "
        >
          <Image
            width={400}
            height={400}
            className="h-[400px] w-[400px] rounded-xl object-cover"
            src={ingredientsImageUrl}
            alt="plan-generating-image"
          />
          <h2 className="flex items-center pt-6 text-center">
            <span className="pr-3">Your plan is being generated. It might take up to 40 seconds..</span><br />
            <LoadingDots />
          </h2>
        </motion.div>
      </AnimatePresence>
    );
  }

  if (fastingPlan && carouselImages) {
    return (
      <AnimatePresence>
        <motion.div
          id="generatedPlan"
          className="pt-4 md:pt-16"
          initial={animation.initial}
          animate={animation.animate}
          exit={animation.exit}
        >
          <h1 className={cn("mx-auto mb-1 max-w-4xl text-center font-display text-2xl font-bold tracking-normal text-section-title sm:text-5xl md:mb-5", modalIsOpen ? 'blur' : '')}>
            Your personalized meal plan
          </h1>
          <h2 className={cn("mx-auto  max-w-xl pb-1 text-center text-lg leading-7 text-section-subtitle text-section-subtitle md:pb-5", modalIsOpen ? 'blur' : '')}>
            This is the fasting plan for your week
          </h2>
          <Carousel images={carouselImages} />
          <MenuSection fastingPlan={fastingPlan} />
        </motion.div>
      </AnimatePresence>
    );
  }

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
                value={formValues.weight}
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
                value={formValues.targetWeight}
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
                value={formValues.height}
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
                value={formValues.periodToLoseWeight}
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
              <label
                htmlFor="fastingType"
                className='mb-2 block text-sm font-medium text-gray-900 after:text-red-500 after:content-["*"]'
                defaultValue="16:8"
              >
                Select a fasting type
              </label>
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
          </div>
        </section>
        <section className="border-r-1 rounded-lg bg-white p-6">
          <h2 className="mb-4 text-2xl font-bold">Ingredients</h2>
          <IngredientsInput
            shouldValidate={shouldValidate}
            updateIngredients={(newIngredients) => {
              setFormValues({
                ...formValues,
                ingredients: newIngredients.toString(),
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
            isGeneratingImage && "disable-hover",
          )}
        >
          Generate my plan
          {isGeneratingImage && <LoadingDots />}
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
