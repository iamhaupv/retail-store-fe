import React, { useEffect, useState } from "react";
import OrderTableList from "../../components/OrderTableList";
import Datepicker from "react-tailwindcss-datepicker";
import StatOrderDetail from "../../components/statOrderDetail";
import OrderTableDetail from "../../components/OrderTableDetail";
import { Link } from "react-router-dom";
import apiGetListEmployee from "../../apis/apiGetListEmployee";
import apiGetAllOrder from "../../apis/apiGetAllOrder";

export default function Order() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([])
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
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
  const fetchOrders = async() => {
    try {
      const token = localStorage.getItem("accessToken")
      if(!token) throw new Error("Token is invalid!")
      const response = await apiGetAllOrder(token)
      setOrders(Array.isArray(response.orders) ? response.orders : [])
    } catch (error) {
      console.log("fetch orders is error " + error);
    }
  }
  useEffect(() => {
    fetchOrders()
  }, [])
  const [employees, setEmployees] = useState([])
  const fetchEmployees = async() => {
    try {
      const token = localStorage.getItem("accessToken")
      if(!token) throw new Error("Token is invalid!")
      const response = await apiGetListEmployee(token)
      setEmployees(response.data)
    } catch (error) {
      console.log("fetch employees is error " + error);
      
    }
  }
  useEffect(()=> {
    fetchEmployees()
  }, [])
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const [isClicked, setIsClicked] = useState(true);
  const toggleClicked = () => {
    setIsClicked((prev) => !prev);
  };
  const totalVAT = selectedOrder && selectedOrder.products 
  ? selectedOrder.products.reduce((total, p) => {
      return total + (p.product.VAT || 0) * p.product.price;
    }, 0) 
  : 0; 
  return (
    <>
      <div
        className="w-11/12 h-auto justify-center flex "
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div className="w-full animate__animated animate__fadeInRight ">
          <div className=" mt-3 mr-3 flex justify-between">
            <h4 className="font-bold text-xl w-full ml-4">Tạo hóa đơn</h4>
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
              <Link to="/reciept" state={{selectedOrder}}>
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
            <select className="select select-bordered ml-4 w-44 h-10  max-w-xs">
              <option disabled selected>
                Người tạo
              </option>
              {employees.length > 0 ? employees.map((employee) => (
                <option value={employee._id}>{employee.name}</option>
              )) : <div>Không có nhân viên nào</div>}
              
            </select>
            <div className="flex w-fit">
              <div className="w-72 mr-2">
                <Datepicker
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                />
              </div>
              <label className="input input-bordered h-10 flex items-center gap-2">
                <input type="text" className="  grow " placeholder="Search" />
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
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  {" "}
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
                      d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <a onClick={toggleClicked}>
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
                          d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
                        />
                      </svg>
                      Danh sách hóa đơn
                    </a>
                  </li>
                  <li>
                    <a onClick={toggleClicked}>
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
                          d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                        />
                      </svg>
                      Danh sách chi tiết
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {isClicked ? (
            <div className="w-full h-dvh">
              <div className="card bg-white  rounded-lg ml-4 mr-4 mt-2 grid overflow-y-auto animate__animated animate__fadeInRight"
              style={{
                height: "calc(100vh - 200px)",
              }}>
                <table className="table table-pin-rows ">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Hóa đơn</th>
                      <th>Tổng tiền</th>
                      <th>Người lập</th>
                    </tr>
                  </thead>
                  <tbody>
                    <OrderTableList />
                  </tbody>
                  {/* foot */}
                  <tfoot>
                    <tr></tr>
                  </tfoot>
                </table>
              </div>
            </div>
          ) : (
            <div className="flex w-full h-dvh animate__animated animate__fadeInRight">
              <div className="card bg-white w-3/12  rounded-none ml-4 mr-2 mt-2 grid overflow-y-auto "
              style={{
                height: "calc(100vh - 170px)",
              }}>
                {/* <div className="card bg-white w-3/12 h-2/6 overflow-y-auto grid"> */}
                {/* <div className="stats stats-vertical shadow   "> */}
                {/* <div className="overflow-y-auto w-3/12 h-4/6"> */}
                <table className="table table-pin-rows">
                  {/* head */}
                  <thead>
                    <tr></tr>
                  </thead>
                  <tbody>
                    <StatOrderDetail orders={orders} onOrderClick={handleOrderClick}  />
                    {/* <StatOrderDetail />
                    <StatOrderDetail />
                    <StatOrderDetail />
                    <StatOrderDetail />
                    <StatOrderDetail />
                    <StatOrderDetail />
                    <StatOrderDetail />
                    <StatOrderDetail />
                    <StatOrderDetail />
                    <StatOrderDetail />
                    <StatOrderDetail />
                    <StatOrderDetail />
                    <StatOrderDetail />
                    <StatOrderDetail /> */}
                  </tbody>
                  {/* foot */}
                  <tfoot>
                    <tr></tr>
                  </tfoot>
                </table>
              </div>

              <div className="card bg-white w-9/12  rounded-none  mr-4 mt-2 grid "
              style={{
                height: "calc(100vh - 170px)",
              }}>
                <div>
                  <div className="flex w-fit h-8 mt-2 ml-2">
                    <div className="flex justify-center items-center">
                      <h2 className="font-medium text-sm">Mã hóa đơn:</h2>
                      <h2 className=" font-sans text-xs ml-1">H3231091</h2>
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
                      <h2 className=" font-sans text-xs ml-1">{selectedOrder && formatDate(selectedOrder.createdAt)}</h2>
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
                      {selectedOrder && selectedOrder.user.lastname + " " + selectedOrder.user.firstname}
                    </h2>
                  </div>
                  <div className="flex ml-2 items-center">
                    <h2 className="font-medium text-sm">Mã nhân viên:</h2>
                    <h2 className=" font-sans text-xs ml-1">H7003241</h2>
                  </div>
                  <div className=" overflow-y-auto"
                  style={{
                    height: "calc(100vh - 450px)",
                  }}>
                    <table className="table table-pin-rows">
                      {/* head */}
                      <thead>
                        <tr>
                          <th>Mã sản phẩm</th>
                          <th>Tên sản phẩm</th>
                          <th>Số lượng</th>
                          <th>Đơn giá</th>
                          <th>Thành tiền</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrder && <OrderTableDetail order={selectedOrder}  />}
                        {/* <OrderTableDetail />
                        <OrderTableDetail />
                        <OrderTableDetail />
                        <OrderTableDetail />
                        <OrderTableDetail />
                        <OrderTableDetail />
                        <OrderTableDetail />
                        <OrderTableDetail />
                        <OrderTableDetail />
                        <OrderTableDetail />
                        <OrderTableDetail /> */}
                      </tbody>
                      {/* foot */}
                      <tfoot>
                        <tr></tr>
                      </tfoot>
                    </table>
                  </div>
                  <div className="flex w-full h-auto">
                   <div className="w-9/12"></div> 
                  <div className="w-3/12 h-auto justify-end items-end mt-4">
                    <div className="flex justify-between items-center">
                      <h2 className="font-bold text-lg">Thuế VAT:</h2>
                      <h2 className=" font-sans text-sm mr-2">{totalVAT} VNĐ</h2>
                    </div>
                    <div className="flex justify-between items-center">
                      <h2 className="font-bold text-lg">Tiền nhận:</h2>
                      <h2 className=" font-sans text-sm mr-2">{selectedOrder && selectedOrder.receiveAmount}</h2>
                    </div>
                    <div className="flex justify-between items-center">
                      <h2 className="font-bold text-lg">Tiền thừa:</h2>
                      <h2 className=" font-sans text-sm mr-2 ">{selectedOrder && selectedOrder.change}</h2>
                    </div>
                    <div className="flex justify-between items-center">
                      <h2 className="font-bold text-lg">Tổng tiền:</h2>
                      <h2 className=" font-sans text-lg mr-2" style={{color:"#f13612"}}>{selectedOrder && selectedOrder.totalAmount}</h2>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
