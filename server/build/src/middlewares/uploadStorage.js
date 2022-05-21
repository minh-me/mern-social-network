"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadStorage = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _config = require("../config");

var storage = _multer["default"].diskStorage({
  // destination
  destination: function destination(req, file, cb) {
    cb(null, _config.config.app.upload_directory);
  },
  // filename
  filename: function filename(req, file, cb) {
    cb(null, "".concat(file.fieldname, "-").concat(Date.now(), "-").concat(file.originalname));
  }
});

var fileFilter = function fileFilter(req, file, cb) {
  cb(null, true);
};

var uploadStorage = (0, _multer["default"])({
  storage: storage,
  fileFilter: fileFilter
});
exports.uploadStorage = uploadStorage;