import axios from "axios";
const apiGetListBrands = async() => {
    try {
        const url = process.env.REACT_APP_API_URL        
        const response = await axios.get(`${url}brand`)
        return response.data
    } catch (error) {
        throw new Error(error)
    }
}

export default apiGetListBrands