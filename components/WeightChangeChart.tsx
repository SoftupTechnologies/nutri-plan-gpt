import useWindowSize from "@/lib/hooks/use-window-size";
import classNames from "classnames";
import ReactEcharts from "echarts-for-react";

interface LineChartProps {
  weights: {
    target: number;
    current: number;
  };
  period: number;
}

export default function WeightChangeChart({ weights, period }: LineChartProps) {
  const { intermediateWeights, months } = generateIntermediateWeights(
    weights.target,
    weights.current,
    period,
  );

  const chartOptions = {
    title: {
      text: "Weights",
      subtext: "How your weight will change",
      subtextStyle: {
        marginBottom: 30, // Set the margin top to 30 pixels
      },
    },
    grid: {
      top: 80, // Set the top padding to 80 pixels
    },
    xAxis: {
      show: true,
      type: "category",
      axisLabel: {
        align: "center", // set align property to center
      },
      data: months,
      splitLine: {
        show: false, // set show to false to remove horizontal lines
      },
    },
    tooltip: {
      showContent: true,
      trigger: "axis",
      formatter: function (params: any) {
        var tooltipText = ""; // initialize tooltip text
        tooltipText +=
          "Weight: " +
          '<span style="color:green; font-weight:bold;">' +
          params[0].value +
          " kg" +
          "</span>" +
          "<br>"; // add y-axis value
        return tooltipText;
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: function (value: any) {
          // callback function to format label
          // add a prefix to the label, such as a currency symbol
          let suffix = " kg";
          // format the label to display 2 decimal places
          let formattedValue = value;
          // return the formatted label with the prefix
          return formattedValue + suffix;
        },
      },
      splitLine: {
        show: false, // set show to false to remove horizontal lines
      },
      min: weights.current - 30, // set the minimum value of the y-axis
      interval: 10,
      max: weights.current + 30,
    },
    series: [
      {
        type: "line",
        data: intermediateWeights,
        smooth: true,
        showSymbol: true,
        smoothMonotone: "x",
        itemStyle: {
          borderWidth: 10,
          color: "#21b78a", // set the color of the line
        },
        lineStyle: {
          width: 5,
        },
        symbolSize: 10, // set the symbol size to 10 pixels
      },
    ],
  };

  const { isMobile } = useWindowSize();
  return (
    <div className={classNames("", isMobile ? "" : "w-[600px]")}>
      <ReactEcharts
        style={{ width: isMobile ? 300 : 600, height: 300 }}
        lazyUpdate={false}
        option={chartOptions}
      />
    </div>
  );
}

export const generateIntermediateWeights = (
  targetWeight: number,
  weight: number,
  period: number,
) => {
  let intermediateWeights = [Math.round(weight)];
  const result = getMonths(period);

  if (period > 0) {
    const interval = (weight - targetWeight) / period;

    for (let i = 1; i < period; i++) {
      const nextWeight = Math.round(weight - i * interval);
      intermediateWeights.push(nextWeight);
    }
  }

  intermediateWeights.push(Math.round(targetWeight));
  return {
    intermediateWeights,
    months: result,
  };
};

export const getMonths = (period: number) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentMonth = new Date().getMonth();
  const result = [months[currentMonth]];
  let nextMonth = currentMonth + 1;

  for (let i = 1; i <= period; i++) {
    if (nextMonth > 11) {
      nextMonth = 0;
    }
    result.push(months[nextMonth]);
    nextMonth++;
  }
  return result;
};
