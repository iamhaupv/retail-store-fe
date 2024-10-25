import axios from "axios";
const apiIsDisplay = async(token, pid, data) => {
    try {
        const url = process.env.REACT_APP_API_URL
        const response = await axios.put(
            `${url}product/is-display/${pid}`, data, {headers: {
                Authorization: `Bearer ${token}`,
              },}
          );
          return response.data;
    } catch (error) {
        throw new Error(error)
    }
}

export default apiIsDisplay