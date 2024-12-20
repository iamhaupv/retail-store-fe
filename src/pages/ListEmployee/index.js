import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmployeeTableDetail from "../../components/EmployeeTableDetail";
import apiFindEmployeeByName from "../../apis/apiFindEmployeeByName";
import ChangeInput from "../../components/ChangeInput";
import apiGetListEmployee from "../../apis/apiGetListEmployee";
import "./ListEmployee.css";
export default function ListEmployee() {
  // #region table sort
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const sortTable = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"; // Đổi hướng nếu cột đã được sắp xếp theo chiều tăng dần
    }

    const sortedData = [
      ...(employeeName === "" ? employees : employees),
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
      }
      else if (typeof a[key] === "object") {
        for (const [key2, value] of Object.entries(a[key])) {
          if (key2 === "email") {
            // Sắp xếp theo chuỗi (ABC)
            if (direction === "asc") {
              return a[key]["email"].localeCompare(b[key]["email"]);
            } else {
              return b[key]["email"].localeCompare(a[key]["email"]);
            }
          }
        }
        }
      return 0;
    });

    setSortConfig({ key, direction });
    setEmployees(sortedData); // Cập nhật lại danh sách sản phẩm đã sắp xếp
  };
  // end region
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
  const reloadEmployees = () => {
    fetchEmployees();
  };
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
          <div className="ml-2 mt-4 w-2/12">
            <ChangeInput
              onchange={handleChangeName}
              suggestion={ListEmployees()}
              placeholder={"Nhập tên nhân viên"}
              value={employeeName}
            />
          </div>
          {/* Nofication and Button Add */}

          <div className="flex justify-between mt-6 items-center">
            <h4 className="font-bold text-xl w-32 ml-4">
              {employeeName === "" ? employees.length : employeesFilter.length}{" "}
              Nhân viên
            </h4>
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
              height: "calc(90vh - 240px)",
            }}
          >
            <table className="table table-pin-rows">
              {/* head */}
              <thead>
                <tr>
                  <th
                    onClick={() => sortTable("id")}
                    className={
                      sortConfig.key === "id"
                        ? sortConfig.direction === "asc"
                          ? "asc"
                          : "desc"
                        : ""
                    }
                  >
                    Mã nhân viên
                  </th>
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
                    Tên nhân viên
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
                    Email
                  </th>
                  <th
                    onClick={() => sortTable("phone")}
                    className={
                      sortConfig.key === "phone"
                        ? sortConfig.direction === "asc"
                          ? "asc"
                          : "desc"
                        : ""
                    }
                  >
                    Số điện thoại
                  </th>
                  <th
                    onClick={() => sortTable("address")}
                    className={
                      sortConfig.key === "address"
                        ? sortConfig.direction === "asc"
                          ? "asc"
                          : "desc"
                        : ""
                    }
                  >
                    Địa chỉ
                  </th>
                  <th
                    onClick={() => sortTable("birthday")}
                    className={
                      sortConfig.key === "birthday"
                        ? sortConfig.direction === "asc"
                          ? "asc"
                          : "desc"
                        : ""
                    }
                  >
                    Ngày sinh
                  </th>
                  <th
                    onClick={() => sortTable("gender")}
                    className={
                      sortConfig.key === "gender"
                        ? sortConfig.direction === "asc"
                          ? "asc"
                          : "desc"
                        : ""
                    }
                  >
                    Giới tính
                  </th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {employeeName === "" ? (
                  employees.length > 0 ? (
                    <EmployeeTableDetail
                      employees={employees}
                      reloadEmployees={reloadEmployees}
                    />
                  ) : (
                    <div className="w-full h-full justify-center items-center">
                      Không tìm thấy
                    </div>
                  )
                ) : employeesFilter.length > 0 ? (
                  <EmployeeTableDetail
                    employees={employeesFilter}
                    reloadEmployees={reloadEmployees}
                  />
                ) : (
                  <div className="w-full h-full justify-center items-center">
                    Không tìm thấy
                  </div>
                )}
              </tbody>
              <tfoot>
                <tr></tr>
              </tfoot>
            </table>
          </div>
          {/* pagination */}
          {/* <div className="w-full justify-end pt-3 pr-2">
            <ul className="flex items-center justify-end gap-2 ">
              <li>
                <button className="flex h-10 min-w-10 items-center justify-center rounded-lg border border-stroke bg-white px-2 text-base font-medium text-dark hover:bg-gray-1 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
                  <span>
                    <svg
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.5 9.8125H4.15625L9.46875 4.40625C9.75 4.125 9.75 3.6875 9.46875 3.40625C9.1875 3.125 8.75 3.125 8.46875 3.40625L2 9.96875C1.71875 10.25 1.71875 10.6875 2 10.9688L8.46875 17.5312C8.59375 17.6562 8.78125 17.75 8.96875 17.75C9.15625 17.75 9.3125 17.6875 9.46875 17.5625C9.75 17.2812 9.75 16.8438 9.46875 16.5625L4.1875 11.2188H17.5C17.875 11.2188 18.1875 10.9062 18.1875 10.5312C18.1875 10.125 17.875 9.8125 17.5 9.8125Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </button>
              </li>
              <li>
                <button className="flex h-10 min-w-10 items-center justify-center rounded-lg border border-stroke bg-white px-2 text-base font-medium text-dark hover:bg-gray-1 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
                  1
                </button>
              </li>
              <li>
                <button className="flex h-10 min-w-10 items-center justify-center rounded-lg border border-primary bg-green-500 px-2 text-base font-medium text-white">
                  2
                </button>
              </li>
              <li>
                <button className="flex h-10 min-w-10 items-center justify-center rounded-lg border border-stroke bg-white px-2 text-base font-medium text-dark hover:bg-gray-1 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
                  3
                </button>
              </li>
              <li>
                <button className="flex h-10 min-w-10 items-center justify-center rounded-lg border border-stroke bg-white px-2 text-base font-medium text-dark hover:bg-gray-1 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
                  4
                </button>
              </li>
              <li>
                <button className="flex h-10 min-w-10 items-center justify-center rounded-lg border border-stroke bg-white px-2 text-base font-medium text-dark hover:bg-gray-1 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
                  5
                </button>
              </li>
              <li>
                <button className="flex h-10 min-w-10 items-center justify-center rounded-lg border border-stroke bg-white px-2 text-base font-medium text-dark hover:bg-gray-1 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 10L11.5312 3.4375C11.25 3.15625 10.8125 3.15625 10.5312 3.4375C10.25 3.71875 10.25 4.15625 10.5312 4.4375L15.7812 9.78125H2.5C2.125 9.78125 1.8125 10.0937 1.8125 10.4688C1.8125 10.8438 2.125 11.1875 2.5 11.1875H15.8437L10.5312 16.5938C10.25 16.875 10.25 17.3125 10.5312 17.5938C10.6562 17.7188 10.8437 17.7812 11.0312 17.7812C11.2187 17.7812 11.4062 17.7188 11.5312 17.5625L18 11C18.2812 10.7187 18.2812 10.2812 18 10Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </li>
            </ul>
        </div> */}
          {/* end Paginination */}
        </div>
      </div>
    </>
  );
}
