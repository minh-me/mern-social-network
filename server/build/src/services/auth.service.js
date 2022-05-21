"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginWithGoogle = exports.loginWithEmailAndPassword = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _ = require(".");

var _en = require("../_lang/en");

var _user = require("./user.service");

/**
 * Login user with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{user: User, ac_token: string, rf_token: string}>}
 */
var loginWithEmailAndPassword = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(email, password) {
    var user, _yield$tokenService$a, ac_token, rf_token;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _user.getUserByEmail)(email);

          case 2:
            user = _context.sent;

            if (!(user && !(user !== null && user !== void 0 && user.password))) {
              _context.next = 5;
              break;
            }

            throw new _httpErrors["default"].BadRequest('Please login with your account google and create password.');

          case 5:
            _context.t0 = !user;

            if (_context.t0) {
              _context.next = 10;
              break;
            }

            _context.next = 9;
            return user.isPasswordMatch(password);

          case 9:
            _context.t0 = !_context.sent;

          case 10:
            if (!_context.t0) {
              _context.next = 12;
              break;
            }

            throw new _httpErrors["default"].Unauthorized(_en.transErrors.login_failed);

          case 12:
            _context.next = 14;
            return _.tokenService.authToken(user.id);

          case 14:
            _yield$tokenService$a = _context.sent;
            ac_token = _yield$tokenService$a.ac_token;
            rf_token = _yield$tokenService$a.rf_token;
            delete user.password;
            return _context.abrupt("return", {
              user: user,
              ac_token: ac_token,
              rf_token: rf_token
            });

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function loginWithEmailAndPassword(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Login user with google
 * @param {Object} googleData
 * @returns {Promise<{user: User, ac_token: string, rf_token: string}>}
 */


exports.loginWithEmailAndPassword = loginWithEmailAndPassword;

var loginWithGoogle = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(googleData) {
    var user, _yield$tokenService$a2, ac_token, rf_token;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _user.getUserByGoogleId)(googleData.googleId);

          case 2:
            user = _context2.sent;

            if (user) {
              _context2.next = 7;
              break;
            }

            _context2.next = 6;
            return (0, _user.createUserByGoogle)(googleData);

          case 6:
            user = _context2.sent;

          case 7:
            _context2.next = 9;
            return _.tokenService.authToken(user.id);

          case 9:
            _yield$tokenService$a2 = _context2.sent;
            ac_token = _yield$tokenService$a2.ac_token;
            rf_token = _yield$tokenService$a2.rf_token;
            delete user.password;
            return _context2.abrupt("return", {
              user: user,
              ac_token: ac_token,
              rf_token: rf_token
            });

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function loginWithGoogle(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.loginWithGoogle = loginWithGoogle;