"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.updateProfile = exports.getUsers = exports.getUserByUsername = exports.getUser = exports.getProfile = exports.follow = exports.deleteUser = exports.createUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _pick = _interopRequireDefault(require("../utils/pick"));

var _catchAsync = _interopRequireDefault(require("../utils/catchAsync"));

var _services = require("../services");

var _en = require("../_lang/en");

/**
 * Create a user
 * @POST api/users/
 * @access private
 */
var createUser = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _services.userService.createUser(req.body);

          case 2:
            user = _context.sent;
            res.status(201).json(user);

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
 * Get all users
 * @GET api/users
 * @access public
 */

exports.createUser = createUser;
var getUsers = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var filter, options, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            filter = (0, _pick["default"])(req.query, ['name', 'username', 'role', 'email', 'search']);
            options = (0, _pick["default"])(req.query, ['sort', 'select', 'limit', 'page']); // options.populate = 'following,followers'

            filter._id = {
              $ne: req.user.id
            };
            _context2.next = 5;
            return _services.userService.queryUsers(filter, options);

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
 * Get a user by user id
 * @GET api/users/:userId
 * @access public
 */

exports.getUsers = getUsers;
var getUser = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _services.userService.getUserById(req.params.userId);

          case 2:
            user = _context3.sent;

            if (user) {
              _context3.next = 5;
              break;
            }

            throw _httpErrors["default"].NotFound();

          case 5:
            res.send(user);

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
 * Get info user when logged in
 * @GET api/users/username/:username
 * @access private
 */

exports.getUser = getUser;
var getUserByUsername = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _services.userService.getUserByUsername(req.params.username);

          case 2:
            user = _context4.sent;
            res.send(user);

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
 * Update a user by userId
 * @PATCH api/users/:userId
 * @access private
 */

exports.getUserByUsername = getUserByUsername;
var updateUser = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _services.userService.updateUserById(req.params.userId, req.body);

          case 2:
            user = _context5.sent;
            res.send(user);

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
 * Delete user by userId
 * @DELETE api/users/:userId
 * @access private
 */

exports.updateUser = updateUser;
var deleteUser = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _services.userService.deleteUserById(req.params.userId);

          case 2:
            res.status(200).json({
              message: _en.tranSuccess.deleted_success('user')
            });

          case 3:
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
 * Get info user when logged in
 * @GET api/users/me
 * @access private
 */

exports.deleteUser = deleteUser;
var getProfile = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _services.userService.getUserById(req.user.id);

          case 2:
            user = _context7.sent;
            res.send(user);

          case 4:
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
/**
 * Update user when logged in
 * @PATCH api/users/update-me
 * @access private
 */

exports.getProfile = getProfile;
var updateProfile = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res, next) {
    var user;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _services.userService.updateUserById(req.user.id, req.body);

          case 2:
            user = _context8.sent;
            res.send(user);

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function (_x15, _x16, _x17) {
    return _ref8.apply(this, arguments);
  };
}());
/**
 * Follow user
 * @PATCH api/users/:id/following
 * @access private
 */

exports.updateProfile = updateProfile;
var follow = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res, next) {
    var userId, user, isFollowing, options, userFollow, userUpdated;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            userId = req.params.userId;
            user = req.user; // Check user is following

            isFollowing = user.following && user.following.includes(userId);
            options = isFollowing ? '$pull' : '$addToSet'; // Update user follow

            _context9.next = 6;
            return _services.userService.updateById(userId, (0, _defineProperty2["default"])({}, options, {
              followers: user.id
            }));

          case 6:
            userFollow = _context9.sent;
            _context9.next = 9;
            return _services.userService.updateById(user.id, (0, _defineProperty2["default"])({}, options, {
              following: userFollow.id
            }));

          case 9:
            userUpdated = _context9.sent;
            // Update current user
            req.user = userUpdated; // Create notify

            if (!(isFollowing && !userUpdated.id !== userFollow.id)) {
              _context9.next = 14;
              break;
            }

            _context9.next = 14;
            return _services.notificationService.createNotificationFollow(userUpdated.id, userFollow.id);

          case 14:
            res.send(userFollow);

          case 15:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function (_x18, _x19, _x20) {
    return _ref9.apply(this, arguments);
  };
}());
exports.follow = follow;