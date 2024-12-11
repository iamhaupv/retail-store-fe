import React, { useCallback, useEffect, useState } from "react";
import { PieChart, Pie, Sector } from "recharts";
import apiOrder from "../../apis/apiOrder";

export default function PieChartProduct() {
  const [year, setYear] = useState("2024");
  const [years, setYears] = useState([]);
  const [month, setMonth] = useState("11");
  const [months, setMonths] = useState([]);
  useEffect(() => {
    const fetchSumTotalAmountByMonth = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("Token is invalid!");
        const response = await apiOrder.apiTop5ProductMonth(token, {
          month,
          year,
        });
        if (Array.isArray(response?.total)) {
          setMonths(response.total);
        } else {
          setMonths([]);
        }
      } catch (error) {
        console.log("fetch sum is error", error);
      }
    };
    fetchSumTotalAmountByMonth();
  }, [month, year]);
  useEffect(() => {
    const fetchSumTotalAmountByMonth = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("Token is invalid!");
        const response = await apiOrder.apiTop5ProductYear(token, {
          year,
        });
        if (Array.isArray(response?.total)) {
          setYears(response.total);
        } else {
          setYears([]);
        }
      } catch (error) {
        console.log("fetch sum is error", error);
      }
    };
    fetchSumTotalAmountByMonth();
  }, [year]);

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
  const transformedData = (arr) => {
    return arr.map((item) => ({
      ...item,
      month: item.month,
      totalVAT: item.totalVAT,
      total: item.totalAmount,
      totalImportPrice: item.totalImportPrice,
    }));
  };
  const handleChangeYear = (e) => {
    const value = e.target.value;
    setYear(value);
  };
  const handleChangeMonth = (e) => {
    const value = e.target.value;
    setMonth(value);
  };
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
        >{`Số lượng ${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Tỷ lệ ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };
  
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
                Biểu đồ top 5 sản phẩm bán chạy
              </h1>
              <div className="flex mt-2">
                {/* <div className="flex items-center">
                  <p className="w-20">Ngày lập:</p>
                  <div className="w-72 mr-5 ml-1">
                    <Datepicker
                      value={value}
                      onChange={(newValue) => setValue(newValue)}
                    />
                  </div>
                </div> */}
                <div class="flex items-center space-x-2">
              <label for="year" class="font-semibold text-gray-700">
                Chọn năm
              </label>
              <select
                name="year"
                value={year}
                onChange={handleChangeYear}
                id="year"
                class="select select-bordered w-40 p-2 rounded-lg border-gray-300 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">
                  Chọn năm
                </option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024" selected>2024</option>
                {/* <option value="2025">2025</option> */}
              </select>
            </div>

            <div class="flex items-center space-x-2">
              <label for="month" class="font-semibold text-gray-700">
                Chọn tháng
              </label>
              <select
                value={month}
                onChange={handleChangeMonth}
                id="month"
                class="select select-bordered w-40 p-2 rounded-lg border-gray-300 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">
                  Chọn tháng
                </option>
                <option value="1">Tháng 1</option>
                <option value="2">Tháng 2</option>
                <option value="3">Tháng 3</option>
                <option value="4">Tháng 4</option>
                <option value="5">Tháng 5</option>
                <option value="6">Tháng 6</option>
                <option value="7">Tháng 7</option>
                <option value="8">Tháng 8</option>
                <option value="9">Tháng 9</option>
                <option value="10">Tháng 10</option>
                <option value="11">Tháng 11</option>
                <option value="12" selected>Tháng 12</option>
              </select>
            </div>
              </div>
            </div>
          <PieChart width={800} height={800}>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={month !== "" ? transformedData(months) : transformedData(years)}
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
    </>
  );
}
