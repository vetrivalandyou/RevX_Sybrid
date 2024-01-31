import axiosInstance from './axiosInstance';

export const PostRequest = (url, payload) => {
  return axiosInstance.post(url, payload);
};

export const GetRequest = url => {
  return axiosInstance.get(url);
};
