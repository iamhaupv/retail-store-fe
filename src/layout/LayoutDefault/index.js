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
      headerContent = <Header title={"Employee"} />;
      break;
    case "/list-product":
      headerContent = <Header title={"List Product"} />;
      break;
    case "/product":
      headerContent = <Header title={"Product"} />;
      break;
    case "/signin":
      headerContent = <ContentRegisterLogin component={SignIn} />;
      break;
    default:
      headerContent = <Header title={"Home"} />;
  }

  return (
    <>
      {location.pathname === "/signin" ? (
        <div className="signin-layout">
          <HeaderRegisterLogin/>
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
