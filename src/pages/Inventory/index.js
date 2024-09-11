import React from "react";
import Header from "../../components/Header";
import NavSideBar from "../../components/NavSideBar";
import "./Inventory.css";
import Content from "../../components/Content";
export default function Inventory() {
  return (
    <>
      <Header />
      <div className="content__inventory">
        <NavSideBar />
        <Content />
      </div>
    </>
  );
}
