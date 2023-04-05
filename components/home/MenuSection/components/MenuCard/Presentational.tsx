import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { FastingDataType } from '@/lib/types';
import MealModal from '../MealModal/Presentational';
import { MenuSectionContext } from '../../context/MenuSectionContext';

interface MenuCardProps {
  data: FastingDataType;
}
const MenuCard: React.FC<MenuCardProps> = (props) => {
  const { data } = props;
  const {setModalIsOpen}=useContext(MenuSectionContext)

  const [showMealModal, setShowMealModal] = useState<boolean>(false);
  
  useEffect(()=>{
    setModalIsOpen(showMealModal)
  },[showMealModal,setModalIsOpen])

  return (
    <>
      <MealModal
        meal={data}
        show={showMealModal}
        setShow={setShowMealModal}
      />
      <aside
        className="cursor-pointer flex min-h-[100px] max-w-xl rounded-[30px] bg-white p-1 shadow items-center transition duration-500 hover:scale-105"
        style={{ background: '#A9EDD8' }}
        onClick={() => setShowMealModal(true)}
      >
        <div className="flex text-white flex-col p-2" style={{ flex: 0.7 }}>
          <h1 className="pb-4 text-md md:text-lg font-semibold text-black">
            {data.mealName}
          </h1>
          <div className="text-black">
            <h3 className="flex"><span className="pr-1">{timeSvg}</span>
              <span className="font-bold text-sm md:text-sm ">{data.time}</span>
            </h3>
          </div>
        </div>
        <div className='getCooking' >
          <span style={{ backgroundColor: '#6BDAB1' }} className='text-xs p-1  sm:p-2	 md:text-sm md:p-2 rounded-2xl font-bold'>Get cooking</span>
        </div>
      </aside>
    </>
  );
};

export default MenuCard;




export const timeSvg = (<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.4915 0C3.7995 0 0 4.49664 0 10.0372C0 15.5777 3.7995 20.0743 8.4915 20.0743C13.192 20.0743 17 15.5777 17 10.0372C17 4.49664 13.192 0 8.4915 0ZM11.2965 14.7647L7.65 10.4487V5.01858H9.35V9.62563L12.5035 13.3494L11.2965 14.7647Z" fill="black" />
</svg>
)
