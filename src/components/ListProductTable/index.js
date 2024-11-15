import React, { useEffect, useState } from "react";
import TableProductDetail from "../TableProductDetail";
import apiGetListBrand from "../../apis/apiGetListBrand";
import Autocomplete from "../AutoComplete";
import { Link } from "react-router-dom";
import TableProductByName from "../TableProductByName";
import apiFilterProductMultiCondition from "../../apis/apiFilterProductMultiCondition";
import apiGetListCategory from "../../apis/apiGetListCategory";

export default function ListProductTable() {
  const [listProduct, setListProduct] = useState([]);
  const [brands, setBrands] = useState([]);
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState("")
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("accessToken")
      if(!token) throw new Error("Token is invalid!")
      const response = await apiGetListCategory(token)
      setCategories(Array.isArray(response.data) ? response.data : [])
    } catch (error) {
      console.log("fetch categories is error " + error);
      
    }
  }
  useEffect(() => {
    fetchCategories()
  }, [])
  const listCategory = Array.from(new Set(categories.map((unit) => unit.name))).map(
    (name) => {
      const matchedUnit = categories.find((unit) => unit.name === name);
      return {
        _id: matchedUnit._id,
        name: matchedUnit.name,
      };
    }
  );
  const fetchProductMultiCondition = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid");
      const response = await apiFilterProductMultiCondition(token, {
        title,
        status,
        brandName: brand,
        categoryName: category
      });
      setListProduct(Array.isArray(response.products) ? response.products : []);
    } catch (error) {
      console.log("api fetch product multi condtion is error " + error);
    }
  };
  useEffect(() => {
    fetchProductMultiCondition();
  }, [status, brand, title, category]);
  
  const handleChangeBrand = (selectedBrandName) => {
    if (selectedBrandName) {
      setBrand(selectedBrandName); // Cập nhật trạng thái thương hiệu
      console.log("Selected brand:", selectedBrandName);
    } else {
      setBrand(""); // Đặt lại giá trị thương hiệu về rỗng khi không có lựa chọn
      console.log("Brand selection cleared");
    }
  };
  const handleChangeCateogry = (selectedBrandName) => {
    if (selectedBrandName) {
      setCategory(selectedBrandName); // Cập nhật trạng thái thương hiệu
      console.log("Selected brand:", selectedBrandName);
    } else {
      setCategory(""); // Đặt lại giá trị thương hiệu về rỗng khi không có lựa chọn
      console.log("Brand selection cleared");
    }
  };
  // get all name brand
  const listBrand = Array.from(new Set(brands.map((unit) => unit.name))).map(
    (name) => {
      const matchedUnit = brands.find((unit) => unit.name === name);
      return {
        _id: matchedUnit._id,
        name: matchedUnit.name,
      };
    }
  );
  const handleChangeStatus = async (e) => {
    setStatus(e.target.value);
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
  const handleChangeTitle = async (e) => {
    setTitle(e.target.value);
  };
  return (
    <>
      <div className="">
        {/* filter */}
        <div className="flex ">
          {/* search Input */}
          <div className="ml-3 mt-2 w-52 h-3 ">
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
          <div className="ml-4 mt-2 w-52 h-11">
            {/* filter brand */}
            <Autocomplete
              suggestion={listBrand}
              onchange={handleChangeBrand} // This should call your API or update state
              placeholder="Chọn thương hiệu"
              value={brand} // Pass the current brand state
            />
          </div>

          {/* status Option */}
          <select
            onChange={handleChangeStatus}
            className="select select-bordered h-4 w-52 ml-4"
          >
            <option value={""} selected>
              Trạng thái
            </option>
            <option value={"in_stock"}>Đang bán</option>
            <option value={"out_of_stock"}>Hết hàng</option>
          </select>
          {/* filter category */}
          <Autocomplete
              suggestion={listCategory}
              onchange={handleChangeCateogry} // This should call your API or update state
              placeholder="Chọn loại sản phẩm"
              value={category} // Pass the current brand state
            />
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
              {category === "" && title === "" && status === "" && brand === "" ? (
                <TableProductDetail />
              ) : listProduct.length > 0 ? (
                <TableProductByName listProduct={listProduct} />
              ) : (
                <td>
                  <div>Không có sản phẩm nào</div>
                </td>
              )}
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
