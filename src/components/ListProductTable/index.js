import React, { useEffect, useState } from 'react'
import TableProductDetail from '../TableProductDetail'
import apiGetListProduct from '../../apis/apiGetListProduct';

import apiGetListBrand from '../../apis/apiGetListBrand';

import Autocomplete from '../AutoComplete';

export default function ListProductTable() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([])
  const fetch = async () => {
    const response = await apiGetListProduct();
    setProducts(response.products);
  };
  const fetchBrans = async () => {
    try {
      const response = await apiGetListBrand();
      setBrands(response.brands)
    } catch (error) {
      throw new Error(error)
    }
  }
  useEffect(() => {
    fetchBrans()
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
  const suggestions = [
    "Thùng 24 ",
    "Thùng 30",
    "Lốc",
    "Chai",
  ];
  return (
    <>
      <div className=''>
        {/* filter */}
        <div className="flex ">
          {/* search Input */}
          <div className="ml-3 mt-2 w-52 h-3 ">
                <Autocomplete suggestions={suggestions} placeholder="Tìm kiếm"/>
            </div>
          {/* Brand Option */}

          {/* <select className="select select-bordered select-sm w-52  mr-5">
            <option disabled selected>
              Thương hiệu
            </option>
            {brands.map((brand) => (
              <option key={brand._id}>{brand.name}</option>
            ))}
          </select> */}

           <div className="ml-4 mt-2 w-52 h-11">
                <Autocomplete suggestions={suggestions} placeholder="Nhà cung cấp"/>
            </div>


          {/* status Option */}
          <select className="select select-bordered h-4 w-52 ml-4">
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
  <table className="table table-pin-rows ">
    {/* head */}
    <thead>
      <tr>
        {/* <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th> */}
        <th>Mã sản phẩm</th>
        <th>Sản phẩm</th>
        <th>Nhà cung cấp</th>
        <th>Tình trạng</th>
        <th>Số lượng</th>
        <th>Thao tác</th>
      </tr>
    </thead>
    <tbody>
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
