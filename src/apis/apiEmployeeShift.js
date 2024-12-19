import axios from "axios";
const url = process.env.REACT_APP_API_URL;

const apiGetAllEmployeeShift = async (token) => {
  try {
    const response = await axios.get(`${url}emp_shi`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log("api update employee is error" + error);
  }
};
const apiEmployeeShift = {
    apiGetAllEmployeeShift
}
export default apiEmployeeShift