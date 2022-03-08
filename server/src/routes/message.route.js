import { Router } from 'express'
import { auth, validate } from '../middlewares'
import { messageValidation } from '../validations'
import { messageController } from '../controllers'

const router = new Router()

router
  .route('/')
  .post(
    auth(),
    validate(messageValidation.createMessage),
    messageController.createMessage
  )
  .get(
    auth(),
    validate(messageValidation.getMessages),
    messageController.getMessages
  )

router
  .route('/:messageId')
  .get(
    auth(),
    validate(messageValidation.getMessage),
    messageController.getMessage
  )
  .patch(
    auth(),
    validate(messageValidation.updateMessage),
    messageController.updateMessage
  )
  .delete(
    auth(),
    validate(messageValidation.deleteMessage),
    messageController.deleteMessage
  )

export default router
