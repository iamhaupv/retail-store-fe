import React, { useEffect, useState } from "react";
import apiGetAllUnit from "../../apis/apiGetAllUnit";
import apiFilterAllProductInShelf from "../../apis/apiFilterAllProductInShelf";
import apiFilterPriceByProductName from "../../apis/apiFilterPriceByProductName";
import ChangeInput from "../ChangeInput";
import apiFilterConvertQuantityByUnitName from "../../apis/apiFilterConvertQuantityByUnitName";
export default function CreateOrderTableDetail({ index, removeRow }) {
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState(null);
  const [unit, setUnit] = useState("");
  const [productName, setProductName] = useState("");
  const [units, setUnits] = useState([]);
  const [convertQuantity, setConverQuantity] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async () => {
    try {
      
    } catch (error) {
      console.log("handle submit is error " + error);
      
    }
  }

  const handleChangeTotal = () => {
    const total = quantity * convertQuantity * price;
    return total;
  };
  const handleChangeConvertQuantity = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiFilterConvertQuantityByUnitName(token, {
        name: unit,
      });
      setConverQuantity(response.unit ? response.unit.convertQuantity : 0);
    } catch (error) {
      console.log("handle change convert quantity is error " + error);
    }
  };
  useEffect(() => {
    if (unit) handleChangeConvertQuantity();
  }, [unit]);
  const handleFilterPriceByProductName = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token không hợp lệ!");
      const response = await apiFilterPriceByProductName(token, {
        title: productName,
      });
      setPrice(response.product.price || 0);
    } catch (error) {
      console.error("Lỗi khi lấy giá sản phẩm: ", error);
    }
  };
  const handleChangeQuantity = async (e) => {
    setQuantity(e.target.value);
  };
  useEffect(() => {
    if (productName) handleFilterPriceByProductName();
  }, [productName]);

  const fetchUnits = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");

      const response = await apiGetAllUnit(token);
      setUnits(response.units || []);
    } catch (error) {
      console.log("fetch unit error: ", error);
    }
  };

  const fetchProductByName = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");

      const response = await apiFilterAllProductInShelf(token);
      setProducts(Array.isArray(response.products) ? response.products : []);
    } catch (error) {
      console.log("fetch products by name error: ", error);
    }
  };

  const listName = Array.from(
    new Set(products.map((product) => product.title))
  ).map((title) => ({
    _id: products.find((product) => product.title === title)?._id,
    name: title,
  }));

  const listUnit = Array.from(new Set(units.map((unit) => unit.name))).map(
    (name) => {
      const matchedUnit = units.find((unit) => unit.name === name);
      return {
        _id: matchedUnit?._id,
        name: matchedUnit?.name,
      };
    }
  );

  useEffect(() => {
    fetchProductByName();
    fetchUnits();
  }, []);

  const handleChangeUnit = (selectedBrandName) => {
    setUnit(selectedBrandName || "");
  };

  const handleChangeProductName = (selectedProductName) => {
    setProductName(selectedProductName || "");
  };

  return (
    <>
      <tr className="hover:bg-slate-100">
        <td>SP034213</td>
        <td>
          <div className="w-56">
            <ChangeInput
              suggestion={listName}
              onchange={handleChangeProductName}
              value={productName}
              placeholder="Nhập tên sản phẩm"
            />
          </div>
        </td>
        <td>
          <input
            type="number"
            value={quantity}
            onChange={handleChangeQuantity}
            placeholder="1"
            className="input w-32 h-8"
          />
        </td>
        <td>
          <div className="w-56">
            <ChangeInput
              suggestion={listUnit}
              onchange={handleChangeUnit}
              placeholder="Nhập tên đơn vị tính"
            />
          </div>
        </td>
        <td>{price || "0"}</td>
        {/* Hiển thị giá hoặc "0" nếu không có */}
        <td>{handleChangeTotal() || 0}</td>
        <td>
          <button
            id="btn__delete"
            className="w-6 h-6 rounded-lg"
            style={{ backgroundColor: "#feebe8", outline: "" }}
            onClick={() => removeRow(index)}
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
        </td>
      </tr>
    </>
  );
}
