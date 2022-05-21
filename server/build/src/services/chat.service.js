"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateOne = exports.updateChatById = exports.queryChats = exports.getChatById = exports.findOne = exports.deleteChatById = exports.createChat = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _models = require("../models");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

/**
 * Create new chat
 * @param {Object} body
 * @returns {Promise<Chat>}
 */
var createChat = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(chatBody) {
    var newChat;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _models.Chat.create(chatBody);

          case 2:
            newChat = _context.sent;
            return _context.abrupt("return", newChat);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createChat(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Get chats by query(filter, options)
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<Chat[]>}
 */


exports.createChat = createChat;

var queryChats = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(filter, options) {
    var customLabels, chats;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            customLabels = {
              docs: 'chats',
              page: 'page',
              totalPages: 'totalPages',
              limit: 'limit'
            };
            options = _objectSpread(_objectSpread({}, options), {}, {
              customLabels: customLabels
            });
            _context2.next = 4;
            return _models.Chat.paginate(filter, options);

          case 4:
            chats = _context2.sent;
            return _context2.abrupt("return", chats);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function queryChats(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Get chat by id
 * @param {ObjectId} chatId
 * @returns {Promise<Chat>}
 */


exports.queryChats = queryChats;

var getChatById = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(chatId) {
    var chat;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _models.Chat.findById(chatId).populate('users');

          case 2:
            chat = _context3.sent;
            return _context3.abrupt("return", chat);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getChatById(_x4) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * Find chat
 * @param {Object} filter
 * @returns {Promise<Chat>}
 */


exports.getChatById = getChatById;

var findOne = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(filter) {
    var chat;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _models.Chat.findOne(filter);

          case 2:
            chat = _context4.sent;
            return _context4.abrupt("return", chat);

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
 * Update chat
 * @param {FilterQuery} filter
 * @param {Object} filter
 * @returns {Promise<Chat>}
 */


exports.findOne = findOne;

var updateOne = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(filter, body) {
    var chat;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _models.Chat.findOneAndUpdate(filter, body, {
              upsert: true,
              "new": true
            }).populate('users');

          case 2:
            chat = _context5.sent;
            return _context5.abrupt("return", chat);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function updateOne(_x6, _x7) {
    return _ref5.apply(this, arguments);
  };
}();
/**
 * Update chat by id
 * @param {ObjectId} chatId
 * @param {Object} body
 * @returns {Promise<Chat>}
 */


exports.updateOne = updateOne;

var updateChatById = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(chatId, body) {
    var chat;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _models.Chat.findByIdAndUpdate(chatId, body, {
              "new": true
            });

          case 2:
            chat = _context6.sent;

            if (chat) {
              _context6.next = 5;
              break;
            }

            throw new _httpErrors["default"].NotFound('Not found chat.');

          case 5:
            return _context6.abrupt("return", chat);

          case 6:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function updateChatById(_x8, _x9) {
    return _ref6.apply(this, arguments);
  };
}();
/**
 * Delete chat by id
 * @param {ObjectId} chatId
 * @returns {Promise<Chat>}
 */


exports.updateChatById = updateChatById;

var deleteChatById = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(chatId) {
    var chat;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _models.Chat.findByIdAndDelete(chatId);

          case 2:
            chat = _context7.sent;

            if (chat) {
              _context7.next = 5;
              break;
            }

            throw new _httpErrors["default"].NotFound('Not found chat.');

          case 5:
            return _context7.abrupt("return", chat);

          case 6:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function deleteChatById(_x10) {
    return _ref7.apply(this, arguments);
  };
}();

exports.deleteChatById = deleteChatById;