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
router.route('/').post((0, _middlewares.auth)(), _middlewares.uploadStorage.single('image'), _middlewares.uploadImage, (0, _middlewares.validate)(_validations.commentValidation.createComment), _controllers.commentController.createComment).get((0, _middlewares.validate)(_validations.commentValidation.getComments), _controllers.commentController.getComments);
router.patch('/:commentId/like', (0, _middlewares.auth)(), (0, _middlewares.validate)(_validations.commentValidation.commentId), _controllers.commentController.likeComment);
router.route('/:commentId').get((0, _middlewares.validate)(_validations.commentValidation.getComment), _controllers.commentController.getComment).patch((0, _middlewares.auth)(), (0, _middlewares.validate)(_validations.commentValidation.updateComment), _controllers.commentController.updateComment)["delete"]((0, _middlewares.auth)(), (0, _middlewares.validate)(_validations.commentValidation.deleteComment), _controllers.commentController.deleteComment);
var _default = router;
exports["default"] = _default;