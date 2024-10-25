import { useBarcode } from "@createnextapp/react-barcode";
import { CarouselProduct } from "../CarouselProduct";
import React, { useEffect, useState } from "react";
import apiGetAllProduct from "../../apis/apiGetAllProducts";
import apiIsDisplay from "../../apis/apiIsDisplay";

export default function TableProductDetail() {
  const [products, setProducts] = useState([]);
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
  const fetchPrducts = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiGetAllProduct(token);
      setProducts(response.products);
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    fetchPrducts();
  }, []);
  const handleChangeIsDisplay = async (pid, isDisplay) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid");
      await apiIsDisplay(token, pid, { isDisplay });
      fetchPrducts();
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
      {products.map((product) => (
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
                {/* Rating */}
                <div className="rating rating-sm" s>
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
            {product.brand.name}
            <br />
            <span className="badge badge-ghost badge-sm">Nước giải khát</span>
          </td>
          <td>{product.status === "in_stock" ? "Đang bán" : "Hết hàng"}</td>
          <td>
            <button className="btn btn-ghost btn-xs">{product.sold}</button>
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
      <div className="modal-box w-10/12 max-w-4xl h-auto">
        <div className="card lg:card-side bg-base-100 ">
          {/* Card */}
          {/* <figure> */}
            {selectedProduct && <div><CarouselProduct product={selectedProduct} />
            
            </div> }
          {/* </figure> */}
          
            <div className="card-body">
            <h1 className="card-title text-3xl font-medium">
              Ibanez RG470DX-SFM Electric Guitar,Sea Foam Green Matte
            </h1>
            <h1>
              Body Body Type: Solidbody Body Material: Meranti Body Shape: RG
              Color:Sea Foam Green Matte NECK...{" "}
            </h1>
            <h1 className="text-xl font-medium">14.600.000đ</h1>
            <u href="" className="">
              View details
            </u>

            <div className="card-actions justify-start">
              <div>
                {/* <h3 className="font-medium">Quantity</h3> */}
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
              </div>
            </div>
          </div>
          ))}
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
