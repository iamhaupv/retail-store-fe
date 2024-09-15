import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from "../../components/Footer"
import SideBar from '../../components/SideBar'
export default function LayoutDefault() {
  return (
    <>
      <header>
        <Outlet context={{ area: 'header' }} />
      </header>
      <div className="layout-main-content flex">
        <NavSideBar/>
        <Outlet context={{ area: 'main' }} />
      </div>
      <footer>
        <Footer/>
      </footer>
    </>
  )
}
