"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePostById = exports.queryPosts = exports.getPostById = exports.deletePosts = exports.deletePostById = exports.createPost = void 0;

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
 * Create new post
 * @param {Object} body
 * @returns {Promise<Post>}
 */
var createPost = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(postBody) {
    var newPost;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _models.Post.create(postBody);

          case 2:
            newPost = _context.sent;
            return _context.abrupt("return", newPost);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createPost(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Get posts by query(filter, options)
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<{posts: Post[], info: Info}>}
 */


exports.createPost = createPost;

var queryPosts = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(filter, options) {
    var customLabels, posts;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            customLabels = {
              docs: 'posts',
              page: 'page',
              totalPages: 'totalPages',
              limit: 'limit'
            };
            options = _objectSpread(_objectSpread({}, options), {}, {
              customLabels: customLabels
            });
            _context2.next = 4;
            return _models.Post.paginate(filter, options);

          case 4:
            posts = _context2.sent;
            return _context2.abrupt("return", posts);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function queryPosts(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Find post by id
 * @param {ObjectId} postId
 * @returns {Promise<Post>}
 */


exports.queryPosts = queryPosts;

var getPostById = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(postId) {
    var post;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _models.Post.findById(postId);

          case 2:
            post = _context3.sent;
            return _context3.abrupt("return", post);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getPostById(_x4) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * Update post by id
 * @param {ObjectId} postId
 * @param {PostBody} body
 * @returns {Promise<Post>}
 */


exports.getPostById = getPostById;

var updatePostById = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(postId, body) {
    var post;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _models.Post.findByIdAndUpdate(postId, body, {
              "new": true
            });

          case 2:
            post = _context4.sent;

            if (post) {
              _context4.next = 5;
              break;
            }

            throw new _httpErrors["default"].NotFound('Not found post.');

          case 5:
            return _context4.abrupt("return", post);

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updatePostById(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * Delete post by id
 * @param {ObjectId} postId
 * @returns {Promise<Post>}
 */


exports.updatePostById = updatePostById;

var deletePostById = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(postId) {
    var _post$image;

    var post;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _models.Post.findByIdAndDelete(postId).select('+image.id');

          case 2:
            post = _context5.sent;

            // Remove image in cloudinary
            if (post !== null && post !== void 0 && (_post$image = post.image) !== null && _post$image !== void 0 && _post$image.id) {
              uploadService.destroy(post.image.id);
            }

            if (post) {
              _context5.next = 6;
              break;
            }

            throw new _httpErrors["default"].NotFound('Not found post.');

          case 6:
            return _context5.abrupt("return", post);

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function deletePostById(_x7) {
    return _ref5.apply(this, arguments);
  };
}();
/**
 * Delete many posts
 * @param {Object} filter
 * @returns {Promise<{acknowledged: boolean, deletedCount: number}>}
 */


exports.deletePostById = deletePostById;

var deletePosts = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(filter) {
    var posts, result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _models.Post.find(filter).select('+image.id');

          case 2:
            posts = _context6.sent;
            // Remove images in cloudinary
            posts.forEach(function (post) {
              var _post$image2;

              if (post !== null && post !== void 0 && (_post$image2 = post.image) !== null && _post$image2 !== void 0 && _post$image2.id) {
                uploadService.destroy(post.image.id);
              }
            });
            _context6.next = 6;
            return _models.Post.deleteMany(filter);

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

  return function deletePosts(_x8) {
    return _ref6.apply(this, arguments);
  };
}();

exports.deletePosts = deletePosts;