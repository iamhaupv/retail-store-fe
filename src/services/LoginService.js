import axios from "axios";
import GlobalHost from "../GlobalHost";
const LoginService = async (email, password) => {
  try {
    const reponse = await axios.post(`${GlobalHost.host_user}/login`, {
      email,
      password,
    });
    return reponse.data;
  } catch (error) {
    throw new Error(error);
  }
};

export default LoginService;