import { Router } from 'express'
import validate from '../middlewares/validate'
import { messageValidation } from '../validations'
import auth from '../middlewares/auth'
import { messageController } from '../controllers'

const router = new Router()

router
  .route('/')
  .post(
    validate(messageValidation.createMessage),
    messageController.createMessage
  )
  .get(validate(messageValidation.getMessages), messageController.getMessages)

router
  .route('/:messageId')
  .get(validate(messageValidation.getMessage), messageController.getMessage)
  .patch(
    validate(messageValidation.updateMessage),
    messageController.updateMessage
  )
  .delete(
    validate(messageValidation.deleteMessage),
    messageController.deleteMessage
  )

export default router
