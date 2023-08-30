import { w as writable } from "./singletons.dbc3066f.js";
import { C as run_all, P as getContext, s as safe_not_equal, q as construct_svelte_component, e as empty, i as insert_hydration, d as detach, D as compute_rest_props, E as get_current_component, u as assign, F as exclude_internal_props, p as binding_callbacks, r as create_slot, y as update_slot_base, z as get_all_dirty_from_scope, A as get_slot_changes, H as noop, U as svg_element, V as claim_svg_element, h as children, a5 as set_svg_attributes, x as action_destroyer, B as is_function, f as element, g as claim_element, a6 as set_dynamic_element_data, M as component_subscribe, G as setContext, R as onDestroy, Y as set_store_value, a as space, c as claim_space, j as attr, v as set_attributes, N as append_hydration, O as destroy_each, o as onMount, Q as get_svelte_dataset, w as listen$1, T as bubble, _ as set_input_value, X as compute_slots, t as tick, l as text, m as claim_text, n as set_data, J as add_flush_callback } from "./scheduler.9514346f.js";
import { t as transition_out, a as transition_in, S as SvelteComponent, i as init, b as create_component, d as claim_component, m as mount_component, g as group_outros, e as destroy_component, c as check_outros, f as bind } from "./index.6fa96164.js";
function ensure_array_like(array_like_or_iterator) {
  return (array_like_or_iterator == null ? void 0 : array_like_or_iterator.length) !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
}
function outro_and_destroy_block(block, lookup) {
  transition_out(block, 1, 1, () => {
    lookup.delete(block.key);
  });
}
function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block2, next, get_context) {
  let o = old_blocks.length;
  let n = list.length;
  let i = o;
  const old_indexes = {};
  while (i--)
    old_indexes[old_blocks[i].key] = i;
  const new_blocks = [];
  const new_lookup = /* @__PURE__ */ new Map();
  const deltas = /* @__PURE__ */ new Map();
  const updates = [];
  i = n;
  while (i--) {
    const child_ctx = get_context(ctx, list, i);
    const key = get_key(child_ctx);
    let block = lookup.get(key);
    if (!block) {
      block = create_each_block2(key, child_ctx);
      block.c();
    } else if (dynamic) {
      updates.push(() => block.p(child_ctx, dirty));
    }
    new_lookup.set(key, new_blocks[i] = block);
    if (key in old_indexes)
      deltas.set(key, Math.abs(i - old_indexes[key]));
  }
  const will_move = /* @__PURE__ */ new Set();
  const did_move = /* @__PURE__ */ new Set();
  function insert(block) {
    transition_in(block, 1);
    block.m(node, next);
    lookup.set(block.key, block);
    next = block.first;
    n--;
  }
  while (o && n) {
    const new_block = new_blocks[n - 1];
    const old_block = old_blocks[o - 1];
    const new_key = new_block.key;
    const old_key = old_block.key;
    if (new_block === old_block) {
      next = new_block.first;
      o--;
      n--;
    } else if (!new_lookup.has(old_key)) {
      destroy(old_block, lookup);
      o--;
    } else if (!lookup.has(new_key) || will_move.has(new_key)) {
      insert(new_block);
    } else if (did_move.has(old_key)) {
      o--;
    } else if (deltas.get(new_key) > deltas.get(old_key)) {
      did_move.add(new_key);
      insert(new_block);
    } else {
      will_move.add(old_key);
      o--;
    }
  }
  while (o--) {
    const old_block = old_blocks[o];
    if (!new_lookup.has(old_block.key))
      destroy(old_block, lookup);
  }
  while (n)
    insert(new_blocks[n - 1]);
  run_all(updates);
  return new_blocks;
}
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
function get_spread_object(spread_props) {
  return typeof spread_props === "object" && spread_props !== null ? spread_props : {};
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
function classMap(classObj) {
  return Object.entries(classObj).filter(([name, value]) => name !== "" && value).map(([name]) => name).join(" ");
}
function dispatch(element2, eventType, detail, eventInit = { bubbles: true }, duplicateEventForMDC = false) {
  if (typeof Event === "undefined") {
    throw new Error("Event not defined.");
  }
  if (!element2) {
    throw new Error("Tried to dipatch event without element.");
  }
  const event = new CustomEvent(eventType, Object.assign(Object.assign({}, eventInit), { detail }));
  element2 === null || element2 === void 0 ? void 0 : element2.dispatchEvent(event);
  if (duplicateEventForMDC && eventType.startsWith("SMUI")) {
    const duplicateEvent = new CustomEvent(eventType.replace(/^SMUI/g, () => "MDC"), Object.assign(Object.assign({}, eventInit), { detail }));
    element2 === null || element2 === void 0 ? void 0 : element2.dispatchEvent(duplicateEvent);
    if (duplicateEvent.defaultPrevented) {
      event.preventDefault();
    }
  }
  return event;
}
function exclude(obj, keys) {
  let names = Object.getOwnPropertyNames(obj);
  const newObj = {};
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const cashIndex = name.indexOf("$");
    if (cashIndex !== -1 && keys.indexOf(name.substring(0, cashIndex + 1)) !== -1) {
      continue;
    }
    if (keys.indexOf(name) !== -1) {
      continue;
    }
    newObj[name] = obj[name];
  }
  return newObj;
}
const oldModifierRegex = /^[a-z]+(?::(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/;
const newModifierRegex = /^[^$]+(?:\$(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/;
function forwardEventsBuilder(component) {
  let $on;
  let events2 = [];
  component.$on = (fullEventType, callback) => {
    let eventType = fullEventType;
    let destructor = () => {
    };
    if ($on) {
      destructor = $on(eventType, callback);
    } else {
      events2.push([eventType, callback]);
    }
    const oldModifierMatch = eventType.match(oldModifierRegex);
    if (oldModifierMatch && console) {
      console.warn('Event modifiers in SMUI now use "$" instead of ":", so that all events can be bound with modifiers. Please update your event binding: ', eventType);
    }
    return () => {
      destructor();
    };
  };
  function bubble2(e) {
    const callbacks = component.$$.callbacks[e.type];
    if (callbacks) {
      callbacks.slice().forEach((fn) => fn.call(this, e));
    }
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
      if (eventType.match(/^SMUI:\w+:/)) {
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
        const eventOptions = parts.slice(1).reduce((obj, mod) => {
          obj[mod] = true;
          return obj;
        }, {});
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
        if (eventOptions.stopImmediatePropagation) {
          handler = stop_immediate_propagation(handler);
        }
        if (eventOptions.self) {
          handler = self_event(node, handler);
        }
        if (eventOptions.trusted) {
          handler = trusted_event(handler);
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
        forwardDestructors[eventType] = listen(node, eventType, bubble2);
      }
      return destructor;
    };
    for (let i = 0; i < events2.length; i++) {
      $on(events2[i][0], events2[i][1]);
    }
    return {
      destroy: () => {
        for (let i = 0; i < destructors.length; i++) {
          destructors[i]();
        }
        for (let entry of Object.entries(forwardDestructors)) {
          entry[1]();
        }
      }
    };
  };
}
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}
function prevent_default(fn) {
  return function(event) {
    event.preventDefault();
    return fn.call(this, event);
  };
}
function stop_propagation(fn) {
  return function(event) {
    event.stopPropagation();
    return fn.call(this, event);
  };
}
function stop_immediate_propagation(fn) {
  return function(event) {
    event.stopImmediatePropagation();
    return fn.call(this, event);
  };
}
function self_event(node, fn) {
  return function(event) {
    if (event.target !== node) {
      return;
    }
    return fn.call(this, event);
  };
}
function trusted_event(fn) {
  return function(event) {
    if (!event.isTrusted) {
      return;
    }
    return fn.call(this, event);
  };
}
function prefixFilter(obj, prefix) {
  let names = Object.getOwnPropertyNames(obj);
  const newObj = {};
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    if (name.substring(0, prefix.length) === prefix) {
      newObj[name.substring(prefix.length)] = obj[name];
    }
  }
  return newObj;
}
function useActions(node, actions) {
  let actionReturns = [];
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
var supportsCssVariables_;
function supportsCssVariables(windowObj, forceRefresh) {
  if (forceRefresh === void 0) {
    forceRefresh = false;
  }
  var CSS = windowObj.CSS;
  var supportsCssVars = supportsCssVariables_;
  if (typeof supportsCssVariables_ === "boolean" && !forceRefresh) {
    return supportsCssVariables_;
  }
  var supportsFunctionPresent = CSS && typeof CSS.supports === "function";
  if (!supportsFunctionPresent) {
    return false;
  }
  var explicitlySupportsCssVars = CSS.supports("--css-vars", "yes");
  var weAreFeatureDetectingSafari10plus = CSS.supports("(--css-vars: yes)") && CSS.supports("color", "#00000000");
  supportsCssVars = explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus;
  if (!forceRefresh) {
    supportsCssVariables_ = supportsCssVars;
  }
  return supportsCssVars;
}
function getNormalizedEventCoords(evt, pageOffset, clientRect) {
  if (!evt) {
    return { x: 0, y: 0 };
  }
  var x = pageOffset.x, y = pageOffset.y;
  var documentX = x + clientRect.left;
  var documentY = y + clientRect.top;
  var normalizedX;
  var normalizedY;
  if (evt.type === "touchstart") {
    var touchEvent = evt;
    normalizedX = touchEvent.changedTouches[0].pageX - documentX;
    normalizedY = touchEvent.changedTouches[0].pageY - documentY;
  } else {
    var mouseEvent = evt;
    normalizedX = mouseEvent.pageX - documentX;
    normalizedY = mouseEvent.pageY - documentY;
  }
  return { x: normalizedX, y: normalizedY };
}
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2)
      if (Object.prototype.hasOwnProperty.call(b2, p))
        d2[p] = b2[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m)
    return m.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function() {
        if (o && i >= o.length)
          o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
}
typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCFoundation = (
  /** @class */
  function() {
    function MDCFoundation2(adapter) {
      if (adapter === void 0) {
        adapter = {};
      }
      this.adapter = adapter;
    }
    Object.defineProperty(MDCFoundation2, "cssClasses", {
      get: function() {
        return {};
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCFoundation2, "strings", {
      get: function() {
        return {};
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCFoundation2, "numbers", {
      get: function() {
        return {};
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCFoundation2, "defaultAdapter", {
      get: function() {
        return {};
      },
      enumerable: false,
      configurable: true
    });
    MDCFoundation2.prototype.init = function() {
    };
    MDCFoundation2.prototype.destroy = function() {
    };
    return MDCFoundation2;
  }()
);
/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function applyPassive$1(globalObj) {
  if (globalObj === void 0) {
    globalObj = window;
  }
  return supportsPassiveOption(globalObj) ? { passive: true } : false;
}
function supportsPassiveOption(globalObj) {
  if (globalObj === void 0) {
    globalObj = window;
  }
  var passiveSupported = false;
  try {
    var options = {
      // This function will be called when the browser
      // attempts to access the passive property.
      get passive() {
        passiveSupported = true;
        return false;
      }
    };
    var handler = function() {
    };
    globalObj.document.addEventListener("test", handler, options);
    globalObj.document.removeEventListener("test", handler, options);
  } catch (err) {
    passiveSupported = false;
  }
  return passiveSupported;
}
const events = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  applyPassive: applyPassive$1
}, Symbol.toStringTag, { value: "Module" }));
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function closest(element2, selector) {
  if (element2.closest) {
    return element2.closest(selector);
  }
  var el = element2;
  while (el) {
    if (matches$1(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}
function matches$1(element2, selector) {
  var nativeMatches = element2.matches || element2.webkitMatchesSelector || element2.msMatchesSelector;
  return nativeMatches.call(element2, selector);
}
function estimateScrollWidth(element2) {
  var htmlEl = element2;
  if (htmlEl.offsetParent !== null) {
    return htmlEl.scrollWidth;
  }
  var clone = htmlEl.cloneNode(true);
  clone.style.setProperty("position", "absolute");
  clone.style.setProperty("transform", "translate(-9999px, -9999px)");
  document.documentElement.appendChild(clone);
  var scrollWidth = clone.scrollWidth;
  document.documentElement.removeChild(clone);
  return scrollWidth;
}
const ponyfill = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  closest,
  estimateScrollWidth,
  matches: matches$1
}, Symbol.toStringTag, { value: "Module" }));
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$5 = {
  // Ripple is a special case where the "root" component is really a "mixin" of sorts,
  // given that it's an 'upgrade' to an existing component. That being said it is the root
  // CSS class that all other CSS classes derive from.
  BG_FOCUSED: "mdc-ripple-upgraded--background-focused",
  FG_ACTIVATION: "mdc-ripple-upgraded--foreground-activation",
  FG_DEACTIVATION: "mdc-ripple-upgraded--foreground-deactivation",
  ROOT: "mdc-ripple-upgraded",
  UNBOUNDED: "mdc-ripple-upgraded--unbounded"
};
var strings$3 = {
  VAR_FG_SCALE: "--mdc-ripple-fg-scale",
  VAR_FG_SIZE: "--mdc-ripple-fg-size",
  VAR_FG_TRANSLATE_END: "--mdc-ripple-fg-translate-end",
  VAR_FG_TRANSLATE_START: "--mdc-ripple-fg-translate-start",
  VAR_LEFT: "--mdc-ripple-left",
  VAR_TOP: "--mdc-ripple-top"
};
var numbers$2 = {
  DEACTIVATION_TIMEOUT_MS: 225,
  FG_DEACTIVATION_MS: 150,
  INITIAL_ORIGIN_SCALE: 0.6,
  PADDING: 10,
  TAP_DELAY_MS: 300
  // Delay between touch and simulated mouse events on touch devices
};
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var ACTIVATION_EVENT_TYPES = [
  "touchstart",
  "pointerdown",
  "mousedown",
  "keydown"
];
var POINTER_DEACTIVATION_EVENT_TYPES = [
  "touchend",
  "pointerup",
  "mouseup",
  "contextmenu"
];
var activatedTargets = [];
var MDCRippleFoundation = (
  /** @class */
  function(_super) {
    __extends(MDCRippleFoundation2, _super);
    function MDCRippleFoundation2(adapter) {
      var _this = _super.call(this, __assign(__assign({}, MDCRippleFoundation2.defaultAdapter), adapter)) || this;
      _this.activationAnimationHasEnded = false;
      _this.activationTimer = 0;
      _this.fgDeactivationRemovalTimer = 0;
      _this.fgScale = "0";
      _this.frame = { width: 0, height: 0 };
      _this.initialSize = 0;
      _this.layoutFrame = 0;
      _this.maxRadius = 0;
      _this.unboundedCoords = { left: 0, top: 0 };
      _this.activationState = _this.defaultActivationState();
      _this.activationTimerCallback = function() {
        _this.activationAnimationHasEnded = true;
        _this.runDeactivationUXLogicIfReady();
      };
      _this.activateHandler = function(e) {
        _this.activateImpl(e);
      };
      _this.deactivateHandler = function() {
        _this.deactivateImpl();
      };
      _this.focusHandler = function() {
        _this.handleFocus();
      };
      _this.blurHandler = function() {
        _this.handleBlur();
      };
      _this.resizeHandler = function() {
        _this.layout();
      };
      return _this;
    }
    Object.defineProperty(MDCRippleFoundation2, "cssClasses", {
      get: function() {
        return cssClasses$5;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCRippleFoundation2, "strings", {
      get: function() {
        return strings$3;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCRippleFoundation2, "numbers", {
      get: function() {
        return numbers$2;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCRippleFoundation2, "defaultAdapter", {
      get: function() {
        return {
          addClass: function() {
            return void 0;
          },
          browserSupportsCssVars: function() {
            return true;
          },
          computeBoundingRect: function() {
            return { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 };
          },
          containsEventTarget: function() {
            return true;
          },
          deregisterDocumentInteractionHandler: function() {
            return void 0;
          },
          deregisterInteractionHandler: function() {
            return void 0;
          },
          deregisterResizeHandler: function() {
            return void 0;
          },
          getWindowPageOffset: function() {
            return { x: 0, y: 0 };
          },
          isSurfaceActive: function() {
            return true;
          },
          isSurfaceDisabled: function() {
            return true;
          },
          isUnbounded: function() {
            return true;
          },
          registerDocumentInteractionHandler: function() {
            return void 0;
          },
          registerInteractionHandler: function() {
            return void 0;
          },
          registerResizeHandler: function() {
            return void 0;
          },
          removeClass: function() {
            return void 0;
          },
          updateCssVariable: function() {
            return void 0;
          }
        };
      },
      enumerable: false,
      configurable: true
    });
    MDCRippleFoundation2.prototype.init = function() {
      var _this = this;
      var supportsPressRipple = this.supportsPressRipple();
      this.registerRootHandlers(supportsPressRipple);
      if (supportsPressRipple) {
        var _a = MDCRippleFoundation2.cssClasses, ROOT_1 = _a.ROOT, UNBOUNDED_1 = _a.UNBOUNDED;
        requestAnimationFrame(function() {
          _this.adapter.addClass(ROOT_1);
          if (_this.adapter.isUnbounded()) {
            _this.adapter.addClass(UNBOUNDED_1);
            _this.layoutInternal();
          }
        });
      }
    };
    MDCRippleFoundation2.prototype.destroy = function() {
      var _this = this;
      if (this.supportsPressRipple()) {
        if (this.activationTimer) {
          clearTimeout(this.activationTimer);
          this.activationTimer = 0;
          this.adapter.removeClass(MDCRippleFoundation2.cssClasses.FG_ACTIVATION);
        }
        if (this.fgDeactivationRemovalTimer) {
          clearTimeout(this.fgDeactivationRemovalTimer);
          this.fgDeactivationRemovalTimer = 0;
          this.adapter.removeClass(MDCRippleFoundation2.cssClasses.FG_DEACTIVATION);
        }
        var _a = MDCRippleFoundation2.cssClasses, ROOT_2 = _a.ROOT, UNBOUNDED_2 = _a.UNBOUNDED;
        requestAnimationFrame(function() {
          _this.adapter.removeClass(ROOT_2);
          _this.adapter.removeClass(UNBOUNDED_2);
          _this.removeCssVars();
        });
      }
      this.deregisterRootHandlers();
      this.deregisterDeactivationHandlers();
    };
    MDCRippleFoundation2.prototype.activate = function(evt) {
      this.activateImpl(evt);
    };
    MDCRippleFoundation2.prototype.deactivate = function() {
      this.deactivateImpl();
    };
    MDCRippleFoundation2.prototype.layout = function() {
      var _this = this;
      if (this.layoutFrame) {
        cancelAnimationFrame(this.layoutFrame);
      }
      this.layoutFrame = requestAnimationFrame(function() {
        _this.layoutInternal();
        _this.layoutFrame = 0;
      });
    };
    MDCRippleFoundation2.prototype.setUnbounded = function(unbounded) {
      var UNBOUNDED = MDCRippleFoundation2.cssClasses.UNBOUNDED;
      if (unbounded) {
        this.adapter.addClass(UNBOUNDED);
      } else {
        this.adapter.removeClass(UNBOUNDED);
      }
    };
    MDCRippleFoundation2.prototype.handleFocus = function() {
      var _this = this;
      requestAnimationFrame(function() {
        return _this.adapter.addClass(MDCRippleFoundation2.cssClasses.BG_FOCUSED);
      });
    };
    MDCRippleFoundation2.prototype.handleBlur = function() {
      var _this = this;
      requestAnimationFrame(function() {
        return _this.adapter.removeClass(MDCRippleFoundation2.cssClasses.BG_FOCUSED);
      });
    };
    MDCRippleFoundation2.prototype.supportsPressRipple = function() {
      return this.adapter.browserSupportsCssVars();
    };
    MDCRippleFoundation2.prototype.defaultActivationState = function() {
      return {
        activationEvent: void 0,
        hasDeactivationUXRun: false,
        isActivated: false,
        isProgrammatic: false,
        wasActivatedByPointer: false,
        wasElementMadeActive: false
      };
    };
    MDCRippleFoundation2.prototype.registerRootHandlers = function(supportsPressRipple) {
      var e_1, _a;
      if (supportsPressRipple) {
        try {
          for (var ACTIVATION_EVENT_TYPES_1 = __values(ACTIVATION_EVENT_TYPES), ACTIVATION_EVENT_TYPES_1_1 = ACTIVATION_EVENT_TYPES_1.next(); !ACTIVATION_EVENT_TYPES_1_1.done; ACTIVATION_EVENT_TYPES_1_1 = ACTIVATION_EVENT_TYPES_1.next()) {
            var evtType = ACTIVATION_EVENT_TYPES_1_1.value;
            this.adapter.registerInteractionHandler(evtType, this.activateHandler);
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (ACTIVATION_EVENT_TYPES_1_1 && !ACTIVATION_EVENT_TYPES_1_1.done && (_a = ACTIVATION_EVENT_TYPES_1.return))
              _a.call(ACTIVATION_EVENT_TYPES_1);
          } finally {
            if (e_1)
              throw e_1.error;
          }
        }
        if (this.adapter.isUnbounded()) {
          this.adapter.registerResizeHandler(this.resizeHandler);
        }
      }
      this.adapter.registerInteractionHandler("focus", this.focusHandler);
      this.adapter.registerInteractionHandler("blur", this.blurHandler);
    };
    MDCRippleFoundation2.prototype.registerDeactivationHandlers = function(evt) {
      var e_2, _a;
      if (evt.type === "keydown") {
        this.adapter.registerInteractionHandler("keyup", this.deactivateHandler);
      } else {
        try {
          for (var POINTER_DEACTIVATION_EVENT_TYPES_1 = __values(POINTER_DEACTIVATION_EVENT_TYPES), POINTER_DEACTIVATION_EVENT_TYPES_1_1 = POINTER_DEACTIVATION_EVENT_TYPES_1.next(); !POINTER_DEACTIVATION_EVENT_TYPES_1_1.done; POINTER_DEACTIVATION_EVENT_TYPES_1_1 = POINTER_DEACTIVATION_EVENT_TYPES_1.next()) {
            var evtType = POINTER_DEACTIVATION_EVENT_TYPES_1_1.value;
            this.adapter.registerDocumentInteractionHandler(evtType, this.deactivateHandler);
          }
        } catch (e_2_1) {
          e_2 = { error: e_2_1 };
        } finally {
          try {
            if (POINTER_DEACTIVATION_EVENT_TYPES_1_1 && !POINTER_DEACTIVATION_EVENT_TYPES_1_1.done && (_a = POINTER_DEACTIVATION_EVENT_TYPES_1.return))
              _a.call(POINTER_DEACTIVATION_EVENT_TYPES_1);
          } finally {
            if (e_2)
              throw e_2.error;
          }
        }
      }
    };
    MDCRippleFoundation2.prototype.deregisterRootHandlers = function() {
      var e_3, _a;
      try {
        for (var ACTIVATION_EVENT_TYPES_2 = __values(ACTIVATION_EVENT_TYPES), ACTIVATION_EVENT_TYPES_2_1 = ACTIVATION_EVENT_TYPES_2.next(); !ACTIVATION_EVENT_TYPES_2_1.done; ACTIVATION_EVENT_TYPES_2_1 = ACTIVATION_EVENT_TYPES_2.next()) {
          var evtType = ACTIVATION_EVENT_TYPES_2_1.value;
          this.adapter.deregisterInteractionHandler(evtType, this.activateHandler);
        }
      } catch (e_3_1) {
        e_3 = { error: e_3_1 };
      } finally {
        try {
          if (ACTIVATION_EVENT_TYPES_2_1 && !ACTIVATION_EVENT_TYPES_2_1.done && (_a = ACTIVATION_EVENT_TYPES_2.return))
            _a.call(ACTIVATION_EVENT_TYPES_2);
        } finally {
          if (e_3)
            throw e_3.error;
        }
      }
      this.adapter.deregisterInteractionHandler("focus", this.focusHandler);
      this.adapter.deregisterInteractionHandler("blur", this.blurHandler);
      if (this.adapter.isUnbounded()) {
        this.adapter.deregisterResizeHandler(this.resizeHandler);
      }
    };
    MDCRippleFoundation2.prototype.deregisterDeactivationHandlers = function() {
      var e_4, _a;
      this.adapter.deregisterInteractionHandler("keyup", this.deactivateHandler);
      try {
        for (var POINTER_DEACTIVATION_EVENT_TYPES_2 = __values(POINTER_DEACTIVATION_EVENT_TYPES), POINTER_DEACTIVATION_EVENT_TYPES_2_1 = POINTER_DEACTIVATION_EVENT_TYPES_2.next(); !POINTER_DEACTIVATION_EVENT_TYPES_2_1.done; POINTER_DEACTIVATION_EVENT_TYPES_2_1 = POINTER_DEACTIVATION_EVENT_TYPES_2.next()) {
          var evtType = POINTER_DEACTIVATION_EVENT_TYPES_2_1.value;
          this.adapter.deregisterDocumentInteractionHandler(evtType, this.deactivateHandler);
        }
      } catch (e_4_1) {
        e_4 = { error: e_4_1 };
      } finally {
        try {
          if (POINTER_DEACTIVATION_EVENT_TYPES_2_1 && !POINTER_DEACTIVATION_EVENT_TYPES_2_1.done && (_a = POINTER_DEACTIVATION_EVENT_TYPES_2.return))
            _a.call(POINTER_DEACTIVATION_EVENT_TYPES_2);
        } finally {
          if (e_4)
            throw e_4.error;
        }
      }
    };
    MDCRippleFoundation2.prototype.removeCssVars = function() {
      var _this = this;
      var rippleStrings = MDCRippleFoundation2.strings;
      var keys = Object.keys(rippleStrings);
      keys.forEach(function(key) {
        if (key.indexOf("VAR_") === 0) {
          _this.adapter.updateCssVariable(rippleStrings[key], null);
        }
      });
    };
    MDCRippleFoundation2.prototype.activateImpl = function(evt) {
      var _this = this;
      if (this.adapter.isSurfaceDisabled()) {
        return;
      }
      var activationState = this.activationState;
      if (activationState.isActivated) {
        return;
      }
      var previousActivationEvent = this.previousActivationEvent;
      var isSameInteraction = previousActivationEvent && evt !== void 0 && previousActivationEvent.type !== evt.type;
      if (isSameInteraction) {
        return;
      }
      activationState.isActivated = true;
      activationState.isProgrammatic = evt === void 0;
      activationState.activationEvent = evt;
      activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : evt !== void 0 && (evt.type === "mousedown" || evt.type === "touchstart" || evt.type === "pointerdown");
      var hasActivatedChild = evt !== void 0 && activatedTargets.length > 0 && activatedTargets.some(function(target) {
        return _this.adapter.containsEventTarget(target);
      });
      if (hasActivatedChild) {
        this.resetActivationState();
        return;
      }
      if (evt !== void 0) {
        activatedTargets.push(evt.target);
        this.registerDeactivationHandlers(evt);
      }
      activationState.wasElementMadeActive = this.checkElementMadeActive(evt);
      if (activationState.wasElementMadeActive) {
        this.animateActivation();
      }
      requestAnimationFrame(function() {
        activatedTargets = [];
        if (!activationState.wasElementMadeActive && evt !== void 0 && (evt.key === " " || evt.keyCode === 32)) {
          activationState.wasElementMadeActive = _this.checkElementMadeActive(evt);
          if (activationState.wasElementMadeActive) {
            _this.animateActivation();
          }
        }
        if (!activationState.wasElementMadeActive) {
          _this.activationState = _this.defaultActivationState();
        }
      });
    };
    MDCRippleFoundation2.prototype.checkElementMadeActive = function(evt) {
      return evt !== void 0 && evt.type === "keydown" ? this.adapter.isSurfaceActive() : true;
    };
    MDCRippleFoundation2.prototype.animateActivation = function() {
      var _this = this;
      var _a = MDCRippleFoundation2.strings, VAR_FG_TRANSLATE_START = _a.VAR_FG_TRANSLATE_START, VAR_FG_TRANSLATE_END = _a.VAR_FG_TRANSLATE_END;
      var _b = MDCRippleFoundation2.cssClasses, FG_DEACTIVATION = _b.FG_DEACTIVATION, FG_ACTIVATION = _b.FG_ACTIVATION;
      var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation2.numbers.DEACTIVATION_TIMEOUT_MS;
      this.layoutInternal();
      var translateStart = "";
      var translateEnd = "";
      if (!this.adapter.isUnbounded()) {
        var _c = this.getFgTranslationCoordinates(), startPoint = _c.startPoint, endPoint = _c.endPoint;
        translateStart = startPoint.x + "px, " + startPoint.y + "px";
        translateEnd = endPoint.x + "px, " + endPoint.y + "px";
      }
      this.adapter.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
      this.adapter.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd);
      clearTimeout(this.activationTimer);
      clearTimeout(this.fgDeactivationRemovalTimer);
      this.rmBoundedActivationClasses();
      this.adapter.removeClass(FG_DEACTIVATION);
      this.adapter.computeBoundingRect();
      this.adapter.addClass(FG_ACTIVATION);
      this.activationTimer = setTimeout(function() {
        _this.activationTimerCallback();
      }, DEACTIVATION_TIMEOUT_MS);
    };
    MDCRippleFoundation2.prototype.getFgTranslationCoordinates = function() {
      var _a = this.activationState, activationEvent = _a.activationEvent, wasActivatedByPointer = _a.wasActivatedByPointer;
      var startPoint;
      if (wasActivatedByPointer) {
        startPoint = getNormalizedEventCoords(activationEvent, this.adapter.getWindowPageOffset(), this.adapter.computeBoundingRect());
      } else {
        startPoint = {
          x: this.frame.width / 2,
          y: this.frame.height / 2
        };
      }
      startPoint = {
        x: startPoint.x - this.initialSize / 2,
        y: startPoint.y - this.initialSize / 2
      };
      var endPoint = {
        x: this.frame.width / 2 - this.initialSize / 2,
        y: this.frame.height / 2 - this.initialSize / 2
      };
      return { startPoint, endPoint };
    };
    MDCRippleFoundation2.prototype.runDeactivationUXLogicIfReady = function() {
      var _this = this;
      var FG_DEACTIVATION = MDCRippleFoundation2.cssClasses.FG_DEACTIVATION;
      var _a = this.activationState, hasDeactivationUXRun = _a.hasDeactivationUXRun, isActivated = _a.isActivated;
      var activationHasEnded = hasDeactivationUXRun || !isActivated;
      if (activationHasEnded && this.activationAnimationHasEnded) {
        this.rmBoundedActivationClasses();
        this.adapter.addClass(FG_DEACTIVATION);
        this.fgDeactivationRemovalTimer = setTimeout(function() {
          _this.adapter.removeClass(FG_DEACTIVATION);
        }, numbers$2.FG_DEACTIVATION_MS);
      }
    };
    MDCRippleFoundation2.prototype.rmBoundedActivationClasses = function() {
      var FG_ACTIVATION = MDCRippleFoundation2.cssClasses.FG_ACTIVATION;
      this.adapter.removeClass(FG_ACTIVATION);
      this.activationAnimationHasEnded = false;
      this.adapter.computeBoundingRect();
    };
    MDCRippleFoundation2.prototype.resetActivationState = function() {
      var _this = this;
      this.previousActivationEvent = this.activationState.activationEvent;
      this.activationState = this.defaultActivationState();
      setTimeout(function() {
        return _this.previousActivationEvent = void 0;
      }, MDCRippleFoundation2.numbers.TAP_DELAY_MS);
    };
    MDCRippleFoundation2.prototype.deactivateImpl = function() {
      var _this = this;
      var activationState = this.activationState;
      if (!activationState.isActivated) {
        return;
      }
      var state = __assign({}, activationState);
      if (activationState.isProgrammatic) {
        requestAnimationFrame(function() {
          _this.animateDeactivation(state);
        });
        this.resetActivationState();
      } else {
        this.deregisterDeactivationHandlers();
        requestAnimationFrame(function() {
          _this.activationState.hasDeactivationUXRun = true;
          _this.animateDeactivation(state);
          _this.resetActivationState();
        });
      }
    };
    MDCRippleFoundation2.prototype.animateDeactivation = function(_a) {
      var wasActivatedByPointer = _a.wasActivatedByPointer, wasElementMadeActive = _a.wasElementMadeActive;
      if (wasActivatedByPointer || wasElementMadeActive) {
        this.runDeactivationUXLogicIfReady();
      }
    };
    MDCRippleFoundation2.prototype.layoutInternal = function() {
      var _this = this;
      this.frame = this.adapter.computeBoundingRect();
      var maxDim = Math.max(this.frame.height, this.frame.width);
      var getBoundedRadius = function() {
        var hypotenuse = Math.sqrt(Math.pow(_this.frame.width, 2) + Math.pow(_this.frame.height, 2));
        return hypotenuse + MDCRippleFoundation2.numbers.PADDING;
      };
      this.maxRadius = this.adapter.isUnbounded() ? maxDim : getBoundedRadius();
      var initialSize = Math.floor(maxDim * MDCRippleFoundation2.numbers.INITIAL_ORIGIN_SCALE);
      if (this.adapter.isUnbounded() && initialSize % 2 !== 0) {
        this.initialSize = initialSize - 1;
      } else {
        this.initialSize = initialSize;
      }
      this.fgScale = "" + this.maxRadius / this.initialSize;
      this.updateLayoutCssVars();
    };
    MDCRippleFoundation2.prototype.updateLayoutCssVars = function() {
      var _a = MDCRippleFoundation2.strings, VAR_FG_SIZE = _a.VAR_FG_SIZE, VAR_LEFT = _a.VAR_LEFT, VAR_TOP = _a.VAR_TOP, VAR_FG_SCALE = _a.VAR_FG_SCALE;
      this.adapter.updateCssVariable(VAR_FG_SIZE, this.initialSize + "px");
      this.adapter.updateCssVariable(VAR_FG_SCALE, this.fgScale);
      if (this.adapter.isUnbounded()) {
        this.unboundedCoords = {
          left: Math.round(this.frame.width / 2 - this.initialSize / 2),
          top: Math.round(this.frame.height / 2 - this.initialSize / 2)
        };
        this.adapter.updateCssVariable(VAR_LEFT, this.unboundedCoords.left + "px");
        this.adapter.updateCssVariable(VAR_TOP, this.unboundedCoords.top + "px");
      }
    };
    return MDCRippleFoundation2;
  }(MDCFoundation)
);
const { applyPassive } = events;
const { matches } = ponyfill;
function Ripple(node, { ripple = true, surface = false, unbounded = false, disabled = false, color, active, rippleElement, eventTarget, activeTarget, addClass = (className) => node.classList.add(className), removeClass = (className) => node.classList.remove(className), addStyle = (name, value) => node.style.setProperty(name, value), initPromise = Promise.resolve() } = {}) {
  let instance2;
  let addLayoutListener = getContext("SMUI:addLayoutListener");
  let removeLayoutListener;
  let oldActive = active;
  let oldEventTarget = eventTarget;
  let oldActiveTarget = activeTarget;
  function handleProps() {
    if (surface) {
      addClass("mdc-ripple-surface");
      if (color === "primary") {
        addClass("smui-ripple-surface--primary");
        removeClass("smui-ripple-surface--secondary");
      } else if (color === "secondary") {
        removeClass("smui-ripple-surface--primary");
        addClass("smui-ripple-surface--secondary");
      } else {
        removeClass("smui-ripple-surface--primary");
        removeClass("smui-ripple-surface--secondary");
      }
    } else {
      removeClass("mdc-ripple-surface");
      removeClass("smui-ripple-surface--primary");
      removeClass("smui-ripple-surface--secondary");
    }
    if (instance2 && oldActive !== active) {
      oldActive = active;
      if (active) {
        instance2.activate();
      } else if (active === false) {
        instance2.deactivate();
      }
    }
    if (ripple && !instance2) {
      instance2 = new MDCRippleFoundation({
        addClass,
        browserSupportsCssVars: () => supportsCssVariables(window),
        computeBoundingRect: () => (rippleElement || node).getBoundingClientRect(),
        containsEventTarget: (target) => node.contains(target),
        deregisterDocumentInteractionHandler: (evtType, handler) => document.documentElement.removeEventListener(evtType, handler, applyPassive()),
        deregisterInteractionHandler: (evtType, handler) => (eventTarget || node).removeEventListener(evtType, handler, applyPassive()),
        deregisterResizeHandler: (handler) => window.removeEventListener("resize", handler),
        getWindowPageOffset: () => ({
          x: window.pageXOffset,
          y: window.pageYOffset
        }),
        isSurfaceActive: () => active == null ? matches(activeTarget || node, ":active") : active,
        isSurfaceDisabled: () => !!disabled,
        isUnbounded: () => !!unbounded,
        registerDocumentInteractionHandler: (evtType, handler) => document.documentElement.addEventListener(evtType, handler, applyPassive()),
        registerInteractionHandler: (evtType, handler) => (eventTarget || node).addEventListener(evtType, handler, applyPassive()),
        registerResizeHandler: (handler) => window.addEventListener("resize", handler),
        removeClass,
        updateCssVariable: addStyle
      });
      initPromise.then(() => {
        if (instance2) {
          instance2.init();
          instance2.setUnbounded(unbounded);
        }
      });
    } else if (instance2 && !ripple) {
      initPromise.then(() => {
        if (instance2) {
          instance2.destroy();
          instance2 = void 0;
        }
      });
    }
    if (instance2 && (oldEventTarget !== eventTarget || oldActiveTarget !== activeTarget)) {
      oldEventTarget = eventTarget;
      oldActiveTarget = activeTarget;
      instance2.destroy();
      requestAnimationFrame(() => {
        if (instance2) {
          instance2.init();
          instance2.setUnbounded(unbounded);
        }
      });
    }
    if (!ripple && unbounded) {
      addClass("mdc-ripple-upgraded--unbounded");
    }
  }
  handleProps();
  if (addLayoutListener) {
    removeLayoutListener = addLayoutListener(layout);
  }
  function layout() {
    if (instance2) {
      instance2.layout();
    }
  }
  return {
    update(props) {
      ({
        ripple,
        surface,
        unbounded,
        disabled,
        color,
        active,
        rippleElement,
        eventTarget,
        activeTarget,
        addClass,
        removeClass,
        addStyle,
        initPromise
      } = Object.assign({ ripple: true, surface: false, unbounded: false, disabled: false, color: void 0, active: void 0, rippleElement: void 0, eventTarget: void 0, activeTarget: void 0, addClass: (className) => node.classList.add(className), removeClass: (className) => node.classList.remove(className), addStyle: (name, value) => node.style.setProperty(name, value), initPromise: Promise.resolve() }, props));
      handleProps();
    },
    destroy() {
      if (instance2) {
        instance2.destroy();
        instance2 = void 0;
        removeClass("mdc-ripple-surface");
        removeClass("smui-ripple-surface--primary");
        removeClass("smui-ripple-surface--secondary");
      }
      if (removeLayoutListener) {
        removeLayoutListener();
      }
    }
  };
}
function create_default_slot$3(ctx) {
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[10].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[12],
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
        if (default_slot.p && (!current || dirty & /*$$scope*/
        4096)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[12],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[12]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[12],
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
function create_fragment$b(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [
    { tag: (
      /*tag*/
      ctx[3]
    ) },
    {
      use: [
        /*forwardEvents*/
        ctx[5],
        .../*use*/
        ctx[0]
      ]
    },
    {
      class: classMap({
        [
          /*className*/
          ctx[1]
        ]: true,
        "mdc-button__label": (
          /*context*/
          ctx[6] === "button"
        ),
        "mdc-fab__label": (
          /*context*/
          ctx[6] === "fab"
        ),
        "mdc-tab__text-label": (
          /*context*/
          ctx[6] === "tab"
        ),
        "mdc-image-list__label": (
          /*context*/
          ctx[6] === "image-list"
        ),
        "mdc-snackbar__label": (
          /*context*/
          ctx[6] === "snackbar"
        ),
        "mdc-banner__text": (
          /*context*/
          ctx[6] === "banner"
        ),
        "mdc-segmented-button__label": (
          /*context*/
          ctx[6] === "segmented-button"
        ),
        "mdc-data-table__pagination-rows-per-page-label": (
          /*context*/
          ctx[6] === "data-table:pagination"
        ),
        "mdc-data-table__header-cell-label": (
          /*context*/
          ctx[6] === "data-table:sortable-header-cell"
        )
      })
    },
    /*context*/
    ctx[6] === "snackbar" ? { "aria-atomic": "false" } : {},
    { tabindex: (
      /*tabindex*/
      ctx[7]
    ) },
    /*$$restProps*/
    ctx[8]
  ];
  var switch_value = (
    /*component*/
    ctx[2]
  );
  function switch_props(ctx2) {
    let switch_instance_props = {
      $$slots: { default: [create_default_slot$3] },
      $$scope: { ctx: ctx2 }
    };
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return { props: switch_instance_props };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
    ctx[11](switch_instance);
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l(nodes) {
      if (switch_instance)
        claim_component(switch_instance.$$.fragment, nodes);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance)
        mount_component(switch_instance, target, anchor);
      insert_hydration(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const switch_instance_changes = dirty & /*tag, forwardEvents, use, classMap, className, context, tabindex, $$restProps*/
      491 ? get_spread_update(switch_instance_spread_levels, [
        dirty & /*tag*/
        8 && { tag: (
          /*tag*/
          ctx2[3]
        ) },
        dirty & /*forwardEvents, use*/
        33 && {
          use: [
            /*forwardEvents*/
            ctx2[5],
            .../*use*/
            ctx2[0]
          ]
        },
        dirty & /*classMap, className, context*/
        66 && {
          class: classMap({
            [
              /*className*/
              ctx2[1]
            ]: true,
            "mdc-button__label": (
              /*context*/
              ctx2[6] === "button"
            ),
            "mdc-fab__label": (
              /*context*/
              ctx2[6] === "fab"
            ),
            "mdc-tab__text-label": (
              /*context*/
              ctx2[6] === "tab"
            ),
            "mdc-image-list__label": (
              /*context*/
              ctx2[6] === "image-list"
            ),
            "mdc-snackbar__label": (
              /*context*/
              ctx2[6] === "snackbar"
            ),
            "mdc-banner__text": (
              /*context*/
              ctx2[6] === "banner"
            ),
            "mdc-segmented-button__label": (
              /*context*/
              ctx2[6] === "segmented-button"
            ),
            "mdc-data-table__pagination-rows-per-page-label": (
              /*context*/
              ctx2[6] === "data-table:pagination"
            ),
            "mdc-data-table__header-cell-label": (
              /*context*/
              ctx2[6] === "data-table:sortable-header-cell"
            )
          })
        },
        dirty & /*context*/
        64 && get_spread_object(
          /*context*/
          ctx2[6] === "snackbar" ? { "aria-atomic": "false" } : {}
        ),
        dirty & /*tabindex*/
        128 && { tabindex: (
          /*tabindex*/
          ctx2[7]
        ) },
        dirty & /*$$restProps*/
        256 && get_spread_object(
          /*$$restProps*/
          ctx2[8]
        )
      ]) : {};
      if (dirty & /*$$scope*/
      4096) {
        switch_instance_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (dirty & /*component*/
      4 && switch_value !== (switch_value = /*component*/
      ctx2[2])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component(switch_value, switch_props(ctx2));
          ctx2[11](switch_instance);
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(switch_instance_anchor);
      }
      ctx[11](null);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
function instance$6($$self, $$props, $$invalidate) {
  const omit_props_names = ["use", "class", "component", "tag", "getElement"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let element2;
  let { component = SmuiElement } = $$props;
  let { tag = component === SmuiElement ? "span" : void 0 } = $$props;
  const context = getContext("SMUI:label:context");
  const tabindex = getContext("SMUI:label:tabindex");
  function getElement() {
    return element2.getElement();
  }
  function switch_instance_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(4, element2);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(8, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("component" in $$new_props)
      $$invalidate(2, component = $$new_props.component);
    if ("tag" in $$new_props)
      $$invalidate(3, tag = $$new_props.tag);
    if ("$$scope" in $$new_props)
      $$invalidate(12, $$scope = $$new_props.$$scope);
  };
  return [
    use,
    className,
    component,
    tag,
    element2,
    forwardEvents,
    context,
    tabindex,
    $$restProps,
    getElement,
    slots,
    switch_instance_binding,
    $$scope
  ];
}
class CommonLabel extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$6, create_fragment$b, safe_not_equal, {
      use: 0,
      class: 1,
      component: 2,
      tag: 3,
      getElement: 9
    });
  }
  get getElement() {
    return this.$$.ctx[9];
  }
}
function create_else_block$2(ctx) {
  let previous_tag = (
    /*tag*/
    ctx[1]
  );
  let svelte_element_anchor;
  let current;
  let svelte_element = (
    /*tag*/
    ctx[1] && create_dynamic_element_1(ctx)
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
    p(ctx2, dirty) {
      if (
        /*tag*/
        ctx2[1]
      ) {
        if (!previous_tag) {
          svelte_element = create_dynamic_element_1(ctx2);
          previous_tag = /*tag*/
          ctx2[1];
          svelte_element.c();
          svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor);
        } else if (safe_not_equal(
          previous_tag,
          /*tag*/
          ctx2[1]
        )) {
          svelte_element.d(1);
          svelte_element = create_dynamic_element_1(ctx2);
          previous_tag = /*tag*/
          ctx2[1];
          svelte_element.c();
          svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor);
        } else {
          svelte_element.p(ctx2, dirty);
        }
      } else if (previous_tag) {
        svelte_element.d(1);
        svelte_element = null;
        previous_tag = /*tag*/
        ctx2[1];
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
function create_if_block_1$1(ctx) {
  let previous_tag = (
    /*tag*/
    ctx[1]
  );
  let svelte_element_anchor;
  let svelte_element = (
    /*tag*/
    ctx[1] && create_dynamic_element(ctx)
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
    },
    p(ctx2, dirty) {
      if (
        /*tag*/
        ctx2[1]
      ) {
        if (!previous_tag) {
          svelte_element = create_dynamic_element(ctx2);
          previous_tag = /*tag*/
          ctx2[1];
          svelte_element.c();
          svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor);
        } else if (safe_not_equal(
          previous_tag,
          /*tag*/
          ctx2[1]
        )) {
          svelte_element.d(1);
          svelte_element = create_dynamic_element(ctx2);
          previous_tag = /*tag*/
          ctx2[1];
          svelte_element.c();
          svelte_element.m(svelte_element_anchor.parentNode, svelte_element_anchor);
        } else {
          svelte_element.p(ctx2, dirty);
        }
      } else if (previous_tag) {
        svelte_element.d(1);
        svelte_element = null;
        previous_tag = /*tag*/
        ctx2[1];
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(svelte_element_anchor);
      }
      if (svelte_element)
        svelte_element.d(detaching);
    }
  };
}
function create_if_block$4(ctx) {
  let svg;
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
  let svg_levels = [
    /*$$restProps*/
    ctx[5]
  ];
  let svg_data = {};
  for (let i = 0; i < svg_levels.length; i += 1) {
    svg_data = assign(svg_data, svg_levels[i]);
  }
  return {
    c() {
      svg = svg_element("svg");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      svg = claim_svg_element(nodes, "svg", {});
      var svg_nodes = children(svg);
      if (default_slot)
        default_slot.l(svg_nodes);
      svg_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_svg_attributes(svg, svg_data);
    },
    m(target, anchor) {
      insert_hydration(target, svg, anchor);
      if (default_slot) {
        default_slot.m(svg, null);
      }
      ctx[9](svg);
      current = true;
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
            ctx[4].call(null, svg)
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
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
      set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [dirty & /*$$restProps*/
      32 && /*$$restProps*/
      ctx2[5]]));
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
        detach(svg);
      }
      if (default_slot)
        default_slot.d(detaching);
      ctx[9](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_dynamic_element_1(ctx) {
  let svelte_element;
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
  let svelte_element_levels = [
    /*$$restProps*/
    ctx[5]
  ];
  let svelte_element_data = {};
  for (let i = 0; i < svelte_element_levels.length; i += 1) {
    svelte_element_data = assign(svelte_element_data, svelte_element_levels[i]);
  }
  return {
    c() {
      svelte_element = element(
        /*tag*/
        ctx[1]
      );
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      svelte_element = claim_element(
        nodes,
        /*tag*/
        (ctx[1] || "null").toUpperCase(),
        {}
      );
      var svelte_element_nodes = children(svelte_element);
      if (default_slot)
        default_slot.l(svelte_element_nodes);
      svelte_element_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_dynamic_element_data(
        /*tag*/
        ctx[1]
      )(svelte_element, svelte_element_data);
    },
    m(target, anchor) {
      insert_hydration(target, svelte_element, anchor);
      if (default_slot) {
        default_slot.m(svelte_element, null);
      }
      ctx[11](svelte_element);
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
            ctx[4].call(null, svelte_element)
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
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
      set_dynamic_element_data(
        /*tag*/
        ctx2[1]
      )(svelte_element, svelte_element_data = get_spread_update(svelte_element_levels, [dirty & /*$$restProps*/
      32 && /*$$restProps*/
      ctx2[5]]));
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
        detach(svelte_element);
      }
      if (default_slot)
        default_slot.d(detaching);
      ctx[11](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_dynamic_element(ctx) {
  let svelte_element;
  let useActions_action;
  let mounted;
  let dispose;
  let svelte_element_levels = [
    /*$$restProps*/
    ctx[5]
  ];
  let svelte_element_data = {};
  for (let i = 0; i < svelte_element_levels.length; i += 1) {
    svelte_element_data = assign(svelte_element_data, svelte_element_levels[i]);
  }
  return {
    c() {
      svelte_element = element(
        /*tag*/
        ctx[1]
      );
      this.h();
    },
    l(nodes) {
      svelte_element = claim_element(
        nodes,
        /*tag*/
        (ctx[1] || "null").toUpperCase(),
        {}
      );
      children(svelte_element).forEach(detach);
      this.h();
    },
    h() {
      set_dynamic_element_data(
        /*tag*/
        ctx[1]
      )(svelte_element, svelte_element_data);
    },
    m(target, anchor) {
      insert_hydration(target, svelte_element, anchor);
      ctx[10](svelte_element);
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
            ctx[4].call(null, svelte_element)
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      set_dynamic_element_data(
        /*tag*/
        ctx2[1]
      )(svelte_element, svelte_element_data = get_spread_update(svelte_element_levels, [dirty & /*$$restProps*/
      32 && /*$$restProps*/
      ctx2[5]]));
      if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/
      1)
        useActions_action.update.call(
          null,
          /*use*/
          ctx2[0]
        );
    },
    d(detaching) {
      if (detaching) {
        detach(svelte_element);
      }
      ctx[10](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_fragment$a(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block$4, create_if_block_1$1, create_else_block$2];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*tag*/
      ctx2[1] === "svg"
    )
      return 0;
    if (
      /*selfClosing*/
      ctx2[3]
    )
      return 1;
    return 2;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
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
      if_blocks[current_block_type_index].m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
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
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
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
      if_blocks[current_block_type_index].d(detaching);
    }
  };
}
function instance$5($$self, $$props, $$invalidate) {
  let selfClosing;
  const omit_props_names = ["use", "tag", "getElement"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { use = [] } = $$props;
  let { tag } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let element2;
  function getElement() {
    return element2;
  }
  function svg_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(2, element2);
    });
  }
  function svelte_element_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(2, element2);
    });
  }
  function svelte_element_binding_1($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(2, element2);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(5, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("tag" in $$new_props)
      $$invalidate(1, tag = $$new_props.tag);
    if ("$$scope" in $$new_props)
      $$invalidate(7, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*tag*/
    2) {
      $$invalidate(3, selfClosing = [
        "area",
        "base",
        "br",
        "col",
        "embed",
        "hr",
        "img",
        "input",
        "link",
        "meta",
        "param",
        "source",
        "track",
        "wbr"
      ].indexOf(tag) > -1);
    }
  };
  return [
    use,
    tag,
    element2,
    selfClosing,
    forwardEvents,
    $$restProps,
    getElement,
    $$scope,
    slots,
    svg_binding,
    svelte_element_binding,
    svelte_element_binding_1
  ];
}
class SmuiElement extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$5, create_fragment$a, safe_not_equal, { use: 0, tag: 1, getElement: 6 });
  }
  get getElement() {
    return this.$$.ctx[6];
  }
}
function create_fragment$9(ctx) {
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[4].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[3],
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
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        8)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[3],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[3]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[3],
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
function instance$4($$self, $$props, $$invalidate) {
  let $storeValue;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { key } = $$props;
  let { value } = $$props;
  const storeValue = writable(value);
  component_subscribe($$self, storeValue, (value2) => $$invalidate(5, $storeValue = value2));
  setContext(key, storeValue);
  onDestroy(() => {
    storeValue.set(void 0);
  });
  $$self.$$set = ($$props2) => {
    if ("key" in $$props2)
      $$invalidate(1, key = $$props2.key);
    if ("value" in $$props2)
      $$invalidate(2, value = $$props2.value);
    if ("$$scope" in $$props2)
      $$invalidate(3, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*value*/
    4) {
      set_store_value(storeValue, $storeValue = value, $storeValue);
    }
  };
  return [storeValue, key, value, $$scope, slots];
}
class ContextFragment extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$9, safe_not_equal, { key: 1, value: 2 });
  }
}
function create_if_block$3(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      children(div).forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "mdc-button__touch");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_default_slot$2(ctx) {
  let div;
  let t;
  let if_block_anchor;
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[28].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[30],
    null
  );
  let if_block = (
    /*touch*/
    ctx[6] && create_if_block$3()
  );
  return {
    c() {
      div = element("div");
      t = space();
      if (default_slot)
        default_slot.c();
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      children(div).forEach(detach);
      t = claim_space(nodes);
      if (default_slot)
        default_slot.l(nodes);
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
      this.h();
    },
    h() {
      attr(div, "class", "mdc-button__ripple");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      insert_hydration(target, t, anchor);
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty[0] & /*$$scope*/
        1073741824)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[30],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[30]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[30],
              dirty,
              null
            ),
            null
          );
        }
      }
      if (
        /*touch*/
        ctx2[6]
      ) {
        if (if_block)
          ;
        else {
          if_block = create_if_block$3();
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
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
      if (detaching) {
        detach(div);
        detach(t);
        detach(if_block_anchor);
      }
      if (default_slot)
        default_slot.d(detaching);
      if (if_block)
        if_block.d(detaching);
    }
  };
}
function create_fragment$8(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [
    { tag: (
      /*tag*/
      ctx[10]
    ) },
    {
      use: [
        [
          Ripple,
          {
            ripple: (
              /*ripple*/
              ctx[3]
            ),
            unbounded: false,
            color: (
              /*color*/
              ctx[4]
            ),
            disabled: !!/*$$restProps*/
            ctx[23].disabled,
            addClass: (
              /*addClass*/
              ctx[19]
            ),
            removeClass: (
              /*removeClass*/
              ctx[20]
            ),
            addStyle: (
              /*addStyle*/
              ctx[21]
            )
          }
        ],
        /*forwardEvents*/
        ctx[17],
        .../*use*/
        ctx[0]
      ]
    },
    {
      class: classMap({
        [
          /*className*/
          ctx[1]
        ]: true,
        "mdc-button": true,
        "mdc-button--raised": (
          /*variant*/
          ctx[5] === "raised"
        ),
        "mdc-button--unelevated": (
          /*variant*/
          ctx[5] === "unelevated"
        ),
        "mdc-button--outlined": (
          /*variant*/
          ctx[5] === "outlined"
        ),
        "smui-button--color-secondary": (
          /*color*/
          ctx[4] === "secondary"
        ),
        "mdc-button--touch": (
          /*touch*/
          ctx[6]
        ),
        "mdc-card__action": (
          /*context*/
          ctx[18] === "card:action"
        ),
        "mdc-card__action--button": (
          /*context*/
          ctx[18] === "card:action"
        ),
        "mdc-dialog__button": (
          /*context*/
          ctx[18] === "dialog:action"
        ),
        "mdc-top-app-bar__navigation-icon": (
          /*context*/
          ctx[18] === "top-app-bar:navigation"
        ),
        "mdc-top-app-bar__action-item": (
          /*context*/
          ctx[18] === "top-app-bar:action"
        ),
        "mdc-snackbar__action": (
          /*context*/
          ctx[18] === "snackbar:actions"
        ),
        "mdc-banner__secondary-action": (
          /*context*/
          ctx[18] === "banner" && /*secondary*/
          ctx[8]
        ),
        "mdc-banner__primary-action": (
          /*context*/
          ctx[18] === "banner" && !/*secondary*/
          ctx[8]
        ),
        "mdc-tooltip__action": (
          /*context*/
          ctx[18] === "tooltip:rich-actions"
        ),
        .../*internalClasses*/
        ctx[12]
      })
    },
    {
      style: Object.entries(
        /*internalStyles*/
        ctx[13]
      ).map(func$4).concat([
        /*style*/
        ctx[2]
      ]).join(" ")
    },
    /*actionProp*/
    ctx[16],
    /*defaultProp*/
    ctx[15],
    /*secondaryProp*/
    ctx[14],
    { href: (
      /*href*/
      ctx[7]
    ) },
    /*$$restProps*/
    ctx[23]
  ];
  var switch_value = (
    /*component*/
    ctx[9]
  );
  function switch_props(ctx2) {
    let switch_instance_props = {
      $$slots: { default: [create_default_slot$2] },
      $$scope: { ctx: ctx2 }
    };
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return { props: switch_instance_props };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
    ctx[29](switch_instance);
    switch_instance.$on(
      "click",
      /*handleClick*/
      ctx[22]
    );
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l(nodes) {
      if (switch_instance)
        claim_component(switch_instance.$$.fragment, nodes);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance)
        mount_component(switch_instance, target, anchor);
      insert_hydration(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const switch_instance_changes = dirty[0] & /*tag, ripple, color, $$restProps, addClass, removeClass, addStyle, forwardEvents, use, className, variant, touch, context, secondary, internalClasses, internalStyles, style, actionProp, defaultProp, secondaryProp, href*/
      12580351 ? get_spread_update(switch_instance_spread_levels, [
        dirty[0] & /*tag*/
        1024 && { tag: (
          /*tag*/
          ctx2[10]
        ) },
        dirty[0] & /*ripple, color, $$restProps, addClass, removeClass, addStyle, forwardEvents, use*/
        12189721 && {
          use: [
            [
              Ripple,
              {
                ripple: (
                  /*ripple*/
                  ctx2[3]
                ),
                unbounded: false,
                color: (
                  /*color*/
                  ctx2[4]
                ),
                disabled: !!/*$$restProps*/
                ctx2[23].disabled,
                addClass: (
                  /*addClass*/
                  ctx2[19]
                ),
                removeClass: (
                  /*removeClass*/
                  ctx2[20]
                ),
                addStyle: (
                  /*addStyle*/
                  ctx2[21]
                )
              }
            ],
            /*forwardEvents*/
            ctx2[17],
            .../*use*/
            ctx2[0]
          ]
        },
        dirty[0] & /*className, variant, color, touch, context, secondary, internalClasses*/
        266610 && {
          class: classMap({
            [
              /*className*/
              ctx2[1]
            ]: true,
            "mdc-button": true,
            "mdc-button--raised": (
              /*variant*/
              ctx2[5] === "raised"
            ),
            "mdc-button--unelevated": (
              /*variant*/
              ctx2[5] === "unelevated"
            ),
            "mdc-button--outlined": (
              /*variant*/
              ctx2[5] === "outlined"
            ),
            "smui-button--color-secondary": (
              /*color*/
              ctx2[4] === "secondary"
            ),
            "mdc-button--touch": (
              /*touch*/
              ctx2[6]
            ),
            "mdc-card__action": (
              /*context*/
              ctx2[18] === "card:action"
            ),
            "mdc-card__action--button": (
              /*context*/
              ctx2[18] === "card:action"
            ),
            "mdc-dialog__button": (
              /*context*/
              ctx2[18] === "dialog:action"
            ),
            "mdc-top-app-bar__navigation-icon": (
              /*context*/
              ctx2[18] === "top-app-bar:navigation"
            ),
            "mdc-top-app-bar__action-item": (
              /*context*/
              ctx2[18] === "top-app-bar:action"
            ),
            "mdc-snackbar__action": (
              /*context*/
              ctx2[18] === "snackbar:actions"
            ),
            "mdc-banner__secondary-action": (
              /*context*/
              ctx2[18] === "banner" && /*secondary*/
              ctx2[8]
            ),
            "mdc-banner__primary-action": (
              /*context*/
              ctx2[18] === "banner" && !/*secondary*/
              ctx2[8]
            ),
            "mdc-tooltip__action": (
              /*context*/
              ctx2[18] === "tooltip:rich-actions"
            ),
            .../*internalClasses*/
            ctx2[12]
          })
        },
        dirty[0] & /*internalStyles, style*/
        8196 && {
          style: Object.entries(
            /*internalStyles*/
            ctx2[13]
          ).map(func$4).concat([
            /*style*/
            ctx2[2]
          ]).join(" ")
        },
        dirty[0] & /*actionProp*/
        65536 && get_spread_object(
          /*actionProp*/
          ctx2[16]
        ),
        dirty[0] & /*defaultProp*/
        32768 && get_spread_object(
          /*defaultProp*/
          ctx2[15]
        ),
        dirty[0] & /*secondaryProp*/
        16384 && get_spread_object(
          /*secondaryProp*/
          ctx2[14]
        ),
        dirty[0] & /*href*/
        128 && { href: (
          /*href*/
          ctx2[7]
        ) },
        dirty[0] & /*$$restProps*/
        8388608 && get_spread_object(
          /*$$restProps*/
          ctx2[23]
        )
      ]) : {};
      if (dirty[0] & /*$$scope, touch*/
      1073741888) {
        switch_instance_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (dirty[0] & /*component*/
      512 && switch_value !== (switch_value = /*component*/
      ctx2[9])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component(switch_value, switch_props(ctx2));
          ctx2[29](switch_instance);
          switch_instance.$on(
            "click",
            /*handleClick*/
            ctx2[22]
          );
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(switch_instance_anchor);
      }
      ctx[29](null);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
const func$4 = ([name, value]) => `${name}: ${value};`;
function instance$3($$self, $$props, $$invalidate) {
  let actionProp;
  let defaultProp;
  let secondaryProp;
  const omit_props_names = [
    "use",
    "class",
    "style",
    "ripple",
    "color",
    "variant",
    "touch",
    "href",
    "action",
    "defaultAction",
    "secondary",
    "component",
    "tag",
    "getElement"
  ];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { style = "" } = $$props;
  let { ripple = true } = $$props;
  let { color = "primary" } = $$props;
  let { variant = "text" } = $$props;
  let { touch = false } = $$props;
  let { href = void 0 } = $$props;
  let { action = "close" } = $$props;
  let { defaultAction = false } = $$props;
  let { secondary = false } = $$props;
  let element2;
  let internalClasses = {};
  let internalStyles = {};
  let context = getContext("SMUI:button:context");
  let { component = SmuiElement } = $$props;
  let { tag = component === SmuiElement ? href == null ? "button" : "a" : void 0 } = $$props;
  let previousDisabled = $$restProps.disabled;
  setContext("SMUI:label:context", "button");
  setContext("SMUI:icon:context", "button");
  function addClass(className2) {
    if (!internalClasses[className2]) {
      $$invalidate(12, internalClasses[className2] = true, internalClasses);
    }
  }
  function removeClass(className2) {
    if (!(className2 in internalClasses) || internalClasses[className2]) {
      $$invalidate(12, internalClasses[className2] = false, internalClasses);
    }
  }
  function addStyle(name, value) {
    if (internalStyles[name] != value) {
      if (value === "" || value == null) {
        delete internalStyles[name];
        $$invalidate(13, internalStyles);
      } else {
        $$invalidate(13, internalStyles[name] = value, internalStyles);
      }
    }
  }
  function handleClick() {
    if (context === "banner") {
      dispatch(getElement(), secondary ? "SMUIBannerButton:secondaryActionClick" : "SMUIBannerButton:primaryActionClick");
    }
  }
  function getElement() {
    return element2.getElement();
  }
  function switch_instance_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(11, element2);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$invalidate(31, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    $$invalidate(23, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("ripple" in $$new_props)
      $$invalidate(3, ripple = $$new_props.ripple);
    if ("color" in $$new_props)
      $$invalidate(4, color = $$new_props.color);
    if ("variant" in $$new_props)
      $$invalidate(5, variant = $$new_props.variant);
    if ("touch" in $$new_props)
      $$invalidate(6, touch = $$new_props.touch);
    if ("href" in $$new_props)
      $$invalidate(7, href = $$new_props.href);
    if ("action" in $$new_props)
      $$invalidate(24, action = $$new_props.action);
    if ("defaultAction" in $$new_props)
      $$invalidate(25, defaultAction = $$new_props.defaultAction);
    if ("secondary" in $$new_props)
      $$invalidate(8, secondary = $$new_props.secondary);
    if ("component" in $$new_props)
      $$invalidate(9, component = $$new_props.component);
    if ("tag" in $$new_props)
      $$invalidate(10, tag = $$new_props.tag);
    if ("$$scope" in $$new_props)
      $$invalidate(30, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    $$invalidate(16, actionProp = context === "dialog:action" && action != null ? { "data-mdc-dialog-action": action } : { action: $$props.action });
    $$invalidate(15, defaultProp = context === "dialog:action" && defaultAction ? { "data-mdc-dialog-button-default": "" } : { default: $$props.default });
    $$invalidate(14, secondaryProp = context === "banner" ? {} : { secondary: $$props.secondary });
    if (previousDisabled !== $$restProps.disabled) {
      const el = getElement();
      if ("blur" in el) {
        el.blur();
      }
      $$invalidate(27, previousDisabled = $$restProps.disabled);
    }
  };
  $$props = exclude_internal_props($$props);
  return [
    use,
    className,
    style,
    ripple,
    color,
    variant,
    touch,
    href,
    secondary,
    component,
    tag,
    element2,
    internalClasses,
    internalStyles,
    secondaryProp,
    defaultProp,
    actionProp,
    forwardEvents,
    context,
    addClass,
    removeClass,
    addStyle,
    handleClick,
    $$restProps,
    action,
    defaultAction,
    getElement,
    previousDisabled,
    slots,
    switch_instance_binding,
    $$scope
  ];
}
class Button extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance$3,
      create_fragment$8,
      safe_not_equal,
      {
        use: 0,
        class: 1,
        style: 2,
        ripple: 3,
        color: 4,
        variant: 5,
        touch: 6,
        href: 7,
        action: 24,
        defaultAction: 25,
        secondary: 8,
        component: 9,
        tag: 10,
        getElement: 26
      },
      null,
      [-1, -1]
    );
  }
  get getElement() {
    return this.$$.ctx[26];
  }
}
/**
 * @license
 * Copyright 2020 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$4 = {
  INDETERMINATE_CLASS: "mdc-circular-progress--indeterminate",
  CLOSED_CLASS: "mdc-circular-progress--closed"
};
var strings$2 = {
  ARIA_HIDDEN: "aria-hidden",
  ARIA_VALUENOW: "aria-valuenow",
  DETERMINATE_CIRCLE_SELECTOR: ".mdc-circular-progress__determinate-circle",
  RADIUS: "r",
  STROKE_DASHOFFSET: "stroke-dashoffset"
};
/**
 * @license
 * Copyright 2020 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCCircularProgressFoundation = (
  /** @class */
  function(_super) {
    __extends(MDCCircularProgressFoundation2, _super);
    function MDCCircularProgressFoundation2(adapter) {
      return _super.call(this, __assign(__assign({}, MDCCircularProgressFoundation2.defaultAdapter), adapter)) || this;
    }
    Object.defineProperty(MDCCircularProgressFoundation2, "cssClasses", {
      get: function() {
        return cssClasses$4;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCCircularProgressFoundation2, "strings", {
      get: function() {
        return strings$2;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCCircularProgressFoundation2, "defaultAdapter", {
      get: function() {
        return {
          addClass: function() {
            return void 0;
          },
          getDeterminateCircleAttribute: function() {
            return null;
          },
          hasClass: function() {
            return false;
          },
          removeClass: function() {
            return void 0;
          },
          removeAttribute: function() {
            return void 0;
          },
          setAttribute: function() {
            return void 0;
          },
          setDeterminateCircleAttribute: function() {
            return void 0;
          }
        };
      },
      enumerable: false,
      configurable: true
    });
    MDCCircularProgressFoundation2.prototype.init = function() {
      this.closed = this.adapter.hasClass(cssClasses$4.CLOSED_CLASS);
      this.determinate = !this.adapter.hasClass(cssClasses$4.INDETERMINATE_CLASS);
      this.progress = 0;
      if (this.determinate) {
        this.adapter.setAttribute(strings$2.ARIA_VALUENOW, this.progress.toString());
      }
      this.radius = Number(this.adapter.getDeterminateCircleAttribute(strings$2.RADIUS));
    };
    MDCCircularProgressFoundation2.prototype.setDeterminate = function(determinate) {
      this.determinate = determinate;
      if (this.determinate) {
        this.adapter.removeClass(cssClasses$4.INDETERMINATE_CLASS);
        this.setProgress(this.progress);
      } else {
        this.adapter.addClass(cssClasses$4.INDETERMINATE_CLASS);
        this.adapter.removeAttribute(strings$2.ARIA_VALUENOW);
      }
    };
    MDCCircularProgressFoundation2.prototype.isDeterminate = function() {
      return this.determinate;
    };
    MDCCircularProgressFoundation2.prototype.setProgress = function(value) {
      this.progress = value;
      if (this.determinate) {
        var unfilledArcLength = (1 - this.progress) * (2 * Math.PI * this.radius);
        this.adapter.setDeterminateCircleAttribute(strings$2.STROKE_DASHOFFSET, "" + unfilledArcLength);
        this.adapter.setAttribute(strings$2.ARIA_VALUENOW, this.progress.toString());
      }
    };
    MDCCircularProgressFoundation2.prototype.getProgress = function() {
      return this.progress;
    };
    MDCCircularProgressFoundation2.prototype.open = function() {
      this.closed = false;
      this.adapter.removeClass(cssClasses$4.CLOSED_CLASS);
      this.adapter.removeAttribute(strings$2.ARIA_HIDDEN);
    };
    MDCCircularProgressFoundation2.prototype.close = function() {
      this.closed = true;
      this.adapter.addClass(cssClasses$4.CLOSED_CLASS);
      this.adapter.setAttribute(strings$2.ARIA_HIDDEN, "true");
    };
    MDCCircularProgressFoundation2.prototype.isClosed = function() {
      return this.closed;
    };
    return MDCCircularProgressFoundation2;
  }(MDCFoundation)
);
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[24] = list[i];
  return child_ctx;
}
function create_each_block(ctx) {
  let div3;
  let div0;
  let textContent = `<svg class="mdc-circular-progress__indeterminate-circle-graphic" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="18" stroke-dasharray="113.097" stroke-dashoffset="56.549" stroke-width="4"></circle></svg>`;
  let t0;
  let div1;
  let textContent_1 = `<svg class="mdc-circular-progress__indeterminate-circle-graphic" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="18" stroke-dasharray="113.097" stroke-dashoffset="56.549" stroke-width="3.2"></circle></svg>`;
  let t1;
  let div2;
  let textContent_2 = `<svg class="mdc-circular-progress__indeterminate-circle-graphic" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="18" stroke-dasharray="113.097" stroke-dashoffset="56.549" stroke-width="4"></circle></svg>`;
  let t2;
  let div3_class_value;
  return {
    c() {
      div3 = element("div");
      div0 = element("div");
      div0.innerHTML = textContent;
      t0 = space();
      div1 = element("div");
      div1.innerHTML = textContent_1;
      t1 = space();
      div2 = element("div");
      div2.innerHTML = textContent_2;
      t2 = space();
      this.h();
    },
    l(nodes) {
      div3 = claim_element(nodes, "DIV", { class: true });
      var div3_nodes = children(div3);
      div0 = claim_element(div3_nodes, "DIV", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(div0) !== "svelte-1d4f91x")
        div0.innerHTML = textContent;
      t0 = claim_space(div3_nodes);
      div1 = claim_element(div3_nodes, "DIV", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(div1) !== "svelte-qvm4qv")
        div1.innerHTML = textContent_1;
      t1 = claim_space(div3_nodes);
      div2 = claim_element(div3_nodes, "DIV", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(div2) !== "svelte-c3k2p4")
        div2.innerHTML = textContent_2;
      t2 = claim_space(div3_nodes);
      div3_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div0, "class", "mdc-circular-progress__circle-clipper mdc-circular-progress__circle-left");
      attr(div1, "class", "mdc-circular-progress__gap-patch");
      attr(div2, "class", "mdc-circular-progress__circle-clipper mdc-circular-progress__circle-right");
      attr(div3, "class", div3_class_value = classMap({
        [
          /*className*/
          ctx[1]
        ]: true,
        "mdc-circular-progress__spinner-layer": true,
        ["mdc-circular-progress__color-" + /*color*/
        ctx[24]]: (
          /*fourColor*/
          ctx[5]
        )
      }));
    },
    m(target, anchor) {
      insert_hydration(target, div3, anchor);
      append_hydration(div3, div0);
      append_hydration(div3, t0);
      append_hydration(div3, div1);
      append_hydration(div3, t1);
      append_hydration(div3, div2);
      append_hydration(div3, t2);
    },
    p(ctx2, dirty) {
      if (dirty & /*className, fourColor*/
      34 && div3_class_value !== (div3_class_value = classMap({
        [
          /*className*/
          ctx2[1]
        ]: true,
        "mdc-circular-progress__spinner-layer": true,
        ["mdc-circular-progress__color-" + /*color*/
        ctx2[24]]: (
          /*fourColor*/
          ctx2[5]
        )
      }))) {
        attr(div3, "class", div3_class_value);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div3);
      }
    }
  };
}
function create_fragment$7(ctx) {
  let div2;
  let div0;
  let svg;
  let circle0;
  let circle1;
  let t;
  let div1;
  let div2_class_value;
  let div2_aria_valuemin_value;
  let div2_aria_valuemax_value;
  let div2_aria_valuenow_value;
  let useActions_action;
  let mounted;
  let dispose;
  let circle1_levels = [
    {
      class: "mdc-circular-progress__determinate-circle"
    },
    { cx: "24" },
    { cy: "24" },
    { r: "18" },
    { "stroke-dasharray": "113.097" },
    { "stroke-dashoffset": "113.097" },
    { "stroke-width": "4" },
    /*determinateCircleAttrs*/
    ctx[9]
  ];
  let circle_data = {};
  for (let i = 0; i < circle1_levels.length; i += 1) {
    circle_data = assign(circle_data, circle1_levels[i]);
  }
  let each_value = ensure_array_like(
    /*fourColor*/
    ctx[5] ? [1, 2, 3, 4] : [1]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  let div2_levels = [
    {
      class: div2_class_value = classMap({
        [
          /*className*/
          ctx[1]
        ]: true,
        "mdc-circular-progress": true,
        "mdc-circular-progress--indeterminate": (
          /*indeterminate*/
          ctx[2]
        ),
        "mdc-circular-progress--closed": (
          /*closed*/
          ctx[3]
        ),
        .../*internalClasses*/
        ctx[7]
      })
    },
    { role: "progressbar" },
    {
      "aria-valuemin": div2_aria_valuemin_value = 0
    },
    {
      "aria-valuemax": div2_aria_valuemax_value = 1
    },
    {
      "aria-valuenow": div2_aria_valuenow_value = /*indeterminate*/
      ctx[2] ? void 0 : (
        /*progress*/
        ctx[4]
      )
    },
    /*internalAttrs*/
    ctx[8],
    /*$$restProps*/
    ctx[12]
  ];
  let div_data_2 = {};
  for (let i = 0; i < div2_levels.length; i += 1) {
    div_data_2 = assign(div_data_2, div2_levels[i]);
  }
  return {
    c() {
      div2 = element("div");
      div0 = element("div");
      svg = svg_element("svg");
      circle0 = svg_element("circle");
      circle1 = svg_element("circle");
      t = space();
      div1 = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      this.h();
    },
    l(nodes) {
      div2 = claim_element(nodes, "DIV", {
        class: true,
        role: true,
        "aria-valuemin": true,
        "aria-valuemax": true,
        "aria-valuenow": true
      });
      var div2_nodes = children(div2);
      div0 = claim_element(div2_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      svg = claim_svg_element(div0_nodes, "svg", { class: true, viewBox: true, xmlns: true });
      var svg_nodes = children(svg);
      circle0 = claim_svg_element(svg_nodes, "circle", {
        class: true,
        cx: true,
        cy: true,
        r: true,
        "stroke-width": true
      });
      children(circle0).forEach(detach);
      circle1 = claim_svg_element(svg_nodes, "circle", {
        class: true,
        cx: true,
        cy: true,
        r: true,
        "stroke-dasharray": true,
        "stroke-dashoffset": true,
        "stroke-width": true
      });
      children(circle1).forEach(detach);
      svg_nodes.forEach(detach);
      div0_nodes.forEach(detach);
      t = claim_space(div2_nodes);
      div1 = claim_element(div2_nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(div1_nodes);
      }
      div1_nodes.forEach(detach);
      div2_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(circle0, "class", "mdc-circular-progress__determinate-track");
      attr(circle0, "cx", "24");
      attr(circle0, "cy", "24");
      attr(circle0, "r", "18");
      attr(circle0, "stroke-width", "4");
      set_svg_attributes(circle1, circle_data);
      attr(svg, "class", "mdc-circular-progress__determinate-circle-graphic");
      attr(svg, "viewBox", "0 0 48 48");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(div0, "class", "mdc-circular-progress__determinate-container");
      attr(div1, "class", "mdc-circular-progress__indeterminate-container");
      set_attributes(div2, div_data_2);
    },
    m(target, anchor) {
      insert_hydration(target, div2, anchor);
      append_hydration(div2, div0);
      append_hydration(div0, svg);
      append_hydration(svg, circle0);
      append_hydration(svg, circle1);
      ctx[15](circle1);
      append_hydration(div2, t);
      append_hydration(div2, div1);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div1, null);
        }
      }
      ctx[16](div2);
      if (!mounted) {
        dispose = [
          action_destroyer(useActions_action = useActions.call(
            null,
            div2,
            /*use*/
            ctx[0]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[11].call(null, div2)
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      set_svg_attributes(circle1, circle_data = get_spread_update(circle1_levels, [
        {
          class: "mdc-circular-progress__determinate-circle"
        },
        { cx: "24" },
        { cy: "24" },
        { r: "18" },
        { "stroke-dasharray": "113.097" },
        { "stroke-dashoffset": "113.097" },
        { "stroke-width": "4" },
        dirty & /*determinateCircleAttrs*/
        512 && /*determinateCircleAttrs*/
        ctx2[9]
      ]));
      if (dirty & /*classMap, className, fourColor*/
      34) {
        each_value = ensure_array_like(
          /*fourColor*/
          ctx2[5] ? [1, 2, 3, 4] : [1]
        );
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(div1, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
      set_attributes(div2, div_data_2 = get_spread_update(div2_levels, [
        dirty & /*className, indeterminate, closed, internalClasses*/
        142 && div2_class_value !== (div2_class_value = classMap({
          [
            /*className*/
            ctx2[1]
          ]: true,
          "mdc-circular-progress": true,
          "mdc-circular-progress--indeterminate": (
            /*indeterminate*/
            ctx2[2]
          ),
          "mdc-circular-progress--closed": (
            /*closed*/
            ctx2[3]
          ),
          .../*internalClasses*/
          ctx2[7]
        })) && { class: div2_class_value },
        { role: "progressbar" },
        {
          "aria-valuemin": div2_aria_valuemin_value
        },
        {
          "aria-valuemax": div2_aria_valuemax_value
        },
        dirty & /*indeterminate, progress*/
        20 && div2_aria_valuenow_value !== (div2_aria_valuenow_value = /*indeterminate*/
        ctx2[2] ? void 0 : (
          /*progress*/
          ctx2[4]
        )) && {
          "aria-valuenow": div2_aria_valuenow_value
        },
        dirty & /*internalAttrs*/
        256 && /*internalAttrs*/
        ctx2[8],
        dirty & /*$$restProps*/
        4096 && /*$$restProps*/
        ctx2[12]
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
        detach(div2);
      }
      ctx[15](null);
      destroy_each(each_blocks, detaching);
      ctx[16](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance_1$4($$self, $$props, $$invalidate) {
  const omit_props_names = ["use", "class", "indeterminate", "closed", "progress", "fourColor", "getElement"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { indeterminate = false } = $$props;
  let { closed = false } = $$props;
  let { progress = 0 } = $$props;
  let { fourColor = false } = $$props;
  let element2;
  let instance2;
  let internalClasses = {};
  let internalAttrs = {};
  let determinateCircleAttrs = {};
  let determinateCircle;
  onMount(() => {
    $$invalidate(14, instance2 = new MDCCircularProgressFoundation({
      addClass,
      getDeterminateCircleAttribute: getDeterminateCircleAttr,
      hasClass,
      removeClass,
      removeAttribute: removeAttr,
      setAttribute: addAttr,
      setDeterminateCircleAttribute: addDeterminateCircleAttr
    }));
    instance2.init();
    return () => {
      instance2.destroy();
    };
  });
  function hasClass(className2) {
    return className2 in internalClasses ? internalClasses[className2] : getElement().classList.contains(className2);
  }
  function addClass(className2) {
    if (!internalClasses[className2]) {
      $$invalidate(7, internalClasses[className2] = true, internalClasses);
    }
  }
  function removeClass(className2) {
    if (!(className2 in internalClasses) || internalClasses[className2]) {
      $$invalidate(7, internalClasses[className2] = false, internalClasses);
    }
  }
  function addAttr(name, value) {
    if (internalAttrs[name] !== value) {
      $$invalidate(8, internalAttrs[name] = value, internalAttrs);
    }
  }
  function removeAttr(name) {
    if (!(name in internalAttrs) || internalAttrs[name] != null) {
      $$invalidate(8, internalAttrs[name] = void 0, internalAttrs);
    }
  }
  function getDeterminateCircleAttr(name) {
    var _a;
    return name in determinateCircleAttrs ? (_a = determinateCircleAttrs[name]) !== null && _a !== void 0 ? _a : null : determinateCircle.getAttribute(name);
  }
  function addDeterminateCircleAttr(name, value) {
    if (determinateCircleAttrs[name] !== value) {
      $$invalidate(9, determinateCircleAttrs[name] = value, determinateCircleAttrs);
    }
  }
  function getElement() {
    return element2;
  }
  function circle1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      determinateCircle = $$value;
      $$invalidate(10, determinateCircle);
    });
  }
  function div2_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(6, element2);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(12, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("indeterminate" in $$new_props)
      $$invalidate(2, indeterminate = $$new_props.indeterminate);
    if ("closed" in $$new_props)
      $$invalidate(3, closed = $$new_props.closed);
    if ("progress" in $$new_props)
      $$invalidate(4, progress = $$new_props.progress);
    if ("fourColor" in $$new_props)
      $$invalidate(5, fourColor = $$new_props.fourColor);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*instance, indeterminate*/
    16388) {
      if (instance2 && instance2.isDeterminate() !== !indeterminate) {
        instance2.setDeterminate(!indeterminate);
      }
    }
    if ($$self.$$.dirty & /*instance, progress*/
    16400) {
      if (instance2 && instance2.getProgress() !== progress) {
        instance2.setProgress(progress);
      }
    }
    if ($$self.$$.dirty & /*instance, closed*/
    16392) {
      if (instance2) {
        if (closed) {
          instance2.close();
        } else {
          instance2.open();
        }
      }
    }
  };
  return [
    use,
    className,
    indeterminate,
    closed,
    progress,
    fourColor,
    element2,
    internalClasses,
    internalAttrs,
    determinateCircleAttrs,
    determinateCircle,
    forwardEvents,
    $$restProps,
    getElement,
    instance2,
    circle1_binding,
    div2_binding
  ];
}
class CircularProgress extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance_1$4, create_fragment$7, safe_not_equal, {
      use: 0,
      class: 1,
      indeterminate: 2,
      closed: 3,
      progress: 4,
      fourColor: 5,
      getElement: 13
    });
  }
  get getElement() {
    return this.$$.ctx[13];
  }
}
function create_default_slot$1(ctx) {
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[11].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[13],
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
        if (default_slot.p && (!current || dirty & /*$$scope*/
        8192)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[13],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[13]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[13],
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
function create_fragment$6(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [
    { tag: (
      /*tag*/
      ctx[3]
    ) },
    {
      use: [
        /*forwardEvents*/
        ctx[8],
        .../*use*/
        ctx[0]
      ]
    },
    {
      class: classMap({
        [
          /*className*/
          ctx[1]
        ]: true,
        [
          /*smuiClass*/
          ctx[6]
        ]: true,
        .../*smuiClassMap*/
        ctx[5]
      })
    },
    /*props*/
    ctx[7],
    /*$$restProps*/
    ctx[9]
  ];
  var switch_value = (
    /*component*/
    ctx[2]
  );
  function switch_props(ctx2) {
    let switch_instance_props = {
      $$slots: { default: [create_default_slot$1] },
      $$scope: { ctx: ctx2 }
    };
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return { props: switch_instance_props };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
    ctx[12](switch_instance);
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l(nodes) {
      if (switch_instance)
        claim_component(switch_instance.$$.fragment, nodes);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance)
        mount_component(switch_instance, target, anchor);
      insert_hydration(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const switch_instance_changes = dirty & /*tag, forwardEvents, use, classMap, className, smuiClass, smuiClassMap, props, $$restProps*/
      1003 ? get_spread_update(switch_instance_spread_levels, [
        dirty & /*tag*/
        8 && { tag: (
          /*tag*/
          ctx2[3]
        ) },
        dirty & /*forwardEvents, use*/
        257 && {
          use: [
            /*forwardEvents*/
            ctx2[8],
            .../*use*/
            ctx2[0]
          ]
        },
        dirty & /*classMap, className, smuiClass, smuiClassMap*/
        98 && {
          class: classMap({
            [
              /*className*/
              ctx2[1]
            ]: true,
            [
              /*smuiClass*/
              ctx2[6]
            ]: true,
            .../*smuiClassMap*/
            ctx2[5]
          })
        },
        dirty & /*props*/
        128 && get_spread_object(
          /*props*/
          ctx2[7]
        ),
        dirty & /*$$restProps*/
        512 && get_spread_object(
          /*$$restProps*/
          ctx2[9]
        )
      ]) : {};
      if (dirty & /*$$scope*/
      8192) {
        switch_instance_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (dirty & /*component*/
      4 && switch_value !== (switch_value = /*component*/
      ctx2[2])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component(switch_value, switch_props(ctx2));
          ctx2[12](switch_instance);
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(switch_instance_anchor);
      }
      ctx[12](null);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
const internals = {
  component: SmuiElement,
  tag: "div",
  class: "",
  classMap: {},
  contexts: {},
  props: {}
};
function instance$2($$self, $$props, $$invalidate) {
  const omit_props_names = ["use", "class", "component", "tag", "getElement"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let element2;
  const smuiClass = internals.class;
  const smuiClassMap = {};
  const smuiClassUnsubscribes = [];
  const contexts = internals.contexts;
  const props = internals.props;
  let { component = internals.component } = $$props;
  let { tag = component === SmuiElement ? internals.tag : void 0 } = $$props;
  Object.entries(internals.classMap).forEach(([name, context]) => {
    const store = getContext(context);
    if (store && "subscribe" in store) {
      smuiClassUnsubscribes.push(store.subscribe((value) => {
        $$invalidate(5, smuiClassMap[name] = value, smuiClassMap);
      }));
    }
  });
  const forwardEvents = forwardEventsBuilder(get_current_component());
  for (let context in contexts) {
    if (contexts.hasOwnProperty(context)) {
      setContext(context, contexts[context]);
    }
  }
  onDestroy(() => {
    for (const unsubscribe of smuiClassUnsubscribes) {
      unsubscribe();
    }
  });
  function getElement() {
    return element2.getElement();
  }
  function switch_instance_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(4, element2);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(9, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("component" in $$new_props)
      $$invalidate(2, component = $$new_props.component);
    if ("tag" in $$new_props)
      $$invalidate(3, tag = $$new_props.tag);
    if ("$$scope" in $$new_props)
      $$invalidate(13, $$scope = $$new_props.$$scope);
  };
  return [
    use,
    className,
    component,
    tag,
    element2,
    smuiClassMap,
    smuiClass,
    props,
    forwardEvents,
    $$restProps,
    getElement,
    slots,
    switch_instance_binding,
    $$scope
  ];
}
class ClassAdder extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$6, safe_not_equal, {
      use: 0,
      class: 1,
      component: 2,
      tag: 3,
      getElement: 10
    });
  }
  get getElement() {
    return this.$$.ctx[10];
  }
}
const defaults = Object.assign({}, internals);
function classAdderBuilder(props) {
  return new Proxy(ClassAdder, {
    construct: function(target, args) {
      Object.assign(internals, defaults, props);
      return new target(...args);
    },
    get: function(target, prop) {
      Object.assign(internals, defaults, props);
      return target[prop];
    }
  });
}
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$3 = {
  LABEL_FLOAT_ABOVE: "mdc-floating-label--float-above",
  LABEL_REQUIRED: "mdc-floating-label--required",
  LABEL_SHAKE: "mdc-floating-label--shake",
  ROOT: "mdc-floating-label"
};
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCFloatingLabelFoundation = (
  /** @class */
  function(_super) {
    __extends(MDCFloatingLabelFoundation2, _super);
    function MDCFloatingLabelFoundation2(adapter) {
      var _this = _super.call(this, __assign(__assign({}, MDCFloatingLabelFoundation2.defaultAdapter), adapter)) || this;
      _this.shakeAnimationEndHandler = function() {
        _this.handleShakeAnimationEnd();
      };
      return _this;
    }
    Object.defineProperty(MDCFloatingLabelFoundation2, "cssClasses", {
      get: function() {
        return cssClasses$3;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCFloatingLabelFoundation2, "defaultAdapter", {
      /**
       * See {@link MDCFloatingLabelAdapter} for typing information on parameters and return types.
       */
      get: function() {
        return {
          addClass: function() {
            return void 0;
          },
          removeClass: function() {
            return void 0;
          },
          getWidth: function() {
            return 0;
          },
          registerInteractionHandler: function() {
            return void 0;
          },
          deregisterInteractionHandler: function() {
            return void 0;
          }
        };
      },
      enumerable: false,
      configurable: true
    });
    MDCFloatingLabelFoundation2.prototype.init = function() {
      this.adapter.registerInteractionHandler("animationend", this.shakeAnimationEndHandler);
    };
    MDCFloatingLabelFoundation2.prototype.destroy = function() {
      this.adapter.deregisterInteractionHandler("animationend", this.shakeAnimationEndHandler);
    };
    MDCFloatingLabelFoundation2.prototype.getWidth = function() {
      return this.adapter.getWidth();
    };
    MDCFloatingLabelFoundation2.prototype.shake = function(shouldShake) {
      var LABEL_SHAKE = MDCFloatingLabelFoundation2.cssClasses.LABEL_SHAKE;
      if (shouldShake) {
        this.adapter.addClass(LABEL_SHAKE);
      } else {
        this.adapter.removeClass(LABEL_SHAKE);
      }
    };
    MDCFloatingLabelFoundation2.prototype.float = function(shouldFloat) {
      var _a = MDCFloatingLabelFoundation2.cssClasses, LABEL_FLOAT_ABOVE = _a.LABEL_FLOAT_ABOVE, LABEL_SHAKE = _a.LABEL_SHAKE;
      if (shouldFloat) {
        this.adapter.addClass(LABEL_FLOAT_ABOVE);
      } else {
        this.adapter.removeClass(LABEL_FLOAT_ABOVE);
        this.adapter.removeClass(LABEL_SHAKE);
      }
    };
    MDCFloatingLabelFoundation2.prototype.setRequired = function(isRequired) {
      var LABEL_REQUIRED = MDCFloatingLabelFoundation2.cssClasses.LABEL_REQUIRED;
      if (isRequired) {
        this.adapter.addClass(LABEL_REQUIRED);
      } else {
        this.adapter.removeClass(LABEL_REQUIRED);
      }
    };
    MDCFloatingLabelFoundation2.prototype.handleShakeAnimationEnd = function() {
      var LABEL_SHAKE = MDCFloatingLabelFoundation2.cssClasses.LABEL_SHAKE;
      this.adapter.removeClass(LABEL_SHAKE);
    };
    return MDCFloatingLabelFoundation2;
  }(MDCFoundation)
);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$2 = {
  LINE_RIPPLE_ACTIVE: "mdc-line-ripple--active",
  LINE_RIPPLE_DEACTIVATING: "mdc-line-ripple--deactivating"
};
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCLineRippleFoundation = (
  /** @class */
  function(_super) {
    __extends(MDCLineRippleFoundation2, _super);
    function MDCLineRippleFoundation2(adapter) {
      var _this = _super.call(this, __assign(__assign({}, MDCLineRippleFoundation2.defaultAdapter), adapter)) || this;
      _this.transitionEndHandler = function(evt) {
        _this.handleTransitionEnd(evt);
      };
      return _this;
    }
    Object.defineProperty(MDCLineRippleFoundation2, "cssClasses", {
      get: function() {
        return cssClasses$2;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCLineRippleFoundation2, "defaultAdapter", {
      /**
       * See {@link MDCLineRippleAdapter} for typing information on parameters and return types.
       */
      get: function() {
        return {
          addClass: function() {
            return void 0;
          },
          removeClass: function() {
            return void 0;
          },
          hasClass: function() {
            return false;
          },
          setStyle: function() {
            return void 0;
          },
          registerEventHandler: function() {
            return void 0;
          },
          deregisterEventHandler: function() {
            return void 0;
          }
        };
      },
      enumerable: false,
      configurable: true
    });
    MDCLineRippleFoundation2.prototype.init = function() {
      this.adapter.registerEventHandler("transitionend", this.transitionEndHandler);
    };
    MDCLineRippleFoundation2.prototype.destroy = function() {
      this.adapter.deregisterEventHandler("transitionend", this.transitionEndHandler);
    };
    MDCLineRippleFoundation2.prototype.activate = function() {
      this.adapter.removeClass(cssClasses$2.LINE_RIPPLE_DEACTIVATING);
      this.adapter.addClass(cssClasses$2.LINE_RIPPLE_ACTIVE);
    };
    MDCLineRippleFoundation2.prototype.setRippleCenter = function(xCoordinate) {
      this.adapter.setStyle("transform-origin", xCoordinate + "px center");
    };
    MDCLineRippleFoundation2.prototype.deactivate = function() {
      this.adapter.addClass(cssClasses$2.LINE_RIPPLE_DEACTIVATING);
    };
    MDCLineRippleFoundation2.prototype.handleTransitionEnd = function(evt) {
      var isDeactivating = this.adapter.hasClass(cssClasses$2.LINE_RIPPLE_DEACTIVATING);
      if (evt.propertyName === "opacity") {
        if (isDeactivating) {
          this.adapter.removeClass(cssClasses$2.LINE_RIPPLE_ACTIVE);
          this.adapter.removeClass(cssClasses$2.LINE_RIPPLE_DEACTIVATING);
        }
      }
    };
    return MDCLineRippleFoundation2;
  }(MDCFoundation)
);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var strings$1 = {
  NOTCH_ELEMENT_SELECTOR: ".mdc-notched-outline__notch"
};
var numbers$1 = {
  // This should stay in sync with $mdc-notched-outline-padding * 2.
  NOTCH_ELEMENT_PADDING: 8
};
var cssClasses$1 = {
  NO_LABEL: "mdc-notched-outline--no-label",
  OUTLINE_NOTCHED: "mdc-notched-outline--notched",
  OUTLINE_UPGRADED: "mdc-notched-outline--upgraded"
};
/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCNotchedOutlineFoundation = (
  /** @class */
  function(_super) {
    __extends(MDCNotchedOutlineFoundation2, _super);
    function MDCNotchedOutlineFoundation2(adapter) {
      return _super.call(this, __assign(__assign({}, MDCNotchedOutlineFoundation2.defaultAdapter), adapter)) || this;
    }
    Object.defineProperty(MDCNotchedOutlineFoundation2, "strings", {
      get: function() {
        return strings$1;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCNotchedOutlineFoundation2, "cssClasses", {
      get: function() {
        return cssClasses$1;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCNotchedOutlineFoundation2, "numbers", {
      get: function() {
        return numbers$1;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCNotchedOutlineFoundation2, "defaultAdapter", {
      /**
       * See {@link MDCNotchedOutlineAdapter} for typing information on parameters and return types.
       */
      get: function() {
        return {
          addClass: function() {
            return void 0;
          },
          removeClass: function() {
            return void 0;
          },
          setNotchWidthProperty: function() {
            return void 0;
          },
          removeNotchWidthProperty: function() {
            return void 0;
          }
        };
      },
      enumerable: false,
      configurable: true
    });
    MDCNotchedOutlineFoundation2.prototype.notch = function(notchWidth) {
      var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation2.cssClasses.OUTLINE_NOTCHED;
      if (notchWidth > 0) {
        notchWidth += numbers$1.NOTCH_ELEMENT_PADDING;
      }
      this.adapter.setNotchWidthProperty(notchWidth);
      this.adapter.addClass(OUTLINE_NOTCHED);
    };
    MDCNotchedOutlineFoundation2.prototype.closeNotch = function() {
      var OUTLINE_NOTCHED = MDCNotchedOutlineFoundation2.cssClasses.OUTLINE_NOTCHED;
      this.adapter.removeClass(OUTLINE_NOTCHED);
      this.adapter.removeNotchWidthProperty();
    };
    return MDCNotchedOutlineFoundation2;
  }(MDCFoundation)
);
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var strings = {
  ARIA_CONTROLS: "aria-controls",
  ARIA_DESCRIBEDBY: "aria-describedby",
  INPUT_SELECTOR: ".mdc-text-field__input",
  LABEL_SELECTOR: ".mdc-floating-label",
  LEADING_ICON_SELECTOR: ".mdc-text-field__icon--leading",
  LINE_RIPPLE_SELECTOR: ".mdc-line-ripple",
  OUTLINE_SELECTOR: ".mdc-notched-outline",
  PREFIX_SELECTOR: ".mdc-text-field__affix--prefix",
  SUFFIX_SELECTOR: ".mdc-text-field__affix--suffix",
  TRAILING_ICON_SELECTOR: ".mdc-text-field__icon--trailing"
};
var cssClasses = {
  DISABLED: "mdc-text-field--disabled",
  FOCUSED: "mdc-text-field--focused",
  HELPER_LINE: "mdc-text-field-helper-line",
  INVALID: "mdc-text-field--invalid",
  LABEL_FLOATING: "mdc-text-field--label-floating",
  NO_LABEL: "mdc-text-field--no-label",
  OUTLINED: "mdc-text-field--outlined",
  ROOT: "mdc-text-field",
  TEXTAREA: "mdc-text-field--textarea",
  WITH_LEADING_ICON: "mdc-text-field--with-leading-icon",
  WITH_TRAILING_ICON: "mdc-text-field--with-trailing-icon",
  WITH_INTERNAL_COUNTER: "mdc-text-field--with-internal-counter"
};
var numbers = {
  LABEL_SCALE: 0.75
};
var VALIDATION_ATTR_WHITELIST = [
  "pattern",
  "min",
  "max",
  "required",
  "step",
  "minlength",
  "maxlength"
];
var ALWAYS_FLOAT_TYPES = [
  "color",
  "date",
  "datetime-local",
  "month",
  "range",
  "time",
  "week"
];
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var POINTERDOWN_EVENTS = ["mousedown", "touchstart"];
var INTERACTION_EVENTS = ["click", "keydown"];
var MDCTextFieldFoundation = (
  /** @class */
  function(_super) {
    __extends(MDCTextFieldFoundation2, _super);
    function MDCTextFieldFoundation2(adapter, foundationMap) {
      if (foundationMap === void 0) {
        foundationMap = {};
      }
      var _this = _super.call(this, __assign(__assign({}, MDCTextFieldFoundation2.defaultAdapter), adapter)) || this;
      _this.isFocused = false;
      _this.receivedUserInput = false;
      _this.valid = true;
      _this.useNativeValidation = true;
      _this.validateOnValueChange = true;
      _this.helperText = foundationMap.helperText;
      _this.characterCounter = foundationMap.characterCounter;
      _this.leadingIcon = foundationMap.leadingIcon;
      _this.trailingIcon = foundationMap.trailingIcon;
      _this.inputFocusHandler = function() {
        _this.activateFocus();
      };
      _this.inputBlurHandler = function() {
        _this.deactivateFocus();
      };
      _this.inputInputHandler = function() {
        _this.handleInput();
      };
      _this.setPointerXOffset = function(evt) {
        _this.setTransformOrigin(evt);
      };
      _this.textFieldInteractionHandler = function() {
        _this.handleTextFieldInteraction();
      };
      _this.validationAttributeChangeHandler = function(attributesList) {
        _this.handleValidationAttributeChange(attributesList);
      };
      return _this;
    }
    Object.defineProperty(MDCTextFieldFoundation2, "cssClasses", {
      get: function() {
        return cssClasses;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCTextFieldFoundation2, "strings", {
      get: function() {
        return strings;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCTextFieldFoundation2, "numbers", {
      get: function() {
        return numbers;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCTextFieldFoundation2.prototype, "shouldAlwaysFloat", {
      get: function() {
        var type = this.getNativeInput().type;
        return ALWAYS_FLOAT_TYPES.indexOf(type) >= 0;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCTextFieldFoundation2.prototype, "shouldFloat", {
      get: function() {
        return this.shouldAlwaysFloat || this.isFocused || !!this.getValue() || this.isBadInput();
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCTextFieldFoundation2.prototype, "shouldShake", {
      get: function() {
        return !this.isFocused && !this.isValid() && !!this.getValue();
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCTextFieldFoundation2, "defaultAdapter", {
      /**
       * See {@link MDCTextFieldAdapter} for typing information on parameters and
       * return types.
       */
      get: function() {
        return {
          addClass: function() {
            return void 0;
          },
          removeClass: function() {
            return void 0;
          },
          hasClass: function() {
            return true;
          },
          setInputAttr: function() {
            return void 0;
          },
          removeInputAttr: function() {
            return void 0;
          },
          registerTextFieldInteractionHandler: function() {
            return void 0;
          },
          deregisterTextFieldInteractionHandler: function() {
            return void 0;
          },
          registerInputInteractionHandler: function() {
            return void 0;
          },
          deregisterInputInteractionHandler: function() {
            return void 0;
          },
          registerValidationAttributeChangeHandler: function() {
            return new MutationObserver(function() {
              return void 0;
            });
          },
          deregisterValidationAttributeChangeHandler: function() {
            return void 0;
          },
          getNativeInput: function() {
            return null;
          },
          isFocused: function() {
            return false;
          },
          activateLineRipple: function() {
            return void 0;
          },
          deactivateLineRipple: function() {
            return void 0;
          },
          setLineRippleTransformOrigin: function() {
            return void 0;
          },
          shakeLabel: function() {
            return void 0;
          },
          floatLabel: function() {
            return void 0;
          },
          setLabelRequired: function() {
            return void 0;
          },
          hasLabel: function() {
            return false;
          },
          getLabelWidth: function() {
            return 0;
          },
          hasOutline: function() {
            return false;
          },
          notchOutline: function() {
            return void 0;
          },
          closeOutline: function() {
            return void 0;
          }
        };
      },
      enumerable: false,
      configurable: true
    });
    MDCTextFieldFoundation2.prototype.init = function() {
      var e_1, _a, e_2, _b;
      if (this.adapter.hasLabel() && this.getNativeInput().required) {
        this.adapter.setLabelRequired(true);
      }
      if (this.adapter.isFocused()) {
        this.inputFocusHandler();
      } else if (this.adapter.hasLabel() && this.shouldFloat) {
        this.notchOutline(true);
        this.adapter.floatLabel(true);
        this.styleFloating(true);
      }
      this.adapter.registerInputInteractionHandler("focus", this.inputFocusHandler);
      this.adapter.registerInputInteractionHandler("blur", this.inputBlurHandler);
      this.adapter.registerInputInteractionHandler("input", this.inputInputHandler);
      try {
        for (var POINTERDOWN_EVENTS_1 = __values(POINTERDOWN_EVENTS), POINTERDOWN_EVENTS_1_1 = POINTERDOWN_EVENTS_1.next(); !POINTERDOWN_EVENTS_1_1.done; POINTERDOWN_EVENTS_1_1 = POINTERDOWN_EVENTS_1.next()) {
          var evtType = POINTERDOWN_EVENTS_1_1.value;
          this.adapter.registerInputInteractionHandler(evtType, this.setPointerXOffset);
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (POINTERDOWN_EVENTS_1_1 && !POINTERDOWN_EVENTS_1_1.done && (_a = POINTERDOWN_EVENTS_1.return))
            _a.call(POINTERDOWN_EVENTS_1);
        } finally {
          if (e_1)
            throw e_1.error;
        }
      }
      try {
        for (var INTERACTION_EVENTS_1 = __values(INTERACTION_EVENTS), INTERACTION_EVENTS_1_1 = INTERACTION_EVENTS_1.next(); !INTERACTION_EVENTS_1_1.done; INTERACTION_EVENTS_1_1 = INTERACTION_EVENTS_1.next()) {
          var evtType = INTERACTION_EVENTS_1_1.value;
          this.adapter.registerTextFieldInteractionHandler(evtType, this.textFieldInteractionHandler);
        }
      } catch (e_2_1) {
        e_2 = { error: e_2_1 };
      } finally {
        try {
          if (INTERACTION_EVENTS_1_1 && !INTERACTION_EVENTS_1_1.done && (_b = INTERACTION_EVENTS_1.return))
            _b.call(INTERACTION_EVENTS_1);
        } finally {
          if (e_2)
            throw e_2.error;
        }
      }
      this.validationObserver = this.adapter.registerValidationAttributeChangeHandler(this.validationAttributeChangeHandler);
      this.setcharacterCounter(this.getValue().length);
    };
    MDCTextFieldFoundation2.prototype.destroy = function() {
      var e_3, _a, e_4, _b;
      this.adapter.deregisterInputInteractionHandler("focus", this.inputFocusHandler);
      this.adapter.deregisterInputInteractionHandler("blur", this.inputBlurHandler);
      this.adapter.deregisterInputInteractionHandler("input", this.inputInputHandler);
      try {
        for (var POINTERDOWN_EVENTS_2 = __values(POINTERDOWN_EVENTS), POINTERDOWN_EVENTS_2_1 = POINTERDOWN_EVENTS_2.next(); !POINTERDOWN_EVENTS_2_1.done; POINTERDOWN_EVENTS_2_1 = POINTERDOWN_EVENTS_2.next()) {
          var evtType = POINTERDOWN_EVENTS_2_1.value;
          this.adapter.deregisterInputInteractionHandler(evtType, this.setPointerXOffset);
        }
      } catch (e_3_1) {
        e_3 = { error: e_3_1 };
      } finally {
        try {
          if (POINTERDOWN_EVENTS_2_1 && !POINTERDOWN_EVENTS_2_1.done && (_a = POINTERDOWN_EVENTS_2.return))
            _a.call(POINTERDOWN_EVENTS_2);
        } finally {
          if (e_3)
            throw e_3.error;
        }
      }
      try {
        for (var INTERACTION_EVENTS_2 = __values(INTERACTION_EVENTS), INTERACTION_EVENTS_2_1 = INTERACTION_EVENTS_2.next(); !INTERACTION_EVENTS_2_1.done; INTERACTION_EVENTS_2_1 = INTERACTION_EVENTS_2.next()) {
          var evtType = INTERACTION_EVENTS_2_1.value;
          this.adapter.deregisterTextFieldInteractionHandler(evtType, this.textFieldInteractionHandler);
        }
      } catch (e_4_1) {
        e_4 = { error: e_4_1 };
      } finally {
        try {
          if (INTERACTION_EVENTS_2_1 && !INTERACTION_EVENTS_2_1.done && (_b = INTERACTION_EVENTS_2.return))
            _b.call(INTERACTION_EVENTS_2);
        } finally {
          if (e_4)
            throw e_4.error;
        }
      }
      this.adapter.deregisterValidationAttributeChangeHandler(this.validationObserver);
    };
    MDCTextFieldFoundation2.prototype.handleTextFieldInteraction = function() {
      var nativeInput = this.adapter.getNativeInput();
      if (nativeInput && nativeInput.disabled) {
        return;
      }
      this.receivedUserInput = true;
    };
    MDCTextFieldFoundation2.prototype.handleValidationAttributeChange = function(attributesList) {
      var _this = this;
      attributesList.some(function(attributeName) {
        if (VALIDATION_ATTR_WHITELIST.indexOf(attributeName) > -1) {
          _this.styleValidity(true);
          _this.adapter.setLabelRequired(_this.getNativeInput().required);
          return true;
        }
        return false;
      });
      if (attributesList.indexOf("maxlength") > -1) {
        this.setcharacterCounter(this.getValue().length);
      }
    };
    MDCTextFieldFoundation2.prototype.notchOutline = function(openNotch) {
      if (!this.adapter.hasOutline() || !this.adapter.hasLabel()) {
        return;
      }
      if (openNotch) {
        var labelWidth = this.adapter.getLabelWidth() * numbers.LABEL_SCALE;
        this.adapter.notchOutline(labelWidth);
      } else {
        this.adapter.closeOutline();
      }
    };
    MDCTextFieldFoundation2.prototype.activateFocus = function() {
      this.isFocused = true;
      this.styleFocused(this.isFocused);
      this.adapter.activateLineRipple();
      if (this.adapter.hasLabel()) {
        this.notchOutline(this.shouldFloat);
        this.adapter.floatLabel(this.shouldFloat);
        this.styleFloating(this.shouldFloat);
        this.adapter.shakeLabel(this.shouldShake);
      }
      if (this.helperText && (this.helperText.isPersistent() || !this.helperText.isValidation() || !this.valid)) {
        this.helperText.showToScreenReader();
      }
    };
    MDCTextFieldFoundation2.prototype.setTransformOrigin = function(evt) {
      if (this.isDisabled() || this.adapter.hasOutline()) {
        return;
      }
      var touches = evt.touches;
      var targetEvent = touches ? touches[0] : evt;
      var targetClientRect = targetEvent.target.getBoundingClientRect();
      var normalizedX = targetEvent.clientX - targetClientRect.left;
      this.adapter.setLineRippleTransformOrigin(normalizedX);
    };
    MDCTextFieldFoundation2.prototype.handleInput = function() {
      this.autoCompleteFocus();
      this.setcharacterCounter(this.getValue().length);
    };
    MDCTextFieldFoundation2.prototype.autoCompleteFocus = function() {
      if (!this.receivedUserInput) {
        this.activateFocus();
      }
    };
    MDCTextFieldFoundation2.prototype.deactivateFocus = function() {
      this.isFocused = false;
      this.adapter.deactivateLineRipple();
      var isValid = this.isValid();
      this.styleValidity(isValid);
      this.styleFocused(this.isFocused);
      if (this.adapter.hasLabel()) {
        this.notchOutline(this.shouldFloat);
        this.adapter.floatLabel(this.shouldFloat);
        this.styleFloating(this.shouldFloat);
        this.adapter.shakeLabel(this.shouldShake);
      }
      if (!this.shouldFloat) {
        this.receivedUserInput = false;
      }
    };
    MDCTextFieldFoundation2.prototype.getValue = function() {
      return this.getNativeInput().value;
    };
    MDCTextFieldFoundation2.prototype.setValue = function(value) {
      if (this.getValue() !== value) {
        this.getNativeInput().value = value;
      }
      this.setcharacterCounter(value.length);
      if (this.validateOnValueChange) {
        var isValid = this.isValid();
        this.styleValidity(isValid);
      }
      if (this.adapter.hasLabel()) {
        this.notchOutline(this.shouldFloat);
        this.adapter.floatLabel(this.shouldFloat);
        this.styleFloating(this.shouldFloat);
        if (this.validateOnValueChange) {
          this.adapter.shakeLabel(this.shouldShake);
        }
      }
    };
    MDCTextFieldFoundation2.prototype.isValid = function() {
      return this.useNativeValidation ? this.isNativeInputValid() : this.valid;
    };
    MDCTextFieldFoundation2.prototype.setValid = function(isValid) {
      this.valid = isValid;
      this.styleValidity(isValid);
      var shouldShake = !isValid && !this.isFocused && !!this.getValue();
      if (this.adapter.hasLabel()) {
        this.adapter.shakeLabel(shouldShake);
      }
    };
    MDCTextFieldFoundation2.prototype.setValidateOnValueChange = function(shouldValidate) {
      this.validateOnValueChange = shouldValidate;
    };
    MDCTextFieldFoundation2.prototype.getValidateOnValueChange = function() {
      return this.validateOnValueChange;
    };
    MDCTextFieldFoundation2.prototype.setUseNativeValidation = function(useNativeValidation) {
      this.useNativeValidation = useNativeValidation;
    };
    MDCTextFieldFoundation2.prototype.isDisabled = function() {
      return this.getNativeInput().disabled;
    };
    MDCTextFieldFoundation2.prototype.setDisabled = function(disabled) {
      this.getNativeInput().disabled = disabled;
      this.styleDisabled(disabled);
    };
    MDCTextFieldFoundation2.prototype.setHelperTextContent = function(content) {
      if (this.helperText) {
        this.helperText.setContent(content);
      }
    };
    MDCTextFieldFoundation2.prototype.setLeadingIconAriaLabel = function(label) {
      if (this.leadingIcon) {
        this.leadingIcon.setAriaLabel(label);
      }
    };
    MDCTextFieldFoundation2.prototype.setLeadingIconContent = function(content) {
      if (this.leadingIcon) {
        this.leadingIcon.setContent(content);
      }
    };
    MDCTextFieldFoundation2.prototype.setTrailingIconAriaLabel = function(label) {
      if (this.trailingIcon) {
        this.trailingIcon.setAriaLabel(label);
      }
    };
    MDCTextFieldFoundation2.prototype.setTrailingIconContent = function(content) {
      if (this.trailingIcon) {
        this.trailingIcon.setContent(content);
      }
    };
    MDCTextFieldFoundation2.prototype.setcharacterCounter = function(currentLength) {
      if (!this.characterCounter) {
        return;
      }
      var maxLength = this.getNativeInput().maxLength;
      if (maxLength === -1) {
        throw new Error("MDCTextFieldFoundation: Expected maxlength html property on text input or textarea.");
      }
      this.characterCounter.setCounterValue(currentLength, maxLength);
    };
    MDCTextFieldFoundation2.prototype.isBadInput = function() {
      return this.getNativeInput().validity.badInput || false;
    };
    MDCTextFieldFoundation2.prototype.isNativeInputValid = function() {
      return this.getNativeInput().validity.valid;
    };
    MDCTextFieldFoundation2.prototype.styleValidity = function(isValid) {
      var INVALID = MDCTextFieldFoundation2.cssClasses.INVALID;
      if (isValid) {
        this.adapter.removeClass(INVALID);
      } else {
        this.adapter.addClass(INVALID);
      }
      if (this.helperText) {
        this.helperText.setValidity(isValid);
        var helperTextValidation = this.helperText.isValidation();
        if (!helperTextValidation) {
          return;
        }
        var helperTextVisible = this.helperText.isVisible();
        var helperTextId = this.helperText.getId();
        if (helperTextVisible && helperTextId) {
          this.adapter.setInputAttr(strings.ARIA_DESCRIBEDBY, helperTextId);
        } else {
          this.adapter.removeInputAttr(strings.ARIA_DESCRIBEDBY);
        }
      }
    };
    MDCTextFieldFoundation2.prototype.styleFocused = function(isFocused) {
      var FOCUSED = MDCTextFieldFoundation2.cssClasses.FOCUSED;
      if (isFocused) {
        this.adapter.addClass(FOCUSED);
      } else {
        this.adapter.removeClass(FOCUSED);
      }
    };
    MDCTextFieldFoundation2.prototype.styleDisabled = function(isDisabled) {
      var _a = MDCTextFieldFoundation2.cssClasses, DISABLED = _a.DISABLED, INVALID = _a.INVALID;
      if (isDisabled) {
        this.adapter.addClass(DISABLED);
        this.adapter.removeClass(INVALID);
      } else {
        this.adapter.removeClass(DISABLED);
      }
      if (this.leadingIcon) {
        this.leadingIcon.setDisabled(isDisabled);
      }
      if (this.trailingIcon) {
        this.trailingIcon.setDisabled(isDisabled);
      }
    };
    MDCTextFieldFoundation2.prototype.styleFloating = function(isFloating) {
      var LABEL_FLOATING = MDCTextFieldFoundation2.cssClasses.LABEL_FLOATING;
      if (isFloating) {
        this.adapter.addClass(LABEL_FLOATING);
      } else {
        this.adapter.removeClass(LABEL_FLOATING);
      }
    };
    MDCTextFieldFoundation2.prototype.getNativeInput = function() {
      var nativeInput = this.adapter ? this.adapter.getNativeInput() : null;
      return nativeInput || {
        disabled: false,
        maxLength: -1,
        required: false,
        type: "input",
        validity: {
          badInput: false,
          valid: true
        },
        value: ""
      };
    };
    return MDCTextFieldFoundation2;
  }(MDCFoundation)
);
function create_else_block$1(ctx) {
  let label;
  let label_class_value;
  let label_style_value;
  let label_for_value;
  let useActions_action;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = (
    /*#slots*/
    ctx[22].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[21],
    null
  );
  let label_levels = [
    {
      class: label_class_value = classMap({
        [
          /*className*/
          ctx[3]
        ]: true,
        "mdc-floating-label": true,
        "mdc-floating-label--float-above": (
          /*floatAbove*/
          ctx[0]
        ),
        "mdc-floating-label--required": (
          /*required*/
          ctx[1]
        ),
        .../*internalClasses*/
        ctx[8]
      })
    },
    {
      style: label_style_value = Object.entries(
        /*internalStyles*/
        ctx[9]
      ).map(func_1$1).concat([
        /*style*/
        ctx[4]
      ]).join(" ")
    },
    {
      for: label_for_value = /*forId*/
      ctx[5] || /*inputProps*/
      (ctx[11] ? (
        /*inputProps*/
        ctx[11].id
      ) : void 0)
    },
    /*$$restProps*/
    ctx[12]
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
      label = claim_element(nodes, "LABEL", { class: true, style: true, for: true });
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
      ctx[24](label);
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(useActions_action = useActions.call(
            null,
            label,
            /*use*/
            ctx[2]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[10].call(null, label)
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        2097152)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[21],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[21]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[21],
              dirty,
              null
            ),
            null
          );
        }
      }
      set_attributes(label, label_data = get_spread_update(label_levels, [
        (!current || dirty & /*className, floatAbove, required, internalClasses*/
        267 && label_class_value !== (label_class_value = classMap({
          [
            /*className*/
            ctx2[3]
          ]: true,
          "mdc-floating-label": true,
          "mdc-floating-label--float-above": (
            /*floatAbove*/
            ctx2[0]
          ),
          "mdc-floating-label--required": (
            /*required*/
            ctx2[1]
          ),
          .../*internalClasses*/
          ctx2[8]
        }))) && { class: label_class_value },
        (!current || dirty & /*internalStyles, style*/
        528 && label_style_value !== (label_style_value = Object.entries(
          /*internalStyles*/
          ctx2[9]
        ).map(func_1$1).concat([
          /*style*/
          ctx2[4]
        ]).join(" "))) && { style: label_style_value },
        (!current || dirty & /*forId*/
        32 && label_for_value !== (label_for_value = /*forId*/
        ctx2[5] || /*inputProps*/
        (ctx2[11] ? (
          /*inputProps*/
          ctx2[11].id
        ) : void 0))) && { for: label_for_value },
        dirty & /*$$restProps*/
        4096 && /*$$restProps*/
        ctx2[12]
      ]));
      if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/
      4)
        useActions_action.update.call(
          null,
          /*use*/
          ctx2[2]
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
      ctx[24](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block$2(ctx) {
  let span;
  let span_class_value;
  let span_style_value;
  let useActions_action;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = (
    /*#slots*/
    ctx[22].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[21],
    null
  );
  let span_levels = [
    {
      class: span_class_value = classMap({
        [
          /*className*/
          ctx[3]
        ]: true,
        "mdc-floating-label": true,
        "mdc-floating-label--float-above": (
          /*floatAbove*/
          ctx[0]
        ),
        "mdc-floating-label--required": (
          /*required*/
          ctx[1]
        ),
        .../*internalClasses*/
        ctx[8]
      })
    },
    {
      style: span_style_value = Object.entries(
        /*internalStyles*/
        ctx[9]
      ).map(func$3).concat([
        /*style*/
        ctx[4]
      ]).join(" ")
    },
    /*$$restProps*/
    ctx[12]
  ];
  let span_data = {};
  for (let i = 0; i < span_levels.length; i += 1) {
    span_data = assign(span_data, span_levels[i]);
  }
  return {
    c() {
      span = element("span");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      span = claim_element(nodes, "SPAN", { class: true, style: true });
      var span_nodes = children(span);
      if (default_slot)
        default_slot.l(span_nodes);
      span_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(span, span_data);
    },
    m(target, anchor) {
      insert_hydration(target, span, anchor);
      if (default_slot) {
        default_slot.m(span, null);
      }
      ctx[23](span);
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(useActions_action = useActions.call(
            null,
            span,
            /*use*/
            ctx[2]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[10].call(null, span)
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        2097152)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[21],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[21]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[21],
              dirty,
              null
            ),
            null
          );
        }
      }
      set_attributes(span, span_data = get_spread_update(span_levels, [
        (!current || dirty & /*className, floatAbove, required, internalClasses*/
        267 && span_class_value !== (span_class_value = classMap({
          [
            /*className*/
            ctx2[3]
          ]: true,
          "mdc-floating-label": true,
          "mdc-floating-label--float-above": (
            /*floatAbove*/
            ctx2[0]
          ),
          "mdc-floating-label--required": (
            /*required*/
            ctx2[1]
          ),
          .../*internalClasses*/
          ctx2[8]
        }))) && { class: span_class_value },
        (!current || dirty & /*internalStyles, style*/
        528 && span_style_value !== (span_style_value = Object.entries(
          /*internalStyles*/
          ctx2[9]
        ).map(func$3).concat([
          /*style*/
          ctx2[4]
        ]).join(" "))) && { style: span_style_value },
        dirty & /*$$restProps*/
        4096 && /*$$restProps*/
        ctx2[12]
      ]));
      if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/
      4)
        useActions_action.update.call(
          null,
          /*use*/
          ctx2[2]
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
        detach(span);
      }
      if (default_slot)
        default_slot.d(detaching);
      ctx[23](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_fragment$5(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block$2, create_else_block$1];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*wrapped*/
      ctx2[6]
    )
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
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
      if_blocks[current_block_type_index].m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
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
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
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
      if_blocks[current_block_type_index].d(detaching);
    }
  };
}
const func$3 = ([name, value]) => `${name}: ${value};`;
const func_1$1 = ([name, value]) => `${name}: ${value};`;
function instance_1$3($$self, $$props, $$invalidate) {
  const omit_props_names = [
    "use",
    "class",
    "style",
    "for",
    "floatAbove",
    "required",
    "wrapped",
    "shake",
    "float",
    "setRequired",
    "getWidth",
    "getElement"
  ];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  var _a;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { style = "" } = $$props;
  let { for: forId = void 0 } = $$props;
  let { floatAbove = false } = $$props;
  let { required = false } = $$props;
  let { wrapped = false } = $$props;
  let element2;
  let instance2;
  let internalClasses = {};
  let internalStyles = {};
  let inputProps = (_a = getContext("SMUI:generic:input:props")) !== null && _a !== void 0 ? _a : {};
  let previousFloatAbove = floatAbove;
  let previousRequired = required;
  onMount(() => {
    $$invalidate(18, instance2 = new MDCFloatingLabelFoundation({
      addClass,
      removeClass,
      getWidth: () => {
        var _a2, _b;
        const el = getElement();
        const clone = el.cloneNode(true);
        (_a2 = el.parentNode) === null || _a2 === void 0 ? void 0 : _a2.appendChild(clone);
        clone.classList.add("smui-floating-label--remove-transition");
        clone.classList.add("smui-floating-label--force-size");
        clone.classList.remove("mdc-floating-label--float-above");
        const scrollWidth = clone.scrollWidth;
        (_b = el.parentNode) === null || _b === void 0 ? void 0 : _b.removeChild(clone);
        return scrollWidth;
      },
      registerInteractionHandler: (evtType, handler) => getElement().addEventListener(evtType, handler),
      deregisterInteractionHandler: (evtType, handler) => getElement().removeEventListener(evtType, handler)
    }));
    const accessor = {
      get element() {
        return getElement();
      },
      addStyle,
      removeStyle
    };
    dispatch(element2, "SMUIFloatingLabel:mount", accessor);
    instance2.init();
    return () => {
      dispatch(element2, "SMUIFloatingLabel:unmount", accessor);
      instance2.destroy();
    };
  });
  function addClass(className2) {
    if (!internalClasses[className2]) {
      $$invalidate(8, internalClasses[className2] = true, internalClasses);
    }
  }
  function removeClass(className2) {
    if (!(className2 in internalClasses) || internalClasses[className2]) {
      $$invalidate(8, internalClasses[className2] = false, internalClasses);
    }
  }
  function addStyle(name, value) {
    if (internalStyles[name] != value) {
      if (value === "" || value == null) {
        delete internalStyles[name];
        $$invalidate(9, internalStyles);
      } else {
        $$invalidate(9, internalStyles[name] = value, internalStyles);
      }
    }
  }
  function removeStyle(name) {
    if (name in internalStyles) {
      delete internalStyles[name];
      $$invalidate(9, internalStyles);
    }
  }
  function shake(shouldShake) {
    instance2.shake(shouldShake);
  }
  function float(shouldFloat) {
    $$invalidate(0, floatAbove = shouldFloat);
  }
  function setRequired(isRequired) {
    $$invalidate(1, required = isRequired);
  }
  function getWidth() {
    return instance2.getWidth();
  }
  function getElement() {
    return element2;
  }
  function span_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(7, element2);
    });
  }
  function label_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(7, element2);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(12, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("use" in $$new_props)
      $$invalidate(2, use = $$new_props.use);
    if ("class" in $$new_props)
      $$invalidate(3, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(4, style = $$new_props.style);
    if ("for" in $$new_props)
      $$invalidate(5, forId = $$new_props.for);
    if ("floatAbove" in $$new_props)
      $$invalidate(0, floatAbove = $$new_props.floatAbove);
    if ("required" in $$new_props)
      $$invalidate(1, required = $$new_props.required);
    if ("wrapped" in $$new_props)
      $$invalidate(6, wrapped = $$new_props.wrapped);
    if ("$$scope" in $$new_props)
      $$invalidate(21, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*instance, previousFloatAbove, floatAbove*/
    786433) {
      if (instance2 && previousFloatAbove !== floatAbove) {
        $$invalidate(19, previousFloatAbove = floatAbove);
        instance2.float(floatAbove);
      }
    }
    if ($$self.$$.dirty & /*instance, previousRequired, required*/
    1310722) {
      if (instance2 && previousRequired !== required) {
        $$invalidate(20, previousRequired = required);
        instance2.setRequired(required);
      }
    }
  };
  return [
    floatAbove,
    required,
    use,
    className,
    style,
    forId,
    wrapped,
    element2,
    internalClasses,
    internalStyles,
    forwardEvents,
    inputProps,
    $$restProps,
    shake,
    float,
    setRequired,
    getWidth,
    getElement,
    instance2,
    previousFloatAbove,
    previousRequired,
    $$scope,
    slots,
    span_binding,
    label_binding
  ];
}
class FloatingLabel extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance_1$3, create_fragment$5, safe_not_equal, {
      use: 2,
      class: 3,
      style: 4,
      for: 5,
      floatAbove: 0,
      required: 1,
      wrapped: 6,
      shake: 13,
      float: 14,
      setRequired: 15,
      getWidth: 16,
      getElement: 17
    });
  }
  get shake() {
    return this.$$.ctx[13];
  }
  get float() {
    return this.$$.ctx[14];
  }
  get setRequired() {
    return this.$$.ctx[15];
  }
  get getWidth() {
    return this.$$.ctx[16];
  }
  get getElement() {
    return this.$$.ctx[17];
  }
}
function create_fragment$4(ctx) {
  let div;
  let div_class_value;
  let div_style_value;
  let useActions_action;
  let mounted;
  let dispose;
  let div_levels = [
    {
      class: div_class_value = classMap({
        [
          /*className*/
          ctx[1]
        ]: true,
        "mdc-line-ripple": true,
        "mdc-line-ripple--active": (
          /*active*/
          ctx[3]
        ),
        .../*internalClasses*/
        ctx[5]
      })
    },
    {
      style: div_style_value = Object.entries(
        /*internalStyles*/
        ctx[6]
      ).map(func$2).concat([
        /*style*/
        ctx[2]
      ]).join(" ")
    },
    /*$$restProps*/
    ctx[8]
  ];
  let div_data = {};
  for (let i = 0; i < div_levels.length; i += 1) {
    div_data = assign(div_data, div_levels[i]);
  }
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
      set_attributes(div, div_data);
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      ctx[13](div);
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
            ctx[7].call(null, div)
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      set_attributes(div, div_data = get_spread_update(div_levels, [
        dirty & /*className, active, internalClasses*/
        42 && div_class_value !== (div_class_value = classMap({
          [
            /*className*/
            ctx2[1]
          ]: true,
          "mdc-line-ripple": true,
          "mdc-line-ripple--active": (
            /*active*/
            ctx2[3]
          ),
          .../*internalClasses*/
          ctx2[5]
        })) && { class: div_class_value },
        dirty & /*internalStyles, style*/
        68 && div_style_value !== (div_style_value = Object.entries(
          /*internalStyles*/
          ctx2[6]
        ).map(func$2).concat([
          /*style*/
          ctx2[2]
        ]).join(" ")) && { style: div_style_value },
        dirty & /*$$restProps*/
        256 && /*$$restProps*/
        ctx2[8]
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
        detach(div);
      }
      ctx[13](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
const func$2 = ([name, value]) => `${name}: ${value};`;
function instance_1$2($$self, $$props, $$invalidate) {
  const omit_props_names = [
    "use",
    "class",
    "style",
    "active",
    "activate",
    "deactivate",
    "setRippleCenter",
    "getElement"
  ];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { style = "" } = $$props;
  let { active = false } = $$props;
  let element2;
  let instance2;
  let internalClasses = {};
  let internalStyles = {};
  onMount(() => {
    instance2 = new MDCLineRippleFoundation({
      addClass,
      removeClass,
      hasClass,
      setStyle: addStyle,
      registerEventHandler: (evtType, handler) => getElement().addEventListener(evtType, handler),
      deregisterEventHandler: (evtType, handler) => getElement().removeEventListener(evtType, handler)
    });
    instance2.init();
    return () => {
      instance2.destroy();
    };
  });
  function hasClass(className2) {
    return className2 in internalClasses ? internalClasses[className2] : getElement().classList.contains(className2);
  }
  function addClass(className2) {
    if (!internalClasses[className2]) {
      $$invalidate(5, internalClasses[className2] = true, internalClasses);
    }
  }
  function removeClass(className2) {
    if (!(className2 in internalClasses) || internalClasses[className2]) {
      $$invalidate(5, internalClasses[className2] = false, internalClasses);
    }
  }
  function addStyle(name, value) {
    if (internalStyles[name] != value) {
      if (value === "" || value == null) {
        delete internalStyles[name];
        $$invalidate(6, internalStyles);
      } else {
        $$invalidate(6, internalStyles[name] = value, internalStyles);
      }
    }
  }
  function activate() {
    instance2.activate();
  }
  function deactivate() {
    instance2.deactivate();
  }
  function setRippleCenter(xCoordinate) {
    instance2.setRippleCenter(xCoordinate);
  }
  function getElement() {
    return element2;
  }
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(4, element2);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(8, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("active" in $$new_props)
      $$invalidate(3, active = $$new_props.active);
  };
  return [
    use,
    className,
    style,
    active,
    element2,
    internalClasses,
    internalStyles,
    forwardEvents,
    $$restProps,
    activate,
    deactivate,
    setRippleCenter,
    getElement,
    div_binding
  ];
}
class LineRipple extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance_1$2, create_fragment$4, safe_not_equal, {
      use: 0,
      class: 1,
      style: 2,
      active: 3,
      activate: 9,
      deactivate: 10,
      setRippleCenter: 11,
      getElement: 12
    });
  }
  get activate() {
    return this.$$.ctx[9];
  }
  get deactivate() {
    return this.$$.ctx[10];
  }
  get setRippleCenter() {
    return this.$$.ctx[11];
  }
  get getElement() {
    return this.$$.ctx[12];
  }
}
function create_if_block$1(ctx) {
  let div;
  let div_style_value;
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[15].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[14],
    null
  );
  return {
    c() {
      div = element("div");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true, style: true });
      var div_nodes = children(div);
      if (default_slot)
        default_slot.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "mdc-notched-outline__notch");
      attr(div, "style", div_style_value = Object.entries(
        /*notchStyles*/
        ctx[7]
      ).map(func$1).join(" "));
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (default_slot) {
        default_slot.m(div, null);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        16384)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[14],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[14]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[14],
              dirty,
              null
            ),
            null
          );
        }
      }
      if (!current || dirty & /*notchStyles*/
      128 && div_style_value !== (div_style_value = Object.entries(
        /*notchStyles*/
        ctx2[7]
      ).map(func$1).join(" "))) {
        attr(div, "style", div_style_value);
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
      if (detaching) {
        detach(div);
      }
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_fragment$3(ctx) {
  let div2;
  let div0;
  let t0;
  let t1;
  let div1;
  let div2_class_value;
  let useActions_action;
  let current;
  let mounted;
  let dispose;
  let if_block = !/*noLabel*/
  ctx[3] && create_if_block$1(ctx);
  let div2_levels = [
    {
      class: div2_class_value = classMap({
        [
          /*className*/
          ctx[1]
        ]: true,
        "mdc-notched-outline": true,
        "mdc-notched-outline--notched": (
          /*notched*/
          ctx[2]
        ),
        "mdc-notched-outline--no-label": (
          /*noLabel*/
          ctx[3]
        ),
        .../*internalClasses*/
        ctx[6]
      })
    },
    /*$$restProps*/
    ctx[10]
  ];
  let div_data_2 = {};
  for (let i = 0; i < div2_levels.length; i += 1) {
    div_data_2 = assign(div_data_2, div2_levels[i]);
  }
  return {
    c() {
      div2 = element("div");
      div0 = element("div");
      t0 = space();
      if (if_block)
        if_block.c();
      t1 = space();
      div1 = element("div");
      this.h();
    },
    l(nodes) {
      div2 = claim_element(nodes, "DIV", { class: true });
      var div2_nodes = children(div2);
      div0 = claim_element(div2_nodes, "DIV", { class: true });
      children(div0).forEach(detach);
      t0 = claim_space(div2_nodes);
      if (if_block)
        if_block.l(div2_nodes);
      t1 = claim_space(div2_nodes);
      div1 = claim_element(div2_nodes, "DIV", { class: true });
      children(div1).forEach(detach);
      div2_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div0, "class", "mdc-notched-outline__leading");
      attr(div1, "class", "mdc-notched-outline__trailing");
      set_attributes(div2, div_data_2);
    },
    m(target, anchor) {
      insert_hydration(target, div2, anchor);
      append_hydration(div2, div0);
      append_hydration(div2, t0);
      if (if_block)
        if_block.m(div2, null);
      append_hydration(div2, t1);
      append_hydration(div2, div1);
      ctx[16](div2);
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(useActions_action = useActions.call(
            null,
            div2,
            /*use*/
            ctx[0]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[8].call(null, div2)
          ),
          listen$1(
            div2,
            "SMUIFloatingLabel:mount",
            /*handleFloatingLabelMount*/
            ctx[9]
          ),
          listen$1(
            div2,
            "SMUIFloatingLabel:unmount",
            /*SMUIFloatingLabel_unmount_handler*/
            ctx[17]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (!/*noLabel*/
      ctx2[3]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*noLabel*/
          8) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$1(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div2, t1);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      set_attributes(div2, div_data_2 = get_spread_update(div2_levels, [
        (!current || dirty & /*className, notched, noLabel, internalClasses*/
        78 && div2_class_value !== (div2_class_value = classMap({
          [
            /*className*/
            ctx2[1]
          ]: true,
          "mdc-notched-outline": true,
          "mdc-notched-outline--notched": (
            /*notched*/
            ctx2[2]
          ),
          "mdc-notched-outline--no-label": (
            /*noLabel*/
            ctx2[3]
          ),
          .../*internalClasses*/
          ctx2[6]
        }))) && { class: div2_class_value },
        dirty & /*$$restProps*/
        1024 && /*$$restProps*/
        ctx2[10]
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
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div2);
      }
      if (if_block)
        if_block.d();
      ctx[16](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
const func$1 = ([name, value]) => `${name}: ${value};`;
function instance_1$1($$self, $$props, $$invalidate) {
  const omit_props_names = ["use", "class", "notched", "noLabel", "notch", "closeNotch", "getElement"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { notched = false } = $$props;
  let { noLabel = false } = $$props;
  let element2;
  let instance2;
  let floatingLabel;
  let internalClasses = {};
  let notchStyles = {};
  onMount(() => {
    instance2 = new MDCNotchedOutlineFoundation({
      addClass,
      removeClass,
      setNotchWidthProperty: (width) => addNotchStyle("width", width + "px"),
      removeNotchWidthProperty: () => removeNotchStyle("width")
    });
    instance2.init();
    return () => {
      instance2.destroy();
    };
  });
  function handleFloatingLabelMount(event) {
    $$invalidate(4, floatingLabel = event.detail);
  }
  function addClass(className2) {
    if (!internalClasses[className2]) {
      $$invalidate(6, internalClasses[className2] = true, internalClasses);
    }
  }
  function removeClass(className2) {
    if (!(className2 in internalClasses) || internalClasses[className2]) {
      $$invalidate(6, internalClasses[className2] = false, internalClasses);
    }
  }
  function addNotchStyle(name, value) {
    if (notchStyles[name] != value) {
      if (value === "" || value == null) {
        delete notchStyles[name];
        $$invalidate(7, notchStyles);
      } else {
        $$invalidate(7, notchStyles[name] = value, notchStyles);
      }
    }
  }
  function removeNotchStyle(name) {
    if (name in notchStyles) {
      delete notchStyles[name];
      $$invalidate(7, notchStyles);
    }
  }
  function notch(notchWidth) {
    instance2.notch(notchWidth);
  }
  function closeNotch() {
    instance2.closeNotch();
  }
  function getElement() {
    return element2;
  }
  function div2_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(5, element2);
    });
  }
  const SMUIFloatingLabel_unmount_handler = () => $$invalidate(4, floatingLabel = void 0);
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(10, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("notched" in $$new_props)
      $$invalidate(2, notched = $$new_props.notched);
    if ("noLabel" in $$new_props)
      $$invalidate(3, noLabel = $$new_props.noLabel);
    if ("$$scope" in $$new_props)
      $$invalidate(14, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*floatingLabel*/
    16) {
      if (floatingLabel) {
        floatingLabel.addStyle("transition-duration", "0s");
        addClass("mdc-notched-outline--upgraded");
        requestAnimationFrame(() => {
          if (floatingLabel) {
            floatingLabel.removeStyle("transition-duration");
          }
        });
      } else {
        removeClass("mdc-notched-outline--upgraded");
      }
    }
  };
  return [
    use,
    className,
    notched,
    noLabel,
    floatingLabel,
    element2,
    internalClasses,
    notchStyles,
    forwardEvents,
    handleFloatingLabelMount,
    $$restProps,
    notch,
    closeNotch,
    getElement,
    $$scope,
    slots,
    div2_binding,
    SMUIFloatingLabel_unmount_handler
  ];
}
class NotchedOutline extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance_1$1, create_fragment$3, safe_not_equal, {
      use: 0,
      class: 1,
      notched: 2,
      noLabel: 3,
      notch: 11,
      closeNotch: 12,
      getElement: 13
    });
  }
  get notch() {
    return this.$$.ctx[11];
  }
  get closeNotch() {
    return this.$$.ctx[12];
  }
  get getElement() {
    return this.$$.ctx[13];
  }
}
const HelperLine = classAdderBuilder({
  class: "mdc-text-field-helper-line",
  tag: "div"
});
const Prefix = classAdderBuilder({
  class: "mdc-text-field__affix mdc-text-field__affix--prefix",
  tag: "span"
});
const Suffix = classAdderBuilder({
  class: "mdc-text-field__affix mdc-text-field__affix--suffix",
  tag: "span"
});
function create_fragment$2(ctx) {
  let input;
  let input_class_value;
  let useActions_action;
  let mounted;
  let dispose;
  let input_levels = [
    {
      class: input_class_value = classMap({
        [
          /*className*/
          ctx[1]
        ]: true,
        "mdc-text-field__input": true
      })
    },
    { type: (
      /*type*/
      ctx[2]
    ) },
    { placeholder: (
      /*placeholder*/
      ctx[3]
    ) },
    /*valueProp*/
    ctx[4],
    /*internalAttrs*/
    ctx[6],
    /*$$restProps*/
    ctx[10]
  ];
  let input_data = {};
  for (let i = 0; i < input_levels.length; i += 1) {
    input_data = assign(input_data, input_levels[i]);
  }
  return {
    c() {
      input = element("input");
      this.h();
    },
    l(nodes) {
      input = claim_element(nodes, "INPUT", {
        class: true,
        type: true,
        placeholder: true
      });
      this.h();
    },
    h() {
      set_attributes(input, input_data);
    },
    m(target, anchor) {
      insert_hydration(target, input, anchor);
      if (input.autofocus)
        input.focus();
      ctx[26](input);
      if (!mounted) {
        dispose = [
          action_destroyer(useActions_action = useActions.call(
            null,
            input,
            /*use*/
            ctx[0]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[7].call(null, input)
          ),
          listen$1(
            input,
            "input",
            /*input_handler*/
            ctx[27]
          ),
          listen$1(
            input,
            "change",
            /*changeHandler*/
            ctx[9]
          ),
          listen$1(
            input,
            "blur",
            /*blur_handler*/
            ctx[24]
          ),
          listen$1(
            input,
            "focus",
            /*focus_handler*/
            ctx[25]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      set_attributes(input, input_data = get_spread_update(input_levels, [
        dirty & /*className*/
        2 && input_class_value !== (input_class_value = classMap({
          [
            /*className*/
            ctx2[1]
          ]: true,
          "mdc-text-field__input": true
        })) && { class: input_class_value },
        dirty & /*type*/
        4 && { type: (
          /*type*/
          ctx2[2]
        ) },
        dirty & /*placeholder*/
        8 && { placeholder: (
          /*placeholder*/
          ctx2[3]
        ) },
        dirty & /*valueProp*/
        16 && /*valueProp*/
        ctx2[4],
        dirty & /*internalAttrs*/
        64 && /*internalAttrs*/
        ctx2[6],
        dirty & /*$$restProps*/
        1024 && /*$$restProps*/
        ctx2[10]
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
        detach(input);
      }
      ctx[26](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function toNumber(value) {
  if (value === "") {
    return Number.NaN;
  }
  return +value;
}
function instance$1($$self, $$props, $$invalidate) {
  const omit_props_names = [
    "use",
    "class",
    "type",
    "placeholder",
    "value",
    "files",
    "dirty",
    "invalid",
    "updateInvalid",
    "emptyValueNull",
    "emptyValueUndefined",
    "getAttr",
    "addAttr",
    "removeAttr",
    "focus",
    "blur",
    "getElement"
  ];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let uninitializedValue = () => {
  };
  function isUninitializedValue(value2) {
    return value2 === uninitializedValue;
  }
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { type = "text" } = $$props;
  let { placeholder = " " } = $$props;
  let { value = uninitializedValue } = $$props;
  const valueUninitialized = isUninitializedValue(value);
  if (valueUninitialized) {
    value = "";
  }
  let { files = null } = $$props;
  let { dirty = false } = $$props;
  let { invalid = false } = $$props;
  let { updateInvalid = true } = $$props;
  let { emptyValueNull = value === null } = $$props;
  if (valueUninitialized && emptyValueNull) {
    value = null;
  }
  let { emptyValueUndefined = value === void 0 } = $$props;
  if (valueUninitialized && emptyValueUndefined) {
    value = void 0;
  }
  let element2;
  let internalAttrs = {};
  let valueProp = {};
  onMount(() => {
    if (updateInvalid) {
      $$invalidate(14, invalid = element2.matches(":invalid"));
    }
  });
  function valueUpdater(e) {
    if (type === "file") {
      $$invalidate(12, files = e.currentTarget.files);
      return;
    }
    if (e.currentTarget.value === "" && emptyValueNull) {
      $$invalidate(11, value = null);
      return;
    }
    if (e.currentTarget.value === "" && emptyValueUndefined) {
      $$invalidate(11, value = void 0);
      return;
    }
    switch (type) {
      case "number":
      case "range":
        $$invalidate(11, value = toNumber(e.currentTarget.value));
        break;
      default:
        $$invalidate(11, value = e.currentTarget.value);
        break;
    }
  }
  function changeHandler(e) {
    if (type === "file" || type === "range") {
      valueUpdater(e);
    }
    $$invalidate(13, dirty = true);
    if (updateInvalid) {
      $$invalidate(14, invalid = element2.matches(":invalid"));
    }
  }
  function getAttr(name) {
    var _a;
    return name in internalAttrs ? (_a = internalAttrs[name]) !== null && _a !== void 0 ? _a : null : getElement().getAttribute(name);
  }
  function addAttr(name, value2) {
    if (internalAttrs[name] !== value2) {
      $$invalidate(6, internalAttrs[name] = value2, internalAttrs);
    }
  }
  function removeAttr(name) {
    if (!(name in internalAttrs) || internalAttrs[name] != null) {
      $$invalidate(6, internalAttrs[name] = void 0, internalAttrs);
    }
  }
  function focus() {
    getElement().focus();
  }
  function blur() {
    getElement().blur();
  }
  function getElement() {
    return element2;
  }
  function blur_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler(event) {
    bubble.call(this, $$self, event);
  }
  function input_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(5, element2);
    });
  }
  const input_handler = (e) => type !== "file" && valueUpdater(e);
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(10, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("type" in $$new_props)
      $$invalidate(2, type = $$new_props.type);
    if ("placeholder" in $$new_props)
      $$invalidate(3, placeholder = $$new_props.placeholder);
    if ("value" in $$new_props)
      $$invalidate(11, value = $$new_props.value);
    if ("files" in $$new_props)
      $$invalidate(12, files = $$new_props.files);
    if ("dirty" in $$new_props)
      $$invalidate(13, dirty = $$new_props.dirty);
    if ("invalid" in $$new_props)
      $$invalidate(14, invalid = $$new_props.invalid);
    if ("updateInvalid" in $$new_props)
      $$invalidate(15, updateInvalid = $$new_props.updateInvalid);
    if ("emptyValueNull" in $$new_props)
      $$invalidate(16, emptyValueNull = $$new_props.emptyValueNull);
    if ("emptyValueUndefined" in $$new_props)
      $$invalidate(17, emptyValueUndefined = $$new_props.emptyValueUndefined);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*type, valueProp, value*/
    2068) {
      if (type === "file") {
        delete valueProp.value;
        $$invalidate(4, valueProp), $$invalidate(2, type), $$invalidate(11, value);
      } else {
        $$invalidate(4, valueProp.value = value == null ? "" : value, valueProp);
      }
    }
  };
  return [
    use,
    className,
    type,
    placeholder,
    valueProp,
    element2,
    internalAttrs,
    forwardEvents,
    valueUpdater,
    changeHandler,
    $$restProps,
    value,
    files,
    dirty,
    invalid,
    updateInvalid,
    emptyValueNull,
    emptyValueUndefined,
    getAttr,
    addAttr,
    removeAttr,
    focus,
    blur,
    getElement,
    blur_handler,
    focus_handler,
    input_binding,
    input_handler
  ];
}
class Input extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$2, safe_not_equal, {
      use: 0,
      class: 1,
      type: 2,
      placeholder: 3,
      value: 11,
      files: 12,
      dirty: 13,
      invalid: 14,
      updateInvalid: 15,
      emptyValueNull: 16,
      emptyValueUndefined: 17,
      getAttr: 18,
      addAttr: 19,
      removeAttr: 20,
      focus: 21,
      blur: 22,
      getElement: 23
    });
  }
  get getAttr() {
    return this.$$.ctx[18];
  }
  get addAttr() {
    return this.$$.ctx[19];
  }
  get removeAttr() {
    return this.$$.ctx[20];
  }
  get focus() {
    return this.$$.ctx[21];
  }
  get blur() {
    return this.$$.ctx[22];
  }
  get getElement() {
    return this.$$.ctx[23];
  }
}
function create_fragment$1(ctx) {
  let textarea;
  let textarea_class_value;
  let textarea_style_value;
  let useActions_action;
  let mounted;
  let dispose;
  let textarea_levels = [
    {
      class: textarea_class_value = classMap({
        [
          /*className*/
          ctx[2]
        ]: true,
        "mdc-text-field__input": true
      })
    },
    {
      style: textarea_style_value = `${/*resizable*/
      ctx[4] ? "" : "resize: none; "}${/*style*/
      ctx[3]}`
    },
    /*internalAttrs*/
    ctx[6],
    /*$$restProps*/
    ctx[9]
  ];
  let textarea_data = {};
  for (let i = 0; i < textarea_levels.length; i += 1) {
    textarea_data = assign(textarea_data, textarea_levels[i]);
  }
  return {
    c() {
      textarea = element("textarea");
      this.h();
    },
    l(nodes) {
      textarea = claim_element(nodes, "TEXTAREA", { class: true, style: true });
      children(textarea).forEach(detach);
      this.h();
    },
    h() {
      set_attributes(textarea, textarea_data);
    },
    m(target, anchor) {
      insert_hydration(target, textarea, anchor);
      if (textarea.autofocus)
        textarea.focus();
      ctx[21](textarea);
      set_input_value(
        textarea,
        /*value*/
        ctx[0]
      );
      if (!mounted) {
        dispose = [
          action_destroyer(useActions_action = useActions.call(
            null,
            textarea,
            /*use*/
            ctx[1]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[7].call(null, textarea)
          ),
          listen$1(
            textarea,
            "change",
            /*changeHandler*/
            ctx[8]
          ),
          listen$1(
            textarea,
            "blur",
            /*blur_handler*/
            ctx[19]
          ),
          listen$1(
            textarea,
            "focus",
            /*focus_handler*/
            ctx[20]
          ),
          listen$1(
            textarea,
            "input",
            /*textarea_input_handler*/
            ctx[22]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      set_attributes(textarea, textarea_data = get_spread_update(textarea_levels, [
        dirty & /*className*/
        4 && textarea_class_value !== (textarea_class_value = classMap({
          [
            /*className*/
            ctx2[2]
          ]: true,
          "mdc-text-field__input": true
        })) && { class: textarea_class_value },
        dirty & /*resizable, style*/
        24 && textarea_style_value !== (textarea_style_value = `${/*resizable*/
        ctx2[4] ? "" : "resize: none; "}${/*style*/
        ctx2[3]}`) && { style: textarea_style_value },
        dirty & /*internalAttrs*/
        64 && /*internalAttrs*/
        ctx2[6],
        dirty & /*$$restProps*/
        512 && /*$$restProps*/
        ctx2[9]
      ]));
      if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/
      2)
        useActions_action.update.call(
          null,
          /*use*/
          ctx2[1]
        );
      if (dirty & /*value*/
      1) {
        set_input_value(
          textarea,
          /*value*/
          ctx2[0]
        );
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(textarea);
      }
      ctx[21](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  const omit_props_names = [
    "use",
    "class",
    "style",
    "value",
    "dirty",
    "invalid",
    "updateInvalid",
    "resizable",
    "getAttr",
    "addAttr",
    "removeAttr",
    "focus",
    "blur",
    "getElement"
  ];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { style = "" } = $$props;
  let { value = "" } = $$props;
  let { dirty = false } = $$props;
  let { invalid = false } = $$props;
  let { updateInvalid = true } = $$props;
  let { resizable = true } = $$props;
  let element2;
  let internalAttrs = {};
  onMount(() => {
    if (updateInvalid) {
      $$invalidate(11, invalid = element2.matches(":invalid"));
    }
  });
  function changeHandler() {
    $$invalidate(10, dirty = true);
    if (updateInvalid) {
      $$invalidate(11, invalid = element2.matches(":invalid"));
    }
  }
  function getAttr(name) {
    var _a;
    return name in internalAttrs ? (_a = internalAttrs[name]) !== null && _a !== void 0 ? _a : null : getElement().getAttribute(name);
  }
  function addAttr(name, value2) {
    if (internalAttrs[name] !== value2) {
      $$invalidate(6, internalAttrs[name] = value2, internalAttrs);
    }
  }
  function removeAttr(name) {
    if (!(name in internalAttrs) || internalAttrs[name] != null) {
      $$invalidate(6, internalAttrs[name] = void 0, internalAttrs);
    }
  }
  function focus() {
    getElement().focus();
  }
  function blur() {
    getElement().blur();
  }
  function getElement() {
    return element2;
  }
  function blur_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler(event) {
    bubble.call(this, $$self, event);
  }
  function textarea_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(5, element2);
    });
  }
  function textarea_input_handler() {
    value = this.value;
    $$invalidate(0, value);
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(9, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("use" in $$new_props)
      $$invalidate(1, use = $$new_props.use);
    if ("class" in $$new_props)
      $$invalidate(2, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(3, style = $$new_props.style);
    if ("value" in $$new_props)
      $$invalidate(0, value = $$new_props.value);
    if ("dirty" in $$new_props)
      $$invalidate(10, dirty = $$new_props.dirty);
    if ("invalid" in $$new_props)
      $$invalidate(11, invalid = $$new_props.invalid);
    if ("updateInvalid" in $$new_props)
      $$invalidate(12, updateInvalid = $$new_props.updateInvalid);
    if ("resizable" in $$new_props)
      $$invalidate(4, resizable = $$new_props.resizable);
  };
  return [
    value,
    use,
    className,
    style,
    resizable,
    element2,
    internalAttrs,
    forwardEvents,
    changeHandler,
    $$restProps,
    dirty,
    invalid,
    updateInvalid,
    getAttr,
    addAttr,
    removeAttr,
    focus,
    blur,
    getElement,
    blur_handler,
    focus_handler,
    textarea_binding,
    textarea_input_handler
  ];
}
class Textarea extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment$1, safe_not_equal, {
      use: 1,
      class: 2,
      style: 3,
      value: 0,
      dirty: 10,
      invalid: 11,
      updateInvalid: 12,
      resizable: 4,
      getAttr: 13,
      addAttr: 14,
      removeAttr: 15,
      focus: 16,
      blur: 17,
      getElement: 18
    });
  }
  get getAttr() {
    return this.$$.ctx[13];
  }
  get addAttr() {
    return this.$$.ctx[14];
  }
  get removeAttr() {
    return this.$$.ctx[15];
  }
  get focus() {
    return this.$$.ctx[16];
  }
  get blur() {
    return this.$$.ctx[17];
  }
  get getElement() {
    return this.$$.ctx[18];
  }
}
const get_helper_slot_changes = (dirty) => ({});
const get_helper_slot_context = (ctx) => ({});
const get_ripple_slot_changes = (dirty) => ({});
const get_ripple_slot_context = (ctx) => ({});
const get_trailingIcon_slot_changes_1 = (dirty) => ({});
const get_trailingIcon_slot_context_1 = (ctx) => ({});
const get_leadingIcon_slot_changes_1 = (dirty) => ({});
const get_leadingIcon_slot_context_1 = (ctx) => ({});
const get_label_slot_changes_2 = (dirty) => ({});
const get_label_slot_context_2 = (ctx) => ({});
const get_trailingIcon_slot_changes = (dirty) => ({});
const get_trailingIcon_slot_context = (ctx) => ({});
const get_suffix_slot_changes = (dirty) => ({});
const get_suffix_slot_context = (ctx) => ({});
const get_prefix_slot_changes = (dirty) => ({});
const get_prefix_slot_context = (ctx) => ({});
const get_internalCounter_slot_changes = (dirty) => ({});
const get_internalCounter_slot_context = (ctx) => ({});
const get_leadingIcon_slot_changes = (dirty) => ({});
const get_leadingIcon_slot_context = (ctx) => ({});
const get_label_slot_changes_1 = (dirty) => ({});
const get_label_slot_context_1 = (ctx) => ({});
const get_label_slot_changes = (dirty) => ({});
const get_label_slot_context = (ctx) => ({});
function create_else_block_1(ctx) {
  let div;
  let t0;
  let contextfragment0;
  let t1;
  let t2;
  let contextfragment1;
  let t3;
  let div_class_value;
  let div_style_value;
  let Ripple_action;
  let useActions_action;
  let current;
  let mounted;
  let dispose;
  const label_slot_template = (
    /*#slots*/
    ctx[56].label
  );
  const label_slot = create_slot(
    label_slot_template,
    ctx,
    /*$$scope*/
    ctx[87],
    get_label_slot_context_2
  );
  contextfragment0 = new ContextFragment({
    props: {
      key: "SMUI:textfield:icon:leading",
      value: true,
      $$slots: { default: [create_default_slot_9] },
      $$scope: { ctx }
    }
  });
  const default_slot_template = (
    /*#slots*/
    ctx[56].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[87],
    null
  );
  contextfragment1 = new ContextFragment({
    props: {
      key: "SMUI:textfield:icon:leading",
      value: false,
      $$slots: { default: [create_default_slot_8] },
      $$scope: { ctx }
    }
  });
  const ripple_slot_template = (
    /*#slots*/
    ctx[56].ripple
  );
  const ripple_slot = create_slot(
    ripple_slot_template,
    ctx,
    /*$$scope*/
    ctx[87],
    get_ripple_slot_context
  );
  let div_levels = [
    {
      class: div_class_value = classMap({
        [
          /*className*/
          ctx[9]
        ]: true,
        "mdc-text-field": true,
        "mdc-text-field--disabled": (
          /*disabled*/
          ctx[12]
        ),
        "mdc-text-field--textarea": (
          /*textarea*/
          ctx[14]
        ),
        "mdc-text-field--filled": (
          /*variant*/
          ctx[15] === "filled"
        ),
        "mdc-text-field--outlined": (
          /*variant*/
          ctx[15] === "outlined"
        ),
        "smui-text-field--standard": (
          /*variant*/
          ctx[15] === "standard" && !/*textarea*/
          ctx[14]
        ),
        "mdc-text-field--no-label": (
          /*noLabel*/
          ctx[16] || !/*$$slots*/
          ctx[47].label
        ),
        "mdc-text-field--with-leading-icon": (
          /*$$slots*/
          ctx[47].leadingIcon
        ),
        "mdc-text-field--with-trailing-icon": (
          /*$$slots*/
          ctx[47].trailingIcon
        ),
        "mdc-text-field--invalid": (
          /*invalid*/
          ctx[1]
        ),
        .../*internalClasses*/
        ctx[25]
      })
    },
    {
      style: div_style_value = Object.entries(
        /*internalStyles*/
        ctx[26]
      ).map(func_1).concat([
        /*style*/
        ctx[10]
      ]).join(" ")
    },
    exclude(
      /*$$restProps*/
      ctx[46],
      ["input$", "label$", "ripple$", "outline$", "helperLine$"]
    )
  ];
  let div_data = {};
  for (let i = 0; i < div_levels.length; i += 1) {
    div_data = assign(div_data, div_levels[i]);
  }
  return {
    c() {
      div = element("div");
      if (label_slot)
        label_slot.c();
      t0 = space();
      create_component(contextfragment0.$$.fragment);
      t1 = space();
      if (default_slot)
        default_slot.c();
      t2 = space();
      create_component(contextfragment1.$$.fragment);
      t3 = space();
      if (ripple_slot)
        ripple_slot.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true, style: true });
      var div_nodes = children(div);
      if (label_slot)
        label_slot.l(div_nodes);
      t0 = claim_space(div_nodes);
      claim_component(contextfragment0.$$.fragment, div_nodes);
      t1 = claim_space(div_nodes);
      if (default_slot)
        default_slot.l(div_nodes);
      t2 = claim_space(div_nodes);
      claim_component(contextfragment1.$$.fragment, div_nodes);
      t3 = claim_space(div_nodes);
      if (ripple_slot)
        ripple_slot.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(div, div_data);
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (label_slot) {
        label_slot.m(div, null);
      }
      append_hydration(div, t0);
      mount_component(contextfragment0, div, null);
      append_hydration(div, t1);
      if (default_slot) {
        default_slot.m(div, null);
      }
      append_hydration(div, t2);
      mount_component(contextfragment1, div, null);
      append_hydration(div, t3);
      if (ripple_slot) {
        ripple_slot.m(div, null);
      }
      ctx[82](div);
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(Ripple_action = Ripple.call(null, div, {
            ripple: (
              /*ripple*/
              ctx[11]
            ),
            unbounded: false,
            addClass: (
              /*addClass*/
              ctx[43]
            ),
            removeClass: (
              /*removeClass*/
              ctx[44]
            ),
            addStyle: (
              /*addStyle*/
              ctx[45]
            )
          })),
          action_destroyer(useActions_action = useActions.call(
            null,
            div,
            /*use*/
            ctx[8]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[34].call(null, div)
          ),
          listen$1(
            div,
            "SMUITextfieldLeadingIcon:mount",
            /*handleLeadingIconMount*/
            ctx[38]
          ),
          listen$1(
            div,
            "SMUITextfieldLeadingIcon:unmount",
            /*SMUITextfieldLeadingIcon_unmount_handler_1*/
            ctx[83]
          ),
          listen$1(
            div,
            "SMUITextfieldTrailingIcon:mount",
            /*handleTrailingIconMount*/
            ctx[39]
          ),
          listen$1(
            div,
            "SMUITextfieldTrailingIcon:unmount",
            /*SMUITextfieldTrailingIcon_unmount_handler_1*/
            ctx[84]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (label_slot) {
        if (label_slot.p && (!current || dirty[2] & /*$$scope*/
        33554432)) {
          update_slot_base(
            label_slot,
            label_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[87],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[87]
            ) : get_slot_changes(
              label_slot_template,
              /*$$scope*/
              ctx2[87],
              dirty,
              get_label_slot_changes_2
            ),
            get_label_slot_context_2
          );
        }
      }
      const contextfragment0_changes = {};
      if (dirty[2] & /*$$scope*/
      33554432) {
        contextfragment0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      contextfragment0.$set(contextfragment0_changes);
      if (default_slot) {
        if (default_slot.p && (!current || dirty[2] & /*$$scope*/
        33554432)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[87],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[87]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[87],
              dirty,
              null
            ),
            null
          );
        }
      }
      const contextfragment1_changes = {};
      if (dirty[2] & /*$$scope*/
      33554432) {
        contextfragment1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      contextfragment1.$set(contextfragment1_changes);
      if (ripple_slot) {
        if (ripple_slot.p && (!current || dirty[2] & /*$$scope*/
        33554432)) {
          update_slot_base(
            ripple_slot,
            ripple_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[87],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[87]
            ) : get_slot_changes(
              ripple_slot_template,
              /*$$scope*/
              ctx2[87],
              dirty,
              get_ripple_slot_changes
            ),
            get_ripple_slot_context
          );
        }
      }
      set_attributes(div, div_data = get_spread_update(div_levels, [
        (!current || dirty[0] & /*className, disabled, textarea, variant, noLabel, invalid, internalClasses*/
        33673730 | dirty[1] & /*$$slots*/
        65536 && div_class_value !== (div_class_value = classMap({
          [
            /*className*/
            ctx2[9]
          ]: true,
          "mdc-text-field": true,
          "mdc-text-field--disabled": (
            /*disabled*/
            ctx2[12]
          ),
          "mdc-text-field--textarea": (
            /*textarea*/
            ctx2[14]
          ),
          "mdc-text-field--filled": (
            /*variant*/
            ctx2[15] === "filled"
          ),
          "mdc-text-field--outlined": (
            /*variant*/
            ctx2[15] === "outlined"
          ),
          "smui-text-field--standard": (
            /*variant*/
            ctx2[15] === "standard" && !/*textarea*/
            ctx2[14]
          ),
          "mdc-text-field--no-label": (
            /*noLabel*/
            ctx2[16] || !/*$$slots*/
            ctx2[47].label
          ),
          "mdc-text-field--with-leading-icon": (
            /*$$slots*/
            ctx2[47].leadingIcon
          ),
          "mdc-text-field--with-trailing-icon": (
            /*$$slots*/
            ctx2[47].trailingIcon
          ),
          "mdc-text-field--invalid": (
            /*invalid*/
            ctx2[1]
          ),
          .../*internalClasses*/
          ctx2[25]
        }))) && { class: div_class_value },
        (!current || dirty[0] & /*internalStyles, style*/
        67109888 && div_style_value !== (div_style_value = Object.entries(
          /*internalStyles*/
          ctx2[26]
        ).map(func_1).concat([
          /*style*/
          ctx2[10]
        ]).join(" "))) && { style: div_style_value },
        dirty[1] & /*$$restProps*/
        32768 && exclude(
          /*$$restProps*/
          ctx2[46],
          ["input$", "label$", "ripple$", "outline$", "helperLine$"]
        )
      ]));
      if (Ripple_action && is_function(Ripple_action.update) && dirty[0] & /*ripple*/
      2048)
        Ripple_action.update.call(null, {
          ripple: (
            /*ripple*/
            ctx2[11]
          ),
          unbounded: false,
          addClass: (
            /*addClass*/
            ctx2[43]
          ),
          removeClass: (
            /*removeClass*/
            ctx2[44]
          ),
          addStyle: (
            /*addStyle*/
            ctx2[45]
          )
        });
      if (useActions_action && is_function(useActions_action.update) && dirty[0] & /*use*/
      256)
        useActions_action.update.call(
          null,
          /*use*/
          ctx2[8]
        );
    },
    i(local) {
      if (current)
        return;
      transition_in(label_slot, local);
      transition_in(contextfragment0.$$.fragment, local);
      transition_in(default_slot, local);
      transition_in(contextfragment1.$$.fragment, local);
      transition_in(ripple_slot, local);
      current = true;
    },
    o(local) {
      transition_out(label_slot, local);
      transition_out(contextfragment0.$$.fragment, local);
      transition_out(default_slot, local);
      transition_out(contextfragment1.$$.fragment, local);
      transition_out(ripple_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (label_slot)
        label_slot.d(detaching);
      destroy_component(contextfragment0);
      if (default_slot)
        default_slot.d(detaching);
      destroy_component(contextfragment1);
      if (ripple_slot)
        ripple_slot.d(detaching);
      ctx[82](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_1(ctx) {
  let label_1;
  let t0;
  let t1;
  let contextfragment0;
  let t2;
  let t3;
  let current_block_type_index;
  let if_block2;
  let t4;
  let contextfragment1;
  let t5;
  let label_1_class_value;
  let label_1_style_value;
  let Ripple_action;
  let useActions_action;
  let current;
  let mounted;
  let dispose;
  let if_block0 = !/*textarea*/
  ctx[14] && /*variant*/
  ctx[15] !== "outlined" && create_if_block_8(ctx);
  let if_block1 = (
    /*textarea*/
    (ctx[14] || /*variant*/
    ctx[15] === "outlined") && create_if_block_6(ctx)
  );
  contextfragment0 = new ContextFragment({
    props: {
      key: "SMUI:textfield:icon:leading",
      value: true,
      $$slots: { default: [create_default_slot_4] },
      $$scope: { ctx }
    }
  });
  const default_slot_template = (
    /*#slots*/
    ctx[56].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[87],
    null
  );
  const if_block_creators = [create_if_block_3, create_else_block];
  const if_blocks = [];
  function select_block_type_1(ctx2, dirty) {
    if (
      /*textarea*/
      ctx2[14] && typeof /*value*/
      ctx2[0] === "string"
    )
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type_1(ctx);
  if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  contextfragment1 = new ContextFragment({
    props: {
      key: "SMUI:textfield:icon:leading",
      value: false,
      $$slots: { default: [create_default_slot_1] },
      $$scope: { ctx }
    }
  });
  let if_block3 = !/*textarea*/
  ctx[14] && /*variant*/
  ctx[15] !== "outlined" && /*ripple*/
  ctx[11] && create_if_block_2(ctx);
  let label_1_levels = [
    {
      class: label_1_class_value = classMap({
        [
          /*className*/
          ctx[9]
        ]: true,
        "mdc-text-field": true,
        "mdc-text-field--disabled": (
          /*disabled*/
          ctx[12]
        ),
        "mdc-text-field--textarea": (
          /*textarea*/
          ctx[14]
        ),
        "mdc-text-field--filled": (
          /*variant*/
          ctx[15] === "filled"
        ),
        "mdc-text-field--outlined": (
          /*variant*/
          ctx[15] === "outlined"
        ),
        "smui-text-field--standard": (
          /*variant*/
          ctx[15] === "standard" && !/*textarea*/
          ctx[14]
        ),
        "mdc-text-field--no-label": (
          /*noLabel*/
          ctx[16] || /*label*/
          ctx[17] == null && !/*$$slots*/
          ctx[47].label
        ),
        "mdc-text-field--label-floating": (
          /*focused*/
          ctx[28] || /*value*/
          ctx[0] != null && /*value*/
          ctx[0] !== ""
        ),
        "mdc-text-field--with-leading-icon": (
          /*isUninitializedValue*/
          ctx[35](
            /*withLeadingIcon*/
            ctx[22]
          ) ? (
            /*$$slots*/
            ctx[47].leadingIcon
          ) : (
            /*withLeadingIcon*/
            ctx[22]
          )
        ),
        "mdc-text-field--with-trailing-icon": (
          /*isUninitializedValue*/
          ctx[35](
            /*withTrailingIcon*/
            ctx[23]
          ) ? (
            /*$$slots*/
            ctx[47].trailingIcon
          ) : (
            /*withTrailingIcon*/
            ctx[23]
          )
        ),
        "mdc-text-field--with-internal-counter": (
          /*textarea*/
          ctx[14] && /*$$slots*/
          ctx[47].internalCounter
        ),
        "mdc-text-field--invalid": (
          /*invalid*/
          ctx[1]
        ),
        .../*internalClasses*/
        ctx[25]
      })
    },
    {
      style: label_1_style_value = Object.entries(
        /*internalStyles*/
        ctx[26]
      ).map(func).concat([
        /*style*/
        ctx[10]
      ]).join(" ")
    },
    {
      for: (
        /* suppress a11y warning, since this is wrapped */
        void 0
      )
    },
    exclude(
      /*$$restProps*/
      ctx[46],
      ["input$", "label$", "ripple$", "outline$", "helperLine$"]
    )
  ];
  let label_data = {};
  for (let i = 0; i < label_1_levels.length; i += 1) {
    label_data = assign(label_data, label_1_levels[i]);
  }
  return {
    c() {
      label_1 = element("label");
      if (if_block0)
        if_block0.c();
      t0 = space();
      if (if_block1)
        if_block1.c();
      t1 = space();
      create_component(contextfragment0.$$.fragment);
      t2 = space();
      if (default_slot)
        default_slot.c();
      t3 = space();
      if_block2.c();
      t4 = space();
      create_component(contextfragment1.$$.fragment);
      t5 = space();
      if (if_block3)
        if_block3.c();
      this.h();
    },
    l(nodes) {
      label_1 = claim_element(nodes, "LABEL", { class: true, style: true, for: true });
      var label_1_nodes = children(label_1);
      if (if_block0)
        if_block0.l(label_1_nodes);
      t0 = claim_space(label_1_nodes);
      if (if_block1)
        if_block1.l(label_1_nodes);
      t1 = claim_space(label_1_nodes);
      claim_component(contextfragment0.$$.fragment, label_1_nodes);
      t2 = claim_space(label_1_nodes);
      if (default_slot)
        default_slot.l(label_1_nodes);
      t3 = claim_space(label_1_nodes);
      if_block2.l(label_1_nodes);
      t4 = claim_space(label_1_nodes);
      claim_component(contextfragment1.$$.fragment, label_1_nodes);
      t5 = claim_space(label_1_nodes);
      if (if_block3)
        if_block3.l(label_1_nodes);
      label_1_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(label_1, label_data);
    },
    m(target, anchor) {
      insert_hydration(target, label_1, anchor);
      if (if_block0)
        if_block0.m(label_1, null);
      append_hydration(label_1, t0);
      if (if_block1)
        if_block1.m(label_1, null);
      append_hydration(label_1, t1);
      mount_component(contextfragment0, label_1, null);
      append_hydration(label_1, t2);
      if (default_slot) {
        default_slot.m(label_1, null);
      }
      append_hydration(label_1, t3);
      if_blocks[current_block_type_index].m(label_1, null);
      append_hydration(label_1, t4);
      mount_component(contextfragment1, label_1, null);
      append_hydration(label_1, t5);
      if (if_block3)
        if_block3.m(label_1, null);
      ctx[78](label_1);
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(Ripple_action = Ripple.call(null, label_1, {
            ripple: !/*textarea*/
            ctx[14] && /*variant*/
            ctx[15] === "filled",
            unbounded: false,
            addClass: (
              /*addClass*/
              ctx[43]
            ),
            removeClass: (
              /*removeClass*/
              ctx[44]
            ),
            addStyle: (
              /*addStyle*/
              ctx[45]
            ),
            eventTarget: (
              /*inputElement*/
              ctx[33]
            ),
            activeTarget: (
              /*inputElement*/
              ctx[33]
            ),
            initPromise: (
              /*initPromise*/
              ctx[37]
            )
          })),
          action_destroyer(useActions_action = useActions.call(
            null,
            label_1,
            /*use*/
            ctx[8]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[34].call(null, label_1)
          ),
          listen$1(
            label_1,
            "SMUITextfieldLeadingIcon:mount",
            /*handleLeadingIconMount*/
            ctx[38]
          ),
          listen$1(
            label_1,
            "SMUITextfieldLeadingIcon:unmount",
            /*SMUITextfieldLeadingIcon_unmount_handler*/
            ctx[79]
          ),
          listen$1(
            label_1,
            "SMUITextfieldTrailingIcon:mount",
            /*handleTrailingIconMount*/
            ctx[39]
          ),
          listen$1(
            label_1,
            "SMUITextfieldTrailingIcon:unmount",
            /*SMUITextfieldTrailingIcon_unmount_handler*/
            ctx[80]
          ),
          listen$1(
            label_1,
            "SMUITextfieldCharacterCounter:mount",
            /*handleCharacterCounterMount*/
            ctx[40]
          ),
          listen$1(
            label_1,
            "SMUITextfieldCharacterCounter:unmount",
            /*SMUITextfieldCharacterCounter_unmount_handler*/
            ctx[81]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (!/*textarea*/
      ctx2[14] && /*variant*/
      ctx2[15] !== "outlined") {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty[0] & /*textarea, variant*/
          49152) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_8(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(label_1, t0);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      if (
        /*textarea*/
        ctx2[14] || /*variant*/
        ctx2[15] === "outlined"
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty[0] & /*textarea, variant*/
          49152) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_6(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(label_1, t1);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
      const contextfragment0_changes = {};
      if (dirty[2] & /*$$scope*/
      33554432) {
        contextfragment0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      contextfragment0.$set(contextfragment0_changes);
      if (default_slot) {
        if (default_slot.p && (!current || dirty[2] & /*$$scope*/
        33554432)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[87],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[87]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[87],
              dirty,
              null
            ),
            null
          );
        }
      }
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_1(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block2 = if_blocks[current_block_type_index];
        if (!if_block2) {
          if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block2.c();
        } else {
          if_block2.p(ctx2, dirty);
        }
        transition_in(if_block2, 1);
        if_block2.m(label_1, t4);
      }
      const contextfragment1_changes = {};
      if (dirty[2] & /*$$scope*/
      33554432) {
        contextfragment1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      contextfragment1.$set(contextfragment1_changes);
      if (!/*textarea*/
      ctx2[14] && /*variant*/
      ctx2[15] !== "outlined" && /*ripple*/
      ctx2[11]) {
        if (if_block3) {
          if_block3.p(ctx2, dirty);
          if (dirty[0] & /*textarea, variant, ripple*/
          51200) {
            transition_in(if_block3, 1);
          }
        } else {
          if_block3 = create_if_block_2(ctx2);
          if_block3.c();
          transition_in(if_block3, 1);
          if_block3.m(label_1, null);
        }
      } else if (if_block3) {
        group_outros();
        transition_out(if_block3, 1, 1, () => {
          if_block3 = null;
        });
        check_outros();
      }
      set_attributes(label_1, label_data = get_spread_update(label_1_levels, [
        (!current || dirty[0] & /*className, disabled, textarea, variant, noLabel, label, focused, value, withLeadingIcon, withTrailingIcon, invalid, internalClasses*/
        314823171 | dirty[1] & /*$$slots*/
        65536 && label_1_class_value !== (label_1_class_value = classMap({
          [
            /*className*/
            ctx2[9]
          ]: true,
          "mdc-text-field": true,
          "mdc-text-field--disabled": (
            /*disabled*/
            ctx2[12]
          ),
          "mdc-text-field--textarea": (
            /*textarea*/
            ctx2[14]
          ),
          "mdc-text-field--filled": (
            /*variant*/
            ctx2[15] === "filled"
          ),
          "mdc-text-field--outlined": (
            /*variant*/
            ctx2[15] === "outlined"
          ),
          "smui-text-field--standard": (
            /*variant*/
            ctx2[15] === "standard" && !/*textarea*/
            ctx2[14]
          ),
          "mdc-text-field--no-label": (
            /*noLabel*/
            ctx2[16] || /*label*/
            ctx2[17] == null && !/*$$slots*/
            ctx2[47].label
          ),
          "mdc-text-field--label-floating": (
            /*focused*/
            ctx2[28] || /*value*/
            ctx2[0] != null && /*value*/
            ctx2[0] !== ""
          ),
          "mdc-text-field--with-leading-icon": (
            /*isUninitializedValue*/
            ctx2[35](
              /*withLeadingIcon*/
              ctx2[22]
            ) ? (
              /*$$slots*/
              ctx2[47].leadingIcon
            ) : (
              /*withLeadingIcon*/
              ctx2[22]
            )
          ),
          "mdc-text-field--with-trailing-icon": (
            /*isUninitializedValue*/
            ctx2[35](
              /*withTrailingIcon*/
              ctx2[23]
            ) ? (
              /*$$slots*/
              ctx2[47].trailingIcon
            ) : (
              /*withTrailingIcon*/
              ctx2[23]
            )
          ),
          "mdc-text-field--with-internal-counter": (
            /*textarea*/
            ctx2[14] && /*$$slots*/
            ctx2[47].internalCounter
          ),
          "mdc-text-field--invalid": (
            /*invalid*/
            ctx2[1]
          ),
          .../*internalClasses*/
          ctx2[25]
        }))) && { class: label_1_class_value },
        (!current || dirty[0] & /*internalStyles, style*/
        67109888 && label_1_style_value !== (label_1_style_value = Object.entries(
          /*internalStyles*/
          ctx2[26]
        ).map(func).concat([
          /*style*/
          ctx2[10]
        ]).join(" "))) && { style: label_1_style_value },
        {
          for: (
            /* suppress a11y warning, since this is wrapped */
            void 0
          )
        },
        dirty[1] & /*$$restProps*/
        32768 && exclude(
          /*$$restProps*/
          ctx2[46],
          ["input$", "label$", "ripple$", "outline$", "helperLine$"]
        )
      ]));
      if (Ripple_action && is_function(Ripple_action.update) && dirty[0] & /*textarea, variant*/
      49152 | dirty[1] & /*inputElement*/
      4)
        Ripple_action.update.call(null, {
          ripple: !/*textarea*/
          ctx2[14] && /*variant*/
          ctx2[15] === "filled",
          unbounded: false,
          addClass: (
            /*addClass*/
            ctx2[43]
          ),
          removeClass: (
            /*removeClass*/
            ctx2[44]
          ),
          addStyle: (
            /*addStyle*/
            ctx2[45]
          ),
          eventTarget: (
            /*inputElement*/
            ctx2[33]
          ),
          activeTarget: (
            /*inputElement*/
            ctx2[33]
          ),
          initPromise: (
            /*initPromise*/
            ctx2[37]
          )
        });
      if (useActions_action && is_function(useActions_action.update) && dirty[0] & /*use*/
      256)
        useActions_action.update.call(
          null,
          /*use*/
          ctx2[8]
        );
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block0);
      transition_in(if_block1);
      transition_in(contextfragment0.$$.fragment, local);
      transition_in(default_slot, local);
      transition_in(if_block2);
      transition_in(contextfragment1.$$.fragment, local);
      transition_in(if_block3);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      transition_out(contextfragment0.$$.fragment, local);
      transition_out(default_slot, local);
      transition_out(if_block2);
      transition_out(contextfragment1.$$.fragment, local);
      transition_out(if_block3);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(label_1);
      }
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
      destroy_component(contextfragment0);
      if (default_slot)
        default_slot.d(detaching);
      if_blocks[current_block_type_index].d();
      destroy_component(contextfragment1);
      if (if_block3)
        if_block3.d();
      ctx[78](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_default_slot_9(ctx) {
  let current;
  const leadingIcon_slot_template = (
    /*#slots*/
    ctx[56].leadingIcon
  );
  const leadingIcon_slot = create_slot(
    leadingIcon_slot_template,
    ctx,
    /*$$scope*/
    ctx[87],
    get_leadingIcon_slot_context_1
  );
  return {
    c() {
      if (leadingIcon_slot)
        leadingIcon_slot.c();
    },
    l(nodes) {
      if (leadingIcon_slot)
        leadingIcon_slot.l(nodes);
    },
    m(target, anchor) {
      if (leadingIcon_slot) {
        leadingIcon_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (leadingIcon_slot) {
        if (leadingIcon_slot.p && (!current || dirty[2] & /*$$scope*/
        33554432)) {
          update_slot_base(
            leadingIcon_slot,
            leadingIcon_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[87],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[87]
            ) : get_slot_changes(
              leadingIcon_slot_template,
              /*$$scope*/
              ctx2[87],
              dirty,
              get_leadingIcon_slot_changes_1
            ),
            get_leadingIcon_slot_context_1
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(leadingIcon_slot, local);
      current = true;
    },
    o(local) {
      transition_out(leadingIcon_slot, local);
      current = false;
    },
    d(detaching) {
      if (leadingIcon_slot)
        leadingIcon_slot.d(detaching);
    }
  };
}
function create_default_slot_8(ctx) {
  let current;
  const trailingIcon_slot_template = (
    /*#slots*/
    ctx[56].trailingIcon
  );
  const trailingIcon_slot = create_slot(
    trailingIcon_slot_template,
    ctx,
    /*$$scope*/
    ctx[87],
    get_trailingIcon_slot_context_1
  );
  return {
    c() {
      if (trailingIcon_slot)
        trailingIcon_slot.c();
    },
    l(nodes) {
      if (trailingIcon_slot)
        trailingIcon_slot.l(nodes);
    },
    m(target, anchor) {
      if (trailingIcon_slot) {
        trailingIcon_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (trailingIcon_slot) {
        if (trailingIcon_slot.p && (!current || dirty[2] & /*$$scope*/
        33554432)) {
          update_slot_base(
            trailingIcon_slot,
            trailingIcon_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[87],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[87]
            ) : get_slot_changes(
              trailingIcon_slot_template,
              /*$$scope*/
              ctx2[87],
              dirty,
              get_trailingIcon_slot_changes_1
            ),
            get_trailingIcon_slot_context_1
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(trailingIcon_slot, local);
      current = true;
    },
    o(local) {
      transition_out(trailingIcon_slot, local);
      current = false;
    },
    d(detaching) {
      if (trailingIcon_slot)
        trailingIcon_slot.d(detaching);
    }
  };
}
function create_if_block_8(ctx) {
  let t;
  let if_block1_anchor;
  let current;
  let if_block0 = (
    /*variant*/
    ctx[15] === "filled" && create_if_block_10()
  );
  let if_block1 = !/*noLabel*/
  ctx[16] && /*label*/
  (ctx[17] != null || /*$$slots*/
  ctx[47].label) && create_if_block_9(ctx);
  return {
    c() {
      if (if_block0)
        if_block0.c();
      t = space();
      if (if_block1)
        if_block1.c();
      if_block1_anchor = empty();
    },
    l(nodes) {
      if (if_block0)
        if_block0.l(nodes);
      t = claim_space(nodes);
      if (if_block1)
        if_block1.l(nodes);
      if_block1_anchor = empty();
    },
    m(target, anchor) {
      if (if_block0)
        if_block0.m(target, anchor);
      insert_hydration(target, t, anchor);
      if (if_block1)
        if_block1.m(target, anchor);
      insert_hydration(target, if_block1_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (
        /*variant*/
        ctx2[15] === "filled"
      ) {
        if (if_block0)
          ;
        else {
          if_block0 = create_if_block_10();
          if_block0.c();
          if_block0.m(t.parentNode, t);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (!/*noLabel*/
      ctx2[16] && /*label*/
      (ctx2[17] != null || /*$$slots*/
      ctx2[47].label)) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty[0] & /*noLabel, label*/
          196608 | dirty[1] & /*$$slots*/
          65536) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_9(ctx2);
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
      transition_in(if_block1);
      current = true;
    },
    o(local) {
      transition_out(if_block1);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
        detach(if_block1_anchor);
      }
      if (if_block0)
        if_block0.d(detaching);
      if (if_block1)
        if_block1.d(detaching);
    }
  };
}
function create_if_block_10(ctx) {
  let span;
  return {
    c() {
      span = element("span");
      this.h();
    },
    l(nodes) {
      span = claim_element(nodes, "SPAN", { class: true });
      children(span).forEach(detach);
      this.h();
    },
    h() {
      attr(span, "class", "mdc-text-field__ripple");
    },
    m(target, anchor) {
      insert_hydration(target, span, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}
function create_if_block_9(ctx) {
  let floatinglabel;
  let current;
  const floatinglabel_spread_levels = [
    {
      floatAbove: (
        /*focused*/
        ctx[28] || /*value*/
        ctx[0] != null && /*value*/
        ctx[0] !== "" && (typeof /*value*/
        ctx[0] !== "number" || !isNaN(
          /*value*/
          ctx[0]
        ))
      )
    },
    { required: (
      /*required*/
      ctx[13]
    ) },
    { wrapped: true },
    prefixFilter(
      /*$$restProps*/
      ctx[46],
      "label$"
    )
  ];
  let floatinglabel_props = {
    $$slots: { default: [create_default_slot_7] },
    $$scope: { ctx }
  };
  for (let i = 0; i < floatinglabel_spread_levels.length; i += 1) {
    floatinglabel_props = assign(floatinglabel_props, floatinglabel_spread_levels[i]);
  }
  floatinglabel = new FloatingLabel({ props: floatinglabel_props });
  ctx[57](floatinglabel);
  return {
    c() {
      create_component(floatinglabel.$$.fragment);
    },
    l(nodes) {
      claim_component(floatinglabel.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(floatinglabel, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const floatinglabel_changes = dirty[0] & /*focused, value, required*/
      268443649 | dirty[1] & /*$$restProps*/
      32768 ? get_spread_update(floatinglabel_spread_levels, [
        dirty[0] & /*focused, value*/
        268435457 && {
          floatAbove: (
            /*focused*/
            ctx2[28] || /*value*/
            ctx2[0] != null && /*value*/
            ctx2[0] !== "" && (typeof /*value*/
            ctx2[0] !== "number" || !isNaN(
              /*value*/
              ctx2[0]
            ))
          )
        },
        dirty[0] & /*required*/
        8192 && { required: (
          /*required*/
          ctx2[13]
        ) },
        floatinglabel_spread_levels[2],
        dirty[1] & /*$$restProps*/
        32768 && get_spread_object(prefixFilter(
          /*$$restProps*/
          ctx2[46],
          "label$"
        ))
      ]) : {};
      if (dirty[0] & /*label*/
      131072 | dirty[2] & /*$$scope*/
      33554432) {
        floatinglabel_changes.$$scope = { dirty, ctx: ctx2 };
      }
      floatinglabel.$set(floatinglabel_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(floatinglabel.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(floatinglabel.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      ctx[57](null);
      destroy_component(floatinglabel, detaching);
    }
  };
}
function create_default_slot_7(ctx) {
  let t_value = (
    /*label*/
    (ctx[17] == null ? "" : (
      /*label*/
      ctx[17]
    )) + ""
  );
  let t;
  let current;
  const label_slot_template = (
    /*#slots*/
    ctx[56].label
  );
  const label_slot = create_slot(
    label_slot_template,
    ctx,
    /*$$scope*/
    ctx[87],
    get_label_slot_context
  );
  return {
    c() {
      t = text(t_value);
      if (label_slot)
        label_slot.c();
    },
    l(nodes) {
      t = claim_text(nodes, t_value);
      if (label_slot)
        label_slot.l(nodes);
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
      if (label_slot) {
        label_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if ((!current || dirty[0] & /*label*/
      131072) && t_value !== (t_value = /*label*/
      (ctx2[17] == null ? "" : (
        /*label*/
        ctx2[17]
      )) + ""))
        set_data(t, t_value);
      if (label_slot) {
        if (label_slot.p && (!current || dirty[2] & /*$$scope*/
        33554432)) {
          update_slot_base(
            label_slot,
            label_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[87],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[87]
            ) : get_slot_changes(
              label_slot_template,
              /*$$scope*/
              ctx2[87],
              dirty,
              get_label_slot_changes
            ),
            get_label_slot_context
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(label_slot, local);
      current = true;
    },
    o(local) {
      transition_out(label_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
      if (label_slot)
        label_slot.d(detaching);
    }
  };
}
function create_if_block_6(ctx) {
  let notchedoutline;
  let current;
  const notchedoutline_spread_levels = [
    {
      noLabel: (
        /*noLabel*/
        ctx[16] || /*label*/
        ctx[17] == null && !/*$$slots*/
        ctx[47].label
      )
    },
    prefixFilter(
      /*$$restProps*/
      ctx[46],
      "outline$"
    )
  ];
  let notchedoutline_props = {
    $$slots: { default: [create_default_slot_5] },
    $$scope: { ctx }
  };
  for (let i = 0; i < notchedoutline_spread_levels.length; i += 1) {
    notchedoutline_props = assign(notchedoutline_props, notchedoutline_spread_levels[i]);
  }
  notchedoutline = new NotchedOutline({ props: notchedoutline_props });
  ctx[59](notchedoutline);
  return {
    c() {
      create_component(notchedoutline.$$.fragment);
    },
    l(nodes) {
      claim_component(notchedoutline.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(notchedoutline, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const notchedoutline_changes = dirty[0] & /*noLabel, label*/
      196608 | dirty[1] & /*$$slots, $$restProps*/
      98304 ? get_spread_update(notchedoutline_spread_levels, [
        dirty[0] & /*noLabel, label*/
        196608 | dirty[1] & /*$$slots*/
        65536 && {
          noLabel: (
            /*noLabel*/
            ctx2[16] || /*label*/
            ctx2[17] == null && !/*$$slots*/
            ctx2[47].label
          )
        },
        dirty[1] & /*$$restProps*/
        32768 && get_spread_object(prefixFilter(
          /*$$restProps*/
          ctx2[46],
          "outline$"
        ))
      ]) : {};
      if (dirty[0] & /*focused, value, required, floatingLabel, label, noLabel*/
      268640289 | dirty[1] & /*$$restProps, $$slots*/
      98304 | dirty[2] & /*$$scope*/
      33554432) {
        notchedoutline_changes.$$scope = { dirty, ctx: ctx2 };
      }
      notchedoutline.$set(notchedoutline_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(notchedoutline.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(notchedoutline.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      ctx[59](null);
      destroy_component(notchedoutline, detaching);
    }
  };
}
function create_if_block_7(ctx) {
  let floatinglabel;
  let current;
  const floatinglabel_spread_levels = [
    {
      floatAbove: (
        /*focused*/
        ctx[28] || /*value*/
        ctx[0] != null && /*value*/
        ctx[0] !== "" && (typeof /*value*/
        ctx[0] !== "number" || !isNaN(
          /*value*/
          ctx[0]
        ))
      )
    },
    { required: (
      /*required*/
      ctx[13]
    ) },
    { wrapped: true },
    prefixFilter(
      /*$$restProps*/
      ctx[46],
      "label$"
    )
  ];
  let floatinglabel_props = {
    $$slots: { default: [create_default_slot_6] },
    $$scope: { ctx }
  };
  for (let i = 0; i < floatinglabel_spread_levels.length; i += 1) {
    floatinglabel_props = assign(floatinglabel_props, floatinglabel_spread_levels[i]);
  }
  floatinglabel = new FloatingLabel({ props: floatinglabel_props });
  ctx[58](floatinglabel);
  return {
    c() {
      create_component(floatinglabel.$$.fragment);
    },
    l(nodes) {
      claim_component(floatinglabel.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(floatinglabel, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const floatinglabel_changes = dirty[0] & /*focused, value, required*/
      268443649 | dirty[1] & /*$$restProps*/
      32768 ? get_spread_update(floatinglabel_spread_levels, [
        dirty[0] & /*focused, value*/
        268435457 && {
          floatAbove: (
            /*focused*/
            ctx2[28] || /*value*/
            ctx2[0] != null && /*value*/
            ctx2[0] !== "" && (typeof /*value*/
            ctx2[0] !== "number" || !isNaN(
              /*value*/
              ctx2[0]
            ))
          )
        },
        dirty[0] & /*required*/
        8192 && { required: (
          /*required*/
          ctx2[13]
        ) },
        floatinglabel_spread_levels[2],
        dirty[1] & /*$$restProps*/
        32768 && get_spread_object(prefixFilter(
          /*$$restProps*/
          ctx2[46],
          "label$"
        ))
      ]) : {};
      if (dirty[0] & /*label*/
      131072 | dirty[2] & /*$$scope*/
      33554432) {
        floatinglabel_changes.$$scope = { dirty, ctx: ctx2 };
      }
      floatinglabel.$set(floatinglabel_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(floatinglabel.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(floatinglabel.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      ctx[58](null);
      destroy_component(floatinglabel, detaching);
    }
  };
}
function create_default_slot_6(ctx) {
  let t_value = (
    /*label*/
    (ctx[17] == null ? "" : (
      /*label*/
      ctx[17]
    )) + ""
  );
  let t;
  let current;
  const label_slot_template = (
    /*#slots*/
    ctx[56].label
  );
  const label_slot = create_slot(
    label_slot_template,
    ctx,
    /*$$scope*/
    ctx[87],
    get_label_slot_context_1
  );
  return {
    c() {
      t = text(t_value);
      if (label_slot)
        label_slot.c();
    },
    l(nodes) {
      t = claim_text(nodes, t_value);
      if (label_slot)
        label_slot.l(nodes);
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
      if (label_slot) {
        label_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if ((!current || dirty[0] & /*label*/
      131072) && t_value !== (t_value = /*label*/
      (ctx2[17] == null ? "" : (
        /*label*/
        ctx2[17]
      )) + ""))
        set_data(t, t_value);
      if (label_slot) {
        if (label_slot.p && (!current || dirty[2] & /*$$scope*/
        33554432)) {
          update_slot_base(
            label_slot,
            label_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[87],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[87]
            ) : get_slot_changes(
              label_slot_template,
              /*$$scope*/
              ctx2[87],
              dirty,
              get_label_slot_changes_1
            ),
            get_label_slot_context_1
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(label_slot, local);
      current = true;
    },
    o(local) {
      transition_out(label_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
      if (label_slot)
        label_slot.d(detaching);
    }
  };
}
function create_default_slot_5(ctx) {
  let if_block_anchor;
  let current;
  let if_block = !/*noLabel*/
  ctx[16] && /*label*/
  (ctx[17] != null || /*$$slots*/
  ctx[47].label) && create_if_block_7(ctx);
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
      if (!/*noLabel*/
      ctx2[16] && /*label*/
      (ctx2[17] != null || /*$$slots*/
      ctx2[47].label)) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty[0] & /*noLabel, label*/
          196608 | dirty[1] & /*$$slots*/
          65536) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_7(ctx2);
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
function create_default_slot_4(ctx) {
  let current;
  const leadingIcon_slot_template = (
    /*#slots*/
    ctx[56].leadingIcon
  );
  const leadingIcon_slot = create_slot(
    leadingIcon_slot_template,
    ctx,
    /*$$scope*/
    ctx[87],
    get_leadingIcon_slot_context
  );
  return {
    c() {
      if (leadingIcon_slot)
        leadingIcon_slot.c();
    },
    l(nodes) {
      if (leadingIcon_slot)
        leadingIcon_slot.l(nodes);
    },
    m(target, anchor) {
      if (leadingIcon_slot) {
        leadingIcon_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (leadingIcon_slot) {
        if (leadingIcon_slot.p && (!current || dirty[2] & /*$$scope*/
        33554432)) {
          update_slot_base(
            leadingIcon_slot,
            leadingIcon_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[87],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[87]
            ) : get_slot_changes(
              leadingIcon_slot_template,
              /*$$scope*/
              ctx2[87],
              dirty,
              get_leadingIcon_slot_changes
            ),
            get_leadingIcon_slot_context
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(leadingIcon_slot, local);
      current = true;
    },
    o(local) {
      transition_out(leadingIcon_slot, local);
      current = false;
    },
    d(detaching) {
      if (leadingIcon_slot)
        leadingIcon_slot.d(detaching);
    }
  };
}
function create_else_block(ctx) {
  let t0;
  let t1;
  let input_1;
  let updating_value;
  let updating_files;
  let updating_dirty;
  let updating_invalid;
  let t2;
  let t3;
  let current;
  const prefix_slot_template = (
    /*#slots*/
    ctx[56].prefix
  );
  const prefix_slot = create_slot(
    prefix_slot_template,
    ctx,
    /*$$scope*/
    ctx[87],
    get_prefix_slot_context
  );
  let if_block0 = (
    /*prefix*/
    ctx[20] != null && create_if_block_5(ctx)
  );
  const input_1_spread_levels = [
    { type: (
      /*type*/
      ctx[18]
    ) },
    { disabled: (
      /*disabled*/
      ctx[12]
    ) },
    { required: (
      /*required*/
      ctx[13]
    ) },
    { updateInvalid: (
      /*updateInvalid*/
      ctx[19]
    ) },
    { "aria-controls": (
      /*helperId*/
      ctx[27]
    ) },
    { "aria-describedby": (
      /*helperId*/
      ctx[27]
    ) },
    /*noLabel*/
    ctx[16] && /*label*/
    ctx[17] != null ? { placeholder: (
      /*label*/
      ctx[17]
    ) } : {},
    prefixFilter(
      /*$$restProps*/
      ctx[46],
      "input$"
    )
  ];
  function input_1_value_binding(value) {
    ctx[69](value);
  }
  function input_1_files_binding(value) {
    ctx[70](value);
  }
  function input_1_dirty_binding(value) {
    ctx[71](value);
  }
  function input_1_invalid_binding(value) {
    ctx[72](value);
  }
  let input_1_props = {};
  for (let i = 0; i < input_1_spread_levels.length; i += 1) {
    input_1_props = assign(input_1_props, input_1_spread_levels[i]);
  }
  if (
    /*value*/
    ctx[0] !== void 0
  ) {
    input_1_props.value = /*value*/
    ctx[0];
  }
  if (
    /*files*/
    ctx[3] !== void 0
  ) {
    input_1_props.files = /*files*/
    ctx[3];
  }
  if (
    /*dirty*/
    ctx[4] !== void 0
  ) {
    input_1_props.dirty = /*dirty*/
    ctx[4];
  }
  if (
    /*invalid*/
    ctx[1] !== void 0
  ) {
    input_1_props.invalid = /*invalid*/
    ctx[1];
  }
  input_1 = new Input({ props: input_1_props });
  ctx[68](input_1);
  binding_callbacks.push(() => bind(input_1, "value", input_1_value_binding));
  binding_callbacks.push(() => bind(input_1, "files", input_1_files_binding));
  binding_callbacks.push(() => bind(input_1, "dirty", input_1_dirty_binding));
  binding_callbacks.push(() => bind(input_1, "invalid", input_1_invalid_binding));
  input_1.$on(
    "blur",
    /*blur_handler_2*/
    ctx[73]
  );
  input_1.$on(
    "focus",
    /*focus_handler_2*/
    ctx[74]
  );
  input_1.$on(
    "blur",
    /*blur_handler_3*/
    ctx[75]
  );
  input_1.$on(
    "focus",
    /*focus_handler_3*/
    ctx[76]
  );
  let if_block1 = (
    /*suffix*/
    ctx[21] != null && create_if_block_4(ctx)
  );
  const suffix_slot_template = (
    /*#slots*/
    ctx[56].suffix
  );
  const suffix_slot = create_slot(
    suffix_slot_template,
    ctx,
    /*$$scope*/
    ctx[87],
    get_suffix_slot_context
  );
  return {
    c() {
      if (prefix_slot)
        prefix_slot.c();
      t0 = space();
      if (if_block0)
        if_block0.c();
      t1 = space();
      create_component(input_1.$$.fragment);
      t2 = space();
      if (if_block1)
        if_block1.c();
      t3 = space();
      if (suffix_slot)
        suffix_slot.c();
    },
    l(nodes) {
      if (prefix_slot)
        prefix_slot.l(nodes);
      t0 = claim_space(nodes);
      if (if_block0)
        if_block0.l(nodes);
      t1 = claim_space(nodes);
      claim_component(input_1.$$.fragment, nodes);
      t2 = claim_space(nodes);
      if (if_block1)
        if_block1.l(nodes);
      t3 = claim_space(nodes);
      if (suffix_slot)
        suffix_slot.l(nodes);
    },
    m(target, anchor) {
      if (prefix_slot) {
        prefix_slot.m(target, anchor);
      }
      insert_hydration(target, t0, anchor);
      if (if_block0)
        if_block0.m(target, anchor);
      insert_hydration(target, t1, anchor);
      mount_component(input_1, target, anchor);
      insert_hydration(target, t2, anchor);
      if (if_block1)
        if_block1.m(target, anchor);
      insert_hydration(target, t3, anchor);
      if (suffix_slot) {
        suffix_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (prefix_slot) {
        if (prefix_slot.p && (!current || dirty[2] & /*$$scope*/
        33554432)) {
          update_slot_base(
            prefix_slot,
            prefix_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[87],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[87]
            ) : get_slot_changes(
              prefix_slot_template,
              /*$$scope*/
              ctx2[87],
              dirty,
              get_prefix_slot_changes
            ),
            get_prefix_slot_context
          );
        }
      }
      if (
        /*prefix*/
        ctx2[20] != null
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty[0] & /*prefix*/
          1048576) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_5(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(t1.parentNode, t1);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      const input_1_changes = dirty[0] & /*type, disabled, required, updateInvalid, helperId, noLabel, label*/
      135213056 | dirty[1] & /*$$restProps*/
      32768 ? get_spread_update(input_1_spread_levels, [
        dirty[0] & /*type*/
        262144 && { type: (
          /*type*/
          ctx2[18]
        ) },
        dirty[0] & /*disabled*/
        4096 && { disabled: (
          /*disabled*/
          ctx2[12]
        ) },
        dirty[0] & /*required*/
        8192 && { required: (
          /*required*/
          ctx2[13]
        ) },
        dirty[0] & /*updateInvalid*/
        524288 && { updateInvalid: (
          /*updateInvalid*/
          ctx2[19]
        ) },
        dirty[0] & /*helperId*/
        134217728 && { "aria-controls": (
          /*helperId*/
          ctx2[27]
        ) },
        dirty[0] & /*helperId*/
        134217728 && { "aria-describedby": (
          /*helperId*/
          ctx2[27]
        ) },
        dirty[0] & /*noLabel, label*/
        196608 && get_spread_object(
          /*noLabel*/
          ctx2[16] && /*label*/
          ctx2[17] != null ? { placeholder: (
            /*label*/
            ctx2[17]
          ) } : {}
        ),
        dirty[1] & /*$$restProps*/
        32768 && get_spread_object(prefixFilter(
          /*$$restProps*/
          ctx2[46],
          "input$"
        ))
      ]) : {};
      if (!updating_value && dirty[0] & /*value*/
      1) {
        updating_value = true;
        input_1_changes.value = /*value*/
        ctx2[0];
        add_flush_callback(() => updating_value = false);
      }
      if (!updating_files && dirty[0] & /*files*/
      8) {
        updating_files = true;
        input_1_changes.files = /*files*/
        ctx2[3];
        add_flush_callback(() => updating_files = false);
      }
      if (!updating_dirty && dirty[0] & /*dirty*/
      16) {
        updating_dirty = true;
        input_1_changes.dirty = /*dirty*/
        ctx2[4];
        add_flush_callback(() => updating_dirty = false);
      }
      if (!updating_invalid && dirty[0] & /*invalid*/
      2) {
        updating_invalid = true;
        input_1_changes.invalid = /*invalid*/
        ctx2[1];
        add_flush_callback(() => updating_invalid = false);
      }
      input_1.$set(input_1_changes);
      if (
        /*suffix*/
        ctx2[21] != null
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty[0] & /*suffix*/
          2097152) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_4(ctx2);
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
      if (suffix_slot) {
        if (suffix_slot.p && (!current || dirty[2] & /*$$scope*/
        33554432)) {
          update_slot_base(
            suffix_slot,
            suffix_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[87],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[87]
            ) : get_slot_changes(
              suffix_slot_template,
              /*$$scope*/
              ctx2[87],
              dirty,
              get_suffix_slot_changes
            ),
            get_suffix_slot_context
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(prefix_slot, local);
      transition_in(if_block0);
      transition_in(input_1.$$.fragment, local);
      transition_in(if_block1);
      transition_in(suffix_slot, local);
      current = true;
    },
    o(local) {
      transition_out(prefix_slot, local);
      transition_out(if_block0);
      transition_out(input_1.$$.fragment, local);
      transition_out(if_block1);
      transition_out(suffix_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t0);
        detach(t1);
        detach(t2);
        detach(t3);
      }
      if (prefix_slot)
        prefix_slot.d(detaching);
      if (if_block0)
        if_block0.d(detaching);
      ctx[68](null);
      destroy_component(input_1, detaching);
      if (if_block1)
        if_block1.d(detaching);
      if (suffix_slot)
        suffix_slot.d(detaching);
    }
  };
}
function create_if_block_3(ctx) {
  let span;
  let textarea_1;
  let updating_value;
  let updating_dirty;
  let updating_invalid;
  let t;
  let span_class_value;
  let current;
  const textarea_1_spread_levels = [
    { disabled: (
      /*disabled*/
      ctx[12]
    ) },
    { required: (
      /*required*/
      ctx[13]
    ) },
    { updateInvalid: (
      /*updateInvalid*/
      ctx[19]
    ) },
    { "aria-controls": (
      /*helperId*/
      ctx[27]
    ) },
    { "aria-describedby": (
      /*helperId*/
      ctx[27]
    ) },
    prefixFilter(
      /*$$restProps*/
      ctx[46],
      "input$"
    )
  ];
  function textarea_1_value_binding(value) {
    ctx[61](value);
  }
  function textarea_1_dirty_binding(value) {
    ctx[62](value);
  }
  function textarea_1_invalid_binding(value) {
    ctx[63](value);
  }
  let textarea_1_props = {};
  for (let i = 0; i < textarea_1_spread_levels.length; i += 1) {
    textarea_1_props = assign(textarea_1_props, textarea_1_spread_levels[i]);
  }
  if (
    /*value*/
    ctx[0] !== void 0
  ) {
    textarea_1_props.value = /*value*/
    ctx[0];
  }
  if (
    /*dirty*/
    ctx[4] !== void 0
  ) {
    textarea_1_props.dirty = /*dirty*/
    ctx[4];
  }
  if (
    /*invalid*/
    ctx[1] !== void 0
  ) {
    textarea_1_props.invalid = /*invalid*/
    ctx[1];
  }
  textarea_1 = new Textarea({ props: textarea_1_props });
  ctx[60](textarea_1);
  binding_callbacks.push(() => bind(textarea_1, "value", textarea_1_value_binding));
  binding_callbacks.push(() => bind(textarea_1, "dirty", textarea_1_dirty_binding));
  binding_callbacks.push(() => bind(textarea_1, "invalid", textarea_1_invalid_binding));
  textarea_1.$on(
    "blur",
    /*blur_handler*/
    ctx[64]
  );
  textarea_1.$on(
    "focus",
    /*focus_handler*/
    ctx[65]
  );
  textarea_1.$on(
    "blur",
    /*blur_handler_1*/
    ctx[66]
  );
  textarea_1.$on(
    "focus",
    /*focus_handler_1*/
    ctx[67]
  );
  const internalCounter_slot_template = (
    /*#slots*/
    ctx[56].internalCounter
  );
  const internalCounter_slot = create_slot(
    internalCounter_slot_template,
    ctx,
    /*$$scope*/
    ctx[87],
    get_internalCounter_slot_context
  );
  return {
    c() {
      span = element("span");
      create_component(textarea_1.$$.fragment);
      t = space();
      if (internalCounter_slot)
        internalCounter_slot.c();
      this.h();
    },
    l(nodes) {
      span = claim_element(nodes, "SPAN", { class: true });
      var span_nodes = children(span);
      claim_component(textarea_1.$$.fragment, span_nodes);
      t = claim_space(span_nodes);
      if (internalCounter_slot)
        internalCounter_slot.l(span_nodes);
      span_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(span, "class", span_class_value = classMap({
        "mdc-text-field__resizer": !("input$resizable" in /*$$restProps*/
        ctx[46]) || /*$$restProps*/
        ctx[46].input$resizable
      }));
    },
    m(target, anchor) {
      insert_hydration(target, span, anchor);
      mount_component(textarea_1, span, null);
      append_hydration(span, t);
      if (internalCounter_slot) {
        internalCounter_slot.m(span, null);
      }
      current = true;
    },
    p(ctx2, dirty) {
      const textarea_1_changes = dirty[0] & /*disabled, required, updateInvalid, helperId*/
      134754304 | dirty[1] & /*$$restProps*/
      32768 ? get_spread_update(textarea_1_spread_levels, [
        dirty[0] & /*disabled*/
        4096 && { disabled: (
          /*disabled*/
          ctx2[12]
        ) },
        dirty[0] & /*required*/
        8192 && { required: (
          /*required*/
          ctx2[13]
        ) },
        dirty[0] & /*updateInvalid*/
        524288 && { updateInvalid: (
          /*updateInvalid*/
          ctx2[19]
        ) },
        dirty[0] & /*helperId*/
        134217728 && { "aria-controls": (
          /*helperId*/
          ctx2[27]
        ) },
        dirty[0] & /*helperId*/
        134217728 && { "aria-describedby": (
          /*helperId*/
          ctx2[27]
        ) },
        dirty[1] & /*$$restProps*/
        32768 && get_spread_object(prefixFilter(
          /*$$restProps*/
          ctx2[46],
          "input$"
        ))
      ]) : {};
      if (!updating_value && dirty[0] & /*value*/
      1) {
        updating_value = true;
        textarea_1_changes.value = /*value*/
        ctx2[0];
        add_flush_callback(() => updating_value = false);
      }
      if (!updating_dirty && dirty[0] & /*dirty*/
      16) {
        updating_dirty = true;
        textarea_1_changes.dirty = /*dirty*/
        ctx2[4];
        add_flush_callback(() => updating_dirty = false);
      }
      if (!updating_invalid && dirty[0] & /*invalid*/
      2) {
        updating_invalid = true;
        textarea_1_changes.invalid = /*invalid*/
        ctx2[1];
        add_flush_callback(() => updating_invalid = false);
      }
      textarea_1.$set(textarea_1_changes);
      if (internalCounter_slot) {
        if (internalCounter_slot.p && (!current || dirty[2] & /*$$scope*/
        33554432)) {
          update_slot_base(
            internalCounter_slot,
            internalCounter_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[87],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[87]
            ) : get_slot_changes(
              internalCounter_slot_template,
              /*$$scope*/
              ctx2[87],
              dirty,
              get_internalCounter_slot_changes
            ),
            get_internalCounter_slot_context
          );
        }
      }
      if (!current || dirty[1] & /*$$restProps*/
      32768 && span_class_value !== (span_class_value = classMap({
        "mdc-text-field__resizer": !("input$resizable" in /*$$restProps*/
        ctx2[46]) || /*$$restProps*/
        ctx2[46].input$resizable
      }))) {
        attr(span, "class", span_class_value);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(textarea_1.$$.fragment, local);
      transition_in(internalCounter_slot, local);
      current = true;
    },
    o(local) {
      transition_out(textarea_1.$$.fragment, local);
      transition_out(internalCounter_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
      ctx[60](null);
      destroy_component(textarea_1);
      if (internalCounter_slot)
        internalCounter_slot.d(detaching);
    }
  };
}
function create_if_block_5(ctx) {
  let prefix_1;
  let current;
  prefix_1 = new Prefix({
    props: {
      $$slots: { default: [create_default_slot_3] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(prefix_1.$$.fragment);
    },
    l(nodes) {
      claim_component(prefix_1.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(prefix_1, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const prefix_1_changes = {};
      if (dirty[0] & /*prefix*/
      1048576 | dirty[2] & /*$$scope*/
      33554432) {
        prefix_1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      prefix_1.$set(prefix_1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(prefix_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(prefix_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(prefix_1, detaching);
    }
  };
}
function create_default_slot_3(ctx) {
  let t;
  return {
    c() {
      t = text(
        /*prefix*/
        ctx[20]
      );
    },
    l(nodes) {
      t = claim_text(
        nodes,
        /*prefix*/
        ctx[20]
      );
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*prefix*/
      1048576)
        set_data(
          t,
          /*prefix*/
          ctx2[20]
        );
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_if_block_4(ctx) {
  let suffix_1;
  let current;
  suffix_1 = new Suffix({
    props: {
      $$slots: { default: [create_default_slot_2] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(suffix_1.$$.fragment);
    },
    l(nodes) {
      claim_component(suffix_1.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(suffix_1, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const suffix_1_changes = {};
      if (dirty[0] & /*suffix*/
      2097152 | dirty[2] & /*$$scope*/
      33554432) {
        suffix_1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      suffix_1.$set(suffix_1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(suffix_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(suffix_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(suffix_1, detaching);
    }
  };
}
function create_default_slot_2(ctx) {
  let t;
  return {
    c() {
      t = text(
        /*suffix*/
        ctx[21]
      );
    },
    l(nodes) {
      t = claim_text(
        nodes,
        /*suffix*/
        ctx[21]
      );
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*suffix*/
      2097152)
        set_data(
          t,
          /*suffix*/
          ctx2[21]
        );
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_default_slot_1(ctx) {
  let current;
  const trailingIcon_slot_template = (
    /*#slots*/
    ctx[56].trailingIcon
  );
  const trailingIcon_slot = create_slot(
    trailingIcon_slot_template,
    ctx,
    /*$$scope*/
    ctx[87],
    get_trailingIcon_slot_context
  );
  return {
    c() {
      if (trailingIcon_slot)
        trailingIcon_slot.c();
    },
    l(nodes) {
      if (trailingIcon_slot)
        trailingIcon_slot.l(nodes);
    },
    m(target, anchor) {
      if (trailingIcon_slot) {
        trailingIcon_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (trailingIcon_slot) {
        if (trailingIcon_slot.p && (!current || dirty[2] & /*$$scope*/
        33554432)) {
          update_slot_base(
            trailingIcon_slot,
            trailingIcon_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[87],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[87]
            ) : get_slot_changes(
              trailingIcon_slot_template,
              /*$$scope*/
              ctx2[87],
              dirty,
              get_trailingIcon_slot_changes
            ),
            get_trailingIcon_slot_context
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(trailingIcon_slot, local);
      current = true;
    },
    o(local) {
      transition_out(trailingIcon_slot, local);
      current = false;
    },
    d(detaching) {
      if (trailingIcon_slot)
        trailingIcon_slot.d(detaching);
    }
  };
}
function create_if_block_2(ctx) {
  let lineripple;
  let current;
  const lineripple_spread_levels = [prefixFilter(
    /*$$restProps*/
    ctx[46],
    "ripple$"
  )];
  let lineripple_props = {};
  for (let i = 0; i < lineripple_spread_levels.length; i += 1) {
    lineripple_props = assign(lineripple_props, lineripple_spread_levels[i]);
  }
  lineripple = new LineRipple({ props: lineripple_props });
  ctx[77](lineripple);
  return {
    c() {
      create_component(lineripple.$$.fragment);
    },
    l(nodes) {
      claim_component(lineripple.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(lineripple, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const lineripple_changes = dirty[1] & /*$$restProps*/
      32768 ? get_spread_update(lineripple_spread_levels, [get_spread_object(prefixFilter(
        /*$$restProps*/
        ctx2[46],
        "ripple$"
      ))]) : {};
      lineripple.$set(lineripple_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(lineripple.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(lineripple.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      ctx[77](null);
      destroy_component(lineripple, detaching);
    }
  };
}
function create_if_block(ctx) {
  let helperline;
  let current;
  const helperline_spread_levels = [prefixFilter(
    /*$$restProps*/
    ctx[46],
    "helperLine$"
  )];
  let helperline_props = {
    $$slots: { default: [create_default_slot] },
    $$scope: { ctx }
  };
  for (let i = 0; i < helperline_spread_levels.length; i += 1) {
    helperline_props = assign(helperline_props, helperline_spread_levels[i]);
  }
  helperline = new HelperLine({ props: helperline_props });
  helperline.$on(
    "SMUITextfieldHelperText:id",
    /*handleHelperTextId*/
    ctx[41]
  );
  helperline.$on(
    "SMUITextfieldHelperText:mount",
    /*handleHelperTextMount*/
    ctx[42]
  );
  helperline.$on(
    "SMUITextfieldHelperText:unmount",
    /*SMUITextfieldHelperText_unmount_handler*/
    ctx[85]
  );
  helperline.$on(
    "SMUITextfieldCharacterCounter:mount",
    /*handleCharacterCounterMount*/
    ctx[40]
  );
  helperline.$on(
    "SMUITextfieldCharacterCounter:unmount",
    /*SMUITextfieldCharacterCounter_unmount_handler_1*/
    ctx[86]
  );
  return {
    c() {
      create_component(helperline.$$.fragment);
    },
    l(nodes) {
      claim_component(helperline.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(helperline, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const helperline_changes = dirty[1] & /*$$restProps*/
      32768 ? get_spread_update(helperline_spread_levels, [get_spread_object(prefixFilter(
        /*$$restProps*/
        ctx2[46],
        "helperLine$"
      ))]) : {};
      if (dirty[2] & /*$$scope*/
      33554432) {
        helperline_changes.$$scope = { dirty, ctx: ctx2 };
      }
      helperline.$set(helperline_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(helperline.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(helperline.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(helperline, detaching);
    }
  };
}
function create_default_slot(ctx) {
  let current;
  const helper_slot_template = (
    /*#slots*/
    ctx[56].helper
  );
  const helper_slot = create_slot(
    helper_slot_template,
    ctx,
    /*$$scope*/
    ctx[87],
    get_helper_slot_context
  );
  return {
    c() {
      if (helper_slot)
        helper_slot.c();
    },
    l(nodes) {
      if (helper_slot)
        helper_slot.l(nodes);
    },
    m(target, anchor) {
      if (helper_slot) {
        helper_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (helper_slot) {
        if (helper_slot.p && (!current || dirty[2] & /*$$scope*/
        33554432)) {
          update_slot_base(
            helper_slot,
            helper_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[87],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[87]
            ) : get_slot_changes(
              helper_slot_template,
              /*$$scope*/
              ctx2[87],
              dirty,
              get_helper_slot_changes
            ),
            get_helper_slot_context
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(helper_slot, local);
      current = true;
    },
    o(local) {
      transition_out(helper_slot, local);
      current = false;
    },
    d(detaching) {
      if (helper_slot)
        helper_slot.d(detaching);
    }
  };
}
function create_fragment(ctx) {
  let current_block_type_index;
  let if_block0;
  let t;
  let if_block1_anchor;
  let current;
  const if_block_creators = [create_if_block_1, create_else_block_1];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*valued*/
      ctx2[36]
    )
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  let if_block1 = (
    /*$$slots*/
    ctx[47].helper && create_if_block(ctx)
  );
  return {
    c() {
      if_block0.c();
      t = space();
      if (if_block1)
        if_block1.c();
      if_block1_anchor = empty();
    },
    l(nodes) {
      if_block0.l(nodes);
      t = claim_space(nodes);
      if (if_block1)
        if_block1.l(nodes);
      if_block1_anchor = empty();
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert_hydration(target, t, anchor);
      if (if_block1)
        if_block1.m(target, anchor);
      insert_hydration(target, if_block1_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if_block0.p(ctx2, dirty);
      if (
        /*$$slots*/
        ctx2[47].helper
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty[1] & /*$$slots*/
          65536) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block(ctx2);
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
        detach(t);
        detach(if_block1_anchor);
      }
      if_blocks[current_block_type_index].d(detaching);
      if (if_block1)
        if_block1.d(detaching);
    }
  };
}
const func = ([name, value]) => `${name}: ${value};`;
const func_1 = ([name, value]) => `${name}: ${value};`;
function instance_1($$self, $$props, $$invalidate) {
  let inputElement;
  const omit_props_names = [
    "use",
    "class",
    "style",
    "ripple",
    "disabled",
    "required",
    "textarea",
    "variant",
    "noLabel",
    "label",
    "type",
    "value",
    "files",
    "invalid",
    "updateInvalid",
    "dirty",
    "prefix",
    "suffix",
    "validateOnValueChange",
    "useNativeValidation",
    "withLeadingIcon",
    "withTrailingIcon",
    "input",
    "floatingLabel",
    "lineRipple",
    "notchedOutline",
    "focus",
    "blur",
    "layout",
    "getElement"
  ];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  const $$slots = compute_slots(slots);
  const { applyPassive: applyPassive2 } = events;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let uninitializedValue = () => {
  };
  function isUninitializedValue(value2) {
    return value2 === uninitializedValue;
  }
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { style = "" } = $$props;
  let { ripple = true } = $$props;
  let { disabled = false } = $$props;
  let { required = false } = $$props;
  let { textarea = false } = $$props;
  let { variant = textarea ? "outlined" : "standard" } = $$props;
  let { noLabel = false } = $$props;
  let { label = void 0 } = $$props;
  let { type = "text" } = $$props;
  let { value = $$restProps.input$emptyValueUndefined ? void 0 : uninitializedValue } = $$props;
  let { files = uninitializedValue } = $$props;
  const valued = !isUninitializedValue(value) || !isUninitializedValue(files);
  if (isUninitializedValue(value)) {
    value = void 0;
  }
  if (isUninitializedValue(files)) {
    files = null;
  }
  let { invalid = uninitializedValue } = $$props;
  let { updateInvalid = isUninitializedValue(invalid) } = $$props;
  if (isUninitializedValue(invalid)) {
    invalid = false;
  }
  let { dirty = false } = $$props;
  let { prefix = void 0 } = $$props;
  let { suffix = void 0 } = $$props;
  let { validateOnValueChange = updateInvalid } = $$props;
  let { useNativeValidation = updateInvalid } = $$props;
  let { withLeadingIcon = uninitializedValue } = $$props;
  let { withTrailingIcon = uninitializedValue } = $$props;
  let { input = void 0 } = $$props;
  let { floatingLabel = void 0 } = $$props;
  let { lineRipple = void 0 } = $$props;
  let { notchedOutline = void 0 } = $$props;
  let element2;
  let instance2;
  let internalClasses = {};
  let internalStyles = {};
  let helperId = void 0;
  let focused = false;
  let addLayoutListener = getContext("SMUI:addLayoutListener");
  let removeLayoutListener;
  let initPromiseResolve;
  let initPromise = new Promise((resolve) => initPromiseResolve = resolve);
  let leadingIcon = void 0;
  let trailingIcon = void 0;
  let helperText = void 0;
  let characterCounter = void 0;
  let previousValue = value;
  if (addLayoutListener) {
    removeLayoutListener = addLayoutListener(layout);
  }
  onMount(() => {
    $$invalidate(54, instance2 = new MDCTextFieldFoundation(
      {
        // getRootAdapterMethods_
        addClass,
        removeClass,
        hasClass,
        registerTextFieldInteractionHandler: (evtType, handler) => getElement().addEventListener(evtType, handler),
        deregisterTextFieldInteractionHandler: (evtType, handler) => getElement().removeEventListener(evtType, handler),
        registerValidationAttributeChangeHandler: (handler) => {
          const getAttributesList = (mutationsList) => {
            return mutationsList.map((mutation) => mutation.attributeName).filter((attributeName) => attributeName);
          };
          const observer = new MutationObserver((mutationsList) => {
            if (useNativeValidation) {
              handler(getAttributesList(mutationsList));
            }
          });
          const config = { attributes: true };
          if (input) {
            observer.observe(input.getElement(), config);
          }
          return observer;
        },
        deregisterValidationAttributeChangeHandler: (observer) => {
          observer.disconnect();
        },
        // getInputAdapterMethods_
        getNativeInput: () => {
          var _a;
          return (_a = input === null || input === void 0 ? void 0 : input.getElement()) !== null && _a !== void 0 ? _a : null;
        },
        setInputAttr: (name, value2) => {
          input === null || input === void 0 ? void 0 : input.addAttr(name, value2);
        },
        removeInputAttr: (name) => {
          input === null || input === void 0 ? void 0 : input.removeAttr(name);
        },
        isFocused: () => document.activeElement === (input === null || input === void 0 ? void 0 : input.getElement()),
        registerInputInteractionHandler: (evtType, handler) => {
          input === null || input === void 0 ? void 0 : input.getElement().addEventListener(evtType, handler, applyPassive2());
        },
        deregisterInputInteractionHandler: (evtType, handler) => {
          input === null || input === void 0 ? void 0 : input.getElement().removeEventListener(evtType, handler, applyPassive2());
        },
        // getLabelAdapterMethods_
        floatLabel: (shouldFloat) => floatingLabel && floatingLabel.float(shouldFloat),
        getLabelWidth: () => floatingLabel ? floatingLabel.getWidth() : 0,
        hasLabel: () => !!floatingLabel,
        shakeLabel: (shouldShake) => floatingLabel && floatingLabel.shake(shouldShake),
        setLabelRequired: (isRequired) => floatingLabel && floatingLabel.setRequired(isRequired),
        // getLineRippleAdapterMethods_
        activateLineRipple: () => lineRipple && lineRipple.activate(),
        deactivateLineRipple: () => lineRipple && lineRipple.deactivate(),
        setLineRippleTransformOrigin: (normalizedX) => lineRipple && lineRipple.setRippleCenter(normalizedX),
        // getOutlineAdapterMethods_
        closeOutline: () => notchedOutline && notchedOutline.closeNotch(),
        hasOutline: () => !!notchedOutline,
        notchOutline: (labelWidth) => notchedOutline && notchedOutline.notch(labelWidth)
      },
      {
        get helperText() {
          return helperText;
        },
        get characterCounter() {
          return characterCounter;
        },
        get leadingIcon() {
          return leadingIcon;
        },
        get trailingIcon() {
          return trailingIcon;
        }
      }
    ));
    if (valued) {
      if (input == null) {
        throw new Error("SMUI Textfield initialized without Input component.");
      }
      instance2.init();
    } else {
      tick().then(() => {
        if (input == null) {
          throw new Error("SMUI Textfield initialized without Input component.");
        }
        instance2.init();
      });
    }
    initPromiseResolve();
    return () => {
      instance2.destroy();
    };
  });
  onDestroy(() => {
    if (removeLayoutListener) {
      removeLayoutListener();
    }
  });
  function handleLeadingIconMount(event) {
    $$invalidate(29, leadingIcon = event.detail);
  }
  function handleTrailingIconMount(event) {
    $$invalidate(30, trailingIcon = event.detail);
  }
  function handleCharacterCounterMount(event) {
    $$invalidate(32, characterCounter = event.detail);
  }
  function handleHelperTextId(event) {
    $$invalidate(27, helperId = event.detail);
  }
  function handleHelperTextMount(event) {
    $$invalidate(31, helperText = event.detail);
  }
  function hasClass(className2) {
    var _a;
    return className2 in internalClasses ? (_a = internalClasses[className2]) !== null && _a !== void 0 ? _a : null : getElement().classList.contains(className2);
  }
  function addClass(className2) {
    if (!internalClasses[className2]) {
      $$invalidate(25, internalClasses[className2] = true, internalClasses);
    }
  }
  function removeClass(className2) {
    if (!(className2 in internalClasses) || internalClasses[className2]) {
      $$invalidate(25, internalClasses[className2] = false, internalClasses);
    }
  }
  function addStyle(name, value2) {
    if (internalStyles[name] != value2) {
      if (value2 === "" || value2 == null) {
        delete internalStyles[name];
        $$invalidate(26, internalStyles);
      } else {
        $$invalidate(26, internalStyles[name] = value2, internalStyles);
      }
    }
  }
  function focus() {
    input === null || input === void 0 ? void 0 : input.focus();
  }
  function blur() {
    input === null || input === void 0 ? void 0 : input.blur();
  }
  function layout() {
    if (instance2) {
      const openNotch = instance2.shouldFloat;
      instance2.notchOutline(openNotch);
    }
  }
  function getElement() {
    return element2;
  }
  function floatinglabel_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      floatingLabel = $$value;
      $$invalidate(5, floatingLabel);
    });
  }
  function floatinglabel_binding_1($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      floatingLabel = $$value;
      $$invalidate(5, floatingLabel);
    });
  }
  function notchedoutline_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      notchedOutline = $$value;
      $$invalidate(7, notchedOutline);
    });
  }
  function textarea_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      input = $$value;
      $$invalidate(2, input);
    });
  }
  function textarea_1_value_binding(value$1) {
    value = value$1;
    $$invalidate(0, value);
  }
  function textarea_1_dirty_binding(value2) {
    dirty = value2;
    $$invalidate(4, dirty);
  }
  function textarea_1_invalid_binding(value2) {
    invalid = value2;
    $$invalidate(1, invalid), $$invalidate(54, instance2), $$invalidate(19, updateInvalid);
  }
  const blur_handler = () => $$invalidate(28, focused = false);
  const focus_handler = () => $$invalidate(28, focused = true);
  const blur_handler_1 = (event) => dispatch(element2, "blur", event);
  const focus_handler_1 = (event) => dispatch(element2, "focus", event);
  function input_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      input = $$value;
      $$invalidate(2, input);
    });
  }
  function input_1_value_binding(value$1) {
    value = value$1;
    $$invalidate(0, value);
  }
  function input_1_files_binding(value2) {
    files = value2;
    $$invalidate(3, files);
  }
  function input_1_dirty_binding(value2) {
    dirty = value2;
    $$invalidate(4, dirty);
  }
  function input_1_invalid_binding(value2) {
    invalid = value2;
    $$invalidate(1, invalid), $$invalidate(54, instance2), $$invalidate(19, updateInvalid);
  }
  const blur_handler_2 = () => $$invalidate(28, focused = false);
  const focus_handler_2 = () => $$invalidate(28, focused = true);
  const blur_handler_3 = (event) => dispatch(element2, "blur", event);
  const focus_handler_3 = (event) => dispatch(element2, "focus", event);
  function lineripple_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      lineRipple = $$value;
      $$invalidate(6, lineRipple);
    });
  }
  function label_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(24, element2);
    });
  }
  const SMUITextfieldLeadingIcon_unmount_handler = () => $$invalidate(29, leadingIcon = void 0);
  const SMUITextfieldTrailingIcon_unmount_handler = () => $$invalidate(30, trailingIcon = void 0);
  const SMUITextfieldCharacterCounter_unmount_handler = () => $$invalidate(32, characterCounter = void 0);
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(24, element2);
    });
  }
  const SMUITextfieldLeadingIcon_unmount_handler_1 = () => $$invalidate(29, leadingIcon = void 0);
  const SMUITextfieldTrailingIcon_unmount_handler_1 = () => $$invalidate(30, trailingIcon = void 0);
  const SMUITextfieldHelperText_unmount_handler = () => {
    $$invalidate(27, helperId = void 0);
    $$invalidate(31, helperText = void 0);
  };
  const SMUITextfieldCharacterCounter_unmount_handler_1 = () => $$invalidate(32, characterCounter = void 0);
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(46, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("use" in $$new_props)
      $$invalidate(8, use = $$new_props.use);
    if ("class" in $$new_props)
      $$invalidate(9, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(10, style = $$new_props.style);
    if ("ripple" in $$new_props)
      $$invalidate(11, ripple = $$new_props.ripple);
    if ("disabled" in $$new_props)
      $$invalidate(12, disabled = $$new_props.disabled);
    if ("required" in $$new_props)
      $$invalidate(13, required = $$new_props.required);
    if ("textarea" in $$new_props)
      $$invalidate(14, textarea = $$new_props.textarea);
    if ("variant" in $$new_props)
      $$invalidate(15, variant = $$new_props.variant);
    if ("noLabel" in $$new_props)
      $$invalidate(16, noLabel = $$new_props.noLabel);
    if ("label" in $$new_props)
      $$invalidate(17, label = $$new_props.label);
    if ("type" in $$new_props)
      $$invalidate(18, type = $$new_props.type);
    if ("value" in $$new_props)
      $$invalidate(0, value = $$new_props.value);
    if ("files" in $$new_props)
      $$invalidate(3, files = $$new_props.files);
    if ("invalid" in $$new_props)
      $$invalidate(1, invalid = $$new_props.invalid);
    if ("updateInvalid" in $$new_props)
      $$invalidate(19, updateInvalid = $$new_props.updateInvalid);
    if ("dirty" in $$new_props)
      $$invalidate(4, dirty = $$new_props.dirty);
    if ("prefix" in $$new_props)
      $$invalidate(20, prefix = $$new_props.prefix);
    if ("suffix" in $$new_props)
      $$invalidate(21, suffix = $$new_props.suffix);
    if ("validateOnValueChange" in $$new_props)
      $$invalidate(48, validateOnValueChange = $$new_props.validateOnValueChange);
    if ("useNativeValidation" in $$new_props)
      $$invalidate(49, useNativeValidation = $$new_props.useNativeValidation);
    if ("withLeadingIcon" in $$new_props)
      $$invalidate(22, withLeadingIcon = $$new_props.withLeadingIcon);
    if ("withTrailingIcon" in $$new_props)
      $$invalidate(23, withTrailingIcon = $$new_props.withTrailingIcon);
    if ("input" in $$new_props)
      $$invalidate(2, input = $$new_props.input);
    if ("floatingLabel" in $$new_props)
      $$invalidate(5, floatingLabel = $$new_props.floatingLabel);
    if ("lineRipple" in $$new_props)
      $$invalidate(6, lineRipple = $$new_props.lineRipple);
    if ("notchedOutline" in $$new_props)
      $$invalidate(7, notchedOutline = $$new_props.notchedOutline);
    if ("$$scope" in $$new_props)
      $$invalidate(87, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & /*input*/
    4) {
      $$invalidate(33, inputElement = input && input.getElement());
    }
    if ($$self.$$.dirty[0] & /*invalid, updateInvalid*/
    524290 | $$self.$$.dirty[1] & /*instance*/
    8388608) {
      if (instance2 && instance2.isValid() !== !invalid) {
        if (updateInvalid) {
          $$invalidate(1, invalid = !instance2.isValid());
        } else {
          instance2.setValid(!invalid);
        }
      }
    }
    if ($$self.$$.dirty[1] & /*instance, validateOnValueChange*/
    8519680) {
      if (instance2 && instance2.getValidateOnValueChange() !== validateOnValueChange) {
        instance2.setValidateOnValueChange(isUninitializedValue(validateOnValueChange) ? false : validateOnValueChange);
      }
    }
    if ($$self.$$.dirty[1] & /*instance, useNativeValidation*/
    8650752) {
      if (instance2) {
        instance2.setUseNativeValidation(isUninitializedValue(useNativeValidation) ? true : useNativeValidation);
      }
    }
    if ($$self.$$.dirty[0] & /*disabled*/
    4096 | $$self.$$.dirty[1] & /*instance*/
    8388608) {
      if (instance2) {
        instance2.setDisabled(disabled);
      }
    }
    if ($$self.$$.dirty[0] & /*value*/
    1 | $$self.$$.dirty[1] & /*instance, previousValue*/
    25165824) {
      if (instance2 && valued && previousValue !== value) {
        $$invalidate(55, previousValue = value);
        const stringValue = `${value}`;
        if (instance2.getValue() !== stringValue) {
          instance2.setValue(stringValue);
        }
      }
    }
  };
  return [
    value,
    invalid,
    input,
    files,
    dirty,
    floatingLabel,
    lineRipple,
    notchedOutline,
    use,
    className,
    style,
    ripple,
    disabled,
    required,
    textarea,
    variant,
    noLabel,
    label,
    type,
    updateInvalid,
    prefix,
    suffix,
    withLeadingIcon,
    withTrailingIcon,
    element2,
    internalClasses,
    internalStyles,
    helperId,
    focused,
    leadingIcon,
    trailingIcon,
    helperText,
    characterCounter,
    inputElement,
    forwardEvents,
    isUninitializedValue,
    valued,
    initPromise,
    handleLeadingIconMount,
    handleTrailingIconMount,
    handleCharacterCounterMount,
    handleHelperTextId,
    handleHelperTextMount,
    addClass,
    removeClass,
    addStyle,
    $$restProps,
    $$slots,
    validateOnValueChange,
    useNativeValidation,
    focus,
    blur,
    layout,
    getElement,
    instance2,
    previousValue,
    slots,
    floatinglabel_binding,
    floatinglabel_binding_1,
    notchedoutline_binding,
    textarea_1_binding,
    textarea_1_value_binding,
    textarea_1_dirty_binding,
    textarea_1_invalid_binding,
    blur_handler,
    focus_handler,
    blur_handler_1,
    focus_handler_1,
    input_1_binding,
    input_1_value_binding,
    input_1_files_binding,
    input_1_dirty_binding,
    input_1_invalid_binding,
    blur_handler_2,
    focus_handler_2,
    blur_handler_3,
    focus_handler_3,
    lineripple_binding,
    label_1_binding,
    SMUITextfieldLeadingIcon_unmount_handler,
    SMUITextfieldTrailingIcon_unmount_handler,
    SMUITextfieldCharacterCounter_unmount_handler,
    div_binding,
    SMUITextfieldLeadingIcon_unmount_handler_1,
    SMUITextfieldTrailingIcon_unmount_handler_1,
    SMUITextfieldHelperText_unmount_handler,
    SMUITextfieldCharacterCounter_unmount_handler_1,
    $$scope
  ];
}
class Textfield extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance_1,
      create_fragment,
      safe_not_equal,
      {
        use: 8,
        class: 9,
        style: 10,
        ripple: 11,
        disabled: 12,
        required: 13,
        textarea: 14,
        variant: 15,
        noLabel: 16,
        label: 17,
        type: 18,
        value: 0,
        files: 3,
        invalid: 1,
        updateInvalid: 19,
        dirty: 4,
        prefix: 20,
        suffix: 21,
        validateOnValueChange: 48,
        useNativeValidation: 49,
        withLeadingIcon: 22,
        withTrailingIcon: 23,
        input: 2,
        floatingLabel: 5,
        lineRipple: 6,
        notchedOutline: 7,
        focus: 50,
        blur: 51,
        layout: 52,
        getElement: 53
      },
      null,
      [-1, -1, -1, -1]
    );
  }
  get focus() {
    return this.$$.ctx[50];
  }
  get blur() {
    return this.$$.ctx[51];
  }
  get layout() {
    return this.$$.ctx[52];
  }
  get getElement() {
    return this.$$.ctx[53];
  }
}
export {
  Button as B,
  CommonLabel as C,
  FloatingLabel as F,
  LineRipple as L,
  MDCFoundation as M,
  NotchedOutline as N,
  Ripple as R,
  SmuiElement as S,
  Textfield as T,
  __extends as _,
  __assign as a,
  classAdderBuilder as b,
  classMap as c,
  dispatch as d,
  get_spread_object as e,
  forwardEventsBuilder as f,
  get_spread_update as g,
  dashboards as h,
  CircularProgress as i,
  ensure_array_like as j,
  __values as k,
  exclude as l,
  __read as m,
  ponyfill as n,
  update_keyed_each as o,
  prefixFilter as p,
  outro_and_destroy_block as q,
  __spreadArray as r,
  useActions as u,
  v4 as v
};
