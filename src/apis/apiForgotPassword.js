import axios from "axios";
const apiForgotPassword = async(token, payload) => {
    try {
        const url = process.env.REACT_APP_API_URL
        const response = await axios.post(`${url}user/forgotpassword`, payload, {headers: {
            Authorization: `Bearer ${token}`
        }}) 
        return response.data
    } catch (error) {
        console.log("api forgot password is error " + error);
    }
}
export default apiForgotPassword