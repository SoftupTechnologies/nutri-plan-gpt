import { FastingDataType, WeekdayMeals } from "@/lib/types";
import React, { useContext } from "react";
import MenuCard from "../MenuCard/Presentational";
import { MenuSectionContext } from "../../context/MenuSectionContext";
import cn from "classnames";

interface DaySectionProps {
  weekDayMeals: FastingDataType[];
  weekDay: string;
}
const DaySection: React.FC<DaySectionProps> = (props) => {
  const { weekDayMeals, weekDay } = props;
  const {modalIsOpen}=useContext(MenuSectionContext) 
  return (
    <article className="relative max-w-md p-4 rounded-[30px] mx-auto shadow-md shadow-[#6BDAB1]" >
      <h1
        className={cn("text-center font-bold py-2 text-xl md:text-3xl", modalIsOpen ? 'blur' : '')}
      >
        {weekDay}
      </h1>
      <main className="flex flex-col gap-6">
        {weekDayMeals.map((meal) => {
          return <MenuCard key={meal.mealName} data={meal} />;
        })}
      </main>
    </article>
  );
};

export default DaySection;
