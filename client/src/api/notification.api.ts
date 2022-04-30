import axios from 'axios'

const notificationUrl = '/api/notifications'
export const notificationApi = {
  getNotifications(filter: {}) {
    return axios.get(`${notificationUrl}${filter}`)
  },

  getNotification(notificationId: string) {
    return axios.get(`${notificationUrl}/${notificationId}`)
  },

  createNotification(notification: {}) {
    return axios.post(`${notificationUrl}`, notification, {
      headers: { 'Content-Type': 'application/json' },
    })
  },

  updateNotification(notificationId: string, notification: {}) {
    return axios.post(`${notificationUrl}/${notificationId}`, notification, {
      headers: { 'Content-Type': 'application/json' },
    })
  },

  deleteNotification(notificationId: string) {
    return axios.delete(`${notificationUrl}/${notificationId}`)
  },
}
