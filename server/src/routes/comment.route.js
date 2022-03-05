import { Router } from 'express'
import validate from '../middlewares/validate'
import { commentValidation } from '../validations'
import auth from '../middlewares/auth'
import { commentController } from '../controllers'

const router = new Router()

router
  .route('/')
  .post(
    validate(commentValidation.createComment),
    commentController.createComment
  )
  .get(validate(commentValidation.getComments), commentController.getComments)

router
  .route('/:commentId')
  .get(validate(commentValidation.getComment), commentController.getComment)
  .patch(
    validate(commentValidation.updateComment),
    commentController.updateComment
  )
  .delete(
    validate(commentValidation.deleteComment),
    commentController.deleteComment
  )

export default router
