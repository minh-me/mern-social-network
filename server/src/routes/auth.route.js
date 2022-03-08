import { Router } from 'express'
import { authController } from '../controllers'
import { auth, validate } from '../middlewares'
import { authValidation, userValidation } from '../validations'

const router = new Router()

router.post(
  '/register',
  validate(userValidation.createUser),
  authController.register
)
router.post(
  '/activation',
  validate(authValidation.activate),
  authController.activate
)
router.post('/login', validate(authValidation.login), authController.login)
router.get('/access-token', authController.accessToken)
router.post(
  '/forgot-password',
  validate(authValidation.forgotPassword),
  authController.forgotPassword
)
router.post(
  '/reset-password',
  auth(),
  validate(authValidation.resetPassword),
  authController.resetPassword
)

router.post('/logout', auth(), authController.logout)

export default router
