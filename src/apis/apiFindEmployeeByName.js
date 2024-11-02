import axios from "axios";

const apiFindEmployeeByName = async (token, payload) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.post(
      `${url}employee/filter-by-name`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw new Error("api find employee by name" + error);
  }
};

export default apiFindEmployeeByName;
