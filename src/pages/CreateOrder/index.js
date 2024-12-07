import React, { useState } from "react";
import CreateOrderDetailFirst from "../../components/CreateOrderDetailFirst";
import CreateOrderDetailSecond from "../../components/CreateOrderDetailSecond";

export default function CreateOrder() {
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
        <div role="tablist" className="tabs tabs-lifted w-11/12 animate__animated animate__fadeInRight">
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="Đơn hàng 1"
            defaultChecked
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
          >
           <CreateOrderDetailFirst/>
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="Đơn hàng 2"
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
          >
            <CreateOrderDetailSecond/>
          </div>
        </div>
      </div>
    </>
  );
}
