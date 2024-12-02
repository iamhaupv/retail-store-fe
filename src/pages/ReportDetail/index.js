import React, { PureComponent, useEffect, useState } from "react";
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
    const [sum, setSum] = useState({})
    const [date, setDate] = useState("2024-12-01")
    useEffect(() => {
      const fetchSum = async() => {
        try {
          const token = localStorage.getItem("accessToken")
          if(!token) throw new Error("Token is invalid!")
          const response = await apiOrder.apiSumTotalAmountByDate(token, {date})
          setSum(response.sum)
        } catch (error) {
          console.log("fetch sum is error", error);
          
        }
      }
      fetchSum()
    }, [])
    const data = [
      {
        name: "Page A",
        uv: 4000,
        pv: 2400,
        amt: 2400,
      },
      {
        name: "Page B",
        uv: 3000,
        pv: 1398,
        amt: 2210,
      },
      {
        name: "Page C",
        uv: 2000,
        pv: 9800,
        amt: 2290,
      },
      {
        name: "Page D",
        uv: 2780,
        pv: 3908,
        amt: 2000,
      },
      {
        name: "Page E",
        uv: 1890,
        pv: 4800,
        amt: 2181,
      },
      {
        name: "Page F",
        uv: 2390,
        pv: 3800,
        amt: 2500,
      },
      {
        name: "Page G",
        uv: 3490,
        pv: 4300,
        amt: 2100,
      },
    ];
    const [value, setValue] = useState({
        startDate: null,
        endDate: null,
      });
  
    return (
      <>
        <div
          className="w-11/12 h-screen bg-base-100 justify-center flex"
        >
          <div
            className="w-full card bg-white rounded-none mt-2  ml-2 mr-2 animate__animated animate__fadeInRight  "
            style={{
              height: "calc(100vh - 85px)",
            }}
          >
            <div className="w-full flex justify-between ">
              <h1 className="font-bold text-xl ml-2 mt-2">
                Biểu đồ báo cáo doanh thu
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
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={data}
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
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" stackId="a" fill="#8884d8" />
                <Bar dataKey="amt" stackId="a" fill="#82ca9d" />
                <Bar dataKey="uv" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </>
    );
  }

