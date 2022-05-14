import axios from 'axios';
import axiosInstance from 'utils/axiosInstance';
import { NotificationsReponse } from 'interface';

const notificationUrl = '/api/notifications';
export const notificationApi = {
  getNotifications({ queryKey = ['chats?page=1&limit=1'] }): Promise<NotificationsReponse> {
    return axiosInstance.get(`api/${queryKey[0]}`);
  },

  getNotification(notificationId: string) {
    return axios.get(`${notificationUrl}/${notificationId}`);
  },

  createNotification(notification: {}) {
    return axios.post(`${notificationUrl}`, notification, {
      headers: { 'Content-Type': 'application/json' },
    });
  },

  updateNotification(notificationId: string, notification: {}): Promise<Notification> {
    return axios.post(`${notificationUrl}/${notificationId}`, notification, {
      headers: { 'Content-Type': 'application/json' },
    });
  },

  deleteNotification(notificationId: string): Promise<Notification> {
    return axios.delete(`${notificationUrl}/${notificationId}`);
  },
};
