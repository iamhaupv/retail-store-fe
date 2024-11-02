import axios from "axios";

const apiGetProductsByFilter = async (token, payload) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.post(
      `${url}product/filter-by-brand`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("api get products by filter is error " + error);
  }
};

export default apiGetProductsByFilter;
