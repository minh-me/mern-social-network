import nodemailer from 'nodemailer'
import { config, logger } from '../config'
import { transEmail } from '../_lang/en'
// create stmp transporter
const transporter = nodemailer.createTransport(config.email.smtp)

/* istanbul ignore next */
if (config.env !== 'test') {
  transporter
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() =>
      logger.warn(
        'Unable to connect to email server. Make sure you have configured the SMTP options in .env'
      )
    )
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {text|html} htmlContent
 */
const sendEmail = async (to, subject, htmlContent) => {
  const info = {
    from: config.email.from,
    to,
    subject,
    html: htmlContent,
  }
  await transporter.sendMail(info)
}

/**
 * Send email register
 * @param {string} to
 * @param {string} token
 */
const sendEmailRegister = async (to, token) => {
  const subject = 'ACTIVATE YOUR ACCOUNT'
  const title = `<span>Welcome !</span> And thank you for registering !`
  const desc = `Please validate your email by clicking the button below 🙂`
  const text = 'Verify your email'

  // replace this url with the link to the register page of front-end app
  const url = `http://localhost:3000/auth/activate/${token}`

  const htmlContent = transEmail.template(title, desc, url, text)

  await sendEmail(to, subject, htmlContent)
}

/**
 * Sen email reset password
 * @param {string} to
 * @param {string} token
 * @param {string} name
 */
const sendEmailResetPassword = async (to, token, name) => {
  const subject = 'RESET YOUR PASSWORD'
  const text = 'Reset your password'
  const title = `<span>Hey</span> ${name}`
  const desc = 'Please click the button below to reset your password.'

  // replace this url with the link to the reset password page of front-end app
  const url = `http://localhost:3000/auth/reset-password/${token}`

  const htmlContent = transEmail.template(title, desc, url, text)

  await sendEmail(to, subject, htmlContent)
}

export { sendEmail, sendEmailRegister, sendEmailResetPassword }
