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
    <article className="pt-6">
      <h1 className="py-4" style={{ fontWeight: "bold", fontSize: 40, }}>{weekDay}</h1>
      <main className="flex justify-around">
        {weekDayMeals.map((meal) => {
          return <MenuCard key={meal.mealName} data={meal} />;
        })}
      </main>
    </article>
  );
};

export default DaySection;
