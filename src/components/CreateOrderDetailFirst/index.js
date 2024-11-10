import React, { useEffect, useState } from "react";
import CreateOrderTableDetail from "../CreateOrderTableDetail";
import apiGetCurrentUser from "../../apis/apiGetCurrentUser";
import { Link } from "react-router-dom";

export default function CreateOrderDetailFirst() {
  const [user, setUser] = useState("");
  const [orderDetails, setOrderDetails] = useState([]);
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiGetCurrentUser(token);
      setUser(response.rs);
    } catch (error) {
      throw new Error("Fetch user is error " + error);
    }
  };
  const handleDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const addNewRow = () => {
    const newRow = {
      id: orderDetails.length + 1,
      productCode: "",
      productName: "",
      quantity: 0,
      unit: "",
      price: 0,
      total: 0,
    };
    setOrderDetails([...orderDetails, newRow]);
  };

  const removeRow = (index) => {
    setOrderDetails(orderDetails.filter((_, i) => i !== index));
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <div className="card bg-white h-full rounded-none w-full overflow-y-hidden ">
        <h1 className="font-bold text-xl ml-2 mt-2">Thông tin </h1>
        <div>
          <div className="flex">
            <div className="flex w-fit h-fit justify-center items-center ml-2 mt-2">
              <h1 className="font-medium w-24 text-sm ">Mã hóa đơn:</h1>
              <input
                type="text"
                placeholder="H0231234"
                className="input w-60  h-7 text-black"
                disabled
              />
            </div>
            <div className="flex w-fit h-auto justify-center items-center ml-2 mt-2">
              <h1 className="font-medium w-24 text-sm ">Thời gian:</h1>
              <input
                type="text"
                value={handleDate()}
                className="input w-60  h-7 text-black"
                disabled
              />
            </div>
          </div>
          <div className="flex w-full">
            <div className="flex w-fit h-fit justify-center items-center ml-2 mt-5">
              <h1 className="font-medium w-24 text-sm ">Mã nhân viên:</h1>
              <input
                type="text"
                placeholder="NV0231234"
                className="input w-60  h-7 text-black"
                disabled
              />
            </div>
            <div className="flex w-fit h-auto justify-center items-center ml-2 mt-2">
              <h1 className="font-medium w-24 text-sm ">Tên nhân viên:</h1>
              <input
                value={user.lastname + " " + user.firstname}
                type="text"
                className="input w-60  h-7 text-black"
                disabled
              />
            </div>
            <div className="w-5/6 justify-items-end grid mr-2">
              <button
                onClick={addNewRow}
                className="drawer-button btn btn-success text-white w-36 h-8 mt-3 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Thêm dòng
              </button>
            </div>
          </div>
          <div
            className=" overflow-y-auto"
            style={{
              height: "calc(90vh - 350px)",
            }}
          >
            <table className="table table-pin-rows">
              {/* head */}
              <thead>
                <tr>
                  <th>Mã hàng</th>
                  <th>Tên hàng</th>
                  <th>Số lượng</th>
                  <th>Đơn vị tính</th>
                  <th>Đơn giá</th>
                  <th>Thành tiền</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.map((detail, index) => (
                  <CreateOrderTableDetail
                    key={index}
                    detail={detail}
                    removeRow={removeRow}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex w-full h-auto">
            <div className="w-9/12"></div>
            <div className="w-3/12 h-auto justify-end items-end mt-4">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">Thuế VAT:</h2>
                <h2 className=" font-sans text-sm mr-2">30.000 VNĐ</h2>
              </div>
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">Tiền nhận:</h2>
                <h2 className=" font-sans text-sm mr-2">350.000 VNĐ</h2>
              </div>
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">Tiền thừa:</h2>
                <h2 className=" font-sans text-sm mr-2 ">20.000 VNĐ</h2>
              </div>
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">Tổng tiền:</h2>
                <h2
                  className=" font-sans text-lg mr-2"
                  style={{ color: "#f13612" }}
                >
                  330.000 VNĐ
                </h2>
              </div>
            </div>
          </div>
          <div className="flex w-full h-36 justify-end">
            <Link to="/reciept">
              <button
                className="drawer-button btn text-white w-36 h-8 mt-3 ml-6"
                style={{ backgroundColor: "#2f80ed" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
                  />
                </svg>
                In
              </button>
            </Link>
            <button className="drawer-button btn btn-success text-white w-36 h-8 mt-3 ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Lưu
            </button>
            <button
              className="drawer-button btn text-white w-36 h-8 mt-3 ml-2 mr-2"
              style={{ backgroundColor: "#f13612" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
              Hủy
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
