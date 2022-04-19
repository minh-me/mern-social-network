import axios from 'axios';
import { UserResponse } from 'interface';
import axiosInstance from 'utils/axiosInstance';

const userUrl = '/api/users';
export const userApi = {
  getProfile(): Promise<UserResponse> {
    return axiosInstance.get(`${userUrl}/profile`);
  },

  getUsers(filter: {}) {
    return axios.get(`${userUrl}${filter}`);
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
