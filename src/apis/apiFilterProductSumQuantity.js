import axios from "axios";

const apiFilterProductSumQuantity = async (token) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.get(`${url}product/product-sumquantity`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log("api filter receipt by id PNK is error" + error);
  }
};

export default apiFilterProductSumQuantity;
