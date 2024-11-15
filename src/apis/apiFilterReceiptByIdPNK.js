import axios from "axios";

const apiFilterReceiptByIdPNK = async (token, payload) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.post(
      `${url}warehouse/filter-id-PNK`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data
  } catch (error) {
    console.log("api filter receipt by id PNK is error" + error);
  }
};

export default apiFilterReceiptByIdPNK;
