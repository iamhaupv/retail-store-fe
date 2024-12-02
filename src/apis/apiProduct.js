import axios from "axios";
const url = process.env.REACT_APP_API_URL;

const apiLastIdNumber = async (token) => {
    try {
      const response = await axios.get(`${url}product/last-id-number`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.log("api last id warehouse receipt is error" + error);
    }
  };
const apiProduct = {
    apiLastIdNumber
}


export default apiProduct
