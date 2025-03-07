import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error)
    const errorMessage = error.response?.data?.message || "Request failed";
    return Promise.reject(errorMessage);
  }
);

export default axiosInstance;
