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
      className="box-content flex h-[200px]  max-w-xl flex-1 rounded-[20px] bg-white p-4 shadow bg-card-bg"
    >
      <div  className="flex text-white flex-col justify-around p-2" style={{flex:0.5}}>
        <h1 className="pb-4 text-2xl font-normal  text-white">
          {data.mealName}
        </h1>
        <h3 className="flex text-white items-center">
          <span className="pr-1">{timeSvg}</span>
          <span>Time:</span>
          <span className="pl-1 font-bold">{data.time}</span>
        </h3>
      </div>
      <div style={{flex:0.5}}>
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
    fill="white"
  >
    <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24.984375 6.9863281 A 1.0001 1.0001 0 0 0 24 8 L 24 22.173828 A 3 3 0 0 0 22 25 A 3 3 0 0 0 22.294922 26.291016 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 23.708984 27.705078 A 3 3 0 0 0 25 28 A 3 3 0 0 0 28 25 A 3 3 0 0 0 26 22.175781 L 26 8 A 1.0001 1.0001 0 0 0 24.984375 6.9863281 z" />
  </svg>
);
