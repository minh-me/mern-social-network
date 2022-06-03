import { Router } from 'express'
import { validate, auth, uploadStorage, uploadImage } from '../middleware'
import { commentValidation } from '../validations'
import { commentController } from '../controllers'

const router = new Router()

router
  .route('/')
  .post(
    auth(),
    uploadStorage.single('image'),
    uploadImage,
    validate(commentValidation.createComment),
    commentController.createComment
  )
  .get(validate(commentValidation.getComments), commentController.getComments)

router.patch(
  '/:commentId/like',
  auth(),
  validate(commentValidation.commentId),
  commentController.likeComment
)

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
