import { Router } from 'express'
import { validate, auth } from '../middlewares'
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
    validate(notificationValidation.getNotifications),
    notificationController.getNotifications
  )

router
  .route('/:notificationId')
  .get(
    validate(notificationValidation.getNotification),
    notificationController.getNotification
  )
  .patch(
    validate(notificationValidation.updateNotification),
    notificationController.updateNotification
  )
  .delete(
    validate(notificationValidation.deleteNotification),
    notificationController.deleteNotification
  )

export default router
