import axios from "axios";
const apiCreateOrder = async (token, payload) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.post(`${url}order`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("api create order is error " + error);
  }
};
export default apiCreateOrder;
