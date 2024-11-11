import React, { useEffect } from "react";
import Autocomplete from "../AutoComplete";
import { useState } from "react";
import apiFilterProductByNameInShelf from "../../apis/apiFilterProductByNameInShelf";
import apiFilterUnitByName from "../../apis/apiFilterUnitByName";
import apiGetAllUnit from "../../apis/apiGetAllUnit";
import apiFilterAllProductInShelf from "../../apis/apiFilterAllProductInShelf";

export default function CreateOrderTableDetail({ index, removeRow }) {
  const [products, setProducts] = useState([]);
  const [units, setUnits] = useState([]);
  const fetchUnits = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiGetAllUnit(token);
      setUnits(response.units);
    } catch (error) {
      console.log("fetch unit is error" + error);
    }
  };
  const fetchProductByName = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid");
      const response = await apiFilterAllProductInShelf(token);
      setProducts(response.products);
    } catch (error) {
      console.log("fetch products by name is error " + error);
    }
  };
  const listName = Array.from(
    new Set(products.map((product) => product.title))
  ).map((title) => ({
    _id: products.find((product) => product.title === title)._id,
    name: title,
  }));

  const listUnit = Array.from(new Set(units.map((unit) => unit.name))).map(
    (name) => {
      const matchedUnit = units.find((unit) => unit.name === name);
      return {
        _id: matchedUnit._id,
        name: matchedUnit.name,
      };
    }
  );
  console.log(listUnit);
  useEffect(() => {
    fetchProductByName();
  }, []);
  useEffect(() => {
    fetchUnits();
  }, []);
  return (
    <>
      <tr className="hover:bg-slate-100">
        <td>SP034213</td>
        <td>
          <div className="w-56">
            <Autocomplete suggestion={listName} placeholder="" />
          </div>
        </td>
        <td>
          <input type="number" placeholder="1" className="input w-32 h-8 " />
        </td>
        <td>
          <div className="w-56">
            <Autocomplete suggestion={listUnit} placeholder="" />
          </div>
        </td>
        <td>10.000</td>
        <td>10.000</td>
        <td>
          <button
            id="btn__delete"
            className="w-6 h-6 rounded-lg "
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
