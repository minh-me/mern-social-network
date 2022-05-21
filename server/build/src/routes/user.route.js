"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _validations = require("../validations");

var _middlewares = require("../middlewares");

var _controllers = require("../controllers");

var router = new _express.Router();
router.route('/profile').get((0, _middlewares.auth)(), _controllers.userController.getProfile).patch((0, _middlewares.auth)(), (0, _middlewares.validate)(_validations.userValidation.updateProfile), _controllers.userController.updateProfile);
router.get('/:username/username', (0, _middlewares.auth)(), (0, _middlewares.validate)(_validations.userValidation.getUserByUsername), _controllers.userController.getUserByUsername);
router.patch('/:userId/following', (0, _middlewares.auth)(), (0, _middlewares.validate)(_validations.userValidation.userId), _controllers.userController.follow);
router.route('/').post((0, _middlewares.auth)('admin'), (0, _middlewares.validate)(_validations.userValidation.createUser), _controllers.userController.createUser).get((0, _middlewares.auth)(), (0, _middlewares.validate)(_validations.userValidation.getUsers), _controllers.userController.getUsers);
router.route('/:userId').get((0, _middlewares.validate)(_validations.userValidation.getUser), _controllers.userController.getUser).patch((0, _middlewares.auth)('admin'), (0, _middlewares.validate)(_validations.userValidation.updateUser), _controllers.userController.updateUser)["delete"]((0, _middlewares.auth)('admin'), (0, _middlewares.validate)(_validations.userValidation.userId), _controllers.userController.deleteUser);
var _default = router;
exports["default"] = _default;