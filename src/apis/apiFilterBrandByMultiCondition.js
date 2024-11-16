import axios from "axios";

const apiFilterBrandByMultiCondition = async (token, payload) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.post(
      `${url}brand/filter-brand-by-multi-condition`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data
  } catch (error) {
    console.log("api filter brand by name is error " + error);
  }
};

export default apiFilterBrandByMultiCondition;
