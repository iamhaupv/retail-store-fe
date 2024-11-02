import axios from "axios";
const apiDeleteProduct = async (token, productId) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.get(
      `${url}product/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("api delete product is error " +  error);
  }
};
export default apiDeleteProduct;
