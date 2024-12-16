import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiOrder from "../../apis/apiOrder";

export default function Report2Product() {
  const [selectedRange, setSelectedRange] = useState("7"); 
  const [weeks, setWeeks] = useState([])
  const [months, setMonths] = useState([])
  const [years, setYears] = useState([])
  const fetchData = async (range) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      
      let response;
      if (range === "7") {
        response = await apiOrder.apiTop5ProductLast7Days(token);
        setWeeks(response?.total || []);
      } else if (range === "30") {
        response = await apiOrder.apiTop5ProductLast30Days(token);
        setMonths(response?.total || []);
      } else if (range === "365") {
        response = await apiOrder.apiTop5ProductLast365Days(token);
        setYears(response?.total || []);
      }
    } catch (error) {
      console.log("fetch sum is error", error);
    }
  };
  useEffect(() => {
    fetchData(selectedRange);
  }, [selectedRange]);
  const handleDateChange = (event) => {
    setSelectedRange(event.target.value);
  };
  let dataToDisplay = [];
  if (selectedRange === "7") {
    dataToDisplay = weeks;
  } else if (selectedRange === "30") {
    dataToDisplay = months;
  } else if (selectedRange === "365") {
    dataToDisplay = years;
  }
  
  return (
    <>
      <div className="overflow-x-auto">
        <div className="w-full flex justify-between items-center">
          <h1 className="w-full flex items-center justify-start">
            Hiển thị trong{" "}
            <select value={selectedRange} onChange={handleDateChange}  class="select select-bordered w-32 select-sm ml-2 mr-2 mb-2">
              <option value="7" selected>7 ngày</option>
              <option value="30">30 ngày</option>
              <option value="365">365 ngày</option>
            </select>
            (so sánh với lần báo cáo trước đó)
          </h1>
          <Link to="/pieChartProduct" state={{dataToDisplay, selectedRange}}>
            <button
              className="btn w-36 mt-5"
              style={{ backgroundColor: "#e5edf8", color: "#2f80ed" }}
            >
              Xem biểu đồ
            </button>
          </Link>
        </div>
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Mã sản phẩm</th>
              <th>Sản phẩm</th>
              <th>Số lượng đã bán</th>
              <th>Tổng doanh thu</th>
            </tr>
          </thead>
          <tbody>
            {dataToDisplay.slice(0, 5).map((week)=> (
              <tr key={week._id}>
              <th>{week.id}</th>
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="mask mask-squircle h-12 w-12">
                      <img
                        src={`${week.image}`}
                        alt="Avatar product"
                      />
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">{week.title}</div>
                    {/* <div class="text-sm opacity-50">United States</div> */}
                  </div>
                </div>
              </td>
              <td>
                <div className="lg:tooltip" data-tip="Tăng 13 Sản phẩm">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-4 text-green-400 mr-1"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                      />
                    </svg>
                    {week.totalQuantity}
                  </div>
                </div>
              </td>
              <td>
                <div className="lg:tooltip" data-tip="Tăng 13.000 đ">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-4 text-green-400 mr-1"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                      />
                    </svg>
                    {week.totalAmount.toLocaleString()} VNĐ
                  </div>
                </div>
              </td>
            </tr>
            ))}
          </tbody>
          
        </table>
      </div>
    </>
  );
}
