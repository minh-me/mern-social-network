import axios from 'axios';
import { User, UserProfile, UsersResponse } from '~/interface';
import axiosInstance from '~/utils/axiosInstance';

const userUrl = '/api/users';
export const userApi = {
  getProfile({ queryKey = ['users/profile'] }): Promise<UserProfile> {
    const endpoint = queryKey[0];

    return axiosInstance.get(`api/${endpoint}`);
  },

  getUsers({ queryKey = ['users?page=1'] }): Promise<UsersResponse> {
    const endpoint = queryKey[0];

    return axiosInstance.get(`api/${endpoint}`);
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

  follow(userId: string): Promise<User> {
    return axiosInstance.patch(`${userUrl}/${userId}/following`);
  },
};
