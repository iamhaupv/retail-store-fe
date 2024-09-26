import axios from "../configs/axios";
const ForgotPasswordApi = (email, password) =>
  axios({
    url: "/user/forgotpassword",
    method: "post",
    data:{
      email, password
    } 
  });
  
export default ForgotPasswordApi