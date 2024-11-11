import axios from "axios";

const apiFilterAllProductInShelf = async (token) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.get(
      `${url}shelf/filter-all-product-in-shelf`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.log("api filter all product in shelf is error " + error);
  }
};

export default apiFilterAllProductInShelf;
