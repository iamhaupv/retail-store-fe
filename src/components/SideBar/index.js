import React from "react";
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
} from "@fortawesome/free-solid-svg-icons";
import { faBuffer } from "@fortawesome/free-brands-svg-icons";
import { Link, NavLink } from "react-router-dom";
export default function SideBar() {
  return (
    <>
      <div className="container__nav ">
        <div className="dashboard ">
          <NavLink className="flex" to={"/"}>
            <div>
              <FontAwesomeIcon className="gauge__high" icon={faGaugeHigh} />
            </div>
            <div>
              <h1>Dashboard</h1>
            </div>
          </NavLink>
        </div>
        <div className="menubar">
          <div className="title">
            <span>
              <FontAwesomeIcon icon={faBuffer} />
            </span>
            <p>Sản Phẩm</p>
          </div>
          <div>
            <Link to={"/product"}>[+] Thêm mới sản phẩm</Link>
          </div>
          <div>
            <Link to={"/product-list"}>Danh sách sản phẩm</Link>
          </div>
          <div>
            <Link to={"/category"}>Danh mục sản phẩm</Link>
          </div>
        </div>
        <div className="menubar">
          <div className="title">
            <span>
              <FontAwesomeIcon icon={faClipboardUser} />
            </span>
            <h1>Nhân viên</h1>
          </div>
          <div>
            <Link to={"/employee"}>[+] Thêm nhân viên</Link>
          </div>
          <div>
            <Link to={"/employeelist"}>Danh sách nhân viên</Link>
          </div>
        </div>
        <div className="menubar">
          <div className="title">
            <span>
              <FontAwesomeIcon className="title__icon" icon={faWarehouse} />
            </span>
            <p>Nhà cung cấp</p>
          </div>
          <div>
            <Link to={"/supply"}>[+] Thêm nhà cung cấp</Link>
          </div>
          <div>
            <Link to={"/supply-list"}>Danh sách nhà cung cấp</Link>
          </div>
        </div>
        <div className="menubar">
          <div className="title">
            <span>
              <FontAwesomeIcon icon={faStore} />
            </span>
            <h1>
              <Link to={"/inventory"}>Quản lý kho</Link>
            </h1>
          </div>
        </div>
        <div className="menubar">
          <div className="title">
            <Link className="flex" to={"/order"}>
              <span>
                <FontAwesomeIcon icon={faCartPlus} />
              </span>
              <p>Đơn hàng</p>
            </Link>
          </div>
          {/* <div><Link>[+] Thêm đơn hàng</Link></div>
          <div><Link>Danh sách đơn hàng</Link></div> */}
        </div>
        <div className="menubar">
          <div className="title">
            <Link className="flex" to={"/order"}>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="lucide lucide-file-chart-column size-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  <path d="M8 18v-1" />
                  <path d="M12 18v-6" />
                  <path d="M16 18v-3" />
                </svg>{" "}
              </span>
              <p>Báo cáo</p>
            </Link>
          </div>
          {/* <div><Link>[+] Thêm đơn hàng</Link></div>
          <div><Link>Danh sách đơn hàng</Link></div> */}
        </div>
        <div className="menubar">
          <div className="title">
            <Link className="flex" to={""}>
              <span>
                <FontAwesomeIcon icon={faGear} />
              </span>
              <p>Thiết lập</p>
            </Link>
          </div>
          <div>
            <Link to="/information">Thông tin cá nhân</Link>
          </div>
          <div>
            <Link to="/changePassWord">Đổi mật khẩu</Link>
          </div>
        </div>
        {/* <div className="menubar">
          <div className="title">
          <Link className="flex" to={"/discount"}><span><FontAwesomeIcon icon={faGift} /></span>
          <h1>Khuyến mãi</h1></Link>
          </div>
        </div>
        <div className="menubar">
          <div className="title">
          <span><FontAwesomeIcon icon={faUserTie} /></span>
            <h1>Khách hàng</h1>
          </div>
          <div><Link>[+] Thêm khách hàng</Link></div>
          <div><Link>Danh sách khách hàng</Link></div>
        </div> */}
      </div>
    </>
  );
}
