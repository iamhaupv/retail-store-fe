import React, { useState } from "react";
import apiProduct from "../../apis/apiProduct";
import { toast, ToastContainer } from "react-toastify";
import apiWarehouseReceipt from "../../apis/apiWarehouseReceipt";
export default function ProductInventory({ products }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
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
  const handleOpenChangeDiscount = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };
  const handleDiscountChange = async (e) => {
    const { name, value } = e.target;
    if (name === "discount") {
      // Ensure discount is a number between 0 and 100
      if (value < 0) value = 0;
      if (value > 100) value = 100;
    }

    setCurrentProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiProduct.apiAddDiscount(token, {
        id: currentProduct.id,
        discount: currentProduct.discount,
      });
      setIsModalOpen(false);
      if (response.success) {
        toast.success("Lưu thành công!");
      } else {
        toast.error("Lưu không công!");
      }
    } catch (error) {
      console.error("Error updating discount:", error);
    }
  };
  const handleOpenModalDelete = (product) => {
    setIsDeleteModal(true);
    setCurrentProduct(product)
  };
  const handleDeleteProduct = async(product) => {
    try {
      const token = localStorage.getItem("accessToken")
      if(!token) throw new Error("Token is invalid!")
      const receiptId = product.warehouseReceipt
      const productId = product._id
      const isDisplay = false
      const response = await apiWarehouseReceipt.apiChangeIsDisplayProduct(token, {receiptId, productId, isDisplay})
      setIsDeleteModal(false)
      if(response.success) toast.success("Xóa thành công!")
      
      else toast.error("Xóa không thành công!")
    } catch (error) {
      console.log("handle delete product is error", error);
      
    }
  }
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
            <td>{product.discount || 0}%</td>
            <td>
              <div className="flex">
                <button
                  className=" w-6 h-6 rounded-sm mr-2"
                  style={{ backgroundColor: "#ebf3fe", outline: "" }}
                  onClick={() => handleOpenChangeDiscount(product)}
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
                  id="Delete"
                  className="w-6 h-6 rounded-sm "
                  style={{ backgroundColor: "#feebe8", outline: "" }}
                  onClick={()=>handleOpenModalDelete(product)}
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
              </div>
            </td>
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
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Chỉnh sửa giảm giá</h3>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="title">
                {currentProduct?.title}
              </label>
              <div className="mb-4">
                <img
                  src={currentProduct?.images[0]}
                  alt={currentProduct?.title}
                  className="w-full h-64 object-cover rounded-md"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="importPrice">
                Giảm giá (%):
              </label>
              <input
                type="number"
                id="discount"
                name="discount"
                value={currentProduct?.discount || ""}
                onChange={handleDiscountChange}
                className="input input-bordered w-full"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleSubmit}
                className="btn bg-blue-500 text-white"
              >
                Lưu thay đổi
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn bg-gray-500 text-white"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
      {isDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h3 className="font-bold text-lg text-center mb-4">
              Bạn muốn xóa sản phẩm này khỏi kho?
            </h3>
            
            <p className="text-sm text-gray-600 text-center mb-6">
              Bạn đang muốn xóa sản phẩm {currentProduct.title}.
            </p>
            <div className="mb-4">
                <img
                  src={currentProduct?.images[0]}
                  alt={currentProduct?.title}
                  className="w-full h-64 object-cover rounded-md"
                />
              </div>
            <div className="flex justify-center gap-4">
              <button
                className="btn w-24 bg-red-500 text-white hover:bg-red-600"
                onClick={()=>handleDeleteProduct(currentProduct)}
              >
                Đồng ý
              </button>
              <button
                className="btn w-24 bg-gray-300 text-black hover:bg-gray-400"
                onClick={() => setIsDeleteModal(false)}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
