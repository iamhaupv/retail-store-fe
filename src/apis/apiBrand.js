import axios from "axios";
const url = process.env.REACT_APP_API_URL;

const apiLastIdBrand = async (token) => {
    try {
      const response = await axios.get(`${url}brand/last-id-number`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.log("api last id number is error" + error);
    }
  };
const apiBrand = {
    apiLastIdBrand
}


export default apiBrand
