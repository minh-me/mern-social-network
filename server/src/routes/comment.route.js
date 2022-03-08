import { Router } from 'express'
import { validate, auth } from '../middlewares'
import { commentValidation } from '../validations'
import { commentController } from '../controllers'

const router = new Router()

router
  .route('/')
  .post(
    auth(),
    validate(commentValidation.createComment),
    commentController.createComment
  )
  .get(validate(commentValidation.getComments), commentController.getComments)

router
  .route('/:commentId')
  .get(validate(commentValidation.getComment), commentController.getComment)
  .patch(
    auth(),
    validate(commentValidation.updateComment),
    commentController.updateComment
  )
  .delete(
    auth(),
    validate(commentValidation.deleteComment),
    commentController.deleteComment
  )

export default router
