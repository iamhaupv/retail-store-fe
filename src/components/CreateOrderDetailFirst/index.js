import React, { useEffect, useState } from "react";
import apiGetCurrentUser from "../../apis/apiGetCurrentUser";
import { Link } from "react-router-dom";
import apiFilterConvertQuantityByUnitName from "../../apis/apiFilterConvertQuantityByUnitName";
import apiFilterPriceByProductName from "../../apis/apiFilterPriceByProductName";
import apiGetAllUnit from "../../apis/apiGetAllUnit";
import apiFilterAllProductInShelf from "../../apis/apiFilterAllProductInShelf";
import ChangeInput from "../ChangeInput";
import apiCreateOrder from "../../apis/apiCreateOrder";

export default function CreateOrderDetailFirst() {
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState(null);
  const [unit, setUnit] = useState("");
  const [productName, setProductName] = useState("");
  const [units, setUnits] = useState([]);
  const [convertQuantity, setConverQuantity] = useState("");
  const [quantity, setQuantity] = useState("");
  const [receivedAmount, setReceivedAmount] = useState("");

  const handleReceivedAmountChange = (e) => {
    setReceivedAmount(Number(e.target.value));
  };
  const handleChangeConvertQuantity = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiFilterConvertQuantityByUnitName(token, {
        name: unit,
      });
      setConverQuantity(response.unit ? response.unit.convertQuantity : 0);
    } catch (error) {
      console.log("handle change convert quantity is error " + error);
    }
  };
  useEffect(() => {
    if (unit) handleChangeConvertQuantity();
  }, [unit]);
  const handleFilterPriceByProductName = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token không hợp lệ!");
      const response = await apiFilterPriceByProductName(token, {
        title: productName,
      });
      setPrice(response.product.price || 0);
    } catch (error) {
      console.error("Lỗi khi lấy giá sản phẩm: ", error);
    }
  };
  const handleChangeQuantity = (index, newQuantity) => {
    const updatedOrderDetails = [...orderDetails];
    updatedOrderDetails[index] = {
      ...updatedOrderDetails[index],
      quantity: newQuantity,
      total:
        newQuantity *
        updatedOrderDetails[index].price *
        updatedOrderDetails[index].convertQuantity,
    };
    setOrderDetails(updatedOrderDetails);
  };
  useEffect(() => {
    if (productName) handleFilterPriceByProductName();
  }, [productName]);

  const fetchUnits = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");

      const response = await apiGetAllUnit(token);
      setUnits(response.units || []);
    } catch (error) {
      console.log("fetch unit error: ", error);
    }
  };

  const fetchProductByName = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");

      const response = await apiFilterAllProductInShelf(token);
      setProducts(Array.isArray(response.products) ? response.products : []);
    } catch (error) {
      console.log("fetch products by name error: ", error);
    }
  };
  useEffect(() => {
    fetchProductByName();
    fetchUnits();
  }, []);

  const handleChangeUnit = async (index, selectedUnit) => {
    const token = localStorage.getItem("accessToken");
    const response = await apiFilterConvertQuantityByUnitName(token, {
      name: selectedUnit,
    });
    const convertQuantity = response.unit ? response.unit.convertQuantity : 1;
    const updatedOrderDetails = [...orderDetails];
    updatedOrderDetails[index] = {
      ...updatedOrderDetails[index],
      unit: selectedUnit, // Lưu tên đơn vị
      unitId: response.unit ? response.unit._id : "", // Lưu id đơn vị
      convertQuantity,
      total:
        updatedOrderDetails[index].quantity *
        updatedOrderDetails[index].price *
        convertQuantity,
    };
    setOrderDetails(updatedOrderDetails);
  };

  const handleChangeProductName = async (index, selectedProductName) => {
    const token = localStorage.getItem("accessToken");
    const response = await apiFilterPriceByProductName(token, {
      title: selectedProductName,
    });
    const updatedOrderDetails = [...orderDetails];
    updatedOrderDetails[index] = {
      ...updatedOrderDetails[index],
      productName: selectedProductName,
      productId: response.product ? response.product._id : "", // Lưu id sản phẩm
      price: response.product.price || 0,
      total:
        updatedOrderDetails[index].quantity *
        (response.product.price || 0) *
        updatedOrderDetails[index].convertQuantity,
    };
    setOrderDetails(updatedOrderDetails);
  };

  const [user, setUser] = useState("");
  const [orderDetails, setOrderDetails] = useState([]);
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiGetCurrentUser(token);
      setUser(response.rs);
    } catch (error) {
      throw new Error("Fetch user is error " + error);
    }
  };
  const handleDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const addNewRow = () => {
    const newRow = {
      id: orderDetails.length + 1,
      productCode: "",
      productName: "",
      quantity: "",
      unit: "",
      price: 0,
      total: 0,
    };
    setOrderDetails([...orderDetails, newRow]);
  };

  const removeRow = (index) => {
    setOrderDetails(orderDetails.filter((_, i) => i !== index));
  };

  useEffect(() => {
    fetchUser();
  }, []);
  const calculateTotalAmount = () => {
    return orderDetails.reduce((sum, detail) => sum + detail.total, 0);
  };
  const calculateChange = () => {
    return Math.max(0, receivedAmount - calculateTotalAmount());
  };
  // const handleSubmit = async () => {
  //   try {
  //     // Kiểm tra nếu orderDetails là rỗng hoặc không có sản phẩm
  //     if (orderDetails.length === 0) {
  //       alert("Vui lòng thêm ít nhất một sản phẩm.");
  //       return;
  //     }

  //     // Kiểm tra xem có dữ liệu thiếu trong từng dòng không
  //     for (let i = 0; i < orderDetails.length; i++) {
  //       const detail = orderDetails[i];
  //       if (
  //         !detail.productName ||
  //         !detail.quantity ||
  //         !detail.unit ||
  //         !detail.price
  //       ) {
  //         alert(`Dòng ${i + 1} thiếu thông tin, vui lòng kiểm tra lại.`);
  //         return;
  //       }
  //     }
  //     // lấy convertQuantity của unit theo từng mã tương ứng
  //     // Tính tổng tiền của hóa đơn
  //     const totalAmount = calculateTotalAmount();
  //     const change = calculateChange();

  //     // Tạo đối tượng dữ liệu để gửi
  //     const orderData = {
  //       products: orderDetails.map((detail) => ({
  //         product: detail.productId,
  //         quantity: Number(detail.quantity),
  //         unit: detail.unitId, // chổ này lấy kèm theo id nè
  //         price: detail.price,
  //         total: detail.total,
  //       })),
  //       totalAmount: totalAmount,
  //       receiveAmount: receivedAmount,
  //       change: change,
  //       user: user._id,
  //     };
  //     const token = localStorage.getItem("accessToken");
  //     if (!token) throw new Error("Token không hợp lệ!");

  //     // Giả sử API tạo đơn hàng là apiCreateOrder
  //     const response = await apiCreateOrder(token, orderData);

  //     if (response.success) {
  //       alert("Đơn hàng đã được tạo thành công.");
  //       // Thực hiện các thao tác khác sau khi submit thành công
  //     } else {
  //       alert("Đã có lỗi khi tạo đơn hàng.");
  //     }
  //   } catch (error) {
  //     console.error("Lỗi khi submit: ", error);
  //     alert("Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.");
  //   }
  // };


  const handleSubmit = async () => {
    try {
      // Check if orderDetails is empty
      if (orderDetails.length === 0) {
        alert("Vui lòng thêm ít nhất một sản phẩm.");
        return;
      }
  
      // Check for missing data in each row
      for (let i = 0; i < orderDetails.length; i++) {
        const detail = orderDetails[i];
        if (!detail.productName || !detail.quantity || !detail.unit || !detail.price) {
          alert(`Dòng ${i + 1} thiếu thông tin, vui lòng kiểm tra lại.`);
          return;
        }
      }
  
      // Calculate total amount and change
      const totalAmount = calculateTotalAmount();
      const change = calculateChange();
  
      // Create order data object to send
      const orderData = {
        products: orderDetails.map((detail) => {
          const quantityWithConversion = Number(detail.quantity) * detail.convertQuantity; // Apply conversion
          return {
            product: detail.productId,
            quantity: quantityWithConversion, // Use converted quantity
            unit: detail.unitId, // Unit ID
            price: detail.price,
            total: detail.total, // Total is already calculated in your row
          };
        }),
        totalAmount: totalAmount,
        receiveAmount: receivedAmount,
        change: change,
        user: user._id,
      };
  
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token không hợp lệ!");
  
      // Create the order using the API
      const response = await apiCreateOrder(token, orderData);
  
      if (response.success) {
        alert("Đơn hàng đã được tạo thành công.");
        // Additional actions on successful submit can be placed here
      } else {
        alert("Đã có lỗi khi tạo đơn hàng.");
      }
    } catch (error) {
      console.error("Lỗi khi submit: ", error);
      alert("Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.");
    }
  };
  
  
  return (
    <>
      <div className="card bg-white h-full rounded-none w-full overflow-y-hidden ">
        <h1 className="font-bold text-xl ml-2 mt-2">Thông tin </h1>
        <div>
          <div className="flex">
            <div className="flex w-fit h-fit justify-center items-center ml-2 mt-2">
              <h1 className="font-medium w-24 text-sm ">Mã hóa đơn:</h1>
              <input
                type="text"
                placeholder="H0231234"
                className="input w-60  h-7 text-black"
                disabled
              />
            </div>
            <div className="flex w-fit h-auto justify-center items-center ml-2 mt-2">
              <h1 className="font-medium w-24 text-sm ">Thời gian:</h1>
              <input
                type="text"
                value={handleDate()}
                className="input w-60  h-7 text-black"
                disabled
              />
            </div>
          </div>
          <div className="flex w-full">
            <div className="flex w-fit h-fit justify-center items-center ml-2 mt-5">
              <h1 className="font-medium w-24 text-sm ">Mã nhân viên:</h1>
              <input
                type="text"
                placeholder="NV0231234"
                className="input w-60  h-7 text-black"
                disabled
              />
            </div>
            <div className="flex w-fit h-auto justify-center items-center ml-2 mt-2">
              <h1 className="font-medium w-24 text-sm ">Tên nhân viên:</h1>
              <input
                value={user.lastname + " " + user.firstname}
                type="text"
                className="input w-60  h-7 text-black"
                disabled
              />
            </div>
            <div className="w-5/6 justify-items-end grid mr-2">
              <button
                onClick={addNewRow}
                className="drawer-button btn btn-success text-white w-36 h-8 mt-3 "
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
                Thêm dòng
              </button>
            </div>
          </div>
          <div
            className=" overflow-y-auto"
            style={{
              height: "calc(90vh - 350px)",
            }}
          >
            <table className="table table-pin-rows">
              {/* head */}
              <thead>
                <tr>
                  <th>Mã hàng</th>
                  <th>Tên hàng</th>
                  <th>Số lượng</th>
                  <th>Đơn vị tính</th>
                  <th>Đơn giá</th>
                  <th>Thành tiền</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.map((detail, index) => (
                  <tr className="hover:bg-slate-100">
                    <td>SP034213</td>
                    <td>
                      <div className="w-56">
                        <ChangeInput
                          suggestion={Array.from(
                            new Set(products.map((p) => p.title))
                          ).map((name) => {
                            const product = products.find(
                              (p) => p.title === name
                            );
                            return { _id: product?._id, name };
                          })}
                          onchange={(name) =>
                            handleChangeProductName(index, name)
                          }
                          value={detail.productName}
                          placeholder="Nhập tên sản phẩm"
                        />
                      </div>
                    </td>
                    <td>
                      <input
                        type="number"
                        value={detail.quantity}
                        onChange={(e) =>
                          handleChangeQuantity(index, e.target.value)
                        }
                        className="input w-32 h-8"
                        placeholder="1"
                      />
                    </td>
                    <td>
                      <div className="w-56">
                        <ChangeInput
                          suggestion={Array.from(
                            new Set(units.map((u) => u.name))
                          ).map((name) => {
                            const unit = units.find((u) => u.name === name);
                            return { _id: unit?._id, name };
                          })}
                          onchange={(name) => handleChangeUnit(index, name)}
                          value={detail.unit}
                          placeholder="Nhập tên đơn vị tính"
                        />
                      </div>
                    </td>
                    <td>{detail.price || "0"}</td>
                    {/* Hiển thị giá hoặc "0" nếu không có */}
                    <td>{detail.total || 0}</td>
                    <td>
                      <button
                        id="btn__delete"
                        className="w-6 h-6 rounded-lg"
                        style={{ backgroundColor: "#feebe8", outline: "" }}
                        onClick={() => removeRow(index)}
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex w-full h-auto">
            <div className="w-9/12"></div>
            <div className="w-3/12 h-auto justify-end items-end mt-4">
              {/* <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">Thuế VAT:</h2>
                <h2 className=" font-sans text-sm mr-2">30.000 VNĐ</h2>
              </div> */}
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">Tiền nhận:</h2>
                <h2 className=" font-sans text-sm mr-2">
                  <input
                    type="number"
                    value={receivedAmount}
                    onChange={handleReceivedAmountChange}
                    className="input input-bordered input-success w-full max-w-xs"
                    placeholder="Nhập số tiền nhận"
                  />
                </h2>
              </div>
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">Tiền thừa:</h2>
                <h2 className=" font-sans text-sm mr-2 ">
                  {calculateChange() || 0} VNĐ
                </h2>
              </div>
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">Tổng tiền:</h2>
                <h2
                  className=" font-sans text-lg mr-2"
                  style={{ color: "#f13612" }}
                >
                  {calculateTotalAmount() || 0} VNĐ
                </h2>
              </div>
            </div>
          </div>
          <div className="flex w-full h-36 justify-end">
            <Link to="/reciept">
              <button
                className="drawer-button btn text-white w-36 h-8 mt-3 ml-6"
                style={{ backgroundColor: "#2f80ed" }}
              >
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
            <button
              onClick={handleSubmit}
              className="drawer-button btn btn-success text-white w-36 h-8 mt-3 ml-2"
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
              Lưu
            </button>
            <button
              className="drawer-button btn text-white w-36 h-8 mt-3 ml-2 mr-2"
              style={{ backgroundColor: "#f13612" }}
            >
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
              Hủy
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
