import axios from "axios";

const apiFilterConvertQuantityByUnitName = async (token, payload) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.post(
      `${url}unit/filter-convert-quantity-by-unit-name`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data
  } catch (error) {
    console.log("api filter convert quantity by unit name is error " + error);
  }
};

export default apiFilterConvertQuantityByUnitName;
