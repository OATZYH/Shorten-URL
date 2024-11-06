import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const axiosInstance = axios.create({
  baseURL: apiUrl || "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
  },
});

export default axiosInstance;
