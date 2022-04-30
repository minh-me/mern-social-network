export const storage = {
  getToken: () => localStorage.getItem('ac_token'),
  setToken: (token: string) => localStorage.setItem('ac_token', token),
  clearToken: () => localStorage.removeItem('ac_token'),
};
