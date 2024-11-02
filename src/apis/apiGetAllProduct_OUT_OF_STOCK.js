import axios from "axios";
const apiGetAllProduct_OUT_OF_STOCK = async (token) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.get(
      `${url}product/out_of_stock`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("api get all product out of stock is error " + error);
  }
};
export default apiGetAllProduct_OUT_OF_STOCK;
