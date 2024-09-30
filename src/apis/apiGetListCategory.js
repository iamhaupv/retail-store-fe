import axios from "axios";
const apiGetListCategory = async() => {
    try {
        const response = await axios.get("http://localhost:2002/api/v1/category")
        return response.data
    } catch (error) {
        throw new Error(error)
    }
}

export default apiGetListCategory