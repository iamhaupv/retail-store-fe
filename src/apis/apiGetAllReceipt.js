import axios from "axios";
const apiGetAllReceipt = async (token) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.get(
      `${url}warehouse`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("api get all receipt is error " + error); 
  }
};
export default apiGetAllReceipt;
