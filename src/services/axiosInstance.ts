// services/axiosInstance.ts
import axios from "axios";
import { store } from "@/redux/store";
console.log("API:", import.meta.env.VITE_API_URL); // should show full URL

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ This is the instance you should use everywhere
export default axiosInstance;
