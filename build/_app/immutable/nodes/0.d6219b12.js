import { s as safe_not_equal, r as createEventDispatcher, e as empty, i as insert_hydration, d as detach, f as element, g as claim_element, u as get_svelte_dataset, v as noop, p as binding_callbacks, a as space, c as claim_space, j as attr, w as add_flush_callback, l as text, m as claim_text, x as head_selector, h as children, y as component_subscribe, o as onMount, z as create_slot, A as update_slot_base, B as get_all_dirty_from_scope, C as get_slot_changes, D as append_hydration, n as set_data, E as destroy_each } from "../chunks/scheduler.a4b1dbd5.js";
import { S as SvelteComponent, i as init$2, b as create_component, d as claim_component, m as mount_component, a as transition_in, t as transition_out, e as destroy_component, g as group_outros, c as check_outros, f as bind } from "../chunks/index.6d45844e.js";
import { g as globals, D as Drawer, I as IconButton, a as Dropdown, b as Divider, T as Toggle, M as Media } from "../chunks/index.de1b8614.js";
import { m as mdiMenu, a as mdiPlus, b as mdiViewDashboardEdit, c as mdiCog, L as List, e as ensure_array_like, d as mdiViewDashboard, f as mdiDeathStarVariant } from "../chunks/index.10402ac9.js";
import { v as version, e as base } from "../chunks/singletons.6f834d91.js";
import { c as clientId, a as clientSecret, u as user, h as homeys, b as homey, s as scopes, d as baseUrl, e as dashboards$1, f as session, g as devices, i as flowFolders, j as basicFlows, k as advancedFlows, l as insights, z as zones, m as goto } from "../chunks/homey.2926ca04.js";
import { I as Input, B as Button, d as dashboards, v as v4, P as Progress, a as Icon } from "../chunks/Progress.65323467.js";
import { P as Portal, M as Modal, d as dashboard, e as editing } from "../chunks/index.cfb68038.js";
import { a as apiKey, H as HomeyAPI } from "../chunks/HomeyAPI.75773d2f.js";
import { A as AthomCloudAPI } from "../chunks/AthomCloudAPI.108df682.js";
const ssr = false;
const trailingSlash = "always";
const prerender = true;
const _layout = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  prerender,
  ssr,
  trailingSlash
}, Symbol.toStringTag, { value: "Module" }));
const objectToString = Object.prototype.toString;
function isError(wat) {
  switch (objectToString.call(wat)) {
    case "[object Error]":
    case "[object Exception]":
    case "[object DOMException]":
      return true;
    default:
      return isInstanceOf(wat, Error);
  }
}
function isBuiltin(wat, className) {
  return objectToString.call(wat) === `[object ${className}]`;
}
function isErrorEvent$2(wat) {
  return isBuiltin(wat, "ErrorEvent");
}
function isDOMError(wat) {
  return isBuiltin(wat, "DOMError");
}
function isDOMException(wat) {
  return isBuiltin(wat, "DOMException");
}
function isString(wat) {
  return isBuiltin(wat, "String");
}
function isPrimitive(wat) {
  return wat === null || typeof wat !== "object" && typeof wat !== "function";
}
function isPlainObject(wat) {
  return isBuiltin(wat, "Object");
}
function isEvent(wat) {
  return typeof Event !== "undefined" && isInstanceOf(wat, Event);
}
function isElement$1(wat) {
  return typeof Element !== "undefined" && isInstanceOf(wat, Element);
}
function isRegExp(wat) {
  return isBuiltin(wat, "RegExp");
}
function isThenable(wat) {
  return Boolean(wat && wat.then && typeof wat.then === "function");
}
function isSyntheticEvent(wat) {
  return isPlainObject(wat) && "nativeEvent" in wat && "preventDefault" in wat && "stopPropagation" in wat;
}
function isNaN$1(wat) {
  return typeof wat === "number" && wat !== wat;
}
function isInstanceOf(wat, base2) {
  try {
    return wat instanceof base2;
  } catch (_e) {
    return false;
  }
}
function isVueViewModel(wat) {
  return !!(typeof wat === "object" && wat !== null && (wat.__isVue || wat._isVue));
}
function truncate(str, max = 0) {
  if (typeof str !== "string" || max === 0) {
    return str;
  }
  return str.length <= max ? str : `${str.slice(0, max)}...`;
}
function safeJoin(input, delimiter) {
  if (!Array.isArray(input)) {
    return "";
  }
  const output = [];
  for (let i = 0; i < input.length; i++) {
    const value = input[i];
    try {
      if (isVueViewModel(value)) {
        output.push("[VueViewModel]");
      } else {
        output.push(String(value));
      }
    } catch (e2) {
      output.push("[value cannot be serialized]");
    }
  }
  return output.join(delimiter);
}
function isMatchingPattern(value, pattern, requireExactStringMatch = false) {
  if (!isString(value)) {
    return false;
  }
  if (isRegExp(pattern)) {
    return pattern.test(value);
  }
  if (isString(pattern)) {
    return requireExactStringMatch ? value === pattern : value.includes(pattern);
  }
  return false;
}
function stringMatchesSomePattern(testString, patterns = [], requireExactStringMatch = false) {
  return patterns.some((pattern) => isMatchingPattern(testString, pattern, requireExactStringMatch));
}
function applyAggregateErrorsToEvent(exceptionFromErrorImplementation, parser, maxValueLimit = 250, key, limit, event, hint) {
  if (!event.exception || !event.exception.values || !hint || !isInstanceOf(hint.originalException, Error)) {
    return;
  }
  const originalException = event.exception.values.length > 0 ? event.exception.values[event.exception.values.length - 1] : void 0;
  if (originalException) {
    event.exception.values = truncateAggregateExceptions(
      aggregateExceptionsFromError(
        exceptionFromErrorImplementation,
        parser,
        limit,
        hint.originalException,
        key,
        event.exception.values,
        originalException,
        0
      ),
      maxValueLimit
    );
  }
}
function aggregateExceptionsFromError(exceptionFromErrorImplementation, parser, limit, error, key, prevExceptions, exception, exceptionId) {
  if (prevExceptions.length >= limit + 1) {
    return prevExceptions;
  }
  let newExceptions = [...prevExceptions];
  if (isInstanceOf(error[key], Error)) {
    applyExceptionGroupFieldsForParentException(exception, exceptionId);
    const newException = exceptionFromErrorImplementation(parser, error[key]);
    const newExceptionId = newExceptions.length;
    applyExceptionGroupFieldsForChildException(newException, key, newExceptionId, exceptionId);
    newExceptions = aggregateExceptionsFromError(
      exceptionFromErrorImplementation,
      parser,
      limit,
      error[key],
      key,
      [newException, ...newExceptions],
      newException,
      newExceptionId
    );
  }
  if (Array.isArray(error.errors)) {
    error.errors.forEach((childError, i) => {
      if (isInstanceOf(childError, Error)) {
        applyExceptionGroupFieldsForParentException(exception, exceptionId);
        const newException = exceptionFromErrorImplementation(parser, childError);
        const newExceptionId = newExceptions.length;
        applyExceptionGroupFieldsForChildException(newException, `errors[${i}]`, newExceptionId, exceptionId);
        newExceptions = aggregateExceptionsFromError(
          exceptionFromErrorImplementation,
          parser,
          limit,
          childError,
          key,
          [newException, ...newExceptions],
          newException,
          newExceptionId
        );
      }
    });
  }
  return newExceptions;
}
function applyExceptionGroupFieldsForParentException(exception, exceptionId) {
  exception.mechanism = exception.mechanism || { type: "generic", handled: true };
  exception.mechanism = {
    ...exception.mechanism,
    is_exception_group: true,
    exception_id: exceptionId
  };
}
function applyExceptionGroupFieldsForChildException(exception, source, exceptionId, parentId) {
  exception.mechanism = exception.mechanism || { type: "generic", handled: true };
  exception.mechanism = {
    ...exception.mechanism,
    type: "chained",
    source,
    exception_id: exceptionId,
    parent_id: parentId
  };
}
function truncateAggregateExceptions(exceptions, maxValueLength) {
  return exceptions.map((exception) => {
    if (exception.value) {
      exception.value = truncate(exception.value, maxValueLength);
    }
    return exception;
  });
}
function isGlobalObj(obj) {
  return obj && obj.Math == Math ? obj : void 0;
}
const GLOBAL_OBJ = typeof globalThis == "object" && isGlobalObj(globalThis) || // eslint-disable-next-line no-restricted-globals
typeof window == "object" && isGlobalObj(window) || typeof self == "object" && isGlobalObj(self) || typeof global == "object" && isGlobalObj(global) || function() {
  return this;
}() || {};
function getGlobalObject() {
  return GLOBAL_OBJ;
}
function getGlobalSingleton(name, creator, obj) {
  const gbl = obj || GLOBAL_OBJ;
  const __SENTRY__ = gbl.__SENTRY__ = gbl.__SENTRY__ || {};
  const singleton = __SENTRY__[name] || (__SENTRY__[name] = creator());
  return singleton;
}
const WINDOW$7 = getGlobalObject();
const DEFAULT_MAX_STRING_LENGTH = 80;
function htmlTreeAsString(elem, options = {}) {
  try {
    let currentElem = elem;
    const MAX_TRAVERSE_HEIGHT = 5;
    const out = [];
    let height = 0;
    let len = 0;
    const separator = " > ";
    const sepLength = separator.length;
    let nextStr;
    const keyAttrs = Array.isArray(options) ? options : options.keyAttrs;
    const maxStringLength = !Array.isArray(options) && options.maxStringLength || DEFAULT_MAX_STRING_LENGTH;
    while (currentElem && height++ < MAX_TRAVERSE_HEIGHT) {
      nextStr = _htmlElementAsString(currentElem, keyAttrs);
      if (nextStr === "html" || height > 1 && len + out.length * sepLength + nextStr.length >= maxStringLength) {
        break;
      }
      out.push(nextStr);
      len += nextStr.length;
      currentElem = currentElem.parentNode;
    }
    return out.reverse().join(separator);
  } catch (_oO) {
    return "<unknown>";
  }
}
function _htmlElementAsString(el, keyAttrs) {
  const elem = el;
  const out = [];
  let className;
  let classes;
  let key;
  let attr2;
  let i;
  if (!elem || !elem.tagName) {
    return "";
  }
  out.push(elem.tagName.toLowerCase());
  const keyAttrPairs = keyAttrs && keyAttrs.length ? keyAttrs.filter((keyAttr) => elem.getAttribute(keyAttr)).map((keyAttr) => [keyAttr, elem.getAttribute(keyAttr)]) : null;
  if (keyAttrPairs && keyAttrPairs.length) {
    keyAttrPairs.forEach((keyAttrPair) => {
      out.push(`[${keyAttrPair[0]}="${keyAttrPair[1]}"]`);
    });
  } else {
    if (elem.id) {
      out.push(`#${elem.id}`);
    }
    className = elem.className;
    if (className && isString(className)) {
      classes = className.split(/\s+/);
      for (i = 0; i < classes.length; i++) {
        out.push(`.${classes[i]}`);
      }
    }
  }
  const allowedAttrs = ["aria-label", "type", "name", "title", "alt"];
  for (i = 0; i < allowedAttrs.length; i++) {
    key = allowedAttrs[i];
    attr2 = elem.getAttribute(key);
    if (attr2) {
      out.push(`[${key}="${attr2}"]`);
    }
  }
  return out.join("");
}
function getLocationHref() {
  try {
    return WINDOW$7.document.location.href;
  } catch (oO) {
    return "";
  }
}
function getDomElement(selector) {
  if (WINDOW$7.document && WINDOW$7.document.querySelector) {
    return WINDOW$7.document.querySelector(selector);
  }
  return null;
}
const PREFIX = "Sentry Logger ";
const CONSOLE_LEVELS = ["debug", "info", "warn", "error", "log", "assert", "trace"];
const originalConsoleMethods = {};
function consoleSandbox(callback) {
  if (!("console" in GLOBAL_OBJ)) {
    return callback();
  }
  const console2 = GLOBAL_OBJ.console;
  const wrappedFuncs = {};
  const wrappedLevels = Object.keys(originalConsoleMethods);
  wrappedLevels.forEach((level) => {
    const originalConsoleMethod = originalConsoleMethods[level];
    wrappedFuncs[level] = console2[level];
    console2[level] = originalConsoleMethod;
  });
  try {
    return callback();
  } finally {
    wrappedLevels.forEach((level) => {
      console2[level] = wrappedFuncs[level];
    });
  }
}
function makeLogger() {
  let enabled = false;
  const logger2 = {
    enable: () => {
      enabled = true;
    },
    disable: () => {
      enabled = false;
    }
  };
  if (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) {
    CONSOLE_LEVELS.forEach((name) => {
      logger2[name] = (...args) => {
        if (enabled) {
          consoleSandbox(() => {
            GLOBAL_OBJ.console[name](`${PREFIX}[${name}]:`, ...args);
          });
        }
      };
    });
  } else {
    CONSOLE_LEVELS.forEach((name) => {
      logger2[name] = () => void 0;
    });
  }
  return logger2;
}
const logger = makeLogger();
const DSN_REGEX = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;
function isValidProtocol(protocol) {
  return protocol === "http" || protocol === "https";
}
function dsnToString(dsn, withPassword = false) {
  const { host, path, pass, port, projectId, protocol, publicKey } = dsn;
  return `${protocol}://${publicKey}${withPassword && pass ? `:${pass}` : ""}@${host}${port ? `:${port}` : ""}/${path ? `${path}/` : path}${projectId}`;
}
function dsnFromString(str) {
  const match = DSN_REGEX.exec(str);
  if (!match) {
    console.error(`Invalid Sentry Dsn: ${str}`);
    return void 0;
  }
  const [protocol, publicKey, pass = "", host, port = "", lastPath] = match.slice(1);
  let path = "";
  let projectId = lastPath;
  const split = projectId.split("/");
  if (split.length > 1) {
    path = split.slice(0, -1).join("/");
    projectId = split.pop();
  }
  if (projectId) {
    const projectMatch = projectId.match(/^\d+/);
    if (projectMatch) {
      projectId = projectMatch[0];
    }
  }
  return dsnFromComponents({ host, pass, path, projectId, port, protocol, publicKey });
}
function dsnFromComponents(components) {
  return {
    protocol: components.protocol,
    publicKey: components.publicKey || "",
    pass: components.pass || "",
    host: components.host,
    port: components.port || "",
    path: components.path || "",
    projectId: components.projectId
  };
}
function validateDsn(dsn) {
  if (!(typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__)) {
    return true;
  }
  const { port, projectId, protocol } = dsn;
  const requiredComponents = ["protocol", "publicKey", "host", "projectId"];
  const hasMissingRequiredComponent = requiredComponents.find((component) => {
    if (!dsn[component]) {
      logger.error(`Invalid Sentry Dsn: ${component} missing`);
      return true;
    }
    return false;
  });
  if (hasMissingRequiredComponent) {
    return false;
  }
  if (!projectId.match(/^\d+$/)) {
    logger.error(`Invalid Sentry Dsn: Invalid projectId ${projectId}`);
    return false;
  }
  if (!isValidProtocol(protocol)) {
    logger.error(`Invalid Sentry Dsn: Invalid protocol ${protocol}`);
    return false;
  }
  if (port && isNaN(parseInt(port, 10))) {
    logger.error(`Invalid Sentry Dsn: Invalid port ${port}`);
    return false;
  }
  return true;
}
function makeDsn(from) {
  const components = typeof from === "string" ? dsnFromString(from) : dsnFromComponents(from);
  if (!components || !validateDsn(components)) {
    return void 0;
  }
  return components;
}
class SentryError extends Error {
  /** Display name of this error instance. */
  constructor(message, logLevel = "warn") {
    super(message);
    this.message = message;
    this.name = new.target.prototype.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
    this.logLevel = logLevel;
  }
}
function fill(source, name, replacementFactory) {
  if (!(name in source)) {
    return;
  }
  const original = source[name];
  const wrapped = replacementFactory(original);
  if (typeof wrapped === "function") {
    try {
      markFunctionWrapped(wrapped, original);
    } catch (_Oo) {
    }
  }
  source[name] = wrapped;
}
function addNonEnumerableProperty(obj, name, value) {
  Object.defineProperty(obj, name, {
    // enumerable: false, // the default, so we can save on bundle size by not explicitly setting it
    value,
    writable: true,
    configurable: true
  });
}
function markFunctionWrapped(wrapped, original) {
  const proto = original.prototype || {};
  wrapped.prototype = original.prototype = proto;
  addNonEnumerableProperty(wrapped, "__sentry_original__", original);
}
function getOriginalFunction(func) {
  return func.__sentry_original__;
}
function urlEncode(object) {
  return Object.keys(object).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`).join("&");
}
function convertToPlainObject(value) {
  if (isError(value)) {
    return {
      message: value.message,
      name: value.name,
      stack: value.stack,
      ...getOwnProperties(value)
    };
  } else if (isEvent(value)) {
    const newObj = {
      type: value.type,
      target: serializeEventTarget(value.target),
      currentTarget: serializeEventTarget(value.currentTarget),
      ...getOwnProperties(value)
    };
    if (typeof CustomEvent !== "undefined" && isInstanceOf(value, CustomEvent)) {
      newObj.detail = value.detail;
    }
    return newObj;
  } else {
    return value;
  }
}
function serializeEventTarget(target) {
  try {
    return isElement$1(target) ? htmlTreeAsString(target) : Object.prototype.toString.call(target);
  } catch (_oO) {
    return "<unknown>";
  }
}
function getOwnProperties(obj) {
  if (typeof obj === "object" && obj !== null) {
    const extractedProps = {};
    for (const property in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, property)) {
        extractedProps[property] = obj[property];
      }
    }
    return extractedProps;
  } else {
    return {};
  }
}
function extractExceptionKeysForMessage(exception, maxLength = 40) {
  const keys = Object.keys(convertToPlainObject(exception));
  keys.sort();
  if (!keys.length) {
    return "[object has no keys]";
  }
  if (keys[0].length >= maxLength) {
    return truncate(keys[0], maxLength);
  }
  for (let includedKeys = keys.length; includedKeys > 0; includedKeys--) {
    const serialized = keys.slice(0, includedKeys).join(", ");
    if (serialized.length > maxLength) {
      continue;
    }
    if (includedKeys === keys.length) {
      return serialized;
    }
    return truncate(serialized, maxLength);
  }
  return "";
}
function dropUndefinedKeys(inputValue) {
  const memoizationMap = /* @__PURE__ */ new Map();
  return _dropUndefinedKeys(inputValue, memoizationMap);
}
function _dropUndefinedKeys(inputValue, memoizationMap) {
  if (isPlainObject(inputValue)) {
    const memoVal = memoizationMap.get(inputValue);
    if (memoVal !== void 0) {
      return memoVal;
    }
    const returnValue = {};
    memoizationMap.set(inputValue, returnValue);
    for (const key of Object.keys(inputValue)) {
      if (typeof inputValue[key] !== "undefined") {
        returnValue[key] = _dropUndefinedKeys(inputValue[key], memoizationMap);
      }
    }
    return returnValue;
  }
  if (Array.isArray(inputValue)) {
    const memoVal = memoizationMap.get(inputValue);
    if (memoVal !== void 0) {
      return memoVal;
    }
    const returnValue = [];
    memoizationMap.set(inputValue, returnValue);
    inputValue.forEach((item) => {
      returnValue.push(_dropUndefinedKeys(item, memoizationMap));
    });
    return returnValue;
  }
  return inputValue;
}
const STACKTRACE_FRAME_LIMIT = 50;
const WEBPACK_ERROR_REGEXP = /\(error: (.*)\)/;
const STRIP_FRAME_REGEXP = /captureMessage|captureException/;
function createStackParser(...parsers) {
  const sortedParsers = parsers.sort((a, b) => a[0] - b[0]).map((p) => p[1]);
  return (stack, skipFirst = 0) => {
    const frames = [];
    const lines = stack.split("\n");
    for (let i = skipFirst; i < lines.length; i++) {
      const line = lines[i];
      if (line.length > 1024) {
        continue;
      }
      const cleanedLine = WEBPACK_ERROR_REGEXP.test(line) ? line.replace(WEBPACK_ERROR_REGEXP, "$1") : line;
      if (cleanedLine.match(/\S*Error: /)) {
        continue;
      }
      for (const parser of sortedParsers) {
        const frame = parser(cleanedLine);
        if (frame) {
          frames.push(frame);
          break;
        }
      }
      if (frames.length >= STACKTRACE_FRAME_LIMIT) {
        break;
      }
    }
    return stripSentryFramesAndReverse(frames);
  };
}
function stackParserFromStackParserOptions(stackParser) {
  if (Array.isArray(stackParser)) {
    return createStackParser(...stackParser);
  }
  return stackParser;
}
function stripSentryFramesAndReverse(stack) {
  if (!stack.length) {
    return [];
  }
  const localStack = Array.from(stack);
  if (/sentryWrapped/.test(localStack[localStack.length - 1].function || "")) {
    localStack.pop();
  }
  localStack.reverse();
  if (STRIP_FRAME_REGEXP.test(localStack[localStack.length - 1].function || "")) {
    localStack.pop();
    if (STRIP_FRAME_REGEXP.test(localStack[localStack.length - 1].function || "")) {
      localStack.pop();
    }
  }
  return localStack.slice(0, STACKTRACE_FRAME_LIMIT).map((frame) => ({
    ...frame,
    filename: frame.filename || localStack[localStack.length - 1].filename,
    function: frame.function || "?"
  }));
}
const defaultFunctionName = "<anonymous>";
function getFunctionName(fn) {
  try {
    if (!fn || typeof fn !== "function") {
      return defaultFunctionName;
    }
    return fn.name || defaultFunctionName;
  } catch (e2) {
    return defaultFunctionName;
  }
}
const WINDOW$6 = getGlobalObject();
function supportsFetch() {
  if (!("fetch" in WINDOW$6)) {
    return false;
  }
  try {
    new Headers();
    new Request("http://www.example.com");
    new Response();
    return true;
  } catch (e2) {
    return false;
  }
}
function isNativeFetch(func) {
  return func && /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(func.toString());
}
function supportsNativeFetch() {
  if (!supportsFetch()) {
    return false;
  }
  if (isNativeFetch(WINDOW$6.fetch)) {
    return true;
  }
  let result = false;
  const doc = WINDOW$6.document;
  if (doc && typeof doc.createElement === "function") {
    try {
      const sandbox = doc.createElement("iframe");
      sandbox.hidden = true;
      doc.head.appendChild(sandbox);
      if (sandbox.contentWindow && sandbox.contentWindow.fetch) {
        result = isNativeFetch(sandbox.contentWindow.fetch);
      }
      doc.head.removeChild(sandbox);
    } catch (err) {
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ", err);
    }
  }
  return result;
}
const WINDOW$5 = getGlobalObject();
function supportsHistory() {
  const chrome2 = WINDOW$5.chrome;
  const isChromePackagedApp = chrome2 && chrome2.app && chrome2.app.runtime;
  const hasHistoryApi = "history" in WINDOW$5 && !!WINDOW$5.history.pushState && !!WINDOW$5.history.replaceState;
  return !isChromePackagedApp && hasHistoryApi;
}
const WINDOW$4 = getGlobalObject();
const SENTRY_XHR_DATA_KEY = "__sentry_xhr_v2__";
const handlers$1 = {};
const instrumented = {};
function instrument(type) {
  if (instrumented[type]) {
    return;
  }
  instrumented[type] = true;
  switch (type) {
    case "console":
      instrumentConsole();
      break;
    case "dom":
      instrumentDOM();
      break;
    case "xhr":
      instrumentXHR();
      break;
    case "fetch":
      instrumentFetch();
      break;
    case "history":
      instrumentHistory();
      break;
    case "error":
      instrumentError();
      break;
    case "unhandledrejection":
      instrumentUnhandledRejection();
      break;
    default:
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.warn("unknown instrumentation type:", type);
      return;
  }
}
function addInstrumentationHandler(type, callback) {
  handlers$1[type] = handlers$1[type] || [];
  handlers$1[type].push(callback);
  instrument(type);
}
function triggerHandlers(type, data) {
  if (!type || !handlers$1[type]) {
    return;
  }
  for (const handler of handlers$1[type] || []) {
    try {
      handler(data);
    } catch (e2) {
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.error(
        `Error while triggering instrumentation handler.
Type: ${type}
Name: ${getFunctionName(handler)}
Error:`,
        e2
      );
    }
  }
}
function instrumentConsole() {
  if (!("console" in GLOBAL_OBJ)) {
    return;
  }
  CONSOLE_LEVELS.forEach(function(level) {
    if (!(level in GLOBAL_OBJ.console)) {
      return;
    }
    fill(GLOBAL_OBJ.console, level, function(originalConsoleMethod) {
      originalConsoleMethods[level] = originalConsoleMethod;
      return function(...args) {
        triggerHandlers("console", { args, level });
        const log = originalConsoleMethods[level];
        log && log.apply(GLOBAL_OBJ.console, args);
      };
    });
  });
}
function instrumentFetch() {
  if (!supportsNativeFetch()) {
    return;
  }
  fill(GLOBAL_OBJ, "fetch", function(originalFetch) {
    return function(...args) {
      const { method, url } = parseFetchArgs(args);
      const handlerData = {
        args,
        fetchData: {
          method,
          url
        },
        startTimestamp: Date.now()
      };
      triggerHandlers("fetch", {
        ...handlerData
      });
      return originalFetch.apply(GLOBAL_OBJ, args).then(
        (response) => {
          triggerHandlers("fetch", {
            ...handlerData,
            endTimestamp: Date.now(),
            response
          });
          return response;
        },
        (error) => {
          triggerHandlers("fetch", {
            ...handlerData,
            endTimestamp: Date.now(),
            error
          });
          throw error;
        }
      );
    };
  });
}
function hasProp(obj, prop) {
  return !!obj && typeof obj === "object" && !!obj[prop];
}
function getUrlFromResource(resource) {
  if (typeof resource === "string") {
    return resource;
  }
  if (!resource) {
    return "";
  }
  if (hasProp(resource, "url")) {
    return resource.url;
  }
  if (resource.toString) {
    return resource.toString();
  }
  return "";
}
function parseFetchArgs(fetchArgs) {
  if (fetchArgs.length === 0) {
    return { method: "GET", url: "" };
  }
  if (fetchArgs.length === 2) {
    const [url, options] = fetchArgs;
    return {
      url: getUrlFromResource(url),
      method: hasProp(options, "method") ? String(options.method).toUpperCase() : "GET"
    };
  }
  const arg = fetchArgs[0];
  return {
    url: getUrlFromResource(arg),
    method: hasProp(arg, "method") ? String(arg.method).toUpperCase() : "GET"
  };
}
function instrumentXHR() {
  if (!WINDOW$4.XMLHttpRequest) {
    return;
  }
  const xhrproto = XMLHttpRequest.prototype;
  fill(xhrproto, "open", function(originalOpen) {
    return function(...args) {
      const url = args[1];
      const xhrInfo = this[SENTRY_XHR_DATA_KEY] = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        method: isString(args[0]) ? args[0].toUpperCase() : args[0],
        url: args[1],
        request_headers: {}
      };
      if (isString(url) && xhrInfo.method === "POST" && url.match(/sentry_key/)) {
        this.__sentry_own_request__ = true;
      }
      const onreadystatechangeHandler = () => {
        const xhrInfo2 = this[SENTRY_XHR_DATA_KEY];
        if (!xhrInfo2) {
          return;
        }
        if (this.readyState === 4) {
          try {
            xhrInfo2.status_code = this.status;
          } catch (e2) {
          }
          triggerHandlers("xhr", {
            args,
            endTimestamp: Date.now(),
            startTimestamp: Date.now(),
            xhr: this
          });
        }
      };
      if ("onreadystatechange" in this && typeof this.onreadystatechange === "function") {
        fill(this, "onreadystatechange", function(original) {
          return function(...readyStateArgs) {
            onreadystatechangeHandler();
            return original.apply(this, readyStateArgs);
          };
        });
      } else {
        this.addEventListener("readystatechange", onreadystatechangeHandler);
      }
      fill(this, "setRequestHeader", function(original) {
        return function(...setRequestHeaderArgs) {
          const [header, value] = setRequestHeaderArgs;
          const xhrInfo2 = this[SENTRY_XHR_DATA_KEY];
          if (xhrInfo2) {
            xhrInfo2.request_headers[header.toLowerCase()] = value;
          }
          return original.apply(this, setRequestHeaderArgs);
        };
      });
      return originalOpen.apply(this, args);
    };
  });
  fill(xhrproto, "send", function(originalSend) {
    return function(...args) {
      const sentryXhrData = this[SENTRY_XHR_DATA_KEY];
      if (sentryXhrData && args[0] !== void 0) {
        sentryXhrData.body = args[0];
      }
      triggerHandlers("xhr", {
        args,
        startTimestamp: Date.now(),
        xhr: this
      });
      return originalSend.apply(this, args);
    };
  });
}
let lastHref;
function instrumentHistory() {
  if (!supportsHistory()) {
    return;
  }
  const oldOnPopState = WINDOW$4.onpopstate;
  WINDOW$4.onpopstate = function(...args) {
    const to = WINDOW$4.location.href;
    const from = lastHref;
    lastHref = to;
    triggerHandlers("history", {
      from,
      to
    });
    if (oldOnPopState) {
      try {
        return oldOnPopState.apply(this, args);
      } catch (_oO) {
      }
    }
  };
  function historyReplacementFunction(originalHistoryFunction) {
    return function(...args) {
      const url = args.length > 2 ? args[2] : void 0;
      if (url) {
        const from = lastHref;
        const to = String(url);
        lastHref = to;
        triggerHandlers("history", {
          from,
          to
        });
      }
      return originalHistoryFunction.apply(this, args);
    };
  }
  fill(WINDOW$4.history, "pushState", historyReplacementFunction);
  fill(WINDOW$4.history, "replaceState", historyReplacementFunction);
}
const debounceDuration = 1e3;
let debounceTimerID;
let lastCapturedEvent;
function shouldShortcircuitPreviousDebounce(previous, current) {
  if (!previous) {
    return true;
  }
  if (previous.type !== current.type) {
    return true;
  }
  try {
    if (previous.target !== current.target) {
      return true;
    }
  } catch (e2) {
  }
  return false;
}
function shouldSkipDOMEvent(event) {
  if (event.type !== "keypress") {
    return false;
  }
  try {
    const target = event.target;
    if (!target || !target.tagName) {
      return true;
    }
    if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
      return false;
    }
  } catch (e2) {
  }
  return true;
}
function makeDOMEventHandler(handler, globalListener = false) {
  return (event) => {
    if (!event || lastCapturedEvent === event) {
      return;
    }
    if (shouldSkipDOMEvent(event)) {
      return;
    }
    const name = event.type === "keypress" ? "input" : event.type;
    if (debounceTimerID === void 0) {
      handler({
        event,
        name,
        global: globalListener
      });
      lastCapturedEvent = event;
    } else if (shouldShortcircuitPreviousDebounce(lastCapturedEvent, event)) {
      handler({
        event,
        name,
        global: globalListener
      });
      lastCapturedEvent = event;
    }
    clearTimeout(debounceTimerID);
    debounceTimerID = WINDOW$4.setTimeout(() => {
      debounceTimerID = void 0;
    }, debounceDuration);
  };
}
function instrumentDOM() {
  if (!WINDOW$4.document) {
    return;
  }
  const triggerDOMHandler = triggerHandlers.bind(null, "dom");
  const globalDOMEventHandler = makeDOMEventHandler(triggerDOMHandler, true);
  WINDOW$4.document.addEventListener("click", globalDOMEventHandler, false);
  WINDOW$4.document.addEventListener("keypress", globalDOMEventHandler, false);
  ["EventTarget", "Node"].forEach((target) => {
    const proto = WINDOW$4[target] && WINDOW$4[target].prototype;
    if (!proto || !proto.hasOwnProperty || !proto.hasOwnProperty("addEventListener")) {
      return;
    }
    fill(proto, "addEventListener", function(originalAddEventListener) {
      return function(type, listener, options) {
        if (type === "click" || type == "keypress") {
          try {
            const el = this;
            const handlers2 = el.__sentry_instrumentation_handlers__ = el.__sentry_instrumentation_handlers__ || {};
            const handlerForType = handlers2[type] = handlers2[type] || { refCount: 0 };
            if (!handlerForType.handler) {
              const handler = makeDOMEventHandler(triggerDOMHandler);
              handlerForType.handler = handler;
              originalAddEventListener.call(this, type, handler, options);
            }
            handlerForType.refCount++;
          } catch (e2) {
          }
        }
        return originalAddEventListener.call(this, type, listener, options);
      };
    });
    fill(
      proto,
      "removeEventListener",
      function(originalRemoveEventListener) {
        return function(type, listener, options) {
          if (type === "click" || type == "keypress") {
            try {
              const el = this;
              const handlers2 = el.__sentry_instrumentation_handlers__ || {};
              const handlerForType = handlers2[type];
              if (handlerForType) {
                handlerForType.refCount--;
                if (handlerForType.refCount <= 0) {
                  originalRemoveEventListener.call(this, type, handlerForType.handler, options);
                  handlerForType.handler = void 0;
                  delete handlers2[type];
                }
                if (Object.keys(handlers2).length === 0) {
                  delete el.__sentry_instrumentation_handlers__;
                }
              }
            } catch (e2) {
            }
          }
          return originalRemoveEventListener.call(this, type, listener, options);
        };
      }
    );
  });
}
let _oldOnErrorHandler = null;
function instrumentError() {
  _oldOnErrorHandler = WINDOW$4.onerror;
  WINDOW$4.onerror = function(msg, url, line, column, error) {
    triggerHandlers("error", {
      column,
      error,
      line,
      msg,
      url
    });
    if (_oldOnErrorHandler && !_oldOnErrorHandler.__SENTRY_LOADER__) {
      return _oldOnErrorHandler.apply(this, arguments);
    }
    return false;
  };
  WINDOW$4.onerror.__SENTRY_INSTRUMENTED__ = true;
}
let _oldOnUnhandledRejectionHandler = null;
function instrumentUnhandledRejection() {
  _oldOnUnhandledRejectionHandler = WINDOW$4.onunhandledrejection;
  WINDOW$4.onunhandledrejection = function(e2) {
    triggerHandlers("unhandledrejection", e2);
    if (_oldOnUnhandledRejectionHandler && !_oldOnUnhandledRejectionHandler.__SENTRY_LOADER__) {
      return _oldOnUnhandledRejectionHandler.apply(this, arguments);
    }
    return true;
  };
  WINDOW$4.onunhandledrejection.__SENTRY_INSTRUMENTED__ = true;
}
function memoBuilder() {
  const hasWeakSet = typeof WeakSet === "function";
  const inner = hasWeakSet ? /* @__PURE__ */ new WeakSet() : [];
  function memoize(obj) {
    if (hasWeakSet) {
      if (inner.has(obj)) {
        return true;
      }
      inner.add(obj);
      return false;
    }
    for (let i = 0; i < inner.length; i++) {
      const value = inner[i];
      if (value === obj) {
        return true;
      }
    }
    inner.push(obj);
    return false;
  }
  function unmemoize(obj) {
    if (hasWeakSet) {
      inner.delete(obj);
    } else {
      for (let i = 0; i < inner.length; i++) {
        if (inner[i] === obj) {
          inner.splice(i, 1);
          break;
        }
      }
    }
  }
  return [memoize, unmemoize];
}
function uuid4() {
  const gbl = GLOBAL_OBJ;
  const crypto = gbl.crypto || gbl.msCrypto;
  let getRandomByte = () => Math.random() * 16;
  try {
    if (crypto && crypto.randomUUID) {
      return crypto.randomUUID().replace(/-/g, "");
    }
    if (crypto && crypto.getRandomValues) {
      getRandomByte = () => crypto.getRandomValues(new Uint8Array(1))[0];
    }
  } catch (_) {
  }
  return ([1e7] + 1e3 + 4e3 + 8e3 + 1e11).replace(
    /[018]/g,
    (c) => (
      // eslint-disable-next-line no-bitwise
      (c ^ (getRandomByte() & 15) >> c / 4).toString(16)
    )
  );
}
function getFirstException(event) {
  return event.exception && event.exception.values ? event.exception.values[0] : void 0;
}
function getEventDescription(event) {
  const { message, event_id: eventId } = event;
  if (message) {
    return message;
  }
  const firstException = getFirstException(event);
  if (firstException) {
    if (firstException.type && firstException.value) {
      return `${firstException.type}: ${firstException.value}`;
    }
    return firstException.type || firstException.value || eventId || "<unknown>";
  }
  return eventId || "<unknown>";
}
function addExceptionTypeValue(event, value, type) {
  const exception = event.exception = event.exception || {};
  const values = exception.values = exception.values || [];
  const firstException = values[0] = values[0] || {};
  if (!firstException.value) {
    firstException.value = value || "";
  }
  if (!firstException.type) {
    firstException.type = type || "Error";
  }
}
function addExceptionMechanism(event, newMechanism) {
  const firstException = getFirstException(event);
  if (!firstException) {
    return;
  }
  const defaultMechanism = { type: "generic", handled: true };
  const currentMechanism = firstException.mechanism;
  firstException.mechanism = { ...defaultMechanism, ...currentMechanism, ...newMechanism };
  if (newMechanism && "data" in newMechanism) {
    const mergedData = { ...currentMechanism && currentMechanism.data, ...newMechanism.data };
    firstException.mechanism.data = mergedData;
  }
}
function checkOrSetAlreadyCaught(exception) {
  if (exception && exception.__sentry_captured__) {
    return true;
  }
  try {
    addNonEnumerableProperty(exception, "__sentry_captured__", true);
  } catch (err) {
  }
  return false;
}
function arrayify(maybeArray) {
  return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
}
function isBrowserBundle() {
  return typeof __SENTRY_BROWSER_BUNDLE__ !== "undefined" && !!__SENTRY_BROWSER_BUNDLE__;
}
function getSDKSource() {
  return "npm";
}
function isNodeEnv() {
  return !isBrowserBundle() && Object.prototype.toString.call(typeof process !== "undefined" ? process : 0) === "[object process]";
}
function dynamicRequire(mod, request) {
  return mod.require(request);
}
function normalize(input, depth = 100, maxProperties = Infinity) {
  try {
    return visit("", input, depth, maxProperties);
  } catch (err) {
    return { ERROR: `**non-serializable** (${err})` };
  }
}
function normalizeToSize(object, depth = 3, maxSize = 100 * 1024) {
  const normalized = normalize(object, depth);
  if (jsonSize(normalized) > maxSize) {
    return normalizeToSize(object, depth - 1, maxSize);
  }
  return normalized;
}
function visit(key, value, depth = Infinity, maxProperties = Infinity, memo = memoBuilder()) {
  const [memoize, unmemoize] = memo;
  if (value == null || // this matches null and undefined -> eqeq not eqeqeq
  ["number", "boolean", "string"].includes(typeof value) && !isNaN$1(value)) {
    return value;
  }
  const stringified = stringifyValue(key, value);
  if (!stringified.startsWith("[object ")) {
    return stringified;
  }
  if (value["__sentry_skip_normalization__"]) {
    return value;
  }
  const remainingDepth = typeof value["__sentry_override_normalization_depth__"] === "number" ? value["__sentry_override_normalization_depth__"] : depth;
  if (remainingDepth === 0) {
    return stringified.replace("object ", "");
  }
  if (memoize(value)) {
    return "[Circular ~]";
  }
  const valueWithToJSON = value;
  if (valueWithToJSON && typeof valueWithToJSON.toJSON === "function") {
    try {
      const jsonValue = valueWithToJSON.toJSON();
      return visit("", jsonValue, remainingDepth - 1, maxProperties, memo);
    } catch (err) {
    }
  }
  const normalized = Array.isArray(value) ? [] : {};
  let numAdded = 0;
  const visitable = convertToPlainObject(value);
  for (const visitKey in visitable) {
    if (!Object.prototype.hasOwnProperty.call(visitable, visitKey)) {
      continue;
    }
    if (numAdded >= maxProperties) {
      normalized[visitKey] = "[MaxProperties ~]";
      break;
    }
    const visitValue = visitable[visitKey];
    normalized[visitKey] = visit(visitKey, visitValue, remainingDepth - 1, maxProperties, memo);
    numAdded++;
  }
  unmemoize(value);
  return normalized;
}
function stringifyValue(key, value) {
  try {
    if (key === "domain" && value && typeof value === "object" && value._events) {
      return "[Domain]";
    }
    if (key === "domainEmitter") {
      return "[DomainEmitter]";
    }
    if (typeof global !== "undefined" && value === global) {
      return "[Global]";
    }
    if (typeof window !== "undefined" && value === window) {
      return "[Window]";
    }
    if (typeof document !== "undefined" && value === document) {
      return "[Document]";
    }
    if (isVueViewModel(value)) {
      return "[VueViewModel]";
    }
    if (isSyntheticEvent(value)) {
      return "[SyntheticEvent]";
    }
    if (typeof value === "number" && value !== value) {
      return "[NaN]";
    }
    if (typeof value === "function") {
      return `[Function: ${getFunctionName(value)}]`;
    }
    if (typeof value === "symbol") {
      return `[${String(value)}]`;
    }
    if (typeof value === "bigint") {
      return `[BigInt: ${String(value)}]`;
    }
    const objName = getConstructorName(value);
    if (/^HTML(\w*)Element$/.test(objName)) {
      return `[HTMLElement: ${objName}]`;
    }
    return `[object ${objName}]`;
  } catch (err) {
    return `**non-serializable** (${err})`;
  }
}
function getConstructorName(value) {
  const prototype = Object.getPrototypeOf(value);
  return prototype ? prototype.constructor.name : "null prototype";
}
function utf8Length(value) {
  return ~-encodeURI(value).split(/%..|./).length;
}
function jsonSize(value) {
  return utf8Length(JSON.stringify(value));
}
var States;
(function(States2) {
  const PENDING = 0;
  States2[States2["PENDING"] = PENDING] = "PENDING";
  const RESOLVED = 1;
  States2[States2["RESOLVED"] = RESOLVED] = "RESOLVED";
  const REJECTED = 2;
  States2[States2["REJECTED"] = REJECTED] = "REJECTED";
})(States || (States = {}));
function resolvedSyncPromise(value) {
  return new SyncPromise((resolve) => {
    resolve(value);
  });
}
function rejectedSyncPromise(reason) {
  return new SyncPromise((_, reject) => {
    reject(reason);
  });
}
class SyncPromise {
  constructor(executor) {
    SyncPromise.prototype.__init.call(this);
    SyncPromise.prototype.__init2.call(this);
    SyncPromise.prototype.__init3.call(this);
    SyncPromise.prototype.__init4.call(this);
    this._state = States.PENDING;
    this._handlers = [];
    try {
      executor(this._resolve, this._reject);
    } catch (e2) {
      this._reject(e2);
    }
  }
  /** JSDoc */
  then(onfulfilled, onrejected) {
    return new SyncPromise((resolve, reject) => {
      this._handlers.push([
        false,
        (result) => {
          if (!onfulfilled) {
            resolve(result);
          } else {
            try {
              resolve(onfulfilled(result));
            } catch (e2) {
              reject(e2);
            }
          }
        },
        (reason) => {
          if (!onrejected) {
            reject(reason);
          } else {
            try {
              resolve(onrejected(reason));
            } catch (e2) {
              reject(e2);
            }
          }
        }
      ]);
      this._executeHandlers();
    });
  }
  /** JSDoc */
  catch(onrejected) {
    return this.then((val) => val, onrejected);
  }
  /** JSDoc */
  finally(onfinally) {
    return new SyncPromise((resolve, reject) => {
      let val;
      let isRejected;
      return this.then(
        (value) => {
          isRejected = false;
          val = value;
          if (onfinally) {
            onfinally();
          }
        },
        (reason) => {
          isRejected = true;
          val = reason;
          if (onfinally) {
            onfinally();
          }
        }
      ).then(() => {
        if (isRejected) {
          reject(val);
          return;
        }
        resolve(val);
      });
    });
  }
  /** JSDoc */
  __init() {
    this._resolve = (value) => {
      this._setResult(States.RESOLVED, value);
    };
  }
  /** JSDoc */
  __init2() {
    this._reject = (reason) => {
      this._setResult(States.REJECTED, reason);
    };
  }
  /** JSDoc */
  __init3() {
    this._setResult = (state, value) => {
      if (this._state !== States.PENDING) {
        return;
      }
      if (isThenable(value)) {
        void value.then(this._resolve, this._reject);
        return;
      }
      this._state = state;
      this._value = value;
      this._executeHandlers();
    };
  }
  /** JSDoc */
  __init4() {
    this._executeHandlers = () => {
      if (this._state === States.PENDING) {
        return;
      }
      const cachedHandlers = this._handlers.slice();
      this._handlers = [];
      cachedHandlers.forEach((handler) => {
        if (handler[0]) {
          return;
        }
        if (this._state === States.RESOLVED) {
          handler[1](this._value);
        }
        if (this._state === States.REJECTED) {
          handler[2](this._value);
        }
        handler[0] = true;
      });
    };
  }
}
function makePromiseBuffer(limit) {
  const buffer = [];
  function isReady() {
    return limit === void 0 || buffer.length < limit;
  }
  function remove(task) {
    return buffer.splice(buffer.indexOf(task), 1)[0];
  }
  function add(taskProducer) {
    if (!isReady()) {
      return rejectedSyncPromise(new SentryError("Not adding Promise because buffer limit was reached."));
    }
    const task = taskProducer();
    if (buffer.indexOf(task) === -1) {
      buffer.push(task);
    }
    void task.then(() => remove(task)).then(
      null,
      () => remove(task).then(null, () => {
      })
    );
    return task;
  }
  function drain(timeout) {
    return new SyncPromise((resolve, reject) => {
      let counter = buffer.length;
      if (!counter) {
        return resolve(true);
      }
      const capturedSetTimeout = setTimeout(() => {
        if (timeout && timeout > 0) {
          resolve(false);
        }
      }, timeout);
      buffer.forEach((item) => {
        void resolvedSyncPromise(item).then(() => {
          if (!--counter) {
            clearTimeout(capturedSetTimeout);
            resolve(true);
          }
        }, reject);
      });
    });
  }
  return {
    $: buffer,
    add,
    drain
  };
}
function parseUrl(url) {
  if (!url) {
    return {};
  }
  const match = url.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
  if (!match) {
    return {};
  }
  const query = match[6] || "";
  const fragment = match[8] || "";
  return {
    host: match[4],
    path: match[5],
    protocol: match[2],
    search: query,
    hash: fragment,
    relative: match[5] + query + fragment
    // everything minus origin
  };
}
const validSeverityLevels = ["fatal", "error", "warning", "log", "info", "debug"];
function severityLevelFromString(level) {
  return level === "warn" ? "warning" : validSeverityLevels.includes(level) ? level : "log";
}
const WINDOW$3 = getGlobalObject();
const dateTimestampSource = {
  nowSeconds: () => Date.now() / 1e3
};
function getBrowserPerformance() {
  const { performance: performance2 } = WINDOW$3;
  if (!performance2 || !performance2.now) {
    return void 0;
  }
  const timeOrigin = Date.now() - performance2.now();
  return {
    now: () => performance2.now(),
    timeOrigin
  };
}
function getNodePerformance() {
  try {
    const perfHooks = dynamicRequire(module, "perf_hooks");
    return perfHooks.performance;
  } catch (_) {
    return void 0;
  }
}
const platformPerformance = isNodeEnv() ? getNodePerformance() : getBrowserPerformance();
const timestampSource = platformPerformance === void 0 ? dateTimestampSource : {
  nowSeconds: () => (platformPerformance.timeOrigin + platformPerformance.now()) / 1e3
};
const dateTimestampInSeconds = dateTimestampSource.nowSeconds.bind(dateTimestampSource);
const timestampInSeconds = timestampSource.nowSeconds.bind(timestampSource);
const browserPerformanceTimeOrigin = (() => {
  const { performance: performance2 } = WINDOW$3;
  if (!performance2 || !performance2.now) {
    return void 0;
  }
  const threshold = 3600 * 1e3;
  const performanceNow = performance2.now();
  const dateNow = Date.now();
  const timeOriginDelta = performance2.timeOrigin ? Math.abs(performance2.timeOrigin + performanceNow - dateNow) : threshold;
  const timeOriginIsReliable = timeOriginDelta < threshold;
  const navigationStart = performance2.timing && performance2.timing.navigationStart;
  const hasNavigationStart = typeof navigationStart === "number";
  const navigationStartDelta = hasNavigationStart ? Math.abs(navigationStart + performanceNow - dateNow) : threshold;
  const navigationStartIsReliable = navigationStartDelta < threshold;
  if (timeOriginIsReliable || navigationStartIsReliable) {
    if (timeOriginDelta <= navigationStartDelta) {
      return performance2.timeOrigin;
    } else {
      return navigationStart;
    }
  }
  return dateNow;
})();
const BAGGAGE_HEADER_NAME = "baggage";
const SENTRY_BAGGAGE_KEY_PREFIX = "sentry-";
const SENTRY_BAGGAGE_KEY_PREFIX_REGEX = /^sentry-/;
const MAX_BAGGAGE_STRING_LENGTH = 8192;
function baggageHeaderToDynamicSamplingContext(baggageHeader) {
  if (!isString(baggageHeader) && !Array.isArray(baggageHeader)) {
    return void 0;
  }
  let baggageObject = {};
  if (Array.isArray(baggageHeader)) {
    baggageObject = baggageHeader.reduce((acc, curr) => {
      const currBaggageObject = baggageHeaderToObject(curr);
      return {
        ...acc,
        ...currBaggageObject
      };
    }, {});
  } else {
    if (!baggageHeader) {
      return void 0;
    }
    baggageObject = baggageHeaderToObject(baggageHeader);
  }
  const dynamicSamplingContext = Object.entries(baggageObject).reduce((acc, [key, value]) => {
    if (key.match(SENTRY_BAGGAGE_KEY_PREFIX_REGEX)) {
      const nonPrefixedKey = key.slice(SENTRY_BAGGAGE_KEY_PREFIX.length);
      acc[nonPrefixedKey] = value;
    }
    return acc;
  }, {});
  if (Object.keys(dynamicSamplingContext).length > 0) {
    return dynamicSamplingContext;
  } else {
    return void 0;
  }
}
function dynamicSamplingContextToSentryBaggageHeader(dynamicSamplingContext) {
  if (!dynamicSamplingContext) {
    return void 0;
  }
  const sentryPrefixedDSC = Object.entries(dynamicSamplingContext).reduce(
    (acc, [dscKey, dscValue]) => {
      if (dscValue) {
        acc[`${SENTRY_BAGGAGE_KEY_PREFIX}${dscKey}`] = dscValue;
      }
      return acc;
    },
    {}
  );
  return objectToBaggageHeader(sentryPrefixedDSC);
}
function baggageHeaderToObject(baggageHeader) {
  return baggageHeader.split(",").map((baggageEntry) => baggageEntry.split("=").map((keyOrValue) => decodeURIComponent(keyOrValue.trim()))).reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
}
function objectToBaggageHeader(object) {
  if (Object.keys(object).length === 0) {
    return void 0;
  }
  return Object.entries(object).reduce((baggageHeader, [objectKey, objectValue], currentIndex) => {
    const baggageEntry = `${encodeURIComponent(objectKey)}=${encodeURIComponent(objectValue)}`;
    const newBaggageHeader = currentIndex === 0 ? baggageEntry : `${baggageHeader},${baggageEntry}`;
    if (newBaggageHeader.length > MAX_BAGGAGE_STRING_LENGTH) {
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.warn(
        `Not adding key: ${objectKey} with val: ${objectValue} to baggage header due to exceeding baggage size limits.`
      );
      return baggageHeader;
    } else {
      return newBaggageHeader;
    }
  }, "");
}
const TRACEPARENT_REGEXP = new RegExp(
  "^[ \\t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \\t]*$"
  // whitespace
);
function extractTraceparentData(traceparent) {
  if (!traceparent) {
    return void 0;
  }
  const matches = traceparent.match(TRACEPARENT_REGEXP);
  if (!matches) {
    return void 0;
  }
  let parentSampled;
  if (matches[3] === "1") {
    parentSampled = true;
  } else if (matches[3] === "0") {
    parentSampled = false;
  }
  return {
    traceId: matches[1],
    parentSampled,
    parentSpanId: matches[2]
  };
}
function tracingContextFromHeaders(sentryTrace, baggage) {
  const traceparentData = extractTraceparentData(sentryTrace);
  const dynamicSamplingContext = baggageHeaderToDynamicSamplingContext(baggage);
  const { traceId, parentSpanId, parentSampled } = traceparentData || {};
  const propagationContext = {
    traceId: traceId || uuid4(),
    spanId: uuid4().substring(16),
    sampled: parentSampled
  };
  if (parentSpanId) {
    propagationContext.parentSpanId = parentSpanId;
  }
  if (dynamicSamplingContext) {
    propagationContext.dsc = dynamicSamplingContext;
  }
  return {
    traceparentData,
    dynamicSamplingContext,
    propagationContext
  };
}
function generateSentryTraceHeader(traceId = uuid4(), spanId = uuid4().substring(16), sampled) {
  let sampledString = "";
  if (sampled !== void 0) {
    sampledString = sampled ? "-1" : "-0";
  }
  return `${traceId}-${spanId}${sampledString}`;
}
function createEnvelope(headers, items = []) {
  return [headers, items];
}
function addItemToEnvelope(envelope, newItem) {
  const [headers, items] = envelope;
  return [headers, [...items, newItem]];
}
function forEachEnvelopeItem(envelope, callback) {
  const envelopeItems = envelope[1];
  for (const envelopeItem of envelopeItems) {
    const envelopeItemType = envelopeItem[0].type;
    const result = callback(envelopeItem, envelopeItemType);
    if (result) {
      return true;
    }
  }
  return false;
}
function encodeUTF8(input, textEncoder) {
  const utf8 = textEncoder || new TextEncoder();
  return utf8.encode(input);
}
function serializeEnvelope(envelope, textEncoder) {
  const [envHeaders, items] = envelope;
  let parts = JSON.stringify(envHeaders);
  function append(next) {
    if (typeof parts === "string") {
      parts = typeof next === "string" ? parts + next : [encodeUTF8(parts, textEncoder), next];
    } else {
      parts.push(typeof next === "string" ? encodeUTF8(next, textEncoder) : next);
    }
  }
  for (const item of items) {
    const [itemHeaders, payload] = item;
    append(`
${JSON.stringify(itemHeaders)}
`);
    if (typeof payload === "string" || payload instanceof Uint8Array) {
      append(payload);
    } else {
      let stringifiedPayload;
      try {
        stringifiedPayload = JSON.stringify(payload);
      } catch (e2) {
        stringifiedPayload = JSON.stringify(normalize(payload));
      }
      append(stringifiedPayload);
    }
  }
  return typeof parts === "string" ? parts : concatBuffers(parts);
}
function concatBuffers(buffers) {
  const totalLength = buffers.reduce((acc, buf) => acc + buf.length, 0);
  const merged = new Uint8Array(totalLength);
  let offset = 0;
  for (const buffer of buffers) {
    merged.set(buffer, offset);
    offset += buffer.length;
  }
  return merged;
}
function createAttachmentEnvelopeItem(attachment, textEncoder) {
  const buffer = typeof attachment.data === "string" ? encodeUTF8(attachment.data, textEncoder) : attachment.data;
  return [
    dropUndefinedKeys({
      type: "attachment",
      length: buffer.length,
      filename: attachment.filename,
      content_type: attachment.contentType,
      attachment_type: attachment.attachmentType
    }),
    buffer
  ];
}
const ITEM_TYPE_TO_DATA_CATEGORY_MAP = {
  session: "session",
  sessions: "session",
  attachment: "attachment",
  transaction: "transaction",
  event: "error",
  client_report: "internal",
  user_report: "default",
  profile: "profile",
  replay_event: "replay",
  replay_recording: "replay",
  check_in: "monitor"
};
function envelopeItemTypeToDataCategory(type) {
  return ITEM_TYPE_TO_DATA_CATEGORY_MAP[type];
}
function getSdkMetadataForEnvelopeHeader(metadataOrEvent) {
  if (!metadataOrEvent || !metadataOrEvent.sdk) {
    return;
  }
  const { name, version: version2 } = metadataOrEvent.sdk;
  return { name, version: version2 };
}
function createEventEnvelopeHeaders(event, sdkInfo, tunnel, dsn) {
  const dynamicSamplingContext = event.sdkProcessingMetadata && event.sdkProcessingMetadata.dynamicSamplingContext;
  return {
    event_id: event.event_id,
    sent_at: (/* @__PURE__ */ new Date()).toISOString(),
    ...sdkInfo && { sdk: sdkInfo },
    ...!!tunnel && { dsn: dsnToString(dsn) },
    ...dynamicSamplingContext && {
      trace: dropUndefinedKeys({ ...dynamicSamplingContext })
    }
  };
}
function createClientReportEnvelope(discarded_events, dsn, timestamp) {
  const clientReportItem = [
    { type: "client_report" },
    {
      timestamp: timestamp || dateTimestampInSeconds(),
      discarded_events
    }
  ];
  return createEnvelope(dsn ? { dsn } : {}, [clientReportItem]);
}
const DEFAULT_RETRY_AFTER = 60 * 1e3;
function parseRetryAfterHeader(header, now = Date.now()) {
  const headerDelay = parseInt(`${header}`, 10);
  if (!isNaN(headerDelay)) {
    return headerDelay * 1e3;
  }
  const headerDate = Date.parse(`${header}`);
  if (!isNaN(headerDate)) {
    return headerDate - now;
  }
  return DEFAULT_RETRY_AFTER;
}
function disabledUntil(limits, category) {
  return limits[category] || limits.all || 0;
}
function isRateLimited(limits, category, now = Date.now()) {
  return disabledUntil(limits, category) > now;
}
function updateRateLimits(limits, { statusCode, headers }, now = Date.now()) {
  const updatedRateLimits = {
    ...limits
  };
  const rateLimitHeader = headers && headers["x-sentry-rate-limits"];
  const retryAfterHeader = headers && headers["retry-after"];
  if (rateLimitHeader) {
    for (const limit of rateLimitHeader.trim().split(",")) {
      const [retryAfter, categories] = limit.split(":", 2);
      const headerDelay = parseInt(retryAfter, 10);
      const delay = (!isNaN(headerDelay) ? headerDelay : 60) * 1e3;
      if (!categories) {
        updatedRateLimits.all = now + delay;
      } else {
        for (const category of categories.split(";")) {
          updatedRateLimits[category] = now + delay;
        }
      }
    }
  } else if (retryAfterHeader) {
    updatedRateLimits.all = now + parseRetryAfterHeader(retryAfterHeader, now);
  } else if (statusCode === 429) {
    updatedRateLimits.all = now + 60 * 1e3;
  }
  return updatedRateLimits;
}
const DEFAULT_ENVIRONMENT = "production";
function makeSession$1(context) {
  const startingTime = timestampInSeconds();
  const session2 = {
    sid: uuid4(),
    init: true,
    timestamp: startingTime,
    started: startingTime,
    duration: 0,
    status: "ok",
    errors: 0,
    ignoreDuration: false,
    toJSON: () => sessionToJSON(session2)
  };
  if (context) {
    updateSession(session2, context);
  }
  return session2;
}
function updateSession(session2, context = {}) {
  if (context.user) {
    if (!session2.ipAddress && context.user.ip_address) {
      session2.ipAddress = context.user.ip_address;
    }
    if (!session2.did && !context.did) {
      session2.did = context.user.id || context.user.email || context.user.username;
    }
  }
  session2.timestamp = context.timestamp || timestampInSeconds();
  if (context.ignoreDuration) {
    session2.ignoreDuration = context.ignoreDuration;
  }
  if (context.sid) {
    session2.sid = context.sid.length === 32 ? context.sid : uuid4();
  }
  if (context.init !== void 0) {
    session2.init = context.init;
  }
  if (!session2.did && context.did) {
    session2.did = `${context.did}`;
  }
  if (typeof context.started === "number") {
    session2.started = context.started;
  }
  if (session2.ignoreDuration) {
    session2.duration = void 0;
  } else if (typeof context.duration === "number") {
    session2.duration = context.duration;
  } else {
    const duration = session2.timestamp - session2.started;
    session2.duration = duration >= 0 ? duration : 0;
  }
  if (context.release) {
    session2.release = context.release;
  }
  if (context.environment) {
    session2.environment = context.environment;
  }
  if (!session2.ipAddress && context.ipAddress) {
    session2.ipAddress = context.ipAddress;
  }
  if (!session2.userAgent && context.userAgent) {
    session2.userAgent = context.userAgent;
  }
  if (typeof context.errors === "number") {
    session2.errors = context.errors;
  }
  if (context.status) {
    session2.status = context.status;
  }
}
function closeSession(session2, status) {
  let context = {};
  if (status) {
    context = { status };
  } else if (session2.status === "ok") {
    context = { status: "exited" };
  }
  updateSession(session2, context);
}
function sessionToJSON(session2) {
  return dropUndefinedKeys({
    sid: `${session2.sid}`,
    init: session2.init,
    // Make sure that sec is converted to ms for date constructor
    started: new Date(session2.started * 1e3).toISOString(),
    timestamp: new Date(session2.timestamp * 1e3).toISOString(),
    status: session2.status,
    errors: session2.errors,
    did: typeof session2.did === "number" || typeof session2.did === "string" ? `${session2.did}` : void 0,
    duration: session2.duration,
    attrs: {
      release: session2.release,
      environment: session2.environment,
      ip_address: session2.ipAddress,
      user_agent: session2.userAgent
    }
  });
}
const DEFAULT_MAX_BREADCRUMBS = 100;
class Scope {
  /** Flag if notifying is happening. */
  /** Callback for client to receive scope changes. */
  /** Callback list that will be called after {@link applyToEvent}. */
  /** Array of breadcrumbs. */
  /** User */
  /** Tags */
  /** Extra */
  /** Contexts */
  /** Attachments */
  /** Propagation Context for distributed tracing */
  /**
   * A place to stash data which is needed at some point in the SDK's event processing pipeline but which shouldn't get
   * sent to Sentry
   */
  /** Fingerprint */
  /** Severity */
  // eslint-disable-next-line deprecation/deprecation
  /** Transaction Name */
  /** Span */
  /** Session */
  /** Request Mode Session Status */
  // NOTE: Any field which gets added here should get added not only to the constructor but also to the `clone` method.
  constructor() {
    this._notifyingListeners = false;
    this._scopeListeners = [];
    this._eventProcessors = [];
    this._breadcrumbs = [];
    this._attachments = [];
    this._user = {};
    this._tags = {};
    this._extra = {};
    this._contexts = {};
    this._sdkProcessingMetadata = {};
    this._propagationContext = generatePropagationContext();
  }
  /**
   * Inherit values from the parent scope.
   * @param scope to clone.
   */
  static clone(scope) {
    const newScope = new Scope();
    if (scope) {
      newScope._breadcrumbs = [...scope._breadcrumbs];
      newScope._tags = { ...scope._tags };
      newScope._extra = { ...scope._extra };
      newScope._contexts = { ...scope._contexts };
      newScope._user = scope._user;
      newScope._level = scope._level;
      newScope._span = scope._span;
      newScope._session = scope._session;
      newScope._transactionName = scope._transactionName;
      newScope._fingerprint = scope._fingerprint;
      newScope._eventProcessors = [...scope._eventProcessors];
      newScope._requestSession = scope._requestSession;
      newScope._attachments = [...scope._attachments];
      newScope._sdkProcessingMetadata = { ...scope._sdkProcessingMetadata };
      newScope._propagationContext = { ...scope._propagationContext };
    }
    return newScope;
  }
  /**
   * Add internal on change listener. Used for sub SDKs that need to store the scope.
   * @hidden
   */
  addScopeListener(callback) {
    this._scopeListeners.push(callback);
  }
  /**
   * @inheritDoc
   */
  addEventProcessor(callback) {
    this._eventProcessors.push(callback);
    return this;
  }
  /**
   * @inheritDoc
   */
  setUser(user2) {
    this._user = user2 || {};
    if (this._session) {
      updateSession(this._session, { user: user2 });
    }
    this._notifyScopeListeners();
    return this;
  }
  /**
   * @inheritDoc
   */
  getUser() {
    return this._user;
  }
  /**
   * @inheritDoc
   */
  getRequestSession() {
    return this._requestSession;
  }
  /**
   * @inheritDoc
   */
  setRequestSession(requestSession) {
    this._requestSession = requestSession;
    return this;
  }
  /**
   * @inheritDoc
   */
  setTags(tags) {
    this._tags = {
      ...this._tags,
      ...tags
    };
    this._notifyScopeListeners();
    return this;
  }
  /**
   * @inheritDoc
   */
  setTag(key, value) {
    this._tags = { ...this._tags, [key]: value };
    this._notifyScopeListeners();
    return this;
  }
  /**
   * @inheritDoc
   */
  setExtras(extras) {
    this._extra = {
      ...this._extra,
      ...extras
    };
    this._notifyScopeListeners();
    return this;
  }
  /**
   * @inheritDoc
   */
  setExtra(key, extra) {
    this._extra = { ...this._extra, [key]: extra };
    this._notifyScopeListeners();
    return this;
  }
  /**
   * @inheritDoc
   */
  setFingerprint(fingerprint) {
    this._fingerprint = fingerprint;
    this._notifyScopeListeners();
    return this;
  }
  /**
   * @inheritDoc
   */
  setLevel(level) {
    this._level = level;
    this._notifyScopeListeners();
    return this;
  }
  /**
   * @inheritDoc
   */
  setTransactionName(name) {
    this._transactionName = name;
    this._notifyScopeListeners();
    return this;
  }
  /**
   * @inheritDoc
   */
  setContext(key, context) {
    if (context === null) {
      delete this._contexts[key];
    } else {
      this._contexts[key] = context;
    }
    this._notifyScopeListeners();
    return this;
  }
  /**
   * @inheritDoc
   */
  setSpan(span) {
    this._span = span;
    this._notifyScopeListeners();
    return this;
  }
  /**
   * @inheritDoc
   */
  getSpan() {
    return this._span;
  }
  /**
   * @inheritDoc
   */
  getTransaction() {
    const span = this.getSpan();
    return span && span.transaction;
  }
  /**
   * @inheritDoc
   */
  setSession(session2) {
    if (!session2) {
      delete this._session;
    } else {
      this._session = session2;
    }
    this._notifyScopeListeners();
    return this;
  }
  /**
   * @inheritDoc
   */
  getSession() {
    return this._session;
  }
  /**
   * @inheritDoc
   */
  update(captureContext) {
    if (!captureContext) {
      return this;
    }
    if (typeof captureContext === "function") {
      const updatedScope = captureContext(this);
      return updatedScope instanceof Scope ? updatedScope : this;
    }
    if (captureContext instanceof Scope) {
      this._tags = { ...this._tags, ...captureContext._tags };
      this._extra = { ...this._extra, ...captureContext._extra };
      this._contexts = { ...this._contexts, ...captureContext._contexts };
      if (captureContext._user && Object.keys(captureContext._user).length) {
        this._user = captureContext._user;
      }
      if (captureContext._level) {
        this._level = captureContext._level;
      }
      if (captureContext._fingerprint) {
        this._fingerprint = captureContext._fingerprint;
      }
      if (captureContext._requestSession) {
        this._requestSession = captureContext._requestSession;
      }
      if (captureContext._propagationContext) {
        this._propagationContext = captureContext._propagationContext;
      }
    } else if (isPlainObject(captureContext)) {
      captureContext = captureContext;
      this._tags = { ...this._tags, ...captureContext.tags };
      this._extra = { ...this._extra, ...captureContext.extra };
      this._contexts = { ...this._contexts, ...captureContext.contexts };
      if (captureContext.user) {
        this._user = captureContext.user;
      }
      if (captureContext.level) {
        this._level = captureContext.level;
      }
      if (captureContext.fingerprint) {
        this._fingerprint = captureContext.fingerprint;
      }
      if (captureContext.requestSession) {
        this._requestSession = captureContext.requestSession;
      }
      if (captureContext.propagationContext) {
        this._propagationContext = captureContext.propagationContext;
      }
    }
    return this;
  }
  /**
   * @inheritDoc
   */
  clear() {
    this._breadcrumbs = [];
    this._tags = {};
    this._extra = {};
    this._user = {};
    this._contexts = {};
    this._level = void 0;
    this._transactionName = void 0;
    this._fingerprint = void 0;
    this._requestSession = void 0;
    this._span = void 0;
    this._session = void 0;
    this._notifyScopeListeners();
    this._attachments = [];
    this._propagationContext = generatePropagationContext();
    return this;
  }
  /**
   * @inheritDoc
   */
  addBreadcrumb(breadcrumb, maxBreadcrumbs) {
    const maxCrumbs = typeof maxBreadcrumbs === "number" ? maxBreadcrumbs : DEFAULT_MAX_BREADCRUMBS;
    if (maxCrumbs <= 0) {
      return this;
    }
    const mergedBreadcrumb = {
      timestamp: dateTimestampInSeconds(),
      ...breadcrumb
    };
    const breadcrumbs = this._breadcrumbs;
    breadcrumbs.push(mergedBreadcrumb);
    this._breadcrumbs = breadcrumbs.length > maxCrumbs ? breadcrumbs.slice(-maxCrumbs) : breadcrumbs;
    this._notifyScopeListeners();
    return this;
  }
  /**
   * @inheritDoc
   */
  getLastBreadcrumb() {
    return this._breadcrumbs[this._breadcrumbs.length - 1];
  }
  /**
   * @inheritDoc
   */
  clearBreadcrumbs() {
    this._breadcrumbs = [];
    this._notifyScopeListeners();
    return this;
  }
  /**
   * @inheritDoc
   */
  addAttachment(attachment) {
    this._attachments.push(attachment);
    return this;
  }
  /**
   * @inheritDoc
   */
  getAttachments() {
    return this._attachments;
  }
  /**
   * @inheritDoc
   */
  clearAttachments() {
    this._attachments = [];
    return this;
  }
  /**
   * Applies data from the scope to the event and runs all event processors on it.
   *
   * @param event Event
   * @param hint Object containing additional information about the original exception, for use by the event processors.
   * @hidden
   */
  applyToEvent(event, hint = {}) {
    if (this._extra && Object.keys(this._extra).length) {
      event.extra = { ...this._extra, ...event.extra };
    }
    if (this._tags && Object.keys(this._tags).length) {
      event.tags = { ...this._tags, ...event.tags };
    }
    if (this._user && Object.keys(this._user).length) {
      event.user = { ...this._user, ...event.user };
    }
    if (this._contexts && Object.keys(this._contexts).length) {
      event.contexts = { ...this._contexts, ...event.contexts };
    }
    if (this._level) {
      event.level = this._level;
    }
    if (this._transactionName) {
      event.transaction = this._transactionName;
    }
    if (this._span) {
      event.contexts = { trace: this._span.getTraceContext(), ...event.contexts };
      const transaction = this._span.transaction;
      if (transaction) {
        event.sdkProcessingMetadata = {
          dynamicSamplingContext: transaction.getDynamicSamplingContext(),
          ...event.sdkProcessingMetadata
        };
        const transactionName = transaction.name;
        if (transactionName) {
          event.tags = { transaction: transactionName, ...event.tags };
        }
      }
    }
    this._applyFingerprint(event);
    const scopeBreadcrumbs = this._getBreadcrumbs();
    const breadcrumbs = [...event.breadcrumbs || [], ...scopeBreadcrumbs];
    event.breadcrumbs = breadcrumbs.length > 0 ? breadcrumbs : void 0;
    event.sdkProcessingMetadata = {
      ...event.sdkProcessingMetadata,
      ...this._sdkProcessingMetadata,
      propagationContext: this._propagationContext
    };
    return this._notifyEventProcessors([...getGlobalEventProcessors(), ...this._eventProcessors], event, hint);
  }
  /**
   * Add data which will be accessible during event processing but won't get sent to Sentry
   */
  setSDKProcessingMetadata(newData) {
    this._sdkProcessingMetadata = { ...this._sdkProcessingMetadata, ...newData };
    return this;
  }
  /**
   * @inheritDoc
   */
  setPropagationContext(context) {
    this._propagationContext = context;
    return this;
  }
  /**
   * @inheritDoc
   */
  getPropagationContext() {
    return this._propagationContext;
  }
  /**
   * Get the breadcrumbs for this scope.
   */
  _getBreadcrumbs() {
    return this._breadcrumbs;
  }
  /**
   * This will be called after {@link applyToEvent} is finished.
   */
  _notifyEventProcessors(processors, event, hint, index = 0) {
    return new SyncPromise((resolve, reject) => {
      const processor = processors[index];
      if (event === null || typeof processor !== "function") {
        resolve(event);
      } else {
        const result = processor({ ...event }, hint);
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && processor.id && result === null && logger.log(`Event processor "${processor.id}" dropped event`);
        if (isThenable(result)) {
          void result.then((final) => this._notifyEventProcessors(processors, final, hint, index + 1).then(resolve)).then(null, reject);
        } else {
          void this._notifyEventProcessors(processors, result, hint, index + 1).then(resolve).then(null, reject);
        }
      }
    });
  }
  /**
   * This will be called on every set call.
   */
  _notifyScopeListeners() {
    if (!this._notifyingListeners) {
      this._notifyingListeners = true;
      this._scopeListeners.forEach((callback) => {
        callback(this);
      });
      this._notifyingListeners = false;
    }
  }
  /**
   * Applies fingerprint from the scope to the event if there's one,
   * uses message if there's one instead or get rid of empty fingerprint
   */
  _applyFingerprint(event) {
    event.fingerprint = event.fingerprint ? arrayify(event.fingerprint) : [];
    if (this._fingerprint) {
      event.fingerprint = event.fingerprint.concat(this._fingerprint);
    }
    if (event.fingerprint && !event.fingerprint.length) {
      delete event.fingerprint;
    }
  }
}
function getGlobalEventProcessors() {
  return getGlobalSingleton("globalEventProcessors", () => []);
}
function addGlobalEventProcessor(callback) {
  getGlobalEventProcessors().push(callback);
}
function generatePropagationContext() {
  return {
    traceId: uuid4(),
    spanId: uuid4().substring(16)
  };
}
const API_VERSION = 4;
const DEFAULT_BREADCRUMBS = 100;
class Hub {
  /** Is a {@link Layer}[] containing the client and scope */
  /** Contains the last event id of a captured event.  */
  /**
   * Creates a new instance of the hub, will push one {@link Layer} into the
   * internal stack on creation.
   *
   * @param client bound to the hub.
   * @param scope bound to the hub.
   * @param version number, higher number means higher priority.
   */
  constructor(client, scope = new Scope(), _version = API_VERSION) {
    this._version = _version;
    this._stack = [{ scope }];
    if (client) {
      this.bindClient(client);
    }
  }
  /**
   * @inheritDoc
   */
  isOlderThan(version2) {
    return this._version < version2;
  }
  /**
   * @inheritDoc
   */
  bindClient(client) {
    const top = this.getStackTop();
    top.client = client;
    if (client && client.setupIntegrations) {
      client.setupIntegrations();
    }
  }
  /**
   * @inheritDoc
   */
  pushScope() {
    const scope = Scope.clone(this.getScope());
    this.getStack().push({
      client: this.getClient(),
      scope
    });
    return scope;
  }
  /**
   * @inheritDoc
   */
  popScope() {
    if (this.getStack().length <= 1)
      return false;
    return !!this.getStack().pop();
  }
  /**
   * @inheritDoc
   */
  withScope(callback) {
    const scope = this.pushScope();
    try {
      callback(scope);
    } finally {
      this.popScope();
    }
  }
  /**
   * @inheritDoc
   */
  getClient() {
    return this.getStackTop().client;
  }
  /** Returns the scope of the top stack. */
  getScope() {
    return this.getStackTop().scope;
  }
  /** Returns the scope stack for domains or the process. */
  getStack() {
    return this._stack;
  }
  /** Returns the topmost scope layer in the order domain > local > process. */
  getStackTop() {
    return this._stack[this._stack.length - 1];
  }
  /**
   * @inheritDoc
   */
  captureException(exception, hint) {
    const eventId = this._lastEventId = hint && hint.event_id ? hint.event_id : uuid4();
    const syntheticException = new Error("Sentry syntheticException");
    this._withClient((client, scope) => {
      client.captureException(
        exception,
        {
          originalException: exception,
          syntheticException,
          ...hint,
          event_id: eventId
        },
        scope
      );
    });
    return eventId;
  }
  /**
   * @inheritDoc
   */
  captureMessage(message, level, hint) {
    const eventId = this._lastEventId = hint && hint.event_id ? hint.event_id : uuid4();
    const syntheticException = new Error(message);
    this._withClient((client, scope) => {
      client.captureMessage(
        message,
        level,
        {
          originalException: message,
          syntheticException,
          ...hint,
          event_id: eventId
        },
        scope
      );
    });
    return eventId;
  }
  /**
   * @inheritDoc
   */
  captureEvent(event, hint) {
    const eventId = hint && hint.event_id ? hint.event_id : uuid4();
    if (!event.type) {
      this._lastEventId = eventId;
    }
    this._withClient((client, scope) => {
      client.captureEvent(event, { ...hint, event_id: eventId }, scope);
    });
    return eventId;
  }
  /**
   * @inheritDoc
   */
  lastEventId() {
    return this._lastEventId;
  }
  /**
   * @inheritDoc
   */
  addBreadcrumb(breadcrumb, hint) {
    const { scope, client } = this.getStackTop();
    if (!client)
      return;
    const { beforeBreadcrumb = null, maxBreadcrumbs = DEFAULT_BREADCRUMBS } = client.getOptions && client.getOptions() || {};
    if (maxBreadcrumbs <= 0)
      return;
    const timestamp = dateTimestampInSeconds();
    const mergedBreadcrumb = { timestamp, ...breadcrumb };
    const finalBreadcrumb = beforeBreadcrumb ? consoleSandbox(() => beforeBreadcrumb(mergedBreadcrumb, hint)) : mergedBreadcrumb;
    if (finalBreadcrumb === null)
      return;
    if (client.emit) {
      client.emit("beforeAddBreadcrumb", finalBreadcrumb, hint);
    }
    scope.addBreadcrumb(finalBreadcrumb, maxBreadcrumbs);
  }
  /**
   * @inheritDoc
   */
  setUser(user2) {
    this.getScope().setUser(user2);
  }
  /**
   * @inheritDoc
   */
  setTags(tags) {
    this.getScope().setTags(tags);
  }
  /**
   * @inheritDoc
   */
  setExtras(extras) {
    this.getScope().setExtras(extras);
  }
  /**
   * @inheritDoc
   */
  setTag(key, value) {
    this.getScope().setTag(key, value);
  }
  /**
   * @inheritDoc
   */
  setExtra(key, extra) {
    this.getScope().setExtra(key, extra);
  }
  /**
   * @inheritDoc
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setContext(name, context) {
    this.getScope().setContext(name, context);
  }
  /**
   * @inheritDoc
   */
  configureScope(callback) {
    const { scope, client } = this.getStackTop();
    if (client) {
      callback(scope);
    }
  }
  /**
   * @inheritDoc
   */
  run(callback) {
    const oldHub = makeMain(this);
    try {
      callback(this);
    } finally {
      makeMain(oldHub);
    }
  }
  /**
   * @inheritDoc
   */
  getIntegration(integration) {
    const client = this.getClient();
    if (!client)
      return null;
    try {
      return client.getIntegration(integration);
    } catch (_oO) {
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.warn(`Cannot retrieve integration ${integration.id} from the current Hub`);
      return null;
    }
  }
  /**
   * @inheritDoc
   */
  startTransaction(context, customSamplingContext) {
    const result = this._callExtensionMethod("startTransaction", context, customSamplingContext);
    if ((typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && !result) {
      const client = this.getClient();
      if (!client) {
        console.warn(
          "Tracing extension 'startTransaction' is missing. You should 'init' the SDK before calling 'startTransaction'"
        );
      } else {
        console.warn(`Tracing extension 'startTransaction' has not been added. Call 'addTracingExtensions' before calling 'init':
Sentry.addTracingExtensions();
Sentry.init({...});
`);
      }
    }
    return result;
  }
  /**
   * @inheritDoc
   */
  traceHeaders() {
    return this._callExtensionMethod("traceHeaders");
  }
  /**
   * @inheritDoc
   */
  captureSession(endSession = false) {
    if (endSession) {
      return this.endSession();
    }
    this._sendSessionUpdate();
  }
  /**
   * @inheritDoc
   */
  endSession() {
    const layer = this.getStackTop();
    const scope = layer.scope;
    const session2 = scope.getSession();
    if (session2) {
      closeSession(session2);
    }
    this._sendSessionUpdate();
    scope.setSession();
  }
  /**
   * @inheritDoc
   */
  startSession(context) {
    const { scope, client } = this.getStackTop();
    const { release, environment = DEFAULT_ENVIRONMENT } = client && client.getOptions() || {};
    const { userAgent } = GLOBAL_OBJ.navigator || {};
    const session2 = makeSession$1({
      release,
      environment,
      user: scope.getUser(),
      ...userAgent && { userAgent },
      ...context
    });
    const currentSession = scope.getSession && scope.getSession();
    if (currentSession && currentSession.status === "ok") {
      updateSession(currentSession, { status: "exited" });
    }
    this.endSession();
    scope.setSession(session2);
    return session2;
  }
  /**
   * Returns if default PII should be sent to Sentry and propagated in ourgoing requests
   * when Tracing is used.
   */
  shouldSendDefaultPii() {
    const client = this.getClient();
    const options = client && client.getOptions();
    return Boolean(options && options.sendDefaultPii);
  }
  /**
   * Sends the current Session on the scope
   */
  _sendSessionUpdate() {
    const { scope, client } = this.getStackTop();
    const session2 = scope.getSession();
    if (session2 && client && client.captureSession) {
      client.captureSession(session2);
    }
  }
  /**
   * Internal helper function to call a method on the top client if it exists.
   *
   * @param method The method to call on the client.
   * @param args Arguments to pass to the client function.
   */
  _withClient(callback) {
    const { scope, client } = this.getStackTop();
    if (client) {
      callback(client, scope);
    }
  }
  /**
   * Calls global extension method and binding current instance to the function call
   */
  // @ts-expect-error Function lacks ending return statement and return type does not include 'undefined'. ts(2366)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _callExtensionMethod(method, ...args) {
    const carrier = getMainCarrier();
    const sentry = carrier.__SENTRY__;
    if (sentry && sentry.extensions && typeof sentry.extensions[method] === "function") {
      return sentry.extensions[method].apply(this, args);
    }
    (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.warn(`Extension method ${method} couldn't be found, doing nothing.`);
  }
}
function getMainCarrier() {
  GLOBAL_OBJ.__SENTRY__ = GLOBAL_OBJ.__SENTRY__ || {
    extensions: {},
    hub: void 0
  };
  return GLOBAL_OBJ;
}
function makeMain(hub) {
  const registry = getMainCarrier();
  const oldHub = getHubFromCarrier(registry);
  setHubOnCarrier(registry, hub);
  return oldHub;
}
function getCurrentHub() {
  const registry = getMainCarrier();
  if (registry.__SENTRY__ && registry.__SENTRY__.acs) {
    const hub = registry.__SENTRY__.acs.getCurrentHub();
    if (hub) {
      return hub;
    }
  }
  return getGlobalHub(registry);
}
function getGlobalHub(registry = getMainCarrier()) {
  if (!hasHubOnCarrier(registry) || getHubFromCarrier(registry).isOlderThan(API_VERSION)) {
    setHubOnCarrier(registry, new Hub());
  }
  return getHubFromCarrier(registry);
}
function hasHubOnCarrier(carrier) {
  return !!(carrier && carrier.__SENTRY__ && carrier.__SENTRY__.hub);
}
function getHubFromCarrier(carrier) {
  return getGlobalSingleton("hub", () => new Hub(), carrier);
}
function setHubOnCarrier(carrier, hub) {
  if (!carrier)
    return false;
  const __SENTRY__ = carrier.__SENTRY__ = carrier.__SENTRY__ || {};
  __SENTRY__.hub = hub;
  return true;
}
function hasTracingEnabled(maybeOptions) {
  if (typeof __SENTRY_TRACING__ === "boolean" && !__SENTRY_TRACING__) {
    return false;
  }
  const client = getCurrentHub().getClient();
  const options = maybeOptions || client && client.getOptions();
  return !!options && (options.enableTracing || "tracesSampleRate" in options || "tracesSampler" in options);
}
function getActiveTransaction(maybeHub) {
  const hub = maybeHub || getCurrentHub();
  const scope = hub.getScope();
  return scope.getTransaction();
}
let errorsInstrumented = false;
function registerErrorInstrumentation() {
  if (errorsInstrumented) {
    return;
  }
  errorsInstrumented = true;
  addInstrumentationHandler("error", errorCallback);
  addInstrumentationHandler("unhandledrejection", errorCallback);
}
function errorCallback() {
  const activeTransaction = getActiveTransaction();
  if (activeTransaction) {
    const status = "internal_error";
    (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log(`[Tracing] Transaction: ${status} -> Global error occured`);
    activeTransaction.setStatus(status);
  }
}
errorCallback.tag = "sentry_tracingErrorCallback";
class SpanRecorder {
  constructor(maxlen = 1e3) {
    this._maxlen = maxlen;
    this.spans = [];
  }
  /**
   * This is just so that we don't run out of memory while recording a lot
   * of spans. At some point we just stop and flush out the start of the
   * trace tree (i.e.the first n spans with the smallest
   * start_timestamp).
   */
  add(span) {
    if (this.spans.length > this._maxlen) {
      span.spanRecorder = void 0;
    } else {
      this.spans.push(span);
    }
  }
}
class Span {
  /**
   * @inheritDoc
   */
  /**
   * @inheritDoc
   */
  /**
   * @inheritDoc
   */
  /**
   * Internal keeper of the status
   */
  /**
   * @inheritDoc
   */
  /**
   * Timestamp in seconds when the span was created.
   */
  /**
   * Timestamp in seconds when the span ended.
   */
  /**
   * @inheritDoc
   */
  /**
   * @inheritDoc
   */
  /**
   * @inheritDoc
   */
  /**
   * @inheritDoc
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  /**
   * List of spans that were finalized
   */
  /**
   * @inheritDoc
   */
  /**
   * The instrumenter that created this span.
   */
  /**
   * The origin of the span, giving context about what created the span.
   */
  /**
   * You should never call the constructor manually, always use `Sentry.startTransaction()`
   * or call `startChild()` on an existing span.
   * @internal
   * @hideconstructor
   * @hidden
   */
  constructor(spanContext = {}) {
    this.traceId = spanContext.traceId || uuid4();
    this.spanId = spanContext.spanId || uuid4().substring(16);
    this.startTimestamp = spanContext.startTimestamp || timestampInSeconds();
    this.tags = spanContext.tags || {};
    this.data = spanContext.data || {};
    this.instrumenter = spanContext.instrumenter || "sentry";
    this.origin = spanContext.origin || "manual";
    if (spanContext.parentSpanId) {
      this.parentSpanId = spanContext.parentSpanId;
    }
    if ("sampled" in spanContext) {
      this.sampled = spanContext.sampled;
    }
    if (spanContext.op) {
      this.op = spanContext.op;
    }
    if (spanContext.description) {
      this.description = spanContext.description;
    }
    if (spanContext.name) {
      this.description = spanContext.name;
    }
    if (spanContext.status) {
      this.status = spanContext.status;
    }
    if (spanContext.endTimestamp) {
      this.endTimestamp = spanContext.endTimestamp;
    }
  }
  /** An alias for `description` of the Span. */
  get name() {
    return this.description || "";
  }
  /** Update the name of the span. */
  set name(name) {
    this.setName(name);
  }
  /**
   * @inheritDoc
   */
  startChild(spanContext) {
    const childSpan = new Span({
      ...spanContext,
      parentSpanId: this.spanId,
      sampled: this.sampled,
      traceId: this.traceId
    });
    childSpan.spanRecorder = this.spanRecorder;
    if (childSpan.spanRecorder) {
      childSpan.spanRecorder.add(childSpan);
    }
    childSpan.transaction = this.transaction;
    if ((typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && childSpan.transaction) {
      const opStr = spanContext && spanContext.op || "< unknown op >";
      const nameStr = childSpan.transaction.name || "< unknown name >";
      const idStr = childSpan.transaction.spanId;
      const logMessage = `[Tracing] Starting '${opStr}' span on transaction '${nameStr}' (${idStr}).`;
      childSpan.transaction.metadata.spanMetadata[childSpan.spanId] = { logMessage };
      logger.log(logMessage);
    }
    return childSpan;
  }
  /**
   * @inheritDoc
   */
  setTag(key, value) {
    this.tags = { ...this.tags, [key]: value };
    return this;
  }
  /**
   * @inheritDoc
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  setData(key, value) {
    this.data = { ...this.data, [key]: value };
    return this;
  }
  /**
   * @inheritDoc
   */
  setStatus(value) {
    this.status = value;
    return this;
  }
  /**
   * @inheritDoc
   */
  setHttpStatus(httpStatus) {
    this.setTag("http.status_code", String(httpStatus));
    this.setData("http.response.status_code", httpStatus);
    const spanStatus = spanStatusfromHttpCode(httpStatus);
    if (spanStatus !== "unknown_error") {
      this.setStatus(spanStatus);
    }
    return this;
  }
  /**
   * @inheritDoc
   */
  setName(name) {
    this.description = name;
  }
  /**
   * @inheritDoc
   */
  isSuccess() {
    return this.status === "ok";
  }
  /**
   * @inheritDoc
   */
  finish(endTimestamp) {
    if ((typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && // Don't call this for transactions
    this.transaction && this.transaction.spanId !== this.spanId) {
      const { logMessage } = this.transaction.metadata.spanMetadata[this.spanId];
      if (logMessage) {
        logger.log(logMessage.replace("Starting", "Finishing"));
      }
    }
    this.endTimestamp = typeof endTimestamp === "number" ? endTimestamp : timestampInSeconds();
  }
  /**
   * @inheritDoc
   */
  toTraceparent() {
    return generateSentryTraceHeader(this.traceId, this.spanId, this.sampled);
  }
  /**
   * @inheritDoc
   */
  toContext() {
    return dropUndefinedKeys({
      data: this.data,
      description: this.description,
      endTimestamp: this.endTimestamp,
      op: this.op,
      parentSpanId: this.parentSpanId,
      sampled: this.sampled,
      spanId: this.spanId,
      startTimestamp: this.startTimestamp,
      status: this.status,
      tags: this.tags,
      traceId: this.traceId
    });
  }
  /**
   * @inheritDoc
   */
  updateWithContext(spanContext) {
    this.data = spanContext.data || {};
    this.description = spanContext.description;
    this.endTimestamp = spanContext.endTimestamp;
    this.op = spanContext.op;
    this.parentSpanId = spanContext.parentSpanId;
    this.sampled = spanContext.sampled;
    this.spanId = spanContext.spanId || this.spanId;
    this.startTimestamp = spanContext.startTimestamp || this.startTimestamp;
    this.status = spanContext.status;
    this.tags = spanContext.tags || {};
    this.traceId = spanContext.traceId || this.traceId;
    return this;
  }
  /**
   * @inheritDoc
   */
  getTraceContext() {
    return dropUndefinedKeys({
      data: Object.keys(this.data).length > 0 ? this.data : void 0,
      description: this.description,
      op: this.op,
      parent_span_id: this.parentSpanId,
      span_id: this.spanId,
      status: this.status,
      tags: Object.keys(this.tags).length > 0 ? this.tags : void 0,
      trace_id: this.traceId
    });
  }
  /**
   * @inheritDoc
   */
  toJSON() {
    return dropUndefinedKeys({
      data: Object.keys(this.data).length > 0 ? this.data : void 0,
      description: this.description,
      op: this.op,
      parent_span_id: this.parentSpanId,
      span_id: this.spanId,
      start_timestamp: this.startTimestamp,
      status: this.status,
      tags: Object.keys(this.tags).length > 0 ? this.tags : void 0,
      timestamp: this.endTimestamp,
      trace_id: this.traceId,
      origin: this.origin
    });
  }
}
function spanStatusfromHttpCode(httpStatus) {
  if (httpStatus < 400 && httpStatus >= 100) {
    return "ok";
  }
  if (httpStatus >= 400 && httpStatus < 500) {
    switch (httpStatus) {
      case 401:
        return "unauthenticated";
      case 403:
        return "permission_denied";
      case 404:
        return "not_found";
      case 409:
        return "already_exists";
      case 413:
        return "failed_precondition";
      case 429:
        return "resource_exhausted";
      default:
        return "invalid_argument";
    }
  }
  if (httpStatus >= 500 && httpStatus < 600) {
    switch (httpStatus) {
      case 501:
        return "unimplemented";
      case 503:
        return "unavailable";
      case 504:
        return "deadline_exceeded";
      default:
        return "internal_error";
    }
  }
  return "unknown_error";
}
function getDynamicSamplingContextFromClient(trace_id, client, scope) {
  const options = client.getOptions();
  const { publicKey: public_key } = client.getDsn() || {};
  const { segment: user_segment } = scope && scope.getUser() || {};
  const dsc = dropUndefinedKeys({
    environment: options.environment || DEFAULT_ENVIRONMENT,
    release: options.release,
    user_segment,
    public_key,
    trace_id
  });
  client.emit && client.emit("createDsc", dsc);
  return dsc;
}
class Transaction extends Span {
  /**
   * The reference to the current hub.
   */
  /**
   * This constructor should never be called manually. Those instrumenting tracing should use
   * `Sentry.startTransaction()`, and internal methods should use `hub.startTransaction()`.
   * @internal
   * @hideconstructor
   * @hidden
   */
  constructor(transactionContext, hub) {
    super(transactionContext);
    delete this.description;
    this._measurements = {};
    this._contexts = {};
    this._hub = hub || getCurrentHub();
    this._name = transactionContext.name || "";
    this.metadata = {
      source: "custom",
      ...transactionContext.metadata,
      spanMetadata: {}
    };
    this._trimEnd = transactionContext.trimEnd;
    this.transaction = this;
    const incomingDynamicSamplingContext = this.metadata.dynamicSamplingContext;
    if (incomingDynamicSamplingContext) {
      this._frozenDynamicSamplingContext = { ...incomingDynamicSamplingContext };
    }
  }
  /** Getter for `name` property */
  get name() {
    return this._name;
  }
  /** Setter for `name` property, which also sets `source` as custom */
  set name(newName) {
    this.setName(newName);
  }
  /**
   * JSDoc
   */
  setName(name, source = "custom") {
    this._name = name;
    this.metadata.source = source;
  }
  /**
   * Attaches SpanRecorder to the span itself
   * @param maxlen maximum number of spans that can be recorded
   */
  initSpanRecorder(maxlen = 1e3) {
    if (!this.spanRecorder) {
      this.spanRecorder = new SpanRecorder(maxlen);
    }
    this.spanRecorder.add(this);
  }
  /**
   * @inheritDoc
   */
  setContext(key, context) {
    if (context === null) {
      delete this._contexts[key];
    } else {
      this._contexts[key] = context;
    }
  }
  /**
   * @inheritDoc
   */
  setMeasurement(name, value, unit = "") {
    this._measurements[name] = { value, unit };
  }
  /**
   * @inheritDoc
   */
  setMetadata(newMetadata) {
    this.metadata = { ...this.metadata, ...newMetadata };
  }
  /**
   * @inheritDoc
   */
  finish(endTimestamp) {
    if (this.endTimestamp !== void 0) {
      return void 0;
    }
    if (!this.name) {
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.warn("Transaction has no name, falling back to `<unlabeled transaction>`.");
      this.name = "<unlabeled transaction>";
    }
    super.finish(endTimestamp);
    const client = this._hub.getClient();
    if (client && client.emit) {
      client.emit("finishTransaction", this);
    }
    if (this.sampled !== true) {
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log("[Tracing] Discarding transaction because its trace was not chosen to be sampled.");
      if (client) {
        client.recordDroppedEvent("sample_rate", "transaction");
      }
      return void 0;
    }
    const finishedSpans = this.spanRecorder ? this.spanRecorder.spans.filter((s) => s !== this && s.endTimestamp) : [];
    if (this._trimEnd && finishedSpans.length > 0) {
      this.endTimestamp = finishedSpans.reduce((prev, current) => {
        if (prev.endTimestamp && current.endTimestamp) {
          return prev.endTimestamp > current.endTimestamp ? prev : current;
        }
        return prev;
      }).endTimestamp;
    }
    const metadata = this.metadata;
    const transaction = {
      contexts: {
        ...this._contexts,
        // We don't want to override trace context
        trace: this.getTraceContext()
      },
      spans: finishedSpans,
      start_timestamp: this.startTimestamp,
      tags: this.tags,
      timestamp: this.endTimestamp,
      transaction: this.name,
      type: "transaction",
      sdkProcessingMetadata: {
        ...metadata,
        dynamicSamplingContext: this.getDynamicSamplingContext()
      },
      ...metadata.source && {
        transaction_info: {
          source: metadata.source
        }
      }
    };
    const hasMeasurements = Object.keys(this._measurements).length > 0;
    if (hasMeasurements) {
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log(
        "[Measurements] Adding measurements to transaction",
        JSON.stringify(this._measurements, void 0, 2)
      );
      transaction.measurements = this._measurements;
    }
    (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log(`[Tracing] Finishing ${this.op} transaction: ${this.name}.`);
    return this._hub.captureEvent(transaction);
  }
  /**
   * @inheritDoc
   */
  toContext() {
    const spanContext = super.toContext();
    return dropUndefinedKeys({
      ...spanContext,
      name: this.name,
      trimEnd: this._trimEnd
    });
  }
  /**
   * @inheritDoc
   */
  updateWithContext(transactionContext) {
    super.updateWithContext(transactionContext);
    this.name = transactionContext.name || "";
    this._trimEnd = transactionContext.trimEnd;
    return this;
  }
  /**
   * @inheritdoc
   *
   * @experimental
   */
  getDynamicSamplingContext() {
    if (this._frozenDynamicSamplingContext) {
      return this._frozenDynamicSamplingContext;
    }
    const hub = this._hub || getCurrentHub();
    const client = hub.getClient();
    if (!client)
      return {};
    const scope = hub.getScope();
    const dsc = getDynamicSamplingContextFromClient(this.traceId, client, scope);
    const maybeSampleRate = this.metadata.sampleRate;
    if (maybeSampleRate !== void 0) {
      dsc.sample_rate = `${maybeSampleRate}`;
    }
    const source = this.metadata.source;
    if (source && source !== "url") {
      dsc.transaction = this.name;
    }
    if (this.sampled !== void 0) {
      dsc.sampled = String(this.sampled);
    }
    return dsc;
  }
  /**
   * Override the current hub with a new one.
   * Used if you want another hub to finish the transaction.
   *
   * @internal
   */
  setHub(hub) {
    this._hub = hub;
  }
}
const TRACING_DEFAULTS = {
  idleTimeout: 1e3,
  finalTimeout: 3e4,
  heartbeatInterval: 5e3
};
const FINISH_REASON_TAG = "finishReason";
const IDLE_TRANSACTION_FINISH_REASONS = [
  "heartbeatFailed",
  "idleTimeout",
  "documentHidden",
  "finalTimeout",
  "externalFinish",
  "cancelled"
];
class IdleTransactionSpanRecorder extends SpanRecorder {
  constructor(_pushActivity, _popActivity, transactionSpanId, maxlen) {
    super(maxlen);
    this._pushActivity = _pushActivity;
    this._popActivity = _popActivity;
    this.transactionSpanId = transactionSpanId;
  }
  /**
   * @inheritDoc
   */
  add(span) {
    if (span.spanId !== this.transactionSpanId) {
      span.finish = (endTimestamp) => {
        span.endTimestamp = typeof endTimestamp === "number" ? endTimestamp : timestampInSeconds();
        this._popActivity(span.spanId);
      };
      if (span.endTimestamp === void 0) {
        this._pushActivity(span.spanId);
      }
    }
    super.add(span);
  }
}
class IdleTransaction extends Transaction {
  // Activities store a list of active spans
  // Track state of activities in previous heartbeat
  // Amount of times heartbeat has counted. Will cause transaction to finish after 3 beats.
  // We should not use heartbeat if we finished a transaction
  // Idle timeout was canceled and we should finish the transaction with the last span end.
  /**
   * Timer that tracks Transaction idleTimeout
   */
  constructor(transactionContext, _idleHub, _idleTimeout = TRACING_DEFAULTS.idleTimeout, _finalTimeout = TRACING_DEFAULTS.finalTimeout, _heartbeatInterval = TRACING_DEFAULTS.heartbeatInterval, _onScope = false) {
    super(transactionContext, _idleHub);
    this._idleHub = _idleHub;
    this._idleTimeout = _idleTimeout;
    this._finalTimeout = _finalTimeout;
    this._heartbeatInterval = _heartbeatInterval;
    this._onScope = _onScope;
    this.activities = {};
    this._heartbeatCounter = 0;
    this._finished = false;
    this._idleTimeoutCanceledPermanently = false;
    this._beforeFinishCallbacks = [];
    this._finishReason = IDLE_TRANSACTION_FINISH_REASONS[4];
    if (_onScope) {
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log(`Setting idle transaction on scope. Span ID: ${this.spanId}`);
      _idleHub.configureScope((scope) => scope.setSpan(this));
    }
    this._restartIdleTimeout();
    setTimeout(() => {
      if (!this._finished) {
        this.setStatus("deadline_exceeded");
        this._finishReason = IDLE_TRANSACTION_FINISH_REASONS[3];
        this.finish();
      }
    }, this._finalTimeout);
  }
  /** {@inheritDoc} */
  finish(endTimestamp = timestampInSeconds()) {
    this._finished = true;
    this.activities = {};
    if (this.op === "ui.action.click") {
      this.setTag(FINISH_REASON_TAG, this._finishReason);
    }
    if (this.spanRecorder) {
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log("[Tracing] finishing IdleTransaction", new Date(endTimestamp * 1e3).toISOString(), this.op);
      for (const callback of this._beforeFinishCallbacks) {
        callback(this, endTimestamp);
      }
      this.spanRecorder.spans = this.spanRecorder.spans.filter((span) => {
        if (span.spanId === this.spanId) {
          return true;
        }
        if (!span.endTimestamp) {
          span.endTimestamp = endTimestamp;
          span.setStatus("cancelled");
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log("[Tracing] cancelling span since transaction ended early", JSON.stringify(span, void 0, 2));
        }
        const spanStartedBeforeTransactionFinish = span.startTimestamp < endTimestamp;
        const timeoutWithMarginOfError = (this._finalTimeout + this._idleTimeout) / 1e3;
        const spanEndedBeforeFinalTimeout = span.endTimestamp - this.startTimestamp < timeoutWithMarginOfError;
        if (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) {
          const stringifiedSpan = JSON.stringify(span, void 0, 2);
          if (!spanStartedBeforeTransactionFinish) {
            logger.log("[Tracing] discarding Span since it happened after Transaction was finished", stringifiedSpan);
          } else if (!spanEndedBeforeFinalTimeout) {
            logger.log("[Tracing] discarding Span since it finished after Transaction final timeout", stringifiedSpan);
          }
        }
        return spanStartedBeforeTransactionFinish && spanEndedBeforeFinalTimeout;
      });
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log("[Tracing] flushing IdleTransaction");
    } else {
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log("[Tracing] No active IdleTransaction");
    }
    if (this._onScope) {
      const scope = this._idleHub.getScope();
      if (scope.getTransaction() === this) {
        scope.setSpan(void 0);
      }
    }
    return super.finish(endTimestamp);
  }
  /**
   * Register a callback function that gets excecuted before the transaction finishes.
   * Useful for cleanup or if you want to add any additional spans based on current context.
   *
   * This is exposed because users have no other way of running something before an idle transaction
   * finishes.
   */
  registerBeforeFinishCallback(callback) {
    this._beforeFinishCallbacks.push(callback);
  }
  /**
   * @inheritDoc
   */
  initSpanRecorder(maxlen) {
    if (!this.spanRecorder) {
      const pushActivity = (id) => {
        if (this._finished) {
          return;
        }
        this._pushActivity(id);
      };
      const popActivity = (id) => {
        if (this._finished) {
          return;
        }
        this._popActivity(id);
      };
      this.spanRecorder = new IdleTransactionSpanRecorder(pushActivity, popActivity, this.spanId, maxlen);
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log("Starting heartbeat");
      this._pingHeartbeat();
    }
    this.spanRecorder.add(this);
  }
  /**
   * Cancels the existing idle timeout, if there is one.
   * @param restartOnChildSpanChange Default is `true`.
   *                                 If set to false the transaction will end
   *                                 with the last child span.
   */
  cancelIdleTimeout(endTimestamp, {
    restartOnChildSpanChange
  } = {
    restartOnChildSpanChange: true
  }) {
    this._idleTimeoutCanceledPermanently = restartOnChildSpanChange === false;
    if (this._idleTimeoutID) {
      clearTimeout(this._idleTimeoutID);
      this._idleTimeoutID = void 0;
      if (Object.keys(this.activities).length === 0 && this._idleTimeoutCanceledPermanently) {
        this._finishReason = IDLE_TRANSACTION_FINISH_REASONS[5];
        this.finish(endTimestamp);
      }
    }
  }
  /**
   * Temporary method used to externally set the transaction's `finishReason`
   *
   * ** WARNING**
   * This is for the purpose of experimentation only and will be removed in the near future, do not use!
   *
   * @internal
   *
   */
  setFinishReason(reason) {
    this._finishReason = reason;
  }
  /**
   * Restarts idle timeout, if there is no running idle timeout it will start one.
   */
  _restartIdleTimeout(endTimestamp) {
    this.cancelIdleTimeout();
    this._idleTimeoutID = setTimeout(() => {
      if (!this._finished && Object.keys(this.activities).length === 0) {
        this._finishReason = IDLE_TRANSACTION_FINISH_REASONS[1];
        this.finish(endTimestamp);
      }
    }, this._idleTimeout);
  }
  /**
   * Start tracking a specific activity.
   * @param spanId The span id that represents the activity
   */
  _pushActivity(spanId) {
    this.cancelIdleTimeout(void 0, { restartOnChildSpanChange: !this._idleTimeoutCanceledPermanently });
    (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log(`[Tracing] pushActivity: ${spanId}`);
    this.activities[spanId] = true;
    (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log("[Tracing] new activities count", Object.keys(this.activities).length);
  }
  /**
   * Remove an activity from usage
   * @param spanId The span id that represents the activity
   */
  _popActivity(spanId) {
    if (this.activities[spanId]) {
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log(`[Tracing] popActivity ${spanId}`);
      delete this.activities[spanId];
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log("[Tracing] new activities count", Object.keys(this.activities).length);
    }
    if (Object.keys(this.activities).length === 0) {
      const endTimestamp = timestampInSeconds();
      if (this._idleTimeoutCanceledPermanently) {
        this._finishReason = IDLE_TRANSACTION_FINISH_REASONS[5];
        this.finish(endTimestamp);
      } else {
        this._restartIdleTimeout(endTimestamp + this._idleTimeout / 1e3);
      }
    }
  }
  /**
   * Checks when entries of this.activities are not changing for 3 beats.
   * If this occurs we finish the transaction.
   */
  _beat() {
    if (this._finished) {
      return;
    }
    const heartbeatString = Object.keys(this.activities).join("");
    if (heartbeatString === this._prevHeartbeatString) {
      this._heartbeatCounter++;
    } else {
      this._heartbeatCounter = 1;
    }
    this._prevHeartbeatString = heartbeatString;
    if (this._heartbeatCounter >= 3) {
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log("[Tracing] Transaction finished because of no change for 3 heart beats");
      this.setStatus("deadline_exceeded");
      this._finishReason = IDLE_TRANSACTION_FINISH_REASONS[0];
      this.finish();
    } else {
      this._pingHeartbeat();
    }
  }
  /**
   * Pings the heartbeat
   */
  _pingHeartbeat() {
    (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log(`pinging Heartbeat -> current counter: ${this._heartbeatCounter}`);
    setTimeout(() => {
      this._beat();
    }, this._heartbeatInterval);
  }
}
function traceHeaders() {
  const scope = this.getScope();
  const span = scope.getSpan();
  return span ? {
    "sentry-trace": span.toTraceparent()
  } : {};
}
function sample(transaction, options, samplingContext) {
  if (!hasTracingEnabled(options)) {
    transaction.sampled = false;
    return transaction;
  }
  if (transaction.sampled !== void 0) {
    transaction.setMetadata({
      sampleRate: Number(transaction.sampled)
    });
    return transaction;
  }
  let sampleRate;
  if (typeof options.tracesSampler === "function") {
    sampleRate = options.tracesSampler(samplingContext);
    transaction.setMetadata({
      sampleRate: Number(sampleRate)
    });
  } else if (samplingContext.parentSampled !== void 0) {
    sampleRate = samplingContext.parentSampled;
  } else if (typeof options.tracesSampleRate !== "undefined") {
    sampleRate = options.tracesSampleRate;
    transaction.setMetadata({
      sampleRate: Number(sampleRate)
    });
  } else {
    sampleRate = 1;
    transaction.setMetadata({
      sampleRate
    });
  }
  if (!isValidSampleRate(sampleRate)) {
    (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.warn("[Tracing] Discarding transaction because of invalid sample rate.");
    transaction.sampled = false;
    return transaction;
  }
  if (!sampleRate) {
    (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log(
      `[Tracing] Discarding transaction because ${typeof options.tracesSampler === "function" ? "tracesSampler returned 0 or false" : "a negative sampling decision was inherited or tracesSampleRate is set to 0"}`
    );
    transaction.sampled = false;
    return transaction;
  }
  transaction.sampled = Math.random() < sampleRate;
  if (!transaction.sampled) {
    (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log(
      `[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = ${Number(
        sampleRate
      )})`
    );
    return transaction;
  }
  (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log(`[Tracing] starting ${transaction.op} transaction - ${transaction.name}`);
  return transaction;
}
function isValidSampleRate(rate) {
  if (isNaN$1(rate) || !(typeof rate === "number" || typeof rate === "boolean")) {
    (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.warn(
      `[Tracing] Given sample rate is invalid. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(
        rate
      )} of type ${JSON.stringify(typeof rate)}.`
    );
    return false;
  }
  if (rate < 0 || rate > 1) {
    (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.warn(`[Tracing] Given sample rate is invalid. Sample rate must be between 0 and 1. Got ${rate}.`);
    return false;
  }
  return true;
}
function _startTransaction(transactionContext, customSamplingContext) {
  const client = this.getClient();
  const options = client && client.getOptions() || {};
  const configInstrumenter = options.instrumenter || "sentry";
  const transactionInstrumenter = transactionContext.instrumenter || "sentry";
  if (configInstrumenter !== transactionInstrumenter) {
    (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.error(
      `A transaction was started with instrumenter=\`${transactionInstrumenter}\`, but the SDK is configured with the \`${configInstrumenter}\` instrumenter.
The transaction will not be sampled. Please use the ${configInstrumenter} instrumentation to start transactions.`
    );
    transactionContext.sampled = false;
  }
  let transaction = new Transaction(transactionContext, this);
  transaction = sample(transaction, options, {
    parentSampled: transactionContext.parentSampled,
    transactionContext,
    ...customSamplingContext
  });
  if (transaction.sampled) {
    transaction.initSpanRecorder(options._experiments && options._experiments.maxSpans);
  }
  if (client && client.emit) {
    client.emit("startTransaction", transaction);
  }
  return transaction;
}
function startIdleTransaction(hub, transactionContext, idleTimeout, finalTimeout, onScope, customSamplingContext, heartbeatInterval) {
  const client = hub.getClient();
  const options = client && client.getOptions() || {};
  let transaction = new IdleTransaction(transactionContext, hub, idleTimeout, finalTimeout, heartbeatInterval, onScope);
  transaction = sample(transaction, options, {
    parentSampled: transactionContext.parentSampled,
    transactionContext,
    ...customSamplingContext
  });
  if (transaction.sampled) {
    transaction.initSpanRecorder(options._experiments && options._experiments.maxSpans);
  }
  if (client && client.emit) {
    client.emit("startTransaction", transaction);
  }
  return transaction;
}
function addTracingExtensions() {
  const carrier = getMainCarrier();
  if (!carrier.__SENTRY__) {
    return;
  }
  carrier.__SENTRY__.extensions = carrier.__SENTRY__.extensions || {};
  if (!carrier.__SENTRY__.extensions.startTransaction) {
    carrier.__SENTRY__.extensions.startTransaction = _startTransaction;
  }
  if (!carrier.__SENTRY__.extensions.traceHeaders) {
    carrier.__SENTRY__.extensions.traceHeaders = traceHeaders;
  }
  registerErrorInstrumentation();
}
function captureException(exception, captureContext) {
  return getCurrentHub().captureException(exception, { captureContext });
}
function setContext(name, context) {
  getCurrentHub().setContext(name, context);
}
function withScope(callback) {
  getCurrentHub().withScope(callback);
}
const SENTRY_API_VERSION = "7";
function getBaseApiEndpoint(dsn) {
  const protocol = dsn.protocol ? `${dsn.protocol}:` : "";
  const port = dsn.port ? `:${dsn.port}` : "";
  return `${protocol}//${dsn.host}${port}${dsn.path ? `/${dsn.path}` : ""}/api/`;
}
function _getIngestEndpoint(dsn) {
  return `${getBaseApiEndpoint(dsn)}${dsn.projectId}/envelope/`;
}
function _encodedAuth(dsn, sdkInfo) {
  return urlEncode({
    // We send only the minimum set of required information. See
    // https://github.com/getsentry/sentry-javascript/issues/2572.
    sentry_key: dsn.publicKey,
    sentry_version: SENTRY_API_VERSION,
    ...sdkInfo && { sentry_client: `${sdkInfo.name}/${sdkInfo.version}` }
  });
}
function getEnvelopeEndpointWithUrlEncodedAuth(dsn, tunnelOrOptions = {}) {
  const tunnel = typeof tunnelOrOptions === "string" ? tunnelOrOptions : tunnelOrOptions.tunnel;
  const sdkInfo = typeof tunnelOrOptions === "string" || !tunnelOrOptions._metadata ? void 0 : tunnelOrOptions._metadata.sdk;
  return tunnel ? tunnel : `${_getIngestEndpoint(dsn)}?${_encodedAuth(dsn, sdkInfo)}`;
}
function enhanceEventWithSdkInfo(event, sdkInfo) {
  if (!sdkInfo) {
    return event;
  }
  event.sdk = event.sdk || {};
  event.sdk.name = event.sdk.name || sdkInfo.name;
  event.sdk.version = event.sdk.version || sdkInfo.version;
  event.sdk.integrations = [...event.sdk.integrations || [], ...sdkInfo.integrations || []];
  event.sdk.packages = [...event.sdk.packages || [], ...sdkInfo.packages || []];
  return event;
}
function createSessionEnvelope(session2, dsn, metadata, tunnel) {
  const sdkInfo = getSdkMetadataForEnvelopeHeader(metadata);
  const envelopeHeaders = {
    sent_at: (/* @__PURE__ */ new Date()).toISOString(),
    ...sdkInfo && { sdk: sdkInfo },
    ...!!tunnel && { dsn: dsnToString(dsn) }
  };
  const envelopeItem = "aggregates" in session2 ? [{ type: "sessions" }, session2] : [{ type: "session" }, session2.toJSON()];
  return createEnvelope(envelopeHeaders, [envelopeItem]);
}
function createEventEnvelope(event, dsn, metadata, tunnel) {
  const sdkInfo = getSdkMetadataForEnvelopeHeader(metadata);
  const eventType = event.type && event.type !== "replay_event" ? event.type : "event";
  enhanceEventWithSdkInfo(event, metadata && metadata.sdk);
  const envelopeHeaders = createEventEnvelopeHeaders(event, sdkInfo, tunnel, dsn);
  delete event.sdkProcessingMetadata;
  const eventItem = [{ type: eventType }, event];
  return createEnvelope(envelopeHeaders, [eventItem]);
}
const installedIntegrations = [];
function filterDuplicates(integrations) {
  const integrationsByName = {};
  integrations.forEach((currentInstance) => {
    const { name } = currentInstance;
    const existingInstance = integrationsByName[name];
    if (existingInstance && !existingInstance.isDefaultInstance && currentInstance.isDefaultInstance) {
      return;
    }
    integrationsByName[name] = currentInstance;
  });
  return Object.keys(integrationsByName).map((k) => integrationsByName[k]);
}
function getIntegrationsToSetup(options) {
  const defaultIntegrations2 = options.defaultIntegrations || [];
  const userIntegrations = options.integrations;
  defaultIntegrations2.forEach((integration) => {
    integration.isDefaultInstance = true;
  });
  let integrations;
  if (Array.isArray(userIntegrations)) {
    integrations = [...defaultIntegrations2, ...userIntegrations];
  } else if (typeof userIntegrations === "function") {
    integrations = arrayify(userIntegrations(defaultIntegrations2));
  } else {
    integrations = defaultIntegrations2;
  }
  const finalIntegrations = filterDuplicates(integrations);
  const debugIndex = findIndex(finalIntegrations, (integration) => integration.name === "Debug");
  if (debugIndex !== -1) {
    const [debugInstance] = finalIntegrations.splice(debugIndex, 1);
    finalIntegrations.push(debugInstance);
  }
  return finalIntegrations;
}
function setupIntegrations(client, integrations) {
  const integrationIndex = {};
  integrations.forEach((integration) => {
    if (integration) {
      setupIntegration(client, integration, integrationIndex);
    }
  });
  return integrationIndex;
}
function setupIntegration(client, integration, integrationIndex) {
  integrationIndex[integration.name] = integration;
  if (installedIntegrations.indexOf(integration.name) === -1) {
    integration.setupOnce(addGlobalEventProcessor, getCurrentHub);
    installedIntegrations.push(integration.name);
  }
  if (client.on && typeof integration.preprocessEvent === "function") {
    const callback = integration.preprocessEvent.bind(integration);
    client.on("preprocessEvent", (event, hint) => callback(event, hint, client));
  }
  (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log(`Integration installed: ${integration.name}`);
}
function findIndex(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i]) === true) {
      return i;
    }
  }
  return -1;
}
function prepareEvent(options, event, hint, scope) {
  const { normalizeDepth = 3, normalizeMaxBreadth = 1e3 } = options;
  const prepared = {
    ...event,
    event_id: event.event_id || hint.event_id || uuid4(),
    timestamp: event.timestamp || dateTimestampInSeconds()
  };
  const integrations = hint.integrations || options.integrations.map((i) => i.name);
  applyClientOptions(prepared, options);
  applyIntegrationsMetadata(prepared, integrations);
  if (event.type === void 0) {
    applyDebugIds(prepared, options.stackParser);
  }
  let finalScope = scope;
  if (hint.captureContext) {
    finalScope = Scope.clone(finalScope).update(hint.captureContext);
  }
  let result = resolvedSyncPromise(prepared);
  if (finalScope) {
    if (finalScope.getAttachments) {
      const attachments = [...hint.attachments || [], ...finalScope.getAttachments()];
      if (attachments.length) {
        hint.attachments = attachments;
      }
    }
    result = finalScope.applyToEvent(prepared, hint);
  }
  return result.then((evt) => {
    if (evt) {
      applyDebugMeta(evt);
    }
    if (typeof normalizeDepth === "number" && normalizeDepth > 0) {
      return normalizeEvent(evt, normalizeDepth, normalizeMaxBreadth);
    }
    return evt;
  });
}
function applyClientOptions(event, options) {
  const { environment, release, dist, maxValueLength = 250 } = options;
  if (!("environment" in event)) {
    event.environment = "environment" in options ? environment : DEFAULT_ENVIRONMENT;
  }
  if (event.release === void 0 && release !== void 0) {
    event.release = release;
  }
  if (event.dist === void 0 && dist !== void 0) {
    event.dist = dist;
  }
  if (event.message) {
    event.message = truncate(event.message, maxValueLength);
  }
  const exception = event.exception && event.exception.values && event.exception.values[0];
  if (exception && exception.value) {
    exception.value = truncate(exception.value, maxValueLength);
  }
  const request = event.request;
  if (request && request.url) {
    request.url = truncate(request.url, maxValueLength);
  }
}
const debugIdStackParserCache = /* @__PURE__ */ new WeakMap();
function applyDebugIds(event, stackParser) {
  const debugIdMap = GLOBAL_OBJ._sentryDebugIds;
  if (!debugIdMap) {
    return;
  }
  let debugIdStackFramesCache;
  const cachedDebugIdStackFrameCache = debugIdStackParserCache.get(stackParser);
  if (cachedDebugIdStackFrameCache) {
    debugIdStackFramesCache = cachedDebugIdStackFrameCache;
  } else {
    debugIdStackFramesCache = /* @__PURE__ */ new Map();
    debugIdStackParserCache.set(stackParser, debugIdStackFramesCache);
  }
  const filenameDebugIdMap = Object.keys(debugIdMap).reduce((acc, debugIdStackTrace) => {
    let parsedStack;
    const cachedParsedStack = debugIdStackFramesCache.get(debugIdStackTrace);
    if (cachedParsedStack) {
      parsedStack = cachedParsedStack;
    } else {
      parsedStack = stackParser(debugIdStackTrace);
      debugIdStackFramesCache.set(debugIdStackTrace, parsedStack);
    }
    for (let i = parsedStack.length - 1; i >= 0; i--) {
      const stackFrame = parsedStack[i];
      if (stackFrame.filename) {
        acc[stackFrame.filename] = debugIdMap[debugIdStackTrace];
        break;
      }
    }
    return acc;
  }, {});
  try {
    event.exception.values.forEach((exception) => {
      exception.stacktrace.frames.forEach((frame) => {
        if (frame.filename) {
          frame.debug_id = filenameDebugIdMap[frame.filename];
        }
      });
    });
  } catch (e2) {
  }
}
function applyDebugMeta(event) {
  const filenameDebugIdMap = {};
  try {
    event.exception.values.forEach((exception) => {
      exception.stacktrace.frames.forEach((frame) => {
        if (frame.debug_id) {
          if (frame.abs_path) {
            filenameDebugIdMap[frame.abs_path] = frame.debug_id;
          } else if (frame.filename) {
            filenameDebugIdMap[frame.filename] = frame.debug_id;
          }
          delete frame.debug_id;
        }
      });
    });
  } catch (e2) {
  }
  if (Object.keys(filenameDebugIdMap).length === 0) {
    return;
  }
  event.debug_meta = event.debug_meta || {};
  event.debug_meta.images = event.debug_meta.images || [];
  const images = event.debug_meta.images;
  Object.keys(filenameDebugIdMap).forEach((filename) => {
    images.push({
      type: "sourcemap",
      code_file: filename,
      debug_id: filenameDebugIdMap[filename]
    });
  });
}
function applyIntegrationsMetadata(event, integrationNames) {
  if (integrationNames.length > 0) {
    event.sdk = event.sdk || {};
    event.sdk.integrations = [...event.sdk.integrations || [], ...integrationNames];
  }
}
function normalizeEvent(event, depth, maxBreadth) {
  if (!event) {
    return null;
  }
  const normalized = {
    ...event,
    ...event.breadcrumbs && {
      breadcrumbs: event.breadcrumbs.map((b) => ({
        ...b,
        ...b.data && {
          data: normalize(b.data, depth, maxBreadth)
        }
      }))
    },
    ...event.user && {
      user: normalize(event.user, depth, maxBreadth)
    },
    ...event.contexts && {
      contexts: normalize(event.contexts, depth, maxBreadth)
    },
    ...event.extra && {
      extra: normalize(event.extra, depth, maxBreadth)
    }
  };
  if (event.contexts && event.contexts.trace && normalized.contexts) {
    normalized.contexts.trace = event.contexts.trace;
    if (event.contexts.trace.data) {
      normalized.contexts.trace.data = normalize(event.contexts.trace.data, depth, maxBreadth);
    }
  }
  if (event.spans) {
    normalized.spans = event.spans.map((span) => {
      if (span.data) {
        span.data = normalize(span.data, depth, maxBreadth);
      }
      return span;
    });
  }
  return normalized;
}
const ALREADY_SEEN_ERROR = "Not capturing exception because it's already been captured.";
class BaseClient {
  /** Options passed to the SDK. */
  /** The client Dsn, if specified in options. Without this Dsn, the SDK will be disabled. */
  /** Array of set up integrations. */
  /** Indicates whether this client's integrations have been set up. */
  /** Number of calls being processed */
  /** Holds flushable  */
  // eslint-disable-next-line @typescript-eslint/ban-types
  /**
   * Initializes this client instance.
   *
   * @param options Options for the client.
   */
  constructor(options) {
    this._options = options;
    this._integrations = {};
    this._integrationsInitialized = false;
    this._numProcessing = 0;
    this._outcomes = {};
    this._hooks = {};
    if (options.dsn) {
      this._dsn = makeDsn(options.dsn);
    } else {
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.warn("No DSN provided, client will not do anything.");
    }
    if (this._dsn) {
      const url = getEnvelopeEndpointWithUrlEncodedAuth(this._dsn, options);
      this._transport = options.transport({
        recordDroppedEvent: this.recordDroppedEvent.bind(this),
        ...options.transportOptions,
        url
      });
    }
  }
  /**
   * @inheritDoc
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  captureException(exception, hint, scope) {
    if (checkOrSetAlreadyCaught(exception)) {
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log(ALREADY_SEEN_ERROR);
      return;
    }
    let eventId = hint && hint.event_id;
    this._process(
      this.eventFromException(exception, hint).then((event) => this._captureEvent(event, hint, scope)).then((result) => {
        eventId = result;
      })
    );
    return eventId;
  }
  /**
   * @inheritDoc
   */
  captureMessage(message, level, hint, scope) {
    let eventId = hint && hint.event_id;
    const promisedEvent = isPrimitive(message) ? this.eventFromMessage(String(message), level, hint) : this.eventFromException(message, hint);
    this._process(
      promisedEvent.then((event) => this._captureEvent(event, hint, scope)).then((result) => {
        eventId = result;
      })
    );
    return eventId;
  }
  /**
   * @inheritDoc
   */
  captureEvent(event, hint, scope) {
    if (hint && hint.originalException && checkOrSetAlreadyCaught(hint.originalException)) {
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log(ALREADY_SEEN_ERROR);
      return;
    }
    let eventId = hint && hint.event_id;
    this._process(
      this._captureEvent(event, hint, scope).then((result) => {
        eventId = result;
      })
    );
    return eventId;
  }
  /**
   * @inheritDoc
   */
  captureSession(session2) {
    if (!this._isEnabled()) {
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.warn("SDK not enabled, will not capture session.");
      return;
    }
    if (!(typeof session2.release === "string")) {
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.warn("Discarded session because of missing or non-string release");
    } else {
      this.sendSession(session2);
      updateSession(session2, { init: false });
    }
  }
  /**
   * @inheritDoc
   */
  getDsn() {
    return this._dsn;
  }
  /**
   * @inheritDoc
   */
  getOptions() {
    return this._options;
  }
  /**
   * @see SdkMetadata in @sentry/types
   *
   * @return The metadata of the SDK
   */
  getSdkMetadata() {
    return this._options._metadata;
  }
  /**
   * @inheritDoc
   */
  getTransport() {
    return this._transport;
  }
  /**
   * @inheritDoc
   */
  flush(timeout) {
    const transport = this._transport;
    if (transport) {
      return this._isClientDoneProcessing(timeout).then((clientFinished) => {
        return transport.flush(timeout).then((transportFlushed) => clientFinished && transportFlushed);
      });
    } else {
      return resolvedSyncPromise(true);
    }
  }
  /**
   * @inheritDoc
   */
  close(timeout) {
    return this.flush(timeout).then((result) => {
      this.getOptions().enabled = false;
      return result;
    });
  }
  /**
   * Sets up the integrations
   */
  setupIntegrations() {
    if (this._isEnabled() && !this._integrationsInitialized) {
      this._integrations = setupIntegrations(this, this._options.integrations);
      this._integrationsInitialized = true;
    }
  }
  /**
   * Gets an installed integration by its `id`.
   *
   * @returns The installed integration or `undefined` if no integration with that `id` was installed.
   */
  getIntegrationById(integrationId) {
    return this._integrations[integrationId];
  }
  /**
   * @inheritDoc
   */
  getIntegration(integration) {
    try {
      return this._integrations[integration.id] || null;
    } catch (_oO) {
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.warn(`Cannot retrieve integration ${integration.id} from the current Client`);
      return null;
    }
  }
  /**
   * @inheritDoc
   */
  addIntegration(integration) {
    setupIntegration(this, integration, this._integrations);
  }
  /**
   * @inheritDoc
   */
  sendEvent(event, hint = {}) {
    this.emit("beforeSendEvent", event, hint);
    if (this._dsn) {
      let env = createEventEnvelope(event, this._dsn, this._options._metadata, this._options.tunnel);
      for (const attachment of hint.attachments || []) {
        env = addItemToEnvelope(
          env,
          createAttachmentEnvelopeItem(
            attachment,
            this._options.transportOptions && this._options.transportOptions.textEncoder
          )
        );
      }
      const promise = this._sendEnvelope(env);
      if (promise) {
        promise.then((sendResponse) => this.emit("afterSendEvent", event, sendResponse), null);
      }
    }
  }
  /**
   * @inheritDoc
   */
  sendSession(session2) {
    if (this._dsn) {
      const env = createSessionEnvelope(session2, this._dsn, this._options._metadata, this._options.tunnel);
      void this._sendEnvelope(env);
    }
  }
  /**
   * @inheritDoc
   */
  recordDroppedEvent(reason, category, _event) {
    if (this._options.sendClientReports) {
      const key = `${reason}:${category}`;
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log(`Adding outcome: "${key}"`);
      this._outcomes[key] = this._outcomes[key] + 1 || 1;
    }
  }
  // Keep on() & emit() signatures in sync with types' client.ts interface
  /* eslint-disable @typescript-eslint/unified-signatures */
  /** @inheritdoc */
  /** @inheritdoc */
  on(hook, callback) {
    if (!this._hooks[hook]) {
      this._hooks[hook] = [];
    }
    this._hooks[hook].push(callback);
  }
  /** @inheritdoc */
  /** @inheritdoc */
  emit(hook, ...rest) {
    if (this._hooks[hook]) {
      this._hooks[hook].forEach((callback) => callback(...rest));
    }
  }
  /* eslint-enable @typescript-eslint/unified-signatures */
  /** Updates existing session based on the provided event */
  _updateSessionFromEvent(session2, event) {
    let crashed = false;
    let errored = false;
    const exceptions = event.exception && event.exception.values;
    if (exceptions) {
      errored = true;
      for (const ex of exceptions) {
        const mechanism = ex.mechanism;
        if (mechanism && mechanism.handled === false) {
          crashed = true;
          break;
        }
      }
    }
    const sessionNonTerminal = session2.status === "ok";
    const shouldUpdateAndSend = sessionNonTerminal && session2.errors === 0 || sessionNonTerminal && crashed;
    if (shouldUpdateAndSend) {
      updateSession(session2, {
        ...crashed && { status: "crashed" },
        errors: session2.errors || Number(errored || crashed)
      });
      this.captureSession(session2);
    }
  }
  /**
   * Determine if the client is finished processing. Returns a promise because it will wait `timeout` ms before saying
   * "no" (resolving to `false`) in order to give the client a chance to potentially finish first.
   *
   * @param timeout The time, in ms, after which to resolve to `false` if the client is still busy. Passing `0` (or not
   * passing anything) will make the promise wait as long as it takes for processing to finish before resolving to
   * `true`.
   * @returns A promise which will resolve to `true` if processing is already done or finishes before the timeout, and
   * `false` otherwise
   */
  _isClientDoneProcessing(timeout) {
    return new SyncPromise((resolve) => {
      let ticked = 0;
      const tick = 1;
      const interval = setInterval(() => {
        if (this._numProcessing == 0) {
          clearInterval(interval);
          resolve(true);
        } else {
          ticked += tick;
          if (timeout && ticked >= timeout) {
            clearInterval(interval);
            resolve(false);
          }
        }
      }, tick);
    });
  }
  /** Determines whether this SDK is enabled and a valid Dsn is present. */
  _isEnabled() {
    return this.getOptions().enabled !== false && this._dsn !== void 0;
  }
  /**
   * Adds common information to events.
   *
   * The information includes release and environment from `options`,
   * breadcrumbs and context (extra, tags and user) from the scope.
   *
   * Information that is already present in the event is never overwritten. For
   * nested objects, such as the context, keys are merged.
   *
   * @param event The original event.
   * @param hint May contain additional information about the original exception.
   * @param scope A scope containing event metadata.
   * @returns A new event with more information.
   */
  _prepareEvent(event, hint, scope) {
    const options = this.getOptions();
    const integrations = Object.keys(this._integrations);
    if (!hint.integrations && integrations.length > 0) {
      hint.integrations = integrations;
    }
    this.emit("preprocessEvent", event, hint);
    return prepareEvent(options, event, hint, scope).then((evt) => {
      if (evt === null) {
        return evt;
      }
      const { propagationContext } = evt.sdkProcessingMetadata || {};
      const trace = evt.contexts && evt.contexts.trace;
      if (!trace && propagationContext) {
        const { traceId: trace_id, spanId, parentSpanId, dsc } = propagationContext;
        evt.contexts = {
          trace: {
            trace_id,
            span_id: spanId,
            parent_span_id: parentSpanId
          },
          ...evt.contexts
        };
        const dynamicSamplingContext = dsc ? dsc : getDynamicSamplingContextFromClient(trace_id, this, scope);
        evt.sdkProcessingMetadata = {
          dynamicSamplingContext,
          ...evt.sdkProcessingMetadata
        };
      }
      return evt;
    });
  }
  /**
   * Processes the event and logs an error in case of rejection
   * @param event
   * @param hint
   * @param scope
   */
  _captureEvent(event, hint = {}, scope) {
    return this._processEvent(event, hint, scope).then(
      (finalEvent) => {
        return finalEvent.event_id;
      },
      (reason) => {
        if (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) {
          const sentryError = reason;
          if (sentryError.logLevel === "log") {
            logger.log(sentryError.message);
          } else {
            logger.warn(sentryError);
          }
        }
        return void 0;
      }
    );
  }
  /**
   * Processes an event (either error or message) and sends it to Sentry.
   *
   * This also adds breadcrumbs and context information to the event. However,
   * platform specific meta data (such as the User's IP address) must be added
   * by the SDK implementor.
   *
   *
   * @param event The event to send to Sentry.
   * @param hint May contain additional information about the original exception.
   * @param scope A scope containing event metadata.
   * @returns A SyncPromise that resolves with the event or rejects in case event was/will not be send.
   */
  _processEvent(event, hint, scope) {
    const options = this.getOptions();
    const { sampleRate } = options;
    if (!this._isEnabled()) {
      return rejectedSyncPromise(new SentryError("SDK not enabled, will not capture event.", "log"));
    }
    const isTransaction = isTransactionEvent$1(event);
    const isError2 = isErrorEvent$1(event);
    const eventType = event.type || "error";
    const beforeSendLabel = `before send for type \`${eventType}\``;
    if (isError2 && typeof sampleRate === "number" && Math.random() > sampleRate) {
      this.recordDroppedEvent("sample_rate", "error", event);
      return rejectedSyncPromise(
        new SentryError(
          `Discarding event because it's not included in the random sample (sampling rate = ${sampleRate})`,
          "log"
        )
      );
    }
    const dataCategory = eventType === "replay_event" ? "replay" : eventType;
    return this._prepareEvent(event, hint, scope).then((prepared) => {
      if (prepared === null) {
        this.recordDroppedEvent("event_processor", dataCategory, event);
        throw new SentryError("An event processor returned `null`, will not send event.", "log");
      }
      const isInternalException = hint.data && hint.data.__sentry__ === true;
      if (isInternalException) {
        return prepared;
      }
      const result = processBeforeSend(options, prepared, hint);
      return _validateBeforeSendResult(result, beforeSendLabel);
    }).then((processedEvent) => {
      if (processedEvent === null) {
        this.recordDroppedEvent("before_send", dataCategory, event);
        throw new SentryError(`${beforeSendLabel} returned \`null\`, will not send event.`, "log");
      }
      const session2 = scope && scope.getSession();
      if (!isTransaction && session2) {
        this._updateSessionFromEvent(session2, processedEvent);
      }
      const transactionInfo = processedEvent.transaction_info;
      if (isTransaction && transactionInfo && processedEvent.transaction !== event.transaction) {
        const source = "custom";
        processedEvent.transaction_info = {
          ...transactionInfo,
          source
        };
      }
      this.sendEvent(processedEvent, hint);
      return processedEvent;
    }).then(null, (reason) => {
      if (reason instanceof SentryError) {
        throw reason;
      }
      this.captureException(reason, {
        data: {
          __sentry__: true
        },
        originalException: reason
      });
      throw new SentryError(
        `Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${reason}`
      );
    });
  }
  /**
   * Occupies the client with processing and event
   */
  _process(promise) {
    this._numProcessing++;
    void promise.then(
      (value) => {
        this._numProcessing--;
        return value;
      },
      (reason) => {
        this._numProcessing--;
        return reason;
      }
    );
  }
  /**
   * @inheritdoc
   */
  _sendEnvelope(envelope) {
    if (this._transport && this._dsn) {
      this.emit("beforeEnvelope", envelope);
      return this._transport.send(envelope).then(null, (reason) => {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.error("Error while sending event:", reason);
      });
    } else {
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.error("Transport disabled");
    }
  }
  /**
   * Clears outcomes on this client and returns them.
   */
  _clearOutcomes() {
    const outcomes = this._outcomes;
    this._outcomes = {};
    return Object.keys(outcomes).map((key) => {
      const [reason, category] = key.split(":");
      return {
        reason,
        category,
        quantity: outcomes[key]
      };
    });
  }
  /**
   * @inheritDoc
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
}
function _validateBeforeSendResult(beforeSendResult, beforeSendLabel) {
  const invalidValueError = `${beforeSendLabel} must return \`null\` or a valid event.`;
  if (isThenable(beforeSendResult)) {
    return beforeSendResult.then(
      (event) => {
        if (!isPlainObject(event) && event !== null) {
          throw new SentryError(invalidValueError);
        }
        return event;
      },
      (e2) => {
        throw new SentryError(`${beforeSendLabel} rejected with ${e2}`);
      }
    );
  } else if (!isPlainObject(beforeSendResult) && beforeSendResult !== null) {
    throw new SentryError(invalidValueError);
  }
  return beforeSendResult;
}
function processBeforeSend(options, event, hint) {
  const { beforeSend, beforeSendTransaction } = options;
  if (isErrorEvent$1(event) && beforeSend) {
    return beforeSend(event, hint);
  }
  if (isTransactionEvent$1(event) && beforeSendTransaction) {
    return beforeSendTransaction(event, hint);
  }
  return event;
}
function isErrorEvent$1(event) {
  return event.type === void 0;
}
function isTransactionEvent$1(event) {
  return event.type === "transaction";
}
function initAndBind(clientClass, options) {
  if (options.debug === true) {
    if (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) {
      logger.enable();
    } else {
      console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.");
    }
  }
  const hub = getCurrentHub();
  const scope = hub.getScope();
  scope.update(options.initialScope);
  const client = new clientClass(options);
  hub.bindClient(client);
}
const DEFAULT_TRANSPORT_BUFFER_SIZE = 30;
function createTransport(options, makeRequest, buffer = makePromiseBuffer(
  options.bufferSize || DEFAULT_TRANSPORT_BUFFER_SIZE
)) {
  let rateLimits = {};
  const flush = (timeout) => buffer.drain(timeout);
  function send(envelope) {
    const filteredEnvelopeItems = [];
    forEachEnvelopeItem(envelope, (item, type) => {
      const envelopeItemDataCategory = envelopeItemTypeToDataCategory(type);
      if (isRateLimited(rateLimits, envelopeItemDataCategory)) {
        const event = getEventForEnvelopeItem(item, type);
        options.recordDroppedEvent("ratelimit_backoff", envelopeItemDataCategory, event);
      } else {
        filteredEnvelopeItems.push(item);
      }
    });
    if (filteredEnvelopeItems.length === 0) {
      return resolvedSyncPromise();
    }
    const filteredEnvelope = createEnvelope(envelope[0], filteredEnvelopeItems);
    const recordEnvelopeLoss = (reason) => {
      forEachEnvelopeItem(filteredEnvelope, (item, type) => {
        const event = getEventForEnvelopeItem(item, type);
        options.recordDroppedEvent(reason, envelopeItemTypeToDataCategory(type), event);
      });
    };
    const requestTask = () => makeRequest({ body: serializeEnvelope(filteredEnvelope, options.textEncoder) }).then(
      (response) => {
        if (response.statusCode !== void 0 && (response.statusCode < 200 || response.statusCode >= 300)) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.warn(`Sentry responded with status code ${response.statusCode} to sent event.`);
        }
        rateLimits = updateRateLimits(rateLimits, response);
        return response;
      },
      (error) => {
        recordEnvelopeLoss("network_error");
        throw error;
      }
    );
    return buffer.add(requestTask).then(
      (result) => result,
      (error) => {
        if (error instanceof SentryError) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.error("Skipped sending event because buffer is full.");
          recordEnvelopeLoss("queue_overflow");
          return resolvedSyncPromise();
        } else {
          throw error;
        }
      }
    );
  }
  send.__sentry__baseTransport__ = true;
  return {
    send,
    flush
  };
}
function getEventForEnvelopeItem(item, type) {
  if (type !== "event" && type !== "transaction") {
    return void 0;
  }
  return Array.isArray(item) ? item[1] : void 0;
}
const SDK_VERSION = "7.69.0";
let originalFunctionToString;
class FunctionToString {
  /**
   * @inheritDoc
   */
  static __initStatic() {
    this.id = "FunctionToString";
  }
  /**
   * @inheritDoc
   */
  constructor() {
    this.name = FunctionToString.id;
  }
  /**
   * @inheritDoc
   */
  setupOnce() {
    originalFunctionToString = Function.prototype.toString;
    try {
      Function.prototype.toString = function(...args) {
        const context = getOriginalFunction(this) || this;
        return originalFunctionToString.apply(context, args);
      };
    } catch (e2) {
    }
  }
}
FunctionToString.__initStatic();
const DEFAULT_IGNORE_ERRORS = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/];
const DEFAULT_IGNORE_TRANSACTIONS = [
  /^.*healthcheck.*$/,
  /^.*healthy.*$/,
  /^.*live.*$/,
  /^.*ready.*$/,
  /^.*heartbeat.*$/,
  /^.*\/health$/,
  /^.*\/healthz$/
];
class InboundFilters {
  /**
   * @inheritDoc
   */
  static __initStatic() {
    this.id = "InboundFilters";
  }
  /**
   * @inheritDoc
   */
  constructor(options = {}) {
    this.name = InboundFilters.id;
    this._options = options;
  }
  /**
   * @inheritDoc
   */
  setupOnce(addGlobalEventProcessor2, getCurrentHub2) {
    const eventProcess = (event) => {
      const hub = getCurrentHub2();
      if (hub) {
        const self2 = hub.getIntegration(InboundFilters);
        if (self2) {
          const client = hub.getClient();
          const clientOptions = client ? client.getOptions() : {};
          const options = _mergeOptions(self2._options, clientOptions);
          return _shouldDropEvent$1(event, options) ? null : event;
        }
      }
      return event;
    };
    eventProcess.id = this.name;
    addGlobalEventProcessor2(eventProcess);
  }
}
InboundFilters.__initStatic();
function _mergeOptions(internalOptions = {}, clientOptions = {}) {
  return {
    allowUrls: [...internalOptions.allowUrls || [], ...clientOptions.allowUrls || []],
    denyUrls: [...internalOptions.denyUrls || [], ...clientOptions.denyUrls || []],
    ignoreErrors: [
      ...internalOptions.ignoreErrors || [],
      ...clientOptions.ignoreErrors || [],
      ...internalOptions.disableErrorDefaults ? [] : DEFAULT_IGNORE_ERRORS
    ],
    ignoreTransactions: [
      ...internalOptions.ignoreTransactions || [],
      ...clientOptions.ignoreTransactions || [],
      ...internalOptions.disableTransactionDefaults ? [] : DEFAULT_IGNORE_TRANSACTIONS
    ],
    ignoreInternal: internalOptions.ignoreInternal !== void 0 ? internalOptions.ignoreInternal : true
  };
}
function _shouldDropEvent$1(event, options) {
  if (options.ignoreInternal && _isSentryError(event)) {
    (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.warn(`Event dropped due to being internal Sentry Error.
Event: ${getEventDescription(event)}`);
    return true;
  }
  if (_isIgnoredError(event, options.ignoreErrors)) {
    (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.warn(
      `Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${getEventDescription(event)}`
    );
    return true;
  }
  if (_isIgnoredTransaction(event, options.ignoreTransactions)) {
    (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.warn(
      `Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${getEventDescription(event)}`
    );
    return true;
  }
  if (_isDeniedUrl(event, options.denyUrls)) {
    (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.warn(
      `Event dropped due to being matched by \`denyUrls\` option.
Event: ${getEventDescription(
        event
      )}.
Url: ${_getEventFilterUrl(event)}`
    );
    return true;
  }
  if (!_isAllowedUrl(event, options.allowUrls)) {
    (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.warn(
      `Event dropped due to not being matched by \`allowUrls\` option.
Event: ${getEventDescription(
        event
      )}.
Url: ${_getEventFilterUrl(event)}`
    );
    return true;
  }
  return false;
}
function _isIgnoredError(event, ignoreErrors) {
  if (event.type || !ignoreErrors || !ignoreErrors.length) {
    return false;
  }
  return _getPossibleEventMessages(event).some((message) => stringMatchesSomePattern(message, ignoreErrors));
}
function _isIgnoredTransaction(event, ignoreTransactions) {
  if (event.type !== "transaction" || !ignoreTransactions || !ignoreTransactions.length) {
    return false;
  }
  const name = event.transaction;
  return name ? stringMatchesSomePattern(name, ignoreTransactions) : false;
}
function _isDeniedUrl(event, denyUrls) {
  if (!denyUrls || !denyUrls.length) {
    return false;
  }
  const url = _getEventFilterUrl(event);
  return !url ? false : stringMatchesSomePattern(url, denyUrls);
}
function _isAllowedUrl(event, allowUrls) {
  if (!allowUrls || !allowUrls.length) {
    return true;
  }
  const url = _getEventFilterUrl(event);
  return !url ? true : stringMatchesSomePattern(url, allowUrls);
}
function _getPossibleEventMessages(event) {
  const possibleMessages = [];
  if (event.message) {
    possibleMessages.push(event.message);
  }
  let lastException;
  try {
    lastException = event.exception.values[event.exception.values.length - 1];
  } catch (e2) {
  }
  if (lastException) {
    if (lastException.value) {
      possibleMessages.push(lastException.value);
      if (lastException.type) {
        possibleMessages.push(`${lastException.type}: ${lastException.value}`);
      }
    }
  }
  if ((typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && possibleMessages.length === 0) {
    logger.error(`Could not extract message for event ${getEventDescription(event)}`);
  }
  return possibleMessages;
}
function _isSentryError(event) {
  try {
    return event.exception.values[0].type === "SentryError";
  } catch (e2) {
  }
  return false;
}
function _getLastValidUrl(frames = []) {
  for (let i = frames.length - 1; i >= 0; i--) {
    const frame = frames[i];
    if (frame && frame.filename !== "<anonymous>" && frame.filename !== "[native code]") {
      return frame.filename || null;
    }
  }
  return null;
}
function _getEventFilterUrl(event) {
  try {
    let frames;
    try {
      frames = event.exception.values[0].stacktrace.frames;
    } catch (e2) {
    }
    return frames ? _getLastValidUrl(frames) : null;
  } catch (oO) {
    (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.error(`Cannot extract url for event ${getEventDescription(event)}`);
    return null;
  }
}
const WINDOW$2 = GLOBAL_OBJ;
let ignoreOnError = 0;
function shouldIgnoreOnError() {
  return ignoreOnError > 0;
}
function ignoreNextOnError() {
  ignoreOnError++;
  setTimeout(() => {
    ignoreOnError--;
  });
}
function wrap(fn, options = {}, before) {
  if (typeof fn !== "function") {
    return fn;
  }
  try {
    const wrapper = fn.__sentry_wrapped__;
    if (wrapper) {
      return wrapper;
    }
    if (getOriginalFunction(fn)) {
      return fn;
    }
  } catch (e2) {
    return fn;
  }
  const sentryWrapped = function() {
    const args = Array.prototype.slice.call(arguments);
    try {
      if (before && typeof before === "function") {
        before.apply(this, arguments);
      }
      const wrappedArguments = args.map((arg) => wrap(arg, options));
      return fn.apply(this, wrappedArguments);
    } catch (ex) {
      ignoreNextOnError();
      withScope((scope) => {
        scope.addEventProcessor((event) => {
          if (options.mechanism) {
            addExceptionTypeValue(event, void 0, void 0);
            addExceptionMechanism(event, options.mechanism);
          }
          event.extra = {
            ...event.extra,
            arguments: args
          };
          return event;
        });
        captureException(ex);
      });
      throw ex;
    }
  };
  try {
    for (const property in fn) {
      if (Object.prototype.hasOwnProperty.call(fn, property)) {
        sentryWrapped[property] = fn[property];
      }
    }
  } catch (_oO) {
  }
  markFunctionWrapped(sentryWrapped, fn);
  addNonEnumerableProperty(fn, "__sentry_wrapped__", sentryWrapped);
  try {
    const descriptor = Object.getOwnPropertyDescriptor(sentryWrapped, "name");
    if (descriptor.configurable) {
      Object.defineProperty(sentryWrapped, "name", {
        get() {
          return fn.name;
        }
      });
    }
  } catch (_oO) {
  }
  return sentryWrapped;
}
function exceptionFromError(stackParser, ex) {
  const frames = parseStackFrames(stackParser, ex);
  const exception = {
    type: ex && ex.name,
    value: extractMessage(ex)
  };
  if (frames.length) {
    exception.stacktrace = { frames };
  }
  if (exception.type === void 0 && exception.value === "") {
    exception.value = "Unrecoverable error caught";
  }
  return exception;
}
function eventFromPlainObject(stackParser, exception, syntheticException, isUnhandledRejection) {
  const hub = getCurrentHub();
  const client = hub.getClient();
  const normalizeDepth = client && client.getOptions().normalizeDepth;
  const event = {
    exception: {
      values: [
        {
          type: isEvent(exception) ? exception.constructor.name : isUnhandledRejection ? "UnhandledRejection" : "Error",
          value: getNonErrorObjectExceptionValue(exception, { isUnhandledRejection })
        }
      ]
    },
    extra: {
      __serialized__: normalizeToSize(exception, normalizeDepth)
    }
  };
  if (syntheticException) {
    const frames = parseStackFrames(stackParser, syntheticException);
    if (frames.length) {
      event.exception.values[0].stacktrace = { frames };
    }
  }
  return event;
}
function eventFromError(stackParser, ex) {
  return {
    exception: {
      values: [exceptionFromError(stackParser, ex)]
    }
  };
}
function parseStackFrames(stackParser, ex) {
  const stacktrace = ex.stacktrace || ex.stack || "";
  const popSize = getPopSize(ex);
  try {
    return stackParser(stacktrace, popSize);
  } catch (e2) {
  }
  return [];
}
const reactMinifiedRegexp = /Minified React error #\d+;/i;
function getPopSize(ex) {
  if (ex) {
    if (typeof ex.framesToPop === "number") {
      return ex.framesToPop;
    }
    if (reactMinifiedRegexp.test(ex.message)) {
      return 1;
    }
  }
  return 0;
}
function extractMessage(ex) {
  const message = ex && ex.message;
  if (!message) {
    return "No error message";
  }
  if (message.error && typeof message.error.message === "string") {
    return message.error.message;
  }
  return message;
}
function eventFromException(stackParser, exception, hint, attachStacktrace) {
  const syntheticException = hint && hint.syntheticException || void 0;
  const event = eventFromUnknownInput(stackParser, exception, syntheticException, attachStacktrace);
  addExceptionMechanism(event);
  event.level = "error";
  if (hint && hint.event_id) {
    event.event_id = hint.event_id;
  }
  return resolvedSyncPromise(event);
}
function eventFromMessage(stackParser, message, level = "info", hint, attachStacktrace) {
  const syntheticException = hint && hint.syntheticException || void 0;
  const event = eventFromString(stackParser, message, syntheticException, attachStacktrace);
  event.level = level;
  if (hint && hint.event_id) {
    event.event_id = hint.event_id;
  }
  return resolvedSyncPromise(event);
}
function eventFromUnknownInput(stackParser, exception, syntheticException, attachStacktrace, isUnhandledRejection) {
  let event;
  if (isErrorEvent$2(exception) && exception.error) {
    const errorEvent = exception;
    return eventFromError(stackParser, errorEvent.error);
  }
  if (isDOMError(exception) || isDOMException(exception)) {
    const domException = exception;
    if ("stack" in exception) {
      event = eventFromError(stackParser, exception);
    } else {
      const name = domException.name || (isDOMError(domException) ? "DOMError" : "DOMException");
      const message = domException.message ? `${name}: ${domException.message}` : name;
      event = eventFromString(stackParser, message, syntheticException, attachStacktrace);
      addExceptionTypeValue(event, message);
    }
    if ("code" in domException) {
      event.tags = { ...event.tags, "DOMException.code": `${domException.code}` };
    }
    return event;
  }
  if (isError(exception)) {
    return eventFromError(stackParser, exception);
  }
  if (isPlainObject(exception) || isEvent(exception)) {
    const objectException = exception;
    event = eventFromPlainObject(stackParser, objectException, syntheticException, isUnhandledRejection);
    addExceptionMechanism(event, {
      synthetic: true
    });
    return event;
  }
  event = eventFromString(stackParser, exception, syntheticException, attachStacktrace);
  addExceptionTypeValue(event, `${exception}`, void 0);
  addExceptionMechanism(event, {
    synthetic: true
  });
  return event;
}
function eventFromString(stackParser, input, syntheticException, attachStacktrace) {
  const event = {
    message: input
  };
  if (attachStacktrace && syntheticException) {
    const frames = parseStackFrames(stackParser, syntheticException);
    if (frames.length) {
      event.exception = {
        values: [{ value: input, stacktrace: { frames } }]
      };
    }
  }
  return event;
}
function getNonErrorObjectExceptionValue(exception, { isUnhandledRejection }) {
  const keys = extractExceptionKeysForMessage(exception);
  const captureType = isUnhandledRejection ? "promise rejection" : "exception";
  if (isErrorEvent$2(exception)) {
    return `Event \`ErrorEvent\` captured as ${captureType} with message \`${exception.message}\``;
  }
  if (isEvent(exception)) {
    const className = getObjectClassName(exception);
    return `Event \`${className}\` (type=${exception.type}) captured as ${captureType}`;
  }
  return `Object captured as ${captureType} with keys: ${keys}`;
}
function getObjectClassName(obj) {
  try {
    const prototype = Object.getPrototypeOf(obj);
    return prototype ? prototype.constructor.name : void 0;
  } catch (e2) {
  }
}
function createUserFeedbackEnvelope(feedback, {
  metadata,
  tunnel,
  dsn
}) {
  const headers = {
    event_id: feedback.event_id,
    sent_at: (/* @__PURE__ */ new Date()).toISOString(),
    ...metadata && metadata.sdk && {
      sdk: {
        name: metadata.sdk.name,
        version: metadata.sdk.version
      }
    },
    ...!!tunnel && !!dsn && { dsn: dsnToString(dsn) }
  };
  const item = createUserFeedbackEnvelopeItem(feedback);
  return createEnvelope(headers, [item]);
}
function createUserFeedbackEnvelopeItem(feedback) {
  const feedbackHeaders = {
    type: "user_report"
  };
  return [feedbackHeaders, feedback];
}
class BrowserClient extends BaseClient {
  /**
   * Creates a new Browser SDK instance.
   *
   * @param options Configuration options for this SDK.
   */
  constructor(options) {
    const sdkSource = WINDOW$2.SENTRY_SDK_SOURCE || getSDKSource();
    options._metadata = options._metadata || {};
    options._metadata.sdk = options._metadata.sdk || {
      name: "sentry.javascript.browser",
      packages: [
        {
          name: `${sdkSource}:@sentry/browser`,
          version: SDK_VERSION
        }
      ],
      version: SDK_VERSION
    };
    super(options);
    if (options.sendClientReports && WINDOW$2.document) {
      WINDOW$2.document.addEventListener("visibilitychange", () => {
        if (WINDOW$2.document.visibilityState === "hidden") {
          this._flushOutcomes();
        }
      });
    }
  }
  /**
   * @inheritDoc
   */
  eventFromException(exception, hint) {
    return eventFromException(this._options.stackParser, exception, hint, this._options.attachStacktrace);
  }
  /**
   * @inheritDoc
   */
  eventFromMessage(message, level = "info", hint) {
    return eventFromMessage(this._options.stackParser, message, level, hint, this._options.attachStacktrace);
  }
  /**
   * Sends user feedback to Sentry.
   */
  captureUserFeedback(feedback) {
    if (!this._isEnabled()) {
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.warn("SDK not enabled, will not capture user feedback.");
      return;
    }
    const envelope = createUserFeedbackEnvelope(feedback, {
      metadata: this.getSdkMetadata(),
      dsn: this.getDsn(),
      tunnel: this.getOptions().tunnel
    });
    void this._sendEnvelope(envelope);
  }
  /**
   * @inheritDoc
   */
  _prepareEvent(event, hint, scope) {
    event.platform = event.platform || "javascript";
    return super._prepareEvent(event, hint, scope);
  }
  /**
   * Sends client reports as an envelope.
   */
  _flushOutcomes() {
    const outcomes = this._clearOutcomes();
    if (outcomes.length === 0) {
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log("No outcomes to send");
      return;
    }
    if (!this._dsn) {
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log("No dsn provided, will not send outcomes");
      return;
    }
    (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log("Sending outcomes:", outcomes);
    const envelope = createClientReportEnvelope(outcomes, this._options.tunnel && dsnToString(this._dsn));
    void this._sendEnvelope(envelope);
  }
}
let cachedFetchImpl = void 0;
function getNativeFetchImplementation() {
  if (cachedFetchImpl) {
    return cachedFetchImpl;
  }
  if (isNativeFetch(WINDOW$2.fetch)) {
    return cachedFetchImpl = WINDOW$2.fetch.bind(WINDOW$2);
  }
  const document2 = WINDOW$2.document;
  let fetchImpl = WINDOW$2.fetch;
  if (document2 && typeof document2.createElement === "function") {
    try {
      const sandbox = document2.createElement("iframe");
      sandbox.hidden = true;
      document2.head.appendChild(sandbox);
      const contentWindow = sandbox.contentWindow;
      if (contentWindow && contentWindow.fetch) {
        fetchImpl = contentWindow.fetch;
      }
      document2.head.removeChild(sandbox);
    } catch (e2) {
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ", e2);
    }
  }
  return cachedFetchImpl = fetchImpl.bind(WINDOW$2);
}
function clearCachedFetchImplementation() {
  cachedFetchImpl = void 0;
}
function makeFetchTransport(options, nativeFetch = getNativeFetchImplementation()) {
  let pendingBodySize = 0;
  let pendingCount = 0;
  function makeRequest(request) {
    const requestSize = request.body.length;
    pendingBodySize += requestSize;
    pendingCount++;
    const requestOptions = {
      body: request.body,
      method: "POST",
      referrerPolicy: "origin",
      headers: options.headers,
      // Outgoing requests are usually cancelled when navigating to a different page, causing a "TypeError: Failed to
      // fetch" error and sending a "network_error" client-outcome - in Chrome, the request status shows "(cancelled)".
      // The `keepalive` flag keeps outgoing requests alive, even when switching pages. We want this since we're
      // frequently sending events right before the user is switching pages (eg. whenfinishing navigation transactions).
      // Gotchas:
      // - `keepalive` isn't supported by Firefox
      // - As per spec (https://fetch.spec.whatwg.org/#http-network-or-cache-fetch):
      //   If the sum of contentLength and inflightKeepaliveBytes is greater than 64 kibibytes, then return a network error.
      //   We will therefore only activate the flag when we're below that limit.
      // There is also a limit of requests that can be open at the same time, so we also limit this to 15
      // See https://github.com/getsentry/sentry-javascript/pull/7553 for details
      keepalive: pendingBodySize <= 6e4 && pendingCount < 15,
      ...options.fetchOptions
    };
    try {
      return nativeFetch(options.url, requestOptions).then((response) => {
        pendingBodySize -= requestSize;
        pendingCount--;
        return {
          statusCode: response.status,
          headers: {
            "x-sentry-rate-limits": response.headers.get("X-Sentry-Rate-Limits"),
            "retry-after": response.headers.get("Retry-After")
          }
        };
      });
    } catch (e2) {
      clearCachedFetchImplementation();
      pendingBodySize -= requestSize;
      pendingCount--;
      return rejectedSyncPromise(e2);
    }
  }
  return createTransport(options, makeRequest);
}
const XHR_READYSTATE_DONE = 4;
function makeXHRTransport(options) {
  function makeRequest(request) {
    return new SyncPromise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onerror = reject;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XHR_READYSTATE_DONE) {
          resolve({
            statusCode: xhr.status,
            headers: {
              "x-sentry-rate-limits": xhr.getResponseHeader("X-Sentry-Rate-Limits"),
              "retry-after": xhr.getResponseHeader("Retry-After")
            }
          });
        }
      };
      xhr.open("POST", options.url);
      for (const header in options.headers) {
        if (Object.prototype.hasOwnProperty.call(options.headers, header)) {
          xhr.setRequestHeader(header, options.headers[header]);
        }
      }
      xhr.send(request.body);
    });
  }
  return createTransport(options, makeRequest);
}
const UNKNOWN_FUNCTION = "?";
const CHROME_PRIORITY = 30;
const WINJS_PRIORITY = 40;
const GECKO_PRIORITY = 50;
function createFrame(filename, func, lineno, colno) {
  const frame = {
    filename,
    function: func,
    in_app: true
    // All browser frames are considered in_app
  };
  if (lineno !== void 0) {
    frame.lineno = lineno;
  }
  if (colno !== void 0) {
    frame.colno = colno;
  }
  return frame;
}
const chromeRegex = /^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
const chromeEvalRegex = /\((\S*)(?::(\d+))(?::(\d+))\)/;
const chrome = (line) => {
  const parts = chromeRegex.exec(line);
  if (parts) {
    const isEval = parts[2] && parts[2].indexOf("eval") === 0;
    if (isEval) {
      const subMatch = chromeEvalRegex.exec(parts[2]);
      if (subMatch) {
        parts[2] = subMatch[1];
        parts[3] = subMatch[2];
        parts[4] = subMatch[3];
      }
    }
    const [func, filename] = extractSafariExtensionDetails(parts[1] || UNKNOWN_FUNCTION, parts[2]);
    return createFrame(filename, func, parts[3] ? +parts[3] : void 0, parts[4] ? +parts[4] : void 0);
  }
  return;
};
const chromeStackLineParser = [CHROME_PRIORITY, chrome];
const geckoREgex = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i;
const geckoEvalRegex = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
const gecko = (line) => {
  const parts = geckoREgex.exec(line);
  if (parts) {
    const isEval = parts[3] && parts[3].indexOf(" > eval") > -1;
    if (isEval) {
      const subMatch = geckoEvalRegex.exec(parts[3]);
      if (subMatch) {
        parts[1] = parts[1] || "eval";
        parts[3] = subMatch[1];
        parts[4] = subMatch[2];
        parts[5] = "";
      }
    }
    let filename = parts[3];
    let func = parts[1] || UNKNOWN_FUNCTION;
    [func, filename] = extractSafariExtensionDetails(func, filename);
    return createFrame(filename, func, parts[4] ? +parts[4] : void 0, parts[5] ? +parts[5] : void 0);
  }
  return;
};
const geckoStackLineParser = [GECKO_PRIORITY, gecko];
const winjsRegex = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:[-a-z]+):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
const winjs = (line) => {
  const parts = winjsRegex.exec(line);
  return parts ? createFrame(parts[2], parts[1] || UNKNOWN_FUNCTION, +parts[3], parts[4] ? +parts[4] : void 0) : void 0;
};
const winjsStackLineParser = [WINJS_PRIORITY, winjs];
const defaultStackLineParsers = [chromeStackLineParser, geckoStackLineParser, winjsStackLineParser];
const defaultStackParser = createStackParser(...defaultStackLineParsers);
const extractSafariExtensionDetails = (func, filename) => {
  const isSafariExtension = func.indexOf("safari-extension") !== -1;
  const isSafariWebExtension = func.indexOf("safari-web-extension") !== -1;
  return isSafariExtension || isSafariWebExtension ? [
    func.indexOf("@") !== -1 ? func.split("@")[0] : UNKNOWN_FUNCTION,
    isSafariExtension ? `safari-extension:${filename}` : `safari-web-extension:${filename}`
  ] : [func, filename];
};
class GlobalHandlers {
  /**
   * @inheritDoc
   */
  static __initStatic() {
    this.id = "GlobalHandlers";
  }
  /**
   * @inheritDoc
   */
  /** JSDoc */
  /**
   * Stores references functions to installing handlers. Will set to undefined
   * after they have been run so that they are not used twice.
   */
  /** JSDoc */
  constructor(options) {
    this.name = GlobalHandlers.id;
    this._options = {
      onerror: true,
      onunhandledrejection: true,
      ...options
    };
    this._installFunc = {
      onerror: _installGlobalOnErrorHandler,
      onunhandledrejection: _installGlobalOnUnhandledRejectionHandler
    };
  }
  /**
   * @inheritDoc
   */
  setupOnce() {
    Error.stackTraceLimit = 50;
    const options = this._options;
    for (const key in options) {
      const installFunc = this._installFunc[key];
      if (installFunc && options[key]) {
        globalHandlerLog(key);
        installFunc();
        this._installFunc[key] = void 0;
      }
    }
  }
}
GlobalHandlers.__initStatic();
function _installGlobalOnErrorHandler() {
  addInstrumentationHandler(
    "error",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (data) => {
      const [hub, stackParser, attachStacktrace] = getHubAndOptions();
      if (!hub.getIntegration(GlobalHandlers)) {
        return;
      }
      const { msg, url, line, column, error } = data;
      if (shouldIgnoreOnError() || error && error.__sentry_own_request__) {
        return;
      }
      const event = error === void 0 && isString(msg) ? _eventFromIncompleteOnError(msg, url, line, column) : _enhanceEventWithInitialFrame(
        eventFromUnknownInput(stackParser, error || msg, void 0, attachStacktrace, false),
        url,
        line,
        column
      );
      event.level = "error";
      addMechanismAndCapture(hub, error, event, "onerror");
    }
  );
}
function _installGlobalOnUnhandledRejectionHandler() {
  addInstrumentationHandler(
    "unhandledrejection",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e2) => {
      const [hub, stackParser, attachStacktrace] = getHubAndOptions();
      if (!hub.getIntegration(GlobalHandlers)) {
        return;
      }
      let error = e2;
      try {
        if ("reason" in e2) {
          error = e2.reason;
        } else if ("detail" in e2 && "reason" in e2.detail) {
          error = e2.detail.reason;
        }
      } catch (_oO) {
      }
      if (shouldIgnoreOnError() || error && error.__sentry_own_request__) {
        return true;
      }
      const event = isPrimitive(error) ? _eventFromRejectionWithPrimitive(error) : eventFromUnknownInput(stackParser, error, void 0, attachStacktrace, true);
      event.level = "error";
      addMechanismAndCapture(hub, error, event, "onunhandledrejection");
      return;
    }
  );
}
function _eventFromRejectionWithPrimitive(reason) {
  return {
    exception: {
      values: [
        {
          type: "UnhandledRejection",
          // String() is needed because the Primitive type includes symbols (which can't be automatically stringified)
          value: `Non-Error promise rejection captured with value: ${String(reason)}`
        }
      ]
    }
  };
}
function _eventFromIncompleteOnError(msg, url, line, column) {
  const ERROR_TYPES_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i;
  let message = isErrorEvent$2(msg) ? msg.message : msg;
  let name = "Error";
  const groups = message.match(ERROR_TYPES_RE);
  if (groups) {
    name = groups[1];
    message = groups[2];
  }
  const event = {
    exception: {
      values: [
        {
          type: name,
          value: message
        }
      ]
    }
  };
  return _enhanceEventWithInitialFrame(event, url, line, column);
}
function _enhanceEventWithInitialFrame(event, url, line, column) {
  const e2 = event.exception = event.exception || {};
  const ev = e2.values = e2.values || [];
  const ev0 = ev[0] = ev[0] || {};
  const ev0s = ev0.stacktrace = ev0.stacktrace || {};
  const ev0sf = ev0s.frames = ev0s.frames || [];
  const colno = isNaN(parseInt(column, 10)) ? void 0 : column;
  const lineno = isNaN(parseInt(line, 10)) ? void 0 : line;
  const filename = isString(url) && url.length > 0 ? url : getLocationHref();
  if (ev0sf.length === 0) {
    ev0sf.push({
      colno,
      filename,
      function: "?",
      in_app: true,
      lineno
    });
  }
  return event;
}
function globalHandlerLog(type) {
  (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log(`Global Handler attached: ${type}`);
}
function addMechanismAndCapture(hub, error, event, type) {
  addExceptionMechanism(event, {
    handled: false,
    type
  });
  hub.captureEvent(event, {
    originalException: error
  });
}
function getHubAndOptions() {
  const hub = getCurrentHub();
  const client = hub.getClient();
  const options = client && client.getOptions() || {
    stackParser: () => [],
    attachStacktrace: false
  };
  return [hub, options.stackParser, options.attachStacktrace];
}
const DEFAULT_EVENT_TARGET = [
  "EventTarget",
  "Window",
  "Node",
  "ApplicationCache",
  "AudioTrackList",
  "BroadcastChannel",
  "ChannelMergerNode",
  "CryptoOperation",
  "EventSource",
  "FileReader",
  "HTMLUnknownElement",
  "IDBDatabase",
  "IDBRequest",
  "IDBTransaction",
  "KeyOperation",
  "MediaController",
  "MessagePort",
  "ModalWindow",
  "Notification",
  "SVGElementInstance",
  "Screen",
  "SharedWorker",
  "TextTrack",
  "TextTrackCue",
  "TextTrackList",
  "WebSocket",
  "WebSocketWorker",
  "Worker",
  "XMLHttpRequest",
  "XMLHttpRequestEventTarget",
  "XMLHttpRequestUpload"
];
class TryCatch {
  /**
   * @inheritDoc
   */
  static __initStatic() {
    this.id = "TryCatch";
  }
  /**
   * @inheritDoc
   */
  /** JSDoc */
  /**
   * @inheritDoc
   */
  constructor(options) {
    this.name = TryCatch.id;
    this._options = {
      XMLHttpRequest: true,
      eventTarget: true,
      requestAnimationFrame: true,
      setInterval: true,
      setTimeout: true,
      ...options
    };
  }
  /**
   * Wrap timer functions and event targets to catch errors
   * and provide better metadata.
   */
  setupOnce() {
    if (this._options.setTimeout) {
      fill(WINDOW$2, "setTimeout", _wrapTimeFunction);
    }
    if (this._options.setInterval) {
      fill(WINDOW$2, "setInterval", _wrapTimeFunction);
    }
    if (this._options.requestAnimationFrame) {
      fill(WINDOW$2, "requestAnimationFrame", _wrapRAF);
    }
    if (this._options.XMLHttpRequest && "XMLHttpRequest" in WINDOW$2) {
      fill(XMLHttpRequest.prototype, "send", _wrapXHR);
    }
    const eventTargetOption = this._options.eventTarget;
    if (eventTargetOption) {
      const eventTarget = Array.isArray(eventTargetOption) ? eventTargetOption : DEFAULT_EVENT_TARGET;
      eventTarget.forEach(_wrapEventTarget);
    }
  }
}
TryCatch.__initStatic();
function _wrapTimeFunction(original) {
  return function(...args) {
    const originalCallback = args[0];
    args[0] = wrap(originalCallback, {
      mechanism: {
        data: { function: getFunctionName(original) },
        handled: false,
        type: "instrument"
      }
    });
    return original.apply(this, args);
  };
}
function _wrapRAF(original) {
  return function(callback) {
    return original.apply(this, [
      wrap(callback, {
        mechanism: {
          data: {
            function: "requestAnimationFrame",
            handler: getFunctionName(original)
          },
          handled: false,
          type: "instrument"
        }
      })
    ]);
  };
}
function _wrapXHR(originalSend) {
  return function(...args) {
    const xhr = this;
    const xmlHttpRequestProps = ["onload", "onerror", "onprogress", "onreadystatechange"];
    xmlHttpRequestProps.forEach((prop) => {
      if (prop in xhr && typeof xhr[prop] === "function") {
        fill(xhr, prop, function(original) {
          const wrapOptions = {
            mechanism: {
              data: {
                function: prop,
                handler: getFunctionName(original)
              },
              handled: false,
              type: "instrument"
            }
          };
          const originalFunction = getOriginalFunction(original);
          if (originalFunction) {
            wrapOptions.mechanism.data.handler = getFunctionName(originalFunction);
          }
          return wrap(original, wrapOptions);
        });
      }
    });
    return originalSend.apply(this, args);
  };
}
function _wrapEventTarget(target) {
  const globalObject = WINDOW$2;
  const proto = globalObject[target] && globalObject[target].prototype;
  if (!proto || !proto.hasOwnProperty || !proto.hasOwnProperty("addEventListener")) {
    return;
  }
  fill(proto, "addEventListener", function(original) {
    return function(eventName, fn, options) {
      try {
        if (typeof fn.handleEvent === "function") {
          fn.handleEvent = wrap(fn.handleEvent, {
            mechanism: {
              data: {
                function: "handleEvent",
                handler: getFunctionName(fn),
                target
              },
              handled: false,
              type: "instrument"
            }
          });
        }
      } catch (err) {
      }
      return original.apply(this, [
        eventName,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        wrap(fn, {
          mechanism: {
            data: {
              function: "addEventListener",
              handler: getFunctionName(fn),
              target
            },
            handled: false,
            type: "instrument"
          }
        }),
        options
      ]);
    };
  });
  fill(
    proto,
    "removeEventListener",
    function(originalRemoveEventListener) {
      return function(eventName, fn, options) {
        const wrappedEventHandler = fn;
        try {
          const originalEventHandler = wrappedEventHandler && wrappedEventHandler.__sentry_wrapped__;
          if (originalEventHandler) {
            originalRemoveEventListener.call(this, eventName, originalEventHandler, options);
          }
        } catch (e2) {
        }
        return originalRemoveEventListener.call(this, eventName, wrappedEventHandler, options);
      };
    }
  );
}
const MAX_ALLOWED_STRING_LENGTH = 1024;
class Breadcrumbs {
  /**
   * @inheritDoc
   */
  static __initStatic() {
    this.id = "Breadcrumbs";
  }
  /**
   * @inheritDoc
   */
  /**
   * Options of the breadcrumbs integration.
   */
  // This field is public, because we use it in the browser client to check if the `sentry` option is enabled.
  /**
   * @inheritDoc
   */
  constructor(options) {
    this.name = Breadcrumbs.id;
    this.options = {
      console: true,
      dom: true,
      fetch: true,
      history: true,
      sentry: true,
      xhr: true,
      ...options
    };
  }
  /**
   * Instrument browser built-ins w/ breadcrumb capturing
   *  - Console API
   *  - DOM API (click/typing)
   *  - XMLHttpRequest API
   *  - Fetch API
   *  - History API
   */
  setupOnce() {
    if (this.options.console) {
      addInstrumentationHandler("console", _consoleBreadcrumb);
    }
    if (this.options.dom) {
      addInstrumentationHandler("dom", _domBreadcrumb(this.options.dom));
    }
    if (this.options.xhr) {
      addInstrumentationHandler("xhr", _xhrBreadcrumb);
    }
    if (this.options.fetch) {
      addInstrumentationHandler("fetch", _fetchBreadcrumb);
    }
    if (this.options.history) {
      addInstrumentationHandler("history", _historyBreadcrumb);
    }
    if (this.options.sentry) {
      const client = getCurrentHub().getClient();
      client && client.on && client.on("beforeSendEvent", addSentryBreadcrumb);
    }
  }
}
Breadcrumbs.__initStatic();
function addSentryBreadcrumb(event) {
  getCurrentHub().addBreadcrumb(
    {
      category: `sentry.${event.type === "transaction" ? "transaction" : "event"}`,
      event_id: event.event_id,
      level: event.level,
      message: getEventDescription(event)
    },
    {
      event
    }
  );
}
function _domBreadcrumb(dom) {
  function _innerDomBreadcrumb(handlerData) {
    let target;
    let keyAttrs = typeof dom === "object" ? dom.serializeAttribute : void 0;
    let maxStringLength = typeof dom === "object" && typeof dom.maxStringLength === "number" ? dom.maxStringLength : void 0;
    if (maxStringLength && maxStringLength > MAX_ALLOWED_STRING_LENGTH) {
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.warn(
        `\`dom.maxStringLength\` cannot exceed ${MAX_ALLOWED_STRING_LENGTH}, but a value of ${maxStringLength} was configured. Sentry will use ${MAX_ALLOWED_STRING_LENGTH} instead.`
      );
      maxStringLength = MAX_ALLOWED_STRING_LENGTH;
    }
    if (typeof keyAttrs === "string") {
      keyAttrs = [keyAttrs];
    }
    try {
      const event = handlerData.event;
      target = _isEvent(event) ? htmlTreeAsString(event.target, { keyAttrs, maxStringLength }) : htmlTreeAsString(event, { keyAttrs, maxStringLength });
    } catch (e2) {
      target = "<unknown>";
    }
    if (target.length === 0) {
      return;
    }
    getCurrentHub().addBreadcrumb(
      {
        category: `ui.${handlerData.name}`,
        message: target
      },
      {
        event: handlerData.event,
        name: handlerData.name,
        global: handlerData.global
      }
    );
  }
  return _innerDomBreadcrumb;
}
function _consoleBreadcrumb(handlerData) {
  const breadcrumb = {
    category: "console",
    data: {
      arguments: handlerData.args,
      logger: "console"
    },
    level: severityLevelFromString(handlerData.level),
    message: safeJoin(handlerData.args, " ")
  };
  if (handlerData.level === "assert") {
    if (handlerData.args[0] === false) {
      breadcrumb.message = `Assertion failed: ${safeJoin(handlerData.args.slice(1), " ") || "console.assert"}`;
      breadcrumb.data.arguments = handlerData.args.slice(1);
    } else {
      return;
    }
  }
  getCurrentHub().addBreadcrumb(breadcrumb, {
    input: handlerData.args,
    level: handlerData.level
  });
}
function _xhrBreadcrumb(handlerData) {
  const { startTimestamp, endTimestamp } = handlerData;
  const sentryXhrData = handlerData.xhr[SENTRY_XHR_DATA_KEY];
  if (!startTimestamp || !endTimestamp || !sentryXhrData) {
    return;
  }
  const { method, url, status_code, body } = sentryXhrData;
  const data = {
    method,
    url,
    status_code
  };
  const hint = {
    xhr: handlerData.xhr,
    input: body,
    startTimestamp,
    endTimestamp
  };
  getCurrentHub().addBreadcrumb(
    {
      category: "xhr",
      data,
      type: "http"
    },
    hint
  );
}
function _fetchBreadcrumb(handlerData) {
  const { startTimestamp, endTimestamp } = handlerData;
  if (!endTimestamp) {
    return;
  }
  if (handlerData.fetchData.url.match(/sentry_key/) && handlerData.fetchData.method === "POST") {
    return;
  }
  if (handlerData.error) {
    const data = handlerData.fetchData;
    const hint = {
      data: handlerData.error,
      input: handlerData.args,
      startTimestamp,
      endTimestamp
    };
    getCurrentHub().addBreadcrumb(
      {
        category: "fetch",
        data,
        level: "error",
        type: "http"
      },
      hint
    );
  } else {
    const data = {
      ...handlerData.fetchData,
      status_code: handlerData.response && handlerData.response.status
    };
    const hint = {
      input: handlerData.args,
      response: handlerData.response,
      startTimestamp,
      endTimestamp
    };
    getCurrentHub().addBreadcrumb(
      {
        category: "fetch",
        data,
        type: "http"
      },
      hint
    );
  }
}
function _historyBreadcrumb(handlerData) {
  let from = handlerData.from;
  let to = handlerData.to;
  const parsedLoc = parseUrl(WINDOW$2.location.href);
  let parsedFrom = parseUrl(from);
  const parsedTo = parseUrl(to);
  if (!parsedFrom.path) {
    parsedFrom = parsedLoc;
  }
  if (parsedLoc.protocol === parsedTo.protocol && parsedLoc.host === parsedTo.host) {
    to = parsedTo.relative;
  }
  if (parsedLoc.protocol === parsedFrom.protocol && parsedLoc.host === parsedFrom.host) {
    from = parsedFrom.relative;
  }
  getCurrentHub().addBreadcrumb({
    category: "navigation",
    data: {
      from,
      to
    }
  });
}
function _isEvent(event) {
  return !!event && !!event.target;
}
const DEFAULT_KEY = "cause";
const DEFAULT_LIMIT = 5;
class LinkedErrors {
  /**
   * @inheritDoc
   */
  static __initStatic() {
    this.id = "LinkedErrors";
  }
  /**
   * @inheritDoc
   */
  /**
   * @inheritDoc
   */
  /**
   * @inheritDoc
   */
  /**
   * @inheritDoc
   */
  constructor(options = {}) {
    this.name = LinkedErrors.id;
    this._key = options.key || DEFAULT_KEY;
    this._limit = options.limit || DEFAULT_LIMIT;
  }
  /** @inheritdoc */
  setupOnce() {
  }
  /**
   * @inheritDoc
   */
  preprocessEvent(event, hint, client) {
    const options = client.getOptions();
    applyAggregateErrorsToEvent(
      exceptionFromError,
      options.stackParser,
      options.maxValueLength,
      this._key,
      this._limit,
      event,
      hint
    );
  }
}
LinkedErrors.__initStatic();
class HttpContext {
  /**
   * @inheritDoc
   */
  static __initStatic() {
    this.id = "HttpContext";
  }
  /**
   * @inheritDoc
   */
  constructor() {
    this.name = HttpContext.id;
  }
  /**
   * @inheritDoc
   */
  setupOnce() {
    addGlobalEventProcessor((event) => {
      if (getCurrentHub().getIntegration(HttpContext)) {
        if (!WINDOW$2.navigator && !WINDOW$2.location && !WINDOW$2.document) {
          return event;
        }
        const url = event.request && event.request.url || WINDOW$2.location && WINDOW$2.location.href;
        const { referrer } = WINDOW$2.document || {};
        const { userAgent } = WINDOW$2.navigator || {};
        const headers = {
          ...event.request && event.request.headers,
          ...referrer && { Referer: referrer },
          ...userAgent && { "User-Agent": userAgent }
        };
        const request = { ...event.request, ...url && { url }, headers };
        return { ...event, request };
      }
      return event;
    });
  }
}
HttpContext.__initStatic();
class Dedupe {
  /**
   * @inheritDoc
   */
  static __initStatic() {
    this.id = "Dedupe";
  }
  /**
   * @inheritDoc
   */
  /**
   * @inheritDoc
   */
  constructor() {
    this.name = Dedupe.id;
  }
  /**
   * @inheritDoc
   */
  setupOnce(addGlobalEventProcessor2, getCurrentHub2) {
    const eventProcessor = (currentEvent) => {
      if (currentEvent.type) {
        return currentEvent;
      }
      const self2 = getCurrentHub2().getIntegration(Dedupe);
      if (self2) {
        try {
          if (_shouldDropEvent(currentEvent, self2._previousEvent)) {
            (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.warn("Event dropped due to being a duplicate of previously captured event.");
            return null;
          }
        } catch (_oO) {
          return self2._previousEvent = currentEvent;
        }
        return self2._previousEvent = currentEvent;
      }
      return currentEvent;
    };
    eventProcessor.id = this.name;
    addGlobalEventProcessor2(eventProcessor);
  }
}
Dedupe.__initStatic();
function _shouldDropEvent(currentEvent, previousEvent) {
  if (!previousEvent) {
    return false;
  }
  if (_isSameMessageEvent(currentEvent, previousEvent)) {
    return true;
  }
  if (_isSameExceptionEvent(currentEvent, previousEvent)) {
    return true;
  }
  return false;
}
function _isSameMessageEvent(currentEvent, previousEvent) {
  const currentMessage = currentEvent.message;
  const previousMessage = previousEvent.message;
  if (!currentMessage && !previousMessage) {
    return false;
  }
  if (currentMessage && !previousMessage || !currentMessage && previousMessage) {
    return false;
  }
  if (currentMessage !== previousMessage) {
    return false;
  }
  if (!_isSameFingerprint(currentEvent, previousEvent)) {
    return false;
  }
  if (!_isSameStacktrace(currentEvent, previousEvent)) {
    return false;
  }
  return true;
}
function _isSameExceptionEvent(currentEvent, previousEvent) {
  const previousException = _getExceptionFromEvent(previousEvent);
  const currentException = _getExceptionFromEvent(currentEvent);
  if (!previousException || !currentException) {
    return false;
  }
  if (previousException.type !== currentException.type || previousException.value !== currentException.value) {
    return false;
  }
  if (!_isSameFingerprint(currentEvent, previousEvent)) {
    return false;
  }
  if (!_isSameStacktrace(currentEvent, previousEvent)) {
    return false;
  }
  return true;
}
function _isSameStacktrace(currentEvent, previousEvent) {
  let currentFrames = _getFramesFromEvent(currentEvent);
  let previousFrames = _getFramesFromEvent(previousEvent);
  if (!currentFrames && !previousFrames) {
    return true;
  }
  if (currentFrames && !previousFrames || !currentFrames && previousFrames) {
    return false;
  }
  currentFrames = currentFrames;
  previousFrames = previousFrames;
  if (previousFrames.length !== currentFrames.length) {
    return false;
  }
  for (let i = 0; i < previousFrames.length; i++) {
    const frameA = previousFrames[i];
    const frameB = currentFrames[i];
    if (frameA.filename !== frameB.filename || frameA.lineno !== frameB.lineno || frameA.colno !== frameB.colno || frameA.function !== frameB.function) {
      return false;
    }
  }
  return true;
}
function _isSameFingerprint(currentEvent, previousEvent) {
  let currentFingerprint = currentEvent.fingerprint;
  let previousFingerprint = previousEvent.fingerprint;
  if (!currentFingerprint && !previousFingerprint) {
    return true;
  }
  if (currentFingerprint && !previousFingerprint || !currentFingerprint && previousFingerprint) {
    return false;
  }
  currentFingerprint = currentFingerprint;
  previousFingerprint = previousFingerprint;
  try {
    return !!(currentFingerprint.join("") === previousFingerprint.join(""));
  } catch (_oO) {
    return false;
  }
}
function _getExceptionFromEvent(event) {
  return event.exception && event.exception.values && event.exception.values[0];
}
function _getFramesFromEvent(event) {
  const exception = event.exception;
  if (exception) {
    try {
      return exception.values[0].stacktrace.frames;
    } catch (_oO) {
      return void 0;
    }
  }
  return void 0;
}
const defaultIntegrations = [
  new InboundFilters(),
  new FunctionToString(),
  new TryCatch(),
  new Breadcrumbs(),
  new GlobalHandlers(),
  new LinkedErrors(),
  new Dedupe(),
  new HttpContext()
];
function init$1(options = {}) {
  if (options.defaultIntegrations === void 0) {
    options.defaultIntegrations = defaultIntegrations;
  }
  if (options.release === void 0) {
    if (typeof __SENTRY_RELEASE__ === "string") {
      options.release = __SENTRY_RELEASE__;
    }
    if (WINDOW$2.SENTRY_RELEASE && WINDOW$2.SENTRY_RELEASE.id) {
      options.release = WINDOW$2.SENTRY_RELEASE.id;
    }
  }
  if (options.autoSessionTracking === void 0) {
    options.autoSessionTracking = true;
  }
  if (options.sendClientReports === void 0) {
    options.sendClientReports = true;
  }
  const clientOptions = {
    ...options,
    stackParser: stackParserFromStackParserOptions(options.stackParser || defaultStackParser),
    integrations: getIntegrationsToSetup(options),
    transport: options.transport || (supportsFetch() ? makeFetchTransport : makeXHRTransport)
  };
  initAndBind(BrowserClient, clientOptions);
  if (options.autoSessionTracking) {
    startSessionTracking();
  }
}
function startSessionOnHub(hub) {
  hub.startSession({ ignoreDuration: true });
  hub.captureSession();
}
function startSessionTracking() {
  if (typeof WINDOW$2.document === "undefined") {
    (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.warn("Session tracking in non-browser environment with @sentry/browser is not supported.");
    return;
  }
  const hub = getCurrentHub();
  if (!hub.captureSession) {
    return;
  }
  startSessionOnHub(hub);
  addInstrumentationHandler("history", ({ from, to }) => {
    if (!(from === void 0 || from === to)) {
      startSessionOnHub(getCurrentHub());
    }
  });
}
const WINDOW$1 = GLOBAL_OBJ;
const REPLAY_SESSION_KEY = "sentryReplaySession";
const REPLAY_EVENT_NAME = "replay_event";
const UNABLE_TO_SEND_REPLAY = "Unable to send Replay";
const SESSION_IDLE_PAUSE_DURATION = 3e5;
const SESSION_IDLE_EXPIRE_DURATION = 9e5;
const DEFAULT_FLUSH_MIN_DELAY = 5e3;
const DEFAULT_FLUSH_MAX_DELAY = 5500;
const BUFFER_CHECKOUT_TIME = 6e4;
const RETRY_BASE_INTERVAL = 5e3;
const RETRY_MAX_COUNT = 3;
const NETWORK_BODY_MAX_SIZE = 15e4;
const CONSOLE_ARG_MAX_SIZE = 5e3;
const SLOW_CLICK_THRESHOLD = 3e3;
const SLOW_CLICK_SCROLL_TIMEOUT = 300;
const REPLAY_MAX_EVENT_BUFFER_SIZE = 2e7;
const MIN_REPLAY_DURATION = 4999;
const MIN_REPLAY_DURATION_LIMIT = 15e3;
const MAX_REPLAY_DURATION = 36e5;
var NodeType$1;
(function(NodeType2) {
  NodeType2[NodeType2["Document"] = 0] = "Document";
  NodeType2[NodeType2["DocumentType"] = 1] = "DocumentType";
  NodeType2[NodeType2["Element"] = 2] = "Element";
  NodeType2[NodeType2["Text"] = 3] = "Text";
  NodeType2[NodeType2["CDATA"] = 4] = "CDATA";
  NodeType2[NodeType2["Comment"] = 5] = "Comment";
})(NodeType$1 || (NodeType$1 = {}));
function isElement(n) {
  return n.nodeType === n.ELEMENT_NODE;
}
function isShadowRoot(n) {
  const host = n === null || n === void 0 ? void 0 : n.host;
  return Boolean(host && host.shadowRoot && host.shadowRoot === n);
}
function isInputTypeMasked({ maskInputOptions, tagName, type }) {
  if (tagName.toLowerCase() === "option") {
    tagName = "select";
  }
  const actualType = typeof type === "string" ? type.toLowerCase() : void 0;
  return maskInputOptions[tagName.toLowerCase()] || actualType && maskInputOptions[actualType] || actualType === "password" || tagName === "input" && !type && maskInputOptions["text"];
}
function hasInputMaskOptions({ tagName, type, maskInputOptions, maskInputSelector }) {
  return maskInputSelector || isInputTypeMasked({ maskInputOptions, tagName, type });
}
function maskInputValue({ input, maskInputSelector, unmaskInputSelector, maskInputOptions, tagName, type, value, maskInputFn }) {
  let text2 = value || "";
  if (unmaskInputSelector && input.matches(unmaskInputSelector)) {
    return text2;
  }
  if (input.hasAttribute("data-rr-is-password")) {
    type = "password";
  }
  if (isInputTypeMasked({ maskInputOptions, tagName, type }) || maskInputSelector && input.matches(maskInputSelector)) {
    if (maskInputFn) {
      text2 = maskInputFn(text2);
    } else {
      text2 = "*".repeat(text2.length);
    }
  }
  return text2;
}
const ORIGINAL_ATTRIBUTE_NAME = "__rrweb_original__";
function is2DCanvasBlank(canvas) {
  const ctx = canvas.getContext("2d");
  if (!ctx)
    return true;
  const chunkSize = 50;
  for (let x = 0; x < canvas.width; x += chunkSize) {
    for (let y = 0; y < canvas.height; y += chunkSize) {
      const getImageData = ctx.getImageData;
      const originalGetImageData = ORIGINAL_ATTRIBUTE_NAME in getImageData ? getImageData[ORIGINAL_ATTRIBUTE_NAME] : getImageData;
      const pixelBuffer = new Uint32Array(originalGetImageData.call(ctx, x, y, Math.min(chunkSize, canvas.width - x), Math.min(chunkSize, canvas.height - y)).data.buffer);
      if (pixelBuffer.some((pixel) => pixel !== 0))
        return false;
    }
  }
  return true;
}
function getInputType(element2) {
  const type = element2.type;
  return element2.hasAttribute("data-rr-is-password") ? "password" : type ? type.toLowerCase() : null;
}
function getInputValue(el, tagName, type) {
  typeof type === "string" ? type.toLowerCase() : "";
  if (tagName === "INPUT" && (type === "radio" || type === "checkbox")) {
    return el.getAttribute("value") || "";
  }
  return el.value;
}
let _id = 1;
const tagNameRegex = new RegExp("[^a-z0-9-_:]");
const IGNORED_NODE = -2;
function defaultMaskFn(str) {
  return str ? str.replace(/[\S]/g, "*") : "";
}
function genId() {
  return _id++;
}
function getValidTagName(element2) {
  if (element2 instanceof HTMLFormElement) {
    return "form";
  }
  const processedTagName = element2.tagName.toLowerCase().trim();
  if (tagNameRegex.test(processedTagName)) {
    return "div";
  }
  return processedTagName;
}
function getCssRulesString(s) {
  try {
    const rules = s.rules || s.cssRules;
    return rules ? Array.from(rules).map(getCssRuleString).join("") : null;
  } catch (error) {
    return null;
  }
}
function getCssRuleString(rule) {
  let cssStringified = rule.cssText;
  if (isCSSImportRule(rule)) {
    try {
      cssStringified = getCssRulesString(rule.styleSheet) || cssStringified;
    } catch (_a) {
    }
  }
  return validateStringifiedCssRule(cssStringified);
}
function validateStringifiedCssRule(cssStringified) {
  if (cssStringified.indexOf(":") > -1) {
    const regex = /(\[(?:[\w-]+)[^\\])(:(?:[\w-]+)\])/gm;
    return cssStringified.replace(regex, "$1\\$2");
  }
  return cssStringified;
}
function isCSSImportRule(rule) {
  return "styleSheet" in rule;
}
function stringifyStyleSheet(sheet) {
  return sheet.cssRules ? Array.from(sheet.cssRules).map((rule) => rule.cssText ? validateStringifiedCssRule(rule.cssText) : "").join("") : "";
}
function extractOrigin(url) {
  let origin = "";
  if (url.indexOf("//") > -1) {
    origin = url.split("/").slice(0, 3).join("/");
  } else {
    origin = url.split("/")[0];
  }
  origin = origin.split("?")[0];
  return origin;
}
let canvasService;
let canvasCtx;
const URL_IN_CSS_REF = /url\((?:(')([^']*)'|(")(.*?)"|([^)]*))\)/gm;
const RELATIVE_PATH = /^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\\|\/\/|#).*/;
const DATA_URI = /^(data:)([^,]*),(.*)/i;
function absoluteToStylesheet(cssText, href) {
  return (cssText || "").replace(URL_IN_CSS_REF, (origin, quote1, path1, quote2, path2, path3) => {
    const filePath = path1 || path2 || path3;
    const maybeQuote = quote1 || quote2 || "";
    if (!filePath) {
      return origin;
    }
    if (!RELATIVE_PATH.test(filePath)) {
      return `url(${maybeQuote}${filePath}${maybeQuote})`;
    }
    if (DATA_URI.test(filePath)) {
      return `url(${maybeQuote}${filePath}${maybeQuote})`;
    }
    if (filePath[0] === "/") {
      return `url(${maybeQuote}${extractOrigin(href) + filePath}${maybeQuote})`;
    }
    const stack = href.split("/");
    const parts = filePath.split("/");
    stack.pop();
    for (const part of parts) {
      if (part === ".") {
        continue;
      } else if (part === "..") {
        stack.pop();
      } else {
        stack.push(part);
      }
    }
    return `url(${maybeQuote}${stack.join("/")}${maybeQuote})`;
  });
}
const SRCSET_NOT_SPACES = /^[^ \t\n\r\u000c]+/;
const SRCSET_COMMAS_OR_SPACES = /^[, \t\n\r\u000c]+/;
function getAbsoluteSrcsetString(doc, attributeValue) {
  if (attributeValue.trim() === "") {
    return attributeValue;
  }
  let pos = 0;
  function collectCharacters(regEx) {
    let chars2;
    let match = regEx.exec(attributeValue.substring(pos));
    if (match) {
      chars2 = match[0];
      pos += chars2.length;
      return chars2;
    }
    return "";
  }
  let output = [];
  while (true) {
    collectCharacters(SRCSET_COMMAS_OR_SPACES);
    if (pos >= attributeValue.length) {
      break;
    }
    let url = collectCharacters(SRCSET_NOT_SPACES);
    if (url.slice(-1) === ",") {
      url = absoluteToDoc(doc, url.substring(0, url.length - 1));
      output.push(url);
    } else {
      let descriptorsStr = "";
      url = absoluteToDoc(doc, url);
      let inParens = false;
      while (true) {
        let c = attributeValue.charAt(pos);
        if (c === "") {
          output.push((url + descriptorsStr).trim());
          break;
        } else if (!inParens) {
          if (c === ",") {
            pos += 1;
            output.push((url + descriptorsStr).trim());
            break;
          } else if (c === "(") {
            inParens = true;
          }
        } else {
          if (c === ")") {
            inParens = false;
          }
        }
        descriptorsStr += c;
        pos += 1;
      }
    }
  }
  return output.join(", ");
}
function absoluteToDoc(doc, attributeValue) {
  if (!attributeValue || attributeValue.trim() === "") {
    return attributeValue;
  }
  const a = doc.createElement("a");
  a.href = attributeValue;
  return a.href;
}
function isSVGElement(el) {
  return Boolean(el.tagName === "svg" || el.ownerSVGElement);
}
function getHref() {
  const a = document.createElement("a");
  a.href = "";
  return a.href;
}
function transformAttribute(doc, element2, _tagName, _name, value, maskAllText, unmaskTextSelector, maskTextFn) {
  if (!value) {
    return value;
  }
  const name = _name.toLowerCase();
  const tagName = _tagName.toLowerCase();
  if (name === "src" || name === "href") {
    return absoluteToDoc(doc, value);
  } else if (name === "xlink:href" && value[0] !== "#") {
    return absoluteToDoc(doc, value);
  } else if (name === "background" && (tagName === "table" || tagName === "td" || tagName === "th")) {
    return absoluteToDoc(doc, value);
  } else if (name === "srcset") {
    return getAbsoluteSrcsetString(doc, value);
  } else if (name === "style") {
    return absoluteToStylesheet(value, getHref());
  } else if (tagName === "object" && name === "data") {
    return absoluteToDoc(doc, value);
  } else if (maskAllText && _shouldMaskAttribute(element2, name, tagName, unmaskTextSelector)) {
    return maskTextFn ? maskTextFn(value) : defaultMaskFn(value);
  }
  return value;
}
function _shouldMaskAttribute(element2, attribute, tagName, unmaskTextSelector) {
  if (unmaskTextSelector && element2.matches(unmaskTextSelector)) {
    return false;
  }
  return ["placeholder", "title", "aria-label"].indexOf(attribute) > -1 || tagName === "input" && attribute === "value" && element2.hasAttribute("type") && ["submit", "button"].indexOf(element2.getAttribute("type").toLowerCase()) > -1;
}
function _isBlockedElement(element2, blockClass, blockSelector, unblockSelector) {
  if (unblockSelector && element2.matches(unblockSelector)) {
    return false;
  }
  if (typeof blockClass === "string") {
    if (element2.classList.contains(blockClass)) {
      return true;
    }
  } else {
    for (let eIndex = 0; eIndex < element2.classList.length; eIndex++) {
      const className = element2.classList[eIndex];
      if (blockClass.test(className)) {
        return true;
      }
    }
  }
  if (blockSelector) {
    return element2.matches(blockSelector);
  }
  return false;
}
function needMaskingText(node, maskTextClass, maskTextSelector, unmaskTextSelector, maskAllText) {
  if (!node) {
    return false;
  }
  if (node.nodeType !== node.ELEMENT_NODE) {
    return needMaskingText(node.parentNode, maskTextClass, maskTextSelector, unmaskTextSelector, maskAllText);
  }
  if (unmaskTextSelector) {
    if (node.matches(unmaskTextSelector) || node.closest(unmaskTextSelector)) {
      return false;
    }
  }
  if (maskAllText) {
    return true;
  }
  if (typeof maskTextClass === "string") {
    if (node.classList.contains(maskTextClass)) {
      return true;
    }
  } else {
    for (let eIndex = 0; eIndex < node.classList.length; eIndex++) {
      const className = node.classList[eIndex];
      if (maskTextClass.test(className)) {
        return true;
      }
    }
  }
  if (maskTextSelector) {
    if (node.matches(maskTextSelector)) {
      return true;
    }
  }
  return needMaskingText(node.parentNode, maskTextClass, maskTextSelector, unmaskTextSelector, maskAllText);
}
function onceIframeLoaded(iframeEl, listener, iframeLoadTimeout) {
  const win = iframeEl.contentWindow;
  if (!win) {
    return;
  }
  let fired = false;
  let readyState;
  try {
    readyState = win.document.readyState;
  } catch (error) {
    return;
  }
  if (readyState !== "complete") {
    const timer = setTimeout(() => {
      if (!fired) {
        listener();
        fired = true;
      }
    }, iframeLoadTimeout);
    iframeEl.addEventListener("load", () => {
      clearTimeout(timer);
      fired = true;
      listener();
    });
    return;
  }
  const blankUrl = "about:blank";
  if (win.location.href !== blankUrl || iframeEl.src === blankUrl || iframeEl.src === "") {
    setTimeout(listener, 0);
    return;
  }
  iframeEl.addEventListener("load", listener);
}
function serializeNode(n, options) {
  var _a;
  const { doc, blockClass, blockSelector, unblockSelector, maskTextClass, maskTextSelector, unmaskTextSelector, inlineStylesheet, maskInputSelector, unmaskInputSelector, maskAllText, maskInputOptions = {}, maskTextFn, maskInputFn, dataURLOptions = {}, inlineImages, recordCanvas, keepIframeSrcFn } = options;
  let rootId;
  if (doc.__sn) {
    const docId = doc.__sn.id;
    rootId = docId === 1 ? void 0 : docId;
  }
  switch (n.nodeType) {
    case n.DOCUMENT_NODE:
      if (n.compatMode !== "CSS1Compat") {
        return {
          type: NodeType$1.Document,
          childNodes: [],
          compatMode: n.compatMode,
          rootId
        };
      } else {
        return {
          type: NodeType$1.Document,
          childNodes: [],
          rootId
        };
      }
    case n.DOCUMENT_TYPE_NODE:
      return {
        type: NodeType$1.DocumentType,
        name: n.name,
        publicId: n.publicId,
        systemId: n.systemId,
        rootId
      };
    case n.ELEMENT_NODE:
      const needBlock = _isBlockedElement(n, blockClass, blockSelector, unblockSelector);
      const tagName = getValidTagName(n);
      let attributes = {};
      for (const { name, value } of Array.from(n.attributes)) {
        if (!skipAttribute(tagName, name)) {
          attributes[name] = transformAttribute(doc, n, tagName, name, value, maskAllText, unmaskTextSelector, maskTextFn);
        }
      }
      if (tagName === "link" && inlineStylesheet) {
        const stylesheet = Array.from(doc.styleSheets).find((s) => {
          return s.href === n.href;
        });
        let cssText = null;
        if (stylesheet) {
          cssText = getCssRulesString(stylesheet);
        }
        if (cssText) {
          delete attributes.rel;
          delete attributes.href;
          attributes._cssText = absoluteToStylesheet(cssText, stylesheet.href);
        }
      }
      if (tagName === "style" && n.sheet && !(n.innerText || n.textContent || "").trim().length) {
        const cssText = getCssRulesString(n.sheet);
        if (cssText) {
          attributes._cssText = absoluteToStylesheet(cssText, getHref());
        }
      }
      if (tagName === "input" || tagName === "textarea" || tagName === "select" || tagName === "option") {
        const el = n;
        const type = getInputType(el);
        const value = getInputValue(el, tagName.toUpperCase(), type);
        const checked = n.checked;
        if (type !== "submit" && type !== "button" && value) {
          attributes.value = maskInputValue({
            input: el,
            type,
            tagName,
            value,
            maskInputSelector,
            unmaskInputSelector,
            maskInputOptions,
            maskInputFn
          });
        }
        if (checked) {
          attributes.checked = checked;
        }
      }
      if (tagName === "option") {
        if (n.selected && !maskInputOptions["select"]) {
          attributes.selected = true;
        } else {
          delete attributes.selected;
        }
      }
      if (tagName === "canvas" && recordCanvas) {
        if (n.__context === "2d") {
          if (!is2DCanvasBlank(n)) {
            attributes.rr_dataURL = n.toDataURL(dataURLOptions.type, dataURLOptions.quality);
          }
        } else if (!("__context" in n)) {
          const canvasDataURL = n.toDataURL(dataURLOptions.type, dataURLOptions.quality);
          const blankCanvas = document.createElement("canvas");
          blankCanvas.width = n.width;
          blankCanvas.height = n.height;
          const blankCanvasDataURL = blankCanvas.toDataURL(dataURLOptions.type, dataURLOptions.quality);
          if (canvasDataURL !== blankCanvasDataURL) {
            attributes.rr_dataURL = canvasDataURL;
          }
        }
      }
      if (tagName === "img" && inlineImages) {
        if (!canvasService) {
          canvasService = doc.createElement("canvas");
          canvasCtx = canvasService.getContext("2d");
        }
        const image = n;
        const oldValue = image.crossOrigin;
        image.crossOrigin = "anonymous";
        const recordInlineImage = () => {
          try {
            canvasService.width = image.naturalWidth;
            canvasService.height = image.naturalHeight;
            canvasCtx.drawImage(image, 0, 0);
            attributes.rr_dataURL = canvasService.toDataURL(dataURLOptions.type, dataURLOptions.quality);
          } catch (err) {
            console.warn(`Cannot inline img src=${image.currentSrc}! Error: ${err}`);
          }
          oldValue ? attributes.crossOrigin = oldValue : delete attributes.crossOrigin;
        };
        if (image.complete && image.naturalWidth !== 0)
          recordInlineImage();
        else
          image.onload = recordInlineImage;
      }
      if (tagName === "audio" || tagName === "video") {
        attributes.rr_mediaState = n.paused ? "paused" : "played";
        attributes.rr_mediaCurrentTime = n.currentTime;
      }
      if (n.scrollLeft) {
        attributes.rr_scrollLeft = n.scrollLeft;
      }
      if (n.scrollTop) {
        attributes.rr_scrollTop = n.scrollTop;
      }
      if (needBlock) {
        const { width, height } = n.getBoundingClientRect();
        attributes = {
          class: attributes.class,
          rr_width: `${width}px`,
          rr_height: `${height}px`
        };
      }
      if (tagName === "iframe" && !keepIframeSrcFn(attributes.src)) {
        if (!n.contentDocument) {
          attributes.rr_src = attributes.src;
        }
        delete attributes.src;
      }
      return {
        type: NodeType$1.Element,
        tagName,
        attributes,
        childNodes: [],
        isSVG: isSVGElement(n) || void 0,
        needBlock,
        rootId
      };
    case n.TEXT_NODE:
      const parentTagName = n.parentNode && n.parentNode.tagName;
      let textContent = n.textContent;
      const isStyle = parentTagName === "STYLE" ? true : void 0;
      const isScript = parentTagName === "SCRIPT" ? true : void 0;
      if (isStyle && textContent) {
        try {
          if (n.nextSibling || n.previousSibling) {
          } else if ((_a = n.parentNode.sheet) === null || _a === void 0 ? void 0 : _a.cssRules) {
            textContent = stringifyStyleSheet(n.parentNode.sheet);
          }
        } catch (err) {
          console.warn(`Cannot get CSS styles from text's parentNode. Error: ${err}`, n);
        }
        textContent = absoluteToStylesheet(textContent, getHref());
      }
      if (isScript) {
        textContent = "SCRIPT_PLACEHOLDER";
      }
      if (parentTagName === "TEXTAREA" && textContent) {
        textContent = "";
      } else if (parentTagName === "OPTION" && textContent) {
        const option = n.parentNode;
        textContent = maskInputValue({
          input: option,
          type: null,
          tagName: parentTagName,
          value: textContent,
          maskInputSelector,
          unmaskInputSelector,
          maskInputOptions,
          maskInputFn
        });
      } else if (!isStyle && !isScript && needMaskingText(n, maskTextClass, maskTextSelector, unmaskTextSelector, maskAllText) && textContent) {
        textContent = maskTextFn ? maskTextFn(textContent) : defaultMaskFn(textContent);
      }
      return {
        type: NodeType$1.Text,
        textContent: textContent || "",
        isStyle,
        rootId
      };
    case n.CDATA_SECTION_NODE:
      return {
        type: NodeType$1.CDATA,
        textContent: "",
        rootId
      };
    case n.COMMENT_NODE:
      return {
        type: NodeType$1.Comment,
        textContent: n.textContent || "",
        rootId
      };
    default:
      return false;
  }
}
function lowerIfExists(maybeAttr) {
  if (maybeAttr === void 0 || maybeAttr === null) {
    return "";
  } else {
    return maybeAttr.toLowerCase();
  }
}
function slimDOMExcluded(sn, slimDOMOptions) {
  if (slimDOMOptions.comment && sn.type === NodeType$1.Comment) {
    return true;
  } else if (sn.type === NodeType$1.Element) {
    if (slimDOMOptions.script && (sn.tagName === "script" || sn.tagName === "link" && (sn.attributes.rel === "preload" || sn.attributes.rel === "modulepreload") && sn.attributes.as === "script" || sn.tagName === "link" && sn.attributes.rel === "prefetch" && typeof sn.attributes.href === "string" && sn.attributes.href.endsWith(".js"))) {
      return true;
    } else if (slimDOMOptions.headFavicon && (sn.tagName === "link" && sn.attributes.rel === "shortcut icon" || sn.tagName === "meta" && (lowerIfExists(sn.attributes.name).match(/^msapplication-tile(image|color)$/) || lowerIfExists(sn.attributes.name) === "application-name" || lowerIfExists(sn.attributes.rel) === "icon" || lowerIfExists(sn.attributes.rel) === "apple-touch-icon" || lowerIfExists(sn.attributes.rel) === "shortcut icon"))) {
      return true;
    } else if (sn.tagName === "meta") {
      if (slimDOMOptions.headMetaDescKeywords && lowerIfExists(sn.attributes.name).match(/^description|keywords$/)) {
        return true;
      } else if (slimDOMOptions.headMetaSocial && (lowerIfExists(sn.attributes.property).match(/^(og|twitter|fb):/) || lowerIfExists(sn.attributes.name).match(/^(og|twitter):/) || lowerIfExists(sn.attributes.name) === "pinterest")) {
        return true;
      } else if (slimDOMOptions.headMetaRobots && (lowerIfExists(sn.attributes.name) === "robots" || lowerIfExists(sn.attributes.name) === "googlebot" || lowerIfExists(sn.attributes.name) === "bingbot")) {
        return true;
      } else if (slimDOMOptions.headMetaHttpEquiv && sn.attributes["http-equiv"] !== void 0) {
        return true;
      } else if (slimDOMOptions.headMetaAuthorship && (lowerIfExists(sn.attributes.name) === "author" || lowerIfExists(sn.attributes.name) === "generator" || lowerIfExists(sn.attributes.name) === "framework" || lowerIfExists(sn.attributes.name) === "publisher" || lowerIfExists(sn.attributes.name) === "progid" || lowerIfExists(sn.attributes.property).match(/^article:/) || lowerIfExists(sn.attributes.property).match(/^product:/))) {
        return true;
      } else if (slimDOMOptions.headMetaVerification && (lowerIfExists(sn.attributes.name) === "google-site-verification" || lowerIfExists(sn.attributes.name) === "yandex-verification" || lowerIfExists(sn.attributes.name) === "csrf-token" || lowerIfExists(sn.attributes.name) === "p:domain_verify" || lowerIfExists(sn.attributes.name) === "verify-v1" || lowerIfExists(sn.attributes.name) === "verification" || lowerIfExists(sn.attributes.name) === "shopify-checkout-api-token")) {
        return true;
      }
    }
  }
  return false;
}
function serializeNodeWithId(n, options) {
  const { doc, map, blockClass, blockSelector, unblockSelector, maskTextClass, maskTextSelector, unmaskTextSelector, skipChild = false, inlineStylesheet = true, maskInputSelector, unmaskInputSelector, maskAllText, maskInputOptions = {}, maskTextFn, maskInputFn, slimDOMOptions, dataURLOptions = {}, inlineImages = false, recordCanvas = false, onSerialize, onIframeLoad, iframeLoadTimeout = 5e3, keepIframeSrcFn = () => false } = options;
  let { preserveWhiteSpace = true } = options;
  const _serializedNode = serializeNode(n, {
    doc,
    blockClass,
    blockSelector,
    unblockSelector,
    maskTextClass,
    maskTextSelector,
    unmaskTextSelector,
    inlineStylesheet,
    maskInputSelector,
    unmaskInputSelector,
    maskAllText,
    maskInputOptions,
    maskTextFn,
    maskInputFn,
    dataURLOptions,
    inlineImages,
    recordCanvas,
    keepIframeSrcFn
  });
  if (!_serializedNode) {
    console.warn(n, "not serialized");
    return null;
  }
  let id;
  if ("__sn" in n) {
    id = n.__sn.id;
  } else if (slimDOMExcluded(_serializedNode, slimDOMOptions) || !preserveWhiteSpace && _serializedNode.type === NodeType$1.Text && !_serializedNode.isStyle && !_serializedNode.textContent.replace(/^\s+|\s+$/gm, "").length) {
    id = IGNORED_NODE;
  } else {
    id = genId();
  }
  const serializedNode = Object.assign(_serializedNode, { id });
  n.__sn = serializedNode;
  if (id === IGNORED_NODE) {
    return null;
  }
  map[id] = n;
  if (onSerialize) {
    onSerialize(n);
  }
  let recordChild = !skipChild;
  if (serializedNode.type === NodeType$1.Element) {
    recordChild = recordChild && !serializedNode.needBlock;
    delete serializedNode.needBlock;
    if (n.shadowRoot)
      serializedNode.isShadowHost = true;
  }
  if ((serializedNode.type === NodeType$1.Document || serializedNode.type === NodeType$1.Element) && recordChild) {
    if (slimDOMOptions.headWhitespace && _serializedNode.type === NodeType$1.Element && _serializedNode.tagName === "head") {
      preserveWhiteSpace = false;
    }
    const bypassOptions = {
      doc,
      map,
      blockClass,
      blockSelector,
      unblockSelector,
      maskTextClass,
      maskTextSelector,
      unmaskTextSelector,
      skipChild,
      inlineStylesheet,
      maskInputSelector,
      unmaskInputSelector,
      maskAllText,
      maskInputOptions,
      maskTextFn,
      maskInputFn,
      slimDOMOptions,
      dataURLOptions,
      inlineImages,
      recordCanvas,
      preserveWhiteSpace,
      onSerialize,
      onIframeLoad,
      iframeLoadTimeout,
      keepIframeSrcFn
    };
    for (const childN of Array.from(n.childNodes)) {
      const serializedChildNode = serializeNodeWithId(childN, bypassOptions);
      if (serializedChildNode) {
        serializedNode.childNodes.push(serializedChildNode);
      }
    }
    if (isElement(n) && n.shadowRoot) {
      for (const childN of Array.from(n.shadowRoot.childNodes)) {
        const serializedChildNode = serializeNodeWithId(childN, bypassOptions);
        if (serializedChildNode) {
          serializedChildNode.isShadow = true;
          serializedNode.childNodes.push(serializedChildNode);
        }
      }
    }
  }
  if (n.parentNode && isShadowRoot(n.parentNode)) {
    serializedNode.isShadow = true;
  }
  if (serializedNode.type === NodeType$1.Element && serializedNode.tagName === "iframe") {
    onceIframeLoaded(n, () => {
      const iframeDoc = n.contentDocument;
      if (iframeDoc && onIframeLoad) {
        const serializedIframeNode = serializeNodeWithId(iframeDoc, {
          doc: iframeDoc,
          map,
          blockClass,
          blockSelector,
          unblockSelector,
          maskTextClass,
          maskTextSelector,
          unmaskTextSelector,
          skipChild: false,
          inlineStylesheet,
          maskInputSelector,
          unmaskInputSelector,
          maskAllText,
          maskInputOptions,
          maskTextFn,
          maskInputFn,
          slimDOMOptions,
          dataURLOptions,
          inlineImages,
          recordCanvas,
          preserveWhiteSpace,
          onSerialize,
          onIframeLoad,
          iframeLoadTimeout,
          keepIframeSrcFn
        });
        if (serializedIframeNode) {
          onIframeLoad(n, serializedIframeNode);
        }
      }
    }, iframeLoadTimeout);
  }
  return serializedNode;
}
function snapshot(n, options) {
  const { blockClass = "rr-block", blockSelector = null, unblockSelector = null, maskTextClass = "rr-mask", maskTextSelector = null, unmaskTextSelector = null, inlineStylesheet = true, inlineImages = false, recordCanvas = false, maskInputSelector = null, unmaskInputSelector = null, maskAllText = false, maskAllInputs = false, maskTextFn, maskInputFn, slimDOM = false, dataURLOptions, preserveWhiteSpace, onSerialize, onIframeLoad, iframeLoadTimeout, keepIframeSrcFn = () => false } = options || {};
  const idNodeMap = {};
  const maskInputOptions = maskAllInputs === true ? {
    color: true,
    date: true,
    "datetime-local": true,
    email: true,
    month: true,
    number: true,
    range: true,
    search: true,
    tel: true,
    text: true,
    time: true,
    url: true,
    week: true,
    textarea: true,
    select: true
  } : maskAllInputs === false ? {} : maskAllInputs;
  const slimDOMOptions = slimDOM === true || slimDOM === "all" ? {
    script: true,
    comment: true,
    headFavicon: true,
    headWhitespace: true,
    headMetaDescKeywords: slimDOM === "all",
    headMetaSocial: true,
    headMetaRobots: true,
    headMetaHttpEquiv: true,
    headMetaAuthorship: true,
    headMetaVerification: true
  } : slimDOM === false ? {} : slimDOM;
  return [
    serializeNodeWithId(n, {
      doc: n,
      map: idNodeMap,
      blockClass,
      blockSelector,
      unblockSelector,
      maskTextClass,
      maskTextSelector,
      unmaskTextSelector,
      skipChild: false,
      inlineStylesheet,
      maskInputSelector,
      unmaskInputSelector,
      maskAllText,
      maskInputOptions,
      maskTextFn,
      maskInputFn,
      slimDOMOptions,
      dataURLOptions,
      inlineImages,
      recordCanvas,
      preserveWhiteSpace,
      onSerialize,
      onIframeLoad,
      iframeLoadTimeout,
      keepIframeSrcFn
    }),
    idNodeMap
  ];
}
function skipAttribute(tagName, attributeName, value) {
  return (tagName === "video" || tagName === "audio") && attributeName === "autoplay";
}
var EventType;
(function(EventType2) {
  EventType2[EventType2["DomContentLoaded"] = 0] = "DomContentLoaded";
  EventType2[EventType2["Load"] = 1] = "Load";
  EventType2[EventType2["FullSnapshot"] = 2] = "FullSnapshot";
  EventType2[EventType2["IncrementalSnapshot"] = 3] = "IncrementalSnapshot";
  EventType2[EventType2["Meta"] = 4] = "Meta";
  EventType2[EventType2["Custom"] = 5] = "Custom";
  EventType2[EventType2["Plugin"] = 6] = "Plugin";
})(EventType || (EventType = {}));
var IncrementalSource;
(function(IncrementalSource2) {
  IncrementalSource2[IncrementalSource2["Mutation"] = 0] = "Mutation";
  IncrementalSource2[IncrementalSource2["MouseMove"] = 1] = "MouseMove";
  IncrementalSource2[IncrementalSource2["MouseInteraction"] = 2] = "MouseInteraction";
  IncrementalSource2[IncrementalSource2["Scroll"] = 3] = "Scroll";
  IncrementalSource2[IncrementalSource2["ViewportResize"] = 4] = "ViewportResize";
  IncrementalSource2[IncrementalSource2["Input"] = 5] = "Input";
  IncrementalSource2[IncrementalSource2["TouchMove"] = 6] = "TouchMove";
  IncrementalSource2[IncrementalSource2["MediaInteraction"] = 7] = "MediaInteraction";
  IncrementalSource2[IncrementalSource2["StyleSheetRule"] = 8] = "StyleSheetRule";
  IncrementalSource2[IncrementalSource2["CanvasMutation"] = 9] = "CanvasMutation";
  IncrementalSource2[IncrementalSource2["Font"] = 10] = "Font";
  IncrementalSource2[IncrementalSource2["Log"] = 11] = "Log";
  IncrementalSource2[IncrementalSource2["Drag"] = 12] = "Drag";
  IncrementalSource2[IncrementalSource2["StyleDeclaration"] = 13] = "StyleDeclaration";
})(IncrementalSource || (IncrementalSource = {}));
var MouseInteractions;
(function(MouseInteractions2) {
  MouseInteractions2[MouseInteractions2["MouseUp"] = 0] = "MouseUp";
  MouseInteractions2[MouseInteractions2["MouseDown"] = 1] = "MouseDown";
  MouseInteractions2[MouseInteractions2["Click"] = 2] = "Click";
  MouseInteractions2[MouseInteractions2["ContextMenu"] = 3] = "ContextMenu";
  MouseInteractions2[MouseInteractions2["DblClick"] = 4] = "DblClick";
  MouseInteractions2[MouseInteractions2["Focus"] = 5] = "Focus";
  MouseInteractions2[MouseInteractions2["Blur"] = 6] = "Blur";
  MouseInteractions2[MouseInteractions2["TouchStart"] = 7] = "TouchStart";
  MouseInteractions2[MouseInteractions2["TouchMove_Departed"] = 8] = "TouchMove_Departed";
  MouseInteractions2[MouseInteractions2["TouchEnd"] = 9] = "TouchEnd";
  MouseInteractions2[MouseInteractions2["TouchCancel"] = 10] = "TouchCancel";
})(MouseInteractions || (MouseInteractions = {}));
var CanvasContext;
(function(CanvasContext2) {
  CanvasContext2[CanvasContext2["2D"] = 0] = "2D";
  CanvasContext2[CanvasContext2["WebGL"] = 1] = "WebGL";
  CanvasContext2[CanvasContext2["WebGL2"] = 2] = "WebGL2";
})(CanvasContext || (CanvasContext = {}));
var MediaInteractions;
(function(MediaInteractions2) {
  MediaInteractions2[MediaInteractions2["Play"] = 0] = "Play";
  MediaInteractions2[MediaInteractions2["Pause"] = 1] = "Pause";
  MediaInteractions2[MediaInteractions2["Seeked"] = 2] = "Seeked";
  MediaInteractions2[MediaInteractions2["VolumeChange"] = 3] = "VolumeChange";
})(MediaInteractions || (MediaInteractions = {}));
var ReplayerEvents;
(function(ReplayerEvents2) {
  ReplayerEvents2["Start"] = "start";
  ReplayerEvents2["Pause"] = "pause";
  ReplayerEvents2["Resume"] = "resume";
  ReplayerEvents2["Resize"] = "resize";
  ReplayerEvents2["Finish"] = "finish";
  ReplayerEvents2["FullsnapshotRebuilded"] = "fullsnapshot-rebuilded";
  ReplayerEvents2["LoadStylesheetStart"] = "load-stylesheet-start";
  ReplayerEvents2["LoadStylesheetEnd"] = "load-stylesheet-end";
  ReplayerEvents2["SkipStart"] = "skip-start";
  ReplayerEvents2["SkipEnd"] = "skip-end";
  ReplayerEvents2["MouseInteraction"] = "mouse-interaction";
  ReplayerEvents2["EventCast"] = "event-cast";
  ReplayerEvents2["CustomEvent"] = "custom-event";
  ReplayerEvents2["Flush"] = "flush";
  ReplayerEvents2["StateChange"] = "state-change";
  ReplayerEvents2["PlayBack"] = "play-back";
})(ReplayerEvents || (ReplayerEvents = {}));
function on(type, fn, target = document) {
  const options = { capture: true, passive: true };
  target.addEventListener(type, fn, options);
  return () => target.removeEventListener(type, fn, options);
}
function createMirror() {
  return {
    map: {},
    getId(n) {
      if (!n || !n.__sn) {
        return -1;
      }
      return n.__sn.id;
    },
    getNode(id) {
      return this.map[id] || null;
    },
    removeNodeFromMap(n) {
      const id = n.__sn && n.__sn.id;
      delete this.map[id];
      if (n.childNodes) {
        n.childNodes.forEach((child) => this.removeNodeFromMap(child));
      }
    },
    has(id) {
      return this.map.hasOwnProperty(id);
    },
    reset() {
      this.map = {};
    }
  };
}
const DEPARTED_MIRROR_ACCESS_WARNING = "Please stop import mirror directly. Instead of that,\r\nnow you can use replayer.getMirror() to access the mirror instance of a replayer,\r\nor you can use record.mirror to access the mirror instance during recording.";
let _mirror = {
  map: {},
  getId() {
    console.error(DEPARTED_MIRROR_ACCESS_WARNING);
    return -1;
  },
  getNode() {
    console.error(DEPARTED_MIRROR_ACCESS_WARNING);
    return null;
  },
  removeNodeFromMap() {
    console.error(DEPARTED_MIRROR_ACCESS_WARNING);
  },
  has() {
    console.error(DEPARTED_MIRROR_ACCESS_WARNING);
    return false;
  },
  reset() {
    console.error(DEPARTED_MIRROR_ACCESS_WARNING);
  }
};
if (typeof window !== "undefined" && window.Proxy && window.Reflect) {
  _mirror = new Proxy(_mirror, {
    get(target, prop, receiver) {
      if (prop === "map") {
        console.error(DEPARTED_MIRROR_ACCESS_WARNING);
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
function throttle$1(func, wait, options = {}) {
  let timeout = null;
  let previous = 0;
  return function(arg) {
    let now = Date.now();
    if (!previous && options.leading === false) {
      previous = now;
    }
    let remaining = wait - (now - previous);
    let context = this;
    let args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(() => {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        func.apply(context, args);
      }, remaining);
    }
  };
}
function hookSetter(target, key, d, isRevoked, win = window) {
  const original = win.Object.getOwnPropertyDescriptor(target, key);
  win.Object.defineProperty(target, key, isRevoked ? d : {
    set(value) {
      setTimeout(() => {
        d.set.call(this, value);
      }, 0);
      if (original && original.set) {
        original.set.call(this, value);
      }
    }
  });
  return () => hookSetter(target, key, original || {}, true);
}
function patch(source, name, replacement) {
  try {
    if (!(name in source)) {
      return () => {
      };
    }
    const original = source[name];
    const wrapped = replacement(original);
    if (typeof wrapped === "function") {
      wrapped.prototype = wrapped.prototype || {};
      Object.defineProperties(wrapped, {
        __rrweb_original__: {
          enumerable: false,
          value: original
        }
      });
    }
    source[name] = wrapped;
    return () => {
      source[name] = original;
    };
  } catch (_a) {
    return () => {
    };
  }
}
function getWindowHeight() {
  return window.innerHeight || document.documentElement && document.documentElement.clientHeight || document.body && document.body.clientHeight;
}
function getWindowWidth() {
  return window.innerWidth || document.documentElement && document.documentElement.clientWidth || document.body && document.body.clientWidth;
}
function isBlocked(node, blockClass, blockSelector, unblockSelector) {
  if (!node) {
    return false;
  }
  if (node.nodeType === node.ELEMENT_NODE) {
    let needBlock = false;
    const needUnblock = unblockSelector && node.matches(unblockSelector);
    if (typeof blockClass === "string") {
      if (node.closest !== void 0) {
        needBlock = !needUnblock && node.closest("." + blockClass) !== null;
      } else {
        needBlock = !needUnblock && node.classList.contains(blockClass);
      }
    } else {
      !needUnblock && node.classList.forEach((className) => {
        if (blockClass.test(className)) {
          needBlock = true;
        }
      });
    }
    if (!needBlock && blockSelector) {
      needBlock = node.matches(blockSelector);
    }
    return !needUnblock && needBlock || isBlocked(node.parentNode, blockClass, blockSelector, unblockSelector);
  }
  if (node.nodeType === node.TEXT_NODE) {
    return isBlocked(node.parentNode, blockClass, blockSelector, unblockSelector);
  }
  return isBlocked(node.parentNode, blockClass, blockSelector, unblockSelector);
}
function isIgnored(n) {
  if ("__sn" in n) {
    return n.__sn.id === IGNORED_NODE;
  }
  return false;
}
function isAncestorRemoved(target, mirror2) {
  if (isShadowRoot(target)) {
    return false;
  }
  const id = mirror2.getId(target);
  if (!mirror2.has(id)) {
    return true;
  }
  if (target.parentNode && target.parentNode.nodeType === target.DOCUMENT_NODE) {
    return false;
  }
  if (!target.parentNode) {
    return true;
  }
  return isAncestorRemoved(target.parentNode, mirror2);
}
function isTouchEvent(event) {
  return Boolean(event.changedTouches);
}
function polyfill(win = window) {
  if ("NodeList" in win && !win.NodeList.prototype.forEach) {
    win.NodeList.prototype.forEach = Array.prototype.forEach;
  }
  if ("DOMTokenList" in win && !win.DOMTokenList.prototype.forEach) {
    win.DOMTokenList.prototype.forEach = Array.prototype.forEach;
  }
  if (!Node.prototype.contains) {
    Node.prototype.contains = function contains(node) {
      if (!(0 in arguments)) {
        throw new TypeError("1 argument is required");
      }
      do {
        if (this === node) {
          return true;
        }
      } while (node = node && node.parentNode);
      return false;
    };
  }
}
function isIframeINode(node) {
  if ("__sn" in node) {
    return node.__sn.type === NodeType$1.Element && node.__sn.tagName === "iframe";
  }
  return false;
}
function hasShadowRoot(n) {
  return Boolean(n === null || n === void 0 ? void 0 : n.shadowRoot);
}
function isNodeInLinkedList(n) {
  return "__ln" in n;
}
class DoubleLinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
  }
  get(position) {
    if (position >= this.length) {
      throw new Error("Position outside of list range");
    }
    let current = this.head;
    for (let index = 0; index < position; index++) {
      current = (current === null || current === void 0 ? void 0 : current.next) || null;
    }
    return current;
  }
  addNode(n) {
    const node = {
      value: n,
      previous: null,
      next: null
    };
    n.__ln = node;
    if (n.previousSibling && isNodeInLinkedList(n.previousSibling)) {
      const current = n.previousSibling.__ln.next;
      node.next = current;
      node.previous = n.previousSibling.__ln;
      n.previousSibling.__ln.next = node;
      if (current) {
        current.previous = node;
      }
    } else if (n.nextSibling && isNodeInLinkedList(n.nextSibling) && n.nextSibling.__ln.previous) {
      const current = n.nextSibling.__ln.previous;
      node.previous = current;
      node.next = n.nextSibling.__ln;
      n.nextSibling.__ln.previous = node;
      if (current) {
        current.next = node;
      }
    } else {
      if (this.head) {
        this.head.previous = node;
      }
      node.next = this.head;
      this.head = node;
    }
    this.length++;
  }
  removeNode(n) {
    const current = n.__ln;
    if (!this.head) {
      return;
    }
    if (!current.previous) {
      this.head = current.next;
      if (this.head) {
        this.head.previous = null;
      }
    } else {
      current.previous.next = current.next;
      if (current.next) {
        current.next.previous = current.previous;
      }
    }
    if (n.__ln) {
      delete n.__ln;
    }
    this.length--;
  }
}
const moveKey = (id, parentId) => `${id}@${parentId}`;
function isINode(n) {
  return "__sn" in n;
}
class MutationBuffer {
  constructor() {
    this.frozen = false;
    this.locked = false;
    this.texts = [];
    this.attributes = [];
    this.removes = [];
    this.mapRemoves = [];
    this.movedMap = {};
    this.addedSet = /* @__PURE__ */ new Set();
    this.movedSet = /* @__PURE__ */ new Set();
    this.droppedSet = /* @__PURE__ */ new Set();
    this.processMutations = (mutations) => {
      mutations.forEach(this.processMutation);
      this.emit();
    };
    this.emit = () => {
      if (this.frozen || this.locked) {
        return;
      }
      const adds = [];
      const addList = new DoubleLinkedList();
      const getNextId = (n) => {
        let ns = n;
        let nextId = IGNORED_NODE;
        while (nextId === IGNORED_NODE) {
          ns = ns && ns.nextSibling;
          nextId = ns && this.mirror.getId(ns);
        }
        return nextId;
      };
      const pushAdd = (n) => {
        var _a, _b, _c, _d, _e;
        const shadowHost = n.getRootNode ? (_a = n.getRootNode()) === null || _a === void 0 ? void 0 : _a.host : null;
        let rootShadowHost = shadowHost;
        while ((_c = (_b = rootShadowHost === null || rootShadowHost === void 0 ? void 0 : rootShadowHost.getRootNode) === null || _b === void 0 ? void 0 : _b.call(rootShadowHost)) === null || _c === void 0 ? void 0 : _c.host)
          rootShadowHost = ((_e = (_d = rootShadowHost === null || rootShadowHost === void 0 ? void 0 : rootShadowHost.getRootNode) === null || _d === void 0 ? void 0 : _d.call(rootShadowHost)) === null || _e === void 0 ? void 0 : _e.host) || null;
        const notInDoc = !this.doc.contains(n) && (!rootShadowHost || !this.doc.contains(rootShadowHost));
        if (!n.parentNode || notInDoc) {
          return;
        }
        const parentId = isShadowRoot(n.parentNode) ? this.mirror.getId(shadowHost) : this.mirror.getId(n.parentNode);
        const nextId = getNextId(n);
        if (parentId === -1 || nextId === -1) {
          return addList.addNode(n);
        }
        let sn = serializeNodeWithId(n, {
          doc: this.doc,
          map: this.mirror.map,
          blockClass: this.blockClass,
          blockSelector: this.blockSelector,
          unblockSelector: this.unblockSelector,
          maskTextClass: this.maskTextClass,
          maskTextSelector: this.maskTextSelector,
          unmaskTextSelector: this.unmaskTextSelector,
          maskInputSelector: this.maskInputSelector,
          unmaskInputSelector: this.unmaskInputSelector,
          skipChild: true,
          inlineStylesheet: this.inlineStylesheet,
          maskAllText: this.maskAllText,
          maskInputOptions: this.maskInputOptions,
          maskTextFn: this.maskTextFn,
          maskInputFn: this.maskInputFn,
          slimDOMOptions: this.slimDOMOptions,
          recordCanvas: this.recordCanvas,
          inlineImages: this.inlineImages,
          onSerialize: (currentN) => {
            if (isIframeINode(currentN)) {
              this.iframeManager.addIframe(currentN);
            }
            if (hasShadowRoot(n)) {
              this.shadowDomManager.addShadowRoot(n.shadowRoot, document);
            }
          },
          onIframeLoad: (iframe, childSn) => {
            this.iframeManager.attachIframe(iframe, childSn);
            this.shadowDomManager.observeAttachShadow(iframe);
          }
        });
        if (sn) {
          adds.push({
            parentId,
            nextId,
            node: sn
          });
        }
      };
      while (this.mapRemoves.length) {
        this.mirror.removeNodeFromMap(this.mapRemoves.shift());
      }
      for (const n of this.movedSet) {
        if (isParentRemoved(this.removes, n, this.mirror) && !this.movedSet.has(n.parentNode)) {
          continue;
        }
        pushAdd(n);
      }
      for (const n of this.addedSet) {
        if (!isAncestorInSet(this.droppedSet, n) && !isParentRemoved(this.removes, n, this.mirror)) {
          pushAdd(n);
        } else if (isAncestorInSet(this.movedSet, n)) {
          pushAdd(n);
        } else {
          this.droppedSet.add(n);
        }
      }
      let candidate = null;
      while (addList.length) {
        let node = null;
        if (candidate) {
          const parentId = this.mirror.getId(candidate.value.parentNode);
          const nextId = getNextId(candidate.value);
          if (parentId !== -1 && nextId !== -1) {
            node = candidate;
          }
        }
        if (!node) {
          for (let index = addList.length - 1; index >= 0; index--) {
            const _node = addList.get(index);
            if (_node) {
              const parentId = this.mirror.getId(_node.value.parentNode);
              const nextId = getNextId(_node.value);
              if (parentId !== -1 && nextId !== -1) {
                node = _node;
                break;
              }
            }
          }
        }
        if (!node) {
          while (addList.head) {
            addList.removeNode(addList.head.value);
          }
          break;
        }
        candidate = node.previous;
        addList.removeNode(node.value);
        pushAdd(node.value);
      }
      const payload = {
        texts: this.texts.map((text2) => ({
          id: this.mirror.getId(text2.node),
          value: text2.value
        })).filter((text2) => this.mirror.has(text2.id)),
        attributes: this.attributes.map((attribute) => ({
          id: this.mirror.getId(attribute.node),
          attributes: attribute.attributes
        })).filter((attribute) => this.mirror.has(attribute.id)),
        removes: this.removes,
        adds
      };
      if (!payload.texts.length && !payload.attributes.length && !payload.removes.length && !payload.adds.length) {
        return;
      }
      this.texts = [];
      this.attributes = [];
      this.removes = [];
      this.addedSet = /* @__PURE__ */ new Set();
      this.movedSet = /* @__PURE__ */ new Set();
      this.droppedSet = /* @__PURE__ */ new Set();
      this.movedMap = {};
      this.mutationCb(payload);
    };
    this.processMutation = (m) => {
      if (isIgnored(m.target)) {
        return;
      }
      switch (m.type) {
        case "characterData": {
          const value = m.target.textContent;
          if (!isBlocked(m.target, this.blockClass, this.blockSelector, this.unblockSelector) && value !== m.oldValue) {
            this.texts.push({
              value: needMaskingText(m.target, this.maskTextClass, this.maskTextSelector, this.unmaskTextSelector, this.maskAllText) && value ? this.maskTextFn ? this.maskTextFn(value) : value.replace(/[\S]/g, "*") : value,
              node: m.target
            });
          }
          break;
        }
        case "attributes": {
          const target = m.target;
          let value = target.getAttribute(m.attributeName);
          if (m.attributeName === "value") {
            value = maskInputValue({
              input: target,
              maskInputSelector: this.maskInputSelector,
              unmaskInputSelector: this.unmaskInputSelector,
              maskInputOptions: this.maskInputOptions,
              tagName: target.tagName,
              type: target.getAttribute("type"),
              value,
              maskInputFn: this.maskInputFn
            });
          }
          if (isBlocked(m.target, this.blockClass, this.blockSelector, this.unblockSelector) || value === m.oldValue) {
            return;
          }
          let item = this.attributes.find((a) => a.node === m.target);
          if (!item) {
            item = {
              node: m.target,
              attributes: {}
            };
            this.attributes.push(item);
          }
          if (m.attributeName === "type" && target.tagName === "INPUT" && (m.oldValue || "").toLowerCase() === "password") {
            target.setAttribute("data-rr-is-password", "true");
          }
          if (m.attributeName === "style") {
            const old = this.doc.createElement("span");
            if (m.oldValue) {
              old.setAttribute("style", m.oldValue);
            }
            if (item.attributes.style === void 0 || item.attributes.style === null) {
              item.attributes.style = {};
            }
            try {
              const styleObj = item.attributes.style;
              for (const pname of Array.from(target.style)) {
                const newValue = target.style.getPropertyValue(pname);
                const newPriority = target.style.getPropertyPriority(pname);
                if (newValue !== old.style.getPropertyValue(pname) || newPriority !== old.style.getPropertyPriority(pname)) {
                  if (newPriority === "") {
                    styleObj[pname] = newValue;
                  } else {
                    styleObj[pname] = [newValue, newPriority];
                  }
                }
              }
              for (const pname of Array.from(old.style)) {
                if (target.style.getPropertyValue(pname) === "") {
                  styleObj[pname] = false;
                }
              }
            } catch (error) {
              console.warn("[rrweb] Error when parsing update to style attribute:", error);
            }
          } else {
            const element2 = m.target;
            item.attributes[m.attributeName] = transformAttribute(this.doc, element2, element2.tagName, m.attributeName, value, this.maskAllText, this.unmaskTextSelector, this.maskTextFn);
          }
          break;
        }
        case "childList": {
          m.addedNodes.forEach((n) => this.genAdds(n, m.target));
          m.removedNodes.forEach((n) => {
            const nodeId = this.mirror.getId(n);
            const parentId = isShadowRoot(m.target) ? this.mirror.getId(m.target.host) : this.mirror.getId(m.target);
            if (isBlocked(m.target, this.blockClass, this.blockSelector, this.unblockSelector) || isIgnored(n)) {
              return;
            }
            if (this.addedSet.has(n)) {
              deepDelete(this.addedSet, n);
              this.droppedSet.add(n);
            } else if (this.addedSet.has(m.target) && nodeId === -1)
              ;
            else if (isAncestorRemoved(m.target, this.mirror))
              ;
            else if (this.movedSet.has(n) && this.movedMap[moveKey(nodeId, parentId)]) {
              deepDelete(this.movedSet, n);
            } else {
              this.removes.push({
                parentId,
                id: nodeId,
                isShadow: isShadowRoot(m.target) ? true : void 0
              });
            }
            this.mapRemoves.push(n);
          });
          break;
        }
      }
    };
    this.genAdds = (n, target) => {
      if (target && isBlocked(target, this.blockClass, this.blockSelector, this.unblockSelector)) {
        return;
      }
      if (isINode(n)) {
        if (isIgnored(n)) {
          return;
        }
        this.movedSet.add(n);
        let targetId = null;
        if (target && isINode(target)) {
          targetId = target.__sn.id;
        }
        if (targetId) {
          this.movedMap[moveKey(n.__sn.id, targetId)] = true;
        }
      } else {
        this.addedSet.add(n);
        this.droppedSet.delete(n);
      }
      if (!isBlocked(n, this.blockClass, this.blockSelector, this.unblockSelector))
        n.childNodes.forEach((childN) => this.genAdds(childN));
    };
  }
  init(options) {
    [
      "mutationCb",
      "blockClass",
      "blockSelector",
      "unblockSelector",
      "maskTextClass",
      "maskTextSelector",
      "unmaskTextSelector",
      "maskInputSelector",
      "unmaskInputSelector",
      "inlineStylesheet",
      "maskAllText",
      "maskInputOptions",
      "maskTextFn",
      "maskInputFn",
      "recordCanvas",
      "inlineImages",
      "slimDOMOptions",
      "doc",
      "mirror",
      "iframeManager",
      "shadowDomManager",
      "canvasManager"
    ].forEach((key) => {
      this[key] = options[key];
    });
  }
  freeze() {
    this.frozen = true;
    this.canvasManager.freeze();
  }
  unfreeze() {
    this.frozen = false;
    this.canvasManager.unfreeze();
    this.emit();
  }
  isFrozen() {
    return this.frozen;
  }
  lock() {
    this.locked = true;
    this.canvasManager.lock();
  }
  unlock() {
    this.locked = false;
    this.canvasManager.unlock();
    this.emit();
  }
  reset() {
    this.shadowDomManager.reset();
    this.canvasManager.reset();
  }
}
function deepDelete(addsSet, n) {
  addsSet.delete(n);
  n.childNodes.forEach((childN) => deepDelete(addsSet, childN));
}
function isParentRemoved(removes, n, mirror2) {
  const { parentNode } = n;
  if (!parentNode) {
    return false;
  }
  const parentId = mirror2.getId(parentNode);
  if (removes.some((r2) => r2.id === parentId)) {
    return true;
  }
  return isParentRemoved(removes, parentNode, mirror2);
}
function isAncestorInSet(set, n) {
  const { parentNode } = n;
  if (!parentNode) {
    return false;
  }
  if (set.has(parentNode)) {
    return true;
  }
  return isAncestorInSet(set, parentNode);
}
const callbackWrapper = (cb) => {
  const rrwebWrapped = (...rest) => {
    try {
      return cb(...rest);
    } catch (error) {
      try {
        error.__rrweb__ = true;
      } catch (_a) {
      }
      throw error;
    }
  };
  return rrwebWrapped;
};
const mutationBuffers = [];
function getEventTarget(event) {
  try {
    if ("composedPath" in event) {
      const path = event.composedPath();
      if (path.length) {
        return path[0];
      }
    } else if ("path" in event && event.path.length) {
      return event.path[0];
    }
  } catch (_a) {
  }
  return event && event.target;
}
function initMutationObserver(options, rootEl) {
  var _a, _b;
  const mutationBuffer = new MutationBuffer();
  mutationBuffers.push(mutationBuffer);
  mutationBuffer.init(options);
  let mutationObserverCtor = window.MutationObserver || window.__rrMutationObserver;
  const angularZoneSymbol = (_b = (_a = window === null || window === void 0 ? void 0 : window.Zone) === null || _a === void 0 ? void 0 : _a.__symbol__) === null || _b === void 0 ? void 0 : _b.call(_a, "MutationObserver");
  if (angularZoneSymbol && window[angularZoneSymbol]) {
    mutationObserverCtor = window[angularZoneSymbol];
  }
  const observer = new mutationObserverCtor(callbackWrapper((mutations) => {
    if (options.onMutation && options.onMutation(mutations) === false) {
      return;
    }
    mutationBuffer.processMutations(mutations);
  }));
  observer.observe(rootEl, {
    attributes: true,
    attributeOldValue: true,
    characterData: true,
    characterDataOldValue: true,
    childList: true,
    subtree: true
  });
  return observer;
}
function initMoveObserver({ mousemoveCb, sampling, doc, mirror: mirror2 }) {
  if (sampling.mousemove === false) {
    return () => {
    };
  }
  const threshold = typeof sampling.mousemove === "number" ? sampling.mousemove : 50;
  const callbackThreshold = typeof sampling.mousemoveCallback === "number" ? sampling.mousemoveCallback : 500;
  let positions = [];
  let timeBaseline;
  const wrappedCb = throttle$1((source) => {
    const totalOffset = Date.now() - timeBaseline;
    callbackWrapper(mousemoveCb)(positions.map((p) => {
      p.timeOffset -= totalOffset;
      return p;
    }), source);
    positions = [];
    timeBaseline = null;
  }, callbackThreshold);
  const updatePosition = throttle$1((evt) => {
    const target = getEventTarget(evt);
    const { clientX, clientY } = isTouchEvent(evt) ? evt.changedTouches[0] : evt;
    if (!timeBaseline) {
      timeBaseline = Date.now();
    }
    positions.push({
      x: clientX,
      y: clientY,
      id: mirror2.getId(target),
      timeOffset: Date.now() - timeBaseline
    });
    wrappedCb(typeof DragEvent !== "undefined" && evt instanceof DragEvent ? IncrementalSource.Drag : evt instanceof MouseEvent ? IncrementalSource.MouseMove : IncrementalSource.TouchMove);
  }, threshold, {
    trailing: false
  });
  const handlers2 = [
    on("mousemove", callbackWrapper(updatePosition), doc),
    on("touchmove", callbackWrapper(updatePosition), doc),
    on("drag", callbackWrapper(updatePosition), doc)
  ];
  return callbackWrapper(() => {
    handlers2.forEach((h) => h());
  });
}
function initMouseInteractionObserver({ mouseInteractionCb, doc, mirror: mirror2, blockClass, blockSelector, unblockSelector, sampling }) {
  if (sampling.mouseInteraction === false) {
    return () => {
    };
  }
  const disableMap = sampling.mouseInteraction === true || sampling.mouseInteraction === void 0 ? {} : sampling.mouseInteraction;
  const handlers2 = [];
  const getHandler = (eventKey) => {
    return (event) => {
      const target = getEventTarget(event);
      if (isBlocked(target, blockClass, blockSelector, unblockSelector)) {
        return;
      }
      const e2 = isTouchEvent(event) ? event.changedTouches[0] : event;
      if (!e2) {
        return;
      }
      const id = mirror2.getId(target);
      const { clientX, clientY } = e2;
      callbackWrapper(mouseInteractionCb)({
        type: MouseInteractions[eventKey],
        id,
        x: clientX,
        y: clientY
      });
    };
  };
  Object.keys(MouseInteractions).filter((key) => Number.isNaN(Number(key)) && !key.endsWith("_Departed") && disableMap[key] !== false).forEach((eventKey) => {
    const eventName = eventKey.toLowerCase();
    const handler = callbackWrapper(getHandler(eventKey));
    handlers2.push(on(eventName, handler, doc));
  });
  return callbackWrapper(() => {
    handlers2.forEach((h) => h());
  });
}
function initScrollObserver({ scrollCb, doc, mirror: mirror2, blockClass, blockSelector, unblockSelector, sampling }) {
  const updatePosition = throttle$1((evt) => {
    const target = getEventTarget(evt);
    if (!target || isBlocked(target, blockClass, blockSelector, unblockSelector)) {
      return;
    }
    const id = mirror2.getId(target);
    if (target === doc) {
      const scrollEl = doc.scrollingElement || doc.documentElement;
      callbackWrapper(scrollCb)({
        id,
        x: scrollEl.scrollLeft,
        y: scrollEl.scrollTop
      });
    } else {
      callbackWrapper(scrollCb)({
        id,
        x: target.scrollLeft,
        y: target.scrollTop
      });
    }
  }, sampling.scroll || 100);
  return on("scroll", callbackWrapper(updatePosition), doc);
}
function initViewportResizeObserver({ viewportResizeCb }) {
  let lastH = -1;
  let lastW = -1;
  const updateDimension = throttle$1(() => {
    const height = getWindowHeight();
    const width = getWindowWidth();
    if (lastH !== height || lastW !== width) {
      callbackWrapper(viewportResizeCb)({
        width: Number(width),
        height: Number(height)
      });
      lastH = height;
      lastW = width;
    }
  }, 200);
  return on("resize", callbackWrapper(updateDimension), window);
}
function wrapEventWithUserTriggeredFlag(v, enable) {
  const value = Object.assign({}, v);
  if (!enable)
    delete value.userTriggered;
  return value;
}
const INPUT_TAGS = ["INPUT", "TEXTAREA", "SELECT"];
const lastInputValueMap = /* @__PURE__ */ new WeakMap();
function initInputObserver({ inputCb, doc, mirror: mirror2, blockClass, blockSelector, unblockSelector, ignoreClass, ignoreSelector, maskInputSelector, unmaskInputSelector, maskInputOptions, maskInputFn, sampling, userTriggeredOnInput }) {
  function eventHandler(event) {
    let target = getEventTarget(event);
    const tagName = target && target.tagName;
    const userTriggered = event.isTrusted;
    if (tagName === "OPTION")
      target = target.parentElement;
    if (!target || !tagName || INPUT_TAGS.indexOf(tagName) < 0 || isBlocked(target, blockClass, blockSelector, unblockSelector)) {
      return;
    }
    const el = target;
    const type = getInputType(el);
    if (el.classList.contains(ignoreClass) || ignoreSelector && el.matches(ignoreSelector)) {
      return;
    }
    let text2 = getInputValue(el, tagName, type);
    let isChecked = false;
    if (type === "radio" || type === "checkbox") {
      isChecked = target.checked;
    }
    if (hasInputMaskOptions({
      maskInputOptions,
      maskInputSelector,
      tagName,
      type
    })) {
      text2 = maskInputValue({
        input: el,
        maskInputOptions,
        maskInputSelector,
        unmaskInputSelector,
        tagName,
        type,
        value: text2,
        maskInputFn
      });
    }
    cbWithDedup(target, callbackWrapper(wrapEventWithUserTriggeredFlag)({ text: text2, isChecked, userTriggered }, userTriggeredOnInput));
    const name = target.name;
    if (type === "radio" && name && isChecked) {
      doc.querySelectorAll(`input[type="radio"][name="${name}"]`).forEach((el2) => {
        if (el2 !== target) {
          const text3 = maskInputValue({
            input: el2,
            maskInputOptions,
            maskInputSelector,
            unmaskInputSelector,
            tagName,
            type,
            value: getInputValue(el2, tagName, type),
            maskInputFn
          });
          cbWithDedup(el2, callbackWrapper(wrapEventWithUserTriggeredFlag)({
            text: text3,
            isChecked: !isChecked,
            userTriggered: false
          }, userTriggeredOnInput));
        }
      });
    }
  }
  function cbWithDedup(target, v) {
    const lastInputValue = lastInputValueMap.get(target);
    if (!lastInputValue || lastInputValue.text !== v.text || lastInputValue.isChecked !== v.isChecked) {
      lastInputValueMap.set(target, v);
      const id = mirror2.getId(target);
      inputCb(Object.assign(Object.assign({}, v), { id }));
    }
  }
  const events = sampling.input === "last" ? ["change"] : ["input", "change"];
  const handlers2 = events.map((eventName) => on(eventName, callbackWrapper(eventHandler), doc));
  const propertyDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");
  const hookProperties = [
    [HTMLInputElement.prototype, "value"],
    [HTMLInputElement.prototype, "checked"],
    [HTMLSelectElement.prototype, "value"],
    [HTMLTextAreaElement.prototype, "value"],
    [HTMLSelectElement.prototype, "selectedIndex"],
    [HTMLOptionElement.prototype, "selected"]
  ];
  if (propertyDescriptor && propertyDescriptor.set) {
    handlers2.push(...hookProperties.map((p) => hookSetter(p[0], p[1], {
      set() {
        callbackWrapper(eventHandler)({ target: this });
      }
    })));
  }
  return callbackWrapper(() => {
    handlers2.forEach((h) => h());
  });
}
function getNestedCSSRulePositions(rule) {
  const positions = [];
  function recurse(childRule, pos) {
    if (hasNestedCSSRule("CSSGroupingRule") && childRule.parentRule instanceof CSSGroupingRule || hasNestedCSSRule("CSSMediaRule") && childRule.parentRule instanceof CSSMediaRule || hasNestedCSSRule("CSSSupportsRule") && childRule.parentRule instanceof CSSSupportsRule || hasNestedCSSRule("CSSConditionRule") && childRule.parentRule instanceof CSSConditionRule) {
      const rules = Array.from(childRule.parentRule.cssRules);
      const index = rules.indexOf(childRule);
      pos.unshift(index);
    } else {
      const rules = Array.from(childRule.parentStyleSheet.cssRules);
      const index = rules.indexOf(childRule);
      pos.unshift(index);
    }
    return pos;
  }
  return recurse(rule, positions);
}
function initStyleSheetObserver({ styleSheetRuleCb, mirror: mirror2 }, { win }) {
  if (!win.CSSStyleSheet || !win.CSSStyleSheet.prototype) {
    return () => {
    };
  }
  const insertRule = win.CSSStyleSheet.prototype.insertRule;
  win.CSSStyleSheet.prototype.insertRule = new Proxy(insertRule, {
    apply: callbackWrapper((target, thisArg, argumentsList) => {
      const [rule, index] = argumentsList;
      const id = mirror2.getId(thisArg.ownerNode);
      if (id !== -1) {
        styleSheetRuleCb({
          id,
          adds: [{ rule, index }]
        });
      }
      return target.apply(thisArg, argumentsList);
    })
  });
  const deleteRule = win.CSSStyleSheet.prototype.deleteRule;
  win.CSSStyleSheet.prototype.deleteRule = new Proxy(deleteRule, {
    apply: callbackWrapper((target, thisArg, argumentsList) => {
      const [index] = argumentsList;
      const id = mirror2.getId(thisArg.ownerNode);
      if (id !== -1) {
        styleSheetRuleCb({
          id,
          removes: [{ index }]
        });
      }
      return target.apply(thisArg, argumentsList);
    })
  });
  const supportedNestedCSSRuleTypes = {};
  if (canMonkeyPatchNestedCSSRule("CSSGroupingRule")) {
    supportedNestedCSSRuleTypes.CSSGroupingRule = win.CSSGroupingRule;
  } else {
    if (canMonkeyPatchNestedCSSRule("CSSMediaRule")) {
      supportedNestedCSSRuleTypes.CSSMediaRule = win.CSSMediaRule;
    }
    if (canMonkeyPatchNestedCSSRule("CSSConditionRule")) {
      supportedNestedCSSRuleTypes.CSSConditionRule = win.CSSConditionRule;
    }
    if (canMonkeyPatchNestedCSSRule("CSSSupportsRule")) {
      supportedNestedCSSRuleTypes.CSSSupportsRule = win.CSSSupportsRule;
    }
  }
  const unmodifiedFunctions = {};
  Object.entries(supportedNestedCSSRuleTypes).forEach(([typeKey, type]) => {
    unmodifiedFunctions[typeKey] = {
      insertRule: type.prototype.insertRule,
      deleteRule: type.prototype.deleteRule
    };
    type.prototype.insertRule = new Proxy(unmodifiedFunctions[typeKey].insertRule, {
      apply: callbackWrapper((target, thisArg, argumentsList) => {
        const [rule, index] = argumentsList;
        const id = mirror2.getId(thisArg.parentStyleSheet.ownerNode);
        if (id !== -1) {
          styleSheetRuleCb({
            id,
            adds: [
              {
                rule,
                index: [
                  ...getNestedCSSRulePositions(thisArg),
                  index || 0
                ]
              }
            ]
          });
        }
        return target.apply(thisArg, argumentsList);
      })
    });
    type.prototype.deleteRule = new Proxy(unmodifiedFunctions[typeKey].deleteRule, {
      apply: callbackWrapper((target, thisArg, argumentsList) => {
        const [index] = argumentsList;
        const id = mirror2.getId(thisArg.parentStyleSheet.ownerNode);
        if (id !== -1) {
          styleSheetRuleCb({
            id,
            removes: [
              { index: [...getNestedCSSRulePositions(thisArg), index] }
            ]
          });
        }
        return target.apply(thisArg, argumentsList);
      })
    });
  });
  return callbackWrapper(() => {
    win.CSSStyleSheet.prototype.insertRule = insertRule;
    win.CSSStyleSheet.prototype.deleteRule = deleteRule;
    Object.entries(supportedNestedCSSRuleTypes).forEach(([typeKey, type]) => {
      type.prototype.insertRule = unmodifiedFunctions[typeKey].insertRule;
      type.prototype.deleteRule = unmodifiedFunctions[typeKey].deleteRule;
    });
  });
}
function initStyleDeclarationObserver({ styleDeclarationCb, mirror: mirror2 }, { win }) {
  const setProperty = win.CSSStyleDeclaration.prototype.setProperty;
  win.CSSStyleDeclaration.prototype.setProperty = new Proxy(setProperty, {
    apply: callbackWrapper((target, thisArg, argumentsList) => {
      var _a, _b;
      const [property, value, priority] = argumentsList;
      const id = mirror2.getId((_b = (_a = thisArg.parentRule) === null || _a === void 0 ? void 0 : _a.parentStyleSheet) === null || _b === void 0 ? void 0 : _b.ownerNode);
      if (id !== -1) {
        styleDeclarationCb({
          id,
          set: {
            property,
            value,
            priority
          },
          index: getNestedCSSRulePositions(thisArg.parentRule)
        });
      }
      return target.apply(thisArg, argumentsList);
    })
  });
  const removeProperty = win.CSSStyleDeclaration.prototype.removeProperty;
  win.CSSStyleDeclaration.prototype.removeProperty = new Proxy(removeProperty, {
    apply: callbackWrapper((target, thisArg, argumentsList) => {
      var _a, _b;
      const [property] = argumentsList;
      const id = mirror2.getId((_b = (_a = thisArg.parentRule) === null || _a === void 0 ? void 0 : _a.parentStyleSheet) === null || _b === void 0 ? void 0 : _b.ownerNode);
      if (id !== -1) {
        styleDeclarationCb({
          id,
          remove: {
            property
          },
          index: getNestedCSSRulePositions(thisArg.parentRule)
        });
      }
      return target.apply(thisArg, argumentsList);
    })
  });
  return callbackWrapper(() => {
    win.CSSStyleDeclaration.prototype.setProperty = setProperty;
    win.CSSStyleDeclaration.prototype.removeProperty = removeProperty;
  });
}
function initMediaInteractionObserver({ mediaInteractionCb, blockClass, blockSelector, unblockSelector, mirror: mirror2, sampling }) {
  const handler = (type) => throttle$1(callbackWrapper((event) => {
    const target = getEventTarget(event);
    if (!target || isBlocked(target, blockClass, blockSelector, unblockSelector)) {
      return;
    }
    const { currentTime, volume, muted } = target;
    mediaInteractionCb({
      type,
      id: mirror2.getId(target),
      currentTime,
      volume,
      muted
    });
  }), sampling.media || 500);
  const handlers2 = [
    on("play", handler(0)),
    on("pause", handler(1)),
    on("seeked", handler(2)),
    on("volumechange", handler(3))
  ];
  return callbackWrapper(() => {
    handlers2.forEach((h) => h());
  });
}
function initFontObserver({ fontCb, doc }) {
  const win = doc.defaultView;
  if (!win) {
    return () => {
    };
  }
  const handlers2 = [];
  const fontMap = /* @__PURE__ */ new WeakMap();
  const originalFontFace = win.FontFace;
  win.FontFace = function FontFace(family, source, descriptors) {
    const fontFace = new originalFontFace(family, source, descriptors);
    fontMap.set(fontFace, {
      family,
      buffer: typeof source !== "string",
      descriptors,
      fontSource: typeof source === "string" ? source : JSON.stringify(Array.from(new Uint8Array(source)))
    });
    return fontFace;
  };
  const restoreHandler = patch(doc.fonts, "add", function(original) {
    return function(fontFace) {
      setTimeout(() => {
        const p = fontMap.get(fontFace);
        if (p) {
          fontCb(p);
          fontMap.delete(fontFace);
        }
      }, 0);
      return original.apply(this, [fontFace]);
    };
  });
  handlers2.push(() => {
    win.FontFace = originalFontFace;
  });
  handlers2.push(restoreHandler);
  return callbackWrapper(() => {
    handlers2.forEach((h) => h());
  });
}
function mergeHooks(o, hooks) {
  const { mutationCb, mousemoveCb, mouseInteractionCb, scrollCb, viewportResizeCb, inputCb, mediaInteractionCb, styleSheetRuleCb, styleDeclarationCb, canvasMutationCb, fontCb } = o;
  o.mutationCb = (...p) => {
    if (hooks.mutation) {
      hooks.mutation(...p);
    }
    mutationCb(...p);
  };
  o.mousemoveCb = (...p) => {
    if (hooks.mousemove) {
      hooks.mousemove(...p);
    }
    mousemoveCb(...p);
  };
  o.mouseInteractionCb = (...p) => {
    if (hooks.mouseInteraction) {
      hooks.mouseInteraction(...p);
    }
    mouseInteractionCb(...p);
  };
  o.scrollCb = (...p) => {
    if (hooks.scroll) {
      hooks.scroll(...p);
    }
    scrollCb(...p);
  };
  o.viewportResizeCb = (...p) => {
    if (hooks.viewportResize) {
      hooks.viewportResize(...p);
    }
    viewportResizeCb(...p);
  };
  o.inputCb = (...p) => {
    if (hooks.input) {
      hooks.input(...p);
    }
    inputCb(...p);
  };
  o.mediaInteractionCb = (...p) => {
    if (hooks.mediaInteaction) {
      hooks.mediaInteaction(...p);
    }
    mediaInteractionCb(...p);
  };
  o.styleSheetRuleCb = (...p) => {
    if (hooks.styleSheetRule) {
      hooks.styleSheetRule(...p);
    }
    styleSheetRuleCb(...p);
  };
  o.styleDeclarationCb = (...p) => {
    if (hooks.styleDeclaration) {
      hooks.styleDeclaration(...p);
    }
    styleDeclarationCb(...p);
  };
  o.canvasMutationCb = (...p) => {
    if (hooks.canvasMutation) {
      hooks.canvasMutation(...p);
    }
    canvasMutationCb(...p);
  };
  o.fontCb = (...p) => {
    if (hooks.font) {
      hooks.font(...p);
    }
    fontCb(...p);
  };
}
function initObservers(o, hooks = {}) {
  const currentWindow = o.doc.defaultView;
  if (!currentWindow) {
    return () => {
    };
  }
  mergeHooks(o, hooks);
  const mutationObserver = initMutationObserver(o, o.doc);
  const mousemoveHandler = initMoveObserver(o);
  const mouseInteractionHandler = initMouseInteractionObserver(o);
  const scrollHandler = initScrollObserver(o);
  const viewportResizeHandler = initViewportResizeObserver(o);
  const inputHandler = initInputObserver(o);
  const mediaInteractionHandler = initMediaInteractionObserver(o);
  const styleSheetObserver = initStyleSheetObserver(o, { win: currentWindow });
  const styleDeclarationObserver = initStyleDeclarationObserver(o, {
    win: currentWindow
  });
  const fontObserver = o.collectFonts ? initFontObserver(o) : () => {
  };
  const pluginHandlers = [];
  for (const plugin of o.plugins) {
    pluginHandlers.push(plugin.observer(plugin.callback, currentWindow, plugin.options));
  }
  return callbackWrapper(() => {
    mutationBuffers.forEach((b) => b.reset());
    mutationObserver.disconnect();
    mousemoveHandler();
    mouseInteractionHandler();
    scrollHandler();
    viewportResizeHandler();
    inputHandler();
    mediaInteractionHandler();
    try {
      styleSheetObserver();
      styleDeclarationObserver();
    } catch (e2) {
    }
    fontObserver();
    pluginHandlers.forEach((h) => h());
  });
}
function hasNestedCSSRule(prop) {
  return typeof window[prop] !== "undefined";
}
function canMonkeyPatchNestedCSSRule(prop) {
  return Boolean(typeof window[prop] !== "undefined" && window[prop].prototype && "insertRule" in window[prop].prototype && "deleteRule" in window[prop].prototype);
}
class IframeManager {
  constructor(options) {
    this.iframes = /* @__PURE__ */ new WeakMap();
    this.mutationCb = options.mutationCb;
  }
  addIframe(iframeEl) {
    this.iframes.set(iframeEl, true);
  }
  addLoadListener(cb) {
    this.loadListener = cb;
  }
  attachIframe(iframeEl, childSn) {
    var _a;
    this.mutationCb({
      adds: [
        {
          parentId: iframeEl.__sn.id,
          nextId: null,
          node: childSn
        }
      ],
      removes: [],
      texts: [],
      attributes: [],
      isAttachIframe: true
    });
    (_a = this.loadListener) === null || _a === void 0 ? void 0 : _a.call(this, iframeEl);
  }
}
class ShadowDomManager {
  constructor(options) {
    this.restorePatches = [];
    this.mutationCb = options.mutationCb;
    this.scrollCb = options.scrollCb;
    this.bypassOptions = options.bypassOptions;
    this.mirror = options.mirror;
    const manager = this;
    this.restorePatches.push(patch(HTMLElement.prototype, "attachShadow", function(original) {
      return function() {
        const shadowRoot = original.apply(this, arguments);
        if (this.shadowRoot)
          manager.addShadowRoot(this.shadowRoot, this.ownerDocument);
        return shadowRoot;
      };
    }));
  }
  addShadowRoot(shadowRoot, doc) {
    initMutationObserver(Object.assign(Object.assign({}, this.bypassOptions), { doc, mutationCb: this.mutationCb, mirror: this.mirror, shadowDomManager: this }), shadowRoot);
    initScrollObserver(Object.assign(Object.assign({}, this.bypassOptions), { scrollCb: this.scrollCb, doc: shadowRoot, mirror: this.mirror }));
  }
  observeAttachShadow(iframeElement) {
    if (iframeElement.contentWindow) {
      const manager = this;
      this.restorePatches.push(patch(iframeElement.contentWindow.HTMLElement.prototype, "attachShadow", function(original) {
        return function() {
          const shadowRoot = original.apply(this, arguments);
          if (this.shadowRoot)
            manager.addShadowRoot(this.shadowRoot, iframeElement.contentDocument);
          return shadowRoot;
        };
      }));
    }
  }
  reset() {
    this.restorePatches.forEach((restorePatch) => restorePatch());
  }
}
function __rest(s, e2) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function initCanvas2DMutationObserver(cb, win, blockClass, unblockSelector, blockSelector, mirror2) {
  const handlers2 = [];
  const props2D = Object.getOwnPropertyNames(win.CanvasRenderingContext2D.prototype);
  for (const prop of props2D) {
    try {
      if (typeof win.CanvasRenderingContext2D.prototype[prop] !== "function") {
        continue;
      }
      const restoreHandler = patch(win.CanvasRenderingContext2D.prototype, prop, function(original) {
        return function(...args) {
          if (!isBlocked(this.canvas, blockClass, blockSelector, unblockSelector)) {
            setTimeout(() => {
              const recordArgs = [...args];
              if (prop === "drawImage") {
                if (recordArgs[0] && recordArgs[0] instanceof HTMLCanvasElement) {
                  const canvas = recordArgs[0];
                  const ctx = canvas.getContext("2d");
                  let imgd = ctx === null || ctx === void 0 ? void 0 : ctx.getImageData(0, 0, canvas.width, canvas.height);
                  let pix = imgd === null || imgd === void 0 ? void 0 : imgd.data;
                  recordArgs[0] = JSON.stringify(pix);
                }
              }
              cb(this.canvas, {
                type: CanvasContext["2D"],
                property: prop,
                args: recordArgs
              });
            }, 0);
          }
          return original.apply(this, args);
        };
      });
      handlers2.push(restoreHandler);
    } catch (_a) {
      const hookHandler = hookSetter(win.CanvasRenderingContext2D.prototype, prop, {
        set(v) {
          cb(this.canvas, {
            type: CanvasContext["2D"],
            property: prop,
            args: [v],
            setter: true
          });
        }
      });
      handlers2.push(hookHandler);
    }
  }
  return () => {
    handlers2.forEach((h) => h());
  };
}
function initCanvasContextObserver(win, blockClass, blockSelector, unblockSelector) {
  const handlers2 = [];
  try {
    const restoreHandler = patch(win.HTMLCanvasElement.prototype, "getContext", function(original) {
      return function(contextType, ...args) {
        if (!isBlocked(this, blockClass, blockSelector, unblockSelector)) {
          if (!("__context" in this))
            this.__context = contextType;
        }
        return original.apply(this, [contextType, ...args]);
      };
    });
    handlers2.push(restoreHandler);
  } catch (_a) {
    console.error("failed to patch HTMLCanvasElement.prototype.getContext");
  }
  return () => {
    handlers2.forEach((h) => h());
  };
}
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var lookup = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
for (var i = 0; i < chars.length; i++) {
  lookup[chars.charCodeAt(i)] = i;
}
var encode = function(arraybuffer) {
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
const webGLVarMap = /* @__PURE__ */ new Map();
function variableListFor(ctx, ctor) {
  let contextMap = webGLVarMap.get(ctx);
  if (!contextMap) {
    contextMap = /* @__PURE__ */ new Map();
    webGLVarMap.set(ctx, contextMap);
  }
  if (!contextMap.has(ctor)) {
    contextMap.set(ctor, []);
  }
  return contextMap.get(ctor);
}
const saveWebGLVar = (value, win, ctx) => {
  if (!value || !(isInstanceOfWebGLObject(value, win) || typeof value === "object"))
    return;
  const name = value.constructor.name;
  const list = variableListFor(ctx, name);
  let index = list.indexOf(value);
  if (index === -1) {
    index = list.length;
    list.push(value);
  }
  return index;
};
function serializeArg(value, win, ctx) {
  if (value instanceof Array) {
    return value.map((arg) => serializeArg(arg, win, ctx));
  } else if (value === null) {
    return value;
  } else if (value instanceof Float32Array || value instanceof Float64Array || value instanceof Int32Array || value instanceof Uint32Array || value instanceof Uint8Array || value instanceof Uint16Array || value instanceof Int16Array || value instanceof Int8Array || value instanceof Uint8ClampedArray) {
    const name = value.constructor.name;
    return {
      rr_type: name,
      args: [Object.values(value)]
    };
  } else if (value instanceof ArrayBuffer) {
    const name = value.constructor.name;
    const base64 = encode(value);
    return {
      rr_type: name,
      base64
    };
  } else if (value instanceof DataView) {
    const name = value.constructor.name;
    return {
      rr_type: name,
      args: [
        serializeArg(value.buffer, win, ctx),
        value.byteOffset,
        value.byteLength
      ]
    };
  } else if (value instanceof HTMLImageElement) {
    const name = value.constructor.name;
    const { src } = value;
    return {
      rr_type: name,
      src
    };
  } else if (value instanceof ImageData) {
    const name = value.constructor.name;
    return {
      rr_type: name,
      args: [serializeArg(value.data, win, ctx), value.width, value.height]
    };
  } else if (isInstanceOfWebGLObject(value, win) || typeof value === "object") {
    const name = value.constructor.name;
    const index = saveWebGLVar(value, win, ctx);
    return {
      rr_type: name,
      index
    };
  }
  return value;
}
const serializeArgs = (args, win, ctx) => {
  return [...args].map((arg) => serializeArg(arg, win, ctx));
};
const isInstanceOfWebGLObject = (value, win) => {
  const webGLConstructorNames = [
    "WebGLActiveInfo",
    "WebGLBuffer",
    "WebGLFramebuffer",
    "WebGLProgram",
    "WebGLRenderbuffer",
    "WebGLShader",
    "WebGLShaderPrecisionFormat",
    "WebGLTexture",
    "WebGLUniformLocation",
    "WebGLVertexArrayObject",
    "WebGLVertexArrayObjectOES"
  ];
  const supportedWebGLConstructorNames = webGLConstructorNames.filter((name) => typeof win[name] === "function");
  return Boolean(supportedWebGLConstructorNames.find((name) => value instanceof win[name]));
};
function patchGLPrototype(prototype, type, cb, blockClass, unblockSelector, blockSelector, mirror2, win) {
  const handlers2 = [];
  const props = Object.getOwnPropertyNames(prototype);
  for (const prop of props) {
    try {
      if (typeof prototype[prop] !== "function") {
        continue;
      }
      const restoreHandler = patch(prototype, prop, function(original) {
        return function(...args) {
          const result = original.apply(this, args);
          saveWebGLVar(result, win, prototype);
          if (!isBlocked(this.canvas, blockClass, blockSelector, unblockSelector)) {
            const id = mirror2.getId(this.canvas);
            const recordArgs = serializeArgs([...args], win, prototype);
            const mutation = {
              type,
              property: prop,
              args: recordArgs
            };
            cb(this.canvas, mutation);
          }
          return result;
        };
      });
      handlers2.push(restoreHandler);
    } catch (_a) {
      const hookHandler = hookSetter(prototype, prop, {
        set(v) {
          cb(this.canvas, {
            type,
            property: prop,
            args: [v],
            setter: true
          });
        }
      });
      handlers2.push(hookHandler);
    }
  }
  return handlers2;
}
function initCanvasWebGLMutationObserver(cb, win, blockClass, blockSelector, unblockSelector, mirror2) {
  const handlers2 = [];
  handlers2.push(...patchGLPrototype(win.WebGLRenderingContext.prototype, CanvasContext.WebGL, cb, blockClass, blockSelector, unblockSelector, mirror2, win));
  if (typeof win.WebGL2RenderingContext !== "undefined") {
    handlers2.push(...patchGLPrototype(win.WebGL2RenderingContext.prototype, CanvasContext.WebGL2, cb, blockClass, blockSelector, unblockSelector, mirror2, win));
  }
  return () => {
    handlers2.forEach((h) => h());
  };
}
class CanvasManager {
  reset() {
    this.pendingCanvasMutations.clear();
    this.resetObservers && this.resetObservers();
  }
  freeze() {
    this.frozen = true;
  }
  unfreeze() {
    this.frozen = false;
  }
  lock() {
    this.locked = true;
  }
  unlock() {
    this.locked = false;
  }
  constructor(options) {
    this.pendingCanvasMutations = /* @__PURE__ */ new Map();
    this.rafStamps = { latestId: 0, invokeId: null };
    this.frozen = false;
    this.locked = false;
    this.processMutation = function(target, mutation) {
      const newFrame = this.rafStamps.invokeId && this.rafStamps.latestId !== this.rafStamps.invokeId;
      if (newFrame || !this.rafStamps.invokeId)
        this.rafStamps.invokeId = this.rafStamps.latestId;
      if (!this.pendingCanvasMutations.has(target)) {
        this.pendingCanvasMutations.set(target, []);
      }
      this.pendingCanvasMutations.get(target).push(mutation);
    };
    this.mutationCb = options.mutationCb;
    this.mirror = options.mirror;
    if (options.recordCanvas === true)
      this.initCanvasMutationObserver(options.win, options.blockClass, options.blockSelector, options.unblockSelector);
  }
  initCanvasMutationObserver(win, blockClass, unblockSelector, blockSelector) {
    this.startRAFTimestamping();
    this.startPendingCanvasMutationFlusher();
    const canvasContextReset = initCanvasContextObserver(win, blockClass, blockSelector, unblockSelector);
    const canvas2DReset = initCanvas2DMutationObserver(this.processMutation.bind(this), win, blockClass, blockSelector, unblockSelector, this.mirror);
    const canvasWebGL1and2Reset = initCanvasWebGLMutationObserver(this.processMutation.bind(this), win, blockClass, blockSelector, unblockSelector, this.mirror);
    this.resetObservers = () => {
      canvasContextReset();
      canvas2DReset();
      canvasWebGL1and2Reset();
    };
  }
  startPendingCanvasMutationFlusher() {
    requestAnimationFrame(() => this.flushPendingCanvasMutations());
  }
  startRAFTimestamping() {
    const setLatestRAFTimestamp = (timestamp) => {
      this.rafStamps.latestId = timestamp;
      requestAnimationFrame(setLatestRAFTimestamp);
    };
    requestAnimationFrame(setLatestRAFTimestamp);
  }
  flushPendingCanvasMutations() {
    this.pendingCanvasMutations.forEach((values, canvas) => {
      const id = this.mirror.getId(canvas);
      this.flushPendingCanvasMutationFor(canvas, id);
    });
    requestAnimationFrame(() => this.flushPendingCanvasMutations());
  }
  flushPendingCanvasMutationFor(canvas, id) {
    if (this.frozen || this.locked) {
      return;
    }
    const valuesWithType = this.pendingCanvasMutations.get(canvas);
    if (!valuesWithType || id === -1)
      return;
    const values = valuesWithType.map((value) => {
      const rest = __rest(value, ["type"]);
      return rest;
    });
    const { type } = valuesWithType[0];
    this.mutationCb({ id, type, commands: values });
    this.pendingCanvasMutations.delete(canvas);
  }
}
function wrapEvent(e2) {
  return Object.assign(Object.assign({}, e2), { timestamp: Date.now() });
}
let wrappedEmit;
let takeFullSnapshot;
const mirror = createMirror();
function record(options = {}) {
  const { emit, checkoutEveryNms, checkoutEveryNth, blockClass = "rr-block", blockSelector = null, unblockSelector = null, ignoreClass = "rr-ignore", ignoreSelector = null, maskTextClass = "rr-mask", maskTextSelector = null, maskInputSelector = null, unmaskTextSelector = null, unmaskInputSelector = null, inlineStylesheet = true, maskAllText = false, maskAllInputs, maskInputOptions: _maskInputOptions, slimDOMOptions: _slimDOMOptions, maskInputFn, maskTextFn, hooks, packFn, sampling = {}, mousemoveWait, recordCanvas = false, userTriggeredOnInput = false, collectFonts = false, inlineImages = false, plugins, keepIframeSrcFn = () => false, onMutation } = options;
  if (!emit) {
    throw new Error("emit function is required");
  }
  if (mousemoveWait !== void 0 && sampling.mousemove === void 0) {
    sampling.mousemove = mousemoveWait;
  }
  const maskInputOptions = maskAllInputs === true ? {
    color: true,
    date: true,
    "datetime-local": true,
    email: true,
    month: true,
    number: true,
    range: true,
    search: true,
    tel: true,
    text: true,
    time: true,
    url: true,
    week: true,
    textarea: true,
    select: true,
    radio: true,
    checkbox: true
  } : _maskInputOptions !== void 0 ? _maskInputOptions : {};
  const slimDOMOptions = _slimDOMOptions === true || _slimDOMOptions === "all" ? {
    script: true,
    comment: true,
    headFavicon: true,
    headWhitespace: true,
    headMetaSocial: true,
    headMetaRobots: true,
    headMetaHttpEquiv: true,
    headMetaVerification: true,
    headMetaAuthorship: _slimDOMOptions === "all",
    headMetaDescKeywords: _slimDOMOptions === "all"
  } : _slimDOMOptions ? _slimDOMOptions : {};
  polyfill();
  let lastFullSnapshotEvent;
  let incrementalSnapshotCount = 0;
  const eventProcessor = (e2) => {
    for (const plugin of plugins || []) {
      if (plugin.eventProcessor) {
        e2 = plugin.eventProcessor(e2);
      }
    }
    if (packFn) {
      e2 = packFn(e2);
    }
    return e2;
  };
  wrappedEmit = (e2, isCheckout) => {
    var _a;
    if (((_a = mutationBuffers[0]) === null || _a === void 0 ? void 0 : _a.isFrozen()) && e2.type !== EventType.FullSnapshot && !(e2.type === EventType.IncrementalSnapshot && e2.data.source === IncrementalSource.Mutation)) {
      mutationBuffers.forEach((buf) => buf.unfreeze());
    }
    emit(eventProcessor(e2), isCheckout);
    if (e2.type === EventType.FullSnapshot) {
      lastFullSnapshotEvent = e2;
      incrementalSnapshotCount = 0;
    } else if (e2.type === EventType.IncrementalSnapshot) {
      if (e2.data.source === IncrementalSource.Mutation && e2.data.isAttachIframe) {
        return;
      }
      incrementalSnapshotCount++;
      const exceedCount = checkoutEveryNth && incrementalSnapshotCount >= checkoutEveryNth;
      const exceedTime = checkoutEveryNms && e2.timestamp - lastFullSnapshotEvent.timestamp > checkoutEveryNms;
      if (exceedCount || exceedTime) {
        takeFullSnapshot(true);
      }
    }
  };
  const wrappedMutationEmit = (m) => {
    wrappedEmit(wrapEvent({
      type: EventType.IncrementalSnapshot,
      data: Object.assign({ source: IncrementalSource.Mutation }, m)
    }));
  };
  const wrappedScrollEmit = (p) => wrappedEmit(wrapEvent({
    type: EventType.IncrementalSnapshot,
    data: Object.assign({ source: IncrementalSource.Scroll }, p)
  }));
  const wrappedCanvasMutationEmit = (p) => wrappedEmit(wrapEvent({
    type: EventType.IncrementalSnapshot,
    data: Object.assign({ source: IncrementalSource.CanvasMutation }, p)
  }));
  const iframeManager = new IframeManager({
    mutationCb: wrappedMutationEmit
  });
  const canvasManager = new CanvasManager({
    recordCanvas,
    mutationCb: wrappedCanvasMutationEmit,
    win: window,
    blockClass,
    blockSelector,
    unblockSelector,
    mirror
  });
  const shadowDomManager = new ShadowDomManager({
    mutationCb: wrappedMutationEmit,
    scrollCb: wrappedScrollEmit,
    bypassOptions: {
      onMutation,
      blockClass,
      blockSelector,
      unblockSelector,
      maskTextClass,
      maskTextSelector,
      unmaskTextSelector,
      maskInputSelector,
      unmaskInputSelector,
      inlineStylesheet,
      maskAllText,
      maskInputOptions,
      maskTextFn,
      maskInputFn,
      recordCanvas,
      inlineImages,
      sampling,
      slimDOMOptions,
      iframeManager,
      canvasManager
    },
    mirror
  });
  takeFullSnapshot = (isCheckout = false) => {
    var _a, _b, _c, _d;
    wrappedEmit(wrapEvent({
      type: EventType.Meta,
      data: {
        href: window.location.href,
        width: getWindowWidth(),
        height: getWindowHeight()
      }
    }), isCheckout);
    mutationBuffers.forEach((buf) => buf.lock());
    const [node, idNodeMap] = snapshot(document, {
      blockClass,
      blockSelector,
      unblockSelector,
      maskTextClass,
      maskTextSelector,
      unmaskTextSelector,
      maskInputSelector,
      unmaskInputSelector,
      inlineStylesheet,
      maskAllText,
      maskAllInputs: maskInputOptions,
      maskTextFn,
      slimDOM: slimDOMOptions,
      recordCanvas,
      inlineImages,
      onSerialize: (n) => {
        if (isIframeINode(n)) {
          iframeManager.addIframe(n);
        }
        if (hasShadowRoot(n)) {
          shadowDomManager.addShadowRoot(n.shadowRoot, document);
        }
      },
      onIframeLoad: (iframe, childSn) => {
        iframeManager.attachIframe(iframe, childSn);
        shadowDomManager.observeAttachShadow(iframe);
      },
      keepIframeSrcFn
    });
    if (!node) {
      return console.warn("Failed to snapshot the document");
    }
    mirror.map = idNodeMap;
    wrappedEmit(wrapEvent({
      type: EventType.FullSnapshot,
      data: {
        node,
        initialOffset: {
          left: window.pageXOffset !== void 0 ? window.pageXOffset : (document === null || document === void 0 ? void 0 : document.documentElement.scrollLeft) || ((_b = (_a = document === null || document === void 0 ? void 0 : document.body) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.scrollLeft) || (document === null || document === void 0 ? void 0 : document.body.scrollLeft) || 0,
          top: window.pageYOffset !== void 0 ? window.pageYOffset : (document === null || document === void 0 ? void 0 : document.documentElement.scrollTop) || ((_d = (_c = document === null || document === void 0 ? void 0 : document.body) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.scrollTop) || (document === null || document === void 0 ? void 0 : document.body.scrollTop) || 0
        }
      }
    }));
    mutationBuffers.forEach((buf) => buf.unlock());
  };
  try {
    const handlers2 = [];
    handlers2.push(on("DOMContentLoaded", () => {
      wrappedEmit(wrapEvent({
        type: EventType.DomContentLoaded,
        data: {}
      }));
    }));
    const observe2 = (doc) => {
      var _a;
      return callbackWrapper(initObservers)({
        onMutation,
        mutationCb: wrappedMutationEmit,
        mousemoveCb: (positions, source) => wrappedEmit(wrapEvent({
          type: EventType.IncrementalSnapshot,
          data: {
            source,
            positions
          }
        })),
        mouseInteractionCb: (d) => wrappedEmit(wrapEvent({
          type: EventType.IncrementalSnapshot,
          data: Object.assign({ source: IncrementalSource.MouseInteraction }, d)
        })),
        scrollCb: wrappedScrollEmit,
        viewportResizeCb: (d) => wrappedEmit(wrapEvent({
          type: EventType.IncrementalSnapshot,
          data: Object.assign({ source: IncrementalSource.ViewportResize }, d)
        })),
        inputCb: (v) => wrappedEmit(wrapEvent({
          type: EventType.IncrementalSnapshot,
          data: Object.assign({ source: IncrementalSource.Input }, v)
        })),
        mediaInteractionCb: (p) => wrappedEmit(wrapEvent({
          type: EventType.IncrementalSnapshot,
          data: Object.assign({ source: IncrementalSource.MediaInteraction }, p)
        })),
        styleSheetRuleCb: (r2) => wrappedEmit(wrapEvent({
          type: EventType.IncrementalSnapshot,
          data: Object.assign({ source: IncrementalSource.StyleSheetRule }, r2)
        })),
        styleDeclarationCb: (r2) => wrappedEmit(wrapEvent({
          type: EventType.IncrementalSnapshot,
          data: Object.assign({ source: IncrementalSource.StyleDeclaration }, r2)
        })),
        canvasMutationCb: wrappedCanvasMutationEmit,
        fontCb: (p) => wrappedEmit(wrapEvent({
          type: EventType.IncrementalSnapshot,
          data: Object.assign({ source: IncrementalSource.Font }, p)
        })),
        blockClass,
        ignoreClass,
        ignoreSelector,
        maskTextClass,
        maskTextSelector,
        unmaskTextSelector,
        maskInputSelector,
        unmaskInputSelector,
        maskInputOptions,
        inlineStylesheet,
        sampling,
        recordCanvas,
        inlineImages,
        userTriggeredOnInput,
        collectFonts,
        doc,
        maskAllText,
        maskInputFn,
        maskTextFn,
        blockSelector,
        unblockSelector,
        slimDOMOptions,
        mirror,
        iframeManager,
        shadowDomManager,
        canvasManager,
        plugins: ((_a = plugins === null || plugins === void 0 ? void 0 : plugins.filter((p) => p.observer)) === null || _a === void 0 ? void 0 : _a.map((p) => ({
          observer: p.observer,
          options: p.options,
          callback: (payload) => wrappedEmit(wrapEvent({
            type: EventType.Plugin,
            data: {
              plugin: p.name,
              payload
            }
          }))
        }))) || []
      }, hooks);
    };
    iframeManager.addLoadListener((iframeEl) => {
      try {
        handlers2.push(observe2(iframeEl.contentDocument));
      } catch (error) {
        console.warn(error);
      }
    });
    const init2 = () => {
      takeFullSnapshot();
      handlers2.push(observe2(document));
    };
    if (document.readyState === "interactive" || document.readyState === "complete") {
      init2();
    } else {
      handlers2.push(on("load", () => {
        wrappedEmit(wrapEvent({
          type: EventType.Load,
          data: {}
        }));
        init2();
      }, window));
    }
    return () => {
      handlers2.forEach((h) => h());
    };
  } catch (error) {
    console.warn(error);
  }
}
record.addCustomEvent = (tag, payload) => {
  if (!wrappedEmit) {
    throw new Error("please add custom event after start recording");
  }
  wrappedEmit(wrapEvent({
    type: EventType.Custom,
    data: {
      tag,
      payload
    }
  }));
};
record.freezePage = () => {
  mutationBuffers.forEach((buf) => buf.freeze());
};
record.takeFullSnapshot = (isCheckout) => {
  if (!takeFullSnapshot) {
    throw new Error("please take full snapshot after start recording");
  }
  takeFullSnapshot(isCheckout);
};
record.mirror = mirror;
function timestampToMs(timestamp) {
  const isMs = timestamp > 9999999999;
  return isMs ? timestamp : timestamp * 1e3;
}
function timestampToS(timestamp) {
  const isMs = timestamp > 9999999999;
  return isMs ? timestamp / 1e3 : timestamp;
}
function addBreadcrumbEvent(replay, breadcrumb) {
  if (breadcrumb.category === "sentry.transaction") {
    return;
  }
  if (["ui.click", "ui.input"].includes(breadcrumb.category)) {
    replay.triggerUserActivity();
  } else {
    replay.checkAndHandleExpiredSession();
  }
  replay.addUpdate(() => {
    void replay.throttledAddEvent({
      type: EventType.Custom,
      // TODO: We were converting from ms to seconds for breadcrumbs, spans,
      // but maybe we should just keep them as milliseconds
      timestamp: (breadcrumb.timestamp || 0) * 1e3,
      data: {
        tag: "breadcrumb",
        // normalize to max. 10 depth and 1_000 properties per object
        payload: normalize(breadcrumb, 10, 1e3)
      }
    });
    return breadcrumb.category === "console";
  });
}
const INTERACTIVE_SELECTOR = "button,a";
function getClickTargetNode(event) {
  const target = getTargetNode(event);
  if (!target || !(target instanceof Element)) {
    return target;
  }
  const closestInteractive = target.closest(INTERACTIVE_SELECTOR);
  return closestInteractive || target;
}
function getTargetNode(event) {
  if (isEventWithTarget(event)) {
    return event.target;
  }
  return event;
}
function isEventWithTarget(event) {
  return typeof event === "object" && !!event && "target" in event;
}
let handlers;
function onWindowOpen(cb) {
  if (!handlers) {
    handlers = [];
    monkeyPatchWindowOpen();
  }
  handlers.push(cb);
  return () => {
    const pos = handlers ? handlers.indexOf(cb) : -1;
    if (pos > -1) {
      handlers.splice(pos, 1);
    }
  };
}
function monkeyPatchWindowOpen() {
  fill(WINDOW$1, "open", function(originalWindowOpen) {
    return function(...args) {
      if (handlers) {
        try {
          handlers.forEach((handler) => handler());
        } catch (e2) {
        }
      }
      return originalWindowOpen.apply(WINDOW$1, args);
    };
  });
}
function handleClick(clickDetector, clickBreadcrumb, node) {
  clickDetector.handleClick(clickBreadcrumb, node);
}
class ClickDetector {
  // protected for testing
  constructor(replay, slowClickConfig, _addBreadcrumbEvent = addBreadcrumbEvent) {
    this._lastMutation = 0;
    this._lastScroll = 0;
    this._clicks = [];
    this._timeout = slowClickConfig.timeout / 1e3;
    this._threshold = slowClickConfig.threshold / 1e3;
    this._scollTimeout = slowClickConfig.scrollTimeout / 1e3;
    this._replay = replay;
    this._ignoreSelector = slowClickConfig.ignoreSelector;
    this._addBreadcrumbEvent = _addBreadcrumbEvent;
  }
  /** Register click detection handlers on mutation or scroll. */
  addListeners() {
    const mutationHandler = () => {
      this._lastMutation = nowInSeconds();
    };
    const scrollHandler = () => {
      this._lastScroll = nowInSeconds();
    };
    const cleanupWindowOpen = onWindowOpen(() => {
      this._lastMutation = nowInSeconds();
    });
    const clickHandler = (event) => {
      if (!event.target) {
        return;
      }
      const node = getClickTargetNode(event);
      if (node) {
        this._handleMultiClick(node);
      }
    };
    const obs = new MutationObserver(mutationHandler);
    obs.observe(WINDOW$1.document.documentElement, {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true
    });
    WINDOW$1.addEventListener("scroll", scrollHandler, { passive: true });
    WINDOW$1.addEventListener("click", clickHandler, { passive: true });
    this._teardown = () => {
      WINDOW$1.removeEventListener("scroll", scrollHandler);
      WINDOW$1.removeEventListener("click", clickHandler);
      cleanupWindowOpen();
      obs.disconnect();
      this._clicks = [];
      this._lastMutation = 0;
      this._lastScroll = 0;
    };
  }
  /** Clean up listeners. */
  removeListeners() {
    if (this._teardown) {
      this._teardown();
    }
    if (this._checkClickTimeout) {
      clearTimeout(this._checkClickTimeout);
    }
  }
  /** Handle a click */
  handleClick(breadcrumb, node) {
    if (ignoreElement(node, this._ignoreSelector) || !isClickBreadcrumb(breadcrumb)) {
      return;
    }
    const newClick = {
      timestamp: timestampToS(breadcrumb.timestamp),
      clickBreadcrumb: breadcrumb,
      // Set this to 0 so we know it originates from the click breadcrumb
      clickCount: 0,
      node
    };
    if (this._clicks.some((click) => click.node === newClick.node && Math.abs(click.timestamp - newClick.timestamp) < 1)) {
      return;
    }
    this._clicks.push(newClick);
    if (this._clicks.length === 1) {
      this._scheduleCheckClicks();
    }
  }
  /** Count multiple clicks on elements. */
  _handleMultiClick(node) {
    this._getClicks(node).forEach((click) => {
      click.clickCount++;
    });
  }
  /** Get all pending clicks for a given node. */
  _getClicks(node) {
    return this._clicks.filter((click) => click.node === node);
  }
  /** Check the clicks that happened. */
  _checkClicks() {
    const timedOutClicks = [];
    const now = nowInSeconds();
    this._clicks.forEach((click) => {
      if (!click.mutationAfter && this._lastMutation) {
        click.mutationAfter = click.timestamp <= this._lastMutation ? this._lastMutation - click.timestamp : void 0;
      }
      if (!click.scrollAfter && this._lastScroll) {
        click.scrollAfter = click.timestamp <= this._lastScroll ? this._lastScroll - click.timestamp : void 0;
      }
      if (click.timestamp + this._timeout <= now) {
        timedOutClicks.push(click);
      }
    });
    for (const click of timedOutClicks) {
      const pos = this._clicks.indexOf(click);
      if (pos > -1) {
        this._generateBreadcrumbs(click);
        this._clicks.splice(pos, 1);
      }
    }
    if (this._clicks.length) {
      this._scheduleCheckClicks();
    }
  }
  /** Generate matching breadcrumb(s) for the click. */
  _generateBreadcrumbs(click) {
    const replay = this._replay;
    const hadScroll = click.scrollAfter && click.scrollAfter <= this._scollTimeout;
    const hadMutation = click.mutationAfter && click.mutationAfter <= this._threshold;
    const isSlowClick = !hadScroll && !hadMutation;
    const { clickCount, clickBreadcrumb } = click;
    if (isSlowClick) {
      const timeAfterClickMs = Math.min(click.mutationAfter || this._timeout, this._timeout) * 1e3;
      const endReason = timeAfterClickMs < this._timeout * 1e3 ? "mutation" : "timeout";
      const breadcrumb = {
        type: "default",
        message: clickBreadcrumb.message,
        timestamp: clickBreadcrumb.timestamp,
        category: "ui.slowClickDetected",
        data: {
          ...clickBreadcrumb.data,
          url: WINDOW$1.location.href,
          route: replay.getCurrentRoute(),
          timeAfterClickMs,
          endReason,
          // If clickCount === 0, it means multiClick was not correctly captured here
          // - we still want to send 1 in this case
          clickCount: clickCount || 1
        }
      };
      this._addBreadcrumbEvent(replay, breadcrumb);
      return;
    }
    if (clickCount > 1) {
      const breadcrumb = {
        type: "default",
        message: clickBreadcrumb.message,
        timestamp: clickBreadcrumb.timestamp,
        category: "ui.multiClick",
        data: {
          ...clickBreadcrumb.data,
          url: WINDOW$1.location.href,
          route: replay.getCurrentRoute(),
          clickCount,
          metric: true
        }
      };
      this._addBreadcrumbEvent(replay, breadcrumb);
    }
  }
  /** Schedule to check current clicks. */
  _scheduleCheckClicks() {
    if (this._checkClickTimeout) {
      clearTimeout(this._checkClickTimeout);
    }
    this._checkClickTimeout = setTimeout(() => this._checkClicks(), 1e3);
  }
}
const SLOW_CLICK_TAGS = ["A", "BUTTON", "INPUT"];
function ignoreElement(node, ignoreSelector) {
  if (!SLOW_CLICK_TAGS.includes(node.tagName)) {
    return true;
  }
  if (node.tagName === "INPUT" && !["submit", "button"].includes(node.getAttribute("type") || "")) {
    return true;
  }
  if (node.tagName === "A" && (node.hasAttribute("download") || node.hasAttribute("target") && node.getAttribute("target") !== "_self")) {
    return true;
  }
  if (ignoreSelector && node.matches(ignoreSelector)) {
    return true;
  }
  return false;
}
function isClickBreadcrumb(breadcrumb) {
  return !!(breadcrumb.data && typeof breadcrumb.data.nodeId === "number" && breadcrumb.timestamp);
}
function nowInSeconds() {
  return Date.now() / 1e3;
}
function createBreadcrumb(breadcrumb) {
  return {
    timestamp: Date.now() / 1e3,
    type: "default",
    ...breadcrumb
  };
}
var NodeType;
(function(NodeType2) {
  NodeType2[NodeType2["Document"] = 0] = "Document";
  NodeType2[NodeType2["DocumentType"] = 1] = "DocumentType";
  NodeType2[NodeType2["Element"] = 2] = "Element";
  NodeType2[NodeType2["Text"] = 3] = "Text";
  NodeType2[NodeType2["CDATA"] = 4] = "CDATA";
  NodeType2[NodeType2["Comment"] = 5] = "Comment";
})(NodeType || (NodeType = {}));
const ATTRIBUTES_TO_RECORD = /* @__PURE__ */ new Set([
  "id",
  "class",
  "aria-label",
  "role",
  "name",
  "alt",
  "title",
  "data-test-id",
  "data-testid",
  "disabled",
  "aria-disabled"
]);
function getAttributesToRecord(attributes) {
  const obj = {};
  for (const key in attributes) {
    if (ATTRIBUTES_TO_RECORD.has(key)) {
      let normalizedKey = key;
      if (key === "data-testid" || key === "data-test-id") {
        normalizedKey = "testId";
      }
      obj[normalizedKey] = attributes[key];
    }
  }
  return obj;
}
const handleDomListener = (replay) => {
  return (handlerData) => {
    if (!replay.isEnabled()) {
      return;
    }
    const result = handleDom(handlerData);
    if (!result) {
      return;
    }
    const isClick = handlerData.name === "click";
    const event = isClick && handlerData.event;
    if (isClick && replay.clickDetector && event && !event.altKey && !event.metaKey && !event.ctrlKey && !event.shiftKey) {
      handleClick(
        replay.clickDetector,
        result,
        getClickTargetNode(handlerData.event)
      );
    }
    addBreadcrumbEvent(replay, result);
  };
};
function getBaseDomBreadcrumb(target, message) {
  const serializedNode = target && isRrwebNode(target) && target.__sn.type === NodeType.Element ? target.__sn : null;
  return {
    message,
    data: serializedNode ? {
      nodeId: serializedNode.id,
      node: {
        id: serializedNode.id,
        tagName: serializedNode.tagName,
        textContent: target ? Array.from(target.childNodes).map(
          (node) => "__sn" in node && node.__sn.type === NodeType.Text && node.__sn.textContent
        ).filter(Boolean).map((text2) => text2.trim()).join("") : "",
        attributes: getAttributesToRecord(serializedNode.attributes)
      }
    } : {}
  };
}
function handleDom(handlerData) {
  const { target, message } = getDomTarget(handlerData);
  return createBreadcrumb({
    category: `ui.${handlerData.name}`,
    ...getBaseDomBreadcrumb(target, message)
  });
}
function getDomTarget(handlerData) {
  const isClick = handlerData.name === "click";
  let message;
  let target = null;
  try {
    target = isClick ? getClickTargetNode(handlerData.event) : getTargetNode(handlerData.event);
    message = htmlTreeAsString(target, { maxStringLength: 200 }) || "<unknown>";
  } catch (e2) {
    message = "<unknown>";
  }
  return { target, message };
}
function isRrwebNode(node) {
  return "__sn" in node;
}
function handleKeyboardEvent(replay, event) {
  if (!replay.isEnabled()) {
    return;
  }
  replay.updateUserActivity();
  const breadcrumb = getKeyboardBreadcrumb(event);
  if (!breadcrumb) {
    return;
  }
  addBreadcrumbEvent(replay, breadcrumb);
}
function getKeyboardBreadcrumb(event) {
  const { metaKey, shiftKey, ctrlKey, altKey, key, target } = event;
  if (!target || isInputElement(target) || !key) {
    return null;
  }
  const hasModifierKey = metaKey || ctrlKey || altKey;
  const isCharacterKey = key.length === 1;
  if (!hasModifierKey && isCharacterKey) {
    return null;
  }
  const message = htmlTreeAsString(target, { maxStringLength: 200 }) || "<unknown>";
  const baseBreadcrumb = getBaseDomBreadcrumb(target, message);
  return createBreadcrumb({
    category: "ui.keyDown",
    message,
    data: {
      ...baseBreadcrumb.data,
      metaKey,
      shiftKey,
      ctrlKey,
      altKey,
      key
    }
  });
}
function isInputElement(target) {
  return target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;
}
const NAVIGATION_ENTRY_KEYS = [
  "name",
  "type",
  "startTime",
  "transferSize",
  "duration"
];
function isNavigationEntryEqual(a) {
  return function(b) {
    return NAVIGATION_ENTRY_KEYS.every((key) => a[key] === b[key]);
  };
}
function dedupePerformanceEntries(currentList, newList) {
  const [existingNavigationEntries, existingLcpEntries, existingEntries] = currentList.reduce(
    (acc, entry) => {
      if (entry.entryType === "navigation") {
        acc[0].push(entry);
      } else if (entry.entryType === "largest-contentful-paint") {
        acc[1].push(entry);
      } else {
        acc[2].push(entry);
      }
      return acc;
    },
    [[], [], []]
  );
  const newEntries = [];
  const newNavigationEntries = [];
  let newLcpEntry = existingLcpEntries.length ? existingLcpEntries[existingLcpEntries.length - 1] : void 0;
  newList.forEach((entry) => {
    if (entry.entryType === "largest-contentful-paint") {
      if (!newLcpEntry || newLcpEntry.startTime < entry.startTime) {
        newLcpEntry = entry;
      }
      return;
    }
    if (entry.entryType === "navigation") {
      const navigationEntry = entry;
      if (
        // Ignore any navigation entries with duration 0, as they are likely duplicates
        entry.duration > 0 && // Ensure new entry does not already exist in existing entries
        !existingNavigationEntries.find(isNavigationEntryEqual(navigationEntry)) && // Ensure new entry does not already exist in new list of navigation entries
        !newNavigationEntries.find(isNavigationEntryEqual(navigationEntry))
      ) {
        newNavigationEntries.push(navigationEntry);
      }
      return;
    }
    newEntries.push(entry);
  });
  return [
    ...newLcpEntry ? [newLcpEntry] : [],
    ...existingNavigationEntries,
    ...existingEntries,
    ...newEntries,
    ...newNavigationEntries
  ].sort((a, b) => a.startTime - b.startTime);
}
function setupPerformanceObserver(replay) {
  const performanceObserverHandler = (list) => {
    const newPerformanceEntries = dedupePerformanceEntries(
      replay.performanceEvents,
      list.getEntries()
    );
    replay.performanceEvents = newPerformanceEntries;
  };
  const performanceObserver = new PerformanceObserver(performanceObserverHandler);
  [
    "element",
    "event",
    "first-input",
    "largest-contentful-paint",
    "layout-shift",
    "longtask",
    "navigation",
    "paint",
    "resource"
  ].forEach((type) => {
    try {
      performanceObserver.observe({
        type,
        buffered: true
      });
    } catch (e2) {
    }
  });
  return performanceObserver;
}
const r = `/*! pako 2.1.0 https://github.com/nodeca/pako @license (MIT AND Zlib) */
function t(t){let e=t.length;for(;--e>=0;)t[e]=0}const e=new Uint8Array([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0]),a=new Uint8Array([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13]),i=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7]),n=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),s=new Array(576);t(s);const r=new Array(60);t(r);const o=new Array(512);t(o);const l=new Array(256);t(l);const h=new Array(29);t(h);const d=new Array(30);function _(t,e,a,i,n){this.static_tree=t,this.extra_bits=e,this.extra_base=a,this.elems=i,this.max_length=n,this.has_stree=t&&t.length}let f,c,u;function w(t,e){this.dyn_tree=t,this.max_code=0,this.stat_desc=e}t(d);const m=t=>t<256?o[t]:o[256+(t>>>7)],b=(t,e)=>{t.pending_buf[t.pending++]=255&e,t.pending_buf[t.pending++]=e>>>8&255},g=(t,e,a)=>{t.bi_valid>16-a?(t.bi_buf|=e<<t.bi_valid&65535,b(t,t.bi_buf),t.bi_buf=e>>16-t.bi_valid,t.bi_valid+=a-16):(t.bi_buf|=e<<t.bi_valid&65535,t.bi_valid+=a)},p=(t,e,a)=>{g(t,a[2*e],a[2*e+1])},k=(t,e)=>{let a=0;do{a|=1&t,t>>>=1,a<<=1}while(--e>0);return a>>>1},v=(t,e,a)=>{const i=new Array(16);let n,s,r=0;for(n=1;n<=15;n++)r=r+a[n-1]<<1,i[n]=r;for(s=0;s<=e;s++){let e=t[2*s+1];0!==e&&(t[2*s]=k(i[e]++,e))}},y=t=>{let e;for(e=0;e<286;e++)t.dyn_ltree[2*e]=0;for(e=0;e<30;e++)t.dyn_dtree[2*e]=0;for(e=0;e<19;e++)t.bl_tree[2*e]=0;t.dyn_ltree[512]=1,t.opt_len=t.static_len=0,t.sym_next=t.matches=0},x=t=>{t.bi_valid>8?b(t,t.bi_buf):t.bi_valid>0&&(t.pending_buf[t.pending++]=t.bi_buf),t.bi_buf=0,t.bi_valid=0},z=(t,e,a,i)=>{const n=2*e,s=2*a;return t[n]<t[s]||t[n]===t[s]&&i[e]<=i[a]},A=(t,e,a)=>{const i=t.heap[a];let n=a<<1;for(;n<=t.heap_len&&(n<t.heap_len&&z(e,t.heap[n+1],t.heap[n],t.depth)&&n++,!z(e,i,t.heap[n],t.depth));)t.heap[a]=t.heap[n],a=n,n<<=1;t.heap[a]=i},E=(t,i,n)=>{let s,r,o,_,f=0;if(0!==t.sym_next)do{s=255&t.pending_buf[t.sym_buf+f++],s+=(255&t.pending_buf[t.sym_buf+f++])<<8,r=t.pending_buf[t.sym_buf+f++],0===s?p(t,r,i):(o=l[r],p(t,o+256+1,i),_=e[o],0!==_&&(r-=h[o],g(t,r,_)),s--,o=m(s),p(t,o,n),_=a[o],0!==_&&(s-=d[o],g(t,s,_)))}while(f<t.sym_next);p(t,256,i)},R=(t,e)=>{const a=e.dyn_tree,i=e.stat_desc.static_tree,n=e.stat_desc.has_stree,s=e.stat_desc.elems;let r,o,l,h=-1;for(t.heap_len=0,t.heap_max=573,r=0;r<s;r++)0!==a[2*r]?(t.heap[++t.heap_len]=h=r,t.depth[r]=0):a[2*r+1]=0;for(;t.heap_len<2;)l=t.heap[++t.heap_len]=h<2?++h:0,a[2*l]=1,t.depth[l]=0,t.opt_len--,n&&(t.static_len-=i[2*l+1]);for(e.max_code=h,r=t.heap_len>>1;r>=1;r--)A(t,a,r);l=s;do{r=t.heap[1],t.heap[1]=t.heap[t.heap_len--],A(t,a,1),o=t.heap[1],t.heap[--t.heap_max]=r,t.heap[--t.heap_max]=o,a[2*l]=a[2*r]+a[2*o],t.depth[l]=(t.depth[r]>=t.depth[o]?t.depth[r]:t.depth[o])+1,a[2*r+1]=a[2*o+1]=l,t.heap[1]=l++,A(t,a,1)}while(t.heap_len>=2);t.heap[--t.heap_max]=t.heap[1],((t,e)=>{const a=e.dyn_tree,i=e.max_code,n=e.stat_desc.static_tree,s=e.stat_desc.has_stree,r=e.stat_desc.extra_bits,o=e.stat_desc.extra_base,l=e.stat_desc.max_length;let h,d,_,f,c,u,w=0;for(f=0;f<=15;f++)t.bl_count[f]=0;for(a[2*t.heap[t.heap_max]+1]=0,h=t.heap_max+1;h<573;h++)d=t.heap[h],f=a[2*a[2*d+1]+1]+1,f>l&&(f=l,w++),a[2*d+1]=f,d>i||(t.bl_count[f]++,c=0,d>=o&&(c=r[d-o]),u=a[2*d],t.opt_len+=u*(f+c),s&&(t.static_len+=u*(n[2*d+1]+c)));if(0!==w){do{for(f=l-1;0===t.bl_count[f];)f--;t.bl_count[f]--,t.bl_count[f+1]+=2,t.bl_count[l]--,w-=2}while(w>0);for(f=l;0!==f;f--)for(d=t.bl_count[f];0!==d;)_=t.heap[--h],_>i||(a[2*_+1]!==f&&(t.opt_len+=(f-a[2*_+1])*a[2*_],a[2*_+1]=f),d--)}})(t,e),v(a,h,t.bl_count)},Z=(t,e,a)=>{let i,n,s=-1,r=e[1],o=0,l=7,h=4;for(0===r&&(l=138,h=3),e[2*(a+1)+1]=65535,i=0;i<=a;i++)n=r,r=e[2*(i+1)+1],++o<l&&n===r||(o<h?t.bl_tree[2*n]+=o:0!==n?(n!==s&&t.bl_tree[2*n]++,t.bl_tree[32]++):o<=10?t.bl_tree[34]++:t.bl_tree[36]++,o=0,s=n,0===r?(l=138,h=3):n===r?(l=6,h=3):(l=7,h=4))},U=(t,e,a)=>{let i,n,s=-1,r=e[1],o=0,l=7,h=4;for(0===r&&(l=138,h=3),i=0;i<=a;i++)if(n=r,r=e[2*(i+1)+1],!(++o<l&&n===r)){if(o<h)do{p(t,n,t.bl_tree)}while(0!=--o);else 0!==n?(n!==s&&(p(t,n,t.bl_tree),o--),p(t,16,t.bl_tree),g(t,o-3,2)):o<=10?(p(t,17,t.bl_tree),g(t,o-3,3)):(p(t,18,t.bl_tree),g(t,o-11,7));o=0,s=n,0===r?(l=138,h=3):n===r?(l=6,h=3):(l=7,h=4)}};let S=!1;const D=(t,e,a,i)=>{g(t,0+(i?1:0),3),x(t),b(t,a),b(t,~a),a&&t.pending_buf.set(t.window.subarray(e,e+a),t.pending),t.pending+=a};var T=(t,e,a,i)=>{let o,l,h=0;t.level>0?(2===t.strm.data_type&&(t.strm.data_type=(t=>{let e,a=4093624447;for(e=0;e<=31;e++,a>>>=1)if(1&a&&0!==t.dyn_ltree[2*e])return 0;if(0!==t.dyn_ltree[18]||0!==t.dyn_ltree[20]||0!==t.dyn_ltree[26])return 1;for(e=32;e<256;e++)if(0!==t.dyn_ltree[2*e])return 1;return 0})(t)),R(t,t.l_desc),R(t,t.d_desc),h=(t=>{let e;for(Z(t,t.dyn_ltree,t.l_desc.max_code),Z(t,t.dyn_dtree,t.d_desc.max_code),R(t,t.bl_desc),e=18;e>=3&&0===t.bl_tree[2*n[e]+1];e--);return t.opt_len+=3*(e+1)+5+5+4,e})(t),o=t.opt_len+3+7>>>3,l=t.static_len+3+7>>>3,l<=o&&(o=l)):o=l=a+5,a+4<=o&&-1!==e?D(t,e,a,i):4===t.strategy||l===o?(g(t,2+(i?1:0),3),E(t,s,r)):(g(t,4+(i?1:0),3),((t,e,a,i)=>{let s;for(g(t,e-257,5),g(t,a-1,5),g(t,i-4,4),s=0;s<i;s++)g(t,t.bl_tree[2*n[s]+1],3);U(t,t.dyn_ltree,e-1),U(t,t.dyn_dtree,a-1)})(t,t.l_desc.max_code+1,t.d_desc.max_code+1,h+1),E(t,t.dyn_ltree,t.dyn_dtree)),y(t),i&&x(t)},O={_tr_init:t=>{S||((()=>{let t,n,w,m,b;const g=new Array(16);for(w=0,m=0;m<28;m++)for(h[m]=w,t=0;t<1<<e[m];t++)l[w++]=m;for(l[w-1]=m,b=0,m=0;m<16;m++)for(d[m]=b,t=0;t<1<<a[m];t++)o[b++]=m;for(b>>=7;m<30;m++)for(d[m]=b<<7,t=0;t<1<<a[m]-7;t++)o[256+b++]=m;for(n=0;n<=15;n++)g[n]=0;for(t=0;t<=143;)s[2*t+1]=8,t++,g[8]++;for(;t<=255;)s[2*t+1]=9,t++,g[9]++;for(;t<=279;)s[2*t+1]=7,t++,g[7]++;for(;t<=287;)s[2*t+1]=8,t++,g[8]++;for(v(s,287,g),t=0;t<30;t++)r[2*t+1]=5,r[2*t]=k(t,5);f=new _(s,e,257,286,15),c=new _(r,a,0,30,15),u=new _(new Array(0),i,0,19,7)})(),S=!0),t.l_desc=new w(t.dyn_ltree,f),t.d_desc=new w(t.dyn_dtree,c),t.bl_desc=new w(t.bl_tree,u),t.bi_buf=0,t.bi_valid=0,y(t)},_tr_stored_block:D,_tr_flush_block:T,_tr_tally:(t,e,a)=>(t.pending_buf[t.sym_buf+t.sym_next++]=e,t.pending_buf[t.sym_buf+t.sym_next++]=e>>8,t.pending_buf[t.sym_buf+t.sym_next++]=a,0===e?t.dyn_ltree[2*a]++:(t.matches++,e--,t.dyn_ltree[2*(l[a]+256+1)]++,t.dyn_dtree[2*m(e)]++),t.sym_next===t.sym_end),_tr_align:t=>{g(t,2,3),p(t,256,s),(t=>{16===t.bi_valid?(b(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):t.bi_valid>=8&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8)})(t)}};var F=(t,e,a,i)=>{let n=65535&t|0,s=t>>>16&65535|0,r=0;for(;0!==a;){r=a>2e3?2e3:a,a-=r;do{n=n+e[i++]|0,s=s+n|0}while(--r);n%=65521,s%=65521}return n|s<<16|0};const L=new Uint32Array((()=>{let t,e=[];for(var a=0;a<256;a++){t=a;for(var i=0;i<8;i++)t=1&t?3988292384^t>>>1:t>>>1;e[a]=t}return e})());var N=(t,e,a,i)=>{const n=L,s=i+a;t^=-1;for(let a=i;a<s;a++)t=t>>>8^n[255&(t^e[a])];return-1^t},I={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"},B={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_MEM_ERROR:-4,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8};const{_tr_init:C,_tr_stored_block:H,_tr_flush_block:M,_tr_tally:j,_tr_align:K}=O,{Z_NO_FLUSH:P,Z_PARTIAL_FLUSH:Y,Z_FULL_FLUSH:G,Z_FINISH:X,Z_BLOCK:W,Z_OK:q,Z_STREAM_END:J,Z_STREAM_ERROR:Q,Z_DATA_ERROR:V,Z_BUF_ERROR:$,Z_DEFAULT_COMPRESSION:tt,Z_FILTERED:et,Z_HUFFMAN_ONLY:at,Z_RLE:it,Z_FIXED:nt,Z_DEFAULT_STRATEGY:st,Z_UNKNOWN:rt,Z_DEFLATED:ot}=B,lt=(t,e)=>(t.msg=I[e],e),ht=t=>2*t-(t>4?9:0),dt=t=>{let e=t.length;for(;--e>=0;)t[e]=0},_t=t=>{let e,a,i,n=t.w_size;e=t.hash_size,i=e;do{a=t.head[--i],t.head[i]=a>=n?a-n:0}while(--e);e=n,i=e;do{a=t.prev[--i],t.prev[i]=a>=n?a-n:0}while(--e)};let ft=(t,e,a)=>(e<<t.hash_shift^a)&t.hash_mask;const ct=t=>{const e=t.state;let a=e.pending;a>t.avail_out&&(a=t.avail_out),0!==a&&(t.output.set(e.pending_buf.subarray(e.pending_out,e.pending_out+a),t.next_out),t.next_out+=a,e.pending_out+=a,t.total_out+=a,t.avail_out-=a,e.pending-=a,0===e.pending&&(e.pending_out=0))},ut=(t,e)=>{M(t,t.block_start>=0?t.block_start:-1,t.strstart-t.block_start,e),t.block_start=t.strstart,ct(t.strm)},wt=(t,e)=>{t.pending_buf[t.pending++]=e},mt=(t,e)=>{t.pending_buf[t.pending++]=e>>>8&255,t.pending_buf[t.pending++]=255&e},bt=(t,e,a,i)=>{let n=t.avail_in;return n>i&&(n=i),0===n?0:(t.avail_in-=n,e.set(t.input.subarray(t.next_in,t.next_in+n),a),1===t.state.wrap?t.adler=F(t.adler,e,n,a):2===t.state.wrap&&(t.adler=N(t.adler,e,n,a)),t.next_in+=n,t.total_in+=n,n)},gt=(t,e)=>{let a,i,n=t.max_chain_length,s=t.strstart,r=t.prev_length,o=t.nice_match;const l=t.strstart>t.w_size-262?t.strstart-(t.w_size-262):0,h=t.window,d=t.w_mask,_=t.prev,f=t.strstart+258;let c=h[s+r-1],u=h[s+r];t.prev_length>=t.good_match&&(n>>=2),o>t.lookahead&&(o=t.lookahead);do{if(a=e,h[a+r]===u&&h[a+r-1]===c&&h[a]===h[s]&&h[++a]===h[s+1]){s+=2,a++;do{}while(h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&s<f);if(i=258-(f-s),s=f-258,i>r){if(t.match_start=e,r=i,i>=o)break;c=h[s+r-1],u=h[s+r]}}}while((e=_[e&d])>l&&0!=--n);return r<=t.lookahead?r:t.lookahead},pt=t=>{const e=t.w_size;let a,i,n;do{if(i=t.window_size-t.lookahead-t.strstart,t.strstart>=e+(e-262)&&(t.window.set(t.window.subarray(e,e+e-i),0),t.match_start-=e,t.strstart-=e,t.block_start-=e,t.insert>t.strstart&&(t.insert=t.strstart),_t(t),i+=e),0===t.strm.avail_in)break;if(a=bt(t.strm,t.window,t.strstart+t.lookahead,i),t.lookahead+=a,t.lookahead+t.insert>=3)for(n=t.strstart-t.insert,t.ins_h=t.window[n],t.ins_h=ft(t,t.ins_h,t.window[n+1]);t.insert&&(t.ins_h=ft(t,t.ins_h,t.window[n+3-1]),t.prev[n&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=n,n++,t.insert--,!(t.lookahead+t.insert<3)););}while(t.lookahead<262&&0!==t.strm.avail_in)},kt=(t,e)=>{let a,i,n,s=t.pending_buf_size-5>t.w_size?t.w_size:t.pending_buf_size-5,r=0,o=t.strm.avail_in;do{if(a=65535,n=t.bi_valid+42>>3,t.strm.avail_out<n)break;if(n=t.strm.avail_out-n,i=t.strstart-t.block_start,a>i+t.strm.avail_in&&(a=i+t.strm.avail_in),a>n&&(a=n),a<s&&(0===a&&e!==X||e===P||a!==i+t.strm.avail_in))break;r=e===X&&a===i+t.strm.avail_in?1:0,H(t,0,0,r),t.pending_buf[t.pending-4]=a,t.pending_buf[t.pending-3]=a>>8,t.pending_buf[t.pending-2]=~a,t.pending_buf[t.pending-1]=~a>>8,ct(t.strm),i&&(i>a&&(i=a),t.strm.output.set(t.window.subarray(t.block_start,t.block_start+i),t.strm.next_out),t.strm.next_out+=i,t.strm.avail_out-=i,t.strm.total_out+=i,t.block_start+=i,a-=i),a&&(bt(t.strm,t.strm.output,t.strm.next_out,a),t.strm.next_out+=a,t.strm.avail_out-=a,t.strm.total_out+=a)}while(0===r);return o-=t.strm.avail_in,o&&(o>=t.w_size?(t.matches=2,t.window.set(t.strm.input.subarray(t.strm.next_in-t.w_size,t.strm.next_in),0),t.strstart=t.w_size,t.insert=t.strstart):(t.window_size-t.strstart<=o&&(t.strstart-=t.w_size,t.window.set(t.window.subarray(t.w_size,t.w_size+t.strstart),0),t.matches<2&&t.matches++,t.insert>t.strstart&&(t.insert=t.strstart)),t.window.set(t.strm.input.subarray(t.strm.next_in-o,t.strm.next_in),t.strstart),t.strstart+=o,t.insert+=o>t.w_size-t.insert?t.w_size-t.insert:o),t.block_start=t.strstart),t.high_water<t.strstart&&(t.high_water=t.strstart),r?4:e!==P&&e!==X&&0===t.strm.avail_in&&t.strstart===t.block_start?2:(n=t.window_size-t.strstart,t.strm.avail_in>n&&t.block_start>=t.w_size&&(t.block_start-=t.w_size,t.strstart-=t.w_size,t.window.set(t.window.subarray(t.w_size,t.w_size+t.strstart),0),t.matches<2&&t.matches++,n+=t.w_size,t.insert>t.strstart&&(t.insert=t.strstart)),n>t.strm.avail_in&&(n=t.strm.avail_in),n&&(bt(t.strm,t.window,t.strstart,n),t.strstart+=n,t.insert+=n>t.w_size-t.insert?t.w_size-t.insert:n),t.high_water<t.strstart&&(t.high_water=t.strstart),n=t.bi_valid+42>>3,n=t.pending_buf_size-n>65535?65535:t.pending_buf_size-n,s=n>t.w_size?t.w_size:n,i=t.strstart-t.block_start,(i>=s||(i||e===X)&&e!==P&&0===t.strm.avail_in&&i<=n)&&(a=i>n?n:i,r=e===X&&0===t.strm.avail_in&&a===i?1:0,H(t,t.block_start,a,r),t.block_start+=a,ct(t.strm)),r?3:1)},vt=(t,e)=>{let a,i;for(;;){if(t.lookahead<262){if(pt(t),t.lookahead<262&&e===P)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=ft(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!==a&&t.strstart-a<=t.w_size-262&&(t.match_length=gt(t,a)),t.match_length>=3)if(i=j(t,t.strstart-t.match_start,t.match_length-3),t.lookahead-=t.match_length,t.match_length<=t.max_lazy_match&&t.lookahead>=3){t.match_length--;do{t.strstart++,t.ins_h=ft(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart}while(0!=--t.match_length);t.strstart++}else t.strstart+=t.match_length,t.match_length=0,t.ins_h=t.window[t.strstart],t.ins_h=ft(t,t.ins_h,t.window[t.strstart+1]);else i=j(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++;if(i&&(ut(t,!1),0===t.strm.avail_out))return 1}return t.insert=t.strstart<2?t.strstart:2,e===X?(ut(t,!0),0===t.strm.avail_out?3:4):t.sym_next&&(ut(t,!1),0===t.strm.avail_out)?1:2},yt=(t,e)=>{let a,i,n;for(;;){if(t.lookahead<262){if(pt(t),t.lookahead<262&&e===P)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=ft(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),t.prev_length=t.match_length,t.prev_match=t.match_start,t.match_length=2,0!==a&&t.prev_length<t.max_lazy_match&&t.strstart-a<=t.w_size-262&&(t.match_length=gt(t,a),t.match_length<=5&&(t.strategy===et||3===t.match_length&&t.strstart-t.match_start>4096)&&(t.match_length=2)),t.prev_length>=3&&t.match_length<=t.prev_length){n=t.strstart+t.lookahead-3,i=j(t,t.strstart-1-t.prev_match,t.prev_length-3),t.lookahead-=t.prev_length-1,t.prev_length-=2;do{++t.strstart<=n&&(t.ins_h=ft(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart)}while(0!=--t.prev_length);if(t.match_available=0,t.match_length=2,t.strstart++,i&&(ut(t,!1),0===t.strm.avail_out))return 1}else if(t.match_available){if(i=j(t,0,t.window[t.strstart-1]),i&&ut(t,!1),t.strstart++,t.lookahead--,0===t.strm.avail_out)return 1}else t.match_available=1,t.strstart++,t.lookahead--}return t.match_available&&(i=j(t,0,t.window[t.strstart-1]),t.match_available=0),t.insert=t.strstart<2?t.strstart:2,e===X?(ut(t,!0),0===t.strm.avail_out?3:4):t.sym_next&&(ut(t,!1),0===t.strm.avail_out)?1:2};function xt(t,e,a,i,n){this.good_length=t,this.max_lazy=e,this.nice_length=a,this.max_chain=i,this.func=n}const zt=[new xt(0,0,0,0,kt),new xt(4,4,8,4,vt),new xt(4,5,16,8,vt),new xt(4,6,32,32,vt),new xt(4,4,16,16,yt),new xt(8,16,32,32,yt),new xt(8,16,128,128,yt),new xt(8,32,128,256,yt),new xt(32,128,258,1024,yt),new xt(32,258,258,4096,yt)];function At(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=ot,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new Uint16Array(1146),this.dyn_dtree=new Uint16Array(122),this.bl_tree=new Uint16Array(78),dt(this.dyn_ltree),dt(this.dyn_dtree),dt(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new Uint16Array(16),this.heap=new Uint16Array(573),dt(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new Uint16Array(573),dt(this.depth),this.sym_buf=0,this.lit_bufsize=0,this.sym_next=0,this.sym_end=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}const Et=t=>{if(!t)return 1;const e=t.state;return!e||e.strm!==t||42!==e.status&&57!==e.status&&69!==e.status&&73!==e.status&&91!==e.status&&103!==e.status&&113!==e.status&&666!==e.status?1:0},Rt=t=>{if(Et(t))return lt(t,Q);t.total_in=t.total_out=0,t.data_type=rt;const e=t.state;return e.pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=2===e.wrap?57:e.wrap?42:113,t.adler=2===e.wrap?0:1,e.last_flush=-2,C(e),q},Zt=t=>{const e=Rt(t);var a;return e===q&&((a=t.state).window_size=2*a.w_size,dt(a.head),a.max_lazy_match=zt[a.level].max_lazy,a.good_match=zt[a.level].good_length,a.nice_match=zt[a.level].nice_length,a.max_chain_length=zt[a.level].max_chain,a.strstart=0,a.block_start=0,a.lookahead=0,a.insert=0,a.match_length=a.prev_length=2,a.match_available=0,a.ins_h=0),e},Ut=(t,e,a,i,n,s)=>{if(!t)return Q;let r=1;if(e===tt&&(e=6),i<0?(r=0,i=-i):i>15&&(r=2,i-=16),n<1||n>9||a!==ot||i<8||i>15||e<0||e>9||s<0||s>nt||8===i&&1!==r)return lt(t,Q);8===i&&(i=9);const o=new At;return t.state=o,o.strm=t,o.status=42,o.wrap=r,o.gzhead=null,o.w_bits=i,o.w_size=1<<o.w_bits,o.w_mask=o.w_size-1,o.hash_bits=n+7,o.hash_size=1<<o.hash_bits,o.hash_mask=o.hash_size-1,o.hash_shift=~~((o.hash_bits+3-1)/3),o.window=new Uint8Array(2*o.w_size),o.head=new Uint16Array(o.hash_size),o.prev=new Uint16Array(o.w_size),o.lit_bufsize=1<<n+6,o.pending_buf_size=4*o.lit_bufsize,o.pending_buf=new Uint8Array(o.pending_buf_size),o.sym_buf=o.lit_bufsize,o.sym_end=3*(o.lit_bufsize-1),o.level=e,o.strategy=s,o.method=a,Zt(t)};var St={deflateInit:(t,e)=>Ut(t,e,ot,15,8,st),deflateInit2:Ut,deflateReset:Zt,deflateResetKeep:Rt,deflateSetHeader:(t,e)=>Et(t)||2!==t.state.wrap?Q:(t.state.gzhead=e,q),deflate:(t,e)=>{if(Et(t)||e>W||e<0)return t?lt(t,Q):Q;const a=t.state;if(!t.output||0!==t.avail_in&&!t.input||666===a.status&&e!==X)return lt(t,0===t.avail_out?$:Q);const i=a.last_flush;if(a.last_flush=e,0!==a.pending){if(ct(t),0===t.avail_out)return a.last_flush=-1,q}else if(0===t.avail_in&&ht(e)<=ht(i)&&e!==X)return lt(t,$);if(666===a.status&&0!==t.avail_in)return lt(t,$);if(42===a.status&&0===a.wrap&&(a.status=113),42===a.status){let e=ot+(a.w_bits-8<<4)<<8,i=-1;if(i=a.strategy>=at||a.level<2?0:a.level<6?1:6===a.level?2:3,e|=i<<6,0!==a.strstart&&(e|=32),e+=31-e%31,mt(a,e),0!==a.strstart&&(mt(a,t.adler>>>16),mt(a,65535&t.adler)),t.adler=1,a.status=113,ct(t),0!==a.pending)return a.last_flush=-1,q}if(57===a.status)if(t.adler=0,wt(a,31),wt(a,139),wt(a,8),a.gzhead)wt(a,(a.gzhead.text?1:0)+(a.gzhead.hcrc?2:0)+(a.gzhead.extra?4:0)+(a.gzhead.name?8:0)+(a.gzhead.comment?16:0)),wt(a,255&a.gzhead.time),wt(a,a.gzhead.time>>8&255),wt(a,a.gzhead.time>>16&255),wt(a,a.gzhead.time>>24&255),wt(a,9===a.level?2:a.strategy>=at||a.level<2?4:0),wt(a,255&a.gzhead.os),a.gzhead.extra&&a.gzhead.extra.length&&(wt(a,255&a.gzhead.extra.length),wt(a,a.gzhead.extra.length>>8&255)),a.gzhead.hcrc&&(t.adler=N(t.adler,a.pending_buf,a.pending,0)),a.gzindex=0,a.status=69;else if(wt(a,0),wt(a,0),wt(a,0),wt(a,0),wt(a,0),wt(a,9===a.level?2:a.strategy>=at||a.level<2?4:0),wt(a,3),a.status=113,ct(t),0!==a.pending)return a.last_flush=-1,q;if(69===a.status){if(a.gzhead.extra){let e=a.pending,i=(65535&a.gzhead.extra.length)-a.gzindex;for(;a.pending+i>a.pending_buf_size;){let n=a.pending_buf_size-a.pending;if(a.pending_buf.set(a.gzhead.extra.subarray(a.gzindex,a.gzindex+n),a.pending),a.pending=a.pending_buf_size,a.gzhead.hcrc&&a.pending>e&&(t.adler=N(t.adler,a.pending_buf,a.pending-e,e)),a.gzindex+=n,ct(t),0!==a.pending)return a.last_flush=-1,q;e=0,i-=n}let n=new Uint8Array(a.gzhead.extra);a.pending_buf.set(n.subarray(a.gzindex,a.gzindex+i),a.pending),a.pending+=i,a.gzhead.hcrc&&a.pending>e&&(t.adler=N(t.adler,a.pending_buf,a.pending-e,e)),a.gzindex=0}a.status=73}if(73===a.status){if(a.gzhead.name){let e,i=a.pending;do{if(a.pending===a.pending_buf_size){if(a.gzhead.hcrc&&a.pending>i&&(t.adler=N(t.adler,a.pending_buf,a.pending-i,i)),ct(t),0!==a.pending)return a.last_flush=-1,q;i=0}e=a.gzindex<a.gzhead.name.length?255&a.gzhead.name.charCodeAt(a.gzindex++):0,wt(a,e)}while(0!==e);a.gzhead.hcrc&&a.pending>i&&(t.adler=N(t.adler,a.pending_buf,a.pending-i,i)),a.gzindex=0}a.status=91}if(91===a.status){if(a.gzhead.comment){let e,i=a.pending;do{if(a.pending===a.pending_buf_size){if(a.gzhead.hcrc&&a.pending>i&&(t.adler=N(t.adler,a.pending_buf,a.pending-i,i)),ct(t),0!==a.pending)return a.last_flush=-1,q;i=0}e=a.gzindex<a.gzhead.comment.length?255&a.gzhead.comment.charCodeAt(a.gzindex++):0,wt(a,e)}while(0!==e);a.gzhead.hcrc&&a.pending>i&&(t.adler=N(t.adler,a.pending_buf,a.pending-i,i))}a.status=103}if(103===a.status){if(a.gzhead.hcrc){if(a.pending+2>a.pending_buf_size&&(ct(t),0!==a.pending))return a.last_flush=-1,q;wt(a,255&t.adler),wt(a,t.adler>>8&255),t.adler=0}if(a.status=113,ct(t),0!==a.pending)return a.last_flush=-1,q}if(0!==t.avail_in||0!==a.lookahead||e!==P&&666!==a.status){let i=0===a.level?kt(a,e):a.strategy===at?((t,e)=>{let a;for(;;){if(0===t.lookahead&&(pt(t),0===t.lookahead)){if(e===P)return 1;break}if(t.match_length=0,a=j(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++,a&&(ut(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===X?(ut(t,!0),0===t.strm.avail_out?3:4):t.sym_next&&(ut(t,!1),0===t.strm.avail_out)?1:2})(a,e):a.strategy===it?((t,e)=>{let a,i,n,s;const r=t.window;for(;;){if(t.lookahead<=258){if(pt(t),t.lookahead<=258&&e===P)return 1;if(0===t.lookahead)break}if(t.match_length=0,t.lookahead>=3&&t.strstart>0&&(n=t.strstart-1,i=r[n],i===r[++n]&&i===r[++n]&&i===r[++n])){s=t.strstart+258;do{}while(i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&n<s);t.match_length=258-(s-n),t.match_length>t.lookahead&&(t.match_length=t.lookahead)}if(t.match_length>=3?(a=j(t,1,t.match_length-3),t.lookahead-=t.match_length,t.strstart+=t.match_length,t.match_length=0):(a=j(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++),a&&(ut(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===X?(ut(t,!0),0===t.strm.avail_out?3:4):t.sym_next&&(ut(t,!1),0===t.strm.avail_out)?1:2})(a,e):zt[a.level].func(a,e);if(3!==i&&4!==i||(a.status=666),1===i||3===i)return 0===t.avail_out&&(a.last_flush=-1),q;if(2===i&&(e===Y?K(a):e!==W&&(H(a,0,0,!1),e===G&&(dt(a.head),0===a.lookahead&&(a.strstart=0,a.block_start=0,a.insert=0))),ct(t),0===t.avail_out))return a.last_flush=-1,q}return e!==X?q:a.wrap<=0?J:(2===a.wrap?(wt(a,255&t.adler),wt(a,t.adler>>8&255),wt(a,t.adler>>16&255),wt(a,t.adler>>24&255),wt(a,255&t.total_in),wt(a,t.total_in>>8&255),wt(a,t.total_in>>16&255),wt(a,t.total_in>>24&255)):(mt(a,t.adler>>>16),mt(a,65535&t.adler)),ct(t),a.wrap>0&&(a.wrap=-a.wrap),0!==a.pending?q:J)},deflateEnd:t=>{if(Et(t))return Q;const e=t.state.status;return t.state=null,113===e?lt(t,V):q},deflateSetDictionary:(t,e)=>{let a=e.length;if(Et(t))return Q;const i=t.state,n=i.wrap;if(2===n||1===n&&42!==i.status||i.lookahead)return Q;if(1===n&&(t.adler=F(t.adler,e,a,0)),i.wrap=0,a>=i.w_size){0===n&&(dt(i.head),i.strstart=0,i.block_start=0,i.insert=0);let t=new Uint8Array(i.w_size);t.set(e.subarray(a-i.w_size,a),0),e=t,a=i.w_size}const s=t.avail_in,r=t.next_in,o=t.input;for(t.avail_in=a,t.next_in=0,t.input=e,pt(i);i.lookahead>=3;){let t=i.strstart,e=i.lookahead-2;do{i.ins_h=ft(i,i.ins_h,i.window[t+3-1]),i.prev[t&i.w_mask]=i.head[i.ins_h],i.head[i.ins_h]=t,t++}while(--e);i.strstart=t,i.lookahead=2,pt(i)}return i.strstart+=i.lookahead,i.block_start=i.strstart,i.insert=i.lookahead,i.lookahead=0,i.match_length=i.prev_length=2,i.match_available=0,t.next_in=r,t.input=o,t.avail_in=s,i.wrap=n,q},deflateInfo:"pako deflate (from Nodeca project)"};const Dt=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var Tt=function(t){const e=Array.prototype.slice.call(arguments,1);for(;e.length;){const a=e.shift();if(a){if("object"!=typeof a)throw new TypeError(a+"must be non-object");for(const e in a)Dt(a,e)&&(t[e]=a[e])}}return t},Ot=t=>{let e=0;for(let a=0,i=t.length;a<i;a++)e+=t[a].length;const a=new Uint8Array(e);for(let e=0,i=0,n=t.length;e<n;e++){let n=t[e];a.set(n,i),i+=n.length}return a};let Ft=!0;try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(t){Ft=!1}const Lt=new Uint8Array(256);for(let t=0;t<256;t++)Lt[t]=t>=252?6:t>=248?5:t>=240?4:t>=224?3:t>=192?2:1;Lt[254]=Lt[254]=1;var Nt=t=>{if("function"==typeof TextEncoder&&TextEncoder.prototype.encode)return(new TextEncoder).encode(t);let e,a,i,n,s,r=t.length,o=0;for(n=0;n<r;n++)a=t.charCodeAt(n),55296==(64512&a)&&n+1<r&&(i=t.charCodeAt(n+1),56320==(64512&i)&&(a=65536+(a-55296<<10)+(i-56320),n++)),o+=a<128?1:a<2048?2:a<65536?3:4;for(e=new Uint8Array(o),s=0,n=0;s<o;n++)a=t.charCodeAt(n),55296==(64512&a)&&n+1<r&&(i=t.charCodeAt(n+1),56320==(64512&i)&&(a=65536+(a-55296<<10)+(i-56320),n++)),a<128?e[s++]=a:a<2048?(e[s++]=192|a>>>6,e[s++]=128|63&a):a<65536?(e[s++]=224|a>>>12,e[s++]=128|a>>>6&63,e[s++]=128|63&a):(e[s++]=240|a>>>18,e[s++]=128|a>>>12&63,e[s++]=128|a>>>6&63,e[s++]=128|63&a);return e},It=(t,e)=>{const a=e||t.length;if("function"==typeof TextDecoder&&TextDecoder.prototype.decode)return(new TextDecoder).decode(t.subarray(0,e));let i,n;const s=new Array(2*a);for(n=0,i=0;i<a;){let e=t[i++];if(e<128){s[n++]=e;continue}let r=Lt[e];if(r>4)s[n++]=65533,i+=r-1;else{for(e&=2===r?31:3===r?15:7;r>1&&i<a;)e=e<<6|63&t[i++],r--;r>1?s[n++]=65533:e<65536?s[n++]=e:(e-=65536,s[n++]=55296|e>>10&1023,s[n++]=56320|1023&e)}}return((t,e)=>{if(e<65534&&t.subarray&&Ft)return String.fromCharCode.apply(null,t.length===e?t:t.subarray(0,e));let a="";for(let i=0;i<e;i++)a+=String.fromCharCode(t[i]);return a})(s,n)},Bt=(t,e)=>{(e=e||t.length)>t.length&&(e=t.length);let a=e-1;for(;a>=0&&128==(192&t[a]);)a--;return a<0||0===a?e:a+Lt[t[a]]>e?a:e};var Ct=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0};const Ht=Object.prototype.toString,{Z_NO_FLUSH:Mt,Z_SYNC_FLUSH:jt,Z_FULL_FLUSH:Kt,Z_FINISH:Pt,Z_OK:Yt,Z_STREAM_END:Gt,Z_DEFAULT_COMPRESSION:Xt,Z_DEFAULT_STRATEGY:Wt,Z_DEFLATED:qt}=B;function Jt(t){this.options=Tt({level:Xt,method:qt,chunkSize:16384,windowBits:15,memLevel:8,strategy:Wt},t||{});let e=this.options;e.raw&&e.windowBits>0?e.windowBits=-e.windowBits:e.gzip&&e.windowBits>0&&e.windowBits<16&&(e.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new Ct,this.strm.avail_out=0;let a=St.deflateInit2(this.strm,e.level,e.method,e.windowBits,e.memLevel,e.strategy);if(a!==Yt)throw new Error(I[a]);if(e.header&&St.deflateSetHeader(this.strm,e.header),e.dictionary){let t;if(t="string"==typeof e.dictionary?Nt(e.dictionary):"[object ArrayBuffer]"===Ht.call(e.dictionary)?new Uint8Array(e.dictionary):e.dictionary,a=St.deflateSetDictionary(this.strm,t),a!==Yt)throw new Error(I[a]);this._dict_set=!0}}function Qt(t,e){const a=new Jt(e);if(a.push(t,!0),a.err)throw a.msg||I[a.err];return a.result}Jt.prototype.push=function(t,e){const a=this.strm,i=this.options.chunkSize;let n,s;if(this.ended)return!1;for(s=e===~~e?e:!0===e?Pt:Mt,"string"==typeof t?a.input=Nt(t):"[object ArrayBuffer]"===Ht.call(t)?a.input=new Uint8Array(t):a.input=t,a.next_in=0,a.avail_in=a.input.length;;)if(0===a.avail_out&&(a.output=new Uint8Array(i),a.next_out=0,a.avail_out=i),(s===jt||s===Kt)&&a.avail_out<=6)this.onData(a.output.subarray(0,a.next_out)),a.avail_out=0;else{if(n=St.deflate(a,s),n===Gt)return a.next_out>0&&this.onData(a.output.subarray(0,a.next_out)),n=St.deflateEnd(this.strm),this.onEnd(n),this.ended=!0,n===Yt;if(0!==a.avail_out){if(s>0&&a.next_out>0)this.onData(a.output.subarray(0,a.next_out)),a.avail_out=0;else if(0===a.avail_in)break}else this.onData(a.output)}return!0},Jt.prototype.onData=function(t){this.chunks.push(t)},Jt.prototype.onEnd=function(t){t===Yt&&(this.result=Ot(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg};var Vt={Deflate:Jt,deflate:Qt,deflateRaw:function(t,e){return(e=e||{}).raw=!0,Qt(t,e)},gzip:function(t,e){return(e=e||{}).gzip=!0,Qt(t,e)},constants:B};var $t=function(t,e){let a,i,n,s,r,o,l,h,d,_,f,c,u,w,m,b,g,p,k,v,y,x,z,A;const E=t.state;a=t.next_in,z=t.input,i=a+(t.avail_in-5),n=t.next_out,A=t.output,s=n-(e-t.avail_out),r=n+(t.avail_out-257),o=E.dmax,l=E.wsize,h=E.whave,d=E.wnext,_=E.window,f=E.hold,c=E.bits,u=E.lencode,w=E.distcode,m=(1<<E.lenbits)-1,b=(1<<E.distbits)-1;t:do{c<15&&(f+=z[a++]<<c,c+=8,f+=z[a++]<<c,c+=8),g=u[f&m];e:for(;;){if(p=g>>>24,f>>>=p,c-=p,p=g>>>16&255,0===p)A[n++]=65535&g;else{if(!(16&p)){if(0==(64&p)){g=u[(65535&g)+(f&(1<<p)-1)];continue e}if(32&p){E.mode=16191;break t}t.msg="invalid literal/length code",E.mode=16209;break t}k=65535&g,p&=15,p&&(c<p&&(f+=z[a++]<<c,c+=8),k+=f&(1<<p)-1,f>>>=p,c-=p),c<15&&(f+=z[a++]<<c,c+=8,f+=z[a++]<<c,c+=8),g=w[f&b];a:for(;;){if(p=g>>>24,f>>>=p,c-=p,p=g>>>16&255,!(16&p)){if(0==(64&p)){g=w[(65535&g)+(f&(1<<p)-1)];continue a}t.msg="invalid distance code",E.mode=16209;break t}if(v=65535&g,p&=15,c<p&&(f+=z[a++]<<c,c+=8,c<p&&(f+=z[a++]<<c,c+=8)),v+=f&(1<<p)-1,v>o){t.msg="invalid distance too far back",E.mode=16209;break t}if(f>>>=p,c-=p,p=n-s,v>p){if(p=v-p,p>h&&E.sane){t.msg="invalid distance too far back",E.mode=16209;break t}if(y=0,x=_,0===d){if(y+=l-p,p<k){k-=p;do{A[n++]=_[y++]}while(--p);y=n-v,x=A}}else if(d<p){if(y+=l+d-p,p-=d,p<k){k-=p;do{A[n++]=_[y++]}while(--p);if(y=0,d<k){p=d,k-=p;do{A[n++]=_[y++]}while(--p);y=n-v,x=A}}}else if(y+=d-p,p<k){k-=p;do{A[n++]=_[y++]}while(--p);y=n-v,x=A}for(;k>2;)A[n++]=x[y++],A[n++]=x[y++],A[n++]=x[y++],k-=3;k&&(A[n++]=x[y++],k>1&&(A[n++]=x[y++]))}else{y=n-v;do{A[n++]=A[y++],A[n++]=A[y++],A[n++]=A[y++],k-=3}while(k>2);k&&(A[n++]=A[y++],k>1&&(A[n++]=A[y++]))}break}}break}}while(a<i&&n<r);k=c>>3,a-=k,c-=k<<3,f&=(1<<c)-1,t.next_in=a,t.next_out=n,t.avail_in=a<i?i-a+5:5-(a-i),t.avail_out=n<r?r-n+257:257-(n-r),E.hold=f,E.bits=c};const te=new Uint16Array([3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0]),ee=new Uint8Array([16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78]),ae=new Uint16Array([1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0]),ie=new Uint8Array([16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64]);var ne=(t,e,a,i,n,s,r,o)=>{const l=o.bits;let h,d,_,f,c,u,w=0,m=0,b=0,g=0,p=0,k=0,v=0,y=0,x=0,z=0,A=null;const E=new Uint16Array(16),R=new Uint16Array(16);let Z,U,S,D=null;for(w=0;w<=15;w++)E[w]=0;for(m=0;m<i;m++)E[e[a+m]]++;for(p=l,g=15;g>=1&&0===E[g];g--);if(p>g&&(p=g),0===g)return n[s++]=20971520,n[s++]=20971520,o.bits=1,0;for(b=1;b<g&&0===E[b];b++);for(p<b&&(p=b),y=1,w=1;w<=15;w++)if(y<<=1,y-=E[w],y<0)return-1;if(y>0&&(0===t||1!==g))return-1;for(R[1]=0,w=1;w<15;w++)R[w+1]=R[w]+E[w];for(m=0;m<i;m++)0!==e[a+m]&&(r[R[e[a+m]]++]=m);if(0===t?(A=D=r,u=20):1===t?(A=te,D=ee,u=257):(A=ae,D=ie,u=0),z=0,m=0,w=b,c=s,k=p,v=0,_=-1,x=1<<p,f=x-1,1===t&&x>852||2===t&&x>592)return 1;for(;;){Z=w-v,r[m]+1<u?(U=0,S=r[m]):r[m]>=u?(U=D[r[m]-u],S=A[r[m]-u]):(U=96,S=0),h=1<<w-v,d=1<<k,b=d;do{d-=h,n[c+(z>>v)+d]=Z<<24|U<<16|S|0}while(0!==d);for(h=1<<w-1;z&h;)h>>=1;if(0!==h?(z&=h-1,z+=h):z=0,m++,0==--E[w]){if(w===g)break;w=e[a+r[m]]}if(w>p&&(z&f)!==_){for(0===v&&(v=p),c+=b,k=w-v,y=1<<k;k+v<g&&(y-=E[k+v],!(y<=0));)k++,y<<=1;if(x+=1<<k,1===t&&x>852||2===t&&x>592)return 1;_=z&f,n[_]=p<<24|k<<16|c-s|0}}return 0!==z&&(n[c+z]=w-v<<24|64<<16|0),o.bits=p,0};const{Z_FINISH:se,Z_BLOCK:re,Z_TREES:oe,Z_OK:le,Z_STREAM_END:he,Z_NEED_DICT:de,Z_STREAM_ERROR:_e,Z_DATA_ERROR:fe,Z_MEM_ERROR:ce,Z_BUF_ERROR:ue,Z_DEFLATED:we}=B,me=16209,be=t=>(t>>>24&255)+(t>>>8&65280)+((65280&t)<<8)+((255&t)<<24);function ge(){this.strm=null,this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new Uint16Array(320),this.work=new Uint16Array(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}const pe=t=>{if(!t)return 1;const e=t.state;return!e||e.strm!==t||e.mode<16180||e.mode>16211?1:0},ke=t=>{if(pe(t))return _e;const e=t.state;return t.total_in=t.total_out=e.total=0,t.msg="",e.wrap&&(t.adler=1&e.wrap),e.mode=16180,e.last=0,e.havedict=0,e.flags=-1,e.dmax=32768,e.head=null,e.hold=0,e.bits=0,e.lencode=e.lendyn=new Int32Array(852),e.distcode=e.distdyn=new Int32Array(592),e.sane=1,e.back=-1,le},ve=t=>{if(pe(t))return _e;const e=t.state;return e.wsize=0,e.whave=0,e.wnext=0,ke(t)},ye=(t,e)=>{let a;if(pe(t))return _e;const i=t.state;return e<0?(a=0,e=-e):(a=5+(e>>4),e<48&&(e&=15)),e&&(e<8||e>15)?_e:(null!==i.window&&i.wbits!==e&&(i.window=null),i.wrap=a,i.wbits=e,ve(t))},xe=(t,e)=>{if(!t)return _e;const a=new ge;t.state=a,a.strm=t,a.window=null,a.mode=16180;const i=ye(t,e);return i!==le&&(t.state=null),i};let ze,Ae,Ee=!0;const Re=t=>{if(Ee){ze=new Int32Array(512),Ae=new Int32Array(32);let e=0;for(;e<144;)t.lens[e++]=8;for(;e<256;)t.lens[e++]=9;for(;e<280;)t.lens[e++]=7;for(;e<288;)t.lens[e++]=8;for(ne(1,t.lens,0,288,ze,0,t.work,{bits:9}),e=0;e<32;)t.lens[e++]=5;ne(2,t.lens,0,32,Ae,0,t.work,{bits:5}),Ee=!1}t.lencode=ze,t.lenbits=9,t.distcode=Ae,t.distbits=5},Ze=(t,e,a,i)=>{let n;const s=t.state;return null===s.window&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new Uint8Array(s.wsize)),i>=s.wsize?(s.window.set(e.subarray(a-s.wsize,a),0),s.wnext=0,s.whave=s.wsize):(n=s.wsize-s.wnext,n>i&&(n=i),s.window.set(e.subarray(a-i,a-i+n),s.wnext),(i-=n)?(s.window.set(e.subarray(a-i,a),0),s.wnext=i,s.whave=s.wsize):(s.wnext+=n,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=n))),0};var Ue={inflateReset:ve,inflateReset2:ye,inflateResetKeep:ke,inflateInit:t=>xe(t,15),inflateInit2:xe,inflate:(t,e)=>{let a,i,n,s,r,o,l,h,d,_,f,c,u,w,m,b,g,p,k,v,y,x,z=0;const A=new Uint8Array(4);let E,R;const Z=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]);if(pe(t)||!t.output||!t.input&&0!==t.avail_in)return _e;a=t.state,16191===a.mode&&(a.mode=16192),r=t.next_out,n=t.output,l=t.avail_out,s=t.next_in,i=t.input,o=t.avail_in,h=a.hold,d=a.bits,_=o,f=l,x=le;t:for(;;)switch(a.mode){case 16180:if(0===a.wrap){a.mode=16192;break}for(;d<16;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(2&a.wrap&&35615===h){0===a.wbits&&(a.wbits=15),a.check=0,A[0]=255&h,A[1]=h>>>8&255,a.check=N(a.check,A,2,0),h=0,d=0,a.mode=16181;break}if(a.head&&(a.head.done=!1),!(1&a.wrap)||(((255&h)<<8)+(h>>8))%31){t.msg="incorrect header check",a.mode=me;break}if((15&h)!==we){t.msg="unknown compression method",a.mode=me;break}if(h>>>=4,d-=4,y=8+(15&h),0===a.wbits&&(a.wbits=y),y>15||y>a.wbits){t.msg="invalid window size",a.mode=me;break}a.dmax=1<<a.wbits,a.flags=0,t.adler=a.check=1,a.mode=512&h?16189:16191,h=0,d=0;break;case 16181:for(;d<16;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(a.flags=h,(255&a.flags)!==we){t.msg="unknown compression method",a.mode=me;break}if(57344&a.flags){t.msg="unknown header flags set",a.mode=me;break}a.head&&(a.head.text=h>>8&1),512&a.flags&&4&a.wrap&&(A[0]=255&h,A[1]=h>>>8&255,a.check=N(a.check,A,2,0)),h=0,d=0,a.mode=16182;case 16182:for(;d<32;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.head&&(a.head.time=h),512&a.flags&&4&a.wrap&&(A[0]=255&h,A[1]=h>>>8&255,A[2]=h>>>16&255,A[3]=h>>>24&255,a.check=N(a.check,A,4,0)),h=0,d=0,a.mode=16183;case 16183:for(;d<16;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.head&&(a.head.xflags=255&h,a.head.os=h>>8),512&a.flags&&4&a.wrap&&(A[0]=255&h,A[1]=h>>>8&255,a.check=N(a.check,A,2,0)),h=0,d=0,a.mode=16184;case 16184:if(1024&a.flags){for(;d<16;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.length=h,a.head&&(a.head.extra_len=h),512&a.flags&&4&a.wrap&&(A[0]=255&h,A[1]=h>>>8&255,a.check=N(a.check,A,2,0)),h=0,d=0}else a.head&&(a.head.extra=null);a.mode=16185;case 16185:if(1024&a.flags&&(c=a.length,c>o&&(c=o),c&&(a.head&&(y=a.head.extra_len-a.length,a.head.extra||(a.head.extra=new Uint8Array(a.head.extra_len)),a.head.extra.set(i.subarray(s,s+c),y)),512&a.flags&&4&a.wrap&&(a.check=N(a.check,i,c,s)),o-=c,s+=c,a.length-=c),a.length))break t;a.length=0,a.mode=16186;case 16186:if(2048&a.flags){if(0===o)break t;c=0;do{y=i[s+c++],a.head&&y&&a.length<65536&&(a.head.name+=String.fromCharCode(y))}while(y&&c<o);if(512&a.flags&&4&a.wrap&&(a.check=N(a.check,i,c,s)),o-=c,s+=c,y)break t}else a.head&&(a.head.name=null);a.length=0,a.mode=16187;case 16187:if(4096&a.flags){if(0===o)break t;c=0;do{y=i[s+c++],a.head&&y&&a.length<65536&&(a.head.comment+=String.fromCharCode(y))}while(y&&c<o);if(512&a.flags&&4&a.wrap&&(a.check=N(a.check,i,c,s)),o-=c,s+=c,y)break t}else a.head&&(a.head.comment=null);a.mode=16188;case 16188:if(512&a.flags){for(;d<16;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(4&a.wrap&&h!==(65535&a.check)){t.msg="header crc mismatch",a.mode=me;break}h=0,d=0}a.head&&(a.head.hcrc=a.flags>>9&1,a.head.done=!0),t.adler=a.check=0,a.mode=16191;break;case 16189:for(;d<32;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}t.adler=a.check=be(h),h=0,d=0,a.mode=16190;case 16190:if(0===a.havedict)return t.next_out=r,t.avail_out=l,t.next_in=s,t.avail_in=o,a.hold=h,a.bits=d,de;t.adler=a.check=1,a.mode=16191;case 16191:if(e===re||e===oe)break t;case 16192:if(a.last){h>>>=7&d,d-=7&d,a.mode=16206;break}for(;d<3;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}switch(a.last=1&h,h>>>=1,d-=1,3&h){case 0:a.mode=16193;break;case 1:if(Re(a),a.mode=16199,e===oe){h>>>=2,d-=2;break t}break;case 2:a.mode=16196;break;case 3:t.msg="invalid block type",a.mode=me}h>>>=2,d-=2;break;case 16193:for(h>>>=7&d,d-=7&d;d<32;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if((65535&h)!=(h>>>16^65535)){t.msg="invalid stored block lengths",a.mode=me;break}if(a.length=65535&h,h=0,d=0,a.mode=16194,e===oe)break t;case 16194:a.mode=16195;case 16195:if(c=a.length,c){if(c>o&&(c=o),c>l&&(c=l),0===c)break t;n.set(i.subarray(s,s+c),r),o-=c,s+=c,l-=c,r+=c,a.length-=c;break}a.mode=16191;break;case 16196:for(;d<14;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(a.nlen=257+(31&h),h>>>=5,d-=5,a.ndist=1+(31&h),h>>>=5,d-=5,a.ncode=4+(15&h),h>>>=4,d-=4,a.nlen>286||a.ndist>30){t.msg="too many length or distance symbols",a.mode=me;break}a.have=0,a.mode=16197;case 16197:for(;a.have<a.ncode;){for(;d<3;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.lens[Z[a.have++]]=7&h,h>>>=3,d-=3}for(;a.have<19;)a.lens[Z[a.have++]]=0;if(a.lencode=a.lendyn,a.lenbits=7,E={bits:a.lenbits},x=ne(0,a.lens,0,19,a.lencode,0,a.work,E),a.lenbits=E.bits,x){t.msg="invalid code lengths set",a.mode=me;break}a.have=0,a.mode=16198;case 16198:for(;a.have<a.nlen+a.ndist;){for(;z=a.lencode[h&(1<<a.lenbits)-1],m=z>>>24,b=z>>>16&255,g=65535&z,!(m<=d);){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(g<16)h>>>=m,d-=m,a.lens[a.have++]=g;else{if(16===g){for(R=m+2;d<R;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(h>>>=m,d-=m,0===a.have){t.msg="invalid bit length repeat",a.mode=me;break}y=a.lens[a.have-1],c=3+(3&h),h>>>=2,d-=2}else if(17===g){for(R=m+3;d<R;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}h>>>=m,d-=m,y=0,c=3+(7&h),h>>>=3,d-=3}else{for(R=m+7;d<R;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}h>>>=m,d-=m,y=0,c=11+(127&h),h>>>=7,d-=7}if(a.have+c>a.nlen+a.ndist){t.msg="invalid bit length repeat",a.mode=me;break}for(;c--;)a.lens[a.have++]=y}}if(a.mode===me)break;if(0===a.lens[256]){t.msg="invalid code -- missing end-of-block",a.mode=me;break}if(a.lenbits=9,E={bits:a.lenbits},x=ne(1,a.lens,0,a.nlen,a.lencode,0,a.work,E),a.lenbits=E.bits,x){t.msg="invalid literal/lengths set",a.mode=me;break}if(a.distbits=6,a.distcode=a.distdyn,E={bits:a.distbits},x=ne(2,a.lens,a.nlen,a.ndist,a.distcode,0,a.work,E),a.distbits=E.bits,x){t.msg="invalid distances set",a.mode=me;break}if(a.mode=16199,e===oe)break t;case 16199:a.mode=16200;case 16200:if(o>=6&&l>=258){t.next_out=r,t.avail_out=l,t.next_in=s,t.avail_in=o,a.hold=h,a.bits=d,$t(t,f),r=t.next_out,n=t.output,l=t.avail_out,s=t.next_in,i=t.input,o=t.avail_in,h=a.hold,d=a.bits,16191===a.mode&&(a.back=-1);break}for(a.back=0;z=a.lencode[h&(1<<a.lenbits)-1],m=z>>>24,b=z>>>16&255,g=65535&z,!(m<=d);){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(b&&0==(240&b)){for(p=m,k=b,v=g;z=a.lencode[v+((h&(1<<p+k)-1)>>p)],m=z>>>24,b=z>>>16&255,g=65535&z,!(p+m<=d);){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}h>>>=p,d-=p,a.back+=p}if(h>>>=m,d-=m,a.back+=m,a.length=g,0===b){a.mode=16205;break}if(32&b){a.back=-1,a.mode=16191;break}if(64&b){t.msg="invalid literal/length code",a.mode=me;break}a.extra=15&b,a.mode=16201;case 16201:if(a.extra){for(R=a.extra;d<R;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.length+=h&(1<<a.extra)-1,h>>>=a.extra,d-=a.extra,a.back+=a.extra}a.was=a.length,a.mode=16202;case 16202:for(;z=a.distcode[h&(1<<a.distbits)-1],m=z>>>24,b=z>>>16&255,g=65535&z,!(m<=d);){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(0==(240&b)){for(p=m,k=b,v=g;z=a.distcode[v+((h&(1<<p+k)-1)>>p)],m=z>>>24,b=z>>>16&255,g=65535&z,!(p+m<=d);){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}h>>>=p,d-=p,a.back+=p}if(h>>>=m,d-=m,a.back+=m,64&b){t.msg="invalid distance code",a.mode=me;break}a.offset=g,a.extra=15&b,a.mode=16203;case 16203:if(a.extra){for(R=a.extra;d<R;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.offset+=h&(1<<a.extra)-1,h>>>=a.extra,d-=a.extra,a.back+=a.extra}if(a.offset>a.dmax){t.msg="invalid distance too far back",a.mode=me;break}a.mode=16204;case 16204:if(0===l)break t;if(c=f-l,a.offset>c){if(c=a.offset-c,c>a.whave&&a.sane){t.msg="invalid distance too far back",a.mode=me;break}c>a.wnext?(c-=a.wnext,u=a.wsize-c):u=a.wnext-c,c>a.length&&(c=a.length),w=a.window}else w=n,u=r-a.offset,c=a.length;c>l&&(c=l),l-=c,a.length-=c;do{n[r++]=w[u++]}while(--c);0===a.length&&(a.mode=16200);break;case 16205:if(0===l)break t;n[r++]=a.length,l--,a.mode=16200;break;case 16206:if(a.wrap){for(;d<32;){if(0===o)break t;o--,h|=i[s++]<<d,d+=8}if(f-=l,t.total_out+=f,a.total+=f,4&a.wrap&&f&&(t.adler=a.check=a.flags?N(a.check,n,f,r-f):F(a.check,n,f,r-f)),f=l,4&a.wrap&&(a.flags?h:be(h))!==a.check){t.msg="incorrect data check",a.mode=me;break}h=0,d=0}a.mode=16207;case 16207:if(a.wrap&&a.flags){for(;d<32;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(4&a.wrap&&h!==(4294967295&a.total)){t.msg="incorrect length check",a.mode=me;break}h=0,d=0}a.mode=16208;case 16208:x=he;break t;case me:x=fe;break t;case 16210:return ce;default:return _e}return t.next_out=r,t.avail_out=l,t.next_in=s,t.avail_in=o,a.hold=h,a.bits=d,(a.wsize||f!==t.avail_out&&a.mode<me&&(a.mode<16206||e!==se))&&Ze(t,t.output,t.next_out,f-t.avail_out),_-=t.avail_in,f-=t.avail_out,t.total_in+=_,t.total_out+=f,a.total+=f,4&a.wrap&&f&&(t.adler=a.check=a.flags?N(a.check,n,f,t.next_out-f):F(a.check,n,f,t.next_out-f)),t.data_type=a.bits+(a.last?64:0)+(16191===a.mode?128:0)+(16199===a.mode||16194===a.mode?256:0),(0===_&&0===f||e===se)&&x===le&&(x=ue),x},inflateEnd:t=>{if(pe(t))return _e;let e=t.state;return e.window&&(e.window=null),t.state=null,le},inflateGetHeader:(t,e)=>{if(pe(t))return _e;const a=t.state;return 0==(2&a.wrap)?_e:(a.head=e,e.done=!1,le)},inflateSetDictionary:(t,e)=>{const a=e.length;let i,n,s;return pe(t)?_e:(i=t.state,0!==i.wrap&&16190!==i.mode?_e:16190===i.mode&&(n=1,n=F(n,e,a,0),n!==i.check)?fe:(s=Ze(t,e,a,a),s?(i.mode=16210,ce):(i.havedict=1,le)))},inflateInfo:"pako inflate (from Nodeca project)"};var Se=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1};const De=Object.prototype.toString,{Z_NO_FLUSH:Te,Z_FINISH:Oe,Z_OK:Fe,Z_STREAM_END:Le,Z_NEED_DICT:Ne,Z_STREAM_ERROR:Ie,Z_DATA_ERROR:Be,Z_MEM_ERROR:Ce}=B;function He(t){this.options=Tt({chunkSize:65536,windowBits:15,to:""},t||{});const e=this.options;e.raw&&e.windowBits>=0&&e.windowBits<16&&(e.windowBits=-e.windowBits,0===e.windowBits&&(e.windowBits=-15)),!(e.windowBits>=0&&e.windowBits<16)||t&&t.windowBits||(e.windowBits+=32),e.windowBits>15&&e.windowBits<48&&0==(15&e.windowBits)&&(e.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new Ct,this.strm.avail_out=0;let a=Ue.inflateInit2(this.strm,e.windowBits);if(a!==Fe)throw new Error(I[a]);if(this.header=new Se,Ue.inflateGetHeader(this.strm,this.header),e.dictionary&&("string"==typeof e.dictionary?e.dictionary=Nt(e.dictionary):"[object ArrayBuffer]"===De.call(e.dictionary)&&(e.dictionary=new Uint8Array(e.dictionary)),e.raw&&(a=Ue.inflateSetDictionary(this.strm,e.dictionary),a!==Fe)))throw new Error(I[a])}He.prototype.push=function(t,e){const a=this.strm,i=this.options.chunkSize,n=this.options.dictionary;let s,r,o;if(this.ended)return!1;for(r=e===~~e?e:!0===e?Oe:Te,"[object ArrayBuffer]"===De.call(t)?a.input=new Uint8Array(t):a.input=t,a.next_in=0,a.avail_in=a.input.length;;){for(0===a.avail_out&&(a.output=new Uint8Array(i),a.next_out=0,a.avail_out=i),s=Ue.inflate(a,r),s===Ne&&n&&(s=Ue.inflateSetDictionary(a,n),s===Fe?s=Ue.inflate(a,r):s===Be&&(s=Ne));a.avail_in>0&&s===Le&&a.state.wrap>0&&0!==t[a.next_in];)Ue.inflateReset(a),s=Ue.inflate(a,r);switch(s){case Ie:case Be:case Ne:case Ce:return this.onEnd(s),this.ended=!0,!1}if(o=a.avail_out,a.next_out&&(0===a.avail_out||s===Le))if("string"===this.options.to){let t=Bt(a.output,a.next_out),e=a.next_out-t,n=It(a.output,t);a.next_out=e,a.avail_out=i-e,e&&a.output.set(a.output.subarray(t,t+e),0),this.onData(n)}else this.onData(a.output.length===a.next_out?a.output:a.output.subarray(0,a.next_out));if(s!==Fe||0!==o){if(s===Le)return s=Ue.inflateEnd(this.strm),this.onEnd(s),this.ended=!0,!0;if(0===a.avail_in)break}}return!0},He.prototype.onData=function(t){this.chunks.push(t)},He.prototype.onEnd=function(t){t===Fe&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=Ot(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg};const{Deflate:Me,deflate:je,deflateRaw:Ke,gzip:Pe}=Vt;var Ye=Me,Ge=je,Xe=B;const We=new class{constructor(){this._init()}clear(){this._init()}addEvent(t){if(!t)throw new Error("Adding invalid event");const e=this._hasEvents?",":"";this.deflate.push(e+t,Xe.Z_SYNC_FLUSH),this._hasEvents=!0}finish(){if(this.deflate.push("]",Xe.Z_FINISH),this.deflate.err)throw this.deflate.err;const t=this.deflate.result;return this._init(),t}_init(){this._hasEvents=!1,this.deflate=new Ye,this.deflate.push("[",Xe.Z_NO_FLUSH)}},qe={clear:()=>{We.clear()},addEvent:t=>We.addEvent(t),finish:()=>We.finish(),compress:t=>function(t){return Ge(t)}(t)};addEventListener("message",(function(t){const e=t.data.method,a=t.data.id,i=t.data.arg;if(e in qe&&"function"==typeof qe[e])try{const t=qe[e](i);postMessage({id:a,method:e,success:!0,response:t})}catch(t){postMessage({id:a,method:e,success:!1,response:t.message}),console.error(t)}})),postMessage({id:void 0,method:"init",success:!0,response:void 0});`;
function e() {
  const e2 = new Blob([r]);
  return URL.createObjectURL(e2);
}
function logInfo(message, shouldAddBreadcrumb) {
  if (!(typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__)) {
    return;
  }
  logger.info(message);
  if (shouldAddBreadcrumb) {
    addBreadcrumb(message);
  }
}
function logInfoNextTick(message, shouldAddBreadcrumb) {
  if (!(typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__)) {
    return;
  }
  logger.info(message);
  if (shouldAddBreadcrumb) {
    setTimeout(() => {
      addBreadcrumb(message);
    }, 0);
  }
}
function addBreadcrumb(message) {
  const hub = getCurrentHub();
  hub.addBreadcrumb(
    {
      category: "console",
      data: {
        logger: "replay"
      },
      level: "info",
      message
    },
    { level: "info" }
  );
}
class EventBufferSizeExceededError extends Error {
  constructor() {
    super(`Event buffer exceeded maximum size of ${REPLAY_MAX_EVENT_BUFFER_SIZE}.`);
  }
}
class EventBufferArray {
  /** All the events that are buffered to be sent. */
  /** @inheritdoc */
  constructor() {
    this.events = [];
    this._totalSize = 0;
    this.hasCheckout = false;
  }
  /** @inheritdoc */
  get hasEvents() {
    return this.events.length > 0;
  }
  /** @inheritdoc */
  get type() {
    return "sync";
  }
  /** @inheritdoc */
  destroy() {
    this.events = [];
  }
  /** @inheritdoc */
  async addEvent(event) {
    const eventSize = JSON.stringify(event).length;
    this._totalSize += eventSize;
    if (this._totalSize > REPLAY_MAX_EVENT_BUFFER_SIZE) {
      throw new EventBufferSizeExceededError();
    }
    this.events.push(event);
  }
  /** @inheritdoc */
  finish() {
    return new Promise((resolve) => {
      const eventsRet = this.events;
      this.clear();
      resolve(JSON.stringify(eventsRet));
    });
  }
  /** @inheritdoc */
  clear() {
    this.events = [];
    this._totalSize = 0;
    this.hasCheckout = false;
  }
  /** @inheritdoc */
  getEarliestTimestamp() {
    const timestamp = this.events.map((event) => event.timestamp).sort()[0];
    if (!timestamp) {
      return null;
    }
    return timestampToMs(timestamp);
  }
}
class WorkerHandler {
  constructor(worker) {
    this._worker = worker;
    this._id = 0;
  }
  /**
   * Ensure the worker is ready (or not).
   * This will either resolve when the worker is ready, or reject if an error occured.
   */
  ensureReady() {
    if (this._ensureReadyPromise) {
      return this._ensureReadyPromise;
    }
    this._ensureReadyPromise = new Promise((resolve, reject) => {
      this._worker.addEventListener(
        "message",
        ({ data }) => {
          if (data.success) {
            resolve();
          } else {
            reject();
          }
        },
        { once: true }
      );
      this._worker.addEventListener(
        "error",
        (error) => {
          reject(error);
        },
        { once: true }
      );
    });
    return this._ensureReadyPromise;
  }
  /**
   * Destroy the worker.
   */
  destroy() {
    logInfo("[Replay] Destroying compression worker");
    this._worker.terminate();
  }
  /**
   * Post message to worker and wait for response before resolving promise.
   */
  postMessage(method, arg) {
    const id = this._getAndIncrementId();
    return new Promise((resolve, reject) => {
      const listener = ({ data }) => {
        const response = data;
        if (response.method !== method) {
          return;
        }
        if (response.id !== id) {
          return;
        }
        this._worker.removeEventListener("message", listener);
        if (!response.success) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.error("[Replay]", response.response);
          reject(new Error("Error in compression worker"));
          return;
        }
        resolve(response.response);
      };
      this._worker.addEventListener("message", listener);
      this._worker.postMessage({ id, method, arg });
    });
  }
  /** Get the current ID and increment it for the next call. */
  _getAndIncrementId() {
    return this._id++;
  }
}
class EventBufferCompressionWorker {
  /** @inheritdoc */
  constructor(worker) {
    this._worker = new WorkerHandler(worker);
    this._earliestTimestamp = null;
    this._totalSize = 0;
    this.hasCheckout = false;
  }
  /** @inheritdoc */
  get hasEvents() {
    return !!this._earliestTimestamp;
  }
  /** @inheritdoc */
  get type() {
    return "worker";
  }
  /**
   * Ensure the worker is ready (or not).
   * This will either resolve when the worker is ready, or reject if an error occured.
   */
  ensureReady() {
    return this._worker.ensureReady();
  }
  /**
   * Destroy the event buffer.
   */
  destroy() {
    this._worker.destroy();
  }
  /**
   * Add an event to the event buffer.
   *
   * Returns true if event was successfuly received and processed by worker.
   */
  addEvent(event) {
    const timestamp = timestampToMs(event.timestamp);
    if (!this._earliestTimestamp || timestamp < this._earliestTimestamp) {
      this._earliestTimestamp = timestamp;
    }
    const data = JSON.stringify(event);
    this._totalSize += data.length;
    if (this._totalSize > REPLAY_MAX_EVENT_BUFFER_SIZE) {
      return Promise.reject(new EventBufferSizeExceededError());
    }
    return this._sendEventToWorker(data);
  }
  /**
   * Finish the event buffer and return the compressed data.
   */
  finish() {
    return this._finishRequest();
  }
  /** @inheritdoc */
  clear() {
    this._earliestTimestamp = null;
    this._totalSize = 0;
    this.hasCheckout = false;
    void this._worker.postMessage("clear");
  }
  /** @inheritdoc */
  getEarliestTimestamp() {
    return this._earliestTimestamp;
  }
  /**
   * Send the event to the worker.
   */
  _sendEventToWorker(data) {
    return this._worker.postMessage("addEvent", data);
  }
  /**
   * Finish the request and return the compressed data from the worker.
   */
  async _finishRequest() {
    const response = await this._worker.postMessage("finish");
    this._earliestTimestamp = null;
    this._totalSize = 0;
    return response;
  }
}
class EventBufferProxy {
  constructor(worker) {
    this._fallback = new EventBufferArray();
    this._compression = new EventBufferCompressionWorker(worker);
    this._used = this._fallback;
    this._ensureWorkerIsLoadedPromise = this._ensureWorkerIsLoaded();
  }
  /** @inheritdoc */
  get type() {
    return this._used.type;
  }
  /** @inheritDoc */
  get hasEvents() {
    return this._used.hasEvents;
  }
  /** @inheritdoc */
  get hasCheckout() {
    return this._used.hasCheckout;
  }
  /** @inheritdoc */
  set hasCheckout(value) {
    this._used.hasCheckout = value;
  }
  /** @inheritDoc */
  destroy() {
    this._fallback.destroy();
    this._compression.destroy();
  }
  /** @inheritdoc */
  clear() {
    return this._used.clear();
  }
  /** @inheritdoc */
  getEarliestTimestamp() {
    return this._used.getEarliestTimestamp();
  }
  /**
   * Add an event to the event buffer.
   *
   * Returns true if event was successfully added.
   */
  addEvent(event) {
    return this._used.addEvent(event);
  }
  /** @inheritDoc */
  async finish() {
    await this.ensureWorkerIsLoaded();
    return this._used.finish();
  }
  /** Ensure the worker has loaded. */
  ensureWorkerIsLoaded() {
    return this._ensureWorkerIsLoadedPromise;
  }
  /** Actually check if the worker has been loaded. */
  async _ensureWorkerIsLoaded() {
    try {
      await this._compression.ensureReady();
    } catch (error) {
      logInfo("[Replay] Failed to load the compression worker, falling back to simple buffer");
      return;
    }
    await this._switchToCompressionWorker();
  }
  /** Switch the used buffer to the compression worker. */
  async _switchToCompressionWorker() {
    const { events, hasCheckout } = this._fallback;
    const addEventPromises = [];
    for (const event of events) {
      addEventPromises.push(this._compression.addEvent(event));
    }
    this._compression.hasCheckout = hasCheckout;
    this._used = this._compression;
    try {
      await Promise.all(addEventPromises);
    } catch (error) {
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.warn("[Replay] Failed to add events when switching buffers.", error);
    }
  }
}
function createEventBuffer({ useCompression }) {
  if (useCompression && window.Worker) {
    try {
      const workerUrl = e();
      logInfo("[Replay] Using compression worker");
      const worker = new Worker(workerUrl);
      return new EventBufferProxy(worker);
    } catch (error) {
      logInfo("[Replay] Failed to create compression worker");
    }
  }
  logInfo("[Replay] Using simple buffer");
  return new EventBufferArray();
}
function hasSessionStorage() {
  try {
    return "sessionStorage" in WINDOW$1 && !!WINDOW$1.sessionStorage;
  } catch (e2) {
    return false;
  }
}
function clearSession(replay) {
  deleteSession();
  replay.session = void 0;
}
function deleteSession() {
  if (!hasSessionStorage()) {
    return;
  }
  try {
    WINDOW$1.sessionStorage.removeItem(REPLAY_SESSION_KEY);
  } catch (e2) {
  }
}
function isSampled(sampleRate) {
  if (sampleRate === void 0) {
    return false;
  }
  return Math.random() < sampleRate;
}
function saveSession(session2) {
  if (!hasSessionStorage()) {
    return;
  }
  try {
    WINDOW$1.sessionStorage.setItem(REPLAY_SESSION_KEY, JSON.stringify(session2));
  } catch (e2) {
  }
}
function makeSession(session2) {
  const now = Date.now();
  const id = session2.id || uuid4();
  const started = session2.started || now;
  const lastActivity = session2.lastActivity || now;
  const segmentId = session2.segmentId || 0;
  const sampled = session2.sampled;
  const previousSessionId = session2.previousSessionId;
  return {
    id,
    started,
    lastActivity,
    segmentId,
    sampled,
    previousSessionId
  };
}
function getSessionSampleType(sessionSampleRate, allowBuffering) {
  return isSampled(sessionSampleRate) ? "session" : allowBuffering ? "buffer" : false;
}
function createSession({ sessionSampleRate, allowBuffering, stickySession = false }, { previousSessionId } = {}) {
  const sampled = getSessionSampleType(sessionSampleRate, allowBuffering);
  const session2 = makeSession({
    sampled,
    previousSessionId
  });
  if (stickySession) {
    saveSession(session2);
  }
  return session2;
}
function fetchSession(traceInternals) {
  if (!hasSessionStorage()) {
    return null;
  }
  try {
    const sessionStringFromStorage = WINDOW$1.sessionStorage.getItem(REPLAY_SESSION_KEY);
    if (!sessionStringFromStorage) {
      return null;
    }
    const sessionObj = JSON.parse(sessionStringFromStorage);
    logInfoNextTick("[Replay] Loading existing session", traceInternals);
    return makeSession(sessionObj);
  } catch (e2) {
    return null;
  }
}
function isExpired(initialTime, expiry, targetTime = +/* @__PURE__ */ new Date()) {
  if (initialTime === null || expiry === void 0 || expiry < 0) {
    return true;
  }
  if (expiry === 0) {
    return false;
  }
  return initialTime + expiry <= targetTime;
}
function isSessionExpired(session2, {
  maxReplayDuration,
  sessionIdleExpire,
  targetTime = Date.now()
}) {
  return (
    // First, check that maximum session length has not been exceeded
    isExpired(session2.started, maxReplayDuration, targetTime) || // check that the idle timeout has not been exceeded (i.e. user has
    // performed an action within the last `sessionIdleExpire` ms)
    isExpired(session2.lastActivity, sessionIdleExpire, targetTime)
  );
}
function shouldRefreshSession(session2, { sessionIdleExpire, maxReplayDuration }) {
  if (!isSessionExpired(session2, { sessionIdleExpire, maxReplayDuration })) {
    return false;
  }
  if (session2.sampled === "buffer" && session2.segmentId === 0) {
    return false;
  }
  return true;
}
function loadOrCreateSession({
  traceInternals,
  sessionIdleExpire,
  maxReplayDuration,
  previousSessionId
}, sessionOptions) {
  const existingSession = sessionOptions.stickySession && fetchSession(traceInternals);
  if (!existingSession) {
    logInfoNextTick("[Replay] Creating new session", traceInternals);
    return createSession(sessionOptions, { previousSessionId });
  }
  if (!shouldRefreshSession(existingSession, { sessionIdleExpire, maxReplayDuration })) {
    return existingSession;
  }
  logInfoNextTick("[Replay] Session in sessionStorage is expired, creating new one...");
  return createSession(sessionOptions, { previousSessionId: existingSession.id });
}
const ReplayEventTypeCustom = 5;
function isCustomEvent(event) {
  return event.type === EventType.Custom;
}
function addEventSync(replay, event, isCheckout) {
  if (!shouldAddEvent(replay, event)) {
    return false;
  }
  void _addEvent(replay, event, isCheckout);
  return true;
}
function addEvent(replay, event, isCheckout) {
  if (!shouldAddEvent(replay, event)) {
    return Promise.resolve(null);
  }
  return _addEvent(replay, event, isCheckout);
}
async function _addEvent(replay, event, isCheckout) {
  if (!replay.eventBuffer) {
    return null;
  }
  try {
    if (isCheckout && replay.recordingMode === "buffer") {
      replay.eventBuffer.clear();
    }
    if (isCheckout) {
      replay.eventBuffer.hasCheckout = true;
    }
    const replayOptions = replay.getOptions();
    const eventAfterPossibleCallback = maybeApplyCallback(event, replayOptions.beforeAddRecordingEvent);
    if (!eventAfterPossibleCallback) {
      return;
    }
    return await replay.eventBuffer.addEvent(eventAfterPossibleCallback);
  } catch (error) {
    const reason = error && error instanceof EventBufferSizeExceededError ? "addEventSizeExceeded" : "addEvent";
    (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.error(error);
    await replay.stop({ reason });
    const client = getCurrentHub().getClient();
    if (client) {
      client.recordDroppedEvent("internal_sdk_error", "replay");
    }
  }
}
function shouldAddEvent(replay, event) {
  if (!replay.eventBuffer || replay.isPaused() || !replay.isEnabled()) {
    return false;
  }
  const timestampInMs = timestampToMs(event.timestamp);
  if (timestampInMs + replay.timeouts.sessionIdlePause < Date.now()) {
    return false;
  }
  if (timestampInMs > replay.getContext().initialTimestamp + replay.getOptions().maxReplayDuration) {
    logInfo(
      `[Replay] Skipping event with timestamp ${timestampInMs} because it is after maxReplayDuration`,
      replay.getOptions()._experiments.traceInternals
    );
    return false;
  }
  return true;
}
function maybeApplyCallback(event, callback) {
  try {
    if (typeof callback === "function" && isCustomEvent(event)) {
      return callback(event);
    }
  } catch (error) {
    (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.error("[Replay] An error occured in the `beforeAddRecordingEvent` callback, skipping the event...", error);
    return null;
  }
  return event;
}
function isErrorEvent(event) {
  return !event.type;
}
function isTransactionEvent(event) {
  return event.type === "transaction";
}
function isReplayEvent(event) {
  return event.type === "replay_event";
}
function handleAfterSendEvent(replay) {
  const enforceStatusCode = isBaseTransportSend();
  return (event, sendResponse) => {
    if (!replay.isEnabled() || !isErrorEvent(event) && !isTransactionEvent(event)) {
      return;
    }
    const statusCode = sendResponse && sendResponse.statusCode;
    if (enforceStatusCode && (!statusCode || statusCode < 200 || statusCode >= 300)) {
      return;
    }
    if (isTransactionEvent(event)) {
      handleTransactionEvent(replay, event);
      return;
    }
    handleErrorEvent(replay, event);
  };
}
function handleTransactionEvent(replay, event) {
  const replayContext = replay.getContext();
  if (event.contexts && event.contexts.trace && event.contexts.trace.trace_id && replayContext.traceIds.size < 100) {
    replayContext.traceIds.add(event.contexts.trace.trace_id);
  }
}
function handleErrorEvent(replay, event) {
  const replayContext = replay.getContext();
  if (event.event_id && replayContext.errorIds.size < 100) {
    replayContext.errorIds.add(event.event_id);
  }
  if (replay.recordingMode === "buffer" && event.tags && event.tags.replayId) {
    setTimeout(() => {
      void replay.sendBufferedReplayOrFlush();
    });
  }
}
function isBaseTransportSend() {
  const client = getCurrentHub().getClient();
  if (!client) {
    return false;
  }
  const transport = client.getTransport();
  if (!transport) {
    return false;
  }
  return transport.send.__sentry__baseTransport__ || false;
}
function isRrwebError(event, hint) {
  if (event.type || !event.exception || !event.exception.values || !event.exception.values.length) {
    return false;
  }
  if (hint.originalException && hint.originalException.__rrweb__) {
    return true;
  }
  return event.exception.values.some((exception) => {
    if (!exception.stacktrace || !exception.stacktrace.frames || !exception.stacktrace.frames.length) {
      return false;
    }
    return exception.stacktrace.frames.some((frame) => frame.filename && frame.filename.includes("/rrweb/src/"));
  });
}
function shouldSampleForBufferEvent(replay, event) {
  if (replay.recordingMode !== "buffer") {
    return false;
  }
  if (event.message === UNABLE_TO_SEND_REPLAY) {
    return false;
  }
  if (!event.exception || event.type) {
    return false;
  }
  return isSampled(replay.getOptions().errorSampleRate);
}
function handleGlobalEventListener(replay, includeAfterSendEventHandling = false) {
  const afterSendHandler = includeAfterSendEventHandling ? handleAfterSendEvent(replay) : void 0;
  return (event, hint) => {
    if (!replay.isEnabled()) {
      return event;
    }
    if (isReplayEvent(event)) {
      delete event.breadcrumbs;
      return event;
    }
    if (!isErrorEvent(event) && !isTransactionEvent(event)) {
      return event;
    }
    if (isRrwebError(event, hint) && !replay.getOptions()._experiments.captureExceptions) {
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log("[Replay] Ignoring error from rrweb internals", event);
      return null;
    }
    const isErrorEventSampled = shouldSampleForBufferEvent(replay, event);
    const shouldTagReplayId = isErrorEventSampled || replay.recordingMode === "session";
    if (shouldTagReplayId) {
      event.tags = { ...event.tags, replayId: replay.getSessionId() };
    }
    if (afterSendHandler) {
      afterSendHandler(event, { statusCode: 200 });
    }
    return event;
  };
}
function createPerformanceSpans(replay, entries) {
  return entries.map(({ type, start, end, name, data }) => {
    const response = replay.throttledAddEvent({
      type: EventType.Custom,
      timestamp: start,
      data: {
        tag: "performanceSpan",
        payload: {
          op: type,
          description: name,
          startTimestamp: start,
          endTimestamp: end,
          data
        }
      }
    });
    return typeof response === "string" ? Promise.resolve(null) : response;
  });
}
function handleHistory(handlerData) {
  const { from, to } = handlerData;
  const now = Date.now() / 1e3;
  return {
    type: "navigation.push",
    start: now,
    end: now,
    name: to,
    data: {
      previous: from
    }
  };
}
function handleHistorySpanListener(replay) {
  return (handlerData) => {
    if (!replay.isEnabled()) {
      return;
    }
    const result = handleHistory(handlerData);
    if (result === null) {
      return;
    }
    replay.getContext().urls.push(result.name);
    replay.triggerUserActivity();
    replay.addUpdate(() => {
      createPerformanceSpans(replay, [result]);
      return false;
    });
  };
}
function shouldFilterRequest(replay, url) {
  if ((typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && replay.getOptions()._experiments.traceInternals) {
    return false;
  }
  return _isSentryRequest(url);
}
function _isSentryRequest(url) {
  const client = getCurrentHub().getClient();
  const dsn = client && client.getDsn();
  return dsn ? url.includes(dsn.host) : false;
}
function addNetworkBreadcrumb(replay, result) {
  if (!replay.isEnabled()) {
    return;
  }
  if (result === null) {
    return;
  }
  if (shouldFilterRequest(replay, result.name)) {
    return;
  }
  replay.addUpdate(() => {
    createPerformanceSpans(replay, [result]);
    return true;
  });
}
function handleFetch(handlerData) {
  const { startTimestamp, endTimestamp, fetchData, response } = handlerData;
  if (!endTimestamp) {
    return null;
  }
  const { method, url } = fetchData;
  return {
    type: "resource.fetch",
    start: startTimestamp / 1e3,
    end: endTimestamp / 1e3,
    name: url,
    data: {
      method,
      statusCode: response ? response.status : void 0
    }
  };
}
function handleFetchSpanListener(replay) {
  return (handlerData) => {
    if (!replay.isEnabled()) {
      return;
    }
    const result = handleFetch(handlerData);
    addNetworkBreadcrumb(replay, result);
  };
}
function handleXhr(handlerData) {
  const { startTimestamp, endTimestamp, xhr } = handlerData;
  const sentryXhrData = xhr[SENTRY_XHR_DATA_KEY];
  if (!startTimestamp || !endTimestamp || !sentryXhrData) {
    return null;
  }
  const { method, url, status_code: statusCode } = sentryXhrData;
  if (url === void 0) {
    return null;
  }
  return {
    type: "resource.xhr",
    name: url,
    start: startTimestamp / 1e3,
    end: endTimestamp / 1e3,
    data: {
      method,
      statusCode
    }
  };
}
function handleXhrSpanListener(replay) {
  return (handlerData) => {
    if (!replay.isEnabled()) {
      return;
    }
    const result = handleXhr(handlerData);
    addNetworkBreadcrumb(replay, result);
  };
}
const OBJ = 10;
const OBJ_KEY = 11;
const OBJ_KEY_STR = 12;
const OBJ_VAL = 13;
const OBJ_VAL_STR = 14;
const OBJ_VAL_COMPLETED = 15;
const ARR = 20;
const ARR_VAL = 21;
const ARR_VAL_STR = 22;
const ARR_VAL_COMPLETED = 23;
const ALLOWED_PRIMITIVES = ["true", "false", "null"];
function completeJson(incompleteJson, stack) {
  if (!stack.length) {
    return incompleteJson;
  }
  let json = incompleteJson;
  const lastPos = stack.length - 1;
  const lastStep = stack[lastPos];
  json = _fixLastStep(json, lastStep);
  for (let i = lastPos; i >= 0; i--) {
    const step = stack[i];
    switch (step) {
      case OBJ:
        json = `${json}}`;
        break;
      case ARR:
        json = `${json}]`;
        break;
    }
  }
  return json;
}
function _fixLastStep(json, lastStep) {
  switch (lastStep) {
    case OBJ:
      return `${json}"~~":"~~"`;
    case OBJ_KEY:
      return `${json}:"~~"`;
    case OBJ_KEY_STR:
      return `${json}~~":"~~"`;
    case OBJ_VAL:
      return _maybeFixIncompleteObjValue(json);
    case OBJ_VAL_STR:
      return `${json}~~"`;
    case OBJ_VAL_COMPLETED:
      return `${json},"~~":"~~"`;
    case ARR:
      return `${json}"~~"`;
    case ARR_VAL:
      return _maybeFixIncompleteArrValue(json);
    case ARR_VAL_STR:
      return `${json}~~"`;
    case ARR_VAL_COMPLETED:
      return `${json},"~~"`;
  }
  return json;
}
function _maybeFixIncompleteArrValue(json) {
  const pos = _findLastArrayDelimiter(json);
  if (pos > -1) {
    const part = json.slice(pos + 1);
    if (ALLOWED_PRIMITIVES.includes(part.trim())) {
      return `${json},"~~"`;
    }
    return `${json.slice(0, pos + 1)}"~~"`;
  }
  return json;
}
function _findLastArrayDelimiter(json) {
  for (let i = json.length - 1; i >= 0; i--) {
    const char = json[i];
    if (char === "," || char === "[") {
      return i;
    }
  }
  return -1;
}
function _maybeFixIncompleteObjValue(json) {
  const startPos = json.lastIndexOf(":");
  const part = json.slice(startPos + 1);
  if (ALLOWED_PRIMITIVES.includes(part.trim())) {
    return `${json},"~~":"~~"`;
  }
  return `${json.slice(0, startPos + 1)}"~~"`;
}
function evaluateJson(json) {
  const stack = [];
  for (let pos = 0; pos < json.length; pos++) {
    _evaluateJsonPos(stack, json, pos);
  }
  return stack;
}
function _evaluateJsonPos(stack, json, pos) {
  const curStep = stack[stack.length - 1];
  const char = json[pos];
  const whitespaceRegex = /\s/;
  if (whitespaceRegex.test(char)) {
    return;
  }
  if (char === '"' && !_isEscaped(json, pos)) {
    _handleQuote(stack, curStep);
    return;
  }
  switch (char) {
    case "{":
      _handleObj(stack, curStep);
      break;
    case "[":
      _handleArr(stack, curStep);
      break;
    case ":":
      _handleColon(stack, curStep);
      break;
    case ",":
      _handleComma(stack, curStep);
      break;
    case "}":
      _handleObjClose(stack, curStep);
      break;
    case "]":
      _handleArrClose(stack, curStep);
      break;
  }
}
function _handleQuote(stack, curStep) {
  if (curStep === OBJ_VAL_STR) {
    stack.pop();
    stack.push(OBJ_VAL_COMPLETED);
    return;
  }
  if (curStep === ARR_VAL_STR) {
    stack.pop();
    stack.push(ARR_VAL_COMPLETED);
    return;
  }
  if (curStep === OBJ_VAL) {
    stack.push(OBJ_VAL_STR);
    return;
  }
  if (curStep === ARR_VAL) {
    stack.push(ARR_VAL_STR);
    return;
  }
  if (curStep === OBJ) {
    stack.push(OBJ_KEY_STR);
    return;
  }
  if (curStep === OBJ_KEY_STR) {
    stack.pop();
    stack.push(OBJ_KEY);
    return;
  }
}
function _handleObj(stack, curStep) {
  if (!curStep) {
    stack.push(OBJ);
    return;
  }
  if (curStep === OBJ_VAL) {
    stack.push(OBJ);
    return;
  }
  if (curStep === ARR_VAL) {
    stack.push(OBJ);
  }
  if (curStep === ARR) {
    stack.push(OBJ);
    return;
  }
}
function _handleArr(stack, curStep) {
  if (!curStep) {
    stack.push(ARR);
    stack.push(ARR_VAL);
    return;
  }
  if (curStep === OBJ_VAL) {
    stack.push(ARR);
    stack.push(ARR_VAL);
    return;
  }
  if (curStep === ARR_VAL) {
    stack.push(ARR);
    stack.push(ARR_VAL);
  }
  if (curStep === ARR) {
    stack.push(ARR);
    stack.push(ARR_VAL);
    return;
  }
}
function _handleColon(stack, curStep) {
  if (curStep === OBJ_KEY) {
    stack.pop();
    stack.push(OBJ_VAL);
  }
}
function _handleComma(stack, curStep) {
  if (curStep === OBJ_VAL) {
    stack.pop();
    return;
  }
  if (curStep === OBJ_VAL_COMPLETED) {
    stack.pop();
    stack.pop();
    return;
  }
  if (curStep === ARR_VAL) {
    return;
  }
  if (curStep === ARR_VAL_COMPLETED) {
    stack.pop();
    return;
  }
}
function _handleObjClose(stack, curStep) {
  if (curStep === OBJ) {
    stack.pop();
  }
  if (curStep === OBJ_VAL) {
    stack.pop();
    stack.pop();
  }
  if (curStep === OBJ_VAL_COMPLETED) {
    stack.pop();
    stack.pop();
    stack.pop();
  }
  if (stack[stack.length - 1] === OBJ_VAL) {
    stack.push(OBJ_VAL_COMPLETED);
  }
  if (stack[stack.length - 1] === ARR_VAL) {
    stack.push(ARR_VAL_COMPLETED);
  }
}
function _handleArrClose(stack, curStep) {
  if (curStep === ARR) {
    stack.pop();
  }
  if (curStep === ARR_VAL) {
    stack.pop();
    stack.pop();
  }
  if (curStep === ARR_VAL_COMPLETED) {
    stack.pop();
    stack.pop();
    stack.pop();
  }
  if (stack[stack.length - 1] === OBJ_VAL) {
    stack.push(OBJ_VAL_COMPLETED);
  }
  if (stack[stack.length - 1] === ARR_VAL) {
    stack.push(ARR_VAL_COMPLETED);
  }
}
function _isEscaped(str, pos) {
  const previousChar = str[pos - 1];
  return previousChar === "\\" && !_isEscaped(str, pos - 1);
}
function fixJson(incompleteJson) {
  const stack = evaluateJson(incompleteJson);
  return completeJson(incompleteJson, stack);
}
function getBodySize(body, textEncoder) {
  if (!body) {
    return void 0;
  }
  try {
    if (typeof body === "string") {
      return textEncoder.encode(body).length;
    }
    if (body instanceof URLSearchParams) {
      return textEncoder.encode(body.toString()).length;
    }
    if (body instanceof FormData) {
      const formDataStr = _serializeFormData(body);
      return textEncoder.encode(formDataStr).length;
    }
    if (body instanceof Blob) {
      return body.size;
    }
    if (body instanceof ArrayBuffer) {
      return body.byteLength;
    }
  } catch (e2) {
  }
  return void 0;
}
function parseContentLengthHeader(header) {
  if (!header) {
    return void 0;
  }
  const size = parseInt(header, 10);
  return isNaN(size) ? void 0 : size;
}
function getBodyString(body) {
  if (typeof body === "string") {
    return body;
  }
  if (body instanceof URLSearchParams) {
    return body.toString();
  }
  if (body instanceof FormData) {
    return _serializeFormData(body);
  }
  return void 0;
}
function makeNetworkReplayBreadcrumb(type, data) {
  if (!data) {
    return null;
  }
  const { startTimestamp, endTimestamp, url, method, statusCode, request, response } = data;
  const result = {
    type,
    start: startTimestamp / 1e3,
    end: endTimestamp / 1e3,
    name: url,
    data: dropUndefinedKeys({
      method,
      statusCode,
      request,
      response
    })
  };
  return result;
}
function buildSkippedNetworkRequestOrResponse(bodySize) {
  return {
    headers: {},
    size: bodySize,
    _meta: {
      warnings: ["URL_SKIPPED"]
    }
  };
}
function buildNetworkRequestOrResponse(headers, bodySize, body) {
  if (!bodySize && Object.keys(headers).length === 0) {
    return void 0;
  }
  if (!bodySize) {
    return {
      headers
    };
  }
  if (!body) {
    return {
      headers,
      size: bodySize
    };
  }
  const info = {
    headers,
    size: bodySize
  };
  const { body: normalizedBody, warnings } = normalizeNetworkBody(body);
  info.body = normalizedBody;
  if (warnings.length > 0) {
    info._meta = {
      warnings
    };
  }
  return info;
}
function getAllowedHeaders(headers, allowedHeaders) {
  return Object.keys(headers).reduce((filteredHeaders, key) => {
    const normalizedKey = key.toLowerCase();
    if (allowedHeaders.includes(normalizedKey) && headers[key]) {
      filteredHeaders[normalizedKey] = headers[key];
    }
    return filteredHeaders;
  }, {});
}
function _serializeFormData(formData) {
  return new URLSearchParams(formData).toString();
}
function normalizeNetworkBody(body) {
  if (!body || typeof body !== "string") {
    return {
      body,
      warnings: []
    };
  }
  const exceedsSizeLimit = body.length > NETWORK_BODY_MAX_SIZE;
  if (_strIsProbablyJson(body)) {
    try {
      const json = exceedsSizeLimit ? fixJson(body.slice(0, NETWORK_BODY_MAX_SIZE)) : body;
      const normalizedBody = JSON.parse(json);
      return {
        body: normalizedBody,
        warnings: exceedsSizeLimit ? ["JSON_TRUNCATED"] : []
      };
    } catch (e3) {
      return {
        body: exceedsSizeLimit ? `${body.slice(0, NETWORK_BODY_MAX_SIZE)}…` : body,
        warnings: exceedsSizeLimit ? ["INVALID_JSON", "TEXT_TRUNCATED"] : ["INVALID_JSON"]
      };
    }
  }
  return {
    body: exceedsSizeLimit ? `${body.slice(0, NETWORK_BODY_MAX_SIZE)}…` : body,
    warnings: exceedsSizeLimit ? ["TEXT_TRUNCATED"] : []
  };
}
function _strIsProbablyJson(str) {
  const first = str[0];
  const last = str[str.length - 1];
  return first === "[" && last === "]" || first === "{" && last === "}";
}
function urlMatches(url, urls) {
  const fullUrl = getFullUrl(url);
  return stringMatchesSomePattern(fullUrl, urls);
}
function getFullUrl(url, baseURI = WINDOW$1.document.baseURI) {
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith(WINDOW$1.location.origin)) {
    return url;
  }
  const fixedUrl = new URL(url, baseURI);
  if (fixedUrl.origin !== new URL(baseURI).origin) {
    return url;
  }
  const fullUrl = fixedUrl.href;
  if (!url.endsWith("/") && fullUrl.endsWith("/")) {
    return fullUrl.slice(0, -1);
  }
  return fullUrl;
}
async function captureFetchBreadcrumbToReplay(breadcrumb, hint, options) {
  try {
    const data = await _prepareFetchData(breadcrumb, hint, options);
    const result = makeNetworkReplayBreadcrumb("resource.fetch", data);
    addNetworkBreadcrumb(options.replay, result);
  } catch (error) {
    (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.error("[Replay] Failed to capture fetch breadcrumb", error);
  }
}
function enrichFetchBreadcrumb(breadcrumb, hint, options) {
  const { input, response } = hint;
  const body = _getFetchRequestArgBody(input);
  const reqSize = getBodySize(body, options.textEncoder);
  const resSize = response ? parseContentLengthHeader(response.headers.get("content-length")) : void 0;
  if (reqSize !== void 0) {
    breadcrumb.data.request_body_size = reqSize;
  }
  if (resSize !== void 0) {
    breadcrumb.data.response_body_size = resSize;
  }
}
async function _prepareFetchData(breadcrumb, hint, options) {
  const { startTimestamp, endTimestamp } = hint;
  const {
    url,
    method,
    status_code: statusCode = 0,
    request_body_size: requestBodySize,
    response_body_size: responseBodySize
  } = breadcrumb.data;
  const captureDetails = urlMatches(url, options.networkDetailAllowUrls) && !urlMatches(url, options.networkDetailDenyUrls);
  const request = captureDetails ? _getRequestInfo(options, hint.input, requestBodySize) : buildSkippedNetworkRequestOrResponse(requestBodySize);
  const response = await _getResponseInfo(captureDetails, options, hint.response, responseBodySize);
  return {
    startTimestamp,
    endTimestamp,
    url,
    method,
    statusCode,
    request,
    response
  };
}
function _getRequestInfo({ networkCaptureBodies, networkRequestHeaders }, input, requestBodySize) {
  const headers = getRequestHeaders(input, networkRequestHeaders);
  if (!networkCaptureBodies) {
    return buildNetworkRequestOrResponse(headers, requestBodySize, void 0);
  }
  const requestBody = _getFetchRequestArgBody(input);
  const bodyStr = getBodyString(requestBody);
  return buildNetworkRequestOrResponse(headers, requestBodySize, bodyStr);
}
async function _getResponseInfo(captureDetails, {
  networkCaptureBodies,
  textEncoder,
  networkResponseHeaders
}, response, responseBodySize) {
  if (!captureDetails && responseBodySize !== void 0) {
    return buildSkippedNetworkRequestOrResponse(responseBodySize);
  }
  const headers = getAllHeaders(response.headers, networkResponseHeaders);
  if (!networkCaptureBodies && responseBodySize !== void 0) {
    return buildNetworkRequestOrResponse(headers, responseBodySize, void 0);
  }
  try {
    const res = response.clone();
    const bodyText = await _parseFetchBody(res);
    const size = bodyText && bodyText.length && responseBodySize === void 0 ? getBodySize(bodyText, textEncoder) : responseBodySize;
    if (!captureDetails) {
      return buildSkippedNetworkRequestOrResponse(size);
    }
    if (networkCaptureBodies) {
      return buildNetworkRequestOrResponse(headers, size, bodyText);
    }
    return buildNetworkRequestOrResponse(headers, size, void 0);
  } catch (e2) {
    return buildNetworkRequestOrResponse(headers, responseBodySize, void 0);
  }
}
async function _parseFetchBody(response) {
  try {
    return await response.text();
  } catch (e2) {
    return void 0;
  }
}
function _getFetchRequestArgBody(fetchArgs = []) {
  if (fetchArgs.length !== 2 || typeof fetchArgs[1] !== "object") {
    return void 0;
  }
  return fetchArgs[1].body;
}
function getAllHeaders(headers, allowedHeaders) {
  const allHeaders = {};
  allowedHeaders.forEach((header) => {
    if (headers.get(header)) {
      allHeaders[header] = headers.get(header);
    }
  });
  return allHeaders;
}
function getRequestHeaders(fetchArgs, allowedHeaders) {
  if (fetchArgs.length === 1 && typeof fetchArgs[0] !== "string") {
    return getHeadersFromOptions(fetchArgs[0], allowedHeaders);
  }
  if (fetchArgs.length === 2) {
    return getHeadersFromOptions(fetchArgs[1], allowedHeaders);
  }
  return {};
}
function getHeadersFromOptions(input, allowedHeaders) {
  if (!input) {
    return {};
  }
  const headers = input.headers;
  if (!headers) {
    return {};
  }
  if (headers instanceof Headers) {
    return getAllHeaders(headers, allowedHeaders);
  }
  if (Array.isArray(headers)) {
    return {};
  }
  return getAllowedHeaders(headers, allowedHeaders);
}
async function captureXhrBreadcrumbToReplay(breadcrumb, hint, options) {
  try {
    const data = _prepareXhrData(breadcrumb, hint, options);
    const result = makeNetworkReplayBreadcrumb("resource.xhr", data);
    addNetworkBreadcrumb(options.replay, result);
  } catch (error) {
    (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.error("[Replay] Failed to capture fetch breadcrumb", error);
  }
}
function enrichXhrBreadcrumb(breadcrumb, hint, options) {
  const { xhr, input } = hint;
  const reqSize = getBodySize(input, options.textEncoder);
  const resSize = xhr.getResponseHeader("content-length") ? parseContentLengthHeader(xhr.getResponseHeader("content-length")) : getBodySize(xhr.response, options.textEncoder);
  if (reqSize !== void 0) {
    breadcrumb.data.request_body_size = reqSize;
  }
  if (resSize !== void 0) {
    breadcrumb.data.response_body_size = resSize;
  }
}
function _prepareXhrData(breadcrumb, hint, options) {
  const { startTimestamp, endTimestamp, input, xhr } = hint;
  const {
    url,
    method,
    status_code: statusCode = 0,
    request_body_size: requestBodySize,
    response_body_size: responseBodySize
  } = breadcrumb.data;
  if (!url) {
    return null;
  }
  if (!urlMatches(url, options.networkDetailAllowUrls) || urlMatches(url, options.networkDetailDenyUrls)) {
    const request2 = buildSkippedNetworkRequestOrResponse(requestBodySize);
    const response2 = buildSkippedNetworkRequestOrResponse(responseBodySize);
    return {
      startTimestamp,
      endTimestamp,
      url,
      method,
      statusCode,
      request: request2,
      response: response2
    };
  }
  const xhrInfo = xhr[SENTRY_XHR_DATA_KEY];
  const networkRequestHeaders = xhrInfo ? getAllowedHeaders(xhrInfo.request_headers, options.networkRequestHeaders) : {};
  const networkResponseHeaders = getAllowedHeaders(getResponseHeaders(xhr), options.networkResponseHeaders);
  const request = buildNetworkRequestOrResponse(
    networkRequestHeaders,
    requestBodySize,
    options.networkCaptureBodies ? getBodyString(input) : void 0
  );
  const response = buildNetworkRequestOrResponse(
    networkResponseHeaders,
    responseBodySize,
    options.networkCaptureBodies ? hint.xhr.responseText : void 0
  );
  return {
    startTimestamp,
    endTimestamp,
    url,
    method,
    statusCode,
    request,
    response
  };
}
function getResponseHeaders(xhr) {
  const headers = xhr.getAllResponseHeaders();
  if (!headers) {
    return {};
  }
  return headers.split("\r\n").reduce((acc, line) => {
    const [key, value] = line.split(": ");
    acc[key.toLowerCase()] = value;
    return acc;
  }, {});
}
function handleNetworkBreadcrumbs(replay) {
  const client = getCurrentHub().getClient();
  try {
    const textEncoder = new TextEncoder();
    const {
      networkDetailAllowUrls,
      networkDetailDenyUrls,
      networkCaptureBodies,
      networkRequestHeaders,
      networkResponseHeaders
    } = replay.getOptions();
    const options = {
      replay,
      textEncoder,
      networkDetailAllowUrls,
      networkDetailDenyUrls,
      networkCaptureBodies,
      networkRequestHeaders,
      networkResponseHeaders
    };
    if (client && client.on) {
      client.on("beforeAddBreadcrumb", (breadcrumb, hint) => beforeAddNetworkBreadcrumb(options, breadcrumb, hint));
    } else {
      addInstrumentationHandler("fetch", handleFetchSpanListener(replay));
      addInstrumentationHandler("xhr", handleXhrSpanListener(replay));
    }
  } catch (e2) {
  }
}
function beforeAddNetworkBreadcrumb(options, breadcrumb, hint) {
  if (!breadcrumb.data) {
    return;
  }
  try {
    if (_isXhrBreadcrumb(breadcrumb) && _isXhrHint(hint)) {
      enrichXhrBreadcrumb(breadcrumb, hint, options);
      void captureXhrBreadcrumbToReplay(breadcrumb, hint, options);
    }
    if (_isFetchBreadcrumb(breadcrumb) && _isFetchHint(hint)) {
      enrichFetchBreadcrumb(breadcrumb, hint, options);
      void captureFetchBreadcrumbToReplay(breadcrumb, hint, options);
    }
  } catch (e2) {
    (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.warn("Error when enriching network breadcrumb");
  }
}
function _isXhrBreadcrumb(breadcrumb) {
  return breadcrumb.category === "xhr";
}
function _isFetchBreadcrumb(breadcrumb) {
  return breadcrumb.category === "fetch";
}
function _isXhrHint(hint) {
  return hint && hint.xhr;
}
function _isFetchHint(hint) {
  return hint && hint.response;
}
let _LAST_BREADCRUMB = null;
function isBreadcrumbWithCategory(breadcrumb) {
  return !!breadcrumb.category;
}
const handleScopeListener = (replay) => (scope) => {
  if (!replay.isEnabled()) {
    return;
  }
  const result = handleScope(scope);
  if (!result) {
    return;
  }
  addBreadcrumbEvent(replay, result);
};
function handleScope(scope) {
  const newBreadcrumb = scope.getLastBreadcrumb && scope.getLastBreadcrumb();
  if (_LAST_BREADCRUMB === newBreadcrumb || !newBreadcrumb) {
    return null;
  }
  _LAST_BREADCRUMB = newBreadcrumb;
  if (!isBreadcrumbWithCategory(newBreadcrumb) || ["fetch", "xhr", "sentry.event", "sentry.transaction"].includes(newBreadcrumb.category) || newBreadcrumb.category.startsWith("ui.")) {
    return null;
  }
  if (newBreadcrumb.category === "console") {
    return normalizeConsoleBreadcrumb(newBreadcrumb);
  }
  return createBreadcrumb(newBreadcrumb);
}
function normalizeConsoleBreadcrumb(breadcrumb) {
  const args = breadcrumb.data && breadcrumb.data.arguments;
  if (!Array.isArray(args) || args.length === 0) {
    return createBreadcrumb(breadcrumb);
  }
  let isTruncated = false;
  const normalizedArgs = args.map((arg) => {
    if (!arg) {
      return arg;
    }
    if (typeof arg === "string") {
      if (arg.length > CONSOLE_ARG_MAX_SIZE) {
        isTruncated = true;
        return `${arg.slice(0, CONSOLE_ARG_MAX_SIZE)}…`;
      }
      return arg;
    }
    if (typeof arg === "object") {
      try {
        const normalizedArg = normalize(arg, 7);
        const stringified = JSON.stringify(normalizedArg);
        if (stringified.length > CONSOLE_ARG_MAX_SIZE) {
          const fixedJson = fixJson(stringified.slice(0, CONSOLE_ARG_MAX_SIZE));
          const json = JSON.parse(fixedJson);
          isTruncated = true;
          return json;
        }
        return normalizedArg;
      } catch (e2) {
      }
    }
    return arg;
  });
  return createBreadcrumb({
    ...breadcrumb,
    data: {
      ...breadcrumb.data,
      arguments: normalizedArgs,
      ...isTruncated ? { _meta: { warnings: ["CONSOLE_ARG_TRUNCATED"] } } : {}
    }
  });
}
function addGlobalListeners(replay) {
  const scope = getCurrentHub().getScope();
  const client = getCurrentHub().getClient();
  scope.addScopeListener(handleScopeListener(replay));
  addInstrumentationHandler("dom", handleDomListener(replay));
  addInstrumentationHandler("history", handleHistorySpanListener(replay));
  handleNetworkBreadcrumbs(replay);
  addGlobalEventProcessor(handleGlobalEventListener(replay, !hasHooks(client)));
  if (hasHooks(client)) {
    client.on("afterSendEvent", handleAfterSendEvent(replay));
    client.on("createDsc", (dsc) => {
      const replayId = replay.getSessionId();
      if (replayId && replay.isEnabled() && replay.recordingMode === "session") {
        dsc.replay_id = replayId;
      }
    });
    client.on("startTransaction", (transaction) => {
      replay.lastTransaction = transaction;
    });
    client.on("finishTransaction", (transaction) => {
      replay.lastTransaction = transaction;
    });
  }
}
function hasHooks(client) {
  return !!(client && client.on);
}
async function addMemoryEntry(replay) {
  try {
    return Promise.all(
      createPerformanceSpans(replay, [
        // @ts-expect-error memory doesn't exist on type Performance as the API is non-standard (we check that it exists above)
        createMemoryEntry(WINDOW$1.performance.memory)
      ])
    );
  } catch (error) {
    return [];
  }
}
function createMemoryEntry(memoryEntry) {
  const { jsHeapSizeLimit, totalJSHeapSize, usedJSHeapSize } = memoryEntry;
  const time = Date.now() / 1e3;
  return {
    type: "memory",
    name: "memory",
    start: time,
    end: time,
    data: {
      memory: {
        jsHeapSizeLimit,
        totalJSHeapSize,
        usedJSHeapSize
      }
    }
  };
}
const ENTRY_TYPES = {
  // @ts-expect-error TODO: entry type does not fit the create* functions entry type
  resource: createResourceEntry,
  paint: createPaintEntry,
  // @ts-expect-error TODO: entry type does not fit the create* functions entry type
  navigation: createNavigationEntry,
  // @ts-expect-error TODO: entry type does not fit the create* functions entry type
  ["largest-contentful-paint"]: createLargestContentfulPaint
};
function createPerformanceEntries(entries) {
  return entries.map(createPerformanceEntry).filter(Boolean);
}
function createPerformanceEntry(entry) {
  if (ENTRY_TYPES[entry.entryType] === void 0) {
    return null;
  }
  return ENTRY_TYPES[entry.entryType](entry);
}
function getAbsoluteTime$1(time) {
  return ((browserPerformanceTimeOrigin || WINDOW$1.performance.timeOrigin) + time) / 1e3;
}
function createPaintEntry(entry) {
  const { duration, entryType, name, startTime } = entry;
  const start = getAbsoluteTime$1(startTime);
  return {
    type: entryType,
    name,
    start,
    end: start + duration,
    data: void 0
  };
}
function createNavigationEntry(entry) {
  const {
    entryType,
    name,
    decodedBodySize,
    duration,
    domComplete,
    encodedBodySize,
    domContentLoadedEventStart,
    domContentLoadedEventEnd,
    domInteractive,
    loadEventStart,
    loadEventEnd,
    redirectCount,
    startTime,
    transferSize,
    type
  } = entry;
  if (duration === 0) {
    return null;
  }
  return {
    type: `${entryType}.${type}`,
    start: getAbsoluteTime$1(startTime),
    end: getAbsoluteTime$1(domComplete),
    name,
    data: {
      size: transferSize,
      decodedBodySize,
      encodedBodySize,
      duration,
      domInteractive,
      domContentLoadedEventStart,
      domContentLoadedEventEnd,
      loadEventStart,
      loadEventEnd,
      domComplete,
      redirectCount
    }
  };
}
function createResourceEntry(entry) {
  const {
    entryType,
    initiatorType,
    name,
    responseEnd,
    startTime,
    decodedBodySize,
    encodedBodySize,
    responseStatus,
    transferSize
  } = entry;
  if (["fetch", "xmlhttprequest"].includes(initiatorType)) {
    return null;
  }
  return {
    type: `${entryType}.${initiatorType}`,
    start: getAbsoluteTime$1(startTime),
    end: getAbsoluteTime$1(responseEnd),
    name,
    data: {
      size: transferSize,
      statusCode: responseStatus,
      decodedBodySize,
      encodedBodySize
    }
  };
}
function createLargestContentfulPaint(entry) {
  const { entryType, startTime, size } = entry;
  let startTimeOrNavigationActivation = 0;
  if (WINDOW$1.performance) {
    const navEntry = WINDOW$1.performance.getEntriesByType("navigation")[0];
    startTimeOrNavigationActivation = navEntry && navEntry.activationStart || 0;
  }
  const value = Math.max(startTime - startTimeOrNavigationActivation, 0);
  const end = getAbsoluteTime$1(startTimeOrNavigationActivation) + value / 1e3;
  return {
    type: entryType,
    name: entryType,
    start: end,
    end,
    data: {
      value,
      // LCP "duration" in ms
      size,
      // Not sure why this errors, Node should be correct (Argument of type 'Node' is not assignable to parameter of type 'INode')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      nodeId: record.mirror.getId(entry.element)
    }
  };
}
function debounce(func, wait, options) {
  let callbackReturnValue;
  let timerId;
  let maxTimerId;
  const maxWait = options && options.maxWait ? Math.max(options.maxWait, wait) : 0;
  function invokeFunc() {
    cancelTimers();
    callbackReturnValue = func();
    return callbackReturnValue;
  }
  function cancelTimers() {
    timerId !== void 0 && clearTimeout(timerId);
    maxTimerId !== void 0 && clearTimeout(maxTimerId);
    timerId = maxTimerId = void 0;
  }
  function flush() {
    if (timerId !== void 0 || maxTimerId !== void 0) {
      return invokeFunc();
    }
    return callbackReturnValue;
  }
  function debounced() {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(invokeFunc, wait);
    if (maxWait && maxTimerId === void 0) {
      maxTimerId = setTimeout(invokeFunc, maxWait);
    }
    return callbackReturnValue;
  }
  debounced.cancel = cancelTimers;
  debounced.flush = flush;
  return debounced;
}
function getHandleRecordingEmit(replay) {
  let hadFirstEvent = false;
  return (event, _isCheckout) => {
    if (!replay.checkAndHandleExpiredSession()) {
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.warn("[Replay] Received replay event after session expired.");
      return;
    }
    const isCheckout = _isCheckout || !hadFirstEvent;
    hadFirstEvent = true;
    replay.addUpdate(() => {
      if (replay.recordingMode === "buffer" && isCheckout) {
        replay.setInitialState();
      }
      if (!addEventSync(replay, event, isCheckout)) {
        return true;
      }
      if (!isCheckout) {
        return false;
      }
      addSettingsEvent(replay, isCheckout);
      if (replay.session && replay.session.previousSessionId) {
        return true;
      }
      if (replay.recordingMode === "buffer" && replay.session && replay.eventBuffer) {
        const earliestEvent = replay.eventBuffer.getEarliestTimestamp();
        if (earliestEvent) {
          logInfo(
            `[Replay] Updating session start time to earliest event in buffer to ${new Date(earliestEvent)}`,
            replay.getOptions()._experiments.traceInternals
          );
          replay.session.started = earliestEvent;
          if (replay.getOptions().stickySession) {
            saveSession(replay.session);
          }
        }
      }
      if (replay.recordingMode === "session") {
        void replay.flush();
      }
      return true;
    });
  };
}
function createOptionsEvent(replay) {
  const options = replay.getOptions();
  return {
    type: EventType.Custom,
    timestamp: Date.now(),
    data: {
      tag: "options",
      payload: {
        sessionSampleRate: options.sessionSampleRate,
        errorSampleRate: options.errorSampleRate,
        useCompressionOption: options.useCompression,
        blockAllMedia: options.blockAllMedia,
        maskAllText: options.maskAllText,
        maskAllInputs: options.maskAllInputs,
        useCompression: replay.eventBuffer ? replay.eventBuffer.type === "worker" : false,
        networkDetailHasUrls: options.networkDetailAllowUrls.length > 0,
        networkCaptureBodies: options.networkCaptureBodies,
        networkRequestHasHeaders: options.networkRequestHeaders.length > 0,
        networkResponseHasHeaders: options.networkResponseHeaders.length > 0
      }
    }
  };
}
function addSettingsEvent(replay, isCheckout) {
  if (!isCheckout || !replay.session || replay.session.segmentId !== 0) {
    return;
  }
  addEventSync(replay, createOptionsEvent(replay), false);
}
function createReplayEnvelope(replayEvent, recordingData, dsn, tunnel) {
  return createEnvelope(
    createEventEnvelopeHeaders(replayEvent, getSdkMetadataForEnvelopeHeader(replayEvent), tunnel, dsn),
    [
      [{ type: "replay_event" }, replayEvent],
      [
        {
          type: "replay_recording",
          // If string then we need to encode to UTF8, otherwise will have
          // wrong size. TextEncoder has similar browser support to
          // MutationObserver, although it does not accept IE11.
          length: typeof recordingData === "string" ? new TextEncoder().encode(recordingData).length : recordingData.length
        },
        recordingData
      ]
    ]
  );
}
function prepareRecordingData({
  recordingData,
  headers
}) {
  let payloadWithSequence;
  const replayHeaders = `${JSON.stringify(headers)}
`;
  if (typeof recordingData === "string") {
    payloadWithSequence = `${replayHeaders}${recordingData}`;
  } else {
    const enc = new TextEncoder();
    const sequence = enc.encode(replayHeaders);
    payloadWithSequence = new Uint8Array(sequence.length + recordingData.length);
    payloadWithSequence.set(sequence);
    payloadWithSequence.set(recordingData, sequence.length);
  }
  return payloadWithSequence;
}
async function prepareReplayEvent({
  client,
  scope,
  replayId: event_id,
  event
}) {
  const integrations = typeof client._integrations === "object" && client._integrations !== null && !Array.isArray(client._integrations) ? Object.keys(client._integrations) : void 0;
  const preparedEvent = await prepareEvent(
    client.getOptions(),
    event,
    { event_id, integrations },
    scope
  );
  if (!preparedEvent) {
    return null;
  }
  preparedEvent.platform = preparedEvent.platform || "javascript";
  const metadata = client.getSdkMetadata && client.getSdkMetadata();
  const { name, version: version2 } = metadata && metadata.sdk || {};
  preparedEvent.sdk = {
    ...preparedEvent.sdk,
    name: name || "sentry.javascript.unknown",
    version: version2 || "0.0.0"
  };
  return preparedEvent;
}
async function sendReplayRequest({
  recordingData,
  replayId,
  segmentId: segment_id,
  eventContext,
  timestamp,
  session: session2
}) {
  const preparedRecordingData = prepareRecordingData({
    recordingData,
    headers: {
      segment_id
    }
  });
  const { urls, errorIds, traceIds, initialTimestamp } = eventContext;
  const hub = getCurrentHub();
  const client = hub.getClient();
  const scope = hub.getScope();
  const transport = client && client.getTransport();
  const dsn = client && client.getDsn();
  if (!client || !transport || !dsn || !session2.sampled) {
    return;
  }
  const baseEvent = {
    type: REPLAY_EVENT_NAME,
    replay_start_timestamp: initialTimestamp / 1e3,
    timestamp: timestamp / 1e3,
    error_ids: errorIds,
    trace_ids: traceIds,
    urls,
    replay_id: replayId,
    segment_id,
    replay_type: session2.sampled
  };
  const replayEvent = await prepareReplayEvent({ scope, client, replayId, event: baseEvent });
  if (!replayEvent) {
    client.recordDroppedEvent("event_processor", "replay", baseEvent);
    logInfo("An event processor returned `null`, will not send event.");
    return;
  }
  delete replayEvent.sdkProcessingMetadata;
  const envelope = createReplayEnvelope(replayEvent, preparedRecordingData, dsn, client.getOptions().tunnel);
  let response;
  try {
    response = await transport.send(envelope);
  } catch (err) {
    const error = new Error(UNABLE_TO_SEND_REPLAY);
    try {
      error.cause = err;
    } catch (e2) {
    }
    throw error;
  }
  if (!response) {
    return response;
  }
  if (typeof response.statusCode === "number" && (response.statusCode < 200 || response.statusCode >= 300)) {
    throw new TransportStatusCodeError(response.statusCode);
  }
  return response;
}
class TransportStatusCodeError extends Error {
  constructor(statusCode) {
    super(`Transport returned status code ${statusCode}`);
  }
}
async function sendReplay(replayData, retryConfig = {
  count: 0,
  interval: RETRY_BASE_INTERVAL
}) {
  const { recordingData, options } = replayData;
  if (!recordingData.length) {
    return;
  }
  try {
    await sendReplayRequest(replayData);
    return true;
  } catch (err) {
    if (err instanceof TransportStatusCodeError) {
      throw err;
    }
    setContext("Replays", {
      _retryCount: retryConfig.count
    });
    if ((typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && options._experiments && options._experiments.captureExceptions) {
      captureException(err);
    }
    if (retryConfig.count >= RETRY_MAX_COUNT) {
      const error = new Error(`${UNABLE_TO_SEND_REPLAY} - max retries exceeded`);
      try {
        error.cause = err;
      } catch (e2) {
      }
      throw error;
    }
    retryConfig.interval *= ++retryConfig.count;
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          await sendReplay(replayData, retryConfig);
          resolve(true);
        } catch (err2) {
          reject(err2);
        }
      }, retryConfig.interval);
    });
  }
}
const THROTTLED = "__THROTTLED";
const SKIPPED = "__SKIPPED";
function throttle(fn, maxCount, durationSeconds) {
  const counter = /* @__PURE__ */ new Map();
  const _cleanup = (now) => {
    const threshold = now - durationSeconds;
    counter.forEach((_value, key) => {
      if (key < threshold) {
        counter.delete(key);
      }
    });
  };
  const _getTotalCount = () => {
    return [...counter.values()].reduce((a, b) => a + b, 0);
  };
  let isThrottled = false;
  return (...rest) => {
    const now = Math.floor(Date.now() / 1e3);
    _cleanup(now);
    if (_getTotalCount() >= maxCount) {
      const wasThrottled = isThrottled;
      isThrottled = true;
      return wasThrottled ? SKIPPED : THROTTLED;
    }
    isThrottled = false;
    const count = counter.get(now) || 0;
    counter.set(now, count + 1);
    return fn(...rest);
  };
}
class ReplayContainer {
  /**
   * List of PerformanceEntry from PerformanceObserver
   */
  /**
   * Recording can happen in one of three modes:
   *   - session: Record the whole session, sending it continuously
   *   - buffer: Always keep the last 60s of recording, requires:
   *     - having replaysOnErrorSampleRate > 0 to capture replay when an error occurs
   *     - or calling `flush()` to send the replay
   */
  /**
   * The current or last active transcation.
   * This is only available when performance is enabled.
   */
  /**
   * These are here so we can overwrite them in tests etc.
   * @hidden
   */
  /**
   * Options to pass to `rrweb.record()`
   */
  /**
   * Timestamp of the last user activity. This lives across sessions.
   */
  /**
   * Is the integration currently active?
   */
  /**
   * Paused is a state where:
   * - DOM Recording is not listening at all
   * - Nothing will be added to event buffer (e.g. core SDK events)
   */
  /**
   * Have we attached listeners to the core SDK?
   * Note we have to track this as there is no way to remove instrumentation handlers.
   */
  /**
   * Function to stop recording
   */
  constructor({
    options,
    recordingOptions
  }) {
    ReplayContainer.prototype.__init.call(this);
    ReplayContainer.prototype.__init2.call(this);
    ReplayContainer.prototype.__init3.call(this);
    ReplayContainer.prototype.__init4.call(this);
    ReplayContainer.prototype.__init5.call(this);
    ReplayContainer.prototype.__init6.call(this);
    this.eventBuffer = null;
    this.performanceEvents = [];
    this.recordingMode = "session";
    this.timeouts = {
      sessionIdlePause: SESSION_IDLE_PAUSE_DURATION,
      sessionIdleExpire: SESSION_IDLE_EXPIRE_DURATION
    };
    this._lastActivity = Date.now();
    this._isEnabled = false;
    this._isPaused = false;
    this._hasInitializedCoreListeners = false;
    this._context = {
      errorIds: /* @__PURE__ */ new Set(),
      traceIds: /* @__PURE__ */ new Set(),
      urls: [],
      initialTimestamp: Date.now(),
      initialUrl: ""
    };
    this._recordingOptions = recordingOptions;
    this._options = options;
    this._debouncedFlush = debounce(() => this._flush(), this._options.flushMinDelay, {
      maxWait: this._options.flushMaxDelay
    });
    this._throttledAddEvent = throttle(
      (event, isCheckout) => addEvent(this, event, isCheckout),
      // Max 300 events...
      300,
      // ... per 5s
      5
    );
    const { slowClickTimeout, slowClickIgnoreSelectors } = this.getOptions();
    const slowClickConfig = slowClickTimeout ? {
      threshold: Math.min(SLOW_CLICK_THRESHOLD, slowClickTimeout),
      timeout: slowClickTimeout,
      scrollTimeout: SLOW_CLICK_SCROLL_TIMEOUT,
      ignoreSelector: slowClickIgnoreSelectors ? slowClickIgnoreSelectors.join(",") : ""
    } : void 0;
    if (slowClickConfig) {
      this.clickDetector = new ClickDetector(this, slowClickConfig);
    }
  }
  /** Get the event context. */
  getContext() {
    return this._context;
  }
  /** If recording is currently enabled. */
  isEnabled() {
    return this._isEnabled;
  }
  /** If recording is currently paused. */
  isPaused() {
    return this._isPaused;
  }
  /** Get the replay integration options. */
  getOptions() {
    return this._options;
  }
  /**
   * Initializes the plugin based on sampling configuration. Should not be
   * called outside of constructor.
   */
  initializeSampling(previousSessionId) {
    const { errorSampleRate, sessionSampleRate } = this._options;
    if (errorSampleRate <= 0 && sessionSampleRate <= 0) {
      return;
    }
    this._initializeSessionForSampling(previousSessionId);
    if (!this.session) {
      this._handleException(new Error("Unable to initialize and create session"));
      return;
    }
    if (this.session.sampled === false) {
      return;
    }
    this.recordingMode = this.session.sampled === "buffer" && this.session.segmentId === 0 ? "buffer" : "session";
    logInfoNextTick(
      `[Replay] Starting replay in ${this.recordingMode} mode`,
      this._options._experiments.traceInternals
    );
    this._initializeRecording();
  }
  /**
   * Start a replay regardless of sampling rate. Calling this will always
   * create a new session. Will throw an error if replay is already in progress.
   *
   * Creates or loads a session, attaches listeners to varying events (DOM,
   * _performanceObserver, Recording, Sentry SDK, etc)
   */
  start() {
    if (this._isEnabled && this.recordingMode === "session") {
      throw new Error("Replay recording is already in progress");
    }
    if (this._isEnabled && this.recordingMode === "buffer") {
      throw new Error("Replay buffering is in progress, call `flush()` to save the replay");
    }
    logInfoNextTick("[Replay] Starting replay in session mode", this._options._experiments.traceInternals);
    const session2 = loadOrCreateSession(
      {
        maxReplayDuration: this._options.maxReplayDuration,
        sessionIdleExpire: this.timeouts.sessionIdleExpire,
        traceInternals: this._options._experiments.traceInternals
      },
      {
        stickySession: this._options.stickySession,
        // This is intentional: create a new session-based replay when calling `start()`
        sessionSampleRate: 1,
        allowBuffering: false
      }
    );
    this.session = session2;
    this._initializeRecording();
  }
  /**
   * Start replay buffering. Buffers until `flush()` is called or, if
   * `replaysOnErrorSampleRate` > 0, an error occurs.
   */
  startBuffering() {
    if (this._isEnabled) {
      throw new Error("Replay recording is already in progress");
    }
    logInfoNextTick("[Replay] Starting replay in buffer mode", this._options._experiments.traceInternals);
    const session2 = loadOrCreateSession(
      {
        sessionIdleExpire: this.timeouts.sessionIdleExpire,
        maxReplayDuration: this._options.maxReplayDuration,
        traceInternals: this._options._experiments.traceInternals
      },
      {
        stickySession: this._options.stickySession,
        sessionSampleRate: 0,
        allowBuffering: true
      }
    );
    this.session = session2;
    this.recordingMode = "buffer";
    this._initializeRecording();
  }
  /**
   * Start recording.
   *
   * Note that this will cause a new DOM checkout
   */
  startRecording() {
    try {
      this._stopRecording = record({
        ...this._recordingOptions,
        // When running in error sampling mode, we need to overwrite `checkoutEveryNms`
        // Without this, it would record forever, until an error happens, which we don't want
        // instead, we'll always keep the last 60 seconds of replay before an error happened
        ...this.recordingMode === "buffer" && { checkoutEveryNms: BUFFER_CHECKOUT_TIME },
        emit: getHandleRecordingEmit(this),
        onMutation: this._onMutationHandler
      });
    } catch (err) {
      this._handleException(err);
    }
  }
  /**
   * Stops the recording, if it was running.
   *
   * Returns true if it was previously stopped, or is now stopped,
   * otherwise false.
   */
  stopRecording() {
    try {
      if (this._stopRecording) {
        this._stopRecording();
        this._stopRecording = void 0;
      }
      return true;
    } catch (err) {
      this._handleException(err);
      return false;
    }
  }
  /**
   * Currently, this needs to be manually called (e.g. for tests). Sentry SDK
   * does not support a teardown
   */
  async stop({ forceFlush = false, reason } = {}) {
    if (!this._isEnabled) {
      return;
    }
    this._isEnabled = false;
    try {
      logInfo(
        `[Replay] Stopping Replay${reason ? ` triggered by ${reason}` : ""}`,
        this._options._experiments.traceInternals
      );
      this._removeListeners();
      this.stopRecording();
      this._debouncedFlush.cancel();
      if (forceFlush) {
        await this._flush({ force: true });
      }
      this.eventBuffer && this.eventBuffer.destroy();
      this.eventBuffer = null;
      clearSession(this);
    } catch (err) {
      this._handleException(err);
    }
  }
  /**
   * Pause some replay functionality. See comments for `_isPaused`.
   * This differs from stop as this only stops DOM recording, it is
   * not as thorough of a shutdown as `stop()`.
   */
  pause() {
    if (this._isPaused) {
      return;
    }
    this._isPaused = true;
    this.stopRecording();
    logInfo("[Replay] Pausing replay", this._options._experiments.traceInternals);
  }
  /**
   * Resumes recording, see notes for `pause().
   *
   * Note that calling `startRecording()` here will cause a
   * new DOM checkout.`
   */
  resume() {
    if (!this._isPaused || !this._checkSession()) {
      return;
    }
    this._isPaused = false;
    this.startRecording();
    logInfo("[Replay] Resuming replay", this._options._experiments.traceInternals);
  }
  /**
   * If not in "session" recording mode, flush event buffer which will create a new replay.
   * Unless `continueRecording` is false, the replay will continue to record and
   * behave as a "session"-based replay.
   *
   * Otherwise, queue up a flush.
   */
  async sendBufferedReplayOrFlush({ continueRecording = true } = {}) {
    if (this.recordingMode === "session") {
      return this.flushImmediate();
    }
    const activityTime = Date.now();
    logInfo("[Replay] Converting buffer to session", this._options._experiments.traceInternals);
    await this.flushImmediate();
    const hasStoppedRecording = this.stopRecording();
    if (!continueRecording || !hasStoppedRecording) {
      return;
    }
    if (this.recordingMode === "session") {
      return;
    }
    this.recordingMode = "session";
    if (this.session) {
      this._updateUserActivity(activityTime);
      this._updateSessionActivity(activityTime);
      this._maybeSaveSession();
    }
    this.startRecording();
  }
  /**
   * We want to batch uploads of replay events. Save events only if
   * `<flushMinDelay>` milliseconds have elapsed since the last event
   * *OR* if `<flushMaxDelay>` milliseconds have elapsed.
   *
   * Accepts a callback to perform side-effects and returns true to stop batch
   * processing and hand back control to caller.
   */
  addUpdate(cb) {
    const cbResult = cb();
    if (this.recordingMode === "buffer") {
      return;
    }
    if (cbResult === true) {
      return;
    }
    this._debouncedFlush();
  }
  /**
   * Updates the user activity timestamp and resumes recording. This should be
   * called in an event handler for a user action that we consider as the user
   * being "active" (e.g. a mouse click).
   */
  triggerUserActivity() {
    this._updateUserActivity();
    if (!this._stopRecording) {
      if (!this._checkSession()) {
        return;
      }
      this.resume();
      return;
    }
    this.checkAndHandleExpiredSession();
    this._updateSessionActivity();
  }
  /**
   * Updates the user activity timestamp *without* resuming
   * recording. Some user events (e.g. keydown) can be create
   * low-value replays that only contain the keypress as a
   * breadcrumb. Instead this would require other events to
   * create a new replay after a session has expired.
   */
  updateUserActivity() {
    this._updateUserActivity();
    this._updateSessionActivity();
  }
  /**
   * Only flush if `this.recordingMode === 'session'`
   */
  conditionalFlush() {
    if (this.recordingMode === "buffer") {
      return Promise.resolve();
    }
    return this.flushImmediate();
  }
  /**
   * Flush using debounce flush
   */
  flush() {
    return this._debouncedFlush();
  }
  /**
   * Always flush via `_debouncedFlush` so that we do not have flushes triggered
   * from calling both `flush` and `_debouncedFlush`. Otherwise, there could be
   * cases of mulitple flushes happening closely together.
   */
  flushImmediate() {
    this._debouncedFlush();
    return this._debouncedFlush.flush();
  }
  /**
   * Cancels queued up flushes.
   */
  cancelFlush() {
    this._debouncedFlush.cancel();
  }
  /** Get the current sesion (=replay) ID */
  getSessionId() {
    return this.session && this.session.id;
  }
  /**
   * Checks if recording should be stopped due to user inactivity. Otherwise
   * check if session is expired and create a new session if so. Triggers a new
   * full snapshot on new session.
   *
   * Returns true if session is not expired, false otherwise.
   * @hidden
   */
  checkAndHandleExpiredSession() {
    if (this._lastActivity && isExpired(this._lastActivity, this.timeouts.sessionIdlePause) && this.session && this.session.sampled === "session") {
      this.pause();
      return;
    }
    if (!this._checkSession()) {
      return false;
    }
    return true;
  }
  /**
   * Capture some initial state that can change throughout the lifespan of the
   * replay. This is required because otherwise they would be captured at the
   * first flush.
   */
  setInitialState() {
    const urlPath = `${WINDOW$1.location.pathname}${WINDOW$1.location.hash}${WINDOW$1.location.search}`;
    const url = `${WINDOW$1.location.origin}${urlPath}`;
    this.performanceEvents = [];
    this._clearContext();
    this._context.initialUrl = url;
    this._context.initialTimestamp = Date.now();
    this._context.urls.push(url);
  }
  /**
   * Add a breadcrumb event, that may be throttled.
   * If it was throttled, we add a custom breadcrumb to indicate that.
   */
  throttledAddEvent(event, isCheckout) {
    const res = this._throttledAddEvent(event, isCheckout);
    if (res === THROTTLED) {
      const breadcrumb = createBreadcrumb({
        category: "replay.throttled"
      });
      this.addUpdate(() => {
        return !addEventSync(this, {
          type: ReplayEventTypeCustom,
          timestamp: breadcrumb.timestamp || 0,
          data: {
            tag: "breadcrumb",
            payload: breadcrumb,
            metric: true
          }
        });
      });
    }
    return res;
  }
  /**
   * This will get the parametrized route name of the current page.
   * This is only available if performance is enabled, and if an instrumented router is used.
   */
  getCurrentRoute() {
    const lastTransaction = this.lastTransaction || getCurrentHub().getScope().getTransaction();
    if (!lastTransaction || !["route", "custom"].includes(lastTransaction.metadata.source)) {
      return void 0;
    }
    return lastTransaction.name;
  }
  /**
   * Initialize and start all listeners to varying events (DOM,
   * Performance Observer, Recording, Sentry SDK, etc)
   */
  _initializeRecording() {
    this.setInitialState();
    this._updateSessionActivity();
    this.eventBuffer = createEventBuffer({
      useCompression: this._options.useCompression
    });
    this._removeListeners();
    this._addListeners();
    this._isEnabled = true;
    this._isPaused = false;
    this.startRecording();
  }
  /** A wrapper to conditionally capture exceptions. */
  _handleException(error) {
    (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.error("[Replay]", error);
    if ((typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && this._options._experiments && this._options._experiments.captureExceptions) {
      captureException(error);
    }
  }
  /**
   * Loads (or refreshes) the current session.
   */
  _initializeSessionForSampling(previousSessionId) {
    const allowBuffering = this._options.errorSampleRate > 0;
    const session2 = loadOrCreateSession(
      {
        sessionIdleExpire: this.timeouts.sessionIdleExpire,
        maxReplayDuration: this._options.maxReplayDuration,
        traceInternals: this._options._experiments.traceInternals,
        previousSessionId
      },
      {
        stickySession: this._options.stickySession,
        sessionSampleRate: this._options.sessionSampleRate,
        allowBuffering
      }
    );
    this.session = session2;
  }
  /**
   * Checks and potentially refreshes the current session.
   * Returns false if session is not recorded.
   */
  _checkSession() {
    if (!this.session) {
      return false;
    }
    const currentSession = this.session;
    if (shouldRefreshSession(currentSession, {
      sessionIdleExpire: this.timeouts.sessionIdleExpire,
      maxReplayDuration: this._options.maxReplayDuration
    })) {
      void this._refreshSession(currentSession);
      return false;
    }
    return true;
  }
  /**
   * Refresh a session with a new one.
   * This stops the current session (without forcing a flush, as that would never work since we are expired),
   * and then does a new sampling based on the refreshed session.
   */
  async _refreshSession(session2) {
    if (!this._isEnabled) {
      return;
    }
    await this.stop({ reason: "refresh session" });
    this.initializeSampling(session2.id);
  }
  /**
   * Adds listeners to record events for the replay
   */
  _addListeners() {
    try {
      WINDOW$1.document.addEventListener("visibilitychange", this._handleVisibilityChange);
      WINDOW$1.addEventListener("blur", this._handleWindowBlur);
      WINDOW$1.addEventListener("focus", this._handleWindowFocus);
      WINDOW$1.addEventListener("keydown", this._handleKeyboardEvent);
      if (this.clickDetector) {
        this.clickDetector.addListeners();
      }
      if (!this._hasInitializedCoreListeners) {
        addGlobalListeners(this);
        this._hasInitializedCoreListeners = true;
      }
    } catch (err) {
      this._handleException(err);
    }
    if (!("PerformanceObserver" in WINDOW$1)) {
      return;
    }
    this._performanceObserver = setupPerformanceObserver(this);
  }
  /**
   * Cleans up listeners that were created in `_addListeners`
   */
  _removeListeners() {
    try {
      WINDOW$1.document.removeEventListener("visibilitychange", this._handleVisibilityChange);
      WINDOW$1.removeEventListener("blur", this._handleWindowBlur);
      WINDOW$1.removeEventListener("focus", this._handleWindowFocus);
      WINDOW$1.removeEventListener("keydown", this._handleKeyboardEvent);
      if (this.clickDetector) {
        this.clickDetector.removeListeners();
      }
      if (this._performanceObserver) {
        this._performanceObserver.disconnect();
        this._performanceObserver = void 0;
      }
    } catch (err) {
      this._handleException(err);
    }
  }
  /**
   * Handle when visibility of the page content changes. Opening a new tab will
   * cause the state to change to hidden because of content of current page will
   * be hidden. Likewise, moving a different window to cover the contents of the
   * page will also trigger a change to a hidden state.
   */
  __init() {
    this._handleVisibilityChange = () => {
      if (WINDOW$1.document.visibilityState === "visible") {
        this._doChangeToForegroundTasks();
      } else {
        this._doChangeToBackgroundTasks();
      }
    };
  }
  /**
   * Handle when page is blurred
   */
  __init2() {
    this._handleWindowBlur = () => {
      const breadcrumb = createBreadcrumb({
        category: "ui.blur"
      });
      this._doChangeToBackgroundTasks(breadcrumb);
    };
  }
  /**
   * Handle when page is focused
   */
  __init3() {
    this._handleWindowFocus = () => {
      const breadcrumb = createBreadcrumb({
        category: "ui.focus"
      });
      this._doChangeToForegroundTasks(breadcrumb);
    };
  }
  /** Ensure page remains active when a key is pressed. */
  __init4() {
    this._handleKeyboardEvent = (event) => {
      handleKeyboardEvent(this, event);
    };
  }
  /**
   * Tasks to run when we consider a page to be hidden (via blurring and/or visibility)
   */
  _doChangeToBackgroundTasks(breadcrumb) {
    if (!this.session) {
      return;
    }
    const expired = isSessionExpired(this.session, {
      maxReplayDuration: this._options.maxReplayDuration,
      sessionIdleExpire: this.timeouts.sessionIdleExpire
    });
    if (expired) {
      return;
    }
    if (breadcrumb) {
      this._createCustomBreadcrumb(breadcrumb);
    }
    void this.conditionalFlush();
  }
  /**
   * Tasks to run when we consider a page to be visible (via focus and/or visibility)
   */
  _doChangeToForegroundTasks(breadcrumb) {
    if (!this.session) {
      return;
    }
    const isSessionActive = this.checkAndHandleExpiredSession();
    if (!isSessionActive) {
      logInfo("[Replay] Document has become active, but session has expired");
      return;
    }
    if (breadcrumb) {
      this._createCustomBreadcrumb(breadcrumb);
    }
  }
  /**
   * Trigger rrweb to take a full snapshot which will cause this plugin to
   * create a new Replay event.
   */
  _triggerFullSnapshot(checkout = true) {
    try {
      logInfo("[Replay] Taking full rrweb snapshot");
      record.takeFullSnapshot(checkout);
    } catch (err) {
      this._handleException(err);
    }
  }
  /**
   * Update user activity (across session lifespans)
   */
  _updateUserActivity(_lastActivity = Date.now()) {
    this._lastActivity = _lastActivity;
  }
  /**
   * Updates the session's last activity timestamp
   */
  _updateSessionActivity(_lastActivity = Date.now()) {
    if (this.session) {
      this.session.lastActivity = _lastActivity;
      this._maybeSaveSession();
    }
  }
  /**
   * Helper to create (and buffer) a replay breadcrumb from a core SDK breadcrumb
   */
  _createCustomBreadcrumb(breadcrumb) {
    this.addUpdate(() => {
      void this.throttledAddEvent({
        type: EventType.Custom,
        timestamp: breadcrumb.timestamp || 0,
        data: {
          tag: "breadcrumb",
          payload: breadcrumb
        }
      });
    });
  }
  /**
   * Observed performance events are added to `this.performanceEvents`. These
   * are included in the replay event before it is finished and sent to Sentry.
   */
  _addPerformanceEntries() {
    const entries = [...this.performanceEvents];
    this.performanceEvents = [];
    return Promise.all(createPerformanceSpans(this, createPerformanceEntries(entries)));
  }
  /**
   * Clear _context
   */
  _clearContext() {
    this._context.errorIds.clear();
    this._context.traceIds.clear();
    this._context.urls = [];
  }
  /** Update the initial timestamp based on the buffer content. */
  _updateInitialTimestampFromEventBuffer() {
    const { session: session2, eventBuffer } = this;
    if (!session2 || !eventBuffer) {
      return;
    }
    if (session2.segmentId) {
      return;
    }
    const earliestEvent = eventBuffer.getEarliestTimestamp();
    if (earliestEvent && earliestEvent < this._context.initialTimestamp) {
      this._context.initialTimestamp = earliestEvent;
    }
  }
  /**
   * Return and clear _context
   */
  _popEventContext() {
    const _context = {
      initialTimestamp: this._context.initialTimestamp,
      initialUrl: this._context.initialUrl,
      errorIds: Array.from(this._context.errorIds),
      traceIds: Array.from(this._context.traceIds),
      urls: this._context.urls
    };
    this._clearContext();
    return _context;
  }
  /**
   * Flushes replay event buffer to Sentry.
   *
   * Performance events are only added right before flushing - this is
   * due to the buffered performance observer events.
   *
   * Should never be called directly, only by `flush`
   */
  async _runFlush() {
    const replayId = this.getSessionId();
    if (!this.session || !this.eventBuffer || !replayId) {
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.error("[Replay] No session or eventBuffer found to flush.");
      return;
    }
    await this._addPerformanceEntries();
    if (!this.eventBuffer || !this.eventBuffer.hasEvents) {
      return;
    }
    await addMemoryEntry(this);
    if (!this.eventBuffer) {
      return;
    }
    if (replayId !== this.getSessionId()) {
      return;
    }
    try {
      this._updateInitialTimestampFromEventBuffer();
      const timestamp = Date.now();
      if (timestamp - this._context.initialTimestamp > this._options.maxReplayDuration + 3e4) {
        throw new Error("Session is too long, not sending replay");
      }
      const eventContext = this._popEventContext();
      const segmentId = this.session.segmentId++;
      this._maybeSaveSession();
      const recordingData = await this.eventBuffer.finish();
      await sendReplay({
        replayId,
        recordingData,
        segmentId,
        eventContext,
        session: this.session,
        options: this.getOptions(),
        timestamp
      });
    } catch (err) {
      this._handleException(err);
      void this.stop({ reason: "sendReplay" });
      const client = getCurrentHub().getClient();
      if (client) {
        client.recordDroppedEvent("send_error", "replay");
      }
    }
  }
  /**
   * Flush recording data to Sentry. Creates a lock so that only a single flush
   * can be active at a time. Do not call this directly.
   */
  __init5() {
    this._flush = async ({
      force = false
    } = {}) => {
      if (!this._isEnabled && !force) {
        return;
      }
      if (!this.checkAndHandleExpiredSession()) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.error("[Replay] Attempting to finish replay event after session expired.");
        return;
      }
      if (!this.session) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.error("[Replay] No session found to flush.");
        return;
      }
      const start = this.session.started;
      const now = Date.now();
      const duration = now - start;
      this._debouncedFlush.cancel();
      const tooShort = duration < this._options.minReplayDuration;
      const tooLong = duration > this._options.maxReplayDuration + 5e3;
      if (tooShort || tooLong) {
        logInfo(
          `[Replay] Session duration (${Math.floor(duration / 1e3)}s) is too ${tooShort ? "short" : "long"}, not sending replay.`,
          this._options._experiments.traceInternals
        );
        if (tooShort) {
          this._debouncedFlush();
        }
        return;
      }
      const eventBuffer = this.eventBuffer;
      if (eventBuffer && this.session.segmentId === 0 && !eventBuffer.hasCheckout) {
        logInfo("[Replay] Flushing initial segment without checkout.", this._options._experiments.traceInternals);
      }
      if (!this._flushLock) {
        this._flushLock = this._runFlush();
        await this._flushLock;
        this._flushLock = void 0;
        return;
      }
      try {
        await this._flushLock;
      } catch (err) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.error(err);
      } finally {
        this._debouncedFlush();
      }
    };
  }
  /** Save the session, if it is sticky */
  _maybeSaveSession() {
    if (this.session && this._options.stickySession) {
      saveSession(this.session);
    }
  }
  /** Handler for rrweb.record.onMutation */
  __init6() {
    this._onMutationHandler = (mutations) => {
      const count = mutations.length;
      const mutationLimit = this._options.mutationLimit;
      const mutationBreadcrumbLimit = this._options.mutationBreadcrumbLimit;
      const overMutationLimit = mutationLimit && count > mutationLimit;
      if (count > mutationBreadcrumbLimit || overMutationLimit) {
        const breadcrumb = createBreadcrumb({
          category: "replay.mutations",
          data: {
            count,
            limit: overMutationLimit
          }
        });
        this._createCustomBreadcrumb(breadcrumb);
      }
      if (overMutationLimit) {
        void this.stop({ reason: "mutationLimit", forceFlush: this.recordingMode === "session" });
        return false;
      }
      return true;
    };
  }
}
function getOption(selectors, defaultSelectors, deprecatedClassOption, deprecatedSelectorOption) {
  const deprecatedSelectors = typeof deprecatedSelectorOption === "string" ? deprecatedSelectorOption.split(",") : [];
  const allSelectors = [
    ...selectors,
    // @deprecated
    ...deprecatedSelectors,
    // sentry defaults
    ...defaultSelectors
  ];
  if (typeof deprecatedClassOption !== "undefined") {
    if (typeof deprecatedClassOption === "string") {
      allSelectors.push(`.${deprecatedClassOption}`);
    }
    console.warn(
      "[Replay] You are using a deprecated configuration item for privacy. Read the documentation on how to use the new privacy configuration."
    );
  }
  return allSelectors.join(",");
}
function getPrivacyOptions({
  mask,
  unmask,
  block,
  unblock,
  ignore,
  // eslint-disable-next-line deprecation/deprecation
  blockClass,
  // eslint-disable-next-line deprecation/deprecation
  blockSelector,
  // eslint-disable-next-line deprecation/deprecation
  maskTextClass,
  // eslint-disable-next-line deprecation/deprecation
  maskTextSelector,
  // eslint-disable-next-line deprecation/deprecation
  ignoreClass
}) {
  const defaultBlockedElements = ['base[href="/"]'];
  const maskSelector = getOption(mask, [".sentry-mask", "[data-sentry-mask]"], maskTextClass, maskTextSelector);
  const unmaskSelector = getOption(unmask, [".sentry-unmask", "[data-sentry-unmask]"]);
  const options = {
    // We are making the decision to make text and input selectors the same
    maskTextSelector: maskSelector,
    unmaskTextSelector: unmaskSelector,
    maskInputSelector: maskSelector,
    unmaskInputSelector: unmaskSelector,
    blockSelector: getOption(
      block,
      [".sentry-block", "[data-sentry-block]", ...defaultBlockedElements],
      blockClass,
      blockSelector
    ),
    unblockSelector: getOption(unblock, [".sentry-unblock", "[data-sentry-unblock]"]),
    ignoreSelector: getOption(ignore, [".sentry-ignore", "[data-sentry-ignore]", 'input[type="file"]'], ignoreClass)
  };
  if (blockClass instanceof RegExp) {
    options.blockClass = blockClass;
  }
  if (maskTextClass instanceof RegExp) {
    options.maskTextClass = maskTextClass;
  }
  return options;
}
function isBrowser() {
  return typeof window !== "undefined" && (!isNodeEnv() || isElectronNodeRenderer());
}
function isElectronNodeRenderer() {
  return typeof process !== "undefined" && process.type === "renderer";
}
const MEDIA_SELECTORS = 'img,image,svg,video,object,picture,embed,map,audio,link[rel="icon"],link[rel="apple-touch-icon"]';
const DEFAULT_NETWORK_HEADERS = ["content-length", "content-type", "accept"];
let _initialized = false;
class Replay {
  /**
   * @inheritDoc
   */
  static __initStatic() {
    this.id = "Replay";
  }
  /**
   * @inheritDoc
   */
  /**
   * Options to pass to `rrweb.record()`
   */
  /**
   * Initial options passed to the replay integration, merged with default values.
   * Note: `sessionSampleRate` and `errorSampleRate` are not required here, as they
   * can only be finally set when setupOnce() is called.
   *
   * @private
   */
  constructor({
    flushMinDelay = DEFAULT_FLUSH_MIN_DELAY,
    flushMaxDelay = DEFAULT_FLUSH_MAX_DELAY,
    minReplayDuration = MIN_REPLAY_DURATION,
    maxReplayDuration = MAX_REPLAY_DURATION,
    stickySession = true,
    useCompression = true,
    _experiments = {},
    sessionSampleRate,
    errorSampleRate,
    maskAllText = true,
    maskAllInputs = true,
    blockAllMedia = true,
    mutationBreadcrumbLimit = 750,
    mutationLimit = 1e4,
    slowClickTimeout = 7e3,
    slowClickIgnoreSelectors = [],
    networkDetailAllowUrls = [],
    networkDetailDenyUrls = [],
    networkCaptureBodies = true,
    networkRequestHeaders = [],
    networkResponseHeaders = [],
    mask = [],
    unmask = [],
    block = [],
    unblock = [],
    ignore = [],
    maskFn,
    beforeAddRecordingEvent,
    // eslint-disable-next-line deprecation/deprecation
    blockClass,
    // eslint-disable-next-line deprecation/deprecation
    blockSelector,
    // eslint-disable-next-line deprecation/deprecation
    maskInputOptions,
    // eslint-disable-next-line deprecation/deprecation
    maskTextClass,
    // eslint-disable-next-line deprecation/deprecation
    maskTextSelector,
    // eslint-disable-next-line deprecation/deprecation
    ignoreClass
  } = {}) {
    this.name = Replay.id;
    this._recordingOptions = {
      maskAllInputs,
      maskAllText,
      maskInputOptions: { ...maskInputOptions || {}, password: true },
      maskTextFn: maskFn,
      maskInputFn: maskFn,
      ...getPrivacyOptions({
        mask,
        unmask,
        block,
        unblock,
        ignore,
        blockClass,
        blockSelector,
        maskTextClass,
        maskTextSelector,
        ignoreClass
      }),
      // Our defaults
      slimDOMOptions: "all",
      inlineStylesheet: true,
      // Disable inline images as it will increase segment/replay size
      inlineImages: false,
      // collect fonts, but be aware that `sentry.io` needs to be an allowed
      // origin for playback
      collectFonts: true
    };
    this._initialOptions = {
      flushMinDelay,
      flushMaxDelay,
      minReplayDuration: Math.min(minReplayDuration, MIN_REPLAY_DURATION_LIMIT),
      maxReplayDuration: Math.min(maxReplayDuration, MAX_REPLAY_DURATION),
      stickySession,
      sessionSampleRate,
      errorSampleRate,
      useCompression,
      blockAllMedia,
      maskAllInputs,
      maskAllText,
      mutationBreadcrumbLimit,
      mutationLimit,
      slowClickTimeout,
      slowClickIgnoreSelectors,
      networkDetailAllowUrls,
      networkDetailDenyUrls,
      networkCaptureBodies,
      networkRequestHeaders: _getMergedNetworkHeaders(networkRequestHeaders),
      networkResponseHeaders: _getMergedNetworkHeaders(networkResponseHeaders),
      beforeAddRecordingEvent,
      _experiments
    };
    if (typeof sessionSampleRate === "number") {
      console.warn(
        `[Replay] You are passing \`sessionSampleRate\` to the Replay integration.
This option is deprecated and will be removed soon.
Instead, configure \`replaysSessionSampleRate\` directly in the SDK init options, e.g.:
Sentry.init({ replaysSessionSampleRate: ${sessionSampleRate} })`
      );
      this._initialOptions.sessionSampleRate = sessionSampleRate;
    }
    if (typeof errorSampleRate === "number") {
      console.warn(
        `[Replay] You are passing \`errorSampleRate\` to the Replay integration.
This option is deprecated and will be removed soon.
Instead, configure \`replaysOnErrorSampleRate\` directly in the SDK init options, e.g.:
Sentry.init({ replaysOnErrorSampleRate: ${errorSampleRate} })`
      );
      this._initialOptions.errorSampleRate = errorSampleRate;
    }
    if (this._initialOptions.blockAllMedia) {
      this._recordingOptions.blockSelector = !this._recordingOptions.blockSelector ? MEDIA_SELECTORS : `${this._recordingOptions.blockSelector},${MEDIA_SELECTORS}`;
    }
    if (this._isInitialized && isBrowser()) {
      throw new Error("Multiple Sentry Session Replay instances are not supported");
    }
    this._isInitialized = true;
  }
  /** If replay has already been initialized */
  get _isInitialized() {
    return _initialized;
  }
  /** Update _isInitialized */
  set _isInitialized(value) {
    _initialized = value;
  }
  /**
   * Setup and initialize replay container
   */
  setupOnce() {
    if (!isBrowser()) {
      return;
    }
    this._setup();
    setTimeout(() => this._initialize());
  }
  /**
   * Start a replay regardless of sampling rate. Calling this will always
   * create a new session. Will throw an error if replay is already in progress.
   *
   * Creates or loads a session, attaches listeners to varying events (DOM,
   * PerformanceObserver, Recording, Sentry SDK, etc)
   */
  start() {
    if (!this._replay) {
      return;
    }
    this._replay.start();
  }
  /**
   * Start replay buffering. Buffers until `flush()` is called or, if
   * `replaysOnErrorSampleRate` > 0, until an error occurs.
   */
  startBuffering() {
    if (!this._replay) {
      return;
    }
    this._replay.startBuffering();
  }
  /**
   * Currently, this needs to be manually called (e.g. for tests). Sentry SDK
   * does not support a teardown
   */
  stop() {
    if (!this._replay) {
      return Promise.resolve();
    }
    return this._replay.stop({ forceFlush: this._replay.recordingMode === "session" });
  }
  /**
   * If not in "session" recording mode, flush event buffer which will create a new replay.
   * Unless `continueRecording` is false, the replay will continue to record and
   * behave as a "session"-based replay.
   *
   * Otherwise, queue up a flush.
   */
  flush(options) {
    if (!this._replay || !this._replay.isEnabled()) {
      return Promise.resolve();
    }
    return this._replay.sendBufferedReplayOrFlush(options);
  }
  /**
   * Get the current session ID.
   */
  getReplayId() {
    if (!this._replay || !this._replay.isEnabled()) {
      return;
    }
    return this._replay.getSessionId();
  }
  /**
   * Initializes replay.
   */
  _initialize() {
    if (!this._replay) {
      return;
    }
    this._replay.initializeSampling();
  }
  /** Setup the integration. */
  _setup() {
    const finalOptions = loadReplayOptionsFromClient(this._initialOptions);
    this._replay = new ReplayContainer({
      options: finalOptions,
      recordingOptions: this._recordingOptions
    });
  }
}
Replay.__initStatic();
function loadReplayOptionsFromClient(initialOptions) {
  const client = getCurrentHub().getClient();
  const opt = client && client.getOptions();
  const finalOptions = { sessionSampleRate: 0, errorSampleRate: 0, ...dropUndefinedKeys(initialOptions) };
  if (!opt) {
    console.warn("SDK client is not available.");
    return finalOptions;
  }
  if (initialOptions.sessionSampleRate == null && // TODO remove once deprecated rates are removed
  initialOptions.errorSampleRate == null && // TODO remove once deprecated rates are removed
  opt.replaysSessionSampleRate == null && opt.replaysOnErrorSampleRate == null) {
    console.warn(
      "Replay is disabled because neither `replaysSessionSampleRate` nor `replaysOnErrorSampleRate` are set."
    );
  }
  if (typeof opt.replaysSessionSampleRate === "number") {
    finalOptions.sessionSampleRate = opt.replaysSessionSampleRate;
  }
  if (typeof opt.replaysOnErrorSampleRate === "number") {
    finalOptions.errorSampleRate = opt.replaysOnErrorSampleRate;
  }
  return finalOptions;
}
function _getMergedNetworkHeaders(headers) {
  return [...DEFAULT_NETWORK_HEADERS, ...headers.map((header) => header.toLowerCase())];
}
const WINDOW = GLOBAL_OBJ;
function registerBackgroundTabDetection() {
  if (WINDOW && WINDOW.document) {
    WINDOW.document.addEventListener("visibilitychange", () => {
      const activeTransaction = getActiveTransaction();
      if (WINDOW.document.hidden && activeTransaction) {
        const statusType = "cancelled";
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log(
          `[Tracing] Transaction: ${statusType} -> since tab moved to the background, op: ${activeTransaction.op}`
        );
        if (!activeTransaction.status) {
          activeTransaction.setStatus(statusType);
        }
        activeTransaction.setTag("visibilitychange", "document.hidden");
        activeTransaction.finish();
      }
    });
  } else {
    (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.warn("[Tracing] Could not set up background tab detection due to lack of global document");
  }
}
const bindReporter = (callback, metric, reportAllChanges) => {
  let prevValue;
  let delta;
  return (forceReport) => {
    if (metric.value >= 0) {
      if (forceReport || reportAllChanges) {
        delta = metric.value - (prevValue || 0);
        if (delta || prevValue === void 0) {
          prevValue = metric.value;
          metric.delta = delta;
          callback(metric);
        }
      }
    }
  };
};
const generateUniqueID = () => {
  return `v3-${Date.now()}-${Math.floor(Math.random() * (9e12 - 1)) + 1e12}`;
};
const getNavigationEntryFromPerformanceTiming = () => {
  const timing = WINDOW.performance.timing;
  const type = WINDOW.performance.navigation.type;
  const navigationEntry = {
    entryType: "navigation",
    startTime: 0,
    type: type == 2 ? "back_forward" : type === 1 ? "reload" : "navigate"
  };
  for (const key in timing) {
    if (key !== "navigationStart" && key !== "toJSON") {
      navigationEntry[key] = Math.max(timing[key] - timing.navigationStart, 0);
    }
  }
  return navigationEntry;
};
const getNavigationEntry = () => {
  if (WINDOW.__WEB_VITALS_POLYFILL__) {
    return WINDOW.performance && (performance.getEntriesByType && performance.getEntriesByType("navigation")[0] || getNavigationEntryFromPerformanceTiming());
  } else {
    return WINDOW.performance && performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
  }
};
const getActivationStart = () => {
  const navEntry = getNavigationEntry();
  return navEntry && navEntry.activationStart || 0;
};
const initMetric = (name, value) => {
  const navEntry = getNavigationEntry();
  let navigationType = "navigate";
  if (navEntry) {
    if (WINDOW.document.prerendering || getActivationStart() > 0) {
      navigationType = "prerender";
    } else {
      navigationType = navEntry.type.replace(/_/g, "-");
    }
  }
  return {
    name,
    value: typeof value === "undefined" ? -1 : value,
    rating: "good",
    // Will be updated if the value changes.
    delta: 0,
    entries: [],
    id: generateUniqueID(),
    navigationType
  };
};
const observe = (type, callback, opts) => {
  try {
    if (PerformanceObserver.supportedEntryTypes.includes(type)) {
      const po = new PerformanceObserver((list) => {
        callback(list.getEntries());
      });
      po.observe(
        Object.assign(
          {
            type,
            buffered: true
          },
          opts || {}
        )
      );
      return po;
    }
  } catch (e2) {
  }
  return;
};
const onHidden = (cb, once) => {
  const onHiddenOrPageHide = (event) => {
    if (event.type === "pagehide" || WINDOW.document.visibilityState === "hidden") {
      cb(event);
      if (once) {
        removeEventListener("visibilitychange", onHiddenOrPageHide, true);
        removeEventListener("pagehide", onHiddenOrPageHide, true);
      }
    }
  };
  addEventListener("visibilitychange", onHiddenOrPageHide, true);
  addEventListener("pagehide", onHiddenOrPageHide, true);
};
const onCLS = (onReport) => {
  const metric = initMetric("CLS", 0);
  let report;
  let sessionValue = 0;
  let sessionEntries = [];
  const handleEntries = (entries) => {
    entries.forEach((entry) => {
      if (!entry.hadRecentInput) {
        const firstSessionEntry = sessionEntries[0];
        const lastSessionEntry = sessionEntries[sessionEntries.length - 1];
        if (sessionValue && sessionEntries.length !== 0 && entry.startTime - lastSessionEntry.startTime < 1e3 && entry.startTime - firstSessionEntry.startTime < 5e3) {
          sessionValue += entry.value;
          sessionEntries.push(entry);
        } else {
          sessionValue = entry.value;
          sessionEntries = [entry];
        }
        if (sessionValue > metric.value) {
          metric.value = sessionValue;
          metric.entries = sessionEntries;
          if (report) {
            report();
          }
        }
      }
    });
  };
  const po = observe("layout-shift", handleEntries);
  if (po) {
    report = bindReporter(onReport, metric);
    const stopListening = () => {
      handleEntries(po.takeRecords());
      report(true);
    };
    onHidden(stopListening);
    return stopListening;
  }
  return;
};
let firstHiddenTime = -1;
const initHiddenTime = () => {
  return WINDOW.document.visibilityState === "hidden" && !WINDOW.document.prerendering ? 0 : Infinity;
};
const trackChanges = () => {
  onHidden(({ timeStamp }) => {
    firstHiddenTime = timeStamp;
  }, true);
};
const getVisibilityWatcher = () => {
  if (firstHiddenTime < 0) {
    firstHiddenTime = initHiddenTime();
    trackChanges();
  }
  return {
    get firstHiddenTime() {
      return firstHiddenTime;
    }
  };
};
const onFID = (onReport) => {
  const visibilityWatcher = getVisibilityWatcher();
  const metric = initMetric("FID");
  let report;
  const handleEntry = (entry) => {
    if (entry.startTime < visibilityWatcher.firstHiddenTime) {
      metric.value = entry.processingStart - entry.startTime;
      metric.entries.push(entry);
      report(true);
    }
  };
  const handleEntries = (entries) => {
    entries.forEach(handleEntry);
  };
  const po = observe("first-input", handleEntries);
  report = bindReporter(onReport, metric);
  if (po) {
    onHidden(() => {
      handleEntries(po.takeRecords());
      po.disconnect();
    }, true);
  }
};
const reportedMetricIDs = {};
const onLCP = (onReport) => {
  const visibilityWatcher = getVisibilityWatcher();
  const metric = initMetric("LCP");
  let report;
  const handleEntries = (entries) => {
    const lastEntry = entries[entries.length - 1];
    if (lastEntry) {
      const value = Math.max(lastEntry.startTime - getActivationStart(), 0);
      if (value < visibilityWatcher.firstHiddenTime) {
        metric.value = value;
        metric.entries = [lastEntry];
        report();
      }
    }
  };
  const po = observe("largest-contentful-paint", handleEntries);
  if (po) {
    report = bindReporter(onReport, metric);
    const stopListening = () => {
      if (!reportedMetricIDs[metric.id]) {
        handleEntries(po.takeRecords());
        po.disconnect();
        reportedMetricIDs[metric.id] = true;
        report(true);
      }
    };
    ["keydown", "click"].forEach((type) => {
      addEventListener(type, stopListening, { once: true, capture: true });
    });
    onHidden(stopListening, true);
    return stopListening;
  }
  return;
};
function isMeasurementValue(value) {
  return typeof value === "number" && isFinite(value);
}
function _startChild(transaction, { startTimestamp, ...ctx }) {
  if (startTimestamp && transaction.startTimestamp > startTimestamp) {
    transaction.startTimestamp = startTimestamp;
  }
  return transaction.startChild({
    startTimestamp,
    ...ctx
  });
}
function msToSec(time) {
  return time / 1e3;
}
function getBrowserPerformanceAPI() {
  return WINDOW && WINDOW.addEventListener && WINDOW.performance;
}
let _performanceCursor = 0;
let _measurements = {};
let _lcpEntry;
let _clsEntry;
function startTrackingWebVitals() {
  const performance2 = getBrowserPerformanceAPI();
  if (performance2 && browserPerformanceTimeOrigin) {
    if (performance2.mark) {
      WINDOW.performance.mark("sentry-tracing-init");
    }
    _trackFID();
    const clsCallback = _trackCLS();
    const lcpCallback = _trackLCP();
    return () => {
      if (clsCallback) {
        clsCallback();
      }
      if (lcpCallback) {
        lcpCallback();
      }
    };
  }
  return () => void 0;
}
function startTrackingLongTasks() {
  const entryHandler = (entries) => {
    for (const entry of entries) {
      const transaction = getActiveTransaction();
      if (!transaction) {
        return;
      }
      const startTime = msToSec(browserPerformanceTimeOrigin + entry.startTime);
      const duration = msToSec(entry.duration);
      transaction.startChild({
        description: "Main UI thread blocked",
        op: "ui.long-task",
        origin: "auto.ui.browser.metrics",
        startTimestamp: startTime,
        endTimestamp: startTime + duration
      });
    }
  };
  observe("longtask", entryHandler);
}
function startTrackingInteractions() {
  const entryHandler = (entries) => {
    for (const entry of entries) {
      const transaction = getActiveTransaction();
      if (!transaction) {
        return;
      }
      if (entry.name === "click") {
        const startTime = msToSec(browserPerformanceTimeOrigin + entry.startTime);
        const duration = msToSec(entry.duration);
        transaction.startChild({
          description: htmlTreeAsString(entry.target),
          op: `ui.interaction.${entry.name}`,
          origin: "auto.ui.browser.metrics",
          startTimestamp: startTime,
          endTimestamp: startTime + duration
        });
      }
    }
  };
  observe("event", entryHandler, { durationThreshold: 0 });
}
function _trackCLS() {
  return onCLS((metric) => {
    const entry = metric.entries.pop();
    if (!entry) {
      return;
    }
    (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log("[Measurements] Adding CLS");
    _measurements["cls"] = { value: metric.value, unit: "" };
    _clsEntry = entry;
  });
}
function _trackLCP() {
  return onLCP((metric) => {
    const entry = metric.entries.pop();
    if (!entry) {
      return;
    }
    (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log("[Measurements] Adding LCP");
    _measurements["lcp"] = { value: metric.value, unit: "millisecond" };
    _lcpEntry = entry;
  });
}
function _trackFID() {
  onFID((metric) => {
    const entry = metric.entries.pop();
    if (!entry) {
      return;
    }
    const timeOrigin = msToSec(browserPerformanceTimeOrigin);
    const startTime = msToSec(entry.startTime);
    (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log("[Measurements] Adding FID");
    _measurements["fid"] = { value: metric.value, unit: "millisecond" };
    _measurements["mark.fid"] = { value: timeOrigin + startTime, unit: "second" };
  });
}
function addPerformanceEntries(transaction) {
  const performance2 = getBrowserPerformanceAPI();
  if (!performance2 || !WINDOW.performance.getEntries || !browserPerformanceTimeOrigin) {
    return;
  }
  (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log("[Tracing] Adding & adjusting spans using Performance API");
  const timeOrigin = msToSec(browserPerformanceTimeOrigin);
  const performanceEntries = performance2.getEntries();
  let responseStartTimestamp;
  let requestStartTimestamp;
  performanceEntries.slice(_performanceCursor).forEach((entry) => {
    const startTime = msToSec(entry.startTime);
    const duration = msToSec(entry.duration);
    if (transaction.op === "navigation" && timeOrigin + startTime < transaction.startTimestamp) {
      return;
    }
    switch (entry.entryType) {
      case "navigation": {
        _addNavigationSpans(transaction, entry, timeOrigin);
        responseStartTimestamp = timeOrigin + msToSec(entry.responseStart);
        requestStartTimestamp = timeOrigin + msToSec(entry.requestStart);
        break;
      }
      case "mark":
      case "paint":
      case "measure": {
        _addMeasureSpans(transaction, entry, startTime, duration, timeOrigin);
        const firstHidden = getVisibilityWatcher();
        const shouldRecord = entry.startTime < firstHidden.firstHiddenTime;
        if (entry.name === "first-paint" && shouldRecord) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log("[Measurements] Adding FP");
          _measurements["fp"] = { value: entry.startTime, unit: "millisecond" };
        }
        if (entry.name === "first-contentful-paint" && shouldRecord) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log("[Measurements] Adding FCP");
          _measurements["fcp"] = { value: entry.startTime, unit: "millisecond" };
        }
        break;
      }
      case "resource": {
        const resourceName = entry.name.replace(WINDOW.location.origin, "");
        _addResourceSpans(transaction, entry, resourceName, startTime, duration, timeOrigin);
        break;
      }
    }
  });
  _performanceCursor = Math.max(performanceEntries.length - 1, 0);
  _trackNavigator(transaction);
  if (transaction.op === "pageload") {
    if (typeof responseStartTimestamp === "number") {
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log("[Measurements] Adding TTFB");
      _measurements["ttfb"] = {
        value: (responseStartTimestamp - transaction.startTimestamp) * 1e3,
        unit: "millisecond"
      };
      if (typeof requestStartTimestamp === "number" && requestStartTimestamp <= responseStartTimestamp) {
        _measurements["ttfb.requestTime"] = {
          value: (responseStartTimestamp - requestStartTimestamp) * 1e3,
          unit: "millisecond"
        };
      }
    }
    ["fcp", "fp", "lcp"].forEach((name) => {
      if (!_measurements[name] || timeOrigin >= transaction.startTimestamp) {
        return;
      }
      const oldValue = _measurements[name].value;
      const measurementTimestamp = timeOrigin + msToSec(oldValue);
      const normalizedValue = Math.abs((measurementTimestamp - transaction.startTimestamp) * 1e3);
      const delta = normalizedValue - oldValue;
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log(`[Measurements] Normalized ${name} from ${oldValue} to ${normalizedValue} (${delta})`);
      _measurements[name].value = normalizedValue;
    });
    const fidMark = _measurements["mark.fid"];
    if (fidMark && _measurements["fid"]) {
      _startChild(transaction, {
        description: "first input delay",
        endTimestamp: fidMark.value + msToSec(_measurements["fid"].value),
        op: "ui.action",
        origin: "auto.ui.browser.metrics",
        startTimestamp: fidMark.value
      });
      delete _measurements["mark.fid"];
    }
    if (!("fcp" in _measurements)) {
      delete _measurements.cls;
    }
    Object.keys(_measurements).forEach((measurementName) => {
      transaction.setMeasurement(
        measurementName,
        _measurements[measurementName].value,
        _measurements[measurementName].unit
      );
    });
    _tagMetricInfo(transaction);
  }
  _lcpEntry = void 0;
  _clsEntry = void 0;
  _measurements = {};
}
function _addMeasureSpans(transaction, entry, startTime, duration, timeOrigin) {
  const measureStartTimestamp = timeOrigin + startTime;
  const measureEndTimestamp = measureStartTimestamp + duration;
  _startChild(transaction, {
    description: entry.name,
    endTimestamp: measureEndTimestamp,
    op: entry.entryType,
    origin: "auto.resource.browser.metrics",
    startTimestamp: measureStartTimestamp
  });
  return measureStartTimestamp;
}
function _addNavigationSpans(transaction, entry, timeOrigin) {
  ["unloadEvent", "redirect", "domContentLoadedEvent", "loadEvent", "connect"].forEach((event) => {
    _addPerformanceNavigationTiming(transaction, entry, event, timeOrigin);
  });
  _addPerformanceNavigationTiming(transaction, entry, "secureConnection", timeOrigin, "TLS/SSL", "connectEnd");
  _addPerformanceNavigationTiming(transaction, entry, "fetch", timeOrigin, "cache", "domainLookupStart");
  _addPerformanceNavigationTiming(transaction, entry, "domainLookup", timeOrigin, "DNS");
  _addRequest(transaction, entry, timeOrigin);
}
function _addPerformanceNavigationTiming(transaction, entry, event, timeOrigin, description, eventEnd) {
  const end = eventEnd ? entry[eventEnd] : entry[`${event}End`];
  const start = entry[`${event}Start`];
  if (!start || !end) {
    return;
  }
  _startChild(transaction, {
    op: "browser",
    origin: "auto.browser.browser.metrics",
    description: description || event,
    startTimestamp: timeOrigin + msToSec(start),
    endTimestamp: timeOrigin + msToSec(end)
  });
}
function _addRequest(transaction, entry, timeOrigin) {
  _startChild(transaction, {
    op: "browser",
    origin: "auto.browser.browser.metrics",
    description: "request",
    startTimestamp: timeOrigin + msToSec(entry.requestStart),
    endTimestamp: timeOrigin + msToSec(entry.responseEnd)
  });
  _startChild(transaction, {
    op: "browser",
    origin: "auto.browser.browser.metrics",
    description: "response",
    startTimestamp: timeOrigin + msToSec(entry.responseStart),
    endTimestamp: timeOrigin + msToSec(entry.responseEnd)
  });
}
function _addResourceSpans(transaction, entry, resourceName, startTime, duration, timeOrigin) {
  if (entry.initiatorType === "xmlhttprequest" || entry.initiatorType === "fetch") {
    return;
  }
  const data = {};
  if ("transferSize" in entry) {
    data["http.response_transfer_size"] = entry.transferSize;
  }
  if ("encodedBodySize" in entry) {
    data["http.response_content_length"] = entry.encodedBodySize;
  }
  if ("decodedBodySize" in entry) {
    data["http.decoded_response_content_length"] = entry.decodedBodySize;
  }
  if ("renderBlockingStatus" in entry) {
    data["resource.render_blocking_status"] = entry.renderBlockingStatus;
  }
  const startTimestamp = timeOrigin + startTime;
  const endTimestamp = startTimestamp + duration;
  _startChild(transaction, {
    description: resourceName,
    endTimestamp,
    op: entry.initiatorType ? `resource.${entry.initiatorType}` : "resource.other",
    origin: "auto.resource.browser.metrics",
    startTimestamp,
    data
  });
}
function _trackNavigator(transaction) {
  const navigator = WINDOW.navigator;
  if (!navigator) {
    return;
  }
  const connection = navigator.connection;
  if (connection) {
    if (connection.effectiveType) {
      transaction.setTag("effectiveConnectionType", connection.effectiveType);
    }
    if (connection.type) {
      transaction.setTag("connectionType", connection.type);
    }
    if (isMeasurementValue(connection.rtt)) {
      _measurements["connection.rtt"] = { value: connection.rtt, unit: "millisecond" };
    }
  }
  if (isMeasurementValue(navigator.deviceMemory)) {
    transaction.setTag("deviceMemory", `${navigator.deviceMemory} GB`);
  }
  if (isMeasurementValue(navigator.hardwareConcurrency)) {
    transaction.setTag("hardwareConcurrency", String(navigator.hardwareConcurrency));
  }
}
function _tagMetricInfo(transaction) {
  if (_lcpEntry) {
    (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log("[Measurements] Adding LCP Data");
    if (_lcpEntry.element) {
      transaction.setTag("lcp.element", htmlTreeAsString(_lcpEntry.element));
    }
    if (_lcpEntry.id) {
      transaction.setTag("lcp.id", _lcpEntry.id);
    }
    if (_lcpEntry.url) {
      transaction.setTag("lcp.url", _lcpEntry.url.trim().slice(0, 200));
    }
    transaction.setTag("lcp.size", _lcpEntry.size);
  }
  if (_clsEntry && _clsEntry.sources) {
    (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log("[Measurements] Adding CLS Data");
    _clsEntry.sources.forEach(
      (source, index) => transaction.setTag(`cls.source.${index + 1}`, htmlTreeAsString(source.node))
    );
  }
}
const DEFAULT_TRACE_PROPAGATION_TARGETS = ["localhost", /^\/(?!\/)/];
const defaultRequestInstrumentationOptions = {
  traceFetch: true,
  traceXHR: true,
  enableHTTPTimings: true,
  // TODO (v8): Remove this property
  tracingOrigins: DEFAULT_TRACE_PROPAGATION_TARGETS,
  tracePropagationTargets: DEFAULT_TRACE_PROPAGATION_TARGETS
};
function instrumentOutgoingRequests(_options) {
  const {
    traceFetch,
    traceXHR,
    // eslint-disable-next-line deprecation/deprecation
    tracePropagationTargets,
    // eslint-disable-next-line deprecation/deprecation
    tracingOrigins,
    shouldCreateSpanForRequest,
    enableHTTPTimings
  } = {
    traceFetch: defaultRequestInstrumentationOptions.traceFetch,
    traceXHR: defaultRequestInstrumentationOptions.traceXHR,
    ..._options
  };
  const shouldCreateSpan = typeof shouldCreateSpanForRequest === "function" ? shouldCreateSpanForRequest : (_) => true;
  const shouldAttachHeadersWithTargets = (url) => shouldAttachHeaders(url, tracePropagationTargets || tracingOrigins);
  const spans = {};
  if (traceFetch) {
    addInstrumentationHandler("fetch", (handlerData) => {
      const createdSpan = fetchCallback(handlerData, shouldCreateSpan, shouldAttachHeadersWithTargets, spans);
      if (enableHTTPTimings && createdSpan) {
        addHTTPTimings(createdSpan);
      }
    });
  }
  if (traceXHR) {
    addInstrumentationHandler("xhr", (handlerData) => {
      const createdSpan = xhrCallback(handlerData, shouldCreateSpan, shouldAttachHeadersWithTargets, spans);
      if (enableHTTPTimings && createdSpan) {
        addHTTPTimings(createdSpan);
      }
    });
  }
}
function isPerformanceResourceTiming(entry) {
  return entry.entryType === "resource" && "initiatorType" in entry && typeof entry.nextHopProtocol === "string" && (entry.initiatorType === "fetch" || entry.initiatorType === "xmlhttprequest");
}
function addHTTPTimings(span) {
  const url = span.data.url;
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      if (isPerformanceResourceTiming(entry) && entry.name.endsWith(url)) {
        const spanData = resourceTimingEntryToSpanData(entry);
        spanData.forEach((data) => span.setData(...data));
        observer.disconnect();
      }
    });
  });
  observer.observe({
    entryTypes: ["resource"]
  });
}
function extractNetworkProtocol(nextHopProtocol) {
  let name = "unknown";
  let version2 = "unknown";
  let _name = "";
  for (const char of nextHopProtocol) {
    if (char === "/") {
      [name, version2] = nextHopProtocol.split("/");
      break;
    }
    if (!isNaN(Number(char))) {
      name = _name === "h" ? "http" : _name;
      version2 = nextHopProtocol.split(_name)[1];
      break;
    }
    _name += char;
  }
  if (_name === nextHopProtocol) {
    name = _name;
  }
  return { name, version: version2 };
}
function getAbsoluteTime(time = 0) {
  return ((browserPerformanceTimeOrigin || performance.timeOrigin) + time) / 1e3;
}
function resourceTimingEntryToSpanData(resourceTiming) {
  const { name, version: version2 } = extractNetworkProtocol(resourceTiming.nextHopProtocol);
  const timingSpanData = [];
  timingSpanData.push(["network.protocol.version", version2], ["network.protocol.name", name]);
  if (!browserPerformanceTimeOrigin) {
    return timingSpanData;
  }
  return [
    ...timingSpanData,
    ["http.request.redirect_start", getAbsoluteTime(resourceTiming.redirectStart)],
    ["http.request.fetch_start", getAbsoluteTime(resourceTiming.fetchStart)],
    ["http.request.domain_lookup_start", getAbsoluteTime(resourceTiming.domainLookupStart)],
    ["http.request.domain_lookup_end", getAbsoluteTime(resourceTiming.domainLookupEnd)],
    ["http.request.connect_start", getAbsoluteTime(resourceTiming.connectStart)],
    ["http.request.secure_connection_start", getAbsoluteTime(resourceTiming.secureConnectionStart)],
    ["http.request.connection_end", getAbsoluteTime(resourceTiming.connectEnd)],
    ["http.request.request_start", getAbsoluteTime(resourceTiming.requestStart)],
    ["http.request.response_start", getAbsoluteTime(resourceTiming.responseStart)],
    ["http.request.response_end", getAbsoluteTime(resourceTiming.responseEnd)]
  ];
}
function shouldAttachHeaders(url, tracePropagationTargets) {
  return stringMatchesSomePattern(url, tracePropagationTargets || DEFAULT_TRACE_PROPAGATION_TARGETS);
}
function fetchCallback(handlerData, shouldCreateSpan, shouldAttachHeaders2, spans) {
  if (!hasTracingEnabled() || !handlerData.fetchData) {
    return void 0;
  }
  const shouldCreateSpanResult = shouldCreateSpan(handlerData.fetchData.url);
  if (handlerData.endTimestamp && shouldCreateSpanResult) {
    const spanId = handlerData.fetchData.__span;
    if (!spanId)
      return;
    const span2 = spans[spanId];
    if (span2) {
      if (handlerData.response) {
        span2.setHttpStatus(handlerData.response.status);
        const contentLength = (
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          handlerData.response && handlerData.response.headers && handlerData.response.headers.get("content-length")
        );
        const contentLengthNum = parseInt(contentLength);
        if (contentLengthNum > 0) {
          span2.setData("http.response_content_length", contentLengthNum);
        }
      } else if (handlerData.error) {
        span2.setStatus("internal_error");
      }
      span2.finish();
      delete spans[spanId];
    }
    return void 0;
  }
  const hub = getCurrentHub();
  const scope = hub.getScope();
  const client = hub.getClient();
  const parentSpan = scope.getSpan();
  const { method, url } = handlerData.fetchData;
  const span = shouldCreateSpanResult && parentSpan ? parentSpan.startChild({
    data: {
      url,
      type: "fetch",
      "http.method": method
    },
    description: `${method} ${url}`,
    op: "http.client",
    origin: "auto.http.browser"
  }) : void 0;
  if (span) {
    handlerData.fetchData.__span = span.spanId;
    spans[span.spanId] = span;
  }
  if (shouldAttachHeaders2(handlerData.fetchData.url) && client) {
    const request = handlerData.args[0];
    handlerData.args[1] = handlerData.args[1] || {};
    const options = handlerData.args[1];
    options.headers = addTracingHeadersToFetchRequest(request, client, scope, options, span);
  }
  return span;
}
function addTracingHeadersToFetchRequest(request, client, scope, options, requestSpan) {
  const span = requestSpan || scope.getSpan();
  const transaction = span && span.transaction;
  const { traceId, sampled, dsc } = scope.getPropagationContext();
  const sentryTraceHeader = span ? span.toTraceparent() : generateSentryTraceHeader(traceId, void 0, sampled);
  const dynamicSamplingContext = transaction ? transaction.getDynamicSamplingContext() : dsc ? dsc : getDynamicSamplingContextFromClient(traceId, client, scope);
  const sentryBaggageHeader = dynamicSamplingContextToSentryBaggageHeader(dynamicSamplingContext);
  const headers = typeof Request !== "undefined" && isInstanceOf(request, Request) ? request.headers : options.headers;
  if (!headers) {
    return { "sentry-trace": sentryTraceHeader, baggage: sentryBaggageHeader };
  } else if (typeof Headers !== "undefined" && isInstanceOf(headers, Headers)) {
    const newHeaders = new Headers(headers);
    newHeaders.append("sentry-trace", sentryTraceHeader);
    if (sentryBaggageHeader) {
      newHeaders.append(BAGGAGE_HEADER_NAME, sentryBaggageHeader);
    }
    return newHeaders;
  } else if (Array.isArray(headers)) {
    const newHeaders = [...headers, ["sentry-trace", sentryTraceHeader]];
    if (sentryBaggageHeader) {
      newHeaders.push([BAGGAGE_HEADER_NAME, sentryBaggageHeader]);
    }
    return newHeaders;
  } else {
    const existingBaggageHeader = "baggage" in headers ? headers.baggage : void 0;
    const newBaggageHeaders = [];
    if (Array.isArray(existingBaggageHeader)) {
      newBaggageHeaders.push(...existingBaggageHeader);
    } else if (existingBaggageHeader) {
      newBaggageHeaders.push(existingBaggageHeader);
    }
    if (sentryBaggageHeader) {
      newBaggageHeaders.push(sentryBaggageHeader);
    }
    return {
      ...headers,
      "sentry-trace": sentryTraceHeader,
      baggage: newBaggageHeaders.length > 0 ? newBaggageHeaders.join(",") : void 0
    };
  }
}
function xhrCallback(handlerData, shouldCreateSpan, shouldAttachHeaders2, spans) {
  const xhr = handlerData.xhr;
  const sentryXhrData = xhr && xhr[SENTRY_XHR_DATA_KEY];
  if (!hasTracingEnabled() || xhr && xhr.__sentry_own_request__ || !xhr || !sentryXhrData) {
    return void 0;
  }
  const shouldCreateSpanResult = shouldCreateSpan(sentryXhrData.url);
  if (handlerData.endTimestamp && shouldCreateSpanResult) {
    const spanId = xhr.__sentry_xhr_span_id__;
    if (!spanId)
      return;
    const span2 = spans[spanId];
    if (span2) {
      span2.setHttpStatus(sentryXhrData.status_code);
      span2.finish();
      delete spans[spanId];
    }
    return void 0;
  }
  const hub = getCurrentHub();
  const scope = hub.getScope();
  const parentSpan = scope.getSpan();
  const span = shouldCreateSpanResult && parentSpan ? parentSpan.startChild({
    data: {
      ...sentryXhrData.data,
      type: "xhr",
      "http.method": sentryXhrData.method,
      url: sentryXhrData.url
    },
    description: `${sentryXhrData.method} ${sentryXhrData.url}`,
    op: "http.client",
    origin: "auto.http.browser"
  }) : void 0;
  if (span) {
    xhr.__sentry_xhr_span_id__ = span.spanId;
    spans[xhr.__sentry_xhr_span_id__] = span;
  }
  if (xhr.setRequestHeader && shouldAttachHeaders2(sentryXhrData.url)) {
    if (span) {
      const transaction = span && span.transaction;
      const dynamicSamplingContext = transaction && transaction.getDynamicSamplingContext();
      const sentryBaggageHeader = dynamicSamplingContextToSentryBaggageHeader(dynamicSamplingContext);
      setHeaderOnXhr(xhr, span.toTraceparent(), sentryBaggageHeader);
    } else {
      const client = hub.getClient();
      const { traceId, sampled, dsc } = scope.getPropagationContext();
      const sentryTraceHeader = generateSentryTraceHeader(traceId, void 0, sampled);
      const dynamicSamplingContext = dsc || (client ? getDynamicSamplingContextFromClient(traceId, client, scope) : void 0);
      const sentryBaggageHeader = dynamicSamplingContextToSentryBaggageHeader(dynamicSamplingContext);
      setHeaderOnXhr(xhr, sentryTraceHeader, sentryBaggageHeader);
    }
  }
  return span;
}
function setHeaderOnXhr(xhr, sentryTraceHeader, sentryBaggageHeader) {
  try {
    xhr.setRequestHeader("sentry-trace", sentryTraceHeader);
    if (sentryBaggageHeader) {
      xhr.setRequestHeader(BAGGAGE_HEADER_NAME, sentryBaggageHeader);
    }
  } catch (_) {
  }
}
function instrumentRoutingWithDefaults(customStartTransaction, startTransactionOnPageLoad = true, startTransactionOnLocationChange = true) {
  if (!WINDOW || !WINDOW.location) {
    (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.warn("Could not initialize routing instrumentation due to invalid location");
    return;
  }
  let startingUrl = WINDOW.location.href;
  let activeTransaction;
  if (startTransactionOnPageLoad) {
    activeTransaction = customStartTransaction({
      name: WINDOW.location.pathname,
      // pageload should always start at timeOrigin (and needs to be in s, not ms)
      startTimestamp: browserPerformanceTimeOrigin ? browserPerformanceTimeOrigin / 1e3 : void 0,
      op: "pageload",
      origin: "auto.pageload.browser",
      metadata: { source: "url" }
    });
  }
  if (startTransactionOnLocationChange) {
    addInstrumentationHandler("history", ({ to, from }) => {
      if (from === void 0 && startingUrl && startingUrl.indexOf(to) !== -1) {
        startingUrl = void 0;
        return;
      }
      if (from !== to) {
        startingUrl = void 0;
        if (activeTransaction) {
          (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log(`[Tracing] Finishing current transaction with op: ${activeTransaction.op}`);
          activeTransaction.finish();
        }
        activeTransaction = customStartTransaction({
          name: WINDOW.location.pathname,
          op: "navigation",
          origin: "auto.navigation.browser",
          metadata: { source: "url" }
        });
      }
    });
  }
}
const BROWSER_TRACING_INTEGRATION_ID = "BrowserTracing";
const DEFAULT_BROWSER_TRACING_OPTIONS = {
  ...TRACING_DEFAULTS,
  markBackgroundTransactions: true,
  routingInstrumentation: instrumentRoutingWithDefaults,
  startTransactionOnLocationChange: true,
  startTransactionOnPageLoad: true,
  enableLongTask: true,
  _experiments: {},
  ...defaultRequestInstrumentationOptions
};
class BrowserTracing {
  // This class currently doesn't have a static `id` field like the other integration classes, because it prevented
  // @sentry/tracing from being treeshaken. Tree shakers do not like static fields, because they behave like side effects.
  // TODO: Come up with a better plan, than using static fields on integration classes, and use that plan on all
  // integrations.
  /** Browser Tracing integration options */
  /**
   * @inheritDoc
   */
  constructor(_options) {
    this.name = BROWSER_TRACING_INTEGRATION_ID;
    this._hasSetTracePropagationTargets = false;
    addTracingExtensions();
    if (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) {
      this._hasSetTracePropagationTargets = !!(_options && // eslint-disable-next-line deprecation/deprecation
      (_options.tracePropagationTargets || _options.tracingOrigins));
    }
    this.options = {
      ...DEFAULT_BROWSER_TRACING_OPTIONS,
      ..._options
    };
    if (this.options._experiments.enableLongTask !== void 0) {
      this.options.enableLongTask = this.options._experiments.enableLongTask;
    }
    if (_options && !_options.tracePropagationTargets && _options.tracingOrigins) {
      this.options.tracePropagationTargets = _options.tracingOrigins;
    }
    this._collectWebVitals = startTrackingWebVitals();
    if (this.options.enableLongTask) {
      startTrackingLongTasks();
    }
    if (this.options._experiments.enableInteractions) {
      startTrackingInteractions();
    }
  }
  /**
   * @inheritDoc
   */
  setupOnce(_, getCurrentHub2) {
    this._getCurrentHub = getCurrentHub2;
    const hub = getCurrentHub2();
    const client = hub.getClient();
    const clientOptions = client && client.getOptions();
    const {
      routingInstrumentation: instrumentRouting,
      startTransactionOnLocationChange,
      startTransactionOnPageLoad,
      markBackgroundTransactions,
      traceFetch,
      traceXHR,
      shouldCreateSpanForRequest,
      enableHTTPTimings,
      _experiments
    } = this.options;
    const clientOptionsTracePropagationTargets = clientOptions && clientOptions.tracePropagationTargets;
    const tracePropagationTargets = clientOptionsTracePropagationTargets || this.options.tracePropagationTargets;
    if ((typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && this._hasSetTracePropagationTargets && clientOptionsTracePropagationTargets) {
      logger.warn(
        "[Tracing] The `tracePropagationTargets` option was set in the BrowserTracing integration and top level `Sentry.init`. The top level `Sentry.init` value is being used."
      );
    }
    instrumentRouting(
      (context) => {
        const transaction = this._createRouteTransaction(context);
        this.options._experiments.onStartRouteTransaction && this.options._experiments.onStartRouteTransaction(transaction, context, getCurrentHub2);
        return transaction;
      },
      startTransactionOnPageLoad,
      startTransactionOnLocationChange
    );
    if (markBackgroundTransactions) {
      registerBackgroundTabDetection();
    }
    if (_experiments.enableInteractions) {
      this._registerInteractionListener();
    }
    instrumentOutgoingRequests({
      traceFetch,
      traceXHR,
      tracePropagationTargets,
      shouldCreateSpanForRequest,
      enableHTTPTimings
    });
  }
  /** Create routing idle transaction. */
  _createRouteTransaction(context) {
    if (!this._getCurrentHub) {
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.warn(`[Tracing] Did not create ${context.op} transaction because _getCurrentHub is invalid.`);
      return void 0;
    }
    const hub = this._getCurrentHub();
    const { beforeNavigate, idleTimeout, finalTimeout, heartbeatInterval } = this.options;
    const isPageloadTransaction = context.op === "pageload";
    const sentryTrace = isPageloadTransaction ? getMetaContent("sentry-trace") : "";
    const baggage = isPageloadTransaction ? getMetaContent("baggage") : "";
    const { traceparentData, dynamicSamplingContext, propagationContext } = tracingContextFromHeaders(
      sentryTrace,
      baggage
    );
    const expandedContext = {
      ...context,
      ...traceparentData,
      metadata: {
        ...context.metadata,
        dynamicSamplingContext: traceparentData && !dynamicSamplingContext ? {} : dynamicSamplingContext
      },
      trimEnd: true
    };
    const modifiedContext = typeof beforeNavigate === "function" ? beforeNavigate(expandedContext) : expandedContext;
    const finalContext = modifiedContext === void 0 ? { ...expandedContext, sampled: false } : modifiedContext;
    finalContext.metadata = finalContext.name !== expandedContext.name ? { ...finalContext.metadata, source: "custom" } : finalContext.metadata;
    this._latestRouteName = finalContext.name;
    this._latestRouteSource = finalContext.metadata && finalContext.metadata.source;
    if (finalContext.sampled === false) {
      (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log(`[Tracing] Will not send ${finalContext.op} transaction because of beforeNavigate.`);
    }
    (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.log(`[Tracing] Starting ${finalContext.op} transaction on scope`);
    const { location } = WINDOW;
    const idleTransaction = startIdleTransaction(
      hub,
      finalContext,
      idleTimeout,
      finalTimeout,
      true,
      { location },
      // for use in the tracesSampler
      heartbeatInterval
    );
    const scope = hub.getScope();
    if (isPageloadTransaction && traceparentData) {
      scope.setPropagationContext(propagationContext);
    } else {
      scope.setPropagationContext({
        traceId: idleTransaction.traceId,
        spanId: idleTransaction.spanId,
        parentSpanId: idleTransaction.parentSpanId,
        sampled: idleTransaction.sampled
      });
    }
    idleTransaction.registerBeforeFinishCallback((transaction) => {
      this._collectWebVitals();
      addPerformanceEntries(transaction);
    });
    return idleTransaction;
  }
  /** Start listener for interaction transactions */
  _registerInteractionListener() {
    let inflightInteractionTransaction;
    const registerInteractionTransaction = () => {
      const { idleTimeout, finalTimeout, heartbeatInterval } = this.options;
      const op = "ui.action.click";
      const currentTransaction = getActiveTransaction();
      if (currentTransaction && currentTransaction.op && ["navigation", "pageload"].includes(currentTransaction.op)) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.warn(
          `[Tracing] Did not create ${op} transaction because a pageload or navigation transaction is in progress.`
        );
        return void 0;
      }
      if (inflightInteractionTransaction) {
        inflightInteractionTransaction.setFinishReason("interactionInterrupted");
        inflightInteractionTransaction.finish();
        inflightInteractionTransaction = void 0;
      }
      if (!this._getCurrentHub) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.warn(`[Tracing] Did not create ${op} transaction because _getCurrentHub is invalid.`);
        return void 0;
      }
      if (!this._latestRouteName) {
        (typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__) && logger.warn(`[Tracing] Did not create ${op} transaction because _latestRouteName is missing.`);
        return void 0;
      }
      const hub = this._getCurrentHub();
      const { location } = WINDOW;
      const context = {
        name: this._latestRouteName,
        op,
        trimEnd: true,
        metadata: {
          source: this._latestRouteSource || "url"
        }
      };
      inflightInteractionTransaction = startIdleTransaction(
        hub,
        context,
        idleTimeout,
        finalTimeout,
        true,
        { location },
        // for use in the tracesSampler
        heartbeatInterval
      );
    };
    ["click"].forEach((type) => {
      addEventListener(type, registerInteractionTransaction, { once: false, capture: true });
    });
  }
}
function getMetaContent(metaName) {
  const metaTag = getDomElement(`meta[name=${metaName}]`);
  return metaTag ? metaTag.getAttribute("content") : void 0;
}
function init(options) {
  options._metadata = options._metadata || {};
  options._metadata.sdk = options._metadata.sdk || {
    name: "sentry.javascript.svelte",
    packages: [
      {
        name: "npm:@sentry/svelte",
        version: SDK_VERSION
      }
    ],
    version: SDK_VERSION
  };
  init$1(options);
  detectAndReportSvelteKit();
}
function detectAndReportSvelteKit() {
  let detectedSvelteKit = void 0;
  const svelteKitProcessor = (event) => {
    if (detectedSvelteKit === void 0) {
      detectedSvelteKit = isSvelteKitApp();
    }
    if (detectedSvelteKit) {
      event.modules = {
        svelteKit: "latest",
        ...event.modules
      };
    }
    return event;
  };
  svelteKitProcessor.id = "svelteKitProcessor";
  addGlobalEventProcessor(svelteKitProcessor);
}
function isSvelteKitApp() {
  return getDomElement("div#svelte-announcer") !== null;
}
{
  init({
    dsn: "https://bfc7c7515f17454189e180ba8b9d187c@o4505591422648320.ingest.sentry.io/4505591444602880",
    integrations: [
      new BrowserTracing(),
      new Replay({
        maxReplayDuration: 6e4,
        beforeAddRecordingEvent: (event) => {
          var _a;
          if (event.data.tag === "performanceSpan" && (event.data.payload.op === "resource.fetch" || event.data.payload.op === "resource.xhr" || event.data.payload.op === "resource.img") && ((_a = event.data.payload.data) == null ? void 0 : _a.statusCode) < 400) {
            return null;
          }
          return event;
        }
      })
    ],
    release: version,
    environment: "production",
    tracesSampleRate: 1,
    tracePropagationTargets: ["localhost"],
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0
  });
}
function create_if_block$1(ctx) {
  let modal;
  let current;
  modal = new Modal({
    props: {
      handleClose: (
        /*onCancel*/
        ctx[3]
      ),
      $$slots: { content: [create_content_slot$1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(modal.$$.fragment);
    },
    l(nodes) {
      claim_component(modal.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(modal, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const modal_changes = {};
      if (dirty & /*$$scope, value*/
      66) {
        modal_changes.$$scope = { dirty, ctx: ctx2 };
      }
      modal.$set(modal_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(modal.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(modal.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(modal, detaching);
    }
  };
}
function create_default_slot_5$1(ctx) {
  let h2;
  let textContent = "New local dashboard";
  return {
    c() {
      h2 = element("h2");
      h2.textContent = textContent;
    },
    l(nodes) {
      h2 = claim_element(nodes, "H2", { ["data-svelte-h"]: true });
      if (get_svelte_dataset(h2) !== "svelte-222t09")
        h2.textContent = textContent;
    },
    m(target, anchor) {
      insert_hydration(target, h2, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(h2);
      }
    }
  };
}
function create_header_slot(ctx) {
  let modal_content_header;
  let current;
  modal_content_header = new Modal.Content.Header({
    props: {
      slot: "header",
      $$slots: { default: [create_default_slot_5$1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(modal_content_header.$$.fragment);
    },
    l(nodes) {
      claim_component(modal_content_header.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(modal_content_header, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const modal_content_header_changes = {};
      if (dirty & /*$$scope*/
      64) {
        modal_content_header_changes.$$scope = { dirty, ctx: ctx2 };
      }
      modal_content_header.$set(modal_content_header_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(modal_content_header.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(modal_content_header.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(modal_content_header, detaching);
    }
  };
}
function create_default_slot_4$1(ctx) {
  let input;
  let updating_value;
  let t0;
  let p;
  let textContent = `NOTE:
                        Local dashboards you create in this browser, are stored in this browser. This means that the dashboard will not
                        be available on any other devices. If you want the dashboard to be available on other devices, use the native Homey App
                        and add a new device of type <i>Dashboard</i>. This requires you to install the Homey Dashboards app.`;
  let current;
  function input_value_binding(value) {
    ctx[4](value);
  }
  let input_props = {
    name: "name",
    placeholder: "Dashboard name"
  };
  if (
    /*value*/
    ctx[1] !== void 0
  ) {
    input_props.value = /*value*/
    ctx[1];
  }
  input = new Input({ props: input_props });
  binding_callbacks.push(() => bind(input, "value", input_value_binding));
  return {
    c() {
      create_component(input.$$.fragment);
      t0 = space();
      p = element("p");
      p.innerHTML = textContent;
      this.h();
    },
    l(nodes) {
      claim_component(input.$$.fragment, nodes);
      t0 = claim_space(nodes);
      p = claim_element(nodes, "P", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(p) !== "svelte-okk89x")
        p.innerHTML = textContent;
      this.h();
    },
    h() {
      attr(p, "class", "mt-4");
    },
    m(target, anchor) {
      mount_component(input, target, anchor);
      insert_hydration(target, t0, anchor);
      insert_hydration(target, p, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const input_changes = {};
      if (!updating_value && dirty & /*value*/
      2) {
        updating_value = true;
        input_changes.value = /*value*/
        ctx2[1];
        add_flush_callback(() => updating_value = false);
      }
      input.$set(input_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(input.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(input.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t0);
        detach(p);
      }
      destroy_component(input, detaching);
    }
  };
}
function create_body_slot(ctx) {
  let modal_content_body;
  let current;
  modal_content_body = new Modal.Content.Body({
    props: {
      slot: "body",
      $$slots: { default: [create_default_slot_4$1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(modal_content_body.$$.fragment);
    },
    l(nodes) {
      claim_component(modal_content_body.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(modal_content_body, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const modal_content_body_changes = {};
      if (dirty & /*$$scope, value*/
      66) {
        modal_content_body_changes.$$scope = { dirty, ctx: ctx2 };
      }
      modal_content_body.$set(modal_content_body_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(modal_content_body.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(modal_content_body.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(modal_content_body, detaching);
    }
  };
}
function create_default_slot_3$1(ctx) {
  let t;
  return {
    c() {
      t = text("Cancel");
    },
    l(nodes) {
      t = claim_text(nodes, "Cancel");
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_default_slot_2$1(ctx) {
  let t;
  return {
    c() {
      t = text("Create");
    },
    l(nodes) {
      t = claim_text(nodes, "Create");
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_default_slot_1$1(ctx) {
  let button0;
  let t;
  let button1;
  let current;
  button0 = new Button({
    props: {
      $$slots: { default: [create_default_slot_3$1] },
      $$scope: { ctx }
    }
  });
  button0.$on(
    "click",
    /*onCancel*/
    ctx[3]
  );
  button1 = new Button({
    props: {
      disabled: (
        /*value*/
        ctx[1].length < 3
      ),
      $$slots: { default: [create_default_slot_2$1] },
      $$scope: { ctx }
    }
  });
  button1.$on(
    "click",
    /*onCreate*/
    ctx[2]
  );
  return {
    c() {
      create_component(button0.$$.fragment);
      t = space();
      create_component(button1.$$.fragment);
    },
    l(nodes) {
      claim_component(button0.$$.fragment, nodes);
      t = claim_space(nodes);
      claim_component(button1.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(button0, target, anchor);
      insert_hydration(target, t, anchor);
      mount_component(button1, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const button0_changes = {};
      if (dirty & /*$$scope*/
      64) {
        button0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      button0.$set(button0_changes);
      const button1_changes = {};
      if (dirty & /*value*/
      2)
        button1_changes.disabled = /*value*/
        ctx2[1].length < 3;
      if (dirty & /*$$scope*/
      64) {
        button1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      button1.$set(button1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(button0.$$.fragment, local);
      transition_in(button1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button0.$$.fragment, local);
      transition_out(button1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
      destroy_component(button0, detaching);
      destroy_component(button1, detaching);
    }
  };
}
function create_footer_slot(ctx) {
  let modal_content_footer;
  let current;
  modal_content_footer = new Modal.Content.Footer({
    props: {
      slot: "footer",
      $$slots: { default: [create_default_slot_1$1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(modal_content_footer.$$.fragment);
    },
    l(nodes) {
      claim_component(modal_content_footer.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(modal_content_footer, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const modal_content_footer_changes = {};
      if (dirty & /*$$scope, value*/
      66) {
        modal_content_footer_changes.$$scope = { dirty, ctx: ctx2 };
      }
      modal_content_footer.$set(modal_content_footer_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(modal_content_footer.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(modal_content_footer.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(modal_content_footer, detaching);
    }
  };
}
function create_content_slot$1(ctx) {
  let modal_content;
  let current;
  modal_content = new Modal.Content({
    props: {
      slot: "content",
      $$slots: {
        footer: [create_footer_slot],
        body: [create_body_slot],
        header: [create_header_slot]
      },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(modal_content.$$.fragment);
    },
    l(nodes) {
      claim_component(modal_content.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(modal_content, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const modal_content_changes = {};
      if (dirty & /*$$scope, value*/
      66) {
        modal_content_changes.$$scope = { dirty, ctx: ctx2 };
      }
      modal_content.$set(modal_content_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(modal_content.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(modal_content.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(modal_content, detaching);
    }
  };
}
function create_default_slot$1(ctx) {
  let if_block_anchor;
  let current;
  let if_block = (
    /*open*/
    ctx[0] && create_if_block$1(ctx)
  );
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (
        /*open*/
        ctx2[0]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*open*/
          1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$1(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if (if_block)
        if_block.d(detaching);
    }
  };
}
function create_fragment$1(ctx) {
  let portal;
  let current;
  portal = new Portal({
    props: {
      $$slots: { default: [create_default_slot$1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(portal.$$.fragment);
    },
    l(nodes) {
      claim_component(portal.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(portal, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const portal_changes = {};
      if (dirty & /*$$scope, value, open*/
      67) {
        portal_changes.$$scope = { dirty, ctx: ctx2 };
      }
      portal.$set(portal_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(portal.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(portal.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(portal, detaching);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let { open } = $$props;
  let value = "";
  const dispatch = createEventDispatcher();
  function onCreate() {
    dispatch("value", value);
    $$invalidate(1, value = "");
    $$invalidate(0, open = false);
    dispatch("open", open);
  }
  function onCancel() {
    $$invalidate(1, value = "");
    $$invalidate(0, open = false);
    dispatch("open", open);
  }
  function input_value_binding(value$1) {
    value = value$1;
    $$invalidate(1, value);
  }
  $$self.$$set = ($$props2) => {
    if ("open" in $$props2)
      $$invalidate(0, open = $$props2.open);
  };
  return [open, value, onCreate, onCancel, input_value_binding];
}
class AddDashboardDialog extends SvelteComponent {
  constructor(options) {
    super();
    init$2(this, options, instance$1, create_fragment$1, safe_not_equal, { open: 0 });
  }
}
const app = "";
const { document: document_1 } = globals;
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[50] = list[i];
  return child_ctx;
}
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[50] = list[i];
  return child_ctx;
}
function get_each_context_2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[55] = list[i];
  return child_ctx;
}
function create_else_block(ctx) {
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[18].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[38],
    null
  );
  return {
    c() {
      if (default_slot)
        default_slot.c();
    },
    l(nodes) {
      if (default_slot)
        default_slot.l(nodes);
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty[1] & /*$$scope*/
        128)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[38],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[38]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[38],
              dirty,
              null
            ),
            null
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_if_block_1(ctx) {
  let t0;
  let adddashboarddialog;
  let updating_open;
  let t1;
  let drawer;
  let updating_open_1;
  let t2;
  let t3;
  let current;
  let if_block0 = (
    /*menuOpen*/
    ctx[1] == false && /*toolbarOpen*/
    ctx[2] == false && create_if_block_10(ctx)
  );
  function adddashboarddialog_open_binding(value) {
    ctx[20](value);
  }
  let adddashboarddialog_props = {};
  if (
    /*addDashboardOpen*/
    ctx[4] !== void 0
  ) {
    adddashboarddialog_props.open = /*addDashboardOpen*/
    ctx[4];
  }
  adddashboarddialog = new AddDashboardDialog({ props: adddashboarddialog_props });
  binding_callbacks.push(() => bind(adddashboarddialog, "open", adddashboarddialog_open_binding));
  adddashboarddialog.$on(
    "value",
    /*value_handler*/
    ctx[21]
  );
  function drawer_open_binding(value) {
    ctx[29](value);
  }
  let drawer_props = {
    position: "left",
    size: "xs",
    class: "overflow-auto",
    $$slots: { default: [create_default_slot_2] },
    $$scope: { ctx }
  };
  if (
    /*menuOpen*/
    ctx[1] !== void 0
  ) {
    drawer_props.open = /*menuOpen*/
    ctx[1];
  }
  drawer = new Drawer({ props: drawer_props });
  binding_callbacks.push(() => bind(drawer, "open", drawer_open_binding));
  let if_block1 = (
    /*toolbarOpen*/
    ctx[2] && create_if_block_2(ctx)
  );
  const default_slot_template = (
    /*#slots*/
    ctx[18].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[38],
    null
  );
  return {
    c() {
      if (if_block0)
        if_block0.c();
      t0 = space();
      create_component(adddashboarddialog.$$.fragment);
      t1 = space();
      create_component(drawer.$$.fragment);
      t2 = space();
      if (if_block1)
        if_block1.c();
      t3 = space();
      if (default_slot)
        default_slot.c();
    },
    l(nodes) {
      if (if_block0)
        if_block0.l(nodes);
      t0 = claim_space(nodes);
      claim_component(adddashboarddialog.$$.fragment, nodes);
      t1 = claim_space(nodes);
      claim_component(drawer.$$.fragment, nodes);
      t2 = claim_space(nodes);
      if (if_block1)
        if_block1.l(nodes);
      t3 = claim_space(nodes);
      if (default_slot)
        default_slot.l(nodes);
    },
    m(target, anchor) {
      if (if_block0)
        if_block0.m(target, anchor);
      insert_hydration(target, t0, anchor);
      mount_component(adddashboarddialog, target, anchor);
      insert_hydration(target, t1, anchor);
      mount_component(drawer, target, anchor);
      insert_hydration(target, t2, anchor);
      if (if_block1)
        if_block1.m(target, anchor);
      insert_hydration(target, t3, anchor);
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (
        /*menuOpen*/
        ctx2[1] == false && /*toolbarOpen*/
        ctx2[2] == false
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty[0] & /*menuOpen, toolbarOpen*/
          6) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_10(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(t0.parentNode, t0);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      const adddashboarddialog_changes = {};
      if (!updating_open && dirty[0] & /*addDashboardOpen*/
      16) {
        updating_open = true;
        adddashboarddialog_changes.open = /*addDashboardOpen*/
        ctx2[4];
        add_flush_callback(() => updating_open = false);
      }
      adddashboarddialog.$set(adddashboarddialog_changes);
      const drawer_changes = {};
      if (dirty[0] & /*fullscreenSupported, toolbarOpen, $dashboard, dashboards, $user*/
      868 | dirty[1] & /*$$scope*/
      128) {
        drawer_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_open_1 && dirty[0] & /*menuOpen*/
      2) {
        updating_open_1 = true;
        drawer_changes.open = /*menuOpen*/
        ctx2[1];
        add_flush_callback(() => updating_open_1 = false);
      }
      drawer.$set(drawer_changes);
      if (
        /*toolbarOpen*/
        ctx2[2]
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty[0] & /*toolbarOpen*/
          4) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_2(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(t3.parentNode, t3);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
      if (default_slot) {
        if (default_slot.p && (!current || dirty[1] & /*$$scope*/
        128)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[38],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[38]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[38],
              dirty,
              null
            ),
            null
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block0);
      transition_in(adddashboarddialog.$$.fragment, local);
      transition_in(drawer.$$.fragment, local);
      transition_in(if_block1);
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(adddashboarddialog.$$.fragment, local);
      transition_out(drawer.$$.fragment, local);
      transition_out(if_block1);
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t0);
        detach(t1);
        detach(t2);
        detach(t3);
      }
      if (if_block0)
        if_block0.d(detaching);
      destroy_component(adddashboarddialog, detaching);
      destroy_component(drawer, detaching);
      if (if_block1)
        if_block1.d(detaching);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_if_block(ctx) {
  let div;
  let progress;
  let current;
  progress = new Progress({
    props: {
      size: "xs",
      indeterminate: true,
      value: 0
    }
  });
  return {
    c() {
      div = element("div");
      create_component(progress.$$.fragment);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(progress.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "w-full");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      mount_component(progress, div, null);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(progress.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(progress.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(progress);
    }
  };
}
function create_if_block_10(ctx) {
  let iconbutton;
  let current;
  iconbutton = new IconButton({
    props: {
      data: mdiMenu,
      class: "absolute left-0 top-0 z-10 text-primary-content bg-primary rounded-none rounded-br-3xl",
      size: "32px"
    }
  });
  iconbutton.$on(
    "click",
    /*click_handler*/
    ctx[19]
  );
  return {
    c() {
      create_component(iconbutton.$$.fragment);
    },
    l(nodes) {
      claim_component(iconbutton.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(iconbutton, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(iconbutton.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(iconbutton.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(iconbutton, detaching);
    }
  };
}
function create_if_block_8(ctx) {
  let media;
  let t;
  let if_block_anchor;
  let current;
  media = new Media({
    props: {
      $$slots: { default: [create_default_slot_16] },
      $$scope: { ctx }
    }
  });
  let if_block = (
    /*$user*/
    ctx[8].homeys.length > 1 && create_if_block_9(ctx)
  );
  return {
    c() {
      create_component(media.$$.fragment);
      t = space();
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      claim_component(media.$$.fragment, nodes);
      t = claim_space(nodes);
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      mount_component(media, target, anchor);
      insert_hydration(target, t, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const media_changes = {};
      if (dirty[0] & /*$user*/
      256 | dirty[1] & /*$$scope*/
      128) {
        media_changes.$$scope = { dirty, ctx: ctx2 };
      }
      media.$set(media_changes);
      if (
        /*$user*/
        ctx2[8].homeys.length > 1
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty[0] & /*$user*/
          256) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_9(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(media.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(media.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
        detach(if_block_anchor);
      }
      destroy_component(media, detaching);
      if (if_block)
        if_block.d(detaching);
    }
  };
}
function create_default_slot_19(ctx) {
  let t_value = (
    /*$user*/
    ctx[8].firstname + ""
  );
  let t;
  return {
    c() {
      t = text(t_value);
    },
    l(nodes) {
      t = claim_text(nodes, t_value);
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*$user*/
      256 && t_value !== (t_value = /*$user*/
      ctx2[8].firstname + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_default_slot_18(ctx) {
  let t_value = (
    /*$user*/
    ctx[8].email + ""
  );
  let t;
  return {
    c() {
      t = text(t_value);
    },
    l(nodes) {
      t = claim_text(nodes, t_value);
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*$user*/
      256 && t_value !== (t_value = /*$user*/
      ctx2[8].email + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_default_slot_17(ctx) {
  let media_content_title;
  let t;
  let media_content_description;
  let current;
  media_content_title = new Media.Content.Title({
    props: {
      $$slots: { default: [create_default_slot_19] },
      $$scope: { ctx }
    }
  });
  media_content_description = new Media.Content.Description({
    props: {
      $$slots: { default: [create_default_slot_18] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(media_content_title.$$.fragment);
      t = space();
      create_component(media_content_description.$$.fragment);
    },
    l(nodes) {
      claim_component(media_content_title.$$.fragment, nodes);
      t = claim_space(nodes);
      claim_component(media_content_description.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(media_content_title, target, anchor);
      insert_hydration(target, t, anchor);
      mount_component(media_content_description, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const media_content_title_changes = {};
      if (dirty[0] & /*$user*/
      256 | dirty[1] & /*$$scope*/
      128) {
        media_content_title_changes.$$scope = { dirty, ctx: ctx2 };
      }
      media_content_title.$set(media_content_title_changes);
      const media_content_description_changes = {};
      if (dirty[0] & /*$user*/
      256 | dirty[1] & /*$$scope*/
      128) {
        media_content_description_changes.$$scope = { dirty, ctx: ctx2 };
      }
      media_content_description.$set(media_content_description_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(media_content_title.$$.fragment, local);
      transition_in(media_content_description.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(media_content_title.$$.fragment, local);
      transition_out(media_content_description.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
      destroy_component(media_content_title, detaching);
      destroy_component(media_content_description, detaching);
    }
  };
}
function create_default_slot_16(ctx) {
  let media_avatar;
  let t;
  let media_content;
  let current;
  media_avatar = new Media.Avatar({
    props: { src: (
      /*$user*/
      ctx[8].avatar.small
    ) }
  });
  media_content = new Media.Content({
    props: {
      $$slots: { default: [create_default_slot_17] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(media_avatar.$$.fragment);
      t = space();
      create_component(media_content.$$.fragment);
    },
    l(nodes) {
      claim_component(media_avatar.$$.fragment, nodes);
      t = claim_space(nodes);
      claim_component(media_content.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(media_avatar, target, anchor);
      insert_hydration(target, t, anchor);
      mount_component(media_content, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const media_avatar_changes = {};
      if (dirty[0] & /*$user*/
      256)
        media_avatar_changes.src = /*$user*/
        ctx2[8].avatar.small;
      media_avatar.$set(media_avatar_changes);
      const media_content_changes = {};
      if (dirty[0] & /*$user*/
      256 | dirty[1] & /*$$scope*/
      128) {
        media_content_changes.$$scope = { dirty, ctx: ctx2 };
      }
      media_content.$set(media_content_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(media_avatar.$$.fragment, local);
      transition_in(media_content.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(media_avatar.$$.fragment, local);
      transition_out(media_content.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
      destroy_component(media_avatar, detaching);
      destroy_component(media_content, detaching);
    }
  };
}
function create_if_block_9(ctx) {
  let divider;
  let t;
  let list;
  let current;
  divider = new Divider({
    props: {
      $$slots: { label: [create_label_slot_4] },
      $$scope: { ctx }
    }
  });
  list = new List({
    props: {
      $$slots: { default: [create_default_slot_13] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(divider.$$.fragment);
      t = space();
      create_component(list.$$.fragment);
    },
    l(nodes) {
      claim_component(divider.$$.fragment, nodes);
      t = claim_space(nodes);
      claim_component(list.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(divider, target, anchor);
      insert_hydration(target, t, anchor);
      mount_component(list, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const divider_changes = {};
      if (dirty[1] & /*$$scope*/
      128) {
        divider_changes.$$scope = { dirty, ctx: ctx2 };
      }
      divider.$set(divider_changes);
      const list_changes = {};
      if (dirty[0] & /*$user*/
      256 | dirty[1] & /*$$scope*/
      128) {
        list_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list.$set(list_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(divider.$$.fragment, local);
      transition_in(list.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(divider.$$.fragment, local);
      transition_out(list.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
      destroy_component(divider, detaching);
      destroy_component(list, detaching);
    }
  };
}
function create_default_slot_15(ctx) {
  let t;
  return {
    c() {
      t = text("Homeys");
    },
    l(nodes) {
      t = claim_text(nodes, "Homeys");
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_label_slot_4(ctx) {
  let divider_label;
  let current;
  divider_label = new Divider.Label({
    props: {
      slot: "label",
      $$slots: { default: [create_default_slot_15] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(divider_label.$$.fragment);
    },
    l(nodes) {
      claim_component(divider_label.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(divider_label, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const divider_label_changes = {};
      if (dirty[1] & /*$$scope*/
      128) {
        divider_label_changes.$$scope = { dirty, ctx: ctx2 };
      }
      divider_label.$set(divider_label_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(divider_label.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(divider_label.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(divider_label, detaching);
    }
  };
}
function create_icon_slot_9(ctx) {
  let list_item_leading_icon;
  let current;
  list_item_leading_icon = new List.Item.Leading.Icon({
    props: { slot: "icon", data: mdiDeathStarVariant }
  });
  return {
    c() {
      create_component(list_item_leading_icon.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_leading_icon.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_leading_icon, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(list_item_leading_icon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_leading_icon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_leading_icon, detaching);
    }
  };
}
function create_leading_slot_4(ctx) {
  let list_item_leading;
  let current;
  list_item_leading = new List.Item.Leading({
    props: {
      slot: "leading",
      $$slots: { icon: [create_icon_slot_9] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(list_item_leading.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_leading.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_leading, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const list_item_leading_changes = {};
      if (dirty[1] & /*$$scope*/
      128) {
        list_item_leading_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list_item_leading.$set(list_item_leading_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list_item_leading.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_leading.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_leading, detaching);
    }
  };
}
function create_default_slot_14(ctx) {
  let t_value = (
    /*h*/
    ctx[55].name + ""
  );
  let t;
  return {
    c() {
      t = text(t_value);
    },
    l(nodes) {
      t = claim_text(nodes, t_value);
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*$user*/
      256 && t_value !== (t_value = /*h*/
      ctx2[55].name + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_title_slot_4(ctx) {
  let list_item_content_title;
  let current;
  list_item_content_title = new List.Item.Content.Title({
    props: {
      slot: "title",
      $$slots: { default: [create_default_slot_14] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(list_item_content_title.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_content_title.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_content_title, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const list_item_content_title_changes = {};
      if (dirty[0] & /*$user*/
      256 | dirty[1] & /*$$scope*/
      128) {
        list_item_content_title_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list_item_content_title.$set(list_item_content_title_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list_item_content_title.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_content_title.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_content_title, detaching);
    }
  };
}
function create_content_slot_4(ctx) {
  let list_item_content;
  let current;
  list_item_content = new List.Item.Content({
    props: {
      slot: "content",
      $$slots: { title: [create_title_slot_4] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(list_item_content.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_content.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_content, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const list_item_content_changes = {};
      if (dirty[0] & /*$user*/
      256 | dirty[1] & /*$$scope*/
      128) {
        list_item_content_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list_item_content.$set(list_item_content_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list_item_content.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_content.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_content, detaching);
    }
  };
}
function create_each_block_2(ctx) {
  let list_item;
  let current;
  function click_handler_1() {
    return (
      /*click_handler_1*/
      ctx[22](
        /*h*/
        ctx[55]
      )
    );
  }
  list_item = new List.Item({
    props: {
      class: "pt-2 pb-2 cursor-pointer",
      $$slots: {
        content: [create_content_slot_4],
        leading: [create_leading_slot_4]
      },
      $$scope: { ctx }
    }
  });
  list_item.$on("click", click_handler_1);
  return {
    c() {
      create_component(list_item.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item, target, anchor);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const list_item_changes = {};
      if (dirty[0] & /*$user*/
      256 | dirty[1] & /*$$scope*/
      128) {
        list_item_changes.$$scope = { dirty, ctx };
      }
      list_item.$set(list_item_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list_item.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item, detaching);
    }
  };
}
function create_default_slot_13(ctx) {
  let each_1_anchor;
  let current;
  let each_value_2 = ensure_array_like(
    /*$user*/
    ctx[8].homeys
  );
  let each_blocks = [];
  for (let i = 0; i < each_value_2.length; i += 1) {
    each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    l(nodes) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(nodes);
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(target, anchor);
        }
      }
      insert_hydration(target, each_1_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*selectHomey, $user*/
      33024) {
        each_value_2 = ensure_array_like(
          /*$user*/
          ctx2[8].homeys
        );
        let i;
        for (i = 0; i < each_value_2.length; i += 1) {
          const child_ctx = get_each_context_2(ctx2, each_value_2, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block_2(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        group_outros();
        for (i = each_value_2.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value_2.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(each_1_anchor);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_default_slot_12(ctx) {
  let t;
  return {
    c() {
      t = text("Dashboards");
    },
    l(nodes) {
      t = claim_text(nodes, "Dashboards");
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_label_slot_3(ctx) {
  let divider_label;
  let current;
  divider_label = new Divider.Label({
    props: {
      slot: "label",
      $$slots: { default: [create_default_slot_12] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(divider_label.$$.fragment);
    },
    l(nodes) {
      claim_component(divider_label.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(divider_label, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const divider_label_changes = {};
      if (dirty[1] & /*$$scope*/
      128) {
        divider_label_changes.$$scope = { dirty, ctx: ctx2 };
      }
      divider_label.$set(divider_label_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(divider_label.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(divider_label.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(divider_label, detaching);
    }
  };
}
function create_icon_slot_8(ctx) {
  let list_item_leading_icon;
  let current;
  list_item_leading_icon = new List.Item.Leading.Icon({
    props: { slot: "icon", data: mdiViewDashboard }
  });
  return {
    c() {
      create_component(list_item_leading_icon.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_leading_icon.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_leading_icon, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(list_item_leading_icon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_leading_icon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_leading_icon, detaching);
    }
  };
}
function create_leading_slot_3(ctx) {
  let list_item_leading;
  let current;
  list_item_leading = new List.Item.Leading({
    props: {
      slot: "leading",
      $$slots: { icon: [create_icon_slot_8] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(list_item_leading.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_leading.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_leading, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const list_item_leading_changes = {};
      if (dirty[1] & /*$$scope*/
      128) {
        list_item_leading_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list_item_leading.$set(list_item_leading_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list_item_leading.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_leading.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_leading, detaching);
    }
  };
}
function create_default_slot_11(ctx) {
  let t_value = (
    /*d*/
    ctx[50].title + ""
  );
  let t;
  return {
    c() {
      t = text(t_value);
    },
    l(nodes) {
      t = claim_text(nodes, t_value);
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*dashboards*/
      64 && t_value !== (t_value = /*d*/
      ctx2[50].title + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_title_slot_3(ctx) {
  let list_item_content_title;
  let current;
  list_item_content_title = new List.Item.Content.Title({
    props: {
      slot: "title",
      $$slots: { default: [create_default_slot_11] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(list_item_content_title.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_content_title.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_content_title, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const list_item_content_title_changes = {};
      if (dirty[0] & /*dashboards*/
      64 | dirty[1] & /*$$scope*/
      128) {
        list_item_content_title_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list_item_content_title.$set(list_item_content_title_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list_item_content_title.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_content_title.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_content_title, detaching);
    }
  };
}
function create_content_slot_3(ctx) {
  let list_item_content;
  let current;
  list_item_content = new List.Item.Content({
    props: {
      slot: "content",
      $$slots: { title: [create_title_slot_3] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(list_item_content.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_content.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_content, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const list_item_content_changes = {};
      if (dirty[0] & /*dashboards*/
      64 | dirty[1] & /*$$scope*/
      128) {
        list_item_content_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list_item_content.$set(list_item_content_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list_item_content.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_content.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_content, detaching);
    }
  };
}
function create_each_block_1(ctx) {
  let list_item;
  let current;
  function click_handler_2() {
    return (
      /*click_handler_2*/
      ctx[23](
        /*d*/
        ctx[50]
      )
    );
  }
  list_item = new List.Item({
    props: {
      class: "pt-2 pb-2 cursor-pointer",
      $$slots: {
        content: [create_content_slot_3],
        leading: [create_leading_slot_3]
      },
      $$scope: { ctx }
    }
  });
  list_item.$on("click", click_handler_2);
  return {
    c() {
      create_component(list_item.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item, target, anchor);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const list_item_changes = {};
      if (dirty[0] & /*dashboards*/
      64 | dirty[1] & /*$$scope*/
      128) {
        list_item_changes.$$scope = { dirty, ctx };
      }
      list_item.$set(list_item_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list_item.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item, detaching);
    }
  };
}
function create_default_slot_10(ctx) {
  let each_1_anchor;
  let current;
  let each_value_1 = ensure_array_like(
    /*dashboards*/
    ctx[6]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    l(nodes) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(nodes);
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(target, anchor);
        }
      }
      insert_hydration(target, each_1_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*openDashboard, dashboards*/
      4160) {
        each_value_1 = ensure_array_like(
          /*dashboards*/
          ctx2[6]
        );
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_1(ctx2, each_value_1, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block_1(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        group_outros();
        for (i = each_value_1.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value_1.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(each_1_anchor);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_default_slot_9(ctx) {
  let t;
  return {
    c() {
      t = text("Tools");
    },
    l(nodes) {
      t = claim_text(nodes, "Tools");
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_label_slot_2(ctx) {
  let divider_label;
  let current;
  divider_label = new Divider.Label({
    props: {
      slot: "label",
      $$slots: { default: [create_default_slot_9] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(divider_label.$$.fragment);
    },
    l(nodes) {
      claim_component(divider_label.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(divider_label, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const divider_label_changes = {};
      if (dirty[1] & /*$$scope*/
      128) {
        divider_label_changes.$$scope = { dirty, ctx: ctx2 };
      }
      divider_label.$set(divider_label_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(divider_label.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(divider_label.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(divider_label, detaching);
    }
  };
}
function create_if_block_7(ctx) {
  let list_item0;
  let t;
  let list_item1;
  let current;
  list_item0 = new List.Item({
    props: {
      class: "pt-2 pb-2 cursor-pointer",
      $$slots: {
        content: [create_content_slot_2],
        leading: [create_leading_slot_2]
      },
      $$scope: { ctx }
    }
  });
  list_item0.$on(
    "click",
    /*click_handler_3*/
    ctx[24]
  );
  list_item1 = new List.Item({
    props: {
      class: "pt-2 pb-2 cursor-pointer",
      $$slots: {
        content: [create_content_slot_1],
        leading: [create_leading_slot_1]
      },
      $$scope: { ctx }
    }
  });
  list_item1.$on(
    "click",
    /*click_handler_4*/
    ctx[25]
  );
  return {
    c() {
      create_component(list_item0.$$.fragment);
      t = space();
      create_component(list_item1.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item0.$$.fragment, nodes);
      t = claim_space(nodes);
      claim_component(list_item1.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item0, target, anchor);
      insert_hydration(target, t, anchor);
      mount_component(list_item1, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const list_item0_changes = {};
      if (dirty[1] & /*$$scope*/
      128) {
        list_item0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list_item0.$set(list_item0_changes);
      const list_item1_changes = {};
      if (dirty[1] & /*$$scope*/
      128) {
        list_item1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list_item1.$set(list_item1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list_item0.$$.fragment, local);
      transition_in(list_item1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item0.$$.fragment, local);
      transition_out(list_item1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
      destroy_component(list_item0, detaching);
      destroy_component(list_item1, detaching);
    }
  };
}
function create_icon_slot_7(ctx) {
  let list_item_leading_icon;
  let current;
  list_item_leading_icon = new List.Item.Leading.Icon({
    props: { slot: "icon", data: mdiViewDashboardEdit }
  });
  return {
    c() {
      create_component(list_item_leading_icon.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_leading_icon.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_leading_icon, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(list_item_leading_icon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_leading_icon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_leading_icon, detaching);
    }
  };
}
function create_leading_slot_2(ctx) {
  let list_item_leading;
  let current;
  list_item_leading = new List.Item.Leading({
    props: {
      slot: "leading",
      $$slots: { icon: [create_icon_slot_7] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(list_item_leading.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_leading.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_leading, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const list_item_leading_changes = {};
      if (dirty[1] & /*$$scope*/
      128) {
        list_item_leading_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list_item_leading.$set(list_item_leading_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list_item_leading.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_leading.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_leading, detaching);
    }
  };
}
function create_default_slot_8(ctx) {
  let t;
  return {
    c() {
      t = text("Edit widgets");
    },
    l(nodes) {
      t = claim_text(nodes, "Edit widgets");
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_title_slot_2(ctx) {
  let list_item_content_title;
  let current;
  list_item_content_title = new List.Item.Content.Title({
    props: {
      slot: "title",
      $$slots: { default: [create_default_slot_8] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(list_item_content_title.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_content_title.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_content_title, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const list_item_content_title_changes = {};
      if (dirty[1] & /*$$scope*/
      128) {
        list_item_content_title_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list_item_content_title.$set(list_item_content_title_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list_item_content_title.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_content_title.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_content_title, detaching);
    }
  };
}
function create_content_slot_2(ctx) {
  let list_item_content;
  let current;
  list_item_content = new List.Item.Content({
    props: {
      slot: "content",
      $$slots: { title: [create_title_slot_2] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(list_item_content.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_content.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_content, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const list_item_content_changes = {};
      if (dirty[1] & /*$$scope*/
      128) {
        list_item_content_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list_item_content.$set(list_item_content_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list_item_content.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_content.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_content, detaching);
    }
  };
}
function create_icon_slot_6(ctx) {
  let list_item_leading_icon;
  let current;
  list_item_leading_icon = new List.Item.Leading.Icon({ props: { slot: "icon", data: mdiCog } });
  return {
    c() {
      create_component(list_item_leading_icon.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_leading_icon.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_leading_icon, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(list_item_leading_icon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_leading_icon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_leading_icon, detaching);
    }
  };
}
function create_leading_slot_1(ctx) {
  let list_item_leading;
  let current;
  list_item_leading = new List.Item.Leading({
    props: {
      slot: "leading",
      $$slots: { icon: [create_icon_slot_6] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(list_item_leading.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_leading.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_leading, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const list_item_leading_changes = {};
      if (dirty[1] & /*$$scope*/
      128) {
        list_item_leading_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list_item_leading.$set(list_item_leading_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list_item_leading.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_leading.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_leading, detaching);
    }
  };
}
function create_default_slot_7(ctx) {
  let t;
  return {
    c() {
      t = text("Dashboard settings");
    },
    l(nodes) {
      t = claim_text(nodes, "Dashboard settings");
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_title_slot_1(ctx) {
  let list_item_content_title;
  let current;
  list_item_content_title = new List.Item.Content.Title({
    props: {
      slot: "title",
      $$slots: { default: [create_default_slot_7] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(list_item_content_title.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_content_title.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_content_title, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const list_item_content_title_changes = {};
      if (dirty[1] & /*$$scope*/
      128) {
        list_item_content_title_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list_item_content_title.$set(list_item_content_title_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list_item_content_title.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_content_title.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_content_title, detaching);
    }
  };
}
function create_content_slot_1(ctx) {
  let list_item_content;
  let current;
  list_item_content = new List.Item.Content({
    props: {
      slot: "content",
      $$slots: { title: [create_title_slot_1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(list_item_content.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_content.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_content, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const list_item_content_changes = {};
      if (dirty[1] & /*$$scope*/
      128) {
        list_item_content_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list_item_content.$set(list_item_content_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list_item_content.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_content.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_content, detaching);
    }
  };
}
function create_icon_slot_5(ctx) {
  let list_item_leading_icon;
  let current;
  list_item_leading_icon = new List.Item.Leading.Icon({ props: { slot: "icon", data: mdiPlus } });
  return {
    c() {
      create_component(list_item_leading_icon.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_leading_icon.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_leading_icon, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(list_item_leading_icon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_leading_icon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_leading_icon, detaching);
    }
  };
}
function create_leading_slot(ctx) {
  let list_item_leading;
  let current;
  list_item_leading = new List.Item.Leading({
    props: {
      slot: "leading",
      $$slots: { icon: [create_icon_slot_5] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(list_item_leading.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_leading.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_leading, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const list_item_leading_changes = {};
      if (dirty[1] & /*$$scope*/
      128) {
        list_item_leading_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list_item_leading.$set(list_item_leading_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list_item_leading.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_leading.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_leading, detaching);
    }
  };
}
function create_default_slot_6(ctx) {
  let t;
  return {
    c() {
      t = text("Add local dashboard");
    },
    l(nodes) {
      t = claim_text(nodes, "Add local dashboard");
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_title_slot(ctx) {
  let list_item_content_title;
  let current;
  list_item_content_title = new List.Item.Content.Title({
    props: {
      slot: "title",
      $$slots: { default: [create_default_slot_6] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(list_item_content_title.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_content_title.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_content_title, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const list_item_content_title_changes = {};
      if (dirty[1] & /*$$scope*/
      128) {
        list_item_content_title_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list_item_content_title.$set(list_item_content_title_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list_item_content_title.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_content_title.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_content_title, detaching);
    }
  };
}
function create_content_slot(ctx) {
  let list_item_content;
  let current;
  list_item_content = new List.Item.Content({
    props: {
      slot: "content",
      $$slots: { title: [create_title_slot] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(list_item_content.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_content.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_content, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const list_item_content_changes = {};
      if (dirty[1] & /*$$scope*/
      128) {
        list_item_content_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list_item_content.$set(list_item_content_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list_item_content.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_content.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_content, detaching);
    }
  };
}
function create_default_slot_5(ctx) {
  let t;
  let list_item;
  let current;
  let if_block = (
    /*$dashboard*/
    ctx[9] !== void 0 && create_if_block_7(ctx)
  );
  list_item = new List.Item({
    props: {
      class: "pt-2 pb-2 cursor-pointer",
      $$slots: {
        content: [create_content_slot],
        leading: [create_leading_slot]
      },
      $$scope: { ctx }
    }
  });
  list_item.$on(
    "click",
    /*click_handler_5*/
    ctx[26]
  );
  return {
    c() {
      if (if_block)
        if_block.c();
      t = space();
      create_component(list_item.$$.fragment);
    },
    l(nodes) {
      if (if_block)
        if_block.l(nodes);
      t = claim_space(nodes);
      claim_component(list_item.$$.fragment, nodes);
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, t, anchor);
      mount_component(list_item, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (
        /*$dashboard*/
        ctx2[9] !== void 0
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty[0] & /*$dashboard*/
          512) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_7(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(t.parentNode, t);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      const list_item_changes = {};
      if (dirty[1] & /*$$scope*/
      128) {
        list_item_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list_item.$set(list_item_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      transition_in(list_item.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      transition_out(list_item.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
      if (if_block)
        if_block.d(detaching);
      destroy_component(list_item, detaching);
    }
  };
}
function create_label_slot_1(ctx) {
  let divider_label;
  let current;
  divider_label = new Divider.Label({ props: { slot: "label" } });
  return {
    c() {
      create_component(divider_label.$$.fragment);
    },
    l(nodes) {
      claim_component(divider_label.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(divider_label, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(divider_label.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(divider_label.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(divider_label, detaching);
    }
  };
}
function create_default_slot_4(ctx) {
  let t;
  return {
    c() {
      t = text("Toolbar open");
    },
    l(nodes) {
      t = claim_text(nodes, "Toolbar open");
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_label_slot(ctx) {
  let toggle_contentleft_label;
  let current;
  toggle_contentleft_label = new Toggle.ContentLeft.Label({
    props: {
      slot: "label",
      $$slots: { default: [create_default_slot_4] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(toggle_contentleft_label.$$.fragment);
    },
    l(nodes) {
      claim_component(toggle_contentleft_label.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(toggle_contentleft_label, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const toggle_contentleft_label_changes = {};
      if (dirty[1] & /*$$scope*/
      128) {
        toggle_contentleft_label_changes.$$scope = { dirty, ctx: ctx2 };
      }
      toggle_contentleft_label.$set(toggle_contentleft_label_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(toggle_contentleft_label.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(toggle_contentleft_label.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(toggle_contentleft_label, detaching);
    }
  };
}
function create_content_left_slot(ctx) {
  let toggle_contentleft;
  let current;
  toggle_contentleft = new Toggle.ContentLeft({
    props: {
      slot: "content-left",
      class: "ml-3",
      $$slots: { label: [create_label_slot] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(toggle_contentleft.$$.fragment);
    },
    l(nodes) {
      claim_component(toggle_contentleft.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(toggle_contentleft, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const toggle_contentleft_changes = {};
      if (dirty[1] & /*$$scope*/
      128) {
        toggle_contentleft_changes.$$scope = { dirty, ctx: ctx2 };
      }
      toggle_contentleft.$set(toggle_contentleft_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(toggle_contentleft.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(toggle_contentleft.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(toggle_contentleft, detaching);
    }
  };
}
function create_if_block_6(ctx) {
  let button;
  let current;
  button = new Button({
    props: {
      class: "mt-4",
      $$slots: { default: [create_default_slot_3] },
      $$scope: { ctx }
    }
  });
  button.$on(
    "click",
    /*click_handler_6*/
    ctx[28]
  );
  return {
    c() {
      create_component(button.$$.fragment);
    },
    l(nodes) {
      claim_component(button.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(button, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const button_changes = {};
      if (dirty[1] & /*$$scope*/
      128) {
        button_changes.$$scope = { dirty, ctx: ctx2 };
      }
      button.$set(button_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(button.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(button, detaching);
    }
  };
}
function create_default_slot_3(ctx) {
  let t;
  return {
    c() {
      t = text("Enter fullscreen");
    },
    l(nodes) {
      t = claim_text(nodes, "Enter fullscreen");
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_default_slot_2(ctx) {
  let t0;
  let divider0;
  let t1;
  let list0;
  let t2;
  let divider1;
  let t3;
  let list1;
  let t4;
  let divider2;
  let t5;
  let toggle;
  let updating_on;
  let t6;
  let if_block1_anchor;
  let current;
  let if_block0 = (
    /*$user*/
    ctx[8] !== void 0 && create_if_block_8(ctx)
  );
  divider0 = new Divider({
    props: {
      $$slots: { label: [create_label_slot_3] },
      $$scope: { ctx }
    }
  });
  list0 = new List({
    props: {
      $$slots: { default: [create_default_slot_10] },
      $$scope: { ctx }
    }
  });
  divider1 = new Divider({
    props: {
      $$slots: { label: [create_label_slot_2] },
      $$scope: { ctx }
    }
  });
  list1 = new List({
    props: {
      $$slots: { default: [create_default_slot_5] },
      $$scope: { ctx }
    }
  });
  divider2 = new Divider({
    props: {
      $$slots: { label: [create_label_slot_1] },
      $$scope: { ctx }
    }
  });
  function toggle_on_binding(value) {
    ctx[27](value);
  }
  let toggle_props = {
    name: "toolbarOpen",
    $$slots: {
      "content-left": [create_content_left_slot]
    },
    $$scope: { ctx }
  };
  if (
    /*toolbarOpen*/
    ctx[2] !== void 0
  ) {
    toggle_props.on = /*toolbarOpen*/
    ctx[2];
  }
  toggle = new Toggle({ props: toggle_props });
  binding_callbacks.push(() => bind(toggle, "on", toggle_on_binding));
  let if_block1 = (
    /*fullscreenSupported*/
    ctx[5] && create_if_block_6(ctx)
  );
  return {
    c() {
      if (if_block0)
        if_block0.c();
      t0 = space();
      create_component(divider0.$$.fragment);
      t1 = space();
      create_component(list0.$$.fragment);
      t2 = space();
      create_component(divider1.$$.fragment);
      t3 = space();
      create_component(list1.$$.fragment);
      t4 = space();
      create_component(divider2.$$.fragment);
      t5 = space();
      create_component(toggle.$$.fragment);
      t6 = space();
      if (if_block1)
        if_block1.c();
      if_block1_anchor = empty();
    },
    l(nodes) {
      if (if_block0)
        if_block0.l(nodes);
      t0 = claim_space(nodes);
      claim_component(divider0.$$.fragment, nodes);
      t1 = claim_space(nodes);
      claim_component(list0.$$.fragment, nodes);
      t2 = claim_space(nodes);
      claim_component(divider1.$$.fragment, nodes);
      t3 = claim_space(nodes);
      claim_component(list1.$$.fragment, nodes);
      t4 = claim_space(nodes);
      claim_component(divider2.$$.fragment, nodes);
      t5 = claim_space(nodes);
      claim_component(toggle.$$.fragment, nodes);
      t6 = claim_space(nodes);
      if (if_block1)
        if_block1.l(nodes);
      if_block1_anchor = empty();
    },
    m(target, anchor) {
      if (if_block0)
        if_block0.m(target, anchor);
      insert_hydration(target, t0, anchor);
      mount_component(divider0, target, anchor);
      insert_hydration(target, t1, anchor);
      mount_component(list0, target, anchor);
      insert_hydration(target, t2, anchor);
      mount_component(divider1, target, anchor);
      insert_hydration(target, t3, anchor);
      mount_component(list1, target, anchor);
      insert_hydration(target, t4, anchor);
      mount_component(divider2, target, anchor);
      insert_hydration(target, t5, anchor);
      mount_component(toggle, target, anchor);
      insert_hydration(target, t6, anchor);
      if (if_block1)
        if_block1.m(target, anchor);
      insert_hydration(target, if_block1_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (
        /*$user*/
        ctx2[8] !== void 0
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty[0] & /*$user*/
          256) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_8(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(t0.parentNode, t0);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      const divider0_changes = {};
      if (dirty[1] & /*$$scope*/
      128) {
        divider0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      divider0.$set(divider0_changes);
      const list0_changes = {};
      if (dirty[0] & /*dashboards*/
      64 | dirty[1] & /*$$scope*/
      128) {
        list0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list0.$set(list0_changes);
      const divider1_changes = {};
      if (dirty[1] & /*$$scope*/
      128) {
        divider1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      divider1.$set(divider1_changes);
      const list1_changes = {};
      if (dirty[0] & /*$dashboard*/
      512 | dirty[1] & /*$$scope*/
      128) {
        list1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list1.$set(list1_changes);
      const divider2_changes = {};
      if (dirty[1] & /*$$scope*/
      128) {
        divider2_changes.$$scope = { dirty, ctx: ctx2 };
      }
      divider2.$set(divider2_changes);
      const toggle_changes = {};
      if (dirty[1] & /*$$scope*/
      128) {
        toggle_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_on && dirty[0] & /*toolbarOpen*/
      4) {
        updating_on = true;
        toggle_changes.on = /*toolbarOpen*/
        ctx2[2];
        add_flush_callback(() => updating_on = false);
      }
      toggle.$set(toggle_changes);
      if (
        /*fullscreenSupported*/
        ctx2[5]
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty[0] & /*fullscreenSupported*/
          32) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_6(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block0);
      transition_in(divider0.$$.fragment, local);
      transition_in(list0.$$.fragment, local);
      transition_in(divider1.$$.fragment, local);
      transition_in(list1.$$.fragment, local);
      transition_in(divider2.$$.fragment, local);
      transition_in(toggle.$$.fragment, local);
      transition_in(if_block1);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(divider0.$$.fragment, local);
      transition_out(list0.$$.fragment, local);
      transition_out(divider1.$$.fragment, local);
      transition_out(list1.$$.fragment, local);
      transition_out(divider2.$$.fragment, local);
      transition_out(toggle.$$.fragment, local);
      transition_out(if_block1);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t0);
        detach(t1);
        detach(t2);
        detach(t3);
        detach(t4);
        detach(t5);
        detach(t6);
        detach(if_block1_anchor);
      }
      if (if_block0)
        if_block0.d(detaching);
      destroy_component(divider0, detaching);
      destroy_component(list0, detaching);
      destroy_component(divider1, detaching);
      destroy_component(list1, detaching);
      destroy_component(divider2, detaching);
      destroy_component(toggle, detaching);
      if (if_block1)
        if_block1.d(detaching);
    }
  };
}
function create_if_block_2(ctx) {
  let header;
  let button0;
  let t0;
  let dropdown;
  let updating_visible;
  let t1;
  let t2;
  let div;
  let button1;
  let t3;
  let current;
  button0 = new Button({
    props: {
      $$slots: { icon: [create_icon_slot_4] },
      $$scope: { ctx }
    }
  });
  button0.$on(
    "click",
    /*click_handler_7*/
    ctx[30]
  );
  function dropdown_visible_binding(value) {
    ctx[33](value);
  }
  let dropdown_props = {
    $$slots: {
      items: [create_items_slot],
      trigger: [create_trigger_slot]
    },
    $$scope: { ctx }
  };
  if (
    /*dashboardMenuOpen*/
    ctx[3] !== void 0
  ) {
    dropdown_props.visible = /*dashboardMenuOpen*/
    ctx[3];
  }
  dropdown = new Dropdown({ props: dropdown_props });
  binding_callbacks.push(() => bind(dropdown, "visible", dropdown_visible_binding));
  let if_block0 = (
    /*$dashboard*/
    ctx[9] !== void 0 && create_if_block_4(ctx)
  );
  button1 = new Button({
    props: {
      $$slots: { icon: [create_icon_slot_2] },
      $$scope: { ctx }
    }
  });
  button1.$on(
    "click",
    /*click_handler_11*/
    ctx[35]
  );
  let if_block1 = (
    /*$dashboard*/
    ctx[9] !== void 0 && create_if_block_3(ctx)
  );
  return {
    c() {
      header = element("header");
      create_component(button0.$$.fragment);
      t0 = space();
      create_component(dropdown.$$.fragment);
      t1 = space();
      if (if_block0)
        if_block0.c();
      t2 = space();
      div = element("div");
      create_component(button1.$$.fragment);
      t3 = space();
      if (if_block1)
        if_block1.c();
      this.h();
    },
    l(nodes) {
      header = claim_element(nodes, "HEADER", { class: true });
      var header_nodes = children(header);
      claim_component(button0.$$.fragment, header_nodes);
      t0 = claim_space(header_nodes);
      claim_component(dropdown.$$.fragment, header_nodes);
      t1 = claim_space(header_nodes);
      if (if_block0)
        if_block0.l(header_nodes);
      t2 = claim_space(header_nodes);
      div = claim_element(header_nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(button1.$$.fragment, div_nodes);
      t3 = claim_space(div_nodes);
      if (if_block1)
        if_block1.l(div_nodes);
      div_nodes.forEach(detach);
      header_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "flex flex-grow justify-end");
      attr(header, "class", "w-full sticky z-0 drop-shadow-lg p-4 bg-primary flex flex-row");
    },
    m(target, anchor) {
      insert_hydration(target, header, anchor);
      mount_component(button0, header, null);
      append_hydration(header, t0);
      mount_component(dropdown, header, null);
      append_hydration(header, t1);
      if (if_block0)
        if_block0.m(header, null);
      append_hydration(header, t2);
      append_hydration(header, div);
      mount_component(button1, div, null);
      append_hydration(div, t3);
      if (if_block1)
        if_block1.m(div, null);
      current = true;
    },
    p(ctx2, dirty) {
      const button0_changes = {};
      if (dirty[1] & /*$$scope*/
      128) {
        button0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      button0.$set(button0_changes);
      const dropdown_changes = {};
      if (dirty[0] & /*dashboards, $dashboard, dashboardMenuOpen*/
      584 | dirty[1] & /*$$scope*/
      128) {
        dropdown_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_visible && dirty[0] & /*dashboardMenuOpen*/
      8) {
        updating_visible = true;
        dropdown_changes.visible = /*dashboardMenuOpen*/
        ctx2[3];
        add_flush_callback(() => updating_visible = false);
      }
      dropdown.$set(dropdown_changes);
      if (
        /*$dashboard*/
        ctx2[9] !== void 0
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty[0] & /*$dashboard*/
          512) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_4(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(header, t2);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      const button1_changes = {};
      if (dirty[1] & /*$$scope*/
      128) {
        button1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      button1.$set(button1_changes);
      if (
        /*$dashboard*/
        ctx2[9] !== void 0
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty[0] & /*$dashboard*/
          512) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_3(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(button0.$$.fragment, local);
      transition_in(dropdown.$$.fragment, local);
      transition_in(if_block0);
      transition_in(button1.$$.fragment, local);
      transition_in(if_block1);
      current = true;
    },
    o(local) {
      transition_out(button0.$$.fragment, local);
      transition_out(dropdown.$$.fragment, local);
      transition_out(if_block0);
      transition_out(button1.$$.fragment, local);
      transition_out(if_block1);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(header);
      }
      destroy_component(button0);
      destroy_component(dropdown);
      if (if_block0)
        if_block0.d();
      destroy_component(button1);
      if (if_block1)
        if_block1.d();
    }
  };
}
function create_icon_slot_4(ctx) {
  let icon;
  let current;
  icon = new Icon({ props: { slot: "icon", data: mdiMenu } });
  return {
    c() {
      create_component(icon.$$.fragment);
    },
    l(nodes) {
      claim_component(icon.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(icon, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(icon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(icon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(icon, detaching);
    }
  };
}
function create_icon_slot_3(ctx) {
  let button_icon;
  let current;
  button_icon = new Button.Icon({
    props: { slot: "icon", data: mdiViewDashboard }
  });
  return {
    c() {
      create_component(button_icon.$$.fragment);
    },
    l(nodes) {
      claim_component(button_icon.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(button_icon, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(button_icon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button_icon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(button_icon, detaching);
    }
  };
}
function create_trigger_slot(ctx) {
  let button;
  let current;
  button = new Button({
    props: {
      slot: "trigger",
      $$slots: { icon: [create_icon_slot_3] },
      $$scope: { ctx }
    }
  });
  button.$on(
    "click",
    /*click_handler_9*/
    ctx[32]
  );
  return {
    c() {
      create_component(button.$$.fragment);
    },
    l(nodes) {
      claim_component(button.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(button, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const button_changes = {};
      if (dirty[1] & /*$$scope*/
      128) {
        button_changes.$$scope = { dirty, ctx: ctx2 };
      }
      button.$set(button_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(button.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(button, detaching);
    }
  };
}
function create_if_block_5(ctx) {
  let dropdown_items_item;
  let current;
  function click_handler_8() {
    return (
      /*click_handler_8*/
      ctx[31](
        /*d*/
        ctx[50]
      )
    );
  }
  dropdown_items_item = new Dropdown.Items.Item({ props: { label: (
    /*d*/
    ctx[50].title
  ) } });
  dropdown_items_item.$on("click", click_handler_8);
  return {
    c() {
      create_component(dropdown_items_item.$$.fragment);
    },
    l(nodes) {
      claim_component(dropdown_items_item.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(dropdown_items_item, target, anchor);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const dropdown_items_item_changes = {};
      if (dirty[0] & /*dashboards*/
      64)
        dropdown_items_item_changes.label = /*d*/
        ctx[50].title;
      dropdown_items_item.$set(dropdown_items_item_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(dropdown_items_item.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(dropdown_items_item.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(dropdown_items_item, detaching);
    }
  };
}
function create_each_block(ctx) {
  let if_block_anchor;
  let current;
  let if_block = (
    /*$dashboard*/
    (ctx[9] === void 0 || /*$dashboard*/
    ctx[9].id !== /*d*/
    ctx[50].id) && create_if_block_5(ctx)
  );
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (
        /*$dashboard*/
        ctx2[9] === void 0 || /*$dashboard*/
        ctx2[9].id !== /*d*/
        ctx2[50].id
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty[0] & /*$dashboard, dashboards*/
          576) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_5(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if (if_block)
        if_block.d(detaching);
    }
  };
}
function create_default_slot_1(ctx) {
  let each_1_anchor;
  let current;
  let each_value = ensure_array_like(
    /*dashboards*/
    ctx[6]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    l(nodes) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(nodes);
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(target, anchor);
        }
      }
      insert_hydration(target, each_1_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*dashboards, openDashboard, $dashboard*/
      4672) {
        each_value = ensure_array_like(
          /*dashboards*/
          ctx2[6]
        );
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(each_1_anchor);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_items_slot(ctx) {
  let dropdown_items;
  let current;
  dropdown_items = new Dropdown.Items({
    props: {
      slot: "items",
      $$slots: { default: [create_default_slot_1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(dropdown_items.$$.fragment);
    },
    l(nodes) {
      claim_component(dropdown_items.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(dropdown_items, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const dropdown_items_changes = {};
      if (dirty[0] & /*dashboards, $dashboard*/
      576 | dirty[1] & /*$$scope*/
      128) {
        dropdown_items_changes.$$scope = { dirty, ctx: ctx2 };
      }
      dropdown_items.$set(dropdown_items_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(dropdown_items.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(dropdown_items.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(dropdown_items, detaching);
    }
  };
}
function create_if_block_4(ctx) {
  let button;
  let current;
  button = new Button({
    props: {
      $$slots: { default: [create_default_slot] },
      $$scope: { ctx }
    }
  });
  button.$on(
    "click",
    /*click_handler_10*/
    ctx[34]
  );
  return {
    c() {
      create_component(button.$$.fragment);
    },
    l(nodes) {
      claim_component(button.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(button, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const button_changes = {};
      if (dirty[0] & /*$dashboard*/
      512 | dirty[1] & /*$$scope*/
      128) {
        button_changes.$$scope = { dirty, ctx: ctx2 };
      }
      button.$set(button_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(button.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(button, detaching);
    }
  };
}
function create_default_slot(ctx) {
  let t_value = (
    /*$dashboard*/
    ctx[9].title + ""
  );
  let t;
  return {
    c() {
      t = text(t_value);
    },
    l(nodes) {
      t = claim_text(nodes, t_value);
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*$dashboard*/
      512 && t_value !== (t_value = /*$dashboard*/
      ctx2[9].title + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_icon_slot_2(ctx) {
  let button_icon;
  let current;
  button_icon = new Button.Icon({ props: { slot: "icon", data: mdiPlus } });
  return {
    c() {
      create_component(button_icon.$$.fragment);
    },
    l(nodes) {
      claim_component(button_icon.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(button_icon, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(button_icon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button_icon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(button_icon, detaching);
    }
  };
}
function create_if_block_3(ctx) {
  let button0;
  let t;
  let button1;
  let current;
  button0 = new Button({
    props: {
      $$slots: { icon: [create_icon_slot_1] },
      $$scope: { ctx }
    }
  });
  button0.$on(
    "click",
    /*click_handler_12*/
    ctx[36]
  );
  button1 = new Button({
    props: {
      $$slots: { icon: [create_icon_slot] },
      $$scope: { ctx }
    }
  });
  button1.$on(
    "click",
    /*click_handler_13*/
    ctx[37]
  );
  return {
    c() {
      create_component(button0.$$.fragment);
      t = space();
      create_component(button1.$$.fragment);
    },
    l(nodes) {
      claim_component(button0.$$.fragment, nodes);
      t = claim_space(nodes);
      claim_component(button1.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(button0, target, anchor);
      insert_hydration(target, t, anchor);
      mount_component(button1, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const button0_changes = {};
      if (dirty[1] & /*$$scope*/
      128) {
        button0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      button0.$set(button0_changes);
      const button1_changes = {};
      if (dirty[1] & /*$$scope*/
      128) {
        button1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      button1.$set(button1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(button0.$$.fragment, local);
      transition_in(button1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button0.$$.fragment, local);
      transition_out(button1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
      destroy_component(button0, detaching);
      destroy_component(button1, detaching);
    }
  };
}
function create_icon_slot_1(ctx) {
  let button_icon;
  let current;
  button_icon = new Button.Icon({
    props: { slot: "icon", data: mdiViewDashboardEdit }
  });
  return {
    c() {
      create_component(button_icon.$$.fragment);
    },
    l(nodes) {
      claim_component(button_icon.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(button_icon, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(button_icon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button_icon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(button_icon, detaching);
    }
  };
}
function create_icon_slot(ctx) {
  let button_icon;
  let current;
  button_icon = new Button.Icon({ props: { slot: "icon", data: mdiCog } });
  return {
    c() {
      create_component(button_icon.$$.fragment);
    },
    l(nodes) {
      claim_component(button_icon.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(button_icon, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(button_icon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button_icon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(button_icon, detaching);
    }
  };
}
function create_fragment(ctx) {
  let t;
  let div;
  let current_block_type_index;
  let if_block;
  let current;
  const if_block_creators = [create_if_block, create_if_block_1, create_else_block];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*loading*/
      ctx2[0]
    )
      return 0;
    if (
      /*$homey*/
      ctx2[7] !== void 0
    )
      return 1;
    return 2;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      t = space();
      div = element("div");
      if_block.c();
      this.h();
    },
    l(nodes) {
      const head_nodes = head_selector("svelte-t9xcep", document_1.head);
      head_nodes.forEach(detach);
      t = claim_space(nodes);
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      if_block.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      document_1.title = "Dashboard";
      attr(div, "class", "w-full h-full text-content");
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
      insert_hydration(target, div, anchor);
      if_blocks[current_block_type_index].m(div, null);
      current = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(div, null);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
        detach(div);
      }
      if_blocks[current_block_type_index].d();
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let dashboards$2;
  let fullscreenSupported;
  let $homey;
  let $scopes;
  let $apiKey;
  let $baseUrl;
  let $localDashboards;
  let $homeyDashboards;
  let $user;
  let $dashboard;
  component_subscribe($$self, homey, ($$value) => $$invalidate(7, $homey = $$value));
  component_subscribe($$self, scopes, ($$value) => $$invalidate(40, $scopes = $$value));
  component_subscribe($$self, apiKey, ($$value) => $$invalidate(41, $apiKey = $$value));
  component_subscribe($$self, baseUrl, ($$value) => $$invalidate(42, $baseUrl = $$value));
  component_subscribe($$self, dashboards, ($$value) => $$invalidate(16, $localDashboards = $$value));
  component_subscribe($$self, dashboards$1, ($$value) => $$invalidate(17, $homeyDashboards = $$value));
  component_subscribe($$self, user, ($$value) => $$invalidate(8, $user = $$value));
  component_subscribe($$self, dashboard, ($$value) => $$invalidate(9, $dashboard = $$value));
  let { $$slots: slots = {}, $$scope } = $$props;
  let loading = true;
  let menuOpen = false;
  let toolbarOpen = false;
  let dashboardMenuOpen = false;
  let addDashboardOpen = false;
  onMount(async () => {
    await loadData();
  });
  async function loadData() {
    $$invalidate(0, loading = true);
    await connectHomey();
    if ($homey !== void 0) {
      await loadSession();
      await loadDevices();
      await loadFlows();
      await loadZones();
      await loadInsights();
    }
    $$invalidate(0, loading = false);
  }
  async function connectHomey() {
    if ($homey === void 0) {
      if ($apiKey !== void 0) {
        const instance2 = await HomeyAPI.createLocalAPI({ address: $baseUrl, token: $apiKey });
        homeys.add(instance2);
        homey.set(instance2);
      } else {
        const cloudApi = new AthomCloudAPI({ clientId, clientSecret });
        const loggedIn = await cloudApi.isLoggedIn();
        if (loggedIn) {
          const usr = await cloudApi.getAuthenticatedUser();
          const firstHomey = await usr.getFirstHomey();
          const instance2 = await firstHomey.authenticate();
          user.set(usr);
          homeys.add(instance2);
          homey.set(instance2);
        }
      }
    }
  }
  async function loadSession() {
    try {
      const s = await $homey.sessions.getSessionMe();
      session.set(s);
    } catch (e2) {
    }
    $$invalidate(0, loading = false);
  }
  async function loadDevices() {
    try {
      if ($scopes.includes("homey") || $scopes.includes("homey.device") || $scopes.includes("homey.device.readonly") || $scopes.includes("homey.device.control")) {
        await $homey.devices.connect();
        const d = await $homey.devices.getDevices();
        $homey.devices.on("device.update", (patch2) => devices.onDevice(patch2));
        Object.values(d).forEach(async (device) => {
          await device.connect();
          device.on("capability", (event) => {
            const capability = device.capabilitiesObj[event.capabilityId];
            if (capability !== void 0) {
              capability.value = event.value;
              capability.lastUpdated = event.transactionTime;
            }
          });
        });
        devices.set(d);
      }
    } catch (e2) {
    }
  }
  async function loadFlows() {
    try {
      if ($scopes.includes("homey") || $scopes.includes("homey.flow") || $scopes.includes("homey.flow.readonly") || $scopes.includes("homey.flow.start")) {
        await $homey.flow.connect();
        const folders = await $homey.flow.getFlowFolders();
        const basic = await $homey.flow.getFlows();
        const advanced = await $homey.flow.getAdvancedFlows();
        flowFolders.set(folders);
        basicFlows.set(basic);
        advancedFlows.set(advanced);
        $homey.flow.on("flow.create", (e2) => basicFlows.onCreate(e2));
        $homey.flow.on("flow.delete", (e2) => basicFlows.onDelete(e2));
        $homey.flow.on("advancedflow.create", (e2) => advancedFlows.onCreate(e2));
        $homey.flow.on("advancedflow.delete", (e2) => advancedFlows.onDelete(e2));
      }
    } catch (e2) {
    }
  }
  async function loadInsights() {
    try {
      if ($scopes.includes("homey") || $scopes.includes("homey.insights") || $scopes.includes("homey.insights.readonly")) {
        await $homey.insights.connect();
        const logs = await $homey.insights.getLogs();
        insights.set(logs);
      }
    } catch (e2) {
    }
  }
  async function loadZones() {
    try {
      if ($scopes.includes("homey") || $scopes.includes("homey.zone") || $scopes.includes("homey.zone.readonly")) {
        await $homey.zones.connect();
        const z = await $homey.zones.getZones();
        zones.set(z);
      }
    } catch (e2) {
    }
  }
  function toggleEdit() {
    editing.toggle();
    $$invalidate(1, menuOpen = false);
  }
  async function addDashboard(title) {
    const d = {
      id: v4(),
      source: "localstorage",
      title,
      items: []
    };
    dashboards.update(d);
    await goto(base + "/board?id=" + d.id);
  }
  function openDashboard(dash) {
    $$invalidate(1, menuOpen = false);
    $$invalidate(3, dashboardMenuOpen = false);
    return goto(base + "/board?id=" + dash.id);
  }
  function openDashboardSettings(dash) {
    $$invalidate(1, menuOpen = false);
    return goto(base + "/board/settings?id=" + dash.id);
  }
  function openAddDashboard() {
    $$invalidate(1, menuOpen = false);
    $$invalidate(4, addDashboardOpen = true);
  }
  async function selectHomey(h) {
    const instance2 = await h.authenticate();
    homey.set(instance2);
    dashboard.set(void 0);
    await goto(base + "/");
    $$invalidate(1, menuOpen = false);
  }
  const click_handler = () => $$invalidate(1, menuOpen = true);
  function adddashboarddialog_open_binding(value) {
    addDashboardOpen = value;
    $$invalidate(4, addDashboardOpen);
  }
  const value_handler = (v) => addDashboard(v.detail);
  const click_handler_1 = (h) => selectHomey(h);
  const click_handler_2 = (d) => openDashboard(d);
  const click_handler_3 = () => toggleEdit();
  const click_handler_4 = () => openDashboardSettings($dashboard);
  const click_handler_5 = () => openAddDashboard();
  function toggle_on_binding(value) {
    toolbarOpen = value;
    $$invalidate(2, toolbarOpen);
  }
  const click_handler_6 = () => document.documentElement.requestFullscreen();
  function drawer_open_binding(value) {
    menuOpen = value;
    $$invalidate(1, menuOpen);
  }
  const click_handler_7 = () => $$invalidate(1, menuOpen = true);
  const click_handler_8 = (d) => openDashboard(d);
  const click_handler_9 = () => $$invalidate(3, dashboardMenuOpen = !dashboardMenuOpen);
  function dropdown_visible_binding(value) {
    dashboardMenuOpen = value;
    $$invalidate(3, dashboardMenuOpen);
  }
  const click_handler_10 = () => goto(base + "/board?id=" + $dashboard.id);
  const click_handler_11 = () => $$invalidate(4, addDashboardOpen = true);
  const click_handler_12 = () => toggleEdit();
  const click_handler_13 = () => goto(base + "/board/settings?id=" + $dashboard.id);
  $$self.$$set = ($$props2) => {
    if ("$$scope" in $$props2)
      $$invalidate(38, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & /*$homeyDashboards, $localDashboards*/
    196608) {
      $$invalidate(6, dashboards$2 = Object.values({ ...$homeyDashboards, ...$localDashboards }));
    }
  };
  $$invalidate(5, fullscreenSupported = document.fullscreenEnabled);
  return [
    loading,
    menuOpen,
    toolbarOpen,
    dashboardMenuOpen,
    addDashboardOpen,
    fullscreenSupported,
    dashboards$2,
    $homey,
    $user,
    $dashboard,
    toggleEdit,
    addDashboard,
    openDashboard,
    openDashboardSettings,
    openAddDashboard,
    selectHomey,
    $localDashboards,
    $homeyDashboards,
    slots,
    click_handler,
    adddashboarddialog_open_binding,
    value_handler,
    click_handler_1,
    click_handler_2,
    click_handler_3,
    click_handler_4,
    click_handler_5,
    toggle_on_binding,
    click_handler_6,
    drawer_open_binding,
    click_handler_7,
    click_handler_8,
    click_handler_9,
    dropdown_visible_binding,
    click_handler_10,
    click_handler_11,
    click_handler_12,
    click_handler_13,
    $$scope
  ];
}
class Layout extends SvelteComponent {
  constructor(options) {
    super();
    init$2(this, options, instance, create_fragment, safe_not_equal, {}, null, [-1, -1]);
  }
}
export {
  Layout as component,
  _layout as universal
};
