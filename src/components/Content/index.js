import React from "react";
import "./Content.css";
import HeaderDetailStockReceipt from "../HeaderDetailStockReceipt"
export default function Content({component: Component}) {
  return (
    <>
      <div className="content">
        {Component && <Component/>}
      </div>
    </>
  );
}
