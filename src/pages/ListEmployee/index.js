import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmployeeTableDetail from "../../components/EmployeeTableDetail";
import Autocomplete from "../../components/AutoComplete";
import apiFindEmployeeByName from "../../apis/apiFindEmployeeByName";

export default function ListEmployee() {
  const [employees, setEmployees] = useState([]);
  const [employeeName, setEmployeeName] = useState("");
  const fetchFindEmployeeByName = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiFindEmployeeByName(token, {
        name: employeeName,
      });
      setEmployees(response.employees || []);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
      // Optionally set an error state here
    }
  };

  useEffect(() => {
    if (employeeName) {
      fetchFindEmployeeByName();
    }
  }, [employeeName]);
  const handleChangeInput = (e) => {
    const { value } = e.target;
    setEmployeeName(value);
  };

  console.log(employees);

  const suggestion = [
    { id: 1, name: "Nguyễn Thanh Khoa" },
    { id: 2, name: "Phạm Văn Hậu" },
    { id: 3, name: "Nguyễn Đức Long" },
    { id: 4, name: "Lê Trọng Nghĩa" },
    { id: 5, name: "Devon Webb" },
    { id: 6, name: "Nguyễn Thanh Khoa" },
    { id: 7, name: "Nguyễn Đức Long" },
  ];
  return (
    <>
      <div
        className="w-11/12 h-sceen justify-center flex"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div
          className="w-full card bg-white rounded-none mt-2  ml-2 mr-2 animate__animated animate__fadeInRight"
          style={{
            height: "calc(100vh - 85px)",
          }}
        >
          {/* search Input */}
          <div className="ml-4 mt-4 w-4/12">
            <input
              id="employeeName"
              type="text"
              name="employeeName"
              value={employeeName}
              onChange={handleChangeInput}
              className="border rounded p-2 w-full"
              placeholder="Nhập tên nhân viên..."
            />
            <Autocomplete
              suggestion={suggestion}
              placeholder="Tên nhân viên.."
            />
          </div>
          {/* Nofication and Button Add */}

          <div className="flex justify-between mt-6 items-center">
            <h4 className="font-bold text-xl w-32 ml-4">30 Nhân viên</h4>
            <Link to="/employee">
              <button className="btn btn-success text-white w-36 mr-4">
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
              </button>
            </Link>
          </div>
          {/* table Product */}

          <div
            className="overflow-y-auto mt-7"
            style={{
              height: "calc(90vh - 220px)",
            }}
          >
            <table className="table table-pin-rows">
              {/* head */}
              <thead>
                <tr>
                  <th>Mã nhân viên</th>
                  <th>Tên nhân viên</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Địa chỉ</th>
                  <th>Ngày sinh</th>
                  <th>Giới tính</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {/* <EmployeeTableDetail /> */}

                {employees.length > 0 ? (
                  employees.map((employee) => (
                    <EmployeeTableDetail
                      key={employee.id}
                      employee={employee}
                    />
                  ))
                ) : (
                  <div>Không có nhân viên nào</div>
                )}
              </tbody>
              <tfoot>
                <tr></tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
