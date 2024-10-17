import React from "react";

export default function StockInDetail() {
  return (
    <>
      <tr className="hover:bg-slate-100">
        <th>KNK0314322021-001</th>
        <td>04/01/2021 13:30PM</td>
        <td>VanHau Store</td>
        <td>10</td>
        <td>15.000.000</td>

        <td>
          <button
            className=" w-6 h-6 rounded-lg mr-2"
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
            className=" w-6 h-6 rounded-lg mr-2"
            style={{ backgroundColor: "#ebf3fe", outline: "" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
              style={{ color: "#2f80ed" }}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
              />
            </svg>
          </button>
        </td>
      </tr>

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
