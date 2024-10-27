// import React, { useState } from "react";
// import CategoryTableDetail from "../../components/CategoryTableDetail";
// import Swal from "sweetalert2";
// import apiCreateUnit from "../../apis/apiCreateUnit";

// export default function Category() {
//   const [payload, setPayload] = useState({})
//   const [error, setError] = useState(false)
//   const [loading, setLoading] = useState(false); 
//   const handleBlur = async (e) => {
//     const { name } = e.target;
//     if (!payload[name]) {
//       setError((prev) => ({ ...prev, [name]: `Không được để trống!` }));
//     }
//   };
//   const handleChangeInput = (e) => {
//     const { name, value } = e.target;
//     const nameRegex = /^[A-Za-zÀ-ỹ\d\s'-]{2,}$/;
//     const convertQuantityRegex = /\d{1,}/
//     let errorMessage;
//     // name
//     if (name === "name") {
//       if (!value) {
//         errorMessage = "Không được để trống!";
//       } else if (!nameRegex.test(value)) {
//         errorMessage = "Tên không hợp lệ. Vui lòng nhập tên hợp lệ!";
//       }
//     }
//     // convert quantity
//     if (name === "convertQuantity") {
//       if (!value) {
//         errorMessage = "Không được để trống!";
//       } else if (!convertQuantityRegex.test(value)) {
//         errorMessage = "Email không hợp lệ. Vui lòng nhập email hợp lệ!";
//       }
//     }    
//     setError((prev) => ({ ...prev, [name]: errorMessage }));
//     setPayload((prev) => ({ ...prev, [name]: value }));
//   };
//   const handleSubmit = async () => {
//     const { name, convertQuantity } = payload;

//     // Kiểm tra xem có lỗi không
//     if (!name || !convertQuantity) {
//       Swal.fire("Lỗi!", "Vui lòng kiểm tra thông tin!", "error");
//       return;
//     }

//     // Hiển thị hộp thoại xác nhận
//     const result = await Swal.fire({
//       title: "Bạn có muốn lưu không?",
//       showCancelButton: true,
//       confirmButtonText: "Có",
//       cancelButtonText: "Không",
//     });

//     if (result.isConfirmed) {
//       setLoading(true); // Bắt đầu loading
//       try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) throw new Error("Token is invalid!");
//         const response = await apiCreateUnit(token, { name, convertQuantity });
//         setLoading(false); // Kết thúc loading
//         Swal.fire("Thành công!", "Dữ liệu đã được lưu.", "success");
//       } catch (error) {
//         setLoading(false); // Kết thúc loading nếu có lỗi
//         Swal.fire("Lỗi!", "Không thể lưu dữ liệu.", "error");
//       }
//     }
//   };

//   return (
//     <>
//       <div
//         className="w-11/12 h-full justify-center flex  "
//         style={{ backgroundColor: "#F5F5F5" }}
//       >
//         <div className="drawer drawer-end">
//           <input
//             id="UpdateDrawer-side"
//             type="checkbox"
//             className="drawer-toggle"
//           />
//           <div className="drawer-content">
//             <div className="w-full h-5/6 card bg-white rounded-md top-7 grid ml-4 mr-4 animate__animated animate__fadeInRight  ">
//               <div className="flex mt-5 w-full h-1/6 justify-end">
//                 <label
//                   htmlFor="UpdateDrawer-side"
//                   className="drawer-button btn btn-success text-white w-36 mr-9"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth={1.5}
//                     stroke="currentColor"
//                     className="size-6"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M12 4.5v15m7.5-7.5h-15"
//                     />
//                   </svg>
//                   Thêm mới
//                 </label>
//               </div>
//               <div class="h-5/6 overflow-y-auto">
//                 <table class="table h-full table-pin-rows">
//                   <thead>
//                     <tr>
//                       <th>Đơn vị tính</th>
//                       <th>Số lượng quy đổi</th>
//                       <th>Thao tác</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <CategoryTableDetail />
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//           <div className="drawer-side">
//             <label
//               htmlFor="UpdateDrawer-side"
//               aria-label="close sidebar"
//               className="drawer-overlay "
//             ></label>
//             <ul className="menu  bg-white text-base-content min-h-full w-2/6 p-4">
//               <h1 className="font-bold text-xl">Đơn vị tính</h1>
//               <div className="flex justify-start items-center mt-3">
//                   <h1>Đơn vị tính:</h1>
//                   <input type="text" onBlur={handleBlur} onChange={handleChangeInput} value={payload.name} name="name" className=" input w-80 h-8 ml-16 input-bordered  rounded-sm" />
//                   {error ? <div className="text-red-500">{error.name}</div> : ""}
//               </div>
//               <div className="flex justify-start items-center mt-2">
//                   <h1>Số lượng quy đổi:</h1>
//                   <input type="number" onBlur={handleBlur} onChange={handleChangeInput} name="convertQuantity" value={payload.convertQuantity} className="input w-80 h-8 ml-6 input-bordered  rounded-sm"/>
//                   {error ? <div className="text-red-500">{error.convertQuantity}</div> : ""}
//               </div>
//               <label
//                   htmlFor="UpdateDrawer-side"
//                   aria-label="close sidebar"
//                   className="btn btn-success text-white w-36 ml-80 mt-4"
//                 ><button
//                 onClick={handleSubmit}
//                 className={`btn btn-success text-white w-36 ml-80 mt-4 ${loading ? 'loading' : ''}`}
//                 disabled={loading}
//               >
//                 {loading ? "Đang lưu..." : "Lưu"}
//               </button>
//                 </label>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
import React, { useEffect, useState } from "react";
import CategoryTableDetail from "../../components/CategoryTableDetail";
import Swal from "sweetalert2";
import apiCreateUnit from "../../apis/apiCreateUnit";
import apiGetAllUnit from "../../apis/apiGetAllUnit";

export default function Category() {
  const [payload, setPayload] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false); // Thêm state loading

  const handleBlur = async (e) => {
    const { name } = e.target;
    if (!payload[name]) {
      setError((prev) => ({ ...prev, [name]: `Không được để trống!` }));
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    const nameRegex = /^[A-Za-zÀ-ỹ\d\s'-]{2,}$/;
    const convertQuantityRegex = /\d{1,}/;
    let errorMessage;

    // name
    if (name === "name") {
      if (!value) {
        errorMessage = "Không được để trống!";
      } else if (!nameRegex.test(value)) {
        errorMessage = "Tên không hợp lệ. Vui lòng nhập tên hợp lệ!";
      }
    }

    // convert quantity
    if (name === "convertQuantity") {
      if (!value) {
        errorMessage = "Không được để trống!";
      } else if (!convertQuantityRegex.test(value)) {
        errorMessage = "Số lượng không hợp lệ. Vui lòng nhập số lượng hợp lệ!";
      }
    }

    setError((prev) => ({ ...prev, [name]: errorMessage }));
    setPayload((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { name, convertQuantity } = payload;

    // Kiểm tra xem có lỗi không
    if (!name || !convertQuantity) {
      Swal.fire("Lỗi!", "Vui lòng kiểm tra thông tin!", "error");
      return;
    }

    // Hiển thị hộp thoại xác nhận
    const result = await Swal.fire({
      title: "Bạn có muốn lưu không?",
      showCancelButton: true,
      confirmButtonText: "Có",
      cancelButtonText: "Không",
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("Token is invalid!");
        await apiCreateUnit(token, { name, convertQuantity });
        setLoading(false); 
        Swal.fire("Thành công!", "Dữ liệu đã được lưu.", "success");
        fetchUnits()
      } catch (error) {
        setLoading(false); 
        Swal.fire("Lỗi!", "Không thể lưu dữ liệu.", "error");
      }
    }
  };
  const [units, setUnits] = useState([])
  const fetchUnits = async() => {
    try {
      const token = localStorage.getItem("accessToken")
      if(!token) throw new Error("Token is invalid!")
      const response = await apiGetAllUnit(token)
      setUnits(response.units)
    } catch (error) {
      throw new Error("Cannot get list units!")
    }
  }
  useEffect(()=> {
    fetchUnits()
  }, [])
  return (
    <>
      <div
        className="w-11/12 h-full justify-center flex"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div className="drawer drawer-end">
          <input
            id="UpdateDrawer-side"
            type="checkbox"
            className="drawer-toggle"
          />
          <div className="drawer-content">
            <div className="w-full h-5/6 card bg-white rounded-md top-7 grid ml-4 mr-4 animate__animated animate__fadeInRight">
              <div className="flex mt-5 w-full h-1/6 justify-end">
                <label
                  htmlFor="UpdateDrawer-side"
                  className="drawer-button btn btn-success text-white w-36 mr-9"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  Thêm mới
                </label>
              </div>
              <div className="h-5/6 overflow-y-auto">
                <table className="table h-full table-pin-rows">
                  <thead>
                    <tr>
                      <th>Đơn vị tính</th>
                      <th>Số lượng quy đổi</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    <CategoryTableDetail units={units} />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="UpdateDrawer-side"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-white text-base-content min-h-full w-2/6 p-4">
              <h1 className="font-bold text-xl">Đơn vị tính</h1>
              <div className="flex justify-start items-center mt-3">
                <h1>Đơn vị tính:</h1>
                <input
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChangeInput}
                  value={payload.name || ""}
                  name="name"
                  className="input w-80 h-8 ml-16 input-bordered rounded-sm"
                />
                {error.name && <div className="text-red-500">{error.name}</div>}
              </div>
              <div className="flex justify-start items-center mt-2">
                <h1>Số lượng quy đổi:</h1>
                <input
                  type="number"
                  onBlur={handleBlur}
                  onChange={handleChangeInput}
                  name="convertQuantity"
                  value={payload.convertQuantity || ""}
                  className="input w-80 h-8 ml-6 input-bordered rounded-sm"
                />
                {error.convertQuantity && (
                  <div className="text-red-500">{error.convertQuantity}</div>
                )}
              </div>
              <button
                onClick={handleSubmit} // Gọi handleSubmit khi nhấn nút
                className={`btn btn-success text-white w-36 ml-80 mt-4 ${loading ? 'loading' : ''}`} // Thêm lớp loading
                disabled={loading} // Vô hiệu hóa nút khi loading
              >
                {loading ? "Đang lưu..." : "Lưu"}
              </button>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
