import axios from "axios";
const apiLastIdWarehouseReceipt = async (token) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.get(`${url}warehouse/last-id`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log("api last id warehouse receipt is error" + error);
  }
};

export default apiLastIdWarehouseReceipt;
