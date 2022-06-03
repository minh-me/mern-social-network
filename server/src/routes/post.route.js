import { Router } from 'express'
import { validate, auth, uploadStorage, uploadPostImage } from '../middleware'
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
  .get(auth(), validate(postValidation.getPosts), postController.getPosts)

router.get(
  '/profile',
  auth(),
  validate(postValidation.getPosts),
  postController.getProfilePosts
)

router.patch(
  '/:postId/like',
  auth(),
  validate(postValidation.postIdParams),
  postController.likePost
)

router
  .route('/:postId/retweet')
  .post(
    auth(),
    validate(postValidation.retweetPost),
    postController.retweetPost
  )
  .delete(
    auth(),
    validate(postValidation.postIdParams),
    postController.deleteRetweetPost
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
