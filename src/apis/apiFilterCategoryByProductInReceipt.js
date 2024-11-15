import axios from "axios";

const apiFilterCategoryByProductInReceipt = async (token, payload) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.post(
      `${url}warehouse/filter-product-by-category-name-in-recepit`, payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.log("api filter product by brand is error " + error);
  }
};

export default apiFilterCategoryByProductInReceipt;
