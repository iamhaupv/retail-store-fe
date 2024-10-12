import axios from "axios";
const apiGetListCategory = async() => {
    try {
        const url = process.env.REACT_APP_API_URL
        console.log(url);
        
        const response = await axios.get(`${url}category`)
        console.log(response);
        
        return response.data
    } catch (error) {
        throw new Error(error)
    }
}

export default apiGetListCategory