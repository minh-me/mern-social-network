import { Router } from 'express'
import { validate, auth } from '../middleware'
import { notificationValidation } from '../validations'
import { notificationController } from '../controllers'

const router = new Router()

router
  .route('/')
  .post(
    validate(notificationValidation.createNotification),
    notificationController.createNotification
  )
  .get(
    auth(),
    validate(notificationValidation.getNotifications),
    notificationController.getNotifications
  )

router.get(
  '/count',
  auth(),
  validate(notificationValidation.count),
  notificationController.count
)

router.get('/latest', auth(), notificationController.getNotificationLatest)

router.patch(
  '/update-many',
  auth(),
  validate(notificationValidation.updateNotifications),
  notificationController.updateMany
)

router
  .route('/:notificationId')
  .get(
    auth(),
    validate(notificationValidation.getNotification),
    notificationController.getNotification
  )
  .patch(
    auth(),
    validate(notificationValidation.updateNotification),
    notificationController.updateNotification
  )
  .delete(
    auth(),
    validate(notificationValidation.deleteNotification),
    notificationController.deleteNotification
  )

export default router
