"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userValidation = exports.postValidation = exports.notificationValidation = exports.messageValidation = exports.commentValidation = exports.chatValidation = exports.authValidation = void 0;

var _authValidation = _interopRequireWildcard(require("./auth.validation"));

exports.authValidation = _authValidation;

var _userValidation = _interopRequireWildcard(require("./user.validation"));

exports.userValidation = _userValidation;

var _postValidation = _interopRequireWildcard(require("./post.validation"));

exports.postValidation = _postValidation;

var _notificationValidation = _interopRequireWildcard(require("./notification.validation"));

exports.notificationValidation = _notificationValidation;

var _commentValidation = _interopRequireWildcard(require("./comment.validation"));

exports.commentValidation = _commentValidation;

var _messageValidation = _interopRequireWildcard(require("./message.validation"));

exports.messageValidation = _messageValidation;

var _chatValidation = _interopRequireWildcard(require("./chat.validation"));

exports.chatValidation = _chatValidation;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }