import React from "react";

export default function CategoryTableDetail() {
  return (
    <>
      <tr className="hover:bg-slate-100">
        <td>Thung24</td>
        <td>24</td>
        <td>
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
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </button>

          <button
            id="btn__delete"
            className="w-6 h-6 rounded-lg "
            style={{ backgroundColor: "#feebe8", outline: "" }}
            onClick={() =>
              document.getElementById("DeleteSupplyDetail").showModal()
            }
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

      <dialog id="DeleteSupplyDetail" className="modal">
        <div className="modal-box w-3/12 ">
          <h3 className="font-bold text-lg">
            Bạn muốn xóa đơn vị tính này khỏi danh sách bán?
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
