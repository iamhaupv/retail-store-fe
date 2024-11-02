import axios from "axios";

const apiUploadImage = async (pid, imageFile, token) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.post(`${url}upload-image/${pid}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log("api upload image is error " + error);
  }
};

export default apiUploadImage;
