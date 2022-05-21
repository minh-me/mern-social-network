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
router.route('/').post((0, _middlewares.validate)(_validations.notificationValidation.createNotification), _controllers.notificationController.createNotification).get((0, _middlewares.auth)(), (0, _middlewares.validate)(_validations.notificationValidation.getNotifications), _controllers.notificationController.getNotifications);
router.get('/count', (0, _middlewares.auth)(), (0, _middlewares.validate)(_validations.notificationValidation.count), _controllers.notificationController.count);
router.patch('/update-many', (0, _middlewares.auth)(), (0, _middlewares.validate)(_validations.notificationValidation.updateNotifications), _controllers.notificationController.updateMany);
router.route('/:notificationId').get((0, _middlewares.auth)(), (0, _middlewares.validate)(_validations.notificationValidation.getNotification), _controllers.notificationController.getNotification).patch((0, _middlewares.auth)(), (0, _middlewares.validate)(_validations.notificationValidation.updateNotification), _controllers.notificationController.updateNotification)["delete"]((0, _middlewares.auth)(), (0, _middlewares.validate)(_validations.notificationValidation.deleteNotification), _controllers.notificationController.deleteNotification);
var _default = router;
exports["default"] = _default;