import Image from 'next/image';
import React, { useState } from 'react';
import { FastingDataType } from '@/lib/types';
import MealModal from '../MealModal/Presentational';

interface MenuCardProps {
  data: FastingDataType;
}
const MenuCard: React.FC<MenuCardProps> = (props) => {
  const { data } = props;

  const [showMealModal, setShowMealModal] = useState<boolean>(false);

  return (
    <>
      <MealModal
        meal={data}
        show={showMealModal}
        setShow={setShowMealModal}
      />
      <aside
        className="cursor-pointer flex h-[85px] md:h-[100px] max-w-xl rounded-[30px] bg-white p-1 shadow items-center transition duration-500 hover:scale-105"
        style={{ background: '#A9EDD8' }}
        onClick={() => setShowMealModal(true)}
      >
        <div className="flex text-white flex-col p-2" style={{ flex: 0.7 }}>
          <h1 className="pb-4 text-md md:text-lg font-semibold text-black">
            {data.mealName}
          </h1>
          <div className="text-black">
            <h3 className="flex"><span className="pr-1">{timeee}</span>
              <span className="font-bold text-sm md:text-sm ">{data.time}</span>
            </h3>
          </div>
        </div>
        <div style={{ flex: 0.3}}>
          <span style={{ backgroundColor: '#6BDAB1' }} className='text-xs p-1  sm:p-2	 md:text-sm md:p-2 rounded-2xl font-bold'>Get cooking</span>
        </div>
      </aside>
    </>
  );
};

export default MenuCard;

export const timeSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
    width="20px"
    height="20px"
    fill="black"
  >
    <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24.984375 6.9863281 A 1.0001 1.0001 0 0 0 24 8 L 24 22.173828 A 3 3 0 0 0 22 25 A 3 3 0 0 0 22.294922 26.291016 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 23.708984 27.705078 A 3 3 0 0 0 25 28 A 3 3 0 0 0 28 25 A 3 3 0 0 0 26 22.175781 L 26 8 A 1.0001 1.0001 0 0 0 24.984375 6.9863281 z" />
  </svg>
);


export const timeee = (<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.4915 0C3.7995 0 0 4.49664 0 10.0372C0 15.5777 3.7995 20.0743 8.4915 20.0743C13.192 20.0743 17 15.5777 17 10.0372C17 4.49664 13.192 0 8.4915 0ZM11.2965 14.7647L7.65 10.4487V5.01858H9.35V9.62563L12.5035 13.3494L11.2965 14.7647Z" fill="black" />
</svg>
)
