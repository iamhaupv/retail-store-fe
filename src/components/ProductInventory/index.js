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
  const checkExpirationStatus = (expires) => {
    const currentDate = new Date();
    const expirationDate = new Date(expires);
    const timeDifference = expirationDate - currentDate;
    const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));

    if (daysLeft <= 0) {
      return <span className="text-red-500">Hết hạn</span>;
    } else if (daysLeft <= 5) {
      return <span className="text-orange-500">Gần hết hạn</span>;
    } else if (daysLeft > 5) {
      return <span className="text-green-500">Còn hạn</span>;
    }
  };
  return (
    <>
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product) => (
          <tr key={product._id}>
            <td>
              <div>
                <div className="font-bold">{product.id || "ASM001"}</div>
                {/* <Barcode value={product._id}/> */}
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
                    )}{" "}
                    <span>{product.title}</span>
                  </div>
                </div>
                {product.title}
              </div>
            </td>
            <td>
              <span>{checkExpirationStatus(product.expires)}</span>
            </td>
            <td>{formatDate(product.expires)}</td>
            <td> {product.quantityDynamic} </td>
            <td>{product?.unit}</td>
            <td>{product.importPrice.toLocaleString()} đ</td>
            {/* <td>
              <button
                id="btn__delete"
                className="w-6 h-6 rounded-lg "
                style={{ backgroundColor: "#feebe8", outline: "" }}
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
            </td> */}
          </tr>
        ))
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
