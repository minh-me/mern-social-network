import axiosInstance from '~/utils/axiosInstance';
import { NotificationsResponse, Notification } from '~/interface';

const notificationUrl = '/api/notifications';

export const notificationApi = {
  getNotifications({ queryKey = ['notifications?page=1'] }): Promise<NotificationsResponse> {
    const endpoint = queryKey[0];

    return axiosInstance.get(`api/${endpoint}`);
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
    const { filter, body } = notifyData;

    return axiosInstance.patch(`${notificationUrl}/${filter.id}`, body, {
      headers: { 'Content-Type': 'application/json' },
    });
  },

  updateMany(updateData = { filter: {}, body: {} }): Promise<Notification> {
    const { filter, body } = updateData;

    return axiosInstance.patch(`${notificationUrl}/update-many`, body, {
      params: filter,
      headers: { 'Content-Type': 'application/json' },
    });
  },

  deleteNotification(notificationId: string): Promise<Notification> {
    return axiosInstance.delete(`${notificationUrl}/${notificationId}`);
  },
};
