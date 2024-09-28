import axios from "../configs/axios";
const apiGetProductById = (pid) =>
  axios({
    url: "/product/" + pid,
    method: "get",
  });
export default apiGetProductById;
