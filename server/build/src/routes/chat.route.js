"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _middlewares = require("../middlewares");

var _validations = require("../validations");

var _controllers = require("../controllers");

var router = new _express.Router();
router.route('/').post((0, _middlewares.auth)(), (0, _middlewares.validate)(_validations.chatValidation.createChat), _controllers.chatController.createChat).get((0, _middlewares.auth)(), (0, _middlewares.validate)(_validations.chatValidation.getChats), _controllers.chatController.getChats);
router.route('/:userId/user').get((0, _middlewares.auth)(), (0, _middlewares.validate)(_validations.chatValidation.getChatByUserId), _controllers.chatController.getChatByUserId);
router.route('/:chatId').get((0, _middlewares.auth)(), (0, _middlewares.validate)(_validations.chatValidation.getChat), _controllers.chatController.getChat).patch((0, _middlewares.auth)(), (0, _middlewares.validate)(_validations.chatValidation.updateChat), _controllers.chatController.updateChat)["delete"]((0, _middlewares.auth)(), (0, _middlewares.validate)(_validations.chatValidation.deleteChat), _controllers.chatController.deleteChat);
var _default = router;
exports["default"] = _default;