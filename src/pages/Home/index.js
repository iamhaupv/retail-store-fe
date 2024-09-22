import React from "react";
import "./Home.css";
<<<<<<< HEAD
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import TableProductDetail from "../../components/TableProductDetail";
export default function Home() {
  return (
    <>
      <Header title={"Dashboard"}/>
      
=======
import FormLogin from "../../components/FormLogin";
import ContentRegisterLogin from "../../components/ContentRegisterLogin";
export default function Home() {
  return (
    <>
       <FormLogin/>
>>>>>>> 2224876bb592db3bb8f7bccef8289ab12b77a97f
    </>
  );
}
