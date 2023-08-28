import { w as writable } from "./singletons.0aae1b48.js";
import { s as safe_not_equal, q as construct_svelte_component, e as empty, i as insert_hydration, d as detach, D as compute_rest_props, E as get_current_component, P as getContext, u as assign, F as exclude_internal_props, p as binding_callbacks, r as create_slot, y as update_slot_base, z as get_all_dirty_from_scope, A as get_slot_changes, U as svg_element, V as claim_svg_element, h as children, a2 as set_svg_attributes, x as action_destroyer, B as is_function, C as run_all, G as setContext, R as onDestroy, f as element, a as space, g as claim_element, c as claim_space, j as attr, v as set_attributes, w as listen, o as onMount, J as add_flush_callback, N as append_hydration, M as component_subscribe, Y as set_store_value, H as noop } from "./scheduler.8ee754c3.js";
import { S as SvelteComponent, i as init, b as create_component, d as claim_component, m as mount_component, g as group_outros, t as transition_out, e as destroy_component, c as check_outros, a as transition_in, f as bind } from "./index.09d54507.js";
import { c as classMap, g as get_spread_update, e as get_spread_object, f as forwardEventsBuilder, S as SmuiElement, u as useActions, _ as __extends, a as __assign, M as MDCFoundation, R as Ripple, d as dispatch, l as __values, x as cssClasses$4, o as ponyfill, b as classAdderBuilder, p as prefixFilter, m as exclude } from "./Textfield.6dc24502.js";
const globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : (
  // @ts-ignore Node typings have this
  global
);
function createEditing() {
  const { subscribe, set, update } = writable(false);
  return {
    subscribe,
    set,
    toggle: () => update((existing) => !existing)
  };
}
function createGrid() {
  const { subscribe, set, update } = writable({
    gaps: [10, 10]
  });
  return {
    subscribe,
    set,
    updateSize: (e) => update((existing) => ({ ...existing, columns: e.cols, width: e.width, pxX: e.xPerPx, pxY: e.yPerPx })),
    updateGap: (g) => update((existing) => ({ ...existing, gaps: [g, g] }))
  };
}
const editing = createEditing();
const grid = createGrid();
const dashboard = writable(void 0);
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
var FOCUS_SENTINEL_CLASS = "mdc-dom-focus-sentinel";
var FocusTrap = (
  /** @class */
  function() {
    function FocusTrap2(root, options) {
      if (options === void 0) {
        options = {};
      }
      this.root = root;
      this.options = options;
      this.elFocusedBeforeTrapFocus = null;
    }
    FocusTrap2.prototype.trapFocus = function() {
      var focusableEls = this.getFocusableElements(this.root);
      if (focusableEls.length === 0) {
        throw new Error("FocusTrap: Element must have at least one focusable child.");
      }
      this.elFocusedBeforeTrapFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      this.wrapTabFocus(this.root);
      if (!this.options.skipInitialFocus) {
        this.focusInitialElement(focusableEls, this.options.initialFocusEl);
      }
    };
    FocusTrap2.prototype.releaseFocus = function() {
      [].slice.call(this.root.querySelectorAll("." + FOCUS_SENTINEL_CLASS)).forEach(function(sentinelEl) {
        sentinelEl.parentElement.removeChild(sentinelEl);
      });
      if (!this.options.skipRestoreFocus && this.elFocusedBeforeTrapFocus) {
        this.elFocusedBeforeTrapFocus.focus();
      }
    };
    FocusTrap2.prototype.wrapTabFocus = function(el) {
      var _this = this;
      var sentinelStart = this.createSentinel();
      var sentinelEnd = this.createSentinel();
      sentinelStart.addEventListener("focus", function() {
        var focusableEls = _this.getFocusableElements(el);
        if (focusableEls.length > 0) {
          focusableEls[focusableEls.length - 1].focus();
        }
      });
      sentinelEnd.addEventListener("focus", function() {
        var focusableEls = _this.getFocusableElements(el);
        if (focusableEls.length > 0) {
          focusableEls[0].focus();
        }
      });
      el.insertBefore(sentinelStart, el.children[0]);
      el.appendChild(sentinelEnd);
    };
    FocusTrap2.prototype.focusInitialElement = function(focusableEls, initialFocusEl) {
      var focusIndex = 0;
      if (initialFocusEl) {
        focusIndex = Math.max(focusableEls.indexOf(initialFocusEl), 0);
      }
      focusableEls[focusIndex].focus();
    };
    FocusTrap2.prototype.getFocusableElements = function(root) {
      var focusableEls = [].slice.call(root.querySelectorAll("[autofocus], [tabindex], a, input, textarea, select, button"));
      return focusableEls.filter(function(el) {
        var isDisabledOrHidden = el.getAttribute("aria-disabled") === "true" || el.getAttribute("disabled") != null || el.getAttribute("hidden") != null || el.getAttribute("aria-hidden") === "true";
        var isTabbableAndVisible = el.tabIndex >= 0 && el.getBoundingClientRect().width > 0 && !el.classList.contains(FOCUS_SENTINEL_CLASS) && !isDisabledOrHidden;
        var isProgrammaticallyHidden = false;
        if (isTabbableAndVisible) {
          var style = getComputedStyle(el);
          isProgrammaticallyHidden = style.display === "none" || style.visibility === "hidden";
        }
        return isTabbableAndVisible && !isProgrammaticallyHidden;
      });
    };
    FocusTrap2.prototype.createSentinel = function() {
      var sentinel = document.createElement("div");
      sentinel.setAttribute("tabindex", "0");
      sentinel.setAttribute("aria-hidden", "true");
      sentinel.classList.add(FOCUS_SENTINEL_CLASS);
      return sentinel;
    };
    return FocusTrap2;
  }()
);
const domFocusTrap = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FocusTrap
}, Symbol.toStringTag, { value: "Module" }));
function create_default_slot$2(ctx) {
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
      ctx[4]
    ) },
    {
      use: [
        /*forwardEvents*/
        ctx[6],
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
        "mdc-button__icon": (
          /*context*/
          ctx[8] === "button"
        ),
        "mdc-fab__icon": (
          /*context*/
          ctx[8] === "fab"
        ),
        "mdc-icon-button__icon": (
          /*context*/
          ctx[8] === "icon-button"
        ),
        "mdc-icon-button__icon--on": (
          /*context*/
          ctx[8] === "icon-button" && /*on*/
          ctx[2]
        ),
        "mdc-tab__icon": (
          /*context*/
          ctx[8] === "tab"
        ),
        "mdc-banner__icon": (
          /*context*/
          ctx[8] === "banner"
        ),
        "mdc-segmented-button__icon": (
          /*context*/
          ctx[8] === "segmented-button"
        )
      })
    },
    { "aria-hidden": "true" },
    /*svg*/
    ctx[7] ? { focusable: "false", tabindex: "-1" } : {},
    /*$$restProps*/
    ctx[9]
  ];
  var switch_value = (
    /*component*/
    ctx[3]
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
      const switch_instance_changes = dirty & /*tag, forwardEvents, use, classMap, className, context, on, svg, $$restProps*/
      983 ? get_spread_update(switch_instance_spread_levels, [
        dirty & /*tag*/
        16 && { tag: (
          /*tag*/
          ctx2[4]
        ) },
        dirty & /*forwardEvents, use*/
        65 && {
          use: [
            /*forwardEvents*/
            ctx2[6],
            .../*use*/
            ctx2[0]
          ]
        },
        dirty & /*classMap, className, context, on*/
        262 && {
          class: classMap({
            [
              /*className*/
              ctx2[1]
            ]: true,
            "mdc-button__icon": (
              /*context*/
              ctx2[8] === "button"
            ),
            "mdc-fab__icon": (
              /*context*/
              ctx2[8] === "fab"
            ),
            "mdc-icon-button__icon": (
              /*context*/
              ctx2[8] === "icon-button"
            ),
            "mdc-icon-button__icon--on": (
              /*context*/
              ctx2[8] === "icon-button" && /*on*/
              ctx2[2]
            ),
            "mdc-tab__icon": (
              /*context*/
              ctx2[8] === "tab"
            ),
            "mdc-banner__icon": (
              /*context*/
              ctx2[8] === "banner"
            ),
            "mdc-segmented-button__icon": (
              /*context*/
              ctx2[8] === "segmented-button"
            )
          })
        },
        switch_instance_spread_levels[3],
        dirty & /*svg*/
        128 && get_spread_object(
          /*svg*/
          ctx2[7] ? { focusable: "false", tabindex: "-1" } : {}
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
      8 && switch_value !== (switch_value = /*component*/
      ctx2[3])) {
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
function instance$2($$self, $$props, $$invalidate) {
  const omit_props_names = ["use", "class", "on", "component", "tag", "getElement"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { on = false } = $$props;
  let element2;
  let { component = SmuiElement } = $$props;
  let { tag = component === SmuiElement ? "i" : void 0 } = $$props;
  const svg = component === Svg;
  const context = getContext("SMUI:icon:context");
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
    $$invalidate(9, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("on" in $$new_props)
      $$invalidate(2, on = $$new_props.on);
    if ("component" in $$new_props)
      $$invalidate(3, component = $$new_props.component);
    if ("tag" in $$new_props)
      $$invalidate(4, tag = $$new_props.tag);
    if ("$$scope" in $$new_props)
      $$invalidate(13, $$scope = $$new_props.$$scope);
  };
  return [
    use,
    className,
    on,
    component,
    tag,
    element2,
    forwardEvents,
    svg,
    context,
    $$restProps,
    getElement,
    slots,
    switch_instance_binding,
    $$scope
  ];
}
class CommonIcon extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$6, safe_not_equal, {
      use: 0,
      class: 1,
      on: 2,
      component: 3,
      tag: 4,
      getElement: 10
    });
  }
  get getElement() {
    return this.$$.ctx[10];
  }
}
function create_fragment$5(ctx) {
  let svg;
  let useActions_action;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = (
    /*#slots*/
    ctx[6].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[5],
    null
  );
  let svg_levels = [
    /*$$restProps*/
    ctx[3]
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
      ctx[7](svg);
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
            ctx[2].call(null, svg)
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        32)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[5],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[5]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[5],
              dirty,
              null
            ),
            null
          );
        }
      }
      set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [dirty & /*$$restProps*/
      8 && /*$$restProps*/
      ctx2[3]]));
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
      ctx[7](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  const omit_props_names = ["use", "getElement"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  if (console && console.warn) {
    console.warn('The @smui/common Svg component is deprecated. You can use `tag="svg"` now.');
  }
  let { use = [] } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let element2;
  function getElement() {
    return element2;
  }
  function svg_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(1, element2);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(3, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("$$scope" in $$new_props)
      $$invalidate(5, $$scope = $$new_props.$$scope);
  };
  return [
    use,
    element2,
    forwardEvents,
    $$restProps,
    getElement,
    $$scope,
    slots,
    svg_binding
  ];
}
class Svg extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$5, safe_not_equal, { use: 0, getElement: 4 });
  }
  get getElement() {
    return this.$$.ctx[4];
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
var cssClasses$3 = {
  ICON_BUTTON_ON: "mdc-icon-button--on",
  ROOT: "mdc-icon-button"
};
var strings$3 = {
  ARIA_LABEL: "aria-label",
  ARIA_PRESSED: "aria-pressed",
  DATA_ARIA_LABEL_OFF: "data-aria-label-off",
  DATA_ARIA_LABEL_ON: "data-aria-label-on",
  CHANGE_EVENT: "MDCIconButtonToggle:change"
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
var MDCIconButtonToggleFoundation = (
  /** @class */
  function(_super) {
    __extends(MDCIconButtonToggleFoundation2, _super);
    function MDCIconButtonToggleFoundation2(adapter) {
      var _this = _super.call(this, __assign(__assign({}, MDCIconButtonToggleFoundation2.defaultAdapter), adapter)) || this;
      _this.hasToggledAriaLabel = false;
      return _this;
    }
    Object.defineProperty(MDCIconButtonToggleFoundation2, "cssClasses", {
      get: function() {
        return cssClasses$3;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCIconButtonToggleFoundation2, "strings", {
      get: function() {
        return strings$3;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCIconButtonToggleFoundation2, "defaultAdapter", {
      get: function() {
        return {
          addClass: function() {
            return void 0;
          },
          hasClass: function() {
            return false;
          },
          notifyChange: function() {
            return void 0;
          },
          removeClass: function() {
            return void 0;
          },
          getAttr: function() {
            return null;
          },
          setAttr: function() {
            return void 0;
          }
        };
      },
      enumerable: false,
      configurable: true
    });
    MDCIconButtonToggleFoundation2.prototype.init = function() {
      var ariaLabelOn = this.adapter.getAttr(strings$3.DATA_ARIA_LABEL_ON);
      var ariaLabelOff = this.adapter.getAttr(strings$3.DATA_ARIA_LABEL_OFF);
      if (ariaLabelOn && ariaLabelOff) {
        if (this.adapter.getAttr(strings$3.ARIA_PRESSED) !== null) {
          throw new Error("MDCIconButtonToggleFoundation: Button should not set `aria-pressed` if it has a toggled aria label.");
        }
        this.hasToggledAriaLabel = true;
      } else {
        this.adapter.setAttr(strings$3.ARIA_PRESSED, String(this.isOn()));
      }
    };
    MDCIconButtonToggleFoundation2.prototype.handleClick = function() {
      this.toggle();
      this.adapter.notifyChange({ isOn: this.isOn() });
    };
    MDCIconButtonToggleFoundation2.prototype.isOn = function() {
      return this.adapter.hasClass(cssClasses$3.ICON_BUTTON_ON);
    };
    MDCIconButtonToggleFoundation2.prototype.toggle = function(isOn) {
      if (isOn === void 0) {
        isOn = !this.isOn();
      }
      if (isOn) {
        this.adapter.addClass(cssClasses$3.ICON_BUTTON_ON);
      } else {
        this.adapter.removeClass(cssClasses$3.ICON_BUTTON_ON);
      }
      if (this.hasToggledAriaLabel) {
        var ariaLabel = isOn ? this.adapter.getAttr(strings$3.DATA_ARIA_LABEL_ON) : this.adapter.getAttr(strings$3.DATA_ARIA_LABEL_OFF);
        this.adapter.setAttr(strings$3.ARIA_LABEL, ariaLabel || "");
      } else {
        this.adapter.setAttr(strings$3.ARIA_PRESSED, "" + isOn);
      }
    };
    return MDCIconButtonToggleFoundation2;
  }(MDCFoundation)
);
function create_if_block$1(ctx) {
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
      attr(div, "class", "mdc-icon-button__touch");
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
    ctx[33].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[37],
    null
  );
  let if_block = (
    /*touch*/
    ctx[8] && create_if_block$1()
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
      attr(div, "class", "mdc-icon-button__ripple");
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
        /*touch*/
        ctx2[8]
      ) {
        if (if_block)
          ;
        else {
          if_block = create_if_block$1();
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
function create_fragment$4(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [
    { tag: (
      /*tag*/
      ctx[14]
    ) },
    {
      use: [
        [
          Ripple,
          {
            ripple: (
              /*ripple*/
              ctx[4]
            ),
            unbounded: true,
            color: (
              /*color*/
              ctx[5]
            ),
            disabled: !!/*$$restProps*/
            ctx[29].disabled,
            addClass: (
              /*addClass*/
              ctx[26]
            ),
            removeClass: (
              /*removeClass*/
              ctx[27]
            ),
            addStyle: (
              /*addStyle*/
              ctx[28]
            )
          }
        ],
        /*forwardEvents*/
        ctx[22],
        .../*use*/
        ctx[1]
      ]
    },
    {
      class: classMap({
        [
          /*className*/
          ctx[2]
        ]: true,
        "mdc-icon-button": true,
        "mdc-icon-button--on": !/*isUninitializedValue*/
        ctx[23](
          /*pressed*/
          ctx[0]
        ) && /*pressed*/
        ctx[0],
        "mdc-icon-button--touch": (
          /*touch*/
          ctx[8]
        ),
        "mdc-icon-button--display-flex": (
          /*displayFlex*/
          ctx[9]
        ),
        "smui-icon-button--size-button": (
          /*size*/
          ctx[10] === "button"
        ),
        "smui-icon-button--size-mini": (
          /*size*/
          ctx[10] === "mini"
        ),
        "mdc-icon-button--reduced-size": (
          /*size*/
          ctx[10] === "mini" || /*size*/
          ctx[10] === "button"
        ),
        "mdc-card__action": (
          /*context*/
          ctx[24] === "card:action"
        ),
        "mdc-card__action--icon": (
          /*context*/
          ctx[24] === "card:action"
        ),
        "mdc-top-app-bar__navigation-icon": (
          /*context*/
          ctx[24] === "top-app-bar:navigation"
        ),
        "mdc-top-app-bar__action-item": (
          /*context*/
          ctx[24] === "top-app-bar:action"
        ),
        "mdc-snackbar__dismiss": (
          /*context*/
          ctx[24] === "snackbar:actions"
        ),
        "mdc-data-table__pagination-button": (
          /*context*/
          ctx[24] === "data-table:pagination"
        ),
        "mdc-data-table__sort-icon-button": (
          /*context*/
          ctx[24] === "data-table:sortable-header-cell"
        ),
        "mdc-dialog__close": (
          /*context*/
          (ctx[24] === "dialog:header" || /*context*/
          ctx[24] === "dialog:sheet") && /*action*/
          ctx[12] === "close"
        ),
        .../*internalClasses*/
        ctx[18]
      })
    },
    {
      style: Object.entries(
        /*internalStyles*/
        ctx[19]
      ).map(func$1).concat([
        /*style*/
        ctx[3]
      ]).join(" ")
    },
    {
      "aria-pressed": !/*isUninitializedValue*/
      ctx[23](
        /*pressed*/
        ctx[0]
      ) ? (
        /*pressed*/
        ctx[0] ? "true" : "false"
      ) : null
    },
    {
      "aria-label": (
        /*pressed*/
        ctx[0] ? (
          /*ariaLabelOn*/
          ctx[6]
        ) : (
          /*ariaLabelOff*/
          ctx[7]
        )
      )
    },
    {
      "data-aria-label-on": (
        /*ariaLabelOn*/
        ctx[6]
      )
    },
    {
      "data-aria-label-off": (
        /*ariaLabelOff*/
        ctx[7]
      )
    },
    {
      "aria-describedby": (
        /*ariaDescribedby*/
        ctx[25]
      )
    },
    { href: (
      /*href*/
      ctx[11]
    ) },
    /*actionProp*/
    ctx[21],
    /*internalAttrs*/
    ctx[20],
    /*$$restProps*/
    ctx[29]
  ];
  var switch_value = (
    /*component*/
    ctx[13]
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
    ctx[34](switch_instance);
    switch_instance.$on(
      "click",
      /*click_handler*/
      ctx[35]
    );
    switch_instance.$on(
      "click",
      /*click_handler_1*/
      ctx[36]
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
      const switch_instance_changes = dirty[0] & /*tag, ripple, color, $$restProps, addClass, removeClass, addStyle, forwardEvents, use, className, isUninitializedValue, pressed, touch, displayFlex, size, context, action, internalClasses, internalStyles, style, ariaLabelOn, ariaLabelOff, ariaDescribedby, href, actionProp, internalAttrs*/
      1073504255 ? get_spread_update(switch_instance_spread_levels, [
        dirty[0] & /*tag*/
        16384 && { tag: (
          /*tag*/
          ctx2[14]
        ) },
        dirty[0] & /*ripple, color, $$restProps, addClass, removeClass, addStyle, forwardEvents, use*/
        1010827314 && {
          use: [
            [
              Ripple,
              {
                ripple: (
                  /*ripple*/
                  ctx2[4]
                ),
                unbounded: true,
                color: (
                  /*color*/
                  ctx2[5]
                ),
                disabled: !!/*$$restProps*/
                ctx2[29].disabled,
                addClass: (
                  /*addClass*/
                  ctx2[26]
                ),
                removeClass: (
                  /*removeClass*/
                  ctx2[27]
                ),
                addStyle: (
                  /*addStyle*/
                  ctx2[28]
                )
              }
            ],
            /*forwardEvents*/
            ctx2[22],
            .../*use*/
            ctx2[1]
          ]
        },
        dirty[0] & /*className, isUninitializedValue, pressed, touch, displayFlex, size, context, action, internalClasses*/
        25433861 && {
          class: classMap({
            [
              /*className*/
              ctx2[2]
            ]: true,
            "mdc-icon-button": true,
            "mdc-icon-button--on": !/*isUninitializedValue*/
            ctx2[23](
              /*pressed*/
              ctx2[0]
            ) && /*pressed*/
            ctx2[0],
            "mdc-icon-button--touch": (
              /*touch*/
              ctx2[8]
            ),
            "mdc-icon-button--display-flex": (
              /*displayFlex*/
              ctx2[9]
            ),
            "smui-icon-button--size-button": (
              /*size*/
              ctx2[10] === "button"
            ),
            "smui-icon-button--size-mini": (
              /*size*/
              ctx2[10] === "mini"
            ),
            "mdc-icon-button--reduced-size": (
              /*size*/
              ctx2[10] === "mini" || /*size*/
              ctx2[10] === "button"
            ),
            "mdc-card__action": (
              /*context*/
              ctx2[24] === "card:action"
            ),
            "mdc-card__action--icon": (
              /*context*/
              ctx2[24] === "card:action"
            ),
            "mdc-top-app-bar__navigation-icon": (
              /*context*/
              ctx2[24] === "top-app-bar:navigation"
            ),
            "mdc-top-app-bar__action-item": (
              /*context*/
              ctx2[24] === "top-app-bar:action"
            ),
            "mdc-snackbar__dismiss": (
              /*context*/
              ctx2[24] === "snackbar:actions"
            ),
            "mdc-data-table__pagination-button": (
              /*context*/
              ctx2[24] === "data-table:pagination"
            ),
            "mdc-data-table__sort-icon-button": (
              /*context*/
              ctx2[24] === "data-table:sortable-header-cell"
            ),
            "mdc-dialog__close": (
              /*context*/
              (ctx2[24] === "dialog:header" || /*context*/
              ctx2[24] === "dialog:sheet") && /*action*/
              ctx2[12] === "close"
            ),
            .../*internalClasses*/
            ctx2[18]
          })
        },
        dirty[0] & /*internalStyles, style*/
        524296 && {
          style: Object.entries(
            /*internalStyles*/
            ctx2[19]
          ).map(func$1).concat([
            /*style*/
            ctx2[3]
          ]).join(" ")
        },
        dirty[0] & /*isUninitializedValue, pressed*/
        8388609 && {
          "aria-pressed": !/*isUninitializedValue*/
          ctx2[23](
            /*pressed*/
            ctx2[0]
          ) ? (
            /*pressed*/
            ctx2[0] ? "true" : "false"
          ) : null
        },
        dirty[0] & /*pressed, ariaLabelOn, ariaLabelOff*/
        193 && {
          "aria-label": (
            /*pressed*/
            ctx2[0] ? (
              /*ariaLabelOn*/
              ctx2[6]
            ) : (
              /*ariaLabelOff*/
              ctx2[7]
            )
          )
        },
        dirty[0] & /*ariaLabelOn*/
        64 && {
          "data-aria-label-on": (
            /*ariaLabelOn*/
            ctx2[6]
          )
        },
        dirty[0] & /*ariaLabelOff*/
        128 && {
          "data-aria-label-off": (
            /*ariaLabelOff*/
            ctx2[7]
          )
        },
        dirty[0] & /*ariaDescribedby*/
        33554432 && {
          "aria-describedby": (
            /*ariaDescribedby*/
            ctx2[25]
          )
        },
        dirty[0] & /*href*/
        2048 && { href: (
          /*href*/
          ctx2[11]
        ) },
        dirty[0] & /*actionProp*/
        2097152 && get_spread_object(
          /*actionProp*/
          ctx2[21]
        ),
        dirty[0] & /*internalAttrs*/
        1048576 && get_spread_object(
          /*internalAttrs*/
          ctx2[20]
        ),
        dirty[0] & /*$$restProps*/
        536870912 && get_spread_object(
          /*$$restProps*/
          ctx2[29]
        )
      ]) : {};
      if (dirty[0] & /*touch*/
      256 | dirty[1] & /*$$scope*/
      64) {
        switch_instance_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (dirty[0] & /*component*/
      8192 && switch_value !== (switch_value = /*component*/
      ctx2[13])) {
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
          ctx2[34](switch_instance);
          switch_instance.$on(
            "click",
            /*click_handler*/
            ctx2[35]
          );
          switch_instance.$on(
            "click",
            /*click_handler_1*/
            ctx2[36]
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
      ctx[34](null);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
const func$1 = ([name, value]) => `${name}: ${value};`;
function instance_1$3($$self, $$props, $$invalidate) {
  let actionProp;
  const omit_props_names = [
    "use",
    "class",
    "style",
    "ripple",
    "color",
    "toggle",
    "pressed",
    "ariaLabelOn",
    "ariaLabelOff",
    "touch",
    "displayFlex",
    "size",
    "href",
    "action",
    "component",
    "tag",
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
  let { ripple = true } = $$props;
  let { color = void 0 } = $$props;
  let { toggle = false } = $$props;
  let { pressed = uninitializedValue } = $$props;
  let { ariaLabelOn = void 0 } = $$props;
  let { ariaLabelOff = void 0 } = $$props;
  let { touch = false } = $$props;
  let { displayFlex = true } = $$props;
  let { size = "normal" } = $$props;
  let { href = void 0 } = $$props;
  let { action = void 0 } = $$props;
  let element2;
  let instance2;
  let internalClasses = {};
  let internalStyles = {};
  let internalAttrs = {};
  let context = getContext("SMUI:icon-button:context");
  let ariaDescribedby = getContext("SMUI:icon-button:aria-describedby");
  let { component = SmuiElement } = $$props;
  let { tag = component === SmuiElement ? href == null ? "button" : "a" : void 0 } = $$props;
  let previousDisabled = $$restProps.disabled;
  setContext("SMUI:icon:context", "icon-button");
  let oldToggle = null;
  onDestroy(() => {
    instance2 && instance2.destroy();
  });
  function hasClass(className2) {
    return className2 in internalClasses ? internalClasses[className2] : getElement().classList.contains(className2);
  }
  function addClass(className2) {
    if (!internalClasses[className2]) {
      $$invalidate(18, internalClasses[className2] = true, internalClasses);
    }
  }
  function removeClass(className2) {
    if (!(className2 in internalClasses) || internalClasses[className2]) {
      $$invalidate(18, internalClasses[className2] = false, internalClasses);
    }
  }
  function addStyle(name, value) {
    if (internalStyles[name] != value) {
      if (value === "" || value == null) {
        delete internalStyles[name];
        $$invalidate(19, internalStyles);
      } else {
        $$invalidate(19, internalStyles[name] = value, internalStyles);
      }
    }
  }
  function getAttr(name) {
    var _a;
    return name in internalAttrs ? (_a = internalAttrs[name]) !== null && _a !== void 0 ? _a : null : getElement().getAttribute(name);
  }
  function addAttr(name, value) {
    if (internalAttrs[name] !== value) {
      $$invalidate(20, internalAttrs[name] = value, internalAttrs);
    }
  }
  function handleChange(evtData) {
    $$invalidate(0, pressed = evtData.isOn);
  }
  function getElement() {
    return element2.getElement();
  }
  function switch_instance_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(16, element2);
    });
  }
  const click_handler = () => instance2 && instance2.handleClick();
  const click_handler_1 = () => context === "top-app-bar:navigation" && dispatch(getElement(), "SMUITopAppBarIconButton:nav");
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(29, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("use" in $$new_props)
      $$invalidate(1, use = $$new_props.use);
    if ("class" in $$new_props)
      $$invalidate(2, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(3, style = $$new_props.style);
    if ("ripple" in $$new_props)
      $$invalidate(4, ripple = $$new_props.ripple);
    if ("color" in $$new_props)
      $$invalidate(5, color = $$new_props.color);
    if ("toggle" in $$new_props)
      $$invalidate(30, toggle = $$new_props.toggle);
    if ("pressed" in $$new_props)
      $$invalidate(0, pressed = $$new_props.pressed);
    if ("ariaLabelOn" in $$new_props)
      $$invalidate(6, ariaLabelOn = $$new_props.ariaLabelOn);
    if ("ariaLabelOff" in $$new_props)
      $$invalidate(7, ariaLabelOff = $$new_props.ariaLabelOff);
    if ("touch" in $$new_props)
      $$invalidate(8, touch = $$new_props.touch);
    if ("displayFlex" in $$new_props)
      $$invalidate(9, displayFlex = $$new_props.displayFlex);
    if ("size" in $$new_props)
      $$invalidate(10, size = $$new_props.size);
    if ("href" in $$new_props)
      $$invalidate(11, href = $$new_props.href);
    if ("action" in $$new_props)
      $$invalidate(12, action = $$new_props.action);
    if ("component" in $$new_props)
      $$invalidate(13, component = $$new_props.component);
    if ("tag" in $$new_props)
      $$invalidate(14, tag = $$new_props.tag);
    if ("$$scope" in $$new_props)
      $$invalidate(37, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & /*action*/
    4096) {
      $$invalidate(21, actionProp = (() => {
        if (context === "data-table:pagination") {
          switch (action) {
            case "first-page":
              return { "data-first-page": "true" };
            case "prev-page":
              return { "data-prev-page": "true" };
            case "next-page":
              return { "data-next-page": "true" };
            case "last-page":
              return { "data-last-page": "true" };
            default:
              return { "data-action": "true" };
          }
        } else if (context === "dialog:header" || context === "dialog:sheet") {
          return { "data-mdc-dialog-action": action };
        } else {
          return { action };
        }
      })());
    }
    if (previousDisabled !== $$restProps.disabled) {
      const elem = getElement();
      if ("blur" in elem) {
        elem.blur();
      }
      $$invalidate(31, previousDisabled = $$restProps.disabled);
    }
    if ($$self.$$.dirty[0] & /*element, toggle, instance*/
    1073938432 | $$self.$$.dirty[1] & /*oldToggle*/
    2) {
      if (element2 && getElement() && toggle !== oldToggle) {
        if (toggle && !instance2) {
          $$invalidate(17, instance2 = new MDCIconButtonToggleFoundation({
            addClass,
            hasClass,
            notifyChange: (evtData) => {
              handleChange(evtData);
              dispatch(getElement(), "SMUIIconButtonToggle:change", evtData, void 0, true);
            },
            removeClass,
            getAttr,
            setAttr: addAttr
          }));
          instance2.init();
        } else if (!toggle && instance2) {
          instance2.destroy();
          $$invalidate(17, instance2 = void 0);
          $$invalidate(18, internalClasses = {});
          $$invalidate(20, internalAttrs = {});
        }
        $$invalidate(32, oldToggle = toggle);
      }
    }
    if ($$self.$$.dirty[0] & /*instance, pressed*/
    131073) {
      if (instance2 && !isUninitializedValue(pressed) && instance2.isOn() !== pressed) {
        instance2.toggle(pressed);
      }
    }
  };
  return [
    pressed,
    use,
    className,
    style,
    ripple,
    color,
    ariaLabelOn,
    ariaLabelOff,
    touch,
    displayFlex,
    size,
    href,
    action,
    component,
    tag,
    getElement,
    element2,
    instance2,
    internalClasses,
    internalStyles,
    internalAttrs,
    actionProp,
    forwardEvents,
    isUninitializedValue,
    context,
    ariaDescribedby,
    addClass,
    removeClass,
    addStyle,
    $$restProps,
    toggle,
    previousDisabled,
    oldToggle,
    slots,
    switch_instance_binding,
    click_handler,
    click_handler_1,
    $$scope
  ];
}
class IconButton extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance_1$3,
      create_fragment$4,
      safe_not_equal,
      {
        use: 1,
        class: 2,
        style: 3,
        ripple: 4,
        color: 5,
        toggle: 30,
        pressed: 0,
        ariaLabelOn: 6,
        ariaLabelOff: 7,
        touch: 8,
        displayFlex: 9,
        size: 10,
        href: 11,
        action: 12,
        component: 13,
        tag: 14,
        getElement: 15
      },
      null,
      [-1, -1]
    );
  }
  get getElement() {
    return this.$$.ctx[15];
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
var cssClasses$2 = {
  ANCHOR: "mdc-menu-surface--anchor",
  ANIMATING_CLOSED: "mdc-menu-surface--animating-closed",
  ANIMATING_OPEN: "mdc-menu-surface--animating-open",
  FIXED: "mdc-menu-surface--fixed",
  IS_OPEN_BELOW: "mdc-menu-surface--is-open-below",
  OPEN: "mdc-menu-surface--open",
  ROOT: "mdc-menu-surface"
};
var strings$2 = {
  CLOSED_EVENT: "MDCMenuSurface:closed",
  CLOSING_EVENT: "MDCMenuSurface:closing",
  OPENED_EVENT: "MDCMenuSurface:opened",
  OPENING_EVENT: "MDCMenuSurface:opening",
  FOCUSABLE_ELEMENTS: [
    "button:not(:disabled)",
    '[href]:not([aria-disabled="true"])',
    "input:not(:disabled)",
    "select:not(:disabled)",
    "textarea:not(:disabled)",
    '[tabindex]:not([tabindex="-1"]):not([aria-disabled="true"])'
  ].join(", ")
};
var numbers$2 = {
  /** Total duration of menu-surface open animation. */
  TRANSITION_OPEN_DURATION: 120,
  /** Total duration of menu-surface close animation. */
  TRANSITION_CLOSE_DURATION: 75,
  /**
   * Margin left to the edge of the viewport when menu-surface is at maximum
   * possible height. Also used as a viewport margin.
   */
  MARGIN_TO_EDGE: 32,
  /**
   * Ratio of anchor width to menu-surface width for switching from corner
   * positioning to center positioning.
   */
  ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO: 0.67,
  /**
   * Amount of time to wait before restoring focus when closing the menu
   * surface. This is important because if a touch event triggered the menu
   * close, and the subsequent mouse event occurs after focus is restored, then
   * the restored focus would be lost.
   */
  TOUCH_EVENT_WAIT_MS: 30
};
var CornerBit;
(function(CornerBit2) {
  CornerBit2[CornerBit2["BOTTOM"] = 1] = "BOTTOM";
  CornerBit2[CornerBit2["CENTER"] = 2] = "CENTER";
  CornerBit2[CornerBit2["RIGHT"] = 4] = "RIGHT";
  CornerBit2[CornerBit2["FLIP_RTL"] = 8] = "FLIP_RTL";
})(CornerBit || (CornerBit = {}));
var Corner;
(function(Corner2) {
  Corner2[Corner2["TOP_LEFT"] = 0] = "TOP_LEFT";
  Corner2[Corner2["TOP_RIGHT"] = 4] = "TOP_RIGHT";
  Corner2[Corner2["BOTTOM_LEFT"] = 1] = "BOTTOM_LEFT";
  Corner2[Corner2["BOTTOM_RIGHT"] = 5] = "BOTTOM_RIGHT";
  Corner2[Corner2["TOP_START"] = 8] = "TOP_START";
  Corner2[Corner2["TOP_END"] = 12] = "TOP_END";
  Corner2[Corner2["BOTTOM_START"] = 9] = "BOTTOM_START";
  Corner2[Corner2["BOTTOM_END"] = 13] = "BOTTOM_END";
})(Corner || (Corner = {}));
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
var MDCMenuSurfaceFoundation = (
  /** @class */
  function(_super) {
    __extends(MDCMenuSurfaceFoundation2, _super);
    function MDCMenuSurfaceFoundation2(adapter) {
      var _this = _super.call(this, __assign(__assign({}, MDCMenuSurfaceFoundation2.defaultAdapter), adapter)) || this;
      _this.isSurfaceOpen = false;
      _this.isQuickOpen = false;
      _this.isHoistedElement = false;
      _this.isFixedPosition = false;
      _this.isHorizontallyCenteredOnViewport = false;
      _this.maxHeight = 0;
      _this.openBottomBias = 0;
      _this.openAnimationEndTimerId = 0;
      _this.closeAnimationEndTimerId = 0;
      _this.animationRequestId = 0;
      _this.anchorCorner = Corner.TOP_START;
      _this.originCorner = Corner.TOP_START;
      _this.anchorMargin = { top: 0, right: 0, bottom: 0, left: 0 };
      _this.position = { x: 0, y: 0 };
      return _this;
    }
    Object.defineProperty(MDCMenuSurfaceFoundation2, "cssClasses", {
      get: function() {
        return cssClasses$2;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCMenuSurfaceFoundation2, "strings", {
      get: function() {
        return strings$2;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCMenuSurfaceFoundation2, "numbers", {
      get: function() {
        return numbers$2;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCMenuSurfaceFoundation2, "Corner", {
      get: function() {
        return Corner;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCMenuSurfaceFoundation2, "defaultAdapter", {
      /**
       * @see {@link MDCMenuSurfaceAdapter} for typing information on parameters and return types.
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
          hasAnchor: function() {
            return false;
          },
          isElementInContainer: function() {
            return false;
          },
          isFocused: function() {
            return false;
          },
          isRtl: function() {
            return false;
          },
          getInnerDimensions: function() {
            return { height: 0, width: 0 };
          },
          getAnchorDimensions: function() {
            return null;
          },
          getWindowDimensions: function() {
            return { height: 0, width: 0 };
          },
          getBodyDimensions: function() {
            return { height: 0, width: 0 };
          },
          getWindowScroll: function() {
            return { x: 0, y: 0 };
          },
          setPosition: function() {
            return void 0;
          },
          setMaxHeight: function() {
            return void 0;
          },
          setTransformOrigin: function() {
            return void 0;
          },
          saveFocus: function() {
            return void 0;
          },
          restoreFocus: function() {
            return void 0;
          },
          notifyClose: function() {
            return void 0;
          },
          notifyClosing: function() {
            return void 0;
          },
          notifyOpen: function() {
            return void 0;
          },
          notifyOpening: function() {
            return void 0;
          }
        };
      },
      enumerable: false,
      configurable: true
    });
    MDCMenuSurfaceFoundation2.prototype.init = function() {
      var _a = MDCMenuSurfaceFoundation2.cssClasses, ROOT = _a.ROOT, OPEN = _a.OPEN;
      if (!this.adapter.hasClass(ROOT)) {
        throw new Error(ROOT + " class required in root element.");
      }
      if (this.adapter.hasClass(OPEN)) {
        this.isSurfaceOpen = true;
      }
    };
    MDCMenuSurfaceFoundation2.prototype.destroy = function() {
      clearTimeout(this.openAnimationEndTimerId);
      clearTimeout(this.closeAnimationEndTimerId);
      cancelAnimationFrame(this.animationRequestId);
    };
    MDCMenuSurfaceFoundation2.prototype.setAnchorCorner = function(corner) {
      this.anchorCorner = corner;
    };
    MDCMenuSurfaceFoundation2.prototype.flipCornerHorizontally = function() {
      this.originCorner = this.originCorner ^ CornerBit.RIGHT;
    };
    MDCMenuSurfaceFoundation2.prototype.setAnchorMargin = function(margin) {
      this.anchorMargin.top = margin.top || 0;
      this.anchorMargin.right = margin.right || 0;
      this.anchorMargin.bottom = margin.bottom || 0;
      this.anchorMargin.left = margin.left || 0;
    };
    MDCMenuSurfaceFoundation2.prototype.setIsHoisted = function(isHoisted) {
      this.isHoistedElement = isHoisted;
    };
    MDCMenuSurfaceFoundation2.prototype.setFixedPosition = function(isFixedPosition) {
      this.isFixedPosition = isFixedPosition;
    };
    MDCMenuSurfaceFoundation2.prototype.isFixed = function() {
      return this.isFixedPosition;
    };
    MDCMenuSurfaceFoundation2.prototype.setAbsolutePosition = function(x, y) {
      this.position.x = this.isFinite(x) ? x : 0;
      this.position.y = this.isFinite(y) ? y : 0;
    };
    MDCMenuSurfaceFoundation2.prototype.setIsHorizontallyCenteredOnViewport = function(isCentered) {
      this.isHorizontallyCenteredOnViewport = isCentered;
    };
    MDCMenuSurfaceFoundation2.prototype.setQuickOpen = function(quickOpen) {
      this.isQuickOpen = quickOpen;
    };
    MDCMenuSurfaceFoundation2.prototype.setMaxHeight = function(maxHeight) {
      this.maxHeight = maxHeight;
    };
    MDCMenuSurfaceFoundation2.prototype.setOpenBottomBias = function(bias) {
      this.openBottomBias = bias;
    };
    MDCMenuSurfaceFoundation2.prototype.isOpen = function() {
      return this.isSurfaceOpen;
    };
    MDCMenuSurfaceFoundation2.prototype.open = function() {
      var _this = this;
      if (this.isSurfaceOpen) {
        return;
      }
      this.adapter.notifyOpening();
      this.adapter.saveFocus();
      if (this.isQuickOpen) {
        this.isSurfaceOpen = true;
        this.adapter.addClass(MDCMenuSurfaceFoundation2.cssClasses.OPEN);
        this.dimensions = this.adapter.getInnerDimensions();
        this.autoposition();
        this.adapter.notifyOpen();
      } else {
        this.adapter.addClass(MDCMenuSurfaceFoundation2.cssClasses.ANIMATING_OPEN);
        this.animationRequestId = requestAnimationFrame(function() {
          _this.dimensions = _this.adapter.getInnerDimensions();
          _this.autoposition();
          _this.adapter.addClass(MDCMenuSurfaceFoundation2.cssClasses.OPEN);
          _this.openAnimationEndTimerId = setTimeout(function() {
            _this.openAnimationEndTimerId = 0;
            _this.adapter.removeClass(MDCMenuSurfaceFoundation2.cssClasses.ANIMATING_OPEN);
            _this.adapter.notifyOpen();
          }, numbers$2.TRANSITION_OPEN_DURATION);
        });
        this.isSurfaceOpen = true;
      }
    };
    MDCMenuSurfaceFoundation2.prototype.close = function(skipRestoreFocus) {
      var _this = this;
      if (skipRestoreFocus === void 0) {
        skipRestoreFocus = false;
      }
      if (!this.isSurfaceOpen) {
        return;
      }
      this.adapter.notifyClosing();
      if (this.isQuickOpen) {
        this.isSurfaceOpen = false;
        if (!skipRestoreFocus) {
          this.maybeRestoreFocus();
        }
        this.adapter.removeClass(MDCMenuSurfaceFoundation2.cssClasses.OPEN);
        this.adapter.removeClass(MDCMenuSurfaceFoundation2.cssClasses.IS_OPEN_BELOW);
        this.adapter.notifyClose();
        return;
      }
      this.adapter.addClass(MDCMenuSurfaceFoundation2.cssClasses.ANIMATING_CLOSED);
      requestAnimationFrame(function() {
        _this.adapter.removeClass(MDCMenuSurfaceFoundation2.cssClasses.OPEN);
        _this.adapter.removeClass(MDCMenuSurfaceFoundation2.cssClasses.IS_OPEN_BELOW);
        _this.closeAnimationEndTimerId = setTimeout(function() {
          _this.closeAnimationEndTimerId = 0;
          _this.adapter.removeClass(MDCMenuSurfaceFoundation2.cssClasses.ANIMATING_CLOSED);
          _this.adapter.notifyClose();
        }, numbers$2.TRANSITION_CLOSE_DURATION);
      });
      this.isSurfaceOpen = false;
      if (!skipRestoreFocus) {
        this.maybeRestoreFocus();
      }
    };
    MDCMenuSurfaceFoundation2.prototype.handleBodyClick = function(evt) {
      var el = evt.target;
      if (this.adapter.isElementInContainer(el)) {
        return;
      }
      this.close();
    };
    MDCMenuSurfaceFoundation2.prototype.handleKeydown = function(evt) {
      var keyCode = evt.keyCode, key = evt.key;
      var isEscape = key === "Escape" || keyCode === 27;
      if (isEscape) {
        this.close();
      }
    };
    MDCMenuSurfaceFoundation2.prototype.autoposition = function() {
      var _a;
      this.measurements = this.getAutoLayoutmeasurements();
      var corner = this.getoriginCorner();
      var maxMenuSurfaceHeight = this.getMenuSurfaceMaxHeight(corner);
      var verticalAlignment = this.hasBit(corner, CornerBit.BOTTOM) ? "bottom" : "top";
      var horizontalAlignment = this.hasBit(corner, CornerBit.RIGHT) ? "right" : "left";
      var horizontalOffset = this.getHorizontalOriginOffset(corner);
      var verticalOffset = this.getVerticalOriginOffset(corner);
      var _b = this.measurements, anchorSize = _b.anchorSize, surfaceSize = _b.surfaceSize;
      var position = (_a = {}, _a[horizontalAlignment] = horizontalOffset, _a[verticalAlignment] = verticalOffset, _a);
      if (anchorSize.width / surfaceSize.width > numbers$2.ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO) {
        horizontalAlignment = "center";
      }
      if (this.isHoistedElement || this.isFixedPosition) {
        this.adjustPositionForHoistedElement(position);
      }
      this.adapter.setTransformOrigin(horizontalAlignment + " " + verticalAlignment);
      this.adapter.setPosition(position);
      this.adapter.setMaxHeight(maxMenuSurfaceHeight ? maxMenuSurfaceHeight + "px" : "");
      if (!this.hasBit(corner, CornerBit.BOTTOM)) {
        this.adapter.addClass(MDCMenuSurfaceFoundation2.cssClasses.IS_OPEN_BELOW);
      }
    };
    MDCMenuSurfaceFoundation2.prototype.getAutoLayoutmeasurements = function() {
      var anchorRect = this.adapter.getAnchorDimensions();
      var bodySize = this.adapter.getBodyDimensions();
      var viewportSize = this.adapter.getWindowDimensions();
      var windowScroll = this.adapter.getWindowScroll();
      if (!anchorRect) {
        anchorRect = {
          top: this.position.y,
          right: this.position.x,
          bottom: this.position.y,
          left: this.position.x,
          width: 0,
          height: 0
        };
      }
      return {
        anchorSize: anchorRect,
        bodySize,
        surfaceSize: this.dimensions,
        viewportDistance: {
          // tslint:disable:object-literal-sort-keys Positional properties are more readable when they're grouped together
          top: anchorRect.top,
          right: viewportSize.width - anchorRect.right,
          bottom: viewportSize.height - anchorRect.bottom,
          left: anchorRect.left
          // tslint:enable:object-literal-sort-keys
        },
        viewportSize,
        windowScroll
      };
    };
    MDCMenuSurfaceFoundation2.prototype.getoriginCorner = function() {
      var corner = this.originCorner;
      var _a = this.measurements, viewportDistance = _a.viewportDistance, anchorSize = _a.anchorSize, surfaceSize = _a.surfaceSize;
      var MARGIN_TO_EDGE = MDCMenuSurfaceFoundation2.numbers.MARGIN_TO_EDGE;
      var isAnchoredToBottom = this.hasBit(this.anchorCorner, CornerBit.BOTTOM);
      var availableTop;
      var availableBottom;
      if (isAnchoredToBottom) {
        availableTop = viewportDistance.top - MARGIN_TO_EDGE + this.anchorMargin.bottom;
        availableBottom = viewportDistance.bottom - MARGIN_TO_EDGE - this.anchorMargin.bottom;
      } else {
        availableTop = viewportDistance.top - MARGIN_TO_EDGE + this.anchorMargin.top;
        availableBottom = viewportDistance.bottom - MARGIN_TO_EDGE + anchorSize.height - this.anchorMargin.top;
      }
      var isAvailableBottom = availableBottom - surfaceSize.height > 0;
      if (!isAvailableBottom && availableTop > availableBottom + this.openBottomBias) {
        corner = this.setBit(corner, CornerBit.BOTTOM);
      }
      var isRtl = this.adapter.isRtl();
      var isFlipRtl = this.hasBit(this.anchorCorner, CornerBit.FLIP_RTL);
      var hasRightBit = this.hasBit(this.anchorCorner, CornerBit.RIGHT) || this.hasBit(corner, CornerBit.RIGHT);
      var isAnchoredToRight = false;
      if (isRtl && isFlipRtl) {
        isAnchoredToRight = !hasRightBit;
      } else {
        isAnchoredToRight = hasRightBit;
      }
      var availableLeft;
      var availableRight;
      if (isAnchoredToRight) {
        availableLeft = viewportDistance.left + anchorSize.width + this.anchorMargin.right;
        availableRight = viewportDistance.right - this.anchorMargin.right;
      } else {
        availableLeft = viewportDistance.left + this.anchorMargin.left;
        availableRight = viewportDistance.right + anchorSize.width - this.anchorMargin.left;
      }
      var isAvailableLeft = availableLeft - surfaceSize.width > 0;
      var isAvailableRight = availableRight - surfaceSize.width > 0;
      var isOriginCornerAlignedToEnd = this.hasBit(corner, CornerBit.FLIP_RTL) && this.hasBit(corner, CornerBit.RIGHT);
      if (isAvailableRight && isOriginCornerAlignedToEnd && isRtl || !isAvailableLeft && isOriginCornerAlignedToEnd) {
        corner = this.unsetBit(corner, CornerBit.RIGHT);
      } else if (isAvailableLeft && isAnchoredToRight && isRtl || isAvailableLeft && !isAnchoredToRight && hasRightBit || !isAvailableRight && availableLeft >= availableRight) {
        corner = this.setBit(corner, CornerBit.RIGHT);
      }
      return corner;
    };
    MDCMenuSurfaceFoundation2.prototype.getMenuSurfaceMaxHeight = function(corner) {
      if (this.maxHeight > 0) {
        return this.maxHeight;
      }
      var viewportDistance = this.measurements.viewportDistance;
      var maxHeight = 0;
      var isBottomAligned = this.hasBit(corner, CornerBit.BOTTOM);
      var isBottomAnchored = this.hasBit(this.anchorCorner, CornerBit.BOTTOM);
      var MARGIN_TO_EDGE = MDCMenuSurfaceFoundation2.numbers.MARGIN_TO_EDGE;
      if (isBottomAligned) {
        maxHeight = viewportDistance.top + this.anchorMargin.top - MARGIN_TO_EDGE;
        if (!isBottomAnchored) {
          maxHeight += this.measurements.anchorSize.height;
        }
      } else {
        maxHeight = viewportDistance.bottom - this.anchorMargin.bottom + this.measurements.anchorSize.height - MARGIN_TO_EDGE;
        if (isBottomAnchored) {
          maxHeight -= this.measurements.anchorSize.height;
        }
      }
      return maxHeight;
    };
    MDCMenuSurfaceFoundation2.prototype.getHorizontalOriginOffset = function(corner) {
      var anchorSize = this.measurements.anchorSize;
      var isRightAligned = this.hasBit(corner, CornerBit.RIGHT);
      var avoidHorizontalOverlap = this.hasBit(this.anchorCorner, CornerBit.RIGHT);
      if (isRightAligned) {
        var rightOffset = avoidHorizontalOverlap ? anchorSize.width - this.anchorMargin.left : this.anchorMargin.right;
        if (this.isHoistedElement || this.isFixedPosition) {
          return rightOffset - (this.measurements.viewportSize.width - this.measurements.bodySize.width);
        }
        return rightOffset;
      }
      return avoidHorizontalOverlap ? anchorSize.width - this.anchorMargin.right : this.anchorMargin.left;
    };
    MDCMenuSurfaceFoundation2.prototype.getVerticalOriginOffset = function(corner) {
      var anchorSize = this.measurements.anchorSize;
      var isBottomAligned = this.hasBit(corner, CornerBit.BOTTOM);
      var avoidVerticalOverlap = this.hasBit(this.anchorCorner, CornerBit.BOTTOM);
      var y = 0;
      if (isBottomAligned) {
        y = avoidVerticalOverlap ? anchorSize.height - this.anchorMargin.top : -this.anchorMargin.bottom;
      } else {
        y = avoidVerticalOverlap ? anchorSize.height + this.anchorMargin.bottom : this.anchorMargin.top;
      }
      return y;
    };
    MDCMenuSurfaceFoundation2.prototype.adjustPositionForHoistedElement = function(position) {
      var e_1, _a;
      var _b = this.measurements, windowScroll = _b.windowScroll, viewportDistance = _b.viewportDistance, surfaceSize = _b.surfaceSize, viewportSize = _b.viewportSize;
      var props = Object.keys(position);
      try {
        for (var props_1 = __values(props), props_1_1 = props_1.next(); !props_1_1.done; props_1_1 = props_1.next()) {
          var prop = props_1_1.value;
          var value = position[prop] || 0;
          if (this.isHorizontallyCenteredOnViewport && (prop === "left" || prop === "right")) {
            position[prop] = (viewportSize.width - surfaceSize.width) / 2;
            continue;
          }
          value += viewportDistance[prop];
          if (!this.isFixedPosition) {
            if (prop === "top") {
              value += windowScroll.y;
            } else if (prop === "bottom") {
              value -= windowScroll.y;
            } else if (prop === "left") {
              value += windowScroll.x;
            } else {
              value -= windowScroll.x;
            }
          }
          position[prop] = value;
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (props_1_1 && !props_1_1.done && (_a = props_1.return))
            _a.call(props_1);
        } finally {
          if (e_1)
            throw e_1.error;
        }
      }
    };
    MDCMenuSurfaceFoundation2.prototype.maybeRestoreFocus = function() {
      var _this = this;
      var isRootFocused = this.adapter.isFocused();
      var ownerDocument = this.adapter.getOwnerDocument ? this.adapter.getOwnerDocument() : document;
      var childHasFocus = ownerDocument.activeElement && this.adapter.isElementInContainer(ownerDocument.activeElement);
      if (isRootFocused || childHasFocus) {
        setTimeout(function() {
          _this.adapter.restoreFocus();
        }, numbers$2.TOUCH_EVENT_WAIT_MS);
      }
    };
    MDCMenuSurfaceFoundation2.prototype.hasBit = function(corner, bit) {
      return Boolean(corner & bit);
    };
    MDCMenuSurfaceFoundation2.prototype.setBit = function(corner, bit) {
      return corner | bit;
    };
    MDCMenuSurfaceFoundation2.prototype.unsetBit = function(corner, bit) {
      return corner ^ bit;
    };
    MDCMenuSurfaceFoundation2.prototype.isFinite = function(num) {
      return typeof num === "number" && isFinite(num);
    };
    return MDCMenuSurfaceFoundation2;
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
  MENU_SELECTED_LIST_ITEM: "mdc-menu-item--selected",
  MENU_SELECTION_GROUP: "mdc-menu__selection-group",
  ROOT: "mdc-menu"
};
var strings$1 = {
  ARIA_CHECKED_ATTR: "aria-checked",
  ARIA_DISABLED_ATTR: "aria-disabled",
  CHECKBOX_SELECTOR: 'input[type="checkbox"]',
  LIST_SELECTOR: ".mdc-list,.mdc-deprecated-list",
  SELECTED_EVENT: "MDCMenu:selected",
  SKIP_RESTORE_FOCUS: "data-menu-item-skip-restore-focus"
};
var numbers$1 = {
  FOCUS_ROOT_INDEX: -1
};
var DefaultFocusState;
(function(DefaultFocusState2) {
  DefaultFocusState2[DefaultFocusState2["NONE"] = 0] = "NONE";
  DefaultFocusState2[DefaultFocusState2["LIST_ROOT"] = 1] = "LIST_ROOT";
  DefaultFocusState2[DefaultFocusState2["FIRST_ITEM"] = 2] = "FIRST_ITEM";
  DefaultFocusState2[DefaultFocusState2["LAST_ITEM"] = 3] = "LAST_ITEM";
})(DefaultFocusState || (DefaultFocusState = {}));
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
var MDCMenuFoundation = (
  /** @class */
  function(_super) {
    __extends(MDCMenuFoundation2, _super);
    function MDCMenuFoundation2(adapter) {
      var _this = _super.call(this, __assign(__assign({}, MDCMenuFoundation2.defaultAdapter), adapter)) || this;
      _this.closeAnimationEndTimerId = 0;
      _this.defaultFocusState = DefaultFocusState.LIST_ROOT;
      _this.selectedIndex = -1;
      return _this;
    }
    Object.defineProperty(MDCMenuFoundation2, "cssClasses", {
      get: function() {
        return cssClasses$1;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCMenuFoundation2, "strings", {
      get: function() {
        return strings$1;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCMenuFoundation2, "numbers", {
      get: function() {
        return numbers$1;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCMenuFoundation2, "defaultAdapter", {
      /**
       * @see {@link MDCMenuAdapter} for typing information on parameters and return types.
       */
      get: function() {
        return {
          addClassToElementAtIndex: function() {
            return void 0;
          },
          removeClassFromElementAtIndex: function() {
            return void 0;
          },
          addAttributeToElementAtIndex: function() {
            return void 0;
          },
          removeAttributeFromElementAtIndex: function() {
            return void 0;
          },
          getAttributeFromElementAtIndex: function() {
            return null;
          },
          elementContainsClass: function() {
            return false;
          },
          closeSurface: function() {
            return void 0;
          },
          getElementIndex: function() {
            return -1;
          },
          notifySelected: function() {
            return void 0;
          },
          getMenuItemCount: function() {
            return 0;
          },
          focusItemAtIndex: function() {
            return void 0;
          },
          focusListRoot: function() {
            return void 0;
          },
          getSelectedSiblingOfItemAtIndex: function() {
            return -1;
          },
          isSelectableItemAtIndex: function() {
            return false;
          }
        };
      },
      enumerable: false,
      configurable: true
    });
    MDCMenuFoundation2.prototype.destroy = function() {
      if (this.closeAnimationEndTimerId) {
        clearTimeout(this.closeAnimationEndTimerId);
      }
      this.adapter.closeSurface();
    };
    MDCMenuFoundation2.prototype.handleKeydown = function(evt) {
      var key = evt.key, keyCode = evt.keyCode;
      var isTab = key === "Tab" || keyCode === 9;
      if (isTab) {
        this.adapter.closeSurface(
          /** skipRestoreFocus */
          true
        );
      }
    };
    MDCMenuFoundation2.prototype.handleItemAction = function(listItem) {
      var _this = this;
      var index = this.adapter.getElementIndex(listItem);
      if (index < 0) {
        return;
      }
      this.adapter.notifySelected({ index });
      var skipRestoreFocus = this.adapter.getAttributeFromElementAtIndex(index, strings$1.SKIP_RESTORE_FOCUS) === "true";
      this.adapter.closeSurface(skipRestoreFocus);
      this.closeAnimationEndTimerId = setTimeout(function() {
        var recomputedIndex = _this.adapter.getElementIndex(listItem);
        if (recomputedIndex >= 0 && _this.adapter.isSelectableItemAtIndex(recomputedIndex)) {
          _this.setSelectedIndex(recomputedIndex);
        }
      }, MDCMenuSurfaceFoundation.numbers.TRANSITION_CLOSE_DURATION);
    };
    MDCMenuFoundation2.prototype.handleMenuSurfaceOpened = function() {
      switch (this.defaultFocusState) {
        case DefaultFocusState.FIRST_ITEM:
          this.adapter.focusItemAtIndex(0);
          break;
        case DefaultFocusState.LAST_ITEM:
          this.adapter.focusItemAtIndex(this.adapter.getMenuItemCount() - 1);
          break;
        case DefaultFocusState.NONE:
          break;
        default:
          this.adapter.focusListRoot();
          break;
      }
    };
    MDCMenuFoundation2.prototype.setDefaultFocusState = function(focusState) {
      this.defaultFocusState = focusState;
    };
    MDCMenuFoundation2.prototype.getSelectedIndex = function() {
      return this.selectedIndex;
    };
    MDCMenuFoundation2.prototype.setSelectedIndex = function(index) {
      this.validatedIndex(index);
      if (!this.adapter.isSelectableItemAtIndex(index)) {
        throw new Error("MDCMenuFoundation: No selection group at specified index.");
      }
      var prevSelectedIndex = this.adapter.getSelectedSiblingOfItemAtIndex(index);
      if (prevSelectedIndex >= 0) {
        this.adapter.removeAttributeFromElementAtIndex(prevSelectedIndex, strings$1.ARIA_CHECKED_ATTR);
        this.adapter.removeClassFromElementAtIndex(prevSelectedIndex, cssClasses$1.MENU_SELECTED_LIST_ITEM);
      }
      this.adapter.addClassToElementAtIndex(index, cssClasses$1.MENU_SELECTED_LIST_ITEM);
      this.adapter.addAttributeToElementAtIndex(index, strings$1.ARIA_CHECKED_ATTR, "true");
      this.selectedIndex = index;
    };
    MDCMenuFoundation2.prototype.setEnabled = function(index, isEnabled) {
      this.validatedIndex(index);
      if (isEnabled) {
        this.adapter.removeClassFromElementAtIndex(index, cssClasses$4.LIST_ITEM_DISABLED_CLASS);
        this.adapter.addAttributeToElementAtIndex(index, strings$1.ARIA_DISABLED_ATTR, "false");
      } else {
        this.adapter.addClassToElementAtIndex(index, cssClasses$4.LIST_ITEM_DISABLED_CLASS);
        this.adapter.addAttributeToElementAtIndex(index, strings$1.ARIA_DISABLED_ATTR, "true");
      }
    };
    MDCMenuFoundation2.prototype.validatedIndex = function(index) {
      var menuSize = this.adapter.getMenuItemCount();
      var isIndexInRange = index >= 0 && index < menuSize;
      if (!isIndexInRange) {
        throw new Error("MDCMenuFoundation: No list item at specified index.");
      }
    };
    return MDCMenuFoundation2;
  }(MDCFoundation)
);
const { document: document_1$1 } = globals;
function create_fragment$3(ctx) {
  let t;
  let div;
  let div_class_value;
  let div_style_value;
  let useActions_action;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = (
    /*#slots*/
    ctx[34].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[33],
    null
  );
  let div_levels = [
    {
      class: div_class_value = classMap({
        [
          /*className*/
          ctx[1]
        ]: true,
        "mdc-menu-surface": true,
        "mdc-menu-surface--fixed": (
          /*fixed*/
          ctx[4]
        ),
        "mdc-menu-surface--open": (
          /*isStatic*/
          ctx[3]
        ),
        "smui-menu-surface--static": (
          /*isStatic*/
          ctx[3]
        ),
        "mdc-menu-surface--fullwidth": (
          /*fullWidth*/
          ctx[5]
        ),
        .../*internalClasses*/
        ctx[8]
      })
    },
    {
      style: div_style_value = Object.entries(
        /*internalStyles*/
        ctx[9]
      ).map(func).concat([
        /*style*/
        ctx[2]
      ]).join(" ")
    },
    /*$$restProps*/
    ctx[12]
  ];
  let div_data = {};
  for (let i = 0; i < div_levels.length; i += 1) {
    div_data = assign(div_data, div_levels[i]);
  }
  return {
    c() {
      t = space();
      div = element("div");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      t = claim_space(nodes);
      div = claim_element(nodes, "DIV", { class: true, style: true });
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
      insert_hydration(target, t, anchor);
      insert_hydration(target, div, anchor);
      if (default_slot) {
        default_slot.m(div, null);
      }
      ctx[35](div);
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            document_1$1.body,
            "click",
            /*handleBodyClick*/
            ctx[11],
            true
          ),
          action_destroyer(useActions_action = useActions.call(
            null,
            div,
            /*use*/
            ctx[0]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[10].call(null, div)
          ),
          listen(div, "keydown", function() {
            if (is_function(
              /*instance*/
              ctx[7] && /*instance*/
              ctx[7].handleKeydown.bind(
                /*instance*/
                ctx[7]
              )
            ))
              /*instance*/
              (ctx[7] && /*instance*/
              ctx[7].handleKeydown.bind(
                /*instance*/
                ctx[7]
              )).apply(this, arguments);
          })
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (default_slot) {
        if (default_slot.p && (!current || dirty[1] & /*$$scope*/
        4)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx,
            /*$$scope*/
            ctx[33],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx[33]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx[33],
              dirty,
              null
            ),
            null
          );
        }
      }
      set_attributes(div, div_data = get_spread_update(div_levels, [
        (!current || dirty[0] & /*className, fixed, isStatic, fullWidth, internalClasses*/
        314 && div_class_value !== (div_class_value = classMap({
          [
            /*className*/
            ctx[1]
          ]: true,
          "mdc-menu-surface": true,
          "mdc-menu-surface--fixed": (
            /*fixed*/
            ctx[4]
          ),
          "mdc-menu-surface--open": (
            /*isStatic*/
            ctx[3]
          ),
          "smui-menu-surface--static": (
            /*isStatic*/
            ctx[3]
          ),
          "mdc-menu-surface--fullwidth": (
            /*fullWidth*/
            ctx[5]
          ),
          .../*internalClasses*/
          ctx[8]
        }))) && { class: div_class_value },
        (!current || dirty[0] & /*internalStyles, style*/
        516 && div_style_value !== (div_style_value = Object.entries(
          /*internalStyles*/
          ctx[9]
        ).map(func).concat([
          /*style*/
          ctx[2]
        ]).join(" "))) && { style: div_style_value },
        dirty[0] & /*$$restProps*/
        4096 && /*$$restProps*/
        ctx[12]
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
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
        detach(div);
      }
      if (default_slot)
        default_slot.d(detaching);
      ctx[35](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
const func = ([name, value]) => `${name}: ${value};`;
function instance_1$2($$self, $$props, $$invalidate) {
  const omit_props_names = [
    "use",
    "class",
    "style",
    "static",
    "anchor",
    "fixed",
    "open",
    "managed",
    "fullWidth",
    "quickOpen",
    "anchorElement",
    "anchorCorner",
    "anchorMargin",
    "maxHeight",
    "horizontallyCenteredOnViewport",
    "openBottomBias",
    "neverRestoreFocus",
    "isOpen",
    "setOpen",
    "setAbsolutePosition",
    "setIsHoisted",
    "isFixed",
    "getElement"
  ];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  var _a, _b, _c;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { style = "" } = $$props;
  let { static: isStatic = false } = $$props;
  let { anchor = true } = $$props;
  let { fixed = false } = $$props;
  let { open = isStatic } = $$props;
  let { managed = false } = $$props;
  let { fullWidth = false } = $$props;
  let { quickOpen = false } = $$props;
  let { anchorElement = void 0 } = $$props;
  let { anchorCorner = void 0 } = $$props;
  let { anchorMargin = { top: 0, right: 0, bottom: 0, left: 0 } } = $$props;
  let { maxHeight = 0 } = $$props;
  let { horizontallyCenteredOnViewport = false } = $$props;
  let { openBottomBias = 0 } = $$props;
  let { neverRestoreFocus = false } = $$props;
  let element2;
  let instance2;
  let internalClasses = {};
  let internalStyles = {};
  let previousFocus = void 0;
  setContext("SMUI:list:role", "menu");
  setContext("SMUI:list:item:role", "menuitem");
  const iCorner = Corner;
  onMount(() => {
    $$invalidate(7, instance2 = new MDCMenuSurfaceFoundation({
      addClass,
      removeClass,
      hasClass,
      hasAnchor: () => !!anchorElement,
      notifyClose: () => {
        if (!managed) {
          $$invalidate(13, open = isStatic);
        }
        if (!open) {
          dispatch(element2, "SMUIMenuSurface:closed", void 0, void 0, true);
        }
      },
      notifyClosing: () => {
        if (!managed) {
          $$invalidate(13, open = isStatic);
        }
        if (!open) {
          dispatch(element2, "SMUIMenuSurface:closing", void 0, void 0, true);
        }
      },
      notifyOpen: () => {
        if (!managed) {
          $$invalidate(13, open = true);
        }
        if (open) {
          dispatch(element2, "SMUIMenuSurface:opened", void 0, void 0, true);
        }
      },
      notifyOpening: () => {
        if (!open) {
          dispatch(element2, "SMUIMenuSurface:opening", void 0, void 0, true);
        }
      },
      isElementInContainer: (el) => element2.contains(el),
      isRtl: () => getComputedStyle(element2).getPropertyValue("direction") === "rtl",
      setTransformOrigin: (origin) => {
        $$invalidate(9, internalStyles["transform-origin"] = origin, internalStyles);
      },
      isFocused: () => document.activeElement === element2,
      saveFocus: () => {
        var _a2;
        previousFocus = (_a2 = document.activeElement) !== null && _a2 !== void 0 ? _a2 : void 0;
      },
      restoreFocus: () => {
        if (!neverRestoreFocus && (!element2 || element2.contains(document.activeElement)) && previousFocus && document.contains(previousFocus) && "focus" in previousFocus) {
          previousFocus.focus();
        }
      },
      getInnerDimensions: () => {
        return {
          width: element2.offsetWidth,
          height: element2.offsetHeight
        };
      },
      getAnchorDimensions: () => anchorElement ? anchorElement.getBoundingClientRect() : null,
      getWindowDimensions: () => {
        return {
          width: window.innerWidth,
          height: window.innerHeight
        };
      },
      getBodyDimensions: () => {
        return {
          width: document.body.clientWidth,
          height: document.body.clientHeight
        };
      },
      getWindowScroll: () => {
        return {
          x: window.pageXOffset,
          y: window.pageYOffset
        };
      },
      setPosition: (position) => {
        $$invalidate(9, internalStyles.left = "left" in position ? `${position.left}px` : "", internalStyles);
        $$invalidate(9, internalStyles.right = "right" in position ? `${position.right}px` : "", internalStyles);
        $$invalidate(9, internalStyles.top = "top" in position ? `${position.top}px` : "", internalStyles);
        $$invalidate(9, internalStyles.bottom = "bottom" in position ? `${position.bottom}px` : "", internalStyles);
      },
      setMaxHeight: (height) => {
        $$invalidate(9, internalStyles["max-height"] = height, internalStyles);
      }
    }));
    const accessor = {
      get open() {
        return open;
      },
      set open(value) {
        $$invalidate(13, open = value);
      },
      closeProgrammatic
    };
    dispatch(element2, "SMUIMenuSurface:mount", accessor);
    instance2.init();
    return () => {
      var _a2;
      const isHoisted = instance2.isHoistedElement;
      instance2.destroy();
      if (isHoisted) {
        (_a2 = element2.parentNode) === null || _a2 === void 0 ? void 0 : _a2.removeChild(element2);
      }
    };
  });
  onDestroy(() => {
    var _a2;
    if (anchor) {
      element2 && ((_a2 = element2.parentElement) === null || _a2 === void 0 ? void 0 : _a2.classList.remove("mdc-menu-surface--anchor"));
    }
  });
  function hasClass(className2) {
    return className2 in internalClasses ? internalClasses[className2] : getElement().classList.contains(className2);
  }
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
  function closeProgrammatic(skipRestoreFocus) {
    instance2.close(skipRestoreFocus);
    $$invalidate(13, open = false);
  }
  function handleBodyClick(event) {
    if (instance2 && open && !managed) {
      instance2.handleBodyClick(event);
    }
  }
  function isOpen() {
    return open;
  }
  function setOpen(value) {
    $$invalidate(13, open = value);
  }
  function setAbsolutePosition(x, y) {
    return instance2.setAbsolutePosition(x, y);
  }
  function setIsHoisted(isHoisted) {
    return instance2.setIsHoisted(isHoisted);
  }
  function isFixed() {
    return instance2.isFixed();
  }
  function getElement() {
    return element2;
  }
  function div_binding($$value) {
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
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("static" in $$new_props)
      $$invalidate(3, isStatic = $$new_props.static);
    if ("anchor" in $$new_props)
      $$invalidate(15, anchor = $$new_props.anchor);
    if ("fixed" in $$new_props)
      $$invalidate(4, fixed = $$new_props.fixed);
    if ("open" in $$new_props)
      $$invalidate(13, open = $$new_props.open);
    if ("managed" in $$new_props)
      $$invalidate(16, managed = $$new_props.managed);
    if ("fullWidth" in $$new_props)
      $$invalidate(5, fullWidth = $$new_props.fullWidth);
    if ("quickOpen" in $$new_props)
      $$invalidate(17, quickOpen = $$new_props.quickOpen);
    if ("anchorElement" in $$new_props)
      $$invalidate(14, anchorElement = $$new_props.anchorElement);
    if ("anchorCorner" in $$new_props)
      $$invalidate(18, anchorCorner = $$new_props.anchorCorner);
    if ("anchorMargin" in $$new_props)
      $$invalidate(19, anchorMargin = $$new_props.anchorMargin);
    if ("maxHeight" in $$new_props)
      $$invalidate(20, maxHeight = $$new_props.maxHeight);
    if ("horizontallyCenteredOnViewport" in $$new_props)
      $$invalidate(21, horizontallyCenteredOnViewport = $$new_props.horizontallyCenteredOnViewport);
    if ("openBottomBias" in $$new_props)
      $$invalidate(22, openBottomBias = $$new_props.openBottomBias);
    if ("neverRestoreFocus" in $$new_props)
      $$invalidate(23, neverRestoreFocus = $$new_props.neverRestoreFocus);
    if ("$$scope" in $$new_props)
      $$invalidate(33, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & /*element, anchor, _a*/
    1073774656 | $$self.$$.dirty[1] & /*_b, _c*/
    3) {
      if (element2 && anchor && !($$invalidate(30, _a = element2.parentElement) === null || _a === void 0 ? void 0 : _a.classList.contains("mdc-menu-surface--anchor"))) {
        $$invalidate(31, _b = element2.parentElement) === null || _b === void 0 ? void 0 : _b.classList.add("mdc-menu-surface--anchor");
        $$invalidate(14, anchorElement = $$invalidate(32, _c = element2.parentElement) !== null && _c !== void 0 ? _c : void 0);
      }
    }
    if ($$self.$$.dirty[0] & /*instance, open*/
    8320) {
      if (instance2 && instance2.isOpen() !== open) {
        if (open) {
          instance2.open();
        } else {
          instance2.close();
        }
      }
    }
    if ($$self.$$.dirty[0] & /*instance, quickOpen*/
    131200) {
      if (instance2) {
        instance2.setQuickOpen(quickOpen);
      }
    }
    if ($$self.$$.dirty[0] & /*instance, fixed*/
    144) {
      if (instance2) {
        instance2.setFixedPosition(fixed);
      }
    }
    if ($$self.$$.dirty[0] & /*instance, maxHeight*/
    1048704) {
      if (instance2) {
        instance2.setMaxHeight(maxHeight);
      }
    }
    if ($$self.$$.dirty[0] & /*instance, horizontallyCenteredOnViewport*/
    2097280) {
      if (instance2) {
        instance2.setIsHorizontallyCenteredOnViewport(horizontallyCenteredOnViewport);
      }
    }
    if ($$self.$$.dirty[0] & /*instance, anchorCorner*/
    262272) {
      if (instance2 && anchorCorner != null) {
        if (typeof anchorCorner === "string") {
          instance2.setAnchorCorner(iCorner[anchorCorner]);
        } else {
          instance2.setAnchorCorner(anchorCorner);
        }
      }
    }
    if ($$self.$$.dirty[0] & /*instance, anchorMargin*/
    524416) {
      if (instance2) {
        instance2.setAnchorMargin(anchorMargin);
      }
    }
    if ($$self.$$.dirty[0] & /*instance, openBottomBias*/
    4194432) {
      if (instance2) {
        instance2.setOpenBottomBias(openBottomBias);
      }
    }
  };
  return [
    use,
    className,
    style,
    isStatic,
    fixed,
    fullWidth,
    element2,
    instance2,
    internalClasses,
    internalStyles,
    forwardEvents,
    handleBodyClick,
    $$restProps,
    open,
    anchorElement,
    anchor,
    managed,
    quickOpen,
    anchorCorner,
    anchorMargin,
    maxHeight,
    horizontallyCenteredOnViewport,
    openBottomBias,
    neverRestoreFocus,
    isOpen,
    setOpen,
    setAbsolutePosition,
    setIsHoisted,
    isFixed,
    getElement,
    _a,
    _b,
    _c,
    $$scope,
    slots,
    div_binding
  ];
}
class MenuSurface extends SvelteComponent {
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
        style: 2,
        static: 3,
        anchor: 15,
        fixed: 4,
        open: 13,
        managed: 16,
        fullWidth: 5,
        quickOpen: 17,
        anchorElement: 14,
        anchorCorner: 18,
        anchorMargin: 19,
        maxHeight: 20,
        horizontallyCenteredOnViewport: 21,
        openBottomBias: 22,
        neverRestoreFocus: 23,
        isOpen: 24,
        setOpen: 25,
        setAbsolutePosition: 26,
        setIsHoisted: 27,
        isFixed: 28,
        getElement: 29
      },
      null,
      [-1, -1]
    );
  }
  get isOpen() {
    return this.$$.ctx[24];
  }
  get setOpen() {
    return this.$$.ctx[25];
  }
  get setAbsolutePosition() {
    return this.$$.ctx[26];
  }
  get setIsHoisted() {
    return this.$$.ctx[27];
  }
  get isFixed() {
    return this.$$.ctx[28];
  }
  get getElement() {
    return this.$$.ctx[29];
  }
}
function create_default_slot(ctx) {
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[17].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[22],
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
  let menusurface;
  let updating_open;
  let current;
  const menusurface_spread_levels = [
    { use: (
      /*usePass*/
      ctx[5]
    ) },
    {
      class: classMap({
        [
          /*className*/
          ctx[1]
        ]: true,
        "mdc-menu": true
      })
    },
    /*$$restProps*/
    ctx[9]
  ];
  function menusurface_open_binding(value) {
    ctx[19](value);
  }
  let menusurface_props = {
    $$slots: { default: [create_default_slot] },
    $$scope: { ctx }
  };
  for (let i = 0; i < menusurface_spread_levels.length; i += 1) {
    menusurface_props = assign(menusurface_props, menusurface_spread_levels[i]);
  }
  if (
    /*open*/
    ctx[0] !== void 0
  ) {
    menusurface_props.open = /*open*/
    ctx[0];
  }
  menusurface = new MenuSurface({ props: menusurface_props });
  ctx[18](menusurface);
  binding_callbacks.push(() => bind(menusurface, "open", menusurface_open_binding));
  menusurface.$on(
    "SMUIMenuSurface:mount",
    /*handleMenuSurfaceAccessor*/
    ctx[7]
  );
  menusurface.$on(
    "SMUIList:mount",
    /*handleListAccessor*/
    ctx[8]
  );
  menusurface.$on(
    "SMUIMenuSurface:opened",
    /*SMUIMenuSurface_opened_handler*/
    ctx[20]
  );
  menusurface.$on(
    "keydown",
    /*handleKeydown*/
    ctx[6]
  );
  menusurface.$on(
    "SMUIList:action",
    /*SMUIList_action_handler*/
    ctx[21]
  );
  return {
    c() {
      create_component(menusurface.$$.fragment);
    },
    l(nodes) {
      claim_component(menusurface.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(menusurface, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const menusurface_changes = dirty & /*usePass, classMap, className, $$restProps*/
      546 ? get_spread_update(menusurface_spread_levels, [
        dirty & /*usePass*/
        32 && { use: (
          /*usePass*/
          ctx2[5]
        ) },
        dirty & /*classMap, className*/
        2 && {
          class: classMap({
            [
              /*className*/
              ctx2[1]
            ]: true,
            "mdc-menu": true
          })
        },
        dirty & /*$$restProps*/
        512 && get_spread_object(
          /*$$restProps*/
          ctx2[9]
        )
      ]) : {};
      if (dirty & /*$$scope*/
      4194304) {
        menusurface_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_open && dirty & /*open*/
      1) {
        updating_open = true;
        menusurface_changes.open = /*open*/
        ctx2[0];
        add_flush_callback(() => updating_open = false);
      }
      menusurface.$set(menusurface_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(menusurface.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(menusurface.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      ctx[18](null);
      destroy_component(menusurface, detaching);
    }
  };
}
function instance_1$1($$self, $$props, $$invalidate) {
  let usePass;
  const omit_props_names = [
    "use",
    "class",
    "open",
    "isOpen",
    "setOpen",
    "setDefaultFocusState",
    "getSelectedIndex",
    "getMenuSurface",
    "getElement"
  ];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  const { closest } = ponyfill;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { open = false } = $$props;
  let element2;
  let instance2;
  let menuSurfaceAccessor;
  let listAccessor;
  onMount(() => {
    $$invalidate(3, instance2 = new MDCMenuFoundation({
      addClassToElementAtIndex: (index, className2) => {
        listAccessor.addClassForElementIndex(index, className2);
      },
      removeClassFromElementAtIndex: (index, className2) => {
        listAccessor.removeClassForElementIndex(index, className2);
      },
      addAttributeToElementAtIndex: (index, attr2, value) => {
        listAccessor.setAttributeForElementIndex(index, attr2, value);
      },
      removeAttributeFromElementAtIndex: (index, attr2) => {
        listAccessor.removeAttributeForElementIndex(index, attr2);
      },
      getAttributeFromElementAtIndex: (index, attr2) => listAccessor.getAttributeFromElementIndex(index, attr2),
      elementContainsClass: (element3, className2) => element3.classList.contains(className2),
      closeSurface: (skipRestoreFocus) => {
        menuSurfaceAccessor.closeProgrammatic(skipRestoreFocus);
        dispatch(getElement(), "SMUIMenu:closedProgrammatically");
      },
      getElementIndex: (element3) => listAccessor.getOrderedList().map((accessor) => accessor.element).indexOf(element3),
      notifySelected: (evtData) => dispatch(
        getElement(),
        "SMUIMenu:selected",
        {
          index: evtData.index,
          item: listAccessor.getOrderedList()[evtData.index].element
        },
        void 0,
        true
      ),
      getMenuItemCount: () => listAccessor.items.length,
      focusItemAtIndex: (index) => listAccessor.focusItemAtIndex(index),
      focusListRoot: () => "focus" in listAccessor.element && listAccessor.element.focus(),
      isSelectableItemAtIndex: (index) => !!closest(listAccessor.getOrderedList()[index].element, `.${cssClasses$1.MENU_SELECTION_GROUP}`),
      getSelectedSiblingOfItemAtIndex: (index) => {
        const orderedList = listAccessor.getOrderedList();
        const selectionGroupEl = closest(orderedList[index].element, `.${cssClasses$1.MENU_SELECTION_GROUP}`);
        const selectedItemEl = selectionGroupEl === null || selectionGroupEl === void 0 ? void 0 : selectionGroupEl.querySelector(`.${cssClasses$1.MENU_SELECTED_LIST_ITEM}`);
        return selectedItemEl ? orderedList.map((item) => item.element).indexOf(selectedItemEl) : -1;
      }
    }));
    dispatch(getElement(), "SMUIMenu:mount", instance2);
    instance2.init();
    return () => {
      instance2.destroy();
    };
  });
  function handleKeydown(event) {
    instance2 && instance2.handleKeydown(event);
  }
  function handleMenuSurfaceAccessor(event) {
    if (!menuSurfaceAccessor) {
      menuSurfaceAccessor = event.detail;
    }
  }
  function handleListAccessor(event) {
    if (!listAccessor) {
      $$invalidate(4, listAccessor = event.detail);
    }
  }
  function isOpen() {
    return open;
  }
  function setOpen(value) {
    $$invalidate(0, open = value);
  }
  function setDefaultFocusState(focusState) {
    instance2.setDefaultFocusState(focusState);
  }
  function getSelectedIndex() {
    return instance2.getSelectedIndex();
  }
  function getMenuSurface() {
    return element2;
  }
  function getElement() {
    return element2.getElement();
  }
  function menusurface_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(2, element2);
    });
  }
  function menusurface_open_binding(value) {
    open = value;
    $$invalidate(0, open);
  }
  const SMUIMenuSurface_opened_handler = () => instance2 && instance2.handleMenuSurfaceOpened();
  const SMUIList_action_handler = (event) => instance2 && instance2.handleItemAction(listAccessor.getOrderedList()[event.detail.index].element);
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(9, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("use" in $$new_props)
      $$invalidate(10, use = $$new_props.use);
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("open" in $$new_props)
      $$invalidate(0, open = $$new_props.open);
    if ("$$scope" in $$new_props)
      $$invalidate(22, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*use*/
    1024) {
      $$invalidate(5, usePass = [forwardEvents, ...use]);
    }
  };
  return [
    open,
    className,
    element2,
    instance2,
    listAccessor,
    usePass,
    handleKeydown,
    handleMenuSurfaceAccessor,
    handleListAccessor,
    $$restProps,
    use,
    isOpen,
    setOpen,
    setDefaultFocusState,
    getSelectedIndex,
    getMenuSurface,
    getElement,
    slots,
    menusurface_binding,
    menusurface_open_binding,
    SMUIMenuSurface_opened_handler,
    SMUIList_action_handler,
    $$scope
  ];
}
class Menu extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance_1$1, create_fragment$2, safe_not_equal, {
      use: 10,
      class: 1,
      open: 0,
      isOpen: 11,
      setOpen: 12,
      setDefaultFocusState: 13,
      getSelectedIndex: 14,
      getMenuSurface: 15,
      getElement: 16
    });
  }
  get isOpen() {
    return this.$$.ctx[11];
  }
  get setOpen() {
    return this.$$.ctx[12];
  }
  get setDefaultFocusState() {
    return this.$$.ctx[13];
  }
  get getSelectedIndex() {
    return this.$$.ctx[14];
  }
  get getMenuSurface() {
    return this.$$.ctx[15];
  }
  get getElement() {
    return this.$$.ctx[16];
  }
}
function create_fragment$1(ctx) {
  let span;
  let span_class_value;
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
  let span_levels = [
    {
      class: span_class_value = classMap({
        [
          /*className*/
          ctx[1]
        ]: true,
        "mdc-deprecated-list-item__graphic": true,
        "mdc-menu__selection-group-icon": (
          /*menuSelectionGroup*/
          ctx[4]
        )
      })
    },
    /*$$restProps*/
    ctx[5]
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
      span = claim_element(nodes, "SPAN", { class: true });
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
      ctx[9](span);
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(useActions_action = useActions.call(
            null,
            span,
            /*use*/
            ctx[0]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[3].call(null, span)
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
      set_attributes(span, span_data = get_spread_update(span_levels, [
        (!current || dirty & /*className*/
        2 && span_class_value !== (span_class_value = classMap({
          [
            /*className*/
            ctx2[1]
          ]: true,
          "mdc-deprecated-list-item__graphic": true,
          "mdc-menu__selection-group-icon": (
            /*menuSelectionGroup*/
            ctx2[4]
          )
        }))) && { class: span_class_value },
        dirty & /*$$restProps*/
        32 && /*$$restProps*/
        ctx2[5]
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
        detach(span);
      }
      if (default_slot)
        default_slot.d(detaching);
      ctx[9](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  const omit_props_names = ["use", "class", "getElement"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let element2;
  let menuSelectionGroup = getContext("SMUI:list:graphic:menu-selection-group");
  function getElement() {
    return element2;
  }
  function span_binding($$value) {
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
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("$$scope" in $$new_props)
      $$invalidate(7, $$scope = $$new_props.$$scope);
  };
  return [
    use,
    className,
    element2,
    forwardEvents,
    menuSelectionGroup,
    $$restProps,
    getElement,
    $$scope,
    slots,
    span_binding
  ];
}
class Graphic extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment$1, safe_not_equal, { use: 0, class: 1, getElement: 6 });
  }
  get getElement() {
    return this.$$.ctx[6];
  }
}
classAdderBuilder({
  class: "mdc-menu__selection-group-icon",
  component: Graphic
});
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
function isScrollable(el) {
  return el ? el.scrollHeight > el.offsetHeight : false;
}
function isScrollAtTop(el) {
  return el ? el.scrollTop === 0 : false;
}
function isScrollAtBottom(el) {
  return el ? Math.ceil(el.scrollHeight - el.scrollTop) === el.clientHeight : false;
}
function areTopsMisaligned(els) {
  var tops = /* @__PURE__ */ new Set();
  [].forEach.call(els, function(el) {
    return tops.add(el.offsetTop);
  });
  return tops.size > 1;
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
var AnimationFrame = (
  /** @class */
  function() {
    function AnimationFrame2() {
      this.rafIDs = /* @__PURE__ */ new Map();
    }
    AnimationFrame2.prototype.request = function(key, callback) {
      var _this = this;
      this.cancel(key);
      var frameID = requestAnimationFrame(function(frame) {
        _this.rafIDs.delete(key);
        callback(frame);
      });
      this.rafIDs.set(key, frameID);
    };
    AnimationFrame2.prototype.cancel = function(key) {
      var rafID = this.rafIDs.get(key);
      if (rafID) {
        cancelAnimationFrame(rafID);
        this.rafIDs.delete(key);
      }
    };
    AnimationFrame2.prototype.cancelAll = function() {
      var _this = this;
      this.rafIDs.forEach(function(_, key) {
        _this.cancel(key);
      });
    };
    AnimationFrame2.prototype.getQueue = function() {
      var queue = [];
      this.rafIDs.forEach(function(_, key) {
        queue.push(key);
      });
      return queue;
    };
    return AnimationFrame2;
  }()
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
var cssClasses = {
  CLOSING: "mdc-dialog--closing",
  OPEN: "mdc-dialog--open",
  OPENING: "mdc-dialog--opening",
  SCROLLABLE: "mdc-dialog--scrollable",
  SCROLL_LOCK: "mdc-dialog-scroll-lock",
  STACKED: "mdc-dialog--stacked",
  FULLSCREEN: "mdc-dialog--fullscreen",
  // Class for showing a scroll divider on full-screen dialog header element.
  // Should only be displayed on scrollable content, when the dialog content is
  // scrolled "underneath" the header.
  SCROLL_DIVIDER_HEADER: "mdc-dialog-scroll-divider-header",
  // Class for showing a scroll divider on a full-screen dialog footer element.
  // Should only be displayed on scrolalble content, when the dialog content is
  // obscured "underneath" the footer.
  SCROLL_DIVIDER_FOOTER: "mdc-dialog-scroll-divider-footer",
  // The "surface scrim" is a scrim covering only the surface of a dialog. This
  // is used in situations where a confirmation dialog is shown over an already
  // opened full-screen dialog. On larger screen-sizes, the full-screen dialog
  // is sized as a modal and so in these situations we display a "surface scrim"
  // to prevent a "double scrim" (where the scrim from the secondary
  // confirmation dialog would overlap with the scrim from the full-screen
  // dialog).
  SURFACE_SCRIM_SHOWN: "mdc-dialog__surface-scrim--shown",
  // "Showing" animating class for the surface-scrim.
  SURFACE_SCRIM_SHOWING: "mdc-dialog__surface-scrim--showing",
  // "Hiding" animating class for the surface-scrim.
  SURFACE_SCRIM_HIDING: "mdc-dialog__surface-scrim--hiding",
  // Class to hide a dialog's scrim (used in conjunction with a surface-scrim).
  // Note that we only hide the original scrim rather than removing it entirely
  // to prevent interactions with the content behind this scrim, and to capture
  // scrim clicks.
  SCRIM_HIDDEN: "mdc-dialog__scrim--hidden"
};
var strings = {
  ACTION_ATTRIBUTE: "data-mdc-dialog-action",
  BUTTON_DEFAULT_ATTRIBUTE: "data-mdc-dialog-button-default",
  BUTTON_SELECTOR: ".mdc-dialog__button",
  CLOSED_EVENT: "MDCDialog:closed",
  CLOSE_ACTION: "close",
  CLOSING_EVENT: "MDCDialog:closing",
  CONTAINER_SELECTOR: ".mdc-dialog__container",
  CONTENT_SELECTOR: ".mdc-dialog__content",
  DESTROY_ACTION: "destroy",
  INITIAL_FOCUS_ATTRIBUTE: "data-mdc-dialog-initial-focus",
  OPENED_EVENT: "MDCDialog:opened",
  OPENING_EVENT: "MDCDialog:opening",
  SCRIM_SELECTOR: ".mdc-dialog__scrim",
  SUPPRESS_DEFAULT_PRESS_SELECTOR: [
    "textarea",
    ".mdc-menu .mdc-list-item",
    ".mdc-menu .mdc-deprecated-list-item"
  ].join(", "),
  SURFACE_SELECTOR: ".mdc-dialog__surface"
};
var numbers = {
  DIALOG_ANIMATION_CLOSE_TIME_MS: 75,
  DIALOG_ANIMATION_OPEN_TIME_MS: 150
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
var AnimationKeys;
(function(AnimationKeys2) {
  AnimationKeys2["POLL_SCROLL_POS"] = "poll_scroll_position";
  AnimationKeys2["POLL_LAYOUT_CHANGE"] = "poll_layout_change";
})(AnimationKeys || (AnimationKeys = {}));
var MDCDialogFoundation = (
  /** @class */
  function(_super) {
    __extends(MDCDialogFoundation2, _super);
    function MDCDialogFoundation2(adapter) {
      var _this = _super.call(this, __assign(__assign({}, MDCDialogFoundation2.defaultAdapter), adapter)) || this;
      _this.dialogOpen = false;
      _this.isFullscreen = false;
      _this.animationFrame = 0;
      _this.animationTimer = 0;
      _this.escapeKeyAction = strings.CLOSE_ACTION;
      _this.scrimClickAction = strings.CLOSE_ACTION;
      _this.autoStackButtons = true;
      _this.areButtonsStacked = false;
      _this.suppressDefaultPressSelector = strings.SUPPRESS_DEFAULT_PRESS_SELECTOR;
      _this.animFrame = new AnimationFrame();
      _this.contentScrollHandler = function() {
        _this.handleScrollEvent();
      };
      _this.windowResizeHandler = function() {
        _this.layout();
      };
      _this.windowOrientationChangeHandler = function() {
        _this.layout();
      };
      return _this;
    }
    Object.defineProperty(MDCDialogFoundation2, "cssClasses", {
      get: function() {
        return cssClasses;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCDialogFoundation2, "strings", {
      get: function() {
        return strings;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCDialogFoundation2, "numbers", {
      get: function() {
        return numbers;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCDialogFoundation2, "defaultAdapter", {
      get: function() {
        return {
          addBodyClass: function() {
            return void 0;
          },
          addClass: function() {
            return void 0;
          },
          areButtonsStacked: function() {
            return false;
          },
          clickDefaultButton: function() {
            return void 0;
          },
          eventTargetMatches: function() {
            return false;
          },
          getActionFromEvent: function() {
            return "";
          },
          getInitialFocusEl: function() {
            return null;
          },
          hasClass: function() {
            return false;
          },
          isContentScrollable: function() {
            return false;
          },
          notifyClosed: function() {
            return void 0;
          },
          notifyClosing: function() {
            return void 0;
          },
          notifyOpened: function() {
            return void 0;
          },
          notifyOpening: function() {
            return void 0;
          },
          releaseFocus: function() {
            return void 0;
          },
          removeBodyClass: function() {
            return void 0;
          },
          removeClass: function() {
            return void 0;
          },
          reverseButtons: function() {
            return void 0;
          },
          trapFocus: function() {
            return void 0;
          },
          registerContentEventHandler: function() {
            return void 0;
          },
          deregisterContentEventHandler: function() {
            return void 0;
          },
          isScrollableContentAtTop: function() {
            return false;
          },
          isScrollableContentAtBottom: function() {
            return false;
          },
          registerWindowEventHandler: function() {
            return void 0;
          },
          deregisterWindowEventHandler: function() {
            return void 0;
          }
        };
      },
      enumerable: false,
      configurable: true
    });
    MDCDialogFoundation2.prototype.init = function() {
      if (this.adapter.hasClass(cssClasses.STACKED)) {
        this.setAutoStackButtons(false);
      }
      this.isFullscreen = this.adapter.hasClass(cssClasses.FULLSCREEN);
    };
    MDCDialogFoundation2.prototype.destroy = function() {
      if (this.animationTimer) {
        clearTimeout(this.animationTimer);
        this.handleAnimationTimerEnd();
      }
      if (this.isFullscreen) {
        this.adapter.deregisterContentEventHandler("scroll", this.contentScrollHandler);
      }
      this.animFrame.cancelAll();
      this.adapter.deregisterWindowEventHandler("resize", this.windowResizeHandler);
      this.adapter.deregisterWindowEventHandler("orientationchange", this.windowOrientationChangeHandler);
    };
    MDCDialogFoundation2.prototype.open = function(dialogOptions) {
      var _this = this;
      this.dialogOpen = true;
      this.adapter.notifyOpening();
      this.adapter.addClass(cssClasses.OPENING);
      if (this.isFullscreen) {
        this.adapter.registerContentEventHandler("scroll", this.contentScrollHandler);
      }
      if (dialogOptions && dialogOptions.isAboveFullscreenDialog) {
        this.adapter.addClass(cssClasses.SCRIM_HIDDEN);
      }
      this.adapter.registerWindowEventHandler("resize", this.windowResizeHandler);
      this.adapter.registerWindowEventHandler("orientationchange", this.windowOrientationChangeHandler);
      this.runNextAnimationFrame(function() {
        _this.adapter.addClass(cssClasses.OPEN);
        _this.adapter.addBodyClass(cssClasses.SCROLL_LOCK);
        _this.layout();
        _this.animationTimer = setTimeout(function() {
          _this.handleAnimationTimerEnd();
          _this.adapter.trapFocus(_this.adapter.getInitialFocusEl());
          _this.adapter.notifyOpened();
        }, numbers.DIALOG_ANIMATION_OPEN_TIME_MS);
      });
    };
    MDCDialogFoundation2.prototype.close = function(action) {
      var _this = this;
      if (action === void 0) {
        action = "";
      }
      if (!this.dialogOpen) {
        return;
      }
      this.dialogOpen = false;
      this.adapter.notifyClosing(action);
      this.adapter.addClass(cssClasses.CLOSING);
      this.adapter.removeClass(cssClasses.OPEN);
      this.adapter.removeBodyClass(cssClasses.SCROLL_LOCK);
      if (this.isFullscreen) {
        this.adapter.deregisterContentEventHandler("scroll", this.contentScrollHandler);
      }
      this.adapter.deregisterWindowEventHandler("resize", this.windowResizeHandler);
      this.adapter.deregisterWindowEventHandler("orientationchange", this.windowOrientationChangeHandler);
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = 0;
      clearTimeout(this.animationTimer);
      this.animationTimer = setTimeout(function() {
        _this.adapter.releaseFocus();
        _this.handleAnimationTimerEnd();
        _this.adapter.notifyClosed(action);
      }, numbers.DIALOG_ANIMATION_CLOSE_TIME_MS);
    };
    MDCDialogFoundation2.prototype.showSurfaceScrim = function() {
      var _this = this;
      this.adapter.addClass(cssClasses.SURFACE_SCRIM_SHOWING);
      this.runNextAnimationFrame(function() {
        _this.adapter.addClass(cssClasses.SURFACE_SCRIM_SHOWN);
      });
    };
    MDCDialogFoundation2.prototype.hideSurfaceScrim = function() {
      this.adapter.removeClass(cssClasses.SURFACE_SCRIM_SHOWN);
      this.adapter.addClass(cssClasses.SURFACE_SCRIM_HIDING);
    };
    MDCDialogFoundation2.prototype.handleSurfaceScrimTransitionEnd = function() {
      this.adapter.removeClass(cssClasses.SURFACE_SCRIM_HIDING);
      this.adapter.removeClass(cssClasses.SURFACE_SCRIM_SHOWING);
    };
    MDCDialogFoundation2.prototype.isOpen = function() {
      return this.dialogOpen;
    };
    MDCDialogFoundation2.prototype.getEscapeKeyAction = function() {
      return this.escapeKeyAction;
    };
    MDCDialogFoundation2.prototype.setEscapeKeyAction = function(action) {
      this.escapeKeyAction = action;
    };
    MDCDialogFoundation2.prototype.getScrimClickAction = function() {
      return this.scrimClickAction;
    };
    MDCDialogFoundation2.prototype.setScrimClickAction = function(action) {
      this.scrimClickAction = action;
    };
    MDCDialogFoundation2.prototype.getAutoStackButtons = function() {
      return this.autoStackButtons;
    };
    MDCDialogFoundation2.prototype.setAutoStackButtons = function(autoStack) {
      this.autoStackButtons = autoStack;
    };
    MDCDialogFoundation2.prototype.getSuppressDefaultPressSelector = function() {
      return this.suppressDefaultPressSelector;
    };
    MDCDialogFoundation2.prototype.setSuppressDefaultPressSelector = function(selector) {
      this.suppressDefaultPressSelector = selector;
    };
    MDCDialogFoundation2.prototype.layout = function() {
      var _this = this;
      this.animFrame.request(AnimationKeys.POLL_LAYOUT_CHANGE, function() {
        _this.layoutInternal();
      });
    };
    MDCDialogFoundation2.prototype.handleClick = function(evt) {
      var isScrim = this.adapter.eventTargetMatches(evt.target, strings.SCRIM_SELECTOR);
      if (isScrim && this.scrimClickAction !== "") {
        this.close(this.scrimClickAction);
      } else {
        var action = this.adapter.getActionFromEvent(evt);
        if (action) {
          this.close(action);
        }
      }
    };
    MDCDialogFoundation2.prototype.handleKeydown = function(evt) {
      var isEnter = evt.key === "Enter" || evt.keyCode === 13;
      if (!isEnter) {
        return;
      }
      var action = this.adapter.getActionFromEvent(evt);
      if (action) {
        return;
      }
      var target = evt.composedPath ? evt.composedPath()[0] : evt.target;
      var isDefault = this.suppressDefaultPressSelector ? !this.adapter.eventTargetMatches(target, this.suppressDefaultPressSelector) : true;
      if (isEnter && isDefault) {
        this.adapter.clickDefaultButton();
      }
    };
    MDCDialogFoundation2.prototype.handleDocumentKeydown = function(evt) {
      var isEscape = evt.key === "Escape" || evt.keyCode === 27;
      if (isEscape && this.escapeKeyAction !== "") {
        this.close(this.escapeKeyAction);
      }
    };
    MDCDialogFoundation2.prototype.handleScrollEvent = function() {
      var _this = this;
      this.animFrame.request(AnimationKeys.POLL_SCROLL_POS, function() {
        _this.toggleScrollDividerHeader();
        _this.toggleScrollDividerFooter();
      });
    };
    MDCDialogFoundation2.prototype.layoutInternal = function() {
      if (this.autoStackButtons) {
        this.detectStackedButtons();
      }
      this.toggleScrollableClasses();
    };
    MDCDialogFoundation2.prototype.handleAnimationTimerEnd = function() {
      this.animationTimer = 0;
      this.adapter.removeClass(cssClasses.OPENING);
      this.adapter.removeClass(cssClasses.CLOSING);
    };
    MDCDialogFoundation2.prototype.runNextAnimationFrame = function(callback) {
      var _this = this;
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = requestAnimationFrame(function() {
        _this.animationFrame = 0;
        clearTimeout(_this.animationTimer);
        _this.animationTimer = setTimeout(callback, 0);
      });
    };
    MDCDialogFoundation2.prototype.detectStackedButtons = function() {
      this.adapter.removeClass(cssClasses.STACKED);
      var areButtonsStacked = this.adapter.areButtonsStacked();
      if (areButtonsStacked) {
        this.adapter.addClass(cssClasses.STACKED);
      }
      if (areButtonsStacked !== this.areButtonsStacked) {
        this.adapter.reverseButtons();
        this.areButtonsStacked = areButtonsStacked;
      }
    };
    MDCDialogFoundation2.prototype.toggleScrollableClasses = function() {
      this.adapter.removeClass(cssClasses.SCROLLABLE);
      if (this.adapter.isContentScrollable()) {
        this.adapter.addClass(cssClasses.SCROLLABLE);
        if (this.isFullscreen) {
          this.toggleScrollDividerHeader();
          this.toggleScrollDividerFooter();
        }
      }
    };
    MDCDialogFoundation2.prototype.toggleScrollDividerHeader = function() {
      if (!this.adapter.isScrollableContentAtTop()) {
        this.adapter.addClass(cssClasses.SCROLL_DIVIDER_HEADER);
      } else if (this.adapter.hasClass(cssClasses.SCROLL_DIVIDER_HEADER)) {
        this.adapter.removeClass(cssClasses.SCROLL_DIVIDER_HEADER);
      }
    };
    MDCDialogFoundation2.prototype.toggleScrollDividerFooter = function() {
      if (!this.adapter.isScrollableContentAtBottom()) {
        this.adapter.addClass(cssClasses.SCROLL_DIVIDER_FOOTER);
      } else if (this.adapter.hasClass(cssClasses.SCROLL_DIVIDER_FOOTER)) {
        this.adapter.removeClass(cssClasses.SCROLL_DIVIDER_FOOTER);
      }
    };
    return MDCDialogFoundation2;
  }(MDCFoundation)
);
const { document: document_1, window: window_1 } = globals;
const get_over_slot_changes = (dirty) => ({});
const get_over_slot_context = (ctx) => ({});
function create_if_block(ctx) {
  let div;
  let mounted;
  let dispose;
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
      attr(div, "class", "mdc-dialog__surface-scrim");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (!mounted) {
        dispose = listen(
          div,
          "transitionend",
          /*transitionend_handler*/
          ctx[32]
        );
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_fragment(ctx) {
  let t0;
  let div3;
  let div1;
  let div0;
  let t1;
  let div0_class_value;
  let div1_class_value;
  let t2;
  let div2;
  let div3_class_value;
  let useActions_action;
  let t3;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = (
    /*#slots*/
    ctx[29].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[28],
    null
  );
  let if_block = (
    /*fullscreen*/
    ctx[5] && create_if_block(ctx)
  );
  let div0_levels = [
    {
      class: div0_class_value = classMap({
        [
          /*surface$class*/
          ctx[9]
        ]: true,
        "mdc-dialog__surface": true
      })
    },
    { role: "alertdialog" },
    { "aria-modal": "true" },
    prefixFilter(
      /*$$restProps*/
      ctx[19],
      "surface$"
    )
  ];
  let div_data_1 = {};
  for (let i = 0; i < div0_levels.length; i += 1) {
    div_data_1 = assign(div_data_1, div0_levels[i]);
  }
  let div1_levels = [
    {
      class: div1_class_value = classMap({
        [
          /*container$class*/
          ctx[8]
        ]: true,
        "mdc-dialog__container": true
      })
    },
    prefixFilter(
      /*$$restProps*/
      ctx[19],
      "container$"
    )
  ];
  let div_data_2 = {};
  for (let i = 0; i < div1_levels.length; i += 1) {
    div_data_2 = assign(div_data_2, div1_levels[i]);
  }
  let div3_levels = [
    {
      class: div3_class_value = classMap({
        [
          /*className*/
          ctx[2]
        ]: true,
        "mdc-dialog": true,
        "mdc-dialog--stacked": !/*autoStackButtons*/
        ctx[4],
        "mdc-dialog--fullscreen": (
          /*fullscreen*/
          ctx[5]
        ),
        "mdc-dialog--sheet": (
          /*sheet*/
          ctx[6]
        ),
        "mdc-dialog--no-content-padding": (
          /*noContentPadding*/
          ctx[7]
        ),
        "smui-dialog--selection": (
          /*selection*/
          ctx[3]
        ),
        .../*internalClasses*/
        ctx[12]
      })
    },
    { role: "alertdialog" },
    { "aria-modal": "true" },
    exclude(
      /*$$restProps*/
      ctx[19],
      ["container$", "surface$"]
    )
  ];
  let div_data_3 = {};
  for (let i = 0; i < div3_levels.length; i += 1) {
    div_data_3 = assign(div_data_3, div3_levels[i]);
  }
  const over_slot_template = (
    /*#slots*/
    ctx[29].over
  );
  const over_slot = create_slot(
    over_slot_template,
    ctx,
    /*$$scope*/
    ctx[28],
    get_over_slot_context
  );
  return {
    c() {
      t0 = space();
      div3 = element("div");
      div1 = element("div");
      div0 = element("div");
      if (default_slot)
        default_slot.c();
      t1 = space();
      if (if_block)
        if_block.c();
      t2 = space();
      div2 = element("div");
      t3 = space();
      if (over_slot)
        over_slot.c();
      this.h();
    },
    l(nodes) {
      t0 = claim_space(nodes);
      div3 = claim_element(nodes, "DIV", {
        class: true,
        role: true,
        "aria-modal": true
      });
      var div3_nodes = children(div3);
      div1 = claim_element(div3_nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", {
        class: true,
        role: true,
        "aria-modal": true
      });
      var div0_nodes = children(div0);
      if (default_slot)
        default_slot.l(div0_nodes);
      t1 = claim_space(div0_nodes);
      if (if_block)
        if_block.l(div0_nodes);
      div0_nodes.forEach(detach);
      div1_nodes.forEach(detach);
      t2 = claim_space(div3_nodes);
      div2 = claim_element(div3_nodes, "DIV", { class: true });
      children(div2).forEach(detach);
      div3_nodes.forEach(detach);
      t3 = claim_space(nodes);
      if (over_slot)
        over_slot.l(nodes);
      this.h();
    },
    h() {
      set_attributes(div0, div_data_1);
      set_attributes(div1, div_data_2);
      attr(div2, "class", "mdc-dialog__scrim");
      set_attributes(div3, div_data_3);
    },
    m(target, anchor) {
      insert_hydration(target, t0, anchor);
      insert_hydration(target, div3, anchor);
      append_hydration(div3, div1);
      append_hydration(div1, div0);
      if (default_slot) {
        default_slot.m(div0, null);
      }
      append_hydration(div0, t1);
      if (if_block)
        if_block.m(div0, null);
      append_hydration(div3, t2);
      append_hydration(div3, div2);
      ctx[33](div3);
      insert_hydration(target, t3, anchor);
      if (over_slot) {
        over_slot.m(target, anchor);
      }
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            window_1,
            "resize",
            /*resize_handler*/
            ctx[30]
          ),
          listen(
            window_1,
            "orientationchange",
            /*orientationchange_handler*/
            ctx[31]
          ),
          listen(document_1.body, "keydown", function() {
            if (is_function(
              /*instance*/
              ctx[10] && /*instance*/
              ctx[10].handleDocumentKeydown.bind(
                /*instance*/
                ctx[10]
              )
            ))
              /*instance*/
              (ctx[10] && /*instance*/
              ctx[10].handleDocumentKeydown.bind(
                /*instance*/
                ctx[10]
              )).apply(this, arguments);
          }),
          action_destroyer(useActions_action = useActions.call(
            null,
            div3,
            /*use*/
            ctx[1]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[13].call(null, div3)
          ),
          listen(
            div3,
            "SMUIDialog:opening",
            /*handleDialogOpening*/
            ctx[16]
          ),
          listen(
            div3,
            "SMUIDialog:opened",
            /*handleDialogOpened*/
            ctx[17]
          ),
          listen(
            div3,
            "SMUIDialog:closed",
            /*handleDialogClosed*/
            ctx[18]
          ),
          listen(div3, "click", function() {
            if (is_function(
              /*instance*/
              ctx[10] && /*instance*/
              ctx[10].handleClick.bind(
                /*instance*/
                ctx[10]
              )
            ))
              /*instance*/
              (ctx[10] && /*instance*/
              ctx[10].handleClick.bind(
                /*instance*/
                ctx[10]
              )).apply(this, arguments);
          }),
          listen(div3, "keydown", function() {
            if (is_function(
              /*instance*/
              ctx[10] && /*instance*/
              ctx[10].handleKeydown.bind(
                /*instance*/
                ctx[10]
              )
            ))
              /*instance*/
              (ctx[10] && /*instance*/
              ctx[10].handleKeydown.bind(
                /*instance*/
                ctx[10]
              )).apply(this, arguments);
          })
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (default_slot) {
        if (default_slot.p && (!current || dirty[0] & /*$$scope*/
        268435456)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx,
            /*$$scope*/
            ctx[28],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx[28]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx[28],
              dirty,
              null
            ),
            null
          );
        }
      }
      if (
        /*fullscreen*/
        ctx[5]
      ) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block(ctx);
          if_block.c();
          if_block.m(div0, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      set_attributes(div0, div_data_1 = get_spread_update(div0_levels, [
        (!current || dirty[0] & /*surface$class*/
        512 && div0_class_value !== (div0_class_value = classMap({
          [
            /*surface$class*/
            ctx[9]
          ]: true,
          "mdc-dialog__surface": true
        }))) && { class: div0_class_value },
        { role: "alertdialog" },
        { "aria-modal": "true" },
        dirty[0] & /*$$restProps*/
        524288 && prefixFilter(
          /*$$restProps*/
          ctx[19],
          "surface$"
        )
      ]));
      set_attributes(div1, div_data_2 = get_spread_update(div1_levels, [
        (!current || dirty[0] & /*container$class*/
        256 && div1_class_value !== (div1_class_value = classMap({
          [
            /*container$class*/
            ctx[8]
          ]: true,
          "mdc-dialog__container": true
        }))) && { class: div1_class_value },
        dirty[0] & /*$$restProps*/
        524288 && prefixFilter(
          /*$$restProps*/
          ctx[19],
          "container$"
        )
      ]));
      set_attributes(div3, div_data_3 = get_spread_update(div3_levels, [
        (!current || dirty[0] & /*className, autoStackButtons, fullscreen, sheet, noContentPadding, selection, internalClasses*/
        4348 && div3_class_value !== (div3_class_value = classMap({
          [
            /*className*/
            ctx[2]
          ]: true,
          "mdc-dialog": true,
          "mdc-dialog--stacked": !/*autoStackButtons*/
          ctx[4],
          "mdc-dialog--fullscreen": (
            /*fullscreen*/
            ctx[5]
          ),
          "mdc-dialog--sheet": (
            /*sheet*/
            ctx[6]
          ),
          "mdc-dialog--no-content-padding": (
            /*noContentPadding*/
            ctx[7]
          ),
          "smui-dialog--selection": (
            /*selection*/
            ctx[3]
          ),
          .../*internalClasses*/
          ctx[12]
        }))) && { class: div3_class_value },
        { role: "alertdialog" },
        { "aria-modal": "true" },
        dirty[0] & /*$$restProps*/
        524288 && exclude(
          /*$$restProps*/
          ctx[19],
          ["container$", "surface$"]
        )
      ]));
      if (useActions_action && is_function(useActions_action.update) && dirty[0] & /*use*/
      2)
        useActions_action.update.call(
          null,
          /*use*/
          ctx[1]
        );
      if (over_slot) {
        if (over_slot.p && (!current || dirty[0] & /*$$scope*/
        268435456)) {
          update_slot_base(
            over_slot,
            over_slot_template,
            ctx,
            /*$$scope*/
            ctx[28],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx[28]
            ) : get_slot_changes(
              over_slot_template,
              /*$$scope*/
              ctx[28],
              dirty,
              get_over_slot_changes
            ),
            get_over_slot_context
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      transition_in(over_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      transition_out(over_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t0);
        detach(div3);
        detach(t3);
      }
      if (default_slot)
        default_slot.d(detaching);
      if (if_block)
        if_block.d();
      ctx[33](null);
      if (over_slot)
        over_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance_1($$self, $$props, $$invalidate) {
  const omit_props_names = [
    "use",
    "class",
    "open",
    "selection",
    "escapeKeyAction",
    "scrimClickAction",
    "autoStackButtons",
    "fullscreen",
    "sheet",
    "noContentPadding",
    "container$class",
    "surface$class",
    "isOpen",
    "setOpen",
    "layout",
    "getElement"
  ];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let $aboveFullscreenShown;
  let $actionButtonsReversed;
  let { $$slots: slots = {}, $$scope } = $$props;
  var _a;
  const { FocusTrap: FocusTrap2 } = domFocusTrap;
  const { closest, matches } = ponyfill;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { open = false } = $$props;
  let { selection = false } = $$props;
  let { escapeKeyAction = "close" } = $$props;
  let { scrimClickAction = "close" } = $$props;
  let { autoStackButtons = true } = $$props;
  let { fullscreen = false } = $$props;
  let { sheet = false } = $$props;
  let { noContentPadding = false } = $$props;
  let { container$class = "" } = $$props;
  let { surface$class = "" } = $$props;
  let element2;
  let instance2;
  let internalClasses = {};
  let focusTrap;
  let actionButtonsReversed = writable(false);
  component_subscribe($$self, actionButtonsReversed, (value) => $$invalidate(37, $actionButtonsReversed = value));
  let aboveFullscreen = getContext("SMUI:dialog:aboveFullscreen");
  let aboveFullscreenShown = (_a = getContext("SMUI:dialog:aboveFullscreenShown")) !== null && _a !== void 0 ? _a : writable(false);
  component_subscribe($$self, aboveFullscreenShown, (value) => $$invalidate(27, $aboveFullscreenShown = value));
  let addLayoutListener = getContext("SMUI:addLayoutListener");
  let removeLayoutListener;
  let layoutListeners = [];
  let addLayoutListenerFn = (listener) => {
    layoutListeners.push(listener);
    return () => {
      const idx = layoutListeners.indexOf(listener);
      if (idx >= 0) {
        layoutListeners.splice(idx, 1);
      }
    };
  };
  setContext("SMUI:dialog:actions:reversed", actionButtonsReversed);
  setContext("SMUI:addLayoutListener", addLayoutListenerFn);
  setContext("SMUI:dialog:selection", selection);
  setContext("SMUI:dialog:aboveFullscreen", aboveFullscreen || fullscreen);
  setContext("SMUI:dialog:aboveFullscreenShown", aboveFullscreenShown);
  if (sheet) {
    setContext("SMUI:icon-button:context", "dialog:sheet");
  }
  if (addLayoutListener) {
    removeLayoutListener = addLayoutListener(layout);
  }
  let previousAboveFullscreenShown = $aboveFullscreenShown;
  onMount(() => {
    var _a2;
    focusTrap = new FocusTrap2(
      element2,
      {
        initialFocusEl: (_a2 = getInitialFocusEl()) !== null && _a2 !== void 0 ? _a2 : void 0
      }
    );
    $$invalidate(10, instance2 = new MDCDialogFoundation({
      addBodyClass: (className2) => document.body.classList.add(className2),
      addClass,
      areButtonsStacked: () => areTopsMisaligned(getButtonEls()),
      clickDefaultButton: () => {
        const defaultButton = getDefaultButtonEl();
        if (defaultButton) {
          defaultButton.click();
        }
      },
      eventTargetMatches: (target, selector) => target ? matches(target, selector) : false,
      getActionFromEvent: (evt) => {
        if (!evt.target) {
          return "";
        }
        const element3 = closest(evt.target, "[data-mdc-dialog-action]");
        return element3 && element3.getAttribute("data-mdc-dialog-action");
      },
      getInitialFocusEl,
      hasClass,
      isContentScrollable: () => isScrollable(getContentEl()),
      notifyClosed: (action) => {
        $$invalidate(0, open = false);
        dispatch(getElement(), "SMUIDialog:closed", action ? { action } : {}, void 0, true);
      },
      notifyClosing: (action) => dispatch(getElement(), "SMUIDialog:closing", action ? { action } : {}, void 0, true),
      notifyOpened: () => dispatch(getElement(), "SMUIDialog:opened", {}, void 0, true),
      notifyOpening: () => dispatch(getElement(), "SMUIDialog:opening", {}, void 0, true),
      releaseFocus: () => focusTrap.releaseFocus(),
      removeBodyClass: (className2) => document.body.classList.remove(className2),
      removeClass,
      reverseButtons: () => {
        set_store_value(actionButtonsReversed, $actionButtonsReversed = true, $actionButtonsReversed);
      },
      trapFocus: () => focusTrap.trapFocus(),
      registerContentEventHandler: (evt, handler) => {
        const content = getContentEl();
        if (content instanceof HTMLElement) {
          content.addEventListener(evt, handler);
        }
      },
      deregisterContentEventHandler: (evt, handler) => {
        const content = getContentEl();
        if (content instanceof HTMLElement) {
          content.removeEventListener(evt, handler);
        }
      },
      isScrollableContentAtTop: () => {
        return isScrollAtTop(getContentEl());
      },
      isScrollableContentAtBottom: () => {
        return isScrollAtBottom(getContentEl());
      },
      registerWindowEventHandler: (evt, handler) => {
        window.addEventListener(evt, handler);
      },
      deregisterWindowEventHandler: (evt, handler) => {
        window.removeEventListener(evt, handler);
      }
    }));
    instance2.init();
    return () => {
      instance2.destroy();
    };
  });
  onDestroy(() => {
    if (removeLayoutListener) {
      removeLayoutListener();
    }
  });
  function hasClass(className2) {
    return className2 in internalClasses ? internalClasses[className2] : getElement().classList.contains(className2);
  }
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
  function getButtonEls() {
    return [].slice.call(element2.querySelectorAll(".mdc-dialog__button"));
  }
  function getDefaultButtonEl() {
    return element2.querySelector("[data-mdc-dialog-button-default]");
  }
  function getContentEl() {
    return element2.querySelector(".mdc-dialog__content");
  }
  function getInitialFocusEl() {
    return element2.querySelector("[data-mdc-dialog-initial-focus]");
  }
  function handleDialogOpening() {
    if (aboveFullscreen) {
      set_store_value(aboveFullscreenShown, $aboveFullscreenShown = true, $aboveFullscreenShown);
    }
    requestAnimationFrame(() => {
      layoutListeners.forEach((listener) => listener());
    });
  }
  function handleDialogOpened() {
    layoutListeners.forEach((listener) => listener());
  }
  function handleDialogClosed() {
    if (aboveFullscreen) {
      set_store_value(aboveFullscreenShown, $aboveFullscreenShown = false, $aboveFullscreenShown);
    }
  }
  function isOpen() {
    return open;
  }
  function setOpen(value) {
    $$invalidate(0, open = value);
  }
  function layout() {
    return instance2.layout();
  }
  function getElement() {
    return element2;
  }
  const resize_handler = () => open && instance2 && instance2.layout();
  const orientationchange_handler = () => open && instance2 && instance2.layout();
  const transitionend_handler = () => instance2 && instance2.handleSurfaceScrimTransitionEnd();
  function div3_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(11, element2);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(19, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("use" in $$new_props)
      $$invalidate(1, use = $$new_props.use);
    if ("class" in $$new_props)
      $$invalidate(2, className = $$new_props.class);
    if ("open" in $$new_props)
      $$invalidate(0, open = $$new_props.open);
    if ("selection" in $$new_props)
      $$invalidate(3, selection = $$new_props.selection);
    if ("escapeKeyAction" in $$new_props)
      $$invalidate(20, escapeKeyAction = $$new_props.escapeKeyAction);
    if ("scrimClickAction" in $$new_props)
      $$invalidate(21, scrimClickAction = $$new_props.scrimClickAction);
    if ("autoStackButtons" in $$new_props)
      $$invalidate(4, autoStackButtons = $$new_props.autoStackButtons);
    if ("fullscreen" in $$new_props)
      $$invalidate(5, fullscreen = $$new_props.fullscreen);
    if ("sheet" in $$new_props)
      $$invalidate(6, sheet = $$new_props.sheet);
    if ("noContentPadding" in $$new_props)
      $$invalidate(7, noContentPadding = $$new_props.noContentPadding);
    if ("container$class" in $$new_props)
      $$invalidate(8, container$class = $$new_props.container$class);
    if ("surface$class" in $$new_props)
      $$invalidate(9, surface$class = $$new_props.surface$class);
    if ("$$scope" in $$new_props)
      $$invalidate(28, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & /*instance, escapeKeyAction*/
    1049600) {
      if (instance2 && instance2.getEscapeKeyAction() !== escapeKeyAction) {
        instance2.setEscapeKeyAction(escapeKeyAction);
      }
    }
    if ($$self.$$.dirty[0] & /*instance, scrimClickAction*/
    2098176) {
      if (instance2 && instance2.getScrimClickAction() !== scrimClickAction) {
        instance2.setScrimClickAction(scrimClickAction);
      }
    }
    if ($$self.$$.dirty[0] & /*instance, autoStackButtons*/
    1040) {
      if (instance2 && instance2.getAutoStackButtons() !== autoStackButtons) {
        instance2.setAutoStackButtons(autoStackButtons);
      }
    }
    if ($$self.$$.dirty[0] & /*autoStackButtons*/
    16) {
      if (!autoStackButtons) {
        set_store_value(actionButtonsReversed, $actionButtonsReversed = true, $actionButtonsReversed);
      }
    }
    if ($$self.$$.dirty[0] & /*instance, open*/
    1025) {
      if (instance2 && instance2.isOpen() !== open) {
        if (open) {
          instance2.open({
            isAboveFullscreenDialog: !!aboveFullscreen
          });
        } else {
          instance2.close();
        }
      }
    }
    if ($$self.$$.dirty[0] & /*fullscreen, instance, previousAboveFullscreenShown, $aboveFullscreenShown*/
    201327648) {
      if (fullscreen && instance2 && previousAboveFullscreenShown !== $aboveFullscreenShown) {
        $$invalidate(26, previousAboveFullscreenShown = $aboveFullscreenShown);
        if ($aboveFullscreenShown) {
          instance2.showSurfaceScrim();
        } else {
          instance2.hideSurfaceScrim();
        }
      }
    }
  };
  return [
    open,
    use,
    className,
    selection,
    autoStackButtons,
    fullscreen,
    sheet,
    noContentPadding,
    container$class,
    surface$class,
    instance2,
    element2,
    internalClasses,
    forwardEvents,
    actionButtonsReversed,
    aboveFullscreenShown,
    handleDialogOpening,
    handleDialogOpened,
    handleDialogClosed,
    $$restProps,
    escapeKeyAction,
    scrimClickAction,
    isOpen,
    setOpen,
    layout,
    getElement,
    previousAboveFullscreenShown,
    $aboveFullscreenShown,
    $$scope,
    slots,
    resize_handler,
    orientationchange_handler,
    transitionend_handler,
    div3_binding
  ];
}
class Dialog extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance_1,
      create_fragment,
      safe_not_equal,
      {
        use: 1,
        class: 2,
        open: 0,
        selection: 3,
        escapeKeyAction: 20,
        scrimClickAction: 21,
        autoStackButtons: 4,
        fullscreen: 5,
        sheet: 6,
        noContentPadding: 7,
        container$class: 8,
        surface$class: 9,
        isOpen: 22,
        setOpen: 23,
        layout: 24,
        getElement: 25
      },
      null,
      [-1, -1]
    );
  }
  get isOpen() {
    return this.$$.ctx[22];
  }
  get setOpen() {
    return this.$$.ctx[23];
  }
  get layout() {
    return this.$$.ctx[24];
  }
  get getElement() {
    return this.$$.ctx[25];
  }
}
classAdderBuilder({
  class: "mdc-dialog__header",
  tag: "div",
  contexts: {
    "SMUI:icon-button:context": "dialog:header"
  }
});
const Title = classAdderBuilder({
  class: "mdc-dialog__title",
  tag: "h2"
});
const Content = classAdderBuilder({
  class: "mdc-dialog__content",
  tag: "div"
});
const Actions = classAdderBuilder({
  class: "mdc-dialog__actions",
  tag: "div",
  classMap: {
    "smui-dialog__actions--reversed": "SMUI:dialog:actions:reversed"
  },
  contexts: {
    "SMUI:button:context": "dialog:action"
  }
});
export {
  Actions as A,
  Content as C,
  Dialog as D,
  Graphic as G,
  IconButton as I,
  Menu as M,
  Title as T,
  CommonIcon as a,
  domFocusTrap as b,
  Corner as c,
  dashboard as d,
  editing as e,
  AnimationFrame as f,
  globals as g,
  grid as h
};
