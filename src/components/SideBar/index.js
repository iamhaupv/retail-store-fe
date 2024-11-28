import React, { useState } from "react";
import "./SideBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faClipboardUser,
  faDumpsterFire,
  faGaugeHigh,
  faGift,
  faStore,
  faUserTie,
  faWarehouse,
  faGear,
  faChartColumn,
} from "@fortawesome/free-solid-svg-icons";
import { faBuffer } from "@fortawesome/free-brands-svg-icons";
import { Link, NavLink } from "react-router-dom";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { faBusSimple } from "@fortawesome/free-solid-svg-icons";
export default function SideBar({ role }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  
  // Các mục sidebar cho admin
  const adminItems = [
    { to: "/", label: "Dashboard", icon: faGaugeHigh, key: "dashBoard" },
    {to: "/product-list",  label: "Sản phẩm",key: "Sản phẩm", icon: faBuffer },
    //{ to: "/product", label: "[+] Thêm mới sản phẩm", key: "Thêm mới sản phẩm" },
    //{ to: "/product-list", label: "Danh sách sản phẩm", key: "Danh sách sản phẩm" },
    { to: "/category", label: "Quản lý đơn vị tính", key: "Quản lý đơn vị tính" },
    { to: "/employeelist", label: "Nhân viên",key: "Nhân viên", icon: faClipboardUser },
    { to: "/employeeSchedule", label: "Lịch làm việc", key: "Lịch làm việc" },
    //{ to: "/employeelist", label: "Danh sách nhân viên", key: "Danh sách nhân viên" },
    {to: "/supply-list",  label: "Nhà cung cấp",key: "Nhà cung cấp", icon: faWarehouse },
    //{ to: "/supply", label: "[+] Thêm nhà cung cấp", key: "Thêm nhà cung cấp" },
    //{ to: "/supply-list", label: "Danh sách nhà cung cấp", key: "Danh sách nhà cung cấp" },
    { to: "/inventory", label: "Quản lý kho", icon: faStore, key: "Quản lý kho" },
    { to: "/order", label: "Đơn hàng", icon: faCartPlus, key: "Đơn hàng" },
    { to: "/report", label: "Báo cáo", key: "Báo cáo", icon: faChartColumn },
    { label: "Thiết lập", key: "Thiết lập", icon:faGear },
    { to: "/information", label: "Thông tin cá nhân", key: "Thông tin cá nhân" },
    { to: "/changePassWord", label: "Đổi mật khẩu", key: "Đổi mật khẩu" },
  ];

  // Các mục sidebar cho user
  const userItems = [
    { to: "/", label: "Dashboard", icon: faGaugeHigh, key: "dashBoard" },
    { to: "/product-list", key:"Danh sách sản phẩm", label: "Danh sách sản phẩm", icon: faBuffer },
    // { to: "/product", label: "[+] Thêm mới sản phẩm", key: "Thêm mới sản phẩm" },
    //{ to: "/product-list", label: "Danh sách sản phẩm", key: "Danh sách sản phẩm" },
    // { to: "/category", label: "Quản lý đơn vị tính", key: "Quản lý đơn vị tính" },
    {  label: "Nhân viên", icon: faClipboardUser },
    { to: "/employeeSchedule",  label: "Lịch làm việc", key: "Lịch làm việc" },
    // { to: "/employeelist", label: "Danh sách nhân viên", key: "Danh sách nhân viên" },
    { to: "/supply-list",key:"Nhà cung cấp", label: "Nhà cung cấp", icon: faWarehouse },
    // { to: "/supply", label: "[+] Thêm nhà cung cấp", key: "Thêm nhà cung cấp" },
    //{ to: "/supply-list", label: "Danh sách nhà cung cấp", key: "Danh sách nhà cung cấp" },
    //{ to: "/inventory", label: "Quản lý kho", icon: faStore, key: "Quản lý kho" },
    { to: "/order", label: "Đơn hàng", icon: faCartPlus, key: "Đơn hàng" },
    // { to: "/report", label: "Báo cáo", key: "Báo cáo", icon: faChartColumn },
    { label: "Thiết lập", key: "Thiết lập", icon:faGear },
    { to: "/information", label: "Thông tin cá nhân", key: "Thông tin cá nhân" },
    { to: "/changePassWord", label: "Đổi mật khẩu", key: "Đổi mật khẩu" },  ];

  const items = role === 'admin' ? adminItems : userItems;
  return (
    <>
      <div className="container__nav w-60">
      {items.map((item) => (
        <div className="menubar" key={item.key}>
          <div className="title">
            <NavLink to={item.to} onClick={() => handleItemClick(item.key)} className={`${selectedItem === item.key ? 'flex text-green-400' : 'flex'}`}>
              {item.icon && <FontAwesomeIcon icon={item.icon} />}
              <p>{item.label}</p>
            </NavLink>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}
