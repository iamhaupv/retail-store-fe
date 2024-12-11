
import React, { useState } from "react";

// Hàm format ngày thành "YYYY-MM-DD"
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Hàm lấy danh sách các ngày trong tuần (thứ 2 - chủ nhật)
const getWeekDays = (date) => {
  const monday = new Date(date);
  const dayOfWeek = monday.getDay(); // 0: Chủ nhật, 1: Thứ hai, ..., 6: Thứ bảy
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Điều chỉnh để về thứ 2
  monday.setDate(monday.getDate() + diff);

  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    days.push(day);
  }
  return days;
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7); // Lùi 7 ngày
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7); // Tiến 7 ngày
    setCurrentDate(newDate);
  };

  const weekDays = getWeekDays(currentDate);

  return (
    <div className="w-64 p-2 bg-white rounded-lg shadow-md text-center">
      <div className="mb-2">
        <h2 className="text-sm font-medium text-gray-700">
          Tuần: {formatDate(weekDays[0])} - {formatDate(weekDays[6])}
        </h2>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day, index) => (
          <div key={index} className="text-xs text-gray-600">
            {formatDate(day)}
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <button
          onClick={handlePrevWeek}
          className="px-2 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none text-xs"
        >
          Trở về
        </button>
        <button
          onClick={handleNextWeek}
          className="px-2 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none text-xs"
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
};

export default Calendar;
