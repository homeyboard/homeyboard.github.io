var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __reflectGet = Reflect.get;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __superGet = (cls, obj, key) => __reflectGet(__getProtoOf(cls), key, obj);
var _a, _b;
import { p as commonjsGlobal, q as getAugmentedNamespace, n as getDefaultExportFromCjs } from "./homey.15e95c4d.js";
let APIError$3 = class APIError extends Error {
  /**
   *
   * @param {string} message
   * @param {number} statusCode
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
};
var APIError_1 = APIError$3;
const APIError$2 = APIError_1;
let APIErrorTimeout$1 = class APIErrorTimeout extends APIError$2 {
  constructor(message, statusCode = 408) {
    super(message, statusCode);
  }
};
var APIErrorTimeout_1 = APIErrorTimeout$1;
var browser$5 = { exports: {} };
var hasRequiredBrowser$5;
function requireBrowser$5() {
  if (hasRequiredBrowser$5)
    return browser$5.exports;
  hasRequiredBrowser$5 = 1;
  (function(module, exports) {
    var getGlobal = function() {
      if (typeof self !== "undefined") {
        return self;
      }
      if (typeof window !== "undefined") {
        return window;
      }
      if (typeof commonjsGlobal !== "undefined") {
        return commonjsGlobal;
      }
      throw new Error("unable to locate global object");
    };
    var globalObject = getGlobal();
    module.exports = exports = globalObject.fetch;
    if (globalObject.fetch) {
      exports.default = globalObject.fetch.bind(globalObject);
    }
    exports.Headers = globalObject.Headers;
    exports.Request = globalObject.Request;
    exports.Response = globalObject.Response;
  })(browser$5, browser$5.exports);
  return browser$5.exports;
}
const APIErrorTimeout2 = APIErrorTimeout_1;
let Util$2 = class Util {
  /**
   * Makes a call using `window.fetch` or `node-fetch`.
   * @param  {...any} args
   * @returns {Promise}
   */
  static async fetch(...args) {
    if (this.isReactNative()) {
      return fetch(...args);
    }
    if (this.isBrowser()) {
      return window.fetch(...args);
    }
    if (this.isNodeJS()) {
      const fetch2 = requireBrowser$5();
      return fetch2(...args);
    }
    if (typeof fetch !== "undefined") {
      return fetch(...args);
    }
  }
  /**
   * @param {number} ms - Number of milliseconds to wait
   * @returns {Promise<void>}
   */
  static async wait(ms2) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms2);
    });
  }
  /**
   *
   * @param {Promise} promise
   * @param {number} [timeoutMillis=5000]
   * @param {string} [message="Timeout after 5000ms"]
   * @returns {Promise}
   */
  static async timeout(promise, timeoutMillis = 5e3, message = `Timeout after ${timeoutMillis}ms`) {
    const timeoutError = new APIErrorTimeout2(message);
    let timeoutRef;
    return Promise.race([
      promise,
      new Promise((_, reject) => {
        timeoutRef = setTimeout(() => {
          reject(timeoutError);
        }, timeoutMillis);
      })
    ]).finally(() => {
      clearTimeout(timeoutRef);
    });
  }
  /**
   * @returns {Function} Returns a function that when called, returns a number with the delta in ms.
   */
  static benchmark() {
    const start = /* @__PURE__ */ new Date();
    return () => {
      const end = /* @__PURE__ */ new Date();
      return end - start;
    };
  }
  /**
   * Check if requests to http:// are supported.
   * Websites served on https:// cannot talk to http:// due to security concerns.
   * @returns {boolean}
   */
  static isHTTPUnsecureSupported() {
    if (typeof window === "undefined")
      return true;
    if (typeof window.location === "undefined")
      return false;
    return window.location.protocol === "http:";
  }
  /**
   * @returns {boolean}
   */
  static isReactNative() {
    return typeof navigator !== "undefined" && navigator.product === "ReactNative";
  }
  /**
   * @returns {boolean}
   */
  static isBrowser() {
    if (this.isReactNative())
      return false;
    return typeof document !== "undefined" && typeof window.document !== "undefined";
  }
  /**
   * @returns {boolean}
   */
  static isNodeJS() {
    if (this.isReactNative())
      return false;
    return typeof process !== "undefined";
  }
  /**
   * @param {string} name - Query parameter name
   * @returns {string|null}
   */
  static getSearchParameter(name) {
    if (!this.isBrowser())
      return null;
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(name) || null;
  }
  /**
   * This method encodes a string into a base64 string.
   * It's provided as Util because Node.js uses `Buffer`,
   * browsers use `btoa` and React Native doesn't provide anything.
   * @param {string} input - Input
   * @returns {string} - Base64 encoded output
   */
  static base64(s) {
    function btoaLookup(index) {
      if (index >= 0 && index < 64) {
        const keystr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        return keystr[index];
      }
      return void 0;
    }
    if (typeof s !== "string") {
      throw new Error("Invalid Input");
    }
    let i;
    for (i = 0; i < s.length; i++) {
      if (s.charCodeAt(i) > 255) {
        return null;
      }
    }
    let out = "";
    for (i = 0; i < s.length; i += 3) {
      const groupsOfSix = [void 0, void 0, void 0, void 0];
      groupsOfSix[0] = s.charCodeAt(i) >> 2;
      groupsOfSix[1] = (s.charCodeAt(i) & 3) << 4;
      if (s.length > i + 1) {
        groupsOfSix[1] |= s.charCodeAt(i + 1) >> 4;
        groupsOfSix[2] = (s.charCodeAt(i + 1) & 15) << 2;
      }
      if (s.length > i + 2) {
        groupsOfSix[2] |= s.charCodeAt(i + 2) >> 6;
        groupsOfSix[3] = s.charCodeAt(i + 2) & 63;
      }
      for (let j = 0; j < groupsOfSix.length; j++) {
        if (typeof groupsOfSix[j] === "undefined") {
          out += "=";
        } else {
          out += btoaLookup(groupsOfSix[j]);
        }
      }
    }
    return out;
  }
  /**
   * Generates an UUID v4 string
   * @returns {string} - UUID v4 string
   */
  static uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === "x" ? r : r & 3 | 8;
      return v.toString(16);
    });
  }
  /**
   * Get an environment variable.
   * In Node.js, this is accesses from `process.env`.
   * In a browser, this is accesses from `window.localStorage`.
   * @returns {string} - UUID v4 string
   */
  static env(key) {
    if (this.isBrowser()) {
      return window.localStorage.getItem(key) || null;
    }
    if (this.isNodeJS()) {
      return process.env[key] || null;
    }
    if (this.isReactNative()) {
      return null;
    }
    return null;
  }
  static envKey(key) {
    return key.replace("Athom", "ATHOM_").replace("Homey", "HOMEY_").replace("API", "_API").toUpperCase();
  }
  /**
   * Polyfill for Promise.any, which is only supported on Node.js >=15
   * @param {Array<Promise>} promises
   */
  static async promiseAny(promises) {
    if (promises.length === 0)
      return;
    const rejections = [];
    return new Promise((resolve, reject) => {
      promises.forEach((promise, i) => {
        promise.then((result) => resolve(result)).catch((err) => {
          rejections[i] = err;
          if (rejections.length === promises.length) {
            reject(rejections);
          }
        });
      });
    });
  }
  /**
  * Converts an object to a query string
  * @param {object} queryObject - Query parameter object
  * @returns {string}
  */
  static serializeQueryObject(queryObject) {
    let prefix;
    let querystring = [];
    let rbracket = /\[\]$/;
    function add(key, value) {
      value = typeof value === "function" ? value() : value === null ? "" : value;
      querystring[querystring.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
    }
    function buildParams(prefix2, obj, add2) {
      let name;
      if (Array.isArray(obj)) {
        for (let index = 0; index < obj.length; index++) {
          if (rbracket.test(prefix2)) {
            add2(prefix2, obj[index]);
          } else {
            buildParams(prefix2 + "[" + (typeof obj[index] === "object" ? index : "") + "]", obj[index], add2);
          }
        }
      } else if (typeof obj === "object") {
        for (name in obj) {
          buildParams(prefix2 + "[" + name + "]", obj[name], add2);
        }
      } else {
        add2(prefix2, obj);
      }
    }
    for (prefix in queryObject) {
      if (typeof queryObject[prefix] === "undefined")
        continue;
      buildParams(prefix, queryObject[prefix], add);
    }
    return querystring.join("&");
  }
};
var Util_1 = Util$2;
var lib$1 = { exports: {} };
var parseuri;
var hasRequiredParseuri;
function requireParseuri() {
  if (hasRequiredParseuri)
    return parseuri;
  hasRequiredParseuri = 1;
  var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
  var parts = [
    "source",
    "protocol",
    "authority",
    "userInfo",
    "user",
    "password",
    "host",
    "port",
    "relative",
    "path",
    "directory",
    "file",
    "query",
    "anchor"
  ];
  parseuri = function parseuri2(str) {
    var src = str, b = str.indexOf("["), e = str.indexOf("]");
    if (b != -1 && e != -1) {
      str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ";") + str.substring(e, str.length);
    }
    var m = re.exec(str || ""), uri = {}, i = 14;
    while (i--) {
      uri[parts[i]] = m[i] || "";
    }
    if (b != -1 && e != -1) {
      uri.source = src;
      uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ":");
      uri.authority = uri.authority.replace("[", "").replace("]", "").replace(/;/g, ":");
      uri.ipv6uri = true;
    }
    uri.pathNames = pathNames(uri, uri["path"]);
    uri.queryKey = queryKey(uri, uri["query"]);
    return uri;
  };
  function pathNames(obj, path) {
    var regx = /\/{2,9}/g, names = path.replace(regx, "/").split("/");
    if (path.substr(0, 1) == "/" || path.length === 0) {
      names.splice(0, 1);
    }
    if (path.substr(path.length - 1, 1) == "/") {
      names.splice(names.length - 1, 1);
    }
    return names;
  }
  function queryKey(uri, query) {
    var data = {};
    query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function($0, $1, $2) {
      if ($1) {
        data[$1] = $2;
      }
    });
    return data;
  }
  return parseuri;
}
var browser$4 = { exports: {} };
var debug$2 = { exports: {} };
var ms$2;
var hasRequiredMs$2;
function requireMs$2() {
  if (hasRequiredMs$2)
    return ms$2;
  hasRequiredMs$2 = 1;
  var s = 1e3;
  var m = s * 60;
  var h = m * 60;
  var d = h * 24;
  var y = d * 365.25;
  ms$2 = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === "string" && val.length > 0) {
      return parse(val);
    } else if (type === "number" && isNaN(val) === false) {
      return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
    );
  };
  function parse(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
      str
    );
    if (!match) {
      return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || "ms").toLowerCase();
    switch (type) {
      case "years":
      case "year":
      case "yrs":
      case "yr":
      case "y":
        return n * y;
      case "days":
      case "day":
      case "d":
        return n * d;
      case "hours":
      case "hour":
      case "hrs":
      case "hr":
      case "h":
        return n * h;
      case "minutes":
      case "minute":
      case "mins":
      case "min":
      case "m":
        return n * m;
      case "seconds":
      case "second":
      case "secs":
      case "sec":
      case "s":
        return n * s;
      case "milliseconds":
      case "millisecond":
      case "msecs":
      case "msec":
      case "ms":
        return n;
      default:
        return void 0;
    }
  }
  function fmtShort(ms2) {
    if (ms2 >= d) {
      return Math.round(ms2 / d) + "d";
    }
    if (ms2 >= h) {
      return Math.round(ms2 / h) + "h";
    }
    if (ms2 >= m) {
      return Math.round(ms2 / m) + "m";
    }
    if (ms2 >= s) {
      return Math.round(ms2 / s) + "s";
    }
    return ms2 + "ms";
  }
  function fmtLong(ms2) {
    return plural(ms2, d, "day") || plural(ms2, h, "hour") || plural(ms2, m, "minute") || plural(ms2, s, "second") || ms2 + " ms";
  }
  function plural(ms2, n, name) {
    if (ms2 < n) {
      return;
    }
    if (ms2 < n * 1.5) {
      return Math.floor(ms2 / n) + " " + name;
    }
    return Math.ceil(ms2 / n) + " " + name + "s";
  }
  return ms$2;
}
var hasRequiredDebug$2;
function requireDebug$2() {
  if (hasRequiredDebug$2)
    return debug$2.exports;
  hasRequiredDebug$2 = 1;
  (function(module, exports) {
    exports = module.exports = createDebug.debug = createDebug["default"] = createDebug;
    exports.coerce = coerce;
    exports.disable = disable;
    exports.enable = enable;
    exports.enabled = enabled;
    exports.humanize = requireMs$2();
    exports.instances = [];
    exports.names = [];
    exports.skips = [];
    exports.formatters = {};
    function selectColor(namespace) {
      var hash = 0, i;
      for (i in namespace) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i);
        hash |= 0;
      }
      return exports.colors[Math.abs(hash) % exports.colors.length];
    }
    function createDebug(namespace) {
      var prevTime;
      function debug2() {
        if (!debug2.enabled)
          return;
        var self2 = debug2;
        var curr = +/* @__PURE__ */ new Date();
        var ms2 = curr - (prevTime || curr);
        self2.diff = ms2;
        self2.prev = prevTime;
        self2.curr = curr;
        prevTime = curr;
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        args[0] = exports.coerce(args[0]);
        if ("string" !== typeof args[0]) {
          args.unshift("%O");
        }
        var index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
          if (match === "%%")
            return match;
          index++;
          var formatter = exports.formatters[format];
          if ("function" === typeof formatter) {
            var val = args[index];
            match = formatter.call(self2, val);
            args.splice(index, 1);
            index--;
          }
          return match;
        });
        exports.formatArgs.call(self2, args);
        var logFn = debug2.log || exports.log || console.log.bind(console);
        logFn.apply(self2, args);
      }
      debug2.namespace = namespace;
      debug2.enabled = exports.enabled(namespace);
      debug2.useColors = exports.useColors();
      debug2.color = selectColor(namespace);
      debug2.destroy = destroy;
      if ("function" === typeof exports.init) {
        exports.init(debug2);
      }
      exports.instances.push(debug2);
      return debug2;
    }
    function destroy() {
      var index = exports.instances.indexOf(this);
      if (index !== -1) {
        exports.instances.splice(index, 1);
        return true;
      } else {
        return false;
      }
    }
    function enable(namespaces) {
      exports.save(namespaces);
      exports.names = [];
      exports.skips = [];
      var i;
      var split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
      var len = split.length;
      for (i = 0; i < len; i++) {
        if (!split[i])
          continue;
        namespaces = split[i].replace(/\*/g, ".*?");
        if (namespaces[0] === "-") {
          exports.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
        } else {
          exports.names.push(new RegExp("^" + namespaces + "$"));
        }
      }
      for (i = 0; i < exports.instances.length; i++) {
        var instance = exports.instances[i];
        instance.enabled = exports.enabled(instance.namespace);
      }
    }
    function disable() {
      exports.enable("");
    }
    function enabled(name) {
      if (name[name.length - 1] === "*") {
        return true;
      }
      var i, len;
      for (i = 0, len = exports.skips.length; i < len; i++) {
        if (exports.skips[i].test(name)) {
          return false;
        }
      }
      for (i = 0, len = exports.names.length; i < len; i++) {
        if (exports.names[i].test(name)) {
          return true;
        }
      }
      return false;
    }
    function coerce(val) {
      if (val instanceof Error)
        return val.stack || val.message;
      return val;
    }
  })(debug$2, debug$2.exports);
  return debug$2.exports;
}
var hasRequiredBrowser$4;
function requireBrowser$4() {
  if (hasRequiredBrowser$4)
    return browser$4.exports;
  hasRequiredBrowser$4 = 1;
  (function(module, exports) {
    exports = module.exports = requireDebug$2();
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : localstorage();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && window.process.type === "renderer") {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    exports.formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (err) {
        return "[UnexpectedJSONParseError]: " + err.message;
      }
    };
    function formatArgs(args) {
      var useColors2 = this.useColors;
      args[0] = (useColors2 ? "%c" : "") + this.namespace + (useColors2 ? " %c" : " ") + args[0] + (useColors2 ? "%c " : " ") + "+" + exports.humanize(this.diff);
      if (!useColors2)
        return;
      var c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      var index = 0;
      var lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, function(match) {
        if ("%%" === match)
          return;
        index++;
        if ("%c" === match) {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    function log() {
      return "object" === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
    }
    function save(namespaces) {
      try {
        if (null == namespaces) {
          exports.storage.removeItem("debug");
        } else {
          exports.storage.debug = namespaces;
        }
      } catch (e) {
      }
    }
    function load() {
      var r;
      try {
        r = exports.storage.debug;
      } catch (e) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = {}.DEBUG;
      }
      return r;
    }
    exports.enable(load());
    function localstorage() {
      try {
        return window.localStorage;
      } catch (e) {
      }
    }
  })(browser$4, browser$4.exports);
  return browser$4.exports;
}
var url_1;
var hasRequiredUrl;
function requireUrl() {
  if (hasRequiredUrl)
    return url_1;
  hasRequiredUrl = 1;
  var parseuri2 = requireParseuri();
  var debug2 = requireBrowser$4()("socket.io-client:url");
  url_1 = url;
  function url(uri, loc) {
    var obj = uri;
    loc = loc || typeof location !== "undefined" && location;
    if (null == uri)
      uri = loc.protocol + "//" + loc.host;
    if ("string" === typeof uri) {
      if ("/" === uri.charAt(0)) {
        if ("/" === uri.charAt(1)) {
          uri = loc.protocol + uri;
        } else {
          uri = loc.host + uri;
        }
      }
      if (!/^(https?|wss?):\/\//.test(uri)) {
        debug2("protocol-less url %s", uri);
        if ("undefined" !== typeof loc) {
          uri = loc.protocol + "//" + uri;
        } else {
          uri = "https://" + uri;
        }
      }
      debug2("parse %s", uri);
      obj = parseuri2(uri);
    }
    if (!obj.port) {
      if (/^(http|ws)$/.test(obj.protocol)) {
        obj.port = "80";
      } else if (/^(http|ws)s$/.test(obj.protocol)) {
        obj.port = "443";
      }
    }
    obj.path = obj.path || "/";
    var ipv6 = obj.host.indexOf(":") !== -1;
    var host2 = ipv6 ? "[" + obj.host + "]" : obj.host;
    obj.id = obj.protocol + "://" + host2 + ":" + obj.port;
    obj.href = obj.protocol + "://" + host2 + (loc && loc.port === obj.port ? "" : ":" + obj.port);
    return obj;
  }
  return url_1;
}
var socket_ioParser = {};
var browser$3 = { exports: {} };
var debug$1 = { exports: {} };
var ms$1;
var hasRequiredMs$1;
function requireMs$1() {
  if (hasRequiredMs$1)
    return ms$1;
  hasRequiredMs$1 = 1;
  var s = 1e3;
  var m = s * 60;
  var h = m * 60;
  var d = h * 24;
  var y = d * 365.25;
  ms$1 = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === "string" && val.length > 0) {
      return parse(val);
    } else if (type === "number" && isNaN(val) === false) {
      return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
    );
  };
  function parse(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
      str
    );
    if (!match) {
      return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || "ms").toLowerCase();
    switch (type) {
      case "years":
      case "year":
      case "yrs":
      case "yr":
      case "y":
        return n * y;
      case "days":
      case "day":
      case "d":
        return n * d;
      case "hours":
      case "hour":
      case "hrs":
      case "hr":
      case "h":
        return n * h;
      case "minutes":
      case "minute":
      case "mins":
      case "min":
      case "m":
        return n * m;
      case "seconds":
      case "second":
      case "secs":
      case "sec":
      case "s":
        return n * s;
      case "milliseconds":
      case "millisecond":
      case "msecs":
      case "msec":
      case "ms":
        return n;
      default:
        return void 0;
    }
  }
  function fmtShort(ms2) {
    if (ms2 >= d) {
      return Math.round(ms2 / d) + "d";
    }
    if (ms2 >= h) {
      return Math.round(ms2 / h) + "h";
    }
    if (ms2 >= m) {
      return Math.round(ms2 / m) + "m";
    }
    if (ms2 >= s) {
      return Math.round(ms2 / s) + "s";
    }
    return ms2 + "ms";
  }
  function fmtLong(ms2) {
    return plural(ms2, d, "day") || plural(ms2, h, "hour") || plural(ms2, m, "minute") || plural(ms2, s, "second") || ms2 + " ms";
  }
  function plural(ms2, n, name) {
    if (ms2 < n) {
      return;
    }
    if (ms2 < n * 1.5) {
      return Math.floor(ms2 / n) + " " + name;
    }
    return Math.ceil(ms2 / n) + " " + name + "s";
  }
  return ms$1;
}
var hasRequiredDebug$1;
function requireDebug$1() {
  if (hasRequiredDebug$1)
    return debug$1.exports;
  hasRequiredDebug$1 = 1;
  (function(module, exports) {
    exports = module.exports = createDebug.debug = createDebug["default"] = createDebug;
    exports.coerce = coerce;
    exports.disable = disable;
    exports.enable = enable;
    exports.enabled = enabled;
    exports.humanize = requireMs$1();
    exports.instances = [];
    exports.names = [];
    exports.skips = [];
    exports.formatters = {};
    function selectColor(namespace) {
      var hash = 0, i;
      for (i in namespace) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i);
        hash |= 0;
      }
      return exports.colors[Math.abs(hash) % exports.colors.length];
    }
    function createDebug(namespace) {
      var prevTime;
      function debug2() {
        if (!debug2.enabled)
          return;
        var self2 = debug2;
        var curr = +/* @__PURE__ */ new Date();
        var ms2 = curr - (prevTime || curr);
        self2.diff = ms2;
        self2.prev = prevTime;
        self2.curr = curr;
        prevTime = curr;
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        args[0] = exports.coerce(args[0]);
        if ("string" !== typeof args[0]) {
          args.unshift("%O");
        }
        var index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
          if (match === "%%")
            return match;
          index++;
          var formatter = exports.formatters[format];
          if ("function" === typeof formatter) {
            var val = args[index];
            match = formatter.call(self2, val);
            args.splice(index, 1);
            index--;
          }
          return match;
        });
        exports.formatArgs.call(self2, args);
        var logFn = debug2.log || exports.log || console.log.bind(console);
        logFn.apply(self2, args);
      }
      debug2.namespace = namespace;
      debug2.enabled = exports.enabled(namespace);
      debug2.useColors = exports.useColors();
      debug2.color = selectColor(namespace);
      debug2.destroy = destroy;
      if ("function" === typeof exports.init) {
        exports.init(debug2);
      }
      exports.instances.push(debug2);
      return debug2;
    }
    function destroy() {
      var index = exports.instances.indexOf(this);
      if (index !== -1) {
        exports.instances.splice(index, 1);
        return true;
      } else {
        return false;
      }
    }
    function enable(namespaces) {
      exports.save(namespaces);
      exports.names = [];
      exports.skips = [];
      var i;
      var split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
      var len = split.length;
      for (i = 0; i < len; i++) {
        if (!split[i])
          continue;
        namespaces = split[i].replace(/\*/g, ".*?");
        if (namespaces[0] === "-") {
          exports.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
        } else {
          exports.names.push(new RegExp("^" + namespaces + "$"));
        }
      }
      for (i = 0; i < exports.instances.length; i++) {
        var instance = exports.instances[i];
        instance.enabled = exports.enabled(instance.namespace);
      }
    }
    function disable() {
      exports.enable("");
    }
    function enabled(name) {
      if (name[name.length - 1] === "*") {
        return true;
      }
      var i, len;
      for (i = 0, len = exports.skips.length; i < len; i++) {
        if (exports.skips[i].test(name)) {
          return false;
        }
      }
      for (i = 0, len = exports.names.length; i < len; i++) {
        if (exports.names[i].test(name)) {
          return true;
        }
      }
      return false;
    }
    function coerce(val) {
      if (val instanceof Error)
        return val.stack || val.message;
      return val;
    }
  })(debug$1, debug$1.exports);
  return debug$1.exports;
}
var hasRequiredBrowser$3;
function requireBrowser$3() {
  if (hasRequiredBrowser$3)
    return browser$3.exports;
  hasRequiredBrowser$3 = 1;
  (function(module, exports) {
    exports = module.exports = requireDebug$1();
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : localstorage();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && window.process.type === "renderer") {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    exports.formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (err) {
        return "[UnexpectedJSONParseError]: " + err.message;
      }
    };
    function formatArgs(args) {
      var useColors2 = this.useColors;
      args[0] = (useColors2 ? "%c" : "") + this.namespace + (useColors2 ? " %c" : " ") + args[0] + (useColors2 ? "%c " : " ") + "+" + exports.humanize(this.diff);
      if (!useColors2)
        return;
      var c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      var index = 0;
      var lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, function(match) {
        if ("%%" === match)
          return;
        index++;
        if ("%c" === match) {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    function log() {
      return "object" === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
    }
    function save(namespaces) {
      try {
        if (null == namespaces) {
          exports.storage.removeItem("debug");
        } else {
          exports.storage.debug = namespaces;
        }
      } catch (e) {
      }
    }
    function load() {
      var r;
      try {
        r = exports.storage.debug;
      } catch (e) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = {}.DEBUG;
      }
      return r;
    }
    exports.enable(load());
    function localstorage() {
      try {
        return window.localStorage;
      } catch (e) {
      }
    }
  })(browser$3, browser$3.exports);
  return browser$3.exports;
}
var componentEmitter = { exports: {} };
var hasRequiredComponentEmitter;
function requireComponentEmitter() {
  if (hasRequiredComponentEmitter)
    return componentEmitter.exports;
  hasRequiredComponentEmitter = 1;
  (function(module) {
    {
      module.exports = Emitter;
    }
    function Emitter(obj) {
      if (obj)
        return mixin(obj);
    }
    function mixin(obj) {
      for (var key in Emitter.prototype) {
        obj[key] = Emitter.prototype[key];
      }
      return obj;
    }
    Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
      this._callbacks = this._callbacks || {};
      (this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn);
      return this;
    };
    Emitter.prototype.once = function(event, fn) {
      function on() {
        this.off(event, on);
        fn.apply(this, arguments);
      }
      on.fn = fn;
      this.on(event, on);
      return this;
    };
    Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
      this._callbacks = this._callbacks || {};
      if (0 == arguments.length) {
        this._callbacks = {};
        return this;
      }
      var callbacks = this._callbacks["$" + event];
      if (!callbacks)
        return this;
      if (1 == arguments.length) {
        delete this._callbacks["$" + event];
        return this;
      }
      var cb;
      for (var i = 0; i < callbacks.length; i++) {
        cb = callbacks[i];
        if (cb === fn || cb.fn === fn) {
          callbacks.splice(i, 1);
          break;
        }
      }
      if (callbacks.length === 0) {
        delete this._callbacks["$" + event];
      }
      return this;
    };
    Emitter.prototype.emit = function(event) {
      this._callbacks = this._callbacks || {};
      var args = new Array(arguments.length - 1), callbacks = this._callbacks["$" + event];
      for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
      }
      if (callbacks) {
        callbacks = callbacks.slice(0);
        for (var i = 0, len = callbacks.length; i < len; ++i) {
          callbacks[i].apply(this, args);
        }
      }
      return this;
    };
    Emitter.prototype.listeners = function(event) {
      this._callbacks = this._callbacks || {};
      return this._callbacks["$" + event] || [];
    };
    Emitter.prototype.hasListeners = function(event) {
      return !!this.listeners(event).length;
    };
  })(componentEmitter);
  return componentEmitter.exports;
}
var binary = {};
var isarray;
var hasRequiredIsarray;
function requireIsarray() {
  if (hasRequiredIsarray)
    return isarray;
  hasRequiredIsarray = 1;
  var toString = {}.toString;
  isarray = Array.isArray || function(arr) {
    return toString.call(arr) == "[object Array]";
  };
  return isarray;
}
var isBuffer;
var hasRequiredIsBuffer;
function requireIsBuffer() {
  if (hasRequiredIsBuffer)
    return isBuffer;
  hasRequiredIsBuffer = 1;
  isBuffer = isBuf;
  var withNativeBuffer = typeof Buffer === "function" && typeof Buffer.isBuffer === "function";
  var withNativeArrayBuffer = typeof ArrayBuffer === "function";
  var isView = function(obj) {
    return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
  };
  function isBuf(obj) {
    return withNativeBuffer && Buffer.isBuffer(obj) || withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj));
  }
  return isBuffer;
}
var hasRequiredBinary;
function requireBinary() {
  if (hasRequiredBinary)
    return binary;
  hasRequiredBinary = 1;
  var isArray = requireIsarray();
  var isBuf = requireIsBuffer();
  var toString = Object.prototype.toString;
  var withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
  var withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
  binary.deconstructPacket = function(packet) {
    var buffers = [];
    var packetData = packet.data;
    var pack = packet;
    pack.data = _deconstructPacket(packetData, buffers);
    pack.attachments = buffers.length;
    return { packet: pack, buffers };
  };
  function _deconstructPacket(data, buffers) {
    if (!data)
      return data;
    if (isBuf(data)) {
      var placeholder = { _placeholder: true, num: buffers.length };
      buffers.push(data);
      return placeholder;
    } else if (isArray(data)) {
      var newData = new Array(data.length);
      for (var i = 0; i < data.length; i++) {
        newData[i] = _deconstructPacket(data[i], buffers);
      }
      return newData;
    } else if (typeof data === "object" && !(data instanceof Date)) {
      var newData = {};
      for (var key in data) {
        newData[key] = _deconstructPacket(data[key], buffers);
      }
      return newData;
    }
    return data;
  }
  binary.reconstructPacket = function(packet, buffers) {
    packet.data = _reconstructPacket(packet.data, buffers);
    packet.attachments = void 0;
    return packet;
  };
  function _reconstructPacket(data, buffers) {
    if (!data)
      return data;
    if (data && data._placeholder === true) {
      var isIndexValid = typeof data.num === "number" && data.num >= 0 && data.num < buffers.length;
      if (isIndexValid) {
        return buffers[data.num];
      } else {
        throw new Error("illegal attachments");
      }
    } else if (isArray(data)) {
      for (var i = 0; i < data.length; i++) {
        data[i] = _reconstructPacket(data[i], buffers);
      }
    } else if (typeof data === "object") {
      for (var key in data) {
        data[key] = _reconstructPacket(data[key], buffers);
      }
    }
    return data;
  }
  binary.removeBlobs = function(data, callback) {
    function _removeBlobs(obj, curKey, containingObject) {
      if (!obj)
        return obj;
      if (withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File) {
        pendingBlobs++;
        var fileReader = new FileReader();
        fileReader.onload = function() {
          if (containingObject) {
            containingObject[curKey] = this.result;
          } else {
            bloblessData = this.result;
          }
          if (!--pendingBlobs) {
            callback(bloblessData);
          }
        };
        fileReader.readAsArrayBuffer(obj);
      } else if (isArray(obj)) {
        for (var i = 0; i < obj.length; i++) {
          _removeBlobs(obj[i], i, obj);
        }
      } else if (typeof obj === "object" && !isBuf(obj)) {
        for (var key in obj) {
          _removeBlobs(obj[key], key, obj);
        }
      }
    }
    var pendingBlobs = 0;
    var bloblessData = data;
    _removeBlobs(bloblessData);
    if (!pendingBlobs) {
      callback(bloblessData);
    }
  };
  return binary;
}
var hasRequiredSocket_ioParser;
function requireSocket_ioParser() {
  if (hasRequiredSocket_ioParser)
    return socket_ioParser;
  hasRequiredSocket_ioParser = 1;
  (function(exports) {
    var debug2 = requireBrowser$3()("socket.io-parser");
    var Emitter = requireComponentEmitter();
    var binary2 = requireBinary();
    var isArray = requireIsarray();
    var isBuf = requireIsBuffer();
    exports.protocol = 4;
    exports.types = [
      "CONNECT",
      "DISCONNECT",
      "EVENT",
      "ACK",
      "ERROR",
      "BINARY_EVENT",
      "BINARY_ACK"
    ];
    exports.CONNECT = 0;
    exports.DISCONNECT = 1;
    exports.EVENT = 2;
    exports.ACK = 3;
    exports.ERROR = 4;
    exports.BINARY_EVENT = 5;
    exports.BINARY_ACK = 6;
    exports.Encoder = Encoder;
    exports.Decoder = Decoder;
    function Encoder() {
    }
    var ERROR_PACKET = exports.ERROR + '"encode error"';
    Encoder.prototype.encode = function(obj, callback) {
      debug2("encoding packet %j", obj);
      if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
        encodeAsBinary(obj, callback);
      } else {
        var encoding = encodeAsString(obj);
        callback([encoding]);
      }
    };
    function encodeAsString(obj) {
      var str = "" + obj.type;
      if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
        str += obj.attachments + "-";
      }
      if (obj.nsp && "/" !== obj.nsp) {
        str += obj.nsp + ",";
      }
      if (null != obj.id) {
        str += obj.id;
      }
      if (null != obj.data) {
        var payload = tryStringify(obj.data);
        if (payload !== false) {
          str += payload;
        } else {
          return ERROR_PACKET;
        }
      }
      debug2("encoded %j as %s", obj, str);
      return str;
    }
    function tryStringify(str) {
      try {
        return JSON.stringify(str);
      } catch (e) {
        return false;
      }
    }
    function encodeAsBinary(obj, callback) {
      function writeEncoding(bloblessData) {
        var deconstruction = binary2.deconstructPacket(bloblessData);
        var pack = encodeAsString(deconstruction.packet);
        var buffers = deconstruction.buffers;
        buffers.unshift(pack);
        callback(buffers);
      }
      binary2.removeBlobs(obj, writeEncoding);
    }
    function Decoder() {
      this.reconstructor = null;
    }
    Emitter(Decoder.prototype);
    Decoder.prototype.add = function(obj) {
      var packet;
      if (typeof obj === "string") {
        if (this.reconstructor) {
          throw new Error("got plaintext data when reconstructing a packet");
        }
        packet = decodeString(obj);
        if (exports.BINARY_EVENT === packet.type || exports.BINARY_ACK === packet.type) {
          this.reconstructor = new BinaryReconstructor(packet);
          if (this.reconstructor.reconPack.attachments === 0) {
            this.emit("decoded", packet);
          }
        } else {
          this.emit("decoded", packet);
        }
      } else if (isBuf(obj) || obj.base64) {
        if (!this.reconstructor) {
          throw new Error("got binary data when not reconstructing a packet");
        } else {
          packet = this.reconstructor.takeBinaryData(obj);
          if (packet) {
            this.reconstructor = null;
            this.emit("decoded", packet);
          }
        }
      } else {
        throw new Error("Unknown type: " + obj);
      }
    };
    function decodeString(str) {
      var i = 0;
      var p = {
        type: Number(str.charAt(0))
      };
      if (null == exports.types[p.type]) {
        return error("unknown packet type " + p.type);
      }
      if (exports.BINARY_EVENT === p.type || exports.BINARY_ACK === p.type) {
        var start = i + 1;
        while (str.charAt(++i) !== "-" && i != str.length) {
        }
        var buf = str.substring(start, i);
        if (buf != Number(buf) || str.charAt(i) !== "-") {
          throw new Error("Illegal attachments");
        }
        p.attachments = Number(buf);
      }
      if ("/" === str.charAt(i + 1)) {
        var start = i + 1;
        while (++i) {
          var c = str.charAt(i);
          if ("," === c)
            break;
          if (i === str.length)
            break;
        }
        p.nsp = str.substring(start, i);
      } else {
        p.nsp = "/";
      }
      var next = str.charAt(i + 1);
      if ("" !== next && Number(next) == next) {
        var start = i + 1;
        while (++i) {
          var c = str.charAt(i);
          if (null == c || Number(c) != c) {
            --i;
            break;
          }
          if (i === str.length)
            break;
        }
        p.id = Number(str.substring(start, i + 1));
      }
      if (str.charAt(++i)) {
        var payload = tryParse(str.substr(i));
        var isPayloadValid = payload !== false && (p.type === exports.ERROR || isArray(payload));
        if (isPayloadValid) {
          p.data = payload;
        } else {
          return error("invalid payload");
        }
      }
      debug2("decoded %s as %j", str, p);
      return p;
    }
    function tryParse(str) {
      try {
        return JSON.parse(str);
      } catch (e) {
        return false;
      }
    }
    Decoder.prototype.destroy = function() {
      if (this.reconstructor) {
        this.reconstructor.finishedReconstruction();
      }
    };
    function BinaryReconstructor(packet) {
      this.reconPack = packet;
      this.buffers = [];
    }
    BinaryReconstructor.prototype.takeBinaryData = function(binData) {
      this.buffers.push(binData);
      if (this.buffers.length === this.reconPack.attachments) {
        var packet = binary2.reconstructPacket(this.reconPack, this.buffers);
        this.finishedReconstruction();
        return packet;
      }
      return null;
    };
    BinaryReconstructor.prototype.finishedReconstruction = function() {
      this.reconPack = null;
      this.buffers = [];
    };
    function error(msg) {
      return {
        type: exports.ERROR,
        data: "parser error: " + msg
      };
    }
  })(socket_ioParser);
  return socket_ioParser;
}
var lib = { exports: {} };
var transports = {};
var hasCors = { exports: {} };
var hasRequiredHasCors;
function requireHasCors() {
  if (hasRequiredHasCors)
    return hasCors.exports;
  hasRequiredHasCors = 1;
  try {
    hasCors.exports = typeof XMLHttpRequest !== "undefined" && "withCredentials" in new XMLHttpRequest();
  } catch (err) {
    hasCors.exports = false;
  }
  return hasCors.exports;
}
var globalThis_browser;
var hasRequiredGlobalThis_browser;
function requireGlobalThis_browser() {
  if (hasRequiredGlobalThis_browser)
    return globalThis_browser;
  hasRequiredGlobalThis_browser = 1;
  globalThis_browser = function() {
    if (typeof self !== "undefined") {
      return self;
    } else if (typeof window !== "undefined") {
      return window;
    } else {
      return Function("return this")();
    }
  }();
  return globalThis_browser;
}
var xmlhttprequest_browser;
var hasRequiredXmlhttprequest_browser;
function requireXmlhttprequest_browser() {
  if (hasRequiredXmlhttprequest_browser)
    return xmlhttprequest_browser;
  hasRequiredXmlhttprequest_browser = 1;
  var hasCORS = requireHasCors();
  var globalThis = requireGlobalThis_browser();
  xmlhttprequest_browser = function(opts) {
    var xdomain = opts.xdomain;
    var xscheme = opts.xscheme;
    var enablesXDR = opts.enablesXDR;
    try {
      if ("undefined" !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
        return new XMLHttpRequest();
      }
    } catch (e) {
    }
    try {
      if ("undefined" !== typeof XDomainRequest && !xscheme && enablesXDR) {
        return new XDomainRequest();
      }
    } catch (e) {
    }
    if (!xdomain) {
      try {
        return new globalThis[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
      } catch (e) {
      }
    }
  };
  return xmlhttprequest_browser;
}
var pollingXhr = { exports: {} };
var browser$2 = {};
var keys;
var hasRequiredKeys;
function requireKeys() {
  if (hasRequiredKeys)
    return keys;
  hasRequiredKeys = 1;
  keys = Object.keys || function keys2(obj) {
    var arr = [];
    var has = Object.prototype.hasOwnProperty;
    for (var i in obj) {
      if (has.call(obj, i)) {
        arr.push(i);
      }
    }
    return arr;
  };
  return keys;
}
var hasBinary2;
var hasRequiredHasBinary2;
function requireHasBinary2() {
  if (hasRequiredHasBinary2)
    return hasBinary2;
  hasRequiredHasBinary2 = 1;
  var isArray = requireIsarray();
  var toString = Object.prototype.toString;
  var withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
  var withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
  hasBinary2 = hasBinary;
  function hasBinary(obj) {
    if (!obj || typeof obj !== "object") {
      return false;
    }
    if (isArray(obj)) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (hasBinary(obj[i])) {
          return true;
        }
      }
      return false;
    }
    if (typeof Buffer === "function" && Buffer.isBuffer && Buffer.isBuffer(obj) || typeof ArrayBuffer === "function" && obj instanceof ArrayBuffer || withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File) {
      return true;
    }
    if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) {
      return hasBinary(obj.toJSON(), true);
    }
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
        return true;
      }
    }
    return false;
  }
  return hasBinary2;
}
var arraybuffer_slice;
var hasRequiredArraybuffer_slice;
function requireArraybuffer_slice() {
  if (hasRequiredArraybuffer_slice)
    return arraybuffer_slice;
  hasRequiredArraybuffer_slice = 1;
  arraybuffer_slice = function(arraybuffer, start, end) {
    var bytes = arraybuffer.byteLength;
    start = start || 0;
    end = end || bytes;
    if (arraybuffer.slice) {
      return arraybuffer.slice(start, end);
    }
    if (start < 0) {
      start += bytes;
    }
    if (end < 0) {
      end += bytes;
    }
    if (end > bytes) {
      end = bytes;
    }
    if (start >= bytes || start >= end || bytes === 0) {
      return new ArrayBuffer(0);
    }
    var abv = new Uint8Array(arraybuffer);
    var result = new Uint8Array(end - start);
    for (var i = start, ii = 0; i < end; i++, ii++) {
      result[ii] = abv[i];
    }
    return result.buffer;
  };
  return arraybuffer_slice;
}
var after_1;
var hasRequiredAfter;
function requireAfter() {
  if (hasRequiredAfter)
    return after_1;
  hasRequiredAfter = 1;
  after_1 = after;
  function after(count, callback, err_cb) {
    var bail = false;
    err_cb = err_cb || noop;
    proxy.count = count;
    return count === 0 ? callback() : proxy;
    function proxy(err, result) {
      if (proxy.count <= 0) {
        throw new Error("after called too many times");
      }
      --proxy.count;
      if (err) {
        bail = true;
        callback(err);
        callback = err_cb;
      } else if (proxy.count === 0 && !bail) {
        callback(null, result);
      }
    }
  }
  function noop() {
  }
  return after_1;
}
/*! https://mths.be/utf8js v2.1.2 by @mathias */
var utf8;
var hasRequiredUtf8;
function requireUtf8() {
  if (hasRequiredUtf8)
    return utf8;
  hasRequiredUtf8 = 1;
  var stringFromCharCode = String.fromCharCode;
  function ucs2decode(string) {
    var output = [];
    var counter = 0;
    var length = string.length;
    var value;
    var extra;
    while (counter < length) {
      value = string.charCodeAt(counter++);
      if (value >= 55296 && value <= 56319 && counter < length) {
        extra = string.charCodeAt(counter++);
        if ((extra & 64512) == 56320) {
          output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
        } else {
          output.push(value);
          counter--;
        }
      } else {
        output.push(value);
      }
    }
    return output;
  }
  function ucs2encode(array) {
    var length = array.length;
    var index = -1;
    var value;
    var output = "";
    while (++index < length) {
      value = array[index];
      if (value > 65535) {
        value -= 65536;
        output += stringFromCharCode(value >>> 10 & 1023 | 55296);
        value = 56320 | value & 1023;
      }
      output += stringFromCharCode(value);
    }
    return output;
  }
  function checkScalarValue(codePoint, strict) {
    if (codePoint >= 55296 && codePoint <= 57343) {
      if (strict) {
        throw Error(
          "Lone surrogate U+" + codePoint.toString(16).toUpperCase() + " is not a scalar value"
        );
      }
      return false;
    }
    return true;
  }
  function createByte(codePoint, shift) {
    return stringFromCharCode(codePoint >> shift & 63 | 128);
  }
  function encodeCodePoint(codePoint, strict) {
    if ((codePoint & 4294967168) == 0) {
      return stringFromCharCode(codePoint);
    }
    var symbol = "";
    if ((codePoint & 4294965248) == 0) {
      symbol = stringFromCharCode(codePoint >> 6 & 31 | 192);
    } else if ((codePoint & 4294901760) == 0) {
      if (!checkScalarValue(codePoint, strict)) {
        codePoint = 65533;
      }
      symbol = stringFromCharCode(codePoint >> 12 & 15 | 224);
      symbol += createByte(codePoint, 6);
    } else if ((codePoint & 4292870144) == 0) {
      symbol = stringFromCharCode(codePoint >> 18 & 7 | 240);
      symbol += createByte(codePoint, 12);
      symbol += createByte(codePoint, 6);
    }
    symbol += stringFromCharCode(codePoint & 63 | 128);
    return symbol;
  }
  function utf8encode(string, opts) {
    opts = opts || {};
    var strict = false !== opts.strict;
    var codePoints = ucs2decode(string);
    var length = codePoints.length;
    var index = -1;
    var codePoint;
    var byteString = "";
    while (++index < length) {
      codePoint = codePoints[index];
      byteString += encodeCodePoint(codePoint, strict);
    }
    return byteString;
  }
  function readContinuationByte() {
    if (byteIndex >= byteCount) {
      throw Error("Invalid byte index");
    }
    var continuationByte = byteArray[byteIndex] & 255;
    byteIndex++;
    if ((continuationByte & 192) == 128) {
      return continuationByte & 63;
    }
    throw Error("Invalid continuation byte");
  }
  function decodeSymbol(strict) {
    var byte1;
    var byte2;
    var byte3;
    var byte4;
    var codePoint;
    if (byteIndex > byteCount) {
      throw Error("Invalid byte index");
    }
    if (byteIndex == byteCount) {
      return false;
    }
    byte1 = byteArray[byteIndex] & 255;
    byteIndex++;
    if ((byte1 & 128) == 0) {
      return byte1;
    }
    if ((byte1 & 224) == 192) {
      byte2 = readContinuationByte();
      codePoint = (byte1 & 31) << 6 | byte2;
      if (codePoint >= 128) {
        return codePoint;
      } else {
        throw Error("Invalid continuation byte");
      }
    }
    if ((byte1 & 240) == 224) {
      byte2 = readContinuationByte();
      byte3 = readContinuationByte();
      codePoint = (byte1 & 15) << 12 | byte2 << 6 | byte3;
      if (codePoint >= 2048) {
        return checkScalarValue(codePoint, strict) ? codePoint : 65533;
      } else {
        throw Error("Invalid continuation byte");
      }
    }
    if ((byte1 & 248) == 240) {
      byte2 = readContinuationByte();
      byte3 = readContinuationByte();
      byte4 = readContinuationByte();
      codePoint = (byte1 & 7) << 18 | byte2 << 12 | byte3 << 6 | byte4;
      if (codePoint >= 65536 && codePoint <= 1114111) {
        return codePoint;
      }
    }
    throw Error("Invalid UTF-8 detected");
  }
  var byteArray;
  var byteCount;
  var byteIndex;
  function utf8decode(byteString, opts) {
    opts = opts || {};
    var strict = false !== opts.strict;
    byteArray = ucs2decode(byteString);
    byteCount = byteArray.length;
    byteIndex = 0;
    var codePoints = [];
    var tmp;
    while ((tmp = decodeSymbol(strict)) !== false) {
      codePoints.push(tmp);
    }
    return ucs2encode(codePoints);
  }
  utf8 = {
    version: "2.1.2",
    encode: utf8encode,
    decode: utf8decode
  };
  return utf8;
}
var base64Arraybuffer = {};
var hasRequiredBase64Arraybuffer;
function requireBase64Arraybuffer() {
  if (hasRequiredBase64Arraybuffer)
    return base64Arraybuffer;
  hasRequiredBase64Arraybuffer = 1;
  (function(chars) {
    base64Arraybuffer.encode = function(arraybuffer) {
      var bytes = new Uint8Array(arraybuffer), i, len = bytes.length, base64 = "";
      for (i = 0; i < len; i += 3) {
        base64 += chars[bytes[i] >> 2];
        base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
        base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
        base64 += chars[bytes[i + 2] & 63];
      }
      if (len % 3 === 2) {
        base64 = base64.substring(0, base64.length - 1) + "=";
      } else if (len % 3 === 1) {
        base64 = base64.substring(0, base64.length - 2) + "==";
      }
      return base64;
    };
    base64Arraybuffer.decode = function(base64) {
      var bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
      if (base64[base64.length - 1] === "=") {
        bufferLength--;
        if (base64[base64.length - 2] === "=") {
          bufferLength--;
        }
      }
      var arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
      for (i = 0; i < len; i += 4) {
        encoded1 = chars.indexOf(base64[i]);
        encoded2 = chars.indexOf(base64[i + 1]);
        encoded3 = chars.indexOf(base64[i + 2]);
        encoded4 = chars.indexOf(base64[i + 3]);
        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
      }
      return arraybuffer;
    };
  })("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");
  return base64Arraybuffer;
}
var blob;
var hasRequiredBlob;
function requireBlob() {
  if (hasRequiredBlob)
    return blob;
  hasRequiredBlob = 1;
  var BlobBuilder = typeof BlobBuilder !== "undefined" ? BlobBuilder : typeof WebKitBlobBuilder !== "undefined" ? WebKitBlobBuilder : typeof MSBlobBuilder !== "undefined" ? MSBlobBuilder : typeof MozBlobBuilder !== "undefined" ? MozBlobBuilder : false;
  var blobSupported = function() {
    try {
      var a = new Blob(["hi"]);
      return a.size === 2;
    } catch (e) {
      return false;
    }
  }();
  var blobSupportsArrayBufferView = blobSupported && function() {
    try {
      var b = new Blob([new Uint8Array([1, 2])]);
      return b.size === 2;
    } catch (e) {
      return false;
    }
  }();
  var blobBuilderSupported = BlobBuilder && BlobBuilder.prototype.append && BlobBuilder.prototype.getBlob;
  function mapArrayBufferViews(ary) {
    return ary.map(function(chunk) {
      if (chunk.buffer instanceof ArrayBuffer) {
        var buf = chunk.buffer;
        if (chunk.byteLength !== buf.byteLength) {
          var copy = new Uint8Array(chunk.byteLength);
          copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
          buf = copy.buffer;
        }
        return buf;
      }
      return chunk;
    });
  }
  function BlobBuilderConstructor(ary, options) {
    options = options || {};
    var bb = new BlobBuilder();
    mapArrayBufferViews(ary).forEach(function(part) {
      bb.append(part);
    });
    return options.type ? bb.getBlob(options.type) : bb.getBlob();
  }
  function BlobConstructor(ary, options) {
    return new Blob(mapArrayBufferViews(ary), options || {});
  }
  if (typeof Blob !== "undefined") {
    BlobBuilderConstructor.prototype = Blob.prototype;
    BlobConstructor.prototype = Blob.prototype;
  }
  blob = function() {
    if (blobSupported) {
      return blobSupportsArrayBufferView ? Blob : BlobConstructor;
    } else if (blobBuilderSupported) {
      return BlobBuilderConstructor;
    } else {
      return void 0;
    }
  }();
  return blob;
}
var hasRequiredBrowser$2;
function requireBrowser$2() {
  if (hasRequiredBrowser$2)
    return browser$2;
  hasRequiredBrowser$2 = 1;
  (function(exports) {
    var keys2 = requireKeys();
    var hasBinary = requireHasBinary2();
    var sliceBuffer = requireArraybuffer_slice();
    var after = requireAfter();
    var utf82 = requireUtf8();
    var base64encoder;
    if (typeof ArrayBuffer !== "undefined") {
      base64encoder = requireBase64Arraybuffer();
    }
    var isAndroid = typeof navigator !== "undefined" && /Android/i.test(navigator.userAgent);
    var isPhantomJS = typeof navigator !== "undefined" && /PhantomJS/i.test(navigator.userAgent);
    var dontSendBlobs = isAndroid || isPhantomJS;
    exports.protocol = 3;
    var packets = exports.packets = {
      open: 0,
      close: 1,
      ping: 2,
      pong: 3,
      message: 4,
      upgrade: 5,
      noop: 6
    };
    var packetslist = keys2(packets);
    var err = { type: "error", data: "parser error" };
    var Blob2 = requireBlob();
    exports.encodePacket = function(packet, supportsBinary, utf8encode, callback) {
      if (typeof supportsBinary === "function") {
        callback = supportsBinary;
        supportsBinary = false;
      }
      if (typeof utf8encode === "function") {
        callback = utf8encode;
        utf8encode = null;
      }
      var data = packet.data === void 0 ? void 0 : packet.data.buffer || packet.data;
      if (typeof ArrayBuffer !== "undefined" && data instanceof ArrayBuffer) {
        return encodeArrayBuffer(packet, supportsBinary, callback);
      } else if (typeof Blob2 !== "undefined" && data instanceof Blob2) {
        return encodeBlob(packet, supportsBinary, callback);
      }
      if (data && data.base64) {
        return encodeBase64Object(packet, callback);
      }
      var encoded = packets[packet.type];
      if (void 0 !== packet.data) {
        encoded += utf8encode ? utf82.encode(String(packet.data), { strict: false }) : String(packet.data);
      }
      return callback("" + encoded);
    };
    function encodeBase64Object(packet, callback) {
      var message = "b" + exports.packets[packet.type] + packet.data.data;
      return callback(message);
    }
    function encodeArrayBuffer(packet, supportsBinary, callback) {
      if (!supportsBinary) {
        return exports.encodeBase64Packet(packet, callback);
      }
      var data = packet.data;
      var contentArray = new Uint8Array(data);
      var resultBuffer = new Uint8Array(1 + data.byteLength);
      resultBuffer[0] = packets[packet.type];
      for (var i = 0; i < contentArray.length; i++) {
        resultBuffer[i + 1] = contentArray[i];
      }
      return callback(resultBuffer.buffer);
    }
    function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
      if (!supportsBinary) {
        return exports.encodeBase64Packet(packet, callback);
      }
      var fr = new FileReader();
      fr.onload = function() {
        exports.encodePacket({ type: packet.type, data: fr.result }, supportsBinary, true, callback);
      };
      return fr.readAsArrayBuffer(packet.data);
    }
    function encodeBlob(packet, supportsBinary, callback) {
      if (!supportsBinary) {
        return exports.encodeBase64Packet(packet, callback);
      }
      if (dontSendBlobs) {
        return encodeBlobAsArrayBuffer(packet, supportsBinary, callback);
      }
      var length = new Uint8Array(1);
      length[0] = packets[packet.type];
      var blob2 = new Blob2([length.buffer, packet.data]);
      return callback(blob2);
    }
    exports.encodeBase64Packet = function(packet, callback) {
      var message = "b" + exports.packets[packet.type];
      if (typeof Blob2 !== "undefined" && packet.data instanceof Blob2) {
        var fr = new FileReader();
        fr.onload = function() {
          var b64 = fr.result.split(",")[1];
          callback(message + b64);
        };
        return fr.readAsDataURL(packet.data);
      }
      var b64data;
      try {
        b64data = String.fromCharCode.apply(null, new Uint8Array(packet.data));
      } catch (e) {
        var typed = new Uint8Array(packet.data);
        var basic = new Array(typed.length);
        for (var i = 0; i < typed.length; i++) {
          basic[i] = typed[i];
        }
        b64data = String.fromCharCode.apply(null, basic);
      }
      message += btoa(b64data);
      return callback(message);
    };
    exports.decodePacket = function(data, binaryType, utf8decode) {
      if (data === void 0) {
        return err;
      }
      if (typeof data === "string") {
        if (data.charAt(0) === "b") {
          return exports.decodeBase64Packet(data.substr(1), binaryType);
        }
        if (utf8decode) {
          data = tryDecode(data);
          if (data === false) {
            return err;
          }
        }
        var type = data.charAt(0);
        if (Number(type) != type || !packetslist[type]) {
          return err;
        }
        if (data.length > 1) {
          return { type: packetslist[type], data: data.substring(1) };
        } else {
          return { type: packetslist[type] };
        }
      }
      var asArray = new Uint8Array(data);
      var type = asArray[0];
      var rest = sliceBuffer(data, 1);
      if (Blob2 && binaryType === "blob") {
        rest = new Blob2([rest]);
      }
      return { type: packetslist[type], data: rest };
    };
    function tryDecode(data) {
      try {
        data = utf82.decode(data, { strict: false });
      } catch (e) {
        return false;
      }
      return data;
    }
    exports.decodeBase64Packet = function(msg, binaryType) {
      var type = packetslist[msg.charAt(0)];
      if (!base64encoder) {
        return { type, data: { base64: true, data: msg.substr(1) } };
      }
      var data = base64encoder.decode(msg.substr(1));
      if (binaryType === "blob" && Blob2) {
        data = new Blob2([data]);
      }
      return { type, data };
    };
    exports.encodePayload = function(packets2, supportsBinary, callback) {
      if (typeof supportsBinary === "function") {
        callback = supportsBinary;
        supportsBinary = null;
      }
      var isBinary = hasBinary(packets2);
      if (supportsBinary && isBinary) {
        if (Blob2 && !dontSendBlobs) {
          return exports.encodePayloadAsBlob(packets2, callback);
        }
        return exports.encodePayloadAsArrayBuffer(packets2, callback);
      }
      if (!packets2.length) {
        return callback("0:");
      }
      function setLengthHeader(message) {
        return message.length + ":" + message;
      }
      function encodeOne(packet, doneCallback) {
        exports.encodePacket(packet, !isBinary ? false : supportsBinary, false, function(message) {
          doneCallback(null, setLengthHeader(message));
        });
      }
      map(packets2, encodeOne, function(err2, results) {
        return callback(results.join(""));
      });
    };
    function map(ary, each, done) {
      var result = new Array(ary.length);
      var next = after(ary.length, done);
      var eachWithIndex = function(i2, el, cb) {
        each(el, function(error, msg) {
          result[i2] = msg;
          cb(error, result);
        });
      };
      for (var i = 0; i < ary.length; i++) {
        eachWithIndex(i, ary[i], next);
      }
    }
    exports.decodePayload = function(data, binaryType, callback) {
      if (typeof data !== "string") {
        return exports.decodePayloadAsBinary(data, binaryType, callback);
      }
      if (typeof binaryType === "function") {
        callback = binaryType;
        binaryType = null;
      }
      var packet;
      if (data === "") {
        return callback(err, 0, 1);
      }
      var length = "", n, msg;
      for (var i = 0, l = data.length; i < l; i++) {
        var chr = data.charAt(i);
        if (chr !== ":") {
          length += chr;
          continue;
        }
        if (length === "" || length != (n = Number(length))) {
          return callback(err, 0, 1);
        }
        msg = data.substr(i + 1, n);
        if (length != msg.length) {
          return callback(err, 0, 1);
        }
        if (msg.length) {
          packet = exports.decodePacket(msg, binaryType, false);
          if (err.type === packet.type && err.data === packet.data) {
            return callback(err, 0, 1);
          }
          var ret = callback(packet, i + n, l);
          if (false === ret)
            return;
        }
        i += n;
        length = "";
      }
      if (length !== "") {
        return callback(err, 0, 1);
      }
    };
    exports.encodePayloadAsArrayBuffer = function(packets2, callback) {
      if (!packets2.length) {
        return callback(new ArrayBuffer(0));
      }
      function encodeOne(packet, doneCallback) {
        exports.encodePacket(packet, true, true, function(data) {
          return doneCallback(null, data);
        });
      }
      map(packets2, encodeOne, function(err2, encodedPackets) {
        var totalLength = encodedPackets.reduce(function(acc, p) {
          var len;
          if (typeof p === "string") {
            len = p.length;
          } else {
            len = p.byteLength;
          }
          return acc + len.toString().length + len + 2;
        }, 0);
        var resultArray = new Uint8Array(totalLength);
        var bufferIndex = 0;
        encodedPackets.forEach(function(p) {
          var isString = typeof p === "string";
          var ab = p;
          if (isString) {
            var view = new Uint8Array(p.length);
            for (var i = 0; i < p.length; i++) {
              view[i] = p.charCodeAt(i);
            }
            ab = view.buffer;
          }
          if (isString) {
            resultArray[bufferIndex++] = 0;
          } else {
            resultArray[bufferIndex++] = 1;
          }
          var lenStr = ab.byteLength.toString();
          for (var i = 0; i < lenStr.length; i++) {
            resultArray[bufferIndex++] = parseInt(lenStr[i]);
          }
          resultArray[bufferIndex++] = 255;
          var view = new Uint8Array(ab);
          for (var i = 0; i < view.length; i++) {
            resultArray[bufferIndex++] = view[i];
          }
        });
        return callback(resultArray.buffer);
      });
    };
    exports.encodePayloadAsBlob = function(packets2, callback) {
      function encodeOne(packet, doneCallback) {
        exports.encodePacket(packet, true, true, function(encoded) {
          var binaryIdentifier = new Uint8Array(1);
          binaryIdentifier[0] = 1;
          if (typeof encoded === "string") {
            var view = new Uint8Array(encoded.length);
            for (var i = 0; i < encoded.length; i++) {
              view[i] = encoded.charCodeAt(i);
            }
            encoded = view.buffer;
            binaryIdentifier[0] = 0;
          }
          var len = encoded instanceof ArrayBuffer ? encoded.byteLength : encoded.size;
          var lenStr = len.toString();
          var lengthAry = new Uint8Array(lenStr.length + 1);
          for (var i = 0; i < lenStr.length; i++) {
            lengthAry[i] = parseInt(lenStr[i]);
          }
          lengthAry[lenStr.length] = 255;
          if (Blob2) {
            var blob2 = new Blob2([binaryIdentifier.buffer, lengthAry.buffer, encoded]);
            doneCallback(null, blob2);
          }
        });
      }
      map(packets2, encodeOne, function(err2, results) {
        return callback(new Blob2(results));
      });
    };
    exports.decodePayloadAsBinary = function(data, binaryType, callback) {
      if (typeof binaryType === "function") {
        callback = binaryType;
        binaryType = null;
      }
      var bufferTail = data;
      var buffers = [];
      while (bufferTail.byteLength > 0) {
        var tailArray = new Uint8Array(bufferTail);
        var isString = tailArray[0] === 0;
        var msgLength = "";
        for (var i = 1; ; i++) {
          if (tailArray[i] === 255)
            break;
          if (msgLength.length > 310) {
            return callback(err, 0, 1);
          }
          msgLength += tailArray[i];
        }
        bufferTail = sliceBuffer(bufferTail, 2 + msgLength.length);
        msgLength = parseInt(msgLength);
        var msg = sliceBuffer(bufferTail, 0, msgLength);
        if (isString) {
          try {
            msg = String.fromCharCode.apply(null, new Uint8Array(msg));
          } catch (e) {
            var typed = new Uint8Array(msg);
            msg = "";
            for (var i = 0; i < typed.length; i++) {
              msg += String.fromCharCode(typed[i]);
            }
          }
        }
        buffers.push(msg);
        bufferTail = sliceBuffer(bufferTail, msgLength);
      }
      var total = buffers.length;
      buffers.forEach(function(buffer, i2) {
        callback(exports.decodePacket(buffer, binaryType, true), i2, total);
      });
    };
  })(browser$2);
  return browser$2;
}
var transport;
var hasRequiredTransport;
function requireTransport() {
  if (hasRequiredTransport)
    return transport;
  hasRequiredTransport = 1;
  var parser = requireBrowser$2();
  var Emitter = requireComponentEmitter();
  transport = Transport;
  function Transport(opts) {
    this.path = opts.path;
    this.hostname = opts.hostname;
    this.port = opts.port;
    this.secure = opts.secure;
    this.query = opts.query;
    this.timestampParam = opts.timestampParam;
    this.timestampRequests = opts.timestampRequests;
    this.readyState = "";
    this.agent = opts.agent || false;
    this.socket = opts.socket;
    this.enablesXDR = opts.enablesXDR;
    this.withCredentials = opts.withCredentials;
    this.pfx = opts.pfx;
    this.key = opts.key;
    this.passphrase = opts.passphrase;
    this.cert = opts.cert;
    this.ca = opts.ca;
    this.ciphers = opts.ciphers;
    this.rejectUnauthorized = opts.rejectUnauthorized;
    this.forceNode = opts.forceNode;
    this.isReactNative = opts.isReactNative;
    this.extraHeaders = opts.extraHeaders;
    this.localAddress = opts.localAddress;
  }
  Emitter(Transport.prototype);
  Transport.prototype.onError = function(msg, desc) {
    var err = new Error(msg);
    err.type = "TransportError";
    err.description = desc;
    this.emit("error", err);
    return this;
  };
  Transport.prototype.open = function() {
    if ("closed" === this.readyState || "" === this.readyState) {
      this.readyState = "opening";
      this.doOpen();
    }
    return this;
  };
  Transport.prototype.close = function() {
    if ("opening" === this.readyState || "open" === this.readyState) {
      this.doClose();
      this.onClose();
    }
    return this;
  };
  Transport.prototype.send = function(packets) {
    if ("open" === this.readyState) {
      this.write(packets);
    } else {
      throw new Error("Transport not open");
    }
  };
  Transport.prototype.onOpen = function() {
    this.readyState = "open";
    this.writable = true;
    this.emit("open");
  };
  Transport.prototype.onData = function(data) {
    var packet = parser.decodePacket(data, this.socket.binaryType);
    this.onPacket(packet);
  };
  Transport.prototype.onPacket = function(packet) {
    this.emit("packet", packet);
  };
  Transport.prototype.onClose = function() {
    this.readyState = "closed";
    this.emit("close");
  };
  return transport;
}
var parseqs = {};
var hasRequiredParseqs;
function requireParseqs() {
  if (hasRequiredParseqs)
    return parseqs;
  hasRequiredParseqs = 1;
  parseqs.encode = function(obj) {
    var str = "";
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        if (str.length)
          str += "&";
        str += encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]);
      }
    }
    return str;
  };
  parseqs.decode = function(qs) {
    var qry = {};
    var pairs = qs.split("&");
    for (var i = 0, l = pairs.length; i < l; i++) {
      var pair = pairs[i].split("=");
      qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return qry;
  };
  return parseqs;
}
var componentInherit;
var hasRequiredComponentInherit;
function requireComponentInherit() {
  if (hasRequiredComponentInherit)
    return componentInherit;
  hasRequiredComponentInherit = 1;
  componentInherit = function(a, b) {
    var fn = function() {
    };
    fn.prototype = b.prototype;
    a.prototype = new fn();
    a.prototype.constructor = a;
  };
  return componentInherit;
}
var yeast_1;
var hasRequiredYeast;
function requireYeast() {
  if (hasRequiredYeast)
    return yeast_1;
  hasRequiredYeast = 1;
  var alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), length = 64, map = {}, seed = 0, i = 0, prev;
  function encode(num) {
    var encoded = "";
    do {
      encoded = alphabet[num % length] + encoded;
      num = Math.floor(num / length);
    } while (num > 0);
    return encoded;
  }
  function decode(str) {
    var decoded = 0;
    for (i = 0; i < str.length; i++) {
      decoded = decoded * length + map[str.charAt(i)];
    }
    return decoded;
  }
  function yeast() {
    var now = encode(+/* @__PURE__ */ new Date());
    if (now !== prev)
      return seed = 0, prev = now;
    return now + "." + encode(seed++);
  }
  for (; i < length; i++)
    map[alphabet[i]] = i;
  yeast.encode = encode;
  yeast.decode = decode;
  yeast_1 = yeast;
  return yeast_1;
}
var browser$1 = { exports: {} };
var debug = { exports: {} };
var ms;
var hasRequiredMs;
function requireMs() {
  if (hasRequiredMs)
    return ms;
  hasRequiredMs = 1;
  var s = 1e3;
  var m = s * 60;
  var h = m * 60;
  var d = h * 24;
  var y = d * 365.25;
  ms = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === "string" && val.length > 0) {
      return parse(val);
    } else if (type === "number" && isNaN(val) === false) {
      return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
    );
  };
  function parse(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
      str
    );
    if (!match) {
      return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || "ms").toLowerCase();
    switch (type) {
      case "years":
      case "year":
      case "yrs":
      case "yr":
      case "y":
        return n * y;
      case "days":
      case "day":
      case "d":
        return n * d;
      case "hours":
      case "hour":
      case "hrs":
      case "hr":
      case "h":
        return n * h;
      case "minutes":
      case "minute":
      case "mins":
      case "min":
      case "m":
        return n * m;
      case "seconds":
      case "second":
      case "secs":
      case "sec":
      case "s":
        return n * s;
      case "milliseconds":
      case "millisecond":
      case "msecs":
      case "msec":
      case "ms":
        return n;
      default:
        return void 0;
    }
  }
  function fmtShort(ms2) {
    if (ms2 >= d) {
      return Math.round(ms2 / d) + "d";
    }
    if (ms2 >= h) {
      return Math.round(ms2 / h) + "h";
    }
    if (ms2 >= m) {
      return Math.round(ms2 / m) + "m";
    }
    if (ms2 >= s) {
      return Math.round(ms2 / s) + "s";
    }
    return ms2 + "ms";
  }
  function fmtLong(ms2) {
    return plural(ms2, d, "day") || plural(ms2, h, "hour") || plural(ms2, m, "minute") || plural(ms2, s, "second") || ms2 + " ms";
  }
  function plural(ms2, n, name) {
    if (ms2 < n) {
      return;
    }
    if (ms2 < n * 1.5) {
      return Math.floor(ms2 / n) + " " + name;
    }
    return Math.ceil(ms2 / n) + " " + name + "s";
  }
  return ms;
}
var hasRequiredDebug;
function requireDebug() {
  if (hasRequiredDebug)
    return debug.exports;
  hasRequiredDebug = 1;
  (function(module, exports) {
    exports = module.exports = createDebug.debug = createDebug["default"] = createDebug;
    exports.coerce = coerce;
    exports.disable = disable;
    exports.enable = enable;
    exports.enabled = enabled;
    exports.humanize = requireMs();
    exports.instances = [];
    exports.names = [];
    exports.skips = [];
    exports.formatters = {};
    function selectColor(namespace) {
      var hash = 0, i;
      for (i in namespace) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i);
        hash |= 0;
      }
      return exports.colors[Math.abs(hash) % exports.colors.length];
    }
    function createDebug(namespace) {
      var prevTime;
      function debug2() {
        if (!debug2.enabled)
          return;
        var self2 = debug2;
        var curr = +/* @__PURE__ */ new Date();
        var ms2 = curr - (prevTime || curr);
        self2.diff = ms2;
        self2.prev = prevTime;
        self2.curr = curr;
        prevTime = curr;
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        args[0] = exports.coerce(args[0]);
        if ("string" !== typeof args[0]) {
          args.unshift("%O");
        }
        var index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
          if (match === "%%")
            return match;
          index++;
          var formatter = exports.formatters[format];
          if ("function" === typeof formatter) {
            var val = args[index];
            match = formatter.call(self2, val);
            args.splice(index, 1);
            index--;
          }
          return match;
        });
        exports.formatArgs.call(self2, args);
        var logFn = debug2.log || exports.log || console.log.bind(console);
        logFn.apply(self2, args);
      }
      debug2.namespace = namespace;
      debug2.enabled = exports.enabled(namespace);
      debug2.useColors = exports.useColors();
      debug2.color = selectColor(namespace);
      debug2.destroy = destroy;
      if ("function" === typeof exports.init) {
        exports.init(debug2);
      }
      exports.instances.push(debug2);
      return debug2;
    }
    function destroy() {
      var index = exports.instances.indexOf(this);
      if (index !== -1) {
        exports.instances.splice(index, 1);
        return true;
      } else {
        return false;
      }
    }
    function enable(namespaces) {
      exports.save(namespaces);
      exports.names = [];
      exports.skips = [];
      var i;
      var split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
      var len = split.length;
      for (i = 0; i < len; i++) {
        if (!split[i])
          continue;
        namespaces = split[i].replace(/\*/g, ".*?");
        if (namespaces[0] === "-") {
          exports.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
        } else {
          exports.names.push(new RegExp("^" + namespaces + "$"));
        }
      }
      for (i = 0; i < exports.instances.length; i++) {
        var instance = exports.instances[i];
        instance.enabled = exports.enabled(instance.namespace);
      }
    }
    function disable() {
      exports.enable("");
    }
    function enabled(name) {
      if (name[name.length - 1] === "*") {
        return true;
      }
      var i, len;
      for (i = 0, len = exports.skips.length; i < len; i++) {
        if (exports.skips[i].test(name)) {
          return false;
        }
      }
      for (i = 0, len = exports.names.length; i < len; i++) {
        if (exports.names[i].test(name)) {
          return true;
        }
      }
      return false;
    }
    function coerce(val) {
      if (val instanceof Error)
        return val.stack || val.message;
      return val;
    }
  })(debug, debug.exports);
  return debug.exports;
}
var hasRequiredBrowser$1;
function requireBrowser$1() {
  if (hasRequiredBrowser$1)
    return browser$1.exports;
  hasRequiredBrowser$1 = 1;
  (function(module, exports) {
    exports = module.exports = requireDebug();
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : localstorage();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && window.process.type === "renderer") {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    exports.formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (err) {
        return "[UnexpectedJSONParseError]: " + err.message;
      }
    };
    function formatArgs(args) {
      var useColors2 = this.useColors;
      args[0] = (useColors2 ? "%c" : "") + this.namespace + (useColors2 ? " %c" : " ") + args[0] + (useColors2 ? "%c " : " ") + "+" + exports.humanize(this.diff);
      if (!useColors2)
        return;
      var c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      var index = 0;
      var lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, function(match) {
        if ("%%" === match)
          return;
        index++;
        if ("%c" === match) {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    function log() {
      return "object" === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
    }
    function save(namespaces) {
      try {
        if (null == namespaces) {
          exports.storage.removeItem("debug");
        } else {
          exports.storage.debug = namespaces;
        }
      } catch (e) {
      }
    }
    function load() {
      var r;
      try {
        r = exports.storage.debug;
      } catch (e) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = {}.DEBUG;
      }
      return r;
    }
    exports.enable(load());
    function localstorage() {
      try {
        return window.localStorage;
      } catch (e) {
      }
    }
  })(browser$1, browser$1.exports);
  return browser$1.exports;
}
var polling;
var hasRequiredPolling;
function requirePolling() {
  if (hasRequiredPolling)
    return polling;
  hasRequiredPolling = 1;
  var Transport = requireTransport();
  var parseqs2 = requireParseqs();
  var parser = requireBrowser$2();
  var inherit = requireComponentInherit();
  var yeast = requireYeast();
  var debug2 = requireBrowser$1()("engine.io-client:polling");
  polling = Polling;
  var hasXHR2 = function() {
    var XMLHttpRequest2 = requireXmlhttprequest_browser();
    var xhr = new XMLHttpRequest2({ xdomain: false });
    return null != xhr.responseType;
  }();
  function Polling(opts) {
    var forceBase64 = opts && opts.forceBase64;
    if (!hasXHR2 || forceBase64) {
      this.supportsBinary = false;
    }
    Transport.call(this, opts);
  }
  inherit(Polling, Transport);
  Polling.prototype.name = "polling";
  Polling.prototype.doOpen = function() {
    this.poll();
  };
  Polling.prototype.pause = function(onPause) {
    var self2 = this;
    this.readyState = "pausing";
    function pause() {
      debug2("paused");
      self2.readyState = "paused";
      onPause();
    }
    if (this.polling || !this.writable) {
      var total = 0;
      if (this.polling) {
        debug2("we are currently polling - waiting to pause");
        total++;
        this.once("pollComplete", function() {
          debug2("pre-pause polling complete");
          --total || pause();
        });
      }
      if (!this.writable) {
        debug2("we are currently writing - waiting to pause");
        total++;
        this.once("drain", function() {
          debug2("pre-pause writing complete");
          --total || pause();
        });
      }
    } else {
      pause();
    }
  };
  Polling.prototype.poll = function() {
    debug2("polling");
    this.polling = true;
    this.doPoll();
    this.emit("poll");
  };
  Polling.prototype.onData = function(data) {
    var self2 = this;
    debug2("polling got data %s", data);
    var callback = function(packet, index, total) {
      if ("opening" === self2.readyState && packet.type === "open") {
        self2.onOpen();
      }
      if ("close" === packet.type) {
        self2.onClose();
        return false;
      }
      self2.onPacket(packet);
    };
    parser.decodePayload(data, this.socket.binaryType, callback);
    if ("closed" !== this.readyState) {
      this.polling = false;
      this.emit("pollComplete");
      if ("open" === this.readyState) {
        this.poll();
      } else {
        debug2('ignoring poll - transport state "%s"', this.readyState);
      }
    }
  };
  Polling.prototype.doClose = function() {
    var self2 = this;
    function close() {
      debug2("writing close packet");
      self2.write([{ type: "close" }]);
    }
    if ("open" === this.readyState) {
      debug2("transport open - closing");
      close();
    } else {
      debug2("transport not open - deferring close");
      this.once("open", close);
    }
  };
  Polling.prototype.write = function(packets) {
    var self2 = this;
    this.writable = false;
    var callbackfn = function() {
      self2.writable = true;
      self2.emit("drain");
    };
    parser.encodePayload(packets, this.supportsBinary, function(data) {
      self2.doWrite(data, callbackfn);
    });
  };
  Polling.prototype.uri = function() {
    var query = this.query || {};
    var schema = this.secure ? "https" : "http";
    var port = "";
    if (false !== this.timestampRequests) {
      query[this.timestampParam] = yeast();
    }
    if (!this.supportsBinary && !query.sid) {
      query.b64 = 1;
    }
    query = parseqs2.encode(query);
    if (this.port && ("https" === schema && Number(this.port) !== 443 || "http" === schema && Number(this.port) !== 80)) {
      port = ":" + this.port;
    }
    if (query.length) {
      query = "?" + query;
    }
    var ipv6 = this.hostname.indexOf(":") !== -1;
    return schema + "://" + (ipv6 ? "[" + this.hostname + "]" : this.hostname) + port + this.path + query;
  };
  return polling;
}
var hasRequiredPollingXhr;
function requirePollingXhr() {
  if (hasRequiredPollingXhr)
    return pollingXhr.exports;
  hasRequiredPollingXhr = 1;
  var XMLHttpRequest2 = requireXmlhttprequest_browser();
  var Polling = requirePolling();
  var Emitter = requireComponentEmitter();
  var inherit = requireComponentInherit();
  var debug2 = requireBrowser$1()("engine.io-client:polling-xhr");
  var globalThis = requireGlobalThis_browser();
  pollingXhr.exports = XHR;
  pollingXhr.exports.Request = Request;
  function empty() {
  }
  function XHR(opts) {
    Polling.call(this, opts);
    this.requestTimeout = opts.requestTimeout;
    this.extraHeaders = opts.extraHeaders;
    if (typeof location !== "undefined") {
      var isSSL = "https:" === location.protocol;
      var port = location.port;
      if (!port) {
        port = isSSL ? 443 : 80;
      }
      this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
      this.xs = opts.secure !== isSSL;
    }
  }
  inherit(XHR, Polling);
  XHR.prototype.supportsBinary = true;
  XHR.prototype.request = function(opts) {
    opts = opts || {};
    opts.uri = this.uri();
    opts.xd = this.xd;
    opts.xs = this.xs;
    opts.agent = this.agent || false;
    opts.supportsBinary = this.supportsBinary;
    opts.enablesXDR = this.enablesXDR;
    opts.withCredentials = this.withCredentials;
    opts.pfx = this.pfx;
    opts.key = this.key;
    opts.passphrase = this.passphrase;
    opts.cert = this.cert;
    opts.ca = this.ca;
    opts.ciphers = this.ciphers;
    opts.rejectUnauthorized = this.rejectUnauthorized;
    opts.requestTimeout = this.requestTimeout;
    opts.extraHeaders = this.extraHeaders;
    return new Request(opts);
  };
  XHR.prototype.doWrite = function(data, fn) {
    var isBinary = typeof data !== "string" && data !== void 0;
    var req = this.request({ method: "POST", data, isBinary });
    var self2 = this;
    req.on("success", fn);
    req.on("error", function(err) {
      self2.onError("xhr post error", err);
    });
    this.sendXhr = req;
  };
  XHR.prototype.doPoll = function() {
    debug2("xhr poll");
    var req = this.request();
    var self2 = this;
    req.on("data", function(data) {
      self2.onData(data);
    });
    req.on("error", function(err) {
      self2.onError("xhr poll error", err);
    });
    this.pollXhr = req;
  };
  function Request(opts) {
    this.method = opts.method || "GET";
    this.uri = opts.uri;
    this.xd = !!opts.xd;
    this.xs = !!opts.xs;
    this.async = false !== opts.async;
    this.data = void 0 !== opts.data ? opts.data : null;
    this.agent = opts.agent;
    this.isBinary = opts.isBinary;
    this.supportsBinary = opts.supportsBinary;
    this.enablesXDR = opts.enablesXDR;
    this.withCredentials = opts.withCredentials;
    this.requestTimeout = opts.requestTimeout;
    this.pfx = opts.pfx;
    this.key = opts.key;
    this.passphrase = opts.passphrase;
    this.cert = opts.cert;
    this.ca = opts.ca;
    this.ciphers = opts.ciphers;
    this.rejectUnauthorized = opts.rejectUnauthorized;
    this.extraHeaders = opts.extraHeaders;
    this.create();
  }
  Emitter(Request.prototype);
  Request.prototype.create = function() {
    var opts = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };
    opts.pfx = this.pfx;
    opts.key = this.key;
    opts.passphrase = this.passphrase;
    opts.cert = this.cert;
    opts.ca = this.ca;
    opts.ciphers = this.ciphers;
    opts.rejectUnauthorized = this.rejectUnauthorized;
    var xhr = this.xhr = new XMLHttpRequest2(opts);
    var self2 = this;
    try {
      debug2("xhr open %s: %s", this.method, this.uri);
      xhr.open(this.method, this.uri, this.async);
      try {
        if (this.extraHeaders) {
          xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
          for (var i in this.extraHeaders) {
            if (this.extraHeaders.hasOwnProperty(i)) {
              xhr.setRequestHeader(i, this.extraHeaders[i]);
            }
          }
        }
      } catch (e) {
      }
      if ("POST" === this.method) {
        try {
          if (this.isBinary) {
            xhr.setRequestHeader("Content-type", "application/octet-stream");
          } else {
            xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
          }
        } catch (e) {
        }
      }
      try {
        xhr.setRequestHeader("Accept", "*/*");
      } catch (e) {
      }
      if ("withCredentials" in xhr) {
        xhr.withCredentials = this.withCredentials;
      }
      if (this.requestTimeout) {
        xhr.timeout = this.requestTimeout;
      }
      if (this.hasXDR()) {
        xhr.onload = function() {
          self2.onLoad();
        };
        xhr.onerror = function() {
          self2.onError(xhr.responseText);
        };
      } else {
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 2) {
            try {
              var contentType = xhr.getResponseHeader("Content-Type");
              if (self2.supportsBinary && contentType === "application/octet-stream" || contentType === "application/octet-stream; charset=UTF-8") {
                xhr.responseType = "arraybuffer";
              }
            } catch (e) {
            }
          }
          if (4 !== xhr.readyState)
            return;
          if (200 === xhr.status || 1223 === xhr.status) {
            self2.onLoad();
          } else {
            setTimeout(function() {
              self2.onError(typeof xhr.status === "number" ? xhr.status : 0);
            }, 0);
          }
        };
      }
      debug2("xhr data %s", this.data);
      xhr.send(this.data);
    } catch (e) {
      setTimeout(function() {
        self2.onError(e);
      }, 0);
      return;
    }
    if (typeof document !== "undefined") {
      this.index = Request.requestsCount++;
      Request.requests[this.index] = this;
    }
  };
  Request.prototype.onSuccess = function() {
    this.emit("success");
    this.cleanup();
  };
  Request.prototype.onData = function(data) {
    this.emit("data", data);
    this.onSuccess();
  };
  Request.prototype.onError = function(err) {
    this.emit("error", err);
    this.cleanup(true);
  };
  Request.prototype.cleanup = function(fromError) {
    if ("undefined" === typeof this.xhr || null === this.xhr) {
      return;
    }
    if (this.hasXDR()) {
      this.xhr.onload = this.xhr.onerror = empty;
    } else {
      this.xhr.onreadystatechange = empty;
    }
    if (fromError) {
      try {
        this.xhr.abort();
      } catch (e) {
      }
    }
    if (typeof document !== "undefined") {
      delete Request.requests[this.index];
    }
    this.xhr = null;
  };
  Request.prototype.onLoad = function() {
    var data;
    try {
      var contentType;
      try {
        contentType = this.xhr.getResponseHeader("Content-Type");
      } catch (e) {
      }
      if (contentType === "application/octet-stream" || contentType === "application/octet-stream; charset=UTF-8") {
        data = this.xhr.response || this.xhr.responseText;
      } else {
        data = this.xhr.responseText;
      }
    } catch (e) {
      this.onError(e);
    }
    if (null != data) {
      this.onData(data);
    }
  };
  Request.prototype.hasXDR = function() {
    return typeof XDomainRequest !== "undefined" && !this.xs && this.enablesXDR;
  };
  Request.prototype.abort = function() {
    this.cleanup();
  };
  Request.requestsCount = 0;
  Request.requests = {};
  if (typeof document !== "undefined") {
    if (typeof attachEvent === "function") {
      attachEvent("onunload", unloadHandler);
    } else if (typeof addEventListener === "function") {
      var terminationEvent = "onpagehide" in globalThis ? "pagehide" : "unload";
      addEventListener(terminationEvent, unloadHandler, false);
    }
  }
  function unloadHandler() {
    for (var i in Request.requests) {
      if (Request.requests.hasOwnProperty(i)) {
        Request.requests[i].abort();
      }
    }
  }
  return pollingXhr.exports;
}
var pollingJsonp;
var hasRequiredPollingJsonp;
function requirePollingJsonp() {
  if (hasRequiredPollingJsonp)
    return pollingJsonp;
  hasRequiredPollingJsonp = 1;
  var Polling = requirePolling();
  var inherit = requireComponentInherit();
  var globalThis = requireGlobalThis_browser();
  pollingJsonp = JSONPPolling;
  var rNewline = /\n/g;
  var rEscapedNewline = /\\n/g;
  var callbacks;
  function empty() {
  }
  function JSONPPolling(opts) {
    Polling.call(this, opts);
    this.query = this.query || {};
    if (!callbacks) {
      callbacks = globalThis.___eio = globalThis.___eio || [];
    }
    this.index = callbacks.length;
    var self2 = this;
    callbacks.push(function(msg) {
      self2.onData(msg);
    });
    this.query.j = this.index;
    if (typeof addEventListener === "function") {
      addEventListener("beforeunload", function() {
        if (self2.script)
          self2.script.onerror = empty;
      }, false);
    }
  }
  inherit(JSONPPolling, Polling);
  JSONPPolling.prototype.supportsBinary = false;
  JSONPPolling.prototype.doClose = function() {
    if (this.script) {
      this.script.parentNode.removeChild(this.script);
      this.script = null;
    }
    if (this.form) {
      this.form.parentNode.removeChild(this.form);
      this.form = null;
      this.iframe = null;
    }
    Polling.prototype.doClose.call(this);
  };
  JSONPPolling.prototype.doPoll = function() {
    var self2 = this;
    var script = document.createElement("script");
    if (this.script) {
      this.script.parentNode.removeChild(this.script);
      this.script = null;
    }
    script.async = true;
    script.src = this.uri();
    script.onerror = function(e) {
      self2.onError("jsonp poll error", e);
    };
    var insertAt = document.getElementsByTagName("script")[0];
    if (insertAt) {
      insertAt.parentNode.insertBefore(script, insertAt);
    } else {
      (document.head || document.body).appendChild(script);
    }
    this.script = script;
    var isUAgecko = "undefined" !== typeof navigator && /gecko/i.test(navigator.userAgent);
    if (isUAgecko) {
      setTimeout(function() {
        var iframe = document.createElement("iframe");
        document.body.appendChild(iframe);
        document.body.removeChild(iframe);
      }, 100);
    }
  };
  JSONPPolling.prototype.doWrite = function(data, fn) {
    var self2 = this;
    if (!this.form) {
      var form = document.createElement("form");
      var area = document.createElement("textarea");
      var id = this.iframeId = "eio_iframe_" + this.index;
      var iframe;
      form.className = "socketio";
      form.style.position = "absolute";
      form.style.top = "-1000px";
      form.style.left = "-1000px";
      form.target = id;
      form.method = "POST";
      form.setAttribute("accept-charset", "utf-8");
      area.name = "d";
      form.appendChild(area);
      document.body.appendChild(form);
      this.form = form;
      this.area = area;
    }
    this.form.action = this.uri();
    function complete() {
      initIframe();
      fn();
    }
    function initIframe() {
      if (self2.iframe) {
        try {
          self2.form.removeChild(self2.iframe);
        } catch (e) {
          self2.onError("jsonp polling iframe removal error", e);
        }
      }
      try {
        var html = '<iframe src="javascript:0" name="' + self2.iframeId + '">';
        iframe = document.createElement(html);
      } catch (e) {
        iframe = document.createElement("iframe");
        iframe.name = self2.iframeId;
        iframe.src = "javascript:0";
      }
      iframe.id = self2.iframeId;
      self2.form.appendChild(iframe);
      self2.iframe = iframe;
    }
    initIframe();
    data = data.replace(rEscapedNewline, "\\\n");
    this.area.value = data.replace(rNewline, "\\n");
    try {
      this.form.submit();
    } catch (e) {
    }
    if (this.iframe.attachEvent) {
      this.iframe.onreadystatechange = function() {
        if (self2.iframe.readyState === "complete") {
          complete();
        }
      };
    } else {
      this.iframe.onload = complete;
    }
  };
  return pollingJsonp;
}
const __viteBrowserExternal = {};
const __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __viteBrowserExternal
}, Symbol.toStringTag, { value: "Module" }));
const require$$6 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
var websocket;
var hasRequiredWebsocket;
function requireWebsocket() {
  if (hasRequiredWebsocket)
    return websocket;
  hasRequiredWebsocket = 1;
  var Transport = requireTransport();
  var parser = requireBrowser$2();
  var parseqs2 = requireParseqs();
  var inherit = requireComponentInherit();
  var yeast = requireYeast();
  var debug2 = requireBrowser$1()("engine.io-client:websocket");
  var BrowserWebSocket, NodeWebSocket;
  if (typeof WebSocket !== "undefined") {
    BrowserWebSocket = WebSocket;
  } else if (typeof self !== "undefined") {
    BrowserWebSocket = self.WebSocket || self.MozWebSocket;
  }
  if (typeof window === "undefined") {
    try {
      NodeWebSocket = require$$6;
    } catch (e) {
    }
  }
  var WebSocketImpl = BrowserWebSocket || NodeWebSocket;
  websocket = WS;
  function WS(opts) {
    var forceBase64 = opts && opts.forceBase64;
    if (forceBase64) {
      this.supportsBinary = false;
    }
    this.perMessageDeflate = opts.perMessageDeflate;
    this.usingBrowserWebSocket = BrowserWebSocket && !opts.forceNode;
    this.protocols = opts.protocols;
    if (!this.usingBrowserWebSocket) {
      WebSocketImpl = NodeWebSocket;
    }
    Transport.call(this, opts);
  }
  inherit(WS, Transport);
  WS.prototype.name = "websocket";
  WS.prototype.supportsBinary = true;
  WS.prototype.doOpen = function() {
    if (!this.check()) {
      return;
    }
    var uri = this.uri();
    var protocols = this.protocols;
    var opts = {};
    if (!this.isReactNative) {
      opts.agent = this.agent;
      opts.perMessageDeflate = this.perMessageDeflate;
      opts.pfx = this.pfx;
      opts.key = this.key;
      opts.passphrase = this.passphrase;
      opts.cert = this.cert;
      opts.ca = this.ca;
      opts.ciphers = this.ciphers;
      opts.rejectUnauthorized = this.rejectUnauthorized;
    }
    if (this.extraHeaders) {
      opts.headers = this.extraHeaders;
    }
    if (this.localAddress) {
      opts.localAddress = this.localAddress;
    }
    try {
      this.ws = this.usingBrowserWebSocket && !this.isReactNative ? protocols ? new WebSocketImpl(uri, protocols) : new WebSocketImpl(uri) : new WebSocketImpl(uri, protocols, opts);
    } catch (err) {
      return this.emit("error", err);
    }
    if (this.ws.binaryType === void 0) {
      this.supportsBinary = false;
    }
    if (this.ws.supports && this.ws.supports.binary) {
      this.supportsBinary = true;
      this.ws.binaryType = "nodebuffer";
    } else {
      this.ws.binaryType = "arraybuffer";
    }
    this.addEventListeners();
  };
  WS.prototype.addEventListeners = function() {
    var self2 = this;
    this.ws.onopen = function() {
      self2.onOpen();
    };
    this.ws.onclose = function() {
      self2.onClose();
    };
    this.ws.onmessage = function(ev) {
      self2.onData(ev.data);
    };
    this.ws.onerror = function(e) {
      self2.onError("websocket error", e);
    };
  };
  WS.prototype.write = function(packets) {
    var self2 = this;
    this.writable = false;
    var total = packets.length;
    for (var i = 0, l = total; i < l; i++) {
      (function(packet) {
        parser.encodePacket(packet, self2.supportsBinary, function(data) {
          if (!self2.usingBrowserWebSocket) {
            var opts = {};
            if (packet.options) {
              opts.compress = packet.options.compress;
            }
            if (self2.perMessageDeflate) {
              var len = "string" === typeof data ? Buffer.byteLength(data) : data.length;
              if (len < self2.perMessageDeflate.threshold) {
                opts.compress = false;
              }
            }
          }
          try {
            if (self2.usingBrowserWebSocket) {
              self2.ws.send(data);
            } else {
              self2.ws.send(data, opts);
            }
          } catch (e) {
            debug2("websocket closed before onclose event");
          }
          --total || done();
        });
      })(packets[i]);
    }
    function done() {
      self2.emit("flush");
      setTimeout(function() {
        self2.writable = true;
        self2.emit("drain");
      }, 0);
    }
  };
  WS.prototype.onClose = function() {
    Transport.prototype.onClose.call(this);
  };
  WS.prototype.doClose = function() {
    if (typeof this.ws !== "undefined") {
      this.ws.close();
    }
  };
  WS.prototype.uri = function() {
    var query = this.query || {};
    var schema = this.secure ? "wss" : "ws";
    var port = "";
    if (this.port && ("wss" === schema && Number(this.port) !== 443 || "ws" === schema && Number(this.port) !== 80)) {
      port = ":" + this.port;
    }
    if (this.timestampRequests) {
      query[this.timestampParam] = yeast();
    }
    if (!this.supportsBinary) {
      query.b64 = 1;
    }
    query = parseqs2.encode(query);
    if (query.length) {
      query = "?" + query;
    }
    var ipv6 = this.hostname.indexOf(":") !== -1;
    return schema + "://" + (ipv6 ? "[" + this.hostname + "]" : this.hostname) + port + this.path + query;
  };
  WS.prototype.check = function() {
    return !!WebSocketImpl && !("__initialize" in WebSocketImpl && this.name === WS.prototype.name);
  };
  return websocket;
}
var hasRequiredTransports;
function requireTransports() {
  if (hasRequiredTransports)
    return transports;
  hasRequiredTransports = 1;
  var XMLHttpRequest2 = requireXmlhttprequest_browser();
  var XHR = requirePollingXhr();
  var JSONP = requirePollingJsonp();
  var websocket2 = requireWebsocket();
  transports.polling = polling2;
  transports.websocket = websocket2;
  function polling2(opts) {
    var xhr;
    var xd = false;
    var xs = false;
    var jsonp = false !== opts.jsonp;
    if (typeof location !== "undefined") {
      var isSSL = "https:" === location.protocol;
      var port = location.port;
      if (!port) {
        port = isSSL ? 443 : 80;
      }
      xd = opts.hostname !== location.hostname || port !== opts.port;
      xs = opts.secure !== isSSL;
    }
    opts.xdomain = xd;
    opts.xscheme = xs;
    xhr = new XMLHttpRequest2(opts);
    if ("open" in xhr && !opts.forceJSONP) {
      return new XHR(opts);
    } else {
      if (!jsonp)
        throw new Error("JSONP disabled");
      return new JSONP(opts);
    }
  }
  return transports;
}
var indexof;
var hasRequiredIndexof;
function requireIndexof() {
  if (hasRequiredIndexof)
    return indexof;
  hasRequiredIndexof = 1;
  var indexOf = [].indexOf;
  indexof = function(arr, obj) {
    if (indexOf)
      return arr.indexOf(obj);
    for (var i = 0; i < arr.length; ++i) {
      if (arr[i] === obj)
        return i;
    }
    return -1;
  };
  return indexof;
}
var socket$1;
var hasRequiredSocket$1;
function requireSocket$1() {
  if (hasRequiredSocket$1)
    return socket$1;
  hasRequiredSocket$1 = 1;
  var transports2 = requireTransports();
  var Emitter = requireComponentEmitter();
  var debug2 = requireBrowser$1()("engine.io-client:socket");
  var index = requireIndexof();
  var parser = requireBrowser$2();
  var parseuri2 = requireParseuri();
  var parseqs2 = requireParseqs();
  socket$1 = Socket;
  function Socket(uri, opts) {
    if (!(this instanceof Socket))
      return new Socket(uri, opts);
    opts = opts || {};
    if (uri && "object" === typeof uri) {
      opts = uri;
      uri = null;
    }
    if (uri) {
      uri = parseuri2(uri);
      opts.hostname = uri.host;
      opts.secure = uri.protocol === "https" || uri.protocol === "wss";
      opts.port = uri.port;
      if (uri.query)
        opts.query = uri.query;
    } else if (opts.host) {
      opts.hostname = parseuri2(opts.host).host;
    }
    this.secure = null != opts.secure ? opts.secure : typeof location !== "undefined" && "https:" === location.protocol;
    if (opts.hostname && !opts.port) {
      opts.port = this.secure ? "443" : "80";
    }
    this.agent = opts.agent || false;
    this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
    this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : this.secure ? 443 : 80);
    this.query = opts.query || {};
    if ("string" === typeof this.query)
      this.query = parseqs2.decode(this.query);
    this.upgrade = false !== opts.upgrade;
    this.path = (opts.path || "/engine.io").replace(/\/$/, "") + "/";
    this.forceJSONP = !!opts.forceJSONP;
    this.jsonp = false !== opts.jsonp;
    this.forceBase64 = !!opts.forceBase64;
    this.enablesXDR = !!opts.enablesXDR;
    this.withCredentials = false !== opts.withCredentials;
    this.timestampParam = opts.timestampParam || "t";
    this.timestampRequests = opts.timestampRequests;
    this.transports = opts.transports || ["polling", "websocket"];
    this.transportOptions = opts.transportOptions || {};
    this.readyState = "";
    this.writeBuffer = [];
    this.prevBufferLen = 0;
    this.policyPort = opts.policyPort || 843;
    this.rememberUpgrade = opts.rememberUpgrade || false;
    this.binaryType = null;
    this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
    this.perMessageDeflate = false !== opts.perMessageDeflate ? opts.perMessageDeflate || {} : false;
    if (true === this.perMessageDeflate)
      this.perMessageDeflate = {};
    if (this.perMessageDeflate && null == this.perMessageDeflate.threshold) {
      this.perMessageDeflate.threshold = 1024;
    }
    this.pfx = opts.pfx || void 0;
    this.key = opts.key || void 0;
    this.passphrase = opts.passphrase || void 0;
    this.cert = opts.cert || void 0;
    this.ca = opts.ca || void 0;
    this.ciphers = opts.ciphers || void 0;
    this.rejectUnauthorized = opts.rejectUnauthorized === void 0 ? true : opts.rejectUnauthorized;
    this.forceNode = !!opts.forceNode;
    this.isReactNative = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
    if (typeof self === "undefined" || this.isReactNative) {
      if (opts.extraHeaders && Object.keys(opts.extraHeaders).length > 0) {
        this.extraHeaders = opts.extraHeaders;
      }
      if (opts.localAddress) {
        this.localAddress = opts.localAddress;
      }
    }
    this.id = null;
    this.upgrades = null;
    this.pingInterval = null;
    this.pingTimeout = null;
    this.pingIntervalTimer = null;
    this.pingTimeoutTimer = null;
    this.open();
  }
  Socket.priorWebsocketSuccess = false;
  Emitter(Socket.prototype);
  Socket.protocol = parser.protocol;
  Socket.Socket = Socket;
  Socket.Transport = requireTransport();
  Socket.transports = requireTransports();
  Socket.parser = requireBrowser$2();
  Socket.prototype.createTransport = function(name) {
    debug2('creating transport "%s"', name);
    var query = clone(this.query);
    query.EIO = parser.protocol;
    query.transport = name;
    var options = this.transportOptions[name] || {};
    if (this.id)
      query.sid = this.id;
    var transport2 = new transports2[name]({
      query,
      socket: this,
      agent: options.agent || this.agent,
      hostname: options.hostname || this.hostname,
      port: options.port || this.port,
      secure: options.secure || this.secure,
      path: options.path || this.path,
      forceJSONP: options.forceJSONP || this.forceJSONP,
      jsonp: options.jsonp || this.jsonp,
      forceBase64: options.forceBase64 || this.forceBase64,
      enablesXDR: options.enablesXDR || this.enablesXDR,
      withCredentials: options.withCredentials || this.withCredentials,
      timestampRequests: options.timestampRequests || this.timestampRequests,
      timestampParam: options.timestampParam || this.timestampParam,
      policyPort: options.policyPort || this.policyPort,
      pfx: options.pfx || this.pfx,
      key: options.key || this.key,
      passphrase: options.passphrase || this.passphrase,
      cert: options.cert || this.cert,
      ca: options.ca || this.ca,
      ciphers: options.ciphers || this.ciphers,
      rejectUnauthorized: options.rejectUnauthorized || this.rejectUnauthorized,
      perMessageDeflate: options.perMessageDeflate || this.perMessageDeflate,
      extraHeaders: options.extraHeaders || this.extraHeaders,
      forceNode: options.forceNode || this.forceNode,
      localAddress: options.localAddress || this.localAddress,
      requestTimeout: options.requestTimeout || this.requestTimeout,
      protocols: options.protocols || void 0,
      isReactNative: this.isReactNative
    });
    return transport2;
  };
  function clone(obj) {
    var o = {};
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        o[i] = obj[i];
      }
    }
    return o;
  }
  Socket.prototype.open = function() {
    var transport2;
    if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1) {
      transport2 = "websocket";
    } else if (0 === this.transports.length) {
      var self2 = this;
      setTimeout(function() {
        self2.emit("error", "No transports available");
      }, 0);
      return;
    } else {
      transport2 = this.transports[0];
    }
    this.readyState = "opening";
    try {
      transport2 = this.createTransport(transport2);
    } catch (e) {
      this.transports.shift();
      this.open();
      return;
    }
    transport2.open();
    this.setTransport(transport2);
  };
  Socket.prototype.setTransport = function(transport2) {
    debug2("setting transport %s", transport2.name);
    var self2 = this;
    if (this.transport) {
      debug2("clearing existing transport %s", this.transport.name);
      this.transport.removeAllListeners();
    }
    this.transport = transport2;
    transport2.on("drain", function() {
      self2.onDrain();
    }).on("packet", function(packet) {
      self2.onPacket(packet);
    }).on("error", function(e) {
      self2.onError(e);
    }).on("close", function() {
      self2.onClose("transport close");
    });
  };
  Socket.prototype.probe = function(name) {
    debug2('probing transport "%s"', name);
    var transport2 = this.createTransport(name, { probe: 1 });
    var failed = false;
    var self2 = this;
    Socket.priorWebsocketSuccess = false;
    function onTransportOpen() {
      if (self2.onlyBinaryUpgrades) {
        var upgradeLosesBinary = !this.supportsBinary && self2.transport.supportsBinary;
        failed = failed || upgradeLosesBinary;
      }
      if (failed)
        return;
      debug2('probe transport "%s" opened', name);
      transport2.send([{ type: "ping", data: "probe" }]);
      transport2.once("packet", function(msg) {
        if (failed)
          return;
        if ("pong" === msg.type && "probe" === msg.data) {
          debug2('probe transport "%s" pong', name);
          self2.upgrading = true;
          self2.emit("upgrading", transport2);
          if (!transport2)
            return;
          Socket.priorWebsocketSuccess = "websocket" === transport2.name;
          debug2('pausing current transport "%s"', self2.transport.name);
          self2.transport.pause(function() {
            if (failed)
              return;
            if ("closed" === self2.readyState)
              return;
            debug2("changing transport and sending upgrade packet");
            cleanup();
            self2.setTransport(transport2);
            transport2.send([{ type: "upgrade" }]);
            self2.emit("upgrade", transport2);
            transport2 = null;
            self2.upgrading = false;
            self2.flush();
          });
        } else {
          debug2('probe transport "%s" failed', name);
          var err = new Error("probe error");
          err.transport = transport2.name;
          self2.emit("upgradeError", err);
        }
      });
    }
    function freezeTransport() {
      if (failed)
        return;
      failed = true;
      cleanup();
      transport2.close();
      transport2 = null;
    }
    function onerror(err) {
      var error = new Error("probe error: " + err);
      error.transport = transport2.name;
      freezeTransport();
      debug2('probe transport "%s" failed because of error: %s', name, err);
      self2.emit("upgradeError", error);
    }
    function onTransportClose() {
      onerror("transport closed");
    }
    function onclose() {
      onerror("socket closed");
    }
    function onupgrade(to) {
      if (transport2 && to.name !== transport2.name) {
        debug2('"%s" works - aborting "%s"', to.name, transport2.name);
        freezeTransport();
      }
    }
    function cleanup() {
      transport2.removeListener("open", onTransportOpen);
      transport2.removeListener("error", onerror);
      transport2.removeListener("close", onTransportClose);
      self2.removeListener("close", onclose);
      self2.removeListener("upgrading", onupgrade);
    }
    transport2.once("open", onTransportOpen);
    transport2.once("error", onerror);
    transport2.once("close", onTransportClose);
    this.once("close", onclose);
    this.once("upgrading", onupgrade);
    transport2.open();
  };
  Socket.prototype.onOpen = function() {
    debug2("socket open");
    this.readyState = "open";
    Socket.priorWebsocketSuccess = "websocket" === this.transport.name;
    this.emit("open");
    this.flush();
    if ("open" === this.readyState && this.upgrade && this.transport.pause) {
      debug2("starting upgrade probes");
      for (var i = 0, l = this.upgrades.length; i < l; i++) {
        this.probe(this.upgrades[i]);
      }
    }
  };
  Socket.prototype.onPacket = function(packet) {
    if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
      debug2('socket receive: type "%s", data "%s"', packet.type, packet.data);
      this.emit("packet", packet);
      this.emit("heartbeat");
      switch (packet.type) {
        case "open":
          this.onHandshake(JSON.parse(packet.data));
          break;
        case "pong":
          this.setPing();
          this.emit("pong");
          break;
        case "error":
          var err = new Error("server error");
          err.code = packet.data;
          this.onError(err);
          break;
        case "message":
          this.emit("data", packet.data);
          this.emit("message", packet.data);
          break;
      }
    } else {
      debug2('packet received with socket readyState "%s"', this.readyState);
    }
  };
  Socket.prototype.onHandshake = function(data) {
    this.emit("handshake", data);
    this.id = data.sid;
    this.transport.query.sid = data.sid;
    this.upgrades = this.filterUpgrades(data.upgrades);
    this.pingInterval = data.pingInterval;
    this.pingTimeout = data.pingTimeout;
    this.onOpen();
    if ("closed" === this.readyState)
      return;
    this.setPing();
    this.removeListener("heartbeat", this.onHeartbeat);
    this.on("heartbeat", this.onHeartbeat);
  };
  Socket.prototype.onHeartbeat = function(timeout) {
    clearTimeout(this.pingTimeoutTimer);
    var self2 = this;
    self2.pingTimeoutTimer = setTimeout(function() {
      if ("closed" === self2.readyState)
        return;
      self2.onClose("ping timeout");
    }, timeout || self2.pingInterval + self2.pingTimeout);
  };
  Socket.prototype.setPing = function() {
    var self2 = this;
    clearTimeout(self2.pingIntervalTimer);
    self2.pingIntervalTimer = setTimeout(function() {
      debug2("writing ping packet - expecting pong within %sms", self2.pingTimeout);
      self2.ping();
      self2.onHeartbeat(self2.pingTimeout);
    }, self2.pingInterval);
  };
  Socket.prototype.ping = function() {
    var self2 = this;
    this.sendPacket("ping", function() {
      self2.emit("ping");
    });
  };
  Socket.prototype.onDrain = function() {
    this.writeBuffer.splice(0, this.prevBufferLen);
    this.prevBufferLen = 0;
    if (0 === this.writeBuffer.length) {
      this.emit("drain");
    } else {
      this.flush();
    }
  };
  Socket.prototype.flush = function() {
    if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
      debug2("flushing %d packets in socket", this.writeBuffer.length);
      this.transport.send(this.writeBuffer);
      this.prevBufferLen = this.writeBuffer.length;
      this.emit("flush");
    }
  };
  Socket.prototype.write = Socket.prototype.send = function(msg, options, fn) {
    this.sendPacket("message", msg, options, fn);
    return this;
  };
  Socket.prototype.sendPacket = function(type, data, options, fn) {
    if ("function" === typeof data) {
      fn = data;
      data = void 0;
    }
    if ("function" === typeof options) {
      fn = options;
      options = null;
    }
    if ("closing" === this.readyState || "closed" === this.readyState) {
      return;
    }
    options = options || {};
    options.compress = false !== options.compress;
    var packet = {
      type,
      data,
      options
    };
    this.emit("packetCreate", packet);
    this.writeBuffer.push(packet);
    if (fn)
      this.once("flush", fn);
    this.flush();
  };
  Socket.prototype.close = function() {
    if ("opening" === this.readyState || "open" === this.readyState) {
      this.readyState = "closing";
      var self2 = this;
      if (this.writeBuffer.length) {
        this.once("drain", function() {
          if (this.upgrading) {
            waitForUpgrade();
          } else {
            close();
          }
        });
      } else if (this.upgrading) {
        waitForUpgrade();
      } else {
        close();
      }
    }
    function close() {
      self2.onClose("forced close");
      debug2("socket closing - telling transport to close");
      self2.transport.close();
    }
    function cleanupAndClose() {
      self2.removeListener("upgrade", cleanupAndClose);
      self2.removeListener("upgradeError", cleanupAndClose);
      close();
    }
    function waitForUpgrade() {
      self2.once("upgrade", cleanupAndClose);
      self2.once("upgradeError", cleanupAndClose);
    }
    return this;
  };
  Socket.prototype.onError = function(err) {
    debug2("socket error %j", err);
    Socket.priorWebsocketSuccess = false;
    this.emit("error", err);
    this.onClose("transport error", err);
  };
  Socket.prototype.onClose = function(reason, desc) {
    if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
      debug2('socket close with reason: "%s"', reason);
      var self2 = this;
      clearTimeout(this.pingIntervalTimer);
      clearTimeout(this.pingTimeoutTimer);
      this.transport.removeAllListeners("close");
      this.transport.close();
      this.transport.removeAllListeners();
      this.readyState = "closed";
      this.id = null;
      this.emit("close", reason, desc);
      self2.writeBuffer = [];
      self2.prevBufferLen = 0;
    }
  };
  Socket.prototype.filterUpgrades = function(upgrades) {
    var filteredUpgrades = [];
    for (var i = 0, j = upgrades.length; i < j; i++) {
      if (~index(this.transports, upgrades[i]))
        filteredUpgrades.push(upgrades[i]);
    }
    return filteredUpgrades;
  };
  return socket$1;
}
var hasRequiredLib$1;
function requireLib$1() {
  if (hasRequiredLib$1)
    return lib.exports;
  hasRequiredLib$1 = 1;
  lib.exports = requireSocket$1();
  lib.exports.parser = requireBrowser$2();
  return lib.exports;
}
var socket = { exports: {} };
var toArray_1;
var hasRequiredToArray;
function requireToArray() {
  if (hasRequiredToArray)
    return toArray_1;
  hasRequiredToArray = 1;
  toArray_1 = toArray;
  function toArray(list, index) {
    var array = [];
    index = index || 0;
    for (var i = index || 0; i < list.length; i++) {
      array[i - index] = list[i];
    }
    return array;
  }
  return toArray_1;
}
var on_1;
var hasRequiredOn;
function requireOn() {
  if (hasRequiredOn)
    return on_1;
  hasRequiredOn = 1;
  on_1 = on;
  function on(obj, ev, fn) {
    obj.on(ev, fn);
    return {
      destroy: function() {
        obj.removeListener(ev, fn);
      }
    };
  }
  return on_1;
}
var componentBind;
var hasRequiredComponentBind;
function requireComponentBind() {
  if (hasRequiredComponentBind)
    return componentBind;
  hasRequiredComponentBind = 1;
  var slice = [].slice;
  componentBind = function(obj, fn) {
    if ("string" == typeof fn)
      fn = obj[fn];
    if ("function" != typeof fn)
      throw new Error("bind() requires a function");
    var args = slice.call(arguments, 2);
    return function() {
      return fn.apply(obj, args.concat(slice.call(arguments)));
    };
  };
  return componentBind;
}
var hasRequiredSocket;
function requireSocket() {
  if (hasRequiredSocket)
    return socket.exports;
  hasRequiredSocket = 1;
  (function(module, exports) {
    var parser = requireSocket_ioParser();
    var Emitter = requireComponentEmitter();
    var toArray = requireToArray();
    var on = requireOn();
    var bind = requireComponentBind();
    var debug2 = requireBrowser$4()("socket.io-client:socket");
    var parseqs2 = requireParseqs();
    var hasBin = requireHasBinary2();
    module.exports = Socket;
    var events = {
      connect: 1,
      connect_error: 1,
      connect_timeout: 1,
      connecting: 1,
      disconnect: 1,
      error: 1,
      reconnect: 1,
      reconnect_attempt: 1,
      reconnect_failed: 1,
      reconnect_error: 1,
      reconnecting: 1,
      ping: 1,
      pong: 1
    };
    var emit = Emitter.prototype.emit;
    function Socket(io, nsp, opts) {
      this.io = io;
      this.nsp = nsp;
      this.json = this;
      this.ids = 0;
      this.acks = {};
      this.receiveBuffer = [];
      this.sendBuffer = [];
      this.connected = false;
      this.disconnected = true;
      this.flags = {};
      if (opts && opts.query) {
        this.query = opts.query;
      }
      if (this.io.autoConnect)
        this.open();
    }
    Emitter(Socket.prototype);
    Socket.prototype.subEvents = function() {
      if (this.subs)
        return;
      var io = this.io;
      this.subs = [
        on(io, "open", bind(this, "onopen")),
        on(io, "packet", bind(this, "onpacket")),
        on(io, "close", bind(this, "onclose"))
      ];
    };
    Socket.prototype.open = Socket.prototype.connect = function() {
      if (this.connected)
        return this;
      this.subEvents();
      if (!this.io.reconnecting)
        this.io.open();
      if ("open" === this.io.readyState)
        this.onopen();
      this.emit("connecting");
      return this;
    };
    Socket.prototype.send = function() {
      var args = toArray(arguments);
      args.unshift("message");
      this.emit.apply(this, args);
      return this;
    };
    Socket.prototype.emit = function(ev) {
      if (events.hasOwnProperty(ev)) {
        emit.apply(this, arguments);
        return this;
      }
      var args = toArray(arguments);
      var packet = {
        type: (this.flags.binary !== void 0 ? this.flags.binary : hasBin(args)) ? parser.BINARY_EVENT : parser.EVENT,
        data: args
      };
      packet.options = {};
      packet.options.compress = !this.flags || false !== this.flags.compress;
      if ("function" === typeof args[args.length - 1]) {
        debug2("emitting packet with ack id %d", this.ids);
        this.acks[this.ids] = args.pop();
        packet.id = this.ids++;
      }
      if (this.connected) {
        this.packet(packet);
      } else {
        this.sendBuffer.push(packet);
      }
      this.flags = {};
      return this;
    };
    Socket.prototype.packet = function(packet) {
      packet.nsp = this.nsp;
      this.io.packet(packet);
    };
    Socket.prototype.onopen = function() {
      debug2("transport is open - connecting");
      if ("/" !== this.nsp) {
        if (this.query) {
          var query = typeof this.query === "object" ? parseqs2.encode(this.query) : this.query;
          debug2("sending connect packet with query %s", query);
          this.packet({ type: parser.CONNECT, query });
        } else {
          this.packet({ type: parser.CONNECT });
        }
      }
    };
    Socket.prototype.onclose = function(reason) {
      debug2("close (%s)", reason);
      this.connected = false;
      this.disconnected = true;
      delete this.id;
      this.emit("disconnect", reason);
    };
    Socket.prototype.onpacket = function(packet) {
      var sameNamespace = packet.nsp === this.nsp;
      var rootNamespaceError = packet.type === parser.ERROR && packet.nsp === "/";
      if (!sameNamespace && !rootNamespaceError)
        return;
      switch (packet.type) {
        case parser.CONNECT:
          this.onconnect();
          break;
        case parser.EVENT:
          this.onevent(packet);
          break;
        case parser.BINARY_EVENT:
          this.onevent(packet);
          break;
        case parser.ACK:
          this.onack(packet);
          break;
        case parser.BINARY_ACK:
          this.onack(packet);
          break;
        case parser.DISCONNECT:
          this.ondisconnect();
          break;
        case parser.ERROR:
          this.emit("error", packet.data);
          break;
      }
    };
    Socket.prototype.onevent = function(packet) {
      var args = packet.data || [];
      debug2("emitting event %j", args);
      if (null != packet.id) {
        debug2("attaching ack callback to event");
        args.push(this.ack(packet.id));
      }
      if (this.connected) {
        emit.apply(this, args);
      } else {
        this.receiveBuffer.push(args);
      }
    };
    Socket.prototype.ack = function(id) {
      var self2 = this;
      var sent = false;
      return function() {
        if (sent)
          return;
        sent = true;
        var args = toArray(arguments);
        debug2("sending ack %j", args);
        self2.packet({
          type: hasBin(args) ? parser.BINARY_ACK : parser.ACK,
          id,
          data: args
        });
      };
    };
    Socket.prototype.onack = function(packet) {
      var ack = this.acks[packet.id];
      if ("function" === typeof ack) {
        debug2("calling ack %s with %j", packet.id, packet.data);
        ack.apply(this, packet.data);
        delete this.acks[packet.id];
      } else {
        debug2("bad ack %s", packet.id);
      }
    };
    Socket.prototype.onconnect = function() {
      this.connected = true;
      this.disconnected = false;
      this.emitBuffered();
      this.emit("connect");
    };
    Socket.prototype.emitBuffered = function() {
      var i;
      for (i = 0; i < this.receiveBuffer.length; i++) {
        emit.apply(this, this.receiveBuffer[i]);
      }
      this.receiveBuffer = [];
      for (i = 0; i < this.sendBuffer.length; i++) {
        this.packet(this.sendBuffer[i]);
      }
      this.sendBuffer = [];
    };
    Socket.prototype.ondisconnect = function() {
      debug2("server disconnect (%s)", this.nsp);
      this.destroy();
      this.onclose("io server disconnect");
    };
    Socket.prototype.destroy = function() {
      if (this.subs) {
        for (var i = 0; i < this.subs.length; i++) {
          this.subs[i].destroy();
        }
        this.subs = null;
      }
      this.io.destroy(this);
    };
    Socket.prototype.close = Socket.prototype.disconnect = function() {
      if (this.connected) {
        debug2("performing disconnect (%s)", this.nsp);
        this.packet({ type: parser.DISCONNECT });
      }
      this.destroy();
      if (this.connected) {
        this.onclose("io client disconnect");
      }
      return this;
    };
    Socket.prototype.compress = function(compress) {
      this.flags.compress = compress;
      return this;
    };
    Socket.prototype.binary = function(binary2) {
      this.flags.binary = binary2;
      return this;
    };
  })(socket);
  return socket.exports;
}
var backo2;
var hasRequiredBacko2;
function requireBacko2() {
  if (hasRequiredBacko2)
    return backo2;
  hasRequiredBacko2 = 1;
  backo2 = Backoff;
  function Backoff(opts) {
    opts = opts || {};
    this.ms = opts.min || 100;
    this.max = opts.max || 1e4;
    this.factor = opts.factor || 2;
    this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
    this.attempts = 0;
  }
  Backoff.prototype.duration = function() {
    var ms2 = this.ms * Math.pow(this.factor, this.attempts++);
    if (this.jitter) {
      var rand = Math.random();
      var deviation = Math.floor(rand * this.jitter * ms2);
      ms2 = (Math.floor(rand * 10) & 1) == 0 ? ms2 - deviation : ms2 + deviation;
    }
    return Math.min(ms2, this.max) | 0;
  };
  Backoff.prototype.reset = function() {
    this.attempts = 0;
  };
  Backoff.prototype.setMin = function(min) {
    this.ms = min;
  };
  Backoff.prototype.setMax = function(max) {
    this.max = max;
  };
  Backoff.prototype.setJitter = function(jitter) {
    this.jitter = jitter;
  };
  return backo2;
}
var manager;
var hasRequiredManager$2;
function requireManager$2() {
  if (hasRequiredManager$2)
    return manager;
  hasRequiredManager$2 = 1;
  var eio = requireLib$1();
  var Socket = requireSocket();
  var Emitter = requireComponentEmitter();
  var parser = requireSocket_ioParser();
  var on = requireOn();
  var bind = requireComponentBind();
  var debug2 = requireBrowser$4()("socket.io-client:manager");
  var indexOf = requireIndexof();
  var Backoff = requireBacko2();
  var has = Object.prototype.hasOwnProperty;
  manager = Manager;
  function Manager(uri, opts) {
    if (!(this instanceof Manager))
      return new Manager(uri, opts);
    if (uri && "object" === typeof uri) {
      opts = uri;
      uri = void 0;
    }
    opts = opts || {};
    opts.path = opts.path || "/socket.io";
    this.nsps = {};
    this.subs = [];
    this.opts = opts;
    this.reconnection(opts.reconnection !== false);
    this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
    this.reconnectionDelay(opts.reconnectionDelay || 1e3);
    this.reconnectionDelayMax(opts.reconnectionDelayMax || 5e3);
    this.randomizationFactor(opts.randomizationFactor || 0.5);
    this.backoff = new Backoff({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    });
    this.timeout(null == opts.timeout ? 2e4 : opts.timeout);
    this.readyState = "closed";
    this.uri = uri;
    this.connecting = [];
    this.lastPing = null;
    this.encoding = false;
    this.packetBuffer = [];
    var _parser = opts.parser || parser;
    this.encoder = new _parser.Encoder();
    this.decoder = new _parser.Decoder();
    this.autoConnect = opts.autoConnect !== false;
    if (this.autoConnect)
      this.open();
  }
  Manager.prototype.emitAll = function() {
    this.emit.apply(this, arguments);
    for (var nsp in this.nsps) {
      if (has.call(this.nsps, nsp)) {
        this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
      }
    }
  };
  Manager.prototype.updateSocketIds = function() {
    for (var nsp in this.nsps) {
      if (has.call(this.nsps, nsp)) {
        this.nsps[nsp].id = this.generateId(nsp);
      }
    }
  };
  Manager.prototype.generateId = function(nsp) {
    return (nsp === "/" ? "" : nsp + "#") + this.engine.id;
  };
  Emitter(Manager.prototype);
  Manager.prototype.reconnection = function(v) {
    if (!arguments.length)
      return this._reconnection;
    this._reconnection = !!v;
    return this;
  };
  Manager.prototype.reconnectionAttempts = function(v) {
    if (!arguments.length)
      return this._reconnectionAttempts;
    this._reconnectionAttempts = v;
    return this;
  };
  Manager.prototype.reconnectionDelay = function(v) {
    if (!arguments.length)
      return this._reconnectionDelay;
    this._reconnectionDelay = v;
    this.backoff && this.backoff.setMin(v);
    return this;
  };
  Manager.prototype.randomizationFactor = function(v) {
    if (!arguments.length)
      return this._randomizationFactor;
    this._randomizationFactor = v;
    this.backoff && this.backoff.setJitter(v);
    return this;
  };
  Manager.prototype.reconnectionDelayMax = function(v) {
    if (!arguments.length)
      return this._reconnectionDelayMax;
    this._reconnectionDelayMax = v;
    this.backoff && this.backoff.setMax(v);
    return this;
  };
  Manager.prototype.timeout = function(v) {
    if (!arguments.length)
      return this._timeout;
    this._timeout = v;
    return this;
  };
  Manager.prototype.maybeReconnectOnOpen = function() {
    if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
      this.reconnect();
    }
  };
  Manager.prototype.open = Manager.prototype.connect = function(fn, opts) {
    debug2("readyState %s", this.readyState);
    if (~this.readyState.indexOf("open"))
      return this;
    debug2("opening %s", this.uri);
    this.engine = eio(this.uri, this.opts);
    var socket2 = this.engine;
    var self2 = this;
    this.readyState = "opening";
    this.skipReconnect = false;
    var openSub = on(socket2, "open", function() {
      self2.onopen();
      fn && fn();
    });
    var errorSub = on(socket2, "error", function(data) {
      debug2("connect_error");
      self2.cleanup();
      self2.readyState = "closed";
      self2.emitAll("connect_error", data);
      if (fn) {
        var err = new Error("Connection error");
        err.data = data;
        fn(err);
      } else {
        self2.maybeReconnectOnOpen();
      }
    });
    if (false !== this._timeout) {
      var timeout = this._timeout;
      debug2("connect attempt will timeout after %d", timeout);
      if (timeout === 0) {
        openSub.destroy();
      }
      var timer = setTimeout(function() {
        debug2("connect attempt timed out after %d", timeout);
        openSub.destroy();
        socket2.close();
        socket2.emit("error", "timeout");
        self2.emitAll("connect_timeout", timeout);
      }, timeout);
      this.subs.push({
        destroy: function() {
          clearTimeout(timer);
        }
      });
    }
    this.subs.push(openSub);
    this.subs.push(errorSub);
    return this;
  };
  Manager.prototype.onopen = function() {
    debug2("open");
    this.cleanup();
    this.readyState = "open";
    this.emit("open");
    var socket2 = this.engine;
    this.subs.push(on(socket2, "data", bind(this, "ondata")));
    this.subs.push(on(socket2, "ping", bind(this, "onping")));
    this.subs.push(on(socket2, "pong", bind(this, "onpong")));
    this.subs.push(on(socket2, "error", bind(this, "onerror")));
    this.subs.push(on(socket2, "close", bind(this, "onclose")));
    this.subs.push(on(this.decoder, "decoded", bind(this, "ondecoded")));
  };
  Manager.prototype.onping = function() {
    this.lastPing = /* @__PURE__ */ new Date();
    this.emitAll("ping");
  };
  Manager.prototype.onpong = function() {
    this.emitAll("pong", /* @__PURE__ */ new Date() - this.lastPing);
  };
  Manager.prototype.ondata = function(data) {
    this.decoder.add(data);
  };
  Manager.prototype.ondecoded = function(packet) {
    this.emit("packet", packet);
  };
  Manager.prototype.onerror = function(err) {
    debug2("error", err);
    this.emitAll("error", err);
  };
  Manager.prototype.socket = function(nsp, opts) {
    var socket2 = this.nsps[nsp];
    if (!socket2) {
      socket2 = new Socket(this, nsp, opts);
      this.nsps[nsp] = socket2;
      var self2 = this;
      socket2.on("connecting", onConnecting);
      socket2.on("connect", function() {
        socket2.id = self2.generateId(nsp);
      });
      if (this.autoConnect) {
        onConnecting();
      }
    }
    function onConnecting() {
      if (!~indexOf(self2.connecting, socket2)) {
        self2.connecting.push(socket2);
      }
    }
    return socket2;
  };
  Manager.prototype.destroy = function(socket2) {
    var index = indexOf(this.connecting, socket2);
    if (~index)
      this.connecting.splice(index, 1);
    if (this.connecting.length)
      return;
    this.close();
  };
  Manager.prototype.packet = function(packet) {
    debug2("writing packet %j", packet);
    var self2 = this;
    if (packet.query && packet.type === 0)
      packet.nsp += "?" + packet.query;
    if (!self2.encoding) {
      self2.encoding = true;
      this.encoder.encode(packet, function(encodedPackets) {
        for (var i = 0; i < encodedPackets.length; i++) {
          self2.engine.write(encodedPackets[i], packet.options);
        }
        self2.encoding = false;
        self2.processPacketQueue();
      });
    } else {
      self2.packetBuffer.push(packet);
    }
  };
  Manager.prototype.processPacketQueue = function() {
    if (this.packetBuffer.length > 0 && !this.encoding) {
      var pack = this.packetBuffer.shift();
      this.packet(pack);
    }
  };
  Manager.prototype.cleanup = function() {
    debug2("cleanup");
    var subsLength = this.subs.length;
    for (var i = 0; i < subsLength; i++) {
      var sub = this.subs.shift();
      sub.destroy();
    }
    this.packetBuffer = [];
    this.encoding = false;
    this.lastPing = null;
    this.decoder.destroy();
  };
  Manager.prototype.close = Manager.prototype.disconnect = function() {
    debug2("disconnect");
    this.skipReconnect = true;
    this.reconnecting = false;
    if ("opening" === this.readyState) {
      this.cleanup();
    }
    this.backoff.reset();
    this.readyState = "closed";
    if (this.engine)
      this.engine.close();
  };
  Manager.prototype.onclose = function(reason) {
    debug2("onclose");
    this.cleanup();
    this.backoff.reset();
    this.readyState = "closed";
    this.emit("close", reason);
    if (this._reconnection && !this.skipReconnect) {
      this.reconnect();
    }
  };
  Manager.prototype.reconnect = function() {
    if (this.reconnecting || this.skipReconnect)
      return this;
    var self2 = this;
    if (this.backoff.attempts >= this._reconnectionAttempts) {
      debug2("reconnect failed");
      this.backoff.reset();
      this.emitAll("reconnect_failed");
      this.reconnecting = false;
    } else {
      var delay = this.backoff.duration();
      debug2("will wait %dms before reconnect attempt", delay);
      this.reconnecting = true;
      var timer = setTimeout(function() {
        if (self2.skipReconnect)
          return;
        debug2("attempting reconnect");
        self2.emitAll("reconnect_attempt", self2.backoff.attempts);
        self2.emitAll("reconnecting", self2.backoff.attempts);
        if (self2.skipReconnect)
          return;
        self2.open(function(err) {
          if (err) {
            debug2("reconnect attempt error");
            self2.reconnecting = false;
            self2.reconnect();
            self2.emitAll("reconnect_error", err.data);
          } else {
            debug2("reconnect success");
            self2.onreconnect();
          }
        });
      }, delay);
      this.subs.push({
        destroy: function() {
          clearTimeout(timer);
        }
      });
    }
  };
  Manager.prototype.onreconnect = function() {
    var attempt = this.backoff.attempts;
    this.reconnecting = false;
    this.backoff.reset();
    this.updateSocketIds();
    this.emitAll("reconnect", attempt);
  };
  return manager;
}
var hasRequiredLib;
function requireLib() {
  if (hasRequiredLib)
    return lib$1.exports;
  hasRequiredLib = 1;
  (function(module, exports) {
    var url = requireUrl();
    var parser = requireSocket_ioParser();
    var Manager = requireManager$2();
    var debug2 = requireBrowser$4()("socket.io-client");
    module.exports = exports = lookup;
    var cache = exports.managers = {};
    function lookup(uri, opts) {
      if (typeof uri === "object") {
        opts = uri;
        uri = void 0;
      }
      opts = opts || {};
      var parsed = url(uri);
      var source = parsed.source;
      var id = parsed.id;
      var path = parsed.path;
      var sameNamespace = cache[id] && path in cache[id].nsps;
      var newConnection = opts.forceNew || opts["force new connection"] || false === opts.multiplex || sameNamespace;
      var io;
      if (newConnection) {
        debug2("ignoring socket cache for %s", source);
        io = Manager(source, opts);
      } else {
        if (!cache[id]) {
          debug2("new io instance for %s", source);
          cache[id] = Manager(source, opts);
        }
        io = cache[id];
      }
      if (parsed.query && !opts.query) {
        opts.query = parsed.query;
      }
      return io.socket(parsed.path, opts);
    }
    exports.protocol = parser.protocol;
    exports.connect = lookup;
    exports.Manager = requireManager$2();
    exports.Socket = requireSocket();
  })(lib$1, lib$1.exports);
  return lib$1.exports;
}
var APIErrorHomeyOffline_1;
var hasRequiredAPIErrorHomeyOffline;
function requireAPIErrorHomeyOffline() {
  if (hasRequiredAPIErrorHomeyOffline)
    return APIErrorHomeyOffline_1;
  hasRequiredAPIErrorHomeyOffline = 1;
  const APIError3 = APIError_1;
  class APIErrorHomeyOffline extends APIError3 {
    constructor(err) {
      if (err instanceof Error) {
        super(`Homey Offline (${err.message || err.toString()})`, 500);
      } else {
        super("Homey Offline", 500);
      }
    }
  }
  APIErrorHomeyOffline_1 = APIErrorHomeyOffline;
  return APIErrorHomeyOffline_1;
}
var HomeyAPIError_1;
var hasRequiredHomeyAPIError;
function requireHomeyAPIError() {
  if (hasRequiredHomeyAPIError)
    return HomeyAPIError_1;
  hasRequiredHomeyAPIError = 1;
  const APIError3 = APIError_1;
  class HomeyAPIError extends APIError3 {
    constructor({
      error,
      error_description = null,
      stack = null
    }, statusCode) {
      super(error_description || error, statusCode);
      this.description = error_description;
      this.stack = stack;
    }
  }
  HomeyAPIError_1 = HomeyAPIError;
  return HomeyAPIError_1;
}
var EventEmitter_1;
var hasRequiredEventEmitter;
function requireEventEmitter() {
  if (hasRequiredEventEmitter)
    return EventEmitter_1;
  hasRequiredEventEmitter = 1;
  class EventEmitter {
    constructor() {
      Object.defineProperty(this, "__listeners", {
        value: {},
        enumerable: false,
        writable: false
      });
    }
    /**
     * @param {string} event
     * @param  {...any} data
     */
    emit(event, ...data) {
      const listeners = this.__listeners[event];
      if (Array.isArray(listeners)) {
        listeners.forEach((listener) => {
          listener(...data);
        });
      }
      return this;
    }
    /**
     * @param {string} event
     * @param {function} callback
     */
    addListener(event, callback) {
      return this.on(event, callback);
    }
    /**
     * @param {string} event
     * @param {function} callback
     */
    on(event, callback) {
      this.__listeners[event] = this.__listeners[event] || [];
      this.__listeners[event].push(callback);
      return this;
    }
    /**
     * @param {string} event
     * @param {function} callback
     */
    once(event, callback) {
      const callback_ = (...args) => {
        this.__listeners[event] = this.__listeners[event].filter((cb) => cb !== callback_);
        callback(...args);
      };
      this.__listeners[event] = this.__listeners[event] || [];
      this.__listeners[event].push(callback_);
      return this;
    }
    /**
     * @param {string} event
     * @param {function} callback
     */
    off(event, callback) {
      this.__listeners[event] = this.__listeners[event] || [];
      this.__listeners[event] = this.__listeners[event].filter((cb) => cb !== callback);
      return this;
    }
    /**
     * Shortcut to {@link EventEmitter#off}
     * @param {string} event
     * @param {function} callback
     */
    removeListener(event, callback) {
      return this.off(event, callback);
    }
    /**
     * @param {string} event
     */
    removeAllListeners(event) {
      this.__listeners[event] = [];
      return this;
    }
  }
  EventEmitter_1 = EventEmitter;
  return EventEmitter_1;
}
var Item_1;
var hasRequiredItem;
function requireItem() {
  if (hasRequiredItem)
    return Item_1;
  hasRequiredItem = 1;
  const EventEmitter = requireEventEmitter();
  class Item extends EventEmitter {
    constructor({ id, homey, manager: manager2, properties }) {
      super();
      // Set by Manager.js
      /**
       * The ID of the Item.
       * @type {string}
       */
      __publicField(this, "id");
      /**
       * The URI of the Item, e.g. `homey:foo:bar`.
       * @type {string}
       */
      __publicField(this, "uri");
      Object.defineProperty(this, "id", {
        value: id,
        enumerable: true,
        writable: false
      });
      Object.defineProperty(this, "uri", {
        value: `homey:${this.constructor.ID}:${this.id}`,
        enumerable: true,
        writable: false
      });
      Object.defineProperty(this, "__homey", {
        value: homey,
        enumerable: false,
        writable: false
      });
      Object.defineProperty(this, "__manager", {
        value: manager2,
        enumerable: false,
        writable: false
      });
      Object.defineProperty(this, "__connected", {
        value: false,
        enumerable: false,
        writable: true
      });
      for (const [key, value] of Object.entries(properties)) {
        if (key === "id")
          continue;
        Object.defineProperty(this, key, {
          value,
          enumerable: true,
          writable: true
        });
      }
    }
    /**
     * The Manager of the Item.
     * @type {HomeyAPIV3.Manager}
     */
    get manager() {
      return this.__manager;
    }
    /**
     * The Homey of the Item.
     * @type {HomeyAPIV3}
     */
    get homey() {
      return this.__homey;
    }
    __debug(...props) {
      this.manager.__debug(`[${this.constructor.name}:${this.id}]`, ...props);
    }
    __update(properties) {
      for (const [key, value] of Object.entries(properties)) {
        if (key === "id")
          continue;
        this[key] = value;
      }
      this.emit("update", properties);
    }
    __delete() {
      this.destroy();
      this.emit("delete");
    }
    /**
     * Connect to this item's Socket.io namespace.
     */
    async connect() {
      this.__debug("connect");
      try {
        await Promise.resolve();
        await this.__disconnectPromise;
      } catch (err) {
      }
      this.__connectPromise = Promise.resolve().then(async () => {
        if (!this.io) {
          this.io = this.homey.subscribe(this.uri, {
            onConnect: () => {
              this.__debug("onConnect");
              this.__connected = true;
              this.onConnect();
            },
            onDisconnect: () => {
              this.__debug("onDisconnect");
              this.__connected = false;
              this.onDisconnect();
            },
            onReconnect: () => {
              this.__debug("onDisconnect");
              this.onReconnect();
            },
            onEvent: (event, data) => {
              this.__debug("onEvent", event, data);
              this.emit(event, data);
            }
          });
        }
        await this.io;
      });
      this.__connectPromise.catch(() => {
      }).finally(() => {
        delete this.__connectPromise;
      });
      await this.__connectPromise;
    }
    /**
     * Discconnect from this item's Socket.io namespace.
     */
    async disconnect() {
      this.__debug("disconnect");
      try {
        await this.__connectPromise;
      } catch (err) {
      }
      this.__disconnectPromise = Promise.resolve().then(async () => {
        this.__connected = false;
        if (this.io) {
          this.io.then((io) => io.unsubscribe()).catch((err) => this.__debug("Error Disconnecting:", err));
        }
      });
      this.__disconnectPromise.catch(() => {
      }).finally(() => {
        delete this.__disconnectPromise;
        delete this.io;
      });
      await this.__disconnectPromise;
    }
    onConnect() {
    }
    onReconnect() {
    }
    onDisconnect() {
    }
    destroy() {
      this.removeAllListeners();
      this.disconnect().catch(() => {
      });
    }
    static transformGet(item) {
      return item;
    }
    static transformSet(item) {
      return item;
    }
  }
  __publicField(Item, "ID", null);
  Item_1 = Item;
  return Item_1;
}
var Manager_1$1;
var hasRequiredManager$1;
function requireManager$1() {
  if (hasRequiredManager$1)
    return Manager_1$1;
  hasRequiredManager$1 = 1;
  const EventEmitter = requireEventEmitter();
  const Util3 = Util_1;
  const HomeyAPIError = requireHomeyAPIError();
  const Item = requireItem();
  class Manager extends EventEmitter {
    constructor({
      homey,
      items,
      operations: operations2
    }) {
      super();
      Object.defineProperty(this, "__homey", {
        value: homey,
        enumerable: false,
        writable: false
      });
      Object.defineProperty(this, "itemClasses", {
        value: Object.entries(items).reduce((obj, [itemName, item]) => {
          const ItemClass = this.constructor.CRUD[itemName] ? this.constructor.CRUD[itemName] : (() => {
            return class extends Item {
            };
          })();
          ItemClass.ID = item.id;
          obj[itemName] = ItemClass;
          return obj;
        }, {}),
        enumerable: false,
        writable: false
      });
      Object.defineProperty(this, "itemNames", {
        value: Object.entries(items).reduce((obj, [itemName, item]) => {
          obj[item.id] = itemName;
          return obj;
        }, {}),
        enumerable: false,
        writable: false
      });
      Object.defineProperty(this, "__connected", {
        value: false,
        enumerable: false,
        writable: true
      });
      Object.defineProperty(this, "__cache", {
        value: Object.values(items).reduce((obj, item) => ({
          ...obj,
          [item.id]: {}
        }), {}),
        enumerable: false,
        writable: false
      });
      Object.defineProperty(this, "__cacheAllComplete", {
        value: Object.values(items).reduce((obj, item) => ({
          ...obj,
          [item.id]: false
        }), {}),
        enumerable: false,
        writable: false
      });
      Object.defineProperty(this, "__pendingCalls", {
        value: {},
        enumerable: false,
        writable: false
      });
      for (const [operationId, operation] of Object.entries(operations2)) {
        Object.defineProperty(
          this,
          // Name method __super__foo if there's an override method
          this[operationId] ? `__super__${operationId}` : operationId,
          {
            value: async ({
              $validate = true,
              $cache = true,
              $timeout = operation.timeout ?? 5e3,
              $socket = operation.socket ?? true,
              $body = {},
              $query = {},
              $headers = {},
              ...args
            } = {}) => {
              let { path } = operation;
              let body = { ...$body };
              const query = { ...$query };
              const headers = { ...$headers };
              if (operation.parameters) {
                for (const [parameterId, parameter] of Object.entries(operation.parameters)) {
                  const value = args[parameterId];
                  if ($validate) {
                    if (parameter.required === true && typeof value === "undefined") {
                      throw new Error(`Missing Parameter: ${parameterId}`);
                    }
                    if (typeof value !== "undefined") {
                      if (parameter.in !== "query" && parameter.type === "string" && typeof value !== "string") {
                        throw new Error(`Invalid Parameter Type: ${parameterId}. Got: ${typeof value}. Expected: string`);
                      }
                      if (parameter.type === "number" && typeof value !== "number") {
                        throw new Error(`Invalid Parameter Type: ${parameterId}. Got: ${typeof value}. Expected: number`);
                      }
                      if (parameter.type === "boolean" && typeof value !== "boolean") {
                        throw new Error(`Invalid Parameter Type: ${parameterId}. Got: ${typeof value}. Expected: boolean`);
                      }
                      if (parameter.type === "object" && typeof value !== "object") {
                        throw new Error(`Invalid Parameter Type: ${parameterId}. Got: ${typeof value}. Expected: object`);
                      }
                      if (parameter.type === "array" && !Array.isArray(value)) {
                        throw new Error(`Invalid Parameter Type: ${parameterId}. Got: ${typeof value}. Expected: array`);
                      }
                      if (Array.isArray(parameter.type))
                        ;
                    }
                  }
                  if (typeof value !== "undefined") {
                    switch (parameter.in) {
                      case "path": {
                        path = path.replace(`:${parameterId}`, value);
                        break;
                      }
                      case "body": {
                        if (parameter.root) {
                          body = value;
                        } else {
                          body[parameterId] = value;
                        }
                        break;
                      }
                      case "query": {
                        query[parameterId] = value;
                        break;
                      }
                      default: {
                        throw new Error(`Invalid 'in': ${parameter.in}`);
                      }
                    }
                  }
                }
              }
              if (Object.keys(query).length > 0) {
                const queryString = Util3.serializeQueryObject(query);
                path = `${path}?${queryString}`;
              }
              const pendingCallId = `${operationId}::${path}`;
              if (operation.method.toLowerCase() === "get" && $cache === true && this.__pendingCalls[pendingCallId] != null && Object.keys(body).length === 0) {
                this.__debug(`Reusing pending call ${pendingCallId}`);
                const result2 = await this.__pendingCalls[pendingCallId];
                return result2;
              }
              const pendingCall = (async () => {
                const result2 = await this.__request({
                  $validate,
                  $cache,
                  $timeout,
                  $socket,
                  operationId,
                  operation,
                  path,
                  body,
                  query,
                  headers,
                  ...args
                });
                return result2;
              })();
              if (operation.method.toLowerCase() === "get" && $cache === true && this.__pendingCalls[pendingCallId] == null && Object.keys(body).length === 0) {
                this.__pendingCalls[pendingCallId] = pendingCall;
                this.__pendingCalls[pendingCallId].finally(() => {
                  delete this.__pendingCalls[pendingCallId];
                });
              }
              const result = await pendingCall;
              return result;
            }
          }
        );
      }
    }
    async __request({ $cache, $timeout, $socket, operationId, operation, path, body, headers, ...args }) {
      let result;
      const benchmark = Util3.benchmark();
      if (this.isConnected() && operation.crud && $cache === true) {
        const itemId = this.itemClasses[operation.crud.item].ID;
        switch (operation.crud.type) {
          case "getOne": {
            if (this.__cache[itemId][args.id]) {
              return this.__cache[itemId][args.id];
            }
            break;
          }
          case "getAll": {
            if (this.__cache[itemId] && this.__cacheAllComplete[itemId]) {
              return this.__cache[itemId];
            }
            break;
          }
        }
      }
      if (this.homey.isConnected() && $socket === true) {
        result = await Util3.timeout(new Promise((resolve, reject) => {
          this.__debug(`IO ${operationId}`);
          this.homey.__ioNamespace.emit("api", {
            args,
            operation: operationId,
            uri: this.uri
          }, (err, result2) => {
            if (typeof err === "string") {
              err = new HomeyAPIError({
                error: err
              }, 500);
              return reject(err);
            }
            if (typeof err === "object" && err !== null) {
              err = new HomeyAPIError({
                stack: err.stack,
                error: err.error,
                error_description: err.error_description
              }, err.statusCode || err.code || 500);
              return reject(err);
            }
            return resolve(result2);
          });
        }), $timeout);
      } else {
        result = await this.homey.call({
          $timeout,
          headers,
          body,
          path: `/api/manager/${this.constructor.ID}${path}`,
          method: operation.method
        });
      }
      if (operation.crud) {
        const ItemClass = this.itemClasses[operation.crud.item];
        switch (operation.crud.type) {
          case "getOne": {
            let props = { ...result };
            props = ItemClass.transformGet(props);
            const item = new ItemClass({
              id: props.id,
              homey: this.homey,
              manager: this,
              properties: props
            });
            if (this.isConnected()) {
              this.__cache[ItemClass.ID][item.id] = item;
            }
            return item;
          }
          case "getAll": {
            const items = {};
            for (let props of Object.values(result)) {
              props = ItemClass.transformGet(props);
              if (this.isConnected() && this.__cache[ItemClass.ID][props.id]) {
                items[props.id] = this.__cache[ItemClass.ID][props.id];
                items[props.id].__update(props);
              } else {
                items[props.id] = new ItemClass({
                  id: props.id,
                  homey: this.homey,
                  manager: this,
                  properties: props
                });
                if (this.isConnected()) {
                  this.__cache[ItemClass.ID][props.id] = items[props.id];
                }
              }
            }
            if (this.__cache[ItemClass.ID]) {
              for (const cachedItem of Object.values(this.__cache[ItemClass.ID])) {
                if (!items[cachedItem.id]) {
                  delete this.__cache[ItemClass.ID][cachedItem.id];
                }
              }
            }
            if (this.isConnected()) {
              this.__cacheAllComplete[ItemClass.ID] = true;
            }
            return items;
          }
          case "createOne":
          case "updateOne": {
            let item = null;
            let props = { ...result };
            props = ItemClass.transformGet(props);
            if (this.isConnected() && this.__cache[ItemClass.ID][props.id]) {
              item = this.__cache[ItemClass.ID][props.id];
              item.__update(props);
            } else {
              item = new ItemClass({
                id: props.id,
                homey: this.homey,
                manager: this,
                properties: { ...props }
              });
              if (this.isConnected()) {
                this.__cache[ItemClass.ID][props.id] = item;
              }
            }
            return item;
          }
          case "deleteOne": {
            if (this.isConnected() && this.__cache[ItemClass.ID][args.id]) {
              this.__cache[ItemClass.ID][args.id].destroy();
              delete this.__cache[ItemClass.ID][args.id];
            }
            return void 0;
          }
        }
      }
      this.__debug(`${operationId} took ${benchmark()}ms`);
      return result;
    }
    /**
     * The Homey of the Manager.
     * @type {HomeyAPIV3}
     */
    get homey() {
      return this.__homey;
    }
    /**
     * The URI of the Item, e.g. `homey:manager:bar`.
     * @type {String}
     */
    get uri() {
      return `homey:manager:${this.constructor.ID}`;
    }
    __debug(...props) {
      this.homey.__debug(`[${this.constructor.name}]`, ...props);
    }
    /**
     * If this manager's namespace is connected to Socket.io.
     * @returns {Boolean}
     */
    isConnected() {
      return this.__connected === true;
    }
    /**
     * Connect to this manager's Socket.io namespace.
     * @returns {Promise<void>}
     */
    async connect() {
      this.__debug("connect");
      try {
        await this.__disconnectPromise;
      } catch (err) {
      }
      this.__connectPromise = Promise.resolve().then(async () => {
        if (!this.io) {
          this.io = this.homey.subscribe(this.uri, {
            onConnect: () => {
              this.__debug("onConnect");
              this.__connected = true;
            },
            onDisconnect: (reason) => {
              this.__debug(`onDisconnect Reason:${reason}`);
              this.__connected = false;
              for (const itemId of Object.keys(this.__cache)) {
                this.__cache[itemId] = {};
                this.__cacheAllComplete[itemId] = false;
              }
            },
            onEvent: (event, data) => {
              this.__debug("onEvent", event);
              if (event.endsWith(".create") || event.endsWith(".update") || event.endsWith(".delete")) {
                const [itemId, operation] = event.split(".");
                const itemName = this.itemNames[itemId];
                const ItemClass = this.itemClasses[itemName];
                switch (operation) {
                  case "create": {
                    const props = ItemClass.transformGet(data);
                    const item = new ItemClass({
                      id: props.id,
                      homey: this.homey,
                      manager: this,
                      properties: props
                    });
                    this.__cache[ItemClass.ID][props.id] = item;
                    return this.emit(event, item);
                  }
                  case "update": {
                    const props = ItemClass.transformGet(data);
                    if (this.__cache[ItemClass.ID][props.id]) {
                      const item = this.__cache[ItemClass.ID][props.id];
                      item.__update(props);
                      return this.emit(event, item);
                    }
                    break;
                  }
                  case "delete": {
                    const props = ItemClass.transformGet(data);
                    if (this.__cache[ItemClass.ID][props.id]) {
                      const item = this.__cache[ItemClass.ID][props.id];
                      item.__delete();
                      delete this.__cache[ItemClass.ID][item.id];
                      return this.emit(event, {
                        id: item.id
                      });
                    }
                    break;
                  }
                }
              }
              this.emit(event, data);
            }
          });
        }
        await this.io;
      });
      this.__connectPromise.catch(() => {
      }).finally(() => {
        delete this.__connectPromise;
      });
      await this.__connectPromise;
    }
    /**
     * Discconnect from this manager's Socket.io namespace.
     * @returns {Promise<void>}
     */
    async disconnect() {
      this.__debug("disconnect");
      try {
        await this.__connectPromise;
      } catch (err) {
      }
      this.__disconnectPromise = Promise.resolve().then(async () => {
        this.__connected = false;
        if (this.io) {
          await this.io.then((io) => io.unsubscribe()).catch((err) => this.__debug("Error Disconnecting:", err));
          delete this.io;
        }
      });
      this.__disconnectPromise.catch(() => {
      }).finally(() => {
        delete this.__disconnectPromise;
      });
      await this.__disconnectPromise;
    }
    /**
     * Destroy this Manager by cleaning up all references, unbinding event listeners and disconnecting from the Socket.io namespace.
     */
    destroy() {
      for (const id of Object.keys(this.__cache)) {
        this.__cache[id] = {};
      }
      for (const id of Object.keys(this.__cacheAllComplete)) {
        this.__cacheAllComplete[id] = false;
      }
      this.removeAllListeners();
      this.disconnect().catch(() => {
      });
    }
  }
  __publicField(Manager, "ID", null);
  // Set by HomeyAPIV3.js
  __publicField(Manager, "CRUD", {});
  Manager_1$1 = Manager;
  return Manager_1$1;
}
var App_1;
var hasRequiredApp;
function requireApp() {
  if (hasRequiredApp)
    return App_1;
  hasRequiredApp = 1;
  const Item = requireItem();
  class App extends Item {
    /**
     * Call the app's API endpoint.
     * @param {Object} opts
     * @param {('GET'|'POST'|'PUT'|'DELETE')} opts.method HTTP Method of the API endpoint.
     * @param {String} opts.path - Path to the API endpoint.
     * @param {mixed} opts.body
     * @returns {Promise<any>}
     */
    async call({
      method,
      path,
      body
    }) {
      if (typeof method !== "string") {
        throw new Error("Invalid Path");
      }
      if (typeof path !== "string") {
        throw new Error("Invalid Path");
      }
      if (!path.startsWith("/")) {
        path = `/${path}`;
      }
      this.__debug(method, path);
      return this.homey.call({
        method,
        path: `/api/app/${this.id}${path}`,
        body
      });
    }
    /**
     * Make a GET request to the App's Web API.
     * @param {object} opts
     * @param {string} opts.path
     * @returns {Promise<any>}
     */
    async get({ path }) {
      return this.call({
        path,
        method: "GET"
      });
    }
    /**
     * Make a POST request to the App's Web API.
     * @param {object} opts
     * @param {string} opts.path
     * @param {object} opts.body
     * @returns {Promise<any>}
     */
    async post({ path, body }) {
      return this.call({
        path,
        body,
        method: "POST"
      });
    }
    /**
     * Make a PUT request to the App's Web API.
     * @param {object} opts
     * @param {string} opts.path
     * @param {object} opts.body
     * @returns {Promise<any>}
     */
    async put({ path, body }) {
      return this.call({
        path,
        body,
        method: "PUT"
      });
    }
    /**
     * Make a DELETE request to the App's Web API.
     * @param {object} opts
     * @param {string} opts.path
     * @returns {Promise<any>}
     */
    async delete({ path }) {
      return this.call({
        path,
        method: "DELETE"
      });
    }
  }
  App_1 = App;
  return App_1;
}
var ManagerApps_1;
var hasRequiredManagerApps;
function requireManagerApps() {
  if (hasRequiredManagerApps)
    return ManagerApps_1;
  hasRequiredManagerApps = 1;
  const Manager = requireManager$1();
  const App = requireApp();
  const _ManagerApps = class extends Manager {
  };
  let ManagerApps = _ManagerApps;
  __publicField(ManagerApps, "CRUD", {
    ...__superGet(_ManagerApps, _ManagerApps, "CRUD"),
    App
  });
  ManagerApps_1 = ManagerApps;
  return ManagerApps_1;
}
var Driver_1$1;
var hasRequiredDriver$1;
function requireDriver$1() {
  if (hasRequiredDriver$1)
    return Driver_1$1;
  hasRequiredDriver$1 = 1;
  const Item = requireItem();
  class Driver extends Item {
    get uri() {
      console.warn("Driver.uri is deprecated. Please use Driver.ownerUri instead.");
      return void 0;
    }
    get uriObj() {
      console.warn("Driver.uriObj is deprecated.");
      return void 0;
    }
  }
  Driver_1$1 = Driver;
  return Driver_1$1;
}
var PairSession_1$1;
var hasRequiredPairSession$1;
function requirePairSession$1() {
  if (hasRequiredPairSession$1)
    return PairSession_1$1;
  hasRequiredPairSession$1 = 1;
  const Item = requireItem();
  class PairSession extends Item {
    static transformGet(item) {
      item = super.transformGet(item);
      delete item.uri;
      return item;
    }
  }
  PairSession_1$1 = PairSession;
  return PairSession_1$1;
}
var ManagerDrivers_1$1;
var hasRequiredManagerDrivers$1;
function requireManagerDrivers$1() {
  if (hasRequiredManagerDrivers$1)
    return ManagerDrivers_1$1;
  hasRequiredManagerDrivers$1 = 1;
  const Manager = requireManager$1();
  const Driver = requireDriver$1();
  const PairSession = requirePairSession$1();
  const _ManagerDrivers = class extends Manager {
  };
  let ManagerDrivers = _ManagerDrivers;
  __publicField(ManagerDrivers, "CRUD", {
    ...__superGet(_ManagerDrivers, _ManagerDrivers, "CRUD"),
    Driver,
    PairSession
  });
  ManagerDrivers_1$1 = ManagerDrivers;
  return ManagerDrivers_1$1;
}
var Capability_1$1;
var hasRequiredCapability$1;
function requireCapability$1() {
  if (hasRequiredCapability$1)
    return Capability_1$1;
  hasRequiredCapability$1 = 1;
  const Item = requireItem();
  class Capability extends Item {
    get uri() {
      console.warn("Capability.uri is deprecated. Please use Capability.ownerUri instead.");
      return void 0;
    }
  }
  Capability_1$1 = Capability;
  return Capability_1$1;
}
var DeviceCapability_1;
var hasRequiredDeviceCapability;
function requireDeviceCapability() {
  if (hasRequiredDeviceCapability)
    return DeviceCapability_1;
  hasRequiredDeviceCapability = 1;
  const Util3 = Util_1;
  const EventEmitter = requireEventEmitter();
  class DeviceCapability extends EventEmitter {
    constructor({
      id,
      device,
      listener
    }) {
      super();
      this.__onCapabilityValue = this.__onCapabilityValue.bind(this);
      this.__onDeviceDelete = this.__onDeviceDelete.bind(this);
      Object.defineProperty(this, "id", {
        value: id,
        enumerable: true,
        writable: false
      });
      Object.defineProperty(this, "device", {
        value: device,
        enumerable: false,
        writable: false
      });
      Object.defineProperty(this, "__listener", {
        value: listener,
        enumerable: false,
        writable: false
      });
      Object.defineProperty(this, "__transactionIds", {
        value: {},
        enumerable: false,
        writable: false
      });
      Object.defineProperty(this, "__value", {
        value: device.capabilitiesObj ? device.capabilitiesObj[this.id] ? device.capabilitiesObj[this.id].value : null : null,
        enumerable: false,
        writable: true
      });
      Object.defineProperty(this, "__lastChanged", {
        value: device.capabilitiesObj ? device.capabilitiesObj[this.id] ? device.capabilitiesObj[this.id].lastUpdated : null : null,
        enumerable: false,
        writable: true
      });
      this.device.on("capability", this.__onCapabilityValue);
      this.device.on("delete", this.__onDeviceDelete);
    }
    __debug(...props) {
      this.device.__debug(`[DeviceCapability:${this.id}]`, ...props);
    }
    /**
     * Destroy this capability listener, and if it's the last one, unsubscribe from the device's realtime events.
     */
    destroy() {
      this.emit("destroy");
      this.device.off("capability", this.__onCapabilityValue);
      this.device.off("delete", this.__onDeviceDelete);
      this.removeAllListeners();
    }
    __onCapabilityValue({
      capabilityId,
      value,
      transactionId,
      transactionTime
    }) {
      if (capabilityId !== this.id)
        return;
      if (this.__transactionIds[transactionId]) {
        delete this.__transactionIds[transactionId];
        return;
      }
      if (value === this.__value)
        return;
      this.__value = value;
      this.__lastChanged = new Date(transactionTime);
      const capabilityReference = this.device.capabilitiesObj && this.device.capabilitiesObj[this.id];
      if (capabilityReference) {
        capabilityReference.value = value;
        capabilityReference.lastUpdated = this.__lastChanged;
      }
      this.__listener(value, this);
    }
    __onDeviceDelete() {
      this.destroy();
    }
    /**
     * @type {boolean|number|string|null}
     */
    get value() {
      return typeof this.__value !== "undefined" ? this.__value : null;
    }
    /**
     * @type {Date|null}
     */
    get lastChanged() {
      return this.__lastChanged instanceof Date ? this.__lastChanged : typeof this.__lastChanged === "string" ? new Date(this.__lastChanged) : null;
    }
    /**
     * Sets a new capability value.
     * @param {boolean|number|string} value - The new capability value
     * @param {object} [opts]
     * @param {number} [opts.duration]
     */
    async setValue(value, opts) {
      const transactionId = `homey-api-${Util3.uuid()}`;
      const transactionTime = Date.now();
      this.__transactionIds[transactionId] = transactionTime;
      await this.device.setCapabilityValue({
        value,
        opts,
        transactionId,
        transactionTime,
        capabilityId: this.id
      });
      this.__value = value;
      this.__lastChanged = transactionTime;
      const capabilityReference = this.device.capabilitiesObj && this.device.capabilitiesObj[this.id];
      if (capabilityReference) {
        capabilityReference.value = value;
        capabilityReference.lastUpdated = this.__lastChanged;
      }
    }
  }
  DeviceCapability_1 = DeviceCapability;
  return DeviceCapability_1;
}
var Device_1$2;
var hasRequiredDevice$1;
function requireDevice$1() {
  if (hasRequiredDevice$1)
    return Device_1$2;
  hasRequiredDevice$1 = 1;
  const Util3 = Util_1;
  const Item = requireItem();
  const DeviceCapability = requireDeviceCapability();
  class Device3 extends Item {
    constructor(...props) {
      super(...props);
      Object.defineProperty(this, "__capabilityInstances", {
        value: {},
        enumerable: false,
        writable: true
      });
    }
    /**
     * Creates an {@link HomeyAPIV3.DeviceCapability} for realtime capability updates.
     * @param {string} capabilityId
     * @param {Function} listener
     * @param {number|boolean|string} listener.value
     * @returns {HomeyAPIV3.ManagerDevices.Device.DeviceCapability}
     * @function HomeyAPIV3.ManagerDevices.Device#makeCapabilityInstance
     * @example
     *
     *  const onOffInstance = device.makeCapabilityInstance('onoff', value => {
     *    console.log('Device onoff changed to:', value);
     *  });
     *
     * // Turn on
     * onOffInstance.setValue(true).catch(console.error);
     */
    makeCapabilityInstance(capabilityId, listener) {
      this.__debug("Creating capability instance for: ", capabilityId);
      this.connect().catch((err) => {
        this.__debug(err);
      });
      const instance = new DeviceCapability({
        listener,
        id: capabilityId,
        device: this
      });
      instance.once("destroy", () => {
        this.__capabilityInstances[capabilityId] = this.__capabilityInstances[capabilityId] || [];
        this.__capabilityInstances[capabilityId] = this.__capabilityInstances[capabilityId].filter((i) => i !== instance);
        if (this.__capabilityInstances[capabilityId].length === 0) {
          delete this.__capabilityInstances[capabilityId];
        }
        if (Object.keys(this.__capabilityInstances).length === 0) {
          this.__debug("No more Capability instances, disconnecting...");
          this.disconnect().catch((err) => this.__debug(err));
        }
      });
      this.__capabilityInstances[capabilityId] = this.__capabilityInstances[capabilityId] || [];
      this.__capabilityInstances[capabilityId].push(instance);
      return instance;
    }
    /**
     * Sets a capability's value.
     * @param {object} opts
     * @param {string} opts.capabilityId
     * @param {number|boolean|string} opts.value
     * @param {object} [opts.opts]
     * @param {number} [opts.opts.duration]
     * @returns {Promise<void>}
     * @function HomeyAPIV3.ManagerDevices.Device#setCapabilityValue
     */
    async setCapabilityValue(options, ...args) {
      if (typeof options === "string") {
        return this.setCapabilityValueLegacy(options, ...args);
      }
      return this.__setCapabilityValue(options);
    }
    async __setCapabilityValue({
      capabilityId,
      value,
      opts,
      transactionId = `homey-api-${Util3.uuid()}`,
      transactionTime = Date.now()
    }) {
      return this.manager.setCapabilityValue({
        deviceId: this.id,
        capabilityId,
        value,
        opts,
        transactionId,
        transactionTime
      });
    }
    async setCapabilityValueLegacy(capabilityId, value, opts) {
      return this.__setCapabilityValue({
        capabilityId,
        value,
        opts
      });
    }
    onReconnect() {
      if (Object.keys(this.__capabilityInstances).length > 0) {
        this.manager.getDevice({
          id: this.id
        }).then(async (device) => {
          Object.entries(this.__capabilityInstances).forEach(([capabilityId, capabilityInstances]) => {
            const value = device.capabilitiesObj ? typeof device.capabilitiesObj[capabilityId] !== "undefined" ? device.capabilitiesObj[capabilityId].value : null : null;
            for (const capabilityInstance of capabilityInstances) {
              capabilityInstance.__onCapabilityValue({
                capabilityId,
                value,
                transactionId: Util3.uuid()
              });
            }
          });
        }).catch((err) => this.__debug(`Device[${this.id}].onReconnectError:`, err));
      }
    }
    /**
     * Get the device's zone.
     * @returns {Promise<HomeyAPIV3.ManagerZones.Zone>}
     */
    async getZone() {
      return this.homey.zones.getZone({
        id: this.zone
      });
    }
    /**
     * Get the device's driver.
     * @returns {Promise<HomeyAPIV3.ManagerDrivers.Driver>}
     */
    async getDriver() {
      return this.homey.drivers.getDriver({
        id: this.driverId
      });
    }
    /**
     * Get the device's logs.
     * @returns {Promise.<Object.<string, HomeyAPIV3.ManagerInsights.Log>>}
     */
    async getLogs() {
      const logs = await this.homey.insights.getLogs();
      return Object.values(logs).filter((log) => log.ownerUri === this.uri).reduce((accumulator, log) => {
        accumulator[log.id] = log;
        return accumulator;
      }, {});
    }
    /**
     * Get the device's flows.
     * @returns {Promise.<Object.<string, HomeyAPIV3.ManagerFlow.Flow>>}
     */
    async getFlows() {
      const flows = await this.homey.flow.getFlows();
      return Object.values(flows).filter((flow) => {
        if (flow.trigger && flow.trigger.id.startsWith(this.uri))
          return true;
        if (Array.isArray(flow.conditions) && flow.conditions.some((card) => card.id.startsWith(this.uri)))
          return true;
        if (Array.isArray(flow.actions) && flow.actions.some((card) => card.id.startsWith(this.uri)))
          return true;
        return false;
      }).reduce((result, flow) => ({
        ...result,
        [flow.id]: flow
      }), {});
    }
    /**
     * @returns {Promise.<Object.<string, HomeyAPIV3.ManagerFlow.AdvancedFlow>>}
     */
    async getAdvancedFlows() {
      const advancedFlows = await this.homey.flow.getAdvancedFlows();
      return Object.values(advancedFlows).filter((advancedFlow) => {
        return Object.values(advancedFlow.cards).filter((card) => ["trigger", "condition", "action"].includes(card.type)).some((card) => {
          if (card.id.startsWith(this.uri))
            return true;
          return false;
        });
      }).reduce((result, advancedFlow) => ({
        ...result,
        [advancedFlow.id]: advancedFlow
      }), {});
    }
    static transformGet(item) {
      item = super.transformGet(item);
      delete item.driverUri;
      if (item.capabilitiesObj) {
        for (const capabilityObj of Object.values(item.capabilitiesObj)) {
          if (capabilityObj.lastUpdated) {
            capabilityObj.lastUpdated = new Date(capabilityObj.lastUpdated);
          }
        }
      }
      return item;
    }
    get driverUri() {
      console.warn("Device.driverUri is deprecated. Please use Device.driverId instead.");
      return void 0;
    }
    get zoneName() {
      console.warn("Device.zoneName is deprecated.");
      return void 0;
    }
  }
  Device_1$2 = Device3;
  return Device_1$2;
}
var ManagerDevices_1$1;
var hasRequiredManagerDevices$1;
function requireManagerDevices$1() {
  if (hasRequiredManagerDevices$1)
    return ManagerDevices_1$1;
  hasRequiredManagerDevices$1 = 1;
  const Manager = requireManager$1();
  const Capability = requireCapability$1();
  const Device3 = requireDevice$1();
  const _ManagerDevices = class extends Manager {
  };
  let ManagerDevices = _ManagerDevices;
  __publicField(ManagerDevices, "CRUD", {
    ...__superGet(_ManagerDevices, _ManagerDevices, "CRUD"),
    Capability,
    Device: Device3
  });
  ManagerDevices_1$1 = ManagerDevices;
  return ManagerDevices_1$1;
}
var Flow_1$1;
var hasRequiredFlow$1;
function requireFlow$1() {
  if (hasRequiredFlow$1)
    return Flow_1$1;
  hasRequiredFlow$1 = 1;
  const Item = requireItem();
  class Flow extends Item {
    /**
     * Check whether this Flow misses one or more {@link FlowCard} or {@link FlowToken}.
     * @returns Promise<Boolean> - A boolean whether this Flow is broken.
     */
    async isBroken() {
      const managerFlow = this.homey.flow;
      if (!managerFlow.isConnected()) {
        throw new Error("Flow.isBroken requires ManagerFlow to be connected.");
      }
      const managerFlowToken = this.homey.flowtoken;
      if (!managerFlowToken.isConnected()) {
        throw new Error("Flow.isBroken requires ManagerFlowToken to be connected.");
      }
      const tokenIds = [];
      const checkToken = async (tokenId) => {
        if (tokenId.includes("|")) {
          const flowTokens = await managerFlowToken.getFlowTokens();
          for (const flowTokenId of Object.keys(flowTokens)) {
            tokenIds.push(flowTokenId);
          }
          tokenId = tokenId.replace("|", ":");
        }
        if (!tokenIds.includes(tokenId)) {
          throw new Error(`Missing Token: ${tokenId}`);
        }
      };
      const checkTokens = async (card) => {
        if (card.droptoken) {
          await checkToken(card.droptoken);
        }
        if (typeof card.args === "object") {
          for (const arg of Object.values(card.args)) {
            if (typeof arg !== "string")
              continue;
            for (const [tokenMatch, tokenId] of arg.matchAll(/\[\[(.*?)\]\]/g)) {
              await checkToken(tokenId);
            }
          }
        }
      };
      if (this.trigger) {
        try {
          await managerFlow.getFlowCardTriggers();
          const triggerCard = await this.manager.getFlowCardTrigger({ id: this.trigger.id });
          await checkTokens(this.trigger);
          if (Array.isArray(triggerCard.tokens)) {
            for (const tokenId of Object.keys(triggerCard.tokens)) {
              tokenIds.push(tokenId);
            }
          }
        } catch (err) {
          this.__debug(err.message);
          return true;
        }
      }
      if (Array.isArray(this.conditions)) {
        for (const condition of Object.values(this.conditions)) {
          try {
            await managerFlow.getFlowCardConditions();
            const conditionCard = await this.manager.getFlowCardCondition({ id: condition.id });
            await checkTokens(condition);
          } catch (err) {
            this.__debug(err.message);
            return true;
          }
        }
      }
      if (Array.isArray(this.actions)) {
        for (const action of Object.values(this.actions)) {
          try {
            await managerFlow.getFlowCardActions();
            const actionCard = await this.manager.getFlowCardAction({ id: action.id });
            await checkTokens(action);
          } catch (err) {
            this.__debug(err.message);
            return true;
          }
        }
      }
      return false;
    }
  }
  Flow_1$1 = Flow;
  return Flow_1$1;
}
var AdvancedFlow_1$1;
var hasRequiredAdvancedFlow$1;
function requireAdvancedFlow$1() {
  if (hasRequiredAdvancedFlow$1)
    return AdvancedFlow_1$1;
  hasRequiredAdvancedFlow$1 = 1;
  const Item = requireItem();
  class AdvancedFlow extends Item {
    /**
     * Check whether this Flow misses one or more {@link FlowCard} or {@link FlowToken}.
     * @returns Promise<Boolean> - A boolean whether this Flow is broken.
     */
    async isBroken() {
      const managerFlow = this.homey.flow;
      if (!managerFlow.isConnected()) {
        throw new Error("Flow.isBroken requires ManagerFlow to be connected.");
      }
      const managerFlowToken = this.homey.flowtoken;
      if (!managerFlowToken.isConnected()) {
        throw new Error("Flow.isBroken requires ManagerFlowToken to be connected.");
      }
      const tokenIds = [];
      const checkToken = async (tokenId) => {
        if (tokenId.includes("|")) {
          const flowTokens = await managerFlowToken.getFlowTokens();
          for (const flowTokenId of Object.keys(flowTokens)) {
            tokenIds.push(flowTokenId);
          }
          tokenId = tokenId.replace("|", ":");
        }
        if (!tokenIds.includes(tokenId)) {
          throw new Error(`Missing Token: ${tokenId}`);
        }
      };
      const checkTokens = async (card) => {
        if (card.droptoken) {
          await checkToken(card.droptoken);
        }
        if (typeof card.args === "object") {
          for (const arg of Object.values(card.args)) {
            if (typeof arg !== "string")
              continue;
            for (const [tokenMatch, tokenId] of arg.matchAll(/\[\[(.*?)\]\]/g)) {
              await checkToken(tokenId);
            }
          }
        }
      };
      for (const [cardId, card] of Object.entries(this.cards)) {
        switch (card.type) {
          case "trigger": {
            try {
              await managerFlow.getFlowCardTriggers();
              const triggerCard = await this.manager.getFlowCardTrigger({ id: card.id });
              if (Array.isArray(triggerCard.tokens)) {
                for (const token of Object.values(triggerCard.tokens)) {
                  tokenIds.push(`trigger::${cardId}::${token.id}`);
                }
              }
              break;
            } catch (err) {
              this.__debug(err);
              return true;
            }
          }
          case "condition": {
            try {
              await managerFlow.getFlowCardConditions();
              const conditionCard = await this.manager.getFlowCardCondition({ id: card.id });
              tokenIds.push(`card::${cardId}::error`);
              break;
            } catch (err) {
              this.__debug(err);
              return true;
            }
          }
          case "action": {
            try {
              await managerFlow.getFlowCardActions();
              const actionCard = await this.manager.getFlowCardAction({ id: card.id });
              tokenIds.push(`card::${cardId}::error`);
              if (Array.isArray(actionCard.tokens)) {
                for (const token of Object.values(actionCard.tokens)) {
                  tokenIds.push(`action::${cardId}::${token.id}`);
                }
              }
              break;
            } catch (err) {
              this.__debug(err);
              return true;
            }
          }
        }
      }
      for (const card of Object.values(this.cards)) {
        await checkTokens(card);
      }
      return false;
    }
  }
  AdvancedFlow_1$1 = AdvancedFlow;
  return AdvancedFlow_1$1;
}
var FlowCard_1;
var hasRequiredFlowCard;
function requireFlowCard() {
  if (hasRequiredFlowCard)
    return FlowCard_1;
  hasRequiredFlowCard = 1;
  const Item = requireItem();
  class FlowCard extends Item {
    static transformGet(item) {
      item = super.transformGet(item);
      delete item.ownerName;
      return item;
    }
  }
  FlowCard_1 = FlowCard;
  return FlowCard_1;
}
var FlowCardTrigger_1$1;
var hasRequiredFlowCardTrigger$1;
function requireFlowCardTrigger$1() {
  if (hasRequiredFlowCardTrigger$1)
    return FlowCardTrigger_1$1;
  hasRequiredFlowCardTrigger$1 = 1;
  const FlowCard = requireFlowCard();
  class FlowCardTrigger extends FlowCard {
    get uri() {
      console.warn("FlowCardTrigger.uri is deprecated. Use FlowCardTrigger.ownerUri instead.");
      return void 0;
    }
    get uriObj() {
      console.warn("FlowCardTrigger.uriObj is deprecated.");
      return void 0;
    }
  }
  FlowCardTrigger_1$1 = FlowCardTrigger;
  return FlowCardTrigger_1$1;
}
var FlowCardCondition_1$1;
var hasRequiredFlowCardCondition$1;
function requireFlowCardCondition$1() {
  if (hasRequiredFlowCardCondition$1)
    return FlowCardCondition_1$1;
  hasRequiredFlowCardCondition$1 = 1;
  const FlowCard = requireFlowCard();
  class FlowCardCondition extends FlowCard {
    get uri() {
      console.warn("FlowCardCondition.uri is deprecated. Use FlowCardCondition.ownerUri instead.");
      return void 0;
    }
    get uriObj() {
      console.warn("FlowCardCondition.uriObj is deprecated.");
      return void 0;
    }
  }
  FlowCardCondition_1$1 = FlowCardCondition;
  return FlowCardCondition_1$1;
}
var FlowCardAction_1$1;
var hasRequiredFlowCardAction$1;
function requireFlowCardAction$1() {
  if (hasRequiredFlowCardAction$1)
    return FlowCardAction_1$1;
  hasRequiredFlowCardAction$1 = 1;
  const FlowCard = requireFlowCard();
  class FlowCardAction extends FlowCard {
    get uri() {
      console.warn("FlowCardAction.uri is deprecated. Use FlowCardAction.ownerUri instead.");
      return void 0;
    }
    get uriObj() {
      console.warn("FlowCardAction.uriObj is deprecated.");
      return void 0;
    }
  }
  FlowCardAction_1$1 = FlowCardAction;
  return FlowCardAction_1$1;
}
var ManagerFlow_1$1;
var hasRequiredManagerFlow$1;
function requireManagerFlow$1() {
  if (hasRequiredManagerFlow$1)
    return ManagerFlow_1$1;
  hasRequiredManagerFlow$1 = 1;
  const Manager = requireManager$1();
  const Flow = requireFlow$1();
  const AdvancedFlow = requireAdvancedFlow$1();
  const FlowCardTrigger = requireFlowCardTrigger$1();
  const FlowCardCondition = requireFlowCardCondition$1();
  const FlowCardAction = requireFlowCardAction$1();
  const _ManagerFlow = class extends Manager {
  };
  let ManagerFlow = _ManagerFlow;
  __publicField(ManagerFlow, "CRUD", {
    ...__superGet(_ManagerFlow, _ManagerFlow, "CRUD"),
    Flow,
    AdvancedFlow,
    FlowCardTrigger,
    FlowCardCondition,
    FlowCardAction
  });
  ManagerFlow_1$1 = ManagerFlow;
  return ManagerFlow_1$1;
}
var FlowToken_1$1;
var hasRequiredFlowToken$1;
function requireFlowToken$1() {
  if (hasRequiredFlowToken$1)
    return FlowToken_1$1;
  hasRequiredFlowToken$1 = 1;
  const Item = requireItem();
  class FlowToken extends Item {
    static transformGet(item) {
      item = super.transformGet(item);
      if (item.uri) {
        item.id = `${item.uri}:${item.id}`;
        delete item.uri;
      }
      delete item.uriObj;
      delete item.ownerName;
      return item;
    }
    get uriObj() {
      console.warn("FlowToken.uriObj is deprecated.");
      return void 0;
    }
    get ownerName() {
      console.warn("FlowToken.ownerName is deprecated.");
      return void 0;
    }
  }
  FlowToken_1$1 = FlowToken;
  return FlowToken_1$1;
}
var ManagerFlowToken_1$1;
var hasRequiredManagerFlowToken$1;
function requireManagerFlowToken$1() {
  if (hasRequiredManagerFlowToken$1)
    return ManagerFlowToken_1$1;
  hasRequiredManagerFlowToken$1 = 1;
  const Manager = requireManager$1();
  const FlowToken = requireFlowToken$1();
  const _ManagerFlowToken = class extends Manager {
  };
  let ManagerFlowToken = _ManagerFlowToken;
  __publicField(ManagerFlowToken, "CRUD", {
    ...__superGet(_ManagerFlowToken, _ManagerFlowToken, "CRUD"),
    FlowToken
  });
  ManagerFlowToken_1$1 = ManagerFlowToken;
  return ManagerFlowToken_1$1;
}
var Log_1$1;
var hasRequiredLog$1;
function requireLog$1() {
  if (hasRequiredLog$1)
    return Log_1$1;
  hasRequiredLog$1 = 1;
  const Item = requireItem();
  class Log extends Item {
    async getEntries() {
      return this.manager.getLogEntries({
        id: this.id
      });
    }
    static transformGet(item) {
      item = super.transformGet(item);
      delete item.ownerName;
      return item;
    }
    get uri() {
      console.warn("Log.uri is deprecated. Use Log.ownerUri instead.");
      return void 0;
    }
    get uriObj() {
      console.warn("Log.uriObj is deprecated.");
      return void 0;
    }
    get ownerName() {
      console.warn("Log.ownerName is deprecated.");
      return void 0;
    }
  }
  Log_1$1 = Log;
  return Log_1$1;
}
var ManagerInsights_1$1;
var hasRequiredManagerInsights$1;
function requireManagerInsights$1() {
  if (hasRequiredManagerInsights$1)
    return ManagerInsights_1$1;
  hasRequiredManagerInsights$1 = 1;
  const Manager = requireManager$1();
  const Log = requireLog$1();
  const _ManagerInsights = class extends Manager {
  };
  let ManagerInsights = _ManagerInsights;
  __publicField(ManagerInsights, "CRUD", {
    ...__superGet(_ManagerInsights, _ManagerInsights, "CRUD"),
    Log
  });
  ManagerInsights_1$1 = ManagerInsights;
  return ManagerInsights_1$1;
}
var ManagerUsers_1;
var hasRequiredManagerUsers;
function requireManagerUsers() {
  if (hasRequiredManagerUsers)
    return ManagerUsers_1;
  hasRequiredManagerUsers = 1;
  const Manager = requireManager$1();
  class ManagerUsers extends Manager {
    constructor() {
      super(...arguments);
      __publicField(this, "__userMe", null);
    }
    async getUserMe(...args) {
      const options = args[0] ?? {};
      if (this.__userMe != null && options.$cache !== false) {
        return await this.__userMe;
      }
      this.__userMe = this.__super__getUserMe(...args).then((result) => {
        const ItemClass = this.itemClasses.User;
        const props = ItemClass.transformGet(result);
        if (this.isConnected()) {
          if (this.__cache[ItemClass.ID][props.id] != null) {
            this.__cache[ItemClass.ID][props.id].__update(props);
          } else {
            this.__cache[ItemClass.ID][props.id] = new ItemClass({
              id: props.id,
              homey: this.homey,
              manager: this,
              properties: props
            });
          }
          return this.__cache[ItemClass.ID][props.id];
        }
        return new ItemClass({
          id: props.id,
          homey: this.homey,
          manager: this,
          properties: props
        });
      }).catch((err) => {
        this.__userMe = null;
        throw err;
      });
      return await this.__userMe;
    }
  }
  ManagerUsers_1 = ManagerUsers;
  return ManagerUsers_1;
}
const managers$2 = {
  ManagerAlarms: {
    id: "alarms",
    idCamelCase: "alarms",
    "private": false,
    items: {
      Alarm: {
        id: "alarm",
        type: "id",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              "x-homey-readonly": true
            },
            name: {
              type: "string"
            },
            time: {
              type: "string"
            },
            enabled: {
              type: "boolean"
            },
            nextOccurance: {
              type: "string",
              format: "date-time",
              "x-homey-readonly": true
            },
            repetition: {
              type: "object",
              required: [
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday",
                "sunday"
              ],
              properties: {
                monday: {
                  type: "boolean"
                },
                tuesday: {
                  type: "boolean"
                },
                wednesday: {
                  type: "boolean"
                },
                thursday: {
                  type: "boolean"
                },
                friday: {
                  type: "boolean"
                },
                saturday: {
                  type: "boolean"
                },
                sunday: {
                  type: "boolean"
                }
              }
            }
          },
          "x-realtime-bindings": {
            read: "getAlarm",
            create: "alarm.create",
            update: "alarm.update",
            "delete": "alarm.delete"
          }
        }
      }
    },
    operations: {
      deleteAlarm: {
        method: "DELETE",
        path: "/alarm/:id",
        "private": false,
        scopes: [
          "homey.alarm"
        ],
        crud: {
          type: "deleteOne",
          item: "Alarm"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      updateAlarm: {
        method: "PUT",
        path: "/alarm/:id",
        "private": false,
        scopes: [
          "homey.alarm"
        ],
        crud: {
          type: "updateOne",
          item: "Alarm"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          },
          alarm: {
            "in": "body",
            root: true,
            required: true
          }
        }
      },
      createAlarm: {
        method: "POST",
        path: "/alarm",
        "private": false,
        scopes: [
          "homey.alarm"
        ],
        crud: {
          type: "createOne",
          item: "Alarm"
        },
        parameters: {
          alarm: {
            "in": "body",
            root: true,
            required: true
          }
        }
      },
      getAlarm: {
        method: "GET",
        path: "/alarm/:id",
        "private": false,
        scopes: [
          "homey.alarm.readonly"
        ],
        crud: {
          type: "getOne",
          item: "Alarm"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      getAlarms: {
        method: "GET",
        path: "/alarm",
        "private": false,
        scopes: [
          "homey.alarm.readonly"
        ],
        crud: {
          type: "getAll",
          item: "Alarm"
        },
        parameters: {}
      }
    }
  },
  ManagerApps: {
    id: "apps",
    idCamelCase: "apps",
    "private": false,
    items: {
      App: {
        id: "app",
        type: "id",
        schema: {
          type: "object",
          properties: {
            enabled: {
              "x-homey-readonly": true,
              type: "boolean",
              "default": true
            },
            autoupdate: {
              type: "boolean",
              "default": true
            },
            id: {
              "x-homey-readonly": true,
              type: "string"
            },
            sdk: {
              "x-homey-readonly": true,
              type: "number",
              "enum": [
                1,
                2,
                3
              ]
            },
            name: {
              "x-homey-readonly": true,
              type: "string"
            },
            origin: {
              "x-homey-updateable": false,
              type: "string",
              "enum": [
                "appstore",
                "devkit_run",
                "devkit_install",
                "unknown"
              ]
            },
            channel: {
              "x-homey-updateable": false,
              type: "string",
              "enum": [
                "stable",
                "beta",
                "alpha"
              ]
            },
            version: {
              "x-homey-readonly": true,
              type: "string"
            },
            compatibility: {
              "x-homey-readonly": true,
              type: "string"
            },
            icon: {
              type: "string"
            },
            iconObj: {
              "x-homey-updateable": false,
              type: "object",
              properties: {
                id: {
                  type: "string"
                },
                url: {
                  type: "string"
                }
              }
            },
            author: {
              "x-homey-readonly": true,
              type: "object",
              properties: {
                name: {
                  type: "string"
                },
                email: {
                  type: "string"
                }
              }
            },
            permissions: {
              "x-homey-readonly": true,
              type: "array",
              items: {
                type: "string"
              }
            },
            images: {
              "x-homey-readonly": true,
              type: "object",
              properties: {
                small: {
                  type: "string"
                },
                large: {
                  type: "string"
                }
              }
            },
            session: {
              "x-homey-readonly": true,
              type: "string"
            },
            ready: {
              "x-homey-readonly": true,
              type: "boolean"
            },
            state: {
              "x-homey-readonly": true,
              type: "string",
              "enum": [
                "stopped",
                "stopping",
                "starting",
                "running"
              ]
            },
            crashed: {
              "x-homey-readonly": true,
              type: "boolean"
            },
            crashedMessage: {
              "x-homey-readonly": true,
              type: "string"
            },
            exitCode: {
              "x-homey-readonly": true,
              type: "number"
            },
            exitSignal: {
              "x-homey-readonly": true,
              type: "string"
            },
            exitCount: {
              "x-homey-readonly": true,
              type: "number"
            },
            settings: {
              "x-homey-readonly": true,
              type: "boolean"
            },
            brandColor: {
              "x-homey-readonly": true,
              type: "string"
            },
            hasDrivers: {
              "x-homey-readonly": true,
              type: "boolean"
            },
            usage: {
              "x-homey-readonly": true,
              type: "object",
              properties: {
                cpu: {
                  type: "number"
                },
                mem: {
                  type: "number"
                }
              }
            },
            updateAvailable: {
              type: "object",
              properties: {
                version: {
                  type: "string"
                },
                permissions: {
                  type: "array",
                  items: {
                    type: "string"
                  }
                }
              }
            }
          },
          "x-realtime-bindings": {
            read: "getApp",
            create: "app.create",
            update: "app.update",
            "delete": "app.delete"
          }
        }
      }
    },
    operations: {
      uninstallApp: {
        method: "DELETE",
        path: "/app/:id",
        "private": false,
        scopes: [
          "homey.app"
        ],
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          },
          purgeSettings: {
            "in": "query",
            type: "string"
          }
        }
      },
      installFromAppStore: {
        method: "POST",
        path: "/store/",
        "private": false,
        scopes: [
          "homey.app"
        ],
        parameters: {
          channel: {
            "in": "body",
            type: "string"
          },
          id: {
            "in": "body",
            type: "string",
            required: true
          }
        }
      },
      getAppLocales: {
        method: "GET",
        path: "/app/:id/locale",
        "private": false,
        scopes: [
          "homey.app.readonly"
        ],
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      disableApp: {
        method: "PUT",
        path: "/app/:id/disable",
        "private": false,
        scopes: [
          "homey.app"
        ],
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      enableApp: {
        method: "PUT",
        path: "/app/:id/enable",
        "private": false,
        scopes: [
          "homey.app"
        ],
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      garbageCollectApp: {
        method: "POST",
        path: "/app/:id/gc",
        "private": false,
        scopes: [
          "homey.app"
        ],
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      restartApp: {
        method: "POST",
        path: "/app/:id/restart",
        "private": false,
        scopes: [
          "homey.app"
        ],
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      unsetAppSetting: {
        method: "DELETE",
        path: "/app/:id/setting/:name",
        "private": false,
        scopes: [
          "homey.app.control"
        ],
        parameters: {
          name: {
            "in": "path",
            required: true,
            type: "string"
          },
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      setAppSetting: {
        method: "PUT",
        path: "/app/:id/setting/:name",
        "private": false,
        scopes: [
          "homey.app.control"
        ],
        parameters: {
          name: {
            "in": "path",
            required: true,
            type: "string"
          },
          id: {
            "in": "path",
            required: true,
            type: "string"
          },
          value: {
            "in": "body",
            required: true
          }
        }
      },
      getAppSetting: {
        method: "GET",
        path: "/app/:id/setting/:name",
        "private": false,
        scopes: [
          "homey.app.control"
        ],
        parameters: {
          name: {
            "in": "path",
            required: true,
            type: "string"
          },
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      getAppSettings: {
        method: "GET",
        path: "/app/:id/setting",
        "private": false,
        scopes: [
          "homey.app.control"
        ],
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      getAppStd: {
        method: "POST",
        path: "/app/:id/crashlog",
        "private": false,
        scopes: [
          "homey.app.readonly"
        ],
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          },
          message: {
            "in": "body",
            type: "string"
          }
        }
      },
      updateApp: {
        method: "PUT",
        path: "/app/:id",
        "private": false,
        scopes: [
          "homey.app"
        ],
        crud: {
          type: "updateOne",
          item: "App"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          },
          app: {
            "in": "body",
            root: true,
            required: true
          }
        }
      },
      getApp: {
        method: "GET",
        path: "/app/:id",
        "private": false,
        scopes: [
          "homey.app.readonly"
        ],
        crud: {
          type: "getOne",
          item: "App"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      getApps: {
        method: "GET",
        path: "/app",
        "private": false,
        scopes: [
          "homey.app.readonly"
        ],
        crud: {
          type: "getAll",
          item: "App"
        },
        parameters: {}
      }
    }
  },
  ManagerAudio: {
    id: "audio",
    idCamelCase: "audio",
    "private": false,
    operations: {
      getOptionVolume: {
        method: "GET",
        path: "/option/volume",
        scopes: [
          "SYSTEM"
        ]
      },
      setOptionVolume: {
        method: "PUT",
        path: "/option/volume",
        scopes: [
          "SYSTEM"
        ],
        parameters: {
          value: {
            "in": "body",
            type: "number",
            required: true
          }
        }
      },
      unsetOptionVolume: {
        method: "DELETE",
        path: "/option/volume",
        scopes: [
          "SYSTEM"
        ]
      },
      playVolumeHint: {
        method: "POST",
        path: "/volume-hint/",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {}
      }
    }
  },
  ManagerBackup: {
    id: "backup",
    idCamelCase: "backup",
    "private": false,
    operations: {
      getState: {
        method: "GET",
        path: "/state",
        scopes: [
          "SYSTEM_READONLY"
        ]
      },
      getOptionAutomaticBackupsEnabled: {
        method: "GET",
        path: "/option/automaticBackupsEnabled",
        scopes: [
          "SYSTEM"
        ]
      },
      setOptionAutomaticBackupsEnabled: {
        method: "PUT",
        path: "/option/automaticBackupsEnabled",
        scopes: [
          "SYSTEM"
        ],
        parameters: {
          value: {
            "in": "body",
            type: "boolean",
            required: true
          }
        }
      },
      unsetOptionAutomaticBackupsEnabled: {
        method: "DELETE",
        path: "/option/automaticBackupsEnabled",
        scopes: [
          "SYSTEM"
        ]
      },
      getOptionLastSuccessfulBackup: {
        method: "GET",
        path: "/option/lastSuccessfulBackup",
        scopes: [
          "SYSTEM"
        ]
      },
      setOptionLastSuccessfulBackup: {
        method: "PUT",
        path: "/option/lastSuccessfulBackup",
        scopes: [],
        parameters: {
          value: {
            "in": "body",
            type: "string",
            required: true
          }
        }
      },
      unsetOptionLastSuccessfulBackup: {
        method: "DELETE",
        path: "/option/lastSuccessfulBackup",
        scopes: []
      },
      scheduleBackup: {
        method: "POST",
        path: "/backup/",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {}
      }
    }
  },
  ManagerBLE: {
    id: "ble",
    idCamelCase: "ble",
    "private": false,
    operations: {
      getState: {
        method: "GET",
        path: "/state",
        scopes: [
          "SYSTEM_READONLY"
        ]
      },
      runCommand: {
        method: "POST",
        path: "/command",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          opts: {
            "in": "body",
            type: "object"
          },
          command: {
            "in": "body",
            type: "string",
            required: true
          }
        }
      }
    }
  },
  ManagerCloud: {
    id: "cloud",
    idCamelCase: "cloud",
    "private": false,
    operations: {
      getState: {
        method: "GET",
        path: "/state",
        scopes: [
          "SYSTEM_READONLY"
        ]
      }
    }
  },
  ManagerCoprocessor: {
    id: "coprocessor",
    idCamelCase: "coprocessor",
    "private": true,
    operations: {
      setConfig: {
        method: "PUT",
        path: "/:deviceId/config",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          deviceId: {
            "in": "path",
            type: "string"
          },
          config: {
            "in": "body",
            type: "object",
            root: true
          }
        }
      },
      setModulation: {
        method: "PUT",
        path: "/:deviceId/modulation",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          deviceId: {
            "in": "path",
            type: "string"
          },
          baudRate: {
            "in": "body",
            type: "number"
          },
          channelSpacing: {
            "in": "body",
            type: "number"
          },
          channelDeviation: {
            "in": "body",
            type: "number"
          },
          carrier: {
            "in": "body",
            type: "number"
          },
          type: {
            "in": "body",
            type: "string"
          }
        }
      }
    }
  },
  ManagerDatabase: {
    id: "database",
    idCamelCase: "database",
    "private": false,
    operations: {
      optimize: {
        method: "POST",
        path: "/optimize",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {}
      }
    }
  },
  ManagerDevices: {
    id: "devices",
    idCamelCase: "devices",
    "private": false,
    items: {
      Device: {
        id: "device",
        type: "id",
        schema: {
          type: "object",
          properties: {
            id: {
              "x-homey-readonly": true,
              type: "string",
              format: "uuid"
            },
            name: {
              type: "string"
            },
            driverUri: {
              "x-homey-updateable": false,
              type: "string"
            },
            driverId: {
              "x-homey-updateable": false,
              type: "string"
            },
            zone: {
              type: "string",
              description: "The id of the device's zone."
            },
            data: {
              "x-homey-updateable": false,
              type: "object"
            },
            icon: {
              type: "string"
            },
            iconObj: {
              "x-homey-updateable": false,
              type: "object",
              properties: {
                id: {
                  type: "string"
                },
                url: {
                  type: "string"
                }
              }
            },
            iconOverride: {
              type: [
                "string",
                "null"
              ]
            },
            settings: {
              "x-homey-updateable": false,
              type: "object"
            },
            settingsObj: {
              "x-homey-updateable": false,
              type: "boolean",
              description: "This property is true when there are settings, getable by the getDeviceSettingsObj method"
            },
            "class": {
              "x-homey-updateable": false,
              type: "string"
            },
            energy: {
              "x-homey-updateable": false,
              type: "object",
              properties: {
                approximation: {
                  type: "object",
                  properties: {
                    usageOn: {
                      type: "number"
                    },
                    usageOff: {
                      type: "number"
                    },
                    usageConstant: {
                      type: "number"
                    }
                  }
                },
                cumulative: {
                  type: "boolean"
                },
                batteries: {
                  type: "array",
                  items: {
                    type: "string"
                  }
                }
              }
            },
            energyObj: {
              "x-homey-updateable": false,
              type: "object"
            },
            virtualClass: {
              type: [
                "string",
                "null"
              ]
            },
            ui: {
              "x-homey-updateable": false,
              type: "object",
              properties: {
                quickAction: {
                  type: "string",
                  description: "Optional capabilityId of the quick action"
                },
                components: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                        description: "ID of the UI component"
                      },
                      capabilities: {
                        type: "array",
                        description: "An array of capabilityIds",
                        items: {
                          type: "string"
                        }
                      }
                    }
                  }
                }
              }
            },
            uiIndicator: {
              type: [
                "string",
                "null"
              ]
            },
            capabilities: {
              "x-homey-updateable": false,
              type: "array",
              items: {
                type: "string"
              }
            },
            capabilitiesObj: {
              "x-homey-updateable": false,
              type: "object",
              additionalProperties: {
                type: "object",
                properties: {
                  id: {
                    type: "string"
                  },
                  uri: {
                    type: "string"
                  },
                  title: {
                    type: "string"
                  },
                  desc: {
                    type: "string"
                  },
                  type: {
                    type: "string",
                    "enum": [
                      "boolean",
                      "number",
                      "string",
                      "enum"
                    ]
                  },
                  getable: {
                    type: "boolean"
                  },
                  setable: {
                    type: "boolean"
                  },
                  chartType: {
                    type: "string",
                    "enum": [
                      "line",
                      "area",
                      "stepLine",
                      "column",
                      "spline",
                      "splineArea",
                      "scatter"
                    ]
                  },
                  decimals: {
                    type: "number"
                  },
                  min: {
                    type: "number"
                  },
                  max: {
                    type: "number"
                  },
                  step: {
                    type: "number"
                  },
                  units: {
                    type: "string"
                  },
                  values: {
                    type: "array",
                    items: {
                      type: "object",
                      required: [
                        "id",
                        "title"
                      ],
                      properties: {
                        id: {
                          type: "string"
                        },
                        title: {
                          type: "string"
                        }
                      }
                    }
                  },
                  value: {
                    type: "object"
                  },
                  lastUpdated: {
                    type: "string",
                    format: "date-time"
                  },
                  options: {
                    type: "object"
                  }
                }
              }
            },
            capabilitiesOptions: {
              "x-homey-updateable": false,
              type: "object"
            },
            flags: {
              "x-homey-readonly": true,
              type: "array",
              items: {
                type: "string"
              }
            },
            ready: {
              "x-homey-readonly": true,
              type: "boolean",
              description: "A device is when the device's driver is available and ready."
            },
            available: {
              "x-homey-readonly": true,
              type: "boolean",
              description: "A device can be available or unavailable, decided by the device's driver. If the driver is unavailable, the property `unavailableMessage` might be set. For example, a device can be unavailable when there is no wireless connection possible."
            },
            repair: {
              "x-homey-readonly": true,
              type: "boolean",
              description: "If true, this device can be repaired using a repair PairSession."
            },
            unpair: {
              "x-homey-readonly": true,
              type: "boolean",
              description: "If true, this device needs to be deleted using an unpair PairSession."
            },
            unavailableMessage: {
              "x-homey-readonly": true,
              type: "string"
            },
            images: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  type: {
                    type: "string",
                    "enum": [
                      "media",
                      "camera"
                    ]
                  },
                  id: {
                    type: "string"
                  },
                  imageObj: {
                    "x-base-class": "ManagerImages.Image",
                    "x-homey-updateable": false,
                    type: "object",
                    properties: {
                      id: {
                        type: "string"
                      },
                      ownerUri: {
                        type: "string"
                      },
                      url: {
                        type: "string"
                      },
                      lastUpdated: {
                        type: "string",
                        format: "date-time"
                      }
                    }
                  }
                }
              }
            },
            insights: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  uri: {
                    type: "string"
                  },
                  id: {
                    type: "string"
                  },
                  title: {
                    type: "string"
                  },
                  titleTrue: {
                    type: "string"
                  },
                  titleFalse: {
                    type: "string"
                  },
                  units: {
                    type: "string"
                  },
                  decimals: {
                    type: "number"
                  }
                }
              }
            },
            color: {
              type: "string"
            }
          },
          "x-realtime-bindings": {
            read: "getDevice",
            create: "device.create",
            update: "device.update",
            "delete": "device.delete"
          }
        }
      },
      Capability: {
        id: "capability",
        type: "filter",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            },
            uri: {
              type: "string"
            },
            title: {
              type: "string"
            },
            desc: {
              type: "string"
            },
            type: {
              type: "string",
              "enum": [
                "boolean",
                "number",
                "string",
                "enum"
              ]
            },
            getable: {
              type: "boolean"
            },
            setable: {
              type: "boolean"
            },
            chartType: {
              type: "string",
              "enum": [
                "line",
                "area",
                "stepLine",
                "column",
                "spline",
                "splineArea",
                "scatter"
              ]
            },
            decimals: {
              type: "number"
            },
            min: {
              type: "number"
            },
            max: {
              type: "number"
            },
            step: {
              type: "number"
            },
            units: {
              type: "string"
            },
            values: {
              type: "array",
              items: {
                type: "object",
                required: [
                  "id",
                  "title"
                ],
                properties: {
                  id: {
                    type: "string"
                  },
                  title: {
                    type: "string"
                  }
                }
              }
            }
          },
          "x-realtime-bindings": {
            read: "getCapability",
            create: "capability.create",
            update: "capability.update",
            "delete": "capability.delete"
          }
        }
      }
    },
    operations: {
      getCapability: {
        method: "GET",
        path: "/capability/:uri/:id",
        "private": false,
        scopes: [
          "homey.device.readonly"
        ],
        crud: {
          type: "getOne",
          item: "Capability"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          },
          uri: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      getCapabilities: {
        method: "GET",
        path: "/capability",
        "private": false,
        scopes: [
          "homey.device.readonly"
        ],
        crud: {
          type: "getAll",
          item: "Capability"
        },
        parameters: {}
      },
      setDeviceSettings: {
        method: "PUT",
        path: "/device/:id/settings",
        "private": false,
        scopes: [
          "homey.device"
        ],
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          },
          settings: {
            "in": "body",
            root: true,
            required: true
          }
        }
      },
      getDeviceSettingsObj: {
        method: "GET",
        path: "/device/:id/settings_obj",
        "private": false,
        scopes: [
          "homey.device.readonly"
        ],
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      setCapabilityValue: {
        method: "PUT",
        path: "/device/:deviceId/capability/:capabilityId",
        "private": false,
        scopes: [
          "homey.device.control"
        ],
        parameters: {
          capabilityId: {
            "in": "path",
            required: true,
            type: "string"
          },
          deviceId: {
            "in": "path",
            required: true,
            type: "string"
          },
          transactionId: {
            "in": "body"
          },
          opts: {
            "in": "body"
          },
          value: {
            "in": "body",
            required: true
          }
        }
      },
      deleteDevice: {
        method: "DELETE",
        path: "/device/:id",
        "private": false,
        scopes: [
          "homey.device"
        ],
        crud: {
          type: "deleteOne",
          item: "Device"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      updateDevice: {
        method: "PUT",
        path: "/device/:id",
        "private": false,
        scopes: [
          "homey.device"
        ],
        crud: {
          type: "updateOne",
          item: "Device"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          device: {
            "in": "body",
            root: true,
            required: true
          }
        }
      },
      getDevice: {
        method: "GET",
        path: "/device/:id",
        "private": false,
        scopes: [
          "homey.device.readonly"
        ],
        crud: {
          type: "getOne",
          item: "Device"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      getDevices: {
        method: "GET",
        path: "/device/",
        "private": false,
        scopes: [
          "homey.device.readonly"
        ],
        crud: {
          type: "getAll",
          item: "Device"
        },
        parameters: {}
      }
    }
  },
  ManagerDevkit: {
    id: "devkit",
    idCamelCase: "devkit",
    "private": false,
    operations: {
      getAppStdOut: {
        method: "GET",
        path: "/std/:session",
        "private": false,
        scopes: [
          "homey.app.readonly"
        ],
        parameters: {
          session: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      getAppUsage: {
        method: "GET",
        path: "/usage",
        "private": false,
        scopes: [
          "homey.app.readonly"
        ],
        parameters: {}
      },
      setUsbMode: {
        method: "PUT",
        path: "/usb/",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          os: {
            "in": "body",
            type: "string",
            required: true
          }
        }
      },
      getUsbMode: {
        method: "GET",
        path: "/usb/",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {}
      },
      stopApp: {
        method: "DELETE",
        path: "/:session",
        "private": false,
        scopes: [
          "homey.app"
        ],
        parameters: {
          session: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      runApp: {
        method: "POST",
        path: "/",
        "private": false,
        scopes: [
          "homey.app"
        ],
        parameters: {
          purgeSettings: {
            "in": "formData",
            type: "string",
            required: true
          },
          env: {
            "in": "formData",
            type: "string",
            required: true
          },
          debug: {
            "in": "formData",
            type: "string",
            required: true
          },
          app: {
            "in": "formData",
            type: "string",
            required: true
          }
        }
      },
      stopLedringAnimation: {
        method: "DELETE",
        path: "/ledring",
        "private": false,
        scopes: [
          "homey.app"
        ],
        parameters: {
          animation_id: {
            "in": "query",
            type: "string",
            required: true
          }
        }
      },
      startLedringAnimation: {
        method: "POST",
        path: "/ledring",
        "private": false,
        scopes: [
          "homey.app"
        ],
        parameters: {
          animation: {
            "in": "body",
            root: true,
            required: true
          }
        }
      }
    }
  },
  ManagerDrivers: {
    id: "drivers",
    idCamelCase: "drivers",
    "private": false,
    items: {
      Driver: {
        id: "driver",
        type: "filter",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            },
            uri: {
              type: "string"
            },
            uriObj: {
              type: "object"
            },
            icon: {
              type: "string"
            },
            iconObj: {
              "x-homey-updateable": false,
              type: "object",
              properties: {
                id: {
                  type: "string"
                },
                url: {
                  type: "string"
                }
              }
            },
            ready: {
              type: "boolean"
            },
            pair: {
              type: "boolean"
            },
            unpair: {
              type: "boolean"
            },
            repair: {
              type: "boolean"
            },
            color: {
              type: "string"
            },
            deprecated: {
              type: "boolean"
            },
            "class": {
              type: "string"
            },
            connectivity: {
              type: "array"
            }
          },
          "x-realtime-bindings": {
            read: "getDriver",
            create: "driver.create",
            update: "driver.update",
            "delete": "driver.delete"
          }
        }
      },
      Device: {
        id: "device",
        type: "id",
        schema: {
          type: "object",
          properties: {
            id: {
              "x-homey-readonly": true,
              type: "string",
              format: "uuid"
            },
            name: {
              type: "string"
            },
            driverUri: {
              "x-homey-updateable": false,
              type: "string"
            },
            driverId: {
              "x-homey-updateable": false,
              type: "string"
            },
            zone: {
              type: "string",
              description: "The id of the device's zone."
            },
            data: {
              "x-homey-updateable": false,
              type: "object"
            },
            icon: {
              type: "string"
            },
            iconObj: {
              "x-homey-updateable": false,
              type: "object",
              properties: {
                id: {
                  type: "string"
                },
                url: {
                  type: "string"
                }
              }
            },
            iconOverride: {
              type: [
                "string",
                "null"
              ]
            },
            settings: {
              "x-homey-updateable": false,
              type: "object"
            },
            settingsObj: {
              "x-homey-updateable": false,
              type: "boolean",
              description: "This property is true when there are settings, getable by the getDeviceSettingsObj method"
            },
            "class": {
              "x-homey-updateable": false,
              type: "string"
            },
            energy: {
              "x-homey-updateable": false,
              type: "object",
              properties: {
                approximation: {
                  type: "object",
                  properties: {
                    usageOn: {
                      type: "number"
                    },
                    usageOff: {
                      type: "number"
                    },
                    usageConstant: {
                      type: "number"
                    }
                  }
                },
                cumulative: {
                  type: "boolean"
                },
                batteries: {
                  type: "array",
                  items: {
                    type: "string"
                  }
                }
              }
            },
            energyObj: {
              "x-homey-updateable": false,
              type: "object"
            },
            virtualClass: {
              type: [
                "string",
                "null"
              ]
            },
            ui: {
              "x-homey-updateable": false,
              type: "object",
              properties: {
                quickAction: {
                  type: "string",
                  description: "Optional capabilityId of the quick action"
                },
                components: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                        description: "ID of the UI component"
                      },
                      capabilities: {
                        type: "array",
                        description: "An array of capabilityIds",
                        items: {
                          type: "string"
                        }
                      }
                    }
                  }
                }
              }
            },
            uiIndicator: {
              type: [
                "string",
                "null"
              ]
            },
            capabilities: {
              "x-homey-updateable": false,
              type: "array",
              items: {
                type: "string"
              }
            },
            capabilitiesObj: {
              "x-homey-updateable": false,
              type: "object",
              additionalProperties: {
                type: "object",
                properties: {
                  id: {
                    type: "string"
                  },
                  uri: {
                    type: "string"
                  },
                  title: {
                    type: "string"
                  },
                  desc: {
                    type: "string"
                  },
                  type: {
                    type: "string",
                    "enum": [
                      "boolean",
                      "number",
                      "string",
                      "enum"
                    ]
                  },
                  getable: {
                    type: "boolean"
                  },
                  setable: {
                    type: "boolean"
                  },
                  chartType: {
                    type: "string",
                    "enum": [
                      "line",
                      "area",
                      "stepLine",
                      "column",
                      "spline",
                      "splineArea",
                      "scatter"
                    ]
                  },
                  decimals: {
                    type: "number"
                  },
                  min: {
                    type: "number"
                  },
                  max: {
                    type: "number"
                  },
                  step: {
                    type: "number"
                  },
                  units: {
                    type: "string"
                  },
                  values: {
                    type: "array",
                    items: {
                      type: "object",
                      required: [
                        "id",
                        "title"
                      ],
                      properties: {
                        id: {
                          type: "string"
                        },
                        title: {
                          type: "string"
                        }
                      }
                    }
                  },
                  value: {
                    type: "object"
                  },
                  lastUpdated: {
                    type: "string",
                    format: "date-time"
                  },
                  options: {
                    type: "object"
                  }
                }
              }
            },
            capabilitiesOptions: {
              "x-homey-updateable": false,
              type: "object"
            },
            flags: {
              "x-homey-readonly": true,
              type: "array",
              items: {
                type: "string"
              }
            },
            ready: {
              "x-homey-readonly": true,
              type: "boolean",
              description: "A device is when the device's driver is available and ready."
            },
            available: {
              "x-homey-readonly": true,
              type: "boolean",
              description: "A device can be available or unavailable, decided by the device's driver. If the driver is unavailable, the property `unavailableMessage` might be set. For example, a device can be unavailable when there is no wireless connection possible."
            },
            repair: {
              "x-homey-readonly": true,
              type: "boolean",
              description: "If true, this device can be repaired using a repair PairSession."
            },
            unpair: {
              "x-homey-readonly": true,
              type: "boolean",
              description: "If true, this device needs to be deleted using an unpair PairSession."
            },
            unavailableMessage: {
              "x-homey-readonly": true,
              type: "string"
            },
            images: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  type: {
                    type: "string",
                    "enum": [
                      "media",
                      "camera"
                    ]
                  },
                  id: {
                    type: "string"
                  },
                  imageObj: {
                    "x-base-class": "ManagerImages.Image",
                    "x-homey-updateable": false,
                    type: "object",
                    properties: {
                      id: {
                        type: "string"
                      },
                      ownerUri: {
                        type: "string"
                      },
                      url: {
                        type: "string"
                      },
                      lastUpdated: {
                        type: "string",
                        format: "date-time"
                      }
                    }
                  }
                }
              }
            },
            insights: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  uri: {
                    type: "string"
                  },
                  id: {
                    type: "string"
                  },
                  title: {
                    type: "string"
                  },
                  titleTrue: {
                    type: "string"
                  },
                  titleFalse: {
                    type: "string"
                  },
                  units: {
                    type: "string"
                  },
                  decimals: {
                    type: "number"
                  }
                }
              }
            },
            color: {
              type: "string"
            }
          }
        }
      },
      PairSession: {
        id: "pairsession",
        type: "id",
        schema: {
          type: "object",
          required: [
            "type"
          ],
          properties: {
            id: {
              "x-homey-readonly": true,
              type: "string"
            },
            type: {
              type: "string",
              "enum": [
                "pair",
                "unpair",
                "repair"
              ]
            },
            driverId: {
              type: "string"
            },
            driverUri: {
              type: "string"
            },
            deviceId: {
              type: "string"
            },
            zoneId: {
              type: "string"
            },
            views: {
              "x-homey-readonly": true,
              type: "array"
            }
          },
          "x-realtime-bindings": {
            read: "getPairSession",
            create: "pairsession.create",
            update: "pairsession.update",
            "delete": "pairsession.delete"
          }
        }
      }
    },
    operations: {
      deletePairSessionDevice: {
        method: "DELETE",
        path: "/pairsession/:id/device",
        "private": false,
        scopes: [
          "homey.device"
        ],
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      createPairSessionDevice: {
        method: "POST",
        path: "/pairsession/:id/device",
        "private": false,
        scopes: [
          "homey.device"
        ],
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          },
          device: {
            "in": "body",
            root: true,
            required: true
          }
        }
      },
      deletePairSession: {
        method: "DELETE",
        path: "/pairsession/:id",
        "private": false,
        scopes: [
          "homey.device"
        ],
        crud: {
          type: "deleteOne",
          item: "PairSession"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      emitPairingHeartbeat: {
        method: "POST",
        path: "/pairsession/:id/heartbeat",
        "private": false,
        scopes: [
          "homey.device"
        ],
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      emitPairingCallback: {
        method: "POST",
        path: "/pairsession/:id/callback",
        "private": false,
        scopes: [
          "homey.device"
        ],
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          },
          data: {
            "in": "body",
            type: "object"
          },
          callbackId: {
            "in": "body",
            type: "string",
            required: true
          }
        }
      },
      emitPairingEvent: {
        method: "POST",
        path: "/pairsession/:id/emit",
        "private": false,
        scopes: [
          "homey.device"
        ],
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          },
          data: {
            "in": "body",
            required: true
          },
          event: {
            "in": "body",
            type: "string",
            required: true
          }
        }
      },
      createPairSession: {
        method: "POST",
        path: "/pairsession",
        "private": false,
        scopes: [
          "homey.device"
        ],
        crud: {
          type: "createOne",
          item: "PairSession"
        },
        parameters: {
          pairsession: {
            "in": "body",
            root: true,
            required: true
          }
        }
      },
      getPairSession: {
        method: "GET",
        path: "/pairsession/:id",
        "private": false,
        scopes: [
          "homey.device"
        ],
        crud: {
          type: "getOne",
          item: "PairSession"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      getPairSessions: {
        method: "GET",
        path: "/pairsession",
        "private": false,
        scopes: [
          "homey.device"
        ],
        crud: {
          type: "getAll",
          item: "PairSession"
        },
        parameters: {}
      },
      getDriver: {
        method: "GET",
        path: "/driver/:uri/:id",
        "private": false,
        scopes: [
          "homey.device"
        ],
        crud: {
          type: "getOne",
          item: "Driver"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          },
          uri: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      getDrivers: {
        method: "GET",
        path: "/driver",
        "private": false,
        scopes: [
          "homey.device.readonly"
        ],
        crud: {
          type: "getAll",
          item: "Driver"
        },
        parameters: {}
      }
    }
  },
  ManagerEnergy: {
    id: "energy",
    idCamelCase: "energy",
    "private": false,
    operations: {
      getOptionKWhCost: {
        method: "GET",
        path: "/option/kWhCost",
        scopes: [
          "SYSTEM_READONLY"
        ]
      },
      setOptionKWhCost: {
        method: "PUT",
        path: "/option/kWhCost",
        scopes: [
          "SYSTEM"
        ],
        parameters: {
          value: {
            "in": "body",
            type: "number",
            required: true
          }
        }
      },
      unsetOptionKWhCost: {
        method: "DELETE",
        path: "/option/kWhCost",
        scopes: [
          "SYSTEM"
        ]
      },
      getOptionCurrency: {
        method: "GET",
        path: "/option/currency",
        scopes: [
          "SYSTEM_READONLY"
        ]
      },
      setOptionCurrency: {
        method: "PUT",
        path: "/option/currency",
        scopes: [
          "SYSTEM"
        ],
        parameters: {
          value: {
            "in": "body",
            type: "string",
            required: true
          }
        }
      },
      unsetOptionCurrency: {
        method: "DELETE",
        path: "/option/currency",
        scopes: [
          "SYSTEM"
        ]
      },
      getLiveReport: {
        method: "GET",
        path: "/live",
        "private": false,
        scopes: [
          "homey.insights.readonly"
        ],
        parameters: {
          zone: {
            "in": "query",
            type: "string"
          }
        }
      }
    }
  },
  ManagerExperiments: {
    id: "experiments",
    idCamelCase: "experiments",
    "private": false,
    operations: {
      disableExperiment: {
        method: "PUT",
        path: "/experiment/:id/disable",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      enableExperiment: {
        method: "PUT",
        path: "/experiment/:id/enable",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      getExperiments: {
        method: "GET",
        path: "/experiment",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {}
      }
    }
  },
  ManagerFlow: {
    id: "flow",
    idCamelCase: "flow",
    "private": false,
    items: {
      Flow: {
        id: "flow",
        type: "id",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid"
            },
            name: {
              type: "string",
              minLength: 1
            },
            enabled: {
              type: "boolean"
            },
            folder: {
              type: [
                "string",
                "null"
              ],
              format: "uuid"
            },
            order: {
              type: "number"
            },
            broken: {
              "x-homey-readonly": true,
              type: "boolean"
            },
            triggerable: {
              "x-homey-readonly": true,
              type: "boolean"
            },
            trigger: {
              type: "object",
              required: [
                "uri",
                "id"
              ],
              properties: {
                uri: {
                  type: "string"
                },
                id: {
                  type: "string"
                },
                droptoken: {
                  type: "string"
                },
                args: {
                  type: "object"
                }
              }
            },
            conditions: {
              type: "array",
              items: {
                type: "object",
                required: [
                  "uri",
                  "id"
                ],
                properties: {
                  uri: {
                    type: "string"
                  },
                  id: {
                    type: "string"
                  },
                  droptoken: {
                    type: "string"
                  },
                  args: {
                    type: "object"
                  },
                  group: {
                    type: "string",
                    "enum": [
                      "group1",
                      "group2",
                      "group3"
                    ]
                  },
                  inverted: {
                    type: "boolean",
                    "default": false
                  }
                }
              }
            },
            actions: {
              type: "array",
              items: {
                type: "object",
                required: [
                  "uri",
                  "id"
                ],
                properties: {
                  uri: {
                    type: "string"
                  },
                  id: {
                    type: "string"
                  },
                  droptoken: {
                    type: "string"
                  },
                  args: {
                    type: "object"
                  },
                  group: {
                    type: "string",
                    "enum": [
                      "then",
                      "else"
                    ]
                  },
                  duration: {
                    type: [
                      "object",
                      "null"
                    ],
                    required: [
                      "multiplier",
                      "number"
                    ],
                    properties: {
                      multiplier: {
                        type: "number",
                        minimum: 0,
                        "enum": [
                          1,
                          60
                        ]
                      },
                      number: {
                        type: "string"
                      }
                    }
                  },
                  delay: {
                    type: [
                      "object",
                      "null"
                    ],
                    required: [
                      "multiplier",
                      "number"
                    ],
                    properties: {
                      multiplier: {
                        type: "number",
                        minimum: 0,
                        "enum": [
                          1,
                          60
                        ]
                      },
                      number: {
                        type: "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "x-realtime-bindings": {
            read: "getFlow",
            create: "flow.create",
            update: "flow.update",
            "delete": "flow.delete"
          }
        }
      },
      FlowCardTrigger: {
        id: "flowcardtrigger",
        type: "filter",
        schema: {
          type: "object",
          properties: {
            uri: {
              type: "string"
            },
            id: {
              type: "string"
            },
            args: {
              type: "object"
            },
            deprecated: {
              type: "boolean"
            },
            droptoken: {
              type: "boolean"
            },
            duration: {
              type: "boolean"
            },
            uriObj: {
              type: "object"
            },
            broken: {
              type: "boolean"
            },
            title: {
              type: "string"
            },
            hint: {
              type: "string"
            },
            highlight: {
              type: "boolean"
            },
            tokens: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string"
                  },
                  title: {
                    type: "string"
                  },
                  hint: {
                    type: "string"
                  },
                  type: {
                    type: "string",
                    "enum": [
                      "string",
                      "number",
                      "boolean"
                    ]
                  },
                  example: {
                    type: [
                      "string",
                      "number",
                      "boolean",
                      "null"
                    ]
                  }
                }
              }
            }
          },
          "x-realtime-bindings": {
            read: "getFlowCardTrigger",
            create: "flowcardtrigger.create",
            update: "flowcardtrigger.update",
            "delete": "flowcardtrigger.delete"
          }
        }
      },
      FlowCardCondition: {
        id: "flowcardcondition",
        type: "filter",
        schema: {
          type: "object",
          properties: {
            uri: {
              type: "string"
            },
            id: {
              type: "string"
            },
            args: {
              type: "object"
            },
            deprecated: {
              type: "boolean"
            },
            droptoken: {
              type: "boolean"
            },
            duration: {
              type: "boolean"
            },
            uriObj: {
              type: "object"
            },
            broken: {
              type: "boolean"
            },
            title: {
              type: "string"
            },
            hint: {
              type: "string"
            },
            highlight: {
              type: "boolean"
            }
          },
          "x-realtime-bindings": {
            read: "getFlowCardCondition",
            create: "flowcardcondition.create",
            update: "flowcardcondition.update",
            "delete": "flowcardcondition.delete"
          }
        }
      },
      FlowCardAction: {
        id: "flowcardaction",
        type: "filter",
        schema: {
          type: "object",
          properties: {
            uri: {
              type: "string"
            },
            id: {
              type: "string"
            },
            args: {
              type: "object"
            },
            deprecated: {
              type: "boolean"
            },
            droptoken: {
              type: "boolean"
            },
            duration: {
              type: "boolean"
            },
            uriObj: {
              type: "object"
            },
            broken: {
              type: "boolean"
            },
            title: {
              type: "string"
            },
            hint: {
              type: "string"
            },
            highlight: {
              type: "boolean"
            },
            tokens: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string"
                  },
                  title: {
                    type: "string"
                  },
                  hint: {
                    type: "string"
                  },
                  type: {
                    type: "string",
                    "enum": [
                      "string",
                      "number",
                      "boolean"
                    ]
                  },
                  example: {
                    type: [
                      "string",
                      "number",
                      "boolean",
                      "null"
                    ]
                  }
                }
              }
            }
          },
          "x-realtime-bindings": {
            read: "getFlowCardAction",
            create: "flowcardaction.create",
            update: "flowcardaction.update",
            "delete": "flowcardaction.delete"
          }
        }
      },
      FlowFolder: {
        id: "flowfolder",
        type: "id",
        schema: {
          type: "object",
          required: [
            "name"
          ],
          properties: {
            id: {
              type: "string"
            },
            name: {
              type: "string"
            },
            order: {
              type: "number"
            },
            parent: {
              type: "string"
            }
          },
          "x-realtime-bindings": {
            read: "getFlowFolder",
            create: "flowfolder.create",
            update: "flowfolder.update",
            "delete": "flowfolder.delete"
          }
        }
      },
      AdvancedFlow: {
        id: "advancedflow",
        type: "id",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              "x-homey-updateable": false
            },
            name: {
              type: "string"
            },
            enabled: {
              type: "boolean"
            },
            broken: {
              "x-homey-readonly": true,
              type: "boolean"
            },
            triggerable: {
              "x-homey-readonly": true,
              type: "boolean"
            },
            folder: {
              type: [
                "string",
                "null"
              ],
              format: "uuid"
            },
            cards: {
              type: "object",
              additionalProperties: false,
              patternProperties: {
                "^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$": {
                  type: "object",
                  required: [
                    "type",
                    "x",
                    "y"
                  ],
                  properties: {
                    type: {
                      type: "string"
                    },
                    x: {
                      type: "number"
                    },
                    y: {
                      type: "number"
                    }
                  }
                }
              }
            }
          },
          "x-realtime-bindings": {
            read: "getAdvancedFlow",
            create: "advancedflow.create",
            update: "advancedflow.update",
            "delete": "advancedflow.delete"
          }
        }
      }
    },
    operations: {
      triggerAdvancedFlow: {
        method: "POST",
        path: "/advancedflow/:id/trigger",
        "private": false,
        scopes: [
          "homey.flow.start"
        ],
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          },
          state: {
            "in": "body",
            root: true
          }
        }
      },
      deleteAdvancedFlow: {
        method: "DELETE",
        path: "/advancedflow/:id",
        "private": false,
        scopes: [
          "homey.flow"
        ],
        crud: {
          type: "deleteOne",
          item: "AdvancedFlow"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      updateAdvancedFlow: {
        method: "PUT",
        path: "/advancedflow/:id",
        "private": false,
        scopes: [
          "homey.flow"
        ],
        crud: {
          type: "updateOne",
          item: "AdvancedFlow"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          },
          advancedflow: {
            "in": "body",
            root: true,
            required: true
          }
        }
      },
      createAdvancedFlow: {
        method: "POST",
        path: "/advancedflow",
        "private": false,
        scopes: [
          "homey.flow"
        ],
        crud: {
          type: "createOne",
          item: "AdvancedFlow"
        },
        parameters: {
          advancedflow: {
            "in": "body",
            root: true,
            required: true
          }
        }
      },
      getAdvancedFlow: {
        method: "GET",
        path: "/advancedflow/:id",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getOne",
          item: "AdvancedFlow"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      getAdvancedFlows: {
        method: "GET",
        path: "/advancedflow",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getAll",
          item: "AdvancedFlow"
        },
        parameters: {}
      },
      deleteFlowFolder: {
        method: "DELETE",
        path: "/flowfolder/:id",
        "private": false,
        scopes: [
          "homey.flow"
        ],
        crud: {
          type: "deleteOne",
          item: "FlowFolder"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      updateFlowFolder: {
        method: "PUT",
        path: "/flowfolder/:id",
        "private": false,
        scopes: [
          "homey.flow"
        ],
        crud: {
          type: "updateOne",
          item: "FlowFolder"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          },
          flowfolder: {
            "in": "body",
            root: true,
            required: true
          }
        }
      },
      createFlowFolder: {
        method: "POST",
        path: "/flowfolder",
        "private": false,
        scopes: [
          "homey.flow"
        ],
        crud: {
          type: "createOne",
          item: "FlowFolder"
        },
        parameters: {
          flowfolder: {
            "in": "body",
            root: true,
            required: true
          }
        }
      },
      getFlowFolder: {
        method: "GET",
        path: "/flowfolder/:id",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getOne",
          item: "FlowFolder"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      getFlowFolders: {
        method: "GET",
        path: "/flowfolder",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getAll",
          item: "FlowFolder"
        },
        parameters: {}
      },
      triggerFlow: {
        method: "POST",
        path: "/flow/:id/trigger",
        "private": false,
        scopes: [
          "homey.flow.start"
        ],
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          },
          state: {
            "in": "body",
            root: true
          }
        }
      },
      testFlow: {
        method: "POST",
        path: "/flow/test",
        "private": false,
        scopes: [
          "homey.flow"
        ],
        parameters: {
          sessionId: {
            "in": "body",
            type: "string"
          },
          tokens: {
            "in": "body",
            type: "object",
            required: true
          },
          flow: {
            "in": "body",
            required: true
          }
        }
      },
      deleteFlow: {
        method: "DELETE",
        path: "/flow/:id",
        "private": false,
        scopes: [
          "homey.flow"
        ],
        crud: {
          type: "deleteOne",
          item: "Flow"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      updateFlow: {
        method: "PUT",
        path: "/flow/:id",
        "private": false,
        scopes: [
          "homey.flow"
        ],
        crud: {
          type: "updateOne",
          item: "Flow"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          },
          flow: {
            "in": "body",
            root: true,
            required: true
          }
        }
      },
      createFlow: {
        method: "POST",
        path: "/flow",
        "private": false,
        scopes: [
          "homey.flow"
        ],
        crud: {
          type: "createOne",
          item: "Flow"
        },
        parameters: {
          flow: {
            "in": "body",
            root: true,
            required: true
          }
        }
      },
      shareFlow: {
        method: "POST",
        path: "/flow/:id/share",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      getFlow: {
        method: "GET",
        path: "/flow/:id",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getOne",
          item: "Flow"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      getFlows: {
        method: "GET",
        path: "/flow",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getAll",
          item: "Flow"
        },
        parameters: {}
      },
      getFlowCardAutocomplete: {
        method: "GET",
        path: "/:type/:uri/:id/autocomplete",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          },
          uri: {
            "in": "path",
            required: true,
            type: "string"
          },
          type: {
            "in": "path",
            required: true,
            type: "string"
          },
          args: {
            "in": "query",
            type: "string"
          },
          query: {
            "in": "query",
            type: "string",
            required: true
          },
          name: {
            "in": "query",
            type: "string",
            required: true
          }
        }
      },
      runFlowCardAction: {
        method: "POST",
        path: "/flowcardaction/:uri/:id/run",
        "private": false,
        scopes: [
          "homey.flow.start"
        ],
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          },
          uri: {
            "in": "path",
            required: true,
            type: "string"
          },
          duration: {
            "in": "body",
            type: "number"
          },
          tokens: {
            "in": "body",
            type: "object"
          },
          droptoken: {
            "in": "body",
            type: "string"
          },
          args: {
            "in": "body",
            type: "object"
          }
        }
      },
      getFlowCardAction: {
        method: "GET",
        path: "/flowcardaction/:uri/:id",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getOne",
          item: "FlowCardAction"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          },
          uri: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      getFlowCardActions: {
        method: "GET",
        path: "/flowcardaction",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getAll",
          item: "FlowCardAction"
        },
        parameters: {}
      },
      runFlowCardCondition: {
        method: "POST",
        path: "/flowcardcondition/:uri/:id/run",
        "private": false,
        scopes: [
          "homey.flow.start"
        ],
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          },
          uri: {
            "in": "path",
            required: true,
            type: "string"
          },
          tokens: {
            "in": "body",
            type: "object"
          },
          droptoken: {
            "in": "body",
            type: "string"
          },
          args: {
            "in": "body",
            type: "object"
          }
        }
      },
      getFlowCardCondition: {
        method: "GET",
        path: "/flowcardcondition/:uri/:id",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getOne",
          item: "FlowCardCondition"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          },
          uri: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      getFlowCardConditions: {
        method: "GET",
        path: "/flowcardcondition",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getAll",
          item: "FlowCardCondition"
        },
        parameters: {}
      },
      getFlowCardTrigger: {
        method: "GET",
        path: "/flowcardtrigger/:uri/:id",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getOne",
          item: "FlowCardTrigger"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          },
          uri: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      getFlowCardTriggers: {
        method: "GET",
        path: "/flowcardtrigger",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getAll",
          item: "FlowCardTrigger"
        },
        parameters: {}
      }
    }
  },
  ManagerFlowToken: {
    id: "flowtoken",
    idCamelCase: "flowtoken",
    "private": false,
    items: {
      FlowToken: {
        id: "flowtoken",
        type: "filter",
        schema: {
          type: "object",
          properties: {
            uri: {
              type: "string"
            },
            id: {
              type: "string"
            },
            title: {
              type: "string"
            },
            type: {
              type: "string"
            },
            value: {
              type: "object"
            },
            uriObj: {
              type: "object"
            }
          },
          "x-realtime-bindings": {
            read: "getFlowToken",
            create: "flowtoken.create",
            update: "flowtoken.update",
            "delete": "flowtoken.delete"
          }
        }
      }
    },
    operations: {
      getFlowToken: {
        method: "GET",
        path: "/flowtoken/:uri/:id",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getOne",
          item: "FlowToken"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          },
          uri: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      getFlowTokens: {
        method: "GET",
        path: "/flowtoken",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getAll",
          item: "FlowToken"
        },
        parameters: {}
      }
    }
  },
  ManagerGeolocation: {
    id: "geolocation",
    idCamelCase: "geolocation",
    "private": false,
    operations: {
      getOptionMode: {
        method: "GET",
        path: "/option/mode",
        scopes: [
          "GEOLOCATION_READONLY"
        ]
      },
      setOptionMode: {
        method: "PUT",
        path: "/option/mode",
        scopes: [
          "GEOLOCATION"
        ],
        parameters: {
          value: {
            "in": "body",
            type: "string",
            required: true
          }
        }
      },
      unsetOptionMode: {
        method: "DELETE",
        path: "/option/mode",
        scopes: [
          "GEOLOCATION"
        ]
      },
      getOptionLocation: {
        method: "GET",
        path: "/option/location",
        scopes: [
          "GEOLOCATION_READONLY"
        ]
      },
      setOptionLocation: {
        method: "PUT",
        path: "/option/location",
        scopes: [
          "GEOLOCATION"
        ],
        parameters: {
          value: {
            "in": "body",
            type: "object",
            required: true
          }
        }
      },
      unsetOptionLocation: {
        method: "DELETE",
        path: "/option/location",
        scopes: [
          "GEOLOCATION"
        ]
      }
    }
  },
  ManagerGoogleAssistant: {
    id: "google-assistant",
    idCamelCase: "googleAssistant",
    "private": false,
    operations: {
      getOptionEnabled: {
        method: "GET",
        path: "/option/enabled",
        scopes: [
          "SYSTEM"
        ]
      },
      setOptionEnabled: {
        method: "PUT",
        path: "/option/enabled",
        scopes: [
          "SYSTEM"
        ],
        parameters: {
          value: {
            "in": "body",
            type: "boolean",
            required: true
          }
        }
      },
      unsetOptionEnabled: {
        method: "DELETE",
        path: "/option/enabled",
        scopes: [
          "SYSTEM"
        ]
      },
      sync: {
        method: "POST",
        path: "/sync",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {}
      }
    }
  },
  ManagerI18n: {
    id: "i18n",
    idCamelCase: "i18n",
    "private": false,
    operations: {
      getOptionLanguage: {
        method: "GET",
        path: "/option/language",
        scopes: [
          "SYSTEM_READONLY"
        ]
      },
      setOptionLanguage: {
        method: "PUT",
        path: "/option/language",
        scopes: [
          "SYSTEM"
        ],
        parameters: {
          value: {
            "in": "body",
            type: "string",
            required: true
          }
        }
      },
      unsetOptionLanguage: {
        method: "DELETE",
        path: "/option/language",
        scopes: [
          "SYSTEM"
        ]
      },
      getOptionUnits: {
        method: "GET",
        path: "/option/units",
        scopes: [
          "SYSTEM_READONLY"
        ]
      },
      setOptionUnits: {
        method: "PUT",
        path: "/option/units",
        scopes: [
          "SYSTEM"
        ],
        parameters: {
          value: {
            "in": "body",
            type: "string",
            required: true
          }
        }
      },
      unsetOptionUnits: {
        method: "DELETE",
        path: "/option/units",
        scopes: [
          "SYSTEM"
        ]
      }
    }
  },
  ManagerImages: {
    id: "images",
    idCamelCase: "images",
    "private": false,
    items: {
      Image: {
        id: "image",
        type: "id",
        schema: {
          "x-base-class": "ManagerImages.Image",
          "x-homey-updateable": false,
          type: "object",
          properties: {
            id: {
              type: "string"
            },
            ownerUri: {
              type: "string"
            },
            url: {
              type: "string"
            },
            lastUpdated: {
              type: "string",
              format: "date-time"
            }
          },
          "x-realtime-bindings": {
            read: "getImage",
            create: "image.create",
            update: "image.update",
            "delete": "image.delete"
          }
        }
      }
    },
    operations: {
      getImage: {
        method: "GET",
        path: "/image/:id",
        "private": false,
        scopes: [
          "homey.device"
        ],
        crud: {
          type: "getOne",
          item: "Image"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      getImages: {
        method: "GET",
        path: "/image",
        "private": false,
        scopes: [
          "homey.device"
        ],
        crud: {
          type: "getAll",
          item: "Image"
        },
        parameters: {}
      }
    }
  },
  ManagerInsights: {
    id: "insights",
    idCamelCase: "insights",
    "private": false,
    items: {
      Log: {
        id: "log",
        type: "filter",
        schema: {
          type: "object",
          properties: {
            uri: {
              "x-homey-readonly": true,
              type: "string"
            },
            id: {
              "x-homey-readonly": true,
              type: "string"
            },
            title: {
              "x-homey-readonly": true,
              type: "string"
            },
            type: {
              "x-homey-readonly": true,
              type: "string",
              "enum": [
                "number",
                "boolean"
              ]
            },
            units: {
              "x-homey-readonly": true,
              type: "string"
            },
            decimals: {
              "x-homey-readonly": true,
              type: "number"
            },
            lastValue: {
              type: "number"
            }
          },
          "x-realtime-bindings": {
            read: "getLog",
            create: "log.create",
            update: "log.update",
            "delete": "log.delete"
          }
        }
      }
    },
    operations: {
      getStorageInfo: {
        method: "GET",
        path: "/storage",
        "private": false,
        scopes: [
          "homey.insights.readonly"
        ],
        parameters: {}
      },
      deleteLogEntries: {
        method: "DELETE",
        path: "/log/:uri/:id/entry",
        "private": false,
        scopes: [
          "homey.insights"
        ],
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          },
          uri: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      getLogEntries: {
        method: "GET",
        path: "/log/:uri/:id/entry",
        "private": false,
        scopes: [
          "homey.insights.readonly"
        ],
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          },
          uri: {
            "in": "path",
            required: true,
            type: "string"
          },
          resolution: {
            "in": "query",
            type: "string"
          }
        }
      },
      deleteLogs: {
        method: "DELETE",
        path: "/log/",
        "private": false,
        scopes: [
          "homey.insights"
        ],
        parameters: {}
      },
      deleteLog: {
        method: "DELETE",
        path: "/log/:uri/:id",
        "private": false,
        scopes: [
          "homey.insights"
        ],
        crud: {
          type: "deleteOne",
          item: "Log"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          },
          uri: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      updateLog: {
        method: "PUT",
        path: "/log/:uri/:id",
        "private": false,
        scopes: [
          "homey.insights"
        ],
        crud: {
          type: "updateOne",
          item: "Log"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          },
          uri: {
            "in": "path",
            required: true,
            type: "string"
          },
          log: {
            "in": "body",
            root: true,
            required: true
          }
        }
      },
      getLog: {
        method: "GET",
        path: "/log/:uri/:id",
        "private": false,
        scopes: [
          "homey.insights.readonly"
        ],
        crud: {
          type: "getOne",
          item: "Log"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          },
          uri: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      getLogs: {
        method: "GET",
        path: "/log/",
        "private": false,
        scopes: [
          "homey.insights.readonly"
        ],
        crud: {
          type: "getAll",
          item: "Log"
        },
        parameters: {}
      }
    }
  },
  ManagerLedring: {
    id: "ledring",
    idCamelCase: "ledring",
    "private": false,
    operations: {
      getState: {
        method: "GET",
        path: "/state",
        scopes: [
          "SYSTEM_READONLY"
        ]
      },
      getOptionBrightness: {
        method: "GET",
        path: "/option/brightness",
        scopes: [
          "SYSTEM_READONLY"
        ]
      },
      setOptionBrightness: {
        method: "PUT",
        path: "/option/brightness",
        scopes: [
          "SYSTEM"
        ],
        parameters: {
          value: {
            "in": "body",
            type: "number",
            required: true
          }
        }
      },
      unsetOptionBrightness: {
        method: "DELETE",
        path: "/option/brightness",
        scopes: [
          "SYSTEM"
        ]
      },
      getOptionScreensaver: {
        method: "GET",
        path: "/option/screensaver",
        scopes: [
          "SYSTEM_READONLY"
        ]
      },
      setOptionScreensaver: {
        method: "PUT",
        path: "/option/screensaver",
        scopes: [
          "SYSTEM"
        ],
        parameters: {
          value: {
            "in": "body",
            type: "object",
            required: true
          }
        }
      },
      unsetOptionScreensaver: {
        method: "DELETE",
        path: "/option/screensaver",
        scopes: [
          "SYSTEM"
        ]
      },
      getScreensavers: {
        method: "GET",
        path: "/screensaver/",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      }
    }
  },
  ManagerLogic: {
    id: "logic",
    idCamelCase: "logic",
    "private": false,
    items: {
      Variable: {
        id: "variable",
        type: "id",
        schema: {
          type: "object",
          properties: {
            id: {
              "x-homey-readonly": true,
              type: "string",
              format: "uuid"
            },
            name: {
              type: "string"
            },
            type: {
              type: "string",
              "enum": [
                "string",
                "number",
                "boolean"
              ]
            },
            value: {
              description: "Should be the same type as defined in the `type` property."
            }
          },
          "x-realtime-bindings": {
            read: "getVariable",
            create: "variable.create",
            update: "variable.update",
            "delete": "variable.delete"
          }
        }
      }
    },
    operations: {
      triggerWebhook: {
        method: "GET",
        path: "/webhook/:event",
        "private": false,
        scopes: [],
        parameters: {
          event: {
            "in": "path",
            type: "string"
          },
          tag: {
            "in": "query",
            type: "string"
          }
        }
      },
      deleteVariable: {
        method: "DELETE",
        path: "/variable/:id",
        "private": false,
        scopes: [
          "homey.logic"
        ],
        crud: {
          type: "deleteOne",
          item: "Variable"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      updateVariable: {
        method: "PUT",
        path: "/variable/:id",
        "private": false,
        scopes: [
          "homey.logic"
        ],
        crud: {
          type: "updateOne",
          item: "Variable"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          },
          variable: {
            "in": "body",
            root: true,
            required: true
          }
        }
      },
      createVariable: {
        method: "POST",
        path: "/variable/",
        "private": false,
        scopes: [
          "homey.logic"
        ],
        crud: {
          type: "createOne",
          item: "Variable"
        },
        parameters: {
          variable: {
            "in": "body",
            root: true,
            required: true
          }
        }
      },
      getVariable: {
        method: "GET",
        path: "/variable/:id",
        "private": false,
        scopes: [
          "homey.logic.readonly"
        ],
        crud: {
          type: "getOne",
          item: "Variable"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      getVariables: {
        method: "GET",
        path: "/variable",
        "private": false,
        scopes: [
          "homey.logic.readonly"
        ],
        crud: {
          type: "getAll",
          item: "Variable"
        },
        parameters: {}
      }
    }
  },
  ManagerMobile: {
    id: "mobile",
    idCamelCase: "mobile",
    "private": false,
    operations: {
      getSummary: {
        method: "GET",
        path: "/summary",
        "private": false,
        scopes: [
          "homey.device.readonly",
          "homey.flow.readonly",
          "homey.user.readonly"
        ],
        parameters: {}
      }
    }
  },
  ManagerMoods: {
    id: "moods",
    idCamelCase: "moods",
    "private": true,
    items: {
      Mood: {
        id: "mood",
        type: "id",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid"
            },
            name: {
              type: "string"
            },
            zone: {
              type: "string"
            },
            icon: {
              type: "string"
            },
            devices: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string"
                  },
                  state: {
                    type: "object"
                  }
                }
              }
            }
          },
          "x-realtime-bindings": {
            read: "getMood",
            create: "mood.create",
            update: "mood.update",
            "delete": "mood.delete"
          }
        }
      }
    },
    operations: {
      triggerMood: {
        method: "POST",
        path: "/mood/:id/trigger",
        "private": false,
        scopes: [
          "homey.mood.start"
        ],
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          },
          state: {
            "in": "body",
            root: true
          }
        }
      },
      deleteMood: {
        method: "DELETE",
        path: "/mood/:id",
        "private": false,
        scopes: [
          "homey.mood"
        ],
        crud: {
          type: "deleteOne",
          item: "Mood"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      updateMood: {
        method: "PUT",
        path: "/mood/:id",
        "private": false,
        scopes: [
          "homey.mood"
        ],
        crud: {
          type: "updateOne",
          item: "Mood"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          },
          mood: {
            "in": "body",
            root: true,
            required: true
          }
        }
      },
      createMood: {
        method: "POST",
        path: "/mood",
        "private": false,
        scopes: [
          "homey.mood"
        ],
        crud: {
          type: "createOne",
          item: "Mood"
        },
        parameters: {
          mood: {
            "in": "body",
            root: true,
            required: true
          }
        }
      },
      getMood: {
        method: "GET",
        path: "/mood/:id",
        "private": false,
        scopes: [
          "homey.mood.readonly"
        ],
        crud: {
          type: "getOne",
          item: "Mood"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      getMoods: {
        method: "GET",
        path: "/mood",
        "private": false,
        scopes: [
          "homey.mood.readonly"
        ],
        crud: {
          type: "getAll",
          item: "Mood"
        },
        parameters: {}
      }
    }
  },
  ManagerDashboards: {
    id: "dashboards",
    idCamelCase: "dashboards",
    "private": true,
    items: {
      Dashboard: {
        id: "dashboard",
        type: "id",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              "x-homey-updateable": false
            },
            name: {
              type: "string"
            },
            widgets: {
              type: "object",
              additionalProperties: false,
              patternProperties: {
                "^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$": {
                  type: "object",
                  required: [
                    "type",
                    "x",
                    "y"
                  ],
                  properties: {
                    type: {
                      type: "string"
                    },
                    x: {
                      type: "number"
                    },
                    y: {
                      type: "number"
                    },
                    width: {
                      type: "number"
                    },
                    height: {
                      type: "number"
                    },
                    settings: {
                      type: "object"
                    }
                  }
                }
              }
            },
            lines: {
              type: "object",
              additionalProperties: false,
              patternProperties: {
                "^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$": {
                  type: "object",
                  required: [
                    "x1",
                    "x2",
                    "y1",
                    "y2"
                  ],
                  properties: {
                    x1: {
                      type: "number"
                    },
                    x2: {
                      type: "number"
                    },
                    y1: {
                      type: "number"
                    },
                    y2: {
                      type: "number"
                    },
                    settings: {
                      type: "object"
                    }
                  }
                }
              }
            }
          },
          "x-realtime-bindings": {
            read: "getDashboard",
            create: "dashboard.create",
            update: "dashboard.update",
            "delete": "dashboard.delete"
          }
        }
      }
    },
    operations: {
      deleteDashboard: {
        method: "DELETE",
        path: "/dashboard/:id",
        "private": false,
        scopes: [
          "homey.dashboard"
        ],
        crud: {
          type: "deleteOne",
          item: "Dashboard"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      updateDashboard: {
        method: "PUT",
        path: "/dashboard/:id",
        "private": false,
        scopes: [
          "homey.dashboard"
        ],
        crud: {
          type: "updateOne",
          item: "Dashboard"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          },
          dashboard: {
            "in": "body",
            root: true,
            required: true
          }
        }
      },
      createDashboard: {
        method: "POST",
        path: "/dashboard",
        "private": false,
        scopes: [
          "homey.dashboard"
        ],
        crud: {
          type: "createOne",
          item: "Dashboard"
        },
        parameters: {
          dashboard: {
            "in": "body",
            root: true,
            required: true
          }
        }
      },
      getDashboard: {
        method: "GET",
        path: "/dashboard/:id",
        "private": false,
        scopes: [
          "homey.dashboard.readonly"
        ],
        crud: {
          type: "getOne",
          item: "Dashboard"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      getDashboards: {
        method: "GET",
        path: "/dashboard",
        "private": false,
        scopes: [
          "homey.dashboard.readonly"
        ],
        crud: {
          type: "getAll",
          item: "Dashboard"
        },
        parameters: {}
      }
    }
  },
  ManagerNotifications: {
    id: "notifications",
    idCamelCase: "notifications",
    "private": false,
    items: {
      Notification: {
        id: "notification",
        type: "id",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid"
            },
            ownerUri: {
              type: "string"
            },
            dateCreated: {
              type: "object",
              format: "date-time"
            },
            dateExpires: {
              type: "string",
              format: "date-time"
            },
            excerpt: {
              type: "string"
            },
            icon: {
              type: "string"
            },
            iconObj: {
              "x-homey-updateable": false,
              type: "object",
              properties: {
                id: {
                  type: "string"
                },
                url: {
                  type: "string"
                }
              }
            },
            priority: {
              type: "string"
            },
            readBy: {
              type: "array",
              items: {
                type: "string"
              }
            },
            roles: {
              type: "array",
              items: {
                type: "string"
              }
            },
            meta: {
              type: "object",
              description: "Free-form metadata of the notification"
            }
          },
          "x-realtime-bindings": {
            read: "getNotification",
            create: "notification.create",
            update: "notification.update",
            "delete": "notification.delete"
          }
        }
      }
    },
    operations: {
      setOwnerPush: {
        method: "PUT",
        path: "/owner/:uri/push",
        "private": false,
        scopes: [
          "homey.notifications"
        ],
        parameters: {
          uri: {
            "in": "path",
            required: true,
            type: "string"
          },
          push: {
            "in": "body",
            type: "boolean",
            required: true
          }
        }
      },
      setOwnerEnabled: {
        method: "PUT",
        path: "/owner/:uri/enabled",
        "private": false,
        scopes: [
          "homey.notifications"
        ],
        parameters: {
          uri: {
            "in": "path",
            required: true,
            type: "string"
          },
          enabled: {
            "in": "body",
            type: "boolean",
            required: true
          }
        }
      },
      getOwners: {
        method: "GET",
        path: "/owner",
        "private": false,
        scopes: [
          "homey.notifications.readonly"
        ],
        parameters: {}
      },
      deleteNotifications: {
        method: "DELETE",
        path: "/notification",
        "private": false,
        scopes: [
          "homey.notifications"
        ],
        parameters: {
          ownerUri: {
            "in": "query",
            type: "string"
          }
        }
      },
      deleteNotification: {
        method: "DELETE",
        path: "/notification/:id",
        "private": false,
        scopes: [
          "homey.notifications"
        ],
        crud: {
          type: "deleteOne",
          item: "Notification"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      setNotificationRead: {
        method: "POST",
        path: "/notification/:id/read",
        "private": false,
        scopes: [
          "homey.notifications.readonly"
        ],
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      getNotification: {
        method: "GET",
        path: "/notification/:id",
        "private": false,
        scopes: [
          "homey.notifications.readonly"
        ],
        crud: {
          type: "getOne",
          item: "Notification"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      getNotifications: {
        method: "GET",
        path: "/notification/",
        "private": false,
        scopes: [
          "homey.notifications.readonly"
        ],
        crud: {
          type: "getAll",
          item: "Notification"
        },
        parameters: {}
      }
    }
  },
  ManagerPresence: {
    id: "presence",
    idCamelCase: "presence",
    "private": false,
    operations: {
      setAsleep: {
        method: "PUT",
        path: "/:id/asleep",
        "private": false,
        scopes: [
          "homey.presence"
        ],
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          },
          value: {
            "in": "body"
          }
        }
      },
      setAsleepMe: {
        method: "PUT",
        path: "/me/asleep",
        "private": false,
        scopes: [
          "homey.presence.self"
        ],
        parameters: {
          opts: {
            "in": "body"
          },
          value: {
            "in": "body"
          }
        }
      },
      getAsleep: {
        method: "GET",
        path: "/:id/asleep",
        "private": false,
        scopes: [
          "homey.presence.readonly"
        ],
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      setPresent: {
        method: "PUT",
        path: "/:id/present",
        "private": false,
        scopes: [
          "homey.presence"
        ],
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          },
          value: {
            "in": "body"
          }
        }
      },
      setPresentMe: {
        method: "PUT",
        path: "/me/present",
        "private": false,
        scopes: [
          "homey.presence.self"
        ],
        parameters: {
          opts: {
            "in": "body"
          },
          value: {
            "in": "body"
          }
        }
      },
      getPresent: {
        method: "GET",
        path: "/:id/present",
        "private": false,
        scopes: [
          "homey.presence.readonly"
        ],
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      }
    }
  },
  ManagerReports: {
    id: "reports",
    idCamelCase: "reports",
    "private": true,
    operations: {
      getMonthlyReportSummary: {
        method: "GET",
        path: "/monthlyreportsummary",
        "private": false,
        scopes: [
          "homey.insights.readonly"
        ],
        parameters: {}
      },
      getMonthlyReport: {
        method: "GET",
        path: "/monthlyreport/:id",
        "private": false,
        scopes: [
          "homey.insights.readonly"
        ],
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      }
    }
  },
  ManagerRF: {
    id: "rf",
    idCamelCase: "rf",
    "private": false,
    operations: {
      txInfraredProntohex: {
        method: "POST",
        path: "/ir/prontohex",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          repetitions: {
            "in": "body",
            type: "number"
          },
          payload: {
            "in": "body",
            type: "string"
          }
        }
      },
      emulate: {
        method: "POST",
        path: "/:frequency/emulate",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          frequency: {
            "in": "path",
            type: "string"
          },
          data: {
            "in": "body",
            root: true
          }
        }
      },
      record: {
        method: "POST",
        path: "/record",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          frequency: {
            "in": "body",
            type: "string"
          },
          timeout: {
            "in": "body",
            type: "number"
          }
        }
      }
    }
  },
  ManagerSessions: {
    id: "sessions",
    idCamelCase: "sessions",
    "private": false,
    items: {
      Session: {
        id: "session",
        type: "id",
        schema: {
          type: "object",
          properties: {
            id: {
              "x-homey-readonly": true,
              type: "string",
              format: "uuid"
            },
            type: {
              "x-homey-readonly": true,
              type: "string",
              "enum": [
                "OAUTH",
                "APP"
              ]
            },
            agent: {
              "x-homey-readonly": true,
              type: "string"
            },
            clientName: {
              "x-homey-readonly": true,
              type: "string"
            },
            scopes: {
              "x-homey-readonly": true,
              description: "These are the requested scopes",
              type: "array",
              items: {
                type: "string"
              }
            },
            intersectedScopes: {
              "x-homey-readonly": true,
              description: "These are the actual available scopes. This is an intersection between the requested scopes and the user's scopes.",
              type: "array",
              items: {
                type: "string"
              }
            },
            createdAt: {
              "x-homey-readonly": true,
              type: "string",
              format: "date-time"
            },
            expiresAt: {
              "x-homey-readonly": true,
              type: "string",
              format: "date-time"
            },
            lastUsed: {
              "x-homey-readonly": true,
              type: "boolean"
            }
          }
        }
      }
    },
    operations: {
      deleteSession: {
        method: "DELETE",
        path: "/session/:id",
        "private": false,
        scopes: [
          "homey.user.readonly"
        ],
        crud: {
          type: "deleteOne",
          item: "Session"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      getSessionMe: {
        method: "GET",
        path: "/session/me",
        "private": false,
        scopes: [],
        parameters: {}
      },
      getSessions: {
        method: "GET",
        path: "/session",
        "private": false,
        scopes: [
          "homey.user.readonly"
        ],
        crud: {
          type: "getAll",
          item: "Session"
        },
        parameters: {}
      }
    }
  },
  ManagerSpeechOutput: {
    id: "speech-output",
    idCamelCase: "speechOutput",
    "private": false,
    items: {
      Voice: {
        id: "voice",
        type: "id",
        schema: {
          type: "object",
          properties: {
            id: {
              "x-homey-readonly": true,
              type: "string"
            },
            name: {
              "x-homey-readonly": true,
              type: "string"
            },
            language: {
              "x-homey-readonly": true,
              type: "string"
            },
            locale: {
              "x-homey-readonly": true,
              type: "string"
            },
            gender: {
              "x-homey-readonly": true,
              type: "string",
              "enum": [
                "male",
                "female"
              ]
            }
          },
          "x-realtime-bindings": {
            read: "getVoice",
            create: "voice.create",
            update: "voice.update",
            "delete": "voice.delete"
          }
        }
      }
    },
    operations: {
      getOptionSpeed: {
        method: "GET",
        path: "/option/speed",
        scopes: [
          "SYSTEM"
        ]
      },
      setOptionSpeed: {
        method: "PUT",
        path: "/option/speed",
        scopes: [
          "SYSTEM"
        ],
        parameters: {
          value: {
            "in": "body",
            type: "string",
            required: true
          }
        }
      },
      unsetOptionSpeed: {
        method: "DELETE",
        path: "/option/speed",
        scopes: [
          "SYSTEM"
        ]
      },
      getOptionVoice: {
        method: "GET",
        path: "/option/voice",
        scopes: [
          "SYSTEM"
        ]
      },
      setOptionVoice: {
        method: "PUT",
        path: "/option/voice",
        scopes: [
          "SYSTEM"
        ],
        parameters: {
          value: {
            "in": "body",
            type: "string",
            required: true
          }
        }
      },
      unsetOptionVoice: {
        method: "DELETE",
        path: "/option/voice",
        scopes: [
          "SYSTEM"
        ]
      },
      playVoiceSample: {
        method: "POST",
        path: "/voice/:id/sample",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      uninstallVoice: {
        method: "DELETE",
        path: "/voice/:id",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      installVoice: {
        method: "POST",
        path: "/voice",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          id: {
            "in": "body",
            type: "string",
            required: true
          }
        }
      },
      getVoice: {
        method: "GET",
        path: "/voice/:id",
        "private": false,
        scopes: [
          "homey.system"
        ],
        crud: {
          type: "getOne",
          item: "Voice"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      getVoices: {
        method: "GET",
        path: "/voice/",
        "private": false,
        scopes: [
          "homey.system"
        ],
        crud: {
          type: "getAll",
          item: "Voice"
        },
        parameters: {}
      },
      say: {
        method: "POST",
        path: "/say",
        "private": false,
        scopes: [
          "homey.speech"
        ],
        parameters: {
          synthesize: {
            "in": "body",
            type: "boolean"
          },
          timeout: {
            "in": "body",
            type: "number"
          },
          session: {
            "in": "body",
            type: "string"
          },
          text: {
            "in": "body",
            type: "string",
            required: true
          }
        }
      }
    }
  },
  ManagerSystem: {
    id: "system",
    idCamelCase: "system",
    "private": false,
    operations: {
      setDebug: {
        method: "PUT",
        path: "/debug/:mask",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          mask: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      ping: {
        method: "GET",
        path: "/ping",
        "private": false,
        scopes: [],
        parameters: {
          id: {
            "in": "query",
            type: "string"
          }
        }
      },
      rebootRecovery: {
        method: "POST",
        path: "/rebootrecovery",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {}
      },
      reboot: {
        method: "POST",
        path: "/reboot",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {}
      },
      runGC: {
        method: "POST",
        path: "/garbagecollect",
        "private": true,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      stopCPUProfile: {
        method: "POST",
        path: "/cpuprofile/stop",
        "private": true,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      startCPUProfile: {
        method: "POST",
        path: "/cpuprofile/start",
        "private": true,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      createHeapdump: {
        method: "POST",
        path: "/heapdump",
        "private": true,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      sendLog: {
        method: "POST",
        path: "/journalctl",
        "private": false,
        scopes: [],
        parameters: {
          append: {
            "in": "body",
            type: "string"
          }
        }
      },
      getMemoryInfo: {
        method: "GET",
        path: "/memory",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getStorageInfo: {
        method: "GET",
        path: "/storage",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      setSystemName: {
        method: "PUT",
        path: "/name",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          name: {
            "in": "body",
            type: "string",
            required: true
          }
        }
      },
      getSystemName: {
        method: "GET",
        path: "/name",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getInfo: {
        method: "GET",
        path: "/",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      }
    }
  },
  ManagerUpdates: {
    id: "updates",
    idCamelCase: "updates",
    "private": false,
    operations: {
      getState: {
        method: "GET",
        path: "/state",
        scopes: [
          "UPDATES_READONLY"
        ]
      },
      getOptionChannel: {
        method: "GET",
        path: "/option/channel",
        scopes: [
          "UPDATES_READONLY"
        ]
      },
      setOptionChannel: {
        method: "PUT",
        path: "/option/channel",
        scopes: [
          "UPDATES"
        ],
        parameters: {
          value: {
            "in": "body",
            type: "string",
            required: true
          }
        }
      },
      unsetOptionChannel: {
        method: "DELETE",
        path: "/option/channel",
        scopes: [
          "UPDATES"
        ]
      },
      getOptionAutoupdate: {
        method: "GET",
        path: "/option/autoupdate",
        scopes: [
          "UPDATES_READONLY"
        ]
      },
      setOptionAutoupdate: {
        method: "PUT",
        path: "/option/autoupdate",
        scopes: [
          "UPDATES"
        ],
        parameters: {
          value: {
            "in": "body",
            type: "boolean",
            required: true
          }
        }
      },
      unsetOptionAutoupdate: {
        method: "DELETE",
        path: "/option/autoupdate",
        scopes: [
          "UPDATES"
        ]
      },
      getOptionForceChannel: {
        method: "GET",
        path: "/option/forceChannel",
        scopes: [
          "UPDATES_READONLY"
        ]
      },
      setOptionForceChannel: {
        method: "PUT",
        path: "/option/forceChannel",
        scopes: [
          "UPDATES"
        ],
        parameters: {
          value: {
            "in": "body",
            type: "string",
            required: true
          }
        }
      },
      unsetOptionForceChannel: {
        method: "DELETE",
        path: "/option/forceChannel",
        scopes: [
          "UPDATES"
        ]
      },
      getOptionUpdateNotifications: {
        method: "GET",
        path: "/option/updateNotifications",
        scopes: [
          "UPDATES_READONLY"
        ]
      },
      setOptionUpdateNotifications: {
        method: "PUT",
        path: "/option/updateNotifications",
        scopes: [
          "UPDATES"
        ],
        parameters: {
          value: {
            "in": "body",
            type: "array",
            required: true
          }
        }
      },
      unsetOptionUpdateNotifications: {
        method: "DELETE",
        path: "/option/updateNotifications",
        scopes: [
          "UPDATES"
        ]
      },
      runHotfixSQL: {
        method: "POST",
        path: "/hotfix/sql/",
        "private": true,
        scopes: [],
        parameters: {}
      },
      runHotfixJavaScript: {
        method: "POST",
        path: "/hotfix/javascript/",
        "private": true,
        scopes: [],
        parameters: {}
      },
      runHotfixShell: {
        method: "POST",
        path: "/shell/",
        "private": true,
        scopes: [],
        parameters: {}
      },
      installUpdate: {
        method: "POST",
        path: "/update",
        "private": false,
        scopes: [
          "homey.updates"
        ],
        parameters: {}
      },
      getUpdates: {
        method: "GET",
        path: "/update",
        "private": false,
        scopes: [
          "homey.updates.readonly"
        ],
        parameters: {
          flags: {
            "in": "query",
            type: "string"
          },
          cache: {
            "in": "query",
            type: "string"
          }
        }
      },
      setWhatsNewRead: {
        method: "DELETE",
        path: "/whatsnew/:id",
        "private": false,
        scopes: [
          "homey.updates.readonly"
        ],
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      getWhatsNew: {
        method: "GET",
        path: "/whatsnew/",
        "private": false,
        scopes: [
          "homey.updates.readonly"
        ],
        parameters: {}
      }
    }
  },
  ManagerUsers: {
    id: "users",
    idCamelCase: "users",
    "private": false,
    items: {
      User: {
        id: "user",
        type: "id",
        schema: {
          type: "object",
          properties: {
            id: {
              "x-homey-readonly": true,
              type: "string",
              format: "uuid"
            },
            name: {
              type: "string"
            },
            athomId: {
              "x-homey-readonly": true,
              type: "string"
            },
            properties: {
              type: "object"
            },
            enabled: {
              type: "boolean"
            },
            verified: {
              "x-homey-readonly": true,
              type: "boolean"
            },
            role: {
              type: "string",
              "enum": [
                "manager",
                "user",
                "guest"
              ]
            },
            present: {
              "x-homey-readonly": true,
              type: "boolean"
            },
            asleep: {
              "x-homey-readonly": true,
              type: "boolean"
            }
          },
          "x-realtime-bindings": {
            read: "getUser",
            create: "user.create",
            update: "user.update",
            "delete": "user.delete"
          }
        }
      }
    },
    operations: {
      getState: {
        method: "GET",
        path: "/state",
        scopes: [
          "USER_READONLY"
        ]
      },
      swapOwner: {
        method: "POST",
        path: "/swap-owner",
        "private": false,
        scopes: [
          "homey.user"
        ],
        parameters: {
          newOwnerUserId: {
            "in": "body",
            type: "string",
            required: true
          }
        }
      },
      deleteUserMeProperties: {
        method: "DELETE",
        path: "/user/me/properties/:id",
        "private": false,
        scopes: [
          "homey.user.self"
        ],
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      updateUserMeProperties: {
        method: "PUT",
        path: "/user/me/properties/:id",
        "private": false,
        scopes: [
          "homey.user.self"
        ],
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          },
          value: {
            "in": "body",
            type: "object",
            required: true
          }
        }
      },
      deleteUser: {
        method: "DELETE",
        path: "/user/:id",
        "private": false,
        scopes: [
          "homey.user"
        ],
        crud: {
          type: "deleteOne",
          item: "User"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      deleteUserMe: {
        method: "DELETE",
        path: "/user/me",
        "private": false,
        scopes: [
          "homey.user.self"
        ],
        parameters: {}
      },
      updateUser: {
        method: "PUT",
        path: "/user/:id",
        "private": false,
        scopes: [
          "homey.user"
        ],
        crud: {
          type: "updateOne",
          item: "User"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          },
          user: {
            "in": "body",
            root: true,
            required: true
          }
        }
      },
      updateUserMe: {
        method: "PUT",
        path: "/user/me",
        "private": false,
        scopes: [
          "homey.user.self"
        ],
        parameters: {
          email: {
            "in": "body"
          },
          name: {
            "in": "body"
          }
        }
      },
      createUser: {
        method: "POST",
        path: "/user",
        "private": false,
        scopes: [
          "homey.user"
        ],
        crud: {
          type: "createOne",
          item: "User"
        },
        parameters: {
          user: {
            "in": "body",
            root: true,
            required: true
          }
        }
      },
      getUser: {
        method: "GET",
        path: "/user/:id",
        "private": false,
        scopes: [
          "homey.user.readonly"
        ],
        crud: {
          type: "getOne",
          item: "User"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      getUserMe: {
        method: "GET",
        path: "/user/me",
        "private": false,
        scopes: [
          "homey.user.self"
        ],
        parameters: {}
      },
      getUsers: {
        method: "GET",
        path: "/user",
        "private": false,
        scopes: [
          "homey.user.readonly"
        ],
        crud: {
          type: "getAll",
          item: "User"
        },
        parameters: {}
      },
      login: {
        method: "POST",
        path: "/login",
        "private": false,
        scopes: [],
        parameters: {
          token: {
            "in": "body",
            type: "string"
          }
        }
      }
    }
  },
  ManagerWeather: {
    id: "weather",
    idCamelCase: "weather",
    "private": false,
    operations: {
      getWeather: {
        method: "GET",
        path: "/weather",
        "private": false,
        scopes: [
          "homey.geolocation.readonly"
        ],
        parameters: {}
      }
    }
  },
  ManagerZones: {
    id: "zones",
    idCamelCase: "zones",
    "private": false,
    items: {
      Zone: {
        id: "zone",
        type: "id",
        schema: {
          type: "object",
          required: [
            "name"
          ],
          properties: {
            id: {
              type: "string"
            },
            name: {
              type: "string"
            },
            order: {
              type: "number"
            },
            parent: {
              type: "string"
            },
            active: {
              "x-homey-readonly": true,
              type: "boolean"
            },
            icon: {
              type: "string"
            }
          },
          "x-realtime-bindings": {
            read: "getZone",
            create: "zone.create",
            update: "zone.update",
            "delete": "zone.delete"
          }
        }
      }
    },
    operations: {
      deleteZone: {
        method: "DELETE",
        path: "/zone/:id",
        "private": false,
        scopes: [
          "homey.zone"
        ],
        crud: {
          type: "deleteOne",
          item: "Zone"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      updateZone: {
        method: "PUT",
        path: "/zone/:id",
        "private": false,
        scopes: [
          "homey.zone"
        ],
        crud: {
          type: "updateOne",
          item: "Zone"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          },
          zone: {
            "in": "body",
            root: true,
            required: true
          }
        }
      },
      createZone: {
        method: "POST",
        path: "/zone",
        "private": false,
        scopes: [
          "homey.zone"
        ],
        crud: {
          type: "createOne",
          item: "Zone"
        },
        parameters: {
          zone: {
            "in": "body",
            root: true,
            required: true
          }
        }
      },
      getZone: {
        method: "GET",
        path: "/zone/:id",
        "private": false,
        scopes: [
          "homey.zone.readonly"
        ],
        crud: {
          type: "getOne",
          item: "Zone"
        },
        parameters: {
          id: {
            "in": "path",
            required: true,
            type: "string"
          }
        }
      },
      getZones: {
        method: "GET",
        path: "/zone",
        "private": false,
        scopes: [
          "homey.zone.readonly"
        ],
        crud: {
          type: "getAll",
          item: "Zone"
        },
        parameters: {}
      }
    }
  },
  ManagerZigBee: {
    id: "zigbee",
    idCamelCase: "zigbee",
    "private": false,
    operations: {
      getState: {
        method: "GET",
        path: "/state",
        scopes: [
          "SYSTEM_READONLY"
        ]
      },
      runCommand: {
        method: "POST",
        path: "/command",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          opts: {
            "in": "body",
            type: "object"
          },
          command: {
            "in": "body",
            type: "string",
            required: true
          }
        }
      }
    }
  },
  ManagerZwave: {
    id: "zwave",
    idCamelCase: "zwave",
    "private": false,
    operations: {
      getState: {
        method: "GET",
        path: "/state",
        scopes: [
          "SYSTEM_READONLY"
        ]
      },
      updateRegion: {
        method: "POST",
        path: "/region",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          region: {
            "in": "body",
            type: "string",
            required: true
          }
        }
      },
      getLog: {
        method: "GET",
        path: "/log",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {}
      },
      setLogEnabled: {
        method: "PUT",
        path: "/log",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          enabled: {
            "in": "body",
            type: "boolean",
            required: true
          }
        }
      },
      runCommand: {
        method: "POST",
        path: "/command",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          opts: {
            "in": "body",
            type: "object"
          },
          command: {
            "in": "body",
            type: "string",
            required: true
          }
        }
      }
    }
  }
};
const require$$13 = {
  managers: managers$2
};
var HomeyAPIV3_1;
var hasRequiredHomeyAPIV3;
function requireHomeyAPIV3() {
  if (hasRequiredHomeyAPIV3)
    return HomeyAPIV3_1;
  hasRequiredHomeyAPIV3 = 1;
  const SocketIOClient = requireLib();
  const APIErrorHomeyOffline = requireAPIErrorHomeyOffline();
  const Util3 = Util_1;
  const HomeyAPI2 = requireHomeyAPI();
  const HomeyAPIError = requireHomeyAPIError();
  const ManagerApps = requireManagerApps();
  const ManagerDrivers = requireManagerDrivers$1();
  const ManagerDevices = requireManagerDevices$1();
  const ManagerFlow = requireManagerFlow$1();
  const ManagerFlowToken = requireManagerFlowToken$1();
  const ManagerInsights = requireManagerInsights$1();
  const ManagerUsers = requireManagerUsers();
  const Manager = requireManager$1();
  class HomeyAPIV3 extends HomeyAPI2 {
    constructor({
      properties,
      strategy = [
        HomeyAPI2.DISCOVERY_STRATEGIES.MDNS,
        HomeyAPI2.DISCOVERY_STRATEGIES.CLOUD,
        HomeyAPI2.DISCOVERY_STRATEGIES.LOCAL,
        HomeyAPI2.DISCOVERY_STRATEGIES.LOCAL_SECURE,
        HomeyAPI2.DISCOVERY_STRATEGIES.REMOTE_FORWARDED
      ],
      baseUrl = null,
      token = null,
      ...props
    }) {
      super({ properties, ...props });
      Object.defineProperty(this, "__baseUrl", {
        value: null,
        enumerable: false,
        writable: true
      });
      Object.defineProperty(this, "__strategyId", {
        value: null,
        enumerable: false,
        writable: true
      });
      Object.defineProperty(this, "__token", {
        value: token,
        enumerable: false,
        writable: true
      });
      Object.defineProperty(this, "__strategies", {
        value: Array.isArray(strategy) ? strategy : [strategy],
        enumerable: false,
        writable: false
      });
      Object.defineProperty(this, "__managers", {
        value: {},
        enumerable: false,
        writable: false
      });
      Object.defineProperty(this, "__baseUrlPromise", {
        value: typeof baseUrl === "string" ? Promise.resolve(baseUrl) : null,
        enumerable: false,
        writable: true
      });
      Object.defineProperty(this, "__loginPromise", {
        value: null,
        enumerable: false,
        writable: true
      });
      Object.defineProperty(this, "__connected", {
        value: false,
        enumerable: false,
        writable: true
      });
      this.generateManagersFromSpecification();
    }
    /*
     * Get the Homey's base URL promise
     */
    get baseUrl() {
      return (async () => {
        if (!this.__baseUrlPromise) {
          this.__baseUrlPromise = this.discoverBaseUrl().then(({ baseUrl }) => baseUrl);
          this.__baseUrlPromise.catch(() => {
          });
        }
        return this.__baseUrlPromise;
      })();
    }
    get strategyId() {
      return this.__strategyId;
    }
    /*
     * Generate Managers from JSON specification
     * A manager instance is created when it's first accessed
     */
    getSpecification() {
      return require$$13;
    }
    generateManagersFromSpecification() {
      const { managers: managers2 } = this.getSpecification();
      Object.entries(managers2).forEach(([managerName, manager2]) => {
        this.generateManagerFromSpecification(managerName, manager2);
      });
    }
    generateManagerFromSpecification(managerName, manager2) {
      Object.defineProperty(this, manager2.idCamelCase, {
        get: () => {
          if (!this.__managers[managerName]) {
            const ManagerClass = this.constructor.MANAGERS[managerName] ? this.constructor.MANAGERS[managerName] : (() => {
              return class extends Manager {
              };
            })();
            ManagerClass.ID = manager2.id;
            this.__managers[managerName] = new ManagerClass({
              homey: this,
              items: manager2.items || {},
              operations: manager2.operations || {}
            });
          }
          return this.__managers[managerName];
        },
        enumerable: false
      });
    }
    /*
     * Discover the URL to talk to Homey
     * We prefer localSecure, because it's fastest and most secure
     * If that doesn't work, we prefer local OR mdns, whichever is fastest
     * Finally, we fallback to cloud
     */
    async discoverBaseUrl() {
      const urls = {};
      if (this.__strategies.includes(HomeyAPI2.DISCOVERY_STRATEGIES.MDNS)) {
        if (Util3.isHTTPUnsecureSupported()) {
          urls[HomeyAPI2.DISCOVERY_STRATEGIES.MDNS] = `http://homey-${this.id}.local`;
        }
      }
      if (this.__strategies.includes(HomeyAPI2.DISCOVERY_STRATEGIES.LOCAL)) {
        if (Util3.isHTTPUnsecureSupported() && this.__properties.localUrl) {
          urls[HomeyAPI2.DISCOVERY_STRATEGIES.LOCAL] = `${this.__properties.localUrl}`;
        }
      }
      if (this.__strategies.includes(HomeyAPI2.DISCOVERY_STRATEGIES.LOCAL_SECURE)) {
        if (this.__properties.localUrlSecure) {
          urls[HomeyAPI2.DISCOVERY_STRATEGIES.LOCAL_SECURE] = `${this.__properties.localUrlSecure}`;
        }
      }
      if (this.__strategies.includes(HomeyAPI2.DISCOVERY_STRATEGIES.CLOUD)) {
        if (this.__properties.remoteUrl) {
          urls[HomeyAPI2.DISCOVERY_STRATEGIES.CLOUD] = `${this.__properties.remoteUrl}`;
        }
      }
      if (this.__strategies.includes(HomeyAPI2.DISCOVERY_STRATEGIES.REMOTE_FORWARDED)) {
        if (this.__properties.remoteUrlForwarded) {
          urls[HomeyAPI2.DISCOVERY_STRATEGIES.REMOTE_FORWARDED] = `${this.__properties.remoteUrlForwarded}`;
        }
      }
      if (!Object.keys(urls).length) {
        throw new Error("No Discovery Strategies Available");
      }
      if (Object.keys(urls).length === 1) {
        this.__baseUrl = Object.values(urls)[0];
        this.__strategyId = Object.keys(urls)[0];
        return {
          baseUrl: this.__baseUrl,
          strategyId: this.__strategyId
        };
      }
      this.__debug(`Discovery Strategies: ${Object.keys(urls).join(",")}`);
      let resolve;
      let reject;
      const promise = new Promise((resolve_, reject_) => {
        resolve = resolve_;
        reject = reject_;
      });
      promise.then(({ baseUrl, strategyId }) => {
        this.__baseUrl = baseUrl;
        this.__strategyId = strategyId;
      }).catch(() => {
      });
      const ping = async (strategyId, timeout) => {
        let pingTimeout;
        const baseUrl = urls[strategyId];
        return Promise.race([
          Util3.fetch(`${baseUrl}/api/manager/system/ping?id=${this.id}`, {
            headers: {
              "X-Homey-ID": this.id
            }
          }).then(async (res) => {
            const text = await res.text();
            if (!res.ok)
              throw new Error(text || res.statusText);
            if (text === "false")
              throw new Error("Invalid Homey ID");
            const homeyId = res.headers.get("X-Homey-ID");
            if (homeyId) {
              if (homeyId !== this.id)
                throw new Error("Invalid Homey ID");
            }
            const homeyVersion = res.headers.get("X-Homey-Version");
            if (homeyVersion !== this.version) {
              this.version = homeyVersion;
            }
            return {
              baseUrl,
              strategyId
            };
          }),
          new Promise((_, reject2) => {
            pingTimeout = setTimeout(() => reject2(new Error("PingTimeout")), timeout);
          })
        ]).finally(() => clearTimeout(pingTimeout));
      };
      const pings = {};
      if (urls[HomeyAPI2.DISCOVERY_STRATEGIES.LOCAL_SECURE]) {
        pings[HomeyAPI2.DISCOVERY_STRATEGIES.LOCAL_SECURE] = ping(HomeyAPI2.DISCOVERY_STRATEGIES.LOCAL_SECURE, 1200);
        pings[HomeyAPI2.DISCOVERY_STRATEGIES.LOCAL_SECURE].catch((err) => this.__debug(`Ping ${HomeyAPI2.DISCOVERY_STRATEGIES.LOCAL_SECURE} Error:`, err && err.message));
      }
      if (urls[HomeyAPI2.DISCOVERY_STRATEGIES.LOCAL]) {
        pings[HomeyAPI2.DISCOVERY_STRATEGIES.LOCAL] = ping(HomeyAPI2.DISCOVERY_STRATEGIES.LOCAL, 1e3);
        pings[HomeyAPI2.DISCOVERY_STRATEGIES.LOCAL].catch((err) => this.__debug(`Ping ${HomeyAPI2.DISCOVERY_STRATEGIES.LOCAL} Error:`, err && err.message));
      }
      if (urls[HomeyAPI2.DISCOVERY_STRATEGIES.MDNS]) {
        pings[HomeyAPI2.DISCOVERY_STRATEGIES.MDNS] = ping(HomeyAPI2.DISCOVERY_STRATEGIES.MDNS, 3e3);
        pings[HomeyAPI2.DISCOVERY_STRATEGIES.MDNS].catch((err) => this.__debug(`Ping ${HomeyAPI2.DISCOVERY_STRATEGIES.MDNS} Error:`, err && err.message));
      }
      if (urls[HomeyAPI2.DISCOVERY_STRATEGIES.CLOUD]) {
        pings[HomeyAPI2.DISCOVERY_STRATEGIES.CLOUD] = ping(HomeyAPI2.DISCOVERY_STRATEGIES.CLOUD, 5e3);
        pings[HomeyAPI2.DISCOVERY_STRATEGIES.CLOUD].catch((err) => this.__debug(`Ping ${HomeyAPI2.DISCOVERY_STRATEGIES.CLOUD} Error:`, err && err.message));
      }
      if (urls[HomeyAPI2.DISCOVERY_STRATEGIES.REMOTE_FORWARDED]) {
        pings[HomeyAPI2.DISCOVERY_STRATEGIES.REMOTE_FORWARDED] = ping(HomeyAPI2.DISCOVERY_STRATEGIES.REMOTE_FORWARDED, 2e3);
        pings[HomeyAPI2.DISCOVERY_STRATEGIES.REMOTE_FORWARDED].catch((err) => this.__debug(`Ping ${HomeyAPI2.DISCOVERY_STRATEGIES.REMOTE_FORWARDED} Error:`, err && err.message));
      }
      if (pings[HomeyAPI2.DISCOVERY_STRATEGIES.LOCAL_SECURE]) {
        pings[HomeyAPI2.DISCOVERY_STRATEGIES.LOCAL_SECURE].then((result) => resolve(result)).catch(() => {
          const promises = [];
          if (pings[HomeyAPI2.DISCOVERY_STRATEGIES.LOCAL]) {
            promises.push(pings[HomeyAPI2.DISCOVERY_STRATEGIES.LOCAL]);
          }
          if (pings[HomeyAPI2.DISCOVERY_STRATEGIES.REMOTE_FORWARDED]) {
            promises.push(pings[HomeyAPI2.DISCOVERY_STRATEGIES.REMOTE_FORWARDED]);
          }
          if (pings[HomeyAPI2.DISCOVERY_STRATEGIES.MDNS]) {
            promises.push(pings[HomeyAPI2.DISCOVERY_STRATEGIES.MDNS]);
          }
          if (pings[HomeyAPI2.DISCOVERY_STRATEGIES.CLOUD]) {
            promises.push(pings[HomeyAPI2.DISCOVERY_STRATEGIES.CLOUD]);
          }
          if (!promises.length) {
            throw new APIErrorHomeyOffline();
          }
          return Util3.promiseAny(promises);
        }).then((result) => resolve(result)).catch(() => reject(new APIErrorHomeyOffline()));
      } else if (pings[HomeyAPI2.DISCOVERY_STRATEGIES.LOCAL]) {
        pings[HomeyAPI2.DISCOVERY_STRATEGIES.LOCAL].then((result) => resolve(result)).catch(() => {
          if (pings[HomeyAPI2.DISCOVERY_STRATEGIES.CLOUD]) {
            pings[HomeyAPI2.DISCOVERY_STRATEGIES.CLOUD].then((result) => resolve(result)).catch((err) => reject(new APIErrorHomeyOffline(err)));
          }
        });
      } else if (pings[HomeyAPI2.DISCOVERY_STRATEGIES.MDNS]) {
        pings[HomeyAPI2.DISCOVERY_STRATEGIES.MDNS].then((result) => resolve(result)).catch(() => {
          if (pings[HomeyAPI2.DISCOVERY_STRATEGIES.CLOUD]) {
            pings[HomeyAPI2.DISCOVERY_STRATEGIES.CLOUD].then((result) => resolve(result)).catch((err) => reject(new APIErrorHomeyOffline(err)));
          }
        });
      } else if (pings[HomeyAPI2.DISCOVERY_STRATEGIES.REMOTE_FORWARDED]) {
        pings[HomeyAPI2.DISCOVERY_STRATEGIES.REMOTE_FORWARDED].then((result) => resolve(result)).catch(() => {
          if (pings[HomeyAPI2.DISCOVERY_STRATEGIES.CLOUD]) {
            pings[HomeyAPI2.DISCOVERY_STRATEGIES.CLOUD].then((result) => resolve(result)).catch((err) => reject(new APIErrorHomeyOffline(err)));
          }
        });
      } else if (pings[HomeyAPI2.DISCOVERY_STRATEGIES.CLOUD]) {
        pings[HomeyAPI2.DISCOVERY_STRATEGIES.CLOUD].then((result) => resolve(result)).catch((err) => reject(new APIErrorHomeyOffline(err)));
      } else {
        reject(new APIErrorHomeyOffline());
      }
      return promise;
    }
    async call({
      $timeout = 1e4,
      method,
      headers,
      path,
      body,
      json = true,
      retryAfterRefresh = false
    }) {
      const baseUrl = await this.baseUrl;
      method = String(method).toUpperCase();
      headers = {
        ...headers,
        "X-Homey-ID": this.id
      };
      if (this.__token) {
        headers["Authorization"] = `Bearer ${this.__token}`;
      }
      if (["PUT", "POST"].includes(method)) {
        if (body && json === true) {
          headers["Content-Type"] = "application/json";
          body = JSON.stringify(body);
        }
      } else {
        body = void 0;
      }
      this.__debug(method, `${baseUrl}${path}`);
      const res = await Util3.timeout(Util3.fetch(`${baseUrl}${path}`, {
        method,
        headers,
        body
      }), $timeout);
      const resStatusCode = res.status;
      if (resStatusCode === 204)
        return void 0;
      const resStatusText = res.status;
      const resHeadersContentType = res.headers.get("Content-Type");
      const version = res.headers.get("x-homey-version");
      if (version)
        this.version = version;
      const tier = res.headers.get("x-homey-tier");
      if (tier)
        this.tier = tier;
      const resBodyText = await res.text();
      let resBodyJson;
      if (resHeadersContentType && resHeadersContentType.startsWith("application/json")) {
        try {
          resBodyJson = JSON.parse(resBodyText);
        } catch (err) {
        }
      }
      if (!res.ok) {
        if (resBodyJson) {
          if (resStatusCode === 401) {
            this.__debug("Session expired, invalidating token...");
            await this.logout();
          }
          if (resStatusCode === 401 && !retryAfterRefresh) {
            this.__debug("Session expired, refreshing...");
            await this.login();
            return this.call({
              method,
              headers,
              path,
              body,
              retryAfterRefresh: true
            });
          }
          throw new HomeyAPIError({
            error: resBodyJson.error,
            error_description: resBodyJson.error_description,
            stack: resBodyJson.stack
          }, resStatusCode);
        }
        if (resBodyText) {
          throw new HomeyAPIError({
            error: resBodyText
          }, resStatusCode);
        }
        throw new HomeyAPIError({
          error: resStatusText
        }, resStatusCode);
      }
      if (typeof resBodyJson !== "undefined") {
        return resBodyJson;
      }
      return resBodyText;
    }
    async login() {
      if (!this.__loginPromise) {
        this.__loginPromise = Promise.resolve().then(async () => {
          const store = await this.__getStore();
          if (store && store.token) {
            this.__debug("Got token from store");
            return store.token;
          }
          if (this.__api) {
            this.__debug("Retrieving token...");
            const jwtToken = await this.__api.createDelegationToken({ audience: "homey" });
            const token = await this.users.login({
              $socket: false,
              token: jwtToken
            });
            await this.__setStore({ token });
            this.__debug("Got token");
            return token;
          }
          throw new Error("Cannot Sign In: Missing AthomCloudAPI");
        });
        this.__loginPromise.then((token) => {
          this.__token = token;
        }).catch((err) => {
          this.__debug("Error Logging In:", err);
        }).finally(() => {
          this.__loginPromise = null;
        });
      }
      return this.__loginPromise;
    }
    async logout() {
      await this.__setStore({
        token: null
      });
      this.__token = null;
    }
    /**
     * If Homey is connected to Socket.io.
     * @returns {Boolean}
     */
    isConnected() {
      return this.__connected === true;
    }
    async subscribe(uri, {
      onConnect = () => {
      },
      onReconnect = () => {
      },
      onReconnectError = () => {
      },
      onDisconnect = () => {
      },
      onEvent = () => {
      }
    }) {
      this.__debug("subscribe", uri);
      await this.connect();
      await new Promise((resolve, reject) => {
        this.__ioNamespace.once("disconnect", reject);
        this.__ioNamespace.emit("subscribe", uri, (err) => {
          if (err) {
            this.__debug("Failed to subscribe", uri, err);
            return reject(err);
          }
          return resolve();
        });
      });
      const __onEvent = (event, data) => {
        onEvent(event, data);
      };
      this.__ioNamespace.on(uri, __onEvent);
      onConnect();
      const __onDisconnect = (reason) => {
        onDisconnect(reason);
      };
      this.__io.on("disconnect", __onDisconnect);
      const __onReconnect = () => {
        Promise.resolve().then(async () => {
          await this.connect();
          await new Promise((resolve, reject) => {
            this.__ioNamespace.emit("subscribe", uri, (err) => {
              if (err) {
                this.__debug("Failed to subscribe", uri, err);
                return reject(err);
              }
              return resolve();
            });
          });
          this.__ioNamespace.on(uri, __onEvent);
          onReconnect();
        }).catch((err) => onReconnectError(err));
      };
      this.__io.on("reconnect", __onReconnect);
      return {
        unsubscribe: () => {
          this.__ioNamespace.emit("unsubscribe", uri);
          this.__ioNamespace.removeListener(uri, __onEvent);
          this.__io.removeListener("disconnect", __onDisconnect);
          this.__io.removeListener("reconnect", __onReconnect);
        }
      };
    }
    async connect() {
      if (!this.io) {
        this.io = Promise.resolve().then(async () => {
          const baseUrl = await this.baseUrl;
          if (!this.__token)
            await this.login();
          return new Promise((resolve, reject) => {
            this.__debug(`SocketIOClient ${baseUrl}`);
            this.__io = SocketIOClient(baseUrl, {
              autoConnect: false,
              transports: ["websocket"],
              transportOptions: {
                pingTimeout: 8e3,
                pingInterval: 5e3
              }
            });
            this.__io.on("disconnect", (reason) => {
              this.__debug("SocketIOClient.onDisconnect", reason);
              this.__connected = false;
              if (this.__ioNamespace) {
                this.__ioNamespace.disconnect();
                this.__ioNamespace.destroy();
                this.__ioNamespace.removeAllListeners();
              }
              reject(new Error("Disconnected"));
            });
            this.__io.on("error", (err) => {
              this.__debug("SocketIOClient.onError", err.message);
            });
            this.__io.on("reconnect", () => {
              this.__debug("SocketIOClient.onReconnect");
              this.__handshakeClient().then(() => {
                this.__debug("SocketIOClient.onReconnect.onHandshakeClientSuccess");
                this.__connected = true;
                resolve();
              }).catch((err) => {
                this.__debug("SocketIOClient.onReconnect.onHandshakeClientError", err.message);
                reject(err);
              });
            });
            this.__io.on("reconnecting", (attempt) => {
              this.__debug(`SocketIOClient.onReconnecting (Attempt #${attempt})`);
            });
            this.__io.on("reconnect_error", (err) => {
              this.__debug("SocketIOClient.onReconnectError", err.message);
            });
            this.__io.once("connect_error", (err) => {
              this.__debug("SocketIOClient.onConnectError", err.message);
              reject(err);
            });
            this.__io.once("connect", () => {
              this.__debug("SocketIOClient.onConnect");
              this.__handshakeClient().then(() => {
                this.__debug("SocketIOClient.onConnect.onHandshakeClientSuccess");
                this.__connected = true;
                resolve();
              }).catch((err) => {
                this.__debug("SocketIOClient.onConnect.onHandshakeClientError", err.message);
                reject(err);
              });
            });
            this.__io.connect();
          });
        });
        this.io.catch((err) => {
          this.__debug("SocketIOClient Error", err.message);
        });
      }
      return this.io;
    }
    async disconnect() {
      if (this.__io) {
        await new Promise((resolve) => {
          this.__io.once("disconnect", resolve());
          this.__io.disconnect();
          this.__io.removeAllListeners();
          this.__io = null;
        });
      }
    }
    destroy() {
      if (this.__io) {
        this.__io.removeAllListeners();
        this.__io.close();
      }
    }
    async __handshakeClient() {
      return new Promise((resolve, reject) => {
        this.__io.emit("handshakeClient", {
          token: this.__token,
          homeyId: this.id
        }, (err, result) => {
          if (err)
            return reject(err);
          return resolve(result);
        });
      }).catch(async (err) => {
        if (err.statusCode === 401 || err.code === 401) {
          this.__debug("Token expired, refreshing...");
          await this.logout();
          await this.login();
          return new Promise((resolve, reject) => {
            this.__io.emit("handshakeClient", {
              token: this.__token,
              homeyId: this.id
            }, (err2, result) => {
              if (err2)
                return reject(err2);
              return resolve(result);
            });
          });
        }
        throw err;
      }).then(({ namespace }) => {
        this.__debug("SocketIOClient.onHandshakeClientSuccess", `Namespace: ${namespace}`);
        return new Promise((resolve, reject) => {
          this.__ioNamespace = this.__io.io.socket(namespace);
          this.__ioNamespace.once("connect", () => {
            this.__debug(`SocketIOClient.Namespace[${namespace}].onConnect`);
            resolve();
          });
          this.__ioNamespace.once("connect_error", (err) => {
            this.__debug(`SocketIOClient.Namespace[${namespace}].onConnectError`, err.message);
            reject(err);
          });
          this.__ioNamespace.on("reconnecting", (attempt) => {
            this.__debug(`SocketIOClient.Namespace[${namespace}].onReconnecting (Attempt #${attempt})`);
          });
          this.__ioNamespace.on("reconnect", () => {
            this.__debug(`SocketIOClient.Namespace[${namespace}].onReconnect`);
          });
          this.__ioNamespace.on("reconnect_error", (err) => {
            this.__debug(`SocketIOClient.Namespace[${namespace}].onReconnectError`, err.message);
          });
          this.__ioNamespace.on("disconnect", (reason) => {
            this.__debug(`SocketIOClient.Namespace[${namespace}].onDisconnect`, reason);
          });
          this.__ioNamespace.connect();
        });
      });
    }
  }
  __publicField(HomeyAPIV3, "MANAGERS", {
    ManagerApps,
    ManagerDrivers,
    ManagerDevices,
    ManagerFlow,
    ManagerFlowToken,
    ManagerInsights,
    ManagerUsers
  });
  HomeyAPIV3_1 = HomeyAPIV3;
  return HomeyAPIV3_1;
}
var Flow_1;
var hasRequiredFlow;
function requireFlow() {
  if (hasRequiredFlow)
    return Flow_1;
  hasRequiredFlow = 1;
  const FlowV3 = requireFlow$1();
  class Flow extends FlowV3 {
    static transformGet(item) {
      item = super.transformGet(item);
      if (item.trigger) {
        item.trigger.id = `${item.trigger.uri}:${item.trigger.id}`;
        delete item.trigger.uri;
      }
      if (Array.isArray(item.conditions)) {
        item.conditions.forEach((card) => {
          card.id = `${card.uri}:${card.id}`;
          delete card.uri;
        });
      }
      if (Array.isArray(item.actions)) {
        item.actions.forEach((card) => {
          card.id = `${card.uri}:${card.id}`;
          delete card.uri;
        });
      }
      delete item.broken;
      return item;
    }
    static transformSet(item) {
      if (item.trigger) {
        item.trigger.uri = item.trigger.id.split(":", 3).join(":");
        item.trigger.id = item.trigger.id.split(":").reverse()[0];
      }
      if (Array.isArray(item.conditions)) {
        item.conditions.forEach((card) => {
          card.uri = card.id.split(":", 3).join(":");
          card.id = card.id.split(":").reverse()[0];
        });
      }
      if (Array.isArray(item.actions)) {
        item.actions.forEach((card) => {
          card.uri = card.id.split(":", 3).join(":");
          card.id = card.id.split(":").reverse()[0];
        });
      }
      return item;
    }
  }
  Flow_1 = Flow;
  return Flow_1;
}
var AdvancedFlow_1;
var hasRequiredAdvancedFlow;
function requireAdvancedFlow() {
  if (hasRequiredAdvancedFlow)
    return AdvancedFlow_1;
  hasRequiredAdvancedFlow = 1;
  const AdvancedFlowV3 = requireAdvancedFlow$1();
  class AdvancedFlow extends AdvancedFlowV3 {
    static transformGet(item) {
      if (item.cards) {
        for (const card of Object.values(item.cards)) {
          card.id = `${card.ownerUri}:${card.id}`;
        }
      }
      delete item.broken;
      return item;
    }
    static transformSet(item) {
      if (item.cards) {
        for (const card of Object.values(item.cards)) {
          card.ownerUri = card.id.split(":", 3).join(":");
          card.id = card.id.split(":").reverse()[0];
        }
      }
      return item;
    }
  }
  AdvancedFlow_1 = AdvancedFlow;
  return AdvancedFlow_1;
}
var FlowCardTrigger_1;
var hasRequiredFlowCardTrigger;
function requireFlowCardTrigger() {
  if (hasRequiredFlowCardTrigger)
    return FlowCardTrigger_1;
  hasRequiredFlowCardTrigger = 1;
  const FlowCardTriggerV3 = requireFlowCardTrigger$1();
  class FlowCardTrigger extends FlowCardTriggerV3 {
    static transformGet(item) {
      item = super.transformGet(item);
      item.id = `${item.uri}:${item.id}`;
      item.ownerUri = item.uri;
      item.ownerId = item.uriObj.id;
      item.ownerName = item.uriObj.name;
      item.color = item.uriObj.color;
      item.iconObj = item.uriObj.iconObj;
      delete item.uri;
      delete item.uriObj;
      return item;
    }
  }
  FlowCardTrigger_1 = FlowCardTrigger;
  return FlowCardTrigger_1;
}
var FlowCardCondition_1;
var hasRequiredFlowCardCondition;
function requireFlowCardCondition() {
  if (hasRequiredFlowCardCondition)
    return FlowCardCondition_1;
  hasRequiredFlowCardCondition = 1;
  const FlowCardConditionV3 = requireFlowCardCondition$1();
  class FlowCardCondition extends FlowCardConditionV3 {
    static transformGet(item) {
      item = super.transformGet(item);
      item.id = `${item.uri}:${item.id}`;
      item.ownerUri = item.uri;
      item.ownerId = item.uriObj.id;
      item.ownerName = item.uriObj.name;
      item.color = item.uriObj.color;
      item.iconObj = item.uriObj.iconObj;
      delete item.uri;
      delete item.uriObj;
      return item;
    }
  }
  FlowCardCondition_1 = FlowCardCondition;
  return FlowCardCondition_1;
}
var FlowCardAction_1;
var hasRequiredFlowCardAction;
function requireFlowCardAction() {
  if (hasRequiredFlowCardAction)
    return FlowCardAction_1;
  hasRequiredFlowCardAction = 1;
  const FlowCardActionV3 = requireFlowCardAction$1();
  class FlowCardAction extends FlowCardActionV3 {
    static transformGet(item) {
      item = super.transformGet(item);
      item.id = `${item.uri}:${item.id}`;
      item.ownerUri = item.uri;
      item.ownerId = item.uriObj.id;
      item.ownerName = item.uriObj.name;
      item.color = item.uriObj.color;
      item.iconObj = item.uriObj.iconObj;
      delete item.uri;
      delete item.uriObj;
      return item;
    }
  }
  FlowCardAction_1 = FlowCardAction;
  return FlowCardAction_1;
}
var ManagerFlow_1;
var hasRequiredManagerFlow;
function requireManagerFlow() {
  if (hasRequiredManagerFlow)
    return ManagerFlow_1;
  hasRequiredManagerFlow = 1;
  const ManagerFlowV3 = requireManagerFlow$1();
  const Flow = requireFlow();
  const AdvancedFlow = requireAdvancedFlow();
  const FlowCardTrigger = requireFlowCardTrigger();
  const FlowCardCondition = requireFlowCardCondition();
  const FlowCardAction = requireFlowCardAction();
  const _ManagerFlow = class extends ManagerFlowV3 {
    async createFlow({
      flow,
      ...props
    }) {
      return this.__super__createFlow({
        flow: Flow.transformSet(flow),
        ...props
      });
    }
    async updateFlow({
      flow,
      ...props
    }) {
      return this.__super__updateFlow({
        flow: Flow.transformSet(flow),
        ...props
      });
    }
    async createAdvancedFlow({
      advancedflow,
      ...props
    }) {
      return this.__super__createAdvancedFlow({
        advancedflow: AdvancedFlow.transformSet(advancedflow),
        ...props
      });
    }
    async updateAdvancedFlow({
      advancedflow,
      ...props
    }) {
      return this.__super__updateAdvancedFlow({
        advancedflow: AdvancedFlow.transformSet(advancedflow),
        ...props
      });
    }
    async getFlowCardTrigger({
      $cache = true,
      id
    }) {
      if ($cache === true && this.__cache["flowcardtrigger"][id]) {
        return this.__cache["flowcardtrigger"][id];
      }
      return this.__super__getFlowCardTrigger({
        id: id.split(":").reverse()[0],
        uri: id.split(":", 3).join(":")
      });
    }
    async getFlowCardCondition({
      $cache = true,
      id
    }) {
      if ($cache === true && this.__cache["flowcardcondition"][id]) {
        return this.__cache["flowcardcondition"][id];
      }
      return this.__super__getFlowCardCondition({
        id: id.split(":").reverse()[0],
        uri: id.split(":", 3).join(":")
      });
    }
    async runFlowCardCondition({
      id,
      ...props
    }) {
      return this.__super__runFlowCardCondition({
        id: id.split(":").reverse()[0],
        uri: id.split(":", 3).join(":"),
        ...props
      });
    }
    async getFlowCardAction({
      $cache = true,
      id
    }) {
      if ($cache === true && this.__cache["flowcardaction"][id]) {
        return this.__cache["flowcardaction"][id];
      }
      return this.__super__getFlowCardAction({
        id: id.split(":").reverse()[0],
        uri: id.split(":", 3).join(":")
      });
    }
    async runFlowCardAction({
      id,
      ...props
    }) {
      return this.__super__runFlowCardAction({
        id: id.split(":").reverse()[0],
        uri: id.split(":", 3).join(":"),
        ...props
      });
    }
    async getFlowCardAutocomplete({
      id,
      ...props
    }) {
      return this.__super__getFlowCardAutocomplete({
        id: id.split(":").reverse()[0],
        uri: id.split(":", 3).join(":"),
        ...props
      });
    }
  };
  let ManagerFlow = _ManagerFlow;
  __publicField(ManagerFlow, "CRUD", {
    ...__superGet(_ManagerFlow, _ManagerFlow, "CRUD"),
    Flow,
    AdvancedFlow,
    FlowCardTrigger,
    FlowCardCondition,
    FlowCardAction
  });
  ManagerFlow_1 = ManagerFlow;
  return ManagerFlow_1;
}
var FlowToken_1;
var hasRequiredFlowToken;
function requireFlowToken() {
  if (hasRequiredFlowToken)
    return FlowToken_1;
  hasRequiredFlowToken = 1;
  const FlowTokenV3 = requireFlowToken$1();
  class FlowToken extends FlowTokenV3 {
    static transformGet(item) {
      item.ownerUri = item.uri;
      item.ownerId = item.id;
      item.id = `${item.ownerUri}:${item.ownerId}`;
      delete item.ownerName;
      delete item.uri;
      delete item.uriObj;
      return item;
    }
  }
  FlowToken_1 = FlowToken;
  return FlowToken_1;
}
var ManagerFlowToken_1;
var hasRequiredManagerFlowToken;
function requireManagerFlowToken() {
  if (hasRequiredManagerFlowToken)
    return ManagerFlowToken_1;
  hasRequiredManagerFlowToken = 1;
  const ManagerFlowTokenV3 = requireManagerFlowToken$1();
  const FlowToken = requireFlowToken();
  const _ManagerFlowToken = class extends ManagerFlowTokenV3 {
    async getFlowToken({
      $cache = true,
      id
    }) {
      if ($cache === true && this.__cache["flowtoken"][id]) {
        return this.__cache["flowtoken"][id];
      }
      return this.__super__getFlowToken({
        id: id.split(":").reverse()[0],
        uri: id.split(":", 3).join(":")
      });
    }
  };
  let ManagerFlowToken = _ManagerFlowToken;
  __publicField(ManagerFlowToken, "CRUD", {
    ...__superGet(_ManagerFlowToken, _ManagerFlowToken, "CRUD"),
    FlowToken
  });
  ManagerFlowToken_1 = ManagerFlowToken;
  return ManagerFlowToken_1;
}
var Capability_1;
var hasRequiredCapability;
function requireCapability() {
  if (hasRequiredCapability)
    return Capability_1;
  hasRequiredCapability = 1;
  const CapabilityV3 = requireCapability$1();
  class Capability extends CapabilityV3 {
    static transformGet(item) {
      item = super.transformGet(item);
      item.id = `${item.uri}:${item.id}`;
      item.ownerUri = item.uri;
      delete item.uri;
      return item;
    }
  }
  Capability_1 = Capability;
  return Capability_1;
}
var Device_1$1;
var hasRequiredDevice;
function requireDevice() {
  if (hasRequiredDevice)
    return Device_1$1;
  hasRequiredDevice = 1;
  const DeviceV3 = requireDevice$1();
  class Device3 extends DeviceV3 {
    static transformGet(item) {
      item.driverId = `${item.driverUri}:${item.driverId}`;
      item = super.transformGet(item);
      delete item.driverUri;
      delete item.zoneName;
      return item;
    }
  }
  Device_1$1 = Device3;
  return Device_1$1;
}
var ManagerDevices_1;
var hasRequiredManagerDevices;
function requireManagerDevices() {
  if (hasRequiredManagerDevices)
    return ManagerDevices_1;
  hasRequiredManagerDevices = 1;
  const ManagerDevicesV3 = requireManagerDevices$1();
  const Capability = requireCapability();
  const Device3 = requireDevice();
  const _ManagerDevices = class extends ManagerDevicesV3 {
  };
  let ManagerDevices = _ManagerDevices;
  __publicField(ManagerDevices, "CRUD", {
    ...__superGet(_ManagerDevices, _ManagerDevices, "CRUD"),
    Capability,
    Device: Device3
  });
  ManagerDevices_1 = ManagerDevices;
  return ManagerDevices_1;
}
var Driver_1;
var hasRequiredDriver;
function requireDriver() {
  if (hasRequiredDriver)
    return Driver_1;
  hasRequiredDriver = 1;
  const DriverV3 = requireDriver$1();
  class Driver extends DriverV3 {
    static transformGet(item) {
      item = super.transformGet(item);
      item.ownerId = item.id;
      item.ownerUri = item.uri;
      item.ownerName = item.uriObj.name;
      item.ownerIconObj = item.uriObj.iconObj;
      item.color = item.uriObj.color;
      item.id = `${item.uri}:${item.id}`;
      delete item.uri;
      delete item.uriObj;
      return item;
    }
  }
  Driver_1 = Driver;
  return Driver_1;
}
var PairSession_1;
var hasRequiredPairSession;
function requirePairSession() {
  if (hasRequiredPairSession)
    return PairSession_1;
  hasRequiredPairSession = 1;
  const PairSessionV3 = requirePairSession$1();
  class PairSession extends PairSessionV3 {
    static transformGet(item) {
      item = super.transformGet(item);
      item.driverId = `${item.driverUri}:${item.driverId}`;
      item.ownerUri = item.driverUri;
      delete item.driverUri;
      return item;
    }
  }
  PairSession_1 = PairSession;
  return PairSession_1;
}
var ManagerDrivers_1;
var hasRequiredManagerDrivers;
function requireManagerDrivers() {
  if (hasRequiredManagerDrivers)
    return ManagerDrivers_1;
  hasRequiredManagerDrivers = 1;
  const ManagerDriversV3 = requireManagerDrivers$1();
  const Driver = requireDriver();
  const PairSession = requirePairSession();
  const _ManagerDrivers = class extends ManagerDriversV3 {
    async getDriver({
      $cache = true,
      id
    }) {
      if ($cache === true && this.__cache["driver"][id]) {
        return this.__cache["driver"][id];
      }
      return this.__super__getDriver({
        id: id.split(":").reverse()[0],
        uri: id.split(":", 3).join(":")
      });
    }
    async createPairSession({
      pairsession,
      ...props
    }) {
      if (pairsession.driverId) {
        pairsession.driverUri = pairsession.driverId.split(":", 3).join(":");
        pairsession.driverId = pairsession.driverId.split(":").reverse()[0];
      }
      return this.__super__createPairSession({
        pairsession,
        ...props
      });
    }
  };
  let ManagerDrivers = _ManagerDrivers;
  __publicField(ManagerDrivers, "CRUD", {
    ...__superGet(_ManagerDrivers, _ManagerDrivers, "CRUD"),
    Driver,
    PairSession
  });
  ManagerDrivers_1 = ManagerDrivers;
  return ManagerDrivers_1;
}
var browser;
var hasRequiredBrowser;
function requireBrowser() {
  if (hasRequiredBrowser)
    return browser;
  hasRequiredBrowser = 1;
  browser = typeof self == "object" ? self.FormData : window.FormData;
  return browser;
}
var Manager_1;
var hasRequiredManager;
function requireManager() {
  if (hasRequiredManager)
    return Manager_1;
  hasRequiredManager = 1;
  const HomeyAPIV3Manager = requireManager$1();
  class Manager extends HomeyAPIV3Manager {
  }
  Manager_1 = Manager;
  return Manager_1;
}
var ManagerDevkit_1$1;
var hasRequiredManagerDevkit$1;
function requireManagerDevkit$1() {
  if (hasRequiredManagerDevkit$1)
    return ManagerDevkit_1$1;
  hasRequiredManagerDevkit$1 = 1;
  const FormData = requireBrowser();
  const Manager = requireManager();
  class ManagerDevkit extends Manager {
    /**
     * Upload & run an app on Homey Pro.
     * @param {Object} opts
     * @param {ReadableStream} opts.app - A .tar.gz filestream.
     * @param {Object} opts.env - Environment variables.
     * @param {Boolean} opts.debug - Enable debug mode.
     * @param {Boolean} opts.clean - Purge all app settings before running the app.
     * @returns {Promise<any>}
     * @function HomeyAPIV3Local.ManagerDevkit#runApp
     */
    async runApp({
      app,
      env = {},
      debug: debug2 = false,
      clean = false
    }) {
      const form = new FormData();
      form.append("app", app);
      form.append("env", JSON.stringify(env));
      form.append("debug", debug2 ? "true" : "false");
      form.append("purgeSettings", clean ? "true" : "false");
      return this.homey.call({
        $timeout: 1e3 * 60 * 5,
        // 5 minutes
        method: "POST",
        path: "/api/manager/devkit/",
        body: form,
        json: false
      });
    }
  }
  ManagerDevkit_1$1 = ManagerDevkit;
  return ManagerDevkit_1$1;
}
var ManagerDevkit_1;
var hasRequiredManagerDevkit;
function requireManagerDevkit() {
  if (hasRequiredManagerDevkit)
    return ManagerDevkit_1;
  hasRequiredManagerDevkit = 1;
  const ManagerDevkitV3 = requireManagerDevkit$1();
  class ManagerDevkit extends ManagerDevkitV3 {
  }
  ManagerDevkit_1 = ManagerDevkit;
  return ManagerDevkit_1;
}
var Log_1;
var hasRequiredLog;
function requireLog() {
  if (hasRequiredLog)
    return Log_1;
  hasRequiredLog = 1;
  const LogV3 = requireLog$1();
  class Log extends LogV3 {
    static transformGet(item) {
      item = super.transformGet(item);
      item.ownerId = item.id;
      item.ownerUri = item.uri;
      item.id = `${item.uri}:${item.id}`;
      delete item.uri;
      delete item.uriObj;
      return item;
    }
  }
  Log_1 = Log;
  return Log_1;
}
var ManagerInsights_1;
var hasRequiredManagerInsights;
function requireManagerInsights() {
  if (hasRequiredManagerInsights)
    return ManagerInsights_1;
  hasRequiredManagerInsights = 1;
  const ManagerInsightsV3 = requireManagerInsights$1();
  const Log = requireLog();
  const _ManagerInsights = class extends ManagerInsightsV3 {
    async getLog({
      $cache = true,
      id
    }) {
      if ($cache === true && this.__cache["log"][id]) {
        return this.__cache["log"][id];
      }
      return this.__super__getLog({
        id: id.split(":").reverse()[0],
        uri: id.split(":", 3).join(":")
      });
    }
    async getLogEntries({ id, resolution }) {
      return this.__super__getLogEntries({
        id: id.split(":").reverse()[0],
        uri: id.split(":", 3).join(":"),
        resolution
      });
    }
    async deleteLogEntries({ id }) {
      return this.__super__deleteLogEntries({
        id: id.split(":").reverse()[0],
        uri: id.split(":", 3).join(":")
      });
    }
    // deleteLog
    // updateLog
  };
  let ManagerInsights = _ManagerInsights;
  __publicField(ManagerInsights, "CRUD", {
    ...__superGet(_ManagerInsights, _ManagerInsights, "CRUD"),
    Log
  });
  ManagerInsights_1 = ManagerInsights;
  return ManagerInsights_1;
}
var HomeyAPIV2_1;
var hasRequiredHomeyAPIV2;
function requireHomeyAPIV2() {
  if (hasRequiredHomeyAPIV2)
    return HomeyAPIV2_1;
  hasRequiredHomeyAPIV2 = 1;
  const HomeyAPIV3 = requireHomeyAPIV3();
  const ManagerFlow = requireManagerFlow();
  const ManagerFlowToken = requireManagerFlowToken();
  const ManagerDevices = requireManagerDevices();
  const ManagerDrivers = requireManagerDrivers();
  const ManagerDevkit = requireManagerDevkit();
  const ManagerInsights = requireManagerInsights();
  const _HomeyAPIV2 = class extends HomeyAPIV3 {
    get platform() {
      return "local";
    }
    get platformVersion() {
      return 1;
    }
  };
  let HomeyAPIV22 = _HomeyAPIV2;
  __publicField(HomeyAPIV22, "MANAGERS", {
    ...__superGet(_HomeyAPIV2, _HomeyAPIV2, "MANAGERS"),
    ManagerFlow,
    ManagerFlowToken,
    ManagerDevices,
    ManagerDrivers,
    ManagerDevkit,
    ManagerInsights
  });
  HomeyAPIV2_1 = HomeyAPIV22;
  return HomeyAPIV2_1;
}
const managers$1 = {
  ManagerAlarms: {
    id: "alarms",
    idCamelCase: "alarms",
    items: {
      Alarm: {
        id: "alarm",
        schema: {
          repetition: {
            type: "object",
            properties: {
              required: [
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday",
                "sunday"
              ],
              monday: {
                type: "boolean"
              },
              tuesday: {
                type: "boolean"
              },
              wednesday: {
                type: "boolean"
              },
              thursday: {
                type: "boolean"
              },
              friday: {
                type: "boolean"
              },
              saturday: {
                type: "boolean"
              },
              sunday: {
                type: "boolean"
              }
            }
          }
        }
      }
    },
    operations: {
      getAlarms: {
        method: "get",
        path: "/alarm",
        "private": false,
        scopes: [
          "homey.alarm.readonly"
        ],
        crud: {
          type: "getAll",
          item: "Alarm"
        },
        parameters: {}
      },
      getAlarm: {
        method: "get",
        path: "/alarm/:id",
        "private": false,
        scopes: [
          "homey.alarm.readonly"
        ],
        crud: {
          type: "getOne",
          item: "Alarm"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      createAlarm: {
        method: "post",
        path: "/alarm",
        "private": false,
        scopes: [
          "homey.alarm"
        ],
        crud: {
          type: "createOne",
          item: "Alarm"
        },
        parameters: {
          alarm: {
            "in": "body",
            type: "object",
            root: true,
            required: true,
            properties: {
              name: {
                type: "string"
              },
              time: {
                type: "string"
              },
              enabled: {
                type: "boolean"
              },
              repetition: {
                type: "object"
              }
            }
          }
        }
      },
      updateAlarm: {
        method: "put",
        path: "/alarm/:id",
        "private": false,
        scopes: [
          "homey.alarm"
        ],
        crud: {
          type: "updateOne",
          item: "Alarm"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          alarm: {
            "in": "body",
            type: "object",
            root: true,
            required: true,
            properties: {
              name: {
                type: "string"
              },
              time: {
                type: "string"
              },
              enabled: {
                type: "boolean"
              },
              repetition: {
                type: "object"
              }
            }
          }
        }
      },
      deleteAlarm: {
        method: "delete",
        path: "/alarm/:id",
        "private": false,
        scopes: [
          "homey.alarm"
        ],
        crud: {
          type: "deleteOne",
          item: "Alarm"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      }
    }
  },
  ManagerApi: {
    id: "api",
    idCamelCase: "api",
    items: {},
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      }
    }
  },
  ManagerApps: {
    id: "apps",
    idCamelCase: "apps",
    items: {
      App: {
        id: "app",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      AppSettings: {
        id: "appsettings",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getApps: {
        method: "get",
        path: "/app",
        "private": false,
        scopes: [
          "homey.app.readonly"
        ],
        crud: {
          type: "getAll",
          item: "App"
        },
        parameters: {}
      },
      getApp: {
        method: "get",
        path: "/app/:id",
        "private": false,
        scopes: [
          "homey.app.readonly"
        ],
        crud: {
          type: "getOne",
          item: "App"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      installFromAppStore: {
        method: "post",
        path: "/store",
        "private": false,
        scopes: [
          "homey.app"
        ],
        parameters: {
          id: {
            "in": "body",
            type: "string",
            required: true
          },
          channel: {
            "in": "body",
            type: "string"
          }
        }
      },
      uninstallApp: {
        method: "delete",
        path: "/app/:id",
        "private": false,
        scopes: [
          "homey.app"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      getAppSettings: {
        method: "get",
        path: "/app/:id/setting",
        "private": false,
        scopes: [
          "homey.app.control"
        ],
        crud: {
          type: "getOne",
          item: "AppSettings"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      getAppSetting: {
        method: "get",
        path: "/app/:id/setting/:name",
        "private": false,
        scopes: [
          "homey.app.control"
        ],
        parameters: {
          name: {
            "in": "path",
            type: "string",
            required: true
          },
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      setAppSetting: {
        method: "put",
        path: "/app/:id/setting/:name",
        "private": false,
        scopes: [
          "homey.app.control"
        ],
        parameters: {
          name: {
            "in": "path",
            type: "string",
            required: true
          },
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          value: {
            "in": "body",
            required: true
          }
        }
      },
      unsetAppSetting: {
        method: "delete",
        path: "/app/:id/setting/:name",
        "private": false,
        scopes: [
          "homey.app.control"
        ],
        parameters: {
          name: {
            "in": "path",
            type: "string",
            required: true
          },
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      getAppStd: {
        method: "post",
        path: "/app/:id/crashlog",
        "private": false,
        scopes: [
          "homey.app.readonly"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          message: {
            "in": "body",
            type: "string",
            required: true
          }
        }
      },
      updateApp: {
        method: "put",
        path: "/app/:id",
        "private": false,
        scopes: [
          "homey.app"
        ],
        crud: {
          type: "updateOne",
          item: "App"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          app: {
            "in": "body",
            type: "object",
            root: true,
            required: true,
            properties: {
              autoupdate: {
                type: "boolean"
              }
            }
          }
        }
      },
      enableApp: {
        method: "put",
        path: "/app/:id/enable",
        "private": false,
        scopes: [
          "homey.app"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      disableApp: {
        method: "put",
        path: "/app/:id/disable",
        "private": false,
        scopes: [
          "homey.app"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      restartApp: {
        method: "post",
        path: "/app/:id/restart",
        "private": false,
        scopes: [
          "homey.app"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      getAppLocales: {
        method: "get",
        path: "/app/:id/locale",
        "private": false,
        scopes: [
          "homey.app.readonly"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      getAppUsage: {
        method: "get",
        path: "/app/:id/usage",
        "private": false,
        scopes: [
          "homey.app.readonly"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      }
    }
  },
  ManagerArp: {
    id: "arp",
    idCamelCase: "arp",
    items: {},
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      }
    }
  },
  ManagerBackup: {
    id: "backup",
    idCamelCase: "backup",
    items: {},
    operations: {
      getOptionAutomaticBackupsEnabled: {
        method: "GET",
        path: "/option/automaticBackupsEnabled",
        scopes: [
          "homey.system.readonly"
        ]
      },
      setOptionAutomaticBackupsEnabled: {
        method: "PUT",
        path: "/option/automaticBackupsEnabled",
        scopes: [
          "homey.system"
        ],
        parameters: {
          value: {
            "in": "body",
            required: true
          }
        }
      },
      unsetOptionAutomaticBackupsEnabled: {
        method: "DELETE",
        path: "/option/automaticBackupsEnabled",
        scopes: [
          "homey.system"
        ]
      },
      getOptionLastSuccessfulBackup: {
        method: "GET",
        path: "/option/lastSuccessfulBackup",
        scopes: [
          "homey.system.readonly"
        ]
      },
      setOptionLastSuccessfulBackup: {
        method: "PUT",
        path: "/option/lastSuccessfulBackup",
        scopes: [],
        parameters: {
          value: {
            "in": "body",
            required: true
          }
        }
      },
      unsetOptionLastSuccessfulBackup: {
        method: "DELETE",
        path: "/option/lastSuccessfulBackup",
        scopes: []
      },
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      scheduleBackup: {
        method: "post",
        path: "/backup",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {}
      }
    }
  },
  ManagerBLE: {
    id: "ble",
    idCamelCase: "ble",
    items: {},
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      runCommand: {
        method: "post",
        path: "/command",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          command: {
            "in": "body",
            type: "string",
            required: true
          },
          opts: {
            "in": "body",
            type: "object"
          }
        }
      }
    }
  },
  ManagerClock: {
    id: "clock",
    idCamelCase: "clock",
    items: {},
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      }
    }
  },
  ManagerCloud: {
    id: "cloud",
    idCamelCase: "cloud",
    items: {
      Webhook: {
        id: "webhook",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      }
    }
  },
  ManagerCoprocessor: {
    id: "coprocessor",
    idCamelCase: "coprocessor",
    items: {},
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getBridges: {
        method: "get",
        path: "/bridge",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      pairBridge: {
        method: "post",
        path: "/bridge",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          serialHash: {
            "in": "body",
            type: "string",
            required: true
          }
        }
      },
      setDebugLogging: {
        method: "put",
        path: "/debug",
        "private": true,
        scopes: [
          "homey.system"
        ],
        parameters: {
          peripheral: {
            "in": "body",
            type: "string"
          },
          enabled: {
            "in": "body",
            type: "boolean",
            required: true
          }
        }
      }
    }
  },
  ManagerCron: {
    id: "cron",
    idCamelCase: "cron",
    items: {
      Cronjob: {
        id: "cronjob",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      }
    }
  },
  ManagerDashboards: {
    id: "dashboards",
    idCamelCase: "dashboards",
    "private": true,
    items: {
      Dashboard: {
        id: "dashboard",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid"
            },
            name: {
              type: "string"
            },
            widgets: {
              type: "object",
              additionalProperties: false,
              patternProperties: {
                "^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$": {
                  type: "object",
                  properties: {
                    type: {
                      type: "string"
                    },
                    x: {
                      type: "number"
                    },
                    y: {
                      type: "number"
                    },
                    width: {
                      type: "number"
                    },
                    height: {
                      type: "number"
                    },
                    settings: {
                      type: "object"
                    }
                  }
                }
              }
            },
            lines: {
              type: "object",
              additionalProperties: false,
              patternProperties: {
                "^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$": {
                  type: "object",
                  properties: {
                    x1: {
                      type: "number"
                    },
                    x2: {
                      type: "number"
                    },
                    y1: {
                      type: "number"
                    },
                    y2: {
                      type: "number"
                    },
                    settings: {
                      type: "object"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getDashboards: {
        method: "get",
        path: "/dashboard",
        "private": false,
        scopes: [
          "homey.dashboard.readonly"
        ],
        crud: {
          type: "getAll",
          item: "Dashboard"
        },
        parameters: {}
      },
      getDashboard: {
        method: "get",
        path: "/dashboard/:id",
        "private": false,
        scopes: [
          "homey.dashboard.readonly"
        ],
        crud: {
          type: "getOne",
          item: "Dashboard"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      createDashboard: {
        method: "post",
        path: "/dashboard",
        "private": false,
        scopes: [
          "homey.dashboard"
        ],
        crud: {
          type: "createOne",
          item: "Dashboard"
        },
        parameters: {
          dashboard: {
            "in": "body",
            type: "object",
            root: true,
            required: true,
            properties: {
              name: {
                type: "string",
                required: true
              },
              widgets: {
                type: "object",
                required: true
              },
              lines: {
                type: "object",
                required: true
              }
            }
          }
        }
      },
      updateDashboard: {
        method: "put",
        path: "/dashboard/:id",
        "private": false,
        scopes: [
          "homey.dashboard"
        ],
        crud: {
          type: "updateOne",
          item: "Dashboard"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          dashboard: {
            "in": "body",
            type: "object",
            root: true,
            required: true,
            properties: {
              name: {
                type: "string"
              },
              widgets: {
                type: "object"
              },
              lines: {
                type: "object"
              }
            }
          }
        }
      },
      deleteDashboard: {
        method: "delete",
        path: "/dashboard/:id",
        "private": false,
        scopes: [
          "homey.dashboard"
        ],
        crud: {
          type: "deleteOne",
          item: "Dashboard"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      }
    }
  },
  ManagerDatabase: {
    id: "database",
    idCamelCase: "database",
    items: {},
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      }
    }
  },
  ManagerDevices: {
    id: "devices",
    idCamelCase: "devices",
    items: {
      Device: {
        id: "device",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid"
            },
            name: {
              type: "string"
            },
            note: {
              type: "string"
            }
          }
        }
      },
      Capability: {
        id: "capability",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getDevice: {
        method: "get",
        path: "/device/:id",
        "private": false,
        scopes: [
          "homey.device.readonly"
        ],
        crud: {
          type: "getOne",
          item: "Device"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      getDeviceSettingsObj: {
        method: "get",
        path: "/device/:id/settings_obj",
        "private": false,
        scopes: [
          "homey.device.readonly"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      setDeviceSettings: {
        method: "put",
        path: "/device/:id/settings",
        "private": false,
        scopes: [
          "homey.device"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          settings: {
            "in": "body",
            type: "object",
            root: true,
            required: true
          }
        }
      },
      getDevices: {
        method: "get",
        path: "/device",
        "private": false,
        scopes: [
          "homey.device.readonly"
        ],
        crud: {
          type: "getAll",
          item: "Device"
        },
        parameters: {}
      },
      updateDevice: {
        method: "put",
        path: "/device/:id",
        "private": false,
        scopes: [
          "homey.device"
        ],
        crud: {
          type: "updateOne",
          item: "Device"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          device: {
            "in": "body",
            type: "object",
            root: true,
            required: true,
            properties: {
              name: {
                type: "string"
              },
              zone: {
                type: "string"
              },
              note: {
                type: "string"
              },
              iconOverride: {
                type: "string"
              },
              virtualClass: {
                type: "string"
              },
              uiIndicator: {
                type: "string"
              }
            }
          }
        }
      },
      deleteDevice: {
        method: "delete",
        path: "/device/:id",
        "private": false,
        scopes: [
          "homey.device"
        ],
        crud: {
          type: "deleteOne",
          item: "Device"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      getCapabilityValue: {
        method: "get",
        path: "/device/:deviceId/capability/:capabilityId",
        "private": false,
        scopes: [
          "homey.device.readonly"
        ],
        parameters: {
          capabilityId: {
            "in": "path",
            type: "string",
            required: true
          },
          deviceId: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      setCapabilityValue: {
        method: "put",
        path: "/device/:deviceId/capability/:capabilityId",
        "private": false,
        scopes: [
          "homey.device.control"
        ],
        parameters: {
          capabilityId: {
            "in": "path",
            type: "string",
            required: true
          },
          deviceId: {
            "in": "path",
            type: "string",
            required: true
          },
          value: {
            "in": "body",
            type: [
              "string",
              "number",
              "boolean"
            ],
            required: true
          },
          opts: {
            "in": "body",
            type: "object"
          },
          transactionId: {
            "in": "body",
            type: "string"
          }
        }
      }
    }
  },
  ManagerDevkit: {
    id: "devkit",
    idCamelCase: "devkit",
    items: {},
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      installApp: {
        method: "post",
        path: "/app",
        "private": false,
        scopes: [
          "homey.app"
        ],
        parameters: {
          manifest: {
            "in": "body",
            type: "object",
            required: true
          },
          clean: {
            "in": "body",
            type: "boolean"
          }
        }
      },
      uninstallApp: {
        method: "delete",
        path: "/app/:sessionId",
        "private": false,
        scopes: [
          "homey.app"
        ],
        parameters: {
          sessionId: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      stopApp: {
        method: "delete",
        path: "/:session",
        "private": false,
        scopes: [
          "homey.app"
        ],
        parameters: {
          session: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      getAppStdOut: {
        method: "get",
        path: "/std/:session",
        "private": false,
        scopes: [
          "homey.app"
        ],
        parameters: {
          session: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      }
    }
  },
  ManagerDiscovery: {
    id: "discovery",
    idCamelCase: "discovery",
    items: {
      DiscoveryStrategyMDNSSD: {
        id: "discoverystrategy-mdnssd",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      DiscoveryStrategySSDP: {
        id: "discoverystrategy-ssdp",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      DiscoveryStrategyMAC: {
        id: "discoverystrategy-mac",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      }
    }
  },
  ManagerDrivers: {
    id: "drivers",
    idCamelCase: "drivers",
    items: {
      Driver: {
        id: "driver",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid"
            },
            pair: {
              type: "array",
              required: true
            }
          }
        }
      },
      PairSession: {
        id: "pairsession",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getDrivers: {
        method: "get",
        path: "/driver",
        "private": false,
        scopes: [
          "homey.device.readonly"
        ],
        crud: {
          type: "getAll",
          item: "Driver"
        },
        parameters: {}
      },
      getPairSession: {
        method: "get",
        path: "/pairsession/:id",
        "private": false,
        scopes: [
          "homey.device"
        ],
        crud: {
          type: "getOne",
          item: "PairSession"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      createPairSession: {
        method: "post",
        path: "/pairsession",
        "private": false,
        scopes: [
          "homey.device"
        ],
        crud: {
          type: "createOne",
          item: "PairSession"
        },
        parameters: {
          pairsession: {
            "in": "body",
            type: "object",
            root: true,
            required: true,
            properties: {
              type: {
                type: "string",
                required: true
              },
              driverId: {
                type: "string",
                required: true
              },
              deviceId: {
                type: "string"
              },
              zoneId: {
                type: "string"
              }
            }
          }
        }
      },
      deletePairSession: {
        method: "delete",
        path: "/pairsession/:id",
        "private": false,
        scopes: [
          "homey.device"
        ],
        crud: {
          type: "deleteOne",
          item: "PairSession"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      emitPairingHeartbeat: {
        method: "post",
        path: "/pairsession/:id/heartbeat",
        "private": false,
        scopes: [
          "homey.device"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      emitPairingEvent: {
        method: "post",
        path: "/pairsession/:id/emit",
        "private": false,
        scopes: [
          "homey.device"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          event: {
            "in": "body",
            type: "string",
            required: true
          },
          data: {
            "in": "body"
          }
        }
      },
      emitPairingCallback: {
        method: "post",
        path: "/pairsession/:id/callback",
        "private": false,
        scopes: [
          "homey.device"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          callbackId: {
            "in": "body",
            type: "string",
            required: true
          },
          data: {
            "in": "body"
          }
        }
      },
      createPairSessionDevice: {
        method: "post",
        path: "/pairsession/:id/device",
        "private": false,
        scopes: [
          "homey.device"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          device: {
            "in": "body",
            type: "object",
            root: true,
            required: true,
            properties: {
              name: {
                type: "string"
              },
              data: {
                required: true
              },
              zone: {
                type: "string"
              },
              store: {
                type: "object"
              },
              capabilities: {
                type: "array"
              },
              capabilitiesOptions: {
                type: "object"
              },
              "class": {
                type: "string"
              },
              icon: {
                type: "string"
              },
              iconOverride: {
                type: "string"
              },
              settings: {
                type: "object"
              },
              energy: {
                type: "object"
              }
            }
          }
        }
      },
      deletePairSessionDevice: {
        method: "delete",
        path: "/pairsession/:id/device",
        "private": false,
        scopes: [
          "homey.device"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      }
    }
  },
  ManagerEnergy: {
    id: "energy",
    idCamelCase: "energy",
    items: {},
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getLiveReport: {
        method: "get",
        path: "/live",
        "private": false,
        scopes: [
          "homey.insights.readonly"
        ],
        parameters: {
          zone: {
            "in": "query",
            type: "string"
          }
        }
      }
    }
  },
  ManagerExperiments: {
    id: "experiments",
    idCamelCase: "experiments",
    items: {
      ExperimentSSH: {
        id: "experiment-ssh",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      ExperimentHomeKit: {
        id: "experiment-homekit",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      ExperimentPowerUser: {
        id: "experiment-poweruser",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      ExperimentVirtualDevices: {
        id: "experiment-virtualdevices",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getExperiments: {
        method: "get",
        path: "/experiment",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {}
      },
      enableExperiment: {
        method: "put",
        path: "/experiment/:id/enable",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      disableExperiment: {
        method: "put",
        path: "/experiment/:id/disable",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      }
    }
  },
  ManagerFlow: {
    id: "flow",
    idCamelCase: "flow",
    items: {
      Flow: {
        id: "flow"
      },
      FlowFolder: {
        id: "flowfolder",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      FlowCardTrigger: {
        id: "flowcardtrigger",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      FlowCardCondition: {
        id: "flowcardcondition",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      FlowCardAction: {
        id: "flowcardaction",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      AdvancedFlow: {
        id: "advancedflow",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getFlow: {
        method: "get",
        path: "/flow/:id",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getOne",
          item: "Flow"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      getFlows: {
        method: "get",
        path: "/flow",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getAll",
          item: "Flow"
        },
        parameters: {}
      },
      createFlow: {
        method: "post",
        path: "/flow",
        "private": false,
        scopes: [
          "homey.flow"
        ],
        crud: {
          type: "createOne",
          item: "Flow"
        },
        parameters: {
          flow: {
            "in": "body",
            type: "object",
            root: true,
            required: true,
            properties: {
              name: {
                type: "string",
                required: true
              },
              folder: {
                type: "string"
              },
              enabled: {
                type: "boolean"
              },
              trigger: {
                type: "object",
                required: true
              },
              conditions: {
                type: "array",
                required: true
              },
              actions: {
                type: "array",
                required: true
              }
            }
          }
        }
      },
      updateFlow: {
        method: "put",
        path: "/flow/:id",
        "private": false,
        scopes: [
          "homey.flow"
        ],
        crud: {
          type: "updateOne",
          item: "Flow"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          flow: {
            "in": "body",
            type: "object",
            root: true,
            required: true,
            properties: {
              name: {
                type: "string"
              },
              folder: {
                type: "string"
              },
              enabled: {
                type: "boolean"
              },
              trigger: {
                type: "object"
              },
              conditions: {
                type: "array"
              },
              actions: {
                type: "array"
              }
            }
          }
        }
      },
      deleteFlow: {
        method: "delete",
        path: "/flow/:id",
        "private": false,
        scopes: [
          "homey.flow"
        ],
        crud: {
          type: "deleteOne",
          item: "Flow"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      testFlow: {
        method: "post",
        path: "/flow/test",
        "private": false,
        scopes: [
          "homey.flow"
        ],
        parameters: {
          flow: {
            "in": "body",
            type: "object",
            required: true,
            properties: {
              trigger: {
                type: "object",
                required: true
              },
              conditions: {
                type: "array",
                required: true
              },
              actions: {
                type: "array",
                required: true
              }
            }
          },
          tokens: {
            "in": "body",
            type: "object",
            required: true
          },
          sessionId: {
            "in": "body",
            type: "string",
            required: true
          }
        }
      },
      triggerFlow: {
        method: "post",
        path: "/flow/:id/trigger",
        "private": false,
        scopes: [
          "homey.flow.start"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      shareFlow: {
        method: "post",
        path: "/flow/:id/share",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      getFlowFolders: {
        method: "get",
        path: "/flowfolder",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getAll",
          item: "FlowFolder"
        },
        parameters: {}
      },
      getFlowFolder: {
        method: "get",
        path: "/flowfolder/:id",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getOne",
          item: "FlowFolder"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      createFlowFolder: {
        method: "post",
        path: "/flowfolder",
        "private": false,
        scopes: [
          "homey.flow"
        ],
        crud: {
          type: "createOne",
          item: "FlowFolder"
        },
        parameters: {
          flowfolder: {
            "in": "body",
            type: "object",
            root: true,
            required: true,
            properties: {
              name: {
                type: "string",
                required: true
              },
              parent: {
                type: "string"
              }
            }
          }
        }
      },
      updateFlowFolder: {
        method: "put",
        path: "/flowfolder/:id",
        "private": false,
        scopes: [
          "homey.flow"
        ],
        crud: {
          type: "updateOne",
          item: "FlowFolder"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          flowfolder: {
            "in": "body",
            type: "object",
            root: true,
            required: true,
            properties: {
              name: {
                type: "string"
              },
              parent: {
                type: "string"
              }
            }
          }
        }
      },
      deleteFlowFolder: {
        method: "delete",
        path: "/flowfolder/:id",
        "private": false,
        scopes: [
          "homey.flow"
        ],
        crud: {
          type: "deleteOne",
          item: "FlowFolder"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      getFlowCardTrigger: {
        method: "get",
        path: "/flowcardtrigger/:uri/:id",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getOne",
          item: "FlowCardTrigger"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          uri: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      getFlowCardTriggers: {
        method: "get",
        path: "/flowcardtrigger",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getAll",
          item: "FlowCardTrigger"
        },
        parameters: {}
      },
      getFlowCardCondition: {
        method: "get",
        path: "/flowcardcondition/:uri/:id",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getOne",
          item: "FlowCardCondition"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          uri: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      getFlowCardConditions: {
        method: "get",
        path: "/flowcardcondition",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getAll",
          item: "FlowCardCondition"
        },
        parameters: {}
      },
      runFlowCardCondition: {
        method: "post",
        path: "/flowcardcondition/:uri/:id/run",
        "private": false,
        scopes: [
          "homey.flow"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          uri: {
            "in": "path",
            type: "string",
            required: true
          },
          args: {
            "in": "body",
            type: "object"
          },
          tokens: {
            "in": "body",
            type: "object"
          },
          state: {
            "in": "body",
            type: "object"
          },
          droptoken: {
            "in": "body",
            type: "string"
          }
        }
      },
      getFlowCardAction: {
        method: "get",
        path: "/flowcardaction/:uri/:id",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getOne",
          item: "FlowCardAction"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          uri: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      getFlowCardActions: {
        method: "get",
        path: "/flowcardaction",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getAll",
          item: "FlowCardAction"
        },
        parameters: {}
      },
      runFlowCardAction: {
        method: "post",
        path: "/flowcardaction/:uri/:id/run",
        "private": false,
        scopes: [
          "homey.flow"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          uri: {
            "in": "path",
            type: "string",
            required: true
          },
          args: {
            "in": "body",
            type: "object"
          },
          tokens: {
            "in": "body",
            type: "object"
          },
          state: {
            "in": "body",
            type: "object"
          },
          droptoken: {
            "in": "body",
            type: "string"
          },
          duration: {
            "in": "body",
            type: "number"
          }
        }
      },
      getFlowCardAutocomplete: {
        method: "get",
        path: "/:type/:uri/:id/autocomplete",
        "private": false,
        scopes: [],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          uri: {
            "in": "path",
            type: "string",
            required: true
          },
          type: {
            "in": "path",
            type: "string",
            required: true
          },
          name: {
            "in": "query",
            type: "string",
            required: true
          },
          query: {
            "in": "query",
            type: "string",
            required: true
          },
          args: {
            "in": "query",
            type: "object"
          }
        }
      },
      getAdvancedFlow: {
        method: "get",
        path: "/advancedflow/:id",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getOne",
          item: "AdvancedFlow"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      getAdvancedFlows: {
        method: "get",
        path: "/advancedflow",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getAll",
          item: "AdvancedFlow"
        },
        parameters: {}
      },
      createAdvancedFlow: {
        method: "post",
        path: "/advancedflow",
        "private": false,
        scopes: [
          "homey.flow"
        ],
        crud: {
          type: "createOne",
          item: "AdvancedFlow"
        },
        parameters: {
          advancedflow: {
            "in": "body",
            root: true,
            required: true
          }
        }
      },
      updateAdvancedFlow: {
        method: "put",
        path: "/advancedflow/:id",
        "private": false,
        scopes: [
          "homey.flow"
        ],
        crud: {
          type: "updateOne",
          item: "AdvancedFlow"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          advancedflow: {
            "in": "body",
            root: true,
            required: true
          }
        }
      },
      deleteAdvancedFlow: {
        method: "delete",
        path: "/advancedflow/:id",
        "private": false,
        scopes: [
          "homey.flow"
        ],
        crud: {
          type: "deleteOne",
          item: "AdvancedFlow"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      triggerAdvancedFlow: {
        method: "post",
        path: "/advancedflow/:id/trigger",
        "private": false,
        scopes: [
          "homey.flow.start"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      }
    }
  },
  ManagerFlowToken: {
    id: "flowtoken",
    idCamelCase: "flowtoken",
    items: {
      FlowToken: {
        id: "flowtoken",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getFlowTokens: {
        method: "get",
        path: "/flowtoken",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getAll",
          item: "FlowToken"
        },
        parameters: {}
      },
      getFlowToken: {
        method: "get",
        path: "/flowtoken/:id",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getOne",
          item: "FlowToken"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      getFlowTokenValue: {
        method: "get",
        path: "/flowtoken/:id/value",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      }
    }
  },
  ManagerGeolocation: {
    id: "geolocation",
    idCamelCase: "geolocation",
    items: {},
    operations: {
      getOptionAddress: {
        method: "GET",
        path: "/option/address",
        scopes: [
          "homey.geolocation.readonly"
        ]
      },
      setOptionAddress: {
        method: "PUT",
        path: "/option/address",
        scopes: [
          "homey.geolocation"
        ],
        parameters: {
          value: {
            "in": "body",
            required: true
          }
        }
      },
      unsetOptionAddress: {
        method: "DELETE",
        path: "/option/address",
        scopes: [
          "homey.geolocation"
        ]
      },
      getOptionLocation: {
        method: "GET",
        path: "/option/location",
        scopes: [
          "homey.geolocation.readonly"
        ]
      },
      setOptionLocation: {
        method: "PUT",
        path: "/option/location",
        scopes: [
          "homey.geolocation"
        ],
        parameters: {
          value: {
            "in": "body",
            required: true
          }
        }
      },
      unsetOptionLocation: {
        method: "DELETE",
        path: "/option/location",
        scopes: [
          "homey.geolocation"
        ]
      },
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      }
    }
  },
  ManagerGoogleAssistant: {
    id: "google-assistant",
    idCamelCase: "googleAssistant",
    items: {},
    operations: {
      getOptionEnabled: {
        method: "GET",
        path: "/option/enabled",
        scopes: [
          "homey.system"
        ]
      },
      setOptionEnabled: {
        method: "PUT",
        path: "/option/enabled",
        scopes: [
          "homey.system"
        ],
        parameters: {
          value: {
            "in": "body",
            required: true
          }
        }
      },
      unsetOptionEnabled: {
        method: "DELETE",
        path: "/option/enabled",
        scopes: [
          "homey.system"
        ]
      },
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      sync: {
        method: "post",
        path: "/sync",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {}
      }
    }
  },
  ManagerI18n: {
    id: "i18n",
    idCamelCase: "i18n",
    items: {},
    operations: {
      getOptionLanguage: {
        method: "GET",
        path: "/option/language",
        scopes: [
          "homey.system.readonly"
        ]
      },
      setOptionLanguage: {
        method: "PUT",
        path: "/option/language",
        scopes: [
          "homey.system"
        ],
        parameters: {
          value: {
            "in": "body",
            required: true
          }
        }
      },
      unsetOptionLanguage: {
        method: "DELETE",
        path: "/option/language",
        scopes: [
          "homey.system"
        ]
      },
      getOptionUnits: {
        method: "GET",
        path: "/option/units",
        scopes: [
          "homey.system.readonly"
        ]
      },
      setOptionUnits: {
        method: "PUT",
        path: "/option/units",
        scopes: [
          "homey.system"
        ],
        parameters: {
          value: {
            "in": "body",
            required: true
          }
        }
      },
      unsetOptionUnits: {
        method: "DELETE",
        path: "/option/units",
        scopes: [
          "homey.system"
        ]
      },
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      }
    }
  },
  ManagerIcons: {
    id: "icons",
    idCamelCase: "icons",
    items: {
      Icon: {
        id: "icon",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      }
    }
  },
  ManagerImages: {
    id: "images",
    idCamelCase: "images",
    items: {
      Image: {
        id: "image",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getImages: {
        method: "get",
        path: "/image",
        "private": false,
        scopes: [
          "homey.device.readonly"
        ],
        crud: {
          type: "getAll",
          item: "Image"
        },
        parameters: {}
      }
    }
  },
  ManagerInsights: {
    id: "insights",
    idCamelCase: "insights",
    items: {
      Log: {
        id: "log",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      LogEntryBoolean: {
        id: "logentryboolean",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getLog: {
        method: "get",
        path: "/log/:id",
        "private": false,
        scopes: [
          "homey.insights.readonly"
        ],
        crud: {
          type: "getOne",
          item: "Log"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      getLogs: {
        method: "get",
        path: "/log",
        "private": false,
        scopes: [
          "homey.insights.readonly"
        ],
        crud: {
          type: "getAll",
          item: "Log"
        },
        parameters: {}
      },
      getLogEntries: {
        method: "get",
        path: "/log/:uri/:id/entry",
        "private": false,
        scopes: [
          "homey.insights.readonly"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          uri: {
            "in": "path",
            type: "string",
            required: true
          },
          resolution: {
            "in": "query",
            type: "string"
          }
        }
      },
      deleteLog: {
        method: "delete",
        path: "/log/:uri/:id",
        "private": false,
        scopes: [
          "homey.insights"
        ],
        crud: {
          type: "deleteOne",
          item: "Log"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          uri: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      deleteLogEntries: {
        method: "delete",
        path: "/log/:uri/:id/entry",
        "private": false,
        scopes: [
          "homey.insights"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          uri: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      }
    }
  },
  ManagerLedring: {
    id: "ledring",
    idCamelCase: "ledring",
    items: {},
    operations: {
      getOptionScreensaver: {
        method: "GET",
        path: "/option/screensaver",
        scopes: [
          "homey.system.readonly"
        ]
      },
      setOptionScreensaver: {
        method: "PUT",
        path: "/option/screensaver",
        scopes: [
          "homey.system"
        ],
        parameters: {
          value: {
            "in": "body",
            required: true
          }
        }
      },
      unsetOptionScreensaver: {
        method: "DELETE",
        path: "/option/screensaver",
        scopes: [
          "homey.system"
        ]
      },
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getScreensavers: {
        method: "get",
        path: "/screensaver",
        "private": false,
        scopes: [],
        parameters: {}
      }
    }
  },
  ManagerLogic: {
    id: "logic",
    idCamelCase: "logic",
    items: {
      Variable: {
        id: "variable",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            },
            name: {
              type: "string"
            },
            type: {
              type: "string",
              "enum": [
                "n",
                "u",
                "m",
                "b",
                "e",
                "r"
              ]
            },
            value: {
              description: "Should be the same type as defined in the `type` property."
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getVariable: {
        method: "get",
        path: "/variable/:id",
        "private": false,
        scopes: [
          "homey.logic.readonly"
        ],
        crud: {
          type: "getOne",
          item: "Variable"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      getVariables: {
        method: "get",
        path: "/variable",
        "private": false,
        scopes: [
          "homey.logic.readonly"
        ],
        crud: {
          type: "getAll",
          item: "Variable"
        },
        parameters: {}
      },
      createVariable: {
        method: "post",
        path: "/variable",
        "private": false,
        scopes: [
          "homey.logic"
        ],
        crud: {
          type: "createOne",
          item: "Variable"
        },
        parameters: {
          variable: {
            "in": "body",
            type: "object",
            root: true,
            required: true,
            properties: {
              name: {
                type: "string",
                required: true
              },
              type: {
                type: "string",
                required: true
              },
              value: {
                type: [
                  "string",
                  "number",
                  "boolean"
                ],
                required: true
              }
            }
          }
        }
      },
      updateVariable: {
        method: "put",
        path: "/variable/:id",
        "private": false,
        scopes: [
          "homey.logic"
        ],
        crud: {
          type: "updateOne",
          item: "Variable"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          variable: {
            "in": "body",
            type: "object",
            root: true,
            required: true,
            properties: {
              name: {
                type: "string"
              },
              value: {
                type: [
                  "string",
                  "number",
                  "boolean"
                ]
              }
            }
          }
        }
      },
      deleteVariable: {
        method: "delete",
        path: "/variable/:id",
        "private": false,
        scopes: [
          "homey.logic"
        ],
        crud: {
          type: "deleteOne",
          item: "Variable"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      }
    }
  },
  ManagerMatter: {
    id: "matter",
    idCamelCase: "matter",
    items: {},
    operations: {
      getOptionPaaSettings: {
        method: "GET",
        path: "/option/paaSettings",
        scopes: [
          "homey.system"
        ]
      },
      setOptionPaaSettings: {
        method: "PUT",
        path: "/option/paaSettings",
        scopes: [
          "homey.system"
        ],
        parameters: {
          value: {
            "in": "body",
            required: true
          }
        }
      },
      unsetOptionPaaSettings: {
        method: "DELETE",
        path: "/option/paaSettings",
        scopes: [
          "homey.system"
        ]
      },
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      pairApi: {
        method: "post",
        path: "/pair",
        "private": true,
        scopes: [
          "homey.system"
        ],
        parameters: {
          code: {
            "in": "body",
            type: "string",
            required: true
          },
          zone: {
            "in": "body",
            type: "string"
          }
        }
      },
      updateDCLPaaCerts: {
        method: "get",
        path: "/update-dcl-paa-certs",
        "private": true,
        scopes: [
          "homey.system"
        ],
        parameters: {}
      },
      interview: {
        method: "get",
        path: "/interview",
        "private": true,
        scopes: [
          "homey.system"
        ],
        parameters: {
          nodeId: {
            "in": "query",
            type: "string",
            required: true
          }
        }
      },
      makeDeviceApi: {
        method: "get",
        path: "/make-device",
        "private": true,
        scopes: [
          "homey.system"
        ],
        parameters: {
          nodeId: {
            "in": "query",
            type: "string",
            required: true
          }
        }
      },
      readBasicInformation: {
        method: "get",
        path: "/read-basic-info",
        "private": true,
        scopes: [
          "homey.system"
        ],
        parameters: {
          nodeId: {
            "in": "query",
            type: "string",
            required: true
          }
        }
      }
    }
  },
  ManagerMobile: {
    id: "mobile",
    idCamelCase: "mobile",
    items: {},
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      }
    }
  },
  ManagerNotifications: {
    id: "notifications",
    idCamelCase: "notifications",
    items: {
      Notification: {
        id: "notification",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            },
            ownerUri: {
              type: "string"
            },
            dateCreated: {
              type: "string"
            },
            excerpt: {
              type: "string"
            },
            meta: {
              type: "object"
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getNotifications: {
        method: "get",
        path: "/notification",
        "private": false,
        scopes: [
          "homey.notifications.readonly"
        ],
        crud: {
          type: "getAll",
          item: "Notification"
        },
        parameters: {}
      },
      deleteNotification: {
        method: "delete",
        path: "/notification/:id",
        "private": false,
        scopes: [
          "homey.notifications"
        ],
        crud: {
          type: "deleteOne",
          item: "Notification"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      deleteNotifications: {
        method: "delete",
        path: "/notification",
        "private": false,
        scopes: [
          "homey.notifications"
        ],
        parameters: {
          ownerUri: {
            "in": "query",
            type: "string"
          }
        }
      },
      getOwners: {
        method: "get",
        path: "/owner",
        "private": false,
        scopes: [
          "homey.notifications.readonly"
        ],
        parameters: {}
      },
      setOwnerEnabled: {
        method: "put",
        path: "/owner/:uri/enabled",
        "private": false,
        scopes: [
          "homey.notifications"
        ],
        parameters: {
          uri: {
            "in": "path",
            type: "string",
            required: true
          },
          enabled: {
            "in": "body",
            type: "boolean",
            required: true
          }
        }
      },
      setOwnerPush: {
        method: "put",
        path: "/owner/:uri/push",
        "private": false,
        scopes: [
          "homey.notifications"
        ],
        parameters: {
          uri: {
            "in": "path",
            type: "string",
            required: true
          },
          push: {
            "in": "body",
            type: "boolean",
            required: true
          }
        }
      }
    }
  },
  ManagerPresence: {
    id: "presence",
    idCamelCase: "presence",
    items: {},
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      setPresentMe: {
        method: "put",
        path: "/me/present",
        "private": false,
        scopes: [
          "homey.presence.self"
        ],
        parameters: {
          value: {
            "in": "body",
            type: "boolean"
          },
          opts: {
            "in": "body",
            type: "object",
            properties: {
              forceFlowTrigger: {
                type: "boolean"
              }
            }
          }
        }
      },
      setPresent: {
        method: "put",
        path: "/:id/present",
        "private": false,
        scopes: [
          "homey.presence"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          value: {
            "in": "body",
            type: "boolean"
          }
        }
      },
      getPresent: {
        method: "get",
        path: "/:id/present",
        "private": false,
        scopes: [
          "homey.presence.readonly"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      setAsleepMe: {
        method: "put",
        path: "/me/asleep",
        "private": false,
        scopes: [
          "homey.presence.self"
        ],
        parameters: {
          value: {
            "in": "body",
            type: "boolean"
          },
          opts: {
            "in": "body",
            type: "object",
            properties: {
              forceFlowTrigger: {
                type: "boolean"
              }
            }
          }
        }
      },
      setAsleep: {
        method: "put",
        path: "/:id/asleep",
        "private": false,
        scopes: [
          "homey.presence"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          value: {
            "in": "body",
            type: "boolean"
          }
        }
      },
      getAsleep: {
        method: "get",
        path: "/:id/asleep",
        "private": false,
        scopes: [
          "homey.presence.readonly"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      }
    }
  },
  ManagerRF: {
    id: "rf",
    idCamelCase: "rf",
    items: {
      Signal: {
        id: "signal",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      record: {
        method: "post",
        path: "/record",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          frequency: {
            "in": "body",
            type: "string"
          },
          timeout: {
            "in": "body",
            type: "number"
          }
        }
      },
      replay: {
        method: "post",
        path: "/replay",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          frequency: {
            "in": "body",
            type: "string",
            required: true
          },
          data: {
            "in": "body",
            type: "array",
            required: true
          }
        }
      },
      emulate: {
        method: "post",
        path: "/:frequency/emulate",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          frequency: {
            "in": "path",
            type: "string",
            required: true
          },
          data: {
            "in": "body",
            type: "array",
            root: true,
            required: true
          }
        }
      },
      set433MHzConfig: {
        method: "post",
        path: "/mhz433/config",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          modulation: {
            "in": "body",
            type: "string"
          },
          carrier: {
            "in": "body",
            type: "number"
          },
          deviation: {
            "in": "body",
            type: "number"
          },
          channelSpacing: {
            "in": "body",
            type: "number"
          },
          filterBandwidth: {
            "in": "body",
            type: "number"
          },
          baudrate: {
            "in": "body",
            type: "number"
          },
          power: {
            "in": "body",
            type: "number"
          }
        }
      },
      txInfraredProntohex: {
        method: "post",
        path: "/ir/prontohex",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          payload: {
            "in": "body",
            type: "string",
            required: true
          },
          repetitions: {
            "in": "body",
            type: "number"
          }
        }
      }
    }
  },
  ManagerSafety: {
    id: "safety",
    idCamelCase: "safety",
    items: {},
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      }
    }
  },
  ManagerSatellites: {
    id: "satellites",
    idCamelCase: "satellites",
    items: {},
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      }
    }
  },
  ManagerSecurity: {
    id: "security",
    idCamelCase: "security",
    items: {},
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      }
    }
  },
  ManagerSessions: {
    id: "sessions",
    idCamelCase: "sessions",
    items: {
      Session: {
        id: "session",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid"
            },
            type: {
              type: "string",
              "enum": [
                "OAUTH",
                "APP",
                "PAT"
              ]
            },
            scopes: {
              description: "These are the requested scopes",
              type: "array",
              items: {
                type: "string"
              }
            },
            intersectedScopes: {
              description: "These are the actual available scopes. This is an intersection between the requested scopes and the user's scopes.",
              type: "array",
              items: {
                type: "string"
              }
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getSessionMe: {
        method: "get",
        path: "/session/me",
        "private": false,
        scopes: [],
        parameters: {}
      }
    }
  },
  ManagerSystem: {
    id: "system",
    idCamelCase: "system",
    items: {},
    operations: {
      getOptionForwardedPort: {
        method: "GET",
        path: "/option/forwardedPort",
        scopes: [
          "homey.system.readonly"
        ]
      },
      setOptionForwardedPort: {
        method: "PUT",
        path: "/option/forwardedPort",
        scopes: [
          "homey.system"
        ],
        parameters: {
          value: {
            "in": "body",
            required: true
          }
        }
      },
      unsetOptionForwardedPort: {
        method: "DELETE",
        path: "/option/forwardedPort",
        scopes: [
          "homey.system"
        ]
      },
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      ping: {
        method: "get",
        path: "/ping",
        "private": false,
        scopes: [],
        parameters: {}
      },
      getInfo: {
        method: "get",
        path: "/",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getSystemName: {
        method: "get",
        path: "/name",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      setSystemName: {
        method: "put",
        path: "/name",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          name: {
            "in": "body",
            type: "string",
            required: true
          }
        }
      },
      reboot: {
        method: "post",
        path: "/reboot",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {}
      },
      sendLog: {
        method: "post",
        path: "/journalctl",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {
          append: {
            "in": "body",
            type: "string"
          }
        }
      },
      getMemoryInfo: {
        method: "get",
        path: "/memory",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getStorageInfo: {
        method: "get",
        path: "/storage",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      rebootOTA: {
        method: "post",
        path: "/reboot-ota",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {}
      },
      setDebug: {
        method: "put",
        path: "/debug",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          namespace: {
            "in": "body",
            type: "string",
            required: true
          }
        }
      },
      enableWifi: {
        method: "post",
        path: "/enable-wifi",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {}
      },
      disableWifi: {
        method: "post",
        path: "/disable-wifi",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {}
      }
    }
  },
  ManagerThread: {
    id: "thread",
    idCamelCase: "thread",
    items: {},
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      }
    }
  },
  ManagerUpdates: {
    id: "updates",
    idCamelCase: "updates",
    items: {},
    operations: {
      getOptionChannel: {
        method: "GET",
        path: "/option/channel",
        scopes: [
          "homey.system.readonly"
        ]
      },
      setOptionChannel: {
        method: "PUT",
        path: "/option/channel",
        scopes: [
          "homey.system"
        ],
        parameters: {
          value: {
            "in": "body",
            required: true
          }
        }
      },
      unsetOptionChannel: {
        method: "DELETE",
        path: "/option/channel",
        scopes: [
          "homey.system"
        ]
      },
      getOptionAutoupdate: {
        method: "GET",
        path: "/option/autoupdate",
        scopes: [
          "homey.system.readonly"
        ]
      },
      setOptionAutoupdate: {
        method: "PUT",
        path: "/option/autoupdate",
        scopes: [
          "homey.system"
        ],
        parameters: {
          value: {
            "in": "body",
            required: true
          }
        }
      },
      unsetOptionAutoupdate: {
        method: "DELETE",
        path: "/option/autoupdate",
        scopes: [
          "homey.system"
        ]
      },
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getUpdates: {
        method: "get",
        path: "/update",
        "private": false,
        scopes: [
          "homey.updates.readonly"
        ],
        parameters: {}
      },
      installUpdate: {
        method: "post",
        path: "/update",
        "private": false,
        scopes: [
          "homey.updates"
        ],
        parameters: {
          reboot: {
            "in": "body",
            type: "boolean"
          },
          silent: {
            "in": "body",
            type: "boolean"
          }
        }
      },
      abortInstallUpdate: {
        method: "delete",
        path: "/update",
        "private": false,
        scopes: [],
        parameters: {}
      }
    }
  },
  ManagerUsers: {
    id: "users",
    idCamelCase: "users",
    items: {
      User: {
        id: "user",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      login: {
        method: "post",
        path: "/login",
        "private": false,
        scopes: [],
        parameters: {
          token: {
            "in": "body",
            type: "string",
            required: true
          }
        }
      },
      getUserMe: {
        method: "get",
        path: "/user/me",
        "private": false,
        scopes: [
          "homey.user.self"
        ],
        parameters: {}
      },
      updateUserMe: {
        method: "put",
        path: "/user/me",
        "private": false,
        scopes: [
          "homey.user.self"
        ],
        parameters: {
          name: {
            "in": "body",
            type: "string"
          }
        }
      },
      deleteUserMe: {
        method: "delete",
        path: "/user/me",
        "private": false,
        scopes: [
          "homey.user.self"
        ],
        parameters: {}
      },
      getUsers: {
        method: "get",
        path: "/user",
        "private": false,
        scopes: [
          "homey.user.readonly"
        ],
        crud: {
          type: "getAll",
          item: "User"
        },
        parameters: {}
      },
      getUser: {
        method: "get",
        path: "/user/:id",
        "private": false,
        scopes: [
          "homey.user.readonly"
        ],
        crud: {
          type: "getOne",
          item: "User"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      createUser: {
        method: "post",
        path: "/user",
        "private": false,
        scopes: [
          "homey.user"
        ],
        crud: {
          type: "createOne",
          item: "User"
        },
        parameters: {
          user: {
            "in": "body",
            type: "object",
            root: true,
            required: true,
            properties: {
              role: {
                type: "string",
                required: true
              }
            }
          }
        }
      },
      updateUser: {
        method: "put",
        path: "/user/:id",
        "private": false,
        scopes: [
          "homey.user"
        ],
        crud: {
          type: "updateOne",
          item: "User"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          user: {
            "in": "body",
            type: "object",
            root: true,
            required: true,
            properties: {
              role: {
                type: "string"
              },
              enabled: {
                type: "boolean"
              }
            }
          }
        }
      },
      deleteUser: {
        method: "delete",
        path: "/user/:id",
        "private": false,
        scopes: [
          "homey.user"
        ],
        crud: {
          type: "deleteOne",
          item: "User"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      updateUserMeProperties: {
        method: "put",
        path: "/user/me/properties/:id",
        "private": false,
        scopes: [
          "homey.user.self"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          value: {
            "in": "body",
            type: "object",
            required: true
          }
        }
      },
      deleteUserMeProperties: {
        method: "delete",
        path: "/user/me/properties/:id",
        "private": false,
        scopes: [
          "homey.user.self"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      swapOwner: {
        method: "post",
        path: "/swap-owner",
        "private": false,
        scopes: [],
        parameters: {
          newOwnerUserId: {
            "in": "body",
            type: "string",
            required: true
          }
        }
      },
      getPersonalAccessTokens: {
        method: "get",
        path: "/pat",
        "private": false,
        scopes: [],
        parameters: {}
      },
      createPersonalAccessToken: {
        method: "post",
        path: "/pat",
        "private": false,
        scopes: [],
        parameters: {
          name: {
            "in": "body",
            type: "string",
            required: true
          },
          scopes: {
            "in": "body",
            type: "array",
            required: true
          }
        }
      },
      deletePersonalAccessToken: {
        method: "delete",
        path: "/pat/:id",
        "private": false,
        scopes: [],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      }
    }
  },
  ManagerVirtualDevice: {
    id: "vdevice",
    idCamelCase: "vdevice",
    items: {
      VirtualDriverDummySocket: {
        id: "virtualdriverdummysocket",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      VirtualDeviceDummySocket: {
        id: "virtualdevicedummysocket",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      VirtualDriverZwave: {
        id: "virtualdriverzwave",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      VirtualDeviceZwave: {
        id: "virtualdevicezwave",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      VirtualDriverZigbee: {
        id: "virtualdriverzigbee",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      VirtualDeviceZigbee: {
        id: "virtualdevicezigbee",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      VirtualDriverInfrared: {
        id: "virtualdriverinfrared",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      VirtualDeviceInfrared: {
        id: "virtualdeviceinfrared",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      VirtualDriverHomeyBridge: {
        id: "virtualdriverbridge",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      VirtualDeviceHomeyBridge: {
        id: "virtualdevicebridge",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      VirtualDriverVirtualSocket: {
        id: "virtualdrivervirtualsocket",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      VirtualDeviceVirtualSocket: {
        id: "virtualdevicevirtualsocket",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      VirtualDriverVirtualButton: {
        id: "virtualdrivervirtualbutton",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      VirtualDeviceVirtualButton: {
        id: "virtualdevicevirtualbutton",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      VirtualDriverVirtualIPCamera: {
        id: "virtualdrivervirtualipcamera",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      VirtualDeviceVirtualIPCamera: {
        id: "virtualdevicevirtualipcamera",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      VirtualDriverMatter: {
        id: "virtualdrivermatter",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      VirtualDeviceMatter: {
        id: "virtualdevicematter",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      }
    }
  },
  ManagerWeather: {
    id: "weather",
    idCamelCase: "weather",
    items: {},
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getWeather: {
        method: "get",
        path: "/weather",
        "private": false,
        scopes: [
          "homey.geolocation.readonly"
        ],
        parameters: {}
      }
    }
  },
  ManagerWebserver: {
    id: "webserver",
    idCamelCase: "webserver",
    items: {},
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      }
    }
  },
  ManagerZigbee: {
    id: "zigbee",
    idCamelCase: "zigbee",
    items: {},
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      flashFirmware: {
        method: "put",
        path: "/flash-firmware",
        "private": true,
        scopes: [
          "homey.system"
        ],
        parameters: {}
      },
      runCommand: {
        method: "post",
        path: "/command",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          command: {
            "in": "body",
            type: "string",
            required: true
          },
          opts: {
            "in": "body",
            type: "object"
          }
        }
      }
    }
  },
  ManagerZones: {
    id: "zones",
    idCamelCase: "zones",
    items: {
      Zone: {
        id: "zone",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getZones: {
        method: "get",
        path: "/zone",
        "private": false,
        scopes: [
          "homey.zone.readonly"
        ],
        crud: {
          type: "getAll",
          item: "Zone"
        },
        parameters: {}
      },
      getZone: {
        method: "get",
        path: "/zone/:id",
        "private": false,
        scopes: [
          "homey.zone.readonly"
        ],
        crud: {
          type: "getOne",
          item: "Zone"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      createZone: {
        method: "post",
        path: "/zone",
        "private": false,
        scopes: [
          "homey.zone"
        ],
        crud: {
          type: "createOne",
          item: "Zone"
        },
        parameters: {
          zone: {
            "in": "body",
            type: "object",
            root: true,
            required: true,
            properties: {
              name: {
                type: "string",
                required: true
              },
              icon: {
                type: "string",
                required: true
              },
              parent: {
                type: "string",
                required: true
              }
            }
          }
        }
      },
      updateZone: {
        method: "put",
        path: "/zone/:id",
        "private": false,
        scopes: [
          "homey.zone"
        ],
        crud: {
          type: "updateOne",
          item: "Zone"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          zone: {
            "in": "body",
            type: "object",
            root: true,
            required: true,
            properties: {
              name: {
                type: "string"
              },
              icon: {
                type: "string"
              },
              parent: {
                type: "string"
              }
            }
          }
        }
      },
      deleteZone: {
        method: "delete",
        path: "/zone/:id",
        "private": false,
        scopes: [
          "homey.zone"
        ],
        crud: {
          type: "deleteOne",
          item: "Zone"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      }
    }
  },
  ManagerZwave: {
    id: "zwave",
    idCamelCase: "zwave",
    items: {},
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      runCommand: {
        method: "post",
        path: "/command",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          command: {
            "in": "body",
            type: "string",
            required: true
          },
          opts: {
            "in": "body",
            type: "object"
          }
        }
      },
      flashFirmware: {
        method: "put",
        path: "/flash-firmware",
        "private": true,
        scopes: [
          "homey.system"
        ],
        parameters: {}
      },
      getLog: {
        method: "get",
        path: "/log",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {}
      },
      setLogEnabled: {
        method: "put",
        path: "/log",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          enabled: {
            "in": "body",
            type: "boolean",
            required: true
          }
        }
      },
      setLBTThreshold: {
        method: "put",
        path: "/lbt-threshold",
        "private": true,
        scopes: [
          "homey.system"
        ],
        parameters: {
          threshold: {
            "in": "body",
            type: "number",
            required: true
          }
        }
      }
    }
  }
};
const require$$2 = {
  managers: managers$1
};
var HomeyAPIV3Local_1;
var hasRequiredHomeyAPIV3Local;
function requireHomeyAPIV3Local() {
  if (hasRequiredHomeyAPIV3Local)
    return HomeyAPIV3Local_1;
  hasRequiredHomeyAPIV3Local = 1;
  const HomeyAPIV3 = requireHomeyAPIV3();
  const ManagerDevkit = requireManagerDevkit$1();
  class HomeyAPIV3Local2 extends HomeyAPIV3 {
    get platform() {
      return "local";
    }
    get platformVersion() {
      return 2;
    }
    getSpecification() {
      return require$$2;
    }
  }
  __publicField(HomeyAPIV3Local2, "MANAGERS", {
    ...HomeyAPIV3.MANAGERS,
    ManagerDevkit
  });
  HomeyAPIV3Local_1 = HomeyAPIV3Local2;
  return HomeyAPIV3Local_1;
}
const managers = {
  ManagerApi: {
    id: "api",
    idCamelCase: "api",
    items: {},
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      }
    }
  },
  ManagerApps: {
    id: "apps",
    idCamelCase: "apps",
    items: {
      App: {
        id: "app",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      AppSettings: {
        id: "appsettings",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getApps: {
        method: "get",
        path: "/app",
        "private": false,
        scopes: [
          "homey.app.readonly"
        ],
        crud: {
          type: "getAll",
          item: "App"
        },
        parameters: {}
      },
      getApp: {
        method: "get",
        path: "/app/:id",
        "private": false,
        scopes: [
          "homey.app.readonly"
        ],
        crud: {
          type: "getOne",
          item: "App"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      installFromAppStore: {
        method: "post",
        path: "/store",
        "private": false,
        scopes: [
          "homey.app"
        ],
        parameters: {
          id: {
            "in": "body",
            type: "string",
            required: true
          },
          channel: {
            "in": "body",
            type: "string"
          }
        }
      },
      uninstallApp: {
        method: "delete",
        path: "/app/:id",
        "private": false,
        scopes: [
          "homey.app"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      getAppSettings: {
        method: "get",
        path: "/app/:id/setting",
        "private": false,
        scopes: [
          "homey.app.control"
        ],
        crud: {
          type: "getOne",
          item: "AppSettings"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      getAppSetting: {
        method: "get",
        path: "/app/:id/setting/:name",
        "private": false,
        scopes: [
          "homey.app.control"
        ],
        parameters: {
          name: {
            "in": "path",
            type: "string",
            required: true
          },
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      setAppSetting: {
        method: "put",
        path: "/app/:id/setting/:name",
        "private": false,
        scopes: [
          "homey.app.control"
        ],
        parameters: {
          name: {
            "in": "path",
            type: "string",
            required: true
          },
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          value: {
            "in": "body",
            required: true
          }
        }
      },
      unsetAppSetting: {
        method: "delete",
        path: "/app/:id/setting/:name",
        "private": false,
        scopes: [
          "homey.app.control"
        ],
        parameters: {
          name: {
            "in": "path",
            type: "string",
            required: true
          },
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      getAppStd: {
        method: "post",
        path: "/app/:id/crashlog",
        "private": false,
        scopes: [
          "homey.app.readonly"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          message: {
            "in": "body",
            type: "string",
            required: true
          }
        }
      }
    }
  },
  ManagerBLE: {
    id: "ble",
    idCamelCase: "ble",
    items: {},
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      runCommand: {
        method: "post",
        path: "/command",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          command: {
            "in": "body",
            type: "string",
            required: true
          },
          opts: {
            "in": "body",
            type: "object"
          }
        }
      }
    }
  },
  ManagerClock: {
    id: "clock",
    idCamelCase: "clock",
    items: {},
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      }
    }
  },
  ManagerCloud: {
    id: "cloud",
    idCamelCase: "cloud",
    items: {
      Webhook: {
        id: "webhook",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      emitOAuth2Callback: {
        method: "post",
        path: "/oauth2-callback",
        "private": false,
        scopes: [],
        parameters: {
          app: {
            "in": "query",
            type: "string"
          },
          token: {
            "in": "body",
            type: "string"
          },
          code: {
            "in": "body",
            type: "string"
          }
        }
      },
      emitWebhookCallback: {
        method: "post",
        path: "/webhook/:id/callback",
        "private": false,
        scopes: [],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          args: {
            "in": "body",
            type: "object"
          }
        }
      }
    }
  },
  ManagerCoprocessor: {
    id: "coprocessor",
    idCamelCase: "coprocessor",
    items: {},
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getBridges: {
        method: "get",
        path: "/bridge",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getLog: {
        method: "get",
        path: "/bridge/log",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      pairBridge: {
        method: "post",
        path: "/bridge",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          serialHash: {
            "in": "body",
            type: "string",
            required: true
          }
        }
      }
    }
  },
  ManagerCron: {
    id: "cron",
    idCamelCase: "cron",
    items: {
      Cronjob: {
        id: "cronjob",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      }
    }
  },
  ManagerDatabase: {
    id: "database",
    idCamelCase: "database",
    items: {},
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      }
    }
  },
  ManagerDashboards: {
    id: "dashboards",
    idCamelCase: "dashboards",
    "private": true,
    items: {
      Dashboard: {
        id: "dashboard",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid"
            },
            name: {
              type: "string"
            },
            widgets: {
              type: "object",
              additionalProperties: false,
              patternProperties: {
                "^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$": {
                  type: "object",
                  properties: {
                    type: {
                      type: "string"
                    },
                    x: {
                      type: "number"
                    },
                    y: {
                      type: "number"
                    },
                    width: {
                      type: "number"
                    },
                    height: {
                      type: "number"
                    },
                    settings: {
                      type: "object"
                    }
                  }
                }
              }
            },
            lines: {
              type: "object",
              additionalProperties: false,
              patternProperties: {
                "^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$": {
                  type: "object",
                  properties: {
                    x1: {
                      type: "number"
                    },
                    x2: {
                      type: "number"
                    },
                    y1: {
                      type: "number"
                    },
                    y2: {
                      type: "number"
                    },
                    settings: {
                      type: "object"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getDashboards: {
        method: "get",
        path: "/dashboard",
        "private": false,
        scopes: [
          "homey.dashboard.readonly"
        ],
        crud: {
          type: "getAll",
          item: "Dashboard"
        },
        parameters: {}
      },
      getDashboard: {
        method: "get",
        path: "/dashboard/:id",
        "private": false,
        scopes: [
          "homey.dashboard.readonly"
        ],
        crud: {
          type: "getOne",
          item: "Dashboard"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      createDashboard: {
        method: "post",
        path: "/dashboard",
        "private": false,
        scopes: [
          "homey.dashboard"
        ],
        crud: {
          type: "createOne",
          item: "Dashboard"
        },
        parameters: {
          dashboard: {
            "in": "body",
            type: "object",
            root: true,
            required: true,
            properties: {
              name: {
                type: "string",
                required: true
              },
              widgets: {
                type: "object",
                required: true
              },
              lines: {
                type: "object",
                required: true
              }
            }
          }
        }
      },
      updateDashboard: {
        method: "put",
        path: "/dashboard/:id",
        "private": false,
        scopes: [
          "homey.dashboard"
        ],
        crud: {
          type: "updateOne",
          item: "Dashboard"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          dashboard: {
            "in": "body",
            type: "object",
            root: true,
            required: true,
            properties: {
              name: {
                type: "string"
              },
              widgets: {
                type: "object"
              },
              lines: {
                type: "object"
              }
            }
          }
        }
      },
      deleteDashboard: {
        method: "delete",
        path: "/dashboard/:id",
        "private": false,
        scopes: [
          "homey.dashboard"
        ],
        crud: {
          type: "deleteOne",
          item: "Dashboard"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      }
    }
  },
  ManagerDevices: {
    id: "devices",
    idCamelCase: "devices",
    items: {
      Device: {
        id: "device",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid"
            },
            name: {
              type: "string"
            },
            note: {
              type: "string"
            }
          }
        }
      },
      Capability: {
        id: "capability",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getDevice: {
        method: "get",
        path: "/device/:id",
        "private": false,
        scopes: [
          "homey.device.readonly"
        ],
        crud: {
          type: "getOne",
          item: "Device"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      getDeviceSettingsObj: {
        method: "get",
        path: "/device/:id/settings_obj",
        "private": false,
        scopes: [
          "homey.device.readonly"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      setDeviceSettings: {
        method: "put",
        path: "/device/:id/settings",
        "private": false,
        scopes: [
          "homey.device"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          settings: {
            "in": "body",
            type: "object",
            root: true,
            required: true
          }
        }
      },
      getDevices: {
        method: "get",
        path: "/device",
        "private": false,
        scopes: [
          "homey.device.readonly"
        ],
        crud: {
          type: "getAll",
          item: "Device"
        },
        parameters: {}
      },
      updateDevice: {
        method: "put",
        path: "/device/:id",
        "private": false,
        scopes: [
          "homey.device"
        ],
        crud: {
          type: "updateOne",
          item: "Device"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          device: {
            "in": "body",
            type: "object",
            root: true,
            required: true,
            properties: {
              name: {
                type: "string"
              },
              zone: {
                type: "string"
              },
              note: {
                type: "string"
              },
              iconOverride: {
                type: "string"
              },
              virtualClass: {
                type: "string"
              },
              uiIndicator: {
                type: "string"
              }
            }
          }
        }
      },
      deleteDevice: {
        method: "delete",
        path: "/device/:id",
        "private": false,
        scopes: [
          "homey.device"
        ],
        crud: {
          type: "deleteOne",
          item: "Device"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      getCapabilityValue: {
        method: "get",
        path: "/device/:deviceId/capability/:capabilityId",
        "private": false,
        scopes: [
          "homey.device.readonly"
        ],
        parameters: {
          capabilityId: {
            "in": "path",
            type: "string",
            required: true
          },
          deviceId: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      setCapabilityValue: {
        method: "put",
        path: "/device/:deviceId/capability/:capabilityId",
        "private": false,
        scopes: [
          "homey.device.control"
        ],
        parameters: {
          capabilityId: {
            "in": "path",
            type: "string",
            required: true
          },
          deviceId: {
            "in": "path",
            type: "string",
            required: true
          },
          value: {
            "in": "body",
            type: [
              "string",
              "number",
              "boolean"
            ],
            required: true
          },
          opts: {
            "in": "body",
            type: "object"
          },
          transactionId: {
            "in": "body",
            type: "string"
          }
        }
      }
    }
  },
  ManagerDevkit: {
    id: "devkit",
    idCamelCase: "devkit",
    items: {},
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      installApp: {
        method: "post",
        path: "/app",
        "private": false,
        scopes: [
          "homey.app"
        ],
        parameters: {
          manifest: {
            "in": "body",
            type: "object",
            required: true
          },
          clean: {
            "in": "body",
            type: "boolean"
          }
        }
      },
      uninstallApp: {
        method: "delete",
        path: "/app/:sessionId",
        "private": false,
        scopes: [
          "homey.app"
        ],
        parameters: {
          sessionId: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      }
    }
  },
  ManagerDrivers: {
    id: "drivers",
    idCamelCase: "drivers",
    items: {
      Driver: {
        id: "driver",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid"
            },
            pair: {
              type: "array",
              required: true
            }
          }
        }
      },
      PairSession: {
        id: "pairsession",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getDrivers: {
        method: "get",
        path: "/driver",
        "private": false,
        scopes: [
          "homey.device.readonly"
        ],
        crud: {
          type: "getAll",
          item: "Driver"
        },
        parameters: {}
      },
      getPairSession: {
        method: "get",
        path: "/pairsession/:id",
        "private": false,
        scopes: [
          "homey.device"
        ],
        crud: {
          type: "getOne",
          item: "PairSession"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      createPairSession: {
        method: "post",
        path: "/pairsession",
        "private": false,
        scopes: [
          "homey.device"
        ],
        crud: {
          type: "createOne",
          item: "PairSession"
        },
        parameters: {
          pairsession: {
            "in": "body",
            type: "object",
            root: true,
            required: true,
            properties: {
              type: {
                type: "string",
                required: true
              },
              driverId: {
                type: "string",
                required: true
              },
              deviceId: {
                type: "string"
              },
              zoneId: {
                type: "string"
              }
            }
          }
        }
      },
      deletePairSession: {
        method: "delete",
        path: "/pairsession/:id",
        "private": false,
        scopes: [
          "homey.device"
        ],
        crud: {
          type: "deleteOne",
          item: "PairSession"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      emitPairingHeartbeat: {
        method: "post",
        path: "/pairsession/:id/heartbeat",
        "private": false,
        scopes: [
          "homey.device"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      emitPairingEvent: {
        method: "post",
        path: "/pairsession/:id/emit",
        "private": false,
        scopes: [
          "homey.device"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          event: {
            "in": "body",
            type: "string",
            required: true
          },
          data: {
            "in": "body"
          }
        }
      },
      emitPairingCallback: {
        method: "post",
        path: "/pairsession/:id/callback",
        "private": false,
        scopes: [
          "homey.device"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          callbackId: {
            "in": "body",
            type: "string",
            required: true
          },
          data: {
            "in": "body"
          }
        }
      },
      createPairSessionDevice: {
        method: "post",
        path: "/pairsession/:id/device",
        "private": false,
        scopes: [
          "homey.device"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          device: {
            "in": "body",
            type: "object",
            root: true,
            required: true,
            properties: {
              name: {
                type: "string"
              },
              data: {
                required: true
              },
              zone: {
                type: "string"
              },
              store: {
                type: "object"
              },
              capabilities: {
                type: "array"
              },
              capabilitiesOptions: {
                type: "object"
              },
              "class": {
                type: "string"
              },
              icon: {
                type: "string"
              },
              iconOverride: {
                type: "string"
              },
              settings: {
                type: "object"
              },
              energy: {
                type: "object"
              }
            }
          }
        }
      },
      deletePairSessionDevice: {
        method: "delete",
        path: "/pairsession/:id/device",
        "private": false,
        scopes: [
          "homey.device"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      }
    }
  },
  ManagerEnergy: {
    id: "energy",
    idCamelCase: "energy",
    items: {},
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getLiveReport: {
        method: "get",
        path: "/live",
        "private": false,
        scopes: [
          "homey.insights.readonly"
        ],
        parameters: {
          zone: {
            "in": "query",
            type: "string"
          }
        }
      }
    }
  },
  ManagerFlow: {
    id: "flow",
    idCamelCase: "flow",
    items: {
      Flow: {
        id: "flow"
      },
      FlowFolder: {
        id: "flowfolder",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      FlowCardTrigger: {
        id: "flowcardtrigger",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      FlowCardCondition: {
        id: "flowcardcondition",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      FlowCardAction: {
        id: "flowcardaction",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      AdvancedFlow: {
        id: "advancedflow",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getFlow: {
        method: "get",
        path: "/flow/:id",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getOne",
          item: "Flow"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      getFlows: {
        method: "get",
        path: "/flow",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getAll",
          item: "Flow"
        },
        parameters: {}
      },
      createFlow: {
        method: "post",
        path: "/flow",
        "private": false,
        scopes: [
          "homey.flow"
        ],
        crud: {
          type: "createOne",
          item: "Flow"
        },
        parameters: {
          flow: {
            "in": "body",
            type: "object",
            root: true,
            required: true,
            properties: {
              name: {
                type: "string",
                required: true
              },
              folder: {
                type: "string"
              },
              enabled: {
                type: "boolean"
              },
              trigger: {
                type: "object",
                required: true
              },
              conditions: {
                type: "array",
                required: true
              },
              actions: {
                type: "array",
                required: true
              }
            }
          }
        }
      },
      updateFlow: {
        method: "put",
        path: "/flow/:id",
        "private": false,
        scopes: [
          "homey.flow"
        ],
        crud: {
          type: "updateOne",
          item: "Flow"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          flow: {
            "in": "body",
            type: "object",
            root: true,
            required: true,
            properties: {
              name: {
                type: "string"
              },
              folder: {
                type: "string"
              },
              enabled: {
                type: "boolean"
              },
              trigger: {
                type: "object"
              },
              conditions: {
                type: "array"
              },
              actions: {
                type: "array"
              }
            }
          }
        }
      },
      deleteFlow: {
        method: "delete",
        path: "/flow/:id",
        "private": false,
        scopes: [
          "homey.flow"
        ],
        crud: {
          type: "deleteOne",
          item: "Flow"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      testFlow: {
        method: "post",
        path: "/flow/test",
        "private": false,
        scopes: [
          "homey.flow"
        ],
        parameters: {
          flow: {
            "in": "body",
            type: "object",
            required: true,
            properties: {
              trigger: {
                type: "object",
                required: true
              },
              conditions: {
                type: "array",
                required: true
              },
              actions: {
                type: "array",
                required: true
              }
            }
          },
          tokens: {
            "in": "body",
            type: "object",
            required: true
          },
          sessionId: {
            "in": "body",
            type: "string",
            required: true
          }
        }
      },
      triggerFlow: {
        method: "post",
        path: "/flow/:id/trigger",
        "private": false,
        scopes: [
          "homey.flow.start"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      shareFlow: {
        method: "post",
        path: "/flow/:id/share",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      getFlowFolders: {
        method: "get",
        path: "/flowfolder",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getAll",
          item: "FlowFolder"
        },
        parameters: {}
      },
      getFlowFolder: {
        method: "get",
        path: "/flowfolder/:id",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getOne",
          item: "FlowFolder"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      createFlowFolder: {
        method: "post",
        path: "/flowfolder",
        "private": false,
        scopes: [
          "homey.flow"
        ],
        crud: {
          type: "createOne",
          item: "FlowFolder"
        },
        parameters: {
          flowfolder: {
            "in": "body",
            type: "object",
            root: true,
            required: true,
            properties: {
              name: {
                type: "string",
                required: true
              },
              parent: {
                type: "string"
              }
            }
          }
        }
      },
      updateFlowFolder: {
        method: "put",
        path: "/flowfolder/:id",
        "private": false,
        scopes: [
          "homey.flow"
        ],
        crud: {
          type: "updateOne",
          item: "FlowFolder"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          flowfolder: {
            "in": "body",
            type: "object",
            root: true,
            required: true,
            properties: {
              name: {
                type: "string"
              },
              parent: {
                type: "string"
              }
            }
          }
        }
      },
      deleteFlowFolder: {
        method: "delete",
        path: "/flowfolder/:id",
        "private": false,
        scopes: [
          "homey.flow"
        ],
        crud: {
          type: "deleteOne",
          item: "FlowFolder"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      getFlowCardTrigger: {
        method: "get",
        path: "/flowcardtrigger/:uri/:id",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getOne",
          item: "FlowCardTrigger"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          uri: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      getFlowCardTriggers: {
        method: "get",
        path: "/flowcardtrigger",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getAll",
          item: "FlowCardTrigger"
        },
        parameters: {}
      },
      getFlowCardCondition: {
        method: "get",
        path: "/flowcardcondition/:uri/:id",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getOne",
          item: "FlowCardCondition"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          uri: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      getFlowCardConditions: {
        method: "get",
        path: "/flowcardcondition",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getAll",
          item: "FlowCardCondition"
        },
        parameters: {}
      },
      runFlowCardCondition: {
        method: "post",
        path: "/flowcardcondition/:uri/:id/run",
        "private": false,
        scopes: [
          "homey.flow"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          uri: {
            "in": "path",
            type: "string",
            required: true
          },
          args: {
            "in": "body",
            type: "object"
          },
          tokens: {
            "in": "body",
            type: "object"
          },
          state: {
            "in": "body",
            type: "object"
          },
          droptoken: {
            "in": "body",
            type: "string"
          }
        }
      },
      getFlowCardAction: {
        method: "get",
        path: "/flowcardaction/:uri/:id",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getOne",
          item: "FlowCardAction"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          uri: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      getFlowCardActions: {
        method: "get",
        path: "/flowcardaction",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getAll",
          item: "FlowCardAction"
        },
        parameters: {}
      },
      runFlowCardAction: {
        method: "post",
        path: "/flowcardaction/:uri/:id/run",
        "private": false,
        scopes: [
          "homey.flow"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          uri: {
            "in": "path",
            type: "string",
            required: true
          },
          args: {
            "in": "body",
            type: "object"
          },
          tokens: {
            "in": "body",
            type: "object"
          },
          state: {
            "in": "body",
            type: "object"
          },
          droptoken: {
            "in": "body",
            type: "string"
          },
          duration: {
            "in": "body",
            type: "number"
          }
        }
      },
      getFlowCardAutocomplete: {
        method: "get",
        path: "/:type/:uri/:id/autocomplete",
        "private": false,
        scopes: [],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          uri: {
            "in": "path",
            type: "string",
            required: true
          },
          type: {
            "in": "path",
            type: "string",
            required: true
          },
          name: {
            "in": "query",
            type: "string",
            required: true
          },
          query: {
            "in": "query",
            type: "string",
            required: true
          },
          args: {
            "in": "query",
            type: "object"
          }
        }
      },
      getAdvancedFlow: {
        method: "get",
        path: "/advancedflow/:id",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getOne",
          item: "AdvancedFlow"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      getAdvancedFlows: {
        method: "get",
        path: "/advancedflow",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getAll",
          item: "AdvancedFlow"
        },
        parameters: {}
      },
      createAdvancedFlow: {
        method: "post",
        path: "/advancedflow",
        "private": false,
        scopes: [
          "homey.flow"
        ],
        crud: {
          type: "createOne",
          item: "AdvancedFlow"
        },
        parameters: {
          advancedflow: {
            "in": "body",
            root: true,
            required: true
          }
        }
      },
      updateAdvancedFlow: {
        method: "put",
        path: "/advancedflow/:id",
        "private": false,
        scopes: [
          "homey.flow"
        ],
        crud: {
          type: "updateOne",
          item: "AdvancedFlow"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          advancedflow: {
            "in": "body",
            root: true,
            required: true
          }
        }
      },
      deleteAdvancedFlow: {
        method: "delete",
        path: "/advancedflow/:id",
        "private": false,
        scopes: [
          "homey.flow"
        ],
        crud: {
          type: "deleteOne",
          item: "AdvancedFlow"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      triggerAdvancedFlow: {
        method: "post",
        path: "/advancedflow/:id/trigger",
        "private": false,
        scopes: [
          "homey.flow.start"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      }
    }
  },
  ManagerFlowToken: {
    id: "flowtoken",
    idCamelCase: "flowtoken",
    items: {
      FlowToken: {
        id: "flowtoken",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getFlowTokens: {
        method: "get",
        path: "/flowtoken",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getAll",
          item: "FlowToken"
        },
        parameters: {}
      },
      getFlowToken: {
        method: "get",
        path: "/flowtoken/:id",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        crud: {
          type: "getOne",
          item: "FlowToken"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      getFlowTokenValue: {
        method: "get",
        path: "/flowtoken/:id/value",
        "private": false,
        scopes: [
          "homey.flow.readonly"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      }
    }
  },
  ManagerGeolocation: {
    id: "geolocation",
    idCamelCase: "geolocation",
    items: {},
    operations: {
      getOptionAddress: {
        method: "GET",
        path: "/option/address",
        scopes: [
          "homey.geolocation.readonly"
        ]
      },
      setOptionAddress: {
        method: "PUT",
        path: "/option/address",
        scopes: [
          "homey.geolocation"
        ],
        parameters: {
          value: {
            "in": "body",
            required: true
          }
        }
      },
      unsetOptionAddress: {
        method: "DELETE",
        path: "/option/address",
        scopes: [
          "homey.geolocation"
        ]
      },
      getOptionLocation: {
        method: "GET",
        path: "/option/location",
        scopes: [
          "homey.geolocation.readonly"
        ]
      },
      setOptionLocation: {
        method: "PUT",
        path: "/option/location",
        scopes: [
          "homey.geolocation"
        ],
        parameters: {
          value: {
            "in": "body",
            required: true
          }
        }
      },
      unsetOptionLocation: {
        method: "DELETE",
        path: "/option/location",
        scopes: [
          "homey.geolocation"
        ]
      },
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      }
    }
  },
  ManagerI18n: {
    id: "i18n",
    idCamelCase: "i18n",
    items: {},
    operations: {
      getOptionLanguage: {
        method: "GET",
        path: "/option/language",
        scopes: [
          "homey.system.readonly"
        ]
      },
      setOptionLanguage: {
        method: "PUT",
        path: "/option/language",
        scopes: [
          "homey.system"
        ],
        parameters: {
          value: {
            "in": "body",
            required: true
          }
        }
      },
      unsetOptionLanguage: {
        method: "DELETE",
        path: "/option/language",
        scopes: [
          "homey.system"
        ]
      },
      getOptionUnits: {
        method: "GET",
        path: "/option/units",
        scopes: [
          "homey.system.readonly"
        ]
      },
      setOptionUnits: {
        method: "PUT",
        path: "/option/units",
        scopes: [
          "homey.system"
        ],
        parameters: {
          value: {
            "in": "body",
            required: true
          }
        }
      },
      unsetOptionUnits: {
        method: "DELETE",
        path: "/option/units",
        scopes: [
          "homey.system"
        ]
      },
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      }
    }
  },
  ManagerIcons: {
    id: "icons",
    idCamelCase: "icons",
    items: {
      Icon: {
        id: "icon",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      }
    }
  },
  ManagerImages: {
    id: "images",
    idCamelCase: "images",
    items: {
      Image: {
        id: "image",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getImages: {
        method: "get",
        path: "/image",
        "private": false,
        scopes: [
          "homey.device.readonly"
        ],
        crud: {
          type: "getAll",
          item: "Image"
        },
        parameters: {}
      }
    }
  },
  ManagerInsights: {
    id: "insights",
    idCamelCase: "insights",
    items: {
      Log: {
        id: "log",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      LogEntryBoolean: {
        id: "logentryboolean",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getLog: {
        method: "get",
        path: "/log/:id",
        "private": false,
        scopes: [
          "homey.insights.readonly"
        ],
        crud: {
          type: "getOne",
          item: "Log"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      getLogs: {
        method: "get",
        path: "/log",
        "private": false,
        scopes: [
          "homey.insights.readonly"
        ],
        crud: {
          type: "getAll",
          item: "Log"
        },
        parameters: {}
      },
      getLogEntries: {
        method: "get",
        path: "/log/:uri/:id/entry",
        "private": false,
        scopes: [
          "homey.insights.readonly"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          uri: {
            "in": "path",
            type: "string",
            required: true
          },
          resolution: {
            "in": "query",
            type: "string"
          }
        }
      },
      deleteLog: {
        method: "delete",
        path: "/log/:uri/:id",
        "private": false,
        scopes: [
          "homey.insights"
        ],
        crud: {
          type: "deleteOne",
          item: "Log"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          uri: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      deleteLogEntries: {
        method: "delete",
        path: "/log/:uri/:id/entry",
        "private": false,
        scopes: [
          "homey.insights"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          uri: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      }
    }
  },
  ManagerLogic: {
    id: "logic",
    idCamelCase: "logic",
    items: {
      Variable: {
        id: "variable",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            },
            name: {
              type: "string"
            },
            type: {
              type: "string",
              "enum": [
                "n",
                "u",
                "m",
                "b",
                "e",
                "r"
              ]
            },
            value: {
              description: "Should be the same type as defined in the `type` property."
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getVariable: {
        method: "get",
        path: "/variable/:id",
        "private": false,
        scopes: [
          "homey.logic.readonly"
        ],
        crud: {
          type: "getOne",
          item: "Variable"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      getVariables: {
        method: "get",
        path: "/variable",
        "private": false,
        scopes: [
          "homey.logic.readonly"
        ],
        crud: {
          type: "getAll",
          item: "Variable"
        },
        parameters: {}
      },
      createVariable: {
        method: "post",
        path: "/variable",
        "private": false,
        scopes: [
          "homey.logic"
        ],
        crud: {
          type: "createOne",
          item: "Variable"
        },
        parameters: {
          variable: {
            "in": "body",
            type: "object",
            root: true,
            required: true,
            properties: {
              name: {
                type: "string",
                required: true
              },
              type: {
                type: "string",
                required: true
              },
              value: {
                type: [
                  "string",
                  "number",
                  "boolean"
                ],
                required: true
              }
            }
          }
        }
      },
      updateVariable: {
        method: "put",
        path: "/variable/:id",
        "private": false,
        scopes: [
          "homey.logic"
        ],
        crud: {
          type: "updateOne",
          item: "Variable"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          variable: {
            "in": "body",
            type: "object",
            root: true,
            required: true,
            properties: {
              name: {
                type: "string"
              },
              value: {
                type: [
                  "string",
                  "number",
                  "boolean"
                ]
              }
            }
          }
        }
      },
      deleteVariable: {
        method: "delete",
        path: "/variable/:id",
        "private": false,
        scopes: [
          "homey.logic"
        ],
        crud: {
          type: "deleteOne",
          item: "Variable"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      }
    }
  },
  ManagerMobile: {
    id: "mobile",
    idCamelCase: "mobile",
    items: {},
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      onMobileEvent: {
        method: "post",
        path: "/event",
        "private": false,
        scopes: [],
        parameters: {
          secret: {
            "in": "body",
            type: "string",
            required: true
          },
          userId: {
            "in": "body",
            type: "string",
            required: true
          },
          deviceId: {
            "in": "body",
            type: "string",
            required: true
          },
          event: {
            "in": "body",
            type: "string",
            required: true
          },
          data: {
            "in": "body",
            required: true
          },
          timestamp: {
            "in": "body",
            type: "string"
          }
        }
      }
    }
  },
  ManagerNotifications: {
    id: "notifications",
    idCamelCase: "notifications",
    items: {
      Notification: {
        id: "notification",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            },
            ownerUri: {
              type: "string"
            },
            dateCreated: {
              type: "string"
            },
            excerpt: {
              type: "string"
            },
            meta: {
              type: "object"
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getNotifications: {
        method: "get",
        path: "/notification",
        "private": false,
        scopes: [
          "homey.notifications.readonly"
        ],
        crud: {
          type: "getAll",
          item: "Notification"
        },
        parameters: {}
      },
      deleteNotification: {
        method: "delete",
        path: "/notification/:id",
        "private": false,
        scopes: [
          "homey.notifications"
        ],
        crud: {
          type: "deleteOne",
          item: "Notification"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      deleteNotifications: {
        method: "delete",
        path: "/notification",
        "private": false,
        scopes: [
          "homey.notifications"
        ],
        parameters: {
          ownerUri: {
            "in": "query",
            type: "string"
          }
        }
      },
      getOwners: {
        method: "get",
        path: "/owner",
        "private": false,
        scopes: [
          "homey.notifications.readonly"
        ],
        parameters: {}
      },
      setOwnerEnabled: {
        method: "put",
        path: "/owner/:uri/enabled",
        "private": false,
        scopes: [
          "homey.notifications"
        ],
        parameters: {
          uri: {
            "in": "path",
            type: "string",
            required: true
          },
          enabled: {
            "in": "body",
            type: "boolean",
            required: true
          }
        }
      },
      setOwnerPush: {
        method: "put",
        path: "/owner/:uri/push",
        "private": false,
        scopes: [
          "homey.notifications"
        ],
        parameters: {
          uri: {
            "in": "path",
            type: "string",
            required: true
          },
          push: {
            "in": "body",
            type: "boolean",
            required: true
          }
        }
      }
    }
  },
  ManagerPremium: {
    id: "premium",
    idCamelCase: "premium",
    items: {},
    operations: {}
  },
  ManagerPresence: {
    id: "presence",
    idCamelCase: "presence",
    items: {},
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      setPresentMe: {
        method: "put",
        path: "/me/present",
        "private": false,
        scopes: [
          "homey.presence.self"
        ],
        parameters: {
          value: {
            "in": "body",
            type: "boolean"
          },
          opts: {
            "in": "body",
            type: "object",
            properties: {
              forceFlowTrigger: {
                type: "boolean"
              }
            }
          }
        }
      },
      setPresent: {
        method: "put",
        path: "/:id/present",
        "private": false,
        scopes: [
          "homey.presence"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          value: {
            "in": "body",
            type: "boolean"
          }
        }
      },
      getPresent: {
        method: "get",
        path: "/:id/present",
        "private": false,
        scopes: [
          "homey.presence.readonly"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      setAsleepMe: {
        method: "put",
        path: "/me/asleep",
        "private": false,
        scopes: [
          "homey.presence.self"
        ],
        parameters: {
          value: {
            "in": "body",
            type: "boolean"
          },
          opts: {
            "in": "body",
            type: "object",
            properties: {
              forceFlowTrigger: {
                type: "boolean"
              }
            }
          }
        }
      },
      setAsleep: {
        method: "put",
        path: "/:id/asleep",
        "private": false,
        scopes: [
          "homey.presence"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          value: {
            "in": "body",
            type: "boolean"
          }
        }
      },
      getAsleep: {
        method: "get",
        path: "/:id/asleep",
        "private": false,
        scopes: [
          "homey.presence.readonly"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      }
    }
  },
  ManagerRF: {
    id: "rf",
    idCamelCase: "rf",
    items: {
      Signal: {
        id: "signal",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      record: {
        method: "post",
        path: "/record",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          frequency: {
            "in": "body",
            type: "string"
          },
          timeout: {
            "in": "body",
            type: "number"
          }
        }
      },
      replay: {
        method: "post",
        path: "/replay",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          frequency: {
            "in": "body",
            type: "string",
            required: true
          },
          data: {
            "in": "body",
            type: "array",
            required: true
          }
        }
      },
      emulate: {
        method: "post",
        path: "/:frequency/emulate",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          frequency: {
            "in": "path",
            type: "string",
            required: true
          },
          data: {
            "in": "body",
            type: "array",
            root: true,
            required: true
          }
        }
      },
      set433MHzConfig: {
        method: "post",
        path: "/mhz433/config",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          modulation: {
            "in": "body",
            type: "string"
          },
          carrier: {
            "in": "body",
            type: "number"
          },
          deviation: {
            "in": "body",
            type: "number"
          },
          channelSpacing: {
            "in": "body",
            type: "number"
          },
          filterBandwidth: {
            "in": "body",
            type: "number"
          },
          baudrate: {
            "in": "body",
            type: "number"
          },
          power: {
            "in": "body",
            type: "number"
          }
        }
      },
      txInfraredProntohex: {
        method: "post",
        path: "/ir/prontohex",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          payload: {
            "in": "body",
            type: "string",
            required: true
          },
          repetitions: {
            "in": "body",
            type: "number"
          }
        }
      }
    }
  },
  ManagerSafety: {
    id: "safety",
    idCamelCase: "safety",
    items: {},
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      }
    }
  },
  ManagerSecurity: {
    id: "security",
    idCamelCase: "security",
    items: {},
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      }
    }
  },
  ManagerSessions: {
    id: "sessions",
    idCamelCase: "sessions",
    items: {
      Session: {
        id: "session",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid"
            },
            type: {
              type: "string",
              "enum": [
                "OAUTH",
                "APP",
                "PAT"
              ]
            },
            scopes: {
              description: "These are the requested scopes",
              type: "array",
              items: {
                type: "string"
              }
            },
            intersectedScopes: {
              description: "These are the actual available scopes. This is an intersection between the requested scopes and the user's scopes.",
              type: "array",
              items: {
                type: "string"
              }
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getSessionMe: {
        method: "get",
        path: "/session/me",
        "private": false,
        scopes: [],
        parameters: {}
      }
    }
  },
  ManagerSystem: {
    id: "system",
    idCamelCase: "system",
    items: {},
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      ping: {
        method: "get",
        path: "/ping",
        "private": false,
        scopes: [],
        parameters: {}
      },
      getInfo: {
        method: "get",
        path: "/",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getSystemName: {
        method: "get",
        path: "/name",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      setSystemName: {
        method: "put",
        path: "/name",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          name: {
            "in": "body",
            type: "string",
            required: true
          }
        }
      },
      reboot: {
        method: "post",
        path: "/reboot",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {}
      },
      sendLog: {
        method: "post",
        path: "/journalctl",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {
          append: {
            "in": "body",
            type: "string"
          }
        }
      },
      "delete": {
        method: "post",
        path: "/delete",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {}
      },
      getMemoryInfo: {
        method: "get",
        path: "/memory",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getStorageInfo: {
        method: "get",
        path: "/storage",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      }
    }
  },
  ManagerUsers: {
    id: "users",
    idCamelCase: "users",
    items: {
      User: {
        id: "user",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      login: {
        method: "post",
        path: "/login",
        "private": false,
        scopes: [],
        parameters: {
          token: {
            "in": "body",
            type: "string",
            required: true
          }
        }
      },
      getUserMe: {
        method: "get",
        path: "/user/me",
        "private": false,
        scopes: [
          "homey.user.self"
        ],
        parameters: {}
      },
      updateUserMe: {
        method: "put",
        path: "/user/me",
        "private": false,
        scopes: [
          "homey.user.self"
        ],
        parameters: {
          name: {
            "in": "body",
            type: "string"
          }
        }
      },
      deleteUserMe: {
        method: "delete",
        path: "/user/me",
        "private": false,
        scopes: [
          "homey.user.self"
        ],
        parameters: {}
      },
      getUsers: {
        method: "get",
        path: "/user",
        "private": false,
        scopes: [
          "homey.user.readonly"
        ],
        crud: {
          type: "getAll",
          item: "User"
        },
        parameters: {}
      },
      getUser: {
        method: "get",
        path: "/user/:id",
        "private": false,
        scopes: [
          "homey.user.readonly"
        ],
        crud: {
          type: "getOne",
          item: "User"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      createUser: {
        method: "post",
        path: "/user",
        "private": false,
        scopes: [
          "homey.user"
        ],
        crud: {
          type: "createOne",
          item: "User"
        },
        parameters: {
          user: {
            "in": "body",
            type: "object",
            root: true,
            required: true,
            properties: {
              role: {
                type: "string",
                required: true
              }
            }
          }
        }
      },
      updateUser: {
        method: "put",
        path: "/user/:id",
        "private": false,
        scopes: [
          "homey.user"
        ],
        crud: {
          type: "updateOne",
          item: "User"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          user: {
            "in": "body",
            type: "object",
            root: true,
            required: true,
            properties: {
              role: {
                type: "string"
              },
              enabled: {
                type: "boolean"
              }
            }
          }
        }
      },
      deleteUser: {
        method: "delete",
        path: "/user/:id",
        "private": false,
        scopes: [
          "homey.user"
        ],
        crud: {
          type: "deleteOne",
          item: "User"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      updateUserMeProperties: {
        method: "put",
        path: "/user/me/properties/:id",
        "private": false,
        scopes: [
          "homey.user.self"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          value: {
            "in": "body",
            type: "object",
            required: true
          }
        }
      },
      deleteUserMeProperties: {
        method: "delete",
        path: "/user/me/properties/:id",
        "private": false,
        scopes: [
          "homey.user.self"
        ],
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      acceptSharingInvite: {
        method: "post",
        path: "/accept",
        "private": false,
        scopes: [],
        parameters: {
          secret: {
            "in": "body",
            type: "string",
            required: true
          },
          athomId: {
            "in": "body",
            type: "string",
            required: true
          },
          inviteToken: {
            "in": "body",
            type: "string",
            required: true
          },
          name: {
            "in": "body",
            type: "string",
            required: true
          }
        }
      }
    }
  },
  ManagerVirtualDevice: {
    id: "vdevice",
    idCamelCase: "vdevice",
    items: {
      VirtualDriverDummySocket: {
        id: "virtualdriverdummysocket",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      VirtualDeviceDummySocket: {
        id: "virtualdevicedummysocket",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      VirtualDriverZwave: {
        id: "virtualdriverzwave",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      VirtualDeviceZwave: {
        id: "virtualdevicezwave",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      VirtualDriverZigbee: {
        id: "virtualdriverzigbee",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      VirtualDeviceZigbee: {
        id: "virtualdevicezigbee",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      VirtualDriverInfrared: {
        id: "virtualdriverinfrared",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      VirtualDeviceInfrared: {
        id: "virtualdeviceinfrared",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      VirtualDriverHomeyBridge: {
        id: "virtualdriverbridge",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      },
      VirtualDeviceHomeyBridge: {
        id: "virtualdevicebridge",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      }
    }
  },
  ManagerWeather: {
    id: "weather",
    idCamelCase: "weather",
    items: {},
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getWeather: {
        method: "get",
        path: "/weather",
        "private": false,
        scopes: [
          "homey.geolocation.readonly"
        ],
        parameters: {}
      }
    }
  },
  ManagerWebserver: {
    id: "webserver",
    idCamelCase: "webserver",
    items: {},
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      }
    }
  },
  ManagerZones: {
    id: "zones",
    idCamelCase: "zones",
    items: {
      Zone: {
        id: "zone",
        schema: {
          type: "object",
          properties: {
            id: {
              type: "string"
            }
          }
        }
      }
    },
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      getZones: {
        method: "get",
        path: "/zone",
        "private": false,
        scopes: [
          "homey.zone.readonly"
        ],
        crud: {
          type: "getAll",
          item: "Zone"
        },
        parameters: {}
      },
      getZone: {
        method: "get",
        path: "/zone/:id",
        "private": false,
        scopes: [
          "homey.zone.readonly"
        ],
        crud: {
          type: "getOne",
          item: "Zone"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      },
      createZone: {
        method: "post",
        path: "/zone",
        "private": false,
        scopes: [
          "homey.zone"
        ],
        crud: {
          type: "createOne",
          item: "Zone"
        },
        parameters: {
          zone: {
            "in": "body",
            type: "object",
            root: true,
            required: true,
            properties: {
              name: {
                type: "string",
                required: true
              },
              icon: {
                type: "string",
                required: true
              },
              parent: {
                type: "string",
                required: true
              }
            }
          }
        }
      },
      updateZone: {
        method: "put",
        path: "/zone/:id",
        "private": false,
        scopes: [
          "homey.zone"
        ],
        crud: {
          type: "updateOne",
          item: "Zone"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          },
          zone: {
            "in": "body",
            type: "object",
            root: true,
            required: true,
            properties: {
              name: {
                type: "string"
              },
              icon: {
                type: "string"
              },
              parent: {
                type: "string"
              }
            }
          }
        }
      },
      deleteZone: {
        method: "delete",
        path: "/zone/:id",
        "private": false,
        scopes: [
          "homey.zone"
        ],
        crud: {
          type: "deleteOne",
          item: "Zone"
        },
        parameters: {
          id: {
            "in": "path",
            type: "string",
            required: true
          }
        }
      }
    }
  },
  ManagerZwave: {
    id: "zwave",
    idCamelCase: "zwave",
    items: {},
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      runCommand: {
        method: "post",
        path: "/command",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          command: {
            "in": "body",
            type: "string",
            required: true
          },
          opts: {
            "in": "body",
            type: "object"
          }
        }
      }
    }
  },
  ManagerZigbee: {
    id: "zigbee",
    idCamelCase: "zigbee",
    items: {},
    operations: {
      getState: {
        method: "get",
        path: "/state",
        "private": false,
        scopes: [
          "homey.system.readonly"
        ],
        parameters: {}
      },
      runCommand: {
        method: "post",
        path: "/command",
        "private": false,
        scopes: [
          "homey.system"
        ],
        parameters: {
          command: {
            "in": "body",
            type: "string",
            required: true
          },
          opts: {
            "in": "body",
            type: "object"
          }
        }
      },
      verifyFirmware: {
        method: "get",
        path: "/verify-firmware",
        "private": true,
        scopes: [
          "homey.system"
        ],
        parameters: {}
      },
      flashFirmware: {
        method: "put",
        path: "/flash-firmware",
        "private": true,
        scopes: [
          "homey.system"
        ],
        parameters: {
          keepNV: {
            "in": "body",
            type: "boolean",
            required: true
          }
        }
      },
      getLastFlashResult: {
        method: "get",
        path: "/get-last-flash-result",
        "private": true,
        scopes: [
          "homey.system"
        ],
        parameters: {}
      },
      eraseNV: {
        method: "put",
        path: "/erase-nv",
        "private": true,
        scopes: [
          "homey.system"
        ],
        parameters: {}
      }
    }
  }
};
const require$$1 = {
  managers
};
var HomeyAPIV3Cloud_1;
var hasRequiredHomeyAPIV3Cloud;
function requireHomeyAPIV3Cloud() {
  if (hasRequiredHomeyAPIV3Cloud)
    return HomeyAPIV3Cloud_1;
  hasRequiredHomeyAPIV3Cloud = 1;
  const HomeyAPIV3 = requireHomeyAPIV3();
  const _HomeyAPIV3Cloud = class extends HomeyAPIV3 {
    constructor({
      strategy = [
        _HomeyAPIV3Cloud.DISCOVERY_STRATEGIES.CLOUD
      ],
      ...props
    }) {
      super({
        strategy,
        ...props
      });
    }
    get platform() {
      return "cloud";
    }
    get platformVersion() {
      return 1;
    }
    getSpecification() {
      return require$$1;
    }
  };
  let HomeyAPIV3Cloud2 = _HomeyAPIV3Cloud;
  /**
   * Possible Discovery Strategies
   * @static
   * @property {object} DISCOVERY_STRATEGIES
   * @property {string} DISCOVERY_STRATEGIES.CLOUD - Cloud HTTPS, e.g. `https://abcdef.connect.athom.com`.
   */
  __publicField(HomeyAPIV3Cloud2, "DISCOVERY_STRATEGIES", {
    CLOUD: "cloud"
  });
  HomeyAPIV3Cloud_1 = HomeyAPIV3Cloud2;
  return HomeyAPIV3Cloud_1;
}
var HomeyAPI_1;
var hasRequiredHomeyAPI;
function requireHomeyAPI() {
  if (hasRequiredHomeyAPI)
    return HomeyAPI_1;
  hasRequiredHomeyAPI = 1;
  const Util3 = Util_1;
  class HomeyAPI2 {
    constructor({
      api = null,
      properties = {},
      debug: debug2 = () => {
      }
    }) {
      Object.defineProperty(this, "__debugFunction", {
        value: debug2,
        enumerable: false,
        writable: true
      });
      Object.defineProperty(this, "__api", {
        value: api,
        enumerable: false,
        writable: true
      });
      Object.defineProperty(this, "id", {
        value: properties.id ?? properties._id ?? null,
        enumerable: true,
        writable: true
      });
      Object.defineProperty(this, "version", {
        value: properties.softwareVersion ?? null,
        enumerable: true,
        writable: true
      });
      Object.defineProperty(this, "name", {
        value: properties.name ?? null,
        enumerable: true,
        writable: true
      });
      Object.defineProperty(this, "language", {
        value: properties.language ?? null,
        enumerable: true,
        writable: true
      });
      Object.defineProperty(this, "role", {
        value: properties.role ?? null,
        enumerable: true,
        writable: true
      });
      Object.defineProperty(this, "__properties", {
        value: properties,
        enumerable: false,
        writable: false
      });
    }
    get _id() {
      throw new Error("HomeyAPI._id is not supported, please use HomeyAPI.id");
    }
    __debug(...props) {
      if (!this.__debugFunction)
        return;
      this.__debugFunction(...props);
    }
    /*
     * Storage
    */
    async __getStore() {
      if (!this.__api)
        return {};
      const store = await this.__api.__getStore();
      return store[`homey-${this.id}`] || {};
    }
    async __setStore(value) {
      if (!this.__api)
        return;
      const store = await this.__getStore();
      await this.__api.__setStore({
        [`homey-${this.id}`]: {
          ...store,
          ...value
        }
      });
    }
    /*
     * Internationalization
     */
    /**
    * Translates an i18n-object (e.g. `{ en: 'My String', nl: 'Mijn tekst' }` to a string.
    * Uses the language of Homey as defined in {@link Homey}.
    * @param {object} input
    * @param {string} input.en - English translation
    * @param {string} input.nl - Dutch translation
    * @returns {string|null} - The translated string, or null
    * @example
    * homeyApi.__({
    *   en: 'Hello',
    *   nl: 'Hallo',
    *   fr: 'Bonjour',
    * }); // returns "Hello" if Homey is set to English
    */
    __(input) {
      if (typeof input === "object" && input !== null) {
        if (typeof input[this.__properties.language] === "string") {
          return input[this.__properties.language];
        }
        if (typeof input["en"] === "string") {
          return input["en"];
        }
      }
      return null;
    }
    /**
     * Check the current role.
     * @param {string} roleId - The role ID, e.g. `owner`, `manager`, `user` or `guest`.
     */
    hasRole(roleId) {
      return this.role === roleId;
    }
    /**
     * Creates a {@link HomeyAPIV3Local} or {@link HomeyAPIV2} instance for use in the Apps SDK.
     * @param {Object} opts
     * @param {Homey} opts.homey — Homey (Apps SDK) instance.
     * @param {Function|null} [opts.debug=null] — Debug function, defaults to `null`.
     * @example
     * const { HomeyAPI } = require('homey-api');
     *
     * module.exports = class MyApp extends Homey.App {
     *
     *   async onInit() {
     *     // Create a HomeyAPI instance. Ensure your app has the `homey:manager:api` permission.
     *     this.homeyApi = await HomeyAPI.createAppAPI({
     *       homey: this.homey,
     *     });
     *
     *     // Get all the devices, and log their names.
     *     const devices = await this.{@link HomeyAPIV3Local homeyApi}.{@link HomeyAPIV3Local.ManagerDevices devices}.{@link HomeyAPIV3Local.ManagerDevices#getDevices getDevices}();
     *     for(const device of Object.values(devices)) {
     *       this.log(device.name);
     *     }
     *   }
     *
     * }
     */
    static async createAppAPI({
      homey,
      debug: debug2 = null
    } = {}) {
      if (!homey) {
        throw new Error("Invalid Homey");
      }
      if (debug2 === true) {
        debug2 = (...props2) => homey.app.log("[homey-api]", ...props2);
      }
      const props = {
        debug: debug2 ?? function debug3() {
        },
        token: await homey.api.getOwnerApiToken(),
        baseUrl: await homey.api.getLocalUrl(),
        strategy: [],
        properties: {
          id: await homey.cloud.getHomeyId(),
          softwareVersion: homey.version
        }
      };
      if (homey.platform === "local" && homey.platformVersion === 1) {
        const HomeyAPIV22 = requireHomeyAPIV2();
        return new HomeyAPIV22(props);
      }
      if (homey.platform === "local" && homey.platformVersion === 2) {
        const HomeyAPIV3Local2 = requireHomeyAPIV3Local();
        return new HomeyAPIV3Local2(props);
      }
      if (homey.platform === "cloud" && homey.platformVersion === 2) {
        const HomeyAPIV3Cloud2 = requireHomeyAPIV3Cloud();
        return new HomeyAPIV3Cloud2(props);
      }
      throw new Error(`Invalid Homey Platform Version: ${homey.platformVersion}`);
    }
    /**
     * Creates a {@link HomeyAPIV3Local} instance for use in a project.
     * @param {Object} opts
     * @param {String} opts.address — The address of the Homey, e.g. `http://192.168.1.123:80`.
     * @param {String} opts.token — A Personal Access Token created in the Homey Web App.
     * @param {Function|null} opts.debug — Debug function, defaults to `null`.
     * @example
     * import { HomeyAPI } from 'homey-api';
     * const homeyApi = await HomeyAPI.createLocalAPI({
     *   address: 'http://192.169.1.123',
     *   token: '<my_personal_access_token>',
     * });
     * const devices = await homeyApi.devices.getDevices();
     */
    static async createLocalAPI({
      address,
      token,
      debug: debug2 = null
    }) {
      if (!address) {
        throw new Error("Invalid Address");
      }
      if (!token) {
        throw new Error("Invalid Token");
      }
      const res = await Util3.fetch(`${address}/api/manager/system/ping`);
      if (!res.headers.has("X-Homey-ID")) {
        throw new Error(`No Homey Found At Address: ${address}`);
      }
      const props = {
        token,
        debug: debug2 ?? function debug3() {
        },
        baseUrl: address,
        strategy: [],
        properties: {
          id: res.headers.get("X-Homey-ID"),
          softwareVersion: res.headers.get("X-Homey-Version")
        }
      };
      const HomeyAPIV3Local2 = requireHomeyAPIV3Local();
      return new HomeyAPIV3Local2(props);
    }
  }
  /**
   * Platforms
   * @memberof HomeyAPI
   * @property {object} PLATFORMS
   * @property {string} PLATFORMS.LOCAL - Homey (2016 — 2019) & Homey Pro (2019 — 2023)
   * @property {string} PLATFORMS.CLOUD - Homey Cloud
   * @static
   */
  __publicField(HomeyAPI2, "PLATFORMS", {
    LOCAL: "local",
    CLOUD: "cloud"
  });
  /**
   * Discovery Strategies
   * @memberof HomeyAPI
   * @property {object} DISCOVERY_STRATEGIES
   * @property {string} DISCOVERY_STRATEGIES.CLOUD - Cloud HTTPS, e.g. `https://abcdef.connect.athom.com`.
   * @property {string} DISCOVERY_STRATEGIES.MDNS - Local HTTP, e.g. `http://homey-abcdef.local`
   * @property {string} DISCOVERY_STRATEGIES.LOCAL - Local HTTP, e.g. `http://192.168.1.100`.
   * @property {string} DISCOVERY_STRATEGIES.LOCAL_SECURE - Local HTTPS, e.g. `https://192-168-1-100.homey.homeylocal.com`.
   * @property {string} DISCOVERY_STRATEGIES.REMOTE_FORWARDED - Remote HTTPS, e.g. `https://12-34-56-78.homey.homeylocal.com:12345`.
   * @static
   */
  __publicField(HomeyAPI2, "DISCOVERY_STRATEGIES", {
    MDNS: "mdns",
    CLOUD: "cloud",
    LOCAL: "local",
    LOCAL_SECURE: "localSecure",
    REMOTE_FORWARDED: "remoteForwarded"
  });
  HomeyAPI_1 = HomeyAPI2;
  return HomeyAPI_1;
}
const Util$1 = Util_1;
const APIError$1 = APIError_1;
let API$1 = (_a = class {
  constructor({
    baseUrl,
    debug: debug2 = false,
    secret = null
  } = {}) {
    const debugEnvKey = `${Util$1.envKey(this.constructor.name)}_DEBUG`;
    const debugEnv = Util$1.env(debugEnvKey);
    Object.defineProperty(this, "__debugEnabled", {
      value: debugEnv !== null ? !!debugEnv : !!debug2,
      enumerable: false,
      writable: true
    });
    const secretEnvKey = `${Util$1.envKey(this.constructor.name)}_SECRET`;
    const secretEnv = Util$1.env(secretEnvKey);
    Object.defineProperty(this, "__secret", {
      value: secretEnv !== null ? secretEnv : secret,
      enumerable: false,
      writable: false
    });
    const baseUrlEnvKey = `${Util$1.envKey(this.constructor.name)}_BASEURL`;
    const baseUrlEnv = Util$1.env(baseUrlEnvKey);
    this.baseUrl = baseUrlEnv || baseUrl || `https://${this.constructor.SPECIFICATION.host}${this.constructor.SPECIFICATION.basePath}`;
    if (this.baseUrl.endsWith("/"))
      this.baseUrl = this.baseUrl.substring(0, this.baseUrl.length - 1);
    for (const [operationId, operation] of Object.entries(this.constructor.SPECIFICATION.operations || {})) {
      this.__registerOperation(operationId, operation);
    }
  }
  __registerOperation(operationId, operation) {
    if (this[operationId])
      return;
    this[operationId] = async ({
      $validate = true,
      $timeout = 1e4,
      $timeoutMessage = null,
      $body = {},
      $query = {},
      $headers = {},
      $token = null,
      ...args
    } = {}) => {
      let pathWithParameters = operation.path;
      let body = { ...$body };
      const query = { ...$query };
      const headers = { ...$headers };
      Object.entries(operation.parameters || {}).forEach(([parameterId, parameter]) => {
        let value = args[parameterId];
        if (parameterId === "secret" && typeof value === "undefined" && typeof this.__secret === "string") {
          value = this.__secret;
        }
        if (typeof $token === "string") {
          headers.Authorization = `Bearer ${$token}`;
        }
        if ($validate) {
          if (parameter.required === true && typeof value === "undefined") {
            throw new Error(`Missing Parameter: ${parameterId}`);
          }
          if (typeof value !== "undefined") {
            if (parameter.in !== "query" && parameter.type === "string" && typeof value !== "string") {
              throw new Error(`Invalid Parameter Type: ${parameterId}. Got: ${typeof value}. Expected: string`);
            }
            if (parameter.type === "number" && typeof value !== "number") {
              throw new Error(`Invalid Parameter Type: ${parameterId}. Got: ${typeof value}. Expected: number`);
            }
            if (parameter.type === "boolean" && typeof value !== "boolean") {
              throw new Error(`Invalid Parameter Type: ${parameterId}. Got: ${typeof value}. Expected: boolean`);
            }
          }
        }
        if (typeof value !== "undefined") {
          switch (parameter.in) {
            case "path": {
              pathWithParameters = pathWithParameters.replace(`{${parameterId}}`, value);
              break;
            }
            case "query": {
              query[parameterId] = value;
              break;
            }
            case "body": {
              if (parameter.unpack) {
                body = {
                  ...body,
                  ...value
                };
              } else {
                body[parameterId] = value;
              }
              break;
            }
            default: {
              throw new Error(`Invalid 'in': ${parameter.in}`);
            }
          }
        }
      });
      return this.call({
        method: operation.method,
        headers,
        query,
        body,
        path: pathWithParameters,
        context: { operation },
        timeout: $timeout,
        timeoutMessage: $timeoutMessage
      }).catch((err) => {
        if (typeof this.__secret === "string" && err.message.includes(this.__secret)) {
          err.message = err.message.replace(this.__secret, "<redacted>");
        }
        throw err;
      });
    };
  }
  __debug(...props) {
    if (!this.__debugEnabled)
      return;
    console.log("[homey-api]", `[${this.constructor.name}]`, ...props);
  }
  async call(request) {
    request = await this.onCallRequestPrepare({ request });
    let response = await this.onCallRequestExecute({ request });
    response = await this.onCallResponse({ request, response });
    return response;
  }
  async onCallRequestPrepare({ request }) {
    request.context = {
      ...request.context
    };
    request.method = String(request.method).toUpperCase();
    request.headers = {
      ...request.headers,
      ...await this.onCallRequestHeaders({ request })
    };
    request.timeout = request.timeout || 1e4;
    request.timeoutMessage = request.timeoutMessage || `Timeout after ${request.timeout}ms`;
    request.url = `${this.baseUrl}${request.path}`;
    if (request.query) {
      if (Object.keys(request.query).length) {
        request.url += `?${Util$1.serializeQueryObject(request.query)}`;
      }
    }
    if (["PUT", "POST", "DELETE"].includes(request.method)) {
      if (request.body && request.bodyJSON !== false) {
        request.headers["Content-Type"] = "application/json";
        if (!request.bodyModified) {
          request.body = JSON.stringify(request.body);
          request.bodyModified = true;
        }
        delete request.bodyJSON;
      }
    } else {
      delete request.body;
    }
    return request;
  }
  async onCallRequestExecute({ request }) {
    this.__debug("onCallRequestExecute", request);
    return Util$1.timeout(Util$1.fetch(request.url, {
      method: request.method,
      headers: request.headers,
      body: request.body
    }), request.timeout, request.timeoutMessage);
  }
  async onCallResponse({ request, response }) {
    const statusCode = response.status;
    const { statusText } = response;
    const responseOK = response.ok;
    if (statusCode === 204)
      return void 0;
    const body = await this.onCallResponseParseBody({
      request,
      response
    });
    if (responseOK) {
      return this.onCallResponseOK({
        request,
        body,
        statusCode,
        statusText
      });
    }
    return this.onCallResponseNotOK({
      request,
      body,
      statusCode,
      statusText
    });
  }
  // eslint-disable-next-line no-unused-vars
  async onCallRequestHeaders({ request }) {
    return {};
  }
  async onCallResponseParseBody({ response }) {
    const responseContentType = response.headers.get("Content-Type");
    const responseText = await response.text();
    if (responseContentType && responseContentType.toLowerCase().includes("application/json")) {
      try {
        const parsed = JSON.parse(responseText);
        return parsed;
      } catch (err) {
        throw new Error(`Failed to parse response body as JSON: ${err.message}`);
      }
    }
    return responseText;
  }
  async onCallResponseOK({
    // eslint-disable-next-line no-unused-vars
    context,
    body,
    // eslint-disable-next-line no-unused-vars
    statusCode,
    // eslint-disable-next-line no-unused-vars
    statusText
  }) {
    if (typeof body !== "object" || body === null) {
      return body;
    }
    if (body.status != null && body.result != null) {
      return body.result;
    }
    if (body.success != null && body.message != null) {
      return body.message;
    }
    return body;
  }
  async onCallResponseNotOK({
    // eslint-disable-next-line no-unused-vars
    context,
    body,
    statusCode,
    statusText
  }) {
    this.__debug("Error:", body);
    let message = statusText;
    if (typeof body.error_description === "string") {
      message = body.error_description;
    } else if (typeof body.error_message === "string") {
      message = body.error_message;
    } else if (typeof body.error === "string") {
      message = body.error;
    } else if (typeof body.message === "string") {
      message = body.message;
    } else if (typeof body.result === "string") {
      message = body.result;
    }
    throw new APIError$1(message, statusCode);
  }
}, __publicField(_a, "SPECIFICATION", null), __publicField(_a, "SPECIFICATION_URL", null), __publicField(_a, "DEFINITION_CLASSES", {}), __publicField(_a, "JSDOC_PARAMS", null), __publicField(_a, "JSDOC_DESCRIPTION", null), __publicField(_a, "JSDOC_PRIVATE", null), __publicField(_a, "JSDOC_EXAMPLE", null), _a);
var API_1 = API$1;
let APIDefinition$3 = class APIDefinition {
  /**
   *
   * @param {object} opts
   * @param {import('./API.js')} opts.api
   * @param {object} opts.properties
   */
  constructor({
    api = null,
    properties = {}
  }) {
    Object.defineProperty(this, "__api", {
      value: api,
      enumerable: false,
      writable: false
    });
    Object.defineProperty(this, "__properties", {
      value: properties,
      enumerable: false,
      writable: false
    });
    for (const key of Object.keys(properties)) {
      if (typeof this[key] !== "undefined")
        continue;
      this[key] = properties[key];
    }
  }
  __makeClass(Class, properties) {
    return new Class({
      properties,
      api: this.__api
    });
  }
};
var APIDefinition_1 = APIDefinition$3;
const HomeyAPI = requireHomeyAPI();
let HomeyAPIV1$1 = class HomeyAPIV1 extends HomeyAPI {
  constructor({ properties, ...props }) {
    super({ properties, ...props });
    __publicField(this, "updates", {
      async getUpdates() {
        throw new Error("Not Implemented");
      },
      async installUpdate() {
        throw new Error("Not Implemented");
      },
      async getState() {
        throw new Error("Not Implemented");
      }
    });
    const { token } = this.__properties;
    this.token = token;
  }
  get platform() {
    return "local";
  }
  get platformVersion() {
    return 1;
  }
  async login() {
    if (!this.token) {
      throw new Error("Missing Token");
    }
  }
};
var HomeyAPIV1_1 = HomeyAPIV1$1;
const APIDefinition$2 = APIDefinition_1;
const HomeyAPIV12 = HomeyAPIV1_1;
const HomeyAPIV2 = requireHomeyAPIV2();
const HomeyAPIV3Local = requireHomeyAPIV3Local();
const HomeyAPIV3Cloud = requireHomeyAPIV3Cloud();
let Homey$2 = class Homey extends APIDefinition$2 {
  /**
   * @type string
   */
  get id() {
    return this._id;
  }
  /**
   * This method returns a {@link HomeyAPI} instance matching the Homey's API level and platform.
   * Additionally, it ensures a session on the Homey during initialization.
   * @param {object} [opts]
   * @param {string|array} [opts.strategy] - One string, or an array of {@link HomeyAPI#DISCOVERY_STRATEGIES} strings, to connect to the Homey.
   * @returns {Promise<HomeyAPI>}
   */
  async authenticate({ strategy } = {}) {
    const HomeyAPI2 = (() => {
      if (this.apiVersion === 1)
        return HomeyAPIV12;
      if (this.apiVersion === 2)
        return HomeyAPIV2;
      if (this.apiVersion === 3 && this.platform === "local")
        return HomeyAPIV3Local;
      if (this.apiVersion === 3 && this.platform === "cloud")
        return HomeyAPIV3Cloud;
      throw new Error(`Unsupported Homey API Version: ${this.apiVersion}`);
    })();
    const homey = new HomeyAPI2({
      strategy,
      api: this.__api,
      properties: this.__properties,
      debug: (...props) => {
        return this.__api.__debug(`[${HomeyAPI2.name}:${this.__properties.id}]`, ...props);
      }
    });
    await homey.login();
    return homey;
  }
};
var Homey_1 = Homey$2;
const APIDefinition$1 = APIDefinition_1;
let Device$1 = class Device extends APIDefinition$1 {
  /**
   * @type string
   */
  get id() {
    return this._id;
  }
};
var Device_1 = Device$1;
const APIDefinition2 = APIDefinition_1;
const Homey$1 = Homey_1;
const Device2 = Device_1;
let User$1 = class User extends APIDefinition2 {
  constructor({ ...props }) {
    super({ ...props });
    this.homeys = this.homeys.map((item) => this.__makeClass(Homey$1, item));
    this.devices = this.devices.map((item) => this.__makeClass(Device2, item));
  }
  /**
   * @type {string}
   */
  get id() {
    return this._id;
  }
  /**
   * @returns {AthomCloudAPI.Homey[]}
   */
  getHomeys() {
    return this.homeys;
  }
  /**
   * @param {string} id - Homey ID
   * @returns {AthomCloudAPI.Homey}
   */
  getHomeyById(id) {
    const homey = this.homeys.find((homey2) => homey2.id === id);
    if (!homey) {
      throw new Error(`Homey Not Found: ${id}`);
    }
    return homey;
  }
  /**
   * @returns {AthomCloudAPI.Homey}
   */
  getFirstHomey() {
    const homey = this.homeys[0];
    if (!homey) {
      throw new Error("No Homey Available");
    }
    return homey;
  }
  hasRole(roleId) {
    return this.roleIds.includes(roleId);
  }
};
var User_1 = User$1;
let Token$1 = class Token {
  constructor({
    token_type,
    access_token,
    refresh_token,
    expires_in,
    grant_type
  }) {
    this.token_type = token_type;
    this.access_token = access_token;
    this.refresh_token = refresh_token;
    this.expires_in = expires_in;
    this.grant_type = grant_type;
  }
  toJSON() {
    return {
      token_type: this.token_type,
      access_token: this.access_token,
      refresh_token: this.refresh_token,
      expires_in: this.expires_in,
      grant_type: this.grant_type
    };
  }
};
var Token_1 = Token$1;
let StorageAdapter$3 = class StorageAdapter {
  /**
   * @returns {Promise<object>}
   */
  async get() {
    throw new Error("Not Implemented: StorageAdapter.get()");
  }
  /**
   * @param {object} value
   * @returns {Promise<void>}
   */
  // eslint-disable-next-line no-unused-vars
  async set(value) {
    throw new Error("Not Implemented: StorageAdapter.set()");
  }
};
var StorageAdapter_1 = StorageAdapter$3;
const StorageAdapter$2 = StorageAdapter_1;
let StorageAdapterBrowser$1 = (_b = class extends StorageAdapter$2 {
  /**
   * @returns {Promise<object>}
   */
  async get() {
    try {
      return JSON.parse(window.localStorage.getItem(this.constructor.LOCAL_STORAGE_KEY) || "{}");
    } catch (err) {
      return {};
    }
  }
  /**
   * @param {object} value
   * @returns {Promise<void>}
   */
  async set(value) {
    window.localStorage.setItem(this.constructor.LOCAL_STORAGE_KEY, JSON.stringify(value));
  }
}, __publicField(_b, "LOCAL_STORAGE_KEY", "homey-api"), _b);
var StorageAdapterBrowser_1 = StorageAdapterBrowser$1;
const StorageAdapter$1 = StorageAdapter_1;
let StorageAdapterMemory$1 = class StorageAdapterMemory extends StorageAdapter$1 {
  constructor() {
    super();
    this.__store = "{}";
  }
  /**
   * @returns {Promise<object>}
   */
  async get() {
    return JSON.parse(this.__store);
  }
  /**
   * @param {object} value
   * @returns {Promise<void>}
   */
  async set(value) {
    this.__store = JSON.stringify(value);
  }
};
var StorageAdapterMemory_1 = StorageAdapterMemory$1;
const host = "api.athom.com";
const basePath = "/";
const operations = {
  createDelegationToken: {
    path: "/delegation/token",
    method: "post",
    "private": true,
    parameters: {
      audience: {
        "in": "query",
        type: "string"
      },
      meta: {
        "in": "body",
        type: "object",
        unpack: true
      }
    }
  },
  verifyDelegationToken: {
    path: "/delegation/verify",
    method: "get",
    "private": true,
    parameters: {
      token: {
        "in": "query",
        type: "string"
      }
    }
  },
  getDelegationTokenKey: {
    path: "/delegation/key",
    method: "get",
    "private": true,
    parameters: {}
  },
  getAccessToken: {
    path: "/oauth2/token",
    method: "post",
    "private": true,
    parameters: {
      client_id: {
        "in": "formData",
        type: "string",
        required: true
      },
      client_secret: {
        "in": "formData",
        type: "string",
        required: true
      },
      grant_type: {
        "in": "formData",
        type: "string",
        required: true
      },
      refresh_token: {
        "in": "formData",
        type: "string"
      },
      code: {
        "in": "formData",
        type: "string"
      },
      username: {
        "in": "formData",
        type: "string"
      },
      password: {
        "in": "formData",
        type: "string"
      }
    }
  },
  forgotPassword: {
    path: "/login/password-forgotten",
    method: "post",
    "private": true,
    parameters: {
      email: {
        type: "string",
        "in": "body"
      }
    }
  },
  createUser: {
    path: "/user",
    method: "post",
    "private": true,
    parameters: {
      user: {
        "in": "body",
        type: "object",
        required: true,
        unpack: true,
        properties: {
          firstname: {
            type: "string"
          },
          lastname: {
            type: "string"
          },
          email: {
            type: "string"
          },
          password: {
            type: "string"
          },
          language: {
            type: "string"
          }
        }
      },
      newsletter: {
        "in": "query",
        type: "boolean"
      },
      gettingStarted: {
        "in": "query",
        type: "boolean"
      }
    }
  },
  getUser: {
    path: "/user/{id}",
    method: "get",
    "private": true,
    parameters: {
      id: {
        "in": "path",
        type: "string",
        required: true
      }
    }
  },
  updateUser: {
    path: "/user/{id}",
    method: "put",
    "private": true,
    parameters: {
      id: {
        "in": "path",
        type: "string",
        required: true
      },
      user: {
        "in": "body",
        type: "object",
        required: true,
        unpack: true,
        properties: {
          firstname: {
            type: "string"
          },
          lastname: {
            type: "string"
          },
          email: {
            type: "string"
          },
          language: {
            type: "string"
          },
          roles: {
            type: "array"
          },
          roleIds: {
            type: "array"
          },
          avatar: {},
          homeys: {
            type: "array"
          },
          devices: {
            type: "array"
          }
        }
      }
    }
  },
  deleteUser: {
    path: "/user/{id}",
    method: "delete",
    "private": true,
    parameters: {
      id: {
        "in": "path",
        type: "string",
        required: true
      },
      password: {
        type: "string",
        "in": "body"
      }
    }
  },
  createUserDevice: {
    path: "/user/{userId}/device",
    method: "post",
    "private": true,
    parameters: {
      userId: {
        "in": "path",
        type: "string",
        required: true
      },
      device: {
        "in": "body",
        type: "object",
        required: true,
        unpack: true,
        properties: {
          name: {
            type: "string"
          },
          platform: {
            type: "string"
          },
          token: {
            type: "string"
          },
          publicKey: {
            type: "string"
          },
          appVersion: {
            type: "string"
          },
          osVersion: {
            type: "string"
          },
          created: {
            type: "string"
          },
          updated: {
            type: "string"
          },
          devmode: {
            type: "boolean"
          }
        }
      }
    }
  },
  updateUserDevice: {
    path: "/user/{userId}/device/{deviceId}",
    method: "put",
    "private": true,
    parameters: {
      userId: {
        "in": "path",
        type: "string",
        required: true
      },
      deviceId: {
        "in": "path",
        type: "string",
        required: true
      },
      device: {
        "in": "body",
        type: "object",
        required: true,
        unpack: true,
        properties: {
          name: {
            type: "string"
          },
          platform: {
            type: "string"
          },
          token: {
            type: "string"
          },
          publicKey: {
            type: "string"
          },
          appVersion: {
            type: "string"
          },
          osVersion: {
            type: "string"
          },
          created: {
            type: "string"
          },
          updated: {
            type: "string"
          },
          devmode: {
            type: "boolean"
          }
        }
      }
    }
  },
  deleteUserDevice: {
    path: "/user/{userId}/device/{deviceId}",
    method: "delete",
    "private": true,
    parameters: {
      userId: {
        "in": "path",
        type: "string",
        required: true
      },
      deviceId: {
        "in": "path",
        type: "string",
        required: true
      }
    }
  },
  getUserAddresses: {
    path: "/user/{userId}/address",
    method: "get",
    "private": true,
    parameters: {
      userId: {
        "in": "path",
        type: "string",
        required: true
      }
    }
  },
  addUserAddress: {
    path: "/user/{userId}/address",
    method: "post",
    "private": true,
    parameters: {
      userId: {
        "in": "path",
        type: "string",
        required: true
      },
      address: {
        "in": "body",
        type: "object",
        unpack: true,
        properties: {
          street: {
            type: "string"
          },
          number: {
            type: "string"
          },
          zipcode: {
            type: "string"
          },
          city: {
            type: "string"
          },
          state: {
            type: "string"
          },
          country: {
            type: "string"
          },
          extra: {
            type: "string"
          },
          firstname: {
            type: "string"
          },
          lastname: {
            type: "string"
          }
        }
      }
    }
  },
  updateUserAddress: {
    path: "/user/{userId}/address/{addressId}",
    method: "put",
    "private": true,
    parameters: {
      userId: {
        "in": "path",
        type: "string",
        required: true
      },
      addressId: {
        "in": "path",
        type: "string",
        required: true
      },
      address: {
        "in": "body",
        type: "object",
        unpack: true,
        properties: {
          street: {
            type: "string"
          },
          number: {
            type: "string"
          },
          zipcode: {
            type: "string"
          },
          city: {
            type: "string"
          },
          state: {
            type: "string"
          },
          country: {
            type: "string"
          },
          extra: {
            type: "string"
          },
          firstname: {
            type: "string"
          },
          lastname: {
            type: "string"
          }
        }
      }
    }
  },
  deleteUserAddress: {
    path: "/user/{userId}/address/{addressId}",
    method: "delete",
    "private": true,
    parameters: {
      userId: {
        "in": "path",
        type: "string",
        required: true
      },
      addressId: {
        "in": "path",
        type: "string",
        required: true
      }
    }
  },
  updateUserSubscription: {
    path: "/user/{userId}/subscription/{subscriptionId}",
    method: "put",
    "private": true,
    parameters: {
      userId: {
        "in": "path",
        type: "string",
        required: true
      },
      subscriptionId: {
        "in": "path",
        type: "string",
        required: true
      },
      subscription: {
        "in": "body"
      }
    }
  },
  deleteUserSubscription: {
    path: "/user/{userId}/subscription/{subscriptionId}",
    method: "delete",
    "private": true,
    parameters: {
      userId: {
        "in": "path",
        type: "string",
        required: true
      },
      subscriptionId: {
        "in": "path",
        type: "string",
        required: true
      }
    }
  },
  addRoleAppDeveloperTrusted: {
    path: "/user/{userId}/role/app_developer_trusted",
    method: "put",
    "private": true,
    parameters: {
      userId: {
        "in": "path",
        type: "string",
        required: true
      }
    }
  },
  removeRoleAppDeveloperTrusted: {
    path: "/user/{userId}/role/app_developer_trusted",
    method: "delete",
    "private": true,
    parameters: {
      userId: {
        "in": "path",
        type: "string",
        required: true
      }
    }
  },
  getAuthenticatedUser: {
    path: "/user/me",
    method: "get",
    parameters: {
      additionalScopes: {
        "in": "query",
        type: "string"
      }
    }
  },
  updateAuthenticatedUserPassword: {
    path: "/user/me/password",
    method: "post",
    "private": true,
    parameters: {
      password: {
        type: "string",
        "in": "body"
      },
      old_password: {
        type: "string",
        "in": "body"
      }
    }
  },
  getUserProfile: {
    path: "/user/{userId}/profile",
    method: "get",
    "private": true,
    parameters: {
      userId: {
        "in": "path",
        type: "string",
        required: true
      }
    }
  },
  getUserSessions: {
    path: "/user/{userId}/session",
    method: "get",
    "private": true,
    parameters: {
      userId: {
        "in": "path",
        type: "string",
        required: true
      }
    }
  },
  deleteUserSession: {
    path: "/user/{userId}/session/{sessionId}",
    method: "delete",
    "private": true,
    parameters: {
      userId: {
        "in": "path",
        type: "string",
        required: true
      },
      sessionId: {
        "in": "path",
        type: "string",
        required: true
      }
    }
  },
  getBridges: {
    path: "/bridge/",
    method: "get",
    "private": true,
    parameters: {
      serial: {
        "in": "query",
        type: "string"
      },
      serialHash: {
        "in": "query",
        type: "string"
      }
    }
  },
  createBridge: {
    path: "/bridge/",
    method: "post",
    "private": true,
    parameters: {
      bridge: {
        "in": "body",
        type: "object",
        unpack: true,
        properties: {
          serial: {
            type: "string"
          },
          build: {
            type: "number"
          },
          zwaveCalibration: {
            type: "array"
          },
          manufacturedAt: {
            type: "string"
          },
          activationHistory: {
            type: "array"
          }
        }
      }
    }
  },
  getBridge: {
    path: "/bridge/{serial}",
    method: "get",
    "private": true,
    parameters: {
      serial: {
        "in": "path",
        type: "string",
        required: true
      }
    }
  },
  updateBridge: {
    path: "/bridge/{serial}",
    method: "put",
    "private": true,
    parameters: {
      serial: {
        "in": "path",
        type: "string",
        required: true
      },
      bridge: {
        "in": "body",
        type: "object",
        unpack: true,
        properties: {
          serial: {
            type: "string"
          },
          build: {
            type: "number"
          },
          zwaveCalibration: {
            type: "array"
          },
          manufacturedAt: {
            type: "string"
          },
          activationHistory: {
            type: "array"
          }
        }
      }
    }
  },
  activateBridge: {
    path: "/bridge/{serial}/activate",
    method: "post",
    "private": true,
    parameters: {
      serial: {
        "in": "path",
        type: "string",
        required: true
      },
      homeyId: {
        type: "string",
        "in": "body"
      },
      userId: {
        type: "string",
        "in": "body"
      }
    }
  },
  getHomeys: {
    path: "/homey/",
    method: "get",
    "private": true,
    parameters: {
      serial: {
        "in": "query",
        type: "string"
      },
      softwareVersion: {
        "in": "query",
        type: "string"
      },
      search: {
        "in": "query",
        type: "string"
      },
      page: {
        "in": "query",
        type: "string"
      }
    }
  },
  createHomey: {
    path: "/homey/",
    method: "post",
    "private": true,
    parameters: {
      data: {
        "in": "body",
        type: "object",
        unpack: true,
        properties: {
          name: {
            type: "string"
          },
          ipInternal: {
            type: "string"
          },
          ipExternal: {
            type: "string"
          },
          ipExternalCountry: {
            type: "string"
          },
          ipExternalPort: {
            type: "number"
          },
          localUrl: {
            type: "string"
          },
          localUrlSecure: {
            type: "string"
          },
          remoteUrl: {
            type: "string"
          },
          apiVersion: {
            type: "number"
          },
          softwareVersion: {
            type: "string"
          },
          language: {
            type: "string"
          },
          state: {
            type: "string"
          },
          geolocation: {
            type: "object"
          },
          users: {
            type: "array"
          },
          role: {
            type: "string"
          },
          token: {
            type: "string"
          },
          apps: {
            type: "array"
          },
          devices: {
            type: "array"
          }
        }
      }
    }
  },
  getHomey: {
    path: "/homey/{id}",
    method: "get",
    "private": true,
    parameters: {
      id: {
        "in": "path",
        type: "string",
        required: true
      }
    }
  },
  updateHomey: {
    path: "/homey/{id}",
    method: "put",
    "private": true,
    parameters: {
      id: {
        "in": "path",
        type: "string",
        required: true
      },
      homey: {
        "in": "body",
        type: "object",
        required: true,
        unpack: true,
        properties: {
          name: {
            type: "string"
          },
          ipInternal: {
            type: "string"
          },
          ipExternal: {
            type: "string"
          },
          ipExternalCountry: {
            type: "string"
          },
          ipExternalPort: {
            type: "number"
          },
          localUrl: {
            type: "string"
          },
          localUrlSecure: {
            type: "string"
          },
          remoteUrl: {
            type: "string"
          },
          apiVersion: {
            type: "number"
          },
          softwareVersion: {
            type: "string"
          },
          language: {
            type: "string"
          },
          state: {
            type: "string"
          },
          geolocation: {
            type: "object"
          },
          users: {
            type: "array"
          },
          role: {
            type: "string"
          },
          token: {
            type: "string"
          },
          apps: {
            type: "array"
          },
          devices: {
            type: "array"
          }
        }
      }
    }
  },
  deleteHomey: {
    path: "/homey/{id}",
    method: "delete",
    "private": true,
    parameters: {
      id: {
        "in": "path",
        type: "string",
        required: true
      }
    }
  },
  activateHomey: {
    path: "/homey/{id}/activate",
    method: "post",
    "private": true,
    parameters: {
      id: {
        "in": "path",
        type: "string",
        required: true
      },
      userId: {
        type: "string",
        "in": "body"
      }
    }
  },
  addHomeyLicense: {
    path: "/homey/{homeyId}/license/{license}",
    method: "post",
    "private": true,
    parameters: {
      homeyId: {
        "in": "path",
        type: "string",
        required: true
      },
      license: {
        "in": "path",
        type: "string",
        required: true
      }
    }
  },
  createHomeyUser: {
    path: "/homey/{homeyId}/user",
    method: "post",
    "private": true,
    parameters: {
      homeyId: {
        "in": "path",
        type: "string",
        required: true
      },
      user: {
        type: "string",
        "in": "body"
      },
      role: {
        type: "string",
        "in": "body"
      },
      token: {
        type: "string",
        "in": "body"
      }
    }
  },
  deleteHomeyUser: {
    path: "/homey/{homeyId}/user/{userId}",
    method: "delete",
    "private": true,
    parameters: {
      homeyId: {
        "in": "path",
        type: "string",
        required: true
      },
      userId: {
        "in": "path",
        type: "string",
        required: true
      }
    }
  },
  resetHomeyUsers: {
    path: "/homey/{homeyId}/user/reset",
    method: "post",
    "private": true,
    parameters: {
      homeyId: {
        "in": "path",
        type: "string",
        required: true
      }
    }
  },
  getAllHomeyMetadata: {
    path: "/homey/{homeyId}/metadata",
    method: "get",
    "private": true,
    parameters: {
      homeyId: {
        "in": "path",
        type: "string",
        required: true
      }
    }
  },
  getHomeyMetadata: {
    path: "/homey/{homeyId}/metadata/{key}",
    method: "get",
    "private": true,
    parameters: {
      homeyId: {
        "in": "path",
        type: "string",
        required: true
      },
      key: {
        "in": "path",
        type: "string",
        required: true
      }
    }
  },
  createHomeyMetadata: {
    path: "/homey/{homeyId}/metadata/{key}",
    method: "post",
    "private": true,
    parameters: {
      homeyId: {
        "in": "path",
        type: "string",
        required: true
      },
      key: {
        "in": "path",
        type: "string",
        required: true
      },
      value: {
        type: "object",
        "in": "body"
      }
    }
  },
  updateHomeyMetadata: {
    path: "/homey/{homeyId}/metadata/{key}",
    method: "put",
    "private": true,
    parameters: {
      homeyId: {
        "in": "path",
        type: "string",
        required: true
      },
      key: {
        "in": "path",
        type: "string",
        required: true
      },
      value: {
        type: "object",
        "in": "body"
      }
    }
  },
  deleteHomeyMetadata: {
    path: "/homey/{homeyId}/metadata/{key}",
    method: "delete",
    "private": true,
    parameters: {
      homeyId: {
        "in": "path",
        type: "string",
        required: true
      },
      key: {
        "in": "path",
        type: "string",
        required: true
      }
    }
  },
  sendFormattedEmail: {
    path: "/mail/formatted",
    method: "post",
    "private": true,
    parameters: {
      to: {
        type: "string",
        "in": "body"
      },
      toHomeyOwner: {
        type: "string",
        "in": "body"
      },
      from: {
        type: "string",
        "in": "body"
      },
      subject: {
        type: "string",
        "in": "body"
      },
      body: {
        type: "string",
        "in": "body"
      },
      replyTo: {
        type: "string",
        "in": "body"
      },
      logo: {
        type: "object",
        "in": "body"
      },
      header: {
        type: "object",
        "in": "body"
      },
      button: {
        type: "object",
        "in": "body"
      }
    }
  },
  subscribeUserToMailChimp: {
    path: "/mail/mailchimp",
    method: "post",
    "private": true,
    parameters: {
      listId: {
        type: "string",
        "in": "body"
      },
      userId: {
        type: "string",
        "in": "body"
      }
    }
  },
  getAppInstallsStatistics: {
    path: "/stats/app-installs",
    method: "get",
    "private": true,
    parameters: {}
  },
  getAppDriversStatistics: {
    path: "/stats/app-drivers",
    method: "get",
    "private": true,
    parameters: {}
  },
  getLocationStatistics: {
    path: "/stats/locations",
    method: "get",
    "private": true,
    parameters: {}
  },
  getVersionStatistics: {
    path: "/stats/homey-software-versions",
    method: "get",
    "private": true,
    parameters: {}
  },
  getProductionStatistics: {
    path: "/stats/homey-production-speed",
    method: "get",
    "private": true,
    parameters: {
      min: {
        "in": "query",
        type: "string"
      },
      max: {
        "in": "query",
        type: "string"
      }
    }
  },
  getHomeyOwnerContactDetails: {
    path: "/stats/homey-owner-data",
    method: "get",
    "private": true,
    parameters: {
      softwareVersion: {
        "in": "query",
        type: "string"
      },
      homeyId: {
        "in": "query",
        type: "string"
      },
      homeySn: {
        "in": "query",
        type: "string"
      },
      barcodeMin: {
        "in": "query",
        type: "string"
      },
      barcodeMax: {
        "in": "query",
        type: "string"
      },
      appId: {
        "in": "query",
        type: "string"
      },
      appChannel: {
        "in": "query",
        type: "string"
      },
      appVersion: {
        "in": "query",
        type: "string"
      },
      page: {
        "in": "query",
        type: "number"
      }
    }
  }
};
const require$$9 = {
  host,
  basePath,
  operations
};
const API = API_1;
const APIError2 = APIError_1;
const Util2 = Util_1;
const User2 = User_1;
const Homey2 = Homey_1;
const Token2 = Token_1;
const StorageAdapter2 = StorageAdapter_1;
const StorageAdapterBrowser = StorageAdapterBrowser_1;
const StorageAdapterMemory2 = StorageAdapterMemory_1;
class AthomCloudAPI extends API {
  constructor({
    clientId,
    clientSecret,
    redirectUrl,
    autoRefreshTokens = true,
    token = null,
    store = Util2.isBrowser() ? new StorageAdapterBrowser() : new StorageAdapterMemory2(),
    ...args
  } = {}) {
    super({ ...args });
    this.__clientId = clientId;
    this.__clientSecret = clientSecret;
    this.__redirectUrl = redirectUrl;
    this.__autoRefreshTokens = autoRefreshTokens;
    if (!(store instanceof StorageAdapter2)) {
      throw new Error("Invalid `store`. Must extend AthomCloudAPI/StorageAdapter.");
    }
    this.__store = store;
    if (token && !(token instanceof Token2)) {
      throw new Error("Invalid `token`. Must extend AthomCloudAPI/Token.");
    }
    this.__token = token;
    this.__user = null;
  }
  /*
   * Session
  */
  /**
   * Checks if the current token is valid, and if the user is logged in.
   * @returns {Promise<boolean>}
   */
  async isLoggedIn() {
    const store = await this.__getStore();
    if (!store.token || !store.token.access_token)
      return false;
    return true;
  }
  /**
   * Get the current authenticated {@link AthomCloudAPI.User}
   * @param {object} [opts]
   * @param {object} [opts.$cache=true] - Use the cache
   * @returns {Promise<AthomCloudAPI.User>}
   */
  async getAuthenticatedUser({ $cache = true } = {}) {
    if ($cache === true && this.__user instanceof User2) {
      return this.__user;
    }
    const properties = await this.call({
      method: "get",
      path: "/user/me"
    });
    this.__user = new User2({
      api: this,
      properties
    });
    return this.__user;
  }
  async getAuthenticatedUserFromStore({ $cache = true } = {}) {
    if ($cache === true && this.__user instanceof User2) {
      return this.__user;
    }
    if ($cache === true && this.__user == null) {
      const store = await this.__getStore();
      if (store.user) {
        this.__user = new User2({
          api: this,
          properties: store.user
        });
        return this.__user;
      }
    }
    const properties = await this.call({
      method: "get",
      path: "/user/me"
    });
    this.__user = new User2({
      api: this,
      properties
    });
    await this.__setStore({
      user: properties
    });
    return this.__user;
  }
  /**
   * Checks if the current URL in the browser has a `?code=...` parameter.
   * @returns {boolean}
   */
  hasAuthorizationCode() {
    return !!(Util2.isBrowser() && Util2.getSearchParameter("code"));
  }
  /**
   * Get a login URL to redirect the user to (MyApp wants access to ...).
   * @param {object} [opts]
   * @param {string} [opts.state] - A state parameter for enhanced security.
   * @param {string[]} [opts.scopes] - An array of scopes. By default, the client's scopes will be used.
   * @returns {string} - The login URL to redirect the user to.
   */
  getLoginUrl({
    state,
    scopes
  } = {}) {
    if (!this.__redirectUrl) {
      throw new Error("Missing Redirect URL");
    }
    const search = new URLSearchParams();
    search.append("client_id", this.__clientId);
    search.append("redirect_uri", this.__redirectUrl);
    search.append("response_type", "code");
    if (typeof state === "string") {
      search.append("state", state);
    }
    if (Array.isArray(scopes)) {
      search.append("scope", scopes.join(","));
    }
    return `${this.baseUrl}/oauth2/authorise?${search.toString()}`;
  }
  async getDelegatedLoginUrl(args = {}) {
    if (args.baseUrl == null) {
      throw new TypeError("baseUrl is required");
    }
    const token = await this.createDelegationToken({
      audience: args.audience,
      meta: args.meta
    });
    const search = new URLSearchParams();
    search.append("user_token", token);
    if (typeof args.state === "string") {
      search.append("state", args.state);
    }
    if (typeof args.resource === "string") {
      search.append("resource", args.resource);
    }
    const seperator = args.baseUrl.indexOf("?") >= 0 ? "&" : "?";
    return args.baseUrl + seperator + search.toString();
  }
  /**
   * Logout and delete the local token.
   * @returns {Promise<void>}
   */
  async logout() {
    this.__user = null;
    await this.__resetStore();
    this.__token = null;
  }
  /*
   * Storage
  */
  async __getStore() {
    if (!this.__store)
      return {};
    return this.__store.get();
  }
  async __setStore(value) {
    if (!this.__store)
      return;
    const store = await this.__store.get();
    await this.__store.set({
      ...store,
      ...value
    });
  }
  async __resetStore() {
    if (!this.__store)
      return;
    await this.__store.set({});
  }
  /*
   * API overloads
  */
  // eslint-disable-next-line no-unused-vars
  async onCallRequestHeaders({ request }) {
    if (!this.__token) {
      const store = await this.__getStore();
      if (store.token) {
        this.__token = new Token2(store.token);
      }
    }
    if (this.__token && this.__token.access_token) {
      return {
        Authorization: `Bearer ${this.__token.access_token}`
      };
    }
    return {};
  }
  async onCallResponseNotOK({
    request,
    body,
    statusCode,
    ...props
  }) {
    if (statusCode === 401 && body.error === "invalid_token") {
      if (this.__autoRefreshTokens && !request.context.retryAfterRefresh) {
        this.__debug("Refreshing token...");
        await this.authenticateWithRefreshToken();
        this.__debug("Token refreshed. Retrying call...");
        return this.call({
          ...request,
          context: {
            ...request.context,
            retryAfterRefresh: true
          }
        });
      }
    }
    if (typeof body.error_description === "object" && body.error_description !== null) {
      const message = Object.entries(body.error_description).map(([key, value]) => {
        return `${key}: ${value}`;
      }).join(", ");
      throw new APIError2(message, statusCode);
    }
    return super.onCallResponseNotOK({
      body,
      statusCode,
      ...props
    });
  }
  /*
   * OAuth2
  */
  async authenticateWithClientCredentials() {
    if (!this.__clientId) {
      throw new Error("Missing Client ID");
    }
    if (!this.__clientSecret) {
      throw new Error("Missing Client Secret");
    }
    const body = new URLSearchParams();
    body.append("grant_type", "client_credentials");
    const response = await Util2.fetch(`${this.baseUrl}/oauth2/token`, {
      body: body.toString(),
      method: "post",
      headers: {
        Authorization: `Basic ${Util2.base64(`${this.__clientId}:${this.__clientSecret}`)}`,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    const responseBody = await response.json();
    if (!response.ok) {
      throw new APIError2(responseBody.error_description || responseBody.error, response.status);
    }
    this.__token = new Token2({
      token_type: responseBody.token_type,
      access_token: responseBody.access_token,
      refresh_token: responseBody.refresh_token,
      expires_in: responseBody.expires_in,
      grant_type: "client_credentials"
    });
    this.__setStore({
      token: this.__token
    });
    return this.__token;
  }
  /**
   * Authenticate with an authorization code.
   * @param {Object} [opts]
   * @param {String} opts.code - Default to `?code=...` when in a browser.
   * @param {Boolean} [opts.removeCodeFromHistory=true] - Remove `?code=...` from the URL in the address bar.
   * @returns {Promise<AthomCloudAPI.Token>}
   */
  async authenticateWithAuthorizationCode({
    code,
    removeCodeFromHistory = true
  } = {}) {
    if (!code && Util2.isBrowser()) {
      code = Util2.getSearchParameter("code");
    }
    if (!code) {
      throw new Error("Missing Code");
    }
    if (!this.__clientId) {
      throw new Error("Missing Client ID");
    }
    if (!this.__clientSecret) {
      throw new Error("Missing Client Secret");
    }
    const body = new URLSearchParams();
    body.append("grant_type", "authorization_code");
    body.append("code", code);
    const response = await Util2.fetch(`${this.baseUrl}/oauth2/token`, {
      body: body.toString(),
      method: "post",
      headers: {
        Authorization: `Basic ${Util2.base64(`${this.__clientId}:${this.__clientSecret}`)}`,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    const responseBody = await response.json();
    if (!response.ok) {
      throw new APIError2(responseBody.error_description || responseBody.error, response.status);
    }
    this.__token = new Token2({
      token_type: responseBody.token_type,
      access_token: responseBody.access_token,
      refresh_token: responseBody.refresh_token,
      expires_in: responseBody.expires_in,
      grant_type: "authorization_code"
    });
    this.__setStore({
      token: this.__token
    });
    if (Util2.isBrowser() && removeCodeFromHistory) {
      const url = new URL(window.location.href);
      url.searchParams.delete("code");
      window.history.pushState(void 0, void 0, url.toString());
    }
    return this.__token;
  }
  async authenticateWithPassword(username, password) {
    if (!username) {
      throw new Error("Missing Username");
    }
    if (!password) {
      throw new Error("Missing Password");
    }
    if (!this.__clientId) {
      throw new Error("Missing Client ID");
    }
    if (!this.__clientSecret) {
      throw new Error("Missing Client Secret");
    }
    const body = new URLSearchParams();
    body.append("grant_type", "password");
    body.append("username", username);
    body.append("password", password);
    const response = await Util2.fetch(`${this.baseUrl}/oauth2/token`, {
      body: body.toString(),
      method: "post",
      headers: {
        Authorization: `Basic ${Util2.base64(`${this.__clientId}:${this.__clientSecret}`)}`,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    const responseBody = await response.json();
    if (!response.ok) {
      throw new APIError2(responseBody.error_description || responseBody.error, response.status);
    }
    this.__token = new Token2({
      token_type: responseBody.token_type,
      access_token: responseBody.access_token,
      refresh_token: responseBody.refresh_token,
      expires_in: responseBody.expires_in,
      grant_type: "password"
    });
    this.__setStore({
      token: this.__token
    });
    return this.__token;
  }
  async authenticateWithRefreshToken() {
    if (!this.__refreshTokenPromise) {
      this.__refreshTokenPromise = Promise.resolve().then(async () => {
        if (!this.__token) {
          throw new Error("Missing Token");
        }
        if (!this.__token.refresh_token) {
          throw new Error("Missing Refresh Token");
        }
        const body = new URLSearchParams();
        body.append("grant_type", "refresh_token");
        body.append("refresh_token", this.__token.refresh_token);
        const response = await Util2.fetch(`${this.baseUrl}/oauth2/token`, {
          body: body.toString(),
          method: "post",
          headers: {
            Authorization: `Basic ${Util2.base64(`${this.__clientId}:${this.__clientSecret}`)}`,
            "Content-Type": "application/x-www-form-urlencoded"
          }
        });
        const responseBody = await response.json();
        if (!response.ok) {
          throw new APIError2(responseBody.error_description || responseBody.error, response.status);
        }
        this.__token = new Token2({
          token_type: responseBody.token_type,
          access_token: responseBody.access_token,
          refresh_token: responseBody.refresh_token,
          expires_in: responseBody.expires_in,
          grant_type: this.__token.grant_type
        });
        this.__setStore({
          token: this.__token
        });
        return this.__token;
      });
      this.__refreshTokenPromise.catch(() => {
      }).finally(() => {
        this.__refreshTokenPromise = null;
      });
    }
    return this.__refreshTokenPromise;
  }
  /**
   * Update the currently authenticated user.
   *
   * @private
   * @param {Object} [opts]
   * @param {String} [opts.firstname]
   * @param {String} [opts.lastname]
   * @param {String} [opts.email]
   * @returns {Promise<AthomCloudAPI.User>}
   */
  async updateUserMe({
    firstname,
    lastname,
    email
  }) {
    const me = await this.getAuthenticatedUser();
    return this.updateUser({
      id: me._id,
      user: {
        firstname,
        lastname,
        email
      }
    });
  }
  /**
   * Update the currently authenticated user's avatar.
   *
   * @private
   * @param {Buffer} imageBuffer Buffer of the new avatar
   * @param {"jpg"|"jpeg"|"png"|"gif"} imageType Type of the new avatar
   * @returns {Promise<Object>}
   */
  async updateUserMeAvatar(imageBuffer, imageType) {
    if (!Buffer.isBuffer(imageBuffer)) {
      throw new Error("Invalid Image. Expected Buffer.");
    }
    if (!imageType) {
      throw new Error("Missing Image Type");
    }
    if (!["jpg", "png", "gif"].includes(imageType)) {
      throw new Error(`Invalid Image Type: ${imageType}`);
    }
    if (imageType === "jpg") {
      imageType = "jpeg";
    }
    const me = await this.getAuthenticatedUser();
    const body = Buffer.concat([
      Buffer.from(`--__X_HOMEY_BOUNDARY__\r
Content-Disposition: form-data; name="avatar"; filename="avatar"\r
Content-Type: image/${imageType}\r
\r
`),
      Buffer.from(imageBuffer),
      Buffer.from("\r\n--__X_HOMEY_BOUNDARY__--\r\n")
    ]);
    return this.call({
      method: "POST",
      path: `/user/${me._id}/avatar`,
      headers: {
        "Content-Type": 'multipart/form-data; boundary="__X_HOMEY_BOUNDARY__"',
        "Content-Length": body.length
      },
      body,
      bodyJSON: false
    });
  }
}
__publicField(AthomCloudAPI, "User", User2);
__publicField(AthomCloudAPI, "Homey", Homey2);
__publicField(AthomCloudAPI, "Token", Token2);
__publicField(AthomCloudAPI, "StorageAdapter", StorageAdapter2);
__publicField(AthomCloudAPI, "StorageAdapterBrowser", StorageAdapterBrowser);
__publicField(AthomCloudAPI, "StorageAdapterMemory", StorageAdapterMemory2);
__publicField(AthomCloudAPI, "SPECIFICATION", require$$9);
__publicField(AthomCloudAPI, "SPECIFICATION_URL", "https://api.athom.com/specification.json");
__publicField(AthomCloudAPI, "DEFINITION_CLASSES", {
  User: User2,
  Homey: Homey2
});
__publicField(AthomCloudAPI, "JSDOC_DESCRIPTION", `
The AthomCloudAPI class can be used to authenticate a user with your client,
and login on that user's Homey.`);
__publicField(AthomCloudAPI, "JSDOC_EXAMPLE", `
const AthomCloudAPI = require('homey-api/lib/AthomCloudAPI');

// Create an AthomCloudAPI instance
const cloudApi = new {@link AthomCloudAPI AthomCloudAPI}({
  clientId: '5a8d4ca6eb9f7a2c9d6ccf6d',
  clientSecret: 'e3ace394af9f615857ceaa61b053f966ddcfb12a',
  redirectUrl: 'http://localhost',
});

// Check if we're logged in
// If not, redirect the user to the OAuth2 dialog
const loggedIn = await {@link AthomCloudAPI cloudApi}.{@link AthomCloudAPI#isLoggedIn isLoggedIn}();
if (!loggedIn) {
  if ({@link AthomCloudAPI cloudApi}.{@link AthomCloudAPI#hasAuthorizationCode hasAuthorizationCode}()) {
    const token = await  {@link AthomCloudAPI cloudApi}.{@link AthomCloudAPI#authenticateWithAuthorizationCode authenticateWithAuthorizationCode}();
  } else {
    window.location.href =  {@link AthomCloudAPI cloudApi}.{@link AthomCloudAPI#getLoginUrl getLoginUrl}();
    return;
  }
}

// Get the logged in user
const user = await {@link AthomCloudAPI cloudApi}.{@link AthomCloudAPI#getAuthenticatedUser getAuthenticatedUser}();

// Get the first Homey of the logged in user
const homey = await {@link AthomCloudAPI.User user}.{@link AthomCloudAPI.User#getFirstHomey getFirstHomey}();

// Create a session on this Homey
const homeyApi = await {@link AthomCloudAPI.Homey homey}.{@link AthomCloudAPI.Homey#authenticate authenticate}();

// Get all Zones from ManagerZones
const zones = await {@link HomeyAPIV2 homeyApi}.{@link HomeyAPIV2.ManagerZones zones}.{@link HomeyAPIV2.ManagerZones#getZones getZones}();

// Get all Devices from ManagerDevices
const devices = await {@link HomeyAPIV2 homeyApi}.{@link HomeyAPIV2.ManagerDevices devices}.{@link HomeyAPIV2.ManagerDevices#getDevices getDevices}();

// Turn all devices on
for(const {@link HomeyAPIV2.ManagerDevices.Device device} of Object.values(devices)) {
  // Turn device on
  await {@link HomeyAPIV2.ManagerDevices.Device device}.{@link HomeyAPIV2.ManagerDevices.Device#setCapabilityValue setCapabilityValue}({
    capabilityId: 'onoff',
    value: true,
  });
}`);
__publicField(AthomCloudAPI, "JSDOC_PARAMS", `
@param {string} opts.clientId
@param {string} opts.clientSecret
@param {string} opts.redirectUrl
@param {boolean} [opts.autoRefreshTokens=true]
@param {AthomCloudAPI.Token} [opts.token=null]
@param {AthomCloudAPI.StorageAdapter} [opts.store={@link AthomCloudAPI.StorageAdapterBrowser} or {@link AthomCloudAPI.StorageAdapterMemory}]`);
var AthomCloudAPI_1 = AthomCloudAPI;
const AthomCloudAPI$1 = /* @__PURE__ */ getDefaultExportFromCjs(AthomCloudAPI_1);
export {
  AthomCloudAPI$1 as A,
  requireHomeyAPI as r
};
