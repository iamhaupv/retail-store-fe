import axios from "axios";
const apiChangePassword = async(token, payload) => {
    try {
        const url = process.env.REACT_APP_API_URL
        const response = await axios.put(`${url}user/resetpassword`, payload, {headers: {
            Authorization: `Bearer ${token}`
        }})
        return response.data
    } catch (error) {
        console.log("api change password is error " + error);
    }
}

export default apiChangePassword