import React from "react";
import "./Home.css";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
export default function Home() {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        data: [65, 59, 70, 56, 55, 40],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Line Chart Example',
      },
    },
  };
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
                    30.756.000 VNĐ
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
                <h1 className="text-green-400 mr-1">+55%</h1>
                kể từ ngày hôm qua
              </h1>
            </div>
            <div className=" w-1/3 h-2/6 card  bg-white rounded-xl top-7  ml-4 mr-4 ">
              <div className="w-full flex mt-3">
                <div className="w-2/3 ml-4">
                  <h1 className="font-semibold text-sm w-full text-slate-500 mt-4">
                    SỐ LƯỢNG ĐƠN HÀNG
                  </h1>
                  <h1 className="font-bold text-xl w-full mt-1">3.421</h1>
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
                <h1 className="text-green-400 mr-1">+35%</h1>
                kể từ ngày hôm qua
              </h1>
            </div>
            <div className=" w-1/3 h-2/6 card  bg-white rounded-xl top-7  ml-4 mr-4 ">
              <div className="w-full flex mt-3">
                <div className="w-2/3 ml-4">
                  <h1 className="font-semibold text-sm w-full text-slate-500 mt-4">
                    SẢN PHẨM
                  </h1>
                  <h1 className="font-bold text-xl w-full mt-1">3.421</h1>
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
                <h1 className="text-red-500 mr-1">15</h1>
                sản phẩm hết hàng
              </h1>
            </div>
          </div>
          <div className="w-full h-4/6 ">
            <div className=" card  bg-white rounded-xl mt-12  ml-4 mr-4">
              <div className="flex w-full justify-between">
                <h1 className="font-bold text-xl w-1/3 mt-2 ml-2">
                  Tình hình kinh doanh
                </h1>
                <select className="select select-bordered w-40 mt-2 mr-2">
                  <option selected>Tháng</option>
                  <option>Năm</option>
                  <option>Quý</option>
                </select>
              </div>
              <div className="w-full h-2/3 justify-center">
              <Line data={data} options={options}  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
