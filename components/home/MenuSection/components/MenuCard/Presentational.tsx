import { FastingDataType } from "@/lib/types";
import Image from "next/image";
import React from "react";
interface MenuCardProps {
  data: FastingDataType;
}
const MenuCard: React.FC<MenuCardProps> = (props) => {
  const { data } = props;
  return (
    <aside className="bg-white  max-w-md rounded-lg  p-4 shadow">
      <h1 className="text-gray-900 mb-2 text-center text-2xl font-bold tracking-tight ">
        {data.mealName}
      </h1>
      <div className="flex">
        <div className="" style={{ flex: 0.5 }}>
          <h4 className="text-gray-900  mb-2 text-sm font-bold tracking-tight">
            Meal Preparation
          </h4>
          <p className="text-gray-700 d font-normal">{data.preparation}</p>

          <h2 className="text-gray-900  mb-2 text-lg font-semibold">
            Ingredients
          </h2>
          <ul className="text-gray-500  max-w-md list-inside list-disc space-y-1">
            {data.ingredients
              .split(",")
              .map((item) => item.trim())
              .map((ingredient) => {
                return <li key={ingredient}>{ingredient}</li>;
              })}
          </ul>
        </div>
        <div style={{ flex: 0.5 }}>
          <Image
            width={300}
            height={300}
            className="rounded-xl"
            src="https://images.pexels.com/photos/3872372/pexels-photo-3872372.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
      </div>

      <div className="p-5"></div>
    </aside>
  );
};

export default MenuCard;
