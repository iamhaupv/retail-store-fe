import axios from "axios";

const apiFilterProductByNameInShelf = async (token, payload) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.post(
      `${url}shelf/filter-product-by-name-in-shelf`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data
  } catch (error) {
    console.log("api filter product by name in shelf is error " + error);
  }
};

export default apiFilterProductByNameInShelf;
