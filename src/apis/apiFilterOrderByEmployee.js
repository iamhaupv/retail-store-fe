import axios from "axios";

const apiFilterOrderByEmployee = async (token, payload) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.post(
      `${url}order/filter-by-emloyee-name`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data
  } catch (error) {
    console.log("api filter order by employee name is error " + error);
  }
};

export default apiFilterOrderByEmployee;
