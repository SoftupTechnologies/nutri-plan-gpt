import React from 'react';

import { FastingDataType } from '@/lib/types';
import { organizeDataByDays } from '@/lib/utils';

import DaySection from './components/DaySection/Presentational';

interface Props {
  fastingPlan: FastingDataType[];
}

const MenuSection: React.FC<Props> = ({ fastingPlan }) => {
  const data: [string, FastingDataType[]][] = organizeDataByDays(fastingPlan);

  return (
    <section id='menu' className='menu-section pt-12'>
      {data.map((dt, index) => {
        return <DaySection key={index} weekDay={dt[0]} weekDayMeals={dt[1]} />
      })}
    </section>
  )
};

export default MenuSection;
