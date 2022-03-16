import axios from 'axios'

const authUrl = '/api/auth'
export const authApi = {
  signIn(data: { email: string; password: string }) {
    return axios.post(`${authUrl}/login`, data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    })
  },

  signUp(data: { email: string; name: string; password: string }) {
    return axios.post(`${authUrl}/register`, data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    })
  },

  forgotPassword(email: string) {
    return axios.post(
      `${authUrl}/forgot-password`,
      { email },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )
  },

  resetPassword(password: string) {
    return axios.post(
      `${authUrl}/reset-password`,
      { password },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )
  },

  logout() {
    return axios.post(
      `${authUrl}/logout`,
      {},
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    )
  },
}
