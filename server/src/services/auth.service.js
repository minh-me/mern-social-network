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

  // refresh token
  const refressh_token = await tokenService.generateRefreshToken(user.id)
  return refressh_token
}

export { loginWithEmailAndPassword }
