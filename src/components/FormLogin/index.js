import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import logo_h from "../../assets/logo_h.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./FormLogin.css";
import LoginApi from "../../apis/LoginApi";
export default function FormLogin() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // email
  const [password, setPassword] = useState(""); // password
  // error
  const [emailError, setEmailError] = useState(false); // email error
  const [passwordError, setPasswordError] = useState(false); // password error
  // icon
  const [iconEmail, setIconEmail] = useState(false); // icon email
  const [iconPassword, setIconPassword] = useState(false); // icon password
  // eyes
  const [eye, setEye] = useState(false);
  const [formValid, setFormValid] = useState(false);
  // focus
  const [focusEmail, setFocusEmail] = useState(false); // focus email
  const [focusPasswor, setFocusPassword] = useState(false); // focus password
  //  handle focus
  const handleFocusEmail = () => {
    setFocusEmail(true);
  };
  // handle focus password
  const handleFocusPassword = () => {
    setFocusPassword(true);
  };
  // regex email
  const regexEmail = (value) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (value === "" || !regex.test(value)) setEmailError(true);
    else setEmailError(false);
  };
  // handle change email
  const handleChangeEmail = (e) => {
    regexEmail(e.target.value);
    setEmail(e.target.value);
    setIconEmail(true);
  };
  // handle blur email
  const handleBlurEmail = (e) => {
    regexEmail(e.target.value);
    setFocusEmail(false);
    setIconEmail(true);
  };
  // regex password
  const regexPassword = (value) => {
    const regex = /^[A-Za-z\d]{8,}$/;
    if (value === "" || !regex.test(value)) setPasswordError(true);
    else setPasswordError(false);
  };
  // handle change password
  const handleChangePassword = (e) => {
    regexPassword(e.target.value);
    setPassword(e.target.value);
  };
  // handle blur password
  const handleBlurPassword = (e) => {
    regexPassword(e.target.value);
    setIconPassword(true);
    setFocusPassword(false);
  };
  // handle show password
  const handleShowPassword = () => {
    setEye(!eye);
    // setEye(prevEye => !prevEye);
  };
  // form valid
  useEffect(() => {
    setFormValid(
      !emailError && !passwordError && email.length >= 8 && password.length >= 8
    );
  }, [email, password, emailError, passwordError]);
  // handle login
  const handleLogin = async () => {
    try {
      const response = await LoginApi(email, password);
      // localStorage.setItem("token", response.token);
      console.log(response);
    } catch (error) {
      throw new Error(error);
    }
  };
  const apiUrl = process.env.REACT_APP_API_URL;
  console.log(apiUrl);
  return (
    <>
      {/* container */}
      <div className="flex justify-center container">
        <div>
          {/* container__title */}
          <div className="flex items-center container__title">
            {/* container__title__text */}
            <div className="container__title__text">Đăng nhập</div>
            {/* container__title__wrap */}
            <div className="flex justify-center items-center container__title__wrap">
              {/* container__title__wrap__child  */}
              <div className="flex justify-center items-center container__title__wrap__child">
                {/* container__title__wrap__child__img */}
                <img
                  src={logo_h}
                  alt="Logo"
                  className="container__title__wrap__child__img"
                />
                {/* container__title__wrap__child__text */}
                <span className="container__title__wrap__child__text">
                  auShop
                </span>
              </div>
              {/* // */}
              <div style={{ width: "55.74px", height: "1px" }}></div>
            </div>
          </div>
          {/* container__content */}
          <div className="container__content">
            {/* container__content__form */}
            <div className="container__content__form">
              {/* container__content__form phone */}
              <div>
                <div
                  onFocus={handleFocusEmail}
                  className="flex justify-center items-center phone"
                  style={{
                    border: emailError
                      ? "1px solid red"
                      : focusEmail
                      ? "1px solid black"
                      : "1px solid rgba(0, 0, 0, .14)",
                  }}
                >
                  {/*  container__content__form phone__input  */}
                  <input
                    className="phone__input"
                    style={{
                      width: emailError ? "338.4px" : "295.4px",
                      background: emailError ? "#fff6f7" : "#fffffff",
                    }}
                    value={email}
                    onChange={handleChangeEmail}
                    onBlur={handleBlurEmail}
                    placeholder="Email/Số điện thoại"
                  />
                  {emailError ? (
                    <div></div>
                  ) : (
                    // container__content__form phone__input__pass
                    <div className="flex justify-center items-center phone__input__pass">
                      {iconEmail ? (
                        <div>
                          <FontAwesomeIcon icon={faCircleCheck} />
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {/* container__content__form blank__block */}
              <div className="blank__block">
                {iconEmail && emailError ? (
                  <span style={{ color: "#ff424f", fontSize: "12px" }}>
                    Số điện thoại không hợp lệ.
                  </span>
                ) : (
                  <div></div>
                )}
              </div>
              {/* container__content__form password */}
              <div
                onFocus={handleFocusPassword}
                className="flex justify-center items-center password"
                style={{
                  background: passwordError ? "#fff6f7" : "#ffffff",
                  border: passwordError
                    ? "1px solid red"
                    : focusPasswor
                    ? "1px solid black"
                    : "1px solid rgba(0, 0, 0, .14)",
                }}
              >
                {/* container__content__form password__input */}
                <input
                  className="password__input"
                  style={{
                    background: passwordError ? "#fff6f7" : "#ffffff",
                  }}
                  type={eye ? "text" : "password"}
                  value={password}
                  onChange={handleChangePassword}
                  onBlur={handleBlurPassword}
                  placeholder="Mật khẩu"
                />
                {/* container__content__form password__eye__block */}
                <button
                  className="flex justify-center items-center password__eye__block"
                  type="button"
                  onClick={handleShowPassword}
                >
                  {eye ? (
                    <FontAwesomeIcon icon={faEye} />
                  ) : (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  )}
                </button>
              </div>
              {/* blank__block */}
              <div className="blank__block">
                {iconPassword && passwordError && (
                  <span style={{ color: "#ff424f", fontSize: "12px" }}>
                    Vui lòng điền vào mục này.
                  </span>
                )}
              </div>
              {/* container__content__form btn */}
              <div className="btn__">
                {/* btn__login */}
                <button
                  onClick={handleLogin}
                  disabled={!formValid}
                  className={`btn__login bg-orange-500 w-full h-10 ${
                    !formValid && "cursor-not-allowed"
                  }`}
                >
                  ĐĂNG NHẬP
                </button>
              </div>
            </div>
            {/* container__content__forget__sms */}
            <div className="flex justify-between items-center container__content__forget__sms">
              {/* forget */}
              <div>
                <a href="fb.com">Quên mật khẩu</a>
              </div>
              {/* sms */}
              <div>
                <a href="fb.com">Đăng nhập với SMS</a>
              </div>
            </div>
            {/* container__content__line */}
            <div className="flex items-center justify-center container__content__line">
              {/* container__content__line__text */}
              <span className="container__content__line__text">HOẶC</span>
            </div>
            {/* container__content__btn__fb__gg */}
            <div className="flex justify-center items-center container__content__btn__fb__gg">
              {/* Facebook */}
              <div className="flex justify-center items-center">
                {/* btn__fb */}
                <button className="btn__fb bg-blue-600 hover:bg-blue-700 text-white font-semibold border border-gray-400 rounded shadow flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    className="w-6 h-6"
                  >
                    <path
                      fill="#FFFFFF"
                      d="M37.1,0H10.9C5,0,0,5,0,11.1v26.2C0,43,5,48,10.9,48H24V29H18V22h6V17.4c0-6.1,3.7-9.5,9.3-9.5c2.6,0,4.8,0.2,5.4,0.3v6.5h-3c-2.9,0-3.5,1.4-3.5,3.4V22h6.8l-0.9,7H29v19h8.9C43,48,48,43,48,37.1V10.9C48,5,43,0,37.1,0z"
                    />
                  </svg>
                  {/* text */}
                  <span className="text">Facebook</span>
                </button>
              </div>
              {/* Google */}
              <div>
                <button className="btn__gg bg-white hover:bg-gray-100 text-gray-800 font-semibold border border-gray-400 rounded shadow flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    className="w-6 h-6"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    />
                    <path
                      fill="#FF3D00"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    />
                    <path
                      fill="#4CAF50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    />
                    <path
                      fill="#1976D2"
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    />
                  </svg>
                  {/* text */}
                  <span className="text">Google</span>
                </button>
              </div>
            </div>
          </div>
          {/* container__foreign */}
          <div className="flex justify-center container__foreign">
            Bạn mới biết đến HauShop? &nbsp;
            {/* sign__up */}
            <Link to="/signup" className="sign__up">
              Đăng ký
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
