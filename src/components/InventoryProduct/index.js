import { useEffect, useState } from "react";
import ProductInventory from "../ProductInventory";
import apiGetAllProductByReceipt from "../../apis/apiGetAllProductByReceipt";
import Autocomplete from "../AutoComplete";
import apiGetFilteredWarehouseReceipts from "../../apis/apiGetFilteredWarehouseReceipts";
import FilterProductByCondition from "../FilterProductByCondition";
import apiWarehouseReceipt from "../../apis/apiWarehouseReceipt";
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
  useEffect(() => {
    const fetchSearchProductByExpires = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("Token is invalid");
        const response = await apiWarehouseReceipt.apiSearchProductExpires(token, {
          expirationStatus: status,
        });
        setProductsByStatus(response.products);
      } catch (error) {}
    };
    fetchSearchProductByExpires();
  }, [status]);
  useEffect(() => {
    const fetchSearchProductByTile = async () => {
      try {
        const token = localStorage.getItem("accessToken")
        if (!token) throw new Error("Token is invalid");
        const response = await apiWarehouseReceipt.apiSearchByName(token, {
          productId: id, title: title
        });
        setProductsByTitle(Array.isArray(response?.products) ? response?.products : []);
      } catch (error) {}
    };
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
  const fetchProductByCondition = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiGetFilteredWarehouseReceipts(token, {
        title: title,
        idPNK: idPNK,
        brand: brand,
        category: category,
      });
      if (response && Array.isArray(response.receipts)) {
        setFilterProduct([]);
        setFilterProduct(response.receipts);
      } else {
        setFilterProduct([]);
      }
    } catch (error) {
      console.log("fetch product by condition is error!" + error);
    }
  };

  useEffect(() => {
    if (idPNK || title || brand || category) {
      fetchProductByCondition();
    } else {
      setFilterProduct([]);
    }
  }, [idPNK, brand, category]);

  const listIdPNK = () => {
    const uniqueIdPNK = [];
    products.forEach((product) => {
      if (!uniqueIdPNK.some((item) => item.name === product.idPNK)) {
        uniqueIdPNK.push({
          _id: product._id,
          name: product.idPNK,
        });
      }
    });

    return uniqueIdPNK;
  };
  const listTitle = () => {
    const uniqueTitle = [];
    products.forEach((product) => {
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
    products.forEach((product) => {
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
    products.forEach((product) => {
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
  return (
    <div className="w-auto">
      <div>
        <div className="flex justify-center">
          <div className="w-1/2">
            <input
              onChange={handleChangeId}
              value={id}
              className="input input-bordered input-success w-full max-w-xs"
              placeholder="Nhập mã sản phẩm"
            />
          </div>
          <div className="w-1/2">
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
              className="input input-bordered input-success w-full max-w-xs"
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
          <div className="w-1/2 ml-4">
            {/* <Autocomplete
              suggestion={listCategory()}
              onchange={handleChangeCategory}
              value={category}
              placeholder={"Nhập loại sản phẩm"}
            /> */}
           <select onChange={(e) => setStatus(e.target.value)} value={status}>
  <option value={""} disabled>Chọn trạng thái sản phẩm</option>
  <option value={"Còn hạn"}>Còn hạn</option>
  <option value={"Gần hết hạn"}>Gần hết hạn</option>
  <option value={"Hết hạn"}>Hết hạn</option>
</select>


          </div>
        </div>
      </div>
      <div className="overflow-y-auto h-80 mt-7">
        <table className="table table-pin-rows">
          <thead>
            <tr>
              <th>Mã sản phẩm</th>
              <th>Mã phiếu</th>
              <th>Sản phẩm</th>
              <th>Tình trạng</th>
              <th>Ngày hết hạn</th>
              <th>Số lượng</th>
              <th>Đơn vị tính</th>
              {/* <th>Thao tác</th> */}
            </tr>
          </thead>
          <tbody>  
  { (id === "" && idPNK === "" && title === "" && brand === "" && status === "") ? (
    <ProductInventory products={products} />
  ) : (filterProduct && filterProduct?.length > 0) ? (
    <FilterProductByCondition products={filterProduct} />
  ) : (productsByTitle && productsByTitle?.length > 0) ? (
    <ProductInventory products={productsByTitle} />
  ) : (
    <div>Không có sản phẩm nào</div>
  )}
</tbody>
          <tfoot>
            <tr></tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
