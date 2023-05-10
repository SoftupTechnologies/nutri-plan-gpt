import usePlanGeneration from "@/components/home/PlanGeneration/hooks/usePlanGeneration";
import { LoadingDots } from "@/components/shared/icons";
import { GlobalContext } from "context/GlobalContext";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import cn from "classnames";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Carousel from "@/components/shared/Carousel";
import MenuSection from "@/components/home/MenuSection/Presentational";
import ImageLoading from "../public/imageLoading.gif";
import router from "next/router";
import usePageLeaveWarning from "@/lib/hooks/use-page-leave-warning";
import ErrorFeedbackModal from "@/components/shared/ErrorFeedbackModal";
import WeightChangeChart from "@/components/WeightChangeChart";
import BMIChangeChart from "@/components/shared/BMIChangeChart";
import AnimatedArrow from "@/components/home/HeroSection/components/AnimatedArrow/Presentational";

const Menu = () => {
  const { formValues, modalIsOpen } = useContext(GlobalContext);
  const [loadingText, setLoadingText] = useState(
    "Your plan is being generated. It might take up to 40 seconds...",
  );
  const [showBMIChart, setShowBMIChart] = useState(false);
  const [showWeightsChart, setShowWeightsChart] = useState(false);

  const {
    isGeneratingImage,
    isGeneratingPlan,
    sendRequest,
    ingredientsImageUrl,
    fastingPlan,
    carouselImages,
    errorMessage,
    clearError,
  } = usePlanGeneration(formValues);
  const [loadingImage, setLoadingImage] = useState(true);

  usePageLeaveWarning(
    "Are you sure you want to leave this page? The data will be lost.",
  );

  const closeErrorFeedbackModal = useCallback(() => {
    clearError();

    if (!isGeneratingPlan && !fastingPlan) {
      router.replace("/");
    }
  }, [clearError, fastingPlan, isGeneratingPlan]);

  useEffect(() => {
    if (!formValues.ingredients) {
      router.replace("/");
    } else {
      sendRequest();
    }
  }, [formValues.ingredients, sendRequest]);

  const animation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  useEffect(() => {
    if (ingredientsImageUrl) {
      setTimeout(() => {
        const ingredients = formValues.ingredients.split(",").join(", ");
        setLoadingText(
          "Preparing your meals with these ingredients: " + ingredients,
        );
      }, 10000); //

      setTimeout(() => {
        setLoadingText(
          "Creating the best intermittent fasting for your parameters...",
        );
      }, 20000); // Update loadingText after 20 seconds

      setTimeout(() => {
        setLoadingText("We are almost there...");
      }, 35000);
    }

    if (ingredientsImageUrl) {
      setShowBMIChart(true);
      setShowWeightsChart(true);
    }

    if(fastingPlan) {
      hideCharts();
    }

  }, [ingredientsImageUrl, formValues.ingredients, fastingPlan,setShowBMIChart,setShowWeightsChart]);

  const hideCharts=()=>{
    setShowBMIChart(false);
    setShowWeightsChart(false)
  };

  let content: JSX.Element | null = null;

  if (isGeneratingImage) {
    content = (
      <div className="flex flex-col items-center">
        <Image
          className="h-[200px] w-[200px]"
          src={ImageLoading}
          alt="img-loader"
        />
        <div className="flex items-center ">
          <h3 className="pr-2 text-xl font-semibold">
            We are generating your ingredients image!
          </h3>
          <LoadingDots />
        </div>
      </div>
    );
  } else if (isGeneratingPlan) {
    if (ingredientsImageUrl) {
      content = (
        <AnimatePresence>
          <motion.div
            id="ingredientsImage"
            initial={animation.initial}
            animate={animation.animate}
            exit={animation.exit}
            className="flex w-full flex-col items-center justify-center pt-8 "
          >
            <Image
              width={400}
              height={400}
              className={cn(
                "h-[400px] w-[400px] rounded-xl object-cover duration-700 ease-in-out group-hover:opacity-75",
                loadingImage
                  ? "scale-110 blur-2xl grayscale"
                  : "scale-100 blur-0 grayscale-0",
              )}
              src={ingredientsImageUrl}
              alt="plan-generating-image"
              onLoadingComplete={() => setLoadingImage(false)}
              onError={() => setLoadingImage(false)}
            />
            <h2 className="flex max-w-xl items-center pt-6 text-center">
              <span className="pr-3">{loadingText}</span>
              <br />
              <LoadingDots />
            </h2>
            <p className="animated-icon-container flex justify-center pt-12 h-[30px]">
              <a href="#charts" className="arrow">
                <AnimatedArrow />
              </a>
            </p>
          </motion.div>
        </AnimatePresence>
      );
    } else {
      content = (
        <div>
          <h2 className="flex max-w-xl items-center pt-6 text-center">
            <span className="pr-3">
              Your plan is being generated. It might take up to 40 seconds...
            </span>
            <br />
            <LoadingDots />
          </h2>
        </div>
      );
    }
  }
  if (fastingPlan && carouselImages) {
    content = (
      <AnimatePresence>
        <motion.div
          id="generatedPlan"
          className="pt-4 md:pt-16"
          initial={animation.initial}
          animate={animation.animate}
          exit={animation.exit}
        >
          <h1
            className={cn(
              "mx-auto mb-1 max-w-4xl text-center font-display text-2xl font-bold tracking-normal text-section-title sm:text-5xl md:mb-5",
              modalIsOpen ? "blur" : "",
            )}
          >
            Your personalized meal plan
          </h1>
          <h2
            className={cn(
              "mx-auto  max-w-xl pb-1 text-center text-lg leading-7 text-section-subtitle text-section-subtitle md:pb-5",
              modalIsOpen ? "blur" : "",
            )}
          >
            This is the fasting plan for your week
          </h2>
          <Carousel images={carouselImages} />
          <MenuSection fastingPlan={fastingPlan} />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <>
      <ErrorFeedbackModal
        errorMessage={errorMessage}
        clearError={closeErrorFeedbackModal}
      />
      {content}

      <section id="charts" className="flex flex-col pt-16 pb-16">
        {showBMIChart && (
          <motion.div
            id="ingredientsImage"
            initial={animation.initial}
            animate={animation.animate}
            exit={animation.exit}
          >
            <BMIChangeChart
              weights={{
                current: formValues.weight,
                target: formValues.targetWeight,
              }}
              period={formValues.periodToLoseWeight}
              height={formValues.height}
            />
          </motion.div>
        )}
        {showWeightsChart && (
          <motion.div
            id="ingredientsImage"
            initial={animation.initial}
            animate={animation.animate}
            exit={animation.exit}
          >
            <WeightChangeChart
              weights={{
                current: formValues.weight,
                target: formValues.targetWeight,
              }}
              period={formValues.periodToLoseWeight}
            />
          </motion.div>
        )}
      </section>
    </>
  );
};

export default Menu;
