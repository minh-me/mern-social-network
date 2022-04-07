import axios from 'axios';
import { LoginData, LoginResponse, RegisterData } from 'interface';

const authUrl = '/api/auth';
export const authApi = {
  login(data: LoginData): Promise<LoginResponse> {
    return axios.post(`${authUrl}/login`, data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
  },

  register(data: RegisterData) {
    return axios.post(`${authUrl}/register`, data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
  },

  forgotPassword(email: string) {
    return axios.post(
      `${authUrl}/forgot_pass`,
      { email },
      { headers: { 'Content-Type': 'application/json' } }
    );
  },

  resetPassword(password: string): Promise<LoginResponse> {
    return axios.post(
      `${authUrl}/reset_pass`,
      { password },
      { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
    );
  },

  logout() {
    return axios.post(
      `${authUrl}/logout`,
      {},
      { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
    );
  },
};
