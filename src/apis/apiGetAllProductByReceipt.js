import axios from "axios";
const apiGetAllProductByReceipt = async (token) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.get(
      `${url}product/filter-all-product-by-receipt`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data
  } catch (error) {
    console.log("api get all product by receipt is error ", +error);
  }
};
export default apiGetAllProductByReceipt;
