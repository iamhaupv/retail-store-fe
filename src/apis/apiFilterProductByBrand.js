import axios from "axios";

const apiFilterProductByBrand = async (token, payload) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.post(
      `${url}product/filter-product-by-brand`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data
  } catch (error) {
    console.log("api filter product by brand is error " + error);
  }
};

export default apiFilterProductByBrand;
