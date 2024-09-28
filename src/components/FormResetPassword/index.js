import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import ResetPasswordApi from "../../apis/ResetPasswordApi";

export default function FormResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();

  const handleReset = async () => {
    if (password !== confirmPassword) {
      Swal.fire("Oops!", "Mật khẩu không khớp!", "error");
      return;
    }

    const rs = await ResetPasswordApi({ password: password, token: token });
    if (rs.success) {
      Swal.fire("Congratulation!", "Cập nhật mật khẩu thành công!", "success").then(() => {
        navigate("/login");
      });
    } else {
      Swal.fire("Oops!", rs.mes, "error");
    }
  };

  return (
    <div className="container__login flex justify-center font-roboto border rounded-[44px]">
      <div className="content__login flex justify-center items-center border rounded-[39px]">
        <div>
          <div className="flex items-center text-[30px]">
            <FontAwesomeIcon icon={faArrowLeft} />
            <p className="font-bold text-[30px] flex justify-center items-center ml-[62px]">Mật khẩu mới</p>
          </div>
          <label className="input input-bordered flex items-center gap-2 w-[370px] h-[45px] border rounded-[22px] mt-[12px]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
              <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
            </svg>
            <input
              type="password"
              name="password"
              className="grow"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 w-[370px] h-[45px] border rounded-[22px] mt-[12px]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
              <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
            </svg>
            <input
              type="password"
              name="confirmPassword"
              className="grow"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          <div className="flex justify-center">
            <button
              className="w-[260px] h-[60px] bg-[#19B563] border rounded-[30px] mt-[30px]"
              onClick={handleReset}
            >
              <span className="text-[#ffffff] font-bold">CẬP NHẬT</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
