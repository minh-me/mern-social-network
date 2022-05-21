"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateMessage = exports.getMessages = exports.getMessage = exports.deleteMessage = exports.createMessage = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _pick = _interopRequireDefault(require("../utils/pick"));

var _catchAsync = _interopRequireDefault(require("../utils/catchAsync"));

var _services = require("../services");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

/**
 * Create a message
 * @POST api/messages/
 * @access private
 */
var createMessage = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var item, result, message;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            item = _objectSpread(_objectSpread({}, req.body), {}, {
              sender: req.user.id,
              readBy: [req.user.id]
            });

            if (!req.file) {
              _context.next = 6;
              break;
            }

            _context.next = 4;
            return _services.uploadService.uploadImageMessage(req.file.path);

          case 4:
            result = _context.sent;
            item.image = result;

          case 6:
            _context.next = 8;
            return _services.messageService.createMessage(item);

          case 8:
            message = _context.sent;
            res.status(201).json(message);

          case 10:
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
 * Get all messages
 * @GET api/messages
 * @access private
 */

exports.createMessage = createMessage;
var getMessages = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var filter, options, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            filter = (0, _pick["default"])(req.query, ['chat']);
            options = (0, _pick["default"])(req.query, ['sort', 'select', 'limit', 'page']);
            options.populate = 'sender,readBy,chat';
            _context2.next = 5;
            return _services.messageService.queryMessages(filter, options);

          case 5:
            result = _context2.sent;
            res.send(result);

          case 7:
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
 * Get a message by message id
 * @GET api/messages/:messageId
 * @access private
 */

exports.getMessages = getMessages;
var getMessage = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var message;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _services.messageService.getMessageById(req.params.messageId);

          case 2:
            message = _context3.sent;

            if (message) {
              _context3.next = 5;
              break;
            }

            throw _httpErrors["default"].NotFound();

          case 5:
            res.send(message);

          case 6:
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
 * Update a message by messageId
 * @PATCH api/messages/:messageId
 * @access private
 */

exports.getMessage = getMessage;
var updateMessage = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var message;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _services.messageService.updateMessageById(req.params.messageId, req.body);

          case 2:
            message = _context4.sent;
            res.send(message);

          case 4:
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
 * Delete message by messageId
 * @DELETE api/messages/:messageId
 * @access private
 */

exports.updateMessage = updateMessage;
var deleteMessage = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var message;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _services.messageService.deleteMessageById(req.params.messageId);

          case 2:
            message = _context5.sent;
            res.send(message);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
exports.deleteMessage = deleteMessage;