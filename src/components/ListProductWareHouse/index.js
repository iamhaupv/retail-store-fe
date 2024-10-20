import { useBarcode } from "@createnextapp/react-barcode";
import React, { useEffect } from "react";
import apiGetAllProduct from "../../apis/apiGetAllProducts";
import { useState } from "react";

export default function ListProductWareHouse() {
  // const { inputRef } = useBarcode({
  //   value: "ASM001",
  //   options: {
  //     displayValue: false,
  //     background: "#ffffff",
  //     width: 1,
  //     height: 25,
  //   },
  // });
  const [products, setProducts] = useState([])
  const fetchPrducts = async () => {
    try {
      const response = await apiGetAllProduct();
      setProducts(response.products);
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    fetchPrducts();
  }, []);
  
  return (
    <>
      {products.map((product)=> (<tr>
        <th key={product._id}>
          <label>
            <input type="checkbox" class="checkbox" />
          </label>
        </th>
        <td>
          <div>
            <div className="font-bold">ASM001</div>
            {/* <svg ref={inputRef} /> */}
          </div>
        </td>
        <td>
          <div class="flex items-center gap-3">
            <div class="avatar">
              <div class="mask mask-squircle h-12 w-12">
                <img
                  src={product.images[0]}
                  alt="Avatar Tailwind CSS Component"
                />
              </div>
            </div>
            <div>
              <div class="font-bold">{product.title}</div>
              <div class="text-sm opacity-50">{product.title}</div>
            </div>
          </div>
        </td>
        <td>
          {product.brand.name}
          <br />
          <span class="badge badge-ghost badge-sm">{product.title}</span>
        </td>
        
      </tr>))}
    </>
  );
}
