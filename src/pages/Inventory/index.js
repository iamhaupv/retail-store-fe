import React, { useEffect, useState } from "react";
import "./Inventory.css";
import StockIn from "../../components/StockIn";
import InventoryProduct from "../../components/InventoryProduct";
import apiGetAllProductByReceipt from "../../apis/apiGetAllProductByReceipt";
import apiAddProductToShelf from "../../apis/apiAddProductToShelf";
import { useShelfContext } from "../../contexts/ShelfContext";
import ChangeInput from "../../components/ChangeInput";
import apiGetListCategory from "../../apis/apiGetListCategory";
import apiGetListBrands from "../../apis/apiGetListBrand";
import logo_form from "../../Image/LogoForm.png";
import apiFilterProductInShelfByMultiCondition from "../../apis/apiFilterProductInShelfByMultiCondition";
export default function Inventory() {
  const [title, setTitle] = useState("");
  const [listProduct, setListProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const { shelf } = useShelfContext();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState("");
  const fetchProductMultiCondition = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid");
      const response = await apiFilterProductInShelfByMultiCondition(token, {
        title,
        brandName: brand,
        categoryName: category,
      });
      setListProduct(Array.isArray(response.products) ? response.products : []);
    } catch (error) {
      console.log("api fetch product multi condtion is error " + error);
    }
  };
  useEffect(() => {
    fetchProductMultiCondition();
  }, [brand, title, category]);
  const handleChangeTitle = async (e) => {
    setTitle(e.target.value);
  };
  const fetchBrands = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiGetListBrands(token);
      setBrands(response.brands);
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    fetchBrands();
  }, []);
  const handleChangeBrand = (selectedBrandName) => {
    if (selectedBrandName) {
      setBrand(selectedBrandName); // Cập nhật trạng thái thương hiệu
      console.log("Selected brand:", selectedBrandName);
    } else {
      setBrand(""); // Đặt lại giá trị thương hiệu về rỗng khi không có lựa chọn
      console.log("Brand selection cleared");
    }
  };
  const listBrand = Array.from(new Set(brands.map((unit) => unit.name))).map(
    (name) => {
      const matchedUnit = brands.find((unit) => unit.name === name);
      return {
        _id: matchedUnit._id,
        name: matchedUnit.name,
      };
    }
  );
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
  const listCategory = Array.from(
    new Set(categories.map((unit) => unit.name))
  ).map((name) => {
    const matchedUnit = categories.find((unit) => unit.name === name);
    return {
      _id: matchedUnit._id,
      name: matchedUnit.name,
    };
  });
  useEffect(() => {
    fetchCategories();
  }, []);
  const handleChangeCateogry = (selectedBrandName) => {
    if (selectedBrandName) {
      setCategory(selectedBrandName); // Cập nhật trạng thái thương hiệu
      console.log("Selected brand:", selectedBrandName);
    } else {
      setCategory(""); // Đặt lại giá trị thương hiệu về rỗng khi không có lựa chọn
      console.log("Brand selection cleared");
    }
  };

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");

      const response = await apiGetAllProductByReceipt(token);
      if (response && response.success && Array.isArray(response.products)) {
        setProducts(response.products);
      } else {
        setProducts([]); // Không có sản phẩm
      }
    } catch (error) {
      console.error("Fetch products error: ", error); // In ra lỗi
      setProducts([]); // Reset sản phẩm khi có lỗi
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const toggleModal = () => {
    console.log("Toggle modal");

    setIsModalOpen(!isModalOpen);
  };
  const handleReload = () => {
    window.location.reload(); // This will reload the page
  };
  const [selectedProducts, setSelectedProducts] = useState([]);
  const handleCheckboxChange = (productId, receiptId) => {
    const key = `${productId}-${receiptId}`; // Tạo khóa duy nhất
    setSelectedProducts((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        selected: !prev[key]?.selected,
      },
    }));
  };
  const handleQuantityChange = (productId, receiptId, value) => {
    const key = `${productId}-${receiptId}`;
    const product = products.find(
      (p) => p._id === productId && p.warehouseReceipt === receiptId
    );

    const quantity = Number(value); // Chuyển đổi giá trị thành số

    if (quantity < 0) {
      alert("Số lượng không thể nhỏ hơn 0");
      return; // Không cập nhật nếu số lượng nhỏ hơn 0
    }

    if (product && quantity > product.quantity) {
      alert(`Số lượng không thể lớn hơn ${product.quantity}`);
      return; // Không cập nhật nếu số lượng nhập vào lớn hơn số lượng có
    }

    setSelectedProducts((prev) => ({
      ...prev,
      [key]: { ...prev[key], quantity },
    }));
  };

  const handleGetSelectedProducts = async () => {
    const productsToAdd = Object.entries(selectedProducts)
      .filter(([_, { selected }]) => selected)
      .map(([key, { quantity }]) => {
        const [product, warehouseReceipt] = key.split("-");
        return { product, quantity, warehouseReceipt }; // Trả về id sản phẩm và mã phiếu
      });
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const result = await apiAddProductToShelf(token, {
        name: shelf,
        products: productsToAdd,
      });
      toggleModal();
      handleReload();
      console.log("Products added successfully:", result);
    } catch (error) {
      console.error("Failed to add products:", error);
    }
  };
  function formatDate(date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  function convertDateFormat(dateString) {
    const [day, month, year] = dateString.split('/'); // Split the date string
    const lastTwoDigitsOfYear = year.slice(-2); // Get the last two digits of the year
    return `${lastTwoDigitsOfYear}${month}${day}`; // Format as YYMMDD
  }
  

  return (
    <>
      {/* Tab table */}
      <div
        className="w-11/12 h-sceen justify-center flex overflow-y-auto"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div className="w-full ml-2 mr-2 justify-center  ">
          
          <div className="w-full mb-7 animate__animated animate__fadeInRight ">
            <div className="card bg-white rounded-lg top-1  grid   ">
              <div
                role="tablist"
                className="tabs tabs-bordered order-b border-gray-200"
                style={{}}
              >
                <input
                  type="radio"
                  name="my_tabs_1"
                  role="tab"
                  className="tab whitespace-nowrap"
                  aria-label="Nhập kho"
                  defaultChecked
                  style={activeTab === 0 ? { borderColor: "#f89a88" } : {}}
                  onClick={() => handleTabClick(0)}
                />
                <div
                  role="tabpanel"
                  className="tab-content mb-20 p-10 "
                  style={{
                    borderTop: "2px solid #ededed",
                  }}
                >
                  {/*  */}
                  <StockIn />
                </div>

                <input
                  type="radio"
                  name="my_tabs_1"
                  role="tab"
                  className="tab whitespace-nowrap"
                  aria-label="Hàng tồn"
                  style={activeTab === 2 ? { borderColor: "#f89a88" } : {}}
                  onClick={() => handleTabClick(2)}
                />
                <div
                  role="tabpanel"
                  className="tab-content mb-20 p-10"
                  style={{
                    borderTop: "2px solid #ededed",
                  }}
                >
                  <InventoryProduct onChangeModal={toggleModal} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal InventoryUpdate */}
      <dialog id="InventoryUpdate" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl">Chỉnh sửa kho</h3>
          <div>
            <div className="flex mt-4">
              <p className="py-4 w-20">Avatar</p>
              <div className="avatar">
                <div className="size-24 rounded-full">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="ảnh đại diện chỉnh sửa"
                  />
                </div>
              </div>
            </div>
            <div className="flex mt-4">
              <p className="py-4 w-20">Tên kho</p>
              <input
                type="text"
                placeholder="24 Hour Store"
                className="input input-bordered w-full "
              />
            </div>
            <div className="flex mt-4">
              <p className="py-4 w-20">Địa chỉ</p>
              <input
                type="text"
                placeholder="222/67/73 Phan Văn Trị Q.Bình Thạnh Tp.HCM"
                className="input input-bordered w-full "
              />
            </div>
            <div className="flex mt-4">
              <p className="py-4 w-20">Hotline</p>
              <input
                type="text"
                placeholder="0374582351"
                className="input input-bordered w-full "
              />
            </div>
            <div className="flex mt-4">
              <p className="py-4 w-20">Email</p>
              <input
                type="text"
                placeholder="nguyenthanhkhoa8888@gmail.com"
                className="input input-bordered w-full "
              />
            </div>
          </div>
          {/* Button Thêm và Hủy */}
          <div className="flex mt-8 mb-2 ">
            <button
              class="btn w-28 text-white "
              style={{ backgroundColor: "#f13612" }}
            >
              Thêm
            </button>
            <form method="dialog">
              <button
                class="btn w-28 ml-4"
                style={{ backgroundColor: "#e0e0e0" }}
              >
                Hủy
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {isModalOpen && (
        <div className="fixed w-screen z-40 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-box w-full max-w-6xl h-full overflow-y-hidden  ">
            <h3 className="font-bold text-lg mb-6">
              Danh sách sản phẩm trong kho
            </h3>
            <div className="flex items-center  w-full">
              {/* Search Input  */}
              {/* <Autocomplete suggestion={listCategory} onchange={handleChangeCategory} placeholder={"Chọn thương hiệu"} /> */}
              {/* Product */}
              <div className="ml-4 mt-4 w-2/12 ">
                <ChangeInput
                  suggestion={listCategory} // List of categories passed as suggestions
                  onchange={handleChangeCateogry} // Handling change event
                  placeholder="Nhập loại" // Placeholder for input field
                  value={category} // Binding value to category state
                />
              </div>
              <div className="ml-4 mt-4 w-2/12 ">
                <ChangeInput
                  suggestion={listBrand} // List of categories passed as suggestions
                  onchange={handleChangeBrand} // Handling change event
                  placeholder="Nhập nhà cung cấp" // Placeholder for input field
                  value={brand} // Binding value to category state
                />
              </div>
              <label className="ml-2 mt-2 input input-sm input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="Search"
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
            </div>
            {/* table product  */}
            <div className=" overflow-y-scroll h-4/6">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    {/* <div className='w-7'> */}
                    <th></th>
                    {/* </div> */}
                    <th>Mã vạch</th>
                    <th className="w-10">Sản phẩm</th>
                    {/* <th>Nhà cung cấp</th> */}
                    <th>Hạn sử dụng</th>
                    <th>Số lượng tổng</th>
                    <th>Số lượng trưng bày </th>
                    {/* <th>Thao tác</th> */}
                  </tr>
                </thead>
                <tbody>
                  {category === "" && title === "" && brand === "" ? (
                    products.length > 0 ? (
                      products.map((product) => (
                        <tr key={product._id}>
                          <td>
                            <input
                              className="checkbox"
                              onChange={() =>
                                handleCheckboxChange(
                                  product._id,
                                  product.warehouseReceipt
                                )
                              }
                              type="checkbox"
                              checked={
                                selectedProducts[
                                  `${product._id}-${product.warehouseReceipt}`
                                ]?.selected || false
                              }
                            />
                          </td>
                          <td className="">
                            {/* <svg ref={inputRef} /> */}
                            {/* <BarcodeCreate productCode={product.id} wareHouseReceiptCode={product.idPNK} expiryDate={convertDateFormat((formatDate(product.expires)))} /> */}
                            {/* <Barcode value={product.id} /> */}
                          </td>
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="avatar">
                                <div className="mask mask-squircle h-12 w-12">
                                  <img
                                    src={product.images[0]}
                                    alt={product.title}
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="font-bold">{product.title}</div>
                                <div className="badge badge-ghost badge-sm">
                                  {product.category}
                                </div>
                              </div>
                            </div>
                          </td>
                          {/* <td>{product.brand}</td> */}
                          <td>

                            {formatDate(product.expires)}
                          </td>
                          <td>
                            <span className="badge badge-ghost badge-sm">
                              {product.quantityDynamic || 0}
                            </span>
                          </td>
                          <td>
                            <td>
                              <input
                                type="number"
                                className="input input-bordered w-24 h-10 ml-2"
                                value={
                                  selectedProducts[
                                    `${product._id}-${product.warehouseReceipt}`
                                  ]?.quantity || ""
                                }
                                onChange={(e) =>
                                  handleQuantityChange(
                                    product._id,
                                    product.warehouseReceipt,
                                    e.target.value
                                  )
                                }
                                disabled={
                                  !selectedProducts[
                                    `${product._id}-${product.warehouseReceipt}`
                                  ]?.selected
                                }
                                min="0" // Không cho phép nhập số âm
                                max={product.quantity} // Giới hạn nhập vào không lớn hơn số lượng hiện có
                              />
                            </td>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2">Khong co san pham nao</td>
                      </tr>
                    )
                  ) : listProduct.length > 0 ? (
                    listProduct.map((product) => (
                      <tr key={product._id}>
                        <td>
                          <input
                            className="checkbox"
                            onChange={() =>
                              handleCheckboxChange(
                                product._id,
                                product.warehouseReceipt
                              )
                            }
                            type="checkbox"
                            checked={
                              selectedProducts[
                                `${product._id}-${product.warehouseReceipt}`
                              ]?.selected || false
                            }
                          />
                        </td>
                        <h1>{product._id}</h1>
                        <td>123456</td>
                        <td>{product.idPNK}</td>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle h-12 w-12">
                                <img
                                  src={product.images[0]}
                                  alt={product.title}
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold text-ellipsis">
                                {product.title}
                              </div>
                              <div className="badge badge-ghost badge-sm whitespace-nowrap">
                                {product.category}
                              </div>
                            </div>
                          </div>
                          {/* </td>
                        <td>{product.brand}</td>
                        <td> */}
                          <span className="badge badge-ghost badge-sm">
                            {product.quantity}
                          </span>
                        </td>
                        <td>
                          <td>
                            <input
                              type="number"
                              className="input input-bordered w-full max-w-xs ml-2"
                              value={
                                selectedProducts[
                                  `${product._id}-${product.warehouseReceipt}`
                                ]?.quantity || ""
                              }
                              onChange={(e) =>
                                handleQuantityChange(
                                  product._id,
                                  product.warehouseReceipt,
                                  e.target.value
                                )
                              }
                              disabled={
                                !selectedProducts[
                                  `${product._id}-${product.warehouseReceipt}`
                                ]?.selected
                              }
                              min="0" // Không cho phép nhập số âm
                              max={product.quantity} // Giới hạn nhập vào không lớn hơn số lượng hiện có
                            />
                          </td>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2">Khong co san pham nao</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="modal-action ">
              <div className="flex w-full">
                <button
                  onClick={handleGetSelectedProducts}
                  class="btn w-28 text-white"
                  style={{ backgroundColor: "#f13612" }}
                >
                  Thêm
                </button>
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}

                  <button
                    class="btn w-28 ml-4"
                    style={{ backgroundColor: "#e0e0e0" }}
                    onClick={toggleModal}
                  >
                    Hủy
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
