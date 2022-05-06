const _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.jwtStrategy = void 0

const _regenerator = _interopRequireDefault(
  require('@babel/runtime/regenerator')
)

const _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator')
)

const _passportJwt = require('passport-jwt')

const _config = require('./config')

const _models = require('../models')

const jwtOptions = {
  secretOrKey: _config.config.jwt.accessSecret,
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
}

const jwtVerify = /* #__PURE__ */ (function () {
  const _ref = (0, _asyncToGenerator2.default)(
    /* #__PURE__ */ _regenerator.default.mark(function _callee(payload, done) {
      let user
      return _regenerator.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.prev = 0
                _context.next = 3
                return _models.User.findById(payload.sub)

              case 3:
                user = _context.sent

                if (user) {
                  _context.next = 6
                  break
                }

                return _context.abrupt('return', done(null, false))

              case 6:
                return _context.abrupt('return', done(null, user))

              case 9:
                _context.prev = 9
                _context.t0 = _context.catch(0)
                return _context.abrupt('return', done(_context.t0, false))

              case 12:
              case 'end':
                return _context.stop()
            }
          }
        },
        _callee,
        null,
        [[0, 9]]
      )
    })
  )

  return function jwtVerify(_x, _x2) {
    return _ref.apply(this, arguments)
  }
})()

const jwtStrategy = new _passportJwt.Strategy(jwtOptions, jwtVerify)
exports.jwtStrategy = jwtStrategy
