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
    <article className="pt-10">
      <hr style={{opacity:0.1}} className="bg-gray-200 dark:bg-gray-700 my-8 h-px border-1" />
      <h1 className="text-gray-900 py-4 pb-10 text-4xl font-medium text-underline">
        #{weekDay}
      </h1>
      <main className="grid max-w-4xl grid-cols-1 justify-center gap-6 sm:grid-cols-2   lg:max-w-none lg:grid-cols-2">
        {weekDayMeals.map((meal) => {
          return <MenuCard key={meal.mealName} data={meal} />;
        })}
      </main>
    </article>
  );
};

export default DaySection;
