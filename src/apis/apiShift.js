import axios from "axios";

const url = process.env.REACT_APP_API_URL;
const apiGetAllShifts = async (token) => {
  try {
    const response = await axios.get(`${url}shift`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("api get all unit is error " + error);
  }
};
const apiShift = {
  apiGetAllShifts,
};

export default apiShift;
