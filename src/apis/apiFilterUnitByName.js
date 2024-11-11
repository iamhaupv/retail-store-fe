import axios from "axios";

const apiFilterUnitByName = async (token, payload) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.post(`${url}unit/filter-unit-by-name`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data
  } catch (error) {
    throw new Error("api filter product by shelf is error " + error);
  }
};

export default apiFilterUnitByName;
