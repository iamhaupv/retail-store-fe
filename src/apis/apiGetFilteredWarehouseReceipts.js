import axios from "axios";
const apiGetFilteredWarehouseReceipts = async (token, payload) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.post(`${url}warehouse/filter-by-condition`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("api get current user is error " + error);
  }
};

export default apiGetFilteredWarehouseReceipts;
