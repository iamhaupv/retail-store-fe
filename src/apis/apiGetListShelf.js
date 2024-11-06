import axios from "axios";

const apiGetListShelf = async (token) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.get(`${url}shelf`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data
  } catch (error) {
    console.log("api get list shelf is error " + error);
  }
};
export default apiGetListShelf;
