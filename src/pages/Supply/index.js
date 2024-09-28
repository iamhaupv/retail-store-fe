import React, { useState } from 'react'
import Header from '../../components/Header'


export default function Supply() {
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
    <div className='w-11/12 h-screen justify-center flex' style={{backgroundColor: '#F5F5F5'}}>
     <div className='w-8/12 mr-4'>
      <div className='w-full mr-4 rounded-sm'>
         {/* Thông tin sản phẩm */}
         
        <div className="card bg-white rounded-sm top-7 grid  ">
        <h4 className='font-bold text-xl w-full ml-4'>Thêm thương hiệu</h4>
        <div className='flex items-center pt-8'>
            <h4 className='font-sans text-base w-6/12 ml-4'>Tên thương hiệu</h4>
            <h4 className='font-sans text-base w-5/12 ml-4'>Mã thương hiệu</h4>
        </div>
        <div className='flex items-center pt-2'>
            <input type="text" placeholder="Tên thương hiệu" className="input input-bordered w-6/12 h-10 ml-4" />
            <input type="text" placeholder="Mã thương hiệu" className="input input-bordered w-5/12 h-10 ml-4" disabled />
        </div>
        <div className='flex items-center pt-2'>
            <h4 className='font-sans text-base w-6/12 ml-4'>Tên nhà cung cấp</h4>
            <h4 className='font-sans text-base w-5/12 ml-4'>Số điện thoại</h4>
        </div>
        <div className='flex items-center pt-2'>
            <input type="text" placeholder="Tên nhà cung cấp" className="input input-bordered w-6/12 h-10 ml-4" />
            <input type="text" placeholder="Số điện thoại" className="input input-bordered w-5/12 h-10 ml-4" />
        </div>
            <h4 className='font-sans text-base w-6/12 ml-4 mb-2'>Địa chỉ</h4>
            <input type="text" placeholder="Địa chỉ" className="input input-bordered w-6/12 h-10 ml-4"/>

            <h4 className='font-sans text-base w-6/12 ml-4 mb-2'>Mô tả</h4>
            <textarea
              placeholder="Bio"
              className="textarea textarea-bordered textarea-lg w-11/12 ml-4 mb-5"></textarea>
        </div>
        
        {/* Button Thêm và Hủy */}
        <div className='flex mt-10 mb-5'>
            <button class="btn w-28 text-white" style={{backgroundColor:"#f13612"}}>Thêm</button>
            <button class="btn w-28 ml-4" style={{backgroundColor:"#e0e0e0"}}>Hủy</button>
        </div>
      </div>
        
              
        </div>
      


        <div className='w-3/12 rounded-md ml-7'>
              <div className="card bg-white rounded-sm top-7 grid  ">
                <h4 className='font-bold text-xl w-full ml-4'>Thông tin bổ xung</h4>
                <h4 className='font-sans text-base w-6/12 h-10 ml-4 pt-2'>Logo Thương hiệu</h4>
                {/* Logo img  */}
                <input
                type="file"
                accept="image/*"
                onChange={ (e) => handleChange(e,"inputMain")}
                className="hidden"
                id="FileMain"/>

            {image['inputMain'] ? (
                  <img src={image['inputMain']}  alt="Selected" className="size-44 ml-4 mb-8" />
                ) : (
                      <label htmlFor="FileMain"
                      className= " border-2 border-dashed size-44 ml-4 mb-8 " style={{borderColor:"#D9D9D9"}}>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke-width="1.5" 
                      stroke="currentColor" 
                      class=""
                      style={{color:"#D9D9D9"}}
                      className='size-44 items-center'>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                  </label>
                )}

 
                
              </div>
            </div>



      </div>
      
      
    
</>
  )
}
