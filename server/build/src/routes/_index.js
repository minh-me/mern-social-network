"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = _interopRequireDefault(require("./auth.route"));

var _user = _interopRequireDefault(require("./user.route"));

var _upload = _interopRequireDefault(require("./upload.route"));

var _chat = _interopRequireDefault(require("./chat.route"));

var _post = _interopRequireDefault(require("./post.route"));

var _notification = _interopRequireDefault(require("./notification.route"));

var _message = _interopRequireDefault(require("./message.route"));

var _comment = _interopRequireDefault(require("./comment.route"));

var router = new _express.Router();
var defaultRoutes = [{
  path: '/chats',
  route: _chat["default"]
}, {
  path: '/posts',
  route: _post["default"]
}, {
  path: '/comments',
  route: _comment["default"]
}, {
  path: '/notifications',
  route: _notification["default"]
}, {
  path: '/messages',
  route: _message["default"]
}, {
  path: '/uploads',
  route: _upload["default"]
}, {
  path: '/auth',
  route: _auth["default"]
}, {
  path: '/users',
  route: _user["default"]
}];
defaultRoutes.forEach(function (route) {
  router.use(route.path, route.route);
});
var _default = router;
exports["default"] = _default;