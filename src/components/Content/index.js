import React from "react";
import HeaderDetailStockReceipt from "../HeaderDetailStockReceipt";
import Receipt from "../Receipt";
import "./Content.css";
export default function Content() {
  return (
    <>
      <div className="content">
        <HeaderDetailStockReceipt />
        <Receipt />
      </div>
    </>
  );
}
