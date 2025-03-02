import axios, { InternalAxiosRequestConfig } from "axios";

export const APIPUBLIC = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

APIPUBLIC.interceptors.request.use(
  async (req: InternalAxiosRequestConfig) => {
    req.headers["Accept-Language"] = "en";
    req.headers["Content-Type"] = "application/json";
    return req;
  },
  (error) => {
    Promise.reject(error);
  }
);
