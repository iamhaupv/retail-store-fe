import React from 'react'
import Header from '../../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from "../../components/Footer"
import SideBar from '../../components/SideBar'
export default function LayoutDefault() {
  return (
    <>
      <Header/>
      <div className="layout-main-content flex ">
        <SideBar/>
        <Outlet/>
      </div>
    </>
  )
}
