import React from "react";

import { FastingDataType } from "@/lib/types";
import { organizeDataByDays } from "@/lib/utils";

import DaySection from "./components/DaySection/Presentational";
import MasonaryLayout from "@/components/shared/MasonaryLayout";
import useWindowSize from "@/lib/hooks/use-window-size";
import { log } from "console";

interface Props {
  fastingPlan: FastingDataType[];
}

const MenuSection: React.FC<Props> = ({ fastingPlan }) => {
  const data: [string, FastingDataType[]][] = organizeDataByDays(fastingPlan);

  return (
    <section id="menu" className="menu-section mx-auto w-[900px] pt-12">
      <MasonaryLayout columns={2} gap={40}>
        {data.map((dt, index) => {
          return (
            <DaySection key={index} weekDay={dt[0]} weekDayMeals={dt[1]} />
          );
        })}
      </MasonaryLayout>
    </section>
  );
};

export default MenuSection;
