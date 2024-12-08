import axios from "axios";
const url = process.env.REACT_APP_API_URL;

const apiLastIdNumber = async (token) => {
  try {
    const response = await axios.get(`${url}product/last-id-number`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log("api last id warehouse receipt is error" + error);
  }
};
const apiGetAllProduct = async (token) => {
  try {
    const response = await axios.get(`${url}product/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("api get all product is error " + error);
  }
};
const apiGetAllProduct_OUT_OF_STOCK = async (token) => {
  try {
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
const apiAddDiscount = async (token, payload) => {
  try {
    const response = await axios.post(
      `${url}product/add-discount`, payload,
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
const apiProduct = {
  apiLastIdNumber,
  apiGetAllProduct,
  apiGetAllProduct_OUT_OF_STOCK,
  apiAddDiscount
};

export default apiProduct;
