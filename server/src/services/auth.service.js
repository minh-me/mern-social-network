import createError from 'http-errors'
import { tokenService } from '.'
import { transErrors } from '../_lang/en'
import { getUserByEmail } from './user.service'

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

  const { ac_token, rf_token } = await tokenService.generateAuthToken(user.id)
  // refresh token
  delete user.password
  return { user, ac_token, rf_token }
}

export { loginWithEmailAndPassword }
