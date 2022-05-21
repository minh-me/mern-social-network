"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadImageComment = exports.uploadCoverPhoto = exports.uploadAvatar = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _catchAsync = _interopRequireDefault(require("../utils/catchAsync"));

var _services = require("../services");

/**
 * Upload avatar
 * @POST api/uploads/avatar
 * @access private
 */
var uploadAvatar = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var avatar;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _services.uploadService.uploadAvatar(req.file.path);

          case 2:
            avatar = _context.sent;
            _context.next = 5;
            return _services.userService.updateProfilePic(req.user.id, {
              profilePic: avatar
            });

          case 5:
            return _context.abrupt("return", res.send({
              url: avatar.url
            }));

          case 6:
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
 * Upload cover photo
 * @POST api/uploads/cover_photo
 * @access private
 */

exports.uploadAvatar = uploadAvatar;
var uploadCoverPhoto = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var coverPhoto;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _services.uploadService.uploadCoverPhoto(req.file.path);

          case 2:
            coverPhoto = _context2.sent;
            _context2.next = 5;
            return _services.userService.updateCoverPhoto(req.user.id, {
              coverPhoto: coverPhoto
            });

          case 5:
            return _context2.abrupt("return", res.send({
              url: coverPhoto.url
            }));

          case 6:
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
 * Upload cover photo
 * @POST api/uploads/cover_photo
 * @access private
 */

exports.uploadCoverPhoto = uploadCoverPhoto;
var uploadImageComment = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var image;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _services.uploadService.uploadImageComment(req.file.path);

          case 2:
            image = _context3.sent;
            return _context3.abrupt("return", res.send(image));

          case 4:
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
exports.uploadImageComment = uploadImageComment;