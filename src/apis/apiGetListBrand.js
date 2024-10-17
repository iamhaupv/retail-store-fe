import axios from "axios";
const apiGetListBrands = async() => {
    try {
        const url = process.env.REACT_APP_API_URL
        console.log(url);
        
        const response = await axios.get(`${url}brand`)
        console.log(response);
        
        return response.data
    } catch (error) {
        throw new Error(error)
    }
}

export default apiGetListBrands