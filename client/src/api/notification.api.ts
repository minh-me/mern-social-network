import axiosInstance from 'utils/axiosInstance';
import { NotificationsReponse } from 'interface';

const notificationUrl = '/api/notifications';
export const notificationApi = {
  getNotifications({ queryKey = ['notifications?page=1&limit=1'] }): Promise<NotificationsReponse> {
    return axiosInstance.get(`api/${queryKey[0]}`);
  },

  getNotification(notificationId: string) {
    return axiosInstance.get(`${notificationUrl}/${notificationId}`);
  },

  count({ queryKey = ['notifications/count'] }): Promise<{ result: number }> {
    return axiosInstance.get(`api/${queryKey[0]}`);
  },

  createNotification(notification: {}) {
    return axiosInstance.post(`${notificationUrl}`, notification, {
      headers: { 'Content-Type': 'application/json' },
    });
  },

  updateNotification(notificationId: string, notification: {}): Promise<Notification> {
    return axiosInstance.post(`${notificationUrl}/${notificationId}`, notification, {
      headers: { 'Content-Type': 'application/json' },
    });
  },

  updateMany(updateData = { filter: {}, body: {} }): Promise<Notification> {
    return axiosInstance.patch(`${notificationUrl}/update-many`, updateData.body, {
      params: updateData.filter,
      headers: { 'Content-Type': 'application/json' },
    });
  },

  deleteNotification(notificationId: string): Promise<Notification> {
    return axiosInstance.delete(`${notificationUrl}/${notificationId}`);
  },
};
