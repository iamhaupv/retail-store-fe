import axios from "axios";
const apiCreateUnit = async(token, payload) => {
    try {
        const url = process.env.REACT_APP_API_URL
        const response = await axios.post(`${url}unit/create-unit`, payload, {headers: {
            Authorization: `Bearer ${token}`
        }})
        return response.data
    } catch (error) {
        throw new Error("api create unit is error" + error)
    }
}
export default apiCreateUnit