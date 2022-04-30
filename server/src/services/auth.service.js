import createError from 'http-errors'
import { tokenService } from '.'
import { transErrors } from '../_lang/en'
import pick from '../utils/pick'
import {
  createUserByGoogle,
  getUserByEmail,
  getUserByGoogleId,
} from './user.service'

/**
 * Login user with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginWithEmailAndPassword = async (email, password) => {
  const user = await getUserByEmail(email)
  if (!user || !(await user.isPasswordMatch(password)))
    throw new createError.Unauthorized(transErrors.login_failed)

  const { ac_token, rf_token } = await tokenService.authToken(user.id)
  // refresh token
  delete user.password
  return { user, ac_token, rf_token }
}

/**
 * Login user with google
 * @param {Object} googleData
 * @returns {Promise<User>}
 */
const loginWithGoogle = async googleData => {
  let user = await getUserByGoogleId(googleData.googleId)

  if (!user) user = await createUserByGoogle(googleData)

  const { ac_token, rf_token } = await tokenService.authToken(user.id)

  delete user.password

  return { user, ac_token, rf_token }
}

export { loginWithEmailAndPassword, loginWithGoogle }
