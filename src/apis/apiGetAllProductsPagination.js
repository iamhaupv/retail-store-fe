import axios from "axios";
const apiGetAllProductsPagination = async (token, payload) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.post(
      `${url}product/product-pagination`, payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data
  } catch (error) {
    console.log("api get all product is error " + error);
  }
};
export default apiGetAllProductsPagination;
