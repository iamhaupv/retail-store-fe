import React, { useEffect, useState } from "react";

export default function Report() {
  return (
    <>
      <div
        className="w-11/12 h-screen justify-center flex"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div className="w-full animate__animated animate__fadeInRight  ml-2 mr-2 ">
          <div
            className="w-full card bg-white rounded-none mt-2 "
            style={{
              height: "calc(100vh - 685px)",
            }}
          >
            <div className="w-full justify-items-start">
              <h1 className="font-bold text-xl mt-5 ml-4">Báo cáo doanh thu</h1>
            </div>
          </div>
          <div
            className="w-full card bg-white rounded-none mt-5 "
            style={{
              height: "calc(100vh - 381px)",
            }}
          >
            <div className="w-full justify-items-start">
              <h1 className="font-bold text-xl mt-5 ml-4">Doanh thu theo</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
