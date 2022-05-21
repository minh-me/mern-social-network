"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateNotificationById = exports.updateMany = exports.queryNotifications = exports.getNotificationById = exports.deleteNotificationById = exports.createNotificationRetweetPost = exports.createNotificationNewMessage = exports.createNotificationLikePost = exports.createNotificationFollow = exports.createNotificationComment = exports.createNotification = exports.count = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _models = require("../models");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var notificationTypes = {
  likePost: 'likePost',
  retweetPost: 'retweetPost',
  follow: 'follow',
  postReply: 'reply',
  newMessage: 'newMessage',
  commentPost: 'commentPost',
  commentUser: 'commentUser'
};
/**
 * Create new notification
 * @param {{userFrom: mongodbId; userTo: mongodbId, entityId: mongodbId, type: string}} notificationBody
 * @returns {Promise<Notification>}
 */

var createNotification = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(notificationBody) {
    var newNotification;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _models.Notification.create(notificationBody);

          case 2:
            newNotification = _context.sent;
            return _context.abrupt("return", newNotification);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createNotification(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Create new notification
 * @param {mongodbId} userFrom
 * @param {mongodbId} userTo
 * @param {mongodbId} postId
 * @returns {Promise<Notification>}
 */


exports.createNotification = createNotification;

var createNotificationLikePost = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(userFrom, userTo, postId) {
    var notify;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return createNotification({
              userFrom: userFrom,
              userTo: userTo,
              entityId: postId,
              type: notificationTypes.likePost
            });

          case 2:
            notify = _context2.sent;
            return _context2.abrupt("return", notify);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function createNotificationLikePost(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Create new notification
 * @param {mongodbId} userFrom
 * @param {mongodbId} userTo
 * @param {mongodbId} postId
 * @returns {Promise<Notification>}
 */


exports.createNotificationLikePost = createNotificationLikePost;

var createNotificationRetweetPost = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(userFrom, userTo, postId) {
    var notify;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return createNotification({
              userFrom: userFrom,
              userTo: userTo,
              entityId: postId,
              type: notificationTypes.retweetPost
            });

          case 2:
            notify = _context3.sent;
            return _context3.abrupt("return", notify);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function createNotificationRetweetPost(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * Create new notification
 * @param {mongodbId} userFrom
 * @param {mongodbId} userTo
 * @param {mongodbId} postId
 * @returns {Promise<Notification>}
 */


exports.createNotificationRetweetPost = createNotificationRetweetPost;

var createNotificationComment = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(userFrom, userTo, postId) {
    var notify;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return createNotification({
              userFrom: userFrom,
              userTo: userTo,
              entityId: postId
            });

          case 2:
            notify = _context4.sent;
            return _context4.abrupt("return", notify);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function createNotificationComment(_x8, _x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * Create new notification
 * @param {mongodbId} userFrom
 * @param {mongodbId} userTo
 * @returns {Promise<Notification>}
 */


exports.createNotificationComment = createNotificationComment;

var createNotificationFollow = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(userFrom, userTo) {
    var notify;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return createNotification({
              userFrom: userFrom,
              userTo: userTo,
              entityId: userTo,
              type: notificationTypes.follow
            });

          case 2:
            notify = _context5.sent;
            return _context5.abrupt("return", notify);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function createNotificationFollow(_x11, _x12) {
    return _ref5.apply(this, arguments);
  };
}();
/**
 * Create new notification
 * @param {mongodbId} userFrom
 * @param {mongodbId} userTo
 * @param {mongodbId} chatId
 * @returns {Promise<Notification>}
 */


exports.createNotificationFollow = createNotificationFollow;

var createNotificationNewMessage = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(userFrom, userTo, chatId) {
    var notify;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return createNotification({
              userFrom: userFrom,
              userTo: userTo,
              entityId: chatId,
              type: notificationTypes.newMessage
            });

          case 2:
            notify = _context6.sent;
            return _context6.abrupt("return", notify);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function createNotificationNewMessage(_x13, _x14, _x15) {
    return _ref6.apply(this, arguments);
  };
}();
/**
 * Get notifications by query(filter, options)
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<{notifications: Notification[], info: Info}>}
 */


exports.createNotificationNewMessage = createNotificationNewMessage;

var queryNotifications = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(filter, options) {
    var customLabels, notifications;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            customLabels = {
              docs: 'notifications',
              page: 'page',
              totalPages: 'totalPages',
              limit: 'limit'
            };
            options = _objectSpread(_objectSpread({}, options), {}, {
              customLabels: customLabels
            });
            _context7.next = 4;
            return _models.Notification.paginate(filter, options);

          case 4:
            notifications = _context7.sent;
            return _context7.abrupt("return", notifications);

          case 6:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function queryNotifications(_x16, _x17) {
    return _ref7.apply(this, arguments);
  };
}();
/**
 * Find notification by id
 * @param {ObjectId} notificationId
 * @returns {Promise<Notification>}
 */


exports.queryNotifications = queryNotifications;

var getNotificationById = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(notificationId) {
    var notification;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _models.Notification.findById(notificationId);

          case 2:
            notification = _context8.sent;
            return _context8.abrupt("return", notification);

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function getNotificationById(_x18) {
    return _ref8.apply(this, arguments);
  };
}();
/**
 * Update notification by id
 * @param {ObjectId} notificationId
 * @param {Object} body
 * @returns {Promise<Notification>}
 */


exports.getNotificationById = getNotificationById;

var updateNotificationById = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(notificationId, body) {
    var notification;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _models.Notification.findByIdAndUpdate(notificationId, body, {
              "new": true
            });

          case 2:
            notification = _context9.sent;

            if (notification) {
              _context9.next = 5;
              break;
            }

            throw new _httpErrors["default"].NotFound('Not found notification.');

          case 5:
            return _context9.abrupt("return", notification);

          case 6:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function updateNotificationById(_x19, _x20) {
    return _ref9.apply(this, arguments);
  };
}();
/**
 * Update notification by id
 * @param {Object} filter
 * @param {Object} body
 * @returns {Promise<Notifications>}
 */


exports.updateNotificationById = updateNotificationById;

var updateMany = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(filter, body) {
    var result;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _models.Notification.updateMany(filter, body, {
              "new": true
            });

          case 2:
            result = _context10.sent;
            return _context10.abrupt("return", result);

          case 4:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function updateMany(_x21, _x22) {
    return _ref10.apply(this, arguments);
  };
}();
/**
 * Delete notification by id
 * @param {ObjectId} notificationId
 * @returns {Promise<Notification>}
 */


exports.updateMany = updateMany;

var deleteNotificationById = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(notificationId) {
    var notification;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return _models.Notification.findByIdAndDelete(notificationId);

          case 2:
            notification = _context11.sent;

            if (notification) {
              _context11.next = 5;
              break;
            }

            throw new _httpErrors["default"].NotFound('Not found notification.');

          case 5:
            return _context11.abrupt("return", notification);

          case 6:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function deleteNotificationById(_x23) {
    return _ref11.apply(this, arguments);
  };
}();
/**
 * Count notification by filter
 * @param {Object} filter
 * @returns {Promise<Number>}
 */


exports.deleteNotificationById = deleteNotificationById;

var count = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(filter) {
    var result;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return _models.Notification.count(filter);

          case 2:
            result = _context12.sent;
            console.log({
              result: result
            });
            return _context12.abrupt("return", result);

          case 5:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));

  return function count(_x24) {
    return _ref12.apply(this, arguments);
  };
}();

exports.count = count;