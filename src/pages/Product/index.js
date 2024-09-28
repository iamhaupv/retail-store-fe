import React, { useState } from 'react'
import Content from "../../components/Content"
import Receipt from "../../components/Receipt"
export default function Product() {
  
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
            <h4 className='font-bold text-xl w-full ml-4'>Thêm mới sản phẩm</h4>
            <div className='flex items-center pt-8'>
                <h4 className='font-sans text-base w-6/12 ml-4'>Tên sản phẩm</h4>
                <h4 className='font-sans text-base w-5/12 ml-4'>Mã sản phẩm</h4>
            </div>
            <div className='flex items-center pt-2'>
                <input type="text" placeholder="Tên sản phẩm" className="input input-bordered w-6/12 h-10 ml-4" />
                <input type="text" placeholder="Mã sản phẩm" className="input input-bordered w-5/12 h-10 ml-4" disabled />
            </div>
                <h4 className='font-sans text-base w-6/12 ml-4 mb-2'>Đơn giá</h4>
                <input type="text" placeholder="Đơn giá" className="input input-bordered w-6/12 h-10 ml-4"/>

                <h4 className='font-sans text-base w-6/12 ml-4 mb-2'>Mô tả</h4>
                <textarea
                  placeholder="Bio"
                  className="textarea textarea-bordered textarea-lg w-11/12 ml-4 mb-5"></textarea>
            </div>
            
          </div>
            {/* Hình ảnh sản phẩm */}
            <div className='w-full h-auto mr-4 rounded-sm pt-4 pb-8'>
              <div className="card bg-white rounded-sm top-7 grid pt-6 ">
                <h4 className='font-bold text-xl w-full ml-4'>Hình ảnh</h4>
                <div className='flex pt-8 w-full pb-8'>
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
                      <img src={image['inputMain']}  alt="Selected" className="size-44 ml-4" />
                    ) : (
                          <label htmlFor="FileMain"
                          className= " border-2 border-dashed size-44 ml-4  " style={{borderColor:"#D9D9D9"}}>
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
                {/* </div> */}
                 {/* Ảnh SP chi tiết */}
                  <div className='grid grid-rows-2 grid-flow-col gap-2'>
                    {/* Hình 2 */}
                    <input
                    type="file"
                    accept="image/*"
                    onChange={ (e) => handleChange(e,"input1")}
                    className="hidden"
                    id="ImgDetail1"/>

                {image['input1'] ? (
                      <img src={image["input1"]} alt="Selected" className="size-20 ml-4" />
                    ) : (
                          <label htmlFor="ImgDetail1"
                          className= " border-2 border-dashed size-20 ml-4 " style={{borderColor:"#D9D9D9"}}>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke-width="1.5" 
                          stroke="currentColor" 
                          class=""
                          style={{color:"#D9D9D9"}}
                          className='size-20 items-center'>
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                      </label>
                    )}
                    {/* Hình 3 */}
                    <input
                    type="file"
                    accept="image/*"
                    onChange={ (e) => handleChange(e,"input2")}
                    className="hidden"
                    id="ImgDetail2"/>

                {image['input2'] ? (
                      <img src={image["input2"]} alt="Selected" className="size-20 ml-4" />
                    ) : (
                          <label htmlFor="ImgDetail2"
                          className= " border-2 border-dashed size-20 ml-4 " style={{borderColor:"#D9D9D9"}}>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke-width="1.5" 
                          stroke="currentColor" 
                          class=""
                          style={{color:"#D9D9D9"}}
                          className='size-20 items-center'>
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                      </label>
                    )}
                    {/* Hình 4 */}
                    <input
                    type="file"
                    accept="image/*"
                    onChange={ (e) => handleChange(e,"input3")}
                    className="hidden"
                    id="ImgDetail3"/>

                {image['input3'] ? (
                      <img src={image["input3"]} alt="Selected" className="size-20 ml-4" />
                    ) : (
                          <label htmlFor="ImgDetail3"
                          className= " border-2 border-dashed size-20 ml-4 " style={{borderColor:"#D9D9D9"}}>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke-width="1.5" 
                          stroke="currentColor" 
                          class=""
                          style={{color:"#D9D9D9"}}
                          className='size-20 items-center'>
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                      </label>
                    )}
                    {/* Hình 5 */}
                    <input
                    type="file"
                    accept="image/*"
                    onChange={ (e) => handleChange(e,"input4")}
                    className="hidden"
                    id="ImgDetail4"/>

                {image['input4'] ? (
                      <img src={image["input4"]} alt="Selected" className="size-20 ml-4" />
                    ) : (
                          <label htmlFor="ImgDetail4"
                          className= " border-2 border-dashed size-20 ml-4 " style={{borderColor:"#D9D9D9"}}>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke-width="1.5" 
                          stroke="currentColor" 
                          class=""
                          style={{color:"#D9D9D9"}}
                          className='size-20 items-center'>
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                      </label>
                    )}
                    {/* Hình 6 */}
                    <input
                    type="file"
                    accept="image/*"
                    onChange={ (e) => handleChange(e,"input5")}
                    className="hidden"
                    id="ImgDetail5"/>

                {image['input5'] ? (
                      <img src={image["input5"]} alt="Selected" className="size-20 ml-4" />
                    ) : (
                          <label htmlFor="ImgDetail5"
                          className= " border-2 border-dashed size-20 ml-4 " style={{borderColor:"#D9D9D9"}}>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke-width="1.5" 
                          stroke="currentColor" 
                          class=""
                          style={{color:"#D9D9D9"}}
                          className='size-20 items-center'>
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                      </label>
                    )}
                    {/* Hình 7 */}
                    <input
                    type="file"
                    accept="image/*"
                    onChange={ (e) => handleChange(e,"input6")}
                    className="hidden"
                    id="ImgDetail6"/>

                {image['input6'] ? (
                      <img src={image["input6"]} alt="Selected" className="size-20 ml-4" />
                    ) : (
                          <label htmlFor="ImgDetail6"
                          className= " border-2 border-dashed size-20 ml-4 " style={{borderColor:"#D9D9D9"}}>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke-width="1.5" 
                          stroke="currentColor" 
                          class=""
                          style={{color:"#D9D9D9"}}
                          className='size-20 items-center'>
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                      </label>
                    )}
                    {/* Hình 8 */}
                    <input
                    type="file"
                    accept="image/*"
                    onChange={ (e) => handleChange(e,"input7")}
                    className="hidden"
                    id="ImgDetail7"/>

                {image['input7'] ? (
                      <img src={image["input7"]} alt="Selected" className="size-20 ml-4" />
                    ) : (
                          <label htmlFor="ImgDetail7"
                          className= " border-2 border-dashed size-20 ml-4 " style={{borderColor:"#D9D9D9"}}>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke-width="1.5" 
                          stroke="currentColor" 
                          class=""
                          style={{color:"#D9D9D9"}}
                          className='size-20 items-center'>
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                      </label>
                    )}
                    {/* Hình 9 */}
                    <input
                    type="file"
                    accept="image/*"
                    onChange={ (e) => handleChange(e,"input8")}
                    className="hidden"
                    id="ImgDetail8"/>

                {image['input8'] ? (
                      <img src={image["input8"]} alt="Selected" className="size-20 ml-4" />
                    ) : (
                          <label htmlFor="ImgDetail8"
                          className= " border-2 border-dashed size-20 ml-4 " style={{borderColor:"#D9D9D9"}}>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke-width="1.5" 
                          stroke="currentColor" 
                          class=""
                          style={{color:"#D9D9D9"}}
                          className='size-20 items-center'>
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                      </label>
                    )}
                    
                  </div>
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
                <h4 className='font-bold text-xl w-full ml-4'>Thông tin bổ xung</h4>
                <h4 className='font-sans text-base w-6/12 h-10 ml-4 pt-2'>Thương hiệu</h4>
                {/* Select type  */}
                <select className="select select-bordered w-11/12 ml-4 pt-2 mb-5">
                  <option disabled selected>Chọn thương hiệu</option>
                  <option>KFC</option>
                  <option>Pepsi</option>
                </select>
 
                <h4 className='font-sans text-base w-6/12 h-10 ml-4 pt-2'>Loại sản phẩm</h4>
                {/* Select type  */}
                <input type="text" placeholder="Loại sản phẩm" className="input input-bordered w-11/12 h-11 ml-4 mb-8" />




              </div>
            </div>

          </div>
          
          
        
    </>
  )
}
