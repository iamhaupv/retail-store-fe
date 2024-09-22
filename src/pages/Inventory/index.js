import React from "react";
import Header from "../../components/Header";

import "./Inventory.css";
import StockIn from "../../components/StockIn";

export default function Inventory() {
  return (
    <>
    {/* Thông tin kho */}
      {/* <div className='w-full h-sceen' style={{backgroundColor: '#F5F5F5'}}>
    <div className='w-1130 '>   
        <div className="card bg-white rounded-none left-14 top-7 grid  ">
         <div className="ml-10">
           <h3 className=" font-bold text-lg rounded-sm">Thông tin kho</h3>
           <div className="card card-side shadow-xl rounded-none top-6 grid  w-11/12 h-32 " style={{backgroundColor: '#F5F5F5'}}> 
              <div className="avatar">
                <div className="w-100 h-100 rounded-full">
                  <img src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp" />
                </div>
              </div>
            <div className="card-body">
              <h2 className="card-title">New movie is released!</h2>
              <p>Click the button to watch on Jetflix app.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Watch</button>
              </div>
            </div>
           </div>
          </div>
        </div>
    </div>
    </div> */}
    
    {/* Tab table */}
    <div className='w-full h-sceen' style={{backgroundColor: '#F5F5F5'}}>
    <div className='w-1130 '>   
        <div className="card bg-white rounded-none left-14 top-7 grid  ">
          <div role="tablist" className="tabs tabs-bordered ">
            <input type="radio" name="my_tabs_1" role="tab" className="tab " aria-label="Nhập kho" defaultChecked />
            <div role="tabpanel" className="tab-content p-10"> <StockIn/>  </div>

            <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Xuất kho"  />
            <div role="tabpanel" className="tab-content p-10">  </div>

            <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Hàng tồn" />
            <div role="tabpanel" className="tab-content p-10">  </div>
          </div>
        </div>
    </div>
    </div>
    </>
  );
}
