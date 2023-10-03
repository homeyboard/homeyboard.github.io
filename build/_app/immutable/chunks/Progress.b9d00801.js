import { w as writable } from "./singletons.abb47f6e.js";
import { F as identity, aa as split_css_unit, J as assign, S as is_function, G as listen, a3 as bubble, a1 as prevent_default, a0 as stop_propagation, s as safe_not_equal, z as create_slot, f as element, a as space, g as claim_element, h as children, c as claim_space, d as detach, j as attr, R as set_attributes, M as toggle_class, i as insert_hydration, D as append_hydration, N as action_destroyer, A as update_slot_base, B as get_all_dirty_from_scope, C as get_slot_changes, O as run_all, T as get_current_component, K as exclude_internal_props, X as svg_element, _ as HtmlTagHydration, Y as claim_svg_element, $ as claim_html_tag, Z as set_svg_attributes, v as noop, V as set_input_value, P as compute_slots, Q as setContext, H as add_render_callback, l as text, m as claim_text, n as set_data, p as binding_callbacks, I as getContext, y as component_subscribe, e as empty, ab as set_dynamic_element_data, k as set_style } from "./scheduler.a4b1dbd5.js";
import { S as SvelteComponent, i as init, a as transition_in, t as transition_out, g as group_outros, c as check_outros, b as create_component, d as claim_component, m as mount_component, k as create_bidirectional_transition, e as destroy_component } from "./index.6d45844e.js";
function get_spread_update(levels, updates) {
  const update = {};
  const to_null_out = {};
  const accounted_for = { $$scope: 1 };
  let i = levels.length;
  while (i--) {
    const o = levels[i];
    const n = updates[i];
    if (n) {
      for (const key in o) {
        if (!(key in n))
          to_null_out[key] = 1;
      }
      for (const key in n) {
        if (!accounted_for[key]) {
          update[key] = n[key];
          accounted_for[key] = 1;
        }
      }
      levels[i] = n;
    } else {
      for (const key in o) {
        accounted_for[key] = 1;
      }
    }
  }
  for (const key in to_null_out) {
    if (!(key in update))
      update[key] = void 0;
  }
  return update;
}
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}
const byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
const randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const native = {
  randomUUID
};
function v4(options, buf, offset) {
  if (native.randomUUID && !buf && !options) {
    return native.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
function createDashboards() {
  const prefix = "dashboard-";
  const initialValue = Object.keys(localStorage).filter((key) => key.startsWith(prefix)).reduce((existing, key) => {
    const id = key.slice(prefix.length);
    const d = JSON.parse(localStorage[key]);
    existing[id] = d;
    return existing;
  }, {});
  if (localStorage.dashboards !== void 0) {
    const d = {
      id: v4(),
      source: "localstorage",
      title: "Dashboard (migrated)",
      items: JSON.parse(localStorage.dashboards)
    };
    const key = prefix + d.id;
    localStorage[key] = JSON.stringify(d);
    delete localStorage.dashboards;
    initialValue[d.id] = d;
  }
  const { subscribe, set, update } = writable(initialValue);
  return {
    subscribe,
    update: (d) => {
      const key = prefix + d.id;
      localStorage[key] = JSON.stringify(d);
      update((existing) => {
        const copy = { ...existing };
        copy[d.id] = d;
        return copy;
      });
    },
    delete: (d) => {
      const key = prefix + d.id;
      if (localStorage[key] !== void 0) {
        delete localStorage[key];
      }
      update((existing) => {
        if (existing[d.id] !== void 0) {
          const copy = { ...existing };
          delete copy[d.id];
          return copy;
        }
        return existing;
      });
    }
  };
}
const dashboards = createDashboards();
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
  const o = +getComputedStyle(node).opacity;
  return {
    delay,
    duration,
    easing,
    css: (t) => `opacity: ${t * o}`
  };
}
function fly(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 } = {}) {
  const style = getComputedStyle(node);
  const target_opacity = +style.opacity;
  const transform = style.transform === "none" ? "" : style.transform;
  const od = target_opacity * (1 - opacity);
  const [xValue, xUnit] = split_css_unit(x);
  const [yValue, yUnit] = split_css_unit(y);
  return {
    delay,
    duration,
    easing,
    css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * xValue}${xUnit}, ${(1 - t) * yValue}${yUnit});
			opacity: ${target_opacity - od * u}`
  };
}
function slide(node, { delay = 0, duration = 400, easing = cubicOut, axis = "y" } = {}) {
  const style = getComputedStyle(node);
  const opacity = +style.opacity;
  const primary_property = axis === "y" ? "height" : "width";
  const primary_property_value = parseFloat(style[primary_property]);
  const secondary_properties = axis === "y" ? ["top", "bottom"] : ["left", "right"];
  const capitalized_secondary_properties = secondary_properties.map(
    (e) => `${e[0].toUpperCase()}${e.slice(1)}`
  );
  const padding_start_value = parseFloat(style[`padding${capitalized_secondary_properties[0]}`]);
  const padding_end_value = parseFloat(style[`padding${capitalized_secondary_properties[1]}`]);
  const margin_start_value = parseFloat(style[`margin${capitalized_secondary_properties[0]}`]);
  const margin_end_value = parseFloat(style[`margin${capitalized_secondary_properties[1]}`]);
  const border_width_start_value = parseFloat(
    style[`border${capitalized_secondary_properties[0]}Width`]
  );
  const border_width_end_value = parseFloat(
    style[`border${capitalized_secondary_properties[1]}Width`]
  );
  return {
    delay,
    duration,
    easing,
    css: (t) => `overflow: hidden;opacity: ${Math.min(t * 20, 1) * opacity};${primary_property}: ${t * primary_property_value}px;padding-${secondary_properties[0]}: ${t * padding_start_value}px;padding-${secondary_properties[1]}: ${t * padding_end_value}px;margin-${secondary_properties[0]}: ${t * margin_start_value}px;margin-${secondary_properties[1]}: ${t * margin_end_value}px;border-${secondary_properties[0]}-width: ${t * border_width_start_value}px;border-${secondary_properties[1]}-width: ${t * border_width_end_value}px;`
  };
}
function scale$1(node, { delay = 0, duration = 400, easing = cubicOut, start = 0, opacity = 0 } = {}) {
  const style = getComputedStyle(node);
  const target_opacity = +style.opacity;
  const transform = style.transform === "none" ? "" : style.transform;
  const sd = 1 - start;
  const od = target_opacity * (1 - opacity);
  return {
    delay,
    duration,
    easing,
    css: (_t, u) => `
			transform: ${transform} scale(${1 - sd * u});
			opacity: ${target_opacity - od * u}
		`
  };
}
function crossfade({ fallback, ...defaults }) {
  const to_receive = /* @__PURE__ */ new Map();
  const to_send = /* @__PURE__ */ new Map();
  function crossfade2(from_node, node, params) {
    const {
      delay = 0,
      duration = (d2) => Math.sqrt(d2) * 30,
      easing = cubicOut
    } = assign(assign({}, defaults), params);
    const from = from_node.getBoundingClientRect();
    const to = node.getBoundingClientRect();
    const dx = from.left - to.left;
    const dy = from.top - to.top;
    const dw = from.width / to.width;
    const dh = from.height / to.height;
    const d = Math.sqrt(dx * dx + dy * dy);
    const style = getComputedStyle(node);
    const transform = style.transform === "none" ? "" : style.transform;
    const opacity = +style.opacity;
    return {
      delay,
      duration: is_function(duration) ? duration(d) : duration,
      easing,
      css: (t, u) => `
				opacity: ${t * opacity};
				transform-origin: top left;
				transform: ${transform} translate(${u * dx}px,${u * dy}px) scale(${t + (1 - t) * dw}, ${t + (1 - t) * dh});
			`
    };
  }
  function transition(items, counterparts, intro) {
    return (node, params) => {
      items.set(params.key, node);
      return () => {
        if (counterparts.has(params.key)) {
          const other_node = counterparts.get(params.key);
          counterparts.delete(params.key);
          return crossfade2(other_node, node, params);
        }
        items.delete(params.key);
        return fallback && fallback(node, params, intro);
      };
    };
  }
  return [transition(to_send, to_receive, false), transition(to_receive, to_send, true)];
}
function twJoin() {
  var index = 0;
  var argument;
  var resolvedValue;
  var string = "";
  while (index < arguments.length) {
    if (argument = arguments[index++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
}
function toValue(mix) {
  if (typeof mix === "string") {
    return mix;
  }
  var resolvedValue;
  var string = "";
  for (var k = 0; k < mix.length; k++) {
    if (mix[k]) {
      if (resolvedValue = toValue(mix[k])) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
}
var CLASS_PART_SEPARATOR = "-";
function createClassUtils(config) {
  var classMap = createClassMap(config);
  var conflictingClassGroups = config.conflictingClassGroups, _config$conflictingCl = config.conflictingClassGroupModifiers, conflictingClassGroupModifiers = _config$conflictingCl === void 0 ? {} : _config$conflictingCl;
  function getClassGroupId(className) {
    var classParts = className.split(CLASS_PART_SEPARATOR);
    if (classParts[0] === "" && classParts.length !== 1) {
      classParts.shift();
    }
    return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
  }
  function getConflictingClassGroupIds(classGroupId, hasPostfixModifier) {
    var conflicts = conflictingClassGroups[classGroupId] || [];
    if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) {
      return [].concat(conflicts, conflictingClassGroupModifiers[classGroupId]);
    }
    return conflicts;
  }
  return {
    getClassGroupId,
    getConflictingClassGroupIds
  };
}
function getGroupRecursive(classParts, classPartObject) {
  var _a;
  if (classParts.length === 0) {
    return classPartObject.classGroupId;
  }
  var currentClassPart = classParts[0];
  var nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
  var classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : void 0;
  if (classGroupFromNextClassPart) {
    return classGroupFromNextClassPart;
  }
  if (classPartObject.validators.length === 0) {
    return void 0;
  }
  var classRest = classParts.join(CLASS_PART_SEPARATOR);
  return (_a = classPartObject.validators.find(function(_ref) {
    var validator = _ref.validator;
    return validator(classRest);
  })) == null ? void 0 : _a.classGroupId;
}
var arbitraryPropertyRegex = /^\[(.+)\]$/;
function getGroupIdForArbitraryProperty(className) {
  if (arbitraryPropertyRegex.test(className)) {
    var arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
    var property = arbitraryPropertyClassName == null ? void 0 : arbitraryPropertyClassName.substring(0, arbitraryPropertyClassName.indexOf(":"));
    if (property) {
      return "arbitrary.." + property;
    }
  }
}
function createClassMap(config) {
  var theme = config.theme, prefix = config.prefix;
  var classMap = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  var prefixedClassGroupEntries = getPrefixedClassGroupEntries(Object.entries(config.classGroups), prefix);
  prefixedClassGroupEntries.forEach(function(_ref2) {
    var classGroupId = _ref2[0], classGroup = _ref2[1];
    processClassesRecursively(classGroup, classMap, classGroupId, theme);
  });
  return classMap;
}
function processClassesRecursively(classGroup, classPartObject, classGroupId, theme) {
  classGroup.forEach(function(classDefinition) {
    if (typeof classDefinition === "string") {
      var classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
      classPartObjectToEdit.classGroupId = classGroupId;
      return;
    }
    if (typeof classDefinition === "function") {
      if (isThemeGetter(classDefinition)) {
        processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
        return;
      }
      classPartObject.validators.push({
        validator: classDefinition,
        classGroupId
      });
      return;
    }
    Object.entries(classDefinition).forEach(function(_ref3) {
      var key = _ref3[0], classGroup2 = _ref3[1];
      processClassesRecursively(classGroup2, getPart(classPartObject, key), classGroupId, theme);
    });
  });
}
function getPart(classPartObject, path) {
  var currentClassPartObject = classPartObject;
  path.split(CLASS_PART_SEPARATOR).forEach(function(pathPart) {
    if (!currentClassPartObject.nextPart.has(pathPart)) {
      currentClassPartObject.nextPart.set(pathPart, {
        nextPart: /* @__PURE__ */ new Map(),
        validators: []
      });
    }
    currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
  });
  return currentClassPartObject;
}
function isThemeGetter(func) {
  return func.isThemeGetter;
}
function getPrefixedClassGroupEntries(classGroupEntries, prefix) {
  if (!prefix) {
    return classGroupEntries;
  }
  return classGroupEntries.map(function(_ref4) {
    var classGroupId = _ref4[0], classGroup = _ref4[1];
    var prefixedClassGroup = classGroup.map(function(classDefinition) {
      if (typeof classDefinition === "string") {
        return prefix + classDefinition;
      }
      if (typeof classDefinition === "object") {
        return Object.fromEntries(Object.entries(classDefinition).map(function(_ref5) {
          var key = _ref5[0], value = _ref5[1];
          return [prefix + key, value];
        }));
      }
      return classDefinition;
    });
    return [classGroupId, prefixedClassGroup];
  });
}
function createLruCache(maxCacheSize) {
  if (maxCacheSize < 1) {
    return {
      get: function get() {
        return void 0;
      },
      set: function set() {
      }
    };
  }
  var cacheSize = 0;
  var cache = /* @__PURE__ */ new Map();
  var previousCache = /* @__PURE__ */ new Map();
  function update(key, value) {
    cache.set(key, value);
    cacheSize++;
    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache;
      cache = /* @__PURE__ */ new Map();
    }
  }
  return {
    get: function get(key) {
      var value = cache.get(key);
      if (value !== void 0) {
        return value;
      }
      if ((value = previousCache.get(key)) !== void 0) {
        update(key, value);
        return value;
      }
    },
    set: function set(key, value) {
      if (cache.has(key)) {
        cache.set(key, value);
      } else {
        update(key, value);
      }
    }
  };
}
var IMPORTANT_MODIFIER = "!";
function createSplitModifiers(config) {
  var separator = config.separator || ":";
  var isSeparatorSingleCharacter = separator.length === 1;
  var firstSeparatorCharacter = separator[0];
  var separatorLength = separator.length;
  return function splitModifiers(className) {
    var modifiers = [];
    var bracketDepth = 0;
    var modifierStart = 0;
    var postfixModifierPosition;
    for (var index = 0; index < className.length; index++) {
      var currentCharacter = className[index];
      if (bracketDepth === 0) {
        if (currentCharacter === firstSeparatorCharacter && (isSeparatorSingleCharacter || className.slice(index, index + separatorLength) === separator)) {
          modifiers.push(className.slice(modifierStart, index));
          modifierStart = index + separatorLength;
          continue;
        }
        if (currentCharacter === "/") {
          postfixModifierPosition = index;
          continue;
        }
      }
      if (currentCharacter === "[") {
        bracketDepth++;
      } else if (currentCharacter === "]") {
        bracketDepth--;
      }
    }
    var baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
    var hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER);
    var baseClassName = hasImportantModifier ? baseClassNameWithImportantModifier.substring(1) : baseClassNameWithImportantModifier;
    var maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
    return {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    };
  };
}
function sortModifiers(modifiers) {
  if (modifiers.length <= 1) {
    return modifiers;
  }
  var sortedModifiers = [];
  var unsortedModifiers = [];
  modifiers.forEach(function(modifier) {
    var isArbitraryVariant = modifier[0] === "[";
    if (isArbitraryVariant) {
      sortedModifiers.push.apply(sortedModifiers, unsortedModifiers.sort().concat([modifier]));
      unsortedModifiers = [];
    } else {
      unsortedModifiers.push(modifier);
    }
  });
  sortedModifiers.push.apply(sortedModifiers, unsortedModifiers.sort());
  return sortedModifiers;
}
function createConfigUtils(config) {
  return {
    cache: createLruCache(config.cacheSize),
    splitModifiers: createSplitModifiers(config),
    ...createClassUtils(config)
  };
}
var SPLIT_CLASSES_REGEX = /\s+/;
function mergeClassList(classList, configUtils) {
  var splitModifiers = configUtils.splitModifiers, getClassGroupId = configUtils.getClassGroupId, getConflictingClassGroupIds = configUtils.getConflictingClassGroupIds;
  var classGroupsInConflict = /* @__PURE__ */ new Set();
  return classList.trim().split(SPLIT_CLASSES_REGEX).map(function(originalClassName) {
    var _splitModifiers = splitModifiers(originalClassName), modifiers = _splitModifiers.modifiers, hasImportantModifier = _splitModifiers.hasImportantModifier, baseClassName = _splitModifiers.baseClassName, maybePostfixModifierPosition = _splitModifiers.maybePostfixModifierPosition;
    var classGroupId = getClassGroupId(maybePostfixModifierPosition ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
    var hasPostfixModifier = Boolean(maybePostfixModifierPosition);
    if (!classGroupId) {
      if (!maybePostfixModifierPosition) {
        return {
          isTailwindClass: false,
          originalClassName
        };
      }
      classGroupId = getClassGroupId(baseClassName);
      if (!classGroupId) {
        return {
          isTailwindClass: false,
          originalClassName
        };
      }
      hasPostfixModifier = false;
    }
    var variantModifier = sortModifiers(modifiers).join(":");
    var modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
    return {
      isTailwindClass: true,
      modifierId,
      classGroupId,
      originalClassName,
      hasPostfixModifier
    };
  }).reverse().filter(function(parsed) {
    if (!parsed.isTailwindClass) {
      return true;
    }
    var modifierId = parsed.modifierId, classGroupId = parsed.classGroupId, hasPostfixModifier = parsed.hasPostfixModifier;
    var classId = modifierId + classGroupId;
    if (classGroupsInConflict.has(classId)) {
      return false;
    }
    classGroupsInConflict.add(classId);
    getConflictingClassGroupIds(classGroupId, hasPostfixModifier).forEach(function(group) {
      return classGroupsInConflict.add(modifierId + group);
    });
    return true;
  }).reverse().map(function(parsed) {
    return parsed.originalClassName;
  }).join(" ");
}
function createTailwindMerge() {
  for (var _len = arguments.length, createConfig = new Array(_len), _key = 0; _key < _len; _key++) {
    createConfig[_key] = arguments[_key];
  }
  var configUtils;
  var cacheGet;
  var cacheSet;
  var functionToCall = initTailwindMerge;
  function initTailwindMerge(classList) {
    var firstCreateConfig = createConfig[0], restCreateConfig = createConfig.slice(1);
    var config = restCreateConfig.reduce(function(previousConfig, createConfigCurrent) {
      return createConfigCurrent(previousConfig);
    }, firstCreateConfig());
    configUtils = createConfigUtils(config);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList);
  }
  function tailwindMerge(classList) {
    var cachedResult = cacheGet(classList);
    if (cachedResult) {
      return cachedResult;
    }
    var result = mergeClassList(classList, configUtils);
    cacheSet(classList, result);
    return result;
  }
  return function callTailwindMerge() {
    return functionToCall(twJoin.apply(null, arguments));
  };
}
function fromTheme(key) {
  var themeGetter = function themeGetter2(theme) {
    return theme[key] || [];
  };
  themeGetter.isThemeGetter = true;
  return themeGetter;
}
var arbitraryValueRegex = /^\[(?:([a-z-]+):)?(.+)\]$/i;
var fractionRegex = /^\d+\/\d+$/;
var stringLengths = /* @__PURE__ */ new Set(["px", "full", "screen"]);
var tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
var lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
var shadowRegex = /^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
function isLength(value) {
  return isNumber(value) || stringLengths.has(value) || fractionRegex.test(value) || isArbitraryLength(value);
}
function isArbitraryLength(value) {
  return getIsArbitraryValue(value, "length", isLengthOnly);
}
function isArbitrarySize(value) {
  return getIsArbitraryValue(value, "size", isNever);
}
function isArbitraryPosition(value) {
  return getIsArbitraryValue(value, "position", isNever);
}
function isArbitraryUrl(value) {
  return getIsArbitraryValue(value, "url", isUrl);
}
function isArbitraryNumber(value) {
  return getIsArbitraryValue(value, "number", isNumber);
}
function isNumber(value) {
  return !Number.isNaN(Number(value));
}
function isPercent(value) {
  return value.endsWith("%") && isNumber(value.slice(0, -1));
}
function isInteger(value) {
  return isIntegerOnly(value) || getIsArbitraryValue(value, "number", isIntegerOnly);
}
function isArbitraryValue(value) {
  return arbitraryValueRegex.test(value);
}
function isAny() {
  return true;
}
function isTshirtSize(value) {
  return tshirtUnitRegex.test(value);
}
function isArbitraryShadow(value) {
  return getIsArbitraryValue(value, "", isShadow);
}
function getIsArbitraryValue(value, label, testValue) {
  var result = arbitraryValueRegex.exec(value);
  if (result) {
    if (result[1]) {
      return result[1] === label;
    }
    return testValue(result[2]);
  }
  return false;
}
function isLengthOnly(value) {
  return lengthUnitRegex.test(value);
}
function isNever() {
  return false;
}
function isUrl(value) {
  return value.startsWith("url(");
}
function isIntegerOnly(value) {
  return Number.isInteger(Number(value));
}
function isShadow(value) {
  return shadowRegex.test(value);
}
function getDefaultConfig() {
  var colors = fromTheme("colors");
  var spacing = fromTheme("spacing");
  var blur = fromTheme("blur");
  var brightness = fromTheme("brightness");
  var borderColor = fromTheme("borderColor");
  var borderRadius = fromTheme("borderRadius");
  var borderSpacing = fromTheme("borderSpacing");
  var borderWidth = fromTheme("borderWidth");
  var contrast = fromTheme("contrast");
  var grayscale = fromTheme("grayscale");
  var hueRotate = fromTheme("hueRotate");
  var invert = fromTheme("invert");
  var gap = fromTheme("gap");
  var gradientColorStops = fromTheme("gradientColorStops");
  var gradientColorStopPositions = fromTheme("gradientColorStopPositions");
  var inset = fromTheme("inset");
  var margin = fromTheme("margin");
  var opacity = fromTheme("opacity");
  var padding = fromTheme("padding");
  var saturate = fromTheme("saturate");
  var scale2 = fromTheme("scale");
  var sepia = fromTheme("sepia");
  var skew = fromTheme("skew");
  var space2 = fromTheme("space");
  var translate = fromTheme("translate");
  var getOverscroll = function getOverscroll2() {
    return ["auto", "contain", "none"];
  };
  var getOverflow = function getOverflow2() {
    return ["auto", "hidden", "clip", "visible", "scroll"];
  };
  var getSpacingWithAutoAndArbitrary = function getSpacingWithAutoAndArbitrary2() {
    return ["auto", isArbitraryValue, spacing];
  };
  var getSpacingWithArbitrary = function getSpacingWithArbitrary2() {
    return [isArbitraryValue, spacing];
  };
  var getLengthWithEmpty = function getLengthWithEmpty2() {
    return ["", isLength];
  };
  var getNumberWithAutoAndArbitrary = function getNumberWithAutoAndArbitrary2() {
    return ["auto", isNumber, isArbitraryValue];
  };
  var getPositions = function getPositions2() {
    return ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"];
  };
  var getLineStyles = function getLineStyles2() {
    return ["solid", "dashed", "dotted", "double", "none"];
  };
  var getBlendModes = function getBlendModes2() {
    return ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity", "plus-lighter"];
  };
  var getAlign = function getAlign2() {
    return ["start", "end", "center", "between", "around", "evenly", "stretch"];
  };
  var getZeroAndEmpty = function getZeroAndEmpty2() {
    return ["", "0", isArbitraryValue];
  };
  var getBreaks = function getBreaks2() {
    return ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
  };
  var getNumber = function getNumber2() {
    return [isNumber, isArbitraryNumber];
  };
  var getNumberAndArbitrary = function getNumberAndArbitrary2() {
    return [isNumber, isArbitraryValue];
  };
  return {
    cacheSize: 500,
    theme: {
      colors: [isAny],
      spacing: [isLength],
      blur: ["none", "", isTshirtSize, isArbitraryValue],
      brightness: getNumber(),
      borderColor: [colors],
      borderRadius: ["none", "", "full", isTshirtSize, isArbitraryValue],
      borderSpacing: getSpacingWithArbitrary(),
      borderWidth: getLengthWithEmpty(),
      contrast: getNumber(),
      grayscale: getZeroAndEmpty(),
      hueRotate: getNumberAndArbitrary(),
      invert: getZeroAndEmpty(),
      gap: getSpacingWithArbitrary(),
      gradientColorStops: [colors],
      gradientColorStopPositions: [isPercent, isArbitraryLength],
      inset: getSpacingWithAutoAndArbitrary(),
      margin: getSpacingWithAutoAndArbitrary(),
      opacity: getNumber(),
      padding: getSpacingWithArbitrary(),
      saturate: getNumber(),
      scale: getNumber(),
      sepia: getZeroAndEmpty(),
      skew: getNumberAndArbitrary(),
      space: getSpacingWithArbitrary(),
      translate: getSpacingWithArbitrary()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", isArbitraryValue]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [isTshirtSize]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": getBreaks()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": getBreaks()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      "float": [{
        "float": ["right", "left", "none"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [].concat(getPositions(), [isArbitraryValue])
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: getOverflow()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": getOverflow()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": getOverflow()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: getOverscroll()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": getOverscroll()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": getOverscroll()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [inset]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [inset]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [inset]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [inset]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [inset]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [inset]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [inset]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [inset]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [inset]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", isInteger]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: getSpacingWithAutoAndArbitrary()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", isArbitraryValue]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: getZeroAndEmpty()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: getZeroAndEmpty()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", isInteger]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [isAny]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", isInteger]
        }, isArbitraryValue]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [isAny]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [isInteger]
        }, isArbitraryValue]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", isArbitraryValue]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", isArbitraryValue]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [gap]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [gap]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [gap]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal"].concat(getAlign())
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal"].concat(getAlign(), ["baseline"])
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [].concat(getAlign(), ["baseline"])
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [padding]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [padding]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [padding]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [padding]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [padding]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [padding]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [padding]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [padding]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [padding]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [margin]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [margin]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [margin]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [margin]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [margin]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [margin]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [margin]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [margin]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [margin]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [space2]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [space2]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", isArbitraryValue, spacing]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": ["min", "max", "fit", isArbitraryValue, isLength]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": ["0", "none", "full", "min", "max", "fit", "prose", {
          screen: [isTshirtSize]
        }, isTshirtSize, isArbitraryValue]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [isArbitraryValue, spacing, "auto", "min", "max", "fit"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["min", "max", "fit", isArbitraryValue, isLength]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [isArbitraryValue, spacing, "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", isTshirtSize, isArbitraryLength]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", isArbitraryNumber]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [isAny]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", isArbitraryValue]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", isNumber, isArbitraryNumber]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", isArbitraryValue, isLength]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", isArbitraryValue]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", isArbitraryValue]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [colors]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [opacity]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [colors]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [opacity]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [].concat(getLineStyles(), ["wavy"])
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", isLength]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", isArbitraryValue, isLength]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [colors]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: getSpacingWithArbitrary()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryValue]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      "break": [{
        "break": ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", isArbitraryValue]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [opacity]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [].concat(getPositions(), [isArbitraryPosition])
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", isArbitrarySize]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, isArbitraryUrl]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [colors]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [gradientColorStops]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [borderRadius]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [borderRadius]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [borderRadius]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [borderRadius]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [borderRadius]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [borderRadius]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [borderRadius]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [borderRadius]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [borderRadius]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [borderRadius]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [borderRadius]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [borderRadius]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [borderRadius]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [borderRadius]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [borderRadius]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [borderWidth]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [borderWidth]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [borderWidth]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [borderWidth]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [borderWidth]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [borderWidth]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [borderWidth]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [borderWidth]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [borderWidth]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [opacity]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [].concat(getLineStyles(), ["hidden"])
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [borderWidth]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [borderWidth]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [opacity]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: getLineStyles()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [borderColor]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [borderColor]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [borderColor]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [borderColor]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [borderColor]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [borderColor]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [borderColor]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [borderColor]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [""].concat(getLineStyles())
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [isArbitraryValue, isLength]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [isLength]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [colors]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: getLengthWithEmpty()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [colors]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [opacity]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [isLength]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [colors]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", isTshirtSize, isArbitraryShadow]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [isAny]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [opacity]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": getBlendModes()
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": getBlendModes()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [blur]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [brightness]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [contrast]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", isTshirtSize, isArbitraryValue]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [grayscale]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [hueRotate]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [invert]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [saturate]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [sepia]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [blur]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [brightness]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [contrast]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [grayscale]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [hueRotate]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [invert]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [opacity]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [saturate]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [sepia]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [borderSpacing]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [borderSpacing]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [borderSpacing]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", isArbitraryValue]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: getNumberAndArbitrary()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", isArbitraryValue]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: getNumberAndArbitrary()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", isArbitraryValue]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [scale2]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [scale2]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [scale2]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [isInteger, isArbitraryValue]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [translate]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [translate]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [skew]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [skew]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", isArbitraryValue]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", colors]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: ["appearance-none"],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryValue]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [colors]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "pinch-zoom", "manipulation", {
          pan: ["x", "left", "right", "y", "up", "down"]
        }]
      }],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", isArbitraryValue]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [colors, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [isLength, isArbitraryNumber]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [colors, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}
var twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);
const tippy = "";
const scale = "";
const oldModifierRegex = /^[a-z]+(?::(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/;
const newModifierRegex = /^[^$]+(?:\$(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/;
function forwardEventsBuilder(component) {
  let $on;
  const events = [];
  component.$on = (fullEventType, callback) => {
    const eventType = fullEventType;
    let destructor = () => {
      return;
    };
    if ($on) {
      destructor = $on(eventType, callback);
    } else {
      events.push([eventType, callback]);
    }
    const oldModifierMatch = eventType.match(oldModifierRegex);
    if (oldModifierMatch && console) {
      console.warn('Event modifiers in STWUI now use "$" instead of ":", so that all events can be bound with modifiers. Please update your event binding: ', eventType);
    }
    return () => {
      destructor();
    };
  };
  function forward(e) {
    bubble(component, e);
  }
  return (node) => {
    const destructors = [];
    const forwardDestructors = {};
    $on = (fullEventType, callback) => {
      let eventType = fullEventType;
      let handler = callback;
      let options = false;
      const oldModifierMatch = eventType.match(oldModifierRegex);
      const newModifierMatch = eventType.match(newModifierRegex);
      const modifierMatch = oldModifierMatch || newModifierMatch;
      if (eventType.match(/^STWUI:\w+:/)) {
        const newEventTypeParts = eventType.split(":");
        let newEventType = "";
        for (let i = 0; i < newEventTypeParts.length; i++) {
          newEventType += i === newEventTypeParts.length - 1 ? ":" + newEventTypeParts[i] : newEventTypeParts[i].split("-").map((value) => value.slice(0, 1).toUpperCase() + value.slice(1)).join("");
        }
        console.warn(`The event ${eventType.split("$")[0]} has been renamed to ${newEventType.split("$")[0]}.`);
        eventType = newEventType;
      }
      if (modifierMatch) {
        const parts = eventType.split(oldModifierMatch ? ":" : "$");
        eventType = parts[0];
        const eventOptions = Object.fromEntries(parts.slice(1).map((mod) => [mod, true]));
        if (eventOptions.passive) {
          options = options || {};
          options.passive = true;
        }
        if (eventOptions.nonpassive) {
          options = options || {};
          options.passive = false;
        }
        if (eventOptions.capture) {
          options = options || {};
          options.capture = true;
        }
        if (eventOptions.once) {
          options = options || {};
          options.once = true;
        }
        if (eventOptions.preventDefault) {
          handler = prevent_default(handler);
        }
        if (eventOptions.stopPropagation) {
          handler = stop_propagation(handler);
        }
      }
      const off = listen(node, eventType, handler, options);
      const destructor = () => {
        off();
        const idx = destructors.indexOf(destructor);
        if (idx > -1) {
          destructors.splice(idx, 1);
        }
      };
      destructors.push(destructor);
      if (!(eventType in forwardDestructors)) {
        forwardDestructors[eventType] = listen(node, eventType, forward);
      }
      return destructor;
    };
    for (let i = 0; i < events.length; i++) {
      $on(events[i][0], events[i][1]);
    }
    return {
      destroy: () => {
        for (let i = 0; i < destructors.length; i++) {
          destructors[i]();
        }
        for (const entry of Object.entries(forwardDestructors)) {
          entry[1]();
        }
      }
    };
  };
}
function useActions(node, actions) {
  const actionReturns = [];
  if (actions) {
    for (let i = 0; i < actions.length; i++) {
      const actionEntry = actions[i];
      const action = Array.isArray(actionEntry) ? actionEntry[0] : actionEntry;
      if (Array.isArray(actionEntry) && actionEntry.length > 1) {
        actionReturns.push(action(node, actionEntry[1]));
      } else {
        actionReturns.push(action(node));
      }
    }
  }
  return {
    update(actions2) {
      if ((actions2 && actions2.length || 0) != actionReturns.length) {
        throw new Error("You must not change the length of an actions array.");
      }
      if (actions2) {
        for (let i = 0; i < actions2.length; i++) {
          const returnEntry = actionReturns[i];
          if (returnEntry && returnEntry.update) {
            const actionEntry = actions2[i];
            if (Array.isArray(actionEntry) && actionEntry.length > 1) {
              returnEntry.update(actionEntry[1]);
            } else {
              returnEntry.update();
            }
          }
        }
      }
    },
    destroy() {
      for (let i = 0; i < actionReturns.length; i++) {
        const returnEntry = actionReturns[i];
        if (returnEntry && returnEntry.destroy) {
          returnEntry.destroy();
        }
      }
    }
  };
}
let trapFocusList = [];
if (typeof window !== "undefined") {
  const isNext = (event) => event.keyCode === 9 && !event.shiftKey;
  const isPrevious = (event) => event.keyCode === 9 && event.shiftKey;
  const trapFocusListener = (event) => {
    if (event.target === window) {
      return;
    }
    const eventTarget = event.target;
    const parentNode = trapFocusList.find((node) => node.contains(eventTarget));
    if (!parentNode) {
      return;
    }
    const focusable = parentNode.querySelectorAll("a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]");
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (isNext(event) && event.target === last) {
      event.preventDefault();
      first.focus();
    } else if (isPrevious(event) && event.target === first) {
      event.preventDefault();
      last.focus();
    }
  };
  document.addEventListener("keydown", trapFocusListener);
}
const trapFocus = (node) => {
  trapFocusList.push(node);
  node.getElementsByTagName("button")[0].focus();
  return {
    destroy() {
      trapFocusList = trapFocusList.filter((element2) => element2 !== node);
    }
  };
};
function composeIconSize(size) {
  let iconSize = "";
  if (size === "xs") {
    iconSize = "16px";
  } else if (size === "sm") {
    iconSize = "18px";
  } else if (size === "md") {
    iconSize = "20px";
  } else if (size === "lg") {
    iconSize = "24px";
  } else if (size === "xl") {
    iconSize = "28px";
  } else if (size === "fab") {
    iconSize = "34px";
  }
  return iconSize;
}
function exclude(obj, keys) {
  let newObj = obj;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const { [key]: removed, ...everythingElse } = newObj;
    newObj = everythingElse;
  }
  return newObj;
}
const Swap_svelte_svelte_type_style_lang = "";
const get_off_slot_changes = (dirty) => ({});
const get_off_slot_context = (ctx) => ({});
const get_on_slot_changes = (dirty) => ({});
const get_on_slot_context = (ctx) => ({});
function create_fragment$8(ctx) {
  let div;
  let input;
  let input_checked_value;
  let t0;
  let span0;
  let t1;
  let span1;
  let span1_class_value;
  let useActions_action;
  let current;
  let mounted;
  let dispose;
  const on_slot_template = (
    /*#slots*/
    ctx[8].on
  );
  const on_slot = create_slot(
    on_slot_template,
    ctx,
    /*$$scope*/
    ctx[7],
    get_on_slot_context
  );
  const off_slot_template = (
    /*#slots*/
    ctx[8].off
  );
  const off_slot = create_slot(
    off_slot_template,
    ctx,
    /*$$scope*/
    ctx[7],
    get_off_slot_context
  );
  let div_levels = [
    { class: (
      /*finalClass*/
      ctx[3]
    ) },
    exclude(
      /*$$props*/
      ctx[5],
      ["use", "class"]
    )
  ];
  let div_data = {};
  for (let i = 0; i < div_levels.length; i += 1) {
    div_data = assign(div_data, div_levels[i]);
  }
  return {
    c() {
      div = element("div");
      input = element("input");
      t0 = space();
      span0 = element("span");
      if (on_slot)
        on_slot.c();
      t1 = space();
      span1 = element("span");
      if (off_slot)
        off_slot.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      input = claim_element(div_nodes, "INPUT", { type: true, class: true });
      t0 = claim_space(div_nodes);
      span0 = claim_element(div_nodes, "SPAN", { class: true });
      var span0_nodes = children(span0);
      if (on_slot)
        on_slot.l(span0_nodes);
      span0_nodes.forEach(detach);
      t1 = claim_space(div_nodes);
      span1 = claim_element(div_nodes, "SPAN", { class: true });
      var span1_nodes = children(span1);
      if (off_slot)
        off_slot.l(span1_nodes);
      span1_nodes.forEach(detach);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(input, "type", "checkbox");
      attr(input, "class", "invisible svelte-1rjyddc");
      input.checked = input_checked_value = /*loading*/
      ctx[1] || /*swapped*/
      ctx[2];
      input.disabled = true;
      attr(span0, "class", "swap-on absolute inset-0 svelte-1rjyddc");
      attr(span1, "class", span1_class_value = "swap-off absolute inset-0 " + /*loading*/
      (ctx[1] || /*swapped*/
      ctx[2] ? "isOn" : "isOff") + " svelte-1rjyddc");
      set_attributes(div, div_data);
      toggle_class(div, "svelte-1rjyddc", true);
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, input);
      append_hydration(div, t0);
      append_hydration(div, span0);
      if (on_slot) {
        on_slot.m(span0, null);
      }
      append_hydration(div, t1);
      append_hydration(div, span1);
      if (off_slot) {
        off_slot.m(span1, null);
      }
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(useActions_action = useActions.call(
            null,
            div,
            /*use*/
            ctx[0]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[4].call(null, div)
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (!current || dirty & /*loading, swapped*/
      6 && input_checked_value !== (input_checked_value = /*loading*/
      ctx2[1] || /*swapped*/
      ctx2[2])) {
        input.checked = input_checked_value;
      }
      if (on_slot) {
        if (on_slot.p && (!current || dirty & /*$$scope*/
        128)) {
          update_slot_base(
            on_slot,
            on_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[7],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[7]
            ) : get_slot_changes(
              on_slot_template,
              /*$$scope*/
              ctx2[7],
              dirty,
              get_on_slot_changes
            ),
            get_on_slot_context
          );
        }
      }
      if (off_slot) {
        if (off_slot.p && (!current || dirty & /*$$scope*/
        128)) {
          update_slot_base(
            off_slot,
            off_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[7],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[7]
            ) : get_slot_changes(
              off_slot_template,
              /*$$scope*/
              ctx2[7],
              dirty,
              get_off_slot_changes
            ),
            get_off_slot_context
          );
        }
      }
      if (!current || dirty & /*loading, swapped*/
      6 && span1_class_value !== (span1_class_value = "swap-off absolute inset-0 " + /*loading*/
      (ctx2[1] || /*swapped*/
      ctx2[2] ? "isOn" : "isOff") + " svelte-1rjyddc")) {
        attr(span1, "class", span1_class_value);
      }
      set_attributes(div, div_data = get_spread_update(div_levels, [
        (!current || dirty & /*finalClass*/
        8) && { class: (
          /*finalClass*/
          ctx2[3]
        ) },
        dirty & /*$$props*/
        32 && exclude(
          /*$$props*/
          ctx2[5],
          ["use", "class"]
        )
      ]));
      if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/
      1)
        useActions_action.update.call(
          null,
          /*use*/
          ctx2[0]
        );
      toggle_class(div, "svelte-1rjyddc", true);
    },
    i(local) {
      if (current)
        return;
      transition_in(on_slot, local);
      transition_in(off_slot, local);
      current = true;
    },
    o(local) {
      transition_out(on_slot, local);
      transition_out(off_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (on_slot)
        on_slot.d(detaching);
      if (off_slot)
        off_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
const defaultClass$5 = "swap relative inset-0";
const rotateClass = "swap-rotate";
const flipClass = "swap-flip";
function instance$8($$self, $$props, $$invalidate) {
  let finalClass;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { use = [] } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { type = "rotate" } = $$props;
  let { loading = void 0 } = $$props;
  let { swapped = void 0 } = $$props;
  $$self.$$set = ($$new_props) => {
    $$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("type" in $$new_props)
      $$invalidate(6, type = $$new_props.type);
    if ("loading" in $$new_props)
      $$invalidate(1, loading = $$new_props.loading);
    if ("swapped" in $$new_props)
      $$invalidate(2, swapped = $$new_props.swapped);
    if ("$$scope" in $$new_props)
      $$invalidate(7, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    $$invalidate(3, finalClass = twMerge(defaultClass$5, type === "rotate" ? rotateClass : false, type === "flip" ? flipClass : false, $$props.class));
  };
  $$props = exclude_internal_props($$props);
  return [
    use,
    loading,
    swapped,
    finalClass,
    forwardEvents,
    $$props,
    type,
    $$scope,
    slots
  ];
}
class Swap extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$8, create_fragment$8, safe_not_equal, { use: 0, type: 6, loading: 1, swapped: 2 });
  }
}
function create_fragment$7(ctx) {
  let svg;
  let html_tag;
  let useActions_action;
  let mounted;
  let dispose;
  let svg_levels = [
    { xmlns: "http://www.w3.org/2000/svg" },
    { width: (
      /*width*/
      ctx[2]
    ) },
    { height: (
      /*height*/
      ctx[3]
    ) },
    { viewBox: (
      /*viewBox*/
      ctx[1]
    ) },
    { stroke: (
      /*stroke*/
      ctx[5]
    ) },
    { fill: (
      /*fill*/
      ctx[6]
    ) },
    { color: (
      /*color*/
      ctx[4]
    ) },
    exclude(
      /*$$props*/
      ctx[9],
      ["use", "data", "fill", "viewBox", "width", "height", "stroke"]
    )
  ];
  let svg_data = {};
  for (let i = 0; i < svg_levels.length; i += 1) {
    svg_data = assign(svg_data, svg_levels[i]);
  }
  return {
    c() {
      svg = svg_element("svg");
      html_tag = new HtmlTagHydration(true);
      this.h();
    },
    l(nodes) {
      svg = claim_svg_element(nodes, "svg", {
        xmlns: true,
        width: true,
        height: true,
        viewBox: true,
        stroke: true,
        fill: true,
        color: true
      });
      var svg_nodes = children(svg);
      html_tag = claim_html_tag(svg_nodes, true);
      svg_nodes.forEach(detach);
      this.h();
    },
    h() {
      html_tag.a = null;
      set_svg_attributes(svg, svg_data);
    },
    m(target, anchor) {
      insert_hydration(target, svg, anchor);
      html_tag.m(
        /*elements*/
        ctx[7],
        svg
      );
      if (!mounted) {
        dispose = [
          action_destroyer(useActions_action = useActions.call(
            null,
            svg,
            /*use*/
            ctx[0]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[8].call(null, svg)
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*elements*/
      128)
        html_tag.p(
          /*elements*/
          ctx2[7]
        );
      set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
        { xmlns: "http://www.w3.org/2000/svg" },
        dirty & /*width*/
        4 && { width: (
          /*width*/
          ctx2[2]
        ) },
        dirty & /*height*/
        8 && { height: (
          /*height*/
          ctx2[3]
        ) },
        dirty & /*viewBox*/
        2 && { viewBox: (
          /*viewBox*/
          ctx2[1]
        ) },
        dirty & /*stroke*/
        32 && { stroke: (
          /*stroke*/
          ctx2[5]
        ) },
        dirty & /*fill*/
        64 && { fill: (
          /*fill*/
          ctx2[6]
        ) },
        dirty & /*color*/
        16 && { color: (
          /*color*/
          ctx2[4]
        ) },
        dirty & /*$$props*/
        512 && exclude(
          /*$$props*/
          ctx2[9],
          ["use", "data", "fill", "viewBox", "width", "height", "stroke"]
        )
      ]));
      if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/
      1)
        useActions_action.update.call(
          null,
          /*use*/
          ctx2[0]
        );
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(svg);
      }
      mounted = false;
      run_all(dispose);
    }
  };
}
function extractViewBox$1(svg) {
  const regex = /viewBox="([\d\- ]+)"/;
  const res = regex.exec(svg);
  if (!res)
    return "0 0 24 24";
  return res[1];
}
function instance$7($$self, $$props, $$invalidate) {
  let elements;
  let { use = [] } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { data = "" } = $$props;
  let { viewBox = extractViewBox$1(data) } = $$props;
  let { size = "24px" } = $$props;
  let { width = size } = $$props;
  let { height = size } = $$props;
  let { color = "currentColor" } = $$props;
  let { stroke = void 0 } = $$props;
  let { fill = color } = $$props;
  $$self.$$set = ($$new_props) => {
    $$invalidate(9, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("data" in $$new_props)
      $$invalidate(10, data = $$new_props.data);
    if ("viewBox" in $$new_props)
      $$invalidate(1, viewBox = $$new_props.viewBox);
    if ("size" in $$new_props)
      $$invalidate(11, size = $$new_props.size);
    if ("width" in $$new_props)
      $$invalidate(2, width = $$new_props.width);
    if ("height" in $$new_props)
      $$invalidate(3, height = $$new_props.height);
    if ("color" in $$new_props)
      $$invalidate(4, color = $$new_props.color);
    if ("stroke" in $$new_props)
      $$invalidate(5, stroke = $$new_props.stroke);
    if ("fill" in $$new_props)
      $$invalidate(6, fill = $$new_props.fill);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*data*/
    1024) {
      $$invalidate(7, elements = data.replace(/<svg ([^>]*)>/, "").replace("</svg>", ""));
    }
  };
  $$props = exclude_internal_props($$props);
  return [
    use,
    viewBox,
    width,
    height,
    color,
    stroke,
    fill,
    elements,
    forwardEvents,
    $$props,
    data,
    size
  ];
}
let Icon$1 = class Icon extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$7, create_fragment$7, safe_not_equal, {
      use: 0,
      data: 10,
      viewBox: 1,
      size: 11,
      width: 2,
      height: 3,
      color: 4,
      stroke: 5,
      fill: 6
    });
  }
};
const error = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>';
const unfold_more_horizontal = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z" /></svg>';
const check = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg>';
const close = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>';
const eye = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" /></svg>';
const eye_off = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z" /></svg>';
const account = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" /></svg>';
const chevron_down = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>';
const info = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>';
const arrow_back = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" /></svg>';
const arrow_forward = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" /></svg>';
const undo = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z" /></svg>';
const redo = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M18.4,10.6C16.55,9 14.15,8 11.5,8C6.85,8 2.92,11.03 1.54,15.22L3.9,16C4.95,12.81 7.95,10.5 11.5,10.5C13.45,10.5 15.23,11.22 16.62,12.38L13,16H22V7L18.4,10.6Z" /></svg>';
const print = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M18,3H6V7H18M19,12A1,1 0 0,1 18,11A1,1 0 0,1 19,10A1,1 0 0,1 20,11A1,1 0 0,1 19,12M16,19H8V14H16M19,8H5A3,3 0 0,0 2,11V17H6V21H18V17H22V11A3,3 0 0,0 19,8Z" /></svg>';
const download = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" /></svg>';
const trending_down = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M16,18L18.29,15.71L13.41,10.83L9.41,14.83L2,7.41L3.41,6L9.41,12L13.41,8L19.71,14.29L22,12V18H16Z" /></svg>';
const trending_neutral = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M22,12L18,8V11H3V13H18V16L22,12Z" /></svg>';
const trending_up = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z" /></svg>';
const warn = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z" /></svg>';
const check_circle = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" /></svg>';
const thumb_up = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z" /></svg>';
const comment = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M18,8H6V6H18V8M18,11H6V9H18V11M18,14H6V12H18V14M22,4A2,2 0 0,0 20,2H4A2,2 0 0,0 2,4V16A2,2 0 0,0 4,18H18L22,22V4Z" /></svg>';
const sort = '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M3,13H15V11H3M3,6V8H21V6M3,18H9V16H3V18Z" /></svg>';
const upload = '<svg style="width:24px;height:24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>upload</title><path d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z" /></svg>';
const alert_circle = '<svg style="width:24px;height:24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>alert-circle</title><path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>';
const get_trailing_slot_changes$1 = (dirty) => ({});
const get_trailing_slot_context$1 = (ctx) => ({});
const get_leading_slot_changes$1 = (dirty) => ({});
const get_leading_slot_context$1 = (ctx) => ({});
const get_label_slot_changes = (dirty) => ({});
const get_label_slot_context = (ctx) => ({});
function create_if_block_5$1(ctx) {
  let span;
  let current;
  const leading_slot_template = (
    /*#slots*/
    ctx[22].leading
  );
  const leading_slot = create_slot(
    leading_slot_template,
    ctx,
    /*$$scope*/
    ctx[25],
    get_leading_slot_context$1
  );
  return {
    c() {
      span = element("span");
      if (leading_slot)
        leading_slot.c();
      this.h();
    },
    l(nodes) {
      span = claim_element(nodes, "SPAN", { class: true });
      var span_nodes = children(span);
      if (leading_slot)
        leading_slot.l(span_nodes);
      span_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(span, "class", "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary-content");
      toggle_class(
        span,
        "text-danger",
        /*error*/
        ctx[4]
      );
    },
    m(target, anchor) {
      insert_hydration(target, span, anchor);
      if (leading_slot) {
        leading_slot.m(span, null);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (leading_slot) {
        if (leading_slot.p && (!current || dirty & /*$$scope*/
        33554432)) {
          update_slot_base(
            leading_slot,
            leading_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[25],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[25]
            ) : get_slot_changes(
              leading_slot_template,
              /*$$scope*/
              ctx2[25],
              dirty,
              get_leading_slot_changes$1
            ),
            get_leading_slot_context$1
          );
        }
      }
      if (!current || dirty & /*error*/
      16) {
        toggle_class(
          span,
          "text-danger",
          /*error*/
          ctx2[4]
        );
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(leading_slot, local);
      current = true;
    },
    o(local) {
      transition_out(leading_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
      if (leading_slot)
        leading_slot.d(detaching);
    }
  };
}
function create_if_block_4$1(ctx) {
  let button;
  let span;
  let icon;
  let span_transition;
  let current;
  let mounted;
  let dispose;
  icon = new Icon$1({ props: { data: close } });
  return {
    c() {
      button = element("button");
      span = element("span");
      create_component(icon.$$.fragment);
      this.h();
    },
    l(nodes) {
      button = claim_element(nodes, "BUTTON", { "aria-label": true, class: true });
      var button_nodes = children(button);
      span = claim_element(button_nodes, "SPAN", { class: true });
      var span_nodes = children(span);
      claim_component(icon.$$.fragment, span_nodes);
      span_nodes.forEach(detach);
      button_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(span, "class", "items-center flex text-secondary-content");
      attr(button, "aria-label", "clear");
      attr(button, "class", "disable-focus-active absolute inset-y-0 hidden group-focus-within:flex active:flex items-center");
      toggle_class(
        button,
        "right-10",
        /*showPasswordToggle*/
        ctx[10] || /*$$slots*/
        ctx[21].trailing || /*error*/
        ctx[4]
      );
      toggle_class(button, "right-3", !/*showPasswordToggle*/
      ctx[10] && !/*$$slots*/
      ctx[21].trailing && !/*error*/
      ctx[4]);
    },
    m(target, anchor) {
      insert_hydration(target, button, anchor);
      append_hydration(button, span);
      mount_component(icon, span, null);
      current = true;
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*handleClear*/
          ctx[19]
        );
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (!current || dirty & /*showPasswordToggle, $$slots, error*/
      2098192) {
        toggle_class(
          button,
          "right-10",
          /*showPasswordToggle*/
          ctx2[10] || /*$$slots*/
          ctx2[21].trailing || /*error*/
          ctx2[4]
        );
      }
      if (!current || dirty & /*showPasswordToggle, $$slots, error*/
      2098192) {
        toggle_class(button, "right-3", !/*showPasswordToggle*/
        ctx2[10] && !/*$$slots*/
        ctx2[21].trailing && !/*error*/
        ctx2[4]);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(icon.$$.fragment, local);
      if (local) {
        add_render_callback(() => {
          if (!current)
            return;
          if (!span_transition)
            span_transition = create_bidirectional_transition(span, scale$1, {}, true);
          span_transition.run(1);
        });
      }
      current = true;
    },
    o(local) {
      transition_out(icon.$$.fragment, local);
      if (local) {
        if (!span_transition)
          span_transition = create_bidirectional_transition(span, scale$1, {}, false);
        span_transition.run(0);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      destroy_component(icon);
      if (detaching && span_transition)
        span_transition.end();
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_3$1(ctx) {
  let span;
  let icon;
  let current;
  icon = new Icon$1({ props: { data: error } });
  return {
    c() {
      span = element("span");
      create_component(icon.$$.fragment);
      this.h();
    },
    l(nodes) {
      span = claim_element(nodes, "SPAN", { class: true });
      var span_nodes = children(span);
      claim_component(icon.$$.fragment, span_nodes);
      span_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(span, "class", "absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none");
    },
    m(target, anchor) {
      insert_hydration(target, span, anchor);
      mount_component(icon, span, null);
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
      if (detaching) {
        detach(span);
      }
      destroy_component(icon);
    }
  };
}
function create_if_block_2$1(ctx) {
  let span;
  let current;
  const trailing_slot_template = (
    /*#slots*/
    ctx[22].trailing
  );
  const trailing_slot = create_slot(
    trailing_slot_template,
    ctx,
    /*$$scope*/
    ctx[25],
    get_trailing_slot_context$1
  );
  return {
    c() {
      span = element("span");
      if (trailing_slot)
        trailing_slot.c();
      this.h();
    },
    l(nodes) {
      span = claim_element(nodes, "SPAN", { class: true });
      var span_nodes = children(span);
      if (trailing_slot)
        trailing_slot.l(span_nodes);
      span_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(span, "class", "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-secondary-content");
    },
    m(target, anchor) {
      insert_hydration(target, span, anchor);
      if (trailing_slot) {
        trailing_slot.m(span, null);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (trailing_slot) {
        if (trailing_slot.p && (!current || dirty & /*$$scope*/
        33554432)) {
          update_slot_base(
            trailing_slot,
            trailing_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[25],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[25]
            ) : get_slot_changes(
              trailing_slot_template,
              /*$$scope*/
              ctx2[25],
              dirty,
              get_trailing_slot_changes$1
            ),
            get_trailing_slot_context$1
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(trailing_slot, local);
      current = true;
    },
    o(local) {
      transition_out(trailing_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
      if (trailing_slot)
        trailing_slot.d(detaching);
    }
  };
}
function create_if_block_1$2(ctx) {
  let swap;
  let current;
  swap = new Swap({
    props: {
      swapped: (
        /*passwordVisible*/
        ctx[14]
      ),
      type: "flip",
      class: "disable-focus-active absolute left-[unset] inset-y-0 right-1 flex items-center w-9 text-secondary-content",
      $$slots: {
        off: [create_off_slot$1],
        on: [create_on_slot$1]
      },
      $$scope: { ctx }
    }
  });
  swap.$on(
    "click",
    /*togglePasswordVisibility*/
    ctx[18]
  );
  return {
    c() {
      create_component(swap.$$.fragment);
    },
    l(nodes) {
      claim_component(swap.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(swap, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const swap_changes = {};
      if (dirty & /*passwordVisible*/
      16384)
        swap_changes.swapped = /*passwordVisible*/
        ctx2[14];
      if (dirty & /*$$scope*/
      33554432) {
        swap_changes.$$scope = { dirty, ctx: ctx2 };
      }
      swap.$set(swap_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(swap.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(swap.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(swap, detaching);
    }
  };
}
function create_on_slot$1(ctx) {
  let icon;
  let current;
  icon = new Icon$1({ props: { slot: "on", data: eye } });
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
function create_off_slot$1(ctx) {
  let icon;
  let current;
  icon = new Icon$1({ props: { slot: "off", data: eye_off } });
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
function create_if_block$2(ctx) {
  let p;
  let t;
  let p_id_value;
  let p_transition;
  let current;
  return {
    c() {
      p = element("p");
      t = text(
        /*error*/
        ctx[4]
      );
      this.h();
    },
    l(nodes) {
      p = claim_element(nodes, "P", { class: true, id: true });
      var p_nodes = children(p);
      t = claim_text(
        p_nodes,
        /*error*/
        ctx[4]
      );
      p_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(p, "class", "mt-2 text-sm text-danger");
      attr(p, "id", p_id_value = /*name*/
      ctx[2] + "-error");
    },
    m(target, anchor) {
      insert_hydration(target, p, anchor);
      append_hydration(p, t);
      current = true;
    },
    p(ctx2, dirty) {
      if (!current || dirty & /*error*/
      16)
        set_data(
          t,
          /*error*/
          ctx2[4]
        );
      if (!current || dirty & /*name*/
      4 && p_id_value !== (p_id_value = /*name*/
      ctx2[2] + "-error")) {
        attr(p, "id", p_id_value);
      }
    },
    i(local) {
      if (current)
        return;
      if (local) {
        add_render_callback(() => {
          if (!current)
            return;
          if (!p_transition)
            p_transition = create_bidirectional_transition(p, slide, {}, true);
          p_transition.run(1);
        });
      }
      current = true;
    },
    o(local) {
      if (local) {
        if (!p_transition)
          p_transition = create_bidirectional_transition(p, slide, {}, false);
        p_transition.run(0);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(p);
      }
      if (detaching && p_transition)
        p_transition.end();
    }
  };
}
function create_fragment$6(ctx) {
  let div1;
  let t0;
  let div0;
  let input_1;
  let useActions_action;
  let t1;
  let t2;
  let t3;
  let current_block_type_index;
  let if_block2;
  let t4;
  let div1_style_value;
  let current;
  let mounted;
  let dispose;
  const label_slot_template = (
    /*#slots*/
    ctx[22].label
  );
  const label_slot = create_slot(
    label_slot_template,
    ctx,
    /*$$scope*/
    ctx[25],
    get_label_slot_context
  );
  let input_1_levels = [
    {
      autocapitalize: (
        /*autocapitalize*/
        ctx[7]
      )
    },
    { autocomplete: (
      /*autocomplete*/
      ctx[6]
    ) },
    { name: (
      /*name*/
      ctx[2]
    ) },
    { id: (
      /*name*/
      ctx[2]
    ) },
    { readOnly: (
      /*readonly*/
      ctx[8]
    ) },
    { tabindex: (
      /*tabindex*/
      ctx[9]
    ) },
    { disabled: (
      /*disabled*/
      ctx[12]
    ) },
    {
      class: "block h-[2.5rem] w-full px-3 border outline-none focus:outline-none sm:text-sm rounded-md bg-surface outline-offset-0 placeholder-secondary-content placeholder-opacity-80"
    },
    { placeholder: (
      /*placeholder*/
      ctx[5]
    ) },
    exclude(
      /*$$props*/
      ctx[20],
      ["use", "class"]
    )
  ];
  let input_data = {};
  for (let i = 0; i < input_1_levels.length; i += 1) {
    input_data = assign(input_data, input_1_levels[i]);
  }
  let if_block0 = (
    /*$$slots*/
    ctx[21].leading && create_if_block_5$1(ctx)
  );
  let if_block1 = (
    /*allowClear*/
    ctx[11] && /*value*/
    ctx[0] && /*value*/
    ctx[0].length > 0 && create_if_block_4$1(ctx)
  );
  const if_block_creators = [create_if_block_1$2, create_if_block_2$1, create_if_block_3$1];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*showPasswordToggle*/
      ctx2[10]
    )
      return 0;
    if (
      /*$$slots*/
      ctx2[21].trailing && !/*error*/
      ctx2[4]
    )
      return 1;
    if (
      /*error*/
      ctx2[4]
    )
      return 2;
    return -1;
  }
  if (~(current_block_type_index = select_block_type(ctx))) {
    if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  let if_block3 = (
    /*error*/
    ctx[4] && create_if_block$2(ctx)
  );
  return {
    c() {
      div1 = element("div");
      if (label_slot)
        label_slot.c();
      t0 = space();
      div0 = element("div");
      input_1 = element("input");
      t1 = space();
      if (if_block0)
        if_block0.c();
      t2 = space();
      if (if_block1)
        if_block1.c();
      t3 = space();
      if (if_block2)
        if_block2.c();
      t4 = space();
      if (if_block3)
        if_block3.c();
      this.h();
    },
    l(nodes) {
      div1 = claim_element(nodes, "DIV", { class: true, style: true });
      var div1_nodes = children(div1);
      if (label_slot)
        label_slot.l(div1_nodes);
      t0 = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      input_1 = claim_element(div0_nodes, "INPUT", {
        autocapitalize: true,
        autocomplete: true,
        name: true,
        id: true,
        tabindex: true,
        class: true,
        placeholder: true
      });
      t1 = claim_space(div0_nodes);
      if (if_block0)
        if_block0.l(div0_nodes);
      t2 = claim_space(div0_nodes);
      if (if_block1)
        if_block1.l(div0_nodes);
      t3 = claim_space(div0_nodes);
      if (if_block2)
        if_block2.l(div0_nodes);
      div0_nodes.forEach(detach);
      t4 = claim_space(div1_nodes);
      if (if_block3)
        if_block3.l(div1_nodes);
      div1_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(input_1, input_data);
      toggle_class(input_1, "border-border", !/*error*/
      ctx[4]);
      toggle_class(
        input_1,
        "border-danger",
        /*error*/
        ctx[4]
      );
      toggle_class(
        input_1,
        "text-danger",
        /*error*/
        ctx[4]
      );
      toggle_class(
        input_1,
        "placeholder-danger",
        /*error*/
        ctx[4]
      );
      toggle_class(
        input_1,
        "focus:border-red-500",
        /*error*/
        ctx[4]
      );
      toggle_class(input_1, "focus:border-primary", !/*error*/
      ctx[4]);
      toggle_class(
        input_1,
        "group-focus-within:not(.disable-focus-active):border-red-500",
        /*error*/
        ctx[4]
      );
      toggle_class(input_1, "group-focus-within:not(.disable-focus-active):border-primary", !/*error*/
      ctx[4]);
      toggle_class(
        input_1,
        "group-active:not(.disable-focus-active):border-red-500",
        /*error*/
        ctx[4]
      );
      toggle_class(input_1, "group-active:not(.disable-focus-active):border-primary", !/*error*/
      ctx[4]);
      toggle_class(
        input_1,
        "bg-default",
        /*disabled*/
        ctx[12]
      );
      toggle_class(
        input_1,
        "pl-10",
        /*$$slots*/
        ctx[21].leading
      );
      toggle_class(
        input_1,
        "pr-10",
        /*$$slots*/
        ctx[21].trailing || /*error*/
        ctx[4] || /*allowClear*/
        ctx[11] || /*type*/
        ctx[3] === "password"
      );
      attr(div0, "class", "mt-1 relative rounded-md h-[2.5rem]");
      toggle_class(
        div0,
        "text-danger",
        /*error*/
        ctx[4]
      );
      toggle_class(
        div0,
        "opacity-75",
        /*disabled*/
        ctx[12]
      );
      attr(
        div1,
        "class",
        /*finalClass*/
        ctx[15]
      );
      attr(div1, "style", div1_style_value = /*$$props*/
      ctx[20].style);
    },
    m(target, anchor) {
      insert_hydration(target, div1, anchor);
      if (label_slot) {
        label_slot.m(div1, null);
      }
      append_hydration(div1, t0);
      append_hydration(div1, div0);
      append_hydration(div0, input_1);
      if (input_1.autofocus)
        input_1.focus();
      ctx[23](input_1);
      set_input_value(
        input_1,
        /*value*/
        ctx[0]
      );
      append_hydration(div0, t1);
      if (if_block0)
        if_block0.m(div0, null);
      append_hydration(div0, t2);
      if (if_block1)
        if_block1.m(div0, null);
      append_hydration(div0, t3);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(div0, null);
      }
      append_hydration(div1, t4);
      if (if_block3)
        if_block3.m(div1, null);
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(
            /*useType*/
            ctx[17].call(null, input_1)
          ),
          listen(
            input_1,
            "input",
            /*input_1_input_handler*/
            ctx[24]
          ),
          action_destroyer(useActions_action = useActions.call(
            null,
            input_1,
            /*use*/
            ctx[1]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[16].call(null, input_1)
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (label_slot) {
        if (label_slot.p && (!current || dirty & /*$$scope*/
        33554432)) {
          update_slot_base(
            label_slot,
            label_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[25],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[25]
            ) : get_slot_changes(
              label_slot_template,
              /*$$scope*/
              ctx2[25],
              dirty,
              get_label_slot_changes
            ),
            get_label_slot_context
          );
        }
      }
      set_attributes(input_1, input_data = get_spread_update(input_1_levels, [
        (!current || dirty & /*autocapitalize*/
        128) && {
          autocapitalize: (
            /*autocapitalize*/
            ctx2[7]
          )
        },
        (!current || dirty & /*autocomplete*/
        64) && { autocomplete: (
          /*autocomplete*/
          ctx2[6]
        ) },
        (!current || dirty & /*name*/
        4) && { name: (
          /*name*/
          ctx2[2]
        ) },
        (!current || dirty & /*name*/
        4) && { id: (
          /*name*/
          ctx2[2]
        ) },
        (!current || dirty & /*readonly*/
        256) && { readOnly: (
          /*readonly*/
          ctx2[8]
        ) },
        (!current || dirty & /*tabindex*/
        512) && { tabindex: (
          /*tabindex*/
          ctx2[9]
        ) },
        (!current || dirty & /*disabled*/
        4096) && { disabled: (
          /*disabled*/
          ctx2[12]
        ) },
        {
          class: "block h-[2.5rem] w-full px-3 border outline-none focus:outline-none sm:text-sm rounded-md bg-surface outline-offset-0 placeholder-secondary-content placeholder-opacity-80"
        },
        (!current || dirty & /*placeholder*/
        32) && { placeholder: (
          /*placeholder*/
          ctx2[5]
        ) },
        dirty & /*$$props*/
        1048576 && exclude(
          /*$$props*/
          ctx2[20],
          ["use", "class"]
        )
      ]));
      if (dirty & /*value*/
      1 && input_1.value !== /*value*/
      ctx2[0]) {
        set_input_value(
          input_1,
          /*value*/
          ctx2[0]
        );
      }
      if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/
      2)
        useActions_action.update.call(
          null,
          /*use*/
          ctx2[1]
        );
      toggle_class(input_1, "border-border", !/*error*/
      ctx2[4]);
      toggle_class(
        input_1,
        "border-danger",
        /*error*/
        ctx2[4]
      );
      toggle_class(
        input_1,
        "text-danger",
        /*error*/
        ctx2[4]
      );
      toggle_class(
        input_1,
        "placeholder-danger",
        /*error*/
        ctx2[4]
      );
      toggle_class(
        input_1,
        "focus:border-red-500",
        /*error*/
        ctx2[4]
      );
      toggle_class(input_1, "focus:border-primary", !/*error*/
      ctx2[4]);
      toggle_class(
        input_1,
        "group-focus-within:not(.disable-focus-active):border-red-500",
        /*error*/
        ctx2[4]
      );
      toggle_class(input_1, "group-focus-within:not(.disable-focus-active):border-primary", !/*error*/
      ctx2[4]);
      toggle_class(
        input_1,
        "group-active:not(.disable-focus-active):border-red-500",
        /*error*/
        ctx2[4]
      );
      toggle_class(input_1, "group-active:not(.disable-focus-active):border-primary", !/*error*/
      ctx2[4]);
      toggle_class(
        input_1,
        "bg-default",
        /*disabled*/
        ctx2[12]
      );
      toggle_class(
        input_1,
        "pl-10",
        /*$$slots*/
        ctx2[21].leading
      );
      toggle_class(
        input_1,
        "pr-10",
        /*$$slots*/
        ctx2[21].trailing || /*error*/
        ctx2[4] || /*allowClear*/
        ctx2[11] || /*type*/
        ctx2[3] === "password"
      );
      if (
        /*$$slots*/
        ctx2[21].leading
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty & /*$$slots*/
          2097152) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_5$1(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(div0, t2);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      if (
        /*allowClear*/
        ctx2[11] && /*value*/
        ctx2[0] && /*value*/
        ctx2[0].length > 0
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty & /*allowClear, value*/
          2049) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_4$1(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div0, t3);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if (~current_block_type_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        }
      } else {
        if (if_block2) {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
        }
        if (~current_block_type_index) {
          if_block2 = if_blocks[current_block_type_index];
          if (!if_block2) {
            if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block2.c();
          } else {
            if_block2.p(ctx2, dirty);
          }
          transition_in(if_block2, 1);
          if_block2.m(div0, null);
        } else {
          if_block2 = null;
        }
      }
      if (!current || dirty & /*error*/
      16) {
        toggle_class(
          div0,
          "text-danger",
          /*error*/
          ctx2[4]
        );
      }
      if (!current || dirty & /*disabled*/
      4096) {
        toggle_class(
          div0,
          "opacity-75",
          /*disabled*/
          ctx2[12]
        );
      }
      if (
        /*error*/
        ctx2[4]
      ) {
        if (if_block3) {
          if_block3.p(ctx2, dirty);
          if (dirty & /*error*/
          16) {
            transition_in(if_block3, 1);
          }
        } else {
          if_block3 = create_if_block$2(ctx2);
          if_block3.c();
          transition_in(if_block3, 1);
          if_block3.m(div1, null);
        }
      } else if (if_block3) {
        group_outros();
        transition_out(if_block3, 1, 1, () => {
          if_block3 = null;
        });
        check_outros();
      }
      if (!current || dirty & /*finalClass*/
      32768) {
        attr(
          div1,
          "class",
          /*finalClass*/
          ctx2[15]
        );
      }
      if (!current || dirty & /*$$props*/
      1048576 && div1_style_value !== (div1_style_value = /*$$props*/
      ctx2[20].style)) {
        attr(div1, "style", div1_style_value);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(label_slot, local);
      transition_in(if_block0);
      transition_in(if_block1);
      transition_in(if_block2);
      transition_in(if_block3);
      current = true;
    },
    o(local) {
      transition_out(label_slot, local);
      transition_out(if_block0);
      transition_out(if_block1);
      transition_out(if_block2);
      transition_out(if_block3);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      if (label_slot)
        label_slot.d(detaching);
      ctx[23](null);
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d();
      }
      if (if_block3)
        if_block3.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
const defaultClass$4 = "group";
function instance$6($$self, $$props, $$invalidate) {
  let finalClass;
  let { $$slots: slots = {}, $$scope } = $$props;
  const $$slots = compute_slots(slots);
  let { use = [] } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { name } = $$props;
  let { type = "text" } = $$props;
  let { error: error2 = void 0 } = $$props;
  let { placeholder = void 0 } = $$props;
  let { value = void 0 } = $$props;
  let { autocomplete = void 0 } = $$props;
  let { autocapitalize = "off" } = $$props;
  let { readonly = void 0 } = $$props;
  let { tabindex = void 0 } = $$props;
  let { showPasswordToggle = false } = $$props;
  let { allowClear = false } = $$props;
  let { disabled = false } = $$props;
  let input;
  let currentError = writable(error2);
  function useType(node) {
    node.type = type;
  }
  let passwordVisible = false;
  function togglePasswordVisibility() {
    $$invalidate(14, passwordVisible = !passwordVisible);
    if (passwordVisible) {
      $$invalidate(13, input.type = "text", input);
    } else {
      $$invalidate(13, input.type = "password", input);
    }
  }
  function handleClear() {
    $$invalidate(13, input.value = "", input);
    $$invalidate(0, value = void 0);
  }
  setContext("input-name", name);
  setContext("input-error", currentError);
  function input_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      input = $$value;
      $$invalidate(13, input);
    });
  }
  function input_1_input_handler() {
    value = this.value;
    $$invalidate(0, value);
  }
  $$self.$$set = ($$new_props) => {
    $$invalidate(20, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props)
      $$invalidate(1, use = $$new_props.use);
    if ("name" in $$new_props)
      $$invalidate(2, name = $$new_props.name);
    if ("type" in $$new_props)
      $$invalidate(3, type = $$new_props.type);
    if ("error" in $$new_props)
      $$invalidate(4, error2 = $$new_props.error);
    if ("placeholder" in $$new_props)
      $$invalidate(5, placeholder = $$new_props.placeholder);
    if ("value" in $$new_props)
      $$invalidate(0, value = $$new_props.value);
    if ("autocomplete" in $$new_props)
      $$invalidate(6, autocomplete = $$new_props.autocomplete);
    if ("autocapitalize" in $$new_props)
      $$invalidate(7, autocapitalize = $$new_props.autocapitalize);
    if ("readonly" in $$new_props)
      $$invalidate(8, readonly = $$new_props.readonly);
    if ("tabindex" in $$new_props)
      $$invalidate(9, tabindex = $$new_props.tabindex);
    if ("showPasswordToggle" in $$new_props)
      $$invalidate(10, showPasswordToggle = $$new_props.showPasswordToggle);
    if ("allowClear" in $$new_props)
      $$invalidate(11, allowClear = $$new_props.allowClear);
    if ("disabled" in $$new_props)
      $$invalidate(12, disabled = $$new_props.disabled);
    if ("$$scope" in $$new_props)
      $$invalidate(25, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*error*/
    16) {
      currentError.set(error2);
    }
    $$invalidate(15, finalClass = twMerge(defaultClass$4, $$props.class));
  };
  $$props = exclude_internal_props($$props);
  return [
    value,
    use,
    name,
    type,
    error2,
    placeholder,
    autocomplete,
    autocapitalize,
    readonly,
    tabindex,
    showPasswordToggle,
    allowClear,
    disabled,
    input,
    passwordVisible,
    finalClass,
    forwardEvents,
    useType,
    togglePasswordVisibility,
    handleClear,
    $$props,
    $$slots,
    slots,
    input_1_binding,
    input_1_input_handler,
    $$scope
  ];
}
let Input$1 = class Input extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$6, create_fragment$6, safe_not_equal, {
      use: 1,
      name: 2,
      type: 3,
      error: 4,
      placeholder: 5,
      value: 0,
      autocomplete: 6,
      autocapitalize: 7,
      readonly: 8,
      tabindex: 9,
      showPasswordToggle: 10,
      allowClear: 11,
      disabled: 12
    });
  }
};
function create_fragment$5(ctx) {
  let label;
  let useActions_action;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = (
    /*#slots*/
    ctx[8].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[7],
    null
  );
  let label_levels = [
    { for: (
      /*name*/
      ctx[3]
    ) },
    { class: (
      /*finalClass*/
      ctx[1]
    ) },
    exclude(
      /*$$props*/
      ctx[5],
      ["use", "class"]
    )
  ];
  let label_data = {};
  for (let i = 0; i < label_levels.length; i += 1) {
    label_data = assign(label_data, label_levels[i]);
  }
  return {
    c() {
      label = element("label");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      label = claim_element(nodes, "LABEL", { for: true, class: true });
      var label_nodes = children(label);
      if (default_slot)
        default_slot.l(label_nodes);
      label_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(label, label_data);
    },
    m(target, anchor) {
      insert_hydration(target, label, anchor);
      if (default_slot) {
        default_slot.m(label, null);
      }
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(useActions_action = useActions.call(
            null,
            label,
            /*use*/
            ctx[0]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[2].call(null, label)
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        128)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[7],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[7]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[7],
              dirty,
              null
            ),
            null
          );
        }
      }
      set_attributes(label, label_data = get_spread_update(label_levels, [
        { for: (
          /*name*/
          ctx2[3]
        ) },
        (!current || dirty & /*finalClass*/
        2) && { class: (
          /*finalClass*/
          ctx2[1]
        ) },
        dirty & /*$$props*/
        32 && exclude(
          /*$$props*/
          ctx2[5],
          ["use", "class"]
        )
      ]));
      if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/
      1)
        useActions_action.update.call(
          null,
          /*use*/
          ctx2[0]
        );
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
      if (detaching) {
        detach(label);
      }
      if (default_slot)
        default_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
const defaultClass$3 = "block text-sm font-medium text-secondary-content";
const errorClass = "text-danger";
function instance$5($$self, $$props, $$invalidate) {
  let finalClass;
  let $error;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { use = [] } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  const name = getContext("input-name");
  const error2 = getContext("input-error");
  component_subscribe($$self, error2, (value) => $$invalidate(6, $error = value));
  $$self.$$set = ($$new_props) => {
    $$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("$$scope" in $$new_props)
      $$invalidate(7, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    $$invalidate(1, finalClass = twMerge(defaultClass$3, $error && $error.length > 0 ? errorClass : false, $$props.class));
  };
  $$props = exclude_internal_props($$props);
  return [use, finalClass, forwardEvents, name, error2, $$props, $error, $$scope, slots];
}
class Label extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$5, create_fragment$5, safe_not_equal, { use: 0 });
  }
}
const Input2 = Input$1;
Input2.Label = Label;
Input2.Leading = Icon$1;
Input2.Trailing = Icon$1;
const Loader_svelte_svelte_type_style_lang = "";
function create_fragment$4(ctx) {
  let svg;
  let circle0;
  let circle1;
  let useActions_action;
  let mounted;
  let dispose;
  let svg_levels = [
    { class: (
      /*finalClass*/
      ctx[1]
    ) },
    exclude(
      /*$$props*/
      ctx[3],
      ["use", "class"]
    ),
    { viewBox: "25 25 50 50" },
    { "stroke-width": "5" }
  ];
  let svg_data = {};
  for (let i = 0; i < svg_levels.length; i += 1) {
    svg_data = assign(svg_data, svg_levels[i]);
  }
  return {
    c() {
      svg = svg_element("svg");
      circle0 = svg_element("circle");
      circle1 = svg_element("circle");
      this.h();
    },
    l(nodes) {
      svg = claim_svg_element(nodes, "svg", {
        class: true,
        viewBox: true,
        "stroke-width": true
      });
      var svg_nodes = children(svg);
      circle0 = claim_svg_element(svg_nodes, "circle", { class: true, cx: true, cy: true, r: true });
      children(circle0).forEach(detach);
      circle1 = claim_svg_element(svg_nodes, "circle", { class: true, cx: true, cy: true, r: true });
      children(circle1).forEach(detach);
      svg_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(circle0, "class", "background-circle svelte-gzqvii");
      attr(circle0, "cx", "50");
      attr(circle0, "cy", "50");
      attr(circle0, "r", "20");
      attr(circle1, "class", "animated svelte-gzqvii");
      attr(circle1, "cx", "50");
      attr(circle1, "cy", "50");
      attr(circle1, "r", "20");
      set_svg_attributes(svg, svg_data);
      toggle_class(svg, "svelte-gzqvii", true);
    },
    m(target, anchor) {
      insert_hydration(target, svg, anchor);
      append_hydration(svg, circle0);
      append_hydration(svg, circle1);
      if (!mounted) {
        dispose = [
          action_destroyer(useActions_action = useActions.call(
            null,
            svg,
            /*use*/
            ctx[0]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[2].call(null, svg)
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
        dirty & /*finalClass*/
        2 && { class: (
          /*finalClass*/
          ctx2[1]
        ) },
        dirty & /*$$props*/
        8 && exclude(
          /*$$props*/
          ctx2[3],
          ["use", "class"]
        ),
        { viewBox: "25 25 50 50" },
        { "stroke-width": "5" }
      ]));
      if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/
      1)
        useActions_action.update.call(
          null,
          /*use*/
          ctx2[0]
        );
      toggle_class(svg, "svelte-gzqvii", true);
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(svg);
      }
      mounted = false;
      run_all(dispose);
    }
  };
}
const defaultClass$2 = "button-loader";
function instance$4($$self, $$props, $$invalidate) {
  let finalClass;
  let { use = [] } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  $$self.$$set = ($$new_props) => {
    $$invalidate(3, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
  };
  $$self.$$.update = () => {
    $$invalidate(1, finalClass = twMerge(defaultClass$2, $$props.class));
  };
  $$props = exclude_internal_props($$props);
  return [use, finalClass, forwardEvents, $$props];
}
class Loader extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$4, safe_not_equal, { use: 0 });
  }
}
function create_fragment$3(ctx) {
  let div;
  let div_style_value;
  return {
    c() {
      div = element("div");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true, style: true });
      children(div).forEach(detach);
      this.h();
    },
    h() {
      attr(
        div,
        "class",
        /*finalClass*/
        ctx[0]
      );
      attr(div, "style", div_style_value = /*$$props*/
      ctx[1].style);
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
    },
    p(ctx2, [dirty]) {
      if (dirty & /*finalClass*/
      1) {
        attr(
          div,
          "class",
          /*finalClass*/
          ctx2[0]
        );
      }
      if (dirty & /*$$props*/
      2 && div_style_value !== (div_style_value = /*$$props*/
      ctx2[1].style)) {
        attr(div, "style", div_style_value);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
const defaultClass$1 = "pointer-events-none absolute bg-hover	duration-150 transition-opacity h-full w-full inset-0 group-hover:opacity-[0.06] group-focus:opacity-[0.1] opacity-0";
function instance$3($$self, $$props, $$invalidate) {
  let finalClass;
  $$self.$$set = ($$new_props) => {
    $$invalidate(1, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
  };
  $$self.$$.update = () => {
    $$invalidate(0, finalClass = twMerge(defaultClass$1, $$props.class));
  };
  $$props = exclude_internal_props($$props);
  return [finalClass, $$props];
}
class HoverBackground extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, {});
  }
}
const defaultClass = "btn group relative inline-flex justify-center items-center font-medium active:hover:animate-none active:hover:scale-95 outline-none";
const xs = "px-2.5 py-1.5 text-xs";
const sm = "px-3 py-[0.45rem] text-sm";
const md = "px-3 py-[0.55rem] text-sm";
const lg = "px-4 py-2 text-base";
const xl = "px-4 py-3 text-base";
const fab = "p-5 h-[58px] w-[58px]";
const defaultButton = "border shadow-md bg-default text-default-content border-border hover:text-primary-hover";
const primaryButton = "border-none text-primary-content shadow-md bg-primary";
const dangerButton = "border-none shadow-md text-danger-content bg-danger";
const ghostButton = "border-none border-transparent shadow-none bg-transparent text-secondary-content hover:text-content";
const linkButton = "border-none border-transparent bg-transparent shadow-none text-primary hover:text-primary-hover";
const textButton = "border-transparent";
const baseDisabled = "active:hover:scale-100 opacity-70";
const defaultDisabled = "text-default-content bg-default hover:text-default-content";
const ghostDisabled = "text-secondary-content hover:text-secondary-content";
const linkDisabled = "text-primary-hover hover:text-primary-hover";
const textDisabled = "border-transparent";
const circleShape = "rounded-full";
const squareShape = "rounded-none";
const roundedShape = "rounded-md";
const pillShape = "rounded-3xl";
const circleXs = "p-1 h-[30px] w-[30px]";
const circleSm = "p-1 h-[38px] w-[38px]";
const circleMd = "p-2 h-[38px] w-[38px]";
const circleLg = "p-3 h-[42px] w-[42px]";
const circleXl = "p-4 h-[50px] w-[50px]";
const get_trailing_slot_changes_1 = (dirty) => ({ size: dirty & /*iconSize*/
512 });
const get_trailing_slot_context_1 = (ctx) => ({ size: (
  /*iconSize*/
  ctx[9]
) });
const get_icon_slot_changes_2 = (dirty) => ({ size: dirty & /*iconSize*/
512 });
const get_icon_slot_context_2 = (ctx) => ({ slot: "on", size: (
  /*iconSize*/
  ctx[9]
) });
const get_leading_slot_changes_2 = (dirty) => ({ size: dirty & /*iconSize*/
512 });
const get_leading_slot_context_2 = (ctx) => ({ size: (
  /*iconSize*/
  ctx[9]
) });
const get_trailing_slot_changes = (dirty) => ({ size: dirty & /*iconSize*/
512 });
const get_trailing_slot_context = (ctx) => ({ size: (
  /*iconSize*/
  ctx[9]
) });
const get_icon_slot_changes_1 = (dirty) => ({ size: dirty & /*iconSize*/
512 });
const get_icon_slot_context_1 = (ctx) => ({ slot: "on", size: (
  /*iconSize*/
  ctx[9]
) });
const get_leading_slot_changes_1 = (dirty) => ({ size: dirty & /*iconSize*/
512 });
const get_leading_slot_context_1 = (ctx) => ({ slot: "on", size: (
  /*iconSize*/
  ctx[9]
) });
const get_icon_slot_changes = (dirty) => ({});
const get_icon_slot_context = (ctx) => ({ slot: "on" });
const get_leading_slot_changes = (dirty) => ({ size: dirty & /*iconSize*/
512 });
const get_leading_slot_context = (ctx) => ({ slot: "on", size: (
  /*iconSize*/
  ctx[9]
) });
function create_else_block$1(ctx) {
  let t0;
  let t1;
  let t2;
  let if_block2_anchor;
  let current;
  let if_block0 = (
    /*$$slots*/
    ctx[14].leading && create_if_block_9(ctx)
  );
  let if_block1 = (
    /*$$slots*/
    ctx[14].icon && create_if_block_8(ctx)
  );
  const default_slot_template = (
    /*#slots*/
    ctx[17].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[18],
    null
  );
  let if_block2 = (
    /*$$slots*/
    ctx[14].trailing && create_if_block_7(ctx)
  );
  return {
    c() {
      if (if_block0)
        if_block0.c();
      t0 = space();
      if (if_block1)
        if_block1.c();
      t1 = space();
      if (default_slot)
        default_slot.c();
      t2 = space();
      if (if_block2)
        if_block2.c();
      if_block2_anchor = empty();
    },
    l(nodes) {
      if (if_block0)
        if_block0.l(nodes);
      t0 = claim_space(nodes);
      if (if_block1)
        if_block1.l(nodes);
      t1 = claim_space(nodes);
      if (default_slot)
        default_slot.l(nodes);
      t2 = claim_space(nodes);
      if (if_block2)
        if_block2.l(nodes);
      if_block2_anchor = empty();
    },
    m(target, anchor) {
      if (if_block0)
        if_block0.m(target, anchor);
      insert_hydration(target, t0, anchor);
      if (if_block1)
        if_block1.m(target, anchor);
      insert_hydration(target, t1, anchor);
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      insert_hydration(target, t2, anchor);
      if (if_block2)
        if_block2.m(target, anchor);
      insert_hydration(target, if_block2_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (
        /*$$slots*/
        ctx2[14].leading
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty & /*$$slots*/
          16384) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_9(ctx2);
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
      if (
        /*$$slots*/
        ctx2[14].icon
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty & /*$$slots*/
          16384) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_8(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(t1.parentNode, t1);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        262144)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[18],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[18]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[18],
              dirty,
              null
            ),
            null
          );
        }
      }
      if (
        /*$$slots*/
        ctx2[14].trailing
      ) {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
          if (dirty & /*$$slots*/
          16384) {
            transition_in(if_block2, 1);
          }
        } else {
          if_block2 = create_if_block_7(ctx2);
          if_block2.c();
          transition_in(if_block2, 1);
          if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
        }
      } else if (if_block2) {
        group_outros();
        transition_out(if_block2, 1, 1, () => {
          if_block2 = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block0);
      transition_in(if_block1);
      transition_in(default_slot, local);
      transition_in(if_block2);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      transition_out(default_slot, local);
      transition_out(if_block2);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t0);
        detach(t1);
        detach(t2);
        detach(if_block2_anchor);
      }
      if (if_block0)
        if_block0.d(detaching);
      if (if_block1)
        if_block1.d(detaching);
      if (default_slot)
        default_slot.d(detaching);
      if (if_block2)
        if_block2.d(detaching);
    }
  };
}
function create_if_block_1$1(ctx) {
  let current_block_type_index;
  let if_block0;
  let t0;
  let t1;
  let if_block1_anchor;
  let current;
  const if_block_creators = [create_if_block_3, create_if_block_4, create_if_block_5, create_if_block_6];
  const if_blocks = [];
  function select_block_type_1(ctx2, dirty) {
    if (
      /*$$slots*/
      ctx2[14].leading && /*$$slots*/
      ctx2[14].icon
    )
      return 0;
    if (
      /*$$slots*/
      ctx2[14].leading
    )
      return 1;
    if (
      /*$$slots*/
      ctx2[14].icon
    )
      return 2;
    if (
      /*loading*/
      ctx2[3]
    )
      return 3;
    return -1;
  }
  if (~(current_block_type_index = select_block_type_1(ctx))) {
    if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  const default_slot_template = (
    /*#slots*/
    ctx[17].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[18],
    null
  );
  let if_block1 = (
    /*$$slots*/
    ctx[14].trailing && create_if_block_2(ctx)
  );
  return {
    c() {
      if (if_block0)
        if_block0.c();
      t0 = space();
      if (default_slot)
        default_slot.c();
      t1 = space();
      if (if_block1)
        if_block1.c();
      if_block1_anchor = empty();
    },
    l(nodes) {
      if (if_block0)
        if_block0.l(nodes);
      t0 = claim_space(nodes);
      if (default_slot)
        default_slot.l(nodes);
      t1 = claim_space(nodes);
      if (if_block1)
        if_block1.l(nodes);
      if_block1_anchor = empty();
    },
    m(target, anchor) {
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(target, anchor);
      }
      insert_hydration(target, t0, anchor);
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      insert_hydration(target, t1, anchor);
      if (if_block1)
        if_block1.m(target, anchor);
      insert_hydration(target, if_block1_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_1(ctx2);
      if (current_block_type_index === previous_block_index) {
        if (~current_block_type_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        }
      } else {
        if (if_block0) {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
        }
        if (~current_block_type_index) {
          if_block0 = if_blocks[current_block_type_index];
          if (!if_block0) {
            if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block0.c();
          } else {
            if_block0.p(ctx2, dirty);
          }
          transition_in(if_block0, 1);
          if_block0.m(t0.parentNode, t0);
        } else {
          if_block0 = null;
        }
      }
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        262144)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[18],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[18]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[18],
              dirty,
              null
            ),
            null
          );
        }
      }
      if (
        /*$$slots*/
        ctx2[14].trailing
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty & /*$$slots*/
          16384) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_2(ctx2);
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
      transition_in(default_slot, local);
      transition_in(if_block1);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(default_slot, local);
      transition_out(if_block1);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t0);
        detach(t1);
        detach(if_block1_anchor);
      }
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d(detaching);
      }
      if (default_slot)
        default_slot.d(detaching);
      if (if_block1)
        if_block1.d(detaching);
    }
  };
}
function create_if_block_9(ctx) {
  let div;
  let current;
  const leading_slot_template = (
    /*#slots*/
    ctx[17].leading
  );
  const leading_slot = create_slot(
    leading_slot_template,
    ctx,
    /*$$scope*/
    ctx[18],
    get_leading_slot_context_2
  );
  return {
    c() {
      div = element("div");
      if (leading_slot)
        leading_slot.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true, style: true });
      var div_nodes = children(div);
      if (leading_slot)
        leading_slot.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "flex justify-center items-center relative");
      set_style(
        div,
        "width",
        /*iconSize*/
        ctx[9]
      );
      toggle_class(
        div,
        "mr-1",
        /*size*/
        ctx[5] === "xs" || /*size*/
        ctx[5] === "sm"
      );
      toggle_class(
        div,
        "mr-2",
        /*size*/
        ctx[5] === "md" || /*size*/
        ctx[5] === "lg" || /*size*/
        ctx[5] === "xl" || /*size*/
        ctx[5] === "fab"
      );
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (leading_slot) {
        leading_slot.m(div, null);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (leading_slot) {
        if (leading_slot.p && (!current || dirty & /*$$scope, iconSize*/
        262656)) {
          update_slot_base(
            leading_slot,
            leading_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[18],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[18]
            ) : get_slot_changes(
              leading_slot_template,
              /*$$scope*/
              ctx2[18],
              dirty,
              get_leading_slot_changes_2
            ),
            get_leading_slot_context_2
          );
        }
      }
      if (!current || dirty & /*iconSize*/
      512) {
        set_style(
          div,
          "width",
          /*iconSize*/
          ctx2[9]
        );
      }
      if (!current || dirty & /*size*/
      32) {
        toggle_class(
          div,
          "mr-1",
          /*size*/
          ctx2[5] === "xs" || /*size*/
          ctx2[5] === "sm"
        );
      }
      if (!current || dirty & /*size*/
      32) {
        toggle_class(
          div,
          "mr-2",
          /*size*/
          ctx2[5] === "md" || /*size*/
          ctx2[5] === "lg" || /*size*/
          ctx2[5] === "xl" || /*size*/
          ctx2[5] === "fab"
        );
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(leading_slot, local);
      current = true;
    },
    o(local) {
      transition_out(leading_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (leading_slot)
        leading_slot.d(detaching);
    }
  };
}
function create_if_block_8(ctx) {
  let div;
  let swap;
  let current;
  swap = new Swap({
    props: {
      loading: (
        /*loading*/
        ctx[3]
      ),
      style: "width: " + /*iconSize*/
      ctx[9] + ";",
      $$slots: {
        off: [create_off_slot_4],
        on: [create_on_slot_4]
      },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      div = element("div");
      create_component(swap.$$.fragment);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true, style: true });
      var div_nodes = children(div);
      claim_component(swap.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "flex justify-center items-center relative");
      set_style(
        div,
        "width",
        /*iconSize*/
        ctx[9]
      );
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      mount_component(swap, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      const swap_changes = {};
      if (dirty & /*loading*/
      8)
        swap_changes.loading = /*loading*/
        ctx2[3];
      if (dirty & /*iconSize*/
      512)
        swap_changes.style = "width: " + /*iconSize*/
        ctx2[9] + ";";
      if (dirty & /*$$scope, iconSize*/
      262656) {
        swap_changes.$$scope = { dirty, ctx: ctx2 };
      }
      swap.$set(swap_changes);
      if (!current || dirty & /*iconSize*/
      512) {
        set_style(
          div,
          "width",
          /*iconSize*/
          ctx2[9]
        );
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(swap.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(swap.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(swap);
    }
  };
}
function create_on_slot_4(ctx) {
  let current;
  const icon_slot_template = (
    /*#slots*/
    ctx[17].icon
  );
  const icon_slot = create_slot(
    icon_slot_template,
    ctx,
    /*$$scope*/
    ctx[18],
    get_icon_slot_context_2
  );
  return {
    c() {
      if (icon_slot)
        icon_slot.c();
    },
    l(nodes) {
      if (icon_slot)
        icon_slot.l(nodes);
    },
    m(target, anchor) {
      if (icon_slot) {
        icon_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (icon_slot) {
        if (icon_slot.p && (!current || dirty & /*$$scope, iconSize*/
        262656)) {
          update_slot_base(
            icon_slot,
            icon_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[18],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[18]
            ) : get_slot_changes(
              icon_slot_template,
              /*$$scope*/
              ctx2[18],
              dirty,
              get_icon_slot_changes_2
            ),
            get_icon_slot_context_2
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(icon_slot, local);
      current = true;
    },
    o(local) {
      transition_out(icon_slot, local);
      current = false;
    },
    d(detaching) {
      if (icon_slot)
        icon_slot.d(detaching);
    }
  };
}
function create_off_slot_4(ctx) {
  let buttonloader;
  let current;
  buttonloader = new Loader({ props: { slot: "off" } });
  return {
    c() {
      create_component(buttonloader.$$.fragment);
    },
    l(nodes) {
      claim_component(buttonloader.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(buttonloader, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(buttonloader.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(buttonloader.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(buttonloader, detaching);
    }
  };
}
function create_if_block_7(ctx) {
  let div;
  let current;
  const trailing_slot_template = (
    /*#slots*/
    ctx[17].trailing
  );
  const trailing_slot = create_slot(
    trailing_slot_template,
    ctx,
    /*$$scope*/
    ctx[18],
    get_trailing_slot_context_1
  );
  return {
    c() {
      div = element("div");
      if (trailing_slot)
        trailing_slot.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true, style: true });
      var div_nodes = children(div);
      if (trailing_slot)
        trailing_slot.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "flex justify-center items-center relative");
      set_style(
        div,
        "width",
        /*iconSize*/
        ctx[9]
      );
      toggle_class(
        div,
        "ml-1",
        /*size*/
        ctx[5] === "xs" || /*size*/
        ctx[5] === "sm"
      );
      toggle_class(
        div,
        "ml-2",
        /*size*/
        ctx[5] === "md" || /*size*/
        ctx[5] === "lg" || /*size*/
        ctx[5] === "xl" || /*size*/
        ctx[5] === "fab"
      );
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (trailing_slot) {
        trailing_slot.m(div, null);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (trailing_slot) {
        if (trailing_slot.p && (!current || dirty & /*$$scope, iconSize*/
        262656)) {
          update_slot_base(
            trailing_slot,
            trailing_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[18],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[18]
            ) : get_slot_changes(
              trailing_slot_template,
              /*$$scope*/
              ctx2[18],
              dirty,
              get_trailing_slot_changes_1
            ),
            get_trailing_slot_context_1
          );
        }
      }
      if (!current || dirty & /*iconSize*/
      512) {
        set_style(
          div,
          "width",
          /*iconSize*/
          ctx2[9]
        );
      }
      if (!current || dirty & /*size*/
      32) {
        toggle_class(
          div,
          "ml-1",
          /*size*/
          ctx2[5] === "xs" || /*size*/
          ctx2[5] === "sm"
        );
      }
      if (!current || dirty & /*size*/
      32) {
        toggle_class(
          div,
          "ml-2",
          /*size*/
          ctx2[5] === "md" || /*size*/
          ctx2[5] === "lg" || /*size*/
          ctx2[5] === "xl" || /*size*/
          ctx2[5] === "fab"
        );
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(trailing_slot, local);
      current = true;
    },
    o(local) {
      transition_out(trailing_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (trailing_slot)
        trailing_slot.d(detaching);
    }
  };
}
function create_if_block_6(ctx) {
  let div;
  let buttonloader;
  let div_transition;
  let current;
  buttonloader = new Loader({});
  return {
    c() {
      div = element("div");
      create_component(buttonloader.$$.fragment);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(buttonloader.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "flex justify-center items-center relative");
      toggle_class(
        div,
        "mr-1",
        /*size*/
        ctx[5] === "xs" || /*size*/
        ctx[5] === "sm"
      );
      toggle_class(
        div,
        "mr-2",
        /*size*/
        ctx[5] === "md" || /*size*/
        ctx[5] === "lg" || /*size*/
        ctx[5] === "xl" || /*size*/
        ctx[5] === "fab"
      );
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      mount_component(buttonloader, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      if (!current || dirty & /*size*/
      32) {
        toggle_class(
          div,
          "mr-1",
          /*size*/
          ctx2[5] === "xs" || /*size*/
          ctx2[5] === "sm"
        );
      }
      if (!current || dirty & /*size*/
      32) {
        toggle_class(
          div,
          "mr-2",
          /*size*/
          ctx2[5] === "md" || /*size*/
          ctx2[5] === "lg" || /*size*/
          ctx2[5] === "xl" || /*size*/
          ctx2[5] === "fab"
        );
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(buttonloader.$$.fragment, local);
      if (local) {
        add_render_callback(() => {
          if (!current)
            return;
          if (!div_transition)
            div_transition = create_bidirectional_transition(div, scale$1, {}, true);
          div_transition.run(1);
        });
      }
      current = true;
    },
    o(local) {
      transition_out(buttonloader.$$.fragment, local);
      if (local) {
        if (!div_transition)
          div_transition = create_bidirectional_transition(div, scale$1, {}, false);
        div_transition.run(0);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(buttonloader);
      if (detaching && div_transition)
        div_transition.end();
    }
  };
}
function create_if_block_5(ctx) {
  let div;
  let swap;
  let current;
  swap = new Swap({
    props: {
      loading: (
        /*loading*/
        ctx[3]
      ),
      style: "width: " + /*iconSize*/
      ctx[9] + ";",
      $$slots: {
        off: [create_off_slot_3],
        on: [create_on_slot_3]
      },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      div = element("div");
      create_component(swap.$$.fragment);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true, style: true });
      var div_nodes = children(div);
      claim_component(swap.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "flex justify-center items-center relative");
      set_style(
        div,
        "width",
        /*iconSize*/
        ctx[9]
      );
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      mount_component(swap, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      const swap_changes = {};
      if (dirty & /*loading*/
      8)
        swap_changes.loading = /*loading*/
        ctx2[3];
      if (dirty & /*iconSize*/
      512)
        swap_changes.style = "width: " + /*iconSize*/
        ctx2[9] + ";";
      if (dirty & /*$$scope, iconSize*/
      262656) {
        swap_changes.$$scope = { dirty, ctx: ctx2 };
      }
      swap.$set(swap_changes);
      if (!current || dirty & /*iconSize*/
      512) {
        set_style(
          div,
          "width",
          /*iconSize*/
          ctx2[9]
        );
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(swap.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(swap.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(swap);
    }
  };
}
function create_if_block_4(ctx) {
  let div;
  let swap;
  let current;
  swap = new Swap({
    props: {
      loading: (
        /*loading*/
        ctx[3]
      ),
      style: "width: " + /*iconSize*/
      ctx[9] + ";",
      $$slots: {
        off: [create_off_slot_2],
        on: [create_on_slot_2]
      },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      div = element("div");
      create_component(swap.$$.fragment);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true, style: true });
      var div_nodes = children(div);
      claim_component(swap.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "flex justify-center items-center relative");
      set_style(
        div,
        "width",
        /*iconSize*/
        ctx[9]
      );
      toggle_class(
        div,
        "mr-1",
        /*size*/
        ctx[5] === "xs" || /*size*/
        ctx[5] === "sm"
      );
      toggle_class(
        div,
        "mr-2",
        /*size*/
        ctx[5] === "md" || /*size*/
        ctx[5] === "lg" || /*size*/
        ctx[5] === "xl" || /*size*/
        ctx[5] === "fab"
      );
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      mount_component(swap, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      const swap_changes = {};
      if (dirty & /*loading*/
      8)
        swap_changes.loading = /*loading*/
        ctx2[3];
      if (dirty & /*iconSize*/
      512)
        swap_changes.style = "width: " + /*iconSize*/
        ctx2[9] + ";";
      if (dirty & /*$$scope, iconSize*/
      262656) {
        swap_changes.$$scope = { dirty, ctx: ctx2 };
      }
      swap.$set(swap_changes);
      if (!current || dirty & /*iconSize*/
      512) {
        set_style(
          div,
          "width",
          /*iconSize*/
          ctx2[9]
        );
      }
      if (!current || dirty & /*size*/
      32) {
        toggle_class(
          div,
          "mr-1",
          /*size*/
          ctx2[5] === "xs" || /*size*/
          ctx2[5] === "sm"
        );
      }
      if (!current || dirty & /*size*/
      32) {
        toggle_class(
          div,
          "mr-2",
          /*size*/
          ctx2[5] === "md" || /*size*/
          ctx2[5] === "lg" || /*size*/
          ctx2[5] === "xl" || /*size*/
          ctx2[5] === "fab"
        );
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(swap.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(swap.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(swap);
    }
  };
}
function create_if_block_3(ctx) {
  let div0;
  let swap0;
  let t;
  let div1;
  let swap1;
  let current;
  swap0 = new Swap({
    props: {
      loading: (
        /*loading*/
        ctx[3]
      ),
      style: "width: " + /*iconSize*/
      ctx[9] + ";",
      $$slots: {
        off: [create_off_slot_1],
        on: [create_on_slot_1]
      },
      $$scope: { ctx }
    }
  });
  swap1 = new Swap({
    props: {
      loading: (
        /*loading*/
        ctx[3]
      ),
      $$slots: {
        off: [create_off_slot],
        on: [create_on_slot]
      },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      div0 = element("div");
      create_component(swap0.$$.fragment);
      t = space();
      div1 = element("div");
      create_component(swap1.$$.fragment);
      this.h();
    },
    l(nodes) {
      div0 = claim_element(nodes, "DIV", { class: true, style: true });
      var div0_nodes = children(div0);
      claim_component(swap0.$$.fragment, div0_nodes);
      div0_nodes.forEach(detach);
      t = claim_space(nodes);
      div1 = claim_element(nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      claim_component(swap1.$$.fragment, div1_nodes);
      div1_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div0, "class", "flex justify-center items-center relative");
      set_style(
        div0,
        "width",
        /*iconSize*/
        ctx[9]
      );
      toggle_class(
        div0,
        "mr-1",
        /*size*/
        ctx[5] === "xs" || /*size*/
        ctx[5] === "sm"
      );
      toggle_class(
        div0,
        "mr-2",
        /*size*/
        ctx[5] === "md" || /*size*/
        ctx[5] === "lg" || /*size*/
        ctx[5] === "xl" || /*size*/
        ctx[5] === "fab"
      );
      attr(div1, "class", "flex justify-center items-center relative");
    },
    m(target, anchor) {
      insert_hydration(target, div0, anchor);
      mount_component(swap0, div0, null);
      insert_hydration(target, t, anchor);
      insert_hydration(target, div1, anchor);
      mount_component(swap1, div1, null);
      current = true;
    },
    p(ctx2, dirty) {
      const swap0_changes = {};
      if (dirty & /*loading*/
      8)
        swap0_changes.loading = /*loading*/
        ctx2[3];
      if (dirty & /*iconSize*/
      512)
        swap0_changes.style = "width: " + /*iconSize*/
        ctx2[9] + ";";
      if (dirty & /*$$scope, iconSize*/
      262656) {
        swap0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      swap0.$set(swap0_changes);
      if (!current || dirty & /*iconSize*/
      512) {
        set_style(
          div0,
          "width",
          /*iconSize*/
          ctx2[9]
        );
      }
      if (!current || dirty & /*size*/
      32) {
        toggle_class(
          div0,
          "mr-1",
          /*size*/
          ctx2[5] === "xs" || /*size*/
          ctx2[5] === "sm"
        );
      }
      if (!current || dirty & /*size*/
      32) {
        toggle_class(
          div0,
          "mr-2",
          /*size*/
          ctx2[5] === "md" || /*size*/
          ctx2[5] === "lg" || /*size*/
          ctx2[5] === "xl" || /*size*/
          ctx2[5] === "fab"
        );
      }
      const swap1_changes = {};
      if (dirty & /*loading*/
      8)
        swap1_changes.loading = /*loading*/
        ctx2[3];
      if (dirty & /*$$scope*/
      262144) {
        swap1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      swap1.$set(swap1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(swap0.$$.fragment, local);
      transition_in(swap1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(swap0.$$.fragment, local);
      transition_out(swap1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div0);
        detach(t);
        detach(div1);
      }
      destroy_component(swap0);
      destroy_component(swap1);
    }
  };
}
function create_on_slot_3(ctx) {
  let current;
  const icon_slot_template = (
    /*#slots*/
    ctx[17].icon
  );
  const icon_slot = create_slot(
    icon_slot_template,
    ctx,
    /*$$scope*/
    ctx[18],
    get_icon_slot_context_1
  );
  return {
    c() {
      if (icon_slot)
        icon_slot.c();
    },
    l(nodes) {
      if (icon_slot)
        icon_slot.l(nodes);
    },
    m(target, anchor) {
      if (icon_slot) {
        icon_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (icon_slot) {
        if (icon_slot.p && (!current || dirty & /*$$scope, iconSize*/
        262656)) {
          update_slot_base(
            icon_slot,
            icon_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[18],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[18]
            ) : get_slot_changes(
              icon_slot_template,
              /*$$scope*/
              ctx2[18],
              dirty,
              get_icon_slot_changes_1
            ),
            get_icon_slot_context_1
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(icon_slot, local);
      current = true;
    },
    o(local) {
      transition_out(icon_slot, local);
      current = false;
    },
    d(detaching) {
      if (icon_slot)
        icon_slot.d(detaching);
    }
  };
}
function create_off_slot_3(ctx) {
  let buttonloader;
  let current;
  buttonloader = new Loader({ props: { slot: "off" } });
  return {
    c() {
      create_component(buttonloader.$$.fragment);
    },
    l(nodes) {
      claim_component(buttonloader.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(buttonloader, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(buttonloader.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(buttonloader.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(buttonloader, detaching);
    }
  };
}
function create_on_slot_2(ctx) {
  let current;
  const leading_slot_template = (
    /*#slots*/
    ctx[17].leading
  );
  const leading_slot = create_slot(
    leading_slot_template,
    ctx,
    /*$$scope*/
    ctx[18],
    get_leading_slot_context_1
  );
  return {
    c() {
      if (leading_slot)
        leading_slot.c();
    },
    l(nodes) {
      if (leading_slot)
        leading_slot.l(nodes);
    },
    m(target, anchor) {
      if (leading_slot) {
        leading_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (leading_slot) {
        if (leading_slot.p && (!current || dirty & /*$$scope, iconSize*/
        262656)) {
          update_slot_base(
            leading_slot,
            leading_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[18],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[18]
            ) : get_slot_changes(
              leading_slot_template,
              /*$$scope*/
              ctx2[18],
              dirty,
              get_leading_slot_changes_1
            ),
            get_leading_slot_context_1
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(leading_slot, local);
      current = true;
    },
    o(local) {
      transition_out(leading_slot, local);
      current = false;
    },
    d(detaching) {
      if (leading_slot)
        leading_slot.d(detaching);
    }
  };
}
function create_off_slot_2(ctx) {
  let buttonloader;
  let current;
  buttonloader = new Loader({ props: { slot: "off" } });
  return {
    c() {
      create_component(buttonloader.$$.fragment);
    },
    l(nodes) {
      claim_component(buttonloader.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(buttonloader, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(buttonloader.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(buttonloader.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(buttonloader, detaching);
    }
  };
}
function create_on_slot_1(ctx) {
  let current;
  const leading_slot_template = (
    /*#slots*/
    ctx[17].leading
  );
  const leading_slot = create_slot(
    leading_slot_template,
    ctx,
    /*$$scope*/
    ctx[18],
    get_leading_slot_context
  );
  return {
    c() {
      if (leading_slot)
        leading_slot.c();
    },
    l(nodes) {
      if (leading_slot)
        leading_slot.l(nodes);
    },
    m(target, anchor) {
      if (leading_slot) {
        leading_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (leading_slot) {
        if (leading_slot.p && (!current || dirty & /*$$scope, iconSize*/
        262656)) {
          update_slot_base(
            leading_slot,
            leading_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[18],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[18]
            ) : get_slot_changes(
              leading_slot_template,
              /*$$scope*/
              ctx2[18],
              dirty,
              get_leading_slot_changes
            ),
            get_leading_slot_context
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(leading_slot, local);
      current = true;
    },
    o(local) {
      transition_out(leading_slot, local);
      current = false;
    },
    d(detaching) {
      if (leading_slot)
        leading_slot.d(detaching);
    }
  };
}
function create_off_slot_1(ctx) {
  let buttonloader;
  let current;
  buttonloader = new Loader({ props: { slot: "off" } });
  return {
    c() {
      create_component(buttonloader.$$.fragment);
    },
    l(nodes) {
      claim_component(buttonloader.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(buttonloader, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(buttonloader.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(buttonloader.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(buttonloader, detaching);
    }
  };
}
function create_on_slot(ctx) {
  let current;
  const icon_slot_template = (
    /*#slots*/
    ctx[17].icon
  );
  const icon_slot = create_slot(
    icon_slot_template,
    ctx,
    /*$$scope*/
    ctx[18],
    get_icon_slot_context
  );
  return {
    c() {
      if (icon_slot)
        icon_slot.c();
    },
    l(nodes) {
      if (icon_slot)
        icon_slot.l(nodes);
    },
    m(target, anchor) {
      if (icon_slot) {
        icon_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (icon_slot) {
        if (icon_slot.p && (!current || dirty & /*$$scope*/
        262144)) {
          update_slot_base(
            icon_slot,
            icon_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[18],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[18]
            ) : get_slot_changes(
              icon_slot_template,
              /*$$scope*/
              ctx2[18],
              dirty,
              get_icon_slot_changes
            ),
            get_icon_slot_context
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(icon_slot, local);
      current = true;
    },
    o(local) {
      transition_out(icon_slot, local);
      current = false;
    },
    d(detaching) {
      if (icon_slot)
        icon_slot.d(detaching);
    }
  };
}
function create_off_slot(ctx) {
  let buttonloader;
  let current;
  buttonloader = new Loader({ props: { slot: "off" } });
  return {
    c() {
      create_component(buttonloader.$$.fragment);
    },
    l(nodes) {
      claim_component(buttonloader.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(buttonloader, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(buttonloader.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(buttonloader.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(buttonloader, detaching);
    }
  };
}
function create_if_block_2(ctx) {
  let div;
  let current;
  const trailing_slot_template = (
    /*#slots*/
    ctx[17].trailing
  );
  const trailing_slot = create_slot(
    trailing_slot_template,
    ctx,
    /*$$scope*/
    ctx[18],
    get_trailing_slot_context
  );
  return {
    c() {
      div = element("div");
      if (trailing_slot)
        trailing_slot.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true, style: true });
      var div_nodes = children(div);
      if (trailing_slot)
        trailing_slot.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "flex justify-center items-center relative");
      set_style(
        div,
        "width",
        /*iconSize*/
        ctx[9]
      );
      toggle_class(
        div,
        "ml-1",
        /*size*/
        ctx[5] === "xs" || /*size*/
        ctx[5] === "sm"
      );
      toggle_class(
        div,
        "ml-2",
        /*size*/
        ctx[5] === "md" || /*size*/
        ctx[5] === "lg" || /*size*/
        ctx[5] === "xl" || /*size*/
        ctx[5] === "fab"
      );
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (trailing_slot) {
        trailing_slot.m(div, null);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (trailing_slot) {
        if (trailing_slot.p && (!current || dirty & /*$$scope, iconSize*/
        262656)) {
          update_slot_base(
            trailing_slot,
            trailing_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[18],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[18]
            ) : get_slot_changes(
              trailing_slot_template,
              /*$$scope*/
              ctx2[18],
              dirty,
              get_trailing_slot_changes
            ),
            get_trailing_slot_context
          );
        }
      }
      if (!current || dirty & /*iconSize*/
      512) {
        set_style(
          div,
          "width",
          /*iconSize*/
          ctx2[9]
        );
      }
      if (!current || dirty & /*size*/
      32) {
        toggle_class(
          div,
          "ml-1",
          /*size*/
          ctx2[5] === "xs" || /*size*/
          ctx2[5] === "sm"
        );
      }
      if (!current || dirty & /*size*/
      32) {
        toggle_class(
          div,
          "ml-2",
          /*size*/
          ctx2[5] === "md" || /*size*/
          ctx2[5] === "lg" || /*size*/
          ctx2[5] === "xl" || /*size*/
          ctx2[5] === "fab"
        );
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(trailing_slot, local);
      current = true;
    },
    o(local) {
      transition_out(trailing_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (trailing_slot)
        trailing_slot.d(detaching);
    }
  };
}
function create_if_block$1(ctx) {
  let hoverbackground;
  let current;
  hoverbackground = new HoverBackground({ props: { class: (
    /*hoverClass*/
    ctx[10]
  ) } });
  return {
    c() {
      create_component(hoverbackground.$$.fragment);
    },
    l(nodes) {
      claim_component(hoverbackground.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(hoverbackground, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const hoverbackground_changes = {};
      if (dirty & /*hoverClass*/
      1024)
        hoverbackground_changes.class = /*hoverClass*/
        ctx2[10];
      hoverbackground.$set(hoverbackground_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(hoverbackground.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(hoverbackground.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(hoverbackground, detaching);
    }
  };
}
function create_dynamic_element(ctx) {
  let svelte_element;
  let current_block_type_index;
  let if_block0;
  let t;
  let svelte_element_type_value;
  let svelte_element_href_value;
  let useActions_action;
  let current;
  let mounted;
  let dispose;
  const if_block_creators = [create_if_block_1$1, create_else_block$1];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*defaultLoading*/
      ctx2[4]
    )
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  let if_block1 = !/*disabled*/
  ctx[1] && !/*disableHover*/
  ctx[6] && create_if_block$1(ctx);
  let svelte_element_levels = [
    { "aria-label": (
      /*ariaLabel*/
      ctx[7]
    ) },
    {
      type: svelte_element_type_value = /*href*/
      ctx[8] ? null : (
        /*htmlType*/
        ctx[2]
      )
    },
    { disabled: (
      /*disabled*/
      ctx[1]
    ) },
    { class: (
      /*finalClass*/
      ctx[11]
    ) },
    {
      href: svelte_element_href_value = /*href*/
      ctx[8] ?? null
    },
    exclude(
      /*$$props*/
      ctx[13],
      ["use", "class"]
    )
  ];
  let svelte_element_data = {};
  for (let i = 0; i < svelte_element_levels.length; i += 1) {
    svelte_element_data = assign(svelte_element_data, svelte_element_levels[i]);
  }
  return {
    c() {
      svelte_element = element(
        /*href*/
        ctx[8] ? "a" : "button"
      );
      if_block0.c();
      t = space();
      if (if_block1)
        if_block1.c();
      this.h();
    },
    l(nodes) {
      svelte_element = claim_element(
        nodes,
        /*href*/
        ((ctx[8] ? "a" : "button") || "null").toUpperCase(),
        {
          "aria-label": true,
          type: true,
          disabled: true,
          class: true,
          href: true
        }
      );
      var svelte_element_nodes = children(svelte_element);
      if_block0.l(svelte_element_nodes);
      t = claim_space(svelte_element_nodes);
      if (if_block1)
        if_block1.l(svelte_element_nodes);
      svelte_element_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_dynamic_element_data(
        /*href*/
        ctx[8] ? "a" : "button"
      )(svelte_element, svelte_element_data);
    },
    m(target, anchor) {
      insert_hydration(target, svelte_element, anchor);
      if_blocks[current_block_type_index].m(svelte_element, null);
      append_hydration(svelte_element, t);
      if (if_block1)
        if_block1.m(svelte_element, null);
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(useActions_action = useActions.call(
            null,
            svelte_element,
            /*use*/
            ctx[0]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[12].call(null, svelte_element)
          )
        ];
        mounted = true;
      }
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
        if_block0 = if_blocks[current_block_type_index];
        if (!if_block0) {
          if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block0.c();
        } else {
          if_block0.p(ctx2, dirty);
        }
        transition_in(if_block0, 1);
        if_block0.m(svelte_element, t);
      }
      if (!/*disabled*/
      ctx2[1] && !/*disableHover*/
      ctx2[6]) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty & /*disabled, disableHover*/
          66) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block$1(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(svelte_element, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
      set_dynamic_element_data(
        /*href*/
        ctx2[8] ? "a" : "button"
      )(svelte_element, svelte_element_data = get_spread_update(svelte_element_levels, [
        (!current || dirty & /*ariaLabel*/
        128) && { "aria-label": (
          /*ariaLabel*/
          ctx2[7]
        ) },
        (!current || dirty & /*href, htmlType*/
        260 && svelte_element_type_value !== (svelte_element_type_value = /*href*/
        ctx2[8] ? null : (
          /*htmlType*/
          ctx2[2]
        ))) && { type: svelte_element_type_value },
        (!current || dirty & /*disabled*/
        2) && { disabled: (
          /*disabled*/
          ctx2[1]
        ) },
        (!current || dirty & /*finalClass*/
        2048) && { class: (
          /*finalClass*/
          ctx2[11]
        ) },
        (!current || dirty & /*href*/
        256 && svelte_element_href_value !== (svelte_element_href_value = /*href*/
        ctx2[8] ?? null)) && { href: svelte_element_href_value },
        dirty & /*$$props*/
        8192 && exclude(
          /*$$props*/
          ctx2[13],
          ["use", "class"]
        )
      ]));
      if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/
      1)
        useActions_action.update.call(
          null,
          /*use*/
          ctx2[0]
        );
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block0);
      transition_in(if_block1);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(svelte_element);
      }
      if_blocks[current_block_type_index].d();
      if (if_block1)
        if_block1.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_fragment$2(ctx) {
  let previous_tag = (
    /*href*/
    ctx[8] ? "a" : "button"
  );
  let svelte_element_anchor;
  let current;
  let svelte_element = (
    /*href*/
    (ctx[8] ? "a" : "button") && create_dynamic_element(ctx)
  );
  return {
    c() {
      if (svelte_element)
        svelte_element.c();
      svelte_element_anchor = empty();
    },
    l(nodes) {
      if (svelte_element)
        svelte_element.l(nodes);
      svelte_element_anchor = empty();
    },
    m(target, anchor) {
      if (svelte_element)
        svelte_element.m(target, anchor);
      insert_hydration(target, svelte_element_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (
        /*href*/
        ctx2[8] ? "a" : "button"
      ) {
        if (!previous_tag) {
          svelte_element = create_dynamic_element(ctx2);
          previous_tag = /*href*/
          ctx2[8] ? "a" : "button";
          svelte_element.c();
          svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor);
        } else if (safe_not_equal(
          previous_tag,
          /*href*/
          ctx2[8] ? "a" : "button"
        )) {
          svelte_element.d(1);
          svelte_element = create_dynamic_element(ctx2);
          previous_tag = /*href*/
          ctx2[8] ? "a" : "button";
          svelte_element.c();
          svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor);
        } else {
          svelte_element.p(ctx2, dirty);
        }
      } else if (previous_tag) {
        svelte_element.d(1);
        svelte_element = null;
        previous_tag = /*href*/
        ctx2[8] ? "a" : "button";
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(svelte_element, local);
      current = true;
    },
    o(local) {
      transition_out(svelte_element, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(svelte_element_anchor);
      }
      if (svelte_element)
        svelte_element.d(detaching);
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let iconSize;
  let finalClass;
  let hoverClass;
  let { $$slots: slots = {}, $$scope } = $$props;
  const $$slots = compute_slots(slots);
  let { use = [] } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { disabled = false } = $$props;
  let { htmlType = "button" } = $$props;
  let { loading = void 0 } = $$props;
  let { defaultLoading = true } = $$props;
  let { type = void 0 } = $$props;
  let { shape = "rounded" } = $$props;
  let { size = "md" } = $$props;
  let { disableHover = false } = $$props;
  let { ariaLabel = void 0 } = $$props;
  let { href = void 0 } = $$props;
  setContext("button-icon-size", iconSize);
  $$self.$$set = ($$new_props) => {
    $$invalidate(13, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("disabled" in $$new_props)
      $$invalidate(1, disabled = $$new_props.disabled);
    if ("htmlType" in $$new_props)
      $$invalidate(2, htmlType = $$new_props.htmlType);
    if ("loading" in $$new_props)
      $$invalidate(3, loading = $$new_props.loading);
    if ("defaultLoading" in $$new_props)
      $$invalidate(4, defaultLoading = $$new_props.defaultLoading);
    if ("type" in $$new_props)
      $$invalidate(15, type = $$new_props.type);
    if ("shape" in $$new_props)
      $$invalidate(16, shape = $$new_props.shape);
    if ("size" in $$new_props)
      $$invalidate(5, size = $$new_props.size);
    if ("disableHover" in $$new_props)
      $$invalidate(6, disableHover = $$new_props.disableHover);
    if ("ariaLabel" in $$new_props)
      $$invalidate(7, ariaLabel = $$new_props.ariaLabel);
    if ("href" in $$new_props)
      $$invalidate(8, href = $$new_props.href);
    if ("$$scope" in $$new_props)
      $$invalidate(18, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*size*/
    32) {
      $$invalidate(9, iconSize = composeIconSize(size));
    }
    $$invalidate(11, finalClass = twMerge(
      defaultClass,
      loading ? "cursor-wait" : false,
      !loading ? "cursor-pointer" : false,
      size === "xs" && shape !== "circle" ? xs : false,
      size === "sm" && shape !== "circle" ? sm : false,
      size === "md" && shape !== "circle" ? md : false,
      size === "lg" && shape !== "circle" ? lg : false,
      size === "xl" && shape !== "circle" ? xl : false,
      size === "fab" ? fab : false,
      type === "default" ? defaultButton : false,
      type === "primary" ? primaryButton : false,
      type === "danger" ? dangerButton : false,
      type === "ghost" ? ghostButton : false,
      type === "link" ? linkButton : false,
      type === "text" ? textButton : false,
      disabled ? baseDisabled : false,
      (type === "default" || type === void 0) && disabled ? defaultDisabled : false,
      type === "ghost" && disabled ? ghostDisabled : false,
      type === "link" && disabled ? linkDisabled : false,
      type === "text" && disabled ? textDisabled : false,
      shape === "circle" ? circleShape : false,
      shape === "square" ? squareShape : false,
      shape === "rounded" ? roundedShape : false,
      shape === "pill" ? pillShape : false,
      shape === "circle" && size === "xs" ? circleXs : false,
      shape === "circle" && size === "sm" ? circleSm : false,
      shape === "circle" && size === "md" ? circleMd : false,
      shape === "circle" && size === "lg" ? circleLg : false,
      shape === "circle" && size === "xl" ? circleXl : false,
      $$props.class
    ));
    if ($$self.$$.dirty & /*shape*/
    65536) {
      $$invalidate(10, hoverClass = twMerge(shape === "circle" ? "rounded-full" : false, shape === "rounded" ? "rounded-md" : false, shape === "pill" ? "rounded-3xl" : false, shape === "square" ? "rounded-none" : false));
    }
  };
  $$props = exclude_internal_props($$props);
  return [
    use,
    disabled,
    htmlType,
    loading,
    defaultLoading,
    size,
    disableHover,
    ariaLabel,
    href,
    iconSize,
    hoverClass,
    finalClass,
    forwardEvents,
    $$props,
    $$slots,
    type,
    shape,
    slots,
    $$scope
  ];
}
let Button$1 = class Button extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, {
      use: 0,
      disabled: 1,
      htmlType: 2,
      loading: 3,
      defaultLoading: 4,
      type: 15,
      shape: 16,
      size: 5,
      disableHover: 6,
      ariaLabel: 7,
      href: 8
    });
  }
};
function create_fragment$1(ctx) {
  let svg;
  let html_tag;
  let useActions_action;
  let mounted;
  let dispose;
  let svg_levels = [
    { xmlns: "http://www.w3.org/2000/svg" },
    { width: (
      /*width*/
      ctx[2]
    ) },
    { height: (
      /*height*/
      ctx[3]
    ) },
    { viewBox: (
      /*viewBox*/
      ctx[1]
    ) },
    { stroke: (
      /*stroke*/
      ctx[5]
    ) },
    { fill: (
      /*fill*/
      ctx[6]
    ) },
    { color: (
      /*color*/
      ctx[4]
    ) },
    exclude(
      /*$$props*/
      ctx[9],
      [
        "use",
        "data",
        "fill",
        "viewBox",
        "width",
        "height",
        "stroke",
        "size",
        "color"
      ]
    )
  ];
  let svg_data = {};
  for (let i = 0; i < svg_levels.length; i += 1) {
    svg_data = assign(svg_data, svg_levels[i]);
  }
  return {
    c() {
      svg = svg_element("svg");
      html_tag = new HtmlTagHydration(true);
      this.h();
    },
    l(nodes) {
      svg = claim_svg_element(nodes, "svg", {
        xmlns: true,
        width: true,
        height: true,
        viewBox: true,
        stroke: true,
        fill: true,
        color: true
      });
      var svg_nodes = children(svg);
      html_tag = claim_html_tag(svg_nodes, true);
      svg_nodes.forEach(detach);
      this.h();
    },
    h() {
      html_tag.a = null;
      set_svg_attributes(svg, svg_data);
    },
    m(target, anchor) {
      insert_hydration(target, svg, anchor);
      html_tag.m(
        /*elements*/
        ctx[7],
        svg
      );
      if (!mounted) {
        dispose = [
          action_destroyer(useActions_action = useActions.call(
            null,
            svg,
            /*use*/
            ctx[0]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[8].call(null, svg)
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*elements*/
      128)
        html_tag.p(
          /*elements*/
          ctx2[7]
        );
      set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
        { xmlns: "http://www.w3.org/2000/svg" },
        dirty & /*width*/
        4 && { width: (
          /*width*/
          ctx2[2]
        ) },
        dirty & /*height*/
        8 && { height: (
          /*height*/
          ctx2[3]
        ) },
        dirty & /*viewBox*/
        2 && { viewBox: (
          /*viewBox*/
          ctx2[1]
        ) },
        dirty & /*stroke*/
        32 && { stroke: (
          /*stroke*/
          ctx2[5]
        ) },
        dirty & /*fill*/
        64 && { fill: (
          /*fill*/
          ctx2[6]
        ) },
        dirty & /*color*/
        16 && { color: (
          /*color*/
          ctx2[4]
        ) },
        dirty & /*$$props*/
        512 && exclude(
          /*$$props*/
          ctx2[9],
          [
            "use",
            "data",
            "fill",
            "viewBox",
            "width",
            "height",
            "stroke",
            "size",
            "color"
          ]
        )
      ]));
      if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/
      1)
        useActions_action.update.call(
          null,
          /*use*/
          ctx2[0]
        );
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(svg);
      }
      mounted = false;
      run_all(dispose);
    }
  };
}
function extractViewBox(svg) {
  const regex = /viewBox="([\d\- ]+)"/;
  const res = regex.exec(svg);
  if (!res)
    return "0 0 24 24";
  return res[1];
}
function instance$1($$self, $$props, $$invalidate) {
  let elements;
  let { use = [] } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  const iconSize = getContext("button-icon-size");
  let { data = "" } = $$props;
  let { viewBox = extractViewBox(data) } = $$props;
  let { size = iconSize } = $$props;
  let { width = size } = $$props;
  let { height = size } = $$props;
  let { color = "currentColor" } = $$props;
  let { stroke = void 0 } = $$props;
  let { fill = color } = $$props;
  $$self.$$set = ($$new_props) => {
    $$invalidate(9, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("data" in $$new_props)
      $$invalidate(10, data = $$new_props.data);
    if ("viewBox" in $$new_props)
      $$invalidate(1, viewBox = $$new_props.viewBox);
    if ("size" in $$new_props)
      $$invalidate(11, size = $$new_props.size);
    if ("width" in $$new_props)
      $$invalidate(2, width = $$new_props.width);
    if ("height" in $$new_props)
      $$invalidate(3, height = $$new_props.height);
    if ("color" in $$new_props)
      $$invalidate(4, color = $$new_props.color);
    if ("stroke" in $$new_props)
      $$invalidate(5, stroke = $$new_props.stroke);
    if ("fill" in $$new_props)
      $$invalidate(6, fill = $$new_props.fill);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*data*/
    1024) {
      $$invalidate(7, elements = data.replace(/<svg ([^>]*)>/, "").replace("</svg>", ""));
    }
  };
  $$props = exclude_internal_props($$props);
  return [
    use,
    viewBox,
    width,
    height,
    color,
    stroke,
    fill,
    elements,
    forwardEvents,
    $$props,
    data,
    size
  ];
}
class Icon2 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, {
      use: 0,
      data: 10,
      viewBox: 1,
      size: 11,
      width: 2,
      height: 3,
      color: 4,
      stroke: 5,
      fill: 6
    });
  }
}
const Button2 = Button$1;
Button2.Loader = Loader;
Button2.Icon = Icon2;
Button2.Leading = Icon2;
Button2.Trailing = Icon2;
const Progress_svelte_svelte_type_style_lang = "";
function create_else_block(ctx) {
  let div;
  let svg;
  let circle0;
  let circle1;
  let t0;
  let span;
  let t1;
  let t2;
  return {
    c() {
      div = element("div");
      svg = svg_element("svg");
      circle0 = svg_element("circle");
      circle1 = svg_element("circle");
      t0 = space();
      span = element("span");
      t1 = text(
        /*value*/
        ctx[0]
      );
      t2 = text("%");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      svg = claim_svg_element(div_nodes, "svg", { class: true });
      var svg_nodes = children(svg);
      circle0 = claim_svg_element(svg_nodes, "circle", {
        class: true,
        "stroke-width": true,
        stroke: true,
        fill: true,
        r: true,
        cx: true,
        cy: true
      });
      children(circle0).forEach(detach);
      circle1 = claim_svg_element(svg_nodes, "circle", {
        "stroke-width": true,
        "stroke-dasharray": true,
        "stroke-dashoffset": true,
        "stroke-linecap": true,
        stroke: true,
        fill: true,
        r: true,
        cx: true,
        cy: true
      });
      children(circle1).forEach(detach);
      svg_nodes.forEach(detach);
      t0 = claim_space(div_nodes);
      span = claim_element(div_nodes, "SPAN", { class: true });
      var span_nodes = children(span);
      t1 = claim_text(
        span_nodes,
        /*value*/
        ctx[0]
      );
      t2 = claim_text(span_nodes, "%");
      span_nodes.forEach(detach);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(circle0, "class", "text-default");
      attr(
        circle0,
        "stroke-width",
        /*width*/
        ctx[9]
      );
      attr(circle0, "stroke", "currentColor");
      attr(circle0, "fill", "transparent");
      attr(
        circle0,
        "r",
        /*radius*/
        ctx[7]
      );
      attr(
        circle0,
        "cx",
        /*cxCy*/
        ctx[8]
      );
      attr(
        circle0,
        "cy",
        /*cxCy*/
        ctx[8]
      );
      attr(
        circle1,
        "stroke-width",
        /*width*/
        ctx[9]
      );
      attr(
        circle1,
        "stroke-dasharray",
        /*circumference*/
        ctx[10]
      );
      attr(
        circle1,
        "stroke-dashoffset",
        /*radialValue*/
        ctx[6]
      );
      attr(circle1, "stroke-linecap", "round");
      attr(circle1, "stroke", "currentColor");
      attr(circle1, "fill", "transparent");
      attr(
        circle1,
        "r",
        /*radius*/
        ctx[7]
      );
      attr(
        circle1,
        "cx",
        /*cxCy*/
        ctx[8]
      );
      attr(
        circle1,
        "cy",
        /*cxCy*/
        ctx[8]
      );
      toggle_class(
        circle1,
        "text-info",
        /*type*/
        ctx[1] === "info"
      );
      toggle_class(
        circle1,
        "text-warn",
        /*type*/
        ctx[1] === "warn"
      );
      toggle_class(
        circle1,
        "text-error",
        /*type*/
        ctx[1] === "error"
      );
      toggle_class(
        circle1,
        "text-success",
        /*type*/
        ctx[1] === "success"
      );
      attr(svg, "class", "rotate-[-90deg] origin-center");
      toggle_class(
        svg,
        "h-16",
        /*size*/
        ctx[3] === "xs"
      );
      toggle_class(
        svg,
        "w-16",
        /*size*/
        ctx[3] === "xs"
      );
      toggle_class(
        svg,
        "h-20",
        /*size*/
        ctx[3] === "sm"
      );
      toggle_class(
        svg,
        "w-20",
        /*size*/
        ctx[3] === "sm"
      );
      toggle_class(
        svg,
        "h-24",
        /*size*/
        ctx[3] === "md"
      );
      toggle_class(
        svg,
        "w-24",
        /*size*/
        ctx[3] === "md"
      );
      toggle_class(
        svg,
        "h-28",
        /*size*/
        ctx[3] === "lg"
      );
      toggle_class(
        svg,
        "w-28",
        /*size*/
        ctx[3] === "lg"
      );
      toggle_class(
        svg,
        "h-32",
        /*size*/
        ctx[3] === "xl"
      );
      toggle_class(
        svg,
        "w-32",
        /*size*/
        ctx[3] === "xl"
      );
      attr(span, "class", "absolute font-medium text-content");
      toggle_class(
        span,
        "text-base",
        /*size*/
        ctx[3] === "xs" || /*size*/
        ctx[3] === "sm"
      );
      toggle_class(
        span,
        "text-lg",
        /*size*/
        ctx[3] === "md"
      );
      toggle_class(
        span,
        "text-2xl",
        /*size*/
        ctx[3] === "lg" || /*size*/
        ctx[3] === "xl"
      );
      toggle_class(span, "hidden", !/*displayValue*/
      ctx[4]);
      attr(div, "class", "inline-flex items-center justify-center overflow-hidden rounded-full bottom-5 left-5");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, svg);
      append_hydration(svg, circle0);
      append_hydration(svg, circle1);
      append_hydration(div, t0);
      append_hydration(div, span);
      append_hydration(span, t1);
      append_hydration(span, t2);
    },
    p(ctx2, dirty) {
      if (dirty & /*radialValue*/
      64) {
        attr(
          circle1,
          "stroke-dashoffset",
          /*radialValue*/
          ctx2[6]
        );
      }
      if (dirty & /*type*/
      2) {
        toggle_class(
          circle1,
          "text-info",
          /*type*/
          ctx2[1] === "info"
        );
      }
      if (dirty & /*type*/
      2) {
        toggle_class(
          circle1,
          "text-warn",
          /*type*/
          ctx2[1] === "warn"
        );
      }
      if (dirty & /*type*/
      2) {
        toggle_class(
          circle1,
          "text-error",
          /*type*/
          ctx2[1] === "error"
        );
      }
      if (dirty & /*type*/
      2) {
        toggle_class(
          circle1,
          "text-success",
          /*type*/
          ctx2[1] === "success"
        );
      }
      if (dirty & /*size*/
      8) {
        toggle_class(
          svg,
          "h-16",
          /*size*/
          ctx2[3] === "xs"
        );
      }
      if (dirty & /*size*/
      8) {
        toggle_class(
          svg,
          "w-16",
          /*size*/
          ctx2[3] === "xs"
        );
      }
      if (dirty & /*size*/
      8) {
        toggle_class(
          svg,
          "h-20",
          /*size*/
          ctx2[3] === "sm"
        );
      }
      if (dirty & /*size*/
      8) {
        toggle_class(
          svg,
          "w-20",
          /*size*/
          ctx2[3] === "sm"
        );
      }
      if (dirty & /*size*/
      8) {
        toggle_class(
          svg,
          "h-24",
          /*size*/
          ctx2[3] === "md"
        );
      }
      if (dirty & /*size*/
      8) {
        toggle_class(
          svg,
          "w-24",
          /*size*/
          ctx2[3] === "md"
        );
      }
      if (dirty & /*size*/
      8) {
        toggle_class(
          svg,
          "h-28",
          /*size*/
          ctx2[3] === "lg"
        );
      }
      if (dirty & /*size*/
      8) {
        toggle_class(
          svg,
          "w-28",
          /*size*/
          ctx2[3] === "lg"
        );
      }
      if (dirty & /*size*/
      8) {
        toggle_class(
          svg,
          "h-32",
          /*size*/
          ctx2[3] === "xl"
        );
      }
      if (dirty & /*size*/
      8) {
        toggle_class(
          svg,
          "w-32",
          /*size*/
          ctx2[3] === "xl"
        );
      }
      if (dirty & /*value*/
      1)
        set_data(
          t1,
          /*value*/
          ctx2[0]
        );
      if (dirty & /*size*/
      8) {
        toggle_class(
          span,
          "text-base",
          /*size*/
          ctx2[3] === "xs" || /*size*/
          ctx2[3] === "sm"
        );
      }
      if (dirty & /*size*/
      8) {
        toggle_class(
          span,
          "text-lg",
          /*size*/
          ctx2[3] === "md"
        );
      }
      if (dirty & /*size*/
      8) {
        toggle_class(
          span,
          "text-2xl",
          /*size*/
          ctx2[3] === "lg" || /*size*/
          ctx2[3] === "xl"
        );
      }
      if (dirty & /*displayValue*/
      16) {
        toggle_class(span, "hidden", !/*displayValue*/
        ctx2[4]);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_if_block(ctx) {
  let div2;
  let div1;
  let div0;
  let t;
  let if_block = (
    /*displayValue*/
    ctx[4] && !/*indeterminate*/
    ctx[5] && create_if_block_1(ctx)
  );
  return {
    c() {
      div2 = element("div");
      div1 = element("div");
      div0 = element("div");
      t = space();
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes) {
      div2 = claim_element(nodes, "DIV", { class: true });
      var div2_nodes = children(div2);
      div1 = claim_element(div2_nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", { class: true, style: true });
      children(div0).forEach(detach);
      div1_nodes.forEach(detach);
      t = claim_space(div2_nodes);
      if (if_block)
        if_block.l(div2_nodes);
      div2_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div0, "class", "h-full rounded-xl svelte-qqxu4u");
      set_style(
        div0,
        "width",
        /*indeterminate*/
        (ctx[5] ? 30 : (
          /*value*/
          ctx[0]
        )) + "%"
      );
      toggle_class(
        div0,
        "bg-info",
        /*type*/
        ctx[1] === "info"
      );
      toggle_class(
        div0,
        "bg-warn",
        /*type*/
        ctx[1] === "warn"
      );
      toggle_class(
        div0,
        "bg-error",
        /*type*/
        ctx[1] === "error"
      );
      toggle_class(
        div0,
        "bg-success",
        /*type*/
        ctx[1] === "success"
      );
      toggle_class(
        div0,
        "indeterminate",
        /*indeterminate*/
        ctx[5]
      );
      attr(div1, "class", "rounded-xl overflow-hidden bg-default flex-grow");
      toggle_class(
        div1,
        "mr-2",
        /*displayValue*/
        ctx[4]
      );
      toggle_class(
        div1,
        "h-2",
        /*size*/
        ctx[3] === "md"
      );
      toggle_class(
        div1,
        "h-1.5",
        /*size*/
        ctx[3] === "sm"
      );
      toggle_class(
        div1,
        "h-1",
        /*size*/
        ctx[3] === "xs"
      );
      toggle_class(
        div1,
        "h-2.5",
        /*size*/
        ctx[3] === "lg"
      );
      toggle_class(
        div1,
        "h-3",
        /*size*/
        ctx[3] === "xl"
      );
      toggle_class(
        div1,
        "relative",
        /*indeterminate*/
        ctx[5]
      );
      attr(div2, "class", "flex flex-row items-center justify-start");
    },
    m(target, anchor) {
      insert_hydration(target, div2, anchor);
      append_hydration(div2, div1);
      append_hydration(div1, div0);
      append_hydration(div2, t);
      if (if_block)
        if_block.m(div2, null);
    },
    p(ctx2, dirty) {
      if (dirty & /*indeterminate, value*/
      33) {
        set_style(
          div0,
          "width",
          /*indeterminate*/
          (ctx2[5] ? 30 : (
            /*value*/
            ctx2[0]
          )) + "%"
        );
      }
      if (dirty & /*type*/
      2) {
        toggle_class(
          div0,
          "bg-info",
          /*type*/
          ctx2[1] === "info"
        );
      }
      if (dirty & /*type*/
      2) {
        toggle_class(
          div0,
          "bg-warn",
          /*type*/
          ctx2[1] === "warn"
        );
      }
      if (dirty & /*type*/
      2) {
        toggle_class(
          div0,
          "bg-error",
          /*type*/
          ctx2[1] === "error"
        );
      }
      if (dirty & /*type*/
      2) {
        toggle_class(
          div0,
          "bg-success",
          /*type*/
          ctx2[1] === "success"
        );
      }
      if (dirty & /*indeterminate*/
      32) {
        toggle_class(
          div0,
          "indeterminate",
          /*indeterminate*/
          ctx2[5]
        );
      }
      if (dirty & /*displayValue*/
      16) {
        toggle_class(
          div1,
          "mr-2",
          /*displayValue*/
          ctx2[4]
        );
      }
      if (dirty & /*size*/
      8) {
        toggle_class(
          div1,
          "h-2",
          /*size*/
          ctx2[3] === "md"
        );
      }
      if (dirty & /*size*/
      8) {
        toggle_class(
          div1,
          "h-1.5",
          /*size*/
          ctx2[3] === "sm"
        );
      }
      if (dirty & /*size*/
      8) {
        toggle_class(
          div1,
          "h-1",
          /*size*/
          ctx2[3] === "xs"
        );
      }
      if (dirty & /*size*/
      8) {
        toggle_class(
          div1,
          "h-2.5",
          /*size*/
          ctx2[3] === "lg"
        );
      }
      if (dirty & /*size*/
      8) {
        toggle_class(
          div1,
          "h-3",
          /*size*/
          ctx2[3] === "xl"
        );
      }
      if (dirty & /*indeterminate*/
      32) {
        toggle_class(
          div1,
          "relative",
          /*indeterminate*/
          ctx2[5]
        );
      }
      if (
        /*displayValue*/
        ctx2[4] && !/*indeterminate*/
        ctx2[5]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_1(ctx2);
          if_block.c();
          if_block.m(div2, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div2);
      }
      if (if_block)
        if_block.d();
    }
  };
}
function create_if_block_1(ctx) {
  let span;
  let t0;
  let t1;
  return {
    c() {
      span = element("span");
      t0 = text(
        /*value*/
        ctx[0]
      );
      t1 = text("%");
      this.h();
    },
    l(nodes) {
      span = claim_element(nodes, "SPAN", { class: true });
      var span_nodes = children(span);
      t0 = claim_text(
        span_nodes,
        /*value*/
        ctx[0]
      );
      t1 = claim_text(span_nodes, "%");
      span_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(span, "class", "flex-shrink");
    },
    m(target, anchor) {
      insert_hydration(target, span, anchor);
      append_hydration(span, t0);
      append_hydration(span, t1);
    },
    p(ctx2, dirty) {
      if (dirty & /*value*/
      1)
        set_data(
          t0,
          /*value*/
          ctx2[0]
        );
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}
function create_fragment(ctx) {
  let if_block_anchor;
  function select_block_type(ctx2, dirty) {
    if (!/*radial*/
    ctx2[2])
      return create_if_block;
    return create_else_block;
  }
  let current_block_type = select_block_type(ctx);
  let if_block = current_block_type(ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
    },
    p(ctx2, [dirty]) {
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if_block.d(detaching);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let radialValue;
  let { value } = $$props;
  let { type = "info" } = $$props;
  let { radial = false } = $$props;
  let { size = "md" } = $$props;
  let { displayValue = false } = $$props;
  let { indeterminate = false } = $$props;
  let radius = size === "xs" ? 30 : size === "sm" ? 34 : size === "md" ? 40 : size === "lg" ? 46 : 50;
  let cxCy = size === "xs" ? 32 : size === "sm" ? 40 : size === "md" ? 48 : size === "lg" ? 56 : 64;
  let width = size === "xs" ? 5 : size === "sm" ? 8 : size === "md" ? 11 : size === "lg" ? 14 : 17;
  let circumference = radius * 2 * Math.PI;
  $$self.$$set = ($$props2) => {
    if ("value" in $$props2)
      $$invalidate(0, value = $$props2.value);
    if ("type" in $$props2)
      $$invalidate(1, type = $$props2.type);
    if ("radial" in $$props2)
      $$invalidate(2, radial = $$props2.radial);
    if ("size" in $$props2)
      $$invalidate(3, size = $$props2.size);
    if ("displayValue" in $$props2)
      $$invalidate(4, displayValue = $$props2.displayValue);
    if ("indeterminate" in $$props2)
      $$invalidate(5, indeterminate = $$props2.indeterminate);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*value*/
    1) {
      $$invalidate(6, radialValue = circumference - value / 100 * circumference);
    }
  };
  return [
    value,
    type,
    radial,
    size,
    displayValue,
    indeterminate,
    radialValue,
    radius,
    cxCy,
    width,
    circumference
  ];
}
class Progress extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {
      value: 0,
      type: 1,
      radial: 2,
      size: 3,
      displayValue: 4,
      indeterminate: 5
    });
  }
}
export {
  print as A,
  Button2 as B,
  download as C,
  info as D,
  warn as E,
  check_circle as F,
  thumb_up as G,
  HoverBackground as H,
  Input2 as I,
  trending_neutral as J,
  trending_down as K,
  trending_up as L,
  sort as M,
  comment as N,
  cubicOut as O,
  Progress as P,
  Swap as S,
  Icon$1 as a,
  trapFocus as b,
  fly as c,
  dashboards as d,
  exclude as e,
  fade as f,
  get_spread_update as g,
  forwardEventsBuilder as h,
  close as i,
  chevron_down as j,
  slide as k,
  unfold_more_horizontal as l,
  error as m,
  check as n,
  account as o,
  upload as p,
  alert_circle as q,
  crossfade as r,
  scale$1 as s,
  twMerge as t,
  useActions as u,
  v4 as v,
  arrow_back as w,
  arrow_forward as x,
  undo as y,
  redo as z
};
