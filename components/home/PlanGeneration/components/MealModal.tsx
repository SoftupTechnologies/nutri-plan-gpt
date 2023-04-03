import { FastingDataType } from "@/lib/types";
import Image from "next/image";
import React, { SetStateAction, useState } from "react";
import classNames from "classnames";
import Modal from "@/components/shared/modal";
import { LoadingDots } from "@/components/shared/icons";

interface Props {
  meal: FastingDataType;
  show: boolean;
  setShow: React.Dispatch<SetStateAction<boolean>>;
}
const MealModal: React.FC<Props> = (props) => {
  const {
    meal: { mealImage, mealName, preparation, ingredients },
    setShow,
    show,
  } = props;

  const [imgLoading, setImgLoading] = useState(true);
  const [renderedImageLoading, setRenderedImageLoading] = useState(false);

  const ingredientsArray = ingredients.split(",").map((val) => val.trim());
  return (
    <Modal showModal={show} setShowModal={setShow}>
      <article className="relative flex w-[500px] flex-col rounded-[30px] bg-white shadow-md ">
        <aside>
          <figure className="relative">
            <h4
              className={classNames(
                "abs-center z-10 text-xl font-bold",
                renderedImageLoading ? "text-black" : "text-white",
              )}
            >
              {mealName}
            </h4>
            {!renderedImageLoading && (
              <Image
                className={classNames(
                  "h-[180px] w-full rounded-t-[30px] bg-gray-50  object-cover brightness-50",
                  imgLoading ? "blur-2xl" : "blur-0",
                )}
                src={mealImage}
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
              <h3 className="text-xl font-semibold">Ingredients</h3>
              <ul className="max-w-md list-inside  list-disc space-y-1 pt-4 font-light">
                {ingredientsArray.map((ingredient) => {
                  return <li key={ingredient}>{ingredient}</li>;
                })}
              </ul>
            </div>
            <div className="w-[1px]" />
            <div style={{ flex: 0.7 }} className="pl-3">
              <h3 className="text-xl font-semibold">How to Prepare</h3>
              <p className="pt-4  text-lg font-light leading-6 text-gray-900">
                {preparation}
              </p>
            </div>
          </div>
        </aside>
      </article>
    </Modal>
  );
};

export default MealModal;
