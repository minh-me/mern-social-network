"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetPassword = exports.register = exports.logout = exports.login = exports.google = exports.getRefreshToken = exports.forgotPassword = exports.activate = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _catchAsync = _interopRequireDefault(require("../utils/catchAsync"));

var _en = require("../_lang/en");

var _config = require("../config");

var _services = require("../services");

var _pick = _interopRequireDefault(require("../utils/pick"));

/**
 * Register user
 * @POST api/auth/sign-up
 * @access public
 */
var register = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var activation_token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _services.tokenService.activationToken(req.body);

          case 2:
            activation_token = _context.sent;
            _context.next = 5;
            return _services.emailService.sendEmailRegister(req.body.email, activation_token);

          case 5:
            return _context.abrupt("return", res.send({
              message: _en.tranSuccess.user_registered
            }));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
/**
 * Acitvation user
 * @POST api/auth/activation
 * @private public
 */

exports.register = register;
var activate = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var newUser;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _services.tokenService.verifyActivationToken(req.body.activation_token);

          case 2:
            newUser = _context2.sent;
            _context2.next = 5;
            return _services.userService.createUser(newUser);

          case 5:
            return _context2.abrupt("return", res.send({
              message: _en.tranSuccess.account_actived
            }));

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
/**
 * Login user
 * @POST api/auth/sign-in
 * @access public
 */

exports.activate = activate;
var login = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body, email, password, _yield$authService$lo, rf_token, ac_token, user, authUser;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // Get cred
            _req$body = req.body, email = _req$body.email, password = _req$body.password; // Login

            _context3.next = 3;
            return _services.authService.loginWithEmailAndPassword(email, password);

          case 3:
            _yield$authService$lo = _context3.sent;
            rf_token = _yield$authService$lo.rf_token;
            ac_token = _yield$authService$lo.ac_token;
            user = _yield$authService$lo.user;
            // store refresh token
            res.cookie('_apprftoken', rf_token, _config.config.cookie); // success

            authUser = {
              id: user.id,
              name: user.name,
              username: user.username,
              role: user.role,
              profilePic: user.profilePic
            };
            res.send({
              user: authUser,
              ac_token: ac_token
            });

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
/**
 * Google login
 * @POST api/auth/google
 * @access public
 */

exports.login = login;
var google = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _yield$authService$lo2, rf_token, ac_token, user, authUser;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _services.authService.loginWithGoogle(req.body);

          case 2:
            _yield$authService$lo2 = _context4.sent;
            rf_token = _yield$authService$lo2.rf_token;
            ac_token = _yield$authService$lo2.ac_token;
            user = _yield$authService$lo2.user;
            // store refresh token
            res.cookie('_apprftoken', rf_token, _config.config.cookie); // success

            authUser = {
              id: user.id,
              name: user.name,
              username: user.username,
              role: user.role,
              profilePic: user.profilePic
            };
            res.send({
              user: authUser,
              ac_token: ac_token
            });

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
/**
 * Get access token
 * @GET api/auth/access-token
 * @access private
 */

exports.google = google;
var getRefreshToken = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var refreshToken, _yield$tokenService$v, userId, user, _yield$tokenService$a, ac_token, rf_token, authUser;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            //  refreshToken
            refreshToken = req.signedCookies._apprftoken;

            if (refreshToken) {
              _context5.next = 3;
              break;
            }

            return _context5.abrupt("return", next(_httpErrors["default"].BadRequest('Please sign in.')));

          case 3:
            _context5.next = 5;
            return _services.tokenService.verifyRefreshToken(refreshToken);

          case 5:
            _yield$tokenService$v = _context5.sent;
            userId = _yield$tokenService$v.sub;
            _context5.next = 9;
            return _services.userService.getUserById(userId);

          case 9:
            user = _context5.sent;

            if (user) {
              _context5.next = 12;
              break;
            }

            return _context5.abrupt("return", next(_httpErrors["default"].NotFound('Not found user.')));

          case 12:
            _context5.next = 14;
            return _services.tokenService.authToken(user.id);

          case 14:
            _yield$tokenService$a = _context5.sent;
            ac_token = _yield$tokenService$a.ac_token;
            rf_token = _yield$tokenService$a.rf_token;
            // store refresh token
            res.cookie('_apprftoken', rf_token, _config.config.cookie); // success

            authUser = {
              id: user.id,
              name: user.name,
              username: user.username,
              role: user.role,
              profilePic: user.profilePic
            };
            res.send({
              user: authUser,
              ac_token: ac_token
            });

          case 20:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}());
/**
 * Fotgot password
 * @POST api/auth/forgot-password
 * @access public
 */

exports.getRefreshToken = getRefreshToken;
var forgotPassword = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var user, ac_token;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _services.userService.getUserByEmail(req.body.email);

          case 2:
            user = _context6.sent;

            if (user) {
              _context6.next = 5;
              break;
            }

            return _context6.abrupt("return", next(_httpErrors["default"].NotFound(_en.transErrors.email_undefined)));

          case 5:
            _context6.next = 7;
            return _services.tokenService.accessToken(user.id);

          case 7:
            ac_token = _context6.sent;
            _context6.next = 10;
            return _services.emailService.sendEmailResetPassword(req.body.email, ac_token, user.name);

          case 10:
            // success
            res.send({
              message: _en.tranSuccess.sendmail_reset_password_success
            });

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x12, _x13, _x14) {
    return _ref6.apply(this, arguments);
  };
}());
/**
 * Reset password
 * @POST api/auth/reset-password
 * @private public
 */

exports.forgotPassword = forgotPassword;
var resetPassword = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var user, _yield$tokenService$a2, ac_token, rf_token, authUser;

    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _services.userService.updateUserPasswordById(req.user.id, req.body);

          case 2:
            user = _context7.sent;
            _context7.next = 5;
            return _services.tokenService.authToken(user.id);

          case 5:
            _yield$tokenService$a2 = _context7.sent;
            ac_token = _yield$tokenService$a2.ac_token;
            rf_token = _yield$tokenService$a2.rf_token;
            // store refresh token
            res.cookie('_apprftoken', rf_token, _config.config.cookie); // success

            authUser = {
              id: user.id,
              name: user.name,
              username: user.username,
              role: user.role,
              profilePic: user.profilePic
            };
            res.send({
              user: authUser,
              ac_token: ac_token
            });

          case 11:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function (_x15, _x16) {
    return _ref7.apply(this, arguments);
  };
}());
/**
 * Logout user
 * @GET api/auth/sign-out
 * @access private
 */

exports.resetPassword = resetPassword;
var logout = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            // clear cookie
            res.clearCookie('_apprftoken'); // success

            res.send({
              message: _en.tranSuccess.logout_success
            });

          case 2:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function (_x17, _x18) {
    return _ref8.apply(this, arguments);
  };
}());
exports.logout = logout;