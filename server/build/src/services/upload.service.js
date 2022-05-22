"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadPostImage = exports.uploadImageMessage = exports.uploadImageComment = exports.uploadCoverPhoto = exports.uploadAvatar = exports.upload = exports.reSizeImage = exports.destroy = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _fs = _interopRequireDefault(require("fs"));

var _config = require("../config");

// Config cloudinary
_cloudinary["default"].v2.config(_config.config.cloudinaryV2);
/**
 * Upload file to cloudinary
 * @param {string} path link to file image in local
 * @param {string} folder store in cloudinary
 */


var upload = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(path, options) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options.transformation = [{
              quality: 60
            }];
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              _cloudinary["default"].v2.uploader.upload(path, options, function (err, result) {
                if (err) return reject(err);

                _fs["default"].unlinkSync(path);

                return resolve(result);
              });
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function upload(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
 *
 * @param {string} cloudinary_id
 * @param {number} height
 * @param {number} width
 * @returns {string}
 */


exports.upload = upload;

var reSizeImage = function reSizeImage(cloudinary_id, width, height) {
  return _cloudinary["default"].url(cloudinary_id, {
    height: height,
    width: width,
    crop: 'scale',
    format: 'jpg'
  });
};
/**
 * Upload file to cloudinary
 * @param {string} path link to file image in local
 *  @returns {Promise<url>}
 */


exports.reSizeImage = reSizeImage;

var uploadAvatar = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(path) {
    var options, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            options = {
              folder: 'avatar',
              width: 150,
              height: 150,
              crop: 'fill'
            };
            _context2.next = 3;
            return upload(path, options);

          case 3:
            result = _context2.sent;
            return _context2.abrupt("return", {
              url: result.secure_url,
              id: result.public_id
            });

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function uploadAvatar(_x3) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Upload file to cloudinary
 * @param {string} path link to file image in local
 *  @returns {Promise<url>}
 */


exports.uploadAvatar = uploadAvatar;

var uploadCoverPhoto = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(path) {
    var options, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            options = {
              folder: 'cover_images',
              crop: 'fill'
            };
            _context3.next = 3;
            return upload(path, options);

          case 3:
            result = _context3.sent;
            return _context3.abrupt("return", {
              url: result.secure_url,
              pc: reSizeImage(result.public_id, 820, 312),
              mobile: reSizeImage(result.public_id, 640, 360),
              id: result.public_id
            });

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function uploadCoverPhoto(_x4) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * Upload file to cloudinary
 * @param {string} path link to file image in local
 *  @returns {Promise<url>}
 */


exports.uploadCoverPhoto = uploadCoverPhoto;

var uploadPostImage = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(path) {
    var options, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            options = {
              folder: 'posts/images',
              width: 480,
              crop: 'fill'
            };
            _context4.next = 3;
            return upload(path, options);

          case 3:
            result = _context4.sent;
            return _context4.abrupt("return", {
              url: result.secure_url,
              id: result.public_id
            });

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function uploadPostImage(_x5) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * Upload file to cloudinary
 * @param {string} path link to file image in local
 *  @returns {Promise<url>}
 */


exports.uploadPostImage = uploadPostImage;

var uploadImageComment = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(path) {
    var options, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            options = {
              folder: 'messages/images',
              width: 400,
              crop: 'fill'
            };
            _context5.next = 3;
            return upload(path, options);

          case 3:
            result = _context5.sent;
            return _context5.abrupt("return", {
              url: result.secure_url,
              id: result.public_id
            });

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function uploadImageComment(_x6) {
    return _ref5.apply(this, arguments);
  };
}();
/**
 * Upload file to cloudinary
 * @param {string} path link to file image in local
 *  @returns {Promise<url>}
 */


exports.uploadImageComment = uploadImageComment;

var uploadImageMessage = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(path) {
    var options, result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            options = {
              folder: 'messages/images',
              width: 300,
              crop: 'fill'
            };
            _context6.next = 3;
            return upload(path, options);

          case 3:
            result = _context6.sent;
            return _context6.abrupt("return", {
              url: result.secure_url,
              id: result.public_id
            });

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function uploadImageMessage(_x7) {
    return _ref6.apply(this, arguments);
  };
}();
/**
 * Remove image uploaded in cloudinary
 * @param {string} cloudinary_id
 * @returns
 */


exports.uploadImageMessage = uploadImageMessage;

var destroy = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(cloudinary_id) {
    var result;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            result = _cloudinary["default"].uploader.destroy(cloudinary_id);
            return _context7.abrupt("return", result);

          case 2:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function destroy(_x8) {
    return _ref7.apply(this, arguments);
  };
}();

exports.destroy = destroy;