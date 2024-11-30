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
const apiOrder = {
    apiSumTotalAmount
}


export default apiOrder
