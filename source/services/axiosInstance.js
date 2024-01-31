import axios from 'axios';
// import { API_BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseUrl, endPoint} from './urlConstants';

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  async config => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSb2xlSWQiOiI0IiwiVXNlcklkIjoiNjYiLCJuYmYiOjE3MDY2MDc2MzksImV4cCI6MTcwNjY5NDAzOSwiaWF0IjoxNzA2NjA3NjM5fQ.nUCDoc43NmwzwVxd8-d9sFcadYT28UO4tEBBXjjrecI';

    const tokenLessEndpoints = [
      endPoint.SIGNUP,
      endPoint.LOGIN,
      endPoint.RESET_PASSWORD,
      endPoint.OPT_SEDING,
      endPoint.OTP_VERIFICATION,
    ];

    const isTokenLessEndpoint = tokenLessEndpoints.some(pattern =>
      config.url.includes(pattern),
    );

    if (token && !isTokenLessEndpoint) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access');
    } else {
      console.error('API response error:', error);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
