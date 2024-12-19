import React, { useEffect, useState } from "react";
import moment from "moment";
import apiEmployee from "../../apis/apiEmployee";
import apiShift from "../../apis/apiShift";
import apiEmployeeShift from "../../apis/apiEmployeeShift";
export default function EmployeeSchedule() {
  const [shifts, setShifts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [emp_shi, setEmp_Shi] = useState([]);
  useEffect(() => {
    const fetchEmp_Shi = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("Token is invalid!");
        const response = await apiEmployeeShift.apiGetAllEmployeeShift(token);
        setEmp_Shi(response.emp_shi);
      } catch (error) {
        console.log("fetch Emp Shi", error);
      }
    };
    fetchEmp_Shi();
  }, []);
  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("Token is invalid!");
        const response = await apiShift.apiGetAllShifts(token);
        setShifts(response?.shifts);
      } catch (error) {
        console.log("fetch employees is error", error);
      }
    };
    fetchShifts();
  }, []);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("Token is invalid!");
        const response = await apiEmployee.apiGetListEmployee(token);
        setEmployees(response.data);
      } catch (error) {
        console.log("fetch employees is error", error);
      }
    };
    fetchEmployees();
  }, []);
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
  const shift = ["7:30 - 12:30", "12:30 - 17:30", "17:30 - 22:30"];
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
          <div className="drawer-content overflow-y-hidden overflow-x-hidden">
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
                    {/* {daysOfWeek.map((day, index) => (
                      <div
                        key={index}
                        class="relative bg-white px-3 py-2 text-gray-500 "
                        style={{
                          height: "calc(100vh - 564px)",
                        }}
                      >
                      
                        <time dateTime={day.format("YYYY-MM-DD")}>
                          7:30 - 12:30
                        </time>
                        {emp_shi.map((e) => (
                          <ol class="mt-2">
                          <li>
                            <a href="#" class="group flex">
                              <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                                {e?.shift?.name === "7:30 - 12:30" ? e?.employee?.name : "" }
                              </p>
                            </a>
                          </li>
                        </ol>
                        ))}
                      </div>
                    ))} */}
                    {daysOfWeek.map((day, index) => (
                      <div key={index} className="relative bg-white px-3 py-2">
                        <time dateTime={day.format("YYYY-MM-DD")}>
                          {/* Display shift 7:30 - 12:30 */}
                          <p>7:30 - 12:30</p>
                          {emp_shi
                            .filter(
                              (e) =>
                                e?.shift?.name === "7:30 - 12:30" &&
                                moment(e.start).isSameOrBefore(day, "day") &&
                                moment(e.end).isSameOrAfter(day, "day")
                            )
                            .map((e) => (
                              <ol key={e._id}>
                                <li>
                                  <a href="#" className="group flex">
                                    <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                                      {e?.employee?.name}
                                    </p>
                                  </a>
                                </li>
                              </ol>
                            ))}
                        </time>
                      </div>
                    ))}
                    {daysOfWeek.map((day, index) => (
                      <div key={index} className="relative bg-white px-3 py-2">
                        <time dateTime={day.format("YYYY-MM-DD")}>
                          {/* Display shift 12:30 - 17:30 */}
                          <p>12:30 - 17:30</p>
                          {emp_shi
                            .filter(
                              (e) =>
                                e?.shift?.name === "12:30 - 17:30" &&
                                moment(e.start).isSameOrBefore(day, "day") &&
                                moment(e.end).isSameOrAfter(day, "day")
                            )
                            .map((e) => (
                              <ol key={e._id}>
                                <li>
                                  <a href="#" className="group flex">
                                    <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                                      {e?.employee?.name}
                                    </p>
                                  </a>
                                </li>
                              </ol>
                            ))}
                        </time>
                      </div>
                    ))}
                    {daysOfWeek.map((day, index) => (
                      <div key={index} className="relative bg-white px-3 py-2">
                        <time dateTime={day.format("YYYY-MM-DD")}>
                          {/* Display shift 17:30 - 22:30 */}
                          <p>17:30 - 22:30</p>
                          {emp_shi
                            .filter(
                              (e) =>
                                e?.shift?.name === "17:30 - 22:30" &&
                                moment(e.start).isSameOrBefore(day, "day") &&
                                moment(e.end).isSameOrAfter(day, "day")
                            )
                            .map((e) => (
                              <ol key={e._id}>
                                <li>
                                  <a href="#" className="group flex">
                                    <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                                      {e?.employee?.name}
                                    </p>
                                  </a>
                                </li>
                              </ol>
                            ))}
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
              <h1 className="font-bold text-xl">Đăng ký ca làm</h1>
              <div className="flex justify-start items-center mt-3">
                <h1>Ngày làm:</h1>
                <input
                  type="date"
                  className=" ml-3 input border-2  rounded-md"
                />
              </div>
              <div className="flex justify-start items-center mt-3">
                <h1>Nhân viên:</h1>
                <select className="select select-bordered w-full ml-2 max-w-xs">
                  <option disabled selected>
                    Chọn nhân viên
                  </option>
                  {employees.map((employee) => (
                    <option key={employee?._id} value={employee._id}>
                      {employee.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-start items-center mt-2">
                <h1>Ca làm:</h1>
                <select className="select select-bordered w-full ml-7 max-w-xs">
                  <option disabled selected>
                    Chọn ca làm
                  </option>
                  {shifts?.map((shift) => (
                    <option key={shift?._id} value={shift?._id}>
                      {shift?.name}
                    </option>
                  ))}
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
