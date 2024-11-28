import axios from "axios";

const apiFilterReceiptByProduct = async (token, payload) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.post(
      `${url}product/list-receipts`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data
  } catch (error) {
    console.log("api filter receipt by product is error" + error);
  }
};

export default apiFilterReceiptByProduct;
