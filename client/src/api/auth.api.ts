import { client } from 'utils';
import { GoogleLoginData, LoginData, AuthResponse, RegisterData } from 'interface';
import axiosInstance from 'utils/axiosInstance';

const authUrl = '/api/auth';
export const authApi = {
  login(data: LoginData): Promise<AuthResponse> {
    return client.post(`${authUrl}/login`, data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
  },

  googleLogin(data: GoogleLoginData): Promise<AuthResponse> {
    return client.post(`${authUrl}/google`, data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
  },

  register(data: RegisterData) {
    return client.post(`${authUrl}/register`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
  },

  activeAccount(token: string): Promise<{ message: string }> {
    return client.post(`${authUrl}/activation`, {
      activation_token: token,
    });
  },

  forgotPassword(email: string) {
    return client.post(
      `${authUrl}/forgot_pass`,
      { email },
      { headers: { 'Content-Type': 'application/json' } }
    );
  },

  resetPassword(data: { password: string; reset_token: string }): Promise<AuthResponse> {
    return client.post(
      `${authUrl}/reset_pass`,
      { password: data.password },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.reset_token}`,
        },
        withCredentials: true,
      }
    );
  },

  logout() {
    return axiosInstance.post(`${authUrl}/logout`, {}, { withCredentials: true });
  },

  getRefreshToken(): Promise<AuthResponse> {
    return client.get(`${authUrl}/rf_token`, { withCredentials: true });
  },
};