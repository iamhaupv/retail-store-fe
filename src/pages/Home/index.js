import "./Home.css";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import apiOrder from "../../apis/apiOrder";
import apiProduct from "../../apis/apiProduct";

export default function Home() {
  const [percen, setPercen] = useState({});
  const [year, setYear] = useState("2024");
  const [years, setYears] = useState([]);
  const [month, setMonth] = useState("11");
  const [months, setMonths] = useState([]);
  const [revenue, setRevenue] = useState({});
  const [productQuantity, setProductQuantity] = useState([]);
  const [product_out_of_stock, setProduct_out_of_stock] = useState([]);
  useEffect(() => {
    const fetchPercen = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiOrder.apiGetTotalAmountComparison(token);
      setPercen(response.comparison);
    };
    fetchPercen();
  }, []);
  useEffect(() => {
    const fetchProductOutOfStock = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiProduct.apiGetAllProduct_OUT_OF_STOCK(token);
      setProduct_out_of_stock(response.products);
    };
    fetchProductOutOfStock();
  }, []);
  useEffect(() => {
    const fetchProductQuantity = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiProduct.apiGetAllProduct(token);
      setProductQuantity(response.products);
    };
    fetchProductQuantity();
  }, []);
  useEffect(() => {
    const fetchRevenueCurrentDay = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiOrder.apiGetTotalAmountCurrentDay(token);
      setRevenue(response.total);
    };
    fetchRevenueCurrentDay();
  }, []);
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
  const handleChangeYear = (e) => {
    const value = e.target.value;
    setYear(value);
  };
  const handleChangeMonth = (e) => {
    const value = e.target.value;
    setMonth(value);
  };
  const transformedData = (arr) => {
    return arr.map((item) => ({
      ...item,
      month: item.month,
      totalVAT: item.totalVAT,
      total: item.totalAmount,
      totalImportPrice: item.totalImportPrice,
    }));
  };
  function roundNumber(value, decimalPlaces) {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(value * factor) / factor;
  }
  return (
    <>
      <div
        className="w-11/12 h-full justify-center flex  "
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div className=" w-full h-5/6 animate__animated animate__fadeInRight  ">
          <div className="flex w-full ">
            <div className=" w-1/3 h-2/6 card  bg-white rounded-xl top-7  ml-4 mr-4 ">
              <div className="w-full flex mt-3">
                <div className="w-2/3 ml-4">
                  <h1 className="font-semibold text-sm w-full text-slate-500 mt-4">
                    DOANH THU TRONG NGÀY
                  </h1>
                  <h1 className="font-bold text-xl w-full mt-1">
                    {revenue?.totalAmount?.toLocaleString()} VNĐ
                  </h1>
                </div>
                <div className="w-1/3 justify-end mt-2 flex pr-3">
                  <label className="btn btn-circle bg-orange-500 text-white ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6 "
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                      />
                    </svg>
                  </label>
                </div>
              </div>
              <h1 className="w-full flex ml-4 mt-4 mb-4">
                <h1 className={`${revenue?.totalAmount > 0 ? 'text-red-400 mr-1' : 'text-green-400 mr-1'}`}>
                  {revenue?.totalAmount > 0
                    ? +roundNumber(percen?.percentageChange?.totalAmount, 2)
                    : -roundNumber(percen?.percentageChange?.totalAmount, 2)}
                  %
                </h1>
                kể từ ngày hôm qua
              </h1>
            </div>
            <div className=" w-1/3 h-2/6 card  bg-white rounded-xl top-7  ml-4 mr-4 ">
              <div className="w-full flex mt-3">
                <div className="w-2/3 ml-4">
                  <h1 className="font-semibold text-sm w-full text-slate-500 mt-4">
                    SỐ LƯỢNG ĐƠN HÀNG
                  </h1>
                  <h1 className="font-bold text-xl w-full mt-1">
                    {revenue?.totalOrders}
                  </h1>
                </div>
                <div className="w-1/3 justify-end mt-2 flex pr-3">
                  <label className="btn btn-circle bg-yellow-400 text-white ml-16">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                  </label>
                </div>
              </div>
              <h1 className="w-full flex ml-4 mt-4 mb-4">
                <h1 className={`${revenue?.totalOrders > 0 ? 'text-red-400 mr-1' : 'text-green-400 mr-1'} `}>
                  {revenue?.totalOrders > 0 ? + roundNumber(percen?.percentageChange?.totalOrders, 2) : - revenue?.totalOrders}%
                </h1>
                kể từ ngày hôm qua
              </h1>
            </div>
            <div className=" w-1/3 h-2/6 card  bg-white rounded-xl top-7  ml-4 mr-4 ">
              <div className="w-full flex mt-3">
                <div className="w-2/3 ml-4">
                  <h1 className="font-semibold text-sm w-full text-slate-500 mt-4">
                    SẢN PHẨM
                  </h1>
                  <h1 className="font-bold text-xl w-full mt-1">
                    {productQuantity?.length}
                  </h1>
                </div>
                <div className="w-1/3 justify-end mt-2 flex pr-3">
                  <label className="btn btn-circle bg-blue-400 text-white ml-16">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                  </label>
                </div>
              </div>
              <h1 className="w-full flex ml-4 mt-4 mb-4">
                <h1 className="text-red-500 mr-1">
                  {product_out_of_stock?.length}
                </h1>
                sản phẩm hết hàng
              </h1>
            </div>
          </div>
          <div
            className="w-full  card  bg-white rounded-xl mt-12  ml-4 mr-4"
            style={{
              height: "calc(100vh - 270px)",
            }}
          >
            <div className="flex w-full justify-between">
              <h1 className="font-bold text-xl w-1/3 mt-2 ml-2">
                Tình hình kinh doanh
              </h1>
              <div className="flex">
                <div class="mr-4 flex items-center space-x-2">
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
                    <option value="">Chọn năm</option>
                    <option value="2020">2017</option>
                    <option value="2020">2018</option>
                    <option value="2020">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024" selected>
                      2024
                    </option>
                    {/* <option value="2025">2025</option> */}
                  </select>
                </div>
                <div class="mr-8 flex items-center space-x-2">
                  <label for="month" class="font-semibold text-gray-700">
                    Chọn tháng
                  </label>
                  <select
                    value={month}
                    onChange={handleChangeMonth}
                    id="month"
                    class="select select-bordered w-40 p-2 rounded-lg border-gray-300 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Chọn tháng</option>
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
                    <option value="12" selected>
                      Tháng 12
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div
              className="w-full justify-items-center mt-1 overflow-x-hidden"
              style={{
                height: "calc(100vh - 343px)",
              }}
            >
              {/* Kết thúc Chỉ báo Chú thích */}
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={350}
                  data={
                    month !== ""
                      ? transformedData(months)
                      : transformedData(years)
                  }
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="totalImportPrice"
                    name="Tiền vốn"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    name="Lợi nhuận"
                    stroke="#82ca9d"
                  />
                  <Line
                    type="monotone"
                    dataKey={(`totalAmount`).toLocaleString()}
                    name="Doanh thu"
                    stroke="red"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
