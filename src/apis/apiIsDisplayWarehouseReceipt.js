import axios from "axios";

const apiIsDisplayWarehouseReceipt = async (token, id, payload) => {
    try {
        const url = process.env.REACT_APP_API_URL
        const response = await axios.post(`${url}warehouse/${id}`, payload, {headers: {
            Authorization: `Bearer ${token}`
        }})
        return response.data
    } catch (error) {
        console.log("api IsDisplay is error " + error);
        
    }
}

export default apiIsDisplayWarehouseReceipt