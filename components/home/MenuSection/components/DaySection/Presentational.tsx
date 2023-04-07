import React, { useContext } from "react";
import cn from "classnames";
import { FastingDataType } from "@/lib/types";
import MenuCard from "../MenuCard/Presentational";
import { GlobalContext } from "context/GlobalContext";

interface DaySectionProps {
  weekDayMeals: FastingDataType[];
  weekDay: string;
}
const DaySection: React.FC<DaySectionProps> = (props) => {
  const { weekDayMeals, weekDay } = props;
  const { modalIsOpen } = useContext(GlobalContext);
  return (
    <article className="relative mx-auto max-w-md rounded-[30px] p-4 shadow-md shadow-[#6BDAB1]">
      <h1
        className={cn(
          "py-2 text-center text-xl font-bold md:text-3xl",
          modalIsOpen ? "blur" : "",
        )}
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
