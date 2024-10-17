import React from "react";
import CategoryTableDetail from "../../components/CategoryTableDetail";

export default function Category() {
  return (
    <>
      <div
        className="w-11/12 h-full justify-center flex  "
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div className="w-full h-5/6 card bg-white rounded-md top-7 grid ml-4 mr-4 animate__animated animate__fadeInRight  ">
          <div className="flex mt-5 w-full h-1/6 justify-end">
            <button className="btn btn-success text-white w-36 mr-3">
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
          </div>
          <div class="h-5/6 overflow-y-auto">
            <table class="table h-full table-pin-rows">
              <thead>
                <tr>
                  <th>Đơn vị tính</th>
                  <th>Số lượng quy đổi</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <CategoryTableDetail />
                <CategoryTableDetail />
                <CategoryTableDetail />
                <CategoryTableDetail />
                <CategoryTableDetail />
                <CategoryTableDetail />
                <CategoryTableDetail />
                <CategoryTableDetail />
                <CategoryTableDetail />
                <CategoryTableDetail />
                <CategoryTableDetail />
                <CategoryTableDetail />
                <CategoryTableDetail />
                <CategoryTableDetail />
                <CategoryTableDetail />
                <CategoryTableDetail />
                <CategoryTableDetail />
                <CategoryTableDetail />
                <CategoryTableDetail />
                <CategoryTableDetail />
                <CategoryTableDetail />
                <CategoryTableDetail />
                <CategoryTableDetail />
                <CategoryTableDetail />
                <CategoryTableDetail />
                <CategoryTableDetail />
                <CategoryTableDetail />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
