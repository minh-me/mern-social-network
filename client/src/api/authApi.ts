import { client } from 'utils';
import { LoginData, LoginResponse, RegisterData } from 'interface';

const authUrl = '/api/auth';
export const authApi = {
  login(data: LoginData): Promise<LoginResponse> {
    return client.post(`${authUrl}/login`, data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
  },

  register(data: RegisterData) {
    return client.post(`${authUrl}/register`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
  },

  forgotPassword(email: string) {
    return client.post(
      `${authUrl}/forgot_pass`,
      { email },
      { headers: { 'Content-Type': 'application/json' } }
    );
  },

  resetPassword(password: string): Promise<LoginResponse> {
    return client.post(
      `${authUrl}/reset_pass`,
      { password },
      { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
    );
  },

  logout() {
    return client.post(
      `${authUrl}/logout`,
      {},
      { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
    );
  },
};
