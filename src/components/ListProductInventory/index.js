// import { useBarcode } from "@createnextapp/react-barcode";
// import { useEffect, useState } from "react";
// import apiGetAllProductByReceipt from "../../apis/apiGetAllProductByReceipt";
// export default function ListProductInventory() {
//   // const { inputRef } = useBarcode({
//   //   value: "ASM001",
//   //   options: {
//   //     displayValue: false,
//   //     background: "#ffffff",
//   //     width: 1,
//   //     height: 25,
//   //   },
//   // });
//   const [products, setProducts] = useState([]);
//   const fetchProducts = async () => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       if (!token) throw new Error("Token is invalid!");
//       const response = await apiGetAllProductByReceipt(token);
//       if (response.products && response.products.length > 0) {
//         setProducts(response.products);
//       } else {
//         setProducts([]);
//       }
//     } catch (error) {
//       console.log("fetch products is error " + error);
//     }
//   };
//   useEffect(() => {
//     fetchProducts();
//   }, []);
//   console.log(products);
//   const [selectedProducts, setSelectedProducts] = useState({});
//   const handleCheckboxChange = (productId) => {
//     setSelectedProducts((prev) => ({
//       ...prev,
//       [productId]: !prev[productId],
//     }));
//   };
//   console.log(selectedProducts);
  
//   return (
//     <>
//       {products.length > 0 ? (
//         products.map((warehouse) => (
//           warehouse.products.map((item) =>  (<tr>
//             <th>
//               <label>
//               <input
//                     className="checkbox"
//                     type="checkbox"
//                     value={item.product.id}
//                     checked={!!selectedProducts[item.product.id]}
//                     onChange={() => handleCheckboxChange(item.product.id)}
//                   />
//               </label>
//             </th>
//             <td>
//               <div>
//                 <div className="font-bold">ASM001</div>
//                 {/* <svg ref={inputRef} /> */}
//               </div>
//             </td>
//             <td>
//               <div>
//                 <div className="font-bold">{warehouse.idPNK}</div>
//               </div>
//             </td>
//             <td>
//               <div class="flex items-center gap-3">
//                 <div class="avatar">
//                   <div class="mask mask-squircle h-12 w-12">
//                     <img
//                       src={item.product.images[0]}
//                       alt="Avatar Tailwind CSS Component"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <div class="font-bold">{item.product.title}</div>
//                   <div class="badge badge-ghost badge-sm">{item.product.category.name}</div>
//                 </div>
//               </div>
//             </td>
//             <td>
//               {item.product.brand.name}
//               <br />
//             </td>
//             <th>
//               <h3 class="badge badge-ghost badge-sm">{item.product.quantity}</h3>
//             </th>
//             <td>
//             <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
//             </td>
//           </tr>))
//         ))
//       ) : (
//         <div>Khong co san pham nao</div>
//       )}
//     </>
//   );
// }
import { useEffect, useState } from "react";
import apiGetAllProductByReceipt from "../../apis/apiGetAllProductByReceipt";
export default function ListProductInventory() {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiGetAllProductByReceipt(token);
      if (response.products && response.products.length > 0) {
        setProducts(response.products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.log("fetch products is error " + error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const [selectedProducts, setSelectedProducts] = useState({});
  const handleCheckboxChange = (warehouseId, productId) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [warehouseId]: {
        ...prev[warehouseId],
        [productId]: !prev[warehouseId]?.[productId], // Đảo ngược trạng thái
      },
    }));
  };
  const handleQuantityChange = (warehouseId, productId, newQuantity) => {
    setProducts((prevProducts) =>
      prevProducts.map((warehouse) => {
        if (warehouse.idPNK === warehouseId) {
          return {
            ...warehouse,
            products: warehouse.products.map((item) =>
              item.product.id === productId
                ? { ...item, product: { ...item.product, quantity: newQuantity } }
                : item
            ),
          };
        }
        return warehouse; // Nếu không phải warehouse hiện tại thì trả về nguyên
      })
    );
  };
  return (
    <>
      {products.length > 0 ? (
        products.map((warehouse) =>
          warehouse.products.map((item) => (
            <tr key={item.product._id}>
              <th>
                <label>
                  <input
                   className="checkbox"
                   type="checkbox"
                   value={item.product._id}
                   checked={!!selectedProducts[warehouse.idPNK]?.[item.product._id]} // Kiểm tra trạng thái checkbox cho sản phẩm theo warehouse
                   onChange={() => handleCheckboxChange(warehouse.idPNK, item.product._id)} 
                  />
                </label>
              </th>
              <td>
                <div>
                  <div className="font-bold">ASM001</div>
                  {/* <svg ref={inputRef} /> */}
                </div>
              </td>
              <td>

                <div>
                  <div className="font-bold">{warehouse.idPNK}</div>
                </div>
              </td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}

                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{item.product.title}</div>
                    <div className="badge badge-ghost badge-sm">{item.product.category.name}</div>
                  </div>
                </div>
              </td>
              <td>
                {item.product.brand.name}
                <br />
              </td>
              <th>
                <h3 className="badge badge-ghost badge-sm">{item.product.quantity}</h3>
              </th>
              <td>
                <input
                  type="number"
                  value={item.product.quantity}
                  onChange={(e) => handleQuantityChange(warehouse.idPNK, item.product.id, e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </td>
            </tr>
          ))
        )
      ) : (
        <div>Không có sản phẩm nào</div>
      )}
    </>
  );
}
