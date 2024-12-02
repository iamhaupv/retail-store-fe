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
      const response = await axios.post(`${url}warehouse/search-product-id`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.log("api sum total warehouse receipt is error" + error);
    }
  };
  const apiSearchByName = async (token, payload) => {
    try {
      const response = await axios.post(`${url}warehouse/search-product-name`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.log("api sum total warehouse receipt is error" + error);
    }
  };
const apiWarehouseReceipt = {
    apiSumTotalAmountReceipt,
    apiSearchById,
    apiSearchByName
}

export default apiWarehouseReceipt
