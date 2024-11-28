import axios from "axios";

const apiFilterProductId = async (token, payload) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.post(`${url}product/filter-id`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data
  } catch (error) {
    console.log("api filter product by id " + error);
  }
};

export default apiFilterProductId;
