import React, { useEffect, useState } from "react";
import apiGetAllReceipt from "../../apis/apiGetAllReceipt";
import apiIsDisplayWarehouseReceipt from "../../apis/apiIsDisplayWarehouseReceipt";

export default function StockInDetail() {

  const [receipts, setReceipts] = useState([]);
  const fetchReceipts = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("Token is invalid!");
      }
      const response = await apiGetAllReceipt(token);
      setReceipts(response.receipts);
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    fetchReceipts();
  }, []);
  
  function formatDate(date) {
    if (!(date instanceof Date)) {
      date = new Date(date); // Chuyển đổi chuỗi thành đối tượng Date
    }
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }
  const handleChangeIsDisplay = async (pid, isDisplay) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid");
      await apiIsDisplayWarehouseReceipt(token, pid, { isDisplay });
      fetchReceipts();
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <>
      {receipts.map((receipt) => (
        <tr key={receipt._id} className="hover:bg-slate-100">
          <td>{receipt.idPNK}</td>
          <td>{formatDate(receipt.createdAt)}</td>
          <td>
            {receipt.user.lastname} {receipt.user.firstname}
          </td>
          <td>{receipt.products.length}</td>
          <td>
            {receipt.products
              .reduce((total, product) => {
                return total + product.quantity * product.importPrice;
              }, 0)
              .toLocaleString()}
          </td>

          <th>
            <button
              className=" w-6 h-6 rounded-sm mr-2"
              style={{ backgroundColor: "#e2f2ea", outline: "" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
                style={{ color: "#19b563" }}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </button>

            <button
              id="btn__delete"
              className="w-6 h-6 rounded-sm "
              style={{ backgroundColor: "#feebe8", outline: "" }}
              // onClick={() =>
              //   document.getElementById("Delete_StockIn").showModal()
              // }
              onClick={() => handleChangeIsDisplay(receipt._id, false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: "#f13612" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Alert Delete */}
          </th>
        </tr>
      ))}

      <dialog id="Delete_StockIn" className="modal">
        <div className="modal-box w-3/12 ">
          <h3 className="font-bold text-lg">
            Bạn muốn phiếu nhập này khỏi danh sách?
          </h3>
          <div className="flex modal-action justify-between ">
            <button className="btn w-20 bg-orange-500"> Đồng ý</button>
            <form method="dialog ">
              {/* if there is a button, it will close the modal */}
              <button className="btn w-20">Hủy</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
