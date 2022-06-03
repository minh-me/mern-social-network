import { Router } from 'express'
import { validate, auth } from '../middleware'
import { chatValidation } from '../validations'
import { chatController } from '../controllers'

const router = new Router()

router
  .route('/')
  .post(auth(), validate(chatValidation.createChat), chatController.createChat)
  .get(auth(), validate(chatValidation.getChats), chatController.getChats)

router
  .route('/:userId/user')
  .get(
    auth(),
    validate(chatValidation.getChatByUserId),
    chatController.getChatByUserId
  )

router
  .route('/:chatId')
  .get(auth(), validate(chatValidation.getChat), chatController.getChat)
  .patch(auth(), validate(chatValidation.updateChat), chatController.updateChat)
  .delete(
    auth(),
    validate(chatValidation.deleteChat),
    chatController.deleteChat
  )

export default router
