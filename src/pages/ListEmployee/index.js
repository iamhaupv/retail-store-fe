import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmployeeTableDetail from "../../components/EmployeeTableDetail";
import apiFindEmployeeByName from "../../apis/apiFindEmployeeByName";
import InputValue from "../../components/InputValue";
import apiGetListEmployee from "../../apis/apiGetListEmployee";

export default function ListEmployee() {
  const [employees, setEmployees] = useState([]);
  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("Token is invalid!");
      }
      const response = await apiGetListEmployee(token);
      setEmployees(response.data);
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);
  const [employeesFilter, setEmployeesFilter] = useState([]);
  const [employeeName, setEmployeeName] = useState("");
  const fetchFindEmployeeByName = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiFindEmployeeByName(token, {
        name: employeeName,
      });
      setEmployeesFilter(response.employees || []);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  };
  const ListEmployees = () => {
    return employees.map((employee) => ({
      _id: employee._id,
      name: employee.name,
    }));
  };
  const handleChangeName = (e) => {
    if (e) setEmployeeName(e);
    else setEmployeeName("");
  };
  useEffect(() => {
    if (employeeName) {
      fetchFindEmployeeByName();
    }
  }, [employeeName]);
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
            <InputValue
              onchange={handleChangeName}
              suggestion={ListEmployees()}
              placeholder={"Nhập tên nhân viên"}
              value={employeeName}
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
                {employeeName === "" ? (
                  employees.length > 0 ? (
                    <EmployeeTableDetail employees={employees} />
                  ) : (
                    <div>Không tìm thấy</div>
                  )
                ) : employeesFilter.length > 0 ? (
                  <EmployeeTableDetail employees={employeesFilter} />
                ) : (
                  <div>Không tìm thấy</div>
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
