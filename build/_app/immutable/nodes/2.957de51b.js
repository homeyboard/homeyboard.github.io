import { s as safe_not_equal, r as create_slot, u as assign, f as element, g as claim_element, h as children, d as detach, v as set_attributes, i as insert_hydration, N as append_hydration, x as action_destroyer, y as update_slot_base, z as get_all_dirty_from_scope, A as get_slot_changes, B as is_function, C as run_all, D as compute_rest_props, E as get_current_component, o as onMount, F as exclude_internal_props, p as binding_callbacks, q as construct_svelte_component, e as empty, P as getContext, G as setContext, a as space, c as claim_space, j as attr, w as listen, M as component_subscribe, l as text, m as claim_text, n as set_data, H as noop, J as add_flush_callback, Q as get_svelte_dataset, O as destroy_each, k as set_style } from "../chunks/scheduler.9514346f.js";
import { C as Card, h as handle_promise, u as update_await_block_branch } from "../chunks/ActionIcons.0472c22b.js";
import { _ as __extends, a as __assign, k as __values, M as MDCFoundation, c as classMap, p as prefixFilter, l as exclude, u as useActions, g as get_spread_update, f as forwardEventsBuilder, R as Ripple, e as get_spread_object, d as dispatch, S as SmuiElement, m as __read, n as ponyfill, j as ensure_array_like, o as update_keyed_each, q as outro_and_destroy_block, b as classAdderBuilder, h as dashboards, C as CommonLabel, B as Button, T as Textfield, i as CircularProgress } from "../chunks/Textfield.a5c52319.js";
import { S as SvelteComponent, i as init, a as transition_in, t as transition_out, b as create_component, d as claim_component, m as mount_component, g as group_outros, e as destroy_component, c as check_outros, f as bind } from "../chunks/index.6fa96164.js";
import { L as List, I as Item, T as Text } from "../chunks/Subheader.de0367f9.js";
import { d as baseUrl, e as dashboards$1, b as homey, c as clientId, a as clientSecret } from "../chunks/homey.aff21b99.js";
import { a as apiKey, H as HomeyAPI } from "../chunks/HomeyAPI.405327a5.js";
import { g as goto } from "../chunks/navigation.f8f7a854.js";
import { e as base } from "../chunks/singletons.dbc3066f.js";
import { A as AthomCloudAPI } from "../chunks/AthomCloudAPI.7aecdafb.js";
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
var strings$4 = {
  ICON_EVENT: "MDCTextField:icon",
  ICON_ROLE: "button"
};
var cssClasses$3 = {
  ROOT: "mdc-text-field__icon"
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
var INTERACTION_EVENTS = ["click", "keydown"];
var MDCTextFieldIconFoundation = (
  /** @class */
  function(_super) {
    __extends(MDCTextFieldIconFoundation2, _super);
    function MDCTextFieldIconFoundation2(adapter) {
      var _this = _super.call(this, __assign(__assign({}, MDCTextFieldIconFoundation2.defaultAdapter), adapter)) || this;
      _this.savedTabIndex = null;
      _this.interactionHandler = function(evt) {
        _this.handleInteraction(evt);
      };
      return _this;
    }
    Object.defineProperty(MDCTextFieldIconFoundation2, "strings", {
      get: function() {
        return strings$4;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCTextFieldIconFoundation2, "cssClasses", {
      get: function() {
        return cssClasses$3;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCTextFieldIconFoundation2, "defaultAdapter", {
      /**
       * See {@link MDCTextFieldIconAdapter} for typing information on parameters and return types.
       */
      get: function() {
        return {
          getAttr: function() {
            return null;
          },
          setAttr: function() {
            return void 0;
          },
          removeAttr: function() {
            return void 0;
          },
          setContent: function() {
            return void 0;
          },
          registerInteractionHandler: function() {
            return void 0;
          },
          deregisterInteractionHandler: function() {
            return void 0;
          },
          notifyIconAction: function() {
            return void 0;
          }
        };
      },
      enumerable: false,
      configurable: true
    });
    MDCTextFieldIconFoundation2.prototype.init = function() {
      var e_1, _a;
      this.savedTabIndex = this.adapter.getAttr("tabindex");
      try {
        for (var INTERACTION_EVENTS_1 = __values(INTERACTION_EVENTS), INTERACTION_EVENTS_1_1 = INTERACTION_EVENTS_1.next(); !INTERACTION_EVENTS_1_1.done; INTERACTION_EVENTS_1_1 = INTERACTION_EVENTS_1.next()) {
          var evtType = INTERACTION_EVENTS_1_1.value;
          this.adapter.registerInteractionHandler(evtType, this.interactionHandler);
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (INTERACTION_EVENTS_1_1 && !INTERACTION_EVENTS_1_1.done && (_a = INTERACTION_EVENTS_1.return))
            _a.call(INTERACTION_EVENTS_1);
        } finally {
          if (e_1)
            throw e_1.error;
        }
      }
    };
    MDCTextFieldIconFoundation2.prototype.destroy = function() {
      var e_2, _a;
      try {
        for (var INTERACTION_EVENTS_2 = __values(INTERACTION_EVENTS), INTERACTION_EVENTS_2_1 = INTERACTION_EVENTS_2.next(); !INTERACTION_EVENTS_2_1.done; INTERACTION_EVENTS_2_1 = INTERACTION_EVENTS_2.next()) {
          var evtType = INTERACTION_EVENTS_2_1.value;
          this.adapter.deregisterInteractionHandler(evtType, this.interactionHandler);
        }
      } catch (e_2_1) {
        e_2 = { error: e_2_1 };
      } finally {
        try {
          if (INTERACTION_EVENTS_2_1 && !INTERACTION_EVENTS_2_1.done && (_a = INTERACTION_EVENTS_2.return))
            _a.call(INTERACTION_EVENTS_2);
        } finally {
          if (e_2)
            throw e_2.error;
        }
      }
    };
    MDCTextFieldIconFoundation2.prototype.setDisabled = function(disabled) {
      if (!this.savedTabIndex) {
        return;
      }
      if (disabled) {
        this.adapter.setAttr("tabindex", "-1");
        this.adapter.removeAttr("role");
      } else {
        this.adapter.setAttr("tabindex", this.savedTabIndex);
        this.adapter.setAttr("role", strings$4.ICON_ROLE);
      }
    };
    MDCTextFieldIconFoundation2.prototype.setAriaLabel = function(label) {
      this.adapter.setAttr("aria-label", label);
    };
    MDCTextFieldIconFoundation2.prototype.setContent = function(content) {
      this.adapter.setContent(content);
    };
    MDCTextFieldIconFoundation2.prototype.handleInteraction = function(evt) {
      var isEnterKey = evt.key === "Enter" || evt.keyCode === 13;
      if (evt.type === "click" || isEnterKey) {
        evt.preventDefault();
        this.adapter.notifyIconAction();
      }
    };
    return MDCTextFieldIconFoundation2;
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
  ACTIVE: "mdc-tab-indicator--active",
  FADE: "mdc-tab-indicator--fade",
  NO_TRANSITION: "mdc-tab-indicator--no-transition"
};
var strings$3 = {
  CONTENT_SELECTOR: ".mdc-tab-indicator__content"
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
var MDCTabIndicatorFoundation = (
  /** @class */
  function(_super) {
    __extends(MDCTabIndicatorFoundation2, _super);
    function MDCTabIndicatorFoundation2(adapter) {
      return _super.call(this, __assign(__assign({}, MDCTabIndicatorFoundation2.defaultAdapter), adapter)) || this;
    }
    Object.defineProperty(MDCTabIndicatorFoundation2, "cssClasses", {
      get: function() {
        return cssClasses$2;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCTabIndicatorFoundation2, "strings", {
      get: function() {
        return strings$3;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCTabIndicatorFoundation2, "defaultAdapter", {
      get: function() {
        return {
          addClass: function() {
            return void 0;
          },
          removeClass: function() {
            return void 0;
          },
          computeContentClientRect: function() {
            return { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 };
          },
          setContentStyleProperty: function() {
            return void 0;
          }
        };
      },
      enumerable: false,
      configurable: true
    });
    MDCTabIndicatorFoundation2.prototype.computeContentClientRect = function() {
      return this.adapter.computeContentClientRect();
    };
    return MDCTabIndicatorFoundation2;
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
var MDCFadingTabIndicatorFoundation = (
  /** @class */
  function(_super) {
    __extends(MDCFadingTabIndicatorFoundation2, _super);
    function MDCFadingTabIndicatorFoundation2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    MDCFadingTabIndicatorFoundation2.prototype.activate = function() {
      this.adapter.addClass(MDCTabIndicatorFoundation.cssClasses.ACTIVE);
    };
    MDCFadingTabIndicatorFoundation2.prototype.deactivate = function() {
      this.adapter.removeClass(MDCTabIndicatorFoundation.cssClasses.ACTIVE);
    };
    return MDCFadingTabIndicatorFoundation2;
  }(MDCTabIndicatorFoundation)
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
var MDCSlidingTabIndicatorFoundation = (
  /** @class */
  function(_super) {
    __extends(MDCSlidingTabIndicatorFoundation2, _super);
    function MDCSlidingTabIndicatorFoundation2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    MDCSlidingTabIndicatorFoundation2.prototype.activate = function(previousIndicatorClientRect) {
      if (!previousIndicatorClientRect) {
        this.adapter.addClass(MDCTabIndicatorFoundation.cssClasses.ACTIVE);
        return;
      }
      var currentClientRect = this.computeContentClientRect();
      var widthDelta = previousIndicatorClientRect.width / currentClientRect.width;
      var xPosition = previousIndicatorClientRect.left - currentClientRect.left;
      this.adapter.addClass(MDCTabIndicatorFoundation.cssClasses.NO_TRANSITION);
      this.adapter.setContentStyleProperty("transform", "translateX(" + xPosition + "px) scaleX(" + widthDelta + ")");
      this.computeContentClientRect();
      this.adapter.removeClass(MDCTabIndicatorFoundation.cssClasses.NO_TRANSITION);
      this.adapter.addClass(MDCTabIndicatorFoundation.cssClasses.ACTIVE);
      this.adapter.setContentStyleProperty("transform", "");
    };
    MDCSlidingTabIndicatorFoundation2.prototype.deactivate = function() {
      this.adapter.removeClass(MDCTabIndicatorFoundation.cssClasses.ACTIVE);
    };
    return MDCSlidingTabIndicatorFoundation2;
  }(MDCTabIndicatorFoundation)
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
  ACTIVE: "mdc-tab--active"
};
var strings$2 = {
  ARIA_SELECTED: "aria-selected",
  CONTENT_SELECTOR: ".mdc-tab__content",
  INTERACTED_EVENT: "MDCTab:interacted",
  RIPPLE_SELECTOR: ".mdc-tab__ripple",
  TABINDEX: "tabIndex",
  TAB_INDICATOR_SELECTOR: ".mdc-tab-indicator"
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
var MDCTabFoundation = (
  /** @class */
  function(_super) {
    __extends(MDCTabFoundation2, _super);
    function MDCTabFoundation2(adapter) {
      var _this = _super.call(this, __assign(__assign({}, MDCTabFoundation2.defaultAdapter), adapter)) || this;
      _this.focusOnActivate = true;
      return _this;
    }
    Object.defineProperty(MDCTabFoundation2, "cssClasses", {
      get: function() {
        return cssClasses$1;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCTabFoundation2, "strings", {
      get: function() {
        return strings$2;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCTabFoundation2, "defaultAdapter", {
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
          setAttr: function() {
            return void 0;
          },
          activateIndicator: function() {
            return void 0;
          },
          deactivateIndicator: function() {
            return void 0;
          },
          notifyInteracted: function() {
            return void 0;
          },
          getOffsetLeft: function() {
            return 0;
          },
          getOffsetWidth: function() {
            return 0;
          },
          getContentOffsetLeft: function() {
            return 0;
          },
          getContentOffsetWidth: function() {
            return 0;
          },
          focus: function() {
            return void 0;
          }
        };
      },
      enumerable: false,
      configurable: true
    });
    MDCTabFoundation2.prototype.handleClick = function() {
      this.adapter.notifyInteracted();
    };
    MDCTabFoundation2.prototype.isActive = function() {
      return this.adapter.hasClass(cssClasses$1.ACTIVE);
    };
    MDCTabFoundation2.prototype.setFocusOnActivate = function(focusOnActivate) {
      this.focusOnActivate = focusOnActivate;
    };
    MDCTabFoundation2.prototype.activate = function(previousIndicatorClientRect) {
      this.adapter.addClass(cssClasses$1.ACTIVE);
      this.adapter.setAttr(strings$2.ARIA_SELECTED, "true");
      this.adapter.setAttr(strings$2.TABINDEX, "0");
      this.adapter.activateIndicator(previousIndicatorClientRect);
      if (this.focusOnActivate) {
        this.adapter.focus();
      }
    };
    MDCTabFoundation2.prototype.deactivate = function() {
      if (!this.isActive()) {
        return;
      }
      this.adapter.removeClass(cssClasses$1.ACTIVE);
      this.adapter.setAttr(strings$2.ARIA_SELECTED, "false");
      this.adapter.setAttr(strings$2.TABINDEX, "-1");
      this.adapter.deactivateIndicator();
    };
    MDCTabFoundation2.prototype.computeDimensions = function() {
      var rootWidth = this.adapter.getOffsetWidth();
      var rootLeft = this.adapter.getOffsetLeft();
      var contentWidth = this.adapter.getContentOffsetWidth();
      var contentLeft = this.adapter.getContentOffsetLeft();
      return {
        contentLeft: rootLeft + contentLeft,
        contentRight: rootLeft + contentLeft + contentWidth,
        rootLeft,
        rootRight: rootLeft + rootWidth
      };
    };
    return MDCTabFoundation2;
  }(MDCFoundation)
);
function create_fragment$6(ctx) {
  let span1;
  let span0;
  let span0_class_value;
  let span0_style_value;
  let span0_aria_hidden_value;
  let useActions_action;
  let span1_class_value;
  let useActions_action_1;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = (
    /*#slots*/
    ctx[21].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[20],
    null
  );
  let span0_levels = [
    {
      class: span0_class_value = classMap({
        [
          /*content$class*/
          ctx[6]
        ]: true,
        "mdc-tab-indicator__content": true,
        "mdc-tab-indicator__content--underline": (
          /*type*/
          ctx[3] === "underline"
        ),
        "mdc-tab-indicator__content--icon": (
          /*type*/
          ctx[3] === "icon"
        )
      })
    },
    {
      style: span0_style_value = Object.entries(
        /*contentStyles*/
        ctx[10]
      ).map(func$2).join(" ")
    },
    {
      "aria-hidden": span0_aria_hidden_value = /*type*/
      ctx[3] === "icon" ? "true" : void 0
    },
    prefixFilter(
      /*$$restProps*/
      ctx[12],
      "content$"
    )
  ];
  let span_data = {};
  for (let i = 0; i < span0_levels.length; i += 1) {
    span_data = assign(span_data, span0_levels[i]);
  }
  let span1_levels = [
    {
      class: span1_class_value = classMap({
        [
          /*className*/
          ctx[2]
        ]: true,
        "mdc-tab-indicator": true,
        "mdc-tab-indicator--active": (
          /*active*/
          ctx[0]
        ),
        "mdc-tab-indicator--fade": (
          /*transition*/
          ctx[4] === "fade"
        ),
        .../*internalClasses*/
        ctx[9]
      })
    },
    exclude(
      /*$$restProps*/
      ctx[12],
      ["content$"]
    )
  ];
  let span_data_1 = {};
  for (let i = 0; i < span1_levels.length; i += 1) {
    span_data_1 = assign(span_data_1, span1_levels[i]);
  }
  return {
    c() {
      span1 = element("span");
      span0 = element("span");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      span1 = claim_element(nodes, "SPAN", { class: true });
      var span1_nodes = children(span1);
      span0 = claim_element(span1_nodes, "SPAN", {
        class: true,
        style: true,
        "aria-hidden": true
      });
      var span0_nodes = children(span0);
      if (default_slot)
        default_slot.l(span0_nodes);
      span0_nodes.forEach(detach);
      span1_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(span0, span_data);
      set_attributes(span1, span_data_1);
    },
    m(target, anchor) {
      insert_hydration(target, span1, anchor);
      append_hydration(span1, span0);
      if (default_slot) {
        default_slot.m(span0, null);
      }
      ctx[22](span0);
      ctx[23](span1);
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(useActions_action = useActions.call(
            null,
            span0,
            /*content$use*/
            ctx[5]
          )),
          action_destroyer(useActions_action_1 = useActions.call(
            null,
            span1,
            /*use*/
            ctx[1]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[11].call(null, span1)
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        1048576)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[20],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[20]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[20],
              dirty,
              null
            ),
            null
          );
        }
      }
      set_attributes(span0, span_data = get_spread_update(span0_levels, [
        (!current || dirty & /*content$class, type*/
        72 && span0_class_value !== (span0_class_value = classMap({
          [
            /*content$class*/
            ctx2[6]
          ]: true,
          "mdc-tab-indicator__content": true,
          "mdc-tab-indicator__content--underline": (
            /*type*/
            ctx2[3] === "underline"
          ),
          "mdc-tab-indicator__content--icon": (
            /*type*/
            ctx2[3] === "icon"
          )
        }))) && { class: span0_class_value },
        (!current || dirty & /*contentStyles*/
        1024 && span0_style_value !== (span0_style_value = Object.entries(
          /*contentStyles*/
          ctx2[10]
        ).map(func$2).join(" "))) && { style: span0_style_value },
        (!current || dirty & /*type*/
        8 && span0_aria_hidden_value !== (span0_aria_hidden_value = /*type*/
        ctx2[3] === "icon" ? "true" : void 0)) && { "aria-hidden": span0_aria_hidden_value },
        dirty & /*$$restProps*/
        4096 && prefixFilter(
          /*$$restProps*/
          ctx2[12],
          "content$"
        )
      ]));
      if (useActions_action && is_function(useActions_action.update) && dirty & /*content$use*/
      32)
        useActions_action.update.call(
          null,
          /*content$use*/
          ctx2[5]
        );
      set_attributes(span1, span_data_1 = get_spread_update(span1_levels, [
        (!current || dirty & /*className, active, transition, internalClasses*/
        533 && span1_class_value !== (span1_class_value = classMap({
          [
            /*className*/
            ctx2[2]
          ]: true,
          "mdc-tab-indicator": true,
          "mdc-tab-indicator--active": (
            /*active*/
            ctx2[0]
          ),
          "mdc-tab-indicator--fade": (
            /*transition*/
            ctx2[4] === "fade"
          ),
          .../*internalClasses*/
          ctx2[9]
        }))) && { class: span1_class_value },
        dirty & /*$$restProps*/
        4096 && exclude(
          /*$$restProps*/
          ctx2[12],
          ["content$"]
        )
      ]));
      if (useActions_action_1 && is_function(useActions_action_1.update) && dirty & /*use*/
      2)
        useActions_action_1.update.call(
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
        detach(span1);
      }
      if (default_slot)
        default_slot.d(detaching);
      ctx[22](null);
      ctx[23](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
const func$2 = ([name, value]) => `${name}: ${value};`;
function instance_1$5($$self, $$props, $$invalidate) {
  const omit_props_names = [
    "use",
    "class",
    "active",
    "type",
    "transition",
    "content$use",
    "content$class",
    "activate",
    "deactivate",
    "computeContentClientRect",
    "getElement"
  ];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { active = false } = $$props;
  let { type = "underline" } = $$props;
  let { transition = "slide" } = $$props;
  let { content$use = [] } = $$props;
  let { content$class = "" } = $$props;
  let element2;
  let instance2;
  let content;
  let internalClasses = {};
  let contentStyles = {};
  let changeSets = [];
  let oldTransition = transition;
  onMount(() => {
    $$invalidate(17, instance2 = getInstance());
    instance2.init();
    return () => {
      instance2.destroy();
    };
  });
  function getInstance() {
    const Foundation = {
      fade: MDCFadingTabIndicatorFoundation,
      slide: MDCSlidingTabIndicatorFoundation
    }[transition] || MDCSlidingTabIndicatorFoundation;
    return new Foundation({
      addClass: (...props) => doChange(() => addClass(...props)),
      removeClass: (...props) => doChange(() => removeClass(...props)),
      computeContentClientRect,
      setContentStyleProperty: (...props) => doChange(() => addContentStyle(...props))
    });
  }
  function doChange(fn) {
    if (changeSets.length) {
      changeSets[changeSets.length - 1].push(fn);
    } else {
      fn();
    }
  }
  function addClass(className2) {
    if (!internalClasses[className2]) {
      $$invalidate(9, internalClasses[className2] = true, internalClasses);
    }
  }
  function removeClass(className2) {
    if (!(className2 in internalClasses) || internalClasses[className2]) {
      $$invalidate(9, internalClasses[className2] = false, internalClasses);
    }
  }
  function addContentStyle(name, value) {
    if (contentStyles[name] != value) {
      if (value === "" || value == null) {
        delete contentStyles[name];
        $$invalidate(10, contentStyles), $$invalidate(19, oldTransition), $$invalidate(4, transition), $$invalidate(17, instance2);
      } else {
        $$invalidate(10, contentStyles[name] = value, contentStyles);
      }
    }
  }
  function activate(previousIndicatorClientRect) {
    $$invalidate(0, active = true);
    instance2.activate(previousIndicatorClientRect);
  }
  function deactivate() {
    $$invalidate(0, active = false);
    instance2.deactivate();
  }
  function computeContentClientRect() {
    changeSets.push([]);
    $$invalidate(18, changeSets);
    return content.getBoundingClientRect();
  }
  function getElement() {
    return element2;
  }
  function span0_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      content = $$value;
      $$invalidate(8, content);
    });
  }
  function span1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(7, element2);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(12, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("use" in $$new_props)
      $$invalidate(1, use = $$new_props.use);
    if ("class" in $$new_props)
      $$invalidate(2, className = $$new_props.class);
    if ("active" in $$new_props)
      $$invalidate(0, active = $$new_props.active);
    if ("type" in $$new_props)
      $$invalidate(3, type = $$new_props.type);
    if ("transition" in $$new_props)
      $$invalidate(4, transition = $$new_props.transition);
    if ("content$use" in $$new_props)
      $$invalidate(5, content$use = $$new_props.content$use);
    if ("content$class" in $$new_props)
      $$invalidate(6, content$class = $$new_props.content$class);
    if ("$$scope" in $$new_props)
      $$invalidate(20, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*oldTransition, transition, instance*/
    655376) {
      if (oldTransition !== transition) {
        $$invalidate(19, oldTransition = transition);
        instance2 && instance2.destroy();
        $$invalidate(9, internalClasses = {});
        $$invalidate(10, contentStyles = {});
        $$invalidate(17, instance2 = getInstance());
        instance2.init();
      }
    }
    if ($$self.$$.dirty & /*changeSets*/
    262144) {
      if (changeSets.length) {
        requestAnimationFrame(() => {
          var _a;
          const changeSet = (_a = changeSets.shift()) !== null && _a !== void 0 ? _a : [];
          $$invalidate(18, changeSets);
          for (const fn of changeSet) {
            fn();
          }
        });
      }
    }
  };
  return [
    active,
    use,
    className,
    type,
    transition,
    content$use,
    content$class,
    element2,
    content,
    internalClasses,
    contentStyles,
    forwardEvents,
    $$restProps,
    activate,
    deactivate,
    computeContentClientRect,
    getElement,
    instance2,
    changeSets,
    oldTransition,
    $$scope,
    slots,
    span0_binding,
    span1_binding
  ];
}
class TabIndicator extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance_1$5, create_fragment$6, safe_not_equal, {
      use: 1,
      class: 2,
      active: 0,
      type: 3,
      transition: 4,
      content$use: 5,
      content$class: 6,
      activate: 13,
      deactivate: 14,
      computeContentClientRect: 15,
      getElement: 16
    });
  }
  get activate() {
    return this.$$.ctx[13];
  }
  get deactivate() {
    return this.$$.ctx[14];
  }
  get computeContentClientRect() {
    return this.$$.ctx[15];
  }
  get getElement() {
    return this.$$.ctx[16];
  }
}
const get_tab_indicator_slot_changes_1 = (dirty) => ({});
const get_tab_indicator_slot_context_1 = (ctx) => ({});
const get_tab_indicator_slot_changes = (dirty) => ({});
const get_tab_indicator_slot_context = (ctx) => ({});
function create_if_block_1$1(ctx) {
  let tabindicator;
  let current;
  const tabindicator_spread_levels = [
    { active: (
      /*active*/
      ctx[18]
    ) },
    prefixFilter(
      /*$$restProps*/
      ctx[25],
      "tabIndicator$"
    )
  ];
  let tabindicator_props = {
    $$slots: { default: [create_default_slot_2$1] },
    $$scope: { ctx }
  };
  for (let i = 0; i < tabindicator_spread_levels.length; i += 1) {
    tabindicator_props = assign(tabindicator_props, tabindicator_spread_levels[i]);
  }
  tabindicator = new TabIndicator({ props: tabindicator_props });
  ctx[33](tabindicator);
  return {
    c() {
      create_component(tabindicator.$$.fragment);
    },
    l(nodes) {
      claim_component(tabindicator.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(tabindicator, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const tabindicator_changes = dirty[0] & /*active, $$restProps*/
      33816576 ? get_spread_update(tabindicator_spread_levels, [
        dirty[0] & /*active*/
        262144 && { active: (
          /*active*/
          ctx2[18]
        ) },
        dirty[0] & /*$$restProps*/
        33554432 && get_spread_object(prefixFilter(
          /*$$restProps*/
          ctx2[25],
          "tabIndicator$"
        ))
      ]) : {};
      if (dirty[1] & /*$$scope*/
      64) {
        tabindicator_changes.$$scope = { dirty, ctx: ctx2 };
      }
      tabindicator.$set(tabindicator_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(tabindicator.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(tabindicator.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      ctx[33](null);
      destroy_component(tabindicator, detaching);
    }
  };
}
function create_default_slot_2$1(ctx) {
  let current;
  const tab_indicator_slot_template = (
    /*#slots*/
    ctx[32]["tab-indicator"]
  );
  const tab_indicator_slot = create_slot(
    tab_indicator_slot_template,
    ctx,
    /*$$scope*/
    ctx[37],
    get_tab_indicator_slot_context
  );
  return {
    c() {
      if (tab_indicator_slot)
        tab_indicator_slot.c();
    },
    l(nodes) {
      if (tab_indicator_slot)
        tab_indicator_slot.l(nodes);
    },
    m(target, anchor) {
      if (tab_indicator_slot) {
        tab_indicator_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (tab_indicator_slot) {
        if (tab_indicator_slot.p && (!current || dirty[1] & /*$$scope*/
        64)) {
          update_slot_base(
            tab_indicator_slot,
            tab_indicator_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[37],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[37]
            ) : get_slot_changes(
              tab_indicator_slot_template,
              /*$$scope*/
              ctx2[37],
              dirty,
              get_tab_indicator_slot_changes
            ),
            get_tab_indicator_slot_context
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(tab_indicator_slot, local);
      current = true;
    },
    o(local) {
      transition_out(tab_indicator_slot, local);
      current = false;
    },
    d(detaching) {
      if (tab_indicator_slot)
        tab_indicator_slot.d(detaching);
    }
  };
}
function create_if_block$2(ctx) {
  let tabindicator;
  let current;
  const tabindicator_spread_levels = [
    { active: (
      /*active*/
      ctx[18]
    ) },
    prefixFilter(
      /*$$restProps*/
      ctx[25],
      "tabIndicator$"
    )
  ];
  let tabindicator_props = {
    $$slots: { default: [create_default_slot_1$1] },
    $$scope: { ctx }
  };
  for (let i = 0; i < tabindicator_spread_levels.length; i += 1) {
    tabindicator_props = assign(tabindicator_props, tabindicator_spread_levels[i]);
  }
  tabindicator = new TabIndicator({ props: tabindicator_props });
  ctx[35](tabindicator);
  return {
    c() {
      create_component(tabindicator.$$.fragment);
    },
    l(nodes) {
      claim_component(tabindicator.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(tabindicator, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const tabindicator_changes = dirty[0] & /*active, $$restProps*/
      33816576 ? get_spread_update(tabindicator_spread_levels, [
        dirty[0] & /*active*/
        262144 && { active: (
          /*active*/
          ctx2[18]
        ) },
        dirty[0] & /*$$restProps*/
        33554432 && get_spread_object(prefixFilter(
          /*$$restProps*/
          ctx2[25],
          "tabIndicator$"
        ))
      ]) : {};
      if (dirty[1] & /*$$scope*/
      64) {
        tabindicator_changes.$$scope = { dirty, ctx: ctx2 };
      }
      tabindicator.$set(tabindicator_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(tabindicator.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(tabindicator.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      ctx[35](null);
      destroy_component(tabindicator, detaching);
    }
  };
}
function create_default_slot_1$1(ctx) {
  let current;
  const tab_indicator_slot_template = (
    /*#slots*/
    ctx[32]["tab-indicator"]
  );
  const tab_indicator_slot = create_slot(
    tab_indicator_slot_template,
    ctx,
    /*$$scope*/
    ctx[37],
    get_tab_indicator_slot_context_1
  );
  return {
    c() {
      if (tab_indicator_slot)
        tab_indicator_slot.c();
    },
    l(nodes) {
      if (tab_indicator_slot)
        tab_indicator_slot.l(nodes);
    },
    m(target, anchor) {
      if (tab_indicator_slot) {
        tab_indicator_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (tab_indicator_slot) {
        if (tab_indicator_slot.p && (!current || dirty[1] & /*$$scope*/
        64)) {
          update_slot_base(
            tab_indicator_slot,
            tab_indicator_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[37],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[37]
            ) : get_slot_changes(
              tab_indicator_slot_template,
              /*$$scope*/
              ctx2[37],
              dirty,
              get_tab_indicator_slot_changes_1
            ),
            get_tab_indicator_slot_context_1
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(tab_indicator_slot, local);
      current = true;
    },
    o(local) {
      transition_out(tab_indicator_slot, local);
      current = false;
    },
    d(detaching) {
      if (tab_indicator_slot)
        tab_indicator_slot.d(detaching);
    }
  };
}
function create_default_slot$2(ctx) {
  let span0;
  let t0;
  let span0_class_value;
  let useActions_action;
  let t1;
  let t2;
  let span1;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = (
    /*#slots*/
    ctx[32].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[37],
    null
  );
  let if_block0 = (
    /*indicatorSpanOnlyContent*/
    ctx[6] && create_if_block_1$1(ctx)
  );
  let span0_levels = [
    {
      class: span0_class_value = classMap({
        [
          /*content$class*/
          ctx[9]
        ]: true,
        "mdc-tab__content": true
      })
    },
    prefixFilter(
      /*$$restProps*/
      ctx[25],
      "content$"
    )
  ];
  let span_data_1 = {};
  for (let i = 0; i < span0_levels.length; i += 1) {
    span_data_1 = assign(span_data_1, span0_levels[i]);
  }
  let if_block1 = !/*indicatorSpanOnlyContent*/
  ctx[6] && create_if_block$2(ctx);
  return {
    c() {
      span0 = element("span");
      if (default_slot)
        default_slot.c();
      t0 = space();
      if (if_block0)
        if_block0.c();
      t1 = space();
      if (if_block1)
        if_block1.c();
      t2 = space();
      span1 = element("span");
      this.h();
    },
    l(nodes) {
      span0 = claim_element(nodes, "SPAN", { class: true });
      var span0_nodes = children(span0);
      if (default_slot)
        default_slot.l(span0_nodes);
      t0 = claim_space(span0_nodes);
      if (if_block0)
        if_block0.l(span0_nodes);
      span0_nodes.forEach(detach);
      t1 = claim_space(nodes);
      if (if_block1)
        if_block1.l(nodes);
      t2 = claim_space(nodes);
      span1 = claim_element(nodes, "SPAN", { class: true });
      children(span1).forEach(detach);
      this.h();
    },
    h() {
      set_attributes(span0, span_data_1);
      attr(span1, "class", "mdc-tab__ripple");
    },
    m(target, anchor) {
      insert_hydration(target, span0, anchor);
      if (default_slot) {
        default_slot.m(span0, null);
      }
      append_hydration(span0, t0);
      if (if_block0)
        if_block0.m(span0, null);
      ctx[34](span0);
      insert_hydration(target, t1, anchor);
      if (if_block1)
        if_block1.m(target, anchor);
      insert_hydration(target, t2, anchor);
      insert_hydration(target, span1, anchor);
      current = true;
      if (!mounted) {
        dispose = action_destroyer(useActions_action = useActions.call(
          null,
          span0,
          /*content$use*/
          ctx[8]
        ));
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty[1] & /*$$scope*/
        64)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[37],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[37]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[37],
              dirty,
              null
            ),
            null
          );
        }
      }
      if (
        /*indicatorSpanOnlyContent*/
        ctx2[6]
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty[0] & /*indicatorSpanOnlyContent*/
          64) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_1$1(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(span0, null);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      set_attributes(span0, span_data_1 = get_spread_update(span0_levels, [
        (!current || dirty[0] & /*content$class*/
        512 && span0_class_value !== (span0_class_value = classMap({
          [
            /*content$class*/
            ctx2[9]
          ]: true,
          "mdc-tab__content": true
        }))) && { class: span0_class_value },
        dirty[0] & /*$$restProps*/
        33554432 && prefixFilter(
          /*$$restProps*/
          ctx2[25],
          "content$"
        )
      ]));
      if (useActions_action && is_function(useActions_action.update) && dirty[0] & /*content$use*/
      256)
        useActions_action.update.call(
          null,
          /*content$use*/
          ctx2[8]
        );
      if (!/*indicatorSpanOnlyContent*/
      ctx2[6]) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty[0] & /*indicatorSpanOnlyContent*/
          64) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block$2(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(t2.parentNode, t2);
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
      transition_in(default_slot, local);
      transition_in(if_block0);
      transition_in(if_block1);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      transition_out(if_block0);
      transition_out(if_block1);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(span0);
        detach(t1);
        detach(t2);
        detach(span1);
      }
      if (default_slot)
        default_slot.d(detaching);
      if (if_block0)
        if_block0.d();
      ctx[34](null);
      if (if_block1)
        if_block1.d(detaching);
      mounted = false;
      dispose();
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
      ctx[11]
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
            addClass: (
              /*addClass*/
              ctx[21]
            ),
            removeClass: (
              /*removeClass*/
              ctx[22]
            ),
            addStyle: (
              /*addStyle*/
              ctx[23]
            )
          }
        ],
        /*forwardEvents*/
        ctx[20],
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
        "mdc-tab": true,
        "mdc-tab--active": (
          /*active*/
          ctx[18]
        ),
        "mdc-tab--stacked": (
          /*stacked*/
          ctx[4]
        ),
        "mdc-tab--min-width": (
          /*minWidth*/
          ctx[5]
        ),
        .../*internalClasses*/
        ctx[15]
      })
    },
    {
      style: Object.entries(
        /*internalStyles*/
        ctx[16]
      ).map(func$1).concat([
        /*style*/
        ctx[2]
      ]).join(" ")
    },
    { role: "tab" },
    {
      "aria-selected": (
        /*active*/
        ctx[18] ? "true" : "false"
      )
    },
    {
      tabindex: (
        /*active*/
        ctx[18] || /*forceAccessible*/
        ctx[19] ? "0" : "-1"
      )
    },
    { href: (
      /*href*/
      ctx[7]
    ) },
    /*internalAttrs*/
    ctx[17],
    exclude(
      /*$$restProps*/
      ctx[25],
      ["content$", "tabIndicator$"]
    )
  ];
  var switch_value = (
    /*component*/
    ctx[10]
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
    ctx[36](switch_instance);
    switch_instance.$on(
      "click",
      /*handleClick*/
      ctx[24]
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
      const switch_instance_changes = dirty[0] & /*tag, ripple, addClass, removeClass, addStyle, forwardEvents, use, className, active, stacked, minWidth, internalClasses, internalStyles, style, forceAccessible, href, internalAttrs, $$restProps*/
      50301119 ? get_spread_update(switch_instance_spread_levels, [
        dirty[0] & /*tag*/
        2048 && { tag: (
          /*tag*/
          ctx2[11]
        ) },
        dirty[0] & /*ripple, addClass, removeClass, addStyle, forwardEvents, use*/
        15728649 && {
          use: [
            [
              Ripple,
              {
                ripple: (
                  /*ripple*/
                  ctx2[3]
                ),
                unbounded: false,
                addClass: (
                  /*addClass*/
                  ctx2[21]
                ),
                removeClass: (
                  /*removeClass*/
                  ctx2[22]
                ),
                addStyle: (
                  /*addStyle*/
                  ctx2[23]
                )
              }
            ],
            /*forwardEvents*/
            ctx2[20],
            .../*use*/
            ctx2[0]
          ]
        },
        dirty[0] & /*className, active, stacked, minWidth, internalClasses*/
        294962 && {
          class: classMap({
            [
              /*className*/
              ctx2[1]
            ]: true,
            "mdc-tab": true,
            "mdc-tab--active": (
              /*active*/
              ctx2[18]
            ),
            "mdc-tab--stacked": (
              /*stacked*/
              ctx2[4]
            ),
            "mdc-tab--min-width": (
              /*minWidth*/
              ctx2[5]
            ),
            .../*internalClasses*/
            ctx2[15]
          })
        },
        dirty[0] & /*internalStyles, style*/
        65540 && {
          style: Object.entries(
            /*internalStyles*/
            ctx2[16]
          ).map(func$1).concat([
            /*style*/
            ctx2[2]
          ]).join(" ")
        },
        switch_instance_spread_levels[4],
        dirty[0] & /*active*/
        262144 && {
          "aria-selected": (
            /*active*/
            ctx2[18] ? "true" : "false"
          )
        },
        dirty[0] & /*active, forceAccessible*/
        786432 && {
          tabindex: (
            /*active*/
            ctx2[18] || /*forceAccessible*/
            ctx2[19] ? "0" : "-1"
          )
        },
        dirty[0] & /*href*/
        128 && { href: (
          /*href*/
          ctx2[7]
        ) },
        dirty[0] & /*internalAttrs*/
        131072 && get_spread_object(
          /*internalAttrs*/
          ctx2[17]
        ),
        dirty[0] & /*$$restProps*/
        33554432 && get_spread_object(exclude(
          /*$$restProps*/
          ctx2[25],
          ["content$", "tabIndicator$"]
        ))
      ]) : {};
      if (dirty[0] & /*active, $$restProps, tabIndicator, indicatorSpanOnlyContent, content$class, content, content$use*/
      33841984 | dirty[1] & /*$$scope*/
      64) {
        switch_instance_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (dirty[0] & /*component*/
      1024 && switch_value !== (switch_value = /*component*/
      ctx2[10])) {
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
          ctx2[36](switch_instance);
          switch_instance.$on(
            "click",
            /*handleClick*/
            ctx2[24]
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
      ctx[36](null);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
const func$1 = ([name, value]) => `${name}: ${value};`;
function instance_1$4($$self, $$props, $$invalidate) {
  const omit_props_names = [
    "use",
    "class",
    "style",
    "tab",
    "ripple",
    "stacked",
    "minWidth",
    "indicatorSpanOnlyContent",
    "href",
    "content$use",
    "content$class",
    "component",
    "tag",
    "activate",
    "deactivate",
    "focus",
    "getElement"
  ];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { style = "" } = $$props;
  let { tab: tabId } = $$props;
  let { ripple = true } = $$props;
  let { stacked = false } = $$props;
  let { minWidth = false } = $$props;
  let { indicatorSpanOnlyContent = false } = $$props;
  let { href = void 0 } = $$props;
  let { content$use = [] } = $$props;
  let { content$class = "" } = $$props;
  let element2;
  let instance2;
  let content;
  let tabIndicator;
  let internalClasses = {};
  let internalStyles = {};
  let internalAttrs = {};
  let focusOnActivate = getContext("SMUI:tab:focusOnActivate");
  let active = tabId === getContext("SMUI:tab:initialActive");
  let forceAccessible = false;
  let { component = SmuiElement } = $$props;
  let { tag = component === SmuiElement ? href == null ? "button" : "a" : void 0 } = $$props;
  setContext("SMUI:label:context", "tab");
  setContext("SMUI:icon:context", "tab");
  if (!tabId) {
    throw new Error("The tab property is required! It should be passed down from the TabBar to the Tab.");
  }
  onMount(() => {
    $$invalidate(31, instance2 = new MDCTabFoundation({
      setAttr: addAttr,
      addClass,
      removeClass,
      hasClass,
      activateIndicator: (previousIndicatorClientRect) => tabIndicator.activate(previousIndicatorClientRect),
      deactivateIndicator: () => tabIndicator.deactivate(),
      notifyInteracted: () => dispatch(getElement(), "SMUITab:interacted", { tabId }, void 0, true),
      getOffsetLeft: () => getElement().offsetLeft,
      getOffsetWidth: () => getElement().offsetWidth,
      getContentOffsetLeft: () => content.offsetLeft,
      getContentOffsetWidth: () => content.offsetWidth,
      focus
    }));
    const accessor = {
      tabId,
      get element() {
        return getElement();
      },
      get active() {
        return active;
      },
      forceAccessible(accessible) {
        $$invalidate(19, forceAccessible = accessible);
      },
      computeIndicatorClientRect: () => tabIndicator.computeContentClientRect(),
      computeDimensions: () => instance2.computeDimensions(),
      focus,
      activate,
      deactivate
    };
    dispatch(getElement(), "SMUITab:mount", accessor);
    instance2.init();
    return () => {
      dispatch(getElement(), "SMUITab:unmount", accessor);
      instance2.destroy();
    };
  });
  function hasClass(className2) {
    return className2 in internalClasses ? internalClasses[className2] : getElement().classList.contains(className2);
  }
  function addClass(className2) {
    if (!internalClasses[className2]) {
      $$invalidate(15, internalClasses[className2] = true, internalClasses);
    }
  }
  function removeClass(className2) {
    if (!(className2 in internalClasses) || internalClasses[className2]) {
      $$invalidate(15, internalClasses[className2] = false, internalClasses);
    }
  }
  function addStyle(name, value) {
    if (internalStyles[name] != value) {
      if (value === "" || value == null) {
        delete internalStyles[name];
        $$invalidate(16, internalStyles);
      } else {
        $$invalidate(16, internalStyles[name] = value, internalStyles);
      }
    }
  }
  function addAttr(name, value) {
    if (internalAttrs[name] !== value) {
      $$invalidate(17, internalAttrs[name] = value, internalAttrs);
    }
  }
  function handleClick(event) {
    if (!event.defaultPrevented && instance2) {
      instance2.handleClick();
    }
  }
  function activate(previousIndicatorClientRect, skipFocus) {
    $$invalidate(18, active = true);
    if (skipFocus) {
      instance2.setFocusOnActivate(false);
    }
    instance2.activate(previousIndicatorClientRect);
    if (skipFocus) {
      instance2.setFocusOnActivate(focusOnActivate);
    }
  }
  function deactivate() {
    $$invalidate(18, active = false);
    instance2.deactivate();
  }
  function focus() {
    getElement().focus();
  }
  function getElement() {
    return element2.getElement();
  }
  function tabindicator_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      tabIndicator = $$value;
      $$invalidate(14, tabIndicator);
    });
  }
  function span0_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      content = $$value;
      $$invalidate(13, content);
    });
  }
  function tabindicator_binding_1($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      tabIndicator = $$value;
      $$invalidate(14, tabIndicator);
    });
  }
  function switch_instance_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(12, element2);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(25, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("tab" in $$new_props)
      $$invalidate(26, tabId = $$new_props.tab);
    if ("ripple" in $$new_props)
      $$invalidate(3, ripple = $$new_props.ripple);
    if ("stacked" in $$new_props)
      $$invalidate(4, stacked = $$new_props.stacked);
    if ("minWidth" in $$new_props)
      $$invalidate(5, minWidth = $$new_props.minWidth);
    if ("indicatorSpanOnlyContent" in $$new_props)
      $$invalidate(6, indicatorSpanOnlyContent = $$new_props.indicatorSpanOnlyContent);
    if ("href" in $$new_props)
      $$invalidate(7, href = $$new_props.href);
    if ("content$use" in $$new_props)
      $$invalidate(8, content$use = $$new_props.content$use);
    if ("content$class" in $$new_props)
      $$invalidate(9, content$class = $$new_props.content$class);
    if ("component" in $$new_props)
      $$invalidate(10, component = $$new_props.component);
    if ("tag" in $$new_props)
      $$invalidate(11, tag = $$new_props.tag);
    if ("$$scope" in $$new_props)
      $$invalidate(37, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[1] & /*instance*/
    1) {
      if (instance2) {
        instance2.setFocusOnActivate(focusOnActivate);
      }
    }
  };
  return [
    use,
    className,
    style,
    ripple,
    stacked,
    minWidth,
    indicatorSpanOnlyContent,
    href,
    content$use,
    content$class,
    component,
    tag,
    element2,
    content,
    tabIndicator,
    internalClasses,
    internalStyles,
    internalAttrs,
    active,
    forceAccessible,
    forwardEvents,
    addClass,
    removeClass,
    addStyle,
    handleClick,
    $$restProps,
    tabId,
    activate,
    deactivate,
    focus,
    getElement,
    instance2,
    slots,
    tabindicator_binding,
    span0_binding,
    tabindicator_binding_1,
    switch_instance_binding,
    $$scope
  ];
}
class Tab extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance_1$4,
      create_fragment$5,
      safe_not_equal,
      {
        use: 0,
        class: 1,
        style: 2,
        tab: 26,
        ripple: 3,
        stacked: 4,
        minWidth: 5,
        indicatorSpanOnlyContent: 6,
        href: 7,
        content$use: 8,
        content$class: 9,
        component: 10,
        tag: 11,
        activate: 27,
        deactivate: 28,
        focus: 29,
        getElement: 30
      },
      null,
      [-1, -1]
    );
  }
  get activate() {
    return this.$$.ctx[27];
  }
  get deactivate() {
    return this.$$.ctx[28];
  }
  get focus() {
    return this.$$.ctx[29];
  }
  get getElement() {
    return this.$$.ctx[30];
  }
}
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
  ANIMATING: "mdc-tab-scroller--animating",
  SCROLL_AREA_SCROLL: "mdc-tab-scroller__scroll-area--scroll",
  SCROLL_TEST: "mdc-tab-scroller__test"
};
var strings$1 = {
  AREA_SELECTOR: ".mdc-tab-scroller__scroll-area",
  CONTENT_SELECTOR: ".mdc-tab-scroller__scroll-content"
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
var MDCTabScrollerRTL = (
  /** @class */
  function() {
    function MDCTabScrollerRTL2(adapter) {
      this.adapter = adapter;
    }
    return MDCTabScrollerRTL2;
  }()
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
var MDCTabScrollerRTLDefault = (
  /** @class */
  function(_super) {
    __extends(MDCTabScrollerRTLDefault2, _super);
    function MDCTabScrollerRTLDefault2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    MDCTabScrollerRTLDefault2.prototype.getScrollPositionRTL = function() {
      var currentScrollLeft = this.adapter.getScrollAreaScrollLeft();
      var right = this.calculateScrollEdges().right;
      return Math.round(right - currentScrollLeft);
    };
    MDCTabScrollerRTLDefault2.prototype.scrollToRTL = function(scrollX) {
      var edges = this.calculateScrollEdges();
      var currentScrollLeft = this.adapter.getScrollAreaScrollLeft();
      var clampedScrollLeft = this.clampScrollValue(edges.right - scrollX);
      return {
        finalScrollPosition: clampedScrollLeft,
        scrollDelta: clampedScrollLeft - currentScrollLeft
      };
    };
    MDCTabScrollerRTLDefault2.prototype.incrementScrollRTL = function(scrollX) {
      var currentScrollLeft = this.adapter.getScrollAreaScrollLeft();
      var clampedScrollLeft = this.clampScrollValue(currentScrollLeft - scrollX);
      return {
        finalScrollPosition: clampedScrollLeft,
        scrollDelta: clampedScrollLeft - currentScrollLeft
      };
    };
    MDCTabScrollerRTLDefault2.prototype.getAnimatingScrollPosition = function(scrollX) {
      return scrollX;
    };
    MDCTabScrollerRTLDefault2.prototype.calculateScrollEdges = function() {
      var contentWidth = this.adapter.getScrollContentOffsetWidth();
      var rootWidth = this.adapter.getScrollAreaOffsetWidth();
      return {
        left: 0,
        right: contentWidth - rootWidth
      };
    };
    MDCTabScrollerRTLDefault2.prototype.clampScrollValue = function(scrollX) {
      var edges = this.calculateScrollEdges();
      return Math.min(Math.max(edges.left, scrollX), edges.right);
    };
    return MDCTabScrollerRTLDefault2;
  }(MDCTabScrollerRTL)
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
var MDCTabScrollerRTLNegative = (
  /** @class */
  function(_super) {
    __extends(MDCTabScrollerRTLNegative2, _super);
    function MDCTabScrollerRTLNegative2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    MDCTabScrollerRTLNegative2.prototype.getScrollPositionRTL = function(translateX) {
      var currentScrollLeft = this.adapter.getScrollAreaScrollLeft();
      return Math.round(translateX - currentScrollLeft);
    };
    MDCTabScrollerRTLNegative2.prototype.scrollToRTL = function(scrollX) {
      var currentScrollLeft = this.adapter.getScrollAreaScrollLeft();
      var clampedScrollLeft = this.clampScrollValue(-scrollX);
      return {
        finalScrollPosition: clampedScrollLeft,
        scrollDelta: clampedScrollLeft - currentScrollLeft
      };
    };
    MDCTabScrollerRTLNegative2.prototype.incrementScrollRTL = function(scrollX) {
      var currentScrollLeft = this.adapter.getScrollAreaScrollLeft();
      var clampedScrollLeft = this.clampScrollValue(currentScrollLeft - scrollX);
      return {
        finalScrollPosition: clampedScrollLeft,
        scrollDelta: clampedScrollLeft - currentScrollLeft
      };
    };
    MDCTabScrollerRTLNegative2.prototype.getAnimatingScrollPosition = function(scrollX, translateX) {
      return scrollX - translateX;
    };
    MDCTabScrollerRTLNegative2.prototype.calculateScrollEdges = function() {
      var contentWidth = this.adapter.getScrollContentOffsetWidth();
      var rootWidth = this.adapter.getScrollAreaOffsetWidth();
      return {
        left: rootWidth - contentWidth,
        right: 0
      };
    };
    MDCTabScrollerRTLNegative2.prototype.clampScrollValue = function(scrollX) {
      var edges = this.calculateScrollEdges();
      return Math.max(Math.min(edges.right, scrollX), edges.left);
    };
    return MDCTabScrollerRTLNegative2;
  }(MDCTabScrollerRTL)
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
var MDCTabScrollerRTLReverse = (
  /** @class */
  function(_super) {
    __extends(MDCTabScrollerRTLReverse2, _super);
    function MDCTabScrollerRTLReverse2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    MDCTabScrollerRTLReverse2.prototype.getScrollPositionRTL = function(translateX) {
      var currentScrollLeft = this.adapter.getScrollAreaScrollLeft();
      return Math.round(currentScrollLeft - translateX);
    };
    MDCTabScrollerRTLReverse2.prototype.scrollToRTL = function(scrollX) {
      var currentScrollLeft = this.adapter.getScrollAreaScrollLeft();
      var clampedScrollLeft = this.clampScrollValue(scrollX);
      return {
        finalScrollPosition: clampedScrollLeft,
        scrollDelta: currentScrollLeft - clampedScrollLeft
      };
    };
    MDCTabScrollerRTLReverse2.prototype.incrementScrollRTL = function(scrollX) {
      var currentScrollLeft = this.adapter.getScrollAreaScrollLeft();
      var clampedScrollLeft = this.clampScrollValue(currentScrollLeft + scrollX);
      return {
        finalScrollPosition: clampedScrollLeft,
        scrollDelta: currentScrollLeft - clampedScrollLeft
      };
    };
    MDCTabScrollerRTLReverse2.prototype.getAnimatingScrollPosition = function(scrollX, translateX) {
      return scrollX + translateX;
    };
    MDCTabScrollerRTLReverse2.prototype.calculateScrollEdges = function() {
      var contentWidth = this.adapter.getScrollContentOffsetWidth();
      var rootWidth = this.adapter.getScrollAreaOffsetWidth();
      return {
        left: contentWidth - rootWidth,
        right: 0
      };
    };
    MDCTabScrollerRTLReverse2.prototype.clampScrollValue = function(scrollX) {
      var edges = this.calculateScrollEdges();
      return Math.min(Math.max(edges.right, scrollX), edges.left);
    };
    return MDCTabScrollerRTLReverse2;
  }(MDCTabScrollerRTL)
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
var MDCTabScrollerFoundation = (
  /** @class */
  function(_super) {
    __extends(MDCTabScrollerFoundation2, _super);
    function MDCTabScrollerFoundation2(adapter) {
      var _this = _super.call(this, __assign(__assign({}, MDCTabScrollerFoundation2.defaultAdapter), adapter)) || this;
      _this.isAnimating = false;
      return _this;
    }
    Object.defineProperty(MDCTabScrollerFoundation2, "cssClasses", {
      get: function() {
        return cssClasses;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCTabScrollerFoundation2, "strings", {
      get: function() {
        return strings$1;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCTabScrollerFoundation2, "defaultAdapter", {
      get: function() {
        return {
          eventTargetMatchesSelector: function() {
            return false;
          },
          addClass: function() {
            return void 0;
          },
          removeClass: function() {
            return void 0;
          },
          addScrollAreaClass: function() {
            return void 0;
          },
          setScrollAreaStyleProperty: function() {
            return void 0;
          },
          setScrollContentStyleProperty: function() {
            return void 0;
          },
          getScrollContentStyleValue: function() {
            return "";
          },
          setScrollAreaScrollLeft: function() {
            return void 0;
          },
          getScrollAreaScrollLeft: function() {
            return 0;
          },
          getScrollContentOffsetWidth: function() {
            return 0;
          },
          getScrollAreaOffsetWidth: function() {
            return 0;
          },
          computeScrollAreaClientRect: function() {
            return { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 };
          },
          computeScrollContentClientRect: function() {
            return { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 };
          },
          computeHorizontalScrollbarHeight: function() {
            return 0;
          }
        };
      },
      enumerable: false,
      configurable: true
    });
    MDCTabScrollerFoundation2.prototype.init = function() {
      var horizontalScrollbarHeight = this.adapter.computeHorizontalScrollbarHeight();
      this.adapter.setScrollAreaStyleProperty("margin-bottom", -horizontalScrollbarHeight + "px");
      this.adapter.addScrollAreaClass(MDCTabScrollerFoundation2.cssClasses.SCROLL_AREA_SCROLL);
    };
    MDCTabScrollerFoundation2.prototype.getScrollPosition = function() {
      if (this.isRTL()) {
        return this.computeCurrentScrollPositionRTL();
      }
      var currentTranslateX = this.calculateCurrentTranslateX();
      var scrollLeft = this.adapter.getScrollAreaScrollLeft();
      return scrollLeft - currentTranslateX;
    };
    MDCTabScrollerFoundation2.prototype.handleInteraction = function() {
      if (!this.isAnimating) {
        return;
      }
      this.stopScrollAnimation();
    };
    MDCTabScrollerFoundation2.prototype.handleTransitionEnd = function(evt) {
      var evtTarget = evt.target;
      if (!this.isAnimating || !this.adapter.eventTargetMatchesSelector(evtTarget, MDCTabScrollerFoundation2.strings.CONTENT_SELECTOR)) {
        return;
      }
      this.isAnimating = false;
      this.adapter.removeClass(MDCTabScrollerFoundation2.cssClasses.ANIMATING);
    };
    MDCTabScrollerFoundation2.prototype.incrementScroll = function(scrollXIncrement) {
      if (scrollXIncrement === 0) {
        return;
      }
      this.animate(this.getIncrementScrollOperation(scrollXIncrement));
    };
    MDCTabScrollerFoundation2.prototype.incrementScrollImmediate = function(scrollXIncrement) {
      if (scrollXIncrement === 0) {
        return;
      }
      var operation = this.getIncrementScrollOperation(scrollXIncrement);
      if (operation.scrollDelta === 0) {
        return;
      }
      this.stopScrollAnimation();
      this.adapter.setScrollAreaScrollLeft(operation.finalScrollPosition);
    };
    MDCTabScrollerFoundation2.prototype.scrollTo = function(scrollX) {
      if (this.isRTL()) {
        this.scrollToImplRTL(scrollX);
        return;
      }
      this.scrollToImpl(scrollX);
    };
    MDCTabScrollerFoundation2.prototype.getRTLScroller = function() {
      if (!this.rtlScrollerInstance) {
        this.rtlScrollerInstance = this.rtlScrollerFactory();
      }
      return this.rtlScrollerInstance;
    };
    MDCTabScrollerFoundation2.prototype.calculateCurrentTranslateX = function() {
      var transformValue = this.adapter.getScrollContentStyleValue("transform");
      if (transformValue === "none") {
        return 0;
      }
      var match = /\((.+?)\)/.exec(transformValue);
      if (!match) {
        return 0;
      }
      var matrixParams = match[1];
      var _a = __read(matrixParams.split(","), 6);
      _a[0];
      _a[1];
      _a[2];
      _a[3];
      var tx = _a[4];
      _a[5];
      return parseFloat(tx);
    };
    MDCTabScrollerFoundation2.prototype.clampScrollValue = function(scrollX) {
      var edges = this.calculateScrollEdges();
      return Math.min(Math.max(edges.left, scrollX), edges.right);
    };
    MDCTabScrollerFoundation2.prototype.computeCurrentScrollPositionRTL = function() {
      var translateX = this.calculateCurrentTranslateX();
      return this.getRTLScroller().getScrollPositionRTL(translateX);
    };
    MDCTabScrollerFoundation2.prototype.calculateScrollEdges = function() {
      var contentWidth = this.adapter.getScrollContentOffsetWidth();
      var rootWidth = this.adapter.getScrollAreaOffsetWidth();
      return {
        left: 0,
        right: contentWidth - rootWidth
      };
    };
    MDCTabScrollerFoundation2.prototype.scrollToImpl = function(scrollX) {
      var currentScrollX = this.getScrollPosition();
      var safeScrollX = this.clampScrollValue(scrollX);
      var scrollDelta = safeScrollX - currentScrollX;
      this.animate({
        finalScrollPosition: safeScrollX,
        scrollDelta
      });
    };
    MDCTabScrollerFoundation2.prototype.scrollToImplRTL = function(scrollX) {
      var animation = this.getRTLScroller().scrollToRTL(scrollX);
      this.animate(animation);
    };
    MDCTabScrollerFoundation2.prototype.getIncrementScrollOperation = function(scrollX) {
      if (this.isRTL()) {
        return this.getRTLScroller().incrementScrollRTL(scrollX);
      }
      var currentScrollX = this.getScrollPosition();
      var targetScrollX = scrollX + currentScrollX;
      var safeScrollX = this.clampScrollValue(targetScrollX);
      var scrollDelta = safeScrollX - currentScrollX;
      return {
        finalScrollPosition: safeScrollX,
        scrollDelta
      };
    };
    MDCTabScrollerFoundation2.prototype.animate = function(animation) {
      var _this = this;
      if (animation.scrollDelta === 0) {
        return;
      }
      this.stopScrollAnimation();
      this.adapter.setScrollAreaScrollLeft(animation.finalScrollPosition);
      this.adapter.setScrollContentStyleProperty("transform", "translateX(" + animation.scrollDelta + "px)");
      this.adapter.computeScrollAreaClientRect();
      requestAnimationFrame(function() {
        _this.adapter.addClass(MDCTabScrollerFoundation2.cssClasses.ANIMATING);
        _this.adapter.setScrollContentStyleProperty("transform", "none");
      });
      this.isAnimating = true;
    };
    MDCTabScrollerFoundation2.prototype.stopScrollAnimation = function() {
      this.isAnimating = false;
      var currentScrollPosition = this.getAnimatingScrollPosition();
      this.adapter.removeClass(MDCTabScrollerFoundation2.cssClasses.ANIMATING);
      this.adapter.setScrollContentStyleProperty("transform", "translateX(0px)");
      this.adapter.setScrollAreaScrollLeft(currentScrollPosition);
    };
    MDCTabScrollerFoundation2.prototype.getAnimatingScrollPosition = function() {
      var currentTranslateX = this.calculateCurrentTranslateX();
      var scrollLeft = this.adapter.getScrollAreaScrollLeft();
      if (this.isRTL()) {
        return this.getRTLScroller().getAnimatingScrollPosition(scrollLeft, currentTranslateX);
      }
      return scrollLeft - currentTranslateX;
    };
    MDCTabScrollerFoundation2.prototype.rtlScrollerFactory = function() {
      var initialScrollLeft = this.adapter.getScrollAreaScrollLeft();
      this.adapter.setScrollAreaScrollLeft(initialScrollLeft - 1);
      var newScrollLeft = this.adapter.getScrollAreaScrollLeft();
      if (newScrollLeft < 0) {
        this.adapter.setScrollAreaScrollLeft(initialScrollLeft);
        return new MDCTabScrollerRTLNegative(this.adapter);
      }
      var rootClientRect = this.adapter.computeScrollAreaClientRect();
      var contentClientRect = this.adapter.computeScrollContentClientRect();
      var rightEdgeDelta = Math.round(contentClientRect.right - rootClientRect.right);
      this.adapter.setScrollAreaScrollLeft(initialScrollLeft);
      if (rightEdgeDelta === newScrollLeft) {
        return new MDCTabScrollerRTLReverse(this.adapter);
      }
      return new MDCTabScrollerRTLDefault(this.adapter);
    };
    MDCTabScrollerFoundation2.prototype.isRTL = function() {
      return this.adapter.getScrollContentStyleValue("direction") === "rtl";
    };
    return MDCTabScrollerFoundation2;
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
var horizontalScrollbarHeight_;
function computeHorizontalScrollbarHeight(documentObj, shouldCacheResult) {
  if (shouldCacheResult === void 0) {
    shouldCacheResult = true;
  }
  if (shouldCacheResult && typeof horizontalScrollbarHeight_ !== "undefined") {
    return horizontalScrollbarHeight_;
  }
  var el = documentObj.createElement("div");
  el.classList.add(cssClasses.SCROLL_TEST);
  documentObj.body.appendChild(el);
  var horizontalScrollbarHeight = el.offsetHeight - el.clientHeight;
  documentObj.body.removeChild(el);
  if (shouldCacheResult) {
    horizontalScrollbarHeight_ = horizontalScrollbarHeight;
  }
  return horizontalScrollbarHeight;
}
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
  ARROW_LEFT_KEY: "ArrowLeft",
  ARROW_RIGHT_KEY: "ArrowRight",
  END_KEY: "End",
  ENTER_KEY: "Enter",
  HOME_KEY: "Home",
  SPACE_KEY: "Space",
  TAB_ACTIVATED_EVENT: "MDCTabBar:activated",
  TAB_SCROLLER_SELECTOR: ".mdc-tab-scroller",
  TAB_SELECTOR: ".mdc-tab"
};
var numbers = {
  ARROW_LEFT_KEYCODE: 37,
  ARROW_RIGHT_KEYCODE: 39,
  END_KEYCODE: 35,
  ENTER_KEYCODE: 13,
  EXTRA_SCROLL_AMOUNT: 20,
  HOME_KEYCODE: 36,
  SPACE_KEYCODE: 32
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
var ACCEPTABLE_KEYS = /* @__PURE__ */ new Set();
ACCEPTABLE_KEYS.add(strings.ARROW_LEFT_KEY);
ACCEPTABLE_KEYS.add(strings.ARROW_RIGHT_KEY);
ACCEPTABLE_KEYS.add(strings.END_KEY);
ACCEPTABLE_KEYS.add(strings.HOME_KEY);
ACCEPTABLE_KEYS.add(strings.ENTER_KEY);
ACCEPTABLE_KEYS.add(strings.SPACE_KEY);
var KEYCODE_MAP = /* @__PURE__ */ new Map();
KEYCODE_MAP.set(numbers.ARROW_LEFT_KEYCODE, strings.ARROW_LEFT_KEY);
KEYCODE_MAP.set(numbers.ARROW_RIGHT_KEYCODE, strings.ARROW_RIGHT_KEY);
KEYCODE_MAP.set(numbers.END_KEYCODE, strings.END_KEY);
KEYCODE_MAP.set(numbers.HOME_KEYCODE, strings.HOME_KEY);
KEYCODE_MAP.set(numbers.ENTER_KEYCODE, strings.ENTER_KEY);
KEYCODE_MAP.set(numbers.SPACE_KEYCODE, strings.SPACE_KEY);
var MDCTabBarFoundation = (
  /** @class */
  function(_super) {
    __extends(MDCTabBarFoundation2, _super);
    function MDCTabBarFoundation2(adapter) {
      var _this = _super.call(this, __assign(__assign({}, MDCTabBarFoundation2.defaultAdapter), adapter)) || this;
      _this.useAutomaticActivation = false;
      return _this;
    }
    Object.defineProperty(MDCTabBarFoundation2, "strings", {
      get: function() {
        return strings;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCTabBarFoundation2, "numbers", {
      get: function() {
        return numbers;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCTabBarFoundation2, "defaultAdapter", {
      get: function() {
        return {
          scrollTo: function() {
            return void 0;
          },
          incrementScroll: function() {
            return void 0;
          },
          getScrollPosition: function() {
            return 0;
          },
          getScrollContentWidth: function() {
            return 0;
          },
          getOffsetWidth: function() {
            return 0;
          },
          isRTL: function() {
            return false;
          },
          setActiveTab: function() {
            return void 0;
          },
          activateTabAtIndex: function() {
            return void 0;
          },
          deactivateTabAtIndex: function() {
            return void 0;
          },
          focusTabAtIndex: function() {
            return void 0;
          },
          getTabIndicatorClientRectAtIndex: function() {
            return { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 };
          },
          getTabDimensionsAtIndex: function() {
            return { rootLeft: 0, rootRight: 0, contentLeft: 0, contentRight: 0 };
          },
          getPreviousActiveTabIndex: function() {
            return -1;
          },
          getFocusedTabIndex: function() {
            return -1;
          },
          getIndexOfTabById: function() {
            return -1;
          },
          getTabListLength: function() {
            return 0;
          },
          notifyTabActivated: function() {
            return void 0;
          }
        };
      },
      enumerable: false,
      configurable: true
    });
    MDCTabBarFoundation2.prototype.setUseAutomaticActivation = function(useAutomaticActivation) {
      this.useAutomaticActivation = useAutomaticActivation;
    };
    MDCTabBarFoundation2.prototype.activateTab = function(index) {
      var previousActiveIndex = this.adapter.getPreviousActiveTabIndex();
      if (!this.indexIsInRange(index) || index === previousActiveIndex) {
        return;
      }
      var previousClientRect;
      if (previousActiveIndex !== -1) {
        this.adapter.deactivateTabAtIndex(previousActiveIndex);
        previousClientRect = this.adapter.getTabIndicatorClientRectAtIndex(previousActiveIndex);
      }
      this.adapter.activateTabAtIndex(index, previousClientRect);
      this.scrollIntoView(index);
      this.adapter.notifyTabActivated(index);
    };
    MDCTabBarFoundation2.prototype.handleKeyDown = function(evt) {
      var key = this.getKeyFromEvent(evt);
      if (key === void 0) {
        return;
      }
      if (!this.isActivationKey(key)) {
        evt.preventDefault();
      }
      if (this.useAutomaticActivation) {
        if (this.isActivationKey(key)) {
          return;
        }
        var index = this.determineTargetFromKey(this.adapter.getPreviousActiveTabIndex(), key);
        this.adapter.setActiveTab(index);
        this.scrollIntoView(index);
      } else {
        var focusedTabIndex = this.adapter.getFocusedTabIndex();
        if (this.isActivationKey(key)) {
          this.adapter.setActiveTab(focusedTabIndex);
        } else {
          var index = this.determineTargetFromKey(focusedTabIndex, key);
          this.adapter.focusTabAtIndex(index);
          this.scrollIntoView(index);
        }
      }
    };
    MDCTabBarFoundation2.prototype.handleTabInteraction = function(evt) {
      this.adapter.setActiveTab(this.adapter.getIndexOfTabById(evt.detail.tabId));
    };
    MDCTabBarFoundation2.prototype.scrollIntoView = function(index) {
      if (!this.indexIsInRange(index)) {
        return;
      }
      if (index === 0) {
        this.adapter.scrollTo(0);
        return;
      }
      if (index === this.adapter.getTabListLength() - 1) {
        this.adapter.scrollTo(this.adapter.getScrollContentWidth());
        return;
      }
      if (this.isRTL()) {
        this.scrollIntoViewImplRTL(index);
        return;
      }
      this.scrollIntoViewImpl(index);
    };
    MDCTabBarFoundation2.prototype.determineTargetFromKey = function(origin, key) {
      var isRTL = this.isRTL();
      var maxIndex = this.adapter.getTabListLength() - 1;
      var shouldGoToEnd = key === strings.END_KEY;
      var shouldDecrement = key === strings.ARROW_LEFT_KEY && !isRTL || key === strings.ARROW_RIGHT_KEY && isRTL;
      var shouldIncrement = key === strings.ARROW_RIGHT_KEY && !isRTL || key === strings.ARROW_LEFT_KEY && isRTL;
      var index = origin;
      if (shouldGoToEnd) {
        index = maxIndex;
      } else if (shouldDecrement) {
        index -= 1;
      } else if (shouldIncrement) {
        index += 1;
      } else {
        index = 0;
      }
      if (index < 0) {
        index = maxIndex;
      } else if (index > maxIndex) {
        index = 0;
      }
      return index;
    };
    MDCTabBarFoundation2.prototype.calculateScrollIncrement = function(index, nextIndex, scrollPosition, barWidth) {
      var nextTabDimensions = this.adapter.getTabDimensionsAtIndex(nextIndex);
      var relativeContentLeft = nextTabDimensions.contentLeft - scrollPosition - barWidth;
      var relativeContentRight = nextTabDimensions.contentRight - scrollPosition;
      var leftIncrement = relativeContentRight - numbers.EXTRA_SCROLL_AMOUNT;
      var rightIncrement = relativeContentLeft + numbers.EXTRA_SCROLL_AMOUNT;
      if (nextIndex < index) {
        return Math.min(leftIncrement, 0);
      }
      return Math.max(rightIncrement, 0);
    };
    MDCTabBarFoundation2.prototype.calculateScrollIncrementRTL = function(index, nextIndex, scrollPosition, barWidth, scrollContentWidth) {
      var nextTabDimensions = this.adapter.getTabDimensionsAtIndex(nextIndex);
      var relativeContentLeft = scrollContentWidth - nextTabDimensions.contentLeft - scrollPosition;
      var relativeContentRight = scrollContentWidth - nextTabDimensions.contentRight - scrollPosition - barWidth;
      var leftIncrement = relativeContentRight + numbers.EXTRA_SCROLL_AMOUNT;
      var rightIncrement = relativeContentLeft - numbers.EXTRA_SCROLL_AMOUNT;
      if (nextIndex > index) {
        return Math.max(leftIncrement, 0);
      }
      return Math.min(rightIncrement, 0);
    };
    MDCTabBarFoundation2.prototype.findAdjacentTabIndexClosestToEdge = function(index, tabDimensions, scrollPosition, barWidth) {
      var relativeRootLeft = tabDimensions.rootLeft - scrollPosition;
      var relativeRootRight = tabDimensions.rootRight - scrollPosition - barWidth;
      var relativeRootDelta = relativeRootLeft + relativeRootRight;
      var leftEdgeIsCloser = relativeRootLeft < 0 || relativeRootDelta < 0;
      var rightEdgeIsCloser = relativeRootRight > 0 || relativeRootDelta > 0;
      if (leftEdgeIsCloser) {
        return index - 1;
      }
      if (rightEdgeIsCloser) {
        return index + 1;
      }
      return -1;
    };
    MDCTabBarFoundation2.prototype.findAdjacentTabIndexClosestToEdgeRTL = function(index, tabDimensions, scrollPosition, barWidth, scrollContentWidth) {
      var rootLeft = scrollContentWidth - tabDimensions.rootLeft - barWidth - scrollPosition;
      var rootRight = scrollContentWidth - tabDimensions.rootRight - scrollPosition;
      var rootDelta = rootLeft + rootRight;
      var leftEdgeIsCloser = rootLeft > 0 || rootDelta > 0;
      var rightEdgeIsCloser = rootRight < 0 || rootDelta < 0;
      if (leftEdgeIsCloser) {
        return index + 1;
      }
      if (rightEdgeIsCloser) {
        return index - 1;
      }
      return -1;
    };
    MDCTabBarFoundation2.prototype.getKeyFromEvent = function(evt) {
      if (ACCEPTABLE_KEYS.has(evt.key)) {
        return evt.key;
      }
      return KEYCODE_MAP.get(evt.keyCode);
    };
    MDCTabBarFoundation2.prototype.isActivationKey = function(key) {
      return key === strings.SPACE_KEY || key === strings.ENTER_KEY;
    };
    MDCTabBarFoundation2.prototype.indexIsInRange = function(index) {
      return index >= 0 && index < this.adapter.getTabListLength();
    };
    MDCTabBarFoundation2.prototype.isRTL = function() {
      return this.adapter.isRTL();
    };
    MDCTabBarFoundation2.prototype.scrollIntoViewImpl = function(index) {
      var scrollPosition = this.adapter.getScrollPosition();
      var barWidth = this.adapter.getOffsetWidth();
      var tabDimensions = this.adapter.getTabDimensionsAtIndex(index);
      var nextIndex = this.findAdjacentTabIndexClosestToEdge(index, tabDimensions, scrollPosition, barWidth);
      if (!this.indexIsInRange(nextIndex)) {
        return;
      }
      var scrollIncrement = this.calculateScrollIncrement(index, nextIndex, scrollPosition, barWidth);
      this.adapter.incrementScroll(scrollIncrement);
    };
    MDCTabBarFoundation2.prototype.scrollIntoViewImplRTL = function(index) {
      var scrollPosition = this.adapter.getScrollPosition();
      var barWidth = this.adapter.getOffsetWidth();
      var tabDimensions = this.adapter.getTabDimensionsAtIndex(index);
      var scrollWidth = this.adapter.getScrollContentWidth();
      var nextIndex = this.findAdjacentTabIndexClosestToEdgeRTL(index, tabDimensions, scrollPosition, barWidth, scrollWidth);
      if (!this.indexIsInRange(nextIndex)) {
        return;
      }
      var scrollIncrement = this.calculateScrollIncrementRTL(index, nextIndex, scrollPosition, barWidth, scrollWidth);
      this.adapter.incrementScroll(scrollIncrement);
    };
    return MDCTabBarFoundation2;
  }(MDCFoundation)
);
function create_fragment$4(ctx) {
  let div2;
  let div1;
  let div0;
  let div0_class_value;
  let div0_style_value;
  let useActions_action;
  let div1_class_value;
  let div1_style_value;
  let useActions_action_1;
  let div2_class_value;
  let useActions_action_2;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = (
    /*#slots*/
    ctx[23].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[22],
    null
  );
  let div0_levels = [
    {
      class: div0_class_value = classMap({
        [
          /*scrollContent$class*/
          ctx[6]
        ]: true,
        "mdc-tab-scroller__scroll-content": true
      })
    },
    {
      style: div0_style_value = Object.entries(
        /*scrollContentStyles*/
        ctx[14]
      ).map(func).join(" ")
    },
    prefixFilter(
      /*$$restProps*/
      ctx[16],
      "scrollContent$"
    )
  ];
  let div_data = {};
  for (let i = 0; i < div0_levels.length; i += 1) {
    div_data = assign(div_data, div0_levels[i]);
  }
  let div1_levels = [
    {
      class: div1_class_value = classMap({
        [
          /*scrollArea$class*/
          ctx[4]
        ]: true,
        "mdc-tab-scroller__scroll-area": true,
        .../*scrollAreaClasses*/
        ctx[12]
      })
    },
    {
      style: div1_style_value = Object.entries(
        /*scrollAreaStyles*/
        ctx[13]
      ).map(func_1).join(" ")
    },
    prefixFilter(
      /*$$restProps*/
      ctx[16],
      "scrollArea$"
    )
  ];
  let div_data_1 = {};
  for (let i = 0; i < div1_levels.length; i += 1) {
    div_data_1 = assign(div_data_1, div1_levels[i]);
  }
  let div2_levels = [
    {
      class: div2_class_value = classMap({
        [
          /*className*/
          ctx[1]
        ]: true,
        "mdc-tab-scroller": true,
        "mdc-tab-scroller--align-start": (
          /*align*/
          ctx[2] === "start"
        ),
        "mdc-tab-scroller--align-end": (
          /*align*/
          ctx[2] === "end"
        ),
        "mdc-tab-scroller--align-center": (
          /*align*/
          ctx[2] === "center"
        ),
        .../*internalClasses*/
        ctx[11]
      })
    },
    exclude(
      /*$$restProps*/
      ctx[16],
      ["scrollArea$", "scrollContent$"]
    )
  ];
  let div_data_2 = {};
  for (let i = 0; i < div2_levels.length; i += 1) {
    div_data_2 = assign(div_data_2, div2_levels[i]);
  }
  return {
    c() {
      div2 = element("div");
      div1 = element("div");
      div0 = element("div");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      div2 = claim_element(nodes, "DIV", { class: true });
      var div2_nodes = children(div2);
      div1 = claim_element(div2_nodes, "DIV", { class: true, style: true });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", { class: true, style: true });
      var div0_nodes = children(div0);
      if (default_slot)
        default_slot.l(div0_nodes);
      div0_nodes.forEach(detach);
      div1_nodes.forEach(detach);
      div2_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(div0, div_data);
      set_attributes(div1, div_data_1);
      set_attributes(div2, div_data_2);
    },
    m(target, anchor) {
      insert_hydration(target, div2, anchor);
      append_hydration(div2, div1);
      append_hydration(div1, div0);
      if (default_slot) {
        default_slot.m(div0, null);
      }
      ctx[24](div0);
      ctx[26](div1);
      ctx[32](div2);
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(useActions_action = useActions.call(
            null,
            div0,
            /*scrollContent$use*/
            ctx[5]
          )),
          listen(
            div0,
            "transitionend",
            /*transitionend_handler*/
            ctx[25]
          ),
          action_destroyer(useActions_action_1 = useActions.call(
            null,
            div1,
            /*scrollArea$use*/
            ctx[3]
          )),
          listen(
            div1,
            "wheel",
            /*wheel_handler*/
            ctx[27],
            { passive: true }
          ),
          listen(
            div1,
            "touchstart",
            /*touchstart_handler*/
            ctx[28],
            { passive: true }
          ),
          listen(
            div1,
            "pointerdown",
            /*pointerdown_handler*/
            ctx[29]
          ),
          listen(
            div1,
            "mousedown",
            /*mousedown_handler*/
            ctx[30]
          ),
          listen(
            div1,
            "keydown",
            /*keydown_handler*/
            ctx[31]
          ),
          action_destroyer(useActions_action_2 = useActions.call(
            null,
            div2,
            /*use*/
            ctx[0]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[15].call(null, div2)
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty[0] & /*$$scope*/
        4194304)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[22],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[22]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[22],
              dirty,
              null
            ),
            null
          );
        }
      }
      set_attributes(div0, div_data = get_spread_update(div0_levels, [
        (!current || dirty[0] & /*scrollContent$class*/
        64 && div0_class_value !== (div0_class_value = classMap({
          [
            /*scrollContent$class*/
            ctx2[6]
          ]: true,
          "mdc-tab-scroller__scroll-content": true
        }))) && { class: div0_class_value },
        (!current || dirty[0] & /*scrollContentStyles*/
        16384 && div0_style_value !== (div0_style_value = Object.entries(
          /*scrollContentStyles*/
          ctx2[14]
        ).map(func).join(" "))) && { style: div0_style_value },
        dirty[0] & /*$$restProps*/
        65536 && prefixFilter(
          /*$$restProps*/
          ctx2[16],
          "scrollContent$"
        )
      ]));
      if (useActions_action && is_function(useActions_action.update) && dirty[0] & /*scrollContent$use*/
      32)
        useActions_action.update.call(
          null,
          /*scrollContent$use*/
          ctx2[5]
        );
      set_attributes(div1, div_data_1 = get_spread_update(div1_levels, [
        (!current || dirty[0] & /*scrollArea$class, scrollAreaClasses*/
        4112 && div1_class_value !== (div1_class_value = classMap({
          [
            /*scrollArea$class*/
            ctx2[4]
          ]: true,
          "mdc-tab-scroller__scroll-area": true,
          .../*scrollAreaClasses*/
          ctx2[12]
        }))) && { class: div1_class_value },
        (!current || dirty[0] & /*scrollAreaStyles*/
        8192 && div1_style_value !== (div1_style_value = Object.entries(
          /*scrollAreaStyles*/
          ctx2[13]
        ).map(func_1).join(" "))) && { style: div1_style_value },
        dirty[0] & /*$$restProps*/
        65536 && prefixFilter(
          /*$$restProps*/
          ctx2[16],
          "scrollArea$"
        )
      ]));
      if (useActions_action_1 && is_function(useActions_action_1.update) && dirty[0] & /*scrollArea$use*/
      8)
        useActions_action_1.update.call(
          null,
          /*scrollArea$use*/
          ctx2[3]
        );
      set_attributes(div2, div_data_2 = get_spread_update(div2_levels, [
        (!current || dirty[0] & /*className, align, internalClasses*/
        2054 && div2_class_value !== (div2_class_value = classMap({
          [
            /*className*/
            ctx2[1]
          ]: true,
          "mdc-tab-scroller": true,
          "mdc-tab-scroller--align-start": (
            /*align*/
            ctx2[2] === "start"
          ),
          "mdc-tab-scroller--align-end": (
            /*align*/
            ctx2[2] === "end"
          ),
          "mdc-tab-scroller--align-center": (
            /*align*/
            ctx2[2] === "center"
          ),
          .../*internalClasses*/
          ctx2[11]
        }))) && { class: div2_class_value },
        dirty[0] & /*$$restProps*/
        65536 && exclude(
          /*$$restProps*/
          ctx2[16],
          ["scrollArea$", "scrollContent$"]
        )
      ]));
      if (useActions_action_2 && is_function(useActions_action_2.update) && dirty[0] & /*use*/
      1)
        useActions_action_2.update.call(
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
        detach(div2);
      }
      if (default_slot)
        default_slot.d(detaching);
      ctx[24](null);
      ctx[26](null);
      ctx[32](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
const func = ([name, value]) => `${name}: ${value};`;
const func_1 = ([name, value]) => `${name}: ${value};`;
function instance_1$3($$self, $$props, $$invalidate) {
  const omit_props_names = [
    "use",
    "class",
    "align",
    "scrollArea$use",
    "scrollArea$class",
    "scrollContent$use",
    "scrollContent$class",
    "getScrollPosition",
    "getScrollContentWidth",
    "incrementScroll",
    "scrollTo",
    "getElement"
  ];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  const { matches } = ponyfill;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { align = void 0 } = $$props;
  let { scrollArea$use = [] } = $$props;
  let { scrollArea$class = "" } = $$props;
  let { scrollContent$use = [] } = $$props;
  let { scrollContent$class = "" } = $$props;
  let element2;
  let instance2;
  let scrollArea;
  let scrollContent;
  let internalClasses = {};
  let scrollAreaClasses = {};
  let scrollAreaStyles = {};
  let scrollContentStyles = {};
  onMount(() => {
    $$invalidate(8, instance2 = new MDCTabScrollerFoundation({
      eventTargetMatchesSelector: (evtTarget, selector) => matches(evtTarget, selector),
      addClass,
      removeClass,
      addScrollAreaClass,
      setScrollAreaStyleProperty: addScrollAreaStyle,
      setScrollContentStyleProperty: addScrollContentStyle,
      getScrollContentStyleValue: getScrollContentStyle,
      setScrollAreaScrollLeft: (scrollX) => $$invalidate(9, scrollArea.scrollLeft = scrollX, scrollArea),
      getScrollAreaScrollLeft: () => scrollArea.scrollLeft,
      getScrollContentOffsetWidth: () => scrollContent.offsetWidth,
      getScrollAreaOffsetWidth: () => scrollArea.offsetWidth,
      computeScrollAreaClientRect: () => scrollArea.getBoundingClientRect(),
      computeScrollContentClientRect: () => scrollContent.getBoundingClientRect(),
      computeHorizontalScrollbarHeight: () => computeHorizontalScrollbarHeight(document)
    }));
    instance2.init();
    return () => {
      instance2.destroy();
    };
  });
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
  function addScrollAreaClass(className2) {
    if (!scrollAreaClasses[className2]) {
      $$invalidate(12, scrollAreaClasses[className2] = true, scrollAreaClasses);
    }
  }
  function addScrollAreaStyle(name, value) {
    if (scrollAreaStyles[name] != value) {
      if (value === "" || value == null) {
        delete scrollAreaStyles[name];
        $$invalidate(13, scrollAreaStyles);
      } else {
        $$invalidate(13, scrollAreaStyles[name] = value, scrollAreaStyles);
      }
    }
  }
  function addScrollContentStyle(name, value) {
    if (scrollContentStyles[name] != value) {
      if (value === "" || value == null) {
        delete scrollContentStyles[name];
        $$invalidate(14, scrollContentStyles);
      } else {
        $$invalidate(14, scrollContentStyles[name] = value, scrollContentStyles);
      }
    }
  }
  function getScrollContentStyle(name) {
    return name in scrollContentStyles ? scrollContentStyles[name] : getComputedStyle(scrollContent).getPropertyValue(name);
  }
  function getScrollPosition() {
    return instance2.getScrollPosition();
  }
  function getScrollContentWidth() {
    return scrollContent.offsetWidth;
  }
  function incrementScroll(scrollXIncrement) {
    instance2.incrementScroll(scrollXIncrement);
  }
  function scrollTo(scrollX) {
    instance2.scrollTo(scrollX);
  }
  function getElement() {
    return element2;
  }
  function div0_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      scrollContent = $$value;
      $$invalidate(10, scrollContent);
    });
  }
  const transitionend_handler = (event) => instance2 && instance2.handleTransitionEnd(event);
  function div1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      scrollArea = $$value;
      $$invalidate(9, scrollArea);
    });
  }
  const wheel_handler = () => instance2 && instance2.handleInteraction();
  const touchstart_handler = () => instance2 && instance2.handleInteraction();
  const pointerdown_handler = () => instance2 && instance2.handleInteraction();
  const mousedown_handler = () => instance2 && instance2.handleInteraction();
  const keydown_handler = () => instance2 && instance2.handleInteraction();
  function div2_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(7, element2);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(16, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("align" in $$new_props)
      $$invalidate(2, align = $$new_props.align);
    if ("scrollArea$use" in $$new_props)
      $$invalidate(3, scrollArea$use = $$new_props.scrollArea$use);
    if ("scrollArea$class" in $$new_props)
      $$invalidate(4, scrollArea$class = $$new_props.scrollArea$class);
    if ("scrollContent$use" in $$new_props)
      $$invalidate(5, scrollContent$use = $$new_props.scrollContent$use);
    if ("scrollContent$class" in $$new_props)
      $$invalidate(6, scrollContent$class = $$new_props.scrollContent$class);
    if ("$$scope" in $$new_props)
      $$invalidate(22, $$scope = $$new_props.$$scope);
  };
  return [
    use,
    className,
    align,
    scrollArea$use,
    scrollArea$class,
    scrollContent$use,
    scrollContent$class,
    element2,
    instance2,
    scrollArea,
    scrollContent,
    internalClasses,
    scrollAreaClasses,
    scrollAreaStyles,
    scrollContentStyles,
    forwardEvents,
    $$restProps,
    getScrollPosition,
    getScrollContentWidth,
    incrementScroll,
    scrollTo,
    getElement,
    $$scope,
    slots,
    div0_binding,
    transitionend_handler,
    div1_binding,
    wheel_handler,
    touchstart_handler,
    pointerdown_handler,
    mousedown_handler,
    keydown_handler,
    div2_binding
  ];
}
class TabScroller extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance_1$3,
      create_fragment$4,
      safe_not_equal,
      {
        use: 0,
        class: 1,
        align: 2,
        scrollArea$use: 3,
        scrollArea$class: 4,
        scrollContent$use: 5,
        scrollContent$class: 6,
        getScrollPosition: 17,
        getScrollContentWidth: 18,
        incrementScroll: 19,
        scrollTo: 20,
        getElement: 21
      },
      null,
      [-1, -1]
    );
  }
  get getScrollPosition() {
    return this.$$.ctx[17];
  }
  get getScrollContentWidth() {
    return this.$$.ctx[18];
  }
  get incrementScroll() {
    return this.$$.ctx[19];
  }
  get scrollTo() {
    return this.$$.ctx[20];
  }
  get getElement() {
    return this.$$.ctx[21];
  }
}
function get_each_context$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[29] = list[i];
  return child_ctx;
}
const get_default_slot_changes = (dirty) => ({ tab: dirty[0] & /*tabs*/
4 });
const get_default_slot_context = (ctx) => ({ tab: (
  /*tab*/
  ctx[29]
) });
function create_each_block$1(key_2, ctx) {
  let first;
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[21].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[24],
    get_default_slot_context
  );
  return {
    key: key_2,
    first: null,
    c() {
      first = empty();
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      first = empty();
      if (default_slot)
        default_slot.l(nodes);
      this.h();
    },
    h() {
      this.first = first;
    },
    m(target, anchor) {
      insert_hydration(target, first, anchor);
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (default_slot) {
        if (default_slot.p && (!current || dirty[0] & /*$$scope, tabs*/
        16777220)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx,
            /*$$scope*/
            ctx[24],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx[24]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx[24],
              dirty,
              get_default_slot_changes
            ),
            get_default_slot_context
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
      if (detaching) {
        detach(first);
      }
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_default_slot$1(ctx) {
  let each_blocks = [];
  let each_1_lookup = /* @__PURE__ */ new Map();
  let each_1_anchor;
  let current;
  let each_value = ensure_array_like(
    /*tabs*/
    ctx[2]
  );
  const get_key = (ctx2) => (
    /*key*/
    ctx2[3](
      /*tab*/
      ctx2[29]
    )
  );
  for (let i = 0; i < each_value.length; i += 1) {
    let child_ctx = get_each_context$1(ctx, each_value, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block$1(key, child_ctx));
  }
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
      if (dirty[0] & /*$$scope, tabs, key*/
      16777228) {
        each_value = ensure_array_like(
          /*tabs*/
          ctx2[2]
        );
        group_outros();
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, each_1_anchor.parentNode, outro_and_destroy_block, create_each_block$1, each_1_anchor, get_each_context$1);
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
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(each_1_anchor);
      }
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d(detaching);
      }
    }
  };
}
function create_fragment$3(ctx) {
  let div;
  let tabscroller;
  let div_class_value;
  let useActions_action;
  let current;
  let mounted;
  let dispose;
  const tabscroller_spread_levels = [prefixFilter(
    /*$$restProps*/
    ctx[11],
    "tabScroller$"
  )];
  let tabscroller_props = {
    $$slots: { default: [create_default_slot$1] },
    $$scope: { ctx }
  };
  for (let i = 0; i < tabscroller_spread_levels.length; i += 1) {
    tabscroller_props = assign(tabscroller_props, tabscroller_spread_levels[i]);
  }
  tabscroller = new TabScroller({ props: tabscroller_props });
  ctx[22](tabscroller);
  let div_levels = [
    {
      class: div_class_value = classMap({
        [
          /*className*/
          ctx[1]
        ]: true,
        "mdc-tab-bar": true
      })
    },
    { role: "tablist" },
    { tabindex: (
      /*tabindex*/
      ctx[4]
    ) },
    exclude(
      /*$$restProps*/
      ctx[11],
      ["tabScroller$"]
    )
  ];
  let div_data = {};
  for (let i = 0; i < div_levels.length; i += 1) {
    div_data = assign(div_data, div_levels[i]);
  }
  return {
    c() {
      div = element("div");
      create_component(tabscroller.$$.fragment);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true, role: true, tabindex: true });
      var div_nodes = children(div);
      claim_component(tabscroller.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(div, div_data);
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      mount_component(tabscroller, div, null);
      ctx[23](div);
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
            ctx[8].call(null, div)
          ),
          listen(
            div,
            "SMUITab:mount",
            /*handleTabMount*/
            ctx[9]
          ),
          listen(
            div,
            "SMUITab:unmount",
            /*handleTabUnmount*/
            ctx[10]
          ),
          listen(div, "SMUITab:interacted", function() {
            if (is_function(
              /*instance*/
              ctx[5] && /*instance*/
              ctx[5].handleTabInteraction.bind(
                /*instance*/
                ctx[5]
              )
            ))
              /*instance*/
              (ctx[5] && /*instance*/
              ctx[5].handleTabInteraction.bind(
                /*instance*/
                ctx[5]
              )).apply(this, arguments);
          }),
          listen(div, "keydown", function() {
            if (is_function(
              /*instance*/
              ctx[5] && /*instance*/
              ctx[5].handleKeyDown.bind(
                /*instance*/
                ctx[5]
              )
            ))
              /*instance*/
              (ctx[5] && /*instance*/
              ctx[5].handleKeyDown.bind(
                /*instance*/
                ctx[5]
              )).apply(this, arguments);
          })
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const tabscroller_changes = dirty[0] & /*$$restProps*/
      2048 ? get_spread_update(tabscroller_spread_levels, [get_spread_object(prefixFilter(
        /*$$restProps*/
        ctx[11],
        "tabScroller$"
      ))]) : {};
      if (dirty[0] & /*$$scope, tabs*/
      16777220) {
        tabscroller_changes.$$scope = { dirty, ctx };
      }
      tabscroller.$set(tabscroller_changes);
      set_attributes(div, div_data = get_spread_update(div_levels, [
        (!current || dirty[0] & /*className*/
        2 && div_class_value !== (div_class_value = classMap({
          [
            /*className*/
            ctx[1]
          ]: true,
          "mdc-tab-bar": true
        }))) && { class: div_class_value },
        { role: "tablist" },
        (!current || dirty[0] & /*tabindex*/
        16) && { tabindex: (
          /*tabindex*/
          ctx[4]
        ) },
        dirty[0] & /*$$restProps*/
        2048 && exclude(
          /*$$restProps*/
          ctx[11],
          ["tabScroller$"]
        )
      ]));
      if (useActions_action && is_function(useActions_action.update) && dirty[0] & /*use*/
      1)
        useActions_action.update.call(
          null,
          /*use*/
          ctx[0]
        );
    },
    i(local) {
      if (current)
        return;
      transition_in(tabscroller.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(tabscroller.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      ctx[22](null);
      destroy_component(tabscroller);
      ctx[23](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance_1$2($$self, $$props, $$invalidate) {
  const omit_props_names = [
    "use",
    "class",
    "tabs",
    "key",
    "focusOnActivate",
    "focusOnProgrammatic",
    "useAutomaticActivation",
    "active",
    "tabindex",
    "scrollIntoView",
    "getElement"
  ];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { tabs = [] } = $$props;
  let { key = (tab) => tab } = $$props;
  let { focusOnActivate = true } = $$props;
  let { focusOnProgrammatic = false } = $$props;
  let { useAutomaticActivation = true } = $$props;
  let { active = void 0 } = $$props;
  let { tabindex = 0 } = $$props;
  let element2;
  let instance2;
  let tabScroller;
  let activeIndex = tabs.indexOf(active);
  let tabAccessorMap = {};
  let tabAccessorWeakMap = /* @__PURE__ */ new WeakMap();
  let skipFocus = false;
  setContext("SMUI:tab:focusOnActivate", focusOnActivate);
  setContext("SMUI:tab:initialActive", active);
  onMount(() => {
    $$invalidate(5, instance2 = new MDCTabBarFoundation({
      scrollTo: (scrollX) => tabScroller.scrollTo(scrollX),
      incrementScroll: (scrollXIncrement) => tabScroller.incrementScroll(scrollXIncrement),
      getScrollPosition: () => tabScroller.getScrollPosition(),
      getScrollContentWidth: () => tabScroller.getScrollContentWidth(),
      getOffsetWidth: () => getElement().offsetWidth,
      isRTL: () => getComputedStyle(getElement()).getPropertyValue("direction") === "rtl",
      setActiveTab: (index) => {
        $$invalidate(12, active = tabs[index]);
        $$invalidate(18, activeIndex = index);
        instance2.activateTab(index);
      },
      activateTabAtIndex: (index, clientRect) => {
        var _a;
        return (_a = getAccessor(tabs[index])) === null || _a === void 0 ? void 0 : _a.activate(clientRect, skipFocus);
      },
      deactivateTabAtIndex: (index) => {
        var _a;
        return (_a = getAccessor(tabs[index])) === null || _a === void 0 ? void 0 : _a.deactivate();
      },
      focusTabAtIndex: (index) => {
        var _a;
        return (_a = getAccessor(tabs[index])) === null || _a === void 0 ? void 0 : _a.focus();
      },
      getTabIndicatorClientRectAtIndex: (index) => {
        var _a, _b;
        return (_b = (_a = getAccessor(tabs[index])) === null || _a === void 0 ? void 0 : _a.computeIndicatorClientRect()) !== null && _b !== void 0 ? _b : new DOMRect();
      },
      getTabDimensionsAtIndex: (index) => {
        var _a, _b;
        return (_b = (_a = getAccessor(tabs[index])) === null || _a === void 0 ? void 0 : _a.computeDimensions()) !== null && _b !== void 0 ? _b : {
          rootLeft: 0,
          rootRight: 0,
          contentLeft: 0,
          contentRight: 0
        };
      },
      getPreviousActiveTabIndex: () => {
        var _a;
        for (let i = 0; i < tabs.length; i++) {
          if ((_a = getAccessor(tabs[i])) === null || _a === void 0 ? void 0 : _a.active) {
            return i;
          }
        }
        return -1;
      },
      getFocusedTabIndex: () => {
        const tabElements = tabs.map((tab) => {
          var _a;
          return (_a = getAccessor(tab)) === null || _a === void 0 ? void 0 : _a.element;
        });
        const activeElement = document.activeElement;
        return tabElements.indexOf(activeElement);
      },
      getIndexOfTabById: (id) => tabs.indexOf(id),
      getTabListLength: () => tabs.length,
      notifyTabActivated: (index) => dispatch(getElement(), "SMUITabBar:activated", { index }, void 0, true)
    }));
    instance2.init();
    return () => {
      instance2.destroy();
    };
  });
  function handleTabMount(event) {
    const accessor = event.detail;
    addAccessor(accessor.tabId, accessor);
  }
  function handleTabUnmount(event) {
    const accessor = event.detail;
    removeAccessor(accessor.tabId);
  }
  function getAccessor(tabId) {
    return tabId instanceof Object ? tabAccessorWeakMap.get(tabId) : tabAccessorMap[tabId];
  }
  function addAccessor(tabId, accessor) {
    if (tabId instanceof Object) {
      tabAccessorWeakMap.set(tabId, accessor);
      $$invalidate(20, tabAccessorWeakMap);
    } else {
      $$invalidate(19, tabAccessorMap[tabId] = accessor, tabAccessorMap);
      $$invalidate(19, tabAccessorMap);
    }
  }
  function removeAccessor(tabId) {
    if (tabId instanceof Object) {
      tabAccessorWeakMap.delete(tabId);
      $$invalidate(20, tabAccessorWeakMap);
    } else {
      delete tabAccessorMap[tabId];
      $$invalidate(19, tabAccessorMap);
    }
  }
  function scrollIntoView(index) {
    instance2.scrollIntoView(index);
  }
  function getElement() {
    return element2;
  }
  function tabscroller_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      tabScroller = $$value;
      $$invalidate(7, tabScroller);
    });
  }
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(6, element2);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(11, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("tabs" in $$new_props)
      $$invalidate(2, tabs = $$new_props.tabs);
    if ("key" in $$new_props)
      $$invalidate(3, key = $$new_props.key);
    if ("focusOnActivate" in $$new_props)
      $$invalidate(13, focusOnActivate = $$new_props.focusOnActivate);
    if ("focusOnProgrammatic" in $$new_props)
      $$invalidate(14, focusOnProgrammatic = $$new_props.focusOnProgrammatic);
    if ("useAutomaticActivation" in $$new_props)
      $$invalidate(15, useAutomaticActivation = $$new_props.useAutomaticActivation);
    if ("active" in $$new_props)
      $$invalidate(12, active = $$new_props.active);
    if ("tabindex" in $$new_props)
      $$invalidate(4, tabindex = $$new_props.tabindex);
    if ("$$scope" in $$new_props)
      $$invalidate(24, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & /*active, tabs, activeIndex, instance, focusOnProgrammatic*/
    282660) {
      if (active !== tabs[activeIndex]) {
        $$invalidate(18, activeIndex = tabs.indexOf(active));
        if (instance2) {
          skipFocus = !focusOnProgrammatic;
          instance2.activateTab(activeIndex);
          skipFocus = false;
        }
      }
    }
    if ($$self.$$.dirty[0] & /*tabs, tabAccessorWeakMap, tabAccessorMap, activeIndex*/
    1835012) {
      if (tabs.length) {
        const accessor = tabs[0] instanceof Object ? tabAccessorWeakMap.get(tabs[0]) : tabAccessorMap[tabs[0]];
        if (accessor) {
          accessor.forceAccessible(activeIndex === -1);
        }
      }
    }
    if ($$self.$$.dirty[0] & /*instance, useAutomaticActivation*/
    32800) {
      if (instance2) {
        instance2.setUseAutomaticActivation(useAutomaticActivation);
      }
    }
  };
  return [
    use,
    className,
    tabs,
    key,
    tabindex,
    instance2,
    element2,
    tabScroller,
    forwardEvents,
    handleTabMount,
    handleTabUnmount,
    $$restProps,
    active,
    focusOnActivate,
    focusOnProgrammatic,
    useAutomaticActivation,
    scrollIntoView,
    getElement,
    activeIndex,
    tabAccessorMap,
    tabAccessorWeakMap,
    slots,
    tabscroller_binding,
    div_binding,
    $$scope
  ];
}
class TabBar extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance_1$2,
      create_fragment$3,
      safe_not_equal,
      {
        use: 0,
        class: 1,
        tabs: 2,
        key: 3,
        focusOnActivate: 13,
        focusOnProgrammatic: 14,
        useAutomaticActivation: 15,
        active: 12,
        tabindex: 4,
        scrollIntoView: 16,
        getElement: 17
      },
      null,
      [-1, -1]
    );
  }
  get scrollIntoView() {
    return this.$$.ctx[16];
  }
  get getElement() {
    return this.$$.ctx[17];
  }
}
function create_fragment$2(ctx) {
  let div;
  let div_class_value;
  let useActions_action;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = (
    /*#slots*/
    ctx[12].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[11],
    null
  );
  let div_levels = [
    {
      class: div_class_value = classMap({
        [
          /*className*/
          ctx[1]
        ]: true,
        "smui-paper": true,
        "smui-paper--raised": (
          /*variant*/
          ctx[2] === "raised"
        ),
        "smui-paper--unelevated": (
          /*variant*/
          ctx[2] === "unelevated"
        ),
        "smui-paper--outlined": (
          /*variant*/
          ctx[2] === "outlined"
        ),
        ["smui-paper--elevation-z" + /*elevation*/
        ctx[5]]: (
          /*elevation*/
          ctx[5] !== 0 && /*variant*/
          ctx[2] === "raised"
        ),
        "smui-paper--rounded": !/*square*/
        ctx[3],
        ["smui-paper--color-" + /*color*/
        ctx[4]]: (
          /*color*/
          ctx[4] !== "default"
        ),
        "smui-paper-transition": (
          /*transition*/
          ctx[6]
        )
      })
    },
    /*$$restProps*/
    ctx[9]
  ];
  let div_data = {};
  for (let i = 0; i < div_levels.length; i += 1) {
    div_data = assign(div_data, div_levels[i]);
  }
  return {
    c() {
      div = element("div");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      if (default_slot)
        default_slot.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(div, div_data);
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (default_slot) {
        default_slot.m(div, null);
      }
      ctx[13](div);
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
            ctx[8].call(null, div)
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        2048)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[11],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[11]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[11],
              dirty,
              null
            ),
            null
          );
        }
      }
      set_attributes(div, div_data = get_spread_update(div_levels, [
        (!current || dirty & /*className, variant, elevation, square, color, transition*/
        126 && div_class_value !== (div_class_value = classMap({
          [
            /*className*/
            ctx2[1]
          ]: true,
          "smui-paper": true,
          "smui-paper--raised": (
            /*variant*/
            ctx2[2] === "raised"
          ),
          "smui-paper--unelevated": (
            /*variant*/
            ctx2[2] === "unelevated"
          ),
          "smui-paper--outlined": (
            /*variant*/
            ctx2[2] === "outlined"
          ),
          ["smui-paper--elevation-z" + /*elevation*/
          ctx2[5]]: (
            /*elevation*/
            ctx2[5] !== 0 && /*variant*/
            ctx2[2] === "raised"
          ),
          "smui-paper--rounded": !/*square*/
          ctx2[3],
          ["smui-paper--color-" + /*color*/
          ctx2[4]]: (
            /*color*/
            ctx2[4] !== "default"
          ),
          "smui-paper-transition": (
            /*transition*/
            ctx2[6]
          )
        }))) && { class: div_class_value },
        dirty & /*$$restProps*/
        512 && /*$$restProps*/
        ctx2[9]
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
        detach(div);
      }
      if (default_slot)
        default_slot.d(detaching);
      ctx[13](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  const omit_props_names = ["use", "class", "variant", "square", "color", "elevation", "transition", "getElement"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { variant = "raised" } = $$props;
  let { square = false } = $$props;
  let { color = "default" } = $$props;
  let { elevation = 1 } = $$props;
  let { transition = false } = $$props;
  let element2;
  function getElement() {
    return element2;
  }
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(7, element2);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(9, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("variant" in $$new_props)
      $$invalidate(2, variant = $$new_props.variant);
    if ("square" in $$new_props)
      $$invalidate(3, square = $$new_props.square);
    if ("color" in $$new_props)
      $$invalidate(4, color = $$new_props.color);
    if ("elevation" in $$new_props)
      $$invalidate(5, elevation = $$new_props.elevation);
    if ("transition" in $$new_props)
      $$invalidate(6, transition = $$new_props.transition);
    if ("$$scope" in $$new_props)
      $$invalidate(11, $$scope = $$new_props.$$scope);
  };
  return [
    use,
    className,
    variant,
    square,
    color,
    elevation,
    transition,
    element2,
    forwardEvents,
    $$restProps,
    getElement,
    $$scope,
    slots,
    div_binding
  ];
}
class Paper extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment$2, safe_not_equal, {
      use: 0,
      class: 1,
      variant: 2,
      square: 3,
      color: 4,
      elevation: 5,
      transition: 6,
      getElement: 10
    });
  }
  get getElement() {
    return this.$$.ctx[10];
  }
}
const Content = classAdderBuilder({
  class: "smui-paper__content",
  tag: "div"
});
classAdderBuilder({
  class: "smui-paper__title",
  tag: "h5"
});
classAdderBuilder({
  class: "smui-paper__subtitle",
  tag: "h6"
});
function create_else_block$1(ctx) {
  let t;
  return {
    c() {
      t = text(
        /*content*/
        ctx[7]
      );
    },
    l(nodes) {
      t = claim_text(
        nodes,
        /*content*/
        ctx[7]
      );
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*content*/
      128)
        set_data(
          t,
          /*content*/
          ctx2[7]
        );
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_if_block$1(ctx) {
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
function create_fragment$1(ctx) {
  let i;
  let current_block_type_index;
  let if_block;
  let i_class_value;
  let i_aria_hidden_value;
  let i_aria_disabled_value;
  let useActions_action;
  let current;
  let mounted;
  let dispose;
  const if_block_creators = [create_if_block$1, create_else_block$1];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*content*/
      ctx2[7] == null
    )
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  let i_levels = [
    {
      class: i_class_value = classMap({
        [
          /*className*/
          ctx[1]
        ]: true,
        "mdc-text-field__icon": true,
        "mdc-text-field__icon--leading": (
          /*leading*/
          ctx[11]
        ),
        "mdc-text-field__icon--trailing": !/*leading*/
        ctx[11]
      })
    },
    {
      "aria-hidden": i_aria_hidden_value = /*tabindex*/
      ctx[3] === -1 ? "true" : "false"
    },
    {
      "aria-disabled": i_aria_disabled_value = /*role*/
      ctx[2] === "button" ? (
        /*disabled*/
        ctx[4] ? "true" : "false"
      ) : void 0
    },
    /*roleProps*/
    ctx[8],
    /*internalAttrs*/
    ctx[6],
    /*$$restProps*/
    ctx[12]
  ];
  let i_data = {};
  for (let i2 = 0; i2 < i_levels.length; i2 += 1) {
    i_data = assign(i_data, i_levels[i2]);
  }
  return {
    c() {
      i = element("i");
      if_block.c();
      this.h();
    },
    l(nodes) {
      i = claim_element(nodes, "I", {
        class: true,
        "aria-hidden": true,
        "aria-disabled": true
      });
      var i_nodes = children(i);
      if_block.l(i_nodes);
      i_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(i, i_data);
    },
    m(target, anchor) {
      insert_hydration(target, i, anchor);
      if_blocks[current_block_type_index].m(i, null);
      ctx[16](i);
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(useActions_action = useActions.call(
            null,
            i,
            /*use*/
            ctx[0]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[9].call(null, i)
          )
        ];
        mounted = true;
      }
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
        if_block.m(i, null);
      }
      set_attributes(i, i_data = get_spread_update(i_levels, [
        (!current || dirty & /*className*/
        2 && i_class_value !== (i_class_value = classMap({
          [
            /*className*/
            ctx2[1]
          ]: true,
          "mdc-text-field__icon": true,
          "mdc-text-field__icon--leading": (
            /*leading*/
            ctx2[11]
          ),
          "mdc-text-field__icon--trailing": !/*leading*/
          ctx2[11]
        }))) && { class: i_class_value },
        (!current || dirty & /*tabindex*/
        8 && i_aria_hidden_value !== (i_aria_hidden_value = /*tabindex*/
        ctx2[3] === -1 ? "true" : "false")) && { "aria-hidden": i_aria_hidden_value },
        (!current || dirty & /*role, disabled*/
        20 && i_aria_disabled_value !== (i_aria_disabled_value = /*role*/
        ctx2[2] === "button" ? (
          /*disabled*/
          ctx2[4] ? "true" : "false"
        ) : void 0)) && { "aria-disabled": i_aria_disabled_value },
        dirty & /*roleProps*/
        256 && /*roleProps*/
        ctx2[8],
        dirty & /*internalAttrs*/
        64 && /*internalAttrs*/
        ctx2[6],
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
        detach(i);
      }
      if_blocks[current_block_type_index].d();
      ctx[16](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance_1$1($$self, $$props, $$invalidate) {
  let roleProps;
  const omit_props_names = ["use", "class", "role", "tabindex", "disabled", "getElement"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let $leadingStore;
  let { $$slots: slots = {}, $$scope } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { role = void 0 } = $$props;
  let { tabindex = role === "button" ? 0 : -1 } = $$props;
  let { disabled = false } = $$props;
  let element2;
  let instance2;
  let internalAttrs = {};
  const leadingStore = getContext("SMUI:textfield:icon:leading");
  component_subscribe($$self, leadingStore, (value) => $$invalidate(18, $leadingStore = value));
  const leading = $leadingStore;
  let content = void 0;
  onMount(() => {
    instance2 = new MDCTextFieldIconFoundation({
      getAttr,
      setAttr: addAttr,
      removeAttr,
      setContent: (value) => {
        $$invalidate(7, content = value);
      },
      registerInteractionHandler: (evtType, handler) => getElement().addEventListener(evtType, handler),
      deregisterInteractionHandler: (evtType, handler) => getElement().removeEventListener(evtType, handler),
      notifyIconAction: () => dispatch(getElement(), "SMUITextField:icon", void 0, void 0, true)
    });
    dispatch(
      getElement(),
      leading ? "SMUITextfieldLeadingIcon:mount" : "SMUITextfieldTrailingIcon:mount",
      instance2
    );
    instance2.init();
    return () => {
      dispatch(
        getElement(),
        leading ? "SMUITextfieldLeadingIcon:unmount" : "SMUITextfieldTrailingIcon:unmount",
        instance2
      );
      instance2.destroy();
    };
  });
  function getAttr(name) {
    var _a;
    return name in internalAttrs ? (_a = internalAttrs[name]) !== null && _a !== void 0 ? _a : null : getElement().getAttribute(name);
  }
  function addAttr(name, value) {
    if (internalAttrs[name] !== value) {
      $$invalidate(6, internalAttrs[name] = value, internalAttrs);
    }
  }
  function removeAttr(name) {
    if (!(name in internalAttrs) || internalAttrs[name] != null) {
      $$invalidate(6, internalAttrs[name] = void 0, internalAttrs);
    }
  }
  function getElement() {
    return element2;
  }
  function i_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(5, element2);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(12, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("role" in $$new_props)
      $$invalidate(2, role = $$new_props.role);
    if ("tabindex" in $$new_props)
      $$invalidate(3, tabindex = $$new_props.tabindex);
    if ("disabled" in $$new_props)
      $$invalidate(4, disabled = $$new_props.disabled);
    if ("$$scope" in $$new_props)
      $$invalidate(14, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*role, tabindex*/
    12) {
      $$invalidate(8, roleProps = { role, tabindex });
    }
  };
  return [
    use,
    className,
    role,
    tabindex,
    disabled,
    element2,
    internalAttrs,
    content,
    roleProps,
    forwardEvents,
    leadingStore,
    leading,
    $$restProps,
    getElement,
    $$scope,
    slots,
    i_binding
  ];
}
class Icon extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance_1$1, create_fragment$1, safe_not_equal, {
      use: 0,
      class: 1,
      role: 2,
      tabindex: 3,
      disabled: 4,
      getElement: 13
    });
  }
  get getElement() {
    return this.$$.ctx[13];
  }
}
const _page_svelte_svelte_type_style_lang = "";
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[17] = list[i];
  return child_ctx;
}
function create_else_block_1(ctx) {
  let div;
  let tabbar;
  let updating_active;
  let t;
  let current_block_type_index;
  let if_block;
  let current;
  function tabbar_active_binding(value) {
    ctx[12](value);
  }
  let tabbar_props = {
    tabs: ["Local", "Online"],
    $$slots: {
      default: [
        create_default_slot_14,
        ({ tab }) => ({ 25: tab }),
        ({ tab }) => tab ? 33554432 : 0
      ]
    },
    $$scope: { ctx }
  };
  if (
    /*active*/
    ctx[0] !== void 0
  ) {
    tabbar_props.active = /*active*/
    ctx[0];
  }
  tabbar = new TabBar({ props: tabbar_props });
  binding_callbacks.push(() => bind(tabbar, "active", tabbar_active_binding));
  const if_block_creators = [create_if_block_2, create_if_block_5];
  const if_blocks = [];
  function select_block_type_2(ctx2, dirty) {
    if (
      /*active*/
      ctx2[0] === "Local"
    )
      return 0;
    if (
      /*active*/
      ctx2[0] === "Online"
    )
      return 1;
    return -1;
  }
  if (~(current_block_type_index = select_block_type_2(ctx))) {
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  return {
    c() {
      div = element("div");
      create_component(tabbar.$$.fragment);
      t = space();
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(tabbar.$$.fragment, div_nodes);
      t = claim_space(div_nodes);
      if (if_block)
        if_block.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "login svelte-u0ug3k");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      mount_component(tabbar, div, null);
      append_hydration(div, t);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(div, null);
      }
      current = true;
    },
    p(ctx2, dirty) {
      const tabbar_changes = {};
      if (dirty & /*$$scope, tab*/
      100663296) {
        tabbar_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_active && dirty & /*active*/
      1) {
        updating_active = true;
        tabbar_changes.active = /*active*/
        ctx2[0];
        add_flush_callback(() => updating_active = false);
      }
      tabbar.$set(tabbar_changes);
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_2(ctx2);
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
          if_block.m(div, null);
        } else {
          if_block = null;
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(tabbar.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(tabbar.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(tabbar);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d();
      }
    }
  };
}
function create_if_block(ctx) {
  let div;
  let h1;
  let textContent = "Welcome!";
  let t1;
  let current_block_type_index;
  let if_block;
  let current;
  const if_block_creators = [create_if_block_1, create_else_block];
  const if_blocks = [];
  function select_block_type_1(ctx2, dirty) {
    if (
      /*dashboards*/
      ctx2[4] !== void 0 && /*dashboards*/
      ctx2[4].length > 0
    )
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type_1(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      div = element("div");
      h1 = element("h1");
      h1.textContent = textContent;
      t1 = space();
      if_block.c();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", {});
      var div_nodes = children(div);
      h1 = claim_element(div_nodes, "H1", { ["data-svelte-h"]: true });
      if (get_svelte_dataset(h1) !== "svelte-w9d2nb")
        h1.textContent = textContent;
      t1 = claim_space(div_nodes);
      if_block.l(div_nodes);
      div_nodes.forEach(detach);
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, h1);
      append_hydration(div, t1);
      if_blocks[current_block_type_index].m(div, null);
      current = true;
    },
    p(ctx2, dirty) {
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
        detach(div);
      }
      if_blocks[current_block_type_index].d();
    }
  };
}
function create_default_slot_16(ctx) {
  let t_value = (
    /*tab*/
    ctx[25] + ""
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
      if (dirty & /*tab*/
      33554432 && t_value !== (t_value = /*tab*/
      ctx2[25] + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_default_slot_15(ctx) {
  let label;
  let current;
  label = new CommonLabel({
    props: {
      $$slots: { default: [create_default_slot_16] },
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
      if (dirty & /*$$scope, tab*/
      100663296) {
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
function create_default_slot_14(ctx) {
  let tab;
  let current;
  tab = new Tab({
    props: {
      tab: (
        /*tab*/
        ctx[25]
      ),
      $$slots: { default: [create_default_slot_15] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(tab.$$.fragment);
    },
    l(nodes) {
      claim_component(tab.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(tab, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const tab_changes = {};
      if (dirty & /*tab*/
      33554432)
        tab_changes.tab = /*tab*/
        ctx2[25];
      if (dirty & /*$$scope, tab*/
      100663296) {
        tab_changes.$$scope = { dirty, ctx: ctx2 };
      }
      tab.$set(tab_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(tab.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(tab.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(tab, detaching);
    }
  };
}
function create_if_block_5(ctx) {
  let paper;
  let current;
  paper = new Paper({
    props: {
      $$slots: { default: [create_default_slot_11] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(paper.$$.fragment);
    },
    l(nodes) {
      claim_component(paper.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(paper, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const paper_changes = {};
      if (dirty & /*$$scope*/
      67108864) {
        paper_changes.$$scope = { dirty, ctx: ctx2 };
      }
      paper.$set(paper_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(paper.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(paper.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(paper, detaching);
    }
  };
}
function create_if_block_2(ctx) {
  let paper;
  let current;
  paper = new Paper({
    props: {
      $$slots: { default: [create_default_slot_6] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(paper.$$.fragment);
    },
    l(nodes) {
      claim_component(paper.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(paper, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const paper_changes = {};
      if (dirty & /*$$scope, localKeyLoading, localKey, localKeyInvalid*/
      67108878) {
        paper_changes.$$scope = { dirty, ctx: ctx2 };
      }
      paper.$set(paper_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(paper.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(paper.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(paper, detaching);
    }
  };
}
function create_default_slot_13(ctx) {
  let t;
  return {
    c() {
      t = text("Sign in");
    },
    l(nodes) {
      t = claim_text(nodes, "Sign in");
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
function create_default_slot_12(ctx) {
  let p0;
  let textContent = "Online authentication can be used with both the newer Homey Pro 2023 and older models.";
  let t1;
  let p1;
  let textContent_1 = "With online authentication, scopes cannot be selected individually. If you want to limit access, \n                            use local login with API-key, only available for Homey Pro 2023.";
  let t3;
  let button;
  let current;
  button = new Button({
    props: {
      $$slots: { default: [create_default_slot_13] },
      $$scope: { ctx }
    }
  });
  button.$on(
    "click",
    /*oauthLogin*/
    ctx[8]
  );
  return {
    c() {
      p0 = element("p");
      p0.textContent = textContent;
      t1 = space();
      p1 = element("p");
      p1.textContent = textContent_1;
      t3 = space();
      create_component(button.$$.fragment);
    },
    l(nodes) {
      p0 = claim_element(nodes, "P", { ["data-svelte-h"]: true });
      if (get_svelte_dataset(p0) !== "svelte-nqdrsn")
        p0.textContent = textContent;
      t1 = claim_space(nodes);
      p1 = claim_element(nodes, "P", { ["data-svelte-h"]: true });
      if (get_svelte_dataset(p1) !== "svelte-1b8adqu")
        p1.textContent = textContent_1;
      t3 = claim_space(nodes);
      claim_component(button.$$.fragment, nodes);
    },
    m(target, anchor) {
      insert_hydration(target, p0, anchor);
      insert_hydration(target, t1, anchor);
      insert_hydration(target, p1, anchor);
      insert_hydration(target, t3, anchor);
      mount_component(button, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const button_changes = {};
      if (dirty & /*$$scope*/
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
      if (detaching) {
        detach(p0);
        detach(t1);
        detach(p1);
        detach(t3);
      }
      destroy_component(button, detaching);
    }
  };
}
function create_default_slot_11(ctx) {
  let content;
  let current;
  content = new Content({
    props: {
      $$slots: { default: [create_default_slot_12] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(content.$$.fragment);
    },
    l(nodes) {
      claim_component(content.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(content, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const content_changes = {};
      if (dirty & /*$$scope*/
      67108864) {
        content_changes.$$scope = { dirty, ctx: ctx2 };
      }
      content.$set(content_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(content.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(content.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(content, detaching);
    }
  };
}
function create_default_slot_10(ctx) {
  let t;
  return {
    c() {
      t = text("key");
    },
    l(nodes) {
      t = claim_text(nodes, "key");
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
function create_leadingIcon_slot(ctx) {
  let icon;
  let current;
  icon = new Icon({
    props: {
      class: "material-icons",
      slot: "leadingIcon",
      $$slots: { default: [create_default_slot_10] },
      $$scope: { ctx }
    }
  });
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
    p(ctx2, dirty) {
      const icon_changes = {};
      if (dirty & /*$$scope*/
      67108864) {
        icon_changes.$$scope = { dirty, ctx: ctx2 };
      }
      icon.$set(icon_changes);
    },
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
function create_default_slot_9(ctx) {
  let t;
  return {
    c() {
      t = text("Verify");
    },
    l(nodes) {
      t = claim_text(nodes, "Verify");
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
function create_catch_block_3(ctx) {
  let p;
  let t_value = (
    /*error*/
    ctx[24] + ""
  );
  let t;
  return {
    c() {
      p = element("p");
      t = text(t_value);
      this.h();
    },
    l(nodes) {
      p = claim_element(nodes, "P", { style: true });
      var p_nodes = children(p);
      t = claim_text(p_nodes, t_value);
      p_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_style(p, "color", "red");
    },
    m(target, anchor) {
      insert_hydration(target, p, anchor);
      append_hydration(p, t);
    },
    p(ctx2, dirty) {
      if (dirty & /*localKeyLoading*/
      8 && t_value !== (t_value = /*error*/
      ctx2[24] + ""))
        set_data(t, t_value);
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(p);
      }
    }
  };
}
function create_then_block(ctx) {
  let if_block_anchor;
  let current;
  let if_block = (
    /*instance*/
    ctx[20] !== void 0 && create_if_block_3(ctx)
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
        /*instance*/
        ctx2[20] !== void 0
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*localKeyLoading*/
          8) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_3(ctx2);
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
function create_if_block_3(ctx) {
  let promise;
  let t0;
  let promise_1;
  let t1;
  let p;
  let button;
  let current;
  let info = {
    ctx,
    current: null,
    token: null,
    hasCatch: false,
    pending: create_pending_block_3,
    then: create_then_block_3,
    catch: create_catch_block_2,
    value: 23
  };
  handle_promise(promise = /*instance*/
  ctx[20].system.getSystemName(), info);
  let info_1 = {
    ctx,
    current: null,
    token: null,
    hasCatch: false,
    pending: create_pending_block_1,
    then: create_then_block_1,
    catch: create_catch_block_1,
    value: 21
  };
  handle_promise(promise_1 = /*instance*/
  ctx[20].sessions.getSessionMe(), info_1);
  function click_handler_1() {
    return (
      /*click_handler_1*/
      ctx[14](
        /*instance*/
        ctx[20]
      )
    );
  }
  button = new Button({
    props: {
      $$slots: { default: [create_default_slot_8] },
      $$scope: { ctx }
    }
  });
  button.$on("click", click_handler_1);
  return {
    c() {
      info.block.c();
      t0 = space();
      info_1.block.c();
      t1 = space();
      p = element("p");
      create_component(button.$$.fragment);
    },
    l(nodes) {
      info.block.l(nodes);
      t0 = claim_space(nodes);
      info_1.block.l(nodes);
      t1 = claim_space(nodes);
      p = claim_element(nodes, "P", {});
      var p_nodes = children(p);
      claim_component(button.$$.fragment, p_nodes);
      p_nodes.forEach(detach);
    },
    m(target, anchor) {
      info.block.m(target, info.anchor = anchor);
      info.mount = () => t0.parentNode;
      info.anchor = t0;
      insert_hydration(target, t0, anchor);
      info_1.block.m(target, info_1.anchor = anchor);
      info_1.mount = () => t1.parentNode;
      info_1.anchor = t1;
      insert_hydration(target, t1, anchor);
      insert_hydration(target, p, anchor);
      mount_component(button, p, null);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      info.ctx = ctx;
      if (dirty & /*localKeyLoading*/
      8 && promise !== (promise = /*instance*/
      ctx[20].system.getSystemName()) && handle_promise(promise, info))
        ;
      else {
        update_await_block_branch(info, ctx, dirty);
      }
      info_1.ctx = ctx;
      if (dirty & /*localKeyLoading*/
      8 && promise_1 !== (promise_1 = /*instance*/
      ctx[20].sessions.getSessionMe()) && handle_promise(promise_1, info_1))
        ;
      else {
        update_await_block_branch(info_1, ctx, dirty);
      }
      const button_changes = {};
      if (dirty & /*$$scope*/
      67108864) {
        button_changes.$$scope = { dirty, ctx };
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
      if (detaching) {
        detach(t0);
        detach(t1);
        detach(p);
      }
      info.block.d(detaching);
      info.token = null;
      info = null;
      info_1.block.d(detaching);
      info_1.token = null;
      info_1 = null;
      destroy_component(button);
    }
  };
}
function create_catch_block_2(ctx) {
  return {
    c: noop,
    l: noop,
    m: noop,
    p: noop,
    d: noop
  };
}
function create_then_block_3(ctx) {
  let p;
  let t0;
  let b;
  let t1_value = (
    /*name*/
    ctx[23] + ""
  );
  let t1;
  return {
    c() {
      p = element("p");
      t0 = text("... connected to ");
      b = element("b");
      t1 = text(t1_value);
    },
    l(nodes) {
      p = claim_element(nodes, "P", {});
      var p_nodes = children(p);
      t0 = claim_text(p_nodes, "... connected to ");
      b = claim_element(p_nodes, "B", {});
      var b_nodes = children(b);
      t1 = claim_text(b_nodes, t1_value);
      b_nodes.forEach(detach);
      p_nodes.forEach(detach);
    },
    m(target, anchor) {
      insert_hydration(target, p, anchor);
      append_hydration(p, t0);
      append_hydration(p, b);
      append_hydration(b, t1);
    },
    p(ctx2, dirty) {
      if (dirty & /*localKeyLoading*/
      8 && t1_value !== (t1_value = /*name*/
      ctx2[23] + ""))
        set_data(t1, t1_value);
    },
    d(detaching) {
      if (detaching) {
        detach(p);
      }
    }
  };
}
function create_pending_block_3(ctx) {
  return {
    c: noop,
    l: noop,
    m: noop,
    p: noop,
    d: noop
  };
}
function create_catch_block_1(ctx) {
  return {
    c: noop,
    l: noop,
    m: noop,
    p: noop,
    d: noop
  };
}
function create_then_block_1(ctx) {
  let p0;
  let t0;
  let b0;
  let t1_value = (
    /*session*/
    ctx[21].userName + ""
  );
  let t1;
  let t2;
  let p1;
  let t3;
  let b1;
  let t4_value = (
    /*session*/
    ctx[21].type + ""
  );
  let t4;
  let t5;
  let t6_value = (
    /*session*/
    ctx[21].clientName + ""
  );
  let t6;
  let t7;
  let p2;
  let t8;
  let b2;
  let t9_value = (
    /*session*/
    ctx[21].scopes + ""
  );
  let t9;
  let t10;
  let show_if;
  let if_block_anchor;
  function select_block_type_3(ctx2, dirty) {
    if (dirty & /*localKeyLoading*/
    8)
      show_if = null;
    if (show_if == null)
      show_if = !!(!/*session*/
      ctx2[21].scopes.includes("homey.app") && !/*session*/
      ctx2[21].scopes.includes("homey"));
    if (show_if)
      return create_if_block_4;
    return create_else_block_2;
  }
  let current_block_type = select_block_type_3(ctx, -1);
  let if_block = current_block_type(ctx);
  return {
    c() {
      p0 = element("p");
      t0 = text("... logged in as ");
      b0 = element("b");
      t1 = text(t1_value);
      t2 = space();
      p1 = element("p");
      t3 = text("... with ");
      b1 = element("b");
      t4 = text(t4_value);
      t5 = space();
      t6 = text(t6_value);
      t7 = space();
      p2 = element("p");
      t8 = text("... scopes ");
      b2 = element("b");
      t9 = text(t9_value);
      t10 = space();
      if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      p0 = claim_element(nodes, "P", {});
      var p0_nodes = children(p0);
      t0 = claim_text(p0_nodes, "... logged in as ");
      b0 = claim_element(p0_nodes, "B", {});
      var b0_nodes = children(b0);
      t1 = claim_text(b0_nodes, t1_value);
      b0_nodes.forEach(detach);
      p0_nodes.forEach(detach);
      t2 = claim_space(nodes);
      p1 = claim_element(nodes, "P", {});
      var p1_nodes = children(p1);
      t3 = claim_text(p1_nodes, "... with ");
      b1 = claim_element(p1_nodes, "B", {});
      var b1_nodes = children(b1);
      t4 = claim_text(b1_nodes, t4_value);
      t5 = claim_space(b1_nodes);
      t6 = claim_text(b1_nodes, t6_value);
      b1_nodes.forEach(detach);
      p1_nodes.forEach(detach);
      t7 = claim_space(nodes);
      p2 = claim_element(nodes, "P", {});
      var p2_nodes = children(p2);
      t8 = claim_text(p2_nodes, "... scopes ");
      b2 = claim_element(p2_nodes, "B", {});
      var b2_nodes = children(b2);
      t9 = claim_text(b2_nodes, t9_value);
      b2_nodes.forEach(detach);
      p2_nodes.forEach(detach);
      t10 = claim_space(nodes);
      if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      insert_hydration(target, p0, anchor);
      append_hydration(p0, t0);
      append_hydration(p0, b0);
      append_hydration(b0, t1);
      insert_hydration(target, t2, anchor);
      insert_hydration(target, p1, anchor);
      append_hydration(p1, t3);
      append_hydration(p1, b1);
      append_hydration(b1, t4);
      append_hydration(b1, t5);
      append_hydration(b1, t6);
      insert_hydration(target, t7, anchor);
      insert_hydration(target, p2, anchor);
      append_hydration(p2, t8);
      append_hydration(p2, b2);
      append_hydration(b2, t9);
      insert_hydration(target, t10, anchor);
      if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*localKeyLoading*/
      8 && t1_value !== (t1_value = /*session*/
      ctx2[21].userName + ""))
        set_data(t1, t1_value);
      if (dirty & /*localKeyLoading*/
      8 && t4_value !== (t4_value = /*session*/
      ctx2[21].type + ""))
        set_data(t4, t4_value);
      if (dirty & /*localKeyLoading*/
      8 && t6_value !== (t6_value = /*session*/
      ctx2[21].clientName + ""))
        set_data(t6, t6_value);
      if (dirty & /*localKeyLoading*/
      8 && t9_value !== (t9_value = /*session*/
      ctx2[21].scopes + ""))
        set_data(t9, t9_value);
      if (current_block_type === (current_block_type = select_block_type_3(ctx2, dirty)) && if_block) {
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
    d(detaching) {
      if (detaching) {
        detach(p0);
        detach(t2);
        detach(p1);
        detach(t7);
        detach(p2);
        detach(t10);
        detach(if_block_anchor);
      }
      if_block.d(detaching);
    }
  };
}
function create_else_block_2(ctx) {
  let await_block_anchor;
  let promise;
  let info = {
    ctx,
    current: null,
    token: null,
    hasCatch: true,
    pending: create_pending_block_2,
    then: create_then_block_2,
    catch: create_catch_block,
    value: 22
  };
  handle_promise(promise = /*instance*/
  ctx[20].apps.getApp({ id: "skogsaas.dashboards" }), info);
  return {
    c() {
      await_block_anchor = empty();
      info.block.c();
    },
    l(nodes) {
      await_block_anchor = empty();
      info.block.l(nodes);
    },
    m(target, anchor) {
      insert_hydration(target, await_block_anchor, anchor);
      info.block.m(target, info.anchor = anchor);
      info.mount = () => await_block_anchor.parentNode;
      info.anchor = await_block_anchor;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      info.ctx = ctx;
      dirty & /*localKeyLoading*/
      8 && promise !== (promise = /*instance*/
      ctx[20].apps.getApp({ id: "skogsaas.dashboards" })) && handle_promise(promise, info);
    },
    d(detaching) {
      if (detaching) {
        detach(await_block_anchor);
      }
      info.block.d(detaching);
      info.token = null;
      info = null;
    }
  };
}
function create_if_block_4(ctx) {
  let p;
  let textContent = `<span style="color: red;">Error:</span> Missing scope <b>homey.app</b>. 
                                            This is needed in order to contact the Dashboard app running on the Homey.
                                            Without this scope, dashboards will be loaded and stored locally in your browser.`;
  return {
    c() {
      p = element("p");
      p.innerHTML = textContent;
    },
    l(nodes) {
      p = claim_element(nodes, "P", { ["data-svelte-h"]: true });
      if (get_svelte_dataset(p) !== "svelte-15vafif")
        p.innerHTML = textContent;
    },
    m(target, anchor) {
      insert_hydration(target, p, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(p);
      }
    }
  };
}
function create_catch_block(ctx) {
  let p;
  let textContent = `<span style="color: red;">Error:</span> The dashboard app is not installed. 
                                                Without this app, dashboards will be loaded and stored locally in your browser.`;
  return {
    c() {
      p = element("p");
      p.innerHTML = textContent;
    },
    l(nodes) {
      p = claim_element(nodes, "P", { ["data-svelte-h"]: true });
      if (get_svelte_dataset(p) !== "svelte-tpbsqz")
        p.innerHTML = textContent;
    },
    m(target, anchor) {
      insert_hydration(target, p, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(p);
      }
    }
  };
}
function create_then_block_2(ctx) {
  let t;
  return {
    c() {
      t = text("... the Dashboard app is installed");
    },
    l(nodes) {
      t = claim_text(nodes, "... the Dashboard app is installed");
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
function create_pending_block_2(ctx) {
  let t;
  return {
    c() {
      t = text("... looking for the Dashboard app");
    },
    l(nodes) {
      t = claim_text(nodes, "... looking for the Dashboard app");
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
function create_pending_block_1(ctx) {
  return {
    c: noop,
    l: noop,
    m: noop,
    p: noop,
    d: noop
  };
}
function create_default_slot_8(ctx) {
  let t;
  return {
    c() {
      t = text("Continue");
    },
    l(nodes) {
      t = claim_text(nodes, "Continue");
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
function create_pending_block(ctx) {
  let p;
  let circularprogress;
  let current;
  circularprogress = new CircularProgress({
    props: {
      style: "height: 32px; width: 32px;",
      indeterminate: true
    }
  });
  return {
    c() {
      p = element("p");
      create_component(circularprogress.$$.fragment);
    },
    l(nodes) {
      p = claim_element(nodes, "P", {});
      var p_nodes = children(p);
      claim_component(circularprogress.$$.fragment, p_nodes);
      p_nodes.forEach(detach);
    },
    m(target, anchor) {
      insert_hydration(target, p, anchor);
      mount_component(circularprogress, p, null);
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
        detach(p);
      }
      destroy_component(circularprogress);
    }
  };
}
function create_default_slot_7(ctx) {
  let p0;
  let textContent = "Local authentication can only be used on the Homey Pro 2023 model. Older models do not have the API-Key feature.";
  let t1;
  let p1;
  let textContent_1 = `Obtain an API-Key by navigating to <b>Homey --&gt; Settings --&gt; System --&gt; API Keys</b>.`;
  let t5;
  let p2;
  let textContent_2 = `In order to get the full capabilities of the Dashboard app, please include the <b>homey.apps</b> scope. 
                            Other scopes can be included based on your planned usage of the dashboard.`;
  let t9;
  let textfield;
  let updating_value;
  let t10;
  let button;
  let t11;
  let await_block_anchor;
  let promise;
  let current;
  function textfield_value_binding(value) {
    ctx[13](value);
  }
  let textfield_props = {
    invalid: (
      /*localKeyInvalid*/
      ctx[2]
    ),
    label: "Homey API-Key",
    $$slots: { leadingIcon: [create_leadingIcon_slot] },
    $$scope: { ctx }
  };
  if (
    /*localKey*/
    ctx[1] !== void 0
  ) {
    textfield_props.value = /*localKey*/
    ctx[1];
  }
  textfield = new Textfield({ props: textfield_props });
  binding_callbacks.push(() => bind(textfield, "value", textfield_value_binding));
  button = new Button({
    props: {
      disabled: (
        /*localKey*/
        ctx[1] === ""
      ),
      $$slots: { default: [create_default_slot_9] },
      $$scope: { ctx }
    }
  });
  button.$on(
    "click",
    /*verifyApiKey*/
    ctx[6]
  );
  let info = {
    ctx,
    current: null,
    token: null,
    hasCatch: true,
    pending: create_pending_block,
    then: create_then_block,
    catch: create_catch_block_3,
    value: 20,
    error: 24,
    blocks: [, , ,]
  };
  handle_promise(promise = /*localKeyLoading*/
  ctx[3], info);
  return {
    c() {
      p0 = element("p");
      p0.textContent = textContent;
      t1 = space();
      p1 = element("p");
      p1.innerHTML = textContent_1;
      t5 = space();
      p2 = element("p");
      p2.innerHTML = textContent_2;
      t9 = space();
      create_component(textfield.$$.fragment);
      t10 = space();
      create_component(button.$$.fragment);
      t11 = space();
      await_block_anchor = empty();
      info.block.c();
    },
    l(nodes) {
      p0 = claim_element(nodes, "P", { ["data-svelte-h"]: true });
      if (get_svelte_dataset(p0) !== "svelte-po2h7t")
        p0.textContent = textContent;
      t1 = claim_space(nodes);
      p1 = claim_element(nodes, "P", { ["data-svelte-h"]: true });
      if (get_svelte_dataset(p1) !== "svelte-1lnfwu3")
        p1.innerHTML = textContent_1;
      t5 = claim_space(nodes);
      p2 = claim_element(nodes, "P", { ["data-svelte-h"]: true });
      if (get_svelte_dataset(p2) !== "svelte-ks0lqj")
        p2.innerHTML = textContent_2;
      t9 = claim_space(nodes);
      claim_component(textfield.$$.fragment, nodes);
      t10 = claim_space(nodes);
      claim_component(button.$$.fragment, nodes);
      t11 = claim_space(nodes);
      await_block_anchor = empty();
      info.block.l(nodes);
    },
    m(target, anchor) {
      insert_hydration(target, p0, anchor);
      insert_hydration(target, t1, anchor);
      insert_hydration(target, p1, anchor);
      insert_hydration(target, t5, anchor);
      insert_hydration(target, p2, anchor);
      insert_hydration(target, t9, anchor);
      mount_component(textfield, target, anchor);
      insert_hydration(target, t10, anchor);
      mount_component(button, target, anchor);
      insert_hydration(target, t11, anchor);
      insert_hydration(target, await_block_anchor, anchor);
      info.block.m(target, info.anchor = anchor);
      info.mount = () => await_block_anchor.parentNode;
      info.anchor = await_block_anchor;
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const textfield_changes = {};
      if (dirty & /*localKeyInvalid*/
      4)
        textfield_changes.invalid = /*localKeyInvalid*/
        ctx[2];
      if (dirty & /*$$scope*/
      67108864) {
        textfield_changes.$$scope = { dirty, ctx };
      }
      if (!updating_value && dirty & /*localKey*/
      2) {
        updating_value = true;
        textfield_changes.value = /*localKey*/
        ctx[1];
        add_flush_callback(() => updating_value = false);
      }
      textfield.$set(textfield_changes);
      const button_changes = {};
      if (dirty & /*localKey*/
      2)
        button_changes.disabled = /*localKey*/
        ctx[1] === "";
      if (dirty & /*$$scope*/
      67108864) {
        button_changes.$$scope = { dirty, ctx };
      }
      button.$set(button_changes);
      info.ctx = ctx;
      if (dirty & /*localKeyLoading*/
      8 && promise !== (promise = /*localKeyLoading*/
      ctx[3]) && handle_promise(promise, info))
        ;
      else {
        update_await_block_branch(info, ctx, dirty);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(textfield.$$.fragment, local);
      transition_in(button.$$.fragment, local);
      transition_in(info.block);
      current = true;
    },
    o(local) {
      transition_out(textfield.$$.fragment, local);
      transition_out(button.$$.fragment, local);
      for (let i = 0; i < 3; i += 1) {
        const block = info.blocks[i];
        transition_out(block);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(p0);
        detach(t1);
        detach(p1);
        detach(t5);
        detach(p2);
        detach(t9);
        detach(t10);
        detach(t11);
        detach(await_block_anchor);
      }
      destroy_component(textfield, detaching);
      destroy_component(button, detaching);
      info.block.d(detaching);
      info.token = null;
      info = null;
    }
  };
}
function create_default_slot_6(ctx) {
  let content;
  let current;
  content = new Content({
    props: {
      $$slots: { default: [create_default_slot_7] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(content.$$.fragment);
    },
    l(nodes) {
      claim_component(content.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(content, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const content_changes = {};
      if (dirty & /*$$scope, localKeyLoading, localKey, localKeyInvalid*/
      67108878) {
        content_changes.$$scope = { dirty, ctx: ctx2 };
      }
      content.$set(content_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(content.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(content.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(content, detaching);
    }
  };
}
function create_else_block(ctx) {
  let h5;
  let t0;
  let icon;
  let t1;
  let p0;
  let textContent = "Add one by navigating Menu --> New";
  let t3;
  let p1;
  let textContent_1 = `Or by adding a dashboard device on your homey.<br/> <span style="color: orange;">NOTE:</span> Requires installed app.`;
  let current;
  icon = new Icon({
    props: {
      class: "material-icons",
      $$slots: { default: [create_default_slot_5] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      h5 = element("h5");
      t0 = text("Oh no, you have no dashboards!");
      create_component(icon.$$.fragment);
      t1 = space();
      p0 = element("p");
      p0.textContent = textContent;
      t3 = space();
      p1 = element("p");
      p1.innerHTML = textContent_1;
    },
    l(nodes) {
      h5 = claim_element(nodes, "H5", {});
      var h5_nodes = children(h5);
      t0 = claim_text(h5_nodes, "Oh no, you have no dashboards!");
      claim_component(icon.$$.fragment, h5_nodes);
      h5_nodes.forEach(detach);
      t1 = claim_space(nodes);
      p0 = claim_element(nodes, "P", { ["data-svelte-h"]: true });
      if (get_svelte_dataset(p0) !== "svelte-1xx4ykf")
        p0.textContent = textContent;
      t3 = claim_space(nodes);
      p1 = claim_element(nodes, "P", { ["data-svelte-h"]: true });
      if (get_svelte_dataset(p1) !== "svelte-b78j87")
        p1.innerHTML = textContent_1;
    },
    m(target, anchor) {
      insert_hydration(target, h5, anchor);
      append_hydration(h5, t0);
      mount_component(icon, h5, null);
      insert_hydration(target, t1, anchor);
      insert_hydration(target, p0, anchor);
      insert_hydration(target, t3, anchor);
      insert_hydration(target, p1, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const icon_changes = {};
      if (dirty & /*$$scope*/
      67108864) {
        icon_changes.$$scope = { dirty, ctx: ctx2 };
      }
      icon.$set(icon_changes);
    },
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
        detach(h5);
        detach(t1);
        detach(p0);
        detach(t3);
        detach(p1);
      }
      destroy_component(icon);
    }
  };
}
function create_if_block_1(ctx) {
  let card;
  let current;
  card = new Card({
    props: {
      $$slots: { default: [create_default_slot] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(card.$$.fragment);
    },
    l(nodes) {
      claim_component(card.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(card, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const card_changes = {};
      if (dirty & /*$$scope, dashboards*/
      67108880) {
        card_changes.$$scope = { dirty, ctx: ctx2 };
      }
      card.$set(card_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(card.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(card.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(card, detaching);
    }
  };
}
function create_default_slot_5(ctx) {
  let t;
  return {
    c() {
      t = text("mood_bad");
    },
    l(nodes) {
      t = claim_text(nodes, "mood_bad");
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
  let t_value = (
    /*dashboard*/
    ctx[17].title + ""
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
      if (dirty & /*dashboards*/
      16 && t_value !== (t_value = /*dashboard*/
      ctx2[17].title + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_default_slot_3(ctx) {
  let text_1;
  let t;
  let current;
  text_1 = new Text({
    props: {
      $$slots: { default: [create_default_slot_4] },
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
      if (dirty & /*$$scope, dashboards*/
      67108880) {
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
  function click_handler() {
    return (
      /*click_handler*/
      ctx[11](
        /*dashboard*/
        ctx[17]
      )
    );
  }
  item = new Item({
    props: {
      $$slots: { default: [create_default_slot_3] },
      $$scope: { ctx }
    }
  });
  item.$on("click", click_handler);
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
      if (dirty & /*$$scope, dashboards*/
      67108880) {
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
function create_default_slot_2(ctx) {
  let each_1_anchor;
  let current;
  let each_value = ensure_array_like(
    /*dashboards*/
    ctx[4]
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
      if (dirty & /*goto, base, dashboards*/
      16) {
        each_value = ensure_array_like(
          /*dashboards*/
          ctx2[4]
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
function create_default_slot_1(ctx) {
  let list;
  let current;
  list = new List({
    props: {
      $$slots: { default: [create_default_slot_2] },
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
      if (dirty & /*$$scope, dashboards*/
      67108880) {
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
function create_default_slot(ctx) {
  let content;
  let current;
  content = new Content({
    props: {
      $$slots: { default: [create_default_slot_1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(content.$$.fragment);
    },
    l(nodes) {
      claim_component(content.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(content, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const content_changes = {};
      if (dirty & /*$$scope, dashboards*/
      67108880) {
        content_changes.$$scope = { dirty, ctx: ctx2 };
      }
      content.$set(content_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(content.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(content.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(content, detaching);
    }
  };
}
function create_fragment(ctx) {
  let div;
  let current_block_type_index;
  let if_block;
  let current;
  const if_block_creators = [create_if_block, create_else_block_1];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*$homey*/
      ctx2[5] !== void 0
    )
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      div = element("div");
      if_block.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      if_block.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "align-center svelte-u0ug3k");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if_blocks[current_block_type_index].m(div, null);
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
        detach(div);
      }
      if_blocks[current_block_type_index].d();
    }
  };
}
function instance_1($$self, $$props, $$invalidate) {
  let dashboards$2;
  let $baseUrl;
  let $localDashboards;
  let $homeyDashboards;
  let $homey;
  component_subscribe($$self, baseUrl, ($$value) => $$invalidate(15, $baseUrl = $$value));
  component_subscribe($$self, dashboards, ($$value) => $$invalidate(9, $localDashboards = $$value));
  component_subscribe($$self, dashboards$1, ($$value) => $$invalidate(10, $homeyDashboards = $$value));
  component_subscribe($$self, homey, ($$value) => $$invalidate(5, $homey = $$value));
  let active = "Online";
  let localKey = "";
  let localKeyInvalid = false;
  let localKeyLoading;
  function verifyApiKey() {
    apiKey.set(localKey);
    $$invalidate(3, localKeyLoading = connectApiKey());
  }
  async function connectApiKey() {
    $$invalidate(2, localKeyInvalid = false);
    try {
      const instance2 = await HomeyAPI.createLocalAPI({ address: $baseUrl, token: localKey });
      return instance2;
    } catch (e) {
      $$invalidate(2, localKeyInvalid = true);
    }
  }
  async function setHomey(instance2) {
    homey.set(instance2);
    await goto(base + "/");
  }
  async function oauthLogin() {
    const cloudApi = new AthomCloudAPI({
      clientId,
      clientSecret,
      redirectUrl: "https://homeyboard.github.io/oauth2/callback"
    });
    const loggedIn = await cloudApi.isLoggedIn();
    if (!loggedIn) {
      if (cloudApi.hasAuthorizationCode()) {
        await cloudApi.authenticateWithAuthorizationCode();
      } else {
        window.location = cloudApi.getLoginUrl();
        return;
      }
    }
    const user = await cloudApi.getAuthenticatedUser();
    const firstHomey = await user.getFirstHomey();
    const homeyApi = await firstHomey.authenticate();
    homey.set(homeyApi);
    await goto(base + "/");
  }
  const click_handler = (dashboard) => goto(base + "/board?id=" + dashboard.id);
  function tabbar_active_binding(value) {
    active = value;
    $$invalidate(0, active);
  }
  function textfield_value_binding(value) {
    localKey = value;
    $$invalidate(1, localKey);
  }
  const click_handler_1 = (instance2) => setHomey(instance2);
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$homeyDashboards, $localDashboards*/
    1536) {
      $$invalidate(4, dashboards$2 = Object.values({ ...$homeyDashboards, ...$localDashboards }));
    }
  };
  return [
    active,
    localKey,
    localKeyInvalid,
    localKeyLoading,
    dashboards$2,
    $homey,
    verifyApiKey,
    setHomey,
    oauthLogin,
    $localDashboards,
    $homeyDashboards,
    click_handler,
    tabbar_active_binding,
    textfield_value_binding,
    click_handler_1
  ];
}
class Page extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance_1, create_fragment, safe_not_equal, {});
  }
}
export {
  Page as component
};
