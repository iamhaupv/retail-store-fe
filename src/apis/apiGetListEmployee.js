import axios from "axios";
const apiGetListEmployee = async (token) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.get(
      `${url}employee`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
   console.log("api get list employees is error " + error);
  }
};
export default apiGetListEmployee;
