import axiosInstance from 'utils/axiosInstance';
import { NotificationsResponse, Notification } from 'interface';

const notificationUrl = '/api/notifications';

export const notificationApi = {
  getNotifications({
    queryKey = ['notifications?page=1&limit=1'],
  }): Promise<NotificationsResponse> {
    return axiosInstance.get(`api/${queryKey[0]}`);
  },

  getNotification(notificationId: string) {
    return axiosInstance.get(`${notificationUrl}/${notificationId}`);
  },

  getNotificationLatest(): Promise<Notification> {
    return axiosInstance.get(`${notificationUrl}/latest`);
  },

  createNotification(notification: {}) {
    return axiosInstance.post(`${notificationUrl}`, notification, {
      headers: { 'Content-Type': 'application/json' },
    });
  },

  updateNotification(notifyData: { filter: { id: string }; body: {} }): Promise<Notification> {
    return axiosInstance.patch(`${notificationUrl}/${notifyData.filter.id}`, notifyData.body, {
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
