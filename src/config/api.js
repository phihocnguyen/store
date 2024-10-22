import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

axiosInstance.interceptors.request.use(request => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    request.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return request;
}, error => {
  return Promise.reject(error);
});

export default axiosInstance