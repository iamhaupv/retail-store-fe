import React, { useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker';
import StockInDetail from '../StockInDetail';

export default function StockIn() {

    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });

  return (
    <div>
      <div className='flex justify-between'>
        {/* Search */}
        <label className="input input-bordered input-md h-10 flex items-center gap-2 mr-5 " >
                    <input type="text" className="grow "  placeholder="Số phiếu lập" />
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
         {/* Calender */}
         
          <div className='flex items-center'>
              <p className='w-32'>Ngày lập:</p>
              <div className='w-72'>
                 <Datepicker value={value} onChange={newValue => setValue(newValue)}  />
              </div>
         </div>  
         
      </div>
        <div className='flex justify-between items-center mt-10'>
           <h3 className=" font-bold text-lg rounded-sm">Phiếu nhập kho</h3>

           <button className="btn btn-success text-white w-48">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
               </svg>
               Lập phiếu nhập kho
           </button>     
        </div>
        {/* Table StockIn */}
        <div className="overflow-x-auto mt-7">
          <table className="table table-zebra">
            {/* head */}
            <thead>
            <tr>
                <th>Số phiếu</th>
                <th>Ngày lập</th>
                <th>Người lập</th>
                <th>Trạng thái</th>
                <th>Tổng SP</th>
                <th>Tổng tiền (VNĐ)</th>
                <th>Thao tác</th>
            </tr>
            </thead>
            <tbody>
            {/* row 1 */}
             <StockInDetail/>
            {/* row 2 */}
            <StockInDetail/>
            {/* row 3 */}
            <StockInDetail/>
            
            </tbody>
        </table>
        </div>
    </div>
  )
}
