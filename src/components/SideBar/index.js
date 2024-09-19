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
} from "@fortawesome/free-solid-svg-icons";
import { faBuffer } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
export default function SideBar() {
  return (
    <>
      <div className="container__nav">
        <div className="dashboard">
          <div><FontAwesomeIcon className="gauge__high" icon={faGaugeHigh} /></div>
          <div><h1>Dashboard</h1></div>
        </div>
        <div className="menubar">
          <div className="title">
            <span><FontAwesomeIcon icon={faBuffer} /></span>
            <p>Sản Phẩm</p>
          </div>
          <div><Link to={"/product"}>[+] Thêm mới sản phẩm</Link></div>
          <div><Link to={"/list-product"}>Danh sách sản phẩm</Link></div>
          <div><Link>Danh mục sản phẩm</Link></div>
          <div><Link>Ngành hàng</Link></div>
        </div>
        <div className="menubar">
          <div className="title">
            <span><FontAwesomeIcon icon={faClipboardUser} /></span>
            <h1>Nhân viên</h1>
          </div>
          <div><Link to={"/employee"}>[+] Thêm nhân viên</Link></div>
          <div><Link>Danh sách nhân viên</Link></div>
        </div>
        <div className="menubar">
          <div className="title">
          <span><FontAwesomeIcon className="title__icon" icon={faWarehouse} /></span>
          <p>Nhà cung cấp</p>
          </div>
          <div><Link to={"/supply"}>[+] Thêm nhà cung cấp</Link></div>
          <div><Link>Danh sách nhà cung cấp</Link></div>
        </div>
        <div className="menubar">
          <div className="title">
          <span><FontAwesomeIcon icon={faStore} /></span>
            <h1><Link to={"/inventory"}>Quản lý kho</Link></h1>
          </div>
        </div>
        <div className="menubar">
          <div className="title">
          <Link className="flex" to={"/order"}><span><FontAwesomeIcon icon={faCartPlus} /></span>
          <p>Đơn hàng</p></Link>
          </div>
          <div><Link>[+] Thêm đơn hàng</Link></div>
          <div><Link>Danh sách đơn hàng</Link></div>
        </div>
        <div className="menubar">
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
        </div>
      </div>
    </>
  );
}
