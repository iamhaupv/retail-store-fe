import React, { useEffect, useState } from "react";
import apiGetAllProduct from "../../apis/apiGetAllProducts";
import apiGetAllUnit from "../../apis/apiGetAllUnit";
import apiCreateWarehouseReceipt from "../../apis/apiCreateWarehouseReceipt";
import apiGetCurrentUser from "../../apis/apiGetCurrentUser";
import apiLastIdWarehouseReceipt from "../../apis/apiLastIdWarehouseReceipt";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import apiGetListBrands from "../../apis/apiGetListBrand";
import apiFilterProductMultiCondition from "../../apis/apiFilterProductMultiCondition";
import Autocomplete from "../../components/AutoComplete";
import apiFilterCategoryByBrand from "../../apis/apiFilterCategoryByBrand";
import apiFilterProductByBrand from "../../apis/apiFilterProductByBrand";

export default function WarehouseReceipt() {
  const [listProduct, setListProduct] = useState([]);
  const navigate = useNavigate();
  // const [price, setPrice] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [addedProducts, setAddedProducts] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [units, setUnits] = useState([]);
  const [user, setUser] = useState("");
  const [code, setCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [productByBrandName, setProductByBrandName] = useState([]);
  const [brand, setBrand] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [brands, setBrands] = useState([]);
  // const [productFilter, setProductFilter] = useState([]);
  // const [isBrand, setIsBrand] = useState("");
  const [value, setValue] = useState("");

  //#region format tiền tệ
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const handleBlurCurrencyInput = (e) => {
    const numericValue = parseFloat(value.replace(/,/g, ""));
    if (!isNaN(numericValue)) {
      setValue(formatCurrency(numericValue));
    }
  };
  const handleChangeCurrencyInput = (e) => {
    setValue(e);
  };
  const fetchProductByBrandName = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiFilterProductByBrand(token, {
        brandName: brand,
      });
      if (response.success) {
        setProductByBrandName(
          Array.isArray(response.products) ? response.products : []
        );
      } else {
        console.warn("No product found for the selected brand");
        setProductByBrandName([]);
      }
    } catch (error) {
      console.log("fetch product by brand name is error " + error);
    }
  };
  useEffect(() => {
    if (brand) {
      fetchProductByBrandName();
    }
  }, [brand]);
  const listProductName = Array.from(
    new Set(productByBrandName.map((unit) => unit.title))
  ).map((title) => {
    const matchedUnit = productByBrandName.find((unit) => unit.title === title);
    return {
      _id: matchedUnit._id,
      name: matchedUnit.title,
    };
  });
  const handleChangeProductName = (selectedBrandName) => {
    if (selectedBrandName) {
      setName(selectedBrandName); // Cập nhật trạng thái thương hiệu
      console.log("Selected brand:", selectedBrandName);
    } else {
      setName(""); // Đặt lại giá trị thương hiệu về rỗng khi không có lựa chọn
      console.log("Brand selection cleared");
    }
  };
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiFilterCategoryByBrand(token, { name: brand });
      if (response.success) {
        setCategories(
          Array.isArray(response.categories) ? response.categories : []
        );
      } else {
        console.warn("No categories found for the selected brand");
        setCategories([]);
      }
    } catch (error) {
      console.log("fetch categories is error " + error);
    }
  };
  useEffect(() => {
    if (brand) {
      fetchCategories();
    }
  }, [brand]);
  const listCategory = Array.from(
    new Set(categories.map((unit) => unit.name))
  ).map((name) => {
    const matchedUnit = categories.find((unit) => unit.name === name);
    return {
      _id: matchedUnit._id,
      name: matchedUnit.name,
    };
  });
  const handleChangeCateogry = (selectedBrandName) => {
    if (selectedBrandName) {
      setCategory(selectedBrandName); // Cập nhật trạng thái thương hiệu
      console.log("Selected brand:", selectedBrandName);
    } else {
      setCategory(""); // Đặt lại giá trị thương hiệu về rỗng khi không có lựa chọn
      console.log("Brand selection cleared");
    }
  };
  // fetch product filter
  // const fetchProductFilter = async () => {
  //   const token = localStorage.getItem("accessToken");
  //   if (!token) throw new Error("Token is invalid!");
  //   try {
  //     const response = await apiGetProductsByFilter(token, { name: isBrand });
  //     // Kiểm tra xem sản phẩm có phải là mảng không
  //     if (Array.isArray(response.products)) {
  //       setProductFilter(response.products);
  //     } else {
  //       // Nếu không, đặt thành mảng rỗng
  //       setProductFilter([]);
  //       console.warn(response.products); // Ghi lại thông báo "No products found!" nếu cần
  //     }
  //   } catch (error) {
  //     setProductFilter([]); // Đặt lại thành mảng rỗng nếu có lỗi
  //   }
  // };

  // useEffect(() => {
  //   fetchProductFilter();
  // }, [isBrand]);
  const fetchBrands = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiGetListBrands(token);
      setBrands(Array.isArray(response.brands) ? response.brands : []);
    } catch (error) {
      throw new Error("fetch brand is error " + error);
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
  const fetchProductMultiCondition = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid");
      const response = await apiFilterProductMultiCondition(token, {
        brandName: brand,
        categoryName: category,
        title: name,
      });
      setListProduct(Array.isArray(response.products) ? response.products : []);
    } catch (error) {
      console.log("api fetch product multi condtion is error " + error);
    }
  };
  useEffect(() => {
    fetchProductMultiCondition();
  }, [brand, category, name]);
  const openModal = () => {
    setIsModalOpen(true);
    setListProduct([]);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const fetchUnits = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiGetAllUnit(token);
      setUnits(response.units);
    } catch (error) {
      console.error("Cannot get list units!", error);
    }
  };
  const fetchUser = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("Token is valid!");
    const user = await apiGetCurrentUser(token);
    setUser(user.rs.lastname + " " + user.rs.firstname);
  };
  useEffect(() => {
    fetchUnits();
    fetchUser();
    fetchBrands();
  }, []);

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
  const handleChangeBrand = (selectedBrandName) => {
    if (selectedBrandName) {
      setBrand(selectedBrandName); // Cập nhật trạng thái thương hiệu
      console.log("Selected brand:", selectedBrandName);
    } else {
      setBrand(""); // Đặt lại giá trị thương hiệu về rỗng khi không có lựa chọn
      console.log("Brand selection cleared");
    }
  };
  const handleCheckboxChange = (productId) => {
    if (!selectedProducts.includes(productId)) {
      setSelectedProducts((prev) => [...prev, productId]);
    } else {
      setSelectedProducts((prev) => prev.filter((id) => id !== productId));
    }
  };

  const handleAdd = () => {
    const selectedItems = products.filter((product) =>
      selectedProducts.includes(product._id)
    );

    const newAddedProducts = selectedItems.map((product) => ({
      ...product,
      quantity: "",
      importPrice: "",
      expires: "",
      unit: "", // Initialize unit
    }));

    setAddedProducts((prev) => [...prev, ...newAddedProducts]);
    // document.getElementById("AddWarehouseReceipt").close();
    setSelectedProducts([]);
    setIsClicked(true);
    setIsModalOpen(false);
  };

  const handleChangeInput = (product,index, name, value) => {
    if (name == "importPrice") {
      value = value.replace(/[^\d]/g, "");

      // Ensure the value is not less than 0
      if (parseFloat(value) < 0) {
        value = "0";
      }
      let price = formatCurrency(value);
      let inputEle = document.getElementById('id-'+product._id);
      if(inputEle){
        inputEle.value = price;
      }
      
      // handleChangeCurrencyInput();
      
    }
    if (name == "quantity") {
      value = value.replace(/[^\d.]/g, "");

      // Ensure the value is not less than 0
      if (parseFloat(value) < 0) {
        value = "0";
      }
    }
    if (name == "expires") {
      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };
      const today = formatDate(new Date());
      // const today = new Date();
      // today.setHours(0, 0, 0, 0);
      if (value < today) {
        value = today;
      }
    }
    setAddedProducts((prev) => {
      const newProducts = [...prev];
      newProducts[index][name] = value; // Update the specific field for the product
      console.log(
        `Updated ${name} for Product ID ${newProducts[index]._id}: ${value}`
      );
      return newProducts;
    });
  };

  const handleUnitChange = (index, unitId) => {
    setAddedProducts((prev) => {
      const newProducts = [...prev];
      newProducts[index].unit = unitId; // Set the selected unit for the product
      console.log(
        `Updated unit for Product ID ${newProducts[index]._id}: ${unitId}`
      );
      return newProducts;
    });
  };

  const handleRemoveProduct = (index) => {
    setAddedProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      if (!code || addedProducts.length === 0) {
        Swal.fire(
          "Thiếu thông tin!",
          "Vui lòng điền đầy đủ thông tin!",
          "error"
        );
        return;
      }
      for (const product of addedProducts) {
        if (
          !product.quantity ||
          !product.importPrice ||
          !product.expires ||
          !product.unit
        ) {
          Swal.fire(
            "Thiếu thông tin!",
            "Vui lòng điền đầy đủ thông tin cho tất cả sản phẩm!",
            "error"
          );
          return;
        }
      }
      const user = await apiGetCurrentUser(token);
      const userId = user.rs._id;
      const result = await Swal.fire({
        title: "Xác nhận",
        text: "Bạn có chắc chắn muốn thêm sản phẩm này không?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Có",
        cancelButtonText: "Không",
      });
      if (result.isConfirmed) {
        const payload = {
          user: userId,
          idPNK: await generateWarehouseReceiptCode(),
          description: "Warehouse receipt description",
          products: addedProducts.map((product) => ({
            product: product._id,
            quantity: product.quantity,
            importPrice: product.importPrice,
            expires: product.expires,
            unit: product.unit,
          })),
        };
        const response = await apiCreateWarehouseReceipt(token, payload);
        if (response.success) {
          Swal.fire("Success", "Thêm thành công!", "success");
          navigate("/inventory");
        } else {
          Swal.fire("Error", "Thêm không thành công!", "error");
        }
      }
    } catch (error) {
      throw new Error("handle submit is error " + error);
    }
  };
  const generateWarehouseReceiptCode = async () => {
    const prefix = "PNK";
    const date = new Date();

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("Token không hợp lệ!");

    const lastReceiptResponse = await apiLastIdWarehouseReceipt(token);
    const lastId = lastReceiptResponse.lastId;

    let nextNumber = 1; // Mặc định là 1
    if (lastId) {
      const lastIdParts = lastId.split("-");
      const lastDate =
        lastIdParts[1] + "-" + lastIdParts[2] + "-" + lastIdParts[3];

      // Kiểm tra nếu phiếu cuối cùng thuộc về hôm nay
      if (lastDate === `${year}-${month}-${day}`) {
        const lastReceiptNumber = parseInt(lastIdParts.pop(), 10);
        nextNumber = lastReceiptNumber + 1; // Tăng số cuối cùng
      }
    }

    const paddedNumber = String(nextNumber).padStart(3, "0"); // Đảm bảo 3 chữ số
    const code = `${prefix}-${year}-${month}-${day}-${paddedNumber}`;
    setCode(code); // Đặt mã được tạo vào state

    return code; // Trả về mã đã tạo
  };
  // const handleBrand = async (e) => {
  //   setBrands(e.target);
  // };
  useEffect(() => {
    fetchProducts();
    generateWarehouseReceiptCode();
  }, []);
  return (
    <>
      <div
        className="w-11/12 h-auto justify-center flex overflow-y-auto"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div className="w-11/12 mr-4 animate__animated animate__fadeInRight">
          <div className="w-full mr-4 rounded-sm">
            <div className="card bg-white rounded-lg top-7 grid">
              <h4 className="font-bold text-xl w-full ml-4">
                Tạo phiếu nhập kho
              </h4>
              <h4 className="font-medium text-base w-11/12 ml-4 mb-2 mt-3">
                Mã phiếu
              </h4>
              <input
                placeholder={`${code}`}
                value={`${code}`}
                type="text"
                className="input input-bordered w-11/12 h-10 ml-4"
                disabled
              />
              <h4 className="font-medium text-base w-11/12 ml-4 mb-2 mt-3">
                Người lập
              </h4>
              <input
                type="text"
                placeholder={`${user}`}
                value={`${user}`}
                className="input input-bordered w-11/12 h-10 ml-4 mb-4"
                disabled
              />
            </div>
          </div>

          <div className="w-full h-fit mr-4 rounded-sm pt-4 pb-8">
            <div className="card bg-white h-fit rounded-sm top-7 grid pt-6">
              <h4 className="font-bold text-xl w-full ml-4">
                Danh sách mặt hàng {brand}
              </h4>
              <div className="flex pt-8 h-fit w-full pb-2">
                <button className="hidden" onClick={openModal} id="FileMain" />
                {isClicked ? (
                  <div className="overflow-y-auto w-full h-96">
                    <table className="table table-pin-rows">
                      <thead>
                        <tr>
                          <th>Tên sản phẩm</th>
                          <th>Số lượng</th>
                          <th>Đơn vị tính</th>
                          <th>Giá nhập</th>
                          <th>Ngày hết hạn</th>
                          <th>Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {addedProducts.map((product, index) => (
                          <tr key={product._id} className="hover:bg-slate-100">
                            <td>
                              <div className="flex items-center gap-3">
                                <div className="avatar">
                                  <div className="mask rounded h-12 w-12">
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
                                </div>
                              </div>
                            </td>
                            <td>
                              <input
                                name="quantity"
                                value={product.quantity}
                                onChange={(e) =>
                                  handleChangeInput(
                                    product,
                                    index,
                                    "quantity",
                                    e.target.value
                                  )
                                }
                                type="text"
                                placeholder="10"
                                className="input input-bordered w-36 h-10"
                              />
                            </td>
                            <td>
                              <select
                                name="category"
                                onChange={(e) =>
                                  handleUnitChange(index, e.target.value)
                                } // Handle unit change
                                value={product.unit || ""} // Bind to unit value
                                className="select select-bordered w-32 h-8 "
                              >
                                <option value="" disabled>
                                  Đơn vị tính
                                </option>
                                {units.map((unit) => (
                                  <option key={unit._id} value={unit._id}>
                                    {unit.name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input
                                id={"id-"+product._id}
                                name="importPrice"
                                
                                onBlur={handleBlurCurrencyInput}
                                onChange={(e) =>
                                  handleChangeInput(
                                    product,
                                    index,
                                    "importPrice",
                                    e.target.value
                                  )
                                }
                                type="text"
                                placeholder="10000"
                                className="input input-bordered w-36 h-10"
                              />
                            </td>
                            <td>
                              <input
                                name="expires"
                                value={product.expires}
                                type="date"
                                onChange={(e) =>
                                  handleChangeInput(
                                    product,
                                    index,
                                    "expires",
                                    e.target.value
                                  )
                                }
                                className="input input-bordered w-40 h-10"
                              />
                            </td>
                            <td>
                              <button
                                className="w-6 h-6 rounded-sm"
                                style={{ backgroundColor: "#feebe8" }}
                                onClick={() => handleRemoveProduct(index)}
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
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <label
                    htmlFor="FileMain"
                    className="border-2 border-dashed w-full h-1/6 ml-4 mr-4"
                    style={{ borderColor: "#D9D9D9" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-full h-36 items-center"
                      style={{ color: "#D9D9D9" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </label>
                )}
              </div>
            </div>
          </div>

          <div className="flex mt-5 mb-5 h-32">
            <button
              className="btn w-28 text-white"
              style={{ backgroundColor: "#f13612" }}
              // onClick={() => document.getElementById("AddWarehouseReceipt").showModal()}
              onClick={handleSubmit}
            >
              Thêm
            </button>
            <Link to="/inventory">
              <button
                className="btn w-28 ml-4"
                style={{ backgroundColor: "#e0e0e0" }}
              >
                Hủy
              </button>
            </Link>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div
          id="AddWarehouseReceipt"
          className="fixed w-screen  inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="modal-box w-full  max-w-6xl h-full overflow-y-hidden ">
            <h3 className="font-bold text-lg mb-6">Danh sách sản phẩm</h3>
            <div className="flex items-center mb-4">
              {/* Brand */}
              <div className="w-52 ">
                <Autocomplete
                  suggestion={listBrand}
                  onchange={handleChangeBrand} // This should call your API or update state
                  placeholder="Chọn thương hiệu"
                  value={brand} // Pass the current brand state
                />
              </div>
              {/* Product */}
              {brand && (
                <div className="w-52 ml-3 mr-3">
                  <Autocomplete
                    suggestion={listCategory}
                    onchange={handleChangeCateogry} // This should call your API or update state
                    placeholder="Chọn loại"
                    value={category} // Pass the current brand state
                  />
                </div>
              )}
              {brand && (
                <div className="w-52 ml-3 mr-3">
                  <Autocomplete
                    suggestion={listProductName}
                    onchange={handleChangeProductName} // This should call your API or update state
                    placeholder="Nhập tên sản phẩm"
                    value={name} // Pass the current brand state
                  />
                </div>
              )}
              {/* Search Input  */}
              <div className="w-52  mr-3"></div>
            </div>
            {/* table product  */}
            <div className=" overflow-y-scroll h-4/6">
              <table className="table table-pin-rows">
                <thead>
                  <tr>
                    <th></th>
                    <th>Mã sản phẩm</th>
                    <th>Sản phẩm</th>
                  </tr>
                </thead>
                <tbody>
                  {brand === "" ? (
                    <div>Vui lòng chọn nhà cung cấp</div>
                  ) : listProduct.length > 0 ? (
                    listProduct.map((product) => (
                      <tr className="hover:bg-slate-100">
                        <th key={product._id}>
                          <label>
                            <input
                              type="checkbox"
                              className="checkbox"
                              checked={
                                selectedProducts.includes(product._id) ||
                                addedProducts.includes(product)
                              }
                              onChange={() => handleCheckboxChange(product._id)}
                              disabled={addedProducts.some(
                                (addedProduct) =>
                                  addedProduct._id === product._id
                              )}
                            />
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
                              <div class="text-sm opacity-50">
                                {product.category.name}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <td>
                      <div>Không có sản phẩm nào</div>
                    </td>
                  )}
                </tbody>
                <tfoot></tfoot>
              </table>
            </div>

            <div className="modal-action ">
              <div className="flex w-full">
                <form method="dialog">
                  <button
                    class="btn w-28 text-white"
                    style={{ backgroundColor: "#f13612" }}
                    // onClick={() => setIsClicked(true)}
                    onClick={handleAdd}
                  >
                    Thêm
                  </button>
                  {/* if there is a button in form, it will close the modal */}
                  <button
                    class="btn w-28 ml-4"
                    style={{ backgroundColor: "#e0e0e0" }}
                    onClick={closeModal}
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
