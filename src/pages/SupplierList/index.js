import React from 'react'
import SupplyTableDetail from '../../components/SupplyTableDetail'
import { Link } from 'react-router-dom'

export default function SupplierList() {
  return (
    <>
        <div className='w-11/12 h-sceen justify-center flex' style={{backgroundColor: '#F5F5F5'}}>
         <div className='w-11/12 animate__animated animate__fadeInRight'>   
            <div className="card bg-white rounded-none top-7 grid  ">
         {/* search Input */}
              <div className='ml-4 mt-4 w-4/12'>
                <label className="input input-bordered input-sm	 flex items-center gap-2 mr-5 " >
                  <input type="text" className="grow "  placeholder="Search" />
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 18 18"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70">
                      <path
                      fillRule="evenodd"
                      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                      clipRule="evenodd" />
                  </svg>
              </label>
            </div>
            {/* Nofication and Button Add */}

        <div className='flex justify-between mt-6 items-center'>
             <h4 className='font-bold text-xl w-32 ml-4'>30 sản phẩm</h4>
            <Link to="/supply">
                <button className="btn btn-success text-white w-36 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Thêm mới
                </button>
             </Link> 
        </div>
          {/* table Product */}

          <div className="overflow-y-auto h-96 mt-7">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Modal</th>
        <th>Thương hiệu</th>
        <th>Địa chỉ</th>
        <th>Số điện thoại</th>
        <th>Tên nhà cung cấp</th>
        <th>Thao tác</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <SupplyTableDetail/>
      {/* row 2 */}
      <SupplyTableDetail/>
      {/* row 3 */}
      <SupplyTableDetail/>
      {/* row 4 */}
      <SupplyTableDetail/>
      {/* row 1 */}
      <SupplyTableDetail/>
      {/* row 2 */}
      <SupplyTableDetail/>
      {/* row 3 */}
      <SupplyTableDetail/>
      {/* row 4 */}
      <SupplyTableDetail/>
    </tbody>
    <tfoot>
      <tr></tr>
    </tfoot>
  </table>
</div>
            </div>
         </div>  
        </div>
    </>
  )
}
