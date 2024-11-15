import axios from "axios";

const apiFilterCategoryByBrand = async (token, payload) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.post(
      `${url}brand/filter-category-by-brand`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data
  } catch (error) {
    console.log("api filter product by brand is error " + error);
  }
};

export default apiFilterCategoryByBrand;
