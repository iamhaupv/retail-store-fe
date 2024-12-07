import React, { useEffect, useState } from "react";
import apiGetListBrand from "../../apis/apiGetListBrand";
import apiGetListCategory from "../../apis/apiGetListCategory";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import apiUpdateProduct from "../../apis/apiUpdateProduct";
import { toast, ToastContainer } from "react-toastify";
import apiUnit from "../../apis/apiUnit";

export default function UpdateProduct() {
  const [units, setUnits] = useState([]);
  const location = useLocation();
  const { product } = location.state || {};
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(
    product.images?.reduce((acc, url, index) => {
      const key = index === 0 ? "inputMain" : `input${index}`;
      acc[key] = url;
      return acc;
    }, {}) || {}
  );
  const [isVisible, setIsVisible] = useState(true);
  const [error, setError] = useState({});
  const [payload, setPayload] = useState({
    title: product?.title || "",
    price: product?.price || "",
    description: product?.description || "",
    brand: product?.brand._id || "",
    category: product?.category._id || "",
    id: product.id,
    unit: product?.unit?._id,
  });
  console.log(product);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("Token is invalid!");
        const response = await apiUnit.apiGetAllUnit(token);
        setUnits(response.units);
      } catch (error) {
        throw new Error("fetch unit is error", error);
      }
    };
    fetchUnits();
  }, []);
  const handleBlur = (e) => {
    const { name } = e.target;
    if (!payload[name]) {
      setError((prev) => ({ ...prev, [name]: `Không được để trống!` }));
    }
  };
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    const titleRegex = /^[A-Za-zÀ-ỹ\s'-.\d]{2,}$/;
    const priceRegex = /^\d+(\.\d{1,2})?$/;
    const descriptionRegex = /^([\s\S]{10,1000})$/;
    let errorMessage;
    // title
    if (name === "title") {
      if (!value) {
        errorMessage = "Không được để trống!";
      } else if (!titleRegex.test(value)) {
        errorMessage = "Tên không hợp lệ. Vui lòng nhập tên hợp lệ!";
      }
    }
    // price
    if (name === "price") {
      if (!value) {
        errorMessage = "Không được để trống!";
      } else if (!priceRegex.test(value)) {
        errorMessage = "Giá không hợp lệ. Vui lòng nhập số hợp lệ!";
      }
    }
    // description
    if (name === "description") {
      if (!value) {
        errorMessage = "Không được để trống!";
      } else if (!descriptionRegex.test(value)) {
        errorMessage = "Mô tả phải nhập ít nhất 10 kí tự!";
      }
    }
    // brand
    if (name === "brand") {
      if (!value || value === " ") {
        errorMessage = "Vui lòng chọn nhà cung cấp!";
      }
    }
    // category
    if (name === "category") {
      if (!value || value === " ") {
        errorMessage = "Vui lòng chọn loại!";
      }
    }
    setError((prev) => ({ ...prev, [name]: errorMessage }));
    setPayload((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = (inputKey) => {
    setIsVisible(false);
    setImage((prevImages) => ({
      ...prevImages,
      [inputKey]: null,
    }));
  };
  const handleChange = (event, id) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage((prevImages) => ({
          ...prevImages,
          [id]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const fetchBrands = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiGetListBrand(token);
      setBrands(response.brands);
    } catch (error) {
      throw new Error(error);
    }
  };
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiGetListCategory(token);
      setCategories(response.data);
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    fetchBrands();
    fetchCategories();
  }, []);
  const handleSubmit = async () => {
    try {
      const { title, price, description, brand, category, unit } = payload;
      if (!title || !price || !description || !brand || !image) {
        Swal.fire(
          "Thiếu thông tin!",
          "Vui lòng điền đầy đủ thông tin!",
          "error"
        );
        return;
      }

      const result = await Swal.fire({
        title: "Xác nhận",
        text: "Bạn có chắc chắn muốn cập nhật sản phẩm này không?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Có",
        cancelButtonText: "Không",
      });

      if (result.isConfirmed) {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("Token is invalid!");
        }
        const formData = new FormData();
        formData.append("pid", product._id);
        formData.append("title", title);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("brand", brand);
        formData.append("category", category);
        formData.append("unit", unit);

        // Thêm ảnh vào formData
        for (const key in image) {
          if (image[key]) {
            const file = await fetch(image[key]).then((res) => res.blob());
            formData.append("images", file, `image-${key}.jpg`);
          }
        }
        const response = await apiUpdateProduct(token, formData);
        if (response.success) {
          toast.success("Cập nhật thành công!");
          setTimeout(() => {
            navigate("/product-list");
          }, 2000);
        } else {
          toast.success("Cập nhật không thành công!");
        }
      }
    } catch (error) {
      Swal.fire("Error", "Cập nhật không thành công", "error");
    }
  };
  return (
    <>
      <ToastContainer />
      <div
        className="w-11/12 h-full justify-center flex overflow-y-auto "
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div className="w-8/12 mr-4 animate__animated animate__fadeInRight">
          <div className="w-full mr-4 rounded-sm">
            <div className="card bg-white rounded-sm top-7 grid  ">
              <h4 className="font-bold text-xl w-full ml-4 mt-2">
                Chỉnh sửa sản phẩm
              </h4>
              <div className="flex items-center pt-8">
                <h4 className="flex font-sans text-base w-6/12 ml-4">
                  Tên sản phẩm
                  <h5 className="ml-1 text-red-600">(*)</h5>
                </h4>
                <h4 className="font-sans text-base w-5/12 ml-6">Mã sản phẩm</h4>
              </div>
              <div className="flex items-center pt-2">
                <div className="w-[440px]">
                  <input
                    name="title"
                    value={payload.title}
                    onChange={handleChangeInput}
                    type="text"
                    placeholder="Tên sản phẩm"
                    onBlur={handleBlur}
                    className="input input-bordered w-full h-10 ml-4"
                  />
                  {error && (
                    <h5 className="ml-4 h-10 text-sm mt-2 text-red-500">
                      {error.title}
                    </h5>
                  )}
                </div>
                <div className="w-[380px] ml-4" style={{ marginTop: -50 }}>
                  <input
                    type="text"
                    placeholder="Mã sản phẩm"
                    className="input input-bordered w-full h-10 ml-4"
                    disabled
                    value={payload.id}
                  />
                </div>
              </div>

              <div
                className="flex items-center pt-2"
                style={{ marginTop: -20 }}
              >
                <h4 className="flex font-sans text-base w-[440px] ml-4">
                  Đơn giá
                  <h5 className="ml-1 text-red-600">(*)</h5>
                </h4>
              </div>
              <div className="flex items-center pt-2">
                <div className="w-[440px]">
                  <input
                    name="price"
                    value={payload.price}
                    onBlur={handleBlur}
                    onChange={handleChangeInput}
                    type="text"
                    placeholder="Đơn giá"
                    className="input input-bordered w-full h-10 ml-4"
                  />
                  {error && (
                    <h5 className="mt-2 h-10 text-sm ml-4 text-red-500">
                      {error.price}
                    </h5>
                  )}
                </div>
              </div>
              <h4 className="flex font-sans text-base w-6/12 ml-4 mb-2" style={{marginTop: -15}}>
                Mô tả
                <h5 className="ml-1 text-red-600">(*)</h5>
              </h4>
              <textarea
                name="description"
                value={payload.description}
                onChange={handleChangeInput}
                placeholder="Bio"
                onBlur={handleBlur}
                className="textarea textarea-bordered textarea-lg w-11/12 ml-4 mb-3"
              />
              {error && (
                <h5 className="ml-4 h-10 text-sm text-red-500 mb-3">{error.description}</h5>
              )}
            </div>
          </div>
          {/* Hình ảnh sản phẩm */}
          <div className="w-full h-auto mr-4 rounded-sm pt-4 pb-8">
            <div className="card bg-white rounded-sm top-7 grid pt-6 ">
              <h4 className="flex font-bold text-xl w-full ml-4">
                Hình ảnh
                <h5 className="ml-1 text-red-600">(*)</h5>
              </h4>
              <div className="flex pt-8 w-full pb-8">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleChange(e, "inputMain")}
                  className="hidden"
                  id="FileMain"
                  name="imgMain"
                />
                {image && image["inputMain"] ? (
                  <div className="indicator ">
                    <button
                      className="indicator-item badge badge-secondary rounded-full bg-red-500"
                      onClick={() => handleClose("inputMain")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-4 "
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </button>

                    <img
                      src={image["inputMain"]}
                      alt="Selected"
                      className="size-44 ml-4 "
                    />
                  </div>
                ) : (
                  <label
                    htmlFor="FileMain"
                    className=" border-2 border-dashed size-44 ml-4  "
                    style={{ borderColor: "#D9D9D9" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class=""
                      style={{ color: "#D9D9D9" }}
                      className="size-44 items-center"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </label>
                )}
                {/* </div> */}
                {/* Ảnh SP chi tiết */}
                <div className="grid grid-rows-2 grid-flow-col gap-2">
                  {/* Hình 2 */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleChange(e, "input1")}
                    className="hidden"
                    id="ImgDetail1"
                  />

                  {image && image["input1"] ? (
                    <div className="indicator ">
                      <button
                        className="indicator-item badge badge-secondary rounded-full bg-red-500"
                        onClick={() => handleClose("input1")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-4 "
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      <img
                        src={image["input1"]}
                        alt="Selected"
                        className="size-20 ml-4"
                      />
                    </div>
                  ) : (
                    <label
                      htmlFor="ImgDetail1"
                      className=" border-2 border-dashed size-20 ml-4 "
                      style={{ borderColor: "#D9D9D9" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class=""
                        style={{ color: "#D9D9D9" }}
                        className="size-20 items-center"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </label>
                  )}
                  {/* Hình 3 */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleChange(e, "input2")}
                    className="hidden"
                    id="ImgDetail2"
                  />

                  {image && image["input2"] ? (
                    <div className="indicator ">
                      <button
                        className="indicator-item badge badge-secondary rounded-full bg-red-500"
                        onClick={() => handleClose("input2")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-4 "
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      <img
                        src={image["input2"]}
                        alt="Selected"
                        className="size-20 ml-4"
                      />
                    </div>
                  ) : (
                    <label
                      htmlFor="ImgDetail2"
                      className=" border-2 border-dashed size-20 ml-4 "
                      style={{ borderColor: "#D9D9D9" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class=""
                        style={{ color: "#D9D9D9" }}
                        className="size-20 items-center"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </label>
                  )}
                  {/* Hình 4 */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleChange(e, "input3")}
                    className="hidden"
                    id="ImgDetail3"
                  />

                  {image && image["input3"] ? (
                    <div className="indicator ">
                      <button
                        className="indicator-item badge badge-secondary rounded-full bg-red-500"
                        onClick={() => handleClose("input3")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-4 "
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      <img
                        src={image["input3"]}
                        alt="Selected"
                        className="size-20 ml-4"
                      />
                    </div>
                  ) : (
                    <label
                      htmlFor="ImgDetail3"
                      className=" border-2 border-dashed size-20 ml-4 "
                      style={{ borderColor: "#D9D9D9" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class=""
                        style={{ color: "#D9D9D9" }}
                        className="size-20 items-center"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </label>
                  )}
                  {/* Hình 5 */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleChange(e, "input4")}
                    className="hidden"
                    id="ImgDetail4"
                  />

                  {image && image["input4"] ? (
                    <div className="indicator ">
                      <button
                        className="indicator-item badge badge-secondary rounded-full bg-red-500"
                        onClick={() => handleClose("input4")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-4 "
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      <img
                        src={image["input4"]}
                        alt="Selected"
                        className="size-20 ml-4 "
                      />
                    </div>
                  ) : (
                    <label
                      htmlFor="ImgDetail4"
                      className=" border-2 border-dashed size-20 ml-4 "
                      style={{ borderColor: "#D9D9D9" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class=""
                        style={{ color: "#D9D9D9" }}
                        className="size-20 items-center"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </label>
                  )}
                  {/* Hình 6 */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleChange(e, "input5")}
                    className="hidden"
                    id="ImgDetail5"
                  />

                  {image && image["input5"] ? (
                    <div className="indicator ">
                      <button
                        className="indicator-item badge badge-secondary rounded-full bg-red-500"
                        onClick={() => handleClose("input5")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-4 "
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      <img
                        src={image["input5"]}
                        alt="Selected"
                        className="size-20 ml-4 "
                      />
                    </div>
                  ) : (
                    <label
                      htmlFor="ImgDetail5"
                      className=" border-2 border-dashed size-20 ml-4 "
                      style={{ borderColor: "#D9D9D9" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class=""
                        style={{ color: "#D9D9D9" }}
                        className="size-20 items-center"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </label>
                  )}
                  {/* Hình 7 */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleChange(e, "input6")}
                    className="hidden"
                    id="ImgDetail6"
                  />

                  {image && image["input6"] ? (
                    <div className="indicator ">
                      <button
                        className="indicator-item badge badge-secondary rounded-full bg-red-500"
                        onClick={() => handleClose("input6")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-4 "
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      <img
                        src={image["input6"]}
                        alt="Selected"
                        className="size-20 ml-4 "
                      />
                    </div>
                  ) : (
                    <label
                      htmlFor="ImgDetail6"
                      className=" border-2 border-dashed size-20 ml-4 "
                      style={{ borderColor: "#D9D9D9" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class=""
                        style={{ color: "#D9D9D9" }}
                        className="size-20 items-center"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </label>
                  )}
                  {/* Hình 8 */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleChange(e, "input7")}
                    className="hidden"
                    id="ImgDetail7"
                  />

                  {image && image["input7"] ? (
                    <div className="indicator ">
                      <button
                        className="indicator-item badge badge-secondary rounded-full bg-red-500"
                        onClick={() => handleClose("input7")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-4 "
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      <img
                        src={image["input7"]}
                        alt="Selected"
                        className="size-20 ml-4 "
                      />
                    </div>
                  ) : (
                    <label
                      htmlFor="ImgDetail7"
                      className=" border-2 border-dashed size-20 ml-4 "
                      style={{ borderColor: "#D9D9D9" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class=""
                        style={{ color: "#D9D9D9" }}
                        className="size-20 items-center"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </label>
                  )}
                  {/* Hình 9 */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleChange(e, "input8")}
                    className="hidden"
                    id="ImgDetail8"
                  />

                  {image && image["input8"] ? (
                    <div className="indicator ">
                      <button
                        className="indicator-item badge badge-secondary rounded-full bg-red-500"
                        onClick={() => handleClose("input8")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-4 "
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      <img
                        src={image["input8"]}
                        alt="Selected"
                        className="size-20 ml-4 "
                      />
                    </div>
                  ) : (
                    <label
                      htmlFor="ImgDetail8"
                      className=" border-2 border-dashed size-20 ml-4 "
                      style={{ borderColor: "#D9D9D9" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class=""
                        style={{ color: "#D9D9D9" }}
                        className="size-20 items-center"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </label>
                  )}
                </div>
              </div>

              {/* Button Thêm và Hủy */}
              <div className="flex w-full h-28 mt-2 mb-5 ml-4">
                <button
                  onClick={handleSubmit}
                  class="btn w-28 text-white"
                  style={{ backgroundColor: "#f13612" }}
                >
                  Lưu
                </button>
                <button
                  class="btn w-28 ml-4"
                  style={{ backgroundColor: "#e0e0e0" }}
                  onClick={() => {
                    navigate("/product-list");
                  }}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-3/12 rounded-md ml-7 animate__animated animate__fadeInRight">
          <div className="card bg-white rounded-sm top-7 grid  ">
            <h4 className="font-bold text-xl w-full ml-4 mt-2">
              Thông tin đính kèm
            </h4>
            <h4 className="flex font-sans text-base w-full h-10 ml-4 pt-2">
              Nhà cung cấp
              <h5 className="ml-1 text-red-600">(*)</h5>
            </h4>
            <select
              name="brand"
              onChange={handleChangeInput}
              onBlur={handleBlur}
              value={payload.brand || ""}
              className="select select-bordered w-11/12 ml-4 pt-2 mb-3"
            >
              <option value="" disabled>
                Chọn nhà cung cấp
              </option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </select>
            {error && <h5 className="ml-4 text-red-500">{error.brand}</h5>}
            <h4 className="flex font-sans text-base w-6/12 h-10 ml-4 pt-2">
              Loại sản phẩm
              <h5 className="ml-1 text-red-600">(*)</h5>
            </h4>
            {/* Select type  */}
            <select
              name="category"
              onBlur={handleBlur}
              onChange={handleChangeInput}
              value={payload.category || ""}
              className="select select-bordered w-11/12 h-11 ml-4 mb-8"
            >
              <option value="" disabled>
                Loại sản phẩm
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            {error && <h5 className="ml-1 text-red-500">{error.categories}</h5>}
            <h4 className="flex font-sans text-base h-10 ml-4 pt-2">
              Đơn vị tính nhỏ nhất
              <h5 className="ml-1 text-red-600">(*)</h5>
            </h4>
            <div className="ml-1 mr-1 mb-3">
              <select
                name="unit"
                onBlur={handleBlur}
                onChange={handleChangeInput}
                value={payload.unit || ""}
                className="select select-bordered w-11/12 h-11 ml-4 mb-8"
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
