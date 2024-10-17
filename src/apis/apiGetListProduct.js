import axios from "axios";
const apiGetListProduct = async() =>{
    try {
        const url = process.env.REACT_APP_API_URL
        
        const response = await axios.get(`${url}product`)
        return response.data
    } catch (error) {
        throw new Error(error)
    }
}

export default apiGetListProduct;
