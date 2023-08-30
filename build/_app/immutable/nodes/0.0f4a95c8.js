import { s as safe_not_equal, r as create_slot, u as assign, f as element, g as claim_element, h as children, d as detach, v as set_attributes, i as insert_hydration, w as listen, x as action_destroyer, y as update_slot_base, z as get_all_dirty_from_scope, A as get_slot_changes, B as is_function, C as run_all, D as compute_rest_props, E as get_current_component, o as onMount, F as exclude_internal_props, p as binding_callbacks, G as setContext, q as construct_svelte_component, e as empty, H as noop, I as subscribe, J as add_flush_callback, K as createEventDispatcher, a as space, c as claim_space, l as text, m as claim_text, L as head_selector, M as component_subscribe, j as attr, N as append_hydration, n as set_data, O as destroy_each } from "../chunks/scheduler.9514346f.js";
import { S as SvelteComponent, i as init, a as transition_in, t as transition_out, b as create_component, d as claim_component, m as mount_component, g as group_outros, e as destroy_component, c as check_outros, f as bind } from "../chunks/index.6fa96164.js";
import { _ as __extends, a as __assign, M as MDCFoundation, c as classMap, u as useActions, g as get_spread_update, f as forwardEventsBuilder, d as dispatch, b as classAdderBuilder, e as get_spread_object, S as SmuiElement, T as Textfield, B as Button, C as CommonLabel, h as dashboards, v as v4, i as CircularProgress, j as ensure_array_like } from "../chunks/Textfield.d226c201.js";
import { g as goto } from "../chunks/navigation.772a0448.js";
import { r as readable, e as base } from "../chunks/singletons.f80bfd01.js";
import { c as clientId, a as clientSecret, h as homeys, b as homey, s as scopes, d as baseUrl, e as dashboards$1, f as session, g as devices, i as basicFlows, j as advancedFlows, k as insights, z as zones } from "../chunks/homey.2e577cb9.js";
import { g as globals, D as Dialog, T as Title, C as Content, A as Actions, d as dashboard, e as editing, a as CommonIcon } from "../chunks/Actions.88e01790.js";
import { a as apiKey, H as HomeyAPI } from "../chunks/HomeyAPI.e6434c35.js";
import { I as IconButton, M as Menu } from "../chunks/SelectionGroupIcon.4dfdb9ee.js";
import { T as Text, L as List, I as Item } from "../chunks/Subheader.f7cf0a21.js";
import { A as AthomCloudAPI } from "../chunks/AthomCloudAPI.26f1365a.js";
const ssr = false;
const trailingSlash = "always";
const prerender = true;
const _layout = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  prerender,
  ssr,
  trailingSlash
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
var cssClasses = {
  FIXED_CLASS: "mdc-top-app-bar--fixed",
  FIXED_SCROLLED_CLASS: "mdc-top-app-bar--fixed-scrolled",
  SHORT_CLASS: "mdc-top-app-bar--short",
  SHORT_COLLAPSED_CLASS: "mdc-top-app-bar--short-collapsed",
  SHORT_HAS_ACTION_ITEM_CLASS: "mdc-top-app-bar--short-has-action-item"
};
var numbers = {
  DEBOUNCE_THROTTLE_RESIZE_TIME_MS: 100,
  MAX_TOP_APP_BAR_HEIGHT: 128
};
var strings = {
  ACTION_ITEM_SELECTOR: ".mdc-top-app-bar__action-item",
  NAVIGATION_EVENT: "MDCTopAppBar:nav",
  NAVIGATION_ICON_SELECTOR: ".mdc-top-app-bar__navigation-icon",
  ROOT_SELECTOR: ".mdc-top-app-bar",
  TITLE_SELECTOR: ".mdc-top-app-bar__title"
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
var MDCTopAppBarBaseFoundation = (
  /** @class */
  function(_super) {
    __extends(MDCTopAppBarBaseFoundation2, _super);
    function MDCTopAppBarBaseFoundation2(adapter) {
      return _super.call(this, __assign(__assign({}, MDCTopAppBarBaseFoundation2.defaultAdapter), adapter)) || this;
    }
    Object.defineProperty(MDCTopAppBarBaseFoundation2, "strings", {
      get: function() {
        return strings;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCTopAppBarBaseFoundation2, "cssClasses", {
      get: function() {
        return cssClasses;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCTopAppBarBaseFoundation2, "numbers", {
      get: function() {
        return numbers;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCTopAppBarBaseFoundation2, "defaultAdapter", {
      /**
       * See {@link MDCTopAppBarAdapter} for typing information on parameters and return types.
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
          getTopAppBarHeight: function() {
            return 0;
          },
          notifyNavigationIconClicked: function() {
            return void 0;
          },
          getViewportScrollY: function() {
            return 0;
          },
          getTotalActionItems: function() {
            return 0;
          }
        };
      },
      enumerable: false,
      configurable: true
    });
    MDCTopAppBarBaseFoundation2.prototype.handleTargetScroll = function() {
    };
    MDCTopAppBarBaseFoundation2.prototype.handleWindowResize = function() {
    };
    MDCTopAppBarBaseFoundation2.prototype.handleNavigationClick = function() {
      this.adapter.notifyNavigationIconClicked();
    };
    return MDCTopAppBarBaseFoundation2;
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
var INITIAL_VALUE = 0;
var MDCTopAppBarFoundation = (
  /** @class */
  function(_super) {
    __extends(MDCTopAppBarFoundation2, _super);
    function MDCTopAppBarFoundation2(adapter) {
      var _this = _super.call(this, adapter) || this;
      _this.wasDocked = true;
      _this.isDockedShowing = true;
      _this.currentAppBarOffsetTop = 0;
      _this.isCurrentlyBeingResized = false;
      _this.resizeThrottleId = INITIAL_VALUE;
      _this.resizeDebounceId = INITIAL_VALUE;
      _this.lastScrollPosition = _this.adapter.getViewportScrollY();
      _this.topAppBarHeight = _this.adapter.getTopAppBarHeight();
      return _this;
    }
    MDCTopAppBarFoundation2.prototype.destroy = function() {
      _super.prototype.destroy.call(this);
      this.adapter.setStyle("top", "");
    };
    MDCTopAppBarFoundation2.prototype.handleTargetScroll = function() {
      var currentScrollPosition = Math.max(this.adapter.getViewportScrollY(), 0);
      var diff = currentScrollPosition - this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
      if (!this.isCurrentlyBeingResized) {
        this.currentAppBarOffsetTop -= diff;
        if (this.currentAppBarOffsetTop > 0) {
          this.currentAppBarOffsetTop = 0;
        } else if (Math.abs(this.currentAppBarOffsetTop) > this.topAppBarHeight) {
          this.currentAppBarOffsetTop = -this.topAppBarHeight;
        }
        this.moveTopAppBar();
      }
    };
    MDCTopAppBarFoundation2.prototype.handleWindowResize = function() {
      var _this = this;
      if (!this.resizeThrottleId) {
        this.resizeThrottleId = setTimeout(function() {
          _this.resizeThrottleId = INITIAL_VALUE;
          _this.throttledResizeHandler();
        }, numbers.DEBOUNCE_THROTTLE_RESIZE_TIME_MS);
      }
      this.isCurrentlyBeingResized = true;
      if (this.resizeDebounceId) {
        clearTimeout(this.resizeDebounceId);
      }
      this.resizeDebounceId = setTimeout(function() {
        _this.handleTargetScroll();
        _this.isCurrentlyBeingResized = false;
        _this.resizeDebounceId = INITIAL_VALUE;
      }, numbers.DEBOUNCE_THROTTLE_RESIZE_TIME_MS);
    };
    MDCTopAppBarFoundation2.prototype.checkForUpdate = function() {
      var offscreenBoundaryTop = -this.topAppBarHeight;
      var hasAnyPixelsOffscreen = this.currentAppBarOffsetTop < 0;
      var hasAnyPixelsOnscreen = this.currentAppBarOffsetTop > offscreenBoundaryTop;
      var partiallyShowing = hasAnyPixelsOffscreen && hasAnyPixelsOnscreen;
      if (partiallyShowing) {
        this.wasDocked = false;
      } else {
        if (!this.wasDocked) {
          this.wasDocked = true;
          return true;
        } else if (this.isDockedShowing !== hasAnyPixelsOnscreen) {
          this.isDockedShowing = hasAnyPixelsOnscreen;
          return true;
        }
      }
      return partiallyShowing;
    };
    MDCTopAppBarFoundation2.prototype.moveTopAppBar = function() {
      if (this.checkForUpdate()) {
        var offset = this.currentAppBarOffsetTop;
        if (Math.abs(offset) >= this.topAppBarHeight) {
          offset = -numbers.MAX_TOP_APP_BAR_HEIGHT;
        }
        this.adapter.setStyle("top", offset + "px");
      }
    };
    MDCTopAppBarFoundation2.prototype.throttledResizeHandler = function() {
      var currentHeight = this.adapter.getTopAppBarHeight();
      if (this.topAppBarHeight !== currentHeight) {
        this.wasDocked = false;
        this.currentAppBarOffsetTop -= this.topAppBarHeight - currentHeight;
        this.topAppBarHeight = currentHeight;
      }
      this.handleTargetScroll();
    };
    return MDCTopAppBarFoundation2;
  }(MDCTopAppBarBaseFoundation)
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
var MDCFixedTopAppBarFoundation = (
  /** @class */
  function(_super) {
    __extends(MDCFixedTopAppBarFoundation2, _super);
    function MDCFixedTopAppBarFoundation2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.wasScrolled = false;
      return _this;
    }
    MDCFixedTopAppBarFoundation2.prototype.handleTargetScroll = function() {
      var currentScroll = this.adapter.getViewportScrollY();
      if (currentScroll <= 0) {
        if (this.wasScrolled) {
          this.adapter.removeClass(cssClasses.FIXED_SCROLLED_CLASS);
          this.wasScrolled = false;
        }
      } else {
        if (!this.wasScrolled) {
          this.adapter.addClass(cssClasses.FIXED_SCROLLED_CLASS);
          this.wasScrolled = true;
        }
      }
    };
    return MDCFixedTopAppBarFoundation2;
  }(MDCTopAppBarFoundation)
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
var MDCShortTopAppBarFoundation = (
  /** @class */
  function(_super) {
    __extends(MDCShortTopAppBarFoundation2, _super);
    function MDCShortTopAppBarFoundation2(adapter) {
      var _this = _super.call(this, adapter) || this;
      _this.collapsed = false;
      _this.isAlwaysCollapsed = false;
      return _this;
    }
    Object.defineProperty(MDCShortTopAppBarFoundation2.prototype, "isCollapsed", {
      // Public visibility for backward compatibility.
      get: function() {
        return this.collapsed;
      },
      enumerable: false,
      configurable: true
    });
    MDCShortTopAppBarFoundation2.prototype.init = function() {
      _super.prototype.init.call(this);
      if (this.adapter.getTotalActionItems() > 0) {
        this.adapter.addClass(cssClasses.SHORT_HAS_ACTION_ITEM_CLASS);
      }
      this.setAlwaysCollapsed(this.adapter.hasClass(cssClasses.SHORT_COLLAPSED_CLASS));
    };
    MDCShortTopAppBarFoundation2.prototype.setAlwaysCollapsed = function(value) {
      this.isAlwaysCollapsed = !!value;
      if (this.isAlwaysCollapsed) {
        this.collapse();
      } else {
        this.maybeCollapseBar();
      }
    };
    MDCShortTopAppBarFoundation2.prototype.getAlwaysCollapsed = function() {
      return this.isAlwaysCollapsed;
    };
    MDCShortTopAppBarFoundation2.prototype.handleTargetScroll = function() {
      this.maybeCollapseBar();
    };
    MDCShortTopAppBarFoundation2.prototype.maybeCollapseBar = function() {
      if (this.isAlwaysCollapsed) {
        return;
      }
      var currentScroll = this.adapter.getViewportScrollY();
      if (currentScroll <= 0) {
        if (this.collapsed) {
          this.uncollapse();
        }
      } else {
        if (!this.collapsed) {
          this.collapse();
        }
      }
    };
    MDCShortTopAppBarFoundation2.prototype.uncollapse = function() {
      this.adapter.removeClass(cssClasses.SHORT_COLLAPSED_CLASS);
      this.collapsed = false;
    };
    MDCShortTopAppBarFoundation2.prototype.collapse = function() {
      this.adapter.addClass(cssClasses.SHORT_COLLAPSED_CLASS);
      this.collapsed = true;
    };
    return MDCShortTopAppBarFoundation2;
  }(MDCTopAppBarBaseFoundation)
);
const { window: window_1 } = globals;
function create_fragment$4(ctx) {
  let header;
  let header_class_value;
  let header_style_value;
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
  let header_levels = [
    {
      class: header_class_value = classMap({
        [
          /*className*/
          ctx[2]
        ]: true,
        "mdc-top-app-bar": true,
        "mdc-top-app-bar--short": (
          /*variant*/
          ctx[4] === "short"
        ),
        "mdc-top-app-bar--short-collapsed": (
          /*collapsed*/
          ctx[0]
        ),
        "mdc-top-app-bar--fixed": (
          /*variant*/
          ctx[4] === "fixed"
        ),
        "smui-top-app-bar--static": (
          /*variant*/
          ctx[4] === "static"
        ),
        "smui-top-app-bar--color-secondary": (
          /*color*/
          ctx[5] === "secondary"
        ),
        "mdc-top-app-bar--prominent": (
          /*prominent*/
          ctx[6]
        ),
        "mdc-top-app-bar--dense": (
          /*dense*/
          ctx[7]
        ),
        .../*internalClasses*/
        ctx[11]
      })
    },
    {
      style: header_style_value = Object.entries(
        /*internalStyles*/
        ctx[12]
      ).map(func).concat([
        /*style*/
        ctx[3]
      ]).join(" ")
    },
    /*$$restProps*/
    ctx[15]
  ];
  let header_data = {};
  for (let i = 0; i < header_levels.length; i += 1) {
    header_data = assign(header_data, header_levels[i]);
  }
  return {
    c() {
      header = element("header");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      header = claim_element(nodes, "HEADER", { class: true, style: true });
      var header_nodes = children(header);
      if (default_slot)
        default_slot.l(header_nodes);
      header_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(header, header_data);
    },
    m(target, anchor) {
      insert_hydration(target, header, anchor);
      if (default_slot) {
        default_slot.m(header, null);
      }
      ctx[25](header);
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            window_1,
            "resize",
            /*resize_handler*/
            ctx[23]
          ),
          listen(
            window_1,
            "scroll",
            /*scroll_handler*/
            ctx[24]
          ),
          action_destroyer(useActions_action = useActions.call(
            null,
            header,
            /*use*/
            ctx[1]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[13].call(null, header)
          ),
          listen(
            header,
            "SMUITopAppBarIconButton:nav",
            /*SMUITopAppBarIconButton_nav_handler*/
            ctx[26]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty[0] & /*$$scope*/
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
      set_attributes(header, header_data = get_spread_update(header_levels, [
        (!current || dirty[0] & /*className, variant, collapsed, color, prominent, dense, internalClasses*/
        2293 && header_class_value !== (header_class_value = classMap({
          [
            /*className*/
            ctx2[2]
          ]: true,
          "mdc-top-app-bar": true,
          "mdc-top-app-bar--short": (
            /*variant*/
            ctx2[4] === "short"
          ),
          "mdc-top-app-bar--short-collapsed": (
            /*collapsed*/
            ctx2[0]
          ),
          "mdc-top-app-bar--fixed": (
            /*variant*/
            ctx2[4] === "fixed"
          ),
          "smui-top-app-bar--static": (
            /*variant*/
            ctx2[4] === "static"
          ),
          "smui-top-app-bar--color-secondary": (
            /*color*/
            ctx2[5] === "secondary"
          ),
          "mdc-top-app-bar--prominent": (
            /*prominent*/
            ctx2[6]
          ),
          "mdc-top-app-bar--dense": (
            /*dense*/
            ctx2[7]
          ),
          .../*internalClasses*/
          ctx2[11]
        }))) && { class: header_class_value },
        (!current || dirty[0] & /*internalStyles, style*/
        4104 && header_style_value !== (header_style_value = Object.entries(
          /*internalStyles*/
          ctx2[12]
        ).map(func).concat([
          /*style*/
          ctx2[3]
        ]).join(" "))) && { style: header_style_value },
        dirty[0] & /*$$restProps*/
        32768 && /*$$restProps*/
        ctx2[15]
      ]));
      if (useActions_action && is_function(useActions_action.update) && dirty[0] & /*use*/
      2)
        useActions_action.update.call(
          null,
          /*use*/
          ctx2[1]
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
        detach(header);
      }
      if (default_slot)
        default_slot.d(detaching);
      ctx[25](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
const func = ([name, value]) => `${name}: ${value};`;
function instance_1($$self, $$props, $$invalidate) {
  const omit_props_names = [
    "use",
    "class",
    "style",
    "variant",
    "color",
    "collapsed",
    "prominent",
    "dense",
    "scrollTarget",
    "getPropStore",
    "getElement"
  ];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let uninitializedValue = () => {
  };
  function isUninitializedValue(value) {
    return value === uninitializedValue;
  }
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { style = "" } = $$props;
  let { variant = "standard" } = $$props;
  let { color = "primary" } = $$props;
  let { collapsed = uninitializedValue } = $$props;
  const alwaysCollapsed = !isUninitializedValue(collapsed) && !!collapsed;
  if (isUninitializedValue(collapsed)) {
    collapsed = false;
  }
  let { prominent = false } = $$props;
  let { dense = false } = $$props;
  let { scrollTarget = void 0 } = $$props;
  let element2;
  let instance2;
  let internalClasses = {};
  let internalStyles = {};
  let propStoreSet;
  let propStore = readable({ variant, prominent, dense }, (set) => {
    $$invalidate(18, propStoreSet = set);
  });
  let oldScrollTarget = void 0;
  let oldVariant = variant;
  onMount(() => {
    $$invalidate(9, instance2 = getInstance());
    instance2.init();
    return () => {
      instance2.destroy();
    };
  });
  function getInstance() {
    const Foundation = {
      static: MDCTopAppBarBaseFoundation,
      short: MDCShortTopAppBarFoundation,
      fixed: MDCFixedTopAppBarFoundation,
      standard: MDCTopAppBarFoundation
    }[variant] || MDCTopAppBarFoundation;
    return new Foundation({
      hasClass,
      addClass,
      removeClass,
      setStyle: addStyle,
      getTopAppBarHeight: () => element2.clientHeight,
      notifyNavigationIconClicked: () => dispatch(element2, "SMUITopAppBar:nav", void 0, void 0, true),
      getViewportScrollY: () => scrollTarget == null ? window.pageYOffset : scrollTarget.scrollTop,
      getTotalActionItems: () => element2.querySelectorAll(".mdc-top-app-bar__action-item").length
    });
  }
  function hasClass(className2) {
    return className2 in internalClasses ? internalClasses[className2] : getElement().classList.contains(className2);
  }
  function addClass(className2) {
    if (!internalClasses[className2]) {
      $$invalidate(11, internalClasses[className2] = true, internalClasses);
    }
  }
  function removeClass(className2) {
    if (!(className2 in internalClasses) || internalClasses[className2]) {
      $$invalidate(11, internalClasses[className2] = false, internalClasses);
    }
  }
  function addStyle(name, value) {
    if (internalStyles[name] != value) {
      if (value === "" || value == null) {
        delete internalStyles[name];
        $$invalidate(12, internalStyles), $$invalidate(20, oldVariant), $$invalidate(4, variant), $$invalidate(9, instance2);
      } else {
        $$invalidate(12, internalStyles[name] = value, internalStyles);
      }
    }
  }
  function handleTargetScroll() {
    if (instance2) {
      instance2.handleTargetScroll();
      if (variant === "short") {
        $$invalidate(0, collapsed = "isCollapsed" in instance2 && instance2.isCollapsed);
      }
    }
  }
  function getPropStore() {
    return propStore;
  }
  function getElement() {
    return element2;
  }
  const resize_handler = () => variant !== "short" && variant !== "fixed" && instance2 && instance2.handleWindowResize();
  const scroll_handler = () => scrollTarget == null && handleTargetScroll();
  function header_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(10, element2);
    });
  }
  const SMUITopAppBarIconButton_nav_handler = () => instance2 && instance2.handleNavigationClick();
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(15, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("use" in $$new_props)
      $$invalidate(1, use = $$new_props.use);
    if ("class" in $$new_props)
      $$invalidate(2, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(3, style = $$new_props.style);
    if ("variant" in $$new_props)
      $$invalidate(4, variant = $$new_props.variant);
    if ("color" in $$new_props)
      $$invalidate(5, color = $$new_props.color);
    if ("collapsed" in $$new_props)
      $$invalidate(0, collapsed = $$new_props.collapsed);
    if ("prominent" in $$new_props)
      $$invalidate(6, prominent = $$new_props.prominent);
    if ("dense" in $$new_props)
      $$invalidate(7, dense = $$new_props.dense);
    if ("scrollTarget" in $$new_props)
      $$invalidate(8, scrollTarget = $$new_props.scrollTarget);
    if ("$$scope" in $$new_props)
      $$invalidate(21, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & /*propStoreSet, variant, prominent, dense*/
    262352) {
      if (propStoreSet) {
        propStoreSet({ variant, prominent, dense });
      }
    }
    if ($$self.$$.dirty[0] & /*oldVariant, variant, instance*/
    1049104) {
      if (oldVariant !== variant && instance2) {
        $$invalidate(20, oldVariant = variant);
        instance2.destroy();
        $$invalidate(11, internalClasses = {});
        $$invalidate(12, internalStyles = {});
        $$invalidate(9, instance2 = getInstance());
        instance2.init();
      }
    }
    if ($$self.$$.dirty[0] & /*instance, variant*/
    528) {
      if (instance2 && variant === "short" && "setAlwaysCollapsed" in instance2) {
        instance2.setAlwaysCollapsed(alwaysCollapsed);
      }
    }
    if ($$self.$$.dirty[0] & /*oldScrollTarget, scrollTarget*/
    524544) {
      if (oldScrollTarget !== scrollTarget) {
        if (oldScrollTarget) {
          oldScrollTarget.removeEventListener("scroll", handleTargetScroll);
        }
        if (scrollTarget) {
          scrollTarget.addEventListener("scroll", handleTargetScroll);
        }
        $$invalidate(19, oldScrollTarget = scrollTarget);
      }
    }
  };
  return [
    collapsed,
    use,
    className,
    style,
    variant,
    color,
    prominent,
    dense,
    scrollTarget,
    instance2,
    element2,
    internalClasses,
    internalStyles,
    forwardEvents,
    handleTargetScroll,
    $$restProps,
    getPropStore,
    getElement,
    propStoreSet,
    oldScrollTarget,
    oldVariant,
    $$scope,
    slots,
    resize_handler,
    scroll_handler,
    header_binding,
    SMUITopAppBarIconButton_nav_handler
  ];
}
class TopAppBar extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance_1,
      create_fragment$4,
      safe_not_equal,
      {
        use: 1,
        class: 2,
        style: 3,
        variant: 4,
        color: 5,
        collapsed: 0,
        prominent: 6,
        dense: 7,
        scrollTarget: 8,
        getPropStore: 16,
        getElement: 17
      },
      null,
      [-1, -1]
    );
  }
  get getPropStore() {
    return this.$$.ctx[16];
  }
  get getElement() {
    return this.$$.ctx[17];
  }
}
const Row = classAdderBuilder({
  class: "mdc-top-app-bar__row",
  tag: "div"
});
function create_fragment$3(ctx) {
  let section;
  let section_class_value;
  let useActions_action;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = (
    /*#slots*/
    ctx[9].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[8],
    null
  );
  let section_levels = [
    {
      class: section_class_value = classMap({
        [
          /*className*/
          ctx[1]
        ]: true,
        "mdc-top-app-bar__section": true,
        "mdc-top-app-bar__section--align-start": (
          /*align*/
          ctx[2] === "start"
        ),
        "mdc-top-app-bar__section--align-end": (
          /*align*/
          ctx[2] === "end"
        )
      })
    },
    /*toolbar*/
    ctx[3] ? { role: "toolbar" } : {},
    /*$$restProps*/
    ctx[6]
  ];
  let section_data = {};
  for (let i = 0; i < section_levels.length; i += 1) {
    section_data = assign(section_data, section_levels[i]);
  }
  return {
    c() {
      section = element("section");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      section = claim_element(nodes, "SECTION", { class: true });
      var section_nodes = children(section);
      if (default_slot)
        default_slot.l(section_nodes);
      section_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(section, section_data);
    },
    m(target, anchor) {
      insert_hydration(target, section, anchor);
      if (default_slot) {
        default_slot.m(section, null);
      }
      ctx[10](section);
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(useActions_action = useActions.call(
            null,
            section,
            /*use*/
            ctx[0]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[5].call(null, section)
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        256)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[8],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[8]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[8],
              dirty,
              null
            ),
            null
          );
        }
      }
      set_attributes(section, section_data = get_spread_update(section_levels, [
        (!current || dirty & /*className, align*/
        6 && section_class_value !== (section_class_value = classMap({
          [
            /*className*/
            ctx2[1]
          ]: true,
          "mdc-top-app-bar__section": true,
          "mdc-top-app-bar__section--align-start": (
            /*align*/
            ctx2[2] === "start"
          ),
          "mdc-top-app-bar__section--align-end": (
            /*align*/
            ctx2[2] === "end"
          )
        }))) && { class: section_class_value },
        dirty & /*toolbar*/
        8 && /*toolbar*/
        (ctx2[3] ? { role: "toolbar" } : {}),
        dirty & /*$$restProps*/
        64 && /*$$restProps*/
        ctx2[6]
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
        detach(section);
      }
      if (default_slot)
        default_slot.d(detaching);
      ctx[10](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$3($$self, $$props, $$invalidate) {
  const omit_props_names = ["use", "class", "align", "toolbar", "getElement"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { align = "start" } = $$props;
  let { toolbar = false } = $$props;
  let element2;
  setContext("SMUI:icon-button:context", toolbar ? "top-app-bar:action" : "top-app-bar:navigation");
  setContext("SMUI:button:context", toolbar ? "top-app-bar:action" : "top-app-bar:navigation");
  function getElement() {
    return element2;
  }
  function section_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(4, element2);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("align" in $$new_props)
      $$invalidate(2, align = $$new_props.align);
    if ("toolbar" in $$new_props)
      $$invalidate(3, toolbar = $$new_props.toolbar);
    if ("$$scope" in $$new_props)
      $$invalidate(8, $$scope = $$new_props.$$scope);
  };
  return [
    use,
    className,
    align,
    toolbar,
    element2,
    forwardEvents,
    $$restProps,
    getElement,
    $$scope,
    slots,
    section_binding
  ];
}
class Section extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, {
      use: 0,
      class: 1,
      align: 2,
      toolbar: 3,
      getElement: 7
    });
  }
  get getElement() {
    return this.$$.ctx[7];
  }
}
classAdderBuilder({
  class: "mdc-top-app-bar__title",
  tag: "span"
});
function create_default_slot$2(ctx) {
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[12].default
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
function create_fragment$2(ctx) {
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
        ctx[7],
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
          /*adjustClass*/
          ctx[6]
        ]: true
      })
    },
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
    ctx[13](switch_instance);
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
      const switch_instance_changes = dirty & /*tag, forwardEvents, use, classMap, className, adjustClass, $$restProps*/
      459 ? get_spread_update(switch_instance_spread_levels, [
        dirty & /*tag*/
        8 && { tag: (
          /*tag*/
          ctx2[3]
        ) },
        dirty & /*forwardEvents, use*/
        129 && {
          use: [
            /*forwardEvents*/
            ctx2[7],
            .../*use*/
            ctx2[0]
          ]
        },
        dirty & /*classMap, className, adjustClass*/
        66 && {
          class: classMap({
            [
              /*className*/
              ctx2[1]
            ]: true,
            [
              /*adjustClass*/
              ctx2[6]
            ]: true
          })
        },
        dirty & /*$$restProps*/
        256 && get_spread_object(
          /*$$restProps*/
          ctx2[8]
        )
      ]) : {};
      if (dirty & /*$$scope*/
      16384) {
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
          ctx2[13](switch_instance);
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
      ctx[13](null);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let propStore;
  let adjustClass;
  const omit_props_names = ["use", "class", "topAppBar", "component", "tag", "getElement"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let $propStore, $$unsubscribe_propStore = noop, $$subscribe_propStore = () => ($$unsubscribe_propStore(), $$unsubscribe_propStore = subscribe(propStore, ($$value) => $$invalidate(11, $propStore = $$value)), propStore);
  $$self.$$.on_destroy.push(() => $$unsubscribe_propStore());
  let { $$slots: slots = {}, $$scope } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { topAppBar } = $$props;
  let element2;
  let { component = SmuiElement } = $$props;
  let { tag = component === SmuiElement ? "main" : void 0 } = $$props;
  function getElement() {
    return element2.getElement();
  }
  function switch_instance_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(5, element2);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(8, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("topAppBar" in $$new_props)
      $$invalidate(9, topAppBar = $$new_props.topAppBar);
    if ("component" in $$new_props)
      $$invalidate(2, component = $$new_props.component);
    if ("tag" in $$new_props)
      $$invalidate(3, tag = $$new_props.tag);
    if ("$$scope" in $$new_props)
      $$invalidate(14, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*topAppBar*/
    512) {
      $$subscribe_propStore($$invalidate(4, propStore = topAppBar && topAppBar.getPropStore()));
    }
    if ($$self.$$.dirty & /*propStore, $propStore*/
    2064) {
      $$invalidate(6, adjustClass = (() => {
        if (!propStore || $propStore.variant === "static") {
          return "";
        }
        if ($propStore.variant === "short") {
          return "mdc-top-app-bar--short-fixed-adjust";
        }
        if ($propStore.prominent && $propStore.dense) {
          return "mdc-top-app-bar--dense-prominent-fixed-adjust";
        }
        if ($propStore.prominent) {
          return "mdc-top-app-bar--prominent-fixed-adjust";
        }
        if ($propStore.dense) {
          return "mdc-top-app-bar--dense-fixed-adjust";
        }
        return "mdc-top-app-bar--fixed-adjust";
      })());
    }
  };
  return [
    use,
    className,
    component,
    tag,
    propStore,
    element2,
    adjustClass,
    forwardEvents,
    $$restProps,
    topAppBar,
    getElement,
    $propStore,
    slots,
    switch_instance_binding,
    $$scope
  ];
}
class AutoAdjust extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, {
      use: 0,
      class: 1,
      topAppBar: 9,
      component: 2,
      tag: 3,
      getElement: 10
    });
  }
  get getElement() {
    return this.$$.ctx[10];
  }
}
function create_default_slot_7$1(ctx) {
  let t;
  return {
    c() {
      t = text("Create local dashboard");
    },
    l(nodes) {
      t = claim_text(nodes, "Create local dashboard");
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
function create_default_slot_6$1(ctx) {
  let textfield;
  let updating_value;
  let current;
  function textfield_value_binding(value) {
    ctx[3](value);
  }
  let textfield_props = {
    style: "width: 100%",
    label: "Dashboard name"
  };
  if (
    /*value*/
    ctx[1] !== void 0
  ) {
    textfield_props.value = /*value*/
    ctx[1];
  }
  textfield = new Textfield({ props: textfield_props });
  binding_callbacks.push(() => bind(textfield, "value", textfield_value_binding));
  return {
    c() {
      create_component(textfield.$$.fragment);
    },
    l(nodes) {
      claim_component(textfield.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(textfield, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const textfield_changes = {};
      if (!updating_value && dirty & /*value*/
      2) {
        updating_value = true;
        textfield_changes.value = /*value*/
        ctx2[1];
        add_flush_callback(() => updating_value = false);
      }
      textfield.$set(textfield_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(textfield.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(textfield.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(textfield, detaching);
    }
  };
}
function create_default_slot_5$1(ctx) {
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
function create_default_slot_4$1(ctx) {
  let label;
  let current;
  label = new CommonLabel({
    props: {
      $$slots: { default: [create_default_slot_5$1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(label.$$.fragment);
    },
    l(nodes) {
      claim_component(label.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(label, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const label_changes = {};
      if (dirty & /*$$scope*/
      64) {
        label_changes.$$scope = { dirty, ctx: ctx2 };
      }
      label.$set(label_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(label.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(label.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(label, detaching);
    }
  };
}
function create_default_slot_3$1(ctx) {
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
function create_default_slot_2$1(ctx) {
  let label;
  let current;
  label = new CommonLabel({
    props: {
      $$slots: { default: [create_default_slot_3$1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(label.$$.fragment);
    },
    l(nodes) {
      claim_component(label.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(label, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const label_changes = {};
      if (dirty & /*$$scope*/
      64) {
        label_changes.$$scope = { dirty, ctx: ctx2 };
      }
      label.$set(label_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(label.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(label.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(label, detaching);
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
      $$slots: { default: [create_default_slot_4$1] },
      $$scope: { ctx }
    }
  });
  button1 = new Button({
    props: {
      action: "accept",
      disabled: (
        /*value*/
        ctx[1].length < 3
      ),
      $$slots: { default: [create_default_slot_2$1] },
      $$scope: { ctx }
    }
  });
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
function create_default_slot$1(ctx) {
  let title;
  let t0;
  let content;
  let t1;
  let actions;
  let current;
  title = new Title({
    props: {
      $$slots: { default: [create_default_slot_7$1] },
      $$scope: { ctx }
    }
  });
  content = new Content({
    props: {
      style: "margin: 10px;",
      $$slots: { default: [create_default_slot_6$1] },
      $$scope: { ctx }
    }
  });
  actions = new Actions({
    props: {
      $$slots: { default: [create_default_slot_1$1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(title.$$.fragment);
      t0 = space();
      create_component(content.$$.fragment);
      t1 = space();
      create_component(actions.$$.fragment);
    },
    l(nodes) {
      claim_component(title.$$.fragment, nodes);
      t0 = claim_space(nodes);
      claim_component(content.$$.fragment, nodes);
      t1 = claim_space(nodes);
      claim_component(actions.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(title, target, anchor);
      insert_hydration(target, t0, anchor);
      mount_component(content, target, anchor);
      insert_hydration(target, t1, anchor);
      mount_component(actions, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const title_changes = {};
      if (dirty & /*$$scope*/
      64) {
        title_changes.$$scope = { dirty, ctx: ctx2 };
      }
      title.$set(title_changes);
      const content_changes = {};
      if (dirty & /*$$scope, value*/
      66) {
        content_changes.$$scope = { dirty, ctx: ctx2 };
      }
      content.$set(content_changes);
      const actions_changes = {};
      if (dirty & /*$$scope, value*/
      66) {
        actions_changes.$$scope = { dirty, ctx: ctx2 };
      }
      actions.$set(actions_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(title.$$.fragment, local);
      transition_in(content.$$.fragment, local);
      transition_in(actions.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(title.$$.fragment, local);
      transition_out(content.$$.fragment, local);
      transition_out(actions.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t0);
        detach(t1);
      }
      destroy_component(title, detaching);
      destroy_component(content, detaching);
      destroy_component(actions, detaching);
    }
  };
}
function create_fragment$1(ctx) {
  let dialog;
  let updating_open;
  let current;
  function dialog_open_binding(value) {
    ctx[4](value);
  }
  let dialog_props = {
    selection: true,
    $$slots: { default: [create_default_slot$1] },
    $$scope: { ctx }
  };
  if (
    /*open*/
    ctx[0] !== void 0
  ) {
    dialog_props.open = /*open*/
    ctx[0];
  }
  dialog = new Dialog({ props: dialog_props });
  binding_callbacks.push(() => bind(dialog, "open", dialog_open_binding));
  dialog.$on(
    "SMUIDialog:closed",
    /*closeHandler*/
    ctx[2]
  );
  return {
    c() {
      create_component(dialog.$$.fragment);
    },
    l(nodes) {
      claim_component(dialog.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(dialog, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const dialog_changes = {};
      if (dirty & /*$$scope, value*/
      66) {
        dialog_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_open && dirty & /*open*/
      1) {
        updating_open = true;
        dialog_changes.open = /*open*/
        ctx2[0];
        add_flush_callback(() => updating_open = false);
      }
      dialog.$set(dialog_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(dialog.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(dialog.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(dialog, detaching);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let { open } = $$props;
  let value = "";
  const dispatch2 = createEventDispatcher();
  function closeHandler(e) {
    if (e.detail.action === "accept") {
      dispatch2("value", value);
    }
    $$invalidate(1, value = "");
  }
  function textfield_value_binding(value$1) {
    value = value$1;
    $$invalidate(1, value);
  }
  function dialog_open_binding(value2) {
    open = value2;
    $$invalidate(0, open);
  }
  $$self.$$set = ($$props2) => {
    if ("open" in $$props2)
      $$invalidate(0, open = $$props2.open);
  };
  return [open, value, closeHandler, textfield_value_binding, dialog_open_binding];
}
class AddDashboardDialog extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, { open: 0 });
  }
}
const _layout_svelte_svelte_type_style_lang = "";
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[36] = list[i];
  return child_ctx;
}
function create_if_block_1(ctx) {
  let topappbar;
  let t0;
  let t1;
  let t2;
  let current;
  let topappbar_props = {
    collapsed: (
      /*topBarCollapsed*/
      ctx[1]
    ),
    dense: true,
    $$slots: { default: [create_default_slot] },
    $$scope: { ctx }
  };
  topappbar = new TopAppBar({ props: topappbar_props });
  ctx[25](topappbar);
  let if_block0 = !/*topBarCollapsed*/
  ctx[1] && create_if_block_3(ctx);
  let if_block1 = (
    /*error*/
    ctx[3] !== void 0 && create_if_block_2(ctx)
  );
  const default_slot_template = (
    /*#slots*/
    ctx[14].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[26],
    null
  );
  return {
    c() {
      create_component(topappbar.$$.fragment);
      t0 = space();
      if (if_block0)
        if_block0.c();
      t1 = space();
      if (if_block1)
        if_block1.c();
      t2 = space();
      if (default_slot)
        default_slot.c();
    },
    l(nodes) {
      claim_component(topappbar.$$.fragment, nodes);
      t0 = claim_space(nodes);
      if (if_block0)
        if_block0.l(nodes);
      t1 = claim_space(nodes);
      if (if_block1)
        if_block1.l(nodes);
      t2 = claim_space(nodes);
      if (default_slot)
        default_slot.l(nodes);
    },
    m(target, anchor) {
      mount_component(topappbar, target, anchor);
      insert_hydration(target, t0, anchor);
      if (if_block0)
        if_block0.m(target, anchor);
      insert_hydration(target, t1, anchor);
      if (if_block1)
        if_block1.m(target, anchor);
      insert_hydration(target, t2, anchor);
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      const topappbar_changes = {};
      if (dirty[0] & /*topBarCollapsed*/
      2)
        topappbar_changes.collapsed = /*topBarCollapsed*/
        ctx2[1];
      if (dirty[0] & /*$$scope, addDashboardOpen, $dashboard, topBarCollapsed, $editing, dashboardMenu, dashboards*/
      67109746) {
        topappbar_changes.$$scope = { dirty, ctx: ctx2 };
      }
      topappbar.$set(topappbar_changes);
      if (!/*topBarCollapsed*/
      ctx2[1]) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty[0] & /*topBarCollapsed*/
          2) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_3(ctx2);
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
      if (
        /*error*/
        ctx2[3] !== void 0
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
        } else {
          if_block1 = create_if_block_2(ctx2);
          if_block1.c();
          if_block1.m(t2.parentNode, t2);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (default_slot) {
        if (default_slot.p && (!current || dirty[0] & /*$$scope*/
        67108864)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[26],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[26]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[26],
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
      transition_in(topappbar.$$.fragment, local);
      transition_in(if_block0);
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(topappbar.$$.fragment, local);
      transition_out(if_block0);
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t0);
        detach(t1);
        detach(t2);
      }
      ctx[25](null);
      destroy_component(topappbar, detaching);
      if (if_block0)
        if_block0.d(detaching);
      if (if_block1)
        if_block1.d(detaching);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_if_block(ctx) {
  let div;
  let circularprogress;
  let current;
  circularprogress = new CircularProgress({
    props: {
      style: "height: 128px; width: 128px;",
      indeterminate: true
    }
  });
  return {
    c() {
      div = element("div");
      create_component(circularprogress.$$.fragment);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(circularprogress.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "loading svelte-1fwqr5l");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      mount_component(circularprogress, div, null);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(circularprogress.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(circularprogress.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(circularprogress);
    }
  };
}
function create_default_slot_19(ctx) {
  let t;
  return {
    c() {
      t = text("menu");
    },
    l(nodes) {
      t = claim_text(nodes, "menu");
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
function create_if_block_6(ctx) {
  let iconbutton;
  let t0;
  let menu;
  let t1;
  let if_block_anchor;
  let current;
  iconbutton = new IconButton({
    props: {
      class: "material-icons",
      $$slots: { default: [create_default_slot_18] },
      $$scope: { ctx }
    }
  });
  iconbutton.$on(
    "click",
    /*click_handler_1*/
    ctx[16]
  );
  let menu_props = {
    $$slots: { default: [create_default_slot_14] },
    $$scope: { ctx }
  };
  menu = new Menu({ props: menu_props });
  ctx[18](menu);
  let if_block = (
    /*$dashboard*/
    ctx[8] !== void 0 && create_if_block_7(ctx)
  );
  return {
    c() {
      create_component(iconbutton.$$.fragment);
      t0 = space();
      create_component(menu.$$.fragment);
      t1 = space();
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      claim_component(iconbutton.$$.fragment, nodes);
      t0 = claim_space(nodes);
      claim_component(menu.$$.fragment, nodes);
      t1 = claim_space(nodes);
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      mount_component(iconbutton, target, anchor);
      insert_hydration(target, t0, anchor);
      mount_component(menu, target, anchor);
      insert_hydration(target, t1, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const iconbutton_changes = {};
      if (dirty[0] & /*$$scope*/
      67108864) {
        iconbutton_changes.$$scope = { dirty, ctx: ctx2 };
      }
      iconbutton.$set(iconbutton_changes);
      const menu_changes = {};
      if (dirty[0] & /*$$scope, dashboards*/
      67108928) {
        menu_changes.$$scope = { dirty, ctx: ctx2 };
      }
      menu.$set(menu_changes);
      if (
        /*$dashboard*/
        ctx2[8] !== void 0
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty[0] & /*$dashboard*/
          256) {
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
      transition_in(iconbutton.$$.fragment, local);
      transition_in(menu.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(iconbutton.$$.fragment, local);
      transition_out(menu.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t0);
        detach(t1);
        detach(if_block_anchor);
      }
      destroy_component(iconbutton, detaching);
      ctx[18](null);
      destroy_component(menu, detaching);
      if (if_block)
        if_block.d(detaching);
    }
  };
}
function create_default_slot_18(ctx) {
  let t;
  return {
    c() {
      t = text("dashboard");
    },
    l(nodes) {
      t = claim_text(nodes, "dashboard");
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
function create_default_slot_17(ctx) {
  let t_value = (
    /*d*/
    ctx[36].title + ""
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
      ctx2[36].title + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_default_slot_16(ctx) {
  let text_1;
  let t;
  let current;
  text_1 = new Text({
    props: {
      $$slots: { default: [create_default_slot_17] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(text_1.$$.fragment);
      t = space();
    },
    l(nodes) {
      claim_component(text_1.$$.fragment, nodes);
      t = claim_space(nodes);
    },
    m(target, anchor) {
      mount_component(text_1, target, anchor);
      insert_hydration(target, t, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const text_1_changes = {};
      if (dirty[0] & /*$$scope, dashboards*/
      67108928) {
        text_1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      text_1.$set(text_1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(text_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(text_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
      destroy_component(text_1, detaching);
    }
  };
}
function create_each_block(ctx) {
  let item;
  let current;
  function SMUI_action_handler() {
    return (
      /*SMUI_action_handler*/
      ctx[17](
        /*d*/
        ctx[36]
      )
    );
  }
  item = new Item({
    props: {
      $$slots: { default: [create_default_slot_16] },
      $$scope: { ctx }
    }
  });
  item.$on("SMUI:action", SMUI_action_handler);
  return {
    c() {
      create_component(item.$$.fragment);
    },
    l(nodes) {
      claim_component(item.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(item, target, anchor);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const item_changes = {};
      if (dirty[0] & /*$$scope, dashboards*/
      67108928) {
        item_changes.$$scope = { dirty, ctx };
      }
      item.$set(item_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(item.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(item.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(item, detaching);
    }
  };
}
function create_default_slot_15(ctx) {
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
      if (dirty[0] & /*dashboards*/
      64) {
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
function create_default_slot_14(ctx) {
  let list;
  let current;
  list = new List({
    props: {
      $$slots: { default: [create_default_slot_15] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(list.$$.fragment);
    },
    l(nodes) {
      claim_component(list.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const list_changes = {};
      if (dirty[0] & /*$$scope, dashboards*/
      67108928) {
        list_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list.$set(list_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list, detaching);
    }
  };
}
function create_if_block_7(ctx) {
  let text_1;
  let current;
  text_1 = new Text({
    props: {
      style: "cursor: pointer;",
      $$slots: { default: [create_default_slot_13] },
      $$scope: { ctx }
    }
  });
  text_1.$on(
    "click",
    /*click_handler_2*/
    ctx[19]
  );
  return {
    c() {
      create_component(text_1.$$.fragment);
    },
    l(nodes) {
      claim_component(text_1.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(text_1, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const text_1_changes = {};
      if (dirty[0] & /*$$scope, $dashboard*/
      67109120) {
        text_1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      text_1.$set(text_1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(text_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(text_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(text_1, detaching);
    }
  };
}
function create_default_slot_13(ctx) {
  let t_value = (
    /*$dashboard*/
    ctx[8].title + ""
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
      256 && t_value !== (t_value = /*$dashboard*/
      ctx2[8].title + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_default_slot_12(ctx) {
  let iconbutton;
  let t;
  let if_block_anchor;
  let current;
  iconbutton = new IconButton({
    props: {
      class: "material-icons",
      $$slots: { default: [create_default_slot_19] },
      $$scope: { ctx }
    }
  });
  iconbutton.$on(
    "click",
    /*click_handler*/
    ctx[15]
  );
  let if_block = !/*topBarCollapsed*/
  ctx[1] && create_if_block_6(ctx);
  return {
    c() {
      create_component(iconbutton.$$.fragment);
      t = space();
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      claim_component(iconbutton.$$.fragment, nodes);
      t = claim_space(nodes);
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      mount_component(iconbutton, target, anchor);
      insert_hydration(target, t, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const iconbutton_changes = {};
      if (dirty[0] & /*$$scope*/
      67108864) {
        iconbutton_changes.$$scope = { dirty, ctx: ctx2 };
      }
      iconbutton.$set(iconbutton_changes);
      if (!/*topBarCollapsed*/
      ctx2[1]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty[0] & /*topBarCollapsed*/
          2) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_6(ctx2);
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
      transition_in(iconbutton.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(iconbutton.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
        detach(if_block_anchor);
      }
      destroy_component(iconbutton, detaching);
      if (if_block)
        if_block.d(detaching);
    }
  };
}
function create_if_block_4(ctx) {
  let button0;
  let t0;
  let button1;
  let t1;
  let t2;
  let adddashboarddialog;
  let updating_open;
  let current;
  button0 = new Button({
    props: {
      $$slots: { default: [create_default_slot_9] },
      $$scope: { ctx }
    }
  });
  button0.$on(
    "click",
    /*click_handler_3*/
    ctx[20]
  );
  button1 = new Button({
    props: {
      $$slots: { default: [create_default_slot_6] },
      $$scope: { ctx }
    }
  });
  button1.$on(
    "click",
    /*click_handler_4*/
    ctx[21]
  );
  let if_block = (
    /*$dashboard*/
    ctx[8] !== void 0 && create_if_block_5(ctx)
  );
  function adddashboarddialog_open_binding(value) {
    ctx[23](value);
  }
  let adddashboarddialog_props = {};
  if (
    /*addDashboardOpen*/
    ctx[5] !== void 0
  ) {
    adddashboarddialog_props.open = /*addDashboardOpen*/
    ctx[5];
  }
  adddashboarddialog = new AddDashboardDialog({ props: adddashboarddialog_props });
  binding_callbacks.push(() => bind(adddashboarddialog, "open", adddashboarddialog_open_binding));
  adddashboarddialog.$on(
    "value",
    /*value_handler*/
    ctx[24]
  );
  return {
    c() {
      create_component(button0.$$.fragment);
      t0 = space();
      create_component(button1.$$.fragment);
      t1 = space();
      if (if_block)
        if_block.c();
      t2 = space();
      create_component(adddashboarddialog.$$.fragment);
    },
    l(nodes) {
      claim_component(button0.$$.fragment, nodes);
      t0 = claim_space(nodes);
      claim_component(button1.$$.fragment, nodes);
      t1 = claim_space(nodes);
      if (if_block)
        if_block.l(nodes);
      t2 = claim_space(nodes);
      claim_component(adddashboarddialog.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(button0, target, anchor);
      insert_hydration(target, t0, anchor);
      mount_component(button1, target, anchor);
      insert_hydration(target, t1, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, t2, anchor);
      mount_component(adddashboarddialog, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const button0_changes = {};
      if (dirty[0] & /*$$scope*/
      67108864) {
        button0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      button0.$set(button0_changes);
      const button1_changes = {};
      if (dirty[0] & /*$$scope*/
      67108864) {
        button1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      button1.$set(button1_changes);
      if (
        /*$dashboard*/
        ctx2[8] !== void 0
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty[0] & /*$dashboard*/
          256) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_5(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(t2.parentNode, t2);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      const adddashboarddialog_changes = {};
      if (!updating_open && dirty[0] & /*addDashboardOpen*/
      32) {
        updating_open = true;
        adddashboarddialog_changes.open = /*addDashboardOpen*/
        ctx2[5];
        add_flush_callback(() => updating_open = false);
      }
      adddashboarddialog.$set(adddashboarddialog_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(button0.$$.fragment, local);
      transition_in(button1.$$.fragment, local);
      transition_in(if_block);
      transition_in(adddashboarddialog.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button0.$$.fragment, local);
      transition_out(button1.$$.fragment, local);
      transition_out(if_block);
      transition_out(adddashboarddialog.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t0);
        detach(t1);
        detach(t2);
      }
      destroy_component(button0, detaching);
      destroy_component(button1, detaching);
      if (if_block)
        if_block.d(detaching);
      destroy_component(adddashboarddialog, detaching);
    }
  };
}
function create_default_slot_11(ctx) {
  let t;
  return {
    c() {
      t = text("edit");
    },
    l(nodes) {
      t = claim_text(nodes, "edit");
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
function create_default_slot_10(ctx) {
  let t;
  return {
    c() {
      t = text("Edit");
    },
    l(nodes) {
      t = claim_text(nodes, "Edit");
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
function create_default_slot_9(ctx) {
  let icon;
  let t;
  let text_1;
  let current;
  icon = new CommonIcon({
    props: {
      class: "material-icons",
      $$slots: { default: [create_default_slot_11] },
      $$scope: { ctx }
    }
  });
  text_1 = new Text({
    props: {
      $$slots: { default: [create_default_slot_10] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(icon.$$.fragment);
      t = space();
      create_component(text_1.$$.fragment);
    },
    l(nodes) {
      claim_component(icon.$$.fragment, nodes);
      t = claim_space(nodes);
      claim_component(text_1.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(icon, target, anchor);
      insert_hydration(target, t, anchor);
      mount_component(text_1, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const icon_changes = {};
      if (dirty[0] & /*$$scope*/
      67108864) {
        icon_changes.$$scope = { dirty, ctx: ctx2 };
      }
      icon.$set(icon_changes);
      const text_1_changes = {};
      if (dirty[0] & /*$$scope*/
      67108864) {
        text_1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      text_1.$set(text_1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(icon.$$.fragment, local);
      transition_in(text_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(icon.$$.fragment, local);
      transition_out(text_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
      destroy_component(icon, detaching);
      destroy_component(text_1, detaching);
    }
  };
}
function create_default_slot_8(ctx) {
  let t;
  return {
    c() {
      t = text("add");
    },
    l(nodes) {
      t = claim_text(nodes, "add");
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
function create_default_slot_7(ctx) {
  let t;
  return {
    c() {
      t = text("New");
    },
    l(nodes) {
      t = claim_text(nodes, "New");
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
function create_default_slot_6(ctx) {
  let icon;
  let t;
  let text_1;
  let current;
  icon = new CommonIcon({
    props: {
      class: "material-icons",
      $$slots: { default: [create_default_slot_8] },
      $$scope: { ctx }
    }
  });
  text_1 = new Text({
    props: {
      $$slots: { default: [create_default_slot_7] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(icon.$$.fragment);
      t = space();
      create_component(text_1.$$.fragment);
    },
    l(nodes) {
      claim_component(icon.$$.fragment, nodes);
      t = claim_space(nodes);
      claim_component(text_1.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(icon, target, anchor);
      insert_hydration(target, t, anchor);
      mount_component(text_1, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const icon_changes = {};
      if (dirty[0] & /*$$scope*/
      67108864) {
        icon_changes.$$scope = { dirty, ctx: ctx2 };
      }
      icon.$set(icon_changes);
      const text_1_changes = {};
      if (dirty[0] & /*$$scope*/
      67108864) {
        text_1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      text_1.$set(text_1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(icon.$$.fragment, local);
      transition_in(text_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(icon.$$.fragment, local);
      transition_out(text_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
      destroy_component(icon, detaching);
      destroy_component(text_1, detaching);
    }
  };
}
function create_if_block_5(ctx) {
  let button;
  let current;
  button = new Button({
    props: {
      $$slots: { default: [create_default_slot_3] },
      $$scope: { ctx }
    }
  });
  button.$on(
    "click",
    /*click_handler_5*/
    ctx[22]
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
      if (dirty[0] & /*$$scope*/
      67108864) {
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
function create_default_slot_5(ctx) {
  let t;
  return {
    c() {
      t = text("settings");
    },
    l(nodes) {
      t = claim_text(nodes, "settings");
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
function create_default_slot_4(ctx) {
  let t;
  return {
    c() {
      t = text("Settings");
    },
    l(nodes) {
      t = claim_text(nodes, "Settings");
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
function create_default_slot_3(ctx) {
  let icon;
  let t;
  let text_1;
  let current;
  icon = new CommonIcon({
    props: {
      class: "material-icons",
      $$slots: { default: [create_default_slot_5] },
      $$scope: { ctx }
    }
  });
  text_1 = new Text({
    props: {
      $$slots: { default: [create_default_slot_4] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(icon.$$.fragment);
      t = space();
      create_component(text_1.$$.fragment);
    },
    l(nodes) {
      claim_component(icon.$$.fragment, nodes);
      t = claim_space(nodes);
      claim_component(text_1.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(icon, target, anchor);
      insert_hydration(target, t, anchor);
      mount_component(text_1, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const icon_changes = {};
      if (dirty[0] & /*$$scope*/
      67108864) {
        icon_changes.$$scope = { dirty, ctx: ctx2 };
      }
      icon.$set(icon_changes);
      const text_1_changes = {};
      if (dirty[0] & /*$$scope*/
      67108864) {
        text_1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      text_1.$set(text_1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(icon.$$.fragment, local);
      transition_in(text_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(icon.$$.fragment, local);
      transition_out(text_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
      destroy_component(icon, detaching);
      destroy_component(text_1, detaching);
    }
  };
}
function create_default_slot_2(ctx) {
  let if_block_anchor;
  let current;
  let if_block = !/*topBarCollapsed*/
  ctx[1] && !/*$editing*/
  ctx[9] && create_if_block_4(ctx);
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
      if (!/*topBarCollapsed*/
      ctx2[1] && !/*$editing*/
      ctx2[9]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty[0] & /*topBarCollapsed, $editing*/
          514) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_4(ctx2);
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
  let section0;
  let t;
  let section1;
  let current;
  section0 = new Section({
    props: {
      $$slots: { default: [create_default_slot_12] },
      $$scope: { ctx }
    }
  });
  section1 = new Section({
    props: {
      align: "end",
      $$slots: { default: [create_default_slot_2] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(section0.$$.fragment);
      t = space();
      create_component(section1.$$.fragment);
    },
    l(nodes) {
      claim_component(section0.$$.fragment, nodes);
      t = claim_space(nodes);
      claim_component(section1.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(section0, target, anchor);
      insert_hydration(target, t, anchor);
      mount_component(section1, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const section0_changes = {};
      if (dirty[0] & /*$$scope, $dashboard, dashboardMenu, dashboards, topBarCollapsed*/
      67109202) {
        section0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      section0.$set(section0_changes);
      const section1_changes = {};
      if (dirty[0] & /*$$scope, addDashboardOpen, $dashboard, topBarCollapsed, $editing*/
      67109666) {
        section1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      section1.$set(section1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(section0.$$.fragment, local);
      transition_in(section1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(section0.$$.fragment, local);
      transition_out(section1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
      destroy_component(section0, detaching);
      destroy_component(section1, detaching);
    }
  };
}
function create_default_slot(ctx) {
  let row;
  let current;
  row = new Row({
    props: {
      $$slots: { default: [create_default_slot_1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(row.$$.fragment);
    },
    l(nodes) {
      claim_component(row.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(row, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const row_changes = {};
      if (dirty[0] & /*$$scope, addDashboardOpen, $dashboard, topBarCollapsed, $editing, dashboardMenu, dashboards*/
      67109746) {
        row_changes.$$scope = { dirty, ctx: ctx2 };
      }
      row.$set(row_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(row.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(row.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(row, detaching);
    }
  };
}
function create_if_block_3(ctx) {
  let autoadjust;
  let current;
  autoadjust = new AutoAdjust({ props: { topAppBar: (
    /*topBar*/
    ctx[0]
  ) } });
  return {
    c() {
      create_component(autoadjust.$$.fragment);
    },
    l(nodes) {
      claim_component(autoadjust.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(autoadjust, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const autoadjust_changes = {};
      if (dirty[0] & /*topBar*/
      1)
        autoadjust_changes.topAppBar = /*topBar*/
        ctx2[0];
      autoadjust.$set(autoadjust_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(autoadjust.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(autoadjust.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(autoadjust, detaching);
    }
  };
}
function create_if_block_2(ctx) {
  let div;
  let t;
  return {
    c() {
      div = element("div");
      t = text(
        /*error*/
        ctx[3]
      );
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      t = claim_text(
        div_nodes,
        /*error*/
        ctx[3]
      );
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "error svelte-1fwqr5l");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, t);
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*error*/
      8)
        set_data(
          t,
          /*error*/
          ctx2[3]
        );
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_fragment(ctx) {
  let t;
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block, create_if_block_1];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*loading*/
      ctx2[2]
    )
      return 0;
    if (
      /*$homey*/
      ctx2[7] !== void 0
    )
      return 1;
    return -1;
  }
  if (~(current_block_type_index = select_block_type(ctx))) {
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  return {
    c() {
      t = space();
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
      this.h();
    },
    l(nodes) {
      const head_nodes = head_selector("svelte-t9xcep", document.head);
      head_nodes.forEach(detach);
      t = claim_space(nodes);
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
      this.h();
    },
    h() {
      document.title = "Dashboard";
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(target, anchor);
      }
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if (~current_block_type_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        }
      } else {
        if (if_block) {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
        }
        if (~current_block_type_index) {
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block.c();
          } else {
            if_block.p(ctx2, dirty);
          }
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        } else {
          if_block = null;
        }
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
        detach(if_block_anchor);
      }
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d(detaching);
      }
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let dashboards$2;
  let $homey;
  let $scopes;
  let $apiKey;
  let $baseUrl;
  let $localDashboards;
  let $homeyDashboards;
  let $dashboard;
  let $editing;
  component_subscribe($$self, homey, ($$value) => $$invalidate(7, $homey = $$value));
  component_subscribe($$self, scopes, ($$value) => $$invalidate(27, $scopes = $$value));
  component_subscribe($$self, apiKey, ($$value) => $$invalidate(28, $apiKey = $$value));
  component_subscribe($$self, baseUrl, ($$value) => $$invalidate(29, $baseUrl = $$value));
  component_subscribe($$self, dashboards, ($$value) => $$invalidate(12, $localDashboards = $$value));
  component_subscribe($$self, dashboards$1, ($$value) => $$invalidate(13, $homeyDashboards = $$value));
  component_subscribe($$self, dashboard, ($$value) => $$invalidate(8, $dashboard = $$value));
  component_subscribe($$self, editing, ($$value) => $$invalidate(9, $editing = $$value));
  let { $$slots: slots = {}, $$scope } = $$props;
  let topBar;
  let topBarCollapsed = true;
  let loading = true;
  let error = void 0;
  let dashboardMenu;
  let addDashboardOpen = false;
  onMount(async () => {
    await connectHomey();
    if ($homey !== void 0) {
      await loadSession();
      await loadDevices();
      await loadFlows();
      await loadZones();
      await loadInsights();
    }
    $$invalidate(2, loading = false);
  });
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
          const user = await cloudApi.getAuthenticatedUser();
          const firstHomey = await user.getFirstHomey();
          const instance2 = await firstHomey.authenticate();
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
    } catch (e) {
      $$invalidate(3, error = "Session: " + e);
    }
    $$invalidate(2, loading = false);
  }
  async function loadDevices() {
    try {
      if ($scopes.includes("homey") || $scopes.includes("homey.device") || $scopes.includes("homey.device.readonly") || $scopes.includes("homey.device.control")) {
        await $homey.devices.connect();
        const d = await $homey.devices.getDevices();
        $homey.devices.on("device.update", (patch) => devices.onDevice(patch));
        Object.values(d).forEach(async (device) => {
          await device.connect();
          device.on("capability", (event) => {
            const capability = device.capabilitiesObj[event.capabilityId];
            capability.value = event.value;
            capability.lastUpdated.setUTCMilliseconds(event.transactionTime);
          });
        });
        devices.set(d);
      }
    } catch (e) {
      $$invalidate(3, error = "Devices: " + e);
    }
  }
  async function loadFlows() {
    try {
      if ($scopes.includes("homey") || $scopes.includes("homey.flow") || $scopes.includes("homey.flow.readonly") || $scopes.includes("homey.flow.start")) {
        await $homey.flow.connect();
        const basic = await $homey.flow.getFlows();
        const advanced = await $homey.flow.getAdvancedFlows();
        basicFlows.set(basic);
        advancedFlows.set(advanced);
        $homey.flow.on("flow.create", (e) => basicFlows.onCreate(e));
        $homey.flow.on("flow.delete", (e) => basicFlows.onDelete(e));
        $homey.flow.on("advancedflow.create", (e) => advancedFlows.onCreate(e));
        $homey.flow.on("advancedflow.delete", (e) => advancedFlows.onDelete(e));
      }
    } catch (e) {
      $$invalidate(3, error = "Flows: " + e);
    }
  }
  async function loadInsights() {
    try {
      if ($scopes.includes("homey") || $scopes.includes("homey.insights") || $scopes.includes("homey.insights.readonly")) {
        await $homey.insights.connect();
        const logs = await $homey.insights.getLogs();
        insights.set(logs);
      }
    } catch (e) {
      $$invalidate(3, error = "Flows: " + e);
    }
  }
  async function loadZones() {
    try {
      if ($scopes.includes("homey") || $scopes.includes("homey.zone") || $scopes.includes("homey.zone.readonly")) {
        await $homey.zones.connect();
        const z = await $homey.zones.getZones();
        zones.set(z);
      }
    } catch (e) {
      $$invalidate(3, error = "Zones: " + e);
    }
  }
  function toggleEdit() {
    editing.toggle();
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
  const click_handler = () => $$invalidate(1, topBarCollapsed = !topBarCollapsed);
  const click_handler_1 = () => dashboardMenu.setOpen(true);
  const SMUI_action_handler = (d) => goto(base + "/board?id=" + d.id);
  function menu_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dashboardMenu = $$value;
      $$invalidate(4, dashboardMenu);
    });
  }
  const click_handler_2 = () => goto(base + "/board?id=" + $dashboard.id);
  const click_handler_3 = () => toggleEdit();
  const click_handler_4 = () => $$invalidate(5, addDashboardOpen = true);
  const click_handler_5 = () => goto(base + "/board/settings?id=" + $dashboard.id);
  function adddashboarddialog_open_binding(value) {
    addDashboardOpen = value;
    $$invalidate(5, addDashboardOpen);
  }
  const value_handler = (v) => addDashboard(v.detail);
  function topappbar_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      topBar = $$value;
      $$invalidate(0, topBar);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("$$scope" in $$props2)
      $$invalidate(26, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & /*$homeyDashboards, $localDashboards*/
    12288) {
      $$invalidate(6, dashboards$2 = Object.values({ ...$homeyDashboards, ...$localDashboards }));
    }
  };
  return [
    topBar,
    topBarCollapsed,
    loading,
    error,
    dashboardMenu,
    addDashboardOpen,
    dashboards$2,
    $homey,
    $dashboard,
    $editing,
    toggleEdit,
    addDashboard,
    $localDashboards,
    $homeyDashboards,
    slots,
    click_handler,
    click_handler_1,
    SMUI_action_handler,
    menu_binding,
    click_handler_2,
    click_handler_3,
    click_handler_4,
    click_handler_5,
    adddashboarddialog_open_binding,
    value_handler,
    topappbar_binding,
    $$scope
  ];
}
class Layout extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {}, null, [-1, -1]);
  }
}
export {
  Layout as component,
  _layout as universal
};
