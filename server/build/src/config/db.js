const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.connect = void 0

const _regenerator = _interopRequireDefault(
  require('@babel/runtime/regenerator')
)

const _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator')
)

const _mongoose = _interopRequireDefault(require('mongoose'))

const _config = require('./config')

const _logger = require('./logger')

const connect = /* #__PURE__ */ (function () {
  const _ref = (0, _asyncToGenerator2.default)(
    /* #__PURE__ */ _regenerator.default.mark(function _callee() {
      let options
      let conn
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              options = {}
              _context.next = 3
              return _mongoose.default.connect(
                _config.config.mongodbUrl,
                options
              )

            case 3:
              conn = _context.sent

              _logger.logger.info(
                'MongDB Connected: '.concat(conn.connection.host).yellow.bold
                  .underline
              )

            case 5:
            case 'end':
              return _context.stop()
          }
        }
      }, _callee)
    })
  )

  return function connect() {
    return _ref.apply(this, arguments)
  }
})()

exports.connect = connect
