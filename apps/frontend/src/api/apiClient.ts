import axios from "axios";
import type { InternalAxiosRequestConfig, AxiosResponse } from "axios";

console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1",
});

// Interceptor to inject JWT from localStorage
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("access_token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Optional: Interceptor to handle 401s (logout on expired token)
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: any) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      // window.location.href = '/login'; // Or handle via store
    }
    return Promise.reject(error);
  },
);
