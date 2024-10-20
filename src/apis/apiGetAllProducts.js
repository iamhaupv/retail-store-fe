import axios from "axios";
const apiGetAllProduct = async() =>{
    try {
        const url = process.env.REACT_APP_API_URL
        const response = await axios.get(`${url}product/products`)
        return response.data
    } catch (error) {
        throw new Error(error)
    }
}

export default apiGetAllProduct;
