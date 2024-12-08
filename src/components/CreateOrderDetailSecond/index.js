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
import CreateOrderDetailFirst from "../CreateOrderDetailFirst";

export default function CreateOrderDetailSecond() {
  return (
    <>
      {/* <ToastContainer /> */}
      <CreateOrderDetailFirst/>
    </>
  );
}
