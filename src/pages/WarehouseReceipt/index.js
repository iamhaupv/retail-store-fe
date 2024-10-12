import React, { useState } from "react";
import ListProductInventory from "../../components/ListProductInventory";
import ListProductWareHouse from "../../components/ListProductWareHouse";
import TableDetailWarehouse from "../../components/TableDetailWarehouse";

export default function WarehouseReceipt() {
  // const [image, setImage] = useState({});

  // const handleChange = (event, id) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImage((prevImages) => ({
  //         ...prevImages,
  //         [id]: reader.result,
  //       }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      {/* <Content component={Receipt}/> */}
      <div
        className="w-11/12 h-auto justify-center flex overflow-y-auto"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div className="w-11/12 mr-4 animate__animated animate__fadeInRight">
          <div className="w-full mr-4 rounded-sm">
            {/* Thông tin sản phẩm */}

            <div className="card bg-white rounded-lg top-7 grid  ">
              <h4 className="font-bold text-xl w-full ml-4">
                Tạo phiếu nhập kho
              </h4>

              <h4 className="font-medium text-base w-11/12 ml-4 mb-2 mt-3">
                Mã phiếu
              </h4>
              <input
                type="text"
                placeholder="Mã phiếu"
                className="input input-bordered w-11/12 h-10 ml-4"
                disabled
              />

              <h4 className="font-medium text-base w-11/12 ml-4 mb-2 mt-3">
                Người lập
              </h4>
              <input
                type="text"
                placeholder="Người lập"
                className="input input-bordered w-11/12 h-10 ml-4"
                disabled
              />
              <h4 className="font-medium text-base w-11/12 ml-4 mb-2 mt-3">
                Nhập về kho
              </h4>
              {/* Select type  */}
              <select className="select select-bordered w-11/12 ml-4 pt-2 mb-5">
                <option disabled selected>
                  Chọn kho nhập
                </option>
                <option>Tp.HCM</option>
                <option>Hà Nội</option>
                <option>Đà nẵng</option>
              </select>
              <h4 className="font-medium text-base w-6/12 ml-4 mb-2 mt-3">
                Ghi chú
              </h4>
              <textarea
                placeholder=""
                className="textarea textarea-bordered textarea-lg w-11/12 ml-4 mb-5"
              ></textarea>
            </div>
          </div>
          {/* Hình ảnh sản phẩm */}
          <div className="w-full h-fit mr-4 rounded-sm pt-4 pb-8">
            <div className="card bg-white h-fit rounded-sm top-7 grid pt-6 ">
              <h4 className="font-bold text-xl w-full ml-4">
                Danh sách mặt hàng PepsiCo
              </h4>
              <div className="flex pt-8 h-fit w-full  pb-2">
                {/* Ảnh SP đại diện */}
                {/* Hình 1 */}
                {/* <div className='w-4/12'> */}
                <button
                  className="hidden"
                  onClick={() =>
                    document.getElementById("AddWarehouseReceipt").showModal()
                  }
                  id="FileMain"
                />

                {isClicked ? 
                  // tableWareHouseReceipt
                  <div className="overflow-x-auto w-full h-96">
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th>Mã sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Giá nhập</th>
                        <th>Ngày hết hạn</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      <TableDetailWarehouse/>
                      {/* row 2 */}
                      <TableDetailWarehouse/>
                      {/* row 3 */}
                      <TableDetailWarehouse/>
                      {/* row 4 */}
                      <TableDetailWarehouse/>
                      <TableDetailWarehouse/>
                      {/* row 2 */}
                      <TableDetailWarehouse/>
                      {/* row 3 */}
                      <TableDetailWarehouse/>
                      {/* row 4 */}
                      <TableDetailWarehouse/>
                    </tbody>
                    {/* foot */}
                    <tfoot>
                      <tr>
                        
                      </tr>
                    </tfoot>
                  </table>
                </div>
                 : 
                  <label
                    htmlFor="FileMain"
                    className=" border-2 border-dashed w-full h-1/6 ml-4 mr-4 "
                    style={{ borderColor: "#D9D9D9" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class=""
                      style={{ color: "#D9D9D9" }}
                      className="w-full h-36 items-center"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </label>
                }
                {/* </div> */}
              </div>
            </div>
          </div>
          {/* Button Thêm và Hủy */}
          <div className="flex mt-5 mb-5 h-32">
            <button
              class="btn w-28 text-white "
              style={{ backgroundColor: "#f13612" }}
            >
              Thêm
            </button>
            <button
              class="btn w-28 ml-4"
              style={{ backgroundColor: "#e0e0e0" }}

            >
              Hủy
            </button>
          </div>
        </div>

        {/* <div className="w-3/12 rounded-md ml-7">
          <div className="card bg-white rounded-sm top-7 grid  ">
            
          </div>
        </div> */}
      </div>
      <dialog id="AddWarehouseReceipt" className="modal ">
        <div className="modal-box w-full max-w-4xl h-full overflow-y-hidden  ">
          <h3 className="font-bold text-lg mb-6">Danh sách sản phẩm</h3>
          <div className="flex items-center mb-4">
            {/* Brand */}
            <select className="select select-bordered w-52 ">
              <option disabled selected>
                Thương hiệu
              </option>
              <option>KFC</option>
              <option>Pepsi</option>
            </select>
            {/* Product */}
            <select className="select select-bordered w-52 ml-3 mr-3">
              <option disabled selected>
                Loại sản phẩm
              </option>
              <option>Đồ ăn</option>
              <option>Thức uống</option>
            </select>
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
                  <th>Modal</th>
                  <th>Sản phẩm</th>
                  <th>Thương hiệu</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <ListProductWareHouse />
                {/* row 2 */}
                <ListProductWareHouse />
                {/* row 3 */}
                <ListProductWareHouse />
                {/* row 4 */}
                <ListProductWareHouse />
                {/* row 5 */}
                <ListProductWareHouse />
                <ListProductWareHouse />
                <ListProductWareHouse />
              </tbody>
              {/* foot */}
              <tfoot></tfoot>
            </table>
          </div>

          <div className="modal-action ">
            <div className="flex w-full">
              
              <form method="dialog">
              <button
                class="btn w-28 text-white"
                style={{ backgroundColor: "#f13612" }}
                onClick={() => setIsClicked(true)}              >
                Thêm
              </button>
                {/* if there is a button in form, it will close the modal */}
                <button
                  class="btn w-28 ml-4"
                  style={{ backgroundColor: "#e0e0e0" }}
                >
                  Hủy
                </button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
