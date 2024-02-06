import axios from 'axios';
import {getAsyncItem} from '../utils/SettingAsyncStorage';
import {baseUrl, endPoint} from '../AppConstants/urlConstants';
import constants from '../AppConstants/Constants.json';

const getToken = async () => {
  const getToken = await getAsyncItem(constants.AsyncStorageKeys.token);
  return getToken;
};

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  async config => {
    const token = await getToken();

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
      config.headers.Authorization = `${token}`;
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
