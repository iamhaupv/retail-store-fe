import React, { useState } from "react";
import apiCreateBrand from "../../apis/apiCreateBrand";
import Swal from "sweetalert2";
export default function Supply() {
  const [image, setImage] = useState({});
  const [isVisible, setIsVisible] = useState(true);

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
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setPayload((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async () => {
    const { name, supplyName, address, phone, description } = payload;

    if (!name || !supplyName || !address || !phone || !description) {
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
        const response = await apiCreateBrand(token, payload);
        if (response.success) {
          Swal.fire("Thêm nhà cung cấp thành công!", response.mes, "success");
        } else {
          Swal.fire("Không thể thêm nhà cung cấp", response.mes, "error");
        }
      } catch (error) {
        Swal.fire("Lỗi xảy ra!", "Tên thương hiệu đã tồn tại!", "error");
        console.error(error);
      }
    }
  };

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
              <h4 className="font-bold text-xl w-full ml-4 mt-2">
                Thêm nhà cung cấp
              </h4>
              <div className="flex items-center pt-8">
                <h4 className="font-sans text-base w-6/12 ml-4">
                  Tên thương hiệu
                </h4>
                <h4 className="font-sans text-base w-5/12 ml-4">
                  Mã thương hiệu
                </h4>
              </div>
              <div className="flex items-center pt-2">
                <input
                  type="text"
                  placeholder="Tên thương hiệu"
                  className="input input-bordered w-6/12 h-10 ml-4"
                />
                <input
                  type="text"
                  placeholder="Mã thương hiệu"
                  className="input input-bordered w-5/12 h-10 ml-4"
                  disabled
                />
              </div>
              <div className="flex items-center pt-2">
                <h4 className="font-sans text-base w-6/12 ml-4">
                  Tên nhà cung cấp
                </h4>
                <h4 className="font-sans text-base w-5/12 ml-4">
                  Số điện thoại
                </h4>
              </div>
              <div className="flex items-center pt-2">
                <input
                  type="text"
                  placeholder="Tên nhà cung cấp"
                  className="input input-bordered w-6/12 h-10 ml-4"
                />
                <input
                  type="text"
                  placeholder="Số điện thoại"
                  className="input input-bordered w-5/12 h-10 ml-4"
                />
              </div>
              <div className="flex items-center pt-2">
                <h4 className="font-sans text-base w-6/12 ml-4 mb-2">
                  Địa chỉ
                </h4>
              </div>
              <div className="flex items-center pt-2">
                <input
                  type="text"
                  placeholder="Địa chỉ"
                  className="input input-bordered w-6/12 h-10 ml-4"
                />
              </div>

              <h4 className="font-sans text-base w-6/12 ml-4 mb-2">Mô tả</h4>
              <textarea
                placeholder="Bio"
                className="textarea textarea-bordered textarea-lg w-11/12 ml-4 mb-5"
              ></textarea>
            </div>

            {/* Button Thêm và Hủy */}
            <div className="flex mt-10 mb-5 ml-4">
              <button
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
