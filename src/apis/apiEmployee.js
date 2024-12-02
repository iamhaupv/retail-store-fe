import axios from "axios";
const url = process.env.REACT_APP_API_URL;

const apiUpdateEmployee = async (token, pid) => {
    try {
      const response = await axios.put(`${url}employee/update`, pid, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.log("api update employee is error" + error);
    }
  };
  const apiLastIdEmployee = async (token) => {
    try {
      const response = await axios.get(`${url}employee/last-id-number`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.log("api update employee is error" + error);
    }
  };
const apiEmployee = {
    apiUpdateEmployee,
    apiLastIdEmployee
}


export default apiEmployee