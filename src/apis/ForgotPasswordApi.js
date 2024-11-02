import axios from "axios";
const ForgotPasswordApi = async(payload) => {
  try {
    const url = process.env.REACT_APP_API_URL
    const response = axios.post(`${url}user/forgotpassword`, payload)
    return (await response).data
  } catch (error) {
    throw new Error("api forgot password is error " + error)
  }
}

export default ForgotPasswordApi