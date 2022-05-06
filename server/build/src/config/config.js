const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.config = void 0

const _dotenv = _interopRequireDefault(require('dotenv'))

_dotenv.default.config()

const _process$env = process.env
const { NODE_ENV } = _process$env
const { PORT } = _process$env
const { MONGODB_URL } = _process$env
const { JWT_ACCESS_SECRET } = _process$env
const { JWT_ACCESS_EXPIRATION } = _process$env
const { JWT_REFRESH_SECRET } = _process$env
const { JWT_REFRESH_EXPIRATION } = _process$env
const { JWT_ACTIVATE_SECRET } = _process$env
const { JWT_ACTIVATE_EXPIRATION } = _process$env
const { JWT_RESET_PASSWORD_SECRET } = _process$env
const { JWT_RESET_PASSWORD_EXPIRATION } = _process$env
const { CLOUD_NAME } = _process$env
const { CLOUD_API_KEY } = _process$env
const { CLOUD_API_SECRET } = _process$env
const { SMTP_HOST } = _process$env
const { SMTP_PORT } = _process$env
const { SMTP_USERNAME } = _process$env
const { SMTP_PASSWORD } = _process$env
const { EMAIL_FROM } = _process$env
const config = {
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
    maxAge: 7 * 24 * 60 * 60 * 1000,
    // 7days
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
      secure: false,
      // true for 465, false for other ports
      auth: {
        user: SMTP_USERNAME,
        // generated ethereal user
        pass: SMTP_PASSWORD, // generated ethereal password
      },
    },
    from: EMAIL_FROM,
  },
  app: {
    max_event_listeners: 30,
    upload_directory: 'src/uploads',
    upload_limit_size: 1048576,
    // 1048576 byte = 1MB
    image_types: ['image/jpg', 'image/png', 'image/jpeg'],
  },
}
exports.config = config
