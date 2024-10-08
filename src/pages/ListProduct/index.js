import React from 'react'
import Header from '../../components/Header'
import { NavLink } from 'react-router-dom'
import ListProductTable from '../../components/ListProductTable'

export default function ListProduct() {
  return (

    <>
    <div className='w-11/12 h-sceen justify-center flex '  style={{backgroundColor: '#F5F5F5'}}>
      <div className='w-11/12 '>
    {/* <Header title = {"Danh sách sản phẩm"}*/}
        <div className="card bg-white rounded-none top-7 grid  ">
          <div role="tablist" className="tabs tabs-bordered">
            <input type="radio" name="my_tabs_1" role="tab" className="tab  w-2/5" aria-label="Tất cả"  defaultChecked/>
            <div role="tabpanel" className="tab-content p-10"> <ListProductTable/>  </div>

            <input type="radio" name="my_tabs_1" role="tab" className="tab w-2/5" aria-label="Đang bán" />
            <div role="tabpanel" className="tab-content p-10">  </div>

            <input type="radio" name="my_tabs_1" role="tab" className="tab w-2/5" aria-label="Hết Hàng" />
            <div role="tabpanel" className="tab-content p-10">  </div>
          </div>
        </div>
      </div>
    </div> 
    </>
  )
}
