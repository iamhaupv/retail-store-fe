import React from "react";
import HeaderRegisterLogin from "../../components/HeaderRegisterLogin";
import { Outlet } from "react-router-dom";
export default function SignUp() {
  return (
    <>
      <HeaderRegisterLogin text={"Đăng ký"} />
      <div className="flex justify-center items-center">
        <Outlet />
      </div>
    </>
  );
}
