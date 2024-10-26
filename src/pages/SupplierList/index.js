import React from "react";
import SupplyTableDetail from "../../components/SupplyTableDetail";
import { Link } from "react-router-dom";
import Autocomplete from "../../components/AutoComplete";

export default function SupplierList() {
  const suggestion = [
    { id: 1, name: "Thùng 24 " },
    { id: 2, name: "Thùng 30" },
    { id: 3, name: "Lốc" },
    { id: 4, name: "Chai" },
    { id: 5, name: "Devon Webb" },
    { id: 6, name: "Nguyễn Thanh Khoa" },
    { id: 7, name: "Nguyễn Đức Long" },
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
                <Autocomplete suggestion={suggestion} placeholder="Tìm kiếm"/>
            </div>
            {/* Nofication and Button Add */}

            <div className="flex justify-between mt-6 items-center">
              <h4 className="font-bold text-xl w-32 ml-4"></h4>
              <Link to="/supply">
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
                    <th>Modal</th>
                    <th>Thương hiệu</th>
                    <th>Địa chỉ</th>
                    <th>Số điện thoại</th>
                    <th>Tên nhà cung cấp</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <SupplyTableDetail />
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
