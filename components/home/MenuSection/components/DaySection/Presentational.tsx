import { FastingDataType, WeekdayMeals } from "@/lib/types";
import React from "react";
import MenuCard from "../MenuCard/Presentational";

interface DaySectionProps {
  weekDayMeals: FastingDataType[];
  weekDay: string;
}
const DaySection: React.FC<DaySectionProps> = (props) => {
  const { weekDayMeals, weekDay } = props;
  return (
    <article className="relative max-w-md text-3xl p-4 rounded-[30px] mx-auto"  style={{
      boxShadow: '#6BDAB1 0px 2px 4px;'
    }}>
      <h1
        className="text-center font-bold py-2 "
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
