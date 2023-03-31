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
    <article className="relative mb-6 flex w-full items-center rounded-xl bg-weekday-bg p-6 py-6">
      <h1
        style={{}}
        className="text-underline block h-[20px] w-[200px] -rotate-90 items-start rounded-lg bg-card-bg pb-10 text-center text-4xl font-medium text-white "
      >
        {weekDay}
      </h1>
      <main style={{}} className="flex flex-1  items-center gap-6">
        {weekDayMeals.map((meal) => {
          return <MenuCard key={meal.mealName} data={meal} />;
        })}
      </main>
    </article>
  );
};

export default DaySection;
