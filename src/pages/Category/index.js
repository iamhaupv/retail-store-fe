import React from "react";
import CategoryTableDetail from "../../components/CategoryTableDetail";

export default function Category() {
  return (
    <>
      <div
        className="w-11/12 h-full justify-center flex  "
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div className="drawer drawer-end">
          <input
            id="UpdateDrawer-side"
            type="checkbox"
            className="drawer-toggle"
          />
          <div className="drawer-content">
            <div className="w-full h-5/6 card bg-white rounded-md top-7 grid ml-4 mr-4 animate__animated animate__fadeInRight  ">
              <div className="flex mt-5 w-full h-1/6 justify-end">
                <label
                  htmlFor="UpdateDrawer-side"
                  className="drawer-button btn btn-success text-white w-36 mr-9"
                >
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
                </label>
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
          <div className="drawer-side">
            <label
              htmlFor="UpdateDrawer-side"
              aria-label="close sidebar"
              className="drawer-overlay "
            ></label>
            <ul className="menu  bg-white text-base-content min-h-full w-2/6 p-4">
              {/* Sidebar content here */}
              <h1 className="font-bold text-xl">Đơn vị tính</h1>
              <div className="flex justify-start items-center mt-3">
                  <h1>Đơn vị tính:</h1>
                  <input type="text" className=" input w-80 h-8 ml-16 input-bordered  rounded-sm" />
              </div>
              <div className="flex justify-start items-center mt-2">
                  <h1>Số lượng quy đổi:</h1>
                  <input type="number" className="input w-80 h-8 ml-6 input-bordered  rounded-sm"/>
              </div>
              <label
                  htmlFor="UpdateDrawer-side"
                  aria-label="close sidebar"
                  className="btn btn-success text-white w-36 ml-80 mt-4"
                >
                  Lưu
                </label>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
