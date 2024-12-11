import { useEffect, useState } from "react";
import ProductInventory from "../ProductInventory";
import apiGetAllProductByReceipt from "../../apis/apiGetAllProductByReceipt";
import Autocomplete from "../AutoComplete";
import apiGetFilteredWarehouseReceipts from "../../apis/apiGetFilteredWarehouseReceipts";
import FilterProductByCondition from "../FilterProductByCondition";
import apiWarehouseReceipt from "../../apis/apiWarehouseReceipt";
import "./InventoryProduct.css";
import { ToastContainer } from "react-toastify";
export default function InventoryProduct({ onChangeModal }) {
  const [id, setId] = useState("");
  const [productsByStatus, setProductsByStatus] = useState([]);
  const [status, setStatus] = useState("");
  const [productsByTitle, setProductsByTitle] = useState([]);
  const [products, setProducts] = useState([]);
  const [idPNK, setIdPNK] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [filterProduct, setFilterProduct] = useState([]);
  // #region table sort
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const sortTable = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"; // Đổi hướng nếu cột đã được sắp xếp theo chiều tăng dần
    }

    const sortedData = [
      ...(id === "" &&
      idPNK === "" &&
      title === "" &&
      brand === "" &&
      status === ""
        ? products
        : filterProduct),
    ].sort((a, b) => {
      if (typeof a[key] == "string") {
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
    setProducts(sortedData); // Cập nhật lại danh sách sản phẩm đã sắp xếp
  };
  // end region
  const fetchSearchProductByExpires = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid");

      // Reset dữ liệu cũ trước khi gọi API mới
      setProductsByStatus([]);

      // Lấy dữ liệu mới từ API
      const response = await apiWarehouseReceipt.apiSearchProductExpires(
        token,
        {
          expirationStatus: status,
        }
      );

      // Cập nhật sản phẩm theo trạng thái hết hạn
      setProductsByStatus(response.products || []);
    } catch (error) {
      console.error("Error fetching product by expiration status:", error);
    }
  };
  useEffect(() => {
    
    fetchSearchProductByExpires();
  }, [status]);
  const fetchSearchProductByTile = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid");
      const response = await apiWarehouseReceipt.apiSearchByName(token, {
        productId: id,
        title: title,
      });
      setProductsByTitle(
        Array.isArray(response?.products) ? response?.products : []
      );
    } catch (error) {}
  };
  useEffect(() => {
    
    fetchSearchProductByTile();
  }, [title, id]);
  const fetchProductByReceipt = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiGetAllProductByReceipt(token);
      setProducts(response.products || []);
    } catch (error) {
      console.log("fetch product by shelf is error " + error);
    }
  };
  useEffect(() => {
    
    fetchProductByReceipt();
  }, []);
  const handleChangeId = (e) => {
    setId(e.target.value);
  };
  const handleChangeName = (e) => {
    setTitle(e.target.value);
  };

  // useEffect(() => {
  //     const fetchProductByCondition = async () => {
  //       try {
  //         const token = localStorage.getItem("accessToken");
  //         if (!token) throw new Error("Token is invalid!");
  //         const response = await apiGetFilteredWarehouseReceipts(token, {
  //           title: title,
  //           idPNK: idPNK,
  //           brand: brand,
  //           category: category,
  //         });
  //         if (response && Array.isArray(response.receipts)) {
  //           setFilterProduct([]);
  //           setFilterProduct(response.receipts);
  //         } else {
  //           setFilterProduct([]);
  //         }
  //       } catch (error) {
  //         console.log("fetch product by condition is error!" + error);
  //       }
  //     };
  //     if(idPNK || brand) fetchProductByCondition();
  // }, [idPNK, brand, category]);
  const fetchProductByCondition = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");

      // Reset filterProduct để làm sạch dữ liệu cũ trước khi gọi API
      setFilterProduct([]);

      // Gọi API để lấy dữ liệu mới dựa trên các điều kiện
      const response = await apiGetFilteredWarehouseReceipts(token, {
        title: title,
        idPNK: idPNK,
        brand: brand,
        category: category,
      });

      // Nếu API trả về dữ liệu hợp lệ, cập nhật filterProduct với dữ liệu mới
      if (response && Array.isArray(response.receipts)) {
        setFilterProduct(response.receipts);
      } else {
        // Nếu không có dữ liệu, đảm bảo rằng filterProduct là mảng rỗng
        setFilterProduct([]);
      }
    } catch (error) {
      console.log("Error fetching products by condition:", error);
    }
  };
  useEffect(() => {
    

    // Kiểm tra nếu có thay đổi giá trị idPNK hoặc brand, thì gọi API
    if (idPNK || brand) {
      fetchProductByCondition();
    } else {
      // Nếu không có idPNK hoặc brand, xóa filterProduct
      setFilterProduct([]);
    }
  }, [idPNK, brand]); // Khi idPNK hoặc brand thay đổi, gọi lại useEffect

  const listIdPNK = () => {
    const uniqueIdPNK = [];
    products?.forEach((product) => {
      if (!uniqueIdPNK?.some((item) => item.name === product?.idPNK)) {
        uniqueIdPNK?.push({
          _id: product?._id,
          name: product?.idPNK,
        });
      }
    });

    return uniqueIdPNK;
  };
  const listTitle = () => {
    const uniqueTitle = [];
    products?.forEach((product) => {
      if (!uniqueTitle.some((item) => item.name === product.title)) {
        uniqueTitle.push({
          _id: product._id,
          name: product.title,
        });
      }
    });

    return uniqueTitle;
  };
  const listBrand = () => {
    const uniqueBrand = [];
    products?.forEach((product) => {
      if (!uniqueBrand.some((item) => item.name === product.brand)) {
        uniqueBrand.push({
          _id: product._id,
          name: product.brand,
        });
      }
    });

    return uniqueBrand;
  };
  const listCategory = () => {
    const uniqueCategory = [];
    products?.forEach((product) => {
      if (!uniqueCategory.some((item) => item.name === product.category)) {
        uniqueCategory.push({
          _id: product._id,
          name: product.category,
        });
      }
    });
    return uniqueCategory;
  };
  const handleChangeIdPNK = (e) => {
    if (e) {
      setIdPNK(e);
    } else {
      setIdPNK("");
    }
  };
  const handleChangeTitle = (e) => {
    if (e) {
      setTitle(e);
    } else {
      setTitle("");
    }
  };
  const handleChangeBrand = (e) => {
    if (e) {
      setBrand(e);
    } else {
      setBrand("");
    }
  };
  const handleChangeCategory = (e) => {
    if (e) {
      setCategory(e);
    } else {
      setCategory("");
    }
  };
  const reloadProducts = () => {
    fetchSearchProductByTile();
    fetchProductByCondition()
    fetchSearchProductByExpires()
    fetchProductByReceipt()
  };
  return (
   <>
   <ToastContainer/>
    <div className="w-auto "
    style={{
      height: "calc(100vh - 200px)",
    }}
    >
      <div>
        <div className="flex justify-center">
          <div className="w-1/2">
            <input
              onChange={handleChangeId}
              value={id}
              className="input input-bordered  w-full h-9 "
              placeholder="Nhập mã sản phẩm"
            />
          </div>
          <div className="w-1/2 ml-2">
            <Autocomplete
              suggestion={listIdPNK()}
              onchange={handleChangeIdPNK}
              value={idPNK}
              placeholder={"Nhập mã phiếu"}
            />
          </div>
          <div className="w-1/2 ml-4">
            {/* <Autocomplete
              suggestion={listTitle()}
              onchange={handleChangeTitle}
              value={title}
              placeholder={"Nhập tên sản phẩm"}
            /> */}
            <input
              onChange={handleChangeName}
              value={title}
              className="input input-bordered  w-full h-9"
              placeholder="Nhập tên sản phẩm"
            />
          </div>
          <div className="w-1/2 ml-4">
            <Autocomplete
              suggestion={listBrand()}
              onchange={handleChangeBrand}
              value={brand}
              placeholder={"Nhập nhà cung cấp"}
            />
          </div>
          <div className="w-1/2 ml-4 h-9">
            {/* <Autocomplete
              suggestion={listCategory()}
              onchange={handleChangeCategory}
              value={category}
              placeholder={"Nhập loại sản phẩm"}
            /> */}
            <select
              onChange={(e) => setStatus(e.target.value)}
              value={status}
              className="w-full h-7 select select-sm select-bordered"
            >
              <option value={""}>Trạng thái</option>
              <option value={"Còn hạn"}>Còn hạn</option>
              <option value={"Gần hết hạn"}>Gần hết hạn</option>
              <option value={"Hết hạn"}>Hết hạn</option>
            </select>
          </div>
        </div>
      </div>
      <div className="overflow-y-auto  mt-7"
      style={{
        height: "calc(100vh - 240px)",
      }}
      >
        <table className="table table-pin-rows">
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
                onClick={() => sortTable("idPNK")}
                className={
                  sortConfig.key === "idPNK"
                    ? sortConfig.direction === "asc"
                      ? "asc"
                      : "desc"
                    : ""
                }
              >
                Mã phiếu
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
                onClick={() => sortTable("expires")}
                className={
                  sortConfig.key === "expires"
                    ? sortConfig.direction === "asc"
                      ? "asc"
                      : "desc"
                    : ""
                }
              >
                Tình trạng
              </th>
              <th
                onClick={() => sortTable("expires")}
                className={
                  sortConfig.key === "expires"
                    ? sortConfig.direction === "asc"
                      ? "asc"
                      : "desc"
                    : ""
                }
              >
                Ngày hết hạn
              </th>
              <th
                onClick={() => sortTable("quantityDynamic")}
                className={
                  sortConfig.key === "quantityDynamic"
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
                  sortConfig.key === "unit"
                    ? sortConfig.direction === "asc"
                      ? "asc"
                      : "desc"
                    : ""
                }
              >
                Đơn vị tính
              </th>
              <th onClick={() => sortTable("importPrice")}
                className={
                  sortConfig.key === "importPrice"
                    ? sortConfig.direction === "asc"
                      ? "asc"
                      : "desc"
                    : ""
                }>
                Giá nhập
              </th>
              <th>Giảm giá</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {status && productsByStatus.length > 0 ? (
              <ProductInventory products={productsByStatus} reloadProducts={reloadProducts} />
            ) : null}

            {/* Hiển thị các sản phẩm theo tên hoặc mã sản phẩm nếu có */}
            {(title || id) && productsByTitle.length > 0 ? (
              <ProductInventory products={productsByTitle} reloadProducts={reloadProducts} />
            ) : null}

            {/* Hiển thị các sản phẩm theo mã phiếu hoặc thương hiệu nếu có */}
            {(idPNK || brand || category) && filterProduct.length > 0 ? (
              <FilterProductByCondition products={filterProduct} reloadProducts={reloadProducts} />
            ) : null}

            {/* Nếu không có bất kỳ điều kiện tìm kiếm nào, hiển thị toàn bộ danh sách */}
            {!status &&
            !title &&
            !id &&
            !idPNK &&
            !brand &&
            !category &&
            products.length > 0 ? (
              <ProductInventory products={products} reloadProducts={reloadProducts} />
            ) : null}

            {/* Hiển thị thông báo nếu không tìm thấy kết quả */}
            {((!status &&
              !title &&
              !id &&
              !idPNK &&
              !brand &&
              !category &&
              products.length === 0) ||
              (status && productsByStatus.length === 0) ||
              ((title || id) && productsByTitle.length === 0) ||
              ((idPNK || brand || category) && filterProduct.length === 0)) && (
              <tr>
                <td colSpan="7" className="text-center text-gray-500">
                  Không tìm thấy sản phẩm nào.
                </td>
              </tr>
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
