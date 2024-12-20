import { useBarcode } from "@createnextapp/react-barcode";
import { CarouselProduct } from "../CarouselProduct";
import React, { useEffect, useState } from "react";
import apiGetAllProduct from "../../apis/apiGetAllProducts";
import apiIsDisplay from "../../apis/apiIsDisplay";
import { Link } from "react-router-dom";

export default function TableProductInStock({productByStatus}) {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // const { inputRef } = useBarcode({
  //   value: "ASM001",
  //   options: {
  //     displayValue: false,
  //     background: "#ffffff",
  //     width: 1,
  //     height: 25,
  //   },
  // });
  const handleChangeIsDisplay = async (pid, isDisplay) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid");
      await apiIsDisplay(token, pid, { isDisplay });
    } catch (error) {
      throw new Error(error);
    }
  };
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    document.getElementById("modal_Quick_View").showModal();
  };

  return (
    <>
      {productByStatus.map((product) => (
        <tr key={product._id} className="hover:bg-slate-100">
          <td>
            <div>
              <div className="font-bold">ASM001</div>
              {/* <svg ref={inputRef} /> */}
            </div>
          </td>
          <td>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask rounded h-12 w-12">
                  <img src={product.images[0]} alt={`${product.name}`} />
                </div>
              </div>
              <div>
                <div className="font-bold">{product.title}</div>
                <span className="badge badge-ghost badge-sm">
                  {product.category.name}
                </span>
              </div>
            </div>
          </td>
          <td className="text-ellipsis">{product.brand.name}</td>
          <td className="whitespace-nowrap">
            {product.status === "in_stock" ? "Còn hàng" : "Hết hàng"}
          </td>
          <td>
            <h1 className="">{product.quantity}</h1>
          </td>
          <td>
            <h1 className="whitespace-nowrap">
              {product.price.toLocaleString()} đ
            </h1>
          </td>
          <td>
            <div className="flex w-fit">
              <button
                className=" w-6 h-6 rounded-lg mr-2"
                style={{ backgroundColor: "#e2f2ea", outline: "" }}
                onClick={() => handleOpenModal(product)}
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
              <Link to="/update-product">
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
              </Link>
              <button
                onClick={() => handleChangeIsDisplay(product._id, false)}
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
            </div>
            {/* Alert Delete */}
            <dialog id="Delete" className="modal" open={isDeleteModalOpen}>
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
                  <button className="btn w-20 bg-orange-500"> Đồng ý</button>
                  <form method="dialog ">
                    <button
                      onClick={() => setDeleteModalOpen(false)}
                      className="btn w-20"
                    >
                      Hủy
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          </td>
        </tr>
      ))}

      <dialog id="Delete" className="modal" open={isDeleteModalOpen}>
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
            <button className="btn w-20 bg-orange-500"> Đồng ý</button>
            <form method="dialog ">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="btn w-20"
              >
                Hủy
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Product Detail */}
      <dialog id="modal_Quick_View" className="modal">
        <div className="modal-box w-10/12 max-w-4xl h-3/5 overflow-y-hidden  ">
          <div className="card lg:card-side bg-base-100 h-full items-center">
            {/* <figure> */}
            {selectedProduct && (
              <div className="w-3/6 h-full">
                {/* <CarouselProduct product={selectedProduct} /> */}
                <div className="carousel w-full h-full">
                  {selectedProduct.images.map((image, index) => (
                    <div
                      key={index}
                      id={`slideProduct${index + 1}`}
                      className="carousel-item relative w-full"
                    >
                      <img
                        src={image}
                        className="w-full"
                        alt={`Product image ${index + 1}`}
                      />
                      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a
                          href={`#slideProduct${
                            index === 0 ? selectedProduct.images.length : index
                          }`}
                          className="btn btn-circle"
                        >
                          ❮
                        </a>
                        <a
                          href={`#slideProduct${
                            index + 2 > selectedProduct.images.length
                              ? 1
                              : index + 2
                          }`}
                          className="btn btn-circle"
                        >
                          ❯
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* </figure> */}

            <div className="card-body w-3/6 h-full">
              <h1 className="card-title text-3xl font-medium">
                {selectedProduct ? selectedProduct.title : ""}
              </h1>
              <h1>{selectedProduct ? selectedProduct.description : ""}</h1>
              <h1 className="text-xl font-medium">
                {selectedProduct ? selectedProduct.price : ""} đ
              </h1>

              <div className="card-actions justify-start">
                {/* <div>
                <div className="flex justify-center">
                  <div className="join mr-6">
                    <button className="join-item btn">+</button>
                    <button className="join-item btn">1</button>
                    <button className="join-item btn">-</button>
                  </div>
                  <button className="btn btn-neutral btn-wide" hidden>
                    Add to cart
                  </button>
                </div>
              </div> */}
              </div>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ">
            ✕
          </button>
        </form>
      </dialog>
    </>
  );
}
