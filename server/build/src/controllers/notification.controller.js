"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateNotification = exports.updateMany = exports.getNotifications = exports.getNotification = exports.deleteNotification = exports.createNotification = exports.count = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _pick = _interopRequireDefault(require("../utils/pick"));

var _catchAsync = _interopRequireDefault(require("../utils/catchAsync"));

var _services = require("../services");

var _en = require("../_lang/en");

/**
 * Create a notification
 * @POST api/notifications/
 * @access private
 */
var createNotification = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var notification;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _services.notificationService.createNotification(req.body);

          case 2:
            notification = _context.sent;
            res.status(201).json(notification);

          case 4:
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
 * Get all notifications
 * @GET api/notifications
 * @access public
 */

exports.createNotification = createNotification;
var getNotifications = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var filter, options, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            filter = (0, _pick["default"])(req.query, ['opened']);
            options = (0, _pick["default"])(req.query, ['sort', 'select', 'limit', 'page']);

            if (filter.opened) {
              // convert string to boolean
              filter.opened = JSON.parse(filter.opened);
            } // Get notifications of user logged in


            filter.userTo = req.user.id;
            options.populate = 'userFrom,userTo,entityId';
            _context2.next = 7;
            return _services.notificationService.queryNotifications(filter, options);

          case 7:
            result = _context2.sent;
            res.send(result);

          case 9:
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
 * Get a notification by notification id
 * @GET api/notifications/:notificationId
 * @access public
 */

exports.getNotifications = getNotifications;
var getNotification = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var notification;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _services.notificationService.getNotificationById(req.params.notificationId);

          case 2:
            notification = _context3.sent;

            if (notification) {
              _context3.next = 5;
              break;
            }

            throw _httpErrors["default"].NotFound();

          case 5:
            res.send(notification);

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
 * Update a notification by notificationId
 * @PATCH api/notifications/:notificationId
 * @access private
 */

exports.getNotification = getNotification;
var updateNotification = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var notification;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _services.notificationService.updateNotificationById(req.params.notificationId, req.body);

          case 2:
            notification = _context4.sent;
            res.send(notification);

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
 * Update many notification
 * @PATCH api/notifications/update-many
 * @access private
 */

exports.updateNotification = updateNotification;
var updateMany = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var filter, opened, notification;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            filter = (0, _pick["default"])(req.query, ['opened']);
            opened = req.body.opened;

            if (filter.opened) {
              // convert string to boolean
              filter.opened = JSON.parse(filter.opened);
            }

            filter.userTo = req.user.id;
            _context5.next = 6;
            return _services.notificationService.updateMany(filter, {
              opened: opened
            });

          case 6:
            notification = _context5.sent;
            res.send(notification);

          case 8:
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
 * Delete notification by notificationId
 * @DELETE api/notifications/:notificationId
 * @access private
 */

exports.updateMany = updateMany;
var deleteNotification = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var notification;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _services.notificationService.deleteNotificationById(req.params.notificationId);

          case 2:
            notification = _context6.sent;
            res.send(notification);

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
/**
 * Count collections
 * @GET api/notifications/count
 * @access private
 */

exports.deleteNotification = deleteNotification;
var count = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var filter, result;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            filter = (0, _pick["default"])(req.query, ['opened']);

            if (filter.opened) {
              // convert string to boolean
              filter.opened = JSON.parse(filter.opened);
            }

            filter.userTo = req.user.id;
            _context7.next = 5;
            return _services.notificationService.count(filter);

          case 5:
            result = _context7.sent;
            res.send({
              result: result
            });

          case 7:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());
exports.count = count;