import React, { useEffect, useState } from "react";
import "./Inventory.css";
import StockIn from "../../components/StockIn";
import InventoryProduct from "../../components/InventoryProduct";
import apiGetAllProductByReceipt from "../../apis/apiGetAllProductByReceipt";
import apiAddProductToShelf from "../../apis/apiAddProductToShelf";
import { useShelfContext } from "../../contexts/ShelfContext";
import { useNavigate } from "react-router-dom";

export default function Inventory() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { shelf } = useShelfContext();
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
  // const handleCheckboxChange = (warehouseId, productId) => {
  //   setSelectedProducts((prev) => {
  //     const warehouseProducts = prev[warehouseId] || {};
  //     const isSelected = !!warehouseProducts[productId];

  //     // Tạo một đối tượng kho mới để tránh thay đổi trạng thái trực tiếp
  //     const updatedWarehouseProducts = {
  //       ...warehouseProducts,
  //       ...(isSelected ? { [productId]: undefined } : { [productId]: true }), // Bỏ chọn nếu đã chọn, thêm vào nếu chưa chọn
  //     };

  //     // Dọn dẹp bất kỳ giá trị undefined nào
  //     const cleanedWarehouseProducts = Object.fromEntries(
  //       Object.entries(updatedWarehouseProducts).filter(
  //         ([_, v]) => v !== undefined
  //       )
  //     );

  //     return {
  //       ...prev,
  //       [warehouseId]: cleanedWarehouseProducts,
  //     };
  //   });
  // };
  const handleCheckboxChange = (warehouseId, productId) => {
    setSelectedProducts((prev) => {
      const warehouseProducts = prev[warehouseId] || {};
      const isSelected = !!warehouseProducts[productId];
  
      const updatedWarehouseProducts = {
        ...warehouseProducts,
        ...(isSelected ? { [productId]: undefined } : { [productId]: true }),
      };
  
      const cleanedWarehouseProducts = Object.fromEntries(
        Object.entries(updatedWarehouseProducts).filter(([, v]) => v !== undefined)
      );
  
      return {
        ...prev,
        [warehouseId]: cleanedWarehouseProducts,
      };
    });
  };
  
  const [productQuantities, setProductQuantities] = useState({});
  const handleQuantityChange = (productId, newQuantity) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Number(newQuantity), // Sử dụng productId trực tiếp
    }));
  };
  
  const getProductsWithQuantity = () => {
    return Object.entries(productQuantities)
      .filter(([, quantity]) => quantity > 0)
      .map(([productId, quantity]) => ({
        productId,
        quantity,
      }));
  };
  
  // Usage
  const productsWithQuantity = getProductsWithQuantity();
  console.log(productsWithQuantity);
  
  // useEffect(() => {
  //   console.log(productQuantities);
  // }, [productQuantities]);

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
  // const handleSubmit = async () => {
  //   try {
  //     const token = localStorage.getItem("accessToken");
  //     if (!token) throw new Error("Token is invalid!");
  
  //     const productsWithQuantities = getProductsWithQuantity(); // Lấy danh sách sản phẩm có số lượng
  
  //     // Tạo một đối tượng để lưu trữ sản phẩm
  //     const payload = {};
      
  //     for (const { productId, quantity } of productsWithQuantities) {
  //       // Nếu sản phẩm đã tồn tại, tăng số lượng
  //       if (payload[productId]) {
  //         payload[productId] += quantity;
  //       } else {
  //         // Nếu chưa tồn tại, thêm sản phẩm mới vào payload
  //         payload[productId] = quantity;
  //       }
  //     }
  
  //     // Chuyển đổi payload thành định dạng mà API cần
  //     const productsToSend = {
  //       name: shelf,
  //       products: Object.entries(payload).map(([productId, quantity]) => ({
  //         productId,
  //         quantity,
  //       })),
  //     };
  
  //     const response = await apiAddProductToShelf(token, productsToSend);
  
  //     if (response.success) {
  //       // Xử lý khi thêm sản phẩm thành công
  //       console.log("Products added successfully");
  //       toggleModal()
  //       navigate("/inventory"); // Chuyển hướng về trang kho
  //     } else {
  //       // Xử lý khi có lỗi
  //       console.error("Failed to add products:", response.message);
  //     }
  //   } catch (error) {
  //     console.log("handle submit is error:", error);
  //   }
  // };
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
  
      const productsWithQuantities = getProductsWithQuantity(); // Lấy danh sách sản phẩm có số lượng
  
      // Tạo một đối tượng để lưu trữ sản phẩm
      const payload = {};
      
      // Lặp qua danh sách các sản phẩm và cập nhật số lượng vào payload
      for (const { productId, quantity } of productsWithQuantities) {
        // Nếu sản phẩm đã tồn tại trong payload, cộng thêm số lượng
        if (payload[productId]) {
          payload[productId] += quantity;
        } else {
          // Nếu chưa tồn tại, thêm sản phẩm vào payload
          payload[productId] = quantity;
        }
      }
  
      // Chuyển đổi payload thành định dạng mà API cần
      const productsToSend = {
        name: shelf,
        products: Object.entries(payload).map(([productId, quantity]) => ({
          productId,
          quantity,
        })),
      };
  
      // Gửi API thêm sản phẩm vào kệ
      const response = await apiAddProductToShelf(token, productsToSend);
  
      if (response.success) {
        // Xử lý khi thêm sản phẩm thành công
        console.log("Products added successfully");
  
        // Cập nhật lại số lượng trong state sau khi thêm vào kệ
        // Giảm số lượng trong productQuantities
        setProductQuantities((prevQuantities) => {
          const updatedQuantities = { ...prevQuantities };
  
          // Giảm số lượng trong kho sau khi thêm vào kệ
          Object.entries(payload).forEach(([productId, quantity]) => {
            if (updatedQuantities[productId]) {
              updatedQuantities[productId] -= quantity;
            }
          });
  
          return updatedQuantities;
        });
  
        toggleModal(); // Đóng modal sau khi thêm thành công
        handleReload()
        navigate("/inventory"); // Chuyển hướng về trang kho
      } else {
        // Xử lý khi có lỗi
        console.error("Failed to add products:", response.message);
      }
    } catch (error) {
      console.log("handle submit is error:", error);
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
                    <div className="size-28 rounded-full  mt-4 mb-4 ml-4 mr-4">
                      <img
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        alt="ảnh đại diện"
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
            <h3 className="font-bold text-lg mb-6">Danh sách sản phẩm</h3>
            <div className="flex items-center mb-4 w-full">
              {/* Search Input  */}
              <label className="input input-bordered w-52 h-12 flex  items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="Tên sản phẩm"
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
              {/* Product */}
              <select className="select select-bordered w-52 ml-3 mr-3">
                <option disabled selected>
                  Loại sản phẩm
                </option>
                <option>Đồ ăn</option>
                <option>Thức uống</option>
              </select>
              {/* Brand */}
              <select className="select select-bordered h-12 w-52 ">
                <option disabled selected>
                  Thương hiệu
                </option>
                <option>KFC</option>
                <option>Pepsi</option>
              </select>
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
                    <th>Mã sản phẩm</th>
                    <th>Mã phiếu</th>
                    <th>Sản phẩm</th>
                    <th>Nhà cung cấp</th>
                    <th>Số lượng tổng</th>
                    <th>Số lượng</th>
                  </tr>
                </thead>
                <tbody>
                  {/* <ListProductInventory /> */}
                  {products.length > 0 ? (
                    products.map((warehouse) =>
                      warehouse.products.map((item) => (
                        <tr key={item.product._id}>
                          <th>
                            <label>
                              {/* <input
                                className="checkbox"
                                type="checkbox"
                                checked={
                                  !!selectedProducts[warehouse._id]?.[
                                    item.product._id
                                  ]
                                } // Kiểm tra trạng thái chọn
                                onChange={() =>
                                  handleCheckboxChange(
                                    warehouse._id,
                                    item.product._id
                                  )
                                } // Gọi hàm thay đổi
                              /> */}
                              {/* <input
              className="checkbox"
              type="checkbox"
              checked={!!selectedProducts[warehouse._id]?.[item.product._id]}
              onChange={() => handleCheckboxChange(warehouse._id, item.product._id)} // Truyền warehouseId và productId
            /> */}
            <input
    className="checkbox"
    type="checkbox"
    checked={!!selectedProducts[warehouse._id]?.[item.product._id]}
    onChange={() => handleCheckboxChange(warehouse._id, item.product._id)} // Truyền warehouseId và productId
  />
                            </label>
                          </th>
                          <td>
                            <div>
                              <div className="font-bold">ASM001</div>
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
                                <div className="font-bold">
                                  {item.product.title}
                                </div>
                                <div className="badge badge-ghost badge-sm">
                                  {item.product.category.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            {item.product.brand.name}
                            <br />
                          </td>
                          <th>
                            <h3 className="badge badge-ghost badge-sm">
                              {item.quantity}
                            </h3>
                          </th>
                          <td>
                            {/* <input
                              type="number"
                              value={
                                productQuantities[
                                  `${warehouse.idPNK}-${item.product.id}`
                                ] !== undefined
                                  ? productQuantities[
                                      `${warehouse.idPNK}-${item.product.id}`
                                    ]
                                  : ""
                              }
                              onChange={(e) => {
                                if (selectedProducts[warehouse._id]?.[item.product._id]) { 
                                  handleQuantityChange(
                                    warehouse.idPNK,
                                    item.product.id,
                                    e.target.value
                                  );
                                }
                              }}
                              disabled={!selectedProducts[warehouse._id]?.[item.product._id]}
                              className="input input-bordered w-full max-w-xs"
                            /> */}
                            {/* <input
  type="number"
  value={productQuantities[`${warehouse.idPNK}-${item.product._id}`] || ""}
  onChange={(e) => {
    if (selectedProducts[warehouse._id]?.[item.product._id]) {
      handleQuantityChange(
        warehouse.idPNK,
        item.product._id,
        e.target.value
      );
    }
  }}
  disabled={!selectedProducts[warehouse._id]?.[item.product._id]}
  className="input input-bordered w-full max-w-xs"
/> */}
<input
    type="number"
    value={productQuantities[item.product._id] || ""} // Sử dụng productId trực tiếp
    onChange={(e) => {
      // Chỉ thay đổi số lượng nếu sản phẩm đã được chọn
      if (selectedProducts[warehouse._id]?.[item.product._id]) {
        handleQuantityChange(item.product._id, e.target.value); // Chỉ truyền productId
      }
    }}
    disabled={!selectedProducts[warehouse._id]?.[item.product._id]} // Vô hiệu hóa nếu chưa chọn
    className="input input-bordered w-full max-w-xs ml-2"
  />


                          </td>
                        </tr>
                      ))
                    )
                  ) : (
                    <div>Không có sản phẩm nào</div>
                  )}
                </tbody>
                {/* foot */}
                <tfoot></tfoot>
              </table>
            </div>

            <div className="modal-action ">
              <div className="flex w-full">
                <button
                  onClick={handleSubmit}
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
