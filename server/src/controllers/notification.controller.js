import createError from 'http-errors'
import pick from '../utils/pick'
import catchAsync from '../utils/catchAsync'
import { notificationService } from '../services'
import { tranSuccess } from '../_lang/en'

/**
 * Create a notification
 * @POST api/notifications/
 * @access private
 */
const createNotification = catchAsync(async (req, res) => {
  const notification = await notificationService.createNotification(req.body)
  res.status(201).json(notification)
})

/**
 * Get all notifications
 * @GET api/notifications
 * @access public
 */
const getNotifications = catchAsync(async (req, res) => {
  const filter = pick(req.query, [])
  const options = pick(req.query, ['sort', 'select', 'limit', 'page'])
  const result = await notificationService.queryNotifications(filter, options)
  res.send(result)
})

/**
 * Get a notification by notification id
 * @GET api/notifications/:notificationId
 * @access public
 */
const getNotification = catchAsync(async (req, res) => {
  const notification = await notificationService.getNotificationById(
    req.params.notificationId
  )
  if (!notification) {
    throw createError.NotFound()
  }
  res.send(notification)
})

/**
 * Update a notification by notificationId
 * @PATCH api/notifications/:notificationId
 * @access private
 */
const updateNotification = catchAsync(async (req, res) => {
  const notification = await notificationService.updateNotificationById(
    req.params.notificationId,
    req.body
  )
  res.send(notification)
})

/**
 * Delete notification by notificationId
 * @DELETE api/notifications/:notificationId
 * @access private
 */
const deleteNotification = catchAsync(async (req, res) => {
  const notification = await notificationService.deleteNotificationById(
    req.params.notificationId
  )
  res.send(notification)
})

export {
  createNotification,
  getNotifications,
  getNotification,
  updateNotification,
  deleteNotification,
}
