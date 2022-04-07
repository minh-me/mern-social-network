import axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';

const API_SERVER_URL = 'http://127.0.0.1:8000';

let ac_token = localStorage.getItem('ac_token') || '';

const config: AxiosRequestConfig = {
  baseURL: API_SERVER_URL,
  headers: { Authorization: `Bearer ${ac_token}` },
};

const axiosInstance: AxiosInstance = axios.create(config);

axiosInstance.interceptors.request.use(async (req: AxiosRequestConfig<AxiosRequestHeaders>) => {
  if (!ac_token) {
    ac_token = localStorage.getItem('ac_token') || '';
    req.headers = {
      Authorization: `Bearer ${ac_token}`,
    };
  }

  const user: { exp: number } = jwt_decode(ac_token);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (!isExpired) return req;

  const response = await axios.get(`${API_SERVER_URL}/api/auth/refresh`);

  localStorage.setItem('ac_token', JSON.stringify(response.data));
  req.headers = {
    Authorization: `Bearer ${response.data.ac_token}`,
  };
  return req;
});

export default axiosInstance;
