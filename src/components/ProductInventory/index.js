import { useBarcode } from "@createnextapp/react-barcode";
import React from "react";

export default function ProductInventory({ products }) {
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
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product) => (
          <React.Fragment key={product._id}>
              <tr key={product._id} className="hover:bg-slate-100">
                <td>
                  <div>
                    {/* <div className="font-bold">{product.product.code || "ASM001"}</div> */}
                  </div>
                </td>
                <td>
                  <div className="font-bold">{product.idPNK || "P0212421"}</div>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask rounded h-12 w-12">
                        {product.images && product.images.length > 0 ? (
                          <img src={product.images[0]} alt={product.title} />
                        ) : (
                          <img src="/path/to/default/image.jpg" alt="Default" />
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span>{product.status === "in_stock" ?  "Còn hàng" : "Hết hàng"}</span>
                </td>
                <td>
                  {formatDate(product.createdAt)}
                </td>
                <td>{formatDate(product.expires)}</td>
                <td>
                  {product.quantity}
                </td>
                <th>
                  <button className="w-6 h-6 rounded-lg mr-2" onClick={() => document.getElementById("modal_Quick_View").showModal()}>
                    {/* Icon for quick view */}
                  </button>
                  <button className="w-6 h-6 rounded-lg mr-2">
                    {/* Icon for edit */}
                  </button>
                  <button
                    id="btn__delete"
                    className="w-6 h-6 rounded-lg"
                    onClick={() => document.getElementById("Delete").showModal()}
                  >
                    {/* Icon for delete */}
                  </button>
                </th>
              </tr>
          </React.Fragment>
        ))
      ) : (
        <tr>
          <td colSpan="8" className="text-center">Không có sản phẩm nào</td>
        </tr>
      )}

      <dialog id="Delete" className="modal">
        <div className="modal-box w-3/12">
          <h3 className="font-bold text-lg">Bạn muốn xóa sản phẩm này khỏi kệ?</h3>
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
