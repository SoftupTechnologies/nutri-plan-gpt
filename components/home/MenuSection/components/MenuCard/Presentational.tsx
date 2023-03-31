import { FastingDataType } from "@/lib/types";
import Image from "next/image";
import React from "react";
interface MenuCardProps {
  data: FastingDataType;
}
const MenuCard: React.FC<MenuCardProps> = (props) => {
  const { data } = props;
  return (
    <aside
      className="bg-white box-content grid  h-[300px] max-w-xl flex-1 rounded-lg p-4 shadow"
      style={{
        gridTemplateRows: "max-content minmax(0, 1fr)",
        boxShadow:
          "rgba(33, 183, 138, 0.25)  0px 6px 12px -2px, rgb(33, 183, 138,0.3) 0px 3px 7px -3px",
      }}
    >
      <div className="pb-3">
        <h1 className="pb-4 text-center text-2xl font-semibold tracking-tight underline">
          {data.mealName}
        </h1>
        <h3 className="flex items-center">
          <span className="pr-1">{timeSvg}</span>
          <span>Time:</span>
          <span className="pl-1 font-bold">{data.time}</span>
        </h3>
      </div>
      <div
        className="flex gap-6"
        style={{ height: "100%", overflow: "hidden", flex: 1 }}
      >
        <div
          className=""
          style={{
            flex: 0.5,
            overflowY: "scroll",
            height: "100%",
            position: "relative",
          }}
        >
          <h4 className="text-gray-900  text-md mb-2 font-bold tracking-tight">
            Meal Preparation
          </h4>
          <p className="text-gray-700 leading-6">{data.preparation}</p>
          <h2 className="text-gray-900  mb-2 pt-2 text-lg font-semibold">
            Ingredients
          </h2>
          <ul className=" max-w-md list-inside list-disc space-y-1">
            {data.ingredients
              .split(",")
              .map((item) => item.trim())
              .map((ingredient) => {
                return (
                  <li className="text-red-600" key={ingredient}>
                    <span className="text-red-600">{ingredient}</span>
                  </li>
                );
              })}
          </ul>
        </div>
        <div style={{ flex: 0.7 }}>
          <Image
            style={{
              maxWidth: "100%",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            width={200}
            height={200}
            className="rounded-xl"
            src="https://images.pexels.com/photos/3872372/pexels-photo-3872372.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
      </div>
    </aside>
  );
};

export default MenuCard;

export const timeSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
    width="20px"
    height="20px"
  >
    <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24.984375 6.9863281 A 1.0001 1.0001 0 0 0 24 8 L 24 22.173828 A 3 3 0 0 0 22 25 A 3 3 0 0 0 22.294922 26.291016 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 23.708984 27.705078 A 3 3 0 0 0 25 28 A 3 3 0 0 0 28 25 A 3 3 0 0 0 26 22.175781 L 26 8 A 1.0001 1.0001 0 0 0 24.984375 6.9863281 z" />
  </svg>
);
