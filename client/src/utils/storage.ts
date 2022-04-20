import { UserResponse } from 'interface';

export const storage = {
  getToken: () => localStorage.getItem('ac_token'),
  setToken: (token: string) => localStorage.setItem('ac_token', token),
  clearToken: () => localStorage.removeItem('ac_token'),
  getUser: () =>
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null,
  setUser: (user: UserResponse) => localStorage.setItem('user', JSON.stringify(user)),
  clearUser: () => localStorage.removeItem('user'),
};
