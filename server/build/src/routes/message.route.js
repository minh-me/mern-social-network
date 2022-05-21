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
router.route('/').post((0, _middlewares.auth)(), _middlewares.uploadStorage.single('image'), _middlewares.uploadImage, (0, _middlewares.validate)(_validations.messageValidation.createMessage), _controllers.messageController.createMessage).get((0, _middlewares.auth)(), (0, _middlewares.validate)(_validations.messageValidation.getMessages), _controllers.messageController.getMessages);
router.route('/:messageId').get((0, _middlewares.auth)(), (0, _middlewares.validate)(_validations.messageValidation.getMessage), _controllers.messageController.getMessage).patch((0, _middlewares.auth)(), (0, _middlewares.validate)(_validations.messageValidation.updateMessage), _controllers.messageController.updateMessage)["delete"]((0, _middlewares.auth)(), (0, _middlewares.validate)(_validations.messageValidation.deleteMessage), _controllers.messageController.deleteMessage);
var _default = router;
exports["default"] = _default;