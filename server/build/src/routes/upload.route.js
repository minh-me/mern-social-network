"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _middlewares = require("../middlewares");

var _controllers = require("../controllers");

var router = new _express.Router();
router.post('/avatar', (0, _middlewares.auth)(), _middlewares.uploadStorage.single('avatar'), _middlewares.upload, _controllers.uploadController.uploadAvatar);
router.post('/cover_photo', (0, _middlewares.auth)(), _middlewares.uploadStorage.single('coverPhoto'), _middlewares.upload, _controllers.uploadController.uploadCoverPhoto);
router.post('/image_comment', (0, _middlewares.auth)(), _middlewares.uploadStorage.single('imageComment'), _middlewares.upload, _controllers.uploadController.uploadImageComment);
var _default = router;
exports["default"] = _default;