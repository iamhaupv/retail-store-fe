import axios from "axios";
const apiCreateProduct = async(token, payload) =>{
    try {
        const response = await axios.post("http://localhost:2002/api/v1/product/", payload, {
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
