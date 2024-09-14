import React from 'react'
import Header from '../../components/Header'
import NavSideBar from '../../components/NavSideBar'
import Content from '../../components/Content'

export default function Order() {
  return (
    <>
        <Header title={"Danh sách đơn hàng"}/>
        <div>
            <NavSideBar />
            <Content/>
        </div>
    </>
  )
}
