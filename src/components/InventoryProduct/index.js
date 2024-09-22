import React from 'react'
import ProductInventory from '../ProductInventory'

export default function InventoryProduct() {
  return (
    <div>
      <select className="select-sm select-bordered w-52">
        <option disabled selected>Kệ</option>
        <option>Kệ 1</option>
        <option>Kệ 2</option>
        <option>Kệ 3</option>
        <option>Kệ 4</option>
        <option>Kệ 5</option>
      </select>
      <div className='flex justify-between items-center pt-5'>
         <h4 className='font-bold text-xl w-32 ml-4'>Hàng tồn kho</h4>
         <button className="btn btn-success text-white w-48">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
               </svg>
               Thêm hàng vào kệ
         </button>
      </div>
      {/* TableInventory */}
            <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Modal</th>
              <th>Sản phẩm</th>
              <th>Thương hiệu</th>
              <th>Tình trạng</th>
              <th>Ngày Nhập</th>
              <th>Ngày hết hạn</th>
              <th>Số lượng</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <ProductInventory/>
            {/* row 2 */}
            
            {/* row 3 */}
            
            {/* row 4 */}
            
          </tbody>
          <tfoot>
            <tr></tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
