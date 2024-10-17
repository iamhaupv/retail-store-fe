import React from "react";

export default function ChangePassWord() {
  return (
    <>
      <div
        className="w-11/12 h-sceen justify-center flex overflow-y-auto"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div className="w-11/12 justify-center  ">
          <div className="card bg-white rounded-lg w-full h-fit mb-2 mt-7 animate__animated animate__fadeInRight ">
            <h2 className="font-bold text-xl changePassWord ml-6 mt-2">
              Đổi mật khẩu
            </h2>
            <h2 className="text-sm changePassWord ml-6 mt-2">
              Để bảo mật thông tin tài khoản được tốt hơn, vui lòng đổi mật khẩu
              mạnh và dài hơn
            </h2>
            <h2 className="text-sm changePassWord ml-6 ">
              Bao gồm chữ in hoa, số và ký tự đặt biệt
            </h2>
            <div className="flex w-full justify-start items-center mt-2">
              <h2 className=" text-base changePassWord ml-6 mt-2">Mật khẩu cũ:</h2>
              <input type="password" className="input input-bordered rounded-none w-72 h-5 ml-14" />
            </div>
            <div className="flex w-full justify-start items-center mt-2">
              <h2 className=" text-base changePassWord ml-6 mt-2">Mật khẩu mới:</h2>
              <input type="password" className="input input-bordered rounded-none w-72 h-5 ml-11" />
            </div>
            <div className="flex w-full justify-start items-center mt-2">
              <h2 className=" text-base changePassWord ml-6 mt-2">Nhập lại mật khẩu:</h2>
              <input type="password" className="input input-bordered rounded-none w-72 h-5 ml-3" />
            </div>
            <div className="flex w-full h-10 mt-2 mb-4 ml-44">
                <button
                  class="btn rounded-md w-28 text-white"
                  style={{ backgroundColor: "#f13612" }}
                >
                  Thêm
                </button>
                <button
                  class="btn rounded-md w-28 ml-4"
                  style={{ backgroundColor: "#e0e0e0" }}
                >
                  Hủy
                </button>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
