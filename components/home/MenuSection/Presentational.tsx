import React, { useState } from "react";

import { FastingDataType } from "@/lib/types";
import { organizeDataByDays } from "@/lib/utils";

import DaySection from "./components/DaySection/Presentational";
import MasonaryLayout from "@/components/shared/MasonaryLayout";
import useWindowSize from "@/lib/hooks/use-window-size";
import { log } from "console";
import { MenuSectionContentInterface, MenuSectionContext } from "./context/MenuSectionContext";

interface Props {
  fastingPlan: FastingDataType[];
}

const MenuSection: React.FC<Props> = ({ fastingPlan }) => {
  const data: [string, FastingDataType[]][] = organizeDataByDays(fastingPlan);
  const [modalIsOpen,setModalIsOpen]=useState(false)
  const {isMobile}=useWindowSize();
  const initialContext:MenuSectionContentInterface={modalIsOpen,setModalIsOpen}

  return (
    <section id="menu" className="menu-section mx-auto w-full lg:w-[900px] pt-2 md:pt-12">
      <MenuSectionContext.Provider value={initialContext}>
      <MasonaryLayout columns={isMobile ? 1 : 2} gap={40}>
        {data.map((dt, index) => {
          return (
            <DaySection key={index} weekDay={dt[0]} weekDayMeals={dt[1]} />
          )
        })}
      </MasonaryLayout>
      </MenuSectionContext.Provider>
    </section>
  )
}

export default MenuSection;
