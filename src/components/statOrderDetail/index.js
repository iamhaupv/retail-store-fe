import React from "react";

export default function StatOrderDetail({orders, onOrderClick }) {
  function formatDate(date) {
    if (!(date instanceof Date)) {
      date = new Date(date); 
    }
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  
  return (
    <>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id} onClick={() => onOrderClick(order)} className="card bg-white  rounded-none border-collapse grid hover:bg-slate-100">
        <div className="flex justify-between mr-1 ml-1 mt-1">
          <div className="font-bold text-sm">{order.id || 0}</div>
          <div className="font-bold text-sm">{order.totalAmount.toLocaleString()} VNĐ</div>
        </div>
        <div className="mr-1 ml-1 mt-1">Cửa hàng 25 Hour</div>
        <div className="flex justify-between mr-1 ml-1 ">
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>
            {formatDate(order.createdAt)}
          </div>
            <div className="avatar">
              <div className="size-6 rounded-full">
                {/* <img src={order.user.image} alt=""/> */}
                <img src={order?.user?.employee?.images[0]} alt=""/>
              </div>
            </div>
        </div>
      </div>
        ))
      ) : (<div>Không có hóa đơn nào</div>)}
    </>
  );
}
