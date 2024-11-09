import axioss from "axios";
const apiAddProductToShelf = async (token, payload) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axioss.post(
      `${url}product/add-product-to-shelf`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data
  } catch (error) {
    console.log("api add product to shelf is error " + error);
  }
};

export default apiAddProductToShelf;
