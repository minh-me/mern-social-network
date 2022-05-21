"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _morgan = _interopRequireDefault(require("morgan"));

var _passport = _interopRequireDefault(require("passport"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _expressMongoSanitize = _interopRequireDefault(require("express-mongo-sanitize"));

var _helmet = _interopRequireDefault(require("helmet"));

var _xssClean = _interopRequireDefault(require("xss-clean"));

var _hpp = _interopRequireDefault(require("hpp"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

require("colors");

var _config = require("./config");

var _middlewares = require("./middlewares");

var _index = _interopRequireDefault(require("./routes/_index"));

var _cors = require("./config/cors");

// connect to database
_config.db.connect(); // init app


var app = (0, _express["default"])(); // body parser

app.use(_express["default"].json()); // parse urlencoded request body

app.use(_express["default"].urlencoded({
  extended: true
})); // cookie parser

app.use((0, _cookieParser["default"])(_config.config.jwt.refreshSecret)); // dev logging middleware

if (_config.config.env === 'development') {
  app.use((0, _morgan["default"])('dev'));
} // sanitize data


app.use((0, _expressMongoSanitize["default"])()); // set security headers

app.use((0, _helmet["default"])()); // prevent XSS attacks

app.use((0, _xssClean["default"])()); // limit repeated failed requests to auth endpoints

if (_config.config.env === 'production') {
  app.use('/api/auth', _config.authLimiter);
} // prevent http param pollution


app.use((0, _hpp["default"])()); // enable CORS

app.use(_cors.configCors); // jwt authentication

app.use(_passport["default"].initialize());

_passport["default"].use('jwt', _config.jwtStrategy); // Set static folder


app.use(_express["default"]["static"](_path["default"].join(__dirname, 'src', 'uploads'))); // api routes

app.use('/api', _index["default"]); // send back a 404 error for any unknown api request

app.use(function (req, res, next) {
  return next(new _httpErrors["default"].NotFound('Not found api request'));
}); // handle error

app.use(_middlewares.errorHandler); // export

var _default = app;
exports["default"] = _default;