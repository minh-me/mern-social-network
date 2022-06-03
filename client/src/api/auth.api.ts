import { client } from '~/utils';
import axiosInstance from '~/utils/axiosInstance';

import { GoogleLoginData, LoginData, AuthResponse, RegisterData } from '~/interface';

const authUrl = '/api/auth';
const requestConfig = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
};

export const authApi = {
  login(data: LoginData): Promise<AuthResponse> {
    return client.post(`${authUrl}/login`, data, requestConfig);
  },

  googleLogin(data: GoogleLoginData): Promise<AuthResponse> {
    return client.post(`${authUrl}/google`, data, requestConfig);
  },

  register(data: RegisterData) {
    return client.post(`${authUrl}/register`, data, requestConfig);
  },

  activeAccount(token: string): Promise<{ message: string }> {
    return client.post(`${authUrl}/activation`, {
      activation_token: token,
    });
  },

  forgotPassword(email: string) {
    return client.post(`${authUrl}/forgot_pass`, { email }, requestConfig);
  },

  resetPassword(data: { password: string; reset_token: string }): Promise<AuthResponse> {
    const { password, reset_token } = data;

    return client.post(
      `${authUrl}/reset_pass`,
      { password },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${reset_token}`,
        },
        withCredentials: true,
      }
    );
  },

  logout() {
    return axiosInstance.post(`${authUrl}/logout`, {}, { withCredentials: true });
  },

  getRefreshToken(): Promise<AuthResponse> {
    return axiosInstance.get(`${authUrl}/rf_token`, { withCredentials: true });
  },
};
