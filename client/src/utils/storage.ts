export const storage = {
  setIsLoggedIn: (isLoggedIn: boolean) =>
    localStorage.setItem('_appsigning', isLoggedIn.toString()),
  isLoggedIn: (): boolean => JSON.parse(localStorage.getItem('_appsigning') as string),
  getToken: () => localStorage.getItem('ac_token'),
  setToken: (token: string) => localStorage.setItem('ac_token', token),
  clearToken: () => localStorage.removeItem('ac_token'),
};
