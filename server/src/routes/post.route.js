import { Router } from 'express'
import { validate, auth, uploadStorage, uploadPostImage } from '../middlewares'
import { postValidation } from '../validations'
import { postController } from '../controllers'

const router = new Router()

router
  .route('/')
  .post(
    auth(),
    uploadStorage.single('image'),
    uploadPostImage,
    validate(postValidation.createPost),
    postController.createPost
  )
  .get(validate(postValidation.getPosts), postController.getPosts)

router.get(
  '/me',
  auth(),
  validate(postValidation.getPosts),
  postController.getMyPosts
)
router.patch(
  '/:postId/like',
  auth(),
  validate(postValidation.deletePost),
  postController.likePost
)
router
  .route('/:postId')
  .get(validate(postValidation.getPost), postController.getPost)
  .patch(auth(), validate(postValidation.updatePost), postController.updatePost)
  .delete(
    auth(),
    validate(postValidation.deletePost),
    postController.deletePost
  )

export default router
