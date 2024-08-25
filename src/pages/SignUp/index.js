import React from "react";
import HeaderRegisterLogin from "../../components/HeaderRegisterLogin";
import ContentRegisterLogin from "../../components/ContentRegisterLogin";
import FormRegister from "../../components/FormRegister";
export default function SignUp() {
  return (
    <>
      <HeaderRegisterLogin text={"Đăng ký"} />
      <ContentRegisterLogin component={FormRegister}/>
    </>
  );
}
