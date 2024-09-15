import React from "react";
import Header from "../../components/Header";
import NavSideBar from "../../components/SideBar";
import "./Inventory.css";
import Content from "../../components/Content";
export default function Inventory() {
  return (
    <>
      <Header title={"Kho"} />
      <div className="content__inventory">
        <NavSideBar />
        <Content />
      </div>
    </>
  );
}
