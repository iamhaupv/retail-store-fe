import axios from "axios";
const apiCreateProduct = async(token, payload) =>{
    try {
        const url = process.env.REACT_APP_API_URL
        const response = await axios.post(`${url}product`, payload, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw new Error(error)
    }
}

export default apiCreateProduct;
