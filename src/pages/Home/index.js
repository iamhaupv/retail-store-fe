import React from "react";
import NavSideBar from "../../components/NavSideBar";
import "./Home.css";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
export default function Home() {
  return (
    <>
      <Header title={"Dashboard"}/>
    </>
  );
}
