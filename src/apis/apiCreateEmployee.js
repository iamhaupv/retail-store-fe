import axios from "axios";
const apiCreateEmployee = async (token, payload) => {
  try {
    const url = process.env.REACT_APP_API_URL
    const response = await axios.post(
      `${url}employee`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("api create employee is error " + error);
    
  }
};
export default apiCreateEmployee;
