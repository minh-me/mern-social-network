"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Post = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _plugins = require("./plugins");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var postSchema = (0, _mongoose.Schema)({
  text: String,
  image: {
    url: String,
    id: String,
    thumb1: String,
    thumb2: String,
    main: String
  },
  postedBy: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  pinned: {
    type: Boolean,
    "default": false
  },
  likes: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  retweetUsers: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  retweetData: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  comments: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, {
  timestamps: true
}); // add plugin that converts mongoose to json

postSchema.plugin(_plugins.toJSON);
postSchema.plugin(_plugins.paginate); // Indexs

postSchema.index({
  text: 'text'
});
/**
 * @typedef Post
 */

var Post = _mongoose["default"].model('Post', postSchema);

exports.Post = Post;