import axios from "axios";
const apiGetCurrentUser = async(token) => {
    try {
        const url = process.env.REACT_APP_API_URL
        const response = await axios.get(`${url}user/current`, {headers: {
            Authorization: `Bearer ${token}`
        }})
        return response.data
    } catch (error) {
        throw new Error("api get current user error!")
    }
}

export default apiGetCurrentUser