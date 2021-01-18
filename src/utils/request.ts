import axios, { AxiosRequestConfig } from "axios";

import { Toast } from "vant";

import qs from "qs";

export const baseURl = "http://localhost:3000/";

const axiosInstance = axios.create({
  baseURL: baseURl,
  timeout: 10 * 1000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default function request(config: AxiosRequestConfig) {
  return axiosInstance(config).then((res) => {
    return res.data;
  });
}
