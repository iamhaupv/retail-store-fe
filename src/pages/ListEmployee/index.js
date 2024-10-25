import React from "react";
import { Link } from "react-router-dom";
import EmployeeTableDetail from "../../components/EmployeeTableDetail";
import Autocomplete from "../../components/AutoComplete";

export default function ListEmployee() {
  const suggestions = [
    "Nguyễn Thanh Khoa",
    "Phạm Văn Hậu",
    "Nguyễn Đức Long",
    "Lê Trọng Nghĩa",
  ];
  return (
    <>
      <div
        className="w-11/12 h-sceen justify-center flex"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div className="w-11/12 animate__animated animate__fadeInRight">
          <div className="card bg-white rounded-none top-7 grid  ">
            {/* search Input */}
            <div className="ml-4 mt-4 w-4/12">
                <Autocomplete suggestions={suggestions} placeholder="Tên nhân viên.."/>
            </div>
            {/* Nofication and Button Add */}

            <div className="flex justify-between mt-6 items-center">
              <h4 className="font-bold text-xl w-32 ml-4">30 Nhân viên</h4>
              <Link to="/employee">
                <button className="btn btn-success text-white w-36 mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  Thêm mới
                </button>
              </Link>
            </div>
            {/* table Product */}

            <div className="overflow-y-auto h-96 mt-7">
              <table className="table table-pin-rows">
                {/* head */}
                <thead>
                  <tr>
                    <th>Mã nhân viên</th>
                    <th>Tên nhân viên</th>
                    <th>Email</th>
                    <th>Số điện thoại</th>
                    <th>Địa chỉ</th>
                    <th>Ngày sinh</th>
                    <th>Giới tính</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <EmployeeTableDetail/>      
                </tbody>
                <tfoot>
                  <tr></tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
