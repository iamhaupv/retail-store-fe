import axios from "axios";

const apiCreateWarehouseReceipt = async (token, payload) => {
    try {
        const url = process.env.REACT_APP_API_URL
        const response = await axios.post(`${url}warehouse/create-warehouse-receipt`, payload, {headers: {
            Authorization: `Bearer ${token}`
        }})
        return response.data
    } catch (error) {
        console.log("api create warehouse receipt is error" + error);
    }
}

export default apiCreateWarehouseReceipt