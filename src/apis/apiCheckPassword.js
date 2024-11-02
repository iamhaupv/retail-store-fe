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
    console.log("api check password is error " + error);
    
  }
};

export default apiCheckPassword;
