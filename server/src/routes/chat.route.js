import { Router } from 'express'
import validate from '../middlewares/validate'
import { chatValidation } from '../validations'
import auth from '../middlewares/auth'
import { chatController } from '../controllers'

const router = new Router()

router
  .route('/')
  .post(validate(chatValidation.createChat), chatController.createChat)
  .get(validate(chatValidation.getChats), chatController.getChats)

router
  .route('/:chatId')
  .get(validate(chatValidation.getChat), chatController.getChat)
  .patch(validate(chatValidation.updateChat), chatController.updateChat)
  .delete(validate(chatValidation.deleteChat), chatController.deleteChat)

export default router
