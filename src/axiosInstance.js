import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://192.168.1.13:5000/"
    // baseURL: "http://192.168.43.68:5000/api"
})
export default axiosInstance;