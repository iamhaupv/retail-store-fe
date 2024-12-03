import axios from "axios";
const apiGetListCategory = async() => {
    try {
        const url = process.env.REACT_APP_API_URL
        const response = await axios.get(`${url}category`)
        return response.data
    } catch (error) {
        console.log("api get list category is error " + error);
    }
}

export default apiGetListCategory