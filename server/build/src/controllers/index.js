"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userController = exports.uploadController = exports.postController = exports.notificationController = exports.messageController = exports.commentController = exports.chatController = exports.authController = void 0;

var _authController = _interopRequireWildcard(require("./auth.controller"));

exports.authController = _authController;

var _userController = _interopRequireWildcard(require("./user.controller"));

exports.userController = _userController;

var _uploadController = _interopRequireWildcard(require("./upload.controller"));

exports.uploadController = _uploadController;

var _postController = _interopRequireWildcard(require("./post.controller"));

exports.postController = _postController;

var _chatController = _interopRequireWildcard(require("./chat.controller"));

exports.chatController = _chatController;

var _messageController = _interopRequireWildcard(require("./message.controller"));

exports.messageController = _messageController;

var _commentController = _interopRequireWildcard(require("./comment.controller"));

exports.commentController = _commentController;

var _notificationController = _interopRequireWildcard(require("./notification.controller"));

exports.notificationController = _notificationController;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }