import createError from 'http-errors'
import { tokenService } from '.'
import { transErrors } from '../_lang/en'
import {
  createUserByGoogle,
  getUserByEmail,
  getUserByGoogleId,
} from './user.service'

/**
 * Login user with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{user: User, ac_token: string, rf_token: string}>}
 */
const loginWithEmailAndPassword = async (email, password) => {
  const user = await getUserByEmail(email)

  // Check exists password
  if (user && !user?.password) {
    throw new createError.BadRequest(
      'Please login with your account google and create password.'
    )
  }

  // Check password matched
  if (!user || !(await user.isPasswordMatch(password)))
    throw new createError.Unauthorized(transErrors.login_failed)

  const { ac_token, rf_token } = await tokenService.authToken(user.id)

  delete user.password

  return { user, ac_token, rf_token }
}

/**
 * Login user with google
 * @param {Object} googleData
 * @returns {Promise<{user: User, ac_token: string, rf_token: string}>}
 */
const loginWithGoogle = async googleData => {
  let user = await getUserByGoogleId(googleData.googleId)

  if (!user) user = await createUserByGoogle(googleData)

  const { ac_token, rf_token } = await tokenService.authToken(user.id)

  delete user.password

  return { user, ac_token, rf_token }
}

export { loginWithEmailAndPassword, loginWithGoogle }
