import createHttpError from 'http-errors'
import catchAsync from '../utils/catchAsync'
import { tranSuccess, transErrors } from '../_lang/en'
import { config } from '../config'
import {
  userService,
  authService,
  tokenService,
  emailService,
} from '../services'

/**
 * Register user
 * @POST api/auth/sign-up
 * @access public
 */
const register = catchAsync(async (req, res, next) => {
  const activation_token = await tokenService.generateActivationToken(req.body)
  await emailService.sendEmailRegister(req.body.email, activation_token)
  // registration success
  return res.send({ message: tranSuccess.user_registered })
})

/**
 * Acitvation user
 * @POST api/auth/activation
 * @private public
 */
const activate = catchAsync(async (req, res, next) => {
  // verify token
  const newUser = await tokenService.verifyActivationToken(
    req.body.activation_token
  )
  // add user
  await userService.createUser(newUser)

  // activation success
  return res.send({ message: tranSuccess.account_actived })
})

/**
 * Login user
 * @POST api/auth/sign-in
 * @access public
 */
const login = catchAsync(async (req, res) => {
  // Get cred
  const { email, password } = req.body

  // Login
  const rf_token = await authService.loginWithEmailAndPassword(email, password)

  // store refresh token
  res.cookie('_apprftoken', rf_token, config.cookie)

  res.send({ message: tranSuccess.login_success })
})

/**
 * Get access token
 * @GET api/auth/access-token
 * @access private
 */
const accessToken = catchAsync(async (req, res, next) => {
  //  rf_token
  const rf_token = req.signedCookies._apprftoken
  if (!rf_token) return next(createHttpError.BadRequest('Please sign in.'))

  // verify token
  const { sub: userId } = await tokenService.verifyRefreshToken(rf_token)

  // create access token
  const access_token = await tokenService.generateAccessToken(userId)

  // access success
  return res.send({ access_token })
})

/**
 * Fotgot password
 * @POST api/auth/forgot-password
 * @access public
 */
const forgotPassword = catchAsync(async (req, res, next) => {
  // check email
  const user = await userService.getUserByEmail(req.body.email)
  if (!user) return next(createHttpError.NotFound(transErrors.email_undefined))

  const access_token = await tokenService.generateAccessToken(user.id)

  // send email
  await emailService.sendEmailResetPassword(
    req.body.email,
    access_token,
    user.fullName
  )

  // success
  res.send({ message: tranSuccess.sendmail_reset_password_success })
})

/**
 * Reset password
 * @POST api/auth/reset-password
 * @private public
 */
const resetPassword = catchAsync(async (req, res) => {
  await userService.updateUserPasswordById(req.user.id, req.body)
  // reset success
  res.send({ message: tranSuccess.reset_password_success })
})

/**
 * Logout user
 * @GET api/auth/sign-out
 * @access private
 */
const logout = catchAsync(async (req, res) => {
  // clear cookie
  res.clearCookie('_apprftoken', { path: config.cookie.path })
  // success
  res.send({ message: tranSuccess.logout_success })
})

export {
  register,
  activate,
  login,
  accessToken,
  forgotPassword,
  resetPassword,
  logout,
}
