import { Link } from "react-router-dom";
export default function StockInDetail({ receipts }) {
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
      {receipts.map((receipt) => (
        <tr key={receipt._id} className="hover:bg-slate-100">
          <td className="text-right w-10">{receipt.idPNK}</td>
          <td>{formatDate(receipt.createdAt)}</td>
          <td>
            {/* {receipt.user.name} */}
            {receipt?.user?.employee?.name}
          </td>
          <td className="content-end text-right w-10">{receipt.products.length}</td>
          <td>
            <h1 className="flex justify-end items-center text-right">
            {receipt.products.reduce((total, product) => {
                const quantity = product.quantity || 0; // Số lượng thực tế
                const importPrice = product.importPrice || 0; // Giá nhập
                const productTotal = quantity * importPrice * product.unit.convertQuantity; // Tổng tiền cho mỗi sản phẩm
                return total + productTotal; // Cộng dồn tổng tiền
              }, 0).toLocaleString()}
            đ
            </h1>
          </td>
          <td className="justify-items-center">
            <Link to="/entry-form" state={{ receipt: receipt }}>
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
            </Link>
          </td>
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
