import axios from "axios";

const apiFilterProductMultiCondition = async (token, payload) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.post(`${url}product/filter-product-multi-condition`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data
  } catch (error) {
    console.log("api filter product by name " + error);
  }
};

export default apiFilterProductMultiCondition;
