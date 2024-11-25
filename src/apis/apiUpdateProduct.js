import axios from "axios";

const apiUpdateProduct = async (token, payload) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.put(`${url}product`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", 
      },
    });
    return response.data;
  } catch (error) {
    console.log("api update product is error " + error);
  }
};

export default apiUpdateProduct;
