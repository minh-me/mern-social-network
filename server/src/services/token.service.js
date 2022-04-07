import jwt from 'jsonwebtoken'
import httpError from 'http-errors'
import { transErrors } from '../_lang/en'
import { config } from '../config'
import * as userService from './user.service'

/**
 * private function generateToken
 * @param {object} payload
 * @param {string} secretSignature
 * @param {number|string(date)} tokenLife
 * @returns
 */
const generateToken = (payload, secretSignature, tokenLife) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      secretSignature,
      { expiresIn: tokenLife },
      (error, token) => {
        if (error) {
          return reject(httpError.Unauthorized(error.message))
        }
        resolve(token)
      }
    )
  })
}
/**
 * This module used for verify jwt token
 * @param {string} token
 * @param {string} secretKey
 * @returns {Promsie<decoded>}
 */
const verifyToken = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        return reject(httpError.Unauthorized(error.message))
      }
      resolve(decoded)
    })
  })
}

/**
 * Generate activation token to confirm account
 * @param {object} user
 * @returns
 */
const generateActivationToken = async userBody => {
  const user = await userService.getUserByEmail(userBody.email)
  if (user) throw new httpError.BadRequest(transErrors.account_in_use)

  const token = await generateToken(
    userBody,
    config.jwt.activateSecret,
    config.jwt.activateExpiration
  )
  return token
}

/**
 * Generate refresh token
 * @param {string} userId
 * @returns {Promise<token>}
 */
const generateRefreshToken = async userId => {
  return generateToken(
    { sub: userId },
    config.jwt.refreshSecret,
    config.jwt.refreshExpiration
  )
}

/**
 * Generate access token
 * @param {string} userId
 * @returns {Promise<token>}
 */
const generateAccessToken = async userId => {
  return generateToken(
    { sub: userId },
    config.jwt.accessSecret,
    config.jwt.accessExpiration
  )
}

/**
 * Generate auth token
 * @param {string} userId
 * @returns {Promise<token>}
 */
const generateAuthToken = async userId => {
  const [ac_token, rf_token] = await Promise.all([
    generateAccessToken(userId),
    generateRefreshToken(userId),
  ])
  return {
    ac_token,
    rf_token,
  }
}

/**
 * Generate reset password token
 * @param {string} userId
 * @returns {Promise<token>}
 */
const generateResetPasswordToken = async email => {
  const user = await userService.getUserByEmail(email)
  if (!user) throw httpError.BadRequest(transErrors.email_undefined)
  const token = await generateToken(
    { sub: user.id },
    config.jwt.resetPasswordSecret,
    config.jwt.resetPasswordExpiration
  )
  return token
}

/**
 *  Verify activation token
 * @param {string} userId
 * @returns {Promise<user>}
 */
const verifyActivationToken = async token => {
  const user = await verifyToken(token, config.jwt.activateSecret)
  return user
}

/**
 *  Verify activation token
 * @param {string} userId
 * @returns {Promise<sub>}
 */
const verifyRefreshToken = async token => {
  return await verifyToken(token, config.jwt.refreshSecret)
}

export {
  generateToken,
  verifyToken,
  generateActivationToken,
  generateRefreshToken,
  generateAccessToken,
  generateResetPasswordToken,
  verifyActivationToken,
  verifyRefreshToken,
  generateAuthToken,
}
