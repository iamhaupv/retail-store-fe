import React, { useState } from 'react'

export default function WarehouseReceipt() {
  const [image, setImage] = useState({});

  const handleChange = (event, id) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage((prevImages) => ({
          ...prevImages,
          [id]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
   <>
   {/* <Content component={Receipt}/> */}
   <div className='w-11/12 h-full justify-center flex' style={{backgroundColor: '#F5F5F5'}}>
         <div className='w-8/12 mr-4'>
          <div className='w-full mr-4 rounded-sm'>
             {/* Thông tin sản phẩm */}
             
            <div className="card bg-white rounded-sm top-7 grid  ">
            <h4 className='font-bold text-xl w-full ml-4'>Tạo phiếu nhập kho</h4>
            
                <h4 className='font-medium text-base w-11/12 ml-4 mb-2 mt-3'>Mã phiếu</h4>
                <input type="text" placeholder="Mã phiếu" className="input input-bordered w-11/12 h-10 ml-4" disabled/>
                
                <h4 className='font-medium text-base w-11/12 ml-4 mb-2 mt-3'>Người lập</h4>
                <input type="text" placeholder="Người lập" className="input input-bordered w-11/12 h-10 ml-4" disabled/>
                
                <h4 className='font-medium text-base w-6/12 ml-4 mb-2 mt-3'>Ghi chú</h4>
                <textarea
                  placeholder=""
                  className="textarea textarea-bordered textarea-lg w-11/12 ml-4 mb-5"></textarea>
            </div>
            
          </div>
            {/* Hình ảnh sản phẩm */}
            <div className='w-full max-h-fit mr-4 rounded-sm pt-4 pb-8'>
              <div className="card bg-white rounded-sm top-7 grid pt-6 ">
                <h4 className='font-bold text-xl w-full ml-4'>Danh sách mặt hàng</h4>
                <div className='flex pt-8 h-48 w-full  pb-2'>
                  {/* Ảnh SP đại diện */}
                  {/* Hình 1 */}
                  {/* <div className='w-4/12'> */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={ (e) => handleChange(e,"inputMain")}
                    className="hidden"
                    id="FileMain"/>

                {image['inputMain'] ? (
                      <img src={image['inputMain']}  alt="Selected" className="w-full h-full ml-4 mr-4" />
                    ) : (
                          <label htmlFor="FileMain"
                          className= " border-2 border-dashed w-full h-full ml-4 mr-4 " style={{borderColor:"#D9D9D9"}}>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke-width="1.5" 
                          stroke="currentColor" 
                          class=""
                          style={{color:"#D9D9D9"}}
                          className='w-full h-full items-center'>
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                      </label>
                    )}
                {/* </div> */}

                    
                  
                </div>
                </div>
              </div>
                  {/* Button Thêm và Hủy */}
                <div className='flex mt-5 mb-5'>
                <button class="btn w-28 text-white" style={{backgroundColor:"#f13612"}}>Thêm</button>
                <button class="btn w-28 ml-4" style={{backgroundColor:"#e0e0e0"}}>Hủy</button>
                </div>
            </div>
            
              <div className='w-3/12 rounded-md ml-7'>
              <div className="card bg-white rounded-sm top-7 grid  ">
                <h4 className='font-bold text-xl w-full ml-4'>Nhập về kho</h4>
                {/* Select type  */}
                <select className="select select-bordered w-11/12 ml-4 pt-2 mb-5">
                  <option disabled selected>Chọn kho nhập</option>
                  <option>Tp.HCM</option>
                  <option>Hà Nội</option>
                  <option>Đà nẵng</option>
                </select>
                <h4 className='font-bold text-xl w-full ml-4'>Trạng thái</h4>
                {/* Select type  */}
                <select className="select select-bordered w-11/12 ml-4 pt-2 mb-5">
                  <option disabled selected>Đang vận chuyển</option>
                  <option>Đã giao</option>
                </select>
              </div>
            </div>

          </div>
   </>
  )
}
