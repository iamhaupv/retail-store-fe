import axios from "axios";

const apiFilterOrderByCondition = async (token, payload) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.post(
      `${url}order/filter-by-condition`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data
  } catch (error) {
    console.log("api filter order by date is error " + error);
  }
};

export default apiFilterOrderByCondition;
