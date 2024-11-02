import React from "react";
import { Link } from "react-router-dom";
import logo_company from "../../Image/Logo-removebg-preview.png";

export default function EntryForm() {
  return (
    <>
      <div className="w-full h-full min-h-screen justify-center flex bg-base-200 overflow-y-auto rounded-none">
        <Link to="/inventory">
          <button className="fixed btn btn-circle left-2 top-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>
          </button>
        </Link>
        <button className="fixed btn btn-circle  bg-green-400 right-2 top-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6 text-white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
            />
          </svg>
        </button>
        <button className="fixed btn btn-circle  right-2 top-16">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
        </button>
        <div className="card bg-base-100 w-8/12 rounded-lg mt-6 mb-6  ">
          <div className="card-body">
            <div className="flex justify-between">
              <div className="flex">
                <img
                  src={logo_company}
                  className="w-40 h-full"
                  alt="logo Store 24 Hour"
                />
                <div>
                  <h1 className="font-bold">Công ty TNHH 24 Hour</h1>
                  <h1>294/23/513 Phạm Văn Đồng Q.Bình Thạnh Tp.HCM</h1>
                  <h1 className="flex">
                    Hotline:<h1 className="font-bold ml-1">0374892431</h1>{" "}
                  </h1>
                </div>
              </div>
              <div className=" justify-items-end">
                <h1 className="font-bold">Số phiếu: H312391-001</h1>
                <h1>Ngày 21 tháng 08 năm 2024</h1>
              </div>
            </div>
            <h2 className="card-title text-3xl justify-center font-bold">
              PHIẾU NHẬP KHO
            </h2>
            <div className="flex justify-between">
              <div className=" justify-items-start">
                <h1 className="flex">
                  Người gửi:
                  <h1 className="font-bold ml-1">Nguyễn Thanh Khoa</h1>{" "}
                </h1>
                <h1 className="flex">
                  Địa chỉ:
                  <h1 className="font-bold ml-1">
                    294/23/513 Phạm Văn Đồng Q.Bình Thạnh Tp.HCM
                  </h1>{" "}
                </h1>
              </div>
              <div className=" justify-items-end">
                <h1 className="flex">
                  Điện thoại:<h1 className="font-bold ml-1">0374892431</h1>{" "}
                </h1>
              </div>
            </div>
            <div className="over">
              <table className="table table-xs">
                <thead>
                  <tr>
                    <th className="border-2" style={{backgroundColor:'#f2f2f2',borderColor:'#cecece'}}>STT</th>
                    <th className="border-2" style={{backgroundColor:'#f2f2f2',borderColor:'#cecece'}}>Tên sản phẩm</th>
                    <th className="border-2" style={{backgroundColor:'#f2f2f2',borderColor:'#cecece'}}>Đơn vị tính</th>
                    <th className="border-2" style={{backgroundColor:'#f2f2f2',borderColor:'#cecece'}}>Ngày hết hạn</th>
                    <th className="border-2" style={{backgroundColor:'#f2f2f2',borderColor:'#cecece'}}>Giá </th>
                    <th className="border-2" style={{backgroundColor:'#f2f2f2',borderColor:'#cecece'}}>Số lượng</th>
                    <th className="border-2" style={{backgroundColor:'#f2f2f2',borderColor:'#cecece'}}>Tổng tiền</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-2" style={{borderColor:'#cecece'}}>1</td>
                    <td className="border-2" style={{borderColor:'#cecece'}}>Cy Ganderton</td>
                    <td className="border-2" style={{borderColor:'#cecece'}}>Quality Control Specialist</td>
                    <td className="border-2" style={{borderColor:'#cecece'}}>Littel, Schaden and Vandervort</td>
                    <td className="border-2" style={{borderColor:'#cecece'}}>Canada</td>
                    <td className="border-2" style={{borderColor:'#cecece'}}>12/16/2020</td>
                    <td className="border-2" style={{borderColor:'#cecece'}}>Blue</td>
                  </tr>
                  <tr>
                    <td className="border-2" style={{borderColor:'#cecece'}}>1</td>
                    <td className="border-2" style={{borderColor:'#cecece'}}>Cy Ganderton</td>
                    <td className="border-2" style={{borderColor:'#cecece'}}>Quality Control Specialist</td>
                    <td className="border-2" style={{borderColor:'#cecece'}}>Littel, Schaden and Vandervort</td>
                    <td className="border-2" style={{borderColor:'#cecece'}}>Canada</td>
                    <td className="border-2" style={{borderColor:'#cecece'}}>12/16/2020</td>
                    <td className="border-2" style={{borderColor:'#cecece'}}>Blue</td>
                  </tr>
                  <tr>
                    <td className="border-2" style={{borderColor:'#cecece'}}>1</td>
                    <td className="border-2" style={{borderColor:'#cecece'}}>Cy Ganderton</td>
                    <td className="border-2" style={{borderColor:'#cecece'}}>Quality Control Specialist</td>
                    <td className="border-2" style={{borderColor:'#cecece'}}>Littel, Schaden and Vandervort</td>
                    <td className="border-2" style={{borderColor:'#cecece'}}>Canada</td>
                    <td className="border-2" style={{borderColor:'#cecece'}}>12/16/2020</td>
                    <td className="border-2" style={{borderColor:'#cecece'}}>Blue</td>
                  </tr>
                  <tr>
                    <td className="border-2" style={{borderColor:'#cecece'}}>1</td>
                    <td className="border-2" style={{borderColor:'#cecece'}}>Cy Ganderton</td>
                    <td className="border-2" style={{borderColor:'#cecece'}}>Quality Control Specialist</td>
                    <td className="border-2" style={{borderColor:'#cecece'}}>Littel, Schaden and Vandervort</td>
                    <td className="border-2" style={{borderColor:'#cecece'}}>Canada</td>
                    <td className="border-2" style={{borderColor:'#cecece'}}>12/16/2020</td>
                    <td className="border-2" style={{borderColor:'#cecece'}}>Blue</td>
                  </tr>
                  <tr>
                    <td className="border-2" style={{borderColor:'#cecece'}}>1</td>
                    <td className="border-2" style={{borderColor:'#cecece'}}>Cy Ganderton</td>
                    <td className="border-2" style={{borderColor:'#cecece'}}>Quality Control Specialist</td>
                    <td className="border-2" style={{borderColor:'#cecece'}}>Littel, Schaden and Vandervort</td>
                    <td className="border-2" style={{borderColor:'#cecece'}}>Canada</td>
                    <td className="border-2" style={{borderColor:'#cecece'}}>12/16/2020</td>
                    <td className="border-2" style={{borderColor:'#cecece'}}>Blue</td>
                  </tr>
                  <tr>
                    <td className="border-2" style={{borderColor:'#cecece'}}>1</td>
                    <td className="border-2" style={{borderColor:'#cecece'}}>Cy Ganderton</td>
                    <td className="border-2" style={{borderColor:'#cecece'}}>Quality Control Specialist</td>
                    <td className="border-2" style={{borderColor:'#cecece'}}>Littel, Schaden and Vandervort</td>
                    <td className="border-2" style={{borderColor:'#cecece'}}>Canada</td>
                    <td className="border-2" style={{borderColor:'#cecece'}}>12/16/2020</td>
                    <td className="border-2" style={{borderColor:'#cecece'}}>Blue</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="5" className="border-2 font-bold justify-center text-black" style={{borderColor:'#cecece'}}>
                      Tổng cộng  
                    </td>
                    <td className="border-2 font-bold text-black" style={{borderColor:'#cecece'}}>100</td>
                    <td className="border-2 font-bold text-black" style={{borderColor:'#cecece'}}>10.000.000 đ</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="flex w-full justify-end">
              <h1 className="">Tp.Hồ Chí Minh Ngày 04 Tháng 12 Năm 2024</h1>
            </div>
            <div className="flex w-full justify-center">
              <div className=" flex w-10/12 justify-between ">
                <div className=" justify-items-center ">
                  <h1 className="font-bold text-md">Thủ kho</h1>
                  <h1 className="">(Kí, ghi rõ họ tên)</h1>
                </div>
                <div className="justify-items-end mr-2">
                  <div className=" justify-items-center ">
                    <h1 className="font-bold text-md">Người giao</h1>
                    <h1 className="">(Kí, ghi rõ họ tên)</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
