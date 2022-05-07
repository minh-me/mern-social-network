import createHttpError from 'http-errors'
import { Notification } from '../models'

/**
 * Create new notification
 * @param {Object} notificationBody
 * @returns {Promise<Notification>}
 */
const createNotification = async notificationBody => {
  const newNotification = await Notification.create(notificationBody)

  return newNotification
}

/**
 * Get notifications by query(filter, options)
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<{notifications: Notification[], info: Info}>}
 */
const queryNotifications = async (filter, options) => {
  const customLabels = {
    docs: 'notifications',
    page: 'page',
    totalPages: 'totalPages',
    limit: 'limit',
  }

  options = { ...options, customLabels }

  const notifications = await Notification.paginate(filter, options)

  return notifications
}

/**
 * Find notification by id
 * @param {ObjectId} notificationId
 * @returns {Promise<Notification>}
 */
const getNotificationById = async notificationId => {
  const notification = await Notification.findById(notificationId)

  return notification
}

/**
 * Update notification by id
 * @param {ObjectId} notificationId
 * @param {Object} body
 * @returns {Promise<Notification>}
 */
const updateNotificationById = async (notificationId, body) => {
  const notification = await Notification.findByIdAndUpdate(
    notificationId,
    body,
    { new: true }
  )

  if (!notification)
    throw new createHttpError.NotFound('Not found notification.')

  return notification
}

/**
 * Delete notification by id
 * @param {ObjectId} notificationId
 * @returns {Promise<Notification>}
 */
const deleteNotificationById = async notificationId => {
  const notification = await Notification.findByIdAndDelete(notificationId)

  if (!notification)
    throw new createHttpError.NotFound('Not found notification.')

  return notification
}

export {
  createNotification,
  queryNotifications,
  getNotificationById,
  updateNotificationById,
  deleteNotificationById,
}
