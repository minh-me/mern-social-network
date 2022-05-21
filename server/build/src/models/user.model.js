"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _config = require("../config");

var _en = require("../_lang/en");

var _plugins = require("./plugins");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
var passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
var userSchema = (0, _mongoose.Schema)({
  name: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [emailRegex, _en.transValidations.email_incorrect]
  },
  password: {
    type: String,
    trim: true,
    match: [passwordRegex, _en.transValidations.password_incorrect],
    select: false
  },
  role: {
    type: String,
    "enum": _config.roles,
    "default": 'user'
  },
  dateOfBirth: {
    type: Date
  },
  coverPhoto: {
    id: {
      type: String,
      select: false
    },
    url: String,
    pc: String,
    mobile: String
  },
  profilePic: {
    type: {
      id: {
        type: String,
        select: false
      },
      url: String
    },
    "default": {
      url: 'https://res.cloudinary.com/dvnmolznq/image/upload/v1651309698/avatar/h65dgi9kmuusnuzoi5pb.png'
    }
  },
  googleId: {
    type: String,
    index: true
  },
  likes: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
  following: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  followers: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function transform(doc, ret) {
      delete ret.password;
      return ret;
    }
  }
});
userSchema.pre('save', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(next) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!this.isModified('password')) {
              _context.next = 4;
              break;
            }

            _context.next = 3;
            return _bcryptjs["default"].hash(this.password, 8);

          case 3:
            this.password = _context.sent;

          case 4:
            if (this.isModified('email')) {
              this.username = this.email.split('@')[0];
            }

            next();

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
userSchema.methods = {
  /**
   * Check if password matches the user's password
   * @param {string} password
   * @returns {Promise<boolean>}
   */
  isPasswordMatch: function isPasswordMatch(password) {
    var _this = this;

    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", _bcryptjs["default"].compare(password, _this.password));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  }
}; // add plugin that converts mongoose to json

userSchema.plugin(_plugins.toJSON);
userSchema.plugin(_plugins.paginate);
userSchema.index({
  name: 'text',
  email: 'text',
  username: 'text'
});
/**
 * @typedef User
 */

var User = _mongoose["default"].model('User', userSchema);

exports.User = User;