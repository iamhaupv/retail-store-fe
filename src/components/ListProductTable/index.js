import React, { useEffect, useState } from "react";
import TableProductDetail from "../TableProductDetail";
import apiGetListProduct from "../../apis/apiGetListProduct";
import apiGetProductById from "../../apis/apiGetProductById";
import { useParams } from "react-router-dom";
import { useBarcode } from '@createnextapp/react-barcode'

export default function ListProductTable() {
  const [products, setProducts] = useState([]);
  const fetch = async () => {
    const response = await apiGetListProduct();
    console.log(response.products);
    setProducts(response.products);
  };
  useEffect(() => {
    fetch();
  }, []);
  // const {inputRef} = useBarcode({
  //   value:'ASM001',
  //   options: {
  //       displayValue: false,
  //       background: '#ffffff',
  //       width: 1,
  //       height: 25,
  //   }
  //  })
  return (
    <>
      <div>
        {/* filter */}
        <div className="flex ">
          {/* search Input */}
          <label className="input input-bordered input-sm	 flex items-center gap-2 mr-5 ">
            <input type="text" className="grow " placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 18"
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
          {/* Brand Option */}
          <select className="select select-bordered select-sm w-52  mr-5">
            <option disabled selected>
              Thương hiệu
            </option>
            <option>KFC</option>
            <option>Coca Cola</option>
          </select>

          {/* status Option */}
          <select className="select select-bordered select-sm w-52">
            <option disabled selected>
              Trạng thái
            </option>
            <option>Đang bán</option>
            <option>Hết hàng</option>
          </select>
        </div>
        {/* Nofication and Button Add */}

        <div className="flex justify-between mt-6">
          <h4 className="font-bold text-xl w-32 ml-4">30 sản phẩm</h4>

          <button className="btn btn-success text-white w-36">
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
            Thêm mới
          </button>
        </div>
        {/* table Product */}

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                {/* <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th> */}
                <th>Modal</th>
                <th>Sản phẩm</th>
                <th>Thương hiệu</th>
                <th>Tình trạng</th>
                <th>Đã bán</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {products.map((product) => (
                <div>
                  <tr className="z-40">
                    <th>
                      <div>
                        <div className="font-bold">ASM001</div>
                        {/* <svg ref={inputRef} /> */}
                      </div>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask rounded h-12 w-12">
                            <img
                              src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          {/* title */}
                          <div className="font-bold">
                            {product.title}
                          </div>
                          {/* Rating */}
                          <div className="rating rating-sm">
                            <input
                              type="radio"
                              name="rating-4"
                              className="mask mask-star-2 bg-green-500"
                            />
                            <input
                              type="radio"
                              name="rating-4"
                              className="mask mask-star-2 bg-green-500"
                              defaultChecked
                            />
                            <input
                              type="radio"
                              name="rating-4"
                              className="mask mask-star-2 bg-green-500"
                            />
                            <input
                              type="radio"
                              name="rating-4"
                              className="mask mask-star-2 bg-green-500"
                            />
                            <input
                              type="radio"
                              name="rating-4"
                              className="mask mask-star-2 bg-green-500"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      Dior
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        Desktop Support Technician
                      </span>
                    </td>
                    <td>Đang bán</td>
                    <th>
                      <button className="btn btn-ghost btn-xs">900</button>
                    </th>

                    <th>
                      <button
                        className=" w-6 h-6 rounded-sm mr-2"
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
                        className="w-6 h-6 rounded-sm "
                        style={{ backgroundColor: "#feebe8", outline: "" }}
                        onClick={() =>
                          document.getElementById("Delete").showModal()
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

                      {/* Alert Delete */}
                    </th>
                  </tr>

                  <dialog id="Delete" className="modal">
                    <div className="modal-box w-3/12 ">
                      <h3 className="font-bold text-lg">
                        Bạn muốn xóa sản phẩm này khỏi danh sách bán?
                      </h3>
                      <div className="flex items-center ">
                        <label className="mr-2">
                          <input type="checkbox" className="checkbox" />
                        </label>
                        <p className="py-4">Hàng chưa về</p>
                      </div>
                      <div className="flex items-center ">
                        <label className="mr-2">
                          <input type="checkbox" className="checkbox" />
                        </label>
                        <p className="py-4">Không còn kinh doanh</p>
                      </div>
                      {/* Text Area */}
                      <textarea
                        placeholder="Bio"
                        className="textarea textarea-bordered textarea-lg w-full max-w-xs"
                      ></textarea>

                      <div className="flex modal-action justify-between ">
                        <button className="btn w-20 bg-orange-500">
                          {" "}
                          Đồng ý
                        </button>
                        <form method="dialog ">
                          {/* if there is a button, it will close the modal */}
                          <button className="btn w-20">Hủy</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </div>
              ))}
              {/* row 2 */}
              {/* <TableProductDetail/> */}
              {/* row 3 */}
              {/* <TableProductDetail/> */}
              {/* row 4 */}
              {/* <TableProductDetail/> */}
            </tbody>
            <tfoot>
              <tr></tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
}
