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
    console.log(productsToAdd); // Xử lý thêm sản phẩm vào kho
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
  return (
    <>
      {/* Tab table */}
      <div
        className="w-11/12 h-sceen justify-center flex overflow-y-auto"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div className="w-11/12 justify-center  ">
          <div className=" w-full h-fit  animate__animated animate__fadeInRight ">
            <div className="card bg-white mb-2 rounded-lg top-7  grid h-52 ">
              <h4 className="font-bold text-xl w-32 ml-4 mt-4 h-fit">
                Thông tin kho
              </h4>
              <div
                className="card rounded-lg ml-8 mr-8 mb-24 mt-3 w-12/12  grid "
                style={{ backgroundColor: "#F5F5F5" }}
              >
                <div className="flex w-12/12">
                  <div className="avatar">
                    <div className="size-28  rounded-full  mt-4 mb-4 ml-4 mr-4">
                      <img
                        src={logo_form}
                        alt="ảnh đại diện"
                        className="object-contain max-h-full max-w-full"
                      />
                    </div>
                  </div>
                  <div className="w-9/12">
                    <h4 className="font-bold text-lg w-32 mt-4 h-fit">
                      24 Hour Store
                    </h4>
                    <div className="flex w-auto mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-5 "
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                        />
                      </svg>
                      <h4 className="font-sans items-center w-96 h-fit ml-2">
                        222/67/73 Phan Văn Trị Q.Bình Thạnh Tp.HCM
                      </h4>
                    </div>
                    <div className="flex w-auto mt-1 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                        />
                      </svg>

                      <h4 className="font-sans items-center w-96 h-fit ml-2">
                        0374582351
                      </h4>
                    </div>
                  </div>
                  <div className="mt-2 mr-2">
                    <button
                      class="btn w-36"
                      style={{ backgroundColor: "#e5edf8", color: "#2f80ed" }}
                      onClick={() =>
                        document.getElementById("InventoryUpdate").showModal()
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-5"
                        style={{ color: "#2f80ed" }}
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                      Chỉnh sửa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full mb-7 animate__animated animate__fadeInRight ">
            <div className="card bg-white rounded-lg top-7  grid   ">
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
            <h3 className="font-bold text-lg mb-6">Danh sách sản phẩm trong kho</h3>
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
                    <th>Mã phiếu</th>
                    <th>Sản phẩm</th>
                    {/* <th>Nhà cung cấp</th> */}
                    <th>Hạn sử dụng</th>
                    <th>Số lượng tổng</th>
                    <th>Số lượng trưng bày </th>
                    <th>Thao tác</th>
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
                          <td>{product._id}</td>
                          <td className="whitespace-nowrap">{product.idPNK}</td>
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
                          <td></td>
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
