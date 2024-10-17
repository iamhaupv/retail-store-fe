import React from "react";

export default function CreateOrderTableDetail() {
  return (
    <>
      <tr className="hover:bg-slate-100">
        <td>SP034213</td>
        <td>
          <select className="select select-ghost w-full max-w-xs">
            <option>Nước ngọt pepsi dung tích 120ml</option>
            <option>Snack Khoai tây lays</option>
            <option>Nước khoáng aquafina</option>
          </select>
        </td>
        <td>
          <input type="number" placeholder="1" className="input w-32 " />
        </td>
        <td>
          <select className="select select-bordered w-full max-w-xs">
            <option>chai</option>
            <option>Thùng 24</option>
          </select>
        </td>
        <td>10.000</td>
        <td>10.000</td>
        <td>
          <button
            id="btn__delete"
            className="w-6 h-6 rounded-lg "
            style={{ backgroundColor: "#feebe8", outline: "" }}
            onClick={() => document.getElementById("Delete").showModal()}
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
        </td>
      </tr>
    </>
  );
}
