"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userId = exports.updateUser = exports.updateProfile = exports.getUsers = exports.getUserByUsername = exports.getUser = exports.createUser = void 0;

var yup = _interopRequireWildcard(require("yup"));

var _en = require("../_lang/en");

var _config = _interopRequireDefault(require("./config.validation"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var createUser = {
  name: yup.string().trim().min(2).required(),
  email: yup.string().required().email(),
  dateOfBirth: yup.date(),
  password: yup.string().matches(_config["default"].regexPassword, _en.transValidations.password_incorrect).required()
};
exports.createUser = createUser;
var getUsers = {
  search: yup.string(),
  name: yup.string(),
  email: yup.string().email(),
  username: yup.string(),
  role: yup.string(),
  page: yup.number().integer(),
  limit: yup.number().integer(),
  sort: yup.string(),
  select: yup.string()
};
exports.getUsers = getUsers;
var getUser = {
  userId: yup.string().matches(_config["default"].regexObjectId, _en.transValidations.objectId_type_incorrect).required()
};
exports.getUser = getUser;
var getUserByUsername = {
  username: yup.string().required()
};
exports.getUserByUsername = getUserByUsername;
var updateUser = {
  userId: yup.string().matches(_config["default"].regexObjectId, _en.transValidations.objectId_type_incorrect).required(),
  name: yup.string(),
  email: yup.string().email(),
  dateOfBirth: yup.date(),
  checkbox_selection: yup.string().when(['name', 'email'], {
    is: function is(name, email) {
      return !name && !email;
    },
    then: yup.string().required()
  })
};
exports.updateUser = updateUser;
var userId = {
  userId: yup.string().matches(_config["default"].regexObjectId, _en.transValidations.objectId_type_incorrect).required()
};
exports.userId = userId;
var updateProfile = {
  name: yup.string(),
  email: yup.string().email(),
  dateOfBirth: yup.date(),
  name_or_email: yup.string().when(['name', 'email', 'dateOfBirth'], {
    is: function is(name, email, dateOfBirth) {
      return !name && !email && !dateOfBirth;
    },
    then: yup.string().required()
  })
};
exports.updateProfile = updateProfile;