import axios from "../configs/axios";
const ForgotPasswordApi = (email) =>
  axios({
    url: "/user/forgotpassword",
    method: "post",
    data:{
      email
    } 
  });
  
export default ForgotPasswordApi