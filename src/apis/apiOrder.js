import axios from "axios";
const url = process.env.REACT_APP_API_URL;

const apiSumTotalAmount = async (token) => {
    try {
      const response = await axios.get(`${url}order/sum`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.log("api last id warehouse receipt is error" + error);
    }
  };
  const apiSumTotalAmountByDate = async (token, payload) => {
    try {
      const response = await axios.post(`${url}order/income-day`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.log("api last id warehouse receipt is error" + error);
    }
  };
  const apiExtraInfor = async (token, payload) => {
    try {
      const response = await axios.post(`${url}order/extra-infor`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.log("api last id warehouse receipt is error" + error);
    }
  };
const apiOrder = {
    apiSumTotalAmount,
    apiSumTotalAmountByDate,
    apiExtraInfor
}


export default apiOrder
