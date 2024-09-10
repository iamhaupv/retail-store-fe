import React from "react";
import "./StockReceipt.css";
import luck from "../../assets/luck.png";
export default function StockReceipt() {
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
                <div>HauPV Store</div>
                <div>Address</div>
                <div>Phone</div>
            </div>
            <div className="infor__action">
                <button>Xem chi tiet</button>
                <button>Chinh sua</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
