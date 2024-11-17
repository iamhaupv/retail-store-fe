// import React, { useEffect, useRef, useState } from "react";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas-pro";
// import { Link, useLocation } from "react-router-dom";
// import logo_form from "../../Image/LogoForm.png";
// import apiGetCurrentUser from "../../apis/apiGetCurrentUser";

// export default function EntryForm() {
//   const [user, setUser] = useState("");
//   const fetchUser = async () => {
//     const token = localStorage.getItem("accessToken");
//     if (!token) throw new Error("Token is valid!");
//     const user = await apiGetCurrentUser(token);
//     setUser(user.rs);
//   };
//   useEffect(() => {
//     fetchUser();
//   }, []);
//   const location = useLocation();
//   const { receipt } = location.state || {};
//   const totalQuantity = receipt.products.reduce(
//     (sum, product) => sum + product.quantity,
//     0
//   );
//   const totalPrice = receipt.products.reduce(
//     (sum, product) => sum + product.quantity * product.importPrice,
//     0
//   );

//   const contentRef = useRef();
//   const handleDownloadPdf = () => {
//     const element = contentRef.current;
//     html2canvas(element).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("p", "mm", "a4");
//       const imgWidth = 210; // A4 width in mm
//       const pageHeight = 297; // A4 height in mm
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;
//       let heightLeft = imgHeight;
//       let position = 0;

//       pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//       heightLeft -= pageHeight;

//       while (heightLeft >= 0) {
//         position = heightLeft - imgHeight;
//         pdf.addPage();
//         pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//         heightLeft -= pageHeight;
//       }

//       pdf.save("document.pdf");
//     });
//   };
//   function formatDate(date) {
//     if (!(date instanceof Date)) {
//       date = new Date(date); // Chuyển đổi chuỗi thành đối tượng Date
//     }

//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();

//     return `${day}/${month}/${year}`;
//   }
//   const date = (date) => {
//     // Đảm bảo múi giờ đúng cho TP.Hồ Chí Minh (UTC +7)
//     const formattedDate = new Date(date).toLocaleString("en-GB", {
//       timeZone: "Asia/Ho_Chi_Minh",
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//     });

//     // Tách ngày, tháng, năm từ chuỗi
//     const [day, month, year] = formattedDate.split("/");

//     return `Ngày ${day} tháng ${month} năm ${year}`;
//   };
//   return (
//     <>
//       <div className="w-full h-full min-h-screen justify-center flex bg-base-200  rounded-none overflow-y-auto">
//         <Link to="/inventory">
//           <button className="fixed btn btn-circle bg-gray-200 left-60 top-20 ">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke-width="1.5"
//               stroke="currentColor"
//               class="size-6"
//             >
//               <path
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
//               />
//             </svg>
//           </button>
//         </Link>
//         <button
//           className="fixed btn btn-circle bg-gray-200 right-4 top-20"
//           onClick={handleDownloadPdf}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke-width="1.5"
//             stroke="currentColor"
//             class="size-6"
//           >
//             <path
//               stroke-linecap="round"
//               stroke-linejoin="round"
//               d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
//             />
//           </svg>
//         </button>
//         <div
//           className="card bg-base-100 w-8/12 h-fit rounded-lg mt-6 mb-10  "
//           ref={contentRef}
//         >
//           <div className="card-body">
//             <div className="flex justify-between">
//               <div className="flex items-center">
//                 <img
//                   src={logo_form}
//                   className="w-36 h-20"
//                   alt="logo Store 24 Hour"
//                 />
//                 <div className=" ml-3">
//                   <h1 className="font-bold">Công ty TNHH 24 HOUR</h1>
//                   <h1>294/23/513 Phạm Văn Đồng Q.Bình Thạnh Tp.HCM</h1>
//                   <h1 className="flex">
//                     Hotline:<h1 className="font-bold ml-1">{user.mobile}</h1>{" "}
//                   </h1>
//                 </div>
//               </div>
//               <div className=" justify-items-end">
//                 <h1 className="font-bold">Số phiếu: {receipt.idPNK}</h1>
//                 <h1>{date(receipt.createdAt)}</h1>
//               </div>
//             </div>
//             <h2 className="card-title text-3xl justify-center font-bold">
//               PHIẾU NHẬP KHO
//             </h2>
//             <div className="flex justify-between">
//               <div className=" justify-items-start">
//               <h1 className="flex">
//                   Nhà cung cấp:
//                   <h1 className="font-bold ml-1">{receipt.products[0].product.brand.name || "N/A"}</h1>
//                 </h1>
//                 <h1 className="flex">
//                   Người lập:
//                   <h1 className="font-bold ml-1">{user.lastname + " " + user.firstname}</h1>{" "}
//                 </h1>
//                 <h1 className="flex">
//                   Địa chỉ:
//                   <h1 className="font-bold ml-1">
//                     {receipt.products[0].product.brand.address}
//                   </h1>{" "}
//                 </h1>
//               </div>
//               <div className=" justify-items-end">
                
//                 <h1 className="flex">
//                   Điện thoại:<h1 className="font-bold ml-1">{receipt.products[0].product.brand.phone}</h1>{" "}
//                 </h1>
//               </div>
//             </div>
//             <div className="over">
//               <table className="table table-xs">
//                 <thead>
//                   <tr>
//                     <th
//                       className="border-2 w-10 justify-items-center text-black"
//                       style={{
//                         backgroundColor: "#f2f2f2",
//                         borderColor: "#cecece",
//                       }}
//                     >
//                       STT
//                     </th>
//                     <th
//                       className="border-2 w-80 justify-items-center text-black"
//                       style={{
//                         backgroundColor: "#f2f2f2",
//                         borderColor: "#cecece",
//                       }}
//                     >
//                       Tên sản phẩm
//                     </th>
//                     <th
//                       className="border-2 w-24 justify-items-center text-black"
//                       style={{
//                         backgroundColor: "#f2f2f2",
//                         borderColor: "#cecece",
//                       }}
//                     >
//                       Đơn vị tính
//                     </th>
//                     <th
//                       className="border-2 w-36 justify-items-center text-black"
//                       style={{
//                         backgroundColor: "#f2f2f2",
//                         borderColor: "#cecece",
//                       }}
//                     >
//                       Ngày hết hạn
//                     </th>
//                     <th
//                       className="border-2 w-28 justify-items-center text-black"
//                       style={{
//                         backgroundColor: "#f2f2f2",
//                         borderColor: "#cecece",
//                       }}
//                     >
//                       Giá{" "}
//                     </th>
//                     <th
//                       className="border-2 w-28 justify-items-center text-black"
//                       style={{
//                         backgroundColor: "#f2f2f2",
//                         borderColor: "#cecece",
//                       }}
//                     >
//                       Số lượng
//                     </th>
//                     <th
//                       className="border-2 w-32 justify-items-center text-black"
//                       style={{
//                         backgroundColor: "#f2f2f2",
//                         borderColor: "#cecece",
//                       }}
//                     >
//                       Tổng tiền
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {receipt && receipt.products.length > 0 ? (
//                     receipt.products.map((product, index) => (
//                       <tr key={product._id || index}>
//                         {" "}
//                         {/* Đảm bảo có key duy nhất */}
//                         <td
//                           className="border-2"
//                           style={{ borderColor: "#cecece" }}
//                         >
//                           {index + 1}
//                         </td>
//                         <td
//                           className="border-2"
//                           style={{ borderColor: "#cecece" }}
//                         >
//                           {product.product.title}
//                         </td>
//                         <td
//                           className="border-2"
//                           style={{ borderColor: "#cecece" }}
//                         >
//                           {product.unit.name || "Đơn vị"}
//                         </td>
//                         <td
//                           className="border-2"
//                           style={{ borderColor: "#cecece" }}
//                         >
//                           {formatDate(product.expires) || "Chưa xác định"}
//                         </td>
//                         <td
//                           className="border-2"
//                           style={{ borderColor: "#cecece" }}
//                         >
//                           {product.importPrice.toLocaleString() || "0"}
//                         </td>
//                         <td
//                           className="border-2"
//                           style={{ borderColor: "#cecece" }}
//                         >
//                           {product.quantity || "0"}
//                         </td>
//                         <td
//                           className="border-2"
//                           style={{ borderColor: "#cecece" }}
//                         >
//                           {(
//                             product.quantity * product.importPrice
//                           ).toLocaleString() || "0"}{" "}
//                           đ
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td
//                         colSpan="7"
//                         className="border-2"
//                         style={{ borderColor: "#cecece", textAlign: "center" }}
//                       >
//                         Chưa có sản phẩm
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>

//                 <tfoot>
//                   <tr>
//                     <td
//                       colspan="5"
//                       className="border-2 font-bold justify-center text-black"
//                       style={{ borderColor: "#cecece" }}
//                     >
//                       Tổng cộng
//                     </td>
//                     <td
//                       className="border-2 font-bold text-black"
//                       style={{ borderColor: "#cecece" }}
//                     >
//                       {totalQuantity}
//                     </td>
//                     <td
//                       className="border-2 font-bold text-black"
//                       style={{ borderColor: "#cecece" }}
//                     >
//                       {totalPrice.toLocaleString()} đ
//                     </td>
//                   </tr>
//                 </tfoot>
//               </table>
//             </div>
//             <div className="flex w-full justify-end mt-2">
//               <h1 className="">Tp.Hồ Chí Minh, {date(receipt.createdAt)}</h1>
//             </div>
//             <div className="flex w-full justify-center mb-28">
//               <div className=" flex w-10/12 justify-between ">
//                 <div className=" justify-items-center ">
//                   <h1 className="font-bold text-md">Thủ kho</h1>
//                   <h1 className="">(Kí, ghi rõ họ tên)</h1>
//                 </div>
//                 <div className="justify-items-end mr-2">
//                   <div className=" justify-items-center ">
//                     <h1 className="font-bold text-md">Người giao</h1>
//                     <h1 className="">(Kí, ghi rõ họ tên)</h1>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
import React, { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { Link, useLocation } from "react-router-dom";
import logo_form from "../../Image/LogoForm.png";
import apiGetCurrentUser from "../../apis/apiGetCurrentUser";

export default function EntryForm() {
  const [user, setUser] = useState("");
  const fetchUser = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("Token is valid!");
    const user = await apiGetCurrentUser(token);
    setUser(user.rs);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const location = useLocation();
  const { receipt } = location.state || {};
  
  const totalQuantity = receipt?.products.reduce(
    (sum, product) => sum + (product.quantity || 0) * (product.conversionRate || 1),
    0
  ) || 0;

  const calculateTotalAmount = (products) => {
    return products.reduce((total, product) => {
      const quantity = product.quantity || 0;
      const importPrice = product.importPrice || 0; // Giá nhập vào
      return total + (quantity * importPrice * product.unit.convertQuantity); // Tính tổng bằng giá nhập
    }, 0);
  };

  const totalPrice = calculateTotalAmount(receipt?.products || []);

  const contentRef = useRef();
  const handleDownloadPdf = () => {
    const element = contentRef.current;
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
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

  function formatDate(date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  const date = (date) => {
    const formattedDate = new Date(date).toLocaleString("en-GB", {
      timeZone: "Asia/Ho_Chi_Minh",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const [day, month, year] = formattedDate.split("/");
    return `Ngày ${day} tháng ${month} năm ${year}`;
  };

  return (
    <>
      <div className="w-full h-full min-h-screen justify-center flex bg-base-200 rounded-none overflow-y-auto">
        <Link to="/inventory">
          <button className="fixed btn btn-circle bg-gray-200 left-60 top-20 ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
            </svg>
          </button>
        </Link>
        <button className="fixed btn btn-circle bg-gray-200 right-4 top-20" onClick={handleDownloadPdf}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
        </button>
        <div className="card bg-base-100 w-8/12 h-fit rounded-lg mt-6 mb-10" ref={contentRef}>
          <div className="card-body">
            <div className="flex justify-between">
              <div className="flex items-center">
                <img src={logo_form} className="w-36 h-20" alt="logo Store 24 Hour" />
                <div className="ml-3">
                  <h1 className="font-bold">Công ty TNHH 24 HOUR</h1>
                  <h1>294/23/513 Phạm Văn Đồng Q.Bình Thạnh Tp.HCM</h1>
                  <h1 className="flex">Hotline:<h1 className="font-bold ml-1">{user.mobile}</h1></h1>
                </div>
              </div>
              <div className="justify-items-end">
                <h1 className="font-bold">Số phiếu: {receipt.idPNK}</h1>
                <h1>{date(receipt.createdAt)}</h1>
              </div>
            </div>
            <h2 className="card-title text-3xl justify-center font-bold">PHIẾU NHẬP KHO</h2>
            <div className="flex justify-between">
              <div className="justify-items-start">
                <h1 className="flex">
                  Nhà cung cấp:
                  <h1 className="font-bold ml-1">{receipt.products[0]?.product.brand.name || "N/A"}</h1>
                </h1>
                <h1 className="flex">
                  Người giao:
                  <h1 className="font-bold ml-1">{user.lastname + " " + user.firstname}</h1>
                </h1>
                <h1 className="flex">
                  Địa chỉ:
                  <h1 className="font-bold ml-1">{receipt.products[0]?.product.brand.address || "N/A"}</h1>
                </h1>
              </div>
              <div className="justify-items-end">
                <h1 className="flex">
                  Điện thoại:<h1 className="font-bold ml-1">{receipt.products[0]?.product.brand.phone || "N/A"}</h1>
                </h1>
              </div>
            </div>
            <div className="over">
              <table className="table table-xs">
                <thead>
                  <tr>
                    <th className="border-2 w-10 justify-items-center text-black" style={{ backgroundColor: "#f2f2f2", borderColor: "#cecece" }}>STT</th>
                    <th className="border-2 w-80 justify-items-center text-black" style={{ backgroundColor: "#f2f2f2", borderColor: "#cecece" }}>Tên sản phẩm</th>
                    <th className="border-2 w-24 justify-items-center text-black" style={{ backgroundColor: "#f2f2f2", borderColor: "#cecece" }}>Đơn vị tính</th>
                    <th className="border-2 w-36 justify-items-center text-black" style={{ backgroundColor: "#f2f2f2", borderColor: "#cecece" }}>Ngày hết hạn</th>
                    <th className="border-2 w-28 justify-items-center text-black" style={{ backgroundColor: "#f2f2f2", borderColor: "#cecece" }}>Giá</th>
                    <th className="border-2 w-28 justify-items-center text-black" style={{ backgroundColor: "#f2f2f2", borderColor: "#cecece" }}>Số lượng</th>
                    <th className="border-2 w-32 justify-items-center text-black" style={{ backgroundColor: "#f2f2f2", borderColor: "#cecece" }}>Tổng tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {receipt && receipt.products.length > 0 ? (
                    receipt.products.map((product, index) => {
                      const quantity = product.quantity || 0;
                      const importPrice = product.importPrice || 0; // Lấy giá nhập
                      const totalProductPrice = quantity * importPrice * product.unit.convertQuantity;

                      return (
                        <tr key={product._id || index}>
                          <td className="border-2" style={{ borderColor: "#cecece" }}>{index + 1}</td>
                          <td className="border-2" style={{ borderColor: "#cecece" }}>{product.product.title}</td>
                          <td className="border-2" style={{ borderColor: "#cecece" }}>{product.unit.name || "Đơn vị"}</td>
                          <td className="border-2" style={{ borderColor: "#cecece" }}>{formatDate(product.expires) || "Chưa xác định"}</td>
                          <td className="border-2" style={{ borderColor: "#cecece" }}>{importPrice.toLocaleString() || "0"}</td>
                          <td className="border-2" style={{ borderColor: "#cecece" }}>{quantity}</td>
                          <td className="border-2" style={{ borderColor: "#cecece" }}>{totalProductPrice.toLocaleString()} đ</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="7" className="border-2" style={{ borderColor: "#cecece", textAlign: "center" }}>Chưa có sản phẩm</td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="5" className="border-2 font-bold justify-center text-black" style={{ borderColor: "#cecece" }}>Tổng cộng</td>
                    <td className="border-2 font-bold text-black" style={{ borderColor: "#cecece" }}>{totalQuantity}</td>
                    <td className="border-2 font-bold text-black" style={{ borderColor: "#cecece" }}>{totalPrice.toLocaleString()} đ</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="flex w-full justify-end mt-2">
              <h1 className="">Tp.Hồ Chí Minh, {date(receipt.createdAt)}</h1>
            </div>
            <div className="flex w-full justify-center mb-28">
              <div className="flex w-10/12 justify-between">
                <div className="justify-items-center">
                  <h1 className="font-bold text-md">Người nhận</h1>
                  <h1 className="">(Kí, ghi rõ họ tên)</h1>
                </div>
                <div className="justify-items-end mr-2">
                  <div className="justify-items-center">
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
