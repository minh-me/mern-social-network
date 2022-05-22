"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUserPasswordById = exports.updateUserById = exports.updateProfilePic = exports.updateCoverPhoto = exports.updateById = exports.queryUsers = exports.getUserByUsername = exports.getUserById = exports.getUserByGoogleId = exports.getUserByEmail = exports.deleteUserById = exports.createUserByGoogle = exports.createUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _post = require("./post.service");

var _upload = require("./upload.service");

var _models = require("../models");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

/**
 * Find user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
var getUserByEmail = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(email) {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _models.User.findOne({
              email: email
            }).select('+password');

          case 2:
            user = _context.sent;
            return _context.abrupt("return", user);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getUserByEmail(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Create user
 * @param {Object} body
 * @returns {Promise<User>}
 */


exports.getUserByEmail = getUserByEmail;

var createUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(userBody) {
    var user, newUser;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getUserByEmail(userBody.email);

          case 2:
            user = _context2.sent;

            if (!user) {
              _context2.next = 5;
              break;
            }

            throw _httpErrors["default"].BadRequest('Email already exists');

          case 5:
            _context2.next = 7;
            return _models.User.create(userBody);

          case 7:
            newUser = _context2.sent;
            return _context2.abrupt("return", newUser);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function createUser(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Create user with google data
 * @param {Object} googleData
 * @returns {Promise<User>}
 */


exports.createUser = createUser;

var createUserByGoogle = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(googleData) {
    var user, newUser;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return getUserByEmail(googleData.email);

          case 2:
            user = _context3.sent;

            if (!user) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return", _models.User.findByIdAndUpdate(user.id, {
              googleId: googleData.googleId
            }, {
              "new": true
            }));

          case 5:
            _context3.next = 7;
            return _models.User.create(googleData);

          case 7:
            newUser = _context3.sent;
            return _context3.abrupt("return", newUser);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function createUserByGoogle(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * Get users by query(filter, options)
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<{users: User[], info: Info}>}
 */


exports.createUserByGoogle = createUserByGoogle;

var queryUsers = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(filter, options) {
    var customLabels, users;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            customLabels = {
              docs: 'users',
              page: 'page',
              totalPages: 'totalPages',
              limit: 'limit'
            };
            options = _objectSpread(_objectSpread({}, options), {}, {
              customLabels: customLabels
            });
            _context4.next = 4;
            return _models.User.paginate(filter, options);

          case 4:
            users = _context4.sent;
            return _context4.abrupt("return", users);

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function queryUsers(_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * Find user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */


exports.queryUsers = queryUsers;

var getUserById = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(userId) {
    var user;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _models.User.findById(userId).populate(['followers', 'following']);

          case 2:
            user = _context5.sent;
            return _context5.abrupt("return", user);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getUserById(_x6) {
    return _ref5.apply(this, arguments);
  };
}();
/**
 * Find user by email
 * @param {string} username
 * @returns {Promise<User>}
 */


exports.getUserById = getUserById;

var getUserByUsername = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(username) {
    var user;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _models.User.findOne({
              username: username
            }).populate(['followers', 'following']);

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

  return function getUserByUsername(_x7) {
    return _ref6.apply(this, arguments);
  };
}();
/**
 * Find user by googleId
 * @param {string} googleId
 * @returns {Promise<User>}
 */


exports.getUserByUsername = getUserByUsername;

var getUserByGoogleId = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(googleId) {
    var user;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _models.User.findOne({
              googleId: googleId
            });

          case 2:
            user = _context7.sent;
            return _context7.abrupt("return", user);

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function getUserByGoogleId(_x8) {
    return _ref7.apply(this, arguments);
  };
}();
/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} body
 * @returns {Promise<User>}
 */


exports.getUserByGoogleId = getUserByGoogleId;

var updateUserById = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(userId, body) {
    var user;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return getUserById(userId);

          case 2:
            user = _context8.sent;

            if (user) {
              _context8.next = 5;
              break;
            }

            throw _httpErrors["default"].NotFound();

          case 5:
            _context8.t0 = body.email;

            if (!_context8.t0) {
              _context8.next = 10;
              break;
            }

            _context8.next = 9;
            return getUserByEmail(body.email);

          case 9:
            _context8.t0 = _context8.sent;

          case 10:
            if (!_context8.t0) {
              _context8.next = 12;
              break;
            }

            throw _httpErrors["default"].BadRequest('Email already exists');

          case 12:
            Object.assign(user, body);
            _context8.next = 15;
            return user.save();

          case 15:
            return _context8.abrupt("return", user);

          case 16:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function updateUserById(_x9, _x10) {
    return _ref8.apply(this, arguments);
  };
}();
/**
 * Update user by id (ignore validate email)
 * @param {ObjectId} userId
 * @param {userBody} body
 * @returns {Promise<User>}
 */


exports.updateUserById = updateUserById;

var updateById = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(userId, body) {
    var user;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _models.User.findByIdAndUpdate(userId, body, {
              "new": true
            });

          case 2:
            user = _context9.sent;

            if (user) {
              _context9.next = 5;
              break;
            }

            throw _httpErrors["default"].NotFound('Not found user.');

          case 5:
            return _context9.abrupt("return", user);

          case 6:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function updateById(_x11, _x12) {
    return _ref9.apply(this, arguments);
  };
}();
/**
 * Remove old avatar and update new avatar
 * @param {ObjectId} userId
 * @param {Object} avatar
 * @returns {Promise<User>}
 */


exports.updateById = updateById;

var updateProfilePic = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(userId, avatar) {
    var _user$profilePic;

    var user;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _models.User.findByIdAndUpdate(userId, avatar).select('+profilePic.id');

          case 2:
            user = _context10.sent;

            if (!((_user$profilePic = user.profilePic) !== null && _user$profilePic !== void 0 && _user$profilePic.id)) {
              _context10.next = 6;
              break;
            }

            _context10.next = 6;
            return _upload.uploadService.destroy(user.profilePic.id);

          case 6:
            return _context10.abrupt("return", user);

          case 7:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function updateProfilePic(_x13, _x14) {
    return _ref10.apply(this, arguments);
  };
}();
/**
 * Remove old coverPhoto and update new coverPhoto
 * @param {ObjectId} userId
 * @param {Object} coverPhoto
 * @returns {Promise<User>}
 */


exports.updateProfilePic = updateProfilePic;

var updateCoverPhoto = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(userId, coverPhoto) {
    var _user$coverPhoto;

    var user;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return _models.User.findByIdAndUpdate(userId, coverPhoto).select('+coverPhoto.id');

          case 2:
            user = _context11.sent;

            if (!((_user$coverPhoto = user.coverPhoto) !== null && _user$coverPhoto !== void 0 && _user$coverPhoto.id)) {
              _context11.next = 6;
              break;
            }

            _context11.next = 6;
            return _upload.uploadService.destroy(user.coverPhoto.id);

          case 6:
            return _context11.abrupt("return", user);

          case 7:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function updateCoverPhoto(_x15, _x16) {
    return _ref11.apply(this, arguments);
  };
}();
/**
 * Update password by userId
 * @param {ObjectId} userId
 * @param {Object} body
 * @returns {Promise<User>}
 */


exports.updateCoverPhoto = updateCoverPhoto;

var updateUserPasswordById = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(userId, body) {
    var user;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return getUserById(userId);

          case 2:
            user = _context12.sent;

            if (user) {
              _context12.next = 5;
              break;
            }

            throw _httpErrors["default"].NotFound();

          case 5:
            Object.assign(user, body);
            _context12.next = 8;
            return user.save();

          case 8:
            return _context12.abrupt("return", user);

          case 9:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));

  return function updateUserPasswordById(_x17, _x18) {
    return _ref12.apply(this, arguments);
  };
}();
/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<user>}
 */


exports.updateUserPasswordById = updateUserPasswordById;

var deleteUserById = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(userId) {
    var _user$coverPhoto2, _user$profilePic2;

    var user, result;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return getUserById(userId);

          case 2:
            user = _context13.sent;

            if (user) {
              _context13.next = 5;
              break;
            }

            throw _httpErrors["default"].NotFound();

          case 5:
            if (!((_user$coverPhoto2 = user.coverPhoto) !== null && _user$coverPhoto2 !== void 0 && _user$coverPhoto2.id)) {
              _context13.next = 8;
              break;
            }

            _context13.next = 8;
            return _upload.uploadService.destroy(user.coverPhoto.id);

          case 8:
            if (!((_user$profilePic2 = user.profilePic) !== null && _user$profilePic2 !== void 0 && _user$profilePic2.id)) {
              _context13.next = 11;
              break;
            }

            _context13.next = 11;
            return _upload.uploadService.destroy(user.profilePic.id);

          case 11:
            _context13.next = 13;
            return _post.postService.deletePosts({
              postedBy: user.id
            });

          case 13:
            _context13.next = 15;
            return user.remove();

          case 15:
            result = _context13.sent;
            return _context13.abrupt("return", result);

          case 17:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));

  return function deleteUserById(_x19) {
    return _ref13.apply(this, arguments);
  };
}();

exports.deleteUserById = deleteUserById;