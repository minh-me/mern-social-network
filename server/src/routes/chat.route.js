import { Router } from 'express'
import { validate, auth } from '../middlewares'
import { chatValidation } from '../validations'
import { chatController } from '../controllers'

const router = new Router()

router
  .route('/')
  .post(auth(), validate(chatValidation.createChat), chatController.createChat)
  .get(validate(chatValidation.getChats), chatController.getChats)

router
  .route('/:chatId')
  .get(validate(chatValidation.getChat), chatController.getChat)
  .patch(auth(), validate(chatValidation.updateChat), chatController.updateChat)
  .delete(
    auth(),
    validate(chatValidation.deleteChat),
    chatController.deleteChat
  )

export default router
