import React, { useEffect, useState } from "react";
import apiGetListProduct from "../../apis/apiGetListProduct";
import Autocomplete from "../AutoComplete";

export default function TableDetailWarehouse() {
  const [products, setProducts] = useState([]);
  const fetchPrducts = async () => {
    try {
      const response = await apiGetListProduct();
      setProducts(response.products);
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    fetchPrducts();
  }, []);
  //datePicker
  const [startDate, setStartDate] = useState(new Date());
  const suggestion = [
    { id: 1, name: "Tom Cook" },
    { id: 2, name: "Wade Cooper" },
    { id: 3, name: "Tanya Fox" },
    { id: 4, name: "Arlene Mccoy" },
    { id: 5, name: "Devon Webb" },
    { id: 6, name: "Nguyễn Thanh Khoa" },
    { id: 7, name: "Nguyễn Đức Long" },
  ];
  return (
    <>
      {products.map((product) => (
        <tr key={product._id} className="hover:bg-slate-100">
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
                <div className="font-bold">{product.title}</div>
                <span className="badge badge-ghost badge-sm">
                  Nước tăng lực
                </span>
              </div>
            </div>
          </td>
          <td>
            <input
              type="text"
              placeholder="10"
              className="input input-bordered w-36 h-10"
            />
          </td>
          <td>
          <div className="w-52  mr-3">
              <Autocomplete suggestion={suggestion} placeholder="Tìm kiếm" />
            </div>
          </td>
          <td>
            <input
              type="text"
              placeholder="10000"
              className="input input-bordered w-36 h-10"
            />
          </td>
          <td>
            <input type="date" className="input input-bordered w-40 h-10" />
          </td>
          <td>
            <div className="flex w-fit">
              <button
                id="btn__delete"
                className="w-6 h-6 rounded-sm "
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
            </div>
            {/* Alert Delete */}
          </td>
        </tr>
      ))}
    </>
  );
}