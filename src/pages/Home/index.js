import React from "react";
import Header from "../../components/Header";
import NavSideBar from "../../components/NavSideBar";
import "./Home.css";
import StockReceipt from "../../components/HeaderDetailStockReceipt";
export default function Home() {
  return (
    <>
      <Header />
      <div className="container__navbar">
        {/* <NavSideBar /> */}
        {/* <StockReceipt/> */}
      </div>
    </>
  );
}
