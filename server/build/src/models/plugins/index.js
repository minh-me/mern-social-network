"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toJson = require("./toJson");

Object.keys(_toJson).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _toJson[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _toJson[key];
    }
  });
});

var _paginate = require("./paginate");

Object.keys(_paginate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _paginate[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _paginate[key];
    }
  });
});