import usePlanGeneration from "@/components/home/PlanGeneration/hooks/usePlanGeneration";
import { LoadingDots } from "@/components/shared/icons";
import { GlobalContext } from "context/GlobalContext";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import cn from "classnames";
import React, { useContext, useEffect, useState } from "react";
import Carousel from "@/components/shared/Carousel";
import MenuSection from "@/components/home/MenuSection/Presentational";
import ImageLoading from "../public/imageLoading.gif";
import router from "next/router";
import usePageLeaveWarning from "@/lib/hooks/use-page-leave-warning";

const Menu = () => {
  const { formValues, modalIsOpen } = useContext(GlobalContext);

  const {
    isGeneratingImage,
    isGeneratingPlan,
    sendRequest,
    ingredientsImageUrl,
    fastingPlan,
    carouselImages,
  } = usePlanGeneration(formValues);
  const [loadingImage, setLoadingImage] = useState(true);

  usePageLeaveWarning(
    "Are you sure you want to leave this page? The data will be lost.",
  );

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

  if (isGeneratingImage) {
    return (
      <div className="flex min-h-4/5 flex-col items-center">
        <Image
          className="h-[200px] w-[200px]"
          src={ImageLoading}
          alt="img-loader"
        />
        <p className="flex items-center ">
          <h3 className="pr-2 text-xl font-semibold">
            We are generating your ingredients image!
          </h3>
          <LoadingDots />
        </p>
      </div>
    );
  }

  if (isGeneratingPlan && ingredientsImageUrl) {
    return (
      <AnimatePresence>
        <motion.div
          id="ingredientsImage"
          initial={animation.initial}
          animate={animation.animate}
          exit={animation.exit}
          className="flex min-h-4/5 w-full flex-col items-center justify-center "
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
          <h2 className="flex items-center pt-6 text-center">
            <span className="pr-3">
              Your plan is being generated. It might take up to 40 seconds..
            </span>
            <br />
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
  return <div className="min-h-4/5"></div>;
};

export default Menu;
