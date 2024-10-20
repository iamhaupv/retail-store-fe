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
} from "@fortawesome/free-solid-svg-icons";
import { faBuffer } from "@fortawesome/free-brands-svg-icons";
import { Link, NavLink } from "react-router-dom";
export default function SideBar() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  return (
    <>
      <div className="container__nav ">
        <div className="dashboard ">
          <NavLink to={"/"}onClick={() => handleItemClick("Báo cáo")} className={`${selectedItem ==='Báo cáo' ? 'flex text-green-400':'flex'} `}>
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
            <Link to={"/product"} onClick={() => handleItemClick("Thêm mới sản phẩm")}
            className={`whitespace-nowrap pr-1 ${selectedItem ==='Thêm mới sản phẩm' ? 'text-green-400':''} `}>[+] Thêm mới sản phẩm</Link>
          </div>
          <div>
            <Link to={"/product-list"}onClick={() => handleItemClick("Danh sách sản phẩm")}
            className={`whitespace-nowrap pr-1 ${selectedItem ==='Danh sách sản phẩm' ? 'text-green-400':''} `}>Danh sách sản phẩm</Link>
          </div>
          <div>
            <Link to={"/category"}onClick={() => handleItemClick("Quản lý đơn vị tính")}
            className={`whitespace-nowrap pr-1 ${selectedItem ==='Quản lý đơn vị tính' ? 'text-green-400':''} `}>Quản lý đơn vị tính</Link>
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
            <Link to={"/employee"}onClick={() => handleItemClick("Thêm nhân viên")}
            className={`whitespace-nowrap pr-1 ${selectedItem ==='Thêm nhân viên' ? 'text-green-400':''} `}>[+] Thêm nhân viên</Link>
          </div>
          <div>
            <Link to={"/employeelist"}onClick={() => handleItemClick("Danh sách nhân viên")}
            className={`whitespace-nowrap pr-1 ${selectedItem ==='Danh sách nhân viên' ? 'text-green-400':''} `}>Danh sách nhân viên</Link>
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
            <Link to={"/supply"} onClick={() => handleItemClick("Thêm nhà cung cấp")}
            className={`whitespace-nowrap pr-1 ${selectedItem ==='Thêm nhà cung cấp' ? 'text-green-400':''} `}>[+] Thêm nhà cung cấp</Link>
          </div>
          <div>
            <Link to={"/supply-list"} onClick={() => handleItemClick("Danh sách nhà cung cấp")}
            className={`whitespace-nowrap pr-1 ${selectedItem ==='Danh sách nhà cung cấp' ? 'text-green-400':''} `}>Danh sách nhà cung cấp</Link>
          </div>
        </div>
        <div className="menubar">
          <div className="title">
          <Link to={"/inventory"} onClick={() => handleItemClick("Quản lý kho")} className={`whitespace-nowrap pr-1 ${selectedItem ==='Quản lý kho' ? 'flex text-green-400':'flex'} `}>
            <span>
              <FontAwesomeIcon icon={faStore} />
            </span>
              <p>Quản lý kho</p>
              </Link>
          </div>
        </div>
        <div className="menubar">
          <div className="title">
            <Link  to={"/order"} onClick={() => handleItemClick("Đơn hàng")} className={`whitespace-nowrap pr-1 ${selectedItem ==='Đơn hàng' ? 'flex text-green-400':'flex'} `} >
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
            <Link  to={"/report"} onClick={() => handleItemClick("Báo cáo")} className={`whitespace-nowrap pr-1 ${selectedItem ==='Báo cáo' ? 'flex text-green-400':'flex'} `}>
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
            <Link className="flex" >
              <span>
                <FontAwesomeIcon icon={faGear} />
              </span>
              <p>Thiết lập</p>
            </Link>
          </div>
          <div>
            <Link to="/information "onClick={() => handleItemClick("Thông tin cá nhân")}
            className={`whitespace-nowrap pr-1 ${selectedItem ==='Thông tin cá nhân' ? 'text-green-400':''} `}>Thông tin cá nhân</Link>
          </div>
          <div>
            <Link to="/changePassWord" onClick={() => handleItemClick("Đổi mật khẩu")}
            className={`whitespace-nowrap pr-1 ${selectedItem ==='Đổi mật khẩu' ? 'text-green-400':''} `}>Đổi mật khẩu</Link>
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
