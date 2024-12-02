import axios from "axios";
const apiIsDisplayEmployee = async(token, pid, data) => {
    try {
        const url = process.env.REACT_APP_API_URL
        const response = await axios.put(
            `${url}employee/is-display/${pid}`, data, {headers: {
                Authorization: `Bearer ${token}`,
              },}
          );
          return response.data;
    } catch (error) {
        console.log("api IsDisplay is error " + error);
        
    }
}

export default apiIsDisplayEmployee