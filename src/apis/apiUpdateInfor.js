import axios from "axios";

const apiUpdateInfor = async (token, payload) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.put(`${url}user/update-infor`, payload, {
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      },
    });
    return response.data;
  } catch (error) {
    console.log("api update infor error: " + error);
  }
};

export default apiUpdateInfor;
