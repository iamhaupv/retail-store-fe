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
const apiWarehouseReceipt = {
    apiSumTotalAmountReceipt
}

export default apiWarehouseReceipt
