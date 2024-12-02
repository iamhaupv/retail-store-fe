import axios from "axios";

const apiUpdateBrand = async (token, payload) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.put(`${url}brand`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", 
      },
    });
    return response.data;
  } catch (error) {
    console.log("api update brand is error " + error);
  }
};

export default apiUpdateBrand;
