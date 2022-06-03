import axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import { storage } from './storage';
import { AuthResponse } from '~/interface';

let ac_token = storage.getToken() || '';

const config: AxiosRequestConfig = {
  baseURL: 'http://localhost:8888',
};

const axiosInstance: AxiosInstance = axios.create(config);

axiosInstance.interceptors.request.use(async (req: AxiosRequestConfig<AxiosRequestHeaders>) => {
  if (!ac_token) ac_token = storage.getToken() || '';

  req.headers = { ...req.headers };
  req.headers.Authorization = `Bearer ${ac_token}`;

  const user: { exp: number; sub: string; iat: string } = jwt_decode(ac_token);

  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (!isExpired) return req;

  const data: AuthResponse = await axios.get(`/api/auth/rf_token`, { withCredentials: true });

  storage.setToken(data.ac_token);
  req.headers.Authorization = `Bearer ${data.ac_token}`;

  return req;
});

axiosInstance.interceptors.response.use((res) => {
  return res.data;
});

export default axiosInstance;
