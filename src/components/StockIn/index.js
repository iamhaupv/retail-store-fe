import React, { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import StockInDetail from "../StockInDetail";
import { Link } from "react-router-dom";
import apiFilterReceiptByIdPNK from "../../apis/apiFilterReceiptByIdPNK";
import apiGetAllReceipt from "../../apis/apiGetAllReceipt";
import InputPNK from "../InputPNK";
import apiFilterReceiptByDate from "../../apis/apiFilterReceiptByDate";
import "./StockIn.css";
import apiWarehouseReceipt from "../../apis/apiWarehouseReceipt";
export default function StockIn() {
  const getToday = () => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };  
  const [value, setValue] = useState({
    startDate: getToday(),
    endDate: getToday(),
  });
  const [receiptsWeek, setReceiptsWeek] = useState([])

  const [receipts, setReceipts] = useState([]);
  const [idPNKs, setIdPNKs] = useState([]);
  const [recepitsByDate, setReceiptsByDate] = useState([]);
  const [idPNK, setIdPNK] = useState("");
  const handleNextDay = () => {
    const newStartDate = new Date(value.startDate);
    const newEndDate = new Date(value.endDate);
  
    newStartDate.setDate(newStartDate.getDate() + 1); 
    newEndDate.setDate(newEndDate.getDate() + 1); 
  
    setValue({
      startDate: newStartDate,
      endDate: newEndDate,
    });
  };
  const handlePrevDay = () => {
    const newStartDate = new Date(value.startDate);
    const newEndDate = new Date(value.endDate);
  
    newStartDate.setDate(newStartDate.getDate() - 1); 
    newEndDate.setDate(newEndDate.getDate() - 1);
  
    setValue({
      startDate: newStartDate,
      endDate: newEndDate,
    });
  };
  // #region table sort
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const sortTable = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"; // Đổi hướng nếu cột đã được sắp xếp theo chiều tăng dần
    }
    let count = 0;
    const sortedData = [
      ...(idPNK === "" && value.startDate === null && value.endDate === null
        ? receipts
        : recepitsByDate),
    ].sort((a, b) => {
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
        console.log("Key 3", a[key].length, a[key], key);
        
        if (key === "products") {
          // Sắp xếp theo chuỗi (ABC)
          if (direction === "asc") {
            return a[key].length - b[key].length
          } else {
            return b[key].length - a[key].length
          }
        }

        for (const [key2, value] of Object.entries(a[key])) {
          if (key2 === "employee") {
            // Sắp xếp theo chuỗi (ABC)
            if (direction === "asc") {
              return a[key]["employee"]["name"].localeCompare(
                b[key]["employee"]["name"]
              );
            } else {
              return b[key]["employee"]["name"].localeCompare(
                a[key]["employee"]["name"]
              );
            }
          }
        }
        // console.info(receipts)
        // console.info(receipts[count].products.length)
        // count++;
        // console.info("=====",count)
      }
      return 0;
    });

    setSortConfig({ key, direction });
    if(idPNK === "" && value.startDate === null && value.endDate === null){
      setReceipts(sortedData);
    }else{
      setReceiptsByDate(sortedData)
    }
    
 // Cập nhật lại danh sách sản phẩm đã sắp xếp
  };
  // end region
  const fetchReceipts = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("Token is invalid!");
      }
      const response = await apiGetAllReceipt(token);
      setReceipts(Array.isArray(response.receipts) ? response.receipts : []);
    } catch (error) {
      throw new Error(error);
    }
  };
  const listReceipts = () => {
    return receipts.map((receipt) => ({
      _id: receipt._id,
      idPNK: receipt.idPNK,
    }));
  };
  useEffect(() => {
    fetchReceipts();
  }, []);
  const handleChange = (selectedBrandName) => {
    if (selectedBrandName) {
      setIdPNK(selectedBrandName);
    } else {
      setIdPNK("");
    }
  };
  const handleFilterReceiptByDate = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");

      // Giả sử value là đối tượng chứa startDate và endDate theo định dạng ISO 8601
      const convertToDateString = (isoString) => {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Đảm bảo tháng luôn 2 chữ số
        const day = date.getDate().toString().padStart(2, "0"); // Đảm bảo ngày luôn 2 chữ số
        return `${year}/${month}/${day}`;
      };

      // Chuyển đổi startDate và endDate thành định dạng yyyy/MM/dd
      const formattedStartDate = convertToDateString(value.startDate);
      const formattedEndDate = convertToDateString(value.endDate);

      // Gửi dữ liệu đến API với startDate và endDate đã chuyển đổi
      const response = await apiFilterReceiptByDate(token, {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });

      // Cập nhật state với dữ liệu trả về từ API
      setReceiptsByDate(
        Array.isArray(response.receipts) ? response.receipts : []
      );
    } catch (error) {
      console.log("handle filter receipt by date is error: " + error);
    }
  };

  useEffect(() => {
    handleFilterReceiptByDate();
  }, [value]);
  const handleFilterIdPNK = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiFilterReceiptByIdPNK(token, { idPNK });
      setIdPNKs(Array.isArray(response.receipts) ? response.receipts : []);
    } catch (error) {
      console.log("handle filter idPNK is error " + error);
    }
  };
  useEffect(() => {
    handleFilterIdPNK();
  }, [idPNK]);

  const receiptCount =
    idPNK === "" && value.startDate === null && value.endDate === null
      ? receiptsWeek.length
      : idPNK !== "" && value.startDate === null && value.endDate === null
      ? idPNKs.length
      : value.startDate !== null && value.endDate !== null && idPNK === ""
      ? recepitsByDate.length
      : idPNK !== "" && value.startDate !== null && value.endDate !== null
      ? idPNKs.length
      : 0;
  return (
    <div className="">
      <div className="flex justify-between">
        {/* Search */}
        {/* <label className="input input-bordered input-md h-10 flex items-center gap-2 mr-5 ">
          <input type="text" className="grow " placeholder="Số phiếu lập" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 18"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label> */}
        <div className="w-56">
          <InputPNK
            placeholder={`Nhập mã phiếu`}
            onchange={handleChange}
            suggestion={listReceipts()}
            value={idPNK}
          />
        </div>
        {/* Calender */}

        <div className="flex items-center ml-2">
        <button
                    type="button"
                    className="btn w-28 h-4 justify-items-center border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-white "
                    onClick={handlePrevDay}
                  >
                    <svg
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Trở về
                  </button>
                  <button
                    type="button"
                    className="btn w-28 h-4 ml-4 mr-2 justify-items-center  border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-white "
                    onClick={handleNextDay}
                  >
                    Tiếp
                    <svg
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
          <p className="w-20">Ngày lập:</p>
          <div className="w-72">
            <Datepicker
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-10">
        <h3 className=" font-bold text-lg rounded-sm">Phiếu nhập kho</h3>
        <h3 className=" font-bold text-lg rounded-sm">
          {receiptCount} Phiếu nhập kho
        </h3>
        <Link to="/WarehouseReceipt">
          <button className="btn btn-success text-white w-52">
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
            Lập phiếu nhập kho
          </button>
        </Link>
      </div>
      {/* Table StockIn */}
      <div className="overflow-y-auto  mt-7"
      style={{
        height: "calc(100vh - 354px)",
      }}>
        <table className="table  table-pin-rows">
          {/* head */}
          <thead>
            <tr>
              <th
                onClick={() => sortTable("idPNK")}
                className={
                  sortConfig.key === "idPNK"
                    ? sortConfig.direction === "asc"
                      ? "asc "
                      : "desc "
                    : ""
                }
              >
                Số phiếu
              </th>
              <th
                onClick={() => sortTable("createdAt")}
                className={
                  sortConfig.key === "createdAt"
                    ? sortConfig.direction === "asc"
                      ? "asc"
                      : "desc"
                    : ""
                }
              >
                Ngày lập
              </th>
              <th
                onClick={() => sortTable("user")}
                className={
                  sortConfig.key === "user"
                    ? sortConfig.direction === "asc"
                      ? "asc"
                      : "desc"
                    : ""
                }
              >
                Người lập
              </th>
              <th
                onClick={() => sortTable("products")}
                className={
                  sortConfig.key === "products"
                    ? sortConfig.direction === "asc"
                      ? "asc"
                      : "desc"
                    : ""
                }
              >
                Tổng sản phẩm
              </th>
              <th
                onClick={() => sortTable("user")}
                className={
                  sortConfig.key === "user"
                    ? sortConfig.direction === "asc"
                      ? "asc flex justify-end items-center"
                      : "desc flex justify-end items-center"
                    : "flex justify-end items-center"
                }
              >
                Tổng tiền (VNĐ)
              </th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {idPNK === "" &&
            value.startDate === null &&
            value.endDate === null ? (
              receipts.length > 0 ? (
                <StockInDetail receipts={receiptsWeek} />
              ) : (
                <div>Không có phiếu nào</div>
              )
            ) : idPNK !== "" &&
              value.startDate === null &&
              value.endDate === null ? (
              idPNKs.length > 0 ? (
                <StockInDetail receipts={idPNKs} />
              ) : (
                <div>Không tìm thấy phiếu với mã {idPNK}</div>
              )
            ) : value.startDate !== null &&
              value.endDate !== null &&
              idPNK === "" ? (
              recepitsByDate.length > 0 ? (
                <StockInDetail receipts={recepitsByDate} />
              ) : (
                <div>Không tìm thấy phiếu trong khoảng thời gian này</div>
              )
            ) : idPNK !== "" &&
              value.startDate !== null &&
              value.endDate !== null ? (
              idPNKs.length > 0 ? (
                <StockInDetail receipts={idPNKs} />
              ) : (
                <div>Không tìm thấy phiếu với mã {idPNK}</div>
              )
            ) : (
              <div>Không tìm thấy</div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
