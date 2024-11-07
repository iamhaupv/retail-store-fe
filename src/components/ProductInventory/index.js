import { useBarcode } from "@createnextapp/react-barcode";
import React from "react";

export default function ProductInventory({ products }) {
  return (
    <>
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product) => {
          return (
            <tr key={product._id} className="hover:bg-slate-100">
              <td>
                <div>
                  <div className="font-bold">{product.code || "ASM001"}</div>
                  <svg ref={inputRef} />
                </div>
              </td>
              <td>
                <div className="font-bold">
                  {product.invoiceNumber || "P0212421"}
                </div>
              </td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask rounded h-12 w-12">
                      <img
                        src={
                          product.image ||
                          "https://img.daisyui.com/images/profile/demo/2@94.webp"
                        }
                        alt={product.name || "Avatar"}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">
                      {product.name || "Áo polo nam Galvin cổ dệt bo len"}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div className="badge badge-success gap-2">Còn hạn</div>
                {/* <div className="badge badge-warning gap-2">Cận hạn</div>
                    <div className="badge badge-error gap-2">Hết hạn</div>  */}
              </td>
              <td>{product.importDate || "8/12/2024"}</td>
              <td>{product.expiryDate || "9/12/2024"}</td>
              <td>
                <h1 className="btn btn-ghost btn-xs">
                  {product.quantity || "900"}
                </h1>
              </td>
              <th>
                <button
                  className="w-6 h-6 rounded-lg mr-2"
                  style={{ backgroundColor: "#e2f2ea" }}
                  onClick={() =>
                    document.getElementById("modal_Quick_View").showModal()
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                    style={{ color: "#19b563" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </button>

                <button
                  className="w-6 h-6 rounded-lg mr-2"
                  style={{ backgroundColor: "#ebf3fe" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                    style={{ color: "#2f80ed" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>

                <button
                  id="btn__delete"
                  className="w-6 h-6 rounded-lg"
                  style={{ backgroundColor: "#feebe8" }}
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
              </th>
            </tr>
          );
        })
      ) : (
        <tr>
          <td colSpan="8" className="text-center">
            Không có sản phẩm nào
          </td>
        </tr>
      )}
      <dialog id="Delete" className="modal">
        <div className="modal-box w-3/12">
          <h3 className="font-bold text-lg">
            Bạn muốn xóa sản phẩm này khỏi kệ?
          </h3>
          <div className="flex modal-action justify-between">
            <button className="btn w-20 bg-orange-500">Đồng ý</button>
            <form method="dialog">
              <button className="btn w-20">Hủy</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
