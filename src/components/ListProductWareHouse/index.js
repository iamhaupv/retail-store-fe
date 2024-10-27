import { useEffect, useState } from "react";
import apiGetAllProduct from "../../apis/apiGetAllProducts";

export default function ListProductWareHouse({onSelectProduct}) {
  // const { inputRef } = useBarcode({
  //   value: "ASM001",
  //   options: {
  //     displayValue: false,
  //     background: "#ffffff",
  //     width: 1,
  //     height: 25,
  //   },
  // });
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState({});
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid");
      const response = await apiGetAllProduct(token);
      setProducts(response.products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const handleAddSelectedProducts = () => {
    const selected = products.filter((product) => selectedProducts[product._id]);
    onSelectProduct(selected);
    setSelectedProducts({}); // Reset selected products
  };


  return (
    <>
      {products.map((product)=> (<tr className="hover:bg-slate-100"> 
        <th key={product._id}>

          <label>
            <input type="checkbox"
                className="checkbox"
                checked={!!selectedProducts[product._id]}
                onChange={() => handleCheckboxChange(product._id)} />
          </label>
        </th>
        <td>
          <div>
            <div className="font-bold">ASM001</div>
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
