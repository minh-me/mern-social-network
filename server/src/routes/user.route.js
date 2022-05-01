import { Router } from 'express'
import { userValidation } from '../validations'
import { auth, validate } from '../middlewares'
import { userController } from '../controllers'
import { getUserByUsername } from '../validations/user.validation'

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
  '/username/:username',
  auth(),
  validate(getUserByUsername),
  userController.getUserByUsername
)

router
  .route('/')
  .post(
    auth('admin'),
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
    // auth('admin'),
    validate(userValidation.deleteUser),
    userController.deleteUser
  )

export default router
