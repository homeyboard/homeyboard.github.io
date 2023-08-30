import { w as writable } from "./singletons.f80bfd01.js";
import { s as safe_not_equal, q as construct_svelte_component, e as empty, i as insert_hydration, d as detach, D as compute_rest_props, E as get_current_component, P as getContext, u as assign, F as exclude_internal_props, p as binding_callbacks, r as create_slot, y as update_slot_base, z as get_all_dirty_from_scope, A as get_slot_changes, U as svg_element, V as claim_svg_element, h as children, a5 as set_svg_attributes, x as action_destroyer, B as is_function, C as run_all, a as space, f as element, c as claim_space, g as claim_element, v as set_attributes, j as attr, N as append_hydration, w as listen, M as component_subscribe, G as setContext, o as onMount, Y as set_store_value, R as onDestroy, H as noop } from "./scheduler.9514346f.js";
import { S as SvelteComponent, i as init, b as create_component, d as claim_component, m as mount_component, g as group_outros, t as transition_out, e as destroy_component, c as check_outros, a as transition_in } from "./index.6fa96164.js";
import { c as classMap, g as get_spread_update, e as get_spread_object, f as forwardEventsBuilder, S as SmuiElement, u as useActions, _ as __extends, a as __assign, M as MDCFoundation, p as prefixFilter, l as exclude, d as dispatch, n as ponyfill, b as classAdderBuilder } from "./Textfield.d226c201.js";
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
function create_fragment$2(ctx) {
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
function instance$1($$self, $$props, $$invalidate) {
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
    init(this, options, instance$1, create_fragment$2, safe_not_equal, {
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
function create_fragment$1(ctx) {
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
function instance($$self, $$props, $$invalidate) {
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
    init(this, options, instance, create_fragment$1, safe_not_equal, { use: 0, getElement: 4 });
  }
  get getElement() {
    return this.$$.ctx[4];
  }
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
  Title as T,
  CommonIcon as a,
  domFocusTrap as b,
  AnimationFrame as c,
  dashboard as d,
  editing as e,
  grid as f,
  globals as g
};
