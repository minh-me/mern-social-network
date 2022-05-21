"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paginate = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

/**
 * Query for documents with pagination
 * @param {Object}          [filter={}]                 Mongo filter
 * @param {Object}          [options={}]                Query options
 * @param {Object|String}   [options.select='']         Select fields. Multiple select criteria should be separated by commas (,)
 * @param {Object|String}   [options.sort='-createAt']  Sorting criteria. Multiple sorting criteria should be separated by commas (,) (default="-createAt")
 * @param {String}          [options.populate='']       Populate data fields. Hierarchy of fields should be separated by (.). Multiple populating criteria should be separated by commas (,)
 * @param {Number}          [options.page=1]            Current page (default = 1)
 * @param {Number}          [options.limit=10]          Maximum number of results perpage (default = 10)
 * @returns {Promise<QueryResult>}
 *
 */

/**
 * @typedef {Object} QueryResult
 * @property {Document[]}   results                     Results found
 * @property {number}       page                        Current page
 * @property {number}       limit                       Maximum number of results per page
 * @property {number}       totalPages                  Total number of pages
 * @property {number}       totalResults                Total number of documents
 */
//  let myCustomLabels = {
//   totalDocs: 'itemCount',
//   docs: 'itemsList',
//   limit: 'perPage',
//   page: 'currentPage',
//   nextPage: 'next',
//   prevPage: 'prev',
//   totalPages: 'pageCount',
//   pagingCounter: 'slNo',
//   meta: 'paginator',
// }
var paginate = function paginate(schema) {
  var defaultOptions = {
    customLabels: {
      docs: 'results',
      totalDocs: 'totalResults'
    },
    select: '',
    sort: '-createdAt',
    page: 1,
    limit: 10
  };
  schema.statics.paginate = /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var _info, _ref2;

    var filter,
        options,
        filterStr,
        _options,
        select,
        sort,
        limit,
        page,
        skip,
        query,
        customLabels,
        labelDocs,
        labelPage,
        labelTotalPages,
        labelLimit,
        labelTotalDocs,
        countPromise,
        docsPromise,
        _yield$Promise$all,
        _yield$Promise$all2,
        totalDocs,
        docs,
        _args = arguments;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            filter = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
            options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            // Create filter string
            filterStr = JSON.stringify(filter); // Create operators ($gt, $gte, etc)

            filter = JSON.parse(filterStr.replace(/\b(gt|gte|lt|lte|in|eq)\b/g, function (match) {
              return "$".concat(match);
            })); // Merge options

            options = _objectSpread(_objectSpread({}, defaultOptions), options); // Get filter options

            _options = options, select = _options.select, sort = _options.sort, limit = _options.limit, page = _options.page;
            limit = parseInt(limit, 10);
            select = select.split(',').join(' ');
            sort = sort.split(',').join(' '); // Pagination

            skip = (+page - 1) * limit;
            if (filter.search) filter.$text = {
              $search: filter.search
            };
            delete filter.search; // Finding resource

            query = this.find(filter).select(select).skip(skip).sort(sort).limit(limit); // Populate data fields.

            if (options.populate) {
              options.populate.split(',').forEach(function (populateOption) {
                query = query.populate(populateOption.split('.').reverse().reduce(function (a, b) {
                  return {
                    path: b,
                    populate: a
                  };
                }));
              });
            } // Custom labels


            customLabels = _objectSpread(_objectSpread({}, defaultOptions.customLabels), options.customLabels); // Label

            labelDocs = customLabels.docs, labelPage = customLabels.page, labelTotalPages = customLabels.totalPages, labelLimit = customLabels.limit, labelTotalDocs = customLabels.totalDocs; // Executing query

            countPromise = this.countDocuments(filter).exec();
            docsPromise = query.exec();
            _context.next = 20;
            return Promise.all([countPromise, docsPromise]);

          case 20:
            _yield$Promise$all = _context.sent;
            _yield$Promise$all2 = (0, _slicedToArray2["default"])(_yield$Promise$all, 2);
            totalDocs = _yield$Promise$all2[0];
            docs = _yield$Promise$all2[1];
            return _context.abrupt("return", (_ref2 = {}, (0, _defineProperty2["default"])(_ref2, labelDocs, docs), (0, _defineProperty2["default"])(_ref2, "info", (_info = {}, (0, _defineProperty2["default"])(_info, labelPage, +page), (0, _defineProperty2["default"])(_info, labelTotalPages, Math.ceil(totalDocs / limit)), (0, _defineProperty2["default"])(_info, labelLimit, limit), (0, _defineProperty2["default"])(_info, labelTotalDocs, totalDocs), _info)), _ref2));

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
};

exports.paginate = paginate;