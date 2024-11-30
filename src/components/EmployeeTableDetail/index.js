import React, { useEffect, useState } from "react";
import apiIsDisplayEmployee from "../../apis/apiIsDisplayEmployee";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EmployeeTableDetail({ employees, reloadEmployees  }) {
  const [employeeList, setEmployeeList] = useState(employees); 
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  useEffect(() => {
    setEmployeeList(employees);
  }, [employees]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const handleChangeIsDisplay = async (pid, isDisplay) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid");
      await apiIsDisplayEmployee(token, pid, { isDisplay });
      reloadEmployees();
    } catch (error) {
      throw new Error(error);
    }
  };
  const handleDeleteProduct = async () => {
    if (selectedEmployee) {
      try {
        await handleChangeIsDisplay(selectedEmployee._id, false);
        toast.success("Xóa thành công!");
        toggleModal();
      } catch (error) {
        toast.error("Xóa không thành công");
        console.error("Error deleting employee:", error);
      }
    }
  };
  const handleOpenModalDelete = (product) => {
    setSelectedEmployee(product);
    setShowModal(true);
  };
  return (
    <>
      <ToastContainer />
      {employeeList.map((employee) => (
        <tr key={employee._id} className="hover:bg-slate-100">
          <td>
            <div>
              <div className="font-bold">{employee.id}</div>
            </div>
          </td>
          <td>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask rounded h-12 w-12">
                  <img
                    src={employee.images[0]}
                    alt={`Avatar ${employee._id}`}
                  />
                </div>
              </div>
              <div>
                <div className="font-bold">{employee.name}</div>
              </div>
            </div>
          </td>
          <td>
            <div className="font-bold text-ellipsis">{employee.email}</div>
          </td>
          <td>
            <div className="flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
              <div className="font-bold">{employee.phone}</div>
            </div>
          </td>
          <td>
            <div className="font-bold text-ellipsis">{employee.address}</div>
          </td>
          <td>
            <div className="font-bold whitespace-nowrap">
              {employee.birthday}
            </div>
          </td>
          <td>
            <div className="font-bold">{employee.gender}</div>
          </td>
          <td>
            <div className="flex w-fit">
              <button
                id="btn__delete"
                className="w-6 h-6 rounded-lg "
                style={{ backgroundColor: "#feebe8", outline: "" }}
                onClick={() => handleOpenModalDelete(employee)}
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
      {showModal && (
        <div
          id="DeleteModal"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">
              Bạn có muốn xóa nhân viên này không?
            </h3>
            <div className="flex justify-end gap-4">
              <button
                onClick={toggleModal}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDeleteProduct();
                }}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
