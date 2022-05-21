"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendEmailResetPassword = exports.sendEmailRegister = exports.sendEmail = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _config = require("../config");

var _en = require("../_lang/en");

// create stmp transporter
var transporter = _nodemailer["default"].createTransport(_config.config.email.smtp);
/* istanbul ignore next */


if (_config.config.env !== 'test') {
  transporter.verify().then(function () {
    return _config.logger.info('Connected to email server');
  })["catch"](function () {
    return _config.logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env');
  });
}
/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {text|html} htmlContent
 */


var sendEmail = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(to, subject, htmlContent) {
    var info;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            info = {
              from: _config.config.email.from,
              to: to,
              subject: subject,
              html: htmlContent
            };
            _context.next = 3;
            return transporter.sendMail(info);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function sendEmail(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Send email register
 * @param {string} to
 * @param {string} token
 */


exports.sendEmail = sendEmail;

var sendEmailRegister = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(to, token) {
    var subject, title, desc, text, url, htmlContent;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            subject = 'ACTIVATE YOUR ACCOUNT';
            title = "<span>Welcome !</span> And thank you for registering !";
            desc = "Please validate your email by clicking the button below \uD83D\uDE42";
            text = 'Verify your email'; // replace this url with the link to the register page of front-end app

            url = "http://localhost:3000/auth/activate/".concat(token);
            htmlContent = _en.transEmail.template(title, desc, url, text);
            _context2.next = 8;
            return sendEmail(to, subject, htmlContent);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function sendEmailRegister(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Sen email reset password
 * @param {string} to
 * @param {string} token
 * @param {string} name
 */


exports.sendEmailRegister = sendEmailRegister;

var sendEmailResetPassword = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(to, token, name) {
    var subject, text, title, desc, url, htmlContent;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            subject = 'RESET YOUR PASSWORD';
            text = 'Reset your password';
            title = "<span>Hey</span> ".concat(name);
            desc = 'Please click the button below to reset your password.'; // replace this url with the link to the reset password page of front-end app

            url = "http://localhost:3000/auth/reset-password/".concat(token);
            htmlContent = _en.transEmail.template(title, desc, url, text);
            _context3.next = 8;
            return sendEmail(to, subject, htmlContent);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function sendEmailResetPassword(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

exports.sendEmailResetPassword = sendEmailResetPassword;