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
const data = [
  {
    name: "Tháng 1",
    DoanhThuTruocDo: 4000,
    TienVon: 2400,
    LoiNhuan: 2400,
  },
  {
    name: "Tháng 2",
    DoanhThuTruocDo: 3000,
    TienVon: 1398,
    LoiNhuan: 2210,
  },
  {
    name: "Tháng 3",
    DoanhThuTruocDo: 2000,
    TienVon: 9800,
    LoiNhuan: 2290,
  },
  {
    name: "Tháng 4",
    DoanhThuTruocDo: 2780,
    TienVon: 3908,
    LoiNhuan: 2000,
  },
  {
    name: "Tháng 5",
    DoanhThuTruocDo: 1890,
    TienVon: 4800,
    LoiNhuan: 2181,
  },
  {
    name: "Tháng 6",
    DoanhThuTruocDo: 2390,
    TienVon: 3800,
    LoiNhuan: 2500,
  },
  {
    name: "Tháng 7",
    DoanhThuTruocDo: 3490,
    TienVon: 4300,
    LoiNhuan: 2100,
  },
  {
    name: "Tháng 8",
    DoanhThuTruocDo: 3490,
    TienVon: 4300,
    LoiNhuan: 2100,
  },
  {
    name: "Tháng 9",
    DoanhThuTruocDo: 3490,
    TienVon: 4300,
    LoiNhuan: 2100,
  },
  {
    name: "Tháng 10",
    DoanhThuTruocDo: 3490,
    TienVon: 4300,
    LoiNhuan: 2100,
  },
  {
    name: "Tháng 11",
    DoanhThuTruocDo: 3490,
    TienVon: 4300,
    LoiNhuan: 2100,
  },
  {
    name: "Tháng 12",
    DoanhThuTruocDo: 3490,
    TienVon: 4300,
    LoiNhuan: 2100,
  },
];

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
        name: "Tháng 1",
        DoanhThuTruocDo: 4000,
        TienVon: 2400,
        LoiNhuan: 2000,
      },
      {
        name: "Tháng 2",
        DoanhThuTruocDo: 3000,
        TienVon: 1398,
        LoiNhuan: 1111,
      },
      {
        name: "Tháng 3",
        DoanhThuTruocDo: 2000,
        TienVon: 9800,
        LoiNhuan: 14255,
      },
      {
        name: "Tháng 4",
        DoanhThuTruocDo: 2780,
        TienVon: 3908,
        LoiNhuan: 74155,
      },
      {
        name: "Tháng 5",
        DoanhThuTruocDo: 1890,
        TienVon: 4800,
        LoiNhuan: 741,
      },
      {
        name: "Tháng 6",
        DoanhThuTruocDo: 2390,
        TienVon: 3800,
        LoiNhuan: 744,
      },
      {
        name: "Tháng 7",
        DoanhThuTruocDo: 3490,
        TienVon: 4300,
        LoiNhuan: 7777,
      },
      {
        name: "Tháng 8",
        DoanhThuTruocDo: 3490,
        TienVon: 4300,
        LoiNhuan: 144,
      },
      {
        name: "Tháng 9",
        DoanhThuTruocDo: 3490,
        TienVon: 4300,
        LoiNhuan: 741,
      },
      {
        name: "Tháng 10",
        DoanhThuTruocDo: 3490,
        TienVon: 4300,
        LoiNhuan: 744,
      },
      {
        name: "Tháng 11",
        DoanhThuTruocDo: 3490,
        TienVon: 4300,
        LoiNhuan: 74125,
      },
      {
        name: "Tháng 12",
        DoanhThuTruocDo: 3490,
        TienVon: 4300,
        LoiNhuan: 7451,
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
                <Bar dataKey="TienVon" stackId="a" fill="#8884d8" />
                <Bar dataKey="LoiNhuan" stackId="a" fill="#82ca9d" />
                <Bar dataKey="DoanhThuTruocDo" fill="#ffc658"  />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </>
    );
  }

