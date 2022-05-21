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
router.route('/').post((0, _middlewares.auth)(), _middlewares.uploadStorage.single('image'), _middlewares.uploadPostImage, (0, _middlewares.validate)(_validations.postValidation.createPost), _controllers.postController.createPost).get((0, _middlewares.validate)(_validations.postValidation.getPosts), _controllers.postController.getPosts);
router.patch('/:postId/like', (0, _middlewares.auth)(), (0, _middlewares.validate)(_validations.postValidation.postIdParams), _controllers.postController.likePost);
router.route('/:postId').get((0, _middlewares.validate)(_validations.postValidation.getPost), _controllers.postController.getPost).patch((0, _middlewares.auth)(), (0, _middlewares.validate)(_validations.postValidation.updatePost), _controllers.postController.updatePost)["delete"]((0, _middlewares.auth)(), (0, _middlewares.validate)(_validations.postValidation.deletePost), _controllers.postController.deletePost);
var _default = router;
exports["default"] = _default;