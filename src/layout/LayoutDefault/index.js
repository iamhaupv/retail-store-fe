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
    case "/employeelist":
      headerContent = <Header title={"Danh sách nhân viên"} />;
      break;
      case "/inventory":
      headerContent = <Header title={"Thông tin kho"} />;
      break;
      case "/WarehouseReceipt":
      headerContent = <Header title={"Phiếu nhập kho"} />;
      break;
      case "/createOrder":
      headerContent = <Header title={"Tạo đơn hàng"} />;
      break;
      case "/information":
      headerContent = <Header title={"Thông tin cá nhân"} />;
      break;
      case "/changePassWord":
      headerContent = <Header title={"Đổi mật khẩu"} />;
      break;
    case "/product-list":
      headerContent = <Header title={"Danh sách sản phẩm"} />;
      break;
    case "/category":
      headerContent = <Header title={"Đơn vị tính"} />;
      break;
      case "/employeeSchedule":
        headerContent = <Header title={"Ca làm việc"} />;
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
