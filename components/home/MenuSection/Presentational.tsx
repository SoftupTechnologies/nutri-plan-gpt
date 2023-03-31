import { FastingDataType } from '@/lib/types';
import { organizeDataByDays } from '@/lib/utils';
import React from 'react'
import DaySection from './components/DaySection/Presentational';

const MenuSection = () => {

  // const data: [string, FastingDataType[]][]=organizeDataByDays();

  return (
    <section id='menu' className='bg-section-fill w-full p-12 '>
      {/* {data.map((dt,index)=>{
        return <DaySection key={index} weekDay={dt[0]} weekDayMeals={dt[1]}/>
      })} */}
    </section>
  )
}

export default MenuSection;