import axios from "axios";
const apiGetListProduct = async() =>{
    try {
        const response = await axios.get("http://localhost:2002/api/v1/product/")
        return response.data
    } catch (error) {
        throw new Error(error)
    }
}

export default apiGetListProduct;
