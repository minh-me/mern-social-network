import { Router } from 'express'
import { authController } from '../controllers'
import { auth, validate } from '../middleware'
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

router.post('/google', validate(authValidation.google), authController.google)

router.get('/rf_token', authController.getRefreshToken)

router.post(
  '/forgot_pass',
  validate(authValidation.forgotPassword),
  authController.forgotPassword
)

router.post(
  '/reset_pass',
  auth(),
  validate(authValidation.resetPassword),
  authController.resetPassword
)

router.post('/logout', auth(), authController.logout)

export default router
