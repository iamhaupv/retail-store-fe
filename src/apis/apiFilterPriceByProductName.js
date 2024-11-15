import axios from "axios";

const apiFilterPriceByProductName = async (token, payload) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.post(
      `${url}product/filter-price-by-product-name`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data
  } catch (error) {
    console.log("api filter price by product name is error " + error);
  }
};

export default apiFilterPriceByProductName;
