import axios from "axios";
const apiGetListBrand = async() => {
    try {
        const response = await axios.get("http://localhost:2002/api/v1/brand/")
        return response.data
    } catch (error) {
        throw new Error(error)
    }
}
export default apiGetListBrand