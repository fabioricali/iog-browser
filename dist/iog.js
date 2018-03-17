// [AIV_SHORT]  IOG Build version: 1.0.2  
 (function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Iog", [], factory);
	else if(typeof exports === 'object')
		exports["Iog"] = factory();
	else
		root["Iog"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(1);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var extend = __webpack_require__(2);
var dateFormat = __webpack_require__(3);
var isError = __webpack_require__(4);
var stringify = __webpack_require__(5);

/**
 * @typedef SEPARATOR
 * @type {string}
 * @ignore
 */
var SEPARATOR = '\n\n---------------------------------------------------------------------------------------\n\n';

/**
 * @class
 */

var Iog = function () {

    /**
     * Iog instance
     * @param {string} contextName es. your-module-name
     * @param {object} [opts] options
     * @param {string} [opts.path=] log path
     * @param {boolean} [opts.pretty=false] Pretty format
     * @param {boolean} [opts.enableDate=false] Enable date
     * @param {string} [opts.separator=---] log separator
     */
    function Iog(contextName) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, Iog);

        if (typeof contextName === 'undefined') throw new TypeError('context name is required');

        this.contextName = contextName;
        this.opts = extend(opts, {
            separator: SEPARATOR,
            pretty: false,
            upperCase: true,
            enableDate: false
        });

        if (this.opts.upperCase) this.contextName = this.contextName.toUpperCase();

        this._paused = false;
    }

    /**
     * Pause log writing
     * @returns {Iog}
     */


    _createClass(Iog, [{
        key: 'pause',
        value: function pause() {
            this._paused = true;
            return this;
        }

        /**
         * Resume log writing
         * @returns {Iog}
         */

    }, {
        key: 'resume',
        value: function resume() {
            this._paused = false;
            return this;
        }

        /**
         * Write log
         * @param {string|object} msg message log, you can pass also an object with custom params, in this case remember that Error must be get in this way error.message
         * @param {string} [type=log] any type that you want like: log, info, error, trace, warn also custom
         */

    }, {
        key: 'write',
        value: function write() {
            var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
            var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'log';


            if (this._paused) return;
            try {
                var _console = console[type in console ? type : 'log'];
                var now = new Date();
                var date = dateFormat(now, 'yyyy-mm-dd HH:MM:ss:l');
                var date1 = '';
                var date2 = '';

                if (this.opts.upperCase) type = type.toUpperCase();

                if (this.opts.enableDate) {
                    date1 = 'DATE: ' + date + '\\n';
                    date2 = '[' + date + ']';
                }

                if (this.opts.pretty) {
                    if ((typeof msg === 'undefined' ? 'undefined' : _typeof(msg)) === 'object' && !isError(msg)) msg = stringify(msg, { replace: null, space: 2 });

                    var body = 'CONTEXT: ' + this.contextName + '\n' + date1 + 'TYPE: ' + type + '\nBODY:\n\n' + msg + this.opts.separator;

                    _console(body);
                } else {
                    _console('[' + this.contextName + '][' + type + ']' + date2, msg);
                }
            } catch (e) {}
        }

        /**
         * A wrapper of write that set type to "error"
         * @param {string|object} msg message log, you can pass also an object with custom params, in this case remember that Error must be get in this way error.message
         */

    }, {
        key: 'error',
        value: function error() {
            var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            this.write(msg, 'error');
        }

        /**
         * A wrapper of write that set type to "warn"
         * @param {string|object} msg message log, you can pass also an object with custom params, in this case remember that Error must be get in this way error.message
         */

    }, {
        key: 'warn',
        value: function warn() {
            var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            this.write(msg, 'warn');
        }

        /**
         * A wrapper of write that set type to "info"
         * @param {string|object} msg message log, you can pass also an object with custom params, in this case remember that Error must be get in this way error.message
         */

    }, {
        key: 'info',
        value: function info() {
            var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            this.write(msg, 'info');
        }

        /**
         * A wrapper of write that set type to "trace"
         * @param {string|object} msg message log, you can pass also an object with custom params, in this case remember that Error must be get in this way error.message
         */

    }, {
        key: 'trace',
        value: function trace() {
            var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            this.write(msg, 'trace');
        }
    }]);

    return Iog;
}();

module.exports = Iog;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

/**
 * Copies deep missing properties to the target object
 * @param targetObj {Object} target object
 * @param defaultObj {Object} default object
 * @param exclude {Array} exclude properties from copy
 * @returns {*}
 */

var defaulty = function defaulty(targetObj, defaultObj) {
    var exclude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    for (var i in defaultObj) {
        /* istanbul ignore else  */
        if (defaultObj.hasOwnProperty(i) && exclude.indexOf(i) === -1) if (!targetObj.hasOwnProperty(i)) {
            targetObj[i] = defaultObj[i];
        } else {
            if (_typeof(targetObj[i]) === 'object') {
                defaulty(targetObj[i], defaultObj[i]);
            }
        }
    }
    return targetObj;
};

/**
 * Creates new target object and copies deep missing properties to the target object
 * @param args[0] {Object} target object
 * @param args[1] {Object} default object
 * @param args[2] {Array} exclude properties from copy
 * @returns {*}
 */
var copy = function copy() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    args[0] = Object.assign({}, args[0]);
    return defaulty.apply(undefined, args);
};

module.exports = defaulty;
module.exports.copy = copy;
//# sourceMappingURL=defaulty.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

(function (global) {
  'use strict';

  var dateFormat = function () {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|'[^']*'|'[^']*'/g;
    var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
    var timezoneClip = /[^-+\dA-Z]/g;

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc, gmt) {

      // You can't provide utc if you skip other args (use the 'UTC:' mask prefix)
      if (arguments.length === 1 && kindOf(date) === 'string' && !/\d/.test(date)) {
        mask = date;
        date = undefined;
      }

      date = date || new Date();

      if (!(date instanceof Date)) {
        date = new Date(date);
      }

      if (isNaN(date)) {
        throw TypeError('Invalid date');
      }

      mask = String(dateFormat.masks[mask] || mask || dateFormat.masks['default']);

      // Allow setting the utc/gmt argument via the mask
      var maskSlice = mask.slice(0, 4);
      if (maskSlice === 'UTC:' || maskSlice === 'GMT:') {
        mask = mask.slice(4);
        utc = true;
        if (maskSlice === 'GMT:') {
          gmt = true;
        }
      }

      var _ = utc ? 'getUTC' : 'get';
      var d = date[_ + 'Date']();
      var D = date[_ + 'Day']();
      var m = date[_ + 'Month']();
      var y = date[_ + 'FullYear']();
      var H = date[_ + 'Hours']();
      var M = date[_ + 'Minutes']();
      var s = date[_ + 'Seconds']();
      var L = date[_ + 'Milliseconds']();
      var o = utc ? 0 : date.getTimezoneOffset();
      var W = getWeek(date);
      var N = getDayOfWeek(date);
      var flags = {
        d: d,
        dd: pad(d),
        ddd: dateFormat.i18n.dayNames[D],
        dddd: dateFormat.i18n.dayNames[D + 7],
        m: m + 1,
        mm: pad(m + 1),
        mmm: dateFormat.i18n.monthNames[m],
        mmmm: dateFormat.i18n.monthNames[m + 12],
        yy: String(y).slice(2),
        yyyy: y,
        h: H % 12 || 12,
        hh: pad(H % 12 || 12),
        H: H,
        HH: pad(H),
        M: M,
        MM: pad(M),
        s: s,
        ss: pad(s),
        l: pad(L, 3),
        L: pad(Math.round(L / 10)),
        t: H < 12 ? 'a' : 'p',
        tt: H < 12 ? 'am' : 'pm',
        T: H < 12 ? 'A' : 'P',
        TT: H < 12 ? 'AM' : 'PM',
        Z: gmt ? 'GMT' : utc ? 'UTC' : (String(date).match(timezone) || ['']).pop().replace(timezoneClip, ''),
        o: (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
        S: ['th', 'st', 'nd', 'rd'][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10],
        W: W,
        N: N
      };

      return mask.replace(token, function (match) {
        if (match in flags) {
          return flags[match];
        }
        return match.slice(1, match.length - 1);
      });
    };
  }();

  dateFormat.masks = {
    'default': 'ddd mmm dd yyyy HH:MM:ss',
    'shortDate': 'm/d/yy',
    'mediumDate': 'mmm d, yyyy',
    'longDate': 'mmmm d, yyyy',
    'fullDate': 'dddd, mmmm d, yyyy',
    'shortTime': 'h:MM TT',
    'mediumTime': 'h:MM:ss TT',
    'longTime': 'h:MM:ss TT Z',
    'isoDate': 'yyyy-mm-dd',
    'isoTime': 'HH:MM:ss',
    'isoDateTime': 'yyyy-mm-dd\'T\'HH:MM:sso',
    'isoUtcDateTime': 'UTC:yyyy-mm-dd\'T\'HH:MM:ss\'Z\'',
    'expiresHeaderFormat': 'ddd, dd mmm yyyy HH:MM:ss Z'
  };

  // Internationalization strings
  dateFormat.i18n = {
    dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  };

  function pad(val, len) {
    val = String(val);
    len = len || 2;
    while (val.length < len) {
      val = '0' + val;
    }
    return val;
  }

  /**
   * Get the ISO 8601 week number
   * Based on comments from
   * http://techblog.procurios.nl/k/n618/news/view/33796/14863/Calculate-ISO-8601-week-and-year-in-javascript.html
   *
   * @param  {Object} `date`
   * @return {Number}
   */
  function getWeek(date) {
    // Remove time components of date
    var targetThursday = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    // Change date to Thursday same week
    targetThursday.setDate(targetThursday.getDate() - (targetThursday.getDay() + 6) % 7 + 3);

    // Take January 4th as it is always in week 1 (see ISO 8601)
    var firstThursday = new Date(targetThursday.getFullYear(), 0, 4);

    // Change date to Thursday same week
    firstThursday.setDate(firstThursday.getDate() - (firstThursday.getDay() + 6) % 7 + 3);

    // Check if daylight-saving-time-switch occurred and correct for it
    var ds = targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
    targetThursday.setHours(targetThursday.getHours() - ds);

    // Number of weeks between target Thursday and first Thursday
    var weekDiff = (targetThursday - firstThursday) / (86400000 * 7);
    return 1 + Math.floor(weekDiff);
  }

  /**
   * Get ISO-8601 numeric representation of the day of the week
   * 1 (for Monday) through 7 (for Sunday)
   * 
   * @param  {Object} `date`
   * @return {Number}
   */
  function getDayOfWeek(date) {
    var dow = date.getDay();
    if (dow === 0) {
      dow = 7;
    }
    return dow;
  }

  /**
   * kind-of shortcut
   * @param  {*} val
   * @return {String}
   */
  function kindOf(val) {
    if (val === null) {
      return 'null';
    }

    if (val === undefined) {
      return 'undefined';
    }

    if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) !== 'object') {
      return typeof val === 'undefined' ? 'undefined' : _typeof(val);
    }

    if (Array.isArray(val)) {
      return 'array';
    }

    return {}.toString.call(val).slice(8, -1).toLowerCase();
  };

  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return dateFormat;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
    module.exports = dateFormat;
  } else {
    global.dateFormat = dateFormat;
  }
})(undefined);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var objectToString = Object.prototype.toString;
var getPrototypeOf = Object.getPrototypeOf;
var ERROR_TYPE = '[object Error]';

module.exports = function isError(err) {
    if ((typeof err === 'undefined' ? 'undefined' : _typeof(err)) !== 'object') {
        return false;
    }
    if (err instanceof Error) {
        // Accept `AssertionError`s from the `assert` module that ships
        // with Node.js v6.1.0, compare issue #4.
        return true;
    }
    while (err) {
        if (objectToString.call(err) === ERROR_TYPE) {
            return true;
        }
        err = getPrototypeOf(err);
    }
    return false;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Convert also undefined and null to string
 * @param {*} val Anything you want stringify
 * @param {object} [opt] Options
 * @param {boolean} [opt.quotes=true] If false remove quotes
 * @param {function|array|string|number} [opt.replace=null] Replace (JSON.stringify 2# param)
 * @param {number|string} [opt.space=0] Space (JSON.stringify 3# param)
 * @link https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
 * @returns {string}
 * @constructor
 */
function Stringme(val, opt) {

    if (val === undefined) {
        val = '"undefined"';
    } else if (val === null) {
        val = '"null"';
    } else {
        var replace = opt && opt.replace ? opt.replace : null;
        var space = opt && opt.space ? opt.space : null;
        val = JSON.stringify(val, replace, space);
    }

    if (opt && opt.quotes === false && !/(^{|\[).*?([}\]])$/gm.test(val)) val = val.slice(1, val.length - 1);

    return val;
}

if (typeof window !== 'undefined') window.stringme = Stringme;

if (true) module.exports = Stringme;

/***/ })
/******/ ]);
}); 