import React, { useEffect, useState } from "react";
import Autocomplete from "../../components/AutoComplete";
import { Link } from "react-router-dom";
import TableProductDetail from "../../components/TableProductDetail";
import apiGetListProduct from "../../apis/apiGetListProduct";
import apiGetListBrands from "../../apis/apiGetListBrand";

export default function ListProductOutStock() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const fetch = async () => {
    const response = await apiGetListProduct();
    setProducts(response.products);
  };
  const fetchBrans = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiGetListBrands(token);
      setBrands(response.brands);
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    fetchBrans();
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
      <div className="">
        {/* filter */}
        <div className="flex ">
          {/* search Input */}
          <div className="ml-4 w-72 h-10 ">
            <Autocomplete suggestion={suggestion} placeholder="Tìm kiếm" />
          </div>
          {/* Brand Option */}

          {/* <select className="select select-bordered select-sm w-52  mr-5">
            <option disabled selected>
              Thương hiệu
            </option>
            {brands.map((brand) => (
              <option key={brand._id}>{brand.name}</option>
            ))}
          </select> */}

          <div className="ml-4 w-72 h-10">
            <Autocomplete suggestion={suggestion} placeholder="Nhà cung cấp" />
          </div>

          {/* status Option */}
          {/* <select className="select select-bordered h-4 w-52 ml-4">
            <option disabled selected>
              Trạng thái
            </option>
            <option>Đang bán</option>
            <option>Hết hàng</option>
          </select> */}
        </div>
        {/* Nofication and Button Add */}

        <div className="flex justify-between mt-6">
          <h4 className="font-bold text-xl w-32 ml-4">30 sản phẩm</h4>
          <Link to="/product">
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
          </Link>
        </div>
        {/* table Product */}

        <div
          className="overflow-y-auto  mt-7"
          style={{
            height: "calc(90vh - 310px)",
          }}
        >
          <table className="table table-pin-rows ">
            {/* head */}
            <thead>
              <tr>
                {/* <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th> */}
                <th>Mã sản phẩm</th>
                <th>Sản phẩm</th>
                <th>Nhà cung cấp</th>
                <th>Tình trạng</th>
                <th>Số lượng</th>
                <th>Giá bán</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <TableProductDetail />
            </tbody>
            <tfoot>
              <tr></tr>
            </tfoot>
          </table>
        </div>
        {/* pagination */}
        <div className="w-full justify-end pt-3 pr-2">
          <ul className="flex items-center justify-end gap-2 ">
            <li>
              <button className="flex h-10 min-w-10 items-center justify-center rounded-lg border border-stroke bg-white px-2 text-base font-medium text-dark hover:bg-gray-1 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
                <span>
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 9.8125H4.15625L9.46875 4.40625C9.75 4.125 9.75 3.6875 9.46875 3.40625C9.1875 3.125 8.75 3.125 8.46875 3.40625L2 9.96875C1.71875 10.25 1.71875 10.6875 2 10.9688L8.46875 17.5312C8.59375 17.6562 8.78125 17.75 8.96875 17.75C9.15625 17.75 9.3125 17.6875 9.46875 17.5625C9.75 17.2812 9.75 16.8438 9.46875 16.5625L4.1875 11.2188H17.5C17.875 11.2188 18.1875 10.9062 18.1875 10.5312C18.1875 10.125 17.875 9.8125 17.5 9.8125Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </button>
            </li>
            <li>
              <button className="flex h-10 min-w-10 items-center justify-center rounded-lg border border-stroke bg-white px-2 text-base font-medium text-dark hover:bg-gray-1 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
                1
              </button>
            </li>
            <li>
              <button className="flex h-10 min-w-10 items-center justify-center rounded-lg border border-primary bg-green-500 px-2 text-base font-medium text-white">
                2
              </button>
            </li>
            <li>
              <button className="flex h-10 min-w-10 items-center justify-center rounded-lg border border-stroke bg-white px-2 text-base font-medium text-dark hover:bg-gray-1 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
                3
              </button>
            </li>
            <li>
              <button className="flex h-10 min-w-10 items-center justify-center rounded-lg border border-stroke bg-white px-2 text-base font-medium text-dark hover:bg-gray-1 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
                4
              </button>
            </li>
            <li>
              <button className="flex h-10 min-w-10 items-center justify-center rounded-lg border border-stroke bg-white px-2 text-base font-medium text-dark hover:bg-gray-1 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
                5
              </button>
            </li>
            <li>
              <button className="flex h-10 min-w-10 items-center justify-center rounded-lg border border-stroke bg-white px-2 text-base font-medium text-dark hover:bg-gray-1 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 10L11.5312 3.4375C11.25 3.15625 10.8125 3.15625 10.5312 3.4375C10.25 3.71875 10.25 4.15625 10.5312 4.4375L15.7812 9.78125H2.5C2.125 9.78125 1.8125 10.0937 1.8125 10.4688C1.8125 10.8438 2.125 11.1875 2.5 11.1875H15.8437L10.5312 16.5938C10.25 16.875 10.25 17.3125 10.5312 17.5938C10.6562 17.7188 10.8437 17.7812 11.0312 17.7812C11.2187 17.7812 11.4062 17.7188 11.5312 17.5625L18 11C18.2812 10.7187 18.2812 10.2812 18 10Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </div>
        {/* end Paginination */}
      </div>
    </>
  );
}
