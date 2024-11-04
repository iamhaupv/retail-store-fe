import { useBarcode } from "@createnextapp/react-barcode";
import { CarouselProduct } from "../CarouselProduct";
import React from "react";

export default function ProductInventory() {
  const { inputRef } = useBarcode({
    value: "ASM001",
    options: {
      displayValue: false,
      background: "#ffffff",
      width: 1,
      height: 25,
    },
  });
  return (
    <>
      <tr className="hover:bg-slate-100">
        <td>
          <div>
            <div className="font-bold">ASM001</div>
            <svg ref={inputRef} />
          </div>
        </td>
        <td>
          <div className="font-bold">P0212421</div>
        </td>
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
              <div className="font-bold">Áo polo nam Galvin cổ dệt bo len</div>
            </div>
          </div>
        </td>
        {/* <td>
         Dior
         <br />
         <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
       </td> */}
        <td>
          
              <div className="badge badge-success gap-2 whitespace-nowrap">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-4 w-4 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                Còn hạn
              </div>
            
              {/* <div className="badge badge-warning gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-4 w-4 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                Cận hạn
              </div>
            
              <div className="badge badge-error gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-4 w-4 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                Hết hạn
              </div> */}
            
        </td>
        <td>8/12/2024</td>
        <td>9/12/2024</td>
        <td>
          <button className="btn btn-ghost btn-xs">900</button>
        </td>
        <td className="whitespace-nowrap">
          <button
            className=" w-6 h-6 rounded-lg mr-2"
            style={{ backgroundColor: "#e2f2ea", outline: "" }}
            onClick={() =>
              document.getElementById("modal_Quick_View").showModal()
            }
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
            id="btn__delete"
            className="w-6 h-6 rounded-lg "
            style={{ backgroundColor: "#feebe8", outline: "" }}
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

          {/* Alert Delete */}
        </td>
      </tr>

      <dialog id="Delete" className="modal">
        <div className="modal-box w-3/12 ">
          <h3 className="font-bold text-lg">
            Bạn muốn xóa sản phẩm này khỏi kệ?
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

      {/* Product Detail */}
      {/* <dialog id="modal_Quick_View" className="modal">
        <div className="modal-box w-10/12 max-w-4xl h-3/5 overflow-y-hidden  ">
          <div className="card lg:card-side bg-base-100 h-full items-center">
            {selectedProduct && (
              <div className="w-3/6 h-full">
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

            <div className="card-body w-3/6 h-full">
              <h1 className="card-title text-3xl font-medium">
                Ibanez RG470DX-SFM Electric Guitar,Sea Foam Green Matte
              </h1>
              <h1>
                Body Body Type: Solidbody Body Material: Meranti Body Shape: RG
                Color:Sea Foam Green Matte NECK...{" "}
              </h1>
              <h1 className="text-xl font-medium">14.600.000đ</h1>
              <div className="card-actions justify-start">
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
      </dialog> */}
    </>
  );
}
