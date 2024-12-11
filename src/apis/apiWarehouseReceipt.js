import axios from "axios";
const url = process.env.REACT_APP_API_URL;

const apiSumTotalAmountReceipt = async (token) => {
  try {
    const response = await axios.get(`${url}warehouse/sum`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log("api sum total warehouse receipt is error" + error);
  }
};
const apiSearchById = async (token, payload) => {
  try {
    const response = await axios.post(
      `${url}warehouse/search-product-id`,
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.log("api sum total warehouse receipt is error" + error);
  }
};
const apiSearchByName = async (token, payload) => {
  try {
    const response = await axios.post(
      `${url}warehouse/search-product-name`,
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.log("api sum total warehouse receipt is error" + error);
  }
};
const apiSearchProductExpires = async (token, payload) => {
  try {
    const response = await axios.post(`${url}warehouse/expires`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log("api sum total warehouse receipt is error" + error);
  }
};
const apiGetAllWarehouseReceiptWeek = async (token, payload) => {
  try {
    const response = await axios.post(`${url}warehouse/week`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log("api get all warehouse receipt week is error" + error);
  }
};
const apiChangeIsDisplayProduct = async (token, payload) => {
  try {
    const response = await axios.post(`${url}warehouse/change-display-product`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log("api get all warehouse receipt week is error" + error);
  }
};
const apiSearchProducts = async (token, payload) => {
  try {
    const response = await axios.post(`${url}warehouse/search-product`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log("api search products is error" + error);
  }
};
const apiWarehouseReceipt = {
  apiSumTotalAmountReceipt,
  apiSearchById,
  apiSearchByName,
  apiSearchProductExpires,
  apiGetAllWarehouseReceiptWeek,
  apiChangeIsDisplayProduct,
  apiSearchProducts
};

export default apiWarehouseReceipt;
