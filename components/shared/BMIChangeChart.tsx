import React from "react";
import ReactEcharts from "echarts-for-react";
import { generateIntermediateWeights } from "../WeightChangeChart";
import BMITable from "./BMITable";
import useWindowSize from "@/lib/hooks/use-window-size";
import classNames from "classnames";

interface LineChartProps {
  weights: {
    current: number;
    target: number;
  };
  period: number;
  height: number;
}

const BMIChangeChart: React.FC<LineChartProps> = ({
  weights,
  period,
  height,
}) => {
  const { intermediateWeights, months } = generateIntermediateWeights(
    weights.target,
    weights.current,
    period,
  );

  const bmiRange = calculateBMI(intermediateWeights, height);

  const option = {
    title: {
      text: "BMI",
      subtext: "How your BMI will change",
      subtextStyle: {
        marginBottom: 30,
      },
    },
    grid: {
      top: 80,
    },
    xAxis: {
      type: "category",
      data: months,
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: false,
      },
      min: 10,
      interval: 4,
    },
    series: [
      {
        data: bmiRange,
        name: "bmi",
        type: "bar",
        barWidth: 30,
        color: ["#21b78a"],
        label: {
          show: true,
          position: "top",
        },
        itemStyle: {
          label: {
            show: true,
            position: "top",
          },
        },
      },
    ],
  };

  const { isMobile } = useWindowSize();

  return (
    <div
      className={classNames(
        "relative flex pb-12 pt-12",
        isMobile ? "flex-col" : "flex-col",
        " justify-center",
      )}
    >
      <ReactEcharts
        style={{ width: isMobile ? 300 : 600, height: 300 }}
        lazyUpdate={false}
        option={option}
      />
      <BMITable />
    </div>
  );
};

export default BMIChangeChart;

const calculateBMI = (weights: number[], height: number) => {
  const heightToM = height / 100;

  const BMIs = weights.map((weight) => {
    const bmi = weight / heightToM ** 2;
    return bmi.toFixed(1);
  });

  return BMIs;
};
