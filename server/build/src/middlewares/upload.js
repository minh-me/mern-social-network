"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadPostImage = exports.uploadImage = exports.upload = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _config = require("../config");

var _en = require("../_lang/en");

var upload = function upload(req, res, next) {
  // check file exist
  // req.file is the `image` file
  // req.body will hold the text fields, if there were any
  if (typeof req.file === 'undefined' || typeof req.body === 'undefined') throw new _httpErrors["default"].BadRequest(_en.transErrors.upload_issue); // app use upload

  var image = req.file.path; // file type

  if (!_config.config.app.image_types.includes(req.file.mimetype)) {
    // remove file
    _fs["default"].unlinkSync(image);

    throw new _httpErrors["default"].BadRequest(_en.transErrors.upload_not_supported);
  } // file size


  if (req.file.size > _config.config.app.upload_limit_size) {
    // remove file
    _fs["default"].unlinkSync(image);

    throw new _httpErrors["default"].BadRequest(_en.transErrors.upload_limit_size);
  } // success


  next();
};

exports.upload = upload;

var uploadPostImage = function uploadPostImage(req, res, next) {
  if (typeof req.file === 'undefined' && typeof req.body === 'undefined') throw new _httpErrors["default"].BadRequest(_en.transErrors.upload_issue);

  if (req.file) {
    var image = req.file.path;

    if (!_config.config.app.image_types.includes(req.file.mimetype)) {
      _fs["default"].unlinkSync(image);

      throw new _httpErrors["default"].BadRequest(_en.transErrors.upload_not_supported);
    }

    if (req.file.size > _config.config.app.upload_limit_size) {
      _fs["default"].unlinkSync(image);

      throw new _httpErrors["default"].BadRequest(_en.transErrors.upload_limit_size);
    }
  }

  next();
};

exports.uploadPostImage = uploadPostImage;

var uploadImage = function uploadImage(req, res, next) {
  if (typeof req.file === 'undefined' && typeof req.body === 'undefined') throw new _httpErrors["default"].BadRequest(_en.transErrors.upload_issue);
  if (typeof req.file === 'undefined' && !req.body.text) throw new _httpErrors["default"].BadRequest('Please enter content comment.');

  if (req.file) {
    var image = req.file.path;

    if (!_config.config.app.image_types.includes(req.file.mimetype)) {
      _fs["default"].unlinkSync(image);

      throw new _httpErrors["default"].BadRequest(_en.transErrors.upload_not_supported);
    }

    if (req.file.size > _config.config.app.upload_limit_size) {
      _fs["default"].unlinkSync(image);

      throw new _httpErrors["default"].BadRequest(_en.transErrors.upload_limit_size);
    }
  }

  next();
};

exports.uploadImage = uploadImage;