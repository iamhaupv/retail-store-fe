import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

export default function Receipt() {
  const location = useLocation();
  const selectedOrder = location.state?.selectedOrder || {};
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
  function parseDateTime(dateTimeString) {
    const date = new Date(dateTimeString); // Chuyển chuỗi thành đối tượng Date
    const year = date.getFullYear(); // Lấy năm
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Lấy tháng (0-11, cộng 1 để chuyển thành tháng 1-12)
    const day = date.getDate().toString().padStart(2, "0"); // Lấy ngày
    const hours = date.getHours().toString().padStart(2, "0"); // Lấy giờ
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Lấy phút
    const seconds = date.getSeconds().toString().padStart(2, "0"); // Lấy giây
    const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
  }

  const totalProduct = selectedOrder.products.reduce(
    (sum, product) =>
      (sum +=
        product?.price * product?.quantity * product?.unit?.convertQuantity),
    0
  );
  const totalDiscount = selectedOrder.products.reduce((sum, product) => {
    const discount = product?.discountAmount || 0;
    return sum += discount
  }, 0);
  return (
    <>
      {selectedOrder && (
        <>
          <div className="w-full h-full min-h-screen justify-center flex bg-base-200 rounded-none overflow-y-auto">
            <Link to="/order">
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
                <h1 className=" flex justify-start w-full">
                  Số HD: {selectedOrder.id}
                </h1>
                <h1 className=" flex justify-start w-full">
                  Ngày HD: {parseDateTime(selectedOrder.createdAt)}
                </h1>
                <h1 className=" flex justify-start w-full">
                  Nhân viên: {selectedOrder?.user?.employee?.name}
                </h1>
                <hr className="border-dashed border-black" />

                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Tên SP</th>
                      <th>Đơn vị tính</th>
                      <th>Số lượng</th>
                      <th>Đơn giá</th>
                      <th>Thành tiền</th>
                      <th>Giảm giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.products.length > 0 ? (
                      selectedOrder.products.map((product) => (
                        <tr key={product.product._id}>
                          <th>{product.product.title}</th>
                          <td>{product.unit.name}</td>
                          <td>{product.quantity}</td>
                          <td>{product.price.toLocaleString()} VNĐ</td>
                          <td>
                            {(
                              product.price *
                              product.quantity *
                              product.unit.convertQuantity
                            ).toLocaleString()}{" "}
                            VNĐ
                          </td>
                          <td>
                            {product.discountAmount.toLocaleString() || 0} VNĐ
                          </td>
                        </tr>
                      ))
                    ) : (
                      <div>Không có</div>
                    )}
                  </tbody>
                </table>
                <hr className="border-dashed border-black" />
                <h1 className=" flex justify-end w-full">
                  TỔNG TIỀN: {totalProduct.toLocaleString()} VNĐ
                </h1>
                <h1 className=" flex justify-end w-full">
                  TỔNG TIỀN ĐÃ GIẢM: {totalDiscount.toLocaleString()} VNĐ
                </h1>
                <h1 className=" flex justify-end w-full">
                  THUẾ VAT: {selectedOrder.amountVAT.toLocaleString()} VNĐ
                </h1>
                <h1 className=" flex justify-end w-full">
                  TIỀN KHÁCH TRẢ: {selectedOrder.receiveAmount.toLocaleString()}{" "}
                  VNĐ
                </h1>
                <h1 className=" flex justify-end w-full">
                  TIỀN TRẢ LẠI: {selectedOrder.change.toLocaleString()} VNĐ
                </h1>
                <h1 className=" flex justify-end w-full">
                  TỔNG TIỀN PHẢI THANH TOÁN:{" "}
                  {selectedOrder.totalAmount.toLocaleString()} VNĐ
                </h1>
                <hr className="border-dashed border-black" />
                <h1 className=" flex justify-center w-full">
                  (Giá trên đã bao gồm thuế GTGT)
                </h1>
                <h1 className=" flex justify-center w-full mt-7">
                  CAM ON QUY KHACH VA HEN GAP LAI LAN SAU
                </h1>
                <h1 className=" flex justify-center w-full">
                  Hotline: 0374582351
                </h1>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
