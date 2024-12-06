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
  const apiSumTotalAmountByYear = async (token, payload) => {
    try {
      const response = await axios.post(`${url}order/income-year`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.log("api sum total amount by year is error" + error);
    }
  };
  const apiSumTotalAmountByMonth = async (token, payload) => {
    try {
      const response = await axios.post(`${url}order/income-month`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.log("api sum total amount by month is error" + error);
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
  const apiTop5ProductMonth = async (token, payload) => {
    try {
      const response = await axios.post(`${url}order/top-5-month`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.log("api last id warehouse receipt is error" + error);
    }
  };
  const apiTop5ProductYear = async (token, payload) => {
    try {
      const response = await axios.post(`${url}order/top-5-year`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.log("api last id warehouse receipt is error" + error);
    }
  };
const apiOrder = {
    apiSumTotalAmount,
    apiSumTotalAmountByYear,
    apiSumTotalAmountByMonth,
    apiExtraInfor,
    apiTop5ProductMonth,
    apiTop5ProductYear
}


export default apiOrder
