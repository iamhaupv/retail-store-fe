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
const apiTop5ProductCategoryYear = async (token, payload) => {
  try {
    const response = await axios.post(
      `${url}order/top-5-category-year`,
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.log("api sum total amount by month is error" + error);
  }
};
const apiTop5ProductCategoryMonth = async (token, payload) => {
  try {
    const response = await axios.post(
      `${url}order/top-5-category-month`,
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
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
    console.log("api extra infor is error" + error);
  }
};
const apiTop5ProductMonth = async (token, payload) => {
  try {
    const response = await axios.post(`${url}order/top-5-month`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log("api top 5 product month is error" + error);
  }
};
const apiTop5ProductYear = async (token, payload) => {
  try {
    const response = await axios.post(`${url}order/top-5-year`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log("api top 5 product year is error" + error);
  }
};
const apiGetTotalAmountAndVATByMonthReport = async (token, payload) => {
  try {
    const response = await axios.post(`${url}order/revenue-month`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log(
      "api get total amount and VAT by month report is error" + error
    );
  }
};
const apiGetTotalAmountAndVATByYearReport = async (token, payload) => {
  try {
    const response = await axios.post(`${url}order/revenue-year`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log("api get total amount and VAT by year report is error" + error);
  }
};
const apiTop5ProductLast7Days = async (token) => {
  try {
    const response = await axios.get(`${url}order/top-7-last-days`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log("api top 5 product last 7 days is error" + error);
  }
};
const apiTop5ProductLast30Days = async (token) => {
  try {
    const response = await axios.get(`${url}order/top-30-last-days`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log("api top 5 product last 30 days is error" + error);
  }
};
const apiTop5ProductLast365Days = async (token) => {
  try {
    const response = await axios.get(`${url}order/top-365-last-days`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log("api top 5 product last 365 days is error" + error);
  }
};
const apiTop5ProductCategoryLast7Days = async (token) => {
  try {
    const response = await axios.get(`${url}order/top-category-7-last-days`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log("api top 5 product last 365 days is error" + error);
  }
};
const apiTop5ProductCategoryLast30Days = async (token) => {
  try {
    const response = await axios.get(`${url}order/top-category-30-last-days`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log("api top 5 product last 365 days is error" + error);
  }
};
const apiTop5ProductCategoryLast365Days = async (token) => {
  try {
    const response = await axios.get(`${url}order/top-category-365-last-days`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log("api top 5 product last 365 days is error" + error);
  }
};
const apiGetTotalAmountCurrentDay = async (token) => {
  try {
    const response = await axios.get(`${url}order/revenue-current-day`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log("api top 5 product last 365 days is error" + error);
  }
};
const apiGetTotalAmountComparison = async (token) => {
  try {
    const response = await axios.get(`${url}order/compare`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log("api top 5 product last 365 days is error" + error);
  }
};
const apiGetOrderDay = async (token, payload) => {
  try {
    const response = await axios.post(`${url}order/order-day`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log("api top 5 product last 365 days is error" + error);
  }
};
const apiOrder = {
  apiSumTotalAmount,
  apiSumTotalAmountByYear,
  apiSumTotalAmountByMonth,
  apiExtraInfor,
  apiTop5ProductMonth,
  apiTop5ProductYear,
  apiGetTotalAmountAndVATByMonthReport,
  apiGetTotalAmountAndVATByYearReport,
  apiTop5ProductCategoryYear,
  apiTop5ProductCategoryMonth,
  apiTop5ProductLast7Days,
  apiTop5ProductLast30Days,
  apiTop5ProductLast365Days,
  apiTop5ProductCategoryLast7Days,
  apiTop5ProductCategoryLast30Days,
  apiTop5ProductCategoryLast365Days,
  apiGetTotalAmountCurrentDay,
  apiGetTotalAmountComparison,
  apiGetOrderDay
};

export default apiOrder;
