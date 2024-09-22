import React from 'react'
import Header from '../../components/Header'
import { NavLink } from 'react-router-dom'
import ListProductTable from '../../components/ListProductTable'

export default function ListProduct() {
  return (

    <>
    {/* <Header title = {"Danh sách sản phẩm"}*/}

    <div className='w-full h-sceen' style={{backgroundColor: '#F5F5F5'}}>
    <div className='w-1130 '>   
        <div className="card bg-white rounded-none left-14 top-7 grid  ">
          <div role="tablist" className="tabs tabs-bordered ">
            <input type="radio" name="my_tabs_1" role="tab" className="tab " aria-label="Tất cả"  defaultChecked/>
            <div role="tabpanel" className="tab-content p-10"> <ListProductTable/>  </div>

            <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Đang bán" />
            <div role="tabpanel" className="tab-content p-10">  </div>

            <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Hết Hàng" />
            <div role="tabpanel" className="tab-content p-10">  </div>
          </div>
        </div>
    </div>
    </div>
    </>
  )
}
