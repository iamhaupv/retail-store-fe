import axios from "axios";
const apiGetAllUnit = async (token) => {
    try {
        const url = process.env.REACT_APP_API_URL
        const response = await axios.get(`${url}unit`, {headers: {
            Authorization: `Bearer ${token}`
        }})
        return response.data
    } catch (error) {
        console.log("api get all unit is error " + error)
    }
}

export default apiGetAllUnit