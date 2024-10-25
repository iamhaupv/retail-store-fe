import React, { useState } from "react";
import Swal from "sweetalert2";
import apiCreateEmployee from "../../apis/apiCreateEmployee";
export default function Employee() {
  const [image, setImage] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [payload, setPayload] = useState({});
  const [error, setError] = useState({});
  const handleBlur = async (e) => {
    const { name } = e.target;
    if (!payload[name]) {
      setError((prev) => ({ ...prev, [name]: `Không được để trống!` }));
    }
  };
  const handleClose = () => {
    setIsVisible(false);
    setImage(null);
  };
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    const nameRegex = /^[A-Za-zÀ-ỹ\s'-]{2,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex =
      /^(0[1-9]{1}[0-9]{8}|(08[0-9]{8}|09[0-9]{8}|03[0-9]{8}|07[0-9]{8}|05[0-9]{8}|04[0-9]{8}))$/;
    const addressRegex = /^\d+\s[A-Za-zÀ-ỹ0-9\s.,'-]+$/;
    // const birthday =
    let errorMessage;
    // name
    if (name === "name") {
      if (!value) {
        errorMessage = "Không được để trống!";
      } else if (!nameRegex.test(value)) {
        errorMessage = "Tên không hợp lệ. Vui lòng nhập tên hợp lệ!";
      }
    }
    // email
    if (name === "email") {
      if (!value) {
        errorMessage = "Không được để trống!";
      } else if (!emailRegex.test(value)) {
        errorMessage = "Email không hợp lệ. Vui lòng nhập email hợp lệ!";
      }
    }
    // phone
    if (name === "phone") {
      if (!value) {
        errorMessage = "Không được để trống!";
      } else if (!phoneRegex.test(value)) {
        errorMessage = "Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại hợp lệ!";
      }
    }
    // address
    if (name === "address") {
      if (!value) {
        errorMessage = "Không được để trống!";
      } else if (!addressRegex.test(value)) {
        errorMessage = "Địa không hợp lệ. Vui lòng nhập địa chỉ hợp lệ!";
      }
    }
    // birthday
    if (name === "birthday") {
      if (!value) {
        errorMessage = "Không được để trống!";
      } else {
        const today = new Date();
        const birthDate = new Date(value);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        const isUnderage = age < 18 || 
          (age === 18 && (
            monthDifference < 0 || 
            (monthDifference === 0 && today.getDate() < birthDate.getDate())
          ));

        if (isUnderage) {
          errorMessage = "Bạn phải ít nhất 18 tuổi.";
        }
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
    try {
      const { name, email, phone, address, gender, birthday } = payload;
      if (
        !name ||
        !email ||
        !phone ||
        !address ||
        !gender ||
        !birthday ||
        !image
      ) {
        Swal.fire(
          "Thiếu thông tin!",
          "Vui lòng điền đầy đủ thông tin!",
          "error"
        );
        return;
      }

      const result = await Swal.fire({
        title: "Xác nhận",
        text: "Bạn có chắc chắn muốn thêm sản phẩm này không?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Có",
        cancelButtonText: "Không",
      });

      if (result.isConfirmed) {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("Token is valid!");
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("address", address);
        formData.append("gender", gender);
        formData.append("birthday", birthday);
        for (const key in image) {
          if (image[key]) {
            const file = await fetch(image[key]).then((res) => res.blob());
            formData.append("images", file, `image-${key}.jpg`);
          }
        }
        const response = await apiCreateEmployee(token, formData);
        if (response.success) {
          Swal.fire("Success", "Thêm thành công!", "success");
        } else {
          Swal.fire("Error", "Thêm không thành công!", "error");
        }
      }
    } catch (error) {
      Swal.fire("Error", "Thêm không thành công", "error");
    }
  };
  return (
    <>
      <div
        className="w-11/12 h-screen justify-center flex"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div className="w-8/12 mr-4 animate__animated animate__fadeInRight">
          <div className="w-full mr-4 rounded-sm">
            {/* Thông tin sản phẩm */}

            <div className="card bg-white rounded-sm top-7 grid  ">
              <h4 className="font-bold text-xl w-full ml-4 mt-2">
                Thêm nhân viên
              </h4>
              <div className="flex items-center pt-8">
                <h4 className="font-sans text-base w-6/12 ml-4">
                  Tên nhân viên
                </h4>
                <h4 className="font-sans text-base w-5/12 ml-4">
                  Mã nhân viên
                </h4>
              </div>
              <div className="flex items-center pt-2">
                <input
                  name="name"
                  onChange={handleChangeInput}
                  value={payload.name}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Tên nhân viên"
                  className="input input-bordered w-6/12 h-10 ml-4"
                />
                {error && <div className="text-red-500">{error.name}</div>}
                <input
                  type="text"
                  placeholder="Max nhan vien"
                  className="input input-bordered w-5/12 h-10 ml-4"
                  disabled
                />
              </div>
              <div className="flex items-center pt-2">
                <h4 className="font-sans text-base w-6/12 ml-4">Email</h4>
                <h4 className="font-sans text-base w-5/12 ml-4">
                  Số điện thoại
                </h4>
              </div>
              <div className="flex items-center pt-2">
                <input
                  name="email"
                  onChange={handleChangeInput}
                  value={payload.email}
                  type="text"
                  placeholder="Email"
                  className="input input-bordered w-6/12 h-10 ml-4"
                  onBlur={handleBlur}
                />
                {error && <div className="text-red-500">{error.email}</div>}
                <input
                  name="phone"
                  onChange={handleChangeInput}
                  value={payload.phone}
                  type="text"
                  placeholder="Số điện thoại"
                  onBlur={handleBlur}
                  className="input input-bordered w-5/12 h-10 ml-4"
                />
                {error && <div className="text-red-500">{error.phone}</div>}
              </div>
              <div className="flex items-center pt-2">
                <h4 className="font-sans text-base w-6/12 ml-4 mb-2">
                  Địa chỉ
                </h4>
                <h4 className="font-sans text-base w-5/12 ml-4">Ngày sinh</h4>
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
                {error && <div className="text-red-500">{error.address}</div>}
                <input
                  name="birthday"
                  value={payload.birthday}
                  onChange={handleChangeInput}
                  type="date"
                  placeholder="Ngày sinh"
                  onBlur={handleBlur}
                  className="input input-bordered w-5/12 h-10 ml-4"
                />
                {error && <div className="text-red-500">{error.birthday}</div>}
              </div>

              <h4 className="font-sans text-base w-6/12 ml-4 mb-2 mt-2">
                Giới tính
              </h4>
              <select
                value={payload.gender}
                name="gender"
                onChange={handleChangeInput}
                onBlur={handleBlur}
                className="select select-bordered w-full max-w-xs ml-4 mb-2"
              >
                <option value=" " disabled selected>
                  Giới tính
                </option>
                <option value={"Nam"}>Nam</option>
                <option value={"Nữ"}>Nữ</option>
              </select>
              {error && <div className="text-red-500">{error.gender}</div>}
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
            <h4 className="font-sans text-base w-6/12 h-10 ml-4 pt-2">
              Logo Thương hiệu
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
