import axios from "axios";
const apiCreateBrand = async (token, payload) => {
  try {
    const url = process.env.REACT_APP_API_URL
    const response = await axios.post(
      `${url}brand`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("api create brand is error " + error);
    
  }
};
export default apiCreateBrand;
