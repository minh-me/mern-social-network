"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCommentById = exports.queryComments = exports.getCommentById = exports.deleteMany = exports.deleteCommentById = exports.createComment = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _models = require("../models");

var uploadService = _interopRequireWildcard(require("./upload.service"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

/**
 * Get comments by query(filter, options)
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<comments>}
 */
var queryComments = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(filter, options) {
    var customLabels, comments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            customLabels = {
              docs: 'comments',
              page: 'page',
              totalPages: 'totalPages',
              limit: 'limit'
            };
            options = _objectSpread(_objectSpread({}, options), {}, {
              customLabels: customLabels
            });
            _context.next = 4;
            return _models.Comment.paginate(filter, options);

          case 4:
            comments = _context.sent;
            return _context.abrupt("return", comments);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function queryComments(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Find comment by id
 * @param {ObjectId} commentId
 * @returns {Promise<comment>}
 */


exports.queryComments = queryComments;

var getCommentById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(commentId) {
    var comment;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _models.Comment.findById(commentId);

          case 2:
            comment = _context2.sent;

            if (!comment) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", comment);

          case 5:
            throw _httpErrors["default"].NotFound('Not found comment.');

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getCommentById(_x3) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Create comment
 * @param {Object} body
 * @returns {Promise<comment>}
 */


exports.getCommentById = getCommentById;

var createComment = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(commentBody) {
    var newComment;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _models.Comment.create(commentBody);

          case 2:
            newComment = _context3.sent;
            return _context3.abrupt("return", newComment);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function createComment(_x4) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * Update comment by id
 * @param {ObjectId} commentId
 * @param {Object} body
 * @returns {Promise<comment>}
 */


exports.createComment = createComment;

var updateCommentById = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(commentId, body) {
    var comment;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _models.Comment.findByIdAndUpdate(commentId, body, {
              "new": true
            });

          case 2:
            comment = _context4.sent;

            if (comment) {
              _context4.next = 5;
              break;
            }

            throw new _httpErrors["default"].NotFound('Not found comment.');

          case 5:
            return _context4.abrupt("return", comment);

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateCommentById(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * Delete comment by id
 * @param {ObjectId} commentId
 * @returns {Promise<comment>}
 */


exports.updateCommentById = updateCommentById;

var deleteCommentById = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(commentId) {
    var _comment$image;

    var comment;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _models.Comment.findByIdAndDelete(commentId);

          case 2:
            comment = _context5.sent;
            console.log({
              comment: comment
            });

            if (comment !== null && comment !== void 0 && (_comment$image = comment.image) !== null && _comment$image !== void 0 && _comment$image.id) {
              uploadService.destroy(comment.image.id);
            }

            if (comment) {
              _context5.next = 7;
              break;
            }

            throw new _httpErrors["default"].NotFound('Not found comment.');

          case 7:
            return _context5.abrupt("return", comment);

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function deleteCommentById(_x7) {
    return _ref5.apply(this, arguments);
  };
}();
/**
 * Delete comment by id
 * @param {Object} filter
 * @returns {Promise<result>}
 */


exports.deleteCommentById = deleteCommentById;

var deleteMany = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(filter) {
    var comments, result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _models.Comment.find(filter);

          case 2:
            comments = _context6.sent;
            comments.forEach(function (comment) {
              var _comment$image2;

              if (comment !== null && comment !== void 0 && (_comment$image2 = comment.image) !== null && _comment$image2 !== void 0 && _comment$image2.id) {
                uploadService.destroy(comment.image.id);
              }
            });
            _context6.next = 6;
            return _models.Comment.deleteMany(filter);

          case 6:
            result = _context6.sent;
            return _context6.abrupt("return", result);

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function deleteMany(_x8) {
    return _ref6.apply(this, arguments);
  };
}();

exports.deleteMany = deleteMany;