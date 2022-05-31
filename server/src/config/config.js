import dotenv from 'dotenv'

dotenv.config()

const {
  NODE_ENV,
  PORT,
  MONGODB_URL,

  JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRATION,

  JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRATION,

  JWT_ACTIVATE_SECRET,
  JWT_ACTIVATE_EXPIRATION,

  JWT_RESET_PASSWORD_SECRET,
  JWT_RESET_PASSWORD_EXPIRATION,

  CLOUD_NAME,
  CLOUD_API_KEY,
  CLOUD_API_SECRET,

  SMTP_HOST,
  SMTP_PORT,
  SMTP_USERNAME,
  SMTP_PASSWORD,
  EMAIL_FROM,
} = process.env

export const config = {
  env: NODE_ENV,
  port: PORT,
  mongodbUrl: MONGODB_URL,
  jwt: {
    accessSecret: JWT_ACCESS_SECRET,
    refreshSecret: JWT_REFRESH_SECRET,
    activateSecret: JWT_ACTIVATE_SECRET,
    resetPasswordSecret: JWT_RESET_PASSWORD_SECRET,

    accessExpiration: JWT_ACCESS_EXPIRATION,
    refreshExpiration: JWT_REFRESH_EXPIRATION,
    activateExpiration: JWT_ACTIVATE_EXPIRATION,
    resetPasswordExpiration: JWT_RESET_PASSWORD_EXPIRATION,
  },
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30days=refreshExpiration
    httpOnly: true,
    sameSite: true,
    signed: true,
    secure: true,
  },
  cloudinaryV2: {
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API_KEY,
    api_secret: CLOUD_API_SECRET,
  },

  email: {
    smtp: {
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: SMTP_USERNAME, // generated ethereal user
        pass: SMTP_PASSWORD, // generated ethereal password
      },
    },
    from: EMAIL_FROM,
  },
  app: {
    max_event_listeners: 30,
    upload_directory: 'src/uploads',
    upload_limit_size: 1048576, // 1048576 byte = 1MB
    image_types: ['image/jpg', 'image/png', 'image/jpeg'],
    db_name: 'mern-social-network',
  },
}
