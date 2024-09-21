import { useBarcode } from '@createnextapp/react-barcode'
import React from 'react'

export default function TableProductDetail() {

   const {inputRef} = useBarcode({
    value:'ASM001',
    options: {
        displayValue: false,
        background: '#ffffff',
        width: 1,
        height: 25,
    }
   })

  return (
<tr>
        <th>
          {/* <label>
            <input type="checkbox" className="checkbox" />
          </label> */}
          <div>
              <div className="font-bold">ASM001</div>
              <svg ref={inputRef} />
            </div>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask rounded h-12 w-12">
                <img
                  src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">Áo polo nam Galvin cổ dệt bo len</div>
              {/* Rating */}
              <div className="rating rating-sm">
                <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
                <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" defaultChecked />
                <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
                <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
                <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
              </div>
            </div>
          </div>
        </td>
        <td>
          Dior
          <br />
          <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
        </td>
        <td>Đang bán</td>
        <th>
          <button className="btn btn-ghost btn-xs">900</button>
        </th>

        <th>
          <label className='mr-2'>
          <button className=" w-6 h-6 " style={{backgroundColor: "#ebf3fe", outline:''}}>
          <svg 
             xmlns="http://www.w3.org/2000/svg" 
             fill="none" 
             viewBox="0 0 24 24" 
             stroke-width="1.5" 
             stroke="currentColor" 
             class="size-6"
             style={{color: "#2f80ed"}}>
            <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>

        </button>
          </label>

          <label>
                <button className=" w-6 h-6 " style={{backgroundColor: "#feebe8", outline:''}}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        style={{color: "#f13612"}}>
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </label> 
        </th>
      </tr>  
      
      )
}
