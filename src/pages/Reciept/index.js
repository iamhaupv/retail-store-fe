import React, { useRef } from "react";
import { Link } from "react-router-dom";
import logo_form from "../../Image/LogoForm.png";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

export default function Reciept() {
  const contentRef = useRef();
  const handleDownloadPdf = () => {
    const element = contentRef.current;
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a5");
      const imgWidth = 148; // A5 width in mm
      const pageHeight = 210; // A5 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("document.pdf");
    });
  };
  return (
    <>
      <div className="w-full h-full min-h-screen justify-center flex bg-base-200 rounded-none overflow-y-auto">
        <Link to="/createOrder">
          <button className="fixed btn btn-circle bg-gray-200 left-60 top-20 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>
          </button>
        </Link>
        <button
          className="fixed btn btn-circle bg-gray-200 right-4 top-20"
          onClick={handleDownloadPdf}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
        </button>
        <div
          className="card bg-base-100 w-8/12 h-fit rounded-lg mt-6 mb-10"
          ref={contentRef}
        >
          <div className="card-body">
            <h1 className="font-bold text-xl flex justify-center w-full">
              Cửa hàng 24 HOUR
            </h1>

            <h1 className=" flex justify-center w-full">
              222/67/73 Phan Văn Trị Q.Bình Thạnh Tp.HCM
            </h1>
            <hr className="border border-black" />
            <h1 className="font-bold text-xl flex justify-center w-full">
              Phiếu thanh toán 
            </h1>
            <h1 className=" flex justify-start w-full">Số HD: 241432515</h1>
            <h1 className=" flex justify-start w-full">Ngày HD: 22/11/2024</h1>
            <h1 className=" flex justify-start w-full">
              Nhân viên: Phạm Văn Hậu
            </h1>
            <hr className="border-dashed border-black" />

            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Tên SP</th>
                  <th>Đơn vị tính</th>
                  <th>Số lượng</th>
                  <th>Giá bán</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <th>Nước ngọt Coca-Cola dung tích 120ml</th>
                  <td>Lon</td>
                  <td>20</td>
                  <td>10.000 đ</td>
                  <td>200.000 đ</td>
                </tr>
              </tbody>
            </table>
            <hr className="border-dashed border-black" />
            <h1 className=" flex justify-end w-full">Thuế VAT: 15.000 VND</h1>
            <h1 className=" flex justify-end w-full">Tiền nhận: 15.000 VND</h1>
            <h1 className=" flex justify-end w-full">Tiền thừa: 15.000 VND</h1>
            <h1 className=" flex justify-end w-full">Tổng tiền: 15.000 VND</h1>
            <hr className="border-dashed border-black" />
            <h1 className=" flex justify-center w-full">
              (Giá trên đã bao gồm thuế GTGT)
            </h1>
            <h1 className=" flex justify-center w-full mt-7">
              CAM ON QUY KHACH VA HEN GAP LAI LAN SAU
            </h1>
            <h1 className=" flex justify-center w-full">
              Hotline: 0374824356
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
