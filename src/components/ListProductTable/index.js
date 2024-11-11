import React, { useEffect, useState } from "react";
import TableProductDetail from "../TableProductDetail";
import apiGetListProduct from "../../apis/apiGetListProduct";

import apiGetListBrand from "../../apis/apiGetListBrand";

import Autocomplete from "../AutoComplete";
import { Link } from "react-router-dom";
import apiFilterProductByName from "../../apis/apiFilterProductByName";
import TableProductByName from "../TableProductByName";
import apiFilterProductByStatus from "../../apis/apiFilterProductByStatus";
import TableProductInStock from "../TableProductInStock";

export default function ListProductTable() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [productByStatus, setProductByStatus] = useState([])
  const [productByName, setProductByName] = useState([]);
  const [status, setStatus] = useState("")
  const [title, setTitle] = useState("");
  const fetchProductByStatus = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid");
      const response = await apiFilterProductByStatus(token, { status: status });
      setProductByStatus(
        Array.isArray(response.products) ? response.products : []
      );
    } catch (error) {
      console.log("fetch product by status is error " + error);
    }
  }
  useEffect(() => {
    fetchProductByStatus()
  }, [status])
  console.log(status);
  
  const handleChangeStatus = async(e) => {
    setStatus(e.target.value)
  }
  const fetch = async () => {
    const response = await apiGetListProduct();
    setProducts(response.products);
  };
  const fetchBrans = async () => {
    try {
      const response = await apiGetListBrand();
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
  const fetchProductByName = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid");
      const response = await apiFilterProductByName(token, { title: title });
      setProductByName(
        Array.isArray(response.products) ? response.products : []
      );
    } catch (error) {
      console.log("fetch product by name is error " + error);
    }
  };
  const handleChangeTitle = async (e) => {
    setTitle(e.target.value);
  };
  useEffect(() => {
    fetchProductByName();
  }, [title]);
  return (
    <>
      <div className="">
        {/* filter */}
        <div className="flex ">
          {/* search Input */}
          <div className="ml-3 mt-2 w-52 h-3 ">
            {/* <Autocomplete suggestion={suggestion} placeholder="Tìm kiếm" /> */}
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Search"
                onChange={handleChangeTitle}
              />
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
          {/* Brand Option */}

          {/* <select className="select select-bordered select-sm w-52  mr-5">
            <option disabled selected>
              Thương hiệu
            </option>
            {brands.map((brand) => (
              <option key={brand._id}>{brand.name}</option>
            ))}
          </select> */}

          <div className="ml-4 mt-2 w-52 h-11">
            <Autocomplete suggestion={suggestion} placeholder="Nhà cung cấp" />
          </div>

          {/* status Option */}
          <select onChange={handleChangeStatus} className="select select-bordered h-4 w-52 ml-4">
            <option value={""} selected>
              Trạng thái
            </option>
            <option value={"in_stock"}>Đang bán</option>
            <option value={"out_of_stock"}>Hết hàng</option>
          </select>
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
            height: "calc(90vh - 280px)",
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
              {status === "" ? (title === "" ? (
                <TableProductDetail />
              ) : productByName.length > 0 ? (
                <TableProductByName productByName={productByName} />
              ) : (
                <div>Không tìm thấy sản phẩm nào</div>
              )) : <TableProductInStock productByStatus={productByStatus}/> }
              
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
