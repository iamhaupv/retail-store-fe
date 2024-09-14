import React from "react";
import "./Content.css";
import { Outlet } from "react-router-dom";
export default function Content() {
  return (
    <>
      <div className="content">
        <Outlet />
      </div>
    </>
  );
}
