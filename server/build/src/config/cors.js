const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.configCors = void 0

const _cors = _interopRequireDefault(require('cors'))

const whitelist = ['http://localhost:3000']
const corsOptions = {
  origin: function origin(_origin, callback) {
    if (whitelist.indexOf(_origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}
const configCors = (0, _cors.default)(corsOptions)
exports.configCors = configCors
