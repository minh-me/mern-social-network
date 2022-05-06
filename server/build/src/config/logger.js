Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.logger = void 0

const _winston = require('winston')

const _config = require('./config.js')

const { combine } = _winston.format
const { colorize } = _winston.format
const { uncolorize } = _winston.format
const { label } = _winston.format
const { splat } = _winston.format
const { printf } = _winston.format // enumerate error

const enumerateErrorFormat = (0, _winston.format)(function (info) {
  if (info instanceof Error) {
    Object.assign(info, {
      message: info.stack,
    })
  }

  return info
})
const logConfiguration = {
  level: _config.config.env === 'development' ? 'debug' : 'info',
  transports: [new _winston.transports.Console()],
  format: combine(
    enumerateErrorFormat(),
    _config.config.env === 'development'
      ? colorize({
          all: true,
        })
      : uncolorize(),
    label({
      label: __filename.split('/').pop(),
    }),
    splat(),
    printf(function (info) {
      return ''.concat(''.concat(info.level).bold, ': ').concat(info.message)
    })
  ),
}
const logger = (0, _winston.createLogger)(logConfiguration)
exports.logger = logger
