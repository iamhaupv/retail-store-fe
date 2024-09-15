import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";
import "./LayoutDefault.css"
export default function LayoutDefault() {
  return (
    <>
      <div className="container__layout">
        <header>
          <Outlet context={{ area: "header" }} />
        </header>
        <div className="layout-main-content flex">
          <SideBar />
          {/* <Outlet context={{ area: "main" }} /> */}
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
}
