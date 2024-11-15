import React, { useEffect, useState } from "react";
import apiGetAllOrder from "../../apis/apiGetAllOrder";

export default function OrderTableList() {
  const [orders, setOrders] = useState([])
  const fetchOrders = async() => {
    try {
      const token = localStorage.getItem("accessToken")
      if(!token) throw new Error("Token is invalid!")
      const response = await apiGetAllOrder(token)
      setOrders(Array.isArray(response.orders) ? response.orders : [])
    } catch (error) {
      console.log("fetch orders is error " + error);
    }
  }
  useEffect(() => {
    fetchOrders()
  }, [])
  function formatDate(date) {
    if (!(date instanceof Date)) {
      date = new Date(date); // Chuyển đổi chuỗi thành đối tượng Date
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  return (
    <>
      {orders.length > 0 ? orders.map((order) => (
        <tr className="hover:bg-slate-100">
        <td>
          {/* <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                  alt="Avatar Tailwind CSS Component"
                />
              </div>
            </div>
            <div>
              <div className="font-bold">Hart Hagerty</div>
              <div className="text-sm opacity-50">United States</div>
            </div>
          </div> */}
          <div className="flex w-fit hover:bg-slate-100">
            <h1 className="w-fit mr-2 font-bold text-sm">BR023191</h1>
            <div className="w-20 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
                className=""
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>
              {formatDate(order.createdAt)}
            </div>
          </div>
          <h1>Cửa hàng 24 hour</h1>
        </td>
        <td>
          {order.totalAmount} VNĐ
          <br />
          <span className="badge badge-sm" style={{backgroundColor:"#e2f2ea"}}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-4"
              style={{color:"#19b563"}}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
            <h1 className="ml-1" style={{color:"#19b563"}}>Thành công</h1>  
          </span>
        </td>
        <td>
          <div className="lg:tooltip" data-tip="Nguyễn Thanh Khoa">
            <div className="avatar">
              <div className="size-6 rounded-full">
                <img src={order.user.image} alt="Avatar" />
                
              </div>
            </div>
          </div>
        </td>
      </tr>
      )) : <div>Không có phiếu hóa đơn nào</div>}
    </>
  );
}
