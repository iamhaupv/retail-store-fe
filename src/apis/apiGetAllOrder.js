import axios from "axios";

const apiGetAllOrder = async(token) => {
    try {
        const url = process.env.REACT_APP_API_URL
        const response = await axios.get(`${url}order`, {headers: {Authorization: `Bearer ${token}`}})
        return response.data
    } catch (error) {
        console.log("api get all order is error" + error);
    }
}

export default apiGetAllOrder