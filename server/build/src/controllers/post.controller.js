"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePost = exports.likePost = exports.getPosts = exports.getPost = exports.deletePost = exports.createPost = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _pick = _interopRequireDefault(require("../utils/pick"));

var _catchAsync = _interopRequireDefault(require("../utils/catchAsync"));

var _services = require("../services");

/**
 * Create a post
 * @POST api/posts/
 * @access private
 */
var createPost = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var item, url, post;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            item = req.body;

            if (!req.file) {
              _context.next = 6;
              break;
            }

            _context.next = 4;
            return _services.uploadService.uploadPostImage(req.file.path);

          case 4:
            url = _context.sent;
            item.image = url;

          case 6:
            item.postedBy = req.user.id;
            _context.next = 9;
            return _services.postService.createPost(item);

          case 9:
            post = _context.sent;
            res.status(201).json(post);

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
 * Get all posts
 * @GET api/posts
 * @access public
 */

exports.createPost = createPost;
var getPosts = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var filter, options, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            filter = (0, _pick["default"])(req.query, ['text', 'search', 'postedBy']);
            options = (0, _pick["default"])(req.query, ['sort', 'select', 'limit', 'page']);
            options.populate = 'postedBy';
            _context2.next = 5;
            return _services.postService.queryPosts(filter, options);

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
 * Get a post by post id
 * @GET api/posts/:postId
 * @access public
 */

exports.getPosts = getPosts;
var getPost = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var post;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _services.postService.getPostById(req.params.postId);

          case 2:
            post = _context3.sent;

            if (post) {
              _context3.next = 5;
              break;
            }

            throw _httpErrors["default"].NotFound();

          case 5:
            res.send(post);

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
 * Update a post by postId
 * @PATCH api/posts/:postId
 * @access private
 */

exports.getPost = getPost;
var updatePost = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var post;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _services.postService.updatePostById(req.params.postId, req.body);

          case 2:
            post = _context4.sent;
            res.send(post);

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
 * Like post
 * @Patch api/posts/:postId/like
 * @access private
 */

exports.updatePost = updatePost;
var likePost = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var postId, user, isLiked, options, updatedPost, userUpdated;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            postId = req.params.postId;
            user = req.user; // Check user is liked post

            isLiked = user.likes && user.likes.includes(postId);
            options = isLiked ? '$pull' : '$addToSet'; // Update post

            _context5.next = 6;
            return _services.postService.updatePostById(postId, (0, _defineProperty2["default"])({}, options, {
              likes: user.id
            }));

          case 6:
            updatedPost = _context5.sent;
            _context5.next = 9;
            return _services.userService.updateById(user.id, (0, _defineProperty2["default"])({}, options, {
              likes: postId
            }));

          case 9:
            userUpdated = _context5.sent;
            // Update user in request
            req.user = userUpdated; // Create notification

            if (!(!isLiked && updatedPost.postedBy._id !== user.id)) {
              _context5.next = 14;
              break;
            }

            _context5.next = 14;
            return _services.notificationService.createNotificationLikePost(user.id, updatedPost.postedBy._id, updatedPost._id);

          case 14:
            // Success
            res.send(updatedPost);

          case 15:
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
 * Delete post by postId
 * @DELETE api/posts/:postId
 * @access private
 */

exports.likePost = likePost;
var deletePost = (0, _catchAsync["default"])( /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var post;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _services.postService.deletePostById(req.params.postId);

          case 2:
            post = _context6.sent;
            _context6.next = 5;
            return _services.commentService.deleteMany({
              post: post.id
            });

          case 5:
            res.send(post);

          case 6:
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
exports.deletePost = deletePost;