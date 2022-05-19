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
import pick from '../utils/pick'

/**
 * Register user
 * @POST api/auth/sign-up
 * @access public
 */
const register = catchAsync(async (req, res) => {
  const activation_token = await tokenService.activationToken(req.body)

  await emailService.sendEmailRegister(req.body.email, activation_token)

  // registration success
  return res.send({ message: tranSuccess.user_registered })
})

/**
 * Acitvation user
 * @POST api/auth/activation
 * @private public
 */
const activate = catchAsync(async (req, res) => {
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
  const { rf_token, ac_token, user } =
    await authService.loginWithEmailAndPassword(email, password)

  // store refresh token
  res.cookie('_apprftoken', rf_token, config.cookie)

  // success
  const authUser = {
    id: user.id,
    name: user.name,
    username: user.username,
    role: user.role,
    profilePic: user.profilePic,
  }

  res.send({ user: authUser, ac_token })
})

/**
 * Google login
 * @POST api/auth/google
 * @access public
 */
const google = catchAsync(async (req, res) => {
  // Login
  const { rf_token, ac_token, user } = await authService.loginWithGoogle(
    req.body
  )

  // store refresh token
  res.cookie('_apprftoken', rf_token, config.cookie)

  // success
  const authUser = {
    id: user.id,
    name: user.name,
    username: user.username,
    role: user.role,
    profilePic: user.profilePic,
  }

  res.send({ user: authUser, ac_token })
})

/**
 * Get access token
 * @GET api/auth/access-token
 * @access private
 */
const getRefreshToken = catchAsync(async (req, res, next) => {
  //  refreshToken
  const refreshToken = req.signedCookies._apprftoken
  if (!refreshToken) return next(createHttpError.BadRequest('Please sign in.'))

  // verify token
  const { sub: userId } = await tokenService.verifyRefreshToken(refreshToken)

  const user = await userService.getUserById(userId)

  if (!user) return next(createHttpError.NotFound('Not found user.'))

  // create access token
  const { ac_token, rf_token } = await tokenService.authToken(user.id)

  // store refresh token
  res.cookie('_apprftoken', rf_token, config.cookie)

  // success
  const authUser = {
    id: user.id,
    name: user.name,
    username: user.username,
    role: user.role,
    profilePic: user.profilePic,
  }

  res.send({ user: authUser, ac_token })
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

  const ac_token = await tokenService.accessToken(user.id)

  // send email
  await emailService.sendEmailResetPassword(req.body.email, ac_token, user.name)

  // success
  res.send({ message: tranSuccess.sendmail_reset_password_success })
})

/**
 * Reset password
 * @POST api/auth/reset-password
 * @private public
 */
const resetPassword = catchAsync(async (req, res) => {
  const user = await userService.updateUserPasswordById(req.user.id, req.body)

  const { ac_token, rf_token } = await tokenService.authToken(user.id)

  // store refresh token
  res.cookie('_apprftoken', rf_token, config.cookie)

  // success
  const authUser = {
    id: user.id,
    name: user.name,
    username: user.username,
    role: user.role,
    profilePic: user.profilePic,
  }
  res.send({ user: authUser, ac_token })
})

/**
 * Logout user
 * @GET api/auth/sign-out
 * @access private
 */
const logout = catchAsync(async (req, res) => {
  // clear cookie
  res.clearCookie('_apprftoken')
  // success
  res.send({ message: tranSuccess.logout_success })
})

export {
  register,
  activate,
  login,
  getRefreshToken,
  forgotPassword,
  resetPassword,
  logout,
  google,
}
