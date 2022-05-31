import createError from 'http-errors'
import pick from '../utils/pick'
import catchAsync from '../utils/catchAsync'
import { notificationService } from '../services'

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
  const filter = pick(req.query, ['opened'])
  const options = pick(req.query, ['sort', 'select', 'limit', 'page'])

  if (filter.opened) {
    // convert string to boolean
    filter.opened = JSON.parse(filter.opened)
  }

  // Get notifications of user logged in
  filter.userTo = req.user.id
  options.populate = 'userFrom,userTo,entityId'

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

  if (!notification) throw createError.NotFound()

  res.send(notification)
})
/**
 * Get notification latest
 * @GET api/notifications/latest
 * @access private
 */
const getNotificationLatest = catchAsync(async (req, res) => {
  const notification = await notificationService.getNotification({
    userTo: req.user.id,
  })

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
 * Update many notification
 * @PATCH api/notifications/update-many
 * @access private
 */
const updateMany = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['opened'])

  // Filter by opened
  if (filter.opened) {
    // convert string to boolean
    filter.opened = JSON.parse(filter.opened)
  }

  filter.userTo = req.user.id

  const notification = await notificationService.updateMany(filter, req.body)

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

/**
 * Count collections
 * @GET api/notifications/count
 * @access private
 */
const count = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['opened'])

  if (filter.opened) {
    // convert string to boolean
    filter.opened = JSON.parse(filter.opened)
  }

  filter.userTo = req.user.id

  const result = await notificationService.count(filter)

  res.send({ result })
})

export {
  createNotification,
  getNotifications,
  getNotification,
  updateNotification,
  updateMany,
  deleteNotification,
  count,
  getNotificationLatest,
}
