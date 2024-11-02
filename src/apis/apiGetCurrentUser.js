import axios from "axios";
const apiGetCurrentUser = async (token) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.get(`${url}user/current`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("api get current user is error " + error);
  }
};

export default apiGetCurrentUser;
