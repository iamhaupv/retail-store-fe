import React, { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import StatOrderDetail from "../../components/statOrderDetail";
import OrderTableDetail from "../../components/OrderTableDetail";
import { Link } from "react-router-dom";
import apiGetListEmployee from "../../apis/apiGetListEmployee";
import apiGetAllOrder from "../../apis/apiGetAllOrder";
import apiFilterOrderByCondition from "../../apis/apiFilterOrderByCondition";

export default function Order() {
  const getToday = () => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };
  const [order, setOrder] = useState("");
  function formatDate(date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  const [value, setValue] = useState({
    startDate: getToday(),
    endDate: getToday(),
  });

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
  const handleCurrentDay = () => {
    setValue({
      startDate: getToday(),
    endDate: getToday(),
    });
  };
  const [listOrderByCondition, setListOrderByCondition] = useState([]);
  const [employee, setEmployee] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);

  const fetchOrderByCondition = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiFilterOrderByCondition(token, {
        id: order,
        name: employee,
        startDate: value.startDate,
        endDate: value.endDate,
      });
      setListOrderByCondition(
        Array.isArray(response.orders) ? response.orders : []
      );
    } catch (error) {
      console.log("fetch order by employee is error", error);
    }
  };
  useEffect(() => {
    fetchOrderByCondition();
  }, [value, employee, order]);
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };
  
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiGetAllOrder(token);
      setOrders(Array.isArray(response.orders) ? response.orders : []);
    } catch (error) {
      console.log("fetch orders is error " + error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  const [employees, setEmployees] = useState([]);
  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiGetListEmployee(token);
      setEmployees(response.data);
    } catch (error) {
      console.log("fetch employees is error " + error);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

  const [activeCard, setActiveCard] = useState(null);
  const [isClicked, setIsClicked] = useState(true);
  const toggleClicked = () => {
    setIsClicked((prev) => !prev);
  };
  const handleChangeEmployee = (e) => {
    setEmployee(e.target.value);
  };
  const handleChangeOrder = (e) => {
    setOrder(e.target.value);
  };
  const totalProduct = selectedOrder?.products.reduce(
    (sum, product) =>
      (sum +=
        product?.price * product?.quantity * product?.unit?.convertQuantity),
    0
  );
  // const totalDiscount = selectedOrder?.products?.reduce((sum, product) => {
  //   const discount = product?.product?.discount || 0;
  //   const price = product?.product?.price;
  //   const quantity = product?.quantity;
  //   const convertQuantity = product?.unit?.convertQuantity || 1;
  //   const productDiscount = price * quantity * discount * convertQuantity;
  //   return sum + productDiscount / 100;
  // }, 0);
  const totalDiscount = selectedOrder?.products?.reduce((sum, product) => {
    return sum + product.discountAmount;
  }, 0);
  return (
    <>
      <div
        className="w-11/12 h-auto justify-center flex "
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div className="w-full animate__animated animate__fadeInRight ">
          <div className=" mt-3 mr-3 flex justify-between">
            <h4 className="font-bold text-xl w-full ml-4">Danh sách hóa đơn</h4>
            <div className="flex w-fit">
              <Link to="/createOrder">
                <button className="drawer-button btn btn-success text-white w-32">
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
                  Thêm
                </button>
              </Link>
              <Link
                to="/receipt"
                state={{ selectedOrder }}
                onClick={(e) => {
                  if (!selectedOrder) {
                    e.preventDefault();
                  }
                }}
              >
                <button className="btn btn-success text-white ml-2 w-32">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
                    />
                  </svg>
                  In
                </button>
              </Link>
            </div>
          </div>
          <div className=" mt-2 mr-3 flex justify-between">
            <select
              value={employee}
              onChange={handleChangeEmployee}
              className="select select-bordered ml-4 w-44 h-10  max-w-xs"
            >
              <option value={""} selected>
                Người tạo
              </option>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <option value={employee.name}>{employee.name}</option>
                ))
              ) : (
                <div>Không có nhân viên nào</div>
              )}
            </select>
            <div className="flex w-fit">
              <button
                type="button"
                className="mr-4 btn w-28 h-3 justify-items-center border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-white "
                onClick={handleCurrentDay}
              >
                Hiện tại
              </button>
              <button
                type="button"
                className="btn w-28 h-3 justify-items-center border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-white "
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
                className="btn w-28 h-3 ml-4 mr-2 justify-items-center  border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-white "
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
              <div className="w-72 mr-2">
                <Datepicker
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                />
              </div>
              <label className="input input-bordered h-10 flex items-center gap-2">
                <input
                  value={order}
                  onChange={handleChangeOrder}
                  type="text"
                  className="  grow "
                  placeholder="Search"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>
          </div>

          <div className="flex w-full h-dvh animate__animated animate__fadeInRight">
            <div
              className="card bg-white w-3/12  rounded-none ml-4 mr-2 mt-2 grid overflow-y-auto "
              style={{
                height: "calc(100vh - 170px)",
              }}
            >
              {/* <div className="card bg-white w-3/12 h-2/6 overflow-y-auto grid"> */}
              {/* <div className="stats stats-vertical shadow   "> */}
              {/* <div className="overflow-y-auto w-3/12 h-4/6"> */}
              <table className="table table-pin-rows">
                {/* head */}
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  {order === "" &&
                  employee === "" &&
                  value.startDate === null &&
                  value.endDate === null ? (
                    <StatOrderDetail
                      orders={listOrderByCondition}
                      onOrderClick={handleOrderClick}
                    />
                  ) : listOrderByCondition.length > 0 ? (
                    <StatOrderDetail
                      isActive={activeCard === selectedOrder}
                      orders={listOrderByCondition}
                      onOrderClick={handleOrderClick}
                    />
                  ) : (
                    <div>Không có hóa đơn nào cả</div>
                  )}
                </tbody>
                {/* foot */}
                <tfoot>
                  <tr></tr>
                </tfoot>
              </table>
            </div>

            <div
              className="card bg-white w-9/12  rounded-none  mr-4 mt-2 grid"
              style={{
                height: "calc(100vh - 170px)",
              }}
            >
              <div>
                <div className="flex w-fit h-8 mt-2 ml-2">
                  <div className="flex justify-center items-center">
                    <h2 className="font-medium text-sm">Mã hóa đơn:</h2>
                    <h2 className=" font-sans text-xs ml-1">
                      {selectedOrder && selectedOrder.id}
                    </h2>
                  </div>
                  <div className="flex ml-3 justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                      />
                    </svg>
                    <h2 className="font-medium text-sm">Ngày tạo:</h2>
                    <h2 className=" font-sans text-xs ml-1">
                      {selectedOrder && formatDate(selectedOrder.createdAt)}
                    </h2>
                  </div>
                </div>
                <div className="flex w-fit h-8 justify-center items-center ml-2">
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
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  <h3 className="font-medium text-base w-fit ml-1">
                    Cửa hàng 24 Hour
                  </h3>
                </div>
                <div className="flex ml-2 items-center">
                  <h2 className="font-medium text-sm">Thu ngân:</h2>
                  <h2 className=" font-sans text-xs ml-1">
                    {selectedOrder && selectedOrder?.user?.employee?.name}
                  </h2>
                </div>
                <div className="flex ml-2 items-center">
                  <h2 className="font-medium text-sm">Mã nhân viên:</h2>
                  <h2 className=" font-sans text-xs ml-1">
                    {selectedOrder && selectedOrder.user.employee.id}
                  </h2>
                </div>
                <div
                  className=" overflow-y-auto"
                  style={{
                    height: "calc(100vh - 450px)",
                  }}
                >
                  <table className="table table-pin-rows">
                    {/* head */}
                    <thead>
                      <tr>
                        <th>Mã sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Đơn vị tính</th>
                        <th>Đơn giá</th>
                        <th>Thành tiền</th>
                        <th>Giảm giá</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder && (
                        <OrderTableDetail order={selectedOrder} />
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="flex w-full">
                  <div className="w-9/12"></div>
                  <div
                    className="w-full justify-end items-end"
                    style={{ marginTop: -15 }}
                  >
                    <div className="flex justify-between items-center">
                      <h2 className="font-bold text-lg">TỔNG TIỀN:</h2>
                      <h2 className=" font-sans text-sm mr-2">
                        {totalProduct?.toLocaleString()} VNĐ
                      </h2>
                    </div>
                    <div className="flex justify-between items-center">
                      <h2 className="font-bold text-lg">TỔNG TIỀN ĐÃ GIẢM:</h2>
                      <h2 className=" font-sans text-sm mr-2">
                        {totalDiscount?.toLocaleString()} VNĐ
                      </h2>
                    </div>
                    <div className="flex justify-between items-center">
                      <h2 className="font-bold text-lg">THUẾ VAT:</h2>
                      <h2 className=" font-sans text-sm mr-2">
                        {selectedOrder &&
                          selectedOrder?.amountVAT?.toLocaleString()}{" "}
                        VNĐ
                      </h2>
                    </div>
                    <div className="flex justify-between items-center">
                      <h2 className="font-bold text-lg">TIỀN KHÁCH TRẢ:</h2>
                      <h2 className=" font-sans text-sm mr-2">
                        {selectedOrder &&
                          selectedOrder.receiveAmount.toLocaleString()}{" "}
                        VNĐ
                      </h2>
                    </div>
                    <div className="flex justify-between items-center">
                      <h2 className="font-bold text-lg">TIỀN TRẢ LẠI:</h2>
                      <h2 className=" font-sans text-sm mr-2 ">
                        {selectedOrder && selectedOrder.change.toLocaleString()}{" "}
                        VNĐ
                      </h2>
                    </div>
                    <div className="flex justify-between items-center">
                      <h2 className="font-bold text-lg">TỔNG TIỀN PHẢI TRẢ:</h2>
                      <h2
                        className=" font-sans text-lg mr-2"
                        style={{ color: "#f13612" }}
                      >
                        {selectedOrder &&
                          selectedOrder?.totalAmount?.toLocaleString()}{" "}
                        VNĐ
                      </h2>
                    </div>
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
