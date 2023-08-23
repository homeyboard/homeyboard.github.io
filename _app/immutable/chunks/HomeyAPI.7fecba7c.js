import { a3 as is_promise, B as get_current_component, a4 as set_current_component, a5 as flush, K as run_all, C as getContext, s as safe_not_equal, q as construct_svelte_component, e as empty, i as insert_hydration, d as detach, A as compute_rest_props, D as assign, E as exclude_internal_props, p as binding_callbacks, r as create_slot, u as update_slot_base, v as get_all_dirty_from_scope, w as get_slot_changes, y as noop, F as svg_element, G as claim_svg_element, h as children, H as set_svg_attributes, I as action_destroyer, J as is_function, f as element, g as claim_element, a6 as set_dynamic_element_data, N as setContext, a as space, c as claim_space, j as attr, L as set_attributes, x as append_hydration, Y as destroy_each, o as onMount, V as get_svelte_dataset, O as onDestroy, M as listen$1 } from "./scheduler.98e41e63.js";
import { g as group_outros, t as transition_out, c as check_outros, a as transition_in, S as SvelteComponent, i as init, b as create_component, d as claim_component, m as mount_component, e as destroy_component } from "./index.5f86484a.js";
import { w as writable } from "./singletons.ca53e4ea.js";
import { k as getDefaultExportFromCjs, r as requireHomeyAPI } from "./AthomCloudAPI.22954863.js";
function handle_promise(promise, info) {
  const token = info.token = {};
  function update(type, index, key, value) {
    if (info.token !== token)
      return;
    info.resolved = value;
    let child_ctx = info.ctx;
    if (key !== void 0) {
      child_ctx = child_ctx.slice();
      child_ctx[key] = value;
    }
    const block = type && (info.current = type)(child_ctx);
    let needs_flush = false;
    if (info.block) {
      if (info.blocks) {
        info.blocks.forEach((block2, i) => {
          if (i !== index && block2) {
            group_outros();
            transition_out(block2, 1, 1, () => {
              if (info.blocks[i] === block2) {
                info.blocks[i] = null;
              }
            });
            check_outros();
          }
        });
      } else {
        info.block.d(1);
      }
      block.c();
      transition_in(block, 1);
      block.m(info.mount(), info.anchor);
      needs_flush = true;
    }
    info.block = block;
    if (info.blocks)
      info.blocks[index] = block;
    if (needs_flush) {
      flush();
    }
  }
  if (is_promise(promise)) {
    const current_component = get_current_component();
    promise.then(
      (value) => {
        set_current_component(current_component);
        update(info.then, 1, info.value, value);
        set_current_component(null);
      },
      (error) => {
        set_current_component(current_component);
        update(info.catch, 2, info.error, error);
        set_current_component(null);
        if (!info.hasCatch) {
          throw error;
        }
      }
    );
    if (info.current !== info.pending) {
      update(info.pending, 0);
      return true;
    }
  } else {
    if (info.current !== info.then) {
      update(info.then, 1, info.value, promise);
      return true;
    }
    info.resolved = /** @type {T} */
    promise;
  }
}
function update_await_block_branch(info, ctx, dirty) {
  const child_ctx = ctx.slice();
  const { resolved } = info;
  if (info.current === info.then) {
    child_ctx[info.value] = resolved;
  }
  if (info.current === info.catch) {
    child_ctx[info.error] = resolved;
  }
  info.block.p(child_ctx, dirty);
}
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
function createApiKey() {
  const { subscribe, set } = writable(localStorage.apikey);
  return {
    subscribe,
    set: (apikey) => {
      localStorage.apikey = apikey;
      set(apikey);
    }
  };
}
const apiKey = createApiKey();
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
  function bubble(e) {
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
        forwardDestructors[eventType] = listen(node, eventType, bubble);
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
var cssClasses$4 = {
  // Ripple is a special case where the "root" component is really a "mixin" of sorts,
  // given that it's an 'upgrade' to an existing component. That being said it is the root
  // CSS class that all other CSS classes derive from.
  BG_FOCUSED: "mdc-ripple-upgraded--background-focused",
  FG_ACTIVATION: "mdc-ripple-upgraded--foreground-activation",
  FG_DEACTIVATION: "mdc-ripple-upgraded--foreground-deactivation",
  ROOT: "mdc-ripple-upgraded",
  UNBOUNDED: "mdc-ripple-upgraded--unbounded"
};
var strings$2 = {
  VAR_FG_SCALE: "--mdc-ripple-fg-scale",
  VAR_FG_SIZE: "--mdc-ripple-fg-size",
  VAR_FG_TRANSLATE_END: "--mdc-ripple-fg-translate-end",
  VAR_FG_TRANSLATE_START: "--mdc-ripple-fg-translate-start",
  VAR_LEFT: "--mdc-ripple-left",
  VAR_TOP: "--mdc-ripple-top"
};
var numbers$1 = {
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
        return cssClasses$4;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCRippleFoundation2, "strings", {
      get: function() {
        return strings$2;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCRippleFoundation2, "numbers", {
      get: function() {
        return numbers$1;
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
        }, numbers$1.FG_DEACTIVATION_MS);
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
function create_default_slot$2(ctx) {
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
function create_fragment$7(ctx) {
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
function instance$3($$self, $$props, $$invalidate) {
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
    init(this, options, instance$3, create_fragment$7, safe_not_equal, {
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
function create_else_block$1(ctx) {
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
function create_if_block_1(ctx) {
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
function create_if_block$3(ctx) {
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
function create_fragment$6(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block$3, create_if_block_1, create_else_block$1];
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
function instance$2($$self, $$props, $$invalidate) {
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
    init(this, options, instance$2, create_fragment$6, safe_not_equal, { use: 0, tag: 1, getElement: 6 });
  }
  get getElement() {
    return this.$$.ctx[6];
  }
}
function create_if_block$2(ctx) {
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
function create_default_slot$1(ctx) {
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
    ctx[6] && create_if_block$2()
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
          if_block = create_if_block$2();
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
function create_fragment$5(ctx) {
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
      ).map(func$3).concat([
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
          ).map(func$3).concat([
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
const func$3 = ([name, value]) => `${name}: ${value};`;
function instance$1($$self, $$props, $$invalidate) {
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
      instance$1,
      create_fragment$5,
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
var cssClasses$3 = {
  INDETERMINATE_CLASS: "mdc-circular-progress--indeterminate",
  CLOSED_CLASS: "mdc-circular-progress--closed"
};
var strings$1 = {
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
        return cssClasses$3;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCCircularProgressFoundation2, "strings", {
      get: function() {
        return strings$1;
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
      this.closed = this.adapter.hasClass(cssClasses$3.CLOSED_CLASS);
      this.determinate = !this.adapter.hasClass(cssClasses$3.INDETERMINATE_CLASS);
      this.progress = 0;
      if (this.determinate) {
        this.adapter.setAttribute(strings$1.ARIA_VALUENOW, this.progress.toString());
      }
      this.radius = Number(this.adapter.getDeterminateCircleAttribute(strings$1.RADIUS));
    };
    MDCCircularProgressFoundation2.prototype.setDeterminate = function(determinate) {
      this.determinate = determinate;
      if (this.determinate) {
        this.adapter.removeClass(cssClasses$3.INDETERMINATE_CLASS);
        this.setProgress(this.progress);
      } else {
        this.adapter.addClass(cssClasses$3.INDETERMINATE_CLASS);
        this.adapter.removeAttribute(strings$1.ARIA_VALUENOW);
      }
    };
    MDCCircularProgressFoundation2.prototype.isDeterminate = function() {
      return this.determinate;
    };
    MDCCircularProgressFoundation2.prototype.setProgress = function(value) {
      this.progress = value;
      if (this.determinate) {
        var unfilledArcLength = (1 - this.progress) * (2 * Math.PI * this.radius);
        this.adapter.setDeterminateCircleAttribute(strings$1.STROKE_DASHOFFSET, "" + unfilledArcLength);
        this.adapter.setAttribute(strings$1.ARIA_VALUENOW, this.progress.toString());
      }
    };
    MDCCircularProgressFoundation2.prototype.getProgress = function() {
      return this.progress;
    };
    MDCCircularProgressFoundation2.prototype.open = function() {
      this.closed = false;
      this.adapter.removeClass(cssClasses$3.CLOSED_CLASS);
      this.adapter.removeAttribute(strings$1.ARIA_HIDDEN);
    };
    MDCCircularProgressFoundation2.prototype.close = function() {
      this.closed = true;
      this.adapter.addClass(cssClasses$3.CLOSED_CLASS);
      this.adapter.setAttribute(strings$1.ARIA_HIDDEN, "true");
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
function create_fragment$4(ctx) {
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
function instance_1$3($$self, $$props, $$invalidate) {
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
    init(this, options, instance_1$3, create_fragment$4, safe_not_equal, {
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
function create_default_slot(ctx) {
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
function create_fragment$3(ctx) {
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
      $$slots: { default: [create_default_slot] },
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
function instance($$self, $$props, $$invalidate) {
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
    init(this, options, instance, create_fragment$3, safe_not_equal, {
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
var cssClasses$2 = {
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
        return cssClasses$2;
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
var cssClasses$1 = {
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
        return cssClasses$1;
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
      this.adapter.removeClass(cssClasses$1.LINE_RIPPLE_DEACTIVATING);
      this.adapter.addClass(cssClasses$1.LINE_RIPPLE_ACTIVE);
    };
    MDCLineRippleFoundation2.prototype.setRippleCenter = function(xCoordinate) {
      this.adapter.setStyle("transform-origin", xCoordinate + "px center");
    };
    MDCLineRippleFoundation2.prototype.deactivate = function() {
      this.adapter.addClass(cssClasses$1.LINE_RIPPLE_DEACTIVATING);
    };
    MDCLineRippleFoundation2.prototype.handleTransitionEnd = function(evt) {
      var isDeactivating = this.adapter.hasClass(cssClasses$1.LINE_RIPPLE_DEACTIVATING);
      if (evt.propertyName === "opacity") {
        if (isDeactivating) {
          this.adapter.removeClass(cssClasses$1.LINE_RIPPLE_ACTIVE);
          this.adapter.removeClass(cssClasses$1.LINE_RIPPLE_DEACTIVATING);
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
var strings = {
  NOTCH_ELEMENT_SELECTOR: ".mdc-notched-outline__notch"
};
var numbers = {
  // This should stay in sync with $mdc-notched-outline-padding * 2.
  NOTCH_ELEMENT_PADDING: 8
};
var cssClasses = {
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
        return strings;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCNotchedOutlineFoundation2, "cssClasses", {
      get: function() {
        return cssClasses;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCNotchedOutlineFoundation2, "numbers", {
      get: function() {
        return numbers;
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
        notchWidth += numbers.NOTCH_ELEMENT_PADDING;
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
function create_else_block(ctx) {
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
      ).map(func_1).concat([
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
        ).map(func_1).concat([
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
function create_if_block$1(ctx) {
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
      ).map(func$2).concat([
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
        ).map(func$2).concat([
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
function create_fragment$2(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block$1, create_else_block];
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
const func$2 = ([name, value]) => `${name}: ${value};`;
const func_1 = ([name, value]) => `${name}: ${value};`;
function instance_1$2($$self, $$props, $$invalidate) {
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
    init(this, options, instance_1$2, create_fragment$2, safe_not_equal, {
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
function create_fragment$1(ctx) {
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
      ).map(func$1).concat([
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
        ).map(func$1).concat([
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
const func$1 = ([name, value]) => `${name}: ${value};`;
function instance_1$1($$self, $$props, $$invalidate) {
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
    init(this, options, instance_1$1, create_fragment$1, safe_not_equal, {
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
function create_if_block(ctx) {
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
      ).map(func).join(" "));
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
      ).map(func).join(" "))) {
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
function create_fragment(ctx) {
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
  ctx[3] && create_if_block(ctx);
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
          if_block = create_if_block(ctx2);
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
const func = ([name, value]) => `${name}: ${value};`;
function instance_1($$self, $$props, $$invalidate) {
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
    init(this, options, instance_1, create_fragment, safe_not_equal, {
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
var HomeyAPIExports = requireHomeyAPI();
const HomeyAPI = /* @__PURE__ */ getDefaultExportFromCjs(HomeyAPIExports);
export {
  Button as B,
  CommonLabel as C,
  FloatingLabel as F,
  HomeyAPI as H,
  LineRipple as L,
  MDCFoundation as M,
  NotchedOutline as N,
  Ripple as R,
  SmuiElement as S,
  __extends as _,
  get_spread_object as a,
  __assign as b,
  classMap as c,
  __read as d,
  __spreadArray as e,
  forwardEventsBuilder as f,
  get_spread_update as g,
  dispatch as h,
  classAdderBuilder as i,
  ensure_array_like as j,
  update_keyed_each as k,
  exclude as l,
  ponyfill as m,
  __values as n,
  outro_and_destroy_block as o,
  prefixFilter as p,
  handle_promise as q,
  update_await_block_branch as r,
  CircularProgress as s,
  apiKey as t,
  useActions as u,
  events as v
};
