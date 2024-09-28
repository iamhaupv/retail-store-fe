import axios from "../configs/axios";
const ResetPasswordApi = (payload) =>
  axios({
    url: "/user/resetpassword",
    method: "put",
    data: payload,
  });

export default ResetPasswordApi;
