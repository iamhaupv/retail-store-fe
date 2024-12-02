import React, { PureComponent, useCallback, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
//import renderActiveShape from "../../components/renderActiveShape/index"

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function PieChartCategory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  return (
    <>
      <div className="w-11/12 h-screen bg-base-100 justify-center flex">
        <div
          className="w-full card bg-white rounded-none mt-2  ml-2 mr-2 animate__animated animate__fadeInRight  "
          style={{
            height: "calc(100vh - 85px)",
          }}
        >
          <div className="w-full flex justify-between ">
            <h1 className="font-bold text-xl ml-2 mt-2">
              Biểu đồ top 5 loại sản phẩm bán chạy
            </h1>
            <div className="flex mt-2">
              <div className="flex items-center">
                <p className="w-20">Ngày lập:</p>
                <div className="w-72 mr-5 ml-1">
                  <Datepicker
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                  />
                </div>
              </div>
              <select className="select select-bordered w-40 mr-2">
                <option selected>Năm</option>
                <option>Tháng</option>
                <option>Ngày</option>
              </select>
            </div>
          </div>
          <div className="w-full">
          <PieChart width={800} height={800}>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx={450}
              cy={300}
              innerRadius={180}
              outerRadius={220}
              fill="#f13612"
              dataKey="value"
              onMouseEnter={onPieEnter}
            />
          </PieChart>
          </div>
        </div>
      </div>
    </>
  );
}
