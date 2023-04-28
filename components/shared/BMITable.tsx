import React from "react";

const BMITable = () => {
  const bmiData = [
    {
      index: "<18.5",
      status: "Underweight",
    },
    {
      index: "18.5-24.9",
      status: "Normal weight",
    },
    {
      index: "25.0-29.9",
      status: "Overweight",
    },
    {
      index: "30.0-34.9",
      status: "Obesity class I",
    },
    {
      index: "35.0-39.0",
      status: "Obesity class II",
    },
    {
      index: ">40",
      status: "Obesity class III",
    },
  ];
  return (
    <div className="relative  shadow-md sm:rounded-lg overflow-scroll w-[300px] md:w-[600px]">
      <table className="w-full text-left text-xs text-gray-500 min-w-[600px] ">
        <tbody>
          <tr className="border-b bg-white ">
            <th
              scope="row"
              className="whitespace-nowrap px-3 py-2 font-medium text-gray-900 "
            >
              BMI INDEX
            </th>

            {bmiData.map((dt) => {
              return (
                <td key={dt.index} className="px-3 py-2">
                  {dt.index}
                </td>
              );
            })}
          </tr>
          <tr className="border-b bg-white ">
            <th
              scope="row"
              className="whitespace-nowrap px-3 py-2 font-medium text-gray-900 "
            >
              Meaning
            </th>
            {bmiData.map((dt) => {
              return (
                <td key={dt.index} className="px-3 py-2">
                  {dt.status}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BMITable;
