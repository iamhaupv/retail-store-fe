import React, { useState } from "react";
import ProductInventory from "../ProductInventory";
import ListProductInventory from "../ListProductInventory";

export default function InventoryProduct() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-auto">
      <select className="select-sm select-bordered w-32">
        <option disabled selected>
          Kệ
        </option>
        <option>Kệ 1</option>
        <option>Kệ 2</option>
        <option>Kệ 3</option>
        <option>Kệ 4</option>
        <option>Kệ 5</option>
      </select>
      <div className="flex justify-between items-center pt-5">
        <h4 className="font-bold text-xl w-32 ml-4">Hàng tồn kho</h4>
        <button
          className="btn btn-success text-white w-48"
          onClick={openModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Thêm hàng vào kệ
        </button>
      </div>
      {/* TableInventory */}
      <div className="overflow-y-auto h-80 mt-7">
        <table className="table table-pin-rows">
          <thead>
            <tr>
              <th>Mã sản phẩm</th>
              <th>Mã phiếu</th>
              <th>Sản phẩm</th>
              <th>Tình trạng</th>
              <th>Ngày Nhập</th>
              <th>Ngày hết hạn</th>
              <th>Số lượng</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <ProductInventory />
            <ProductInventory />
            <ProductInventory />
            <ProductInventory />
            <ProductInventory />
            <ProductInventory />
            <ProductInventory />
            <ProductInventory />
          </tbody>
          <tfoot>
            <tr></tr>
          </tfoot>
        </table>
      </div>

      {/* Thêm Hàng vào kệ */}
      {isModalOpen && (
       <div className="fixed w-screen z-40 top-0  inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="modal-box w-full max-w-6xl h-full overflow-y-hidden  ">
          <h3 className="font-bold text-lg mb-6">Danh sách sản phẩm</h3>
          <div className="flex items-center mb-4 w-full">
            {/* Search Input  */}
            <label className="input input-bordered w-52 h-12 flex  items-center gap-2">
              <input type="text" className="grow" placeholder="Tên sản phẩm" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
            {/* Product */}
            <select className="select select-bordered w-52 ml-3 mr-3">
              <option disabled selected>
                Loại sản phẩm
              </option>
              <option>Đồ ăn</option>
              <option>Thức uống</option>
            </select>
            {/* Brand */}
            <select className="select select-bordered h-12 w-52 ">
              <option disabled selected>
                Thương hiệu
              </option>
              <option>KFC</option>
              <option>Pepsi</option>
            </select>
          </div>
          {/* table product  */}
          <div className=" overflow-y-scroll h-4/6">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  {/* <div className='w-7'> */}
                  <th></th>
                  {/* </div> */}
                  <th>Mã sản phẩm</th>
                  <th>Mã phiếu</th>
                  <th>Sản phẩm</th>
                  <th>Nhà cung cấp</th>
                  <th>Số lượng</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <ListProductInventory />
                {/* row 2 */}
                <ListProductInventory />
                {/* row 3 */}
                <ListProductInventory />
                {/* row 4 */}
                <ListProductInventory />
                {/* row 5 */}
                <ListProductInventory />
              </tbody>
              {/* foot */}
              <tfoot></tfoot>
            </table>
          </div>

          <div className="modal-action ">
            <div className="flex w-full">
              <button
                class="btn w-28 text-white"
                style={{ backgroundColor: "#f13612" }}
              >
                Thêm
              </button>
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}

                <button
                  class="btn w-28 ml-4"
                  style={{ backgroundColor: "#e0e0e0" }}
                  onClick={closeModal}
                >
                  Hủy
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
