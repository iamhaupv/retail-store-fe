import axios from "axios";
const ResetPasswordApi = async (payload) => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = axios.put(`${url}user/resetpassword`, payload);
    return (await response).data;
  } catch (error) {
    console.log("api reset password is error " + error);
  }
};

export default ResetPasswordApi;
