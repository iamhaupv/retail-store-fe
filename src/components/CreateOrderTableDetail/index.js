import React, { useEffect } from "react";
import Autocomplete from "../AutoComplete";
import { useState } from "react";
import apiFilterProductByName from "../../apis/apiFilterProductByName";

export default function CreateOrderTableDetail({ index, removeRow }) {
  const suggestion = [
    { id: 1, name: "Nước ngọt pepsi dung tích 120ml" },
    { id: 2, name: "Snack Khoai tây lays" },
    { id: 3, name: "Tanya Fox" },
    { id: 4, name: "Arlene Mccoy" },
    { id: 5, name: "Devon Webb" },
    { id: 6, name: "Nguyễn Thanh Khoa" },
    { id: 7, name: "Nguyễn Đức Long" },
  ];
  
  const DonViTinh = [
    { id: 1, name: "Thung24" },
    { id: 2, name: "Thung30" },
    { id: 3, name: "Thung20" },
    { id: 4, name: "Arlene Mccoy" },
    { id: 5, name: "Devon Webb" },
    { id: 6, name: "Nguyễn Thanh Khoa" },
    { id: 7, name: "Nguyễn Đức Long" },
  ];
  const [products, setProducts] = useState([])
  const [name, setName] = useState("")
  const fetchProductByName = async () => {
    try {
      const token = localStorage.getItem("accessToken")
      if(!token) throw new Error("Token is invalid")
      const response = await apiFilterProductByName(token, {title: name})
      setProducts(response.products)
    } catch (error) {
      console.log("fetch products by name is error " + error);
    }
  }
  // console.log(products);
  const handleChangeInput = async (e) => {
    setName(e.target.value)
  }
  useEffect(()=> {
    fetchProductByName()
  }, [name])
  console.log(name);
  
  return (
    <>
      <tr className="hover:bg-slate-100">
        <td>SP034213</td>
        <td>
            <div className="w-56">
                {/* <Autocomplete suggestion={suggestion} placeholder=""/> */}
                <div>
                  <input onChange={handleChangeInput} value={name}   />
                </div>
            </div>
        </td>
        <td>
          <input type="number" placeholder="1" className="input w-32 h-8 " />
        </td>
        <td>
        <div className="w-56">
                <Autocomplete suggestion={DonViTinh} placeholder=""/>
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
