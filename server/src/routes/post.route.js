import { Router } from 'express'
import validate from '../middlewares/validate'
import { postValidation } from '../validations'
import auth from '../middlewares/auth'
import { postController } from '../controllers'

const router = new Router()

router
  .route('/')
  .post(validate(postValidation.createPost), postController.createPost)
  .get(validate(postValidation.getPosts), postController.getPosts)

router
  .route('/:postId')
  .get(validate(postValidation.getPost), postController.getPost)
  .patch(validate(postValidation.updatePost), postController.updatePost)
  .delete(validate(postValidation.deletePost), postController.deletePost)

export default router
