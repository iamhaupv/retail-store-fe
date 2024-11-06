import axios from "axios";

const apiCreateShelf = async (token, payload) => {
  try {
    const url = process.env.REACT_APP_API_URL;
  const response = await axios.post(`${url}shelf`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data
  } catch (error) {
    console.log("api create shelf is error " + error);
  }
};

export default apiCreateShelf;
