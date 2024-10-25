import axios from "axios";

const apiCheckPassword = async (token, payload) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.post(`${url}user/check-password`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("api check password is error!");
  }
};

export default apiCheckPassword;
