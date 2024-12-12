import React, { useEffect, useState } from "react";
import CategoryTableDetail from "../../components/CategoryTableDetail";
import Swal from "sweetalert2";
import apiCreateUnit from "../../apis/apiCreateUnit";
import apiGetAllUnit from "../../apis/apiGetAllUnit";
import apiUnit from "../../apis/apiUnit";
import { toast, ToastContainer } from "react-toastify";

export default function Category() {
  const [isDelete, setIsDelete] = useState(false);
  const [id, setId] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [payload, setPayload] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false); // Thêm state loading
  const [unitCurrent, setUnitCurrent] = useState(null);
  const handleIsDisplay = async (product) => {
    try {
      
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const id = product._id
      const response = await apiUnit.apiIsDisplay(token, {id});
      if(response.success) {
        toast.success("Xóa thành công")
        fetchUnits()
      }
        else toast.error("Xóa không thành công")
      setIsDelete(false);
    } catch (error) {
      console.log("handle is display is error", error);
    }
    
  };
  // #region table sort
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const sortTable = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"; // Đổi hướng nếu cột đã được sắp xếp theo chiều tăng dần
    }

    console.log("Key, value", key);

    const sortedData = [...units].sort((a, b) => {
      //console.log("Key, value", typeof a[key]);
      if (typeof a[key] === "string") {
        // Sắp xếp theo chuỗi (ABC)
        if (direction === "asc") {
          return a[key].localeCompare(b[key]);
        } else {
          return b[key].localeCompare(a[key]);
        }
      } else if (typeof a[key] === "number") {
        // Sắp xếp theo số (bé nhất đến lớn nhất)
        if (direction === "asc") {
          return a[key] - b[key];
        } else {
          return b[key] - a[key];
        }
      } else if (typeof a[key] === "object") {
        for (const [key2, value] of Object.entries(a[key])) {
          if (key2 === "name") {
            // Sắp xếp theo chuỗi (ABC)
            if (direction === "asc") {
              return a[key]["name"].localeCompare(b[key]["name"]);
            } else {
              return b[key]["name"].localeCompare(a[key]["name"]);
            }
          }
          // if (key2 === "name") {
          //   if (direction === "asc") {
          //     return a[key]["name"].localeCompare(b[key]["name"]);
          //   } else {
          //     return b[key]["name"].localeCompare(a[key]["name"]);
          //   }
          // }
        }
      }
      return 0;
    });

    setSortConfig({ key, direction });
    setUnits(sortedData);
    // Cập nhật lại danh sách sản phẩm đã sắp xếp
  };

  // Cập nhật lại danh sách sản phẩm đã sắp xếp

  // end region

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
        if (id) {
          await apiUnit.apiUpdateUnit(token, {
            pid: id,
            name,
            convertQuantity,
          });
        } else {
          await apiCreateUnit(token, { name, convertQuantity });
        }
        setLoading(false);
        Swal.fire("Thành công!", "Dữ liệu đã được lưu.", "success");
        fetchUnits();
      } catch (error) {
        setLoading(false);
        Swal.fire("Lỗi!", "Không thể lưu dữ liệu.", "error");
      }
    }
  };
  const [units, setUnits] = useState([]);
  const fetchUnits = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiGetAllUnit(token);
      setUnits(response.units);
    } catch (error) {
      throw new Error("Cannot get list units!");
    }
  };
  useEffect(() => {
    fetchUnits();
  }, []);
  console.log();
  
  return (
    <>
    <ToastContainer/>
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
          <div className="drawer-content overflow-x-hidden">
            <div
              className="w-full card bg-white rounded-md top-7 grid ml-4 mr-4 animate__animated animate__fadeInRight"
              style={{
                height: "calc(100vh - 100px)",
              }}
            >
              <div className="flex mt-5 w-full h-1/6 justify-end">
                <label
                  onClick={() => {
                    setIsUpdate(false);
                    setPayload([]);
                  }}
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
              <div
                className=" overflow-y-auto"
                style={{
                  height: "calc(100vh - 255px)",
                }}
              >
                <table className="table h-full table-pin-rows">
                  <thead>
                    <tr>
                      <th
                        onClick={() => sortTable("name")}
                        className={
                          sortConfig.key === "name"
                            ? sortConfig.direction === "asc"
                              ? "asc"
                              : "desc"
                            : ""
                        }
                      >
                        Đơn vị tính
                      </th>
                      <th
                        onClick={() => sortTable("convertQuantity")}
                        className={
                          sortConfig.key === "convertQuantity"
                            ? sortConfig.direction === "asc"
                              ? "asc"
                              : "desc"
                            : ""
                        }
                      >
                        Số lượng quy đổi
                      </th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {units.map((unit) => (
                      <tr className="hover:bg-slate-100">
                        <td key={unit._id}>{unit.name}</td>
                        <td className="text-right w-10">
                          {unit.convertQuantity}
                        </td>
                        <td className="w-32">
                          <div className="flex">
                            <label
                              onClick={() => {
                                setIsUpdate(true);
                                setId(unit._id);
                                setPayload({
                                  name: unit.name,
                                  convertQuantity: unit.convertQuantity,
                                });
                              }}
                              htmlFor="UpdateDrawer-side"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="size-6"
                                style={{ color: "#2f80ed" }}
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                />
                              </svg>
                            </label>
                            <button
                              id="btn__delete"
                              className="w-6 h-6 rounded-lg "
                              style={{
                                backgroundColor: "#feebe8",
                                outline: "",
                              }}
                              onClick={() => {
                                setIsDelete(true)
                                setUnitCurrent(unit)
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                style={{ color: "#f13612" }}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {isDelete && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="modal-box w-3/12 bg-white p-6 rounded-lg">
                          <h3 className="font-bold text-lg mb-4">
                            Bạn có muốn xóa đơn vị tính này không?
                          </h3>
                          <div>Xóa</div>
                          <div className="flex justify-between mt-6">
                            <button
                              className="btn w-20 bg-orange-500 text-white"
                              onClick={()=>handleIsDisplay(unitCurrent)}
                            >
                              Đồng ý
                            </button>
                            <button
                              className="btn w-20 bg-gray-300"
                              onClick={() => setIsDelete(false)}
                            >
                              Hủy
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {isUpdate ? (
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
                  {error.name && (
                    <div className="text-red-500">{error.name}</div>
                  )}
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
                  onClick={() => handleSubmit(id)} // Gọi handleSubmit khi nhấn nút
                  className={`btn btn-success text-white w-36 ml-80 mt-4 ${
                    loading ? "loading" : ""
                  }`} // Thêm lớp loading
                  disabled={loading} // Vô hiệu hóa nút khi loading
                >
                  {loading ? "Đang Cập nhật..." : "Cập nhật"}
                </button>
              </ul>
            </div>
          ) : (
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
                  {error.name && (
                    <div className="text-red-500">{error.name}</div>
                  )}
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
                  className={`btn btn-success text-white w-36 ml-80 mt-4 ${
                    loading ? "loading" : ""
                  }`} // Thêm lớp loading
                  disabled={loading} // Vô hiệu hóa nút khi loading
                >
                  {loading ? "Đang lưu..." : "Lưu"}
                </button>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
