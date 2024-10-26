import React, { useState } from "react";
import apiCreateBrand from "../../apis/apiCreateBrand";
import Swal from "sweetalert2";
export default function Supply() {
  const [image, setImage] = useState({});
  const [isVisible, setIsVisible] = useState(true);
  const [error, setError] = useState(false);
  const handleClose = () => {
    setIsVisible(false);
    setImage(null); // Reset image to null to show the label again
  };

  const [payload, setPayload] = useState({
    name: "",
    supplyName: "",
    address: "",
    phone: "",
    description: "",
  });
  const handleBlur = (e) => {
    const { name } = e.target;
    if (!payload[name]) {
      setError((prev) => ({ ...prev, [name]: `Không được để trống!` }));
    }
  };
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    const nameRegex = /^[A-Za-zÀ-ỹ\s'-]{2,}$/;
    const supplyNameRegex = /^[A-Za-zÀ-ỹ\s'-]{2,}$/;
    const descriptionRegex = /^.{10,}$/; // min 10 character
    const phoneRegex =
      /^(0[1-9]{1}[0-9]{8}|(08[0-9]{8}|09[0-9]{8}|03[0-9]{8}|07[0-9]{8}|05[0-9]{8}|04[0-9]{8}))$/;
    const addressRegex = /^\d+\s[A-Za-zÀ-ỹ0-9\s.,'-]+$/;
    let errorMessage;
    // title
    if (name === "name") {
      if (!value) {
        errorMessage = "Không được để trống!";
      } else if (!nameRegex.test(value)) {
        errorMessage = "Tên phải có chữ hoa đầu";
      }
    }
    // price
    if (name === "supplyName") {
      if (!value) {
        errorMessage = "Không được để trống!";
      } else if (!supplyNameRegex.test(value)) {
        errorMessage = "Giá phải là số";
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
    //
    if (name === "phone") {
      if (!value) {
        errorMessage = "Không được để trống!";
      } else if (!phoneRegex.test(value)) {
        errorMessage =
          "Số điện thoại phải là số và 11 số";
      }
    }
    //
    if (name === "address") {
      if (!value) {
        errorMessage = "Không được để trống!";
      } else if (!addressRegex.test(value)) {
        errorMessage = "Địa không hợp lệ";
      }
    }
    setError((prev) => ({ ...prev, [name]: errorMessage }));
    setPayload((prev) => ({ ...prev, [name]: value }));
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
  const handleSubmit = async () => {
    const { name, supplyName, address, phone, description } = payload;
    if (!name || !supplyName || !address || !phone || !description || !image) {
      Swal.fire("Thiếu thông tin!", "Vui lòng điền đầy đủ thông tin.", "error");
      return;
    }

    const result = await Swal.fire({
      title: "Xác nhận",
      text: "Bạn có chắc chắn muốn thêm nhà cung cấp này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Có",
      cancelButtonText: "Không",
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("Token is valid!");
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("supplyName", supplyName);
        formData.append("description", description);
        formData.append("phone", phone);
        formData.append("address", address);
        for (const key in image) {
          if (image[key]) {
            const file = await fetch(image[key]).then((res) => res.blob());
            formData.append("images", file, `image-${key}.jpg`);
          }
        }
        const response = await apiCreateBrand(token, formData);
        if (response.success) {
          Swal.fire("Success", "Thêm thành công!", "success");
        } else {
          Swal.fire("Error", "Thêm không thành công!", "error");
        }
      } catch (error) {
        Swal.fire("Lỗi xảy ra!", "Tên thương hiệu đã tồn tại!", "error");
        console.error(error);
      }
    }
  };
  console.log(payload.name);

  return (
    <>
      {/* <Content component={Receipt}/> */}
      <div
        className="w-11/12 h-screen justify-center flex"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div className="w-8/12 mr-4 animate__animated animate__fadeInRight">
          <div className="w-full mr-4 rounded-sm">
            {/* Thông tin sản phẩm */}

            <div className="card bg-white rounded-sm top-7 grid  ">
              <h4 className=" font-bold text-xl w-full ml-4 mt-2">
                Thêm nhà cung cấp
              </h4>
              <div className="flex items-center pt-8">
                <h4 className="flex font-sans text-base w-6/12 ml-4">
                  Tên nhà cung cấp
                  <h5 className="ml-1 text-red-600 ml-1">(*)</h5>
                </h4>
                <h4 className="flex font-sans text-base w-5/12 ml-4">
                  Mã nhà cung cấp
                  <h5 className="ml-1 text-red-600 ml-1">(*)</h5>

                </h4>
              </div>
              <div className="flex pt-2">
                <div className="w-6/12">
                <input
                  name="name"
                  value={payload.name}
                  onBlur={handleBlur}
                  onChange={handleChangeInput}
                  type="text"
                  placeholder="Tên nhà cung cấp"
                  className="input input-bordered w-full h-10 ml-4"
                />
                {error && (
                    <h5 className="ml-1 text-red-500">{error.name}</h5>
                  )}
                  </div>
                <input
                  type="text"
                  placeholder="Mã thương hiệu"
                  className="input input-bordered w-5/12 h-10 ml-4"
                  disabled
                />
              </div>
              <div className="flex items-center pt-2">
                <h4 className="flex font-sans text-base w-6/12 ml-4">
                  Tên người cung cấp
                  <h5 className="ml-1 text-red-600 ml-1">(*)</h5>

                  {error && (
                    <h5 className="ml-1 text-red-500">{error.supplyName}</h5>
                  )}
                </h4>
                <h4 className="flex font-sans text-base w-5/12 ml-4">
                  Số điện thoại
                  <h5 className="ml-1 text-red-600">(*)</h5>
                  {error && (
                    <h5 className="ml-1 text-red-500">{error.phone}</h5>
                  )}
                </h4>
              </div>
              <div className="flex items-center pt-2">
                <input
                  name="supplyName"
                  value={payload.supplyName}
                  onChange={handleChangeInput}
                  type="text"
                  onBlur={handleBlur}
                  placeholder="Tên người cung cấp"
                  className="input input-bordered w-6/12 h-10 ml-4"
                />
                <input
                  name="phone"
                  value={payload.phone}
                  onChange={handleChangeInput}
                  type="text"
                  onBlur={handleBlur}
                  placeholder="Số điện thoại"
                  className="input input-bordered w-5/12 h-10 ml-4"
                />
              </div>
              <div className="flex items-center pt-2">
                <h4 className="flex font-sans text-base w-6/12 ml-4 ">
                  Địa chỉ
                  {error ? (
                    <h5 className="ml-1 text-red-500">{error.address}</h5>
                  ) : (
                    <h5 className="ml-1 text-red-600">(*)</h5>
                  )}{" "}
                </h4>
              </div>
              <div className="flex items-center pt-2">
                <input
                  name="address"
                  value={payload.address}
                  onChange={handleChangeInput}
                  type="text"
                  placeholder="Địa chỉ"
                  className="input input-bordered w-6/12 h-10 ml-4"
                  onBlur={handleBlur}
                />
              </div>

              <h4 className="flex font-sans text-base w-6/12 ml-4 mb-2">
                Mô tả
                {error ? (
                  <h5 className="ml-1 text-red-500">{error.description}</h5>
                ) : (
                  <h5 className="ml-1 text-red-600">(*)</h5>
                )}
              </h4>
              <textarea
                name="description"
                value={payload.description}
                onChange={handleChangeInput}
                placeholder="Bio"
                onBlur={handleBlur}
                className="textarea textarea-bordered textarea-lg w-11/12 ml-4 mb-5"
              />
            </div>

            {/* Button Thêm và Hủy */}
            <div className="flex mt-10 mb-5 ml-4">
              <button
                onClick={handleSubmit}
                class="btn w-28 text-white"
                style={{ backgroundColor: "#f13612" }}
              >
                Thêm
              </button>
              <button
                class="btn w-28 ml-4"
                style={{ backgroundColor: "#e0e0e0" }}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>

        <div className="w-3/12 rounded-md ml-7 animate__animated animate__fadeInRight ">
          <div className="card bg-white rounded-sm top-7 grid  ">
            <h4 className="font-bold text-xl w-full ml-4 mt-2">
              Thông tin đính kèm
            </h4>
            <h4 className="flex font-sans text-base w-6/12 h-10 ml-4 pt-2">
              Logo nhà cung cấp
              <h5 className="ml-1 text-red-600">(*)</h5>
            </h4>
            {/* Logo img  */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleChange(e, "inputMain")}
              className="hidden"
              id="FileMain"
            />

            {image && image["inputMain"] ? (
              <div className="indicator ">
                <button
                  className="indicator-item badge badge-secondary rounded-full bg-red-500"
                  onClick={handleClose}
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
                  className="size-44 ml-4 mb-8"
                />
              </div>
            ) : (
              <label
                htmlFor="FileMain"
                className=" border-2 border-dashed size-44 ml-4 mb-8 "
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
          </div>
        </div>
      </div>
    </>
  );
}
