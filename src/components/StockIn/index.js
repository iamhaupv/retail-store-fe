import React, { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import StockInDetail from "../StockInDetail";
import { Link } from "react-router-dom";
import apiFilterReceiptByIdPNK from "../../apis/apiFilterReceiptByIdPNK";
import apiGetAllReceipt from "../../apis/apiGetAllReceipt";
import InputPNK from "../InputPNK";
import apiFilterReceiptByDate from "../../apis/apiFilterReceiptByDate";

export default function StockIn() {
  const [receipts, setReceipts] = useState([]);
  const [idPNKs, setIdPNKs] = useState([]);
  const [recepitsByDate, setReceiptsByDate] = useState([]);
  const [idPNK, setIdPNK] = useState("");
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
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
      setIdPNK(selectedBrandName); // Cập nhật idPNK khi người dùng nhập hoặc chọn gợi ý
    } else {
      setIdPNK(""); // Nếu không có giá trị, reset lại
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
        <InputPNK
          placeholder={`Nhập mã phiếu`}
          onchange={handleChange}
          suggestion={listReceipts()}
          value={idPNK}
        />
        {/* Calender */}

        <div className="flex items-center">
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
      <div className="overflow-y-auto h-80 mt-7">
        <table className="table  table-pin-rows">
          {/* head */}
          <thead>
            <tr>
              <th>Số phiếu</th>
              <th>Ngày lập</th>
              <th>Người lập</th>
              <th >Tổng SP</th>
              <th className="flex justify-end items-center">Tổng tiền (VNĐ)</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {idPNK === "" &&
            value.startDate === null &&
            value.endDate === null ? (
              receipts.length > 0 ? (
                <StockInDetail receipts={receipts} />
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
