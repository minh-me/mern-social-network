import { Router } from 'express'
import { userValidation } from '../validations'
import { auth, validate } from '../middleware'
import { userController } from '../controllers'

const router = new Router()

router
  .route('/profile')
  .get(auth(), userController.getProfile)
  .patch(
    auth(),
    validate(userValidation.updateProfile),
    userController.updateProfile
  )

router.get(
  '/:username/username',
  auth(),
  validate(userValidation.getUserByUsername),
  userController.getUserByUsername
)

router.patch(
  '/:userId/following',
  auth(),
  validate(userValidation.userId),
  userController.follow
)

router
  .route('/')
  .post(
    // auth('admin'),
    validate(userValidation.createUser),
    userController.createUser
  )
  .get(auth(), validate(userValidation.getUsers), userController.getUsers)

router
  .route('/:userId')
  .get(validate(userValidation.getUser), userController.getUser)
  .patch(
    auth('admin'),
    validate(userValidation.updateUser),
    userController.updateUser
  )
  .delete(
    auth('admin'),
    validate(userValidation.userId),
    userController.deleteUser
  )

export default router
