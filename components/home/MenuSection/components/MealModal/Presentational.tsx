import Image from "next/image";
import React, { useCallback, useEffect, useState, SetStateAction } from "react";
import classNames from "classnames";

import { LoadingDots } from "@/components/shared/icons";
import ErrorFeedbackModal from "@/components/shared/ErrorFeedbackModal";
import Modal from "@/components/shared/modal";
import { FastingDataType } from "@/lib/types";
import getMealImage from "@/components/home/PlanGeneration/helpers/getMealImage";

interface Props {
  meal: FastingDataType;
  show: boolean;
  setShow: React.Dispatch<SetStateAction<boolean>>;
}
const MealModal: React.FC<Props> = (props) => {
  const {
    meal: { mealName, preparation, ingredients },
    setShow,
    show,
  } = props;

  const [mealImage, setMealImage] = useState<string>();
  const [imgLoading, setImgLoading] = useState(true);
  const [renderedImageLoading, setRenderedImageLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const setImage = useCallback((imageUrl: string) => {
    setRenderedImageLoading(false);
    setMealImage(imageUrl);
  }, []);

  useEffect(() => {
    if (show && !mealImage) {
      getMealImage(
        { prompt: mealName },
        (responseData) => setImage(responseData.imageUrl),
        (error) => setErrorMessage(error),
      );
    }
  }, [mealName, setImage, show, mealImage]);

  useEffect(() => {
    return () => {
      setErrorMessage("");
    };
  }, []);

  const ingredientsArray = ingredients?.split(",").map((val) => val.trim());

  return (
    <>
      <ErrorFeedbackModal
        errorMessage={errorMessage}
        clearError={() => setErrorMessage("")}
      />
      <Modal showModal={show} setShowModal={setShow}>
        <article className="relative mx-auto  flex w-[350px] flex-col rounded-[30px] bg-white shadow-md md:w-[600px] ">
          <aside>
            <figure className="relative">
              <h4
                className={classNames(
                  "abs-center text-md z-10 mx-auto w-full text-center font-bold md:text-4xl",
                  renderedImageLoading ? "text-black" : "text-white",
                )}
              >
                {mealName || "-"}
              </h4>
              {!renderedImageLoading && (
                <Image
                  className={classNames(
                    "h-[150px] w-full rounded-t-[30px] bg-gray-50 object-cover  brightness-70 md:h-[300px]",
                    imgLoading ? "blur-2xl" : "blur-0",
                  )}
                  src={mealImage || ""}
                  alt="Meal Image"
                  width={500}
                  height={150}
                  onLoadingComplete={() => setImgLoading(false)}
                  onError={() => setImgLoading(false)}
                />
              )}
              {renderedImageLoading && (
                <div className="z-10 flex h-[180px] w-full justify-center rounded-t-[30px] border-2 border-b-0 bg-white">
                  <p className="mt-10">
                    <LoadingDots />
                  </p>
                </div>
              )}
            </figure>

            <div className=" flex p-4 pb-10">
              <div style={{ flex: 0.3 }} className="h-full">
                <h3 className="text-md font-semibold md:text-xl">
                  Ingredients
                </h3>
                <ul className="max-w-md list-inside  list-disc space-y-1 pt-4 font-light leading-6">
                  {ingredientsArray?.map((ingredient) => {
                    return (
                      <li
                        className="text-[14px] md:text-[18px]"
                        key={ingredient}
                      >
                        {ingredient}
                      </li>
                    );
                  }) || "-"}
                </ul>
              </div>
              <div className="w-[1px]" />
              <div style={{ flex: 0.7 }} className="pl-3">
                <h3 className="text-md font-semibold md:text-xl">
                  How to Prepare
                </h3>
                <p className="pt-4 text-[14px]  font-light leading-6 text-gray-900 md:text-[18px]">
                  {preparation || "-"}
                </p>
              </div>
            </div>
          </aside>
        </article>
      </Modal>
    </>
  );
};

export default MealModal;
