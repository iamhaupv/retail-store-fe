import React, { useEffect, useState } from "react";
import apiGetListBrand from "../../apis/apiGetListBrand";
import Autocomplete from "../AutoComplete";
import { Link } from "react-router-dom";
import TableProductByName from "../TableProductByName";
import apiFilterProductMultiCondition from "../../apis/apiFilterProductMultiCondition";
import apiGetListCategory from "../../apis/apiGetListCategory";
import apiGetAllProduct from "../../apis/apiGetAllProducts";
import apiGetAllProductsPagination from "../../apis/apiGetAllProductsPagination";
import "./ListProductTable.css";
import Product from "../../pages/Product";

export default function ListProductTable({ role }) {
  const [products, setProducts] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [brands, setBrands] = useState([]);
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [id, setId] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [productsPagination, setProductsPagination] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  // #region table sort
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const sortTable = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"; // Đổi hướng nếu cột đã được sắp xếp theo chiều tăng dần
    }

    const sortedData = [
      ...(category === "" &&
      title === "" &&
      status === "" &&
      brand === "" &&
      id === ""
        ? products
        : listProduct),
    ].sort((a, b) => {
      if (typeof a[key] === "string") {
        // Sắp xếp theo chuỗi (ABC)
        if (direction === "asc") {
          return a[key].localeCompare(b[key]);
        } else {
          return b[key].localeCompare(a[key]);
        }
      } else if (typeof a[key] === "number") {
        // Sắp xếp theo số (bé nhất đến lớn nhất)
        if (direction === "asc") {
          return a[key] - b[key];
        } else {
          return b[key] - a[key];
        }
      }
      return 0;
    });

    setSortConfig({ key, direction });
    if(category === "" &&
      title === "" &&
      status === "" &&
      brand === "" &&
      id === ""){
        setProducts(sortedData);
      } else{
        setListProduct(sortedData);
      }
      
     // Cập nhật lại danh sách sản phẩm đã sắp xếp
  };


  
  // end region
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiGetListCategory(token);
      setCategories(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.log("fetch categories is error " + error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  const listCategory = Array.from(
    new Set(categories.map((unit) => unit.name))
  ).map((name) => {
    const matchedUnit = categories.find((unit) => unit.name === name);
    return {
      _id: matchedUnit._id,
      name: matchedUnit.name,
    };
  });
  const listId = Array.from(new Set(products.map((unit) => unit.id))).map(
    (id) => {
      const matchedUnit = products.find((unit) => unit.id === id);
      return {
        _id: matchedUnit._id,
        name: matchedUnit.id,
      };
    }
  );

  const fetchProductMultiCondition = async () => {
    try {
      if (!title && !status && !brand && !category && !id) {
        return;
      }
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid");
      const response = await apiFilterProductMultiCondition(token, {
        title,
        status,
        brandName: brand,
        categoryName: category,
        id: id,
      });
      setListProduct(Array.isArray(response.products) ? response.products : []);
    } catch (error) {
      console.log("api fetch product multi condtion is error " + error);
    }
  };
  useEffect(() => {
    fetchProductMultiCondition();
  }, [status, brand, title, category, id]);

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
  const fetchBrands = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiGetListBrand(token);
      setBrands(response.brands);
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    fetchBrands();
  }, []);
  const handleChangeTitle = async (e) => {
    setTitle(e.target.value);
  };
  const handleChangeId = (selectedBrandName) => {
    if (selectedBrandName) {
      setId(selectedBrandName);
    } else {
      setId("");
    }
  };
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiGetAllProduct(token);
      setProducts(Array.isArray(response.products) ? response.products : []);
    } catch (error) {
      throw new Error(error);
    }
  };

  const fetchProductsPagination = async (currentPage) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiGetAllProductsPagination(token, {
        page: currentPage,
        limit,
      });
      setProductsPagination(
        Array.isArray(response.products) ? response.products : []
      );
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    fetchProductsPagination(currentPage);
  }, [currentPage]);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const totalPages = Math.ceil(products.length / limit);
  const getVisiblePages = (currentPage, totalPages) => {
    const visiblePages = [];

    // Nếu currentPage <= 3, hiển thị 1-5
    if (currentPage <= 3) {
      for (let i = 1; i <= Math.min(5, totalPages); i++) {
        visiblePages.push(i);
      }
    }
    // Nếu currentPage >= totalPages - 2, hiển thị 5 trang cuối
    else if (currentPage >= totalPages - 2) {
      for (let i = totalPages - 4; i <= totalPages; i++) {
        if (i > 0) visiblePages.push(i);
      }
    }
    // Ngược lại, hiển thị 5 trang xung quanh currentPage
    else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        visiblePages.push(i);
      }
    }

    return visiblePages.filter((page) => page > 0 && page <= totalPages); // Lọc các trang hợp lệ
  };

  // Trong phần render cho pagination:
  const visiblePages = getVisiblePages(currentPage, totalPages);
  const reloadProducts = () => {
    fetchProductMultiCondition();
    fetchProducts();
    fetchProductsPagination();
  };
  return (
    <>
      <div className="">
        {/* filter */}
        <div className="w-full flex items-center justify-start ">
          {/* search Input */}

          <label className="input input-bordered input-sm flex items-center gap-2">
            <input
              type="text"
              className=" w-32 h-3"
              placeholder="Nhập tên sản phẩm"
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
          <div className="ml-4 w-72 h-10">
            <Autocomplete
              suggestion={listId}
              onchange={handleChangeId} // This should call your API or update state
              placeholder="Nhập mã sản phẩm"
              value={id} // Pass the current brand state
            />
          </div>
          {/* status Option */}
          <select
            onChange={handleChangeStatus}
            className="select select-bordered select-sm  ml-4"
          >
            <option value={""} selected>
              Trạng thái
            </option>
            <option value={"in_stock"}>Còn hàng</option>
            <option value={"out_of_stock"}>Hết hàng</option>
          </select>
          <div className="ml-4 w-72 h-10">
            {/* filter brand */}
            <Autocomplete
              suggestion={listBrand}
              onchange={handleChangeBrand} // This should call your API or update state
              placeholder="Chọn nhà cung cấp"
              value={brand} // Pass the current brand state
            />
          </div>

          {/* filter category */}
          <div className="ml-4 w-72 h-10">
            <Autocomplete
              suggestion={listCategory}
              onchange={handleChangeCateogry} // This should call your API or update state
              placeholder="Chọn loại sản phẩm"
              value={category} // Pass the current brand state
            />
          </div>
        </div>
        {/* Nofication and Button Add */}

        <div className="flex justify-between mt-6">
          <h4 className="font-bold text-xl w-full ml-4">
            {category === "" &&
            title === "" &&
            status === "" &&
            brand === "" &&
            id === ""
              ? products.length
              : listProduct.length}{" "}
            Sản phẩm
          </h4>
          {role === "admin" && (
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
          )}
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
                <th
                  onClick={() => sortTable("id")}
                  className={
                    sortConfig.key === "id"
                      ? sortConfig.direction === "asc"
                        ? "asc"
                        : "desc"
                      : ""
                  }
                >
                  Mã sản phẩm
                </th>
                <th
                  onClick={() => sortTable("name")}
                  className={
                    sortConfig.key === "name"
                      ? sortConfig.direction === "asc"
                        ? "asc"
                        : "desc"
                      : ""
                  }
                >
                  Sản phẩm
                </th>
                <th
                  onClick={() => sortTable("brand")}
                  className={
                    sortConfig.key === "brand"
                      ? sortConfig.direction === "asc"
                        ? "asc"
                        : "desc"
                      : ""
                  }
                >
                  Nhà cung cấp
                </th>
                <th
                  onClick={() => sortTable("status")}
                  className={
                    sortConfig.key === "status"
                      ? sortConfig.direction === "asc"
                        ? "asc"
                        : "desc"
                      : ""
                  }
                >
                  Tình trạng
                </th>
                <th
                  onClick={() => sortTable("quantity")}
                  className={
                    sortConfig.key === "quantity"
                      ? sortConfig.direction === "asc"
                        ? "asc"
                        : "desc"
                      : ""
                  }
                >
                  Số lượng
                </th>
                <th>Đơn vị tính</th>
                <th
                  onClick={() => sortTable("price")}
                  className={
                    sortConfig.key === "price"
                      ? sortConfig.direction === "asc"
                        ? "asc"
                        : "desc"
                      : ""
                  }
                >
                  Giá bán
                </th>
                <th
                  onClick={() => sortTable("soldQuantity")}
                  className={
                    sortConfig.key === "soldQuantity"
                      ? sortConfig.direction === "asc"
                        ? "asc"
                        : "desc"
                      : ""
                  }
                >
                  Số lượng đã bán
                </th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {category === "" &&
              title === "" &&
              status === "" &&
              brand === "" &&
              id === "" ? (
                <TableProductByName
                  listProduct={products}
                  reloadProducts={reloadProducts}
                />
              ) : listProduct.length > 0 ? (
                <TableProductByName
                  listProduct={listProduct}
                  reloadProducts={reloadProducts}
                />
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
        {/* pagination */}

        {/* end Paginination */}
      </div>
    </>
  );
}
