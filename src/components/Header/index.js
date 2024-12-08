import React, { useEffect, useState } from "react";
import "./Header.css";
import apiGetCurrentUser from "../../apis/apiGetCurrentUser"
import logo_company from "../../Image/Logo-removebg-preview.png";
import { Link, useNavigate } from "react-router-dom";
export default function Header(props) {
  const [user, setUser] = useState("");
  const fetchCurrentUser = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("Token is invalid!");
    const currentUSer = await apiGetCurrentUser(token);
    setUser(currentUSer.rs);
  };
  useEffect(() => {
    fetchCurrentUser();
  }, [])
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      localStorage.clear();
      navigate("/signin");
    } catch (error) {
      throw new Error(error);
    }
  };
  
  return (
    <>
      <div className="navbar h-11 bg-base-100">
        <div className="flex-1">
          <Link to="/">
          <img
            src={logo_company}
            className="w-48 h-full"
            alt="logo Store 24 Hour"
          />
          </Link>
          <a href="" class="flex ml-10 w-80 items-center">
            <p className="ml-2 w-72">{props.title}</p>
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal items-center px-1">
            <li>
              <details>
                <summary>
                  <div className="flex w-36 items-center">
                    <div className="avatar">
                      <div className="size-10 rounded-full mr-1">
                        {/* <img src={`${user.image}`} alt="Avatar default" /> */}
                        <img src={`${user && user.employee.images[0]}`} alt="Avatar default" />
                      </div>
                    </div>
                    <h1 className="font-medium whitespace-nowrap">{user && user.employee.name}</h1>
                  </div>
                </summary>
                <ul className="bg-base-100 w-72 rounded-t-none p-2 z-40">
                  <li className="">
                    <div className="flex w-72 items-center">
                      <div className="avatar">
                        <div className="size-10 rounded-full">
                          {/* <img src={`${user.image}`} alt="Avatar default" /> */}
                          <img src={`${user && user.employee.images[0]}`} alt="Avatar default" />
                        </div>
                      </div>
                      <div className="w-full">
                        {/* <h1 className="font-medium ml-2">{user.name}</h1> */}
                        <h1 className="font-medium ml-2">{user && user.employee.name}</h1>
                        <div className="badge bg-blue-200 text-blue-300">
                          {user.role === "admin" ? "Quản lý" : "Nhân viên"}
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link to="/information">
                      <a>Thông tin cá nhân</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/changePassWord">
                      <a>Thay đổi mật khẩu</a>
                    </Link>
                  </li>
                  <li>
                    <a onClick={handleLogout}>Đăng xuất</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
