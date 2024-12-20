import React from "react";
import { Link } from "react-router-dom";

export default function SupplyTableDetail({ brands }) {
  return (
    <>
      {brands.map((brand) => (
        <tr className="z-20 hover:bg-slate-100">
          <th>
            <div>
              <div className="font-bold text-right">{brand.id}</div>
              {/* <Barcode value={brand._id} /> */}
            </div>
          </th>
          <td>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask rounded h-12 w-12">
                  <img src={brand.images[0]} alt={`Logo brand ${brand.name}`} />
                </div>
              </div>
              <h1 className="font-bold whitespace-nowrap">{brand.name}</h1>
            </div>
          </td>
          <td className="text-ellipsis">{brand.address}</td>
          <td className="text-right">{brand.phone}</td>
          <td className="whitespace-nowrap">{brand.supplyName}</td>

          <td className="whitespace-nowrap">
            {/* <button className=" w-6 h-6 rounded-sm mr-2" style={{backgroundColor: "#e2f2ea", outline:''}}
      onClick={()=>document.getElementById('Modal_ProductDetail').showModal()}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke-width="1.5" 
            stroke="currentColor" 
            class="size-6"
            style={{color: "#19b563"}}>
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round"
            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      </button> */}

           <Link to={"/update-supply"} state={{brand}}>
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
           </Link>

            <button
              id="btn__delete"
              className="w-6 h-6 rounded-sm "
              style={{ backgroundColor: "#feebe8", outline: "" }}
              onClick={() =>
                document.getElementById("DeleteSupplyDetail").showModal()
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
          </td>
        </tr>
      ))}
      {/* Delete Modal */}
      <dialog id="DeleteSupplyDetail" className="modal">
        <div className="modal-box w-3/12 ">
          <h3 className="font-bold text-lg">
            Bạn muốn xóa thương hiệu này khỏi danh sách bán?
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
