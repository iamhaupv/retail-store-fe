import axios from "axios";

const apiFilterReceiptByDate = async (token, payload) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.post(
      `${url}warehouse/filter-receipt-by-date`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.log("api filter receipt by id PNK is error" + error);
  }
};

export default apiFilterReceiptByDate;
