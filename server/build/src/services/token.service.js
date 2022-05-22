"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.verifyRefreshToken = exports.verifyActivationToken = exports.resetPasswordToken = exports.refreshToken = exports.generateToken = exports.authToken = exports.activationToken = exports.accessToken = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _en = require("../_lang/en");

var _config = require("../config");

var userService = _interopRequireWildcard(require("./user.service"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * private function generateToken
 * @param {object} payload
 * @param {string} secretSignature
 * @param {number|string(date)} tokenLife
 * @returns {Promise<token>}
 */
var generateToken = function generateToken(payload, secretSignature, tokenLife) {
  return new Promise(function (resolve, reject) {
    _jsonwebtoken["default"].sign(payload, secretSignature, {
      expiresIn: tokenLife
    }, function (error, token) {
      if (error) {
        return reject(_httpErrors["default"].Unauthorized(error.message));
      }

      resolve(token);
    });
  });
};
/**
 * This module used for verify jwt token
 * @param {string} token
 * @param {string} secretKey
 * @returns {Promsie<decoded>}
 */


exports.generateToken = generateToken;

var verifyToken = function verifyToken(token, secretKey) {
  return new Promise(function (resolve, reject) {
    _jsonwebtoken["default"].verify(token, secretKey, function (error, decoded) {
      if (error) {
        return reject(_httpErrors["default"].Unauthorized(error.message));
      }

      resolve(decoded);
    });
  });
};
/**
 * Generate activation token to confirm account
 * @param {object} user
 * @returns {Promise<token>}
 */


exports.verifyToken = verifyToken;

var activationToken = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userBody) {
    var user, token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return userService.getUserByEmail(userBody.email);

          case 2:
            user = _context.sent;

            if (!user) {
              _context.next = 5;
              break;
            }

            throw new _httpErrors["default"].BadRequest(_en.transErrors.account_in_use);

          case 5:
            _context.next = 7;
            return generateToken(userBody, _config.config.jwt.activateSecret, _config.config.jwt.activateExpiration);

          case 7:
            token = _context.sent;
            return _context.abrupt("return", token);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function activationToken(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Generate refresh token
 * @param {string} userId
 * @returns {Promise<token>}
 */


exports.activationToken = activationToken;

var refreshToken = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(userId) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", generateToken({
              sub: userId
            }, _config.config.jwt.refreshSecret, _config.config.jwt.refreshExpiration));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function refreshToken(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Generate access token
 * @param {string} userId
 * @returns {Promise<token>}
 */


exports.refreshToken = refreshToken;

var accessToken = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(userId) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", generateToken({
              sub: userId
            }, _config.config.jwt.accessSecret, _config.config.jwt.accessExpiration));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function accessToken(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * Generate auth token
 * @param {string} userId
 * @returns {Promise<tokens>}
 */


exports.accessToken = accessToken;

var authToken = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(userId) {
    var _yield$Promise$all, _yield$Promise$all2, ac_token, rf_token;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return Promise.all([accessToken(userId), refreshToken(userId)]);

          case 2:
            _yield$Promise$all = _context4.sent;
            _yield$Promise$all2 = (0, _slicedToArray2["default"])(_yield$Promise$all, 2);
            ac_token = _yield$Promise$all2[0];
            rf_token = _yield$Promise$all2[1];
            return _context4.abrupt("return", {
              ac_token: ac_token,
              rf_token: rf_token
            });

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function authToken(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * Generate reset password token
 * @param {string} userId
 * @returns {Promise<token>}
 */


exports.authToken = authToken;

var resetPasswordToken = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(email) {
    var user, token;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return userService.getUserByEmail(email);

          case 2:
            user = _context5.sent;

            if (user) {
              _context5.next = 5;
              break;
            }

            throw _httpErrors["default"].BadRequest(_en.transErrors.email_undefined);

          case 5:
            _context5.next = 7;
            return generateToken({
              sub: user.id
            }, _config.config.jwt.resetPasswordSecret, _config.config.jwt.resetPasswordExpiration);

          case 7:
            token = _context5.sent;
            return _context5.abrupt("return", token);

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function resetPasswordToken(_x5) {
    return _ref5.apply(this, arguments);
  };
}();
/**
 *  Verify activation token
 * @param {string} userId
 * @returns {Promise<User>}
 */


exports.resetPasswordToken = resetPasswordToken;

var verifyActivationToken = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(token) {
    var user;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return verifyToken(token, _config.config.jwt.activateSecret);

          case 2:
            user = _context6.sent;
            return _context6.abrupt("return", user);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function verifyActivationToken(_x6) {
    return _ref6.apply(this, arguments);
  };
}();
/**
 *  Verify activation token
 * @param {string} userId
 * @returns {Promise<sub>}
 */


exports.verifyActivationToken = verifyActivationToken;

var verifyRefreshToken = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(token) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return verifyToken(token, _config.config.jwt.refreshSecret);

          case 2:
            return _context7.abrupt("return", _context7.sent);

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function verifyRefreshToken(_x7) {
    return _ref7.apply(this, arguments);
  };
}();

exports.verifyRefreshToken = verifyRefreshToken;