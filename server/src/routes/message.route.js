import { Router } from 'express'
import { auth, uploadImage, uploadStorage, validate } from '../middleware'
import { messageValidation } from '../validations'
import { messageController } from '../controllers'

const router = new Router()

router
  .route('/')
  .post(
    auth(),
    uploadStorage.single('image'),
    uploadImage,
    validate(messageValidation.createMessage),
    messageController.createMessage
  )
  .get(
    auth(),
    validate(messageValidation.getMessages),
    messageController.getMessages
  )

router.patch(
  '/:chatId/readBy',
  auth(),
  validate(messageValidation.addToReadBy),
  messageController.addToReadBy
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
