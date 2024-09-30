import React, { useEffect, useState } from 'react'
import TableProductDetail from '../TableProductDetail'
import apiGetListProduct from '../../apis/apiGetListProduct';

export default function ListProductTable() {
  const [products, setProducts] = useState([]);
  const fetch = async () => {
    const response = await apiGetListProduct();
    console.log(response.products);
    setProducts(response.products);
  };
  useEffect(() => {
    fetch();
  }, []);
  // const {inputRef} = useBarcode({
  //   value:'ASM001',
  //   options: {
  //       displayValue: false,
  //       background: '#ffffff',
  //       width: 1,
  //       height: 25,
  //   }
  //  })
  return (
    <>
      <div className=''>
        {/* filter */}
        <div className="flex ">
          {/* search Input */}
          <label className="input input-bordered input-sm	 flex items-center gap-2 mr-5 ">
            <input type="text" className="grow " placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 18"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          {/* Brand Option */}
          <select className="select select-bordered select-sm w-52  mr-5">
            <option disabled selected>
              Thương hiệu
            </option>
            <option>KFC</option>
            <option>Coca Cola</option>
          </select>

          {/* status Option */}
          <select className="select select-bordered select-sm w-52">
            <option disabled selected>
              Trạng thái
            </option>
            <option>Đang bán</option>
            <option>Hết hàng</option>
          </select>
        </div>
        {/* Nofication and Button Add */}

        <div className='flex justify-between mt-6'>
             <h4 className='font-bold text-xl w-32 ml-4'>30 sản phẩm</h4>
           
             <button className="btn btn-success text-white w-36">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
               </svg>
               Thêm mới
             </button>
        </div>
        {/* table Product */}

        <div className="overflow-y-auto h-80 mt-7">
  <table className="table  ">
    {/* head */}
    <thead>
      <tr>
        {/* <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th> */}
        <th>Modal</th>
        <th>Sản phẩm</th>
        <th>Thương hiệu</th>
        <th>Tình trạng</th>
        <th>Đã bán</th>
        <th>Thao tác</th>
      </tr>
    </thead>
    <tbody>

      {/* row 1 */}
      <TableProductDetail/>
      {/* row 2 */}
      <TableProductDetail/>
      {/* row 3 */}
      <TableProductDetail/>
      {/* row 4 */}
      <TableProductDetail/>
      {/* row 1 */}
      <TableProductDetail/>
      {/* row 2 */}
      <TableProductDetail/>
      {/* row 3 */}
      <TableProductDetail/>
      {/* row 4 */}
      <TableProductDetail/>
    </tbody>
    <tfoot>
      <tr></tr>
    </tfoot>
  </table>
</div>
    </div>

    
    </>
  );
}
