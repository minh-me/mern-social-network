import createHttpError from 'http-errors'
import { Notification } from '../models'

export const notificationTypes = {
  likePost: 'likePost',
  retweetPost: 'retweetPost',
  follow: 'follow',
  postReply: 'reply',
  newMessage: 'newMessage',
  commentPost: 'commentPost',
  commentUser: 'commentUser',
  likeComment: 'likeComment',
}

/**
 * Create new notification
 * @param {{userFrom: ObjectId; userTo: ObjectId, entityId: ObjectId, type: string}} notificationBody
 * @returns {Promise<Notification>}
 */
const createNotification = async notificationBody => {
  const newNotification = await Notification.create(notificationBody)

  return newNotification
}

/**
 * Create new notification
 * @param {ObjectId} userFrom
 * @param {ObjectId} userTo
 * @param {ObjectId} postId
 * @returns {Promise<Notification>}
 */
const createNotificationLikePost = async (userFrom, userTo, postId) => {
  const notify = await createNotification({
    userFrom,
    userTo,
    entityId: postId,
    type: notificationTypes.likePost,
  })
  return notify
}

/**
 * Create new notification
 * @param {ObjectId} userFrom
 * @param {ObjectId} userTo
 * @param {ObjectId} postId
 * @returns {Promise<Notification>}
 */
const createNotificationRetweetPost = async (userFrom, userTo, postId) => {
  const notify = await createNotification({
    userFrom,
    userTo,
    entityId: postId,
    type: notificationTypes.retweetPost,
  })
  return notify
}

/**
 * Create new notification
 * @param {ObjectId} userFrom
 * @param {ObjectId} userTo
 * @param {ObjectId} postId
 * @returns {Promise<Notification>}
 */
const createNotificationComment = async (userFrom, userTo, postId, type) => {
  const notify = await createNotification({
    userFrom,
    userTo,
    entityId: postId,
    type,
  })
  return notify
}

/**
 * Create new notification
 * @param {ObjectId} userFrom
 * @param {ObjectId} userTo
 * @param {ObjectId} postId
 * @returns {Promise<Notification>}
 */
const createNotificationLikeComment = async (userFrom, userTo, postId) => {
  const notify = await createNotification({
    userFrom,
    userTo,
    entityId: postId,
    type: notificationTypes.likeComment,
  })
  return notify
}

/**
 * Create new notification
 * @param {ObjectId} userFrom
 * @param {ObjectId} userTo
 * @returns {Promise<Notification>}
 */
const createNotificationFollow = async (userFrom, userTo) => {
  const notify = await createNotification({
    userFrom,
    userTo,
    entityId: userTo,
    type: notificationTypes.follow,
  })
  return notify
}

/**
 * Create new notification
 * @param {ObjectId} userFrom
 * @param {ObjectId} userTo
 * @param {ObjectId} chatId
 * @returns {Promise<Notification>}
 */
const createNotificationNewMessage = async (userFrom, userTo, chatId) => {
  const notify = await createNotification({
    userFrom,
    userTo,
    entityId: chatId,
    type: notificationTypes.newMessage,
  })
  return notify
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
 * Find notification by filter
 * @param {Object} filter
 * @returns {Promise<Notification>}
 */
const getNotification = async filter => {
  const notification = await Notification.findOne(filter)
    .sort('-createdAt')
    .populate(['userTo', 'userFrom', 'entityId'])

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
 * Update notification by id
 * @param {Object} filter
 * @param {Object} body
 * @returns {Promise<Notifications>}
 */
const updateMany = async (filter, body) => {
  const result = await Notification.updateMany(filter, body, {
    new: true,
  })

  return result
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

/**
 * Count notification by filter
 * @param {Object} filter
 * @returns {Promise<Number>}
 */
const count = async filter => {
  const result = await Notification.count(filter)

  return result
}

export {
  createNotification,
  queryNotifications,
  getNotificationById,
  updateNotificationById,
  updateMany,
  deleteNotificationById,
  createNotificationLikePost,
  createNotificationRetweetPost,
  createNotificationComment,
  createNotificationFollow,
  createNotificationNewMessage,
  count,
  getNotification,
  createNotificationLikeComment,
}
