import React, { useState } from "react";

export default function Report() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  return (
    <>
      <div
        className="w-11/12 h-screen justify-center flex"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div className="w-full animate__animated animate__fadeInRight  ml-2 mr-2 ">
          <div
            className=" w-full card bg-white rounded-none mt-2 "
            style={{
              height: "calc(100vh - 490px)",
            }}
          >
            <div className="w-full flex justify-between"> 
            <h1 className="font-bold text-xl mt-5 ml-4">Báo cáo doanh thu</h1>
            <button className="btn w-36 mr-2 mt-5" style={{ backgroundColor: "#e5edf8", color: "#2f80ed" }}>Xem biểu đồ</button>
            </div>
            <div className="w-full flex">
              <div className="w-1/4 justify-start ml-4 ">
                <div className="w-auto flex h-fit justify-start items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-10 text-green-500 bg-green-200 rounded-full"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                    />
                  </svg>
                  <div className="w-3/4 justify-start">
                    <h1 className="text-lg mt-5 ml-4">Tổng doanh thu</h1>
                    <h1 className="font-bold text-xl mt-5 ml-4">
                      100.000.000 đ
                    </h1>
                  </div>
                </div>
              </div>
              <div className="divider divider-horizontal" />
              <div className="w-3/4 justify-start">
                <div className="w-fit flex items-center justify-start">
                  <div className="w-auto justify-start">
                    <h1 className="flex items-center font-bold text-xl mt-5 ml-4">
                      <div className="w-2 h-4 bg-red-600 mr-4"></div>
                      Tổng VAT</h1>
                    <h1 className="text-lg mt-2 ml-10">10.000.000 đ</h1>
                  </div>
                  <div className="w-auto justify-start ml-24">
                    <h1 className="flex items-center font-bold text-xl mt-5 ml-4">
                    <div className="w-2 h-4 bg-green-400 mr-4"></div>
                      Lợi nhuận</h1>
                    <h1 className="text-lg mt-2 ml-10">10.000.000 đ</h1>
                  </div>
                </div>
                <div className="w-fit flex items-center justify-start">
                  <div className=" w-auto justify-start">
                    <h1 className="flex items-center font-bold text-xl mt-5 ml-4">
                    <div className="w-2 h-4 bg-blue-500 mr-4"></div>
                      Tổng tiền nhập hàng
                    </h1>
                    <h1 className="text-lg mt-2 ml-10">10.000.000 đ</h1>
                  </div>
                  <div className="w-auto justify-start ml-4">
                    <h1 className="flex items-center font-bold text-xl mt-5 ml-4">
                    <div className="w-2 h-4 bg-yellow-600 mr-4"></div>
                      Đơn đã bán</h1>
                    <h1 className="text-lg mt-2 ml-10">10.000.000 đ</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="w-full card bg-white rounded-none mt-6 "
            style={{
              height: "calc(100vh - 348px)",
            }}
          >
            <div className="w-full justify-items-start">
              <h1 className="font-bold text-xl mt-5 ml-4">Doanh thu theo</h1>
            </div>
            <div
            role="tablist"
            className="tabs tabs-bordered mt-4  "
            style={{ borderColor: "#f89a88" }}
          >
            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab  w-2/5 whitespace-nowrap"
              aria-label="Sản phẩm"
              defaultChecked
              style={activeTab === 0 ? { borderColor: "#f89a88" } : {}}
              onClick={() => handleTabClick(0)}
            />
            <div
              role="tabpanel"
              className="tab-content h-full p-10"
              style={{
                borderTop: "2px solid #ededed",
              }}
            >
              
            </div>

            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab w-2/5 border-b-2 whitespace-nowrap"
              aria-label="Loại sản phẩm"
              style={activeTab === 1 ? { borderColor: "#f89a88" } : {}}
              onClick={() => handleTabClick(1)}
            />
            <div
              role="tabpanel"
              className="tab-content p-10 h-full"
              style={{
                borderTop: "2px solid #ededed",
              }}
            >
              
            </div>

          </div>
          </div>
        </div>
      </div>
    </>
  );
}
