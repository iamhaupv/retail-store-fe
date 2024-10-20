import React from "react";
import Autocomplete from "../AutoComplete";

export default function CreateOrderTableDetail() {
  const suggestions = [
    "Nước ngọt pepsi dung tích 120ml",
    "Snack Khoai tây lays",
    "Nước khoáng aquafina",
  ];
  const DonViTinh = [
    "Thùng 30",
    "Thùng 24",
    "Lóc",
    "Chai"
  ];
  return (
    <>
      <tr className="hover:bg-slate-100">
        <td>SP034213</td>
        <td>
            <div className="w-56">
                <Autocomplete suggestions={suggestions} placeholder=""/>
            </div>
        </td>
        <td>
          <input type="number" placeholder="1" className="input w-32 h-8 " />
        </td>
        <td>
        <div className="w-56">
                <Autocomplete suggestions={DonViTinh} placeholder=""/>
            </div>
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
