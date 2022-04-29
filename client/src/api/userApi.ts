import axios from 'axios';
import { User, UsersResponse } from 'interface';
import axiosInstance from 'utils/axiosInstance';

const userUrl = '/api/users';
export const userApi = {
  getProfile(): Promise<User> {
    return axiosInstance.get(`${userUrl}/profile`);
  },

  getUsers({ queryKey = ['users?page=1&limit=1'] }): Promise<UsersResponse> {
    return axiosInstance.get(`api/${queryKey[0]}`);
  },

  getUser(userId: string) {
    return axios.get(`${userUrl}/${userId}`);
  },

  createUser(user: {}) {
    return axios.post(`${userUrl}`, user, {
      headers: { 'Content-Type': 'application/json' },
    });
  },

  updateUser(userId: string, user: {}) {
    return axios.post(`${userUrl}/${userId}`, user, {
      headers: { 'Content-Type': 'application/json' },
    });
  },

  deleteUser(userId: string) {
    return axios.delete(`${userUrl}/${userId}`);
  },
};
