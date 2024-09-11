import React from "react";
import "./NavSideBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCartPlus,
  faClipboardUser,
  faDumpsterFire,
  faGaugeHigh,
  faGift,
  faStore,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { faBuffer } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
export default function NavSideBar() {
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
            <h1>Sản Phẩm</h1>
          </div>
          <div><Link>[+] Thêm mới sản phẩm</Link></div>
          <div><Link>Danh sách sản phẩm</Link></div>
          <div><Link>Danh mục sản phẩm</Link></div>
          <div><Link>Ngành hàng</Link></div>
        </div>
        <div className="menubar">
          <div className="title">
            <span><FontAwesomeIcon icon={faClipboardUser} /></span>
            <h1>Nhân viên</h1>
          </div>
          <div><Link>[+] Thêm mới nhân viên</Link></div>
          <div><Link>Danh sách nhân viên</Link></div>
        </div>
        <div className="menubar">
          <div className="title">
          <span><FontAwesomeIcon className="title__icon" icon={faDumpsterFire} /></span>
            <h1>Nhà cung cấp</h1>
          </div>
          <div><Link>[+] Thêm mới nhà cung cấp</Link></div>
          <div><Link>Danh sách nhà cung cấp</Link></div>
        </div>
        <div className="menubar">
          <div className="title">
          <span><FontAwesomeIcon icon={faStore} /></span>
            <h1>Quản lý kho</h1>
          </div>
        </div>
        <div className="menubar">
          <div className="title">
          <span><FontAwesomeIcon icon={faCartPlus} /></span>
            <h1>Đơn hàng</h1>
          </div>
          <div><Link>[+] Thêm mới nhà cung cấp</Link></div>
          <div><Link>Danh sách nhà cung cấp</Link></div>
        </div>
        <div className="menubar">
          <div className="title">
          <span><FontAwesomeIcon icon={faGift} /></span>
            <h1>Chương trình khuyến mãi</h1>
          </div>
        </div>
        <div className="menubar">
          <div className="title">
          <span><FontAwesomeIcon icon={faUserTie} /></span>
            <h1>Khách hàng</h1>
          </div>
          <div><Link>[+] Thêm mới khách hàng</Link></div>
          <div><Link>Danh sách khách hàng</Link></div>
        </div>
      </div>
    </>
  );
}
