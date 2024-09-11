import React from "react";
import "./HeaderDetailStockReceipt.css";
import luck from "../../assets/luck.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faLocationDot, faPenToSquare, faPhone } from "@fortawesome/free-solid-svg-icons";
export default function HeaderDetailStockReceipt() {
  return (
    <>
      <div className="infor__inventory">
        <div className="infor__inventory__child">
          <div>Thông tin kho</div>
          <div className="inventory__detail">
            <div className="logo__detail">
              <img src={luck} alt="logo HauPV Store" />
            </div>
            <div className="infor__detail">
                <h1>HauPV Store</h1>
                <div><FontAwesomeIcon className="block__icon" icon={faLocationDot} /> <span className="title__detail">Address</span></div>
                <div><FontAwesomeIcon className="block__icon" icon={faPhone} /> <span>0375684441</span></div>
            </div>
            <div className="infor__action">
                <button className="view__detail"><FontAwesomeIcon icon={faEye} /> Xem chi tiết</button>
                <button className="update__detail"><FontAwesomeIcon icon={faPenToSquare} />Chỉnh sửa</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
