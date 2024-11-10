import React, { useEffect, useState } from "react";
import moment from "moment";
export default function EmployeeSchedule() {
  const [selectedDate, setSelectedDate] = useState(moment());

  const handleDateChange = (event) => {
    setSelectedDate(moment(event.target.value));
  };

  const handlePrev = () => {
    setSelectedDate(selectedDate.clone().subtract(1, "week"));
  };

  const handleNext = () => {
    setSelectedDate(selectedDate.clone().add(1, "week"));
  };

  const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
    selectedDate.clone().startOf("isoWeek").add(i, "days")
  );
  const dayNames = [
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
    "Chủ nhật",
  ];
  return (
    <>
      <div
        className="w-11/12 h-sceen justify-center flex "
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div className="drawer drawer-end">
          <input
            id="UpdateDrawer-side"
            type="checkbox"
            className="drawer-toggle"
          />
          <div className="drawer-content overflow-x-hidden">
            <div class="w-full ml-2 mr-2 lg:flex lg:h-[calc(100vh-50px)] lg:flex-col animate__animated animate__fadeInRight ">
              <header class="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
                <h1 class="text-base font-semibold leading-6 text-gray-900">
                  {/* <time datetime="2022-01">January 2022</time> */}
                </h1>
                <div class="flex items-center">
                  <button
                    type="button"
                    className="btn w-28 justify-items-center border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-white "
                    onClick={handlePrev}
                  >
                    <svg
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Trở về
                  </button>
                  <button
                    type="button"
                    className="btn w-28 ml-4 justify-items-center  border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-white "
                    onClick={handleNext}
                  >
                    Tiếp
                    <svg
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <div class="hidden md:ml-4 md:flex md:items-center">
                    <div class="relative">
                      <input
                        type="date"
                        className="input border-2  rounded-md"
                        onChange={handleDateChange}
                      />
                    </div>
                    <div class="ml-6 h-6 w-px bg-gray-300"></div>
                    <label
                      htmlFor="UpdateDrawer-side"
                      class="btn ml-6 rounded-md btn-success px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
                    >
                      Thêm lịch
                    </label>
                  </div>
                </div>
              </header>

              <div class="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
                <div class="grid grid-cols-7  gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
                  {daysOfWeek.map((day, index) => (
                    <div class="justify-center bg-white py-2">
                      <div class="sr-only sm:not-sr-only">
                        {dayNames[index]}
                      </div>
                      <h1 class="sr-only sm:not-sr-only">
                        {day.format("DD/MM/YYYY")}
                      </h1>
                    </div>
                  ))}
                </div>
                <div class="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
                  <div class="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
                    {/*
                    Always include: "relative py-2 px-3"
                    Is current month, include: "bg-white"
                    Is not current month, include: "bg-white text-gray-500"
                    */}
                    {daysOfWeek.map((day, index) => (
                      <div
                        key={index}
                        class="relative bg-white px-3 py-2 text-gray-500 "
                        style={{
                          height: "calc(100vh - 564px)",
                        }}
                      >
                        {/*
                        Is today, include: "flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white"
                    */}
                        <time dateTime={day.format("YYYY-MM-DD")}>
                          7:30 - 12:30{" "}
                        </time>
                      </div>
                    ))}
                    {daysOfWeek.map((day, index) => (
                      <div key={index} class="relative bg-white px-3 py-2">
                        <time dateTime={day.format("YYYY-MM-DD")}>
                          12:30 - 17:30
                        </time>
                        <ol class="mt-2">
                          <li>
                            <a href="#" class="group flex">
                              <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                                Nguyễn Thanh Khoa
                              </p>
                            </a>
                          </li>
                        </ol>
                      </div>
                    ))}
                    {daysOfWeek.map((day, index) => (
                      <div key={index} class="relative bg-white px-3 py-2">
                        <time dateTime={day.format("YYYY-MM-DD")}>
                          17:30 - 22:30
                        </time>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="UpdateDrawer-side"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-white text-base-content min-h-full w-2/6 p-4">
              <h1 className="font-bold text-xl">Đơn vị tính</h1>
              <div className="flex justify-start items-center mt-3">
                <h1>Nhân viên:</h1>
                
              </div>
              <div className="flex justify-start items-center mt-2">
                <h1>Ca làm:</h1>
                <select className="select select-bordered w-full ml-2 max-w-xs">
                  <option disabled selected>
                    Chọn ca làm
                  </option>
                  <option>7:30 - 12:30</option>
                  <option>12:30 - 17:30</option>
                  <option>17:30 - 22:30</option>
                </select>
              </div>
              <button className=" btn btn-success text-white w-36 ml-80 mt-4 ">
                Thêm
              </button>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
