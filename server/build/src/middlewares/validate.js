"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _yup = require("yup");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var validate = function validate(schema) {
  return function (req, res, next) {
    try {
      var obj = _objectSpread(_objectSpread(_objectSpread({}, req.body), req.params), req.query);

      var value = (0, _yup.object)(schema).noUnknown().validateSync(obj, {
        abortEarly: false,
        stripUnknown: false
      });
      Object.assign(req, value);
      return next();
    } catch (err) {
      console.log({
        err: err.name,
        errors: err.errors
      });
      return res.status(400).json({
        code: 400,
        name: err.name,
        error: err.errors
      });
    }
  };
};

exports.validate = validate;