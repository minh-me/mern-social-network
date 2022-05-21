"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandler = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _httpErrors = _interopRequireWildcard(require("http-errors"));

var _config = require("../config");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var errorHandler = function errorHandler(err, req, res, next) {
  var error = _objectSpread({}, err);

  error.message = err.message; // Log to console for dev

  _config.logger.error(err);

  if (err instanceof _httpErrors.HttpError) {
    error.statusCode = err.statusCode;
  }

  if (err.name === 'CastError') {
    // Mongoose bad ObjectId
    var message = "Resource not found";
    error = new _httpErrors["default"].NotFound(message);
  } // Mongoose duplicate key


  if (err.code === 11000) {
    var _message = 'Duplicate field value entered';
    error = new _httpErrors["default"].BadRequest(_message);
  } // Mongoose validation error


  if (err.name === 'ValidationError') {
    var _message2 = Object.values(err.errors).map(function (val) {
      return val.message;
    });

    error = new _httpErrors["default"].BadRequest(_message2);
  }

  res.status(error.statusCode || 500).json({
    name: err.name,
    code: error.statusCode || 500,
    error: error.statusCode && error.message || _httpErrors["default"].InternalServerError().message
  });
};

exports.errorHandler = errorHandler;