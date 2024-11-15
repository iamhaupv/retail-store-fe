import React, { useEffect, useState } from "react";
import apiGetCurrentUser from "../../apis/apiGetCurrentUser";
import apiUpdateInfor from "../../apis/apiUpdateInfor";

export default function Information() {
  const [image, setImage] = useState(null);
  const [user, setUser] = useState({});
  const handleUpdateInfor = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
  
      // Chuẩn bị FormData để gửi lên API
      const formData = new FormData();
      formData.append("id", user._id);  // Thêm _id của user
      formData.append("firstname", user.firstname);
      formData.append("lastname", user.lastname);
      formData.append("email", user.email);
      formData.append("mobile", user.mobile);
      formData.append("address", user.address);
      formData.append("birthday", user.birthday);
      formData.append("gender", user.gender);
  
      // Nếu có ảnh mới, thêm ảnh vào FormData
      if (image) {
        formData.append("image", image);
      }
  
      // Gọi API update
      const response = await apiUpdateInfor(token, formData);
      if (response.success) {
        setUser(response.user); // Cập nhật lại state user
        alert("Thông tin đã được cập nhật!");
      } else {
        alert("Cập nhật thông tin thất bại!");
      }
    } catch (error) {
      console.log("Error updating user info:", error);
      alert("Có lỗi khi cập nhật thông tin.");
    }
  };
  

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setImage(file); // Store the file in the state for uploading
    }
  };
  const fetchCurrentUser = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("Token is invalid!");
    const currentUSer = await apiGetCurrentUser(token);
    setUser(currentUSer.rs);
  };
  useEffect(() => {
    fetchCurrentUser();
  }, []);
  console.log(user);

  return (
    <>
      <div
        className="w-11/12 h-sceen justify-center flex overflow-y-auto"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div className="w-11/12 justify-center  ">
          <div className="card bg-white rounded-lg w-full h-fit mb-2 mt-7 animate__animated animate__fadeInRight ">
            <div className="flex w-full">
              <div className="avatar w-1/4">
                <div className="size-60 ml-10 mt-16 rounded-full">
                  <img src={`${user.image}`} alt="Avatar default" />
                </div>
              </div>
              <div className="w-3/4 mt-20 ml-4 ">
                <h1 className="font-bold text-xl">Thông tin cá nhân</h1>
                <div className="flex items-center mt-2">
                  <h1 className=" text-lg">Họ tên:</h1>
                  <h1 className="font-bold text-lg ml-3">
                    {user.lastname} {user.firstname}
                  </h1>
                </div>
                <div className="flex items-center mt-1">
                  <h1 className=" text-lg">Chức vụ:</h1>
                  <h1 className=" text-lg ml-3">Quản lý</h1>
                </div>
                <div className="flex items-center mt-1">
                  <h1 className=" text-lg">Số điện thoại:</h1>
                  <h1 className=" text-lg ml-3">{user.mobile}</h1>
                </div>
                <div className="flex items-center mt-1">
                  <h1 className=" text-lg">Email:</h1>
                  <h1 className=" text-lg ml-3">{user.email}</h1>
                </div>
                <div className="flex items-center mt-1">
                  <h1 className=" text-lg">Địa chỉ:</h1>
                  <h1 className=" text-lg ml-3">{user.address}</h1>
                </div>
                <div className="flex items-center mt-1">
                  <h1 className=" text-lg">Ngày sinh:</h1>
                  <h1 className=" text-lg ml-3">{user.birthday}</h1>
                </div>
                <div className="flex items-center mt-1">
                  <h1 className=" text-lg">Giới tính:</h1>
                  <h1 className=" text-lg ml-3">{user.gender}</h1>
                </div>
                <button
                  className="btn h-2 rounded-lg w-48 mt-3 mb-4"
                  style={{ backgroundColor: "#ebf3fe", outline: "" }}
                  onClick={() =>
                    document.getElementById("Update_Information").showModal()
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                    style={{ color: "#2f80ed" }}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                  <h1 style={{ color: "#2f80ed" }}>Chỉnh sửa</h1>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <dialog id="Update_Information" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <div className="flex w-full">
            <div className="w-1/4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "inputMain")}
                className="hidden"
                id="FileMain"
              />
              {image && image["inputMain"] ? (
                <div className=" ml-10 mt-16 rounded-full">
                  {/* <span className="indicator-item indicator-middle indicator-center"> */}
                  {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                        />
                      </svg> */}
                  {/* </span> */}
                  <img
                    src={image["inputMain"]}
                    className="size-48 rounded-full "
                  />
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="w-3/4 mt-20 ml-4 ">
              <div className="w-1/4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="FileMain"
                />
                <label htmlFor="FileMain">
                  <div className="indicator ml-10 mt-16 rounded-full">
                    <img
                      src={
                        image
                          ? URL.createObjectURL(image)
                          : user.image || "/default-avatar.png"
                      }
                      className="size-48 rounded-full"
                      alt="User Avatar"
                    />
                  </div>
                </label>
              </div>
              <h1 className="font-bold text-xl">Thông tin cá nhân</h1>
              <div className="flex items-center mt-2">
                <h1 className=" text-lg">Họ tên:</h1>
                <input
                  type="text"
                  placeholder="Nguyễn Thanh Khoa"
                  class="input input-bordered w-72 h-5 ml-16"
                  value={user.lastname}
                />
              </div>
              <div className="flex items-center mt-1">
                <h1 className=" text-lg">Số điện thoại:</h1>
                <input
                className="input input-bordered w-72 h-5 ml-16"
                  type="text"
                  name="mobile"
                  value={user.mobile}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="flex items-center mt-1">
                <h1 className=" text-lg">Email:</h1>
                <input
                className="input input-bordered w-72 h-5 ml-16"
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="flex items-center mt-1">
                <h1 className=" text-lg">Địa chỉ:</h1>
                <input
                  className="input input-bordered w-72 h-5 ml-16"
                  type="text"
                  name="address"
                  value={user.address}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="flex items-center mt-1">
                <h1 className=" text-lg">Ngày sinh:</h1>
                <input
                className="input input-bordered w-72 h-5 ml-16"
                  type="text"
                  name="birthday"
                  value={user.birthday}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="flex items-center mt-1">
                <h1 className=" text-lg">Giới tính:</h1>
                <select
                className="select select-bordered select-xs w-full max-w-xs"
                  name="gender"
                  value={user.gender}
                  onChange={handleChangeInput}
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </div>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={handleUpdateInfor}
                class="btn w-28 text-white"
                style={{ backgroundColor: "#f13612" }}
              >
                Cập nhật
              </button>
              <button
                class="btn w-28 ml-4"
                style={{ backgroundColor: "#e0e0e0" }}
              >
                Hủy
              </button>{" "}
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
