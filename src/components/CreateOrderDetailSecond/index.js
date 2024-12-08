import React, { useEffect, useState } from "react";
import apiGetCurrentUser from "../../apis/apiGetCurrentUser";
import { Link, useNavigate } from "react-router-dom";
import apiFilterConvertQuantityByUnitName from "../../apis/apiFilterConvertQuantityByUnitName";
import apiFilterPriceByProductName from "../../apis/apiFilterPriceByProductName";
import apiGetAllUnit from "../../apis/apiGetAllUnit";
import apiCreateOrder from "../../apis/apiCreateOrder";
import apiFilterProductSumQuantity from "../../apis/apiFilterProductSumQuantity";
import apiFilterReceiptByProduct from "../../apis/apiFilterReceiptByProduct";
import Autocomplete from "../AutoComplete";
import { toast, ToastContainer } from "react-toastify";
import apiOrder from "../../apis/apiOrder";

export default function CreateOrderDetailSecond() {
  const navigate = useNavigate();
  const [inforOrder, setInforOrder] = useState({})
  const [submittedData, setSubmittedData] = useState(null);
  const [listReceiptId, setListReceiptId] = useState([]);
  const [products, setProducts] = useState([]);
  const [unit, setUnit] = useState("");
  const [productName, setProductName] = useState("");
  const [units, setUnits] = useState([]);
  const [convertQuantity, setConverQuantity] = useState("");
  const [receivedAmount, setReceivedAmount] = useState("");
  const [receipts, setReceipts] = useState([]);
  const handleReceivedAmountChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[1-9]\d*$/.test(value)) {
      setReceivedAmount(Number(e.target.value));
    } else {
      alert("Số tiền nhận không được nhỏ hơn 1");
    }
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
  const fetchReceiptByProduct = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token is invalid!");
      const response = await apiFilterReceiptByProduct(token, {
        title: productName,
      });
      setReceipts(Array.isArray(response.receipts) ? response.receipts : []);
    } catch (error) {
      console.log("fetch receipt by product is error " + error);
    }
  };
  useEffect(() => {
    if (productName) {
      fetchReceiptByProduct();
    }
  }, [productName]);
  const handleChangeQuantity = (index, newQuantity) => {
    const updatedOrderDetails = [...orderDetails];
    const VAT = updatedOrderDetails[index].VAT;
    const price = updatedOrderDetails[index].price;
    updatedOrderDetails[index] = {
      ...updatedOrderDetails[index],
      quantity: newQuantity,
      amountVAT: newQuantity * price * VAT,
      total:
        newQuantity *
          updatedOrderDetails[index].price *
          updatedOrderDetails[index].convertQuantity || 0,
    };

    setOrderDetails(updatedOrderDetails);
  };

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
      const response = await apiFilterProductSumQuantity(token);
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
      unit: selectedUnit,
      unitId: response.unit ? response.unit._id : "",
      convertQuantity: convertQuantity,
      total:
        updatedOrderDetails[index].quantity *
          updatedOrderDetails[index].price *
          convertQuantity || 0,
    };
    setOrderDetails(updatedOrderDetails);
  };
  const handleChangeProductName = async (index, selectedProductName) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await apiFilterPriceByProductName(token, {
        title: selectedProductName,
      });
      const receipts = await apiFilterReceiptByProduct(token, {
        title: selectedProductName,
      });
      setListReceiptId(receipts);
      const updatedOrderDetails = [...orderDetails];
      updatedOrderDetails[index] = {
        ...updatedOrderDetails[index],
        productName: selectedProductName,
        productId: response.product ? response.product._id : "",
        price: response.product.price || 0,
        VAT: response.product.VAT || 0,
        total:
          updatedOrderDetails[index].quantity *
          (response.product.price || 0) *
          updatedOrderDetails[index].convertQuantity,
      };
      setOrderDetails(updatedOrderDetails);
    } catch (error) {
      console.log("Error in handleChangeProductName:", error);
    }
  };
  const extractIdsFromReceipts = (listReceiptId) => {
    if (listReceiptId && Array.isArray(listReceiptId.receipts)) {
      return listReceiptId.receipts.map((receipt) => ({
        _id: receipt._id,
        name: receipt.idPNK,
      }));
    }
    return [];
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
  const addNewRow = () => {
    const newRow = {
      id: orderDetails.length + 1,
      amountVAT: 0,
      productName: "",
      quantity: "",
      unit: "",
      price: 0,
      total: 0,
      warehouseReceipt: "",
    };
    // setOrderDetails([...orderDetails, newRow]);
    setOrderDetails((prevOrderDetails) => {
      const updatedOrderDetails = [...prevOrderDetails, newRow];
      return updatedOrderDetails;
    });
  };
  const handleChangeReceiptId = (index, selectedReceiptName) => {
    try {
      const selectedReceipt = listReceiptId.receipts.find(
        (receipt) => receipt.idPNK === selectedReceiptName
      );

      // Kiểm tra nếu tìm thấy receipt
      if (!selectedReceipt) {
        console.log("Receipt not found");
        return;
      }

      const updatedOrderDetails = [...orderDetails];
      updatedOrderDetails[index] = {
        ...updatedOrderDetails[index],
        warehouseReceipt: selectedReceipt._id,
      };

      setOrderDetails(updatedOrderDetails); // Cập nhật lại state orderDetails
    } catch (error) {
      console.log("Error in handleChangeReceiptId:", error);
    }
  };

  const removeRow = (index) => {
    setOrderDetails(orderDetails.filter((_, i) => i !== index));
  };

  useEffect(() => {
    fetchUser();
  }, []);
  const calculateChange = () => {
    return Math.max(0, receivedAmount - calculateTotalAmount());
  };
  const calculateVAT = (quantity, price, VAT) => {
    return quantity * price * VAT;
  };
  const calculateTotalVAT = (orderDetails) => {
    let amountVAT = 0;
    orderDetails.forEach((detail) => {
      const productVAT = calculateVAT(
        detail.quantity * detail.convertQuantity,
        detail.price,
        detail.VAT
      );
      amountVAT += productVAT;
    });
    return amountVAT;
  };
  const totalVAT = calculateTotalVAT(orderDetails);
  const calculateTotalAmount = () => {
    let totalAmount = 0;
    let totalVAT = 0;
    orderDetails.forEach((detail) => {
      const productTotal =
        detail.quantity * detail.price * detail.convertQuantity;
      const productVAT =
        detail.quantity * detail.convertQuantity * detail.price * detail.VAT;
      totalAmount += productTotal;
      totalVAT += productVAT;
    });
    return totalAmount + totalVAT;
  };
  function codeOrder() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Tháng từ 0-11, nên phải cộng thêm 1 và đảm bảo 2 chữ số
    const day = currentDate.getDate().toString().padStart(2, "0"); // Đảm bảo 2 chữ số cho ngày
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    const seconds = currentDate.getSeconds().toString().padStart(2, "0");
    const dateTime = `${year}${month}${day}${hours}${minutes}${seconds}`;
    return dateTime;
  }
  const handleDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Tháng từ 0-11, nên phải cộng thêm 1 và đảm bảo 2 chữ số
    const day = currentDate.getDate().toString().padStart(2, "0"); // Đảm bảo 2 chữ số cho ngày
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    const seconds = currentDate.getSeconds().toString().padStart(2, "0");
    const dateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    return dateTime;
  };
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
        if (
          !detail.productName ||
          !detail.quantity ||
          !detail.unit ||
          !detail.price
        ) {
          alert(`Dòng ${i + 1} thiếu thông tin, vui lòng kiểm tra lại.`);
          return;
        }
      }
      let amountVAT = 0;
      const orderData = {
        products: orderDetails.map((detail) => {
          const productVAT = detail.price * detail.VAT * detail.convertQuantity;
          amountVAT += productVAT * Number(detail.quantity);
          return {
            product: detail.productId,
            quantity: detail.quantity,
            unit: detail.unitId,
            price: detail.price,
            total: detail.total,
            warehouseReceipt: detail.warehouseReceipt,
          };
        }),
        totalAmount: calculateTotalAmount(),
        receiveAmount: receivedAmount,
        change: calculateChange(),
        user: user._id,
        amountVAT: amountVAT,
        id: codeOrder(),
      };

      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token không hợp lệ!");

      // Create the order using the API
      const response = await apiCreateOrder(token, orderData);

      if (response.success) {
        toast.success("Đơn hàng đã được tạo thành công.");
        setOrderDetails([]);
        setSubmittedData(response);
      } else {
        toast.error("Đã có lỗi khi tạo đơn hàng.");
      }
    } catch (error) {
      console.error("Lỗi khi submit: ", error);
      toast.error("Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.");
    }
  };
  const handleSubmitPrint = async () => {
    try {
      // Check if orderDetails is empty
      if (orderDetails.length === 0) {
        alert("Vui lòng thêm ít nhất một sản phẩm.");
        return;
      }

      // Check for missing data in each row
      for (let i = 0; i < orderDetails.length; i++) {
        const detail = orderDetails[i];
        if (
          !detail.productName ||
          !detail.quantity ||
          !detail.unit ||
          !detail.price
        ) {
          alert(`Dòng ${i + 1} thiếu thông tin, vui lòng kiểm tra lại.`);
          return;
        }
      }
      let amountVAT = 0;
      const orderData = {
        products: orderDetails.map((detail) => {
          const productVAT = detail.price * detail.VAT * detail.convertQuantity;
          amountVAT += productVAT * Number(detail.quantity);
          return {
            product: detail.productId,
            quantity: detail.quantity,
            unit: detail.unitId,
            price: detail.price,
            total: detail.total,
            warehouseReceipt: detail.warehouseReceipt,
          };
        }),
        totalAmount: calculateTotalAmount(),
        receiveAmount: receivedAmount,
        change: calculateChange(),
        user: user._id,
        amountVAT: amountVAT,
        id: codeOrder(),
      };

      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token không hợp lệ!");

      // Create the order using the API
      const response = await apiCreateOrder(token, orderData);

      if (response.success) {
        toast.success("Đơn hàng đã được tạo thành công.");
        setOrderDetails([]);
        const id = response.order._id
        const rs = await apiOrder.apiExtraInfor(token, {id: id})
        console.log(rs);
        navigate("/receipt", { state: { selectedOrder: rs.order } });
      } else {
        toast.error("Đã có lỗi khi tạo đơn hàng.");
      }
    } catch (error) {
      console.error("Lỗi khi submit: ", error);
      toast.error("Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.");
    }
  };
  return (
    <>
      {/* <ToastContainer /> */}
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
                value={codeOrder()}
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
                value={user && user.employee.id}
              />
            </div>
            <div className="flex w-fit h-auto justify-center items-center ml-2 mt-2">
              <h1 className="font-medium w-24 text-sm ">Tên nhân viên:</h1>
              <input
                // value={user.name}
                value={user?.employee?.name}
                type="text"
                className="input w-60  h-7 text-black"
                disabled
              />
            </div>
            <div className="w-5/6 justify-items-end grid mr-2">
              <button
                onClick={addNewRow}
                className="drawer-button btn btn-success text-white w-44 h-8 mt-3 "
              >
                {/* <svg
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
                </svg> */}
                Thêm sản phẩm
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
                  {/* <th>Mã hàng</th> */}
                  <th>Tên sản phẩm</th>
                  <th>Mã lô</th>
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
                    <td>
                      <div className="w-56">
                        <Autocomplete
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
                      <div className="w-56">
                        <Autocomplete
                          suggestion={extractIdsFromReceipts(listReceiptId)}
                          onchange={(name) =>
                            handleChangeReceiptId(index, name)
                          }
                          value={detail.warehouseReceipt}
                          placeholder="Nhập mã lô"
                        />
                      </div>
                    </td>
                    <td>
                      <input
                        type="number"
                        value={detail.quantity}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d+$/.test(value) && parseInt(value) >= 1) {
                            handleChangeQuantity(index, value); // Chỉ gọi handleChange nếu là số nguyên dương lớn hơn 1
                          } else if (value === "") {
                            handleChangeQuantity(index, value); // Cho phép xóa trường
                          }
                        }}
                        min={1}
                        className="input w-32 h-8"
                        placeholder="1"
                      />
                    </td>
                    <td>
                      <div className="w-56">
                        <Autocomplete
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
                    <td>{detail.price.toLocaleString() || "0"} đ</td>
                    <td>{detail.total.toLocaleString() || 0} đ</td>
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
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">Tiền nhận:</h2>
                <h2 className=" font-sans text-sm mr-2">
                  <input
                    type="number"
                    value={receivedAmount}
                    onChange={handleReceivedAmountChange}
                    className="input input-bordered input-sm"
                    placeholder="Nhập số tiền nhận"
                    min={1}
                  />
                </h2>
              </div>
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">Thuế VAT:</h2>
                <h2 className=" font-sans text-sm mr-2">
                  {totalVAT.toLocaleString()} VNĐ
                </h2>
              </div>
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">Tiền thừa:</h2>
                <h2 className=" font-sans text-sm mr-2 ">
                  {calculateChange().toLocaleString() || 0} VNĐ
                </h2>
              </div>
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">Tổng tiền:</h2>
                <h2
                  className=" font-sans text-lg mr-2"
                  style={{ color: "#f13612" }}
                >
                  {calculateTotalAmount().toLocaleString() || 0} VNĐ
                </h2>
              </div>
            </div>
          </div>
          <div className="flex w-full h-36 justify-end">
            <button
              className="drawer-button btn text-white w-36 h-8 mt-3 ml-6"
              style={{ backgroundColor: "#2f80ed" }}
              onClick={handleSubmitPrint}
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
