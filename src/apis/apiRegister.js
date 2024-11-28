import axios from "axios";

const apiRegister = async (token, payload) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.post(`${url}user/register`, payload, {
      headers: { 
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("api register is error: " + error);
  }
};

export default apiRegister;
