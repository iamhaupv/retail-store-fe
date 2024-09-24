import React from 'react'
import ProductInventory from '../ProductInventory'
import ListProductInventory from '../ListProductInventory'

export default function InventoryProduct() {
  return (
    <>
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
         <button className="btn btn-success text-white w-48"
           onClick={()=>document.getElementById('AddInventoryProduct').showModal()}>
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

    {/* Thêm Hàng vào kệ */}
    <dialog id="AddInventoryProduct" className="modal">
      <div className="modal-box w-3/5 h-3/4">
        <h3 className="font-bold text-lg mb-6">Chọn mặt hàng</h3>
        <div className='flex items-center'>
           {/* Search Input  */}
           <label className="input input-bordered w-52 h-12 flex  items-center gap-2">
              <input type="text" className="grow" placeholder="Tên sản phẩm" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd" />
              </svg>
            </label>
            {/* Product */}
            <select className="select select-bordered w-28 ml-3 mr-3">
              <option disabled selected>Loại sản phẩm</option>
              <option>Đồ ăn</option>
              <option>Thức uống</option>
            </select>
            {/* Brand */}
            <select className="select select-bordered w-28 ">
              <option disabled selected>Thương hiệu</option>
              <option>KFC</option>
              <option>Pepsi</option>
            </select>
        </div>
        <div className="divider"/>

        <div className="overflow-x-auto h-3/5">
              <ListProductInventory/>
              <ListProductInventory/>
              <ListProductInventory/>
              <ListProductInventory/>
              <ListProductInventory/>
              <ListProductInventory/>
              <ListProductInventory/>
              <ListProductInventory/>
              <ListProductInventory/>
              <ListProductInventory/>
        </div>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
    </>
  )
}
