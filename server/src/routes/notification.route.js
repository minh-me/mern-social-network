import { Router } from 'express'
import validate from '../middlewares/validate'
import { notificationValidation } from '../validations'
import auth from '../middlewares/auth'
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
