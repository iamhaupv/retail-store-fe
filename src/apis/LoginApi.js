import axios from "axios";
const LoginApi = async(payload) => {
  try {
    const url = process.env.REACT_APP_API_URL
    const response  = await axios.post(`${url}user/login`, payload)
    return response.data
  } catch (error) {
    throw new Error("api login is error " + error)
  }
}

export default LoginApi