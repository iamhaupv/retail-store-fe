import axios from "axios";
const apiGetAllProduct_IN_STOCK = async (token) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.get(
      `${url}product/in_stock`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("api get all product in stock is error " + error);
  }
};
export default apiGetAllProduct_IN_STOCK;
