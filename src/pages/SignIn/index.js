import React from 'react'
import HeaderRegisterLogin from '../../components/HeaderRegisterLogin'
import ContentRegisterLogin from '../../components/ContentRegisterLogin'
import FormLogin from '../../components/FormLogin'
export default function SignIn() {
  return (
    <>
        <HeaderRegisterLogin text={"Đăng nhập"}/>
        {/* <ContentRegisterLogin component={FormLogin}/> */}
        <FormLogin/>
    </>
  )
}
