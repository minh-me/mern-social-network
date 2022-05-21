"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _controllers = require("../controllers");

var _middlewares = require("../middlewares");

var _validations = require("../validations");

var router = new _express.Router();
router.post('/register', (0, _middlewares.validate)(_validations.userValidation.createUser), _controllers.authController.register);
router.post('/activation', (0, _middlewares.validate)(_validations.authValidation.activate), _controllers.authController.activate);
router.post('/login', (0, _middlewares.validate)(_validations.authValidation.login), _controllers.authController.login);
router.post('/google', (0, _middlewares.validate)(_validations.authValidation.google), _controllers.authController.google);
router.get('/rf_token', _controllers.authController.getRefreshToken);
router.post('/forgot_pass', (0, _middlewares.validate)(_validations.authValidation.forgotPassword), _controllers.authController.forgotPassword);
router.post('/reset_pass', (0, _middlewares.auth)(), (0, _middlewares.validate)(_validations.authValidation.resetPassword), _controllers.authController.resetPassword);
router.post('/logout', (0, _middlewares.auth)(), _controllers.authController.logout);
var _default = router;
exports["default"] = _default;