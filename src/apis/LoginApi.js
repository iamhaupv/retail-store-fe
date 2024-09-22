import axios from "../configs/axios";
const LoginApi = (email, password) =>
  axios({
    url: "/user/login",
    method: "post",
    data:{
      email, password
    } 
  });
export default LoginApi