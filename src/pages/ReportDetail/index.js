import React, { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import apiOrder from "../../apis/apiOrder";

export default function ReportDetail() {
  const [value, setValue] = useState({ startDate: null, endDate: null });
  const [year, setYear] = useState("2024");
  const [years, setYears] = useState([]);
  const [month, setMonth] = useState("11");
  const [months, setMonths] = useState([]);
  useEffect(() => {
    const fetchSumTotalAmountByMonth = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("Token is invalid!");
        const response = await apiOrder.apiSumTotalAmountByMonth(token, {
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
    const fetchSum = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("Token is invalid!");
        const response = await apiOrder.apiSumTotalAmountByYear(token, {
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
    fetchSum();
  }, [year]);
  // const transformedData = years.map((item) => ({
  //   ...item,
  //   month: item.month,
  //   totalVAT: item.totalVAT,
  //   total: item.totalAmount,
  //   totalImportPrice: item.totalImportPrice
  // }));
  const transformedData = (arr) => {
    return arr.map((item) => ({
      ...item,
      month: item.month,
      totalVAT: item.totalVAT,
      total: item.totalAmount,
      totalImportPrice: item.totalImportPrice,
    }));
  };
  // const transformedDataMonth = months.map((item) => ({
  //   ...item,
  //   month: item.month,
  //   totalVAT: item.totalVAT,
  //   total: item.totalAmount,
  //   totalImportPrice: item.totalImportPrice
  // }));
  const customTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const { total, totalImportPrice } = payload[0].payload;
      const revenue = total - totalImportPrice;
      return (
        <div className="p-2 bg-white border rounded shadow">
          <p className="font-bold">{label}</p>
          <p>{`Lợi nhuận: ${revenue.toLocaleString()} VNĐ`}</p>
          <p>{`Tiền vốn: ${totalImportPrice.toLocaleString()} VNĐ`}</p>
          <p>{`Tổng doanh thu: ${total.toLocaleString()} VNĐ`}</p>
        </div>
      );
    }
    return null;
  };
  const handleChangeYear = (e) => {
    const value = e.target.value;
    setYear(value);
  };
  const handleChangeMonth = (e) => {
    const value = e.target.value;
    setMonth(value);
  };
  return (
    <div className="w-11/12 h-screen bg-base-100 justify-center flex">
      <div
        className="w-full card bg-white rounded-none mt-2 ml-2 mr-2 animate__animated animate__fadeInRight"
        style={{ height: "calc(100vh - 85px)" }}
      >
        <div className="w-full flex justify-between">
          <h1 className="font-bold text-xl ml-2 mt-2">
            Biểu đồ báo cáo doanh thu
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
            {/* <select className="select select-bordered w-40 mr-2">
              <option selected>Năm</option>
              <option>Tháng</option>
              <option>Ngày</option>
            </select> */}
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

        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={month !== "" ? transformedData(months) : transformedData(years)}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={customTooltip} />
            <Legend />
            <Bar dataKey="totalAmount" name={"Tiền vốn"} stackId="a" fill="#8884d8" />
            <Bar dataKey="totalImportPrice" name={"Lợi nhuận"} stackId="a" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
