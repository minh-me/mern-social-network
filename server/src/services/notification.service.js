import { Notification } from '../models'

/**
 * Get notifications by query(filter, options)
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<notifications>}
 */
const queryNotifications = async (filter, options) => {
  const customLabels = {
    docs: 'notifications',
    page: 'page',
    totalPages: 'totalPages',
    limit: 'limit',
    totalDocs: 'totalNotifications',
  }
  options = { ...options, customLabels }
  const notifications = await Notification.paginate(filter, options)
  return notifications
}

/**
 * Find notification by id
 * @param {ObjectId} notificationId
 * @returns {Promise<notification>}
 */
const getNotificationById = async notificationId => {
  const notification = await Notification.findById(notificationId)
  return notification
}

/**
 * Create notification
 * @param {Object} body
 * @returns {Promise<notification>}
 */
const createNotification = async notificationBody => {
  const newNotification = await Notification.create(notificationBody)
  return newNotification
}
/**
 * Update notification by id
 * @param {ObjectId} notificationId
 * @param {Object} body
 * @returns {Promise<notification>}
 */
const updateNotificationById = async (notificationId, body) => {
  const notification = await Notification.findByIdAndUpdate(
    notificationId,
    body
  )
  return notification
}

/**
 * Delte notification by id
 * @param {ObjectId} notificationId
 * @returns {Promise<notification>}
 */
const deleteNotificationById = async notificationId => {
  const result = await Notification.findByIdAndDelete(notificationId)
  return result
}

export default {
  createNotification,
  queryNotifications,
  getNotificationById,
  updateNotificationById,
  deleteNotificationById,
}
