import React, { useEffect, useState } from "react";
import apiChangePassword from "../../apis/apiChangePassword";
import apiForgotPassword from "../../apis/apiForgotPassword";
import Swal from "sweetalert2";
import apiCheckPassword from "../../apis/apiCheckPassword";
import apiGetCurrentUser from "../../apis/apiGetCurrentUser";

export default function ChangePassword() {
  const [payload, setPayload] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setPayload((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { passwordOld, passwordNew } = payload;
      if (!passwordOld || !passwordNew) {
        Swal.fire("Thiếu thông tin!", "Vui lòng điền đầy đủ thông tin!", "error");
        return;
      }

      const result = await Swal.fire({
        title: "Xác nhận",
        text: "Bạn có chắc chắn muốn thay đổi mật khẩu không?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Có",
        cancelButtonText: "Không",
      });

      if (result.isConfirmed) {
        if (passwordNew !== payload.repassword) {
          throw new Error("Mật khẩu mới và nhập lại mật khẩu không khớp.");
        }

        setLoading(true);
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Token is invalid!");
        const user = await apiGetCurrentUser(accessToken);
        const isPasswordCorrect = await apiCheckPassword(accessToken, {email: user.rs.email, password: passwordOld });
        if (!isPasswordCorrect.success) {
          throw new Error("Mật khẩu cũ không chính xác.");
        }
        const email = user.rs.email
        const forgotPassword = await apiForgotPassword(accessToken, {email});
        const resetToken = forgotPassword.resetToken
        const response = await apiChangePassword(accessToken, {
          token: resetToken,
          password: passwordNew,
        });

        if (response.success) {
          Swal.fire("Thành công", "Đổi mật khẩu thành công!", "success");
          setPayload({});
        } else {
          Swal.fire("Lỗi", "Đổi mật khẩu không thành công!", "error");
        }
      }
    } catch (error) {
      Swal.fire("Lỗi", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-11/12 h-screen justify-center flex overflow-y-auto" style={{ backgroundColor: "#F5F5F5" }}>
      <div className="w-11/12 justify-center">
        <div className="card bg-white rounded-lg w-full h-fit mb-2 mt-7 animate__animated animate__fadeInRight">
          <h2 className="font-bold text-xl ml-6 mt-2">Đổi mật khẩu</h2>
          <h2 className="text-sm ml-6 mt-2">Để bảo mật thông tin tài khoản tốt hơn, vui lòng đổi mật khẩu mạnh và dài hơn.</h2>
          <h2 className="text-sm ml-6">Bao gồm chữ in hoa, số và ký tự đặc biệt.</h2>

          <div className="flex w-full justify-start items-center mt-2">
            <h2 className="text-base ml-6 mt-2">Mật khẩu cũ:</h2>
            <input
              name="passwordOld"
              value={payload.passwordOld || ""}
              onChange={handleChangeInput}
              type="password"
              className="input input-bordered rounded-none w-72 h-5 ml-14"
            />
          </div>
          <div className="flex w-full justify-start items-center mt-2">
            <h2 className="text-base ml-6 mt-2">Mật khẩu mới:</h2>
            <input
              name="passwordNew"
              value={payload.passwordNew || ""}
              onChange={handleChangeInput}
              type="password"
              className="input input-bordered rounded-none w-72 h-5 ml-11"
            />
          </div>
          <div className="flex w-full justify-start items-center mt-2">
            <h2 className="text-base ml-6 mt-2">Nhập lại mật khẩu:</h2>
            <input
              value={payload.repassword || ""}
              name="repassword"
              onChange={handleChangeInput}
              type="password"
              className="input input-bordered rounded-none w-72 h-5 ml-3"
            />
          </div>
          <div className="flex w-full h-10 mt-2 mb-4 ml-44">
            <button
              onClick={handleSubmit}
              className={`btn rounded-md w-28 text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600'}`}
              disabled={loading}
            >
              {loading ? "Đang cập nhật..." : "Cập nhật"}
            </button>
            <button className="btn rounded-md w-28 ml-4 bg-gray-300">Hủy</button>
          </div>
        </div>
      </div>
    </div>
  );
}
