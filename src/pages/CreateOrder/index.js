import React, { useState } from "react";
import CreateOrderDetailFirst from "../../components/CreateOrderDetailFirst";
import CreateOrderDetailSecond from "../../components/CreateOrderDetailSecond";
import { ToastContainer } from "react-toastify";

export default function CreateOrder() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  return (
    <>
     <ToastContainer />
      <div
        className="w-11/12 h-screen justify-center flex"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div role="tablist" className="tabs tabs-lifted w-full ml-2 mr-2 animate__animated animate__fadeInRight">
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab whitespace-nowrap"
            aria-label="Đơn hàng 1"
            defaultChecked
            onChange={() => handleTabClick(0)}
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box  h-full"
          >
           <CreateOrderDetailFirst/>
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab whitespace-nowrap"
            aria-label="Đơn hàng 2"
            onChange={() => handleTabClick(1)}
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box  h-full"
          >
            <CreateOrderDetailSecond/>
          </div>
        </div>
      </div>
    </>
  );
}
