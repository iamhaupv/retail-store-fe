import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../../components/SideBar";
import "./LayoutDefault.css";
import Header from "../../components/Header";
import ContentRegisterLogin from "../../components/ContentRegisterLogin";
import SignIn from "../../pages/SignIn";
import HeaderRegisterLogin from "../../components/HeaderRegisterLogin";

const LayoutDefault = () => {
  const location = useLocation();
  let headerContent;

  switch (location.pathname) {
    case "/":
      headerContent = <Header title={"Home"} />;
      break;
    case "/employee":
      headerContent = <Header title={"Thêm nhân viên"} />;
      break;
    case "/product-list":
      headerContent = <Header title={"Danh sách sản phẩm"} />;
      break;
    case "/product":
      headerContent = <Header title={"Thêm sản phẩm"} />;
      break;
    case "/signin":
      headerContent = <ContentRegisterLogin component={SignIn} />;
      break;
    case "/supply":
      headerContent = <Header title={"Thêm nhà cung cấp"} />;
      break;
    case "/supply-list":
      headerContent = <Header title={"Danh sách nhà cung cấp"} />;
      break;
      case "/order":
        headerContent = <Header title={"Danh sách đơn hàng"} />;
        break;
    default:
      headerContent = <Header title={"Home"} />;
  }

  return (
    <>
      {location.pathname === "/signin" ? (
        <div className="signin-layout">
          <HeaderRegisterLogin />
          {headerContent}
        </div>
      ) : (
        <div className="container__layout  ">
          <header className="">{headerContent}</header>
          <main className="flex h-screen">
            <SideBar />
            <Outlet />
          </main>
        </div>
      )}
    </>
  );
};

export default LayoutDefault;
