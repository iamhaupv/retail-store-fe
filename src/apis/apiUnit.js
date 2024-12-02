import axios from "axios";
const url = process.env.REACT_APP_API_URL;

const apiUpdateUnit = async (token, payload) => {
    try {
      const response = await axios.put(`${url}unit`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.log("api update unit is error" + error);
    }
  };
const apiUnit = {
    apiUpdateUnit
}


export default apiUnit
