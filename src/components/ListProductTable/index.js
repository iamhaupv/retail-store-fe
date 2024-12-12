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

export default function ListProductTable({ role }) {
  const [listProduct, setListProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const maxDisplay = 5
  const isSearching = listProduct.length > 0
  const totalItems = isSearching ? listProduct.length : products.length;
  const isDisplay = totalItems >= maxDisplay;
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

    console.log("Key, value", key); 

    const sortedData = [
      ...(category === "" &&
      title === "" &&
      status === "" &&
      brand === "" &&
      id === ""
        ? products
        : listProduct),
    ].sort((a, b) => {
      //console.log("Key, value", typeof a[key]); 
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
      } else if (typeof a[key] === "object") {
        for (const [key2, value] of Object.entries(a[key])) {
          if (key2 === "name") {
            // Sắp xếp theo chuỗi (ABC)
            if (direction === "asc") {
              return a[key]["name"].localeCompare(b[key]["name"]);
            } else {
              return b[key]["name"].localeCompare(a[key]["name"]);
            }
          }
          // if (key2 === "name") {
          //   if (direction === "asc") {
          //     return a[key]["name"].localeCompare(b[key]["name"]);
          //   } else {
          //     return b[key]["name"].localeCompare(a[key]["name"]);
          //   }
          // } 
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

  const sortTable2 = (key) => {
    console.log("Key", key);

    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"; // Đổi hướng nếu cột đã được sắp xếp theo chiều tăng dần
    }

    if (Object.keys(key).length <= 0) {
      console.log("Object key", Object.keys(key));
      

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
    } else {
      for (const [key, value] of Object.entries(key)) {
        console.log(`${key}: ${value}`);
      }
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
  console.log(listProduct.length);
  
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
                  onClick={() => sortTable("title")}
                  className={
                    sortConfig.key === "title"
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
                <th
                 onClick={() => sortTable("unit")}
                 className={
                   sortConfig.key === "price"
                     ? sortConfig.direction === "asc"
                       ? "asc"
                       : "desc"
                     : ""
                 }
                >Đơn vị tính</th>
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
                  onClick={() => sortTable("sold")}
                  className={
                    sortConfig.key === "sold"
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
                  // listProduct={products}
                  listProduct={productsPagination}
                  reloadProducts={reloadProducts}
                  role={localStorage.getItem(
                    'role'
                  )}
                />
              ) : listProduct.length > 0 ? (
                <TableProductByName
                  listProduct={listProduct}
                  reloadProducts={reloadProducts}
                  role={localStorage.getItem(
                    'role'
                  )}
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
        {isDisplay && (
          <div className="w-full justify-end pt-3 pr-2">
            <ul className="flex items-center justify-end gap-2">
              {/* Nút trước */}
              <li>
                 <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="flex h-10 min-w-10 items-center justify-center rounded-lg border border-stroke bg-white px-2 text-base font-medium text-dark hover:bg-gray-1"
                >
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

              {/* Các số trang */}
              {visiblePages.map((page) => (
                <li key={page}>
                  <button
                    className={`flex h-10 min-w-10 items-center justify-center rounded-lg border ${
                      currentPage === page
                        ? "border-primary bg-green-500 text-white"
                        : "border-stroke bg-white text-dark"
                    } px-2 text-base font-medium hover:bg-gray-1`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                </li>
              ))}

              {/* Nút tiếp theo */}
              <li>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="flex h-10 min-w-10 items-center justify-center rounded-lg border border-stroke bg-white px-2 text-base font-medium text-dark hover:bg-gray-1"
                >
                  <span>
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
                  </span>
                </button>
              </li>
            </ul>
          </div>
        )}
        {/* end Paginination */}
      </div>
    </>
  );
}
