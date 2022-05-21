"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateMessageById = exports.queryMessages = exports.getMessageById = exports.findOne = exports.deleteMessageById = exports.createMessage = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _ = require(".");

var _models = require("../models");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

/**
 * Create message
 * @param {Object} body
 * @returns {Promise<message>}
 */
var createMessage = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(messageBody) {
    var newMessage;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _models.Message.create(messageBody);

          case 2:
            newMessage = _context.sent;
            _context.next = 5;
            return _.chatService.updateChatById(newMessage.chat, {
              lastestMessage: newMessage.id
            });

          case 5:
            return _context.abrupt("return", newMessage.populate(['chat', 'sender', 'readBy']));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createMessage(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Get messages by query(filter, options)
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<messages>}
 */


exports.createMessage = createMessage;

var queryMessages = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(filter, options) {
    var customLabels, messages;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            customLabels = {
              docs: 'messages',
              page: 'page',
              totalPages: 'totalPages',
              limit: 'limit'
            };
            options = _objectSpread(_objectSpread({}, options), {}, {
              customLabels: customLabels
            });
            _context2.next = 4;
            return _models.Message.paginate(filter, options);

          case 4:
            messages = _context2.sent;
            return _context2.abrupt("return", messages);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function queryMessages(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Find message by id
 * @param {ObjectId} messageId
 * @returns {Promise<message>}
 */


exports.queryMessages = queryMessages;

var getMessageById = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(messageId) {
    var message;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _models.Message.findById(messageId);

          case 2:
            message = _context3.sent;
            return _context3.abrupt("return", message);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getMessageById(_x4) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * Find message by filter
 * @param {Object} filter
 * @returns {Promise<message>}
 */


exports.getMessageById = getMessageById;

var findOne = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(filter) {
    var message;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _models.Message.findOne(filter);

          case 2:
            message = _context4.sent;
            return _context4.abrupt("return", message);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function findOne(_x5) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * Update message by id
 * @param {ObjectId} messageId
 * @param {Object} body
 * @returns {Promise<message>}
 */


exports.findOne = findOne;

var updateMessageById = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(messageId, body) {
    var message;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _models.Message.findByIdAndUpdate(messageId, body, {
              "new": true
            });

          case 2:
            message = _context5.sent;

            if (message) {
              _context5.next = 5;
              break;
            }

            throw new _httpErrors["default"].NotFound('Not found message.');

          case 5:
            return _context5.abrupt("return", message);

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function updateMessageById(_x6, _x7) {
    return _ref5.apply(this, arguments);
  };
}();
/**
 * Delete message by id
 * @param {ObjectId} messageId
 * @returns {Promise<message>}
 */


exports.updateMessageById = updateMessageById;

var deleteMessageById = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(messageId) {
    var message;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _models.Message.findByIdAndDelete(messageId);

          case 2:
            message = _context6.sent;

            if (message) {
              _context6.next = 5;
              break;
            }

            throw new _httpErrors["default"].NotFound('Not found message.');

          case 5:
            return _context6.abrupt("return", message);

          case 6:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function deleteMessageById(_x8) {
    return _ref6.apply(this, arguments);
  };
}();

exports.deleteMessageById = deleteMessageById;