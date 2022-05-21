"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var _process$env = process.env,
    NODE_ENV = _process$env.NODE_ENV,
    PORT = _process$env.PORT,
    MONGODB_URL = _process$env.MONGODB_URL,
    JWT_ACCESS_SECRET = _process$env.JWT_ACCESS_SECRET,
    JWT_ACCESS_EXPIRATION = _process$env.JWT_ACCESS_EXPIRATION,
    JWT_REFRESH_SECRET = _process$env.JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRATION = _process$env.JWT_REFRESH_EXPIRATION,
    JWT_ACTIVATE_SECRET = _process$env.JWT_ACTIVATE_SECRET,
    JWT_ACTIVATE_EXPIRATION = _process$env.JWT_ACTIVATE_EXPIRATION,
    JWT_RESET_PASSWORD_SECRET = _process$env.JWT_RESET_PASSWORD_SECRET,
    JWT_RESET_PASSWORD_EXPIRATION = _process$env.JWT_RESET_PASSWORD_EXPIRATION,
    CLOUD_NAME = _process$env.CLOUD_NAME,
    CLOUD_API_KEY = _process$env.CLOUD_API_KEY,
    CLOUD_API_SECRET = _process$env.CLOUD_API_SECRET,
    SMTP_HOST = _process$env.SMTP_HOST,
    SMTP_PORT = _process$env.SMTP_PORT,
    SMTP_USERNAME = _process$env.SMTP_USERNAME,
    SMTP_PASSWORD = _process$env.SMTP_PASSWORD,
    EMAIL_FROM = _process$env.EMAIL_FROM;
var config = {
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
    resetPasswordExpiration: JWT_RESET_PASSWORD_EXPIRATION
  },
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // 30days=refreshExpiration
    httpOnly: true,
    sameSite: true,
    signed: true,
    secure: true
  },
  cloudinaryV2: {
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API_KEY,
    api_secret: CLOUD_API_SECRET
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
        pass: SMTP_PASSWORD // generated ethereal password

      }
    },
    from: EMAIL_FROM
  },
  app: {
    max_event_listeners: 30,
    upload_directory: 'src/uploads',
    upload_limit_size: 1048576,
    // 1048576 byte = 1MB
    image_types: ['image/jpg', 'image/png', 'image/jpeg']
  }
};
exports.config = config;