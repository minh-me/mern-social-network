"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateChat = exports.getChats = exports.getChatByUserId = exports.getChat = exports.deleteChat = exports.createChat = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _pick = _interopRequireDefault(require("../utils/pick"));

var _catchAsync = _interopRequireDefault(require("../utils/catchAsync"));

var _services = require("../services");

/**
 * Create a chat
 * @POST api/chats/
 * @access private
 */
var createChat = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var chatExist, chat;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Add user logged in to users
            req.body.users.push(req.user.id); // Check chat is exists

            _context.next = 3;
            return _services.chatService.findOne({
              users: req.body.users
            });

          case 3:
            chatExist = _context.sent;

            if (!chatExist) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.send(chatExist));

          case 6:
            // Add admin field
            req.body.admin = req.user.id; // Create chat

            _context.next = 9;
            return _services.chatService.createChat(req.body);

          case 9:
            chat = _context.sent;
            // Success
            res.status(201).json(chat);

          case 11:
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
 * Get all chats
 * @GET api/chats
 * @access public
 */

exports.createChat = createChat;
var getChats = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var filter, options, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            filter = {
              users: req.user.id
            };
            options = (0, _pick["default"])(req.query, ['sort', 'select', 'limit', 'page']);
            options.populate = 'admin,users,lastestMessage,lastestMessage.sender';
            _context2.next = 5;
            return _services.chatService.queryChats(filter, options);

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
 * Get a chat by chat id
 * @GET api/chats/:chatId
 * @access public
 */

exports.getChats = getChats;
var getChat = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var chat;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _services.chatService.getChatById(req.params.chatId);

          case 2:
            chat = _context3.sent;

            if (chat) {
              _context3.next = 5;
              break;
            }

            throw _httpErrors["default"].NotFound('Not found chat');

          case 5:
            res.send(chat);

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
 * Create a message
 * @Get api/chats/:userId
 * @access private
 */

exports.getChat = getChat;
var getChatByUserId = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var userId, user, filter, body, chat;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            userId = req.params.userId;
            _context4.next = 3;
            return _services.userService.getUserById(userId);

          case 3:
            user = _context4.sent;
            filter = {
              isGroupChat: false,
              users: {
                $size: 2,
                $all: [user.id, req.user.id]
              }
            };
            body = {
              chatName: user.name,
              users: [user.id, req.user.id]
            };
            _context4.next = 8;
            return _services.chatService.updateOne(filter, body);

          case 8:
            chat = _context4.sent;
            res.status(201).json(chat);

          case 10:
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
 * Update a chat by chatId
 * @PATCH api/chats/:chatId
 * @access private
 */

exports.getChatByUserId = getChatByUserId;
var updateChat = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var chat;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _services.chatService.updateChatById(req.params.chatId, req.body);

          case 2:
            chat = _context5.sent;
            res.send(chat);

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
/**
 * Delete chat by chatId
 * @DELETE api/chats/:chatId
 * @access private
 */

exports.updateChat = updateChat;
var deleteChat = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var chat;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _services.chatService.deleteChatById(req.params.chatId);

          case 2:
            chat = _context6.sent;
            res.send(chat);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
exports.deleteChat = deleteChat;