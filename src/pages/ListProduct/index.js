import React, { useState } from "react";
import ListProductTable from "../../components/ListProductTable";
import ListProductSale from "../ListProductSale";
import ListProductOutStock from "../ListProductOutStock";

export default function ListProduct() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <> 
      <div
        className="w-11/12 h-full justify-items-center flex "
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div
          className="w-full card bg-white rounded-none mt-2  ml-2 mr-2 animate__animated animate__fadeInRight  "
          style={{
            height: "calc(100vh - 85px)",
          }}
        >
          {/* <Header title = {"Danh sách sản phẩm"}*/}
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
              aria-label="Tất cả"
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
              <ListProductTable role={localStorage.getItem(
              'role'
            )} />
            </div>

            {/* <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab w-2/5 border-b-2 whitespace-nowrap"
              aria-label="Đang bán"
              style={activeTab === 1 ? { borderColor: "#f89a88" } : {}}
              onClick={() => handleTabClick(1)}
            /> */}
            {/* <div
              role="tabpanel"
              className="tab-content p-10 h-full"
              style={{
                borderTop: "2px solid #ededed",
              }}
            >
              <ListProductSale role={localStorage.getItem(
              'role'
            )}  />
            </div> */}

            {/* <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab w-2/5 whitespace-nowrap"
              aria-label="Hết Hàng"
              style={activeTab === 2 ? { borderColor: "#f89a88" } : {}}
              onClick={() => handleTabClick(2)}
            /> */}
            {/* <div
              role="tabpanel"
              className="tab-content p-10 h-full"
              style={{
                borderTop: "2px solid #ededed",
              }}
            >
              <ListProductOutStock role={localStorage.getItem(
              'role'
            )} />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
