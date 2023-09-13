import { s as safe_not_equal, e as empty, i as insert_hydration, d as detach, y as create_slot, f as element, g as claim_element, h as children, j as attr, M as toggle_class, k as set_style, D as append_hydration, G as listen, X as stop_propagation, z as update_slot_base, A as get_all_dirty_from_scope, B as get_slot_changes, O as run_all, _ as bubble, N as action_destroyer, S as is_function, t as tick, J as assign, a as space, c as claim_space, R as set_attributes, T as get_current_component, Q as setContext, K as exclude_internal_props, Y as prevent_default, H as add_render_callback, I as getContext, o as onMount, p as binding_callbacks, l as text, m as claim_text, n as set_data, P as compute_slots, u as get_svelte_dataset, C as noop, $ as svg_element, a0 as claim_svg_element, a1 as set_svg_attributes, L as null_to_empty, U as src_url_equal } from "./scheduler.3830f32a.js";
import { S as SvelteComponent, i as init, a as transition_in, g as group_outros, t as transition_out, c as check_outros, p as create_out_transition, o as create_in_transition, b as create_component, d as claim_component, m as mount_component, e as destroy_component, k as create_bidirectional_transition } from "./index.9ba3e62c.js";
import { e as exclude, u as useActions, g as get_spread_update, h as forwardEventsBuilder, t as twMerge, k as scale, H as HoverBackground, a as Icon$1, s as slide, f as fade, o as account } from "./Progress.157241c8.js";
function create_if_block$5(ctx) {
  let div1;
  let div0;
  let current;
  let mounted;
  let dispose;
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
      div1 = element("div");
      div0 = element("div");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      div1 = claim_element(nodes, "DIV", { class: true, style: true });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      if (default_slot)
        default_slot.l(div0_nodes);
      div0_nodes.forEach(detach);
      div1_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div0, "class", "h-full absolute right-0 top-0 bg-surface w-full drop-shadow p-3 overflow-auto");
      toggle_class(
        div0,
        "left-0",
        /*position*/
        ctx[1] === "left"
      );
      toggle_class(
        div0,
        "right-0",
        /*position*/
        ctx[1] === "right"
      );
      toggle_class(
        div0,
        "max-w-xs",
        /*size*/
        ctx[2] === "xs"
      );
      toggle_class(
        div0,
        "max-w-sm",
        /*size*/
        ctx[2] === "sm"
      );
      toggle_class(
        div0,
        "max-w-md",
        /*size*/
        ctx[2] === "md"
      );
      toggle_class(
        div0,
        "max-w-lg",
        /*size*/
        ctx[2] === "lg"
      );
      toggle_class(
        div0,
        "max-w-xl",
        /*size*/
        ctx[2] === "xl"
      );
      toggle_class(
        div0,
        "max-w-2xl",
        /*size*/
        ctx[2] === "2xl"
      );
      attr(div1, "class", "backdrop-blur-sm h-full w-full fixed right-0 top-0");
      set_style(div1, "z-index", "1");
    },
    m(target, anchor) {
      insert_hydration(target, div1, anchor);
      append_hydration(div1, div0);
      if (default_slot) {
        default_slot.m(div0, null);
      }
      current = true;
      if (!mounted) {
        dispose = [
          listen(div0, "click", stop_propagation(
            /*click_handler*/
            ctx[5]
          )),
          listen(
            div1,
            "click",
            /*click_handler_1*/
            ctx[6]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
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
      if (!current || dirty & /*position*/
      2) {
        toggle_class(
          div0,
          "left-0",
          /*position*/
          ctx2[1] === "left"
        );
      }
      if (!current || dirty & /*position*/
      2) {
        toggle_class(
          div0,
          "right-0",
          /*position*/
          ctx2[1] === "right"
        );
      }
      if (!current || dirty & /*size*/
      4) {
        toggle_class(
          div0,
          "max-w-xs",
          /*size*/
          ctx2[2] === "xs"
        );
      }
      if (!current || dirty & /*size*/
      4) {
        toggle_class(
          div0,
          "max-w-sm",
          /*size*/
          ctx2[2] === "sm"
        );
      }
      if (!current || dirty & /*size*/
      4) {
        toggle_class(
          div0,
          "max-w-md",
          /*size*/
          ctx2[2] === "md"
        );
      }
      if (!current || dirty & /*size*/
      4) {
        toggle_class(
          div0,
          "max-w-lg",
          /*size*/
          ctx2[2] === "lg"
        );
      }
      if (!current || dirty & /*size*/
      4) {
        toggle_class(
          div0,
          "max-w-xl",
          /*size*/
          ctx2[2] === "xl"
        );
      }
      if (!current || dirty & /*size*/
      4) {
        toggle_class(
          div0,
          "max-w-2xl",
          /*size*/
          ctx2[2] === "2xl"
        );
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
        detach(div1);
      }
      if (default_slot)
        default_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_fragment$j(ctx) {
  let if_block_anchor;
  let current;
  let if_block = (
    /*open*/
    ctx[0] && create_if_block$5(ctx)
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
    p(ctx2, [dirty]) {
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
          if_block = create_if_block$5(ctx2);
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
function instance$j($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { open = false } = $$props;
  let { position = "left" } = $$props;
  let { size = "sm" } = $$props;
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  const click_handler_1 = () => $$invalidate(0, open = false);
  $$self.$$set = ($$props2) => {
    if ("open" in $$props2)
      $$invalidate(0, open = $$props2.open);
    if ("position" in $$props2)
      $$invalidate(1, position = $$props2.position);
    if ("size" in $$props2)
      $$invalidate(2, size = $$props2.size);
    if ("$$scope" in $$props2)
      $$invalidate(3, $$scope = $$props2.$$scope);
  };
  return [open, position, size, $$scope, slots, click_handler, click_handler_1];
}
class Drawer extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$j, create_fragment$j, safe_not_equal, { open: 0, position: 1, size: 2 });
  }
}
function create_fragment$i(ctx) {
  let div;
  let portal_action;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = (
    /*#slots*/
    ctx[2].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[1],
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
      div = claim_element(nodes, "DIV", {});
      var div_nodes = children(div);
      if (default_slot)
        default_slot.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      div.hidden = true;
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (default_slot) {
        default_slot.m(div, null);
      }
      current = true;
      if (!mounted) {
        dispose = action_destroyer(portal_action = portal.call(
          null,
          div,
          /*target*/
          ctx[0]
        ));
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        2)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[1],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[1]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[1],
              dirty,
              null
            ),
            null
          );
        }
      }
      if (portal_action && is_function(portal_action.update) && dirty & /*target*/
      1)
        portal_action.update.call(
          null,
          /*target*/
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
      mounted = false;
      dispose();
    }
  };
}
function portal(el, target = "body") {
  let targetEl;
  async function update(newTarget) {
    target = newTarget;
    if (typeof target === "string") {
      targetEl = document.querySelector(target);
      if (targetEl === null) {
        await tick();
        targetEl = document.querySelector(target);
      }
      if (targetEl === null) {
        throw new Error(`No element found matching css selector: "${target}"`);
      }
    } else if (target instanceof HTMLElement) {
      targetEl = target;
    } else {
      throw new TypeError(`Unknown portal target type: ${target === null ? "null" : typeof target}. Allowed types: string (CSS selector) or HTMLElement.`);
    }
    targetEl.appendChild(el);
    el.hidden = false;
  }
  function destroy() {
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }
  update(target);
  return { update, destroy };
}
function instance$i($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { target = "body" } = $$props;
  $$self.$$set = ($$props2) => {
    if ("target" in $$props2)
      $$invalidate(0, target = $$props2.target);
    if ("$$scope" in $$props2)
      $$invalidate(1, $$scope = $$props2.$$scope);
  };
  return [target, $$scope, slots];
}
class Portal extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$i, create_fragment$i, safe_not_equal, { target: 0 });
  }
}
function clickOutside(node, handler) {
  const onClick = (event) => node && !node.contains(event.target) && !event.defaultPrevented && handler();
  document.addEventListener("click", onClick, true);
  return {
    destroy() {
      document.removeEventListener("click", onClick, true);
    }
  };
}
const min = Math.min;
const max = Math.max;
const round = Math.round;
const floor = Math.floor;
const createCoords = (v) => ({
  x: v,
  y: v
});
const oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
const oppositeAlignmentMap = {
  start: "end",
  end: "start"
};
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ["left", "right"];
  const rl = ["right", "left"];
  const tb = ["top", "bottom"];
  const bt = ["bottom", "top"];
  switch (side) {
    case "top":
    case "bottom":
      if (rtl)
        return isStart ? rl : lr;
      return isStart ? lr : rl;
    case "left":
    case "right":
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  return {
    ...rect,
    top: rect.y,
    left: rect.x,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  };
}
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
const computePosition$1 = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
      continue;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element2 = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element2))) != null ? _await$platform$isEle : true) ? element2 : element2.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    ...rects.floating,
    x,
    y
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
const flip = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      const side = getSide(placement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      if (!specifiedFallbackPlacements && fallbackAxisSideDirection !== "none") {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides[0]], overflow[sides[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$map$so;
              const placement2 = (_overflowsData$map$so = overflowsData.map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$map$so[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...rawValue
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
const offset = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      const {
        x,
        y
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: diffCoords
      };
    }
  };
};
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null ? void 0 : (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element2) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle(element2);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function isTableElement(element2) {
  return ["table", "td", "th"].includes(getNodeName(element2));
}
function isContainingBlock(element2) {
  const webkit = isWebKit();
  const css = getComputedStyle(element2);
  return css.transform !== "none" || css.perspective !== "none" || (css.containerType ? css.containerType !== "normal" : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== "none" : false) || !webkit && (css.filter ? css.filter !== "none" : false) || ["transform", "perspective", "filter"].some((value) => (css.willChange || "").includes(value)) || ["paint", "layout", "strict", "content"].some((value) => (css.contain || "").includes(value));
}
function getContainingBlock(element2) {
  let currentNode = getParentNode(element2);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else {
      currentNode = getParentNode(currentNode);
    }
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === "undefined" || !CSS.supports)
    return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
function getComputedStyle(element2) {
  return getWindow(element2).getComputedStyle(element2);
}
function getNodeScroll(element2) {
  if (isElement(element2)) {
    return {
      scrollLeft: element2.scrollLeft,
      scrollTop: element2.scrollTop
    };
  }
  return {
    scrollLeft: element2.pageXOffset,
    scrollTop: element2.pageYOffset
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor));
}
function getCssDimensions(element2) {
  const css = getComputedStyle(element2);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element2);
  const offsetWidth = hasOffset ? element2.offsetWidth : width;
  const offsetHeight = hasOffset ? element2.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element2) {
  return !isElement(element2) ? element2.contextElement : element2;
}
function getScale(element2) {
  const domElement = unwrapElement(element2);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
const noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(element2) {
  const win = getWindow(element2);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element2, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element2)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element2, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element2.getBoundingClientRect();
  const domElement = unwrapElement(element2);
  let scale2 = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale2 = getScale(offsetParent);
      }
    } else {
      scale2 = getScale(element2);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale2.x;
  let y = (clientRect.top + visualOffsets.y) / scale2.y;
  let width = clientRect.width / scale2.x;
  let height = clientRect.height / scale2.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentIFrame = win.frameElement;
    while (currentIFrame && offsetParent && offsetWin !== win) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentIFrame = getWindow(currentIFrame).frameElement;
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  if (offsetParent === documentElement) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale2 = createCoords(1);
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== "fixed") {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale2 = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale2.x,
    height: rect.height * scale2.y,
    x: rect.x * scale2.x - scroll.scrollLeft * scale2.x + offsets.x,
    y: rect.y * scale2.y - scroll.scrollTop * scale2.y + offsets.y
  };
}
function getClientRects(element2) {
  return Array.from(element2.getClientRects());
}
function getWindowScrollBarX(element2) {
  return getBoundingClientRect(getDocumentElement(element2)).left + getNodeScroll(element2).scrollLeft;
}
function getDocumentRect(element2) {
  const html = getDocumentElement(element2);
  const scroll = getNodeScroll(element2);
  const body = element2.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element2);
  const y = -scroll.scrollTop;
  if (getComputedStyle(body).direction === "rtl") {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getViewportRect(element2, strategy) {
  const win = getWindow(element2);
  const html = getDocumentElement(element2);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getInnerBoundingClientRect(element2, strategy) {
  const clientRect = getBoundingClientRect(element2, true, strategy === "fixed");
  const top = clientRect.top + element2.clientTop;
  const left = clientRect.left + element2.clientLeft;
  const scale2 = isHTMLElement(element2) ? getScale(element2) : createCoords(1);
  const width = element2.clientWidth * scale2.x;
  const height = element2.clientHeight * scale2.y;
  const x = left * scale2.x;
  const y = top * scale2.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element2, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element2, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element2));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element2);
    rect = {
      ...clippingAncestor,
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element2, stopNode) {
  const parentNode = getParentNode(element2);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element2, cache) {
  const cachedResult = cache.get(element2);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element2).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle(element2).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element2) : element2;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element2, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element2, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element: element2,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? getClippingElementAncestors(element2, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element2, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element2, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element2) {
  return getCssDimensions(element2);
}
function getRectRelativeToOffsetParent(element2, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element2, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
function getTrueOffsetParent(element2, polyfill) {
  if (!isHTMLElement(element2) || getComputedStyle(element2).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element2);
  }
  return element2.offsetParent;
}
function getOffsetParent(element2, polyfill) {
  const window2 = getWindow(element2);
  if (!isHTMLElement(element2)) {
    return window2;
  }
  let offsetParent = getTrueOffsetParent(element2, polyfill);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static" && !isContainingBlock(offsetParent))) {
    return window2;
  }
  return offsetParent || getContainingBlock(element2) || window2;
}
const getElementRects = async function(_ref) {
  let {
    reference,
    floating,
    strategy
  } = _ref;
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  return {
    reference: getRectRelativeToOffsetParent(reference, await getOffsetParentFn(floating), strategy),
    floating: {
      x: 0,
      y: 0,
      ...await getDimensionsFn(floating)
    }
  };
};
function isRTL(element2) {
  return getComputedStyle(element2).direction === "rtl";
}
const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function observeMove(element2, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element2);
  function cleanup() {
    clearTimeout(timeoutId);
    io && io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const {
      left,
      top,
      width,
      height
    } = element2.getBoundingClientRect();
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 100);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element2);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          resizeObserver && resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo && cleanupIo();
    resizeObserver && resizeObserver.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
const computePosition = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};
function floatingUI(node, config = {
  placement: "bottom-start",
  strategy: "absolute"
}) {
  const referenceEl = node.previousElementSibling;
  function updatePosition() {
    computePosition(referenceEl, node, {
      placement: config == null ? void 0 : config.placement,
      strategy: config == null ? void 0 : config.strategy,
      middleware: [offset(config.offset), flip()]
    }).then(({ x, y }) => {
      Object.assign(node.style, {
        left: `${x}px`,
        top: `${y}px`
      });
    });
  }
  const cleanup = autoUpdate(referenceEl, node, updatePosition, config == null ? void 0 : config.autoUpdate);
  return {
    destroy() {
      cleanup();
    }
  };
}
const get_items_slot_changes = (dirty) => ({});
const get_items_slot_context = (ctx) => ({});
const get_trigger_slot_changes = (dirty) => ({});
const get_trigger_slot_context = (ctx) => ({});
function create_if_block$4(ctx) {
  let current;
  const items_slot_template = (
    /*#slots*/
    ctx[7].items
  );
  const items_slot = create_slot(
    items_slot_template,
    ctx,
    /*$$scope*/
    ctx[6],
    get_items_slot_context
  );
  return {
    c() {
      if (items_slot)
        items_slot.c();
    },
    l(nodes) {
      if (items_slot)
        items_slot.l(nodes);
    },
    m(target, anchor) {
      if (items_slot) {
        items_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (items_slot) {
        if (items_slot.p && (!current || dirty & /*$$scope*/
        64)) {
          update_slot_base(
            items_slot,
            items_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[6],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[6]
            ) : get_slot_changes(
              items_slot_template,
              /*$$scope*/
              ctx2[6],
              dirty,
              get_items_slot_changes
            ),
            get_items_slot_context
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(items_slot, local);
      current = true;
    },
    o(local) {
      transition_out(items_slot, local);
      current = false;
    },
    d(detaching) {
      if (items_slot)
        items_slot.d(detaching);
    }
  };
}
function create_fragment$h(ctx) {
  let div1;
  let div0;
  let t;
  let useActions_action;
  let current;
  let mounted;
  let dispose;
  const trigger_slot_template = (
    /*#slots*/
    ctx[7].trigger
  );
  const trigger_slot = create_slot(
    trigger_slot_template,
    ctx,
    /*$$scope*/
    ctx[6],
    get_trigger_slot_context
  );
  let if_block = (
    /*visible*/
    ctx[0] && create_if_block$4(ctx)
  );
  let div1_levels = [
    { class: (
      /*finalClass*/
      ctx[2]
    ) },
    exclude(
      /*$$props*/
      ctx[5],
      ["use", "class"]
    )
  ];
  let div_data_1 = {};
  for (let i = 0; i < div1_levels.length; i += 1) {
    div_data_1 = assign(div_data_1, div1_levels[i]);
  }
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      if (trigger_slot)
        trigger_slot.c();
      t = space();
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes) {
      div1 = claim_element(nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      if (trigger_slot)
        trigger_slot.l(div0_nodes);
      div0_nodes.forEach(detach);
      t = claim_space(div1_nodes);
      if (if_block)
        if_block.l(div1_nodes);
      div1_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div0, "class", "floating-ui-ref");
      set_attributes(div1, div_data_1);
    },
    m(target, anchor) {
      insert_hydration(target, div1, anchor);
      append_hydration(div1, div0);
      if (trigger_slot) {
        trigger_slot.m(div0, null);
      }
      append_hydration(div1, t);
      if (if_block)
        if_block.m(div1, null);
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(clickOutside.call(
            null,
            div1,
            /*handleClose*/
            ctx[4]
          )),
          action_destroyer(useActions_action = useActions.call(
            null,
            div1,
            /*use*/
            ctx[1]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[3].call(null, div1)
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (trigger_slot) {
        if (trigger_slot.p && (!current || dirty & /*$$scope*/
        64)) {
          update_slot_base(
            trigger_slot,
            trigger_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[6],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[6]
            ) : get_slot_changes(
              trigger_slot_template,
              /*$$scope*/
              ctx2[6],
              dirty,
              get_trigger_slot_changes
            ),
            get_trigger_slot_context
          );
        }
      }
      if (
        /*visible*/
        ctx2[0]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*visible*/
          1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$4(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div1, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      set_attributes(div1, div_data_1 = get_spread_update(div1_levels, [
        (!current || dirty & /*finalClass*/
        4) && { class: (
          /*finalClass*/
          ctx2[2]
        ) },
        dirty & /*$$props*/
        32 && exclude(
          /*$$props*/
          ctx2[5],
          ["use", "class"]
        )
      ]));
      if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/
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
      transition_in(trigger_slot, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(trigger_slot, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      if (trigger_slot)
        trigger_slot.d(detaching);
      if (if_block)
        if_block.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
const defaultClass$e = "relative inline-block";
function instance$h($$self, $$props, $$invalidate) {
  let finalClass;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { use = [] } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { visible = false } = $$props;
  function handleClose() {
    $$invalidate(0, visible = false);
  }
  setContext("dropdown-handleClose", handleClose);
  $$self.$$set = ($$new_props) => {
    $$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props)
      $$invalidate(1, use = $$new_props.use);
    if ("visible" in $$new_props)
      $$invalidate(0, visible = $$new_props.visible);
    if ("$$scope" in $$new_props)
      $$invalidate(6, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    $$invalidate(2, finalClass = twMerge(defaultClass$e, $$props.class));
  };
  $$props = exclude_internal_props($$props);
  return [visible, use, finalClass, forwardEvents, handleClose, $$props, $$scope, slots];
}
let Dropdown$1 = class Dropdown extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$h, create_fragment$h, safe_not_equal, { use: 1, visible: 0 });
  }
};
function create_fragment$g(ctx) {
  let ul;
  let floatingUI_action;
  let useActions_action;
  let ul_intro;
  let ul_outro;
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
  let ul_levels = [
    { class: (
      /*finalClass*/
      ctx[4]
    ) },
    exclude(
      /*$$props*/
      ctx[7],
      ["use", "class"]
    ),
    { role: "menu" },
    { tabindex: "-1" }
  ];
  let ul_data = {};
  for (let i = 0; i < ul_levels.length; i += 1) {
    ul_data = assign(ul_data, ul_levels[i]);
  }
  return {
    c() {
      ul = element("ul");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      ul = claim_element(nodes, "UL", { class: true, role: true, tabindex: true });
      var ul_nodes = children(ul);
      if (default_slot)
        default_slot.l(ul_nodes);
      ul_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(ul, ul_data);
    },
    m(target, anchor) {
      insert_hydration(target, ul, anchor);
      if (default_slot) {
        default_slot.m(ul, null);
      }
      ctx[10](ul);
      current = true;
      if (!mounted) {
        dispose = [
          listen(window, "keydown", prevent_default(
            /*handleKeydown*/
            ctx[6]
          )),
          action_destroyer(floatingUI_action = floatingUI.call(null, ul, {
            placement: (
              /*placement*/
              ctx[1]
            ),
            offset: (
              /*offset*/
              ctx[2]
            )
          })),
          action_destroyer(useActions_action = useActions.call(
            null,
            ul,
            /*use*/
            ctx[0]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[5].call(null, ul)
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
      set_attributes(ul, ul_data = get_spread_update(ul_levels, [
        (!current || dirty & /*finalClass*/
        16) && { class: (
          /*finalClass*/
          ctx2[4]
        ) },
        dirty & /*$$props*/
        128 && exclude(
          /*$$props*/
          ctx2[7],
          ["use", "class"]
        ),
        { role: "menu" },
        { tabindex: "-1" }
      ]));
      if (floatingUI_action && is_function(floatingUI_action.update) && dirty & /*placement, offset*/
      6)
        floatingUI_action.update.call(null, {
          placement: (
            /*placement*/
            ctx2[1]
          ),
          offset: (
            /*offset*/
            ctx2[2]
          )
        });
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
      if (local) {
        add_render_callback(() => {
          if (!current)
            return;
          if (ul_outro)
            ul_outro.end(1);
          ul_intro = create_in_transition(ul, scale, { start: 0.9, duration: 100, delay: 150 });
          ul_intro.start();
        });
      }
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      if (ul_intro)
        ul_intro.invalidate();
      if (local) {
        ul_outro = create_out_transition(ul, scale, { start: 0.95, duration: 75 });
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(ul);
      }
      if (default_slot)
        default_slot.d(detaching);
      ctx[10](null);
      if (detaching && ul_outro)
        ul_outro.end();
      mounted = false;
      run_all(dispose);
    }
  };
}
const defaultClass$d = "floating-ui-el origin-top-right absolute z-10 border border-border w-56 p-1 rounded-md shadow-xl py-1 bg-surface";
function instance$g($$self, $$props, $$invalidate) {
  let finalClass;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { use = [] } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { placement = "bottom-start" } = $$props;
  let { offset: offset2 = 8 } = $$props;
  let list;
  let items = [];
  let focusIndex = 0;
  const handleClose = getContext("dropdown-handleClose");
  function handleKeydown2(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.key === "ArrowUp") {
      focusIndex = focusIndex > 0 ? focusIndex - 1 : items.length - 1;
      if (items && items[focusIndex])
        items[focusIndex].focus();
    } else if (e.key === "ArrowDown") {
      focusIndex = focusIndex < items.length - 1 ? focusIndex + 1 : 0;
      if (items && items[focusIndex])
        items[focusIndex].focus();
    } else if (e.key === "Escape") {
      handleClose();
    }
  }
  onMount(() => {
    items = list.querySelectorAll("li");
    if (items && items[focusIndex])
      items[focusIndex].focus();
  });
  function ul_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      list = $$value;
      $$invalidate(3, list);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$invalidate(7, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("placement" in $$new_props)
      $$invalidate(1, placement = $$new_props.placement);
    if ("offset" in $$new_props)
      $$invalidate(2, offset2 = $$new_props.offset);
    if ("$$scope" in $$new_props)
      $$invalidate(8, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    $$invalidate(4, finalClass = twMerge(defaultClass$d, $$props.class));
  };
  $$props = exclude_internal_props($$props);
  return [
    use,
    placement,
    offset2,
    list,
    finalClass,
    forwardEvents,
    handleKeydown2,
    $$props,
    $$scope,
    slots,
    ul_binding
  ];
}
class Items extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$g, create_fragment$g, safe_not_equal, { use: 0, placement: 1, offset: 2 });
  }
}
const get_extra_slot_changes = (dirty) => ({});
const get_extra_slot_context = (ctx) => ({});
const get_icon_slot_changes$2 = (dirty) => ({});
const get_icon_slot_context$2 = (ctx) => ({});
function create_fragment$f(ctx) {
  let li;
  let button;
  let span1;
  let t0;
  let span0;
  let t1;
  let t2;
  let t3;
  let hoverbackground;
  let useActions_action;
  let current;
  let mounted;
  let dispose;
  const icon_slot_template = (
    /*#slots*/
    ctx[7].icon
  );
  const icon_slot = create_slot(
    icon_slot_template,
    ctx,
    /*$$scope*/
    ctx[6],
    get_icon_slot_context$2
  );
  const extra_slot_template = (
    /*#slots*/
    ctx[7].extra
  );
  const extra_slot = create_slot(
    extra_slot_template,
    ctx,
    /*$$scope*/
    ctx[6],
    get_extra_slot_context
  );
  hoverbackground = new HoverBackground({ props: { class: "rounded-md" } });
  let li_levels = [
    { class: (
      /*finalClass*/
      ctx[2]
    ) },
    { tabindex: "-1" },
    exclude(
      /*$$props*/
      ctx[4],
      ["use", "class"]
    )
  ];
  let li_data = {};
  for (let i = 0; i < li_levels.length; i += 1) {
    li_data = assign(li_data, li_levels[i]);
  }
  return {
    c() {
      li = element("li");
      button = element("button");
      span1 = element("span");
      if (icon_slot)
        icon_slot.c();
      t0 = space();
      span0 = element("span");
      t1 = text(
        /*label*/
        ctx[1]
      );
      t2 = space();
      if (extra_slot)
        extra_slot.c();
      t3 = space();
      create_component(hoverbackground.$$.fragment);
      this.h();
    },
    l(nodes) {
      li = claim_element(nodes, "LI", { class: true, tabindex: true });
      var li_nodes = children(li);
      button = claim_element(li_nodes, "BUTTON", {
        type: true,
        "aria-label": true,
        class: true
      });
      var button_nodes = children(button);
      span1 = claim_element(button_nodes, "SPAN", { class: true });
      var span1_nodes = children(span1);
      if (icon_slot)
        icon_slot.l(span1_nodes);
      t0 = claim_space(span1_nodes);
      span0 = claim_element(span1_nodes, "SPAN", { class: true });
      var span0_nodes = children(span0);
      t1 = claim_text(
        span0_nodes,
        /*label*/
        ctx[1]
      );
      span0_nodes.forEach(detach);
      span1_nodes.forEach(detach);
      t2 = claim_space(button_nodes);
      if (extra_slot)
        extra_slot.l(button_nodes);
      t3 = claim_space(button_nodes);
      claim_component(hoverbackground.$$.fragment, button_nodes);
      button_nodes.forEach(detach);
      li_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(span0, "class", "truncate");
      toggle_class(
        span0,
        "ml-3",
        /*$$slots*/
        ctx[5].icon
      );
      attr(span1, "class", "flex items-center justify-start flex-grow");
      attr(button, "type", "button");
      attr(button, "aria-label", "select option");
      attr(button, "class", "w-full flex items-center");
      set_attributes(li, li_data);
    },
    m(target, anchor) {
      insert_hydration(target, li, anchor);
      append_hydration(li, button);
      append_hydration(button, span1);
      if (icon_slot) {
        icon_slot.m(span1, null);
      }
      append_hydration(span1, t0);
      append_hydration(span1, span0);
      append_hydration(span0, t1);
      append_hydration(button, t2);
      if (extra_slot) {
        extra_slot.m(button, null);
      }
      append_hydration(button, t3);
      mount_component(hoverbackground, button, null);
      current = true;
      if (!mounted) {
        dispose = [
          listen(button, "keydown", handleKeydown),
          action_destroyer(useActions_action = useActions.call(
            null,
            li,
            /*use*/
            ctx[0]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[3].call(null, li)
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (icon_slot) {
        if (icon_slot.p && (!current || dirty & /*$$scope*/
        64)) {
          update_slot_base(
            icon_slot,
            icon_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[6],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[6]
            ) : get_slot_changes(
              icon_slot_template,
              /*$$scope*/
              ctx2[6],
              dirty,
              get_icon_slot_changes$2
            ),
            get_icon_slot_context$2
          );
        }
      }
      if (!current || dirty & /*label*/
      2)
        set_data(
          t1,
          /*label*/
          ctx2[1]
        );
      if (!current || dirty & /*$$slots*/
      32) {
        toggle_class(
          span0,
          "ml-3",
          /*$$slots*/
          ctx2[5].icon
        );
      }
      if (extra_slot) {
        if (extra_slot.p && (!current || dirty & /*$$scope*/
        64)) {
          update_slot_base(
            extra_slot,
            extra_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[6],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[6]
            ) : get_slot_changes(
              extra_slot_template,
              /*$$scope*/
              ctx2[6],
              dirty,
              get_extra_slot_changes
            ),
            get_extra_slot_context
          );
        }
      }
      set_attributes(li, li_data = get_spread_update(li_levels, [
        (!current || dirty & /*finalClass*/
        4) && { class: (
          /*finalClass*/
          ctx2[2]
        ) },
        { tabindex: "-1" },
        dirty & /*$$props*/
        16 && exclude(
          /*$$props*/
          ctx2[4],
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
      transition_in(icon_slot, local);
      transition_in(extra_slot, local);
      transition_in(hoverbackground.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(icon_slot, local);
      transition_out(extra_slot, local);
      transition_out(hoverbackground.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(li);
      }
      if (icon_slot)
        icon_slot.d(detaching);
      if (extra_slot)
        extra_slot.d(detaching);
      destroy_component(hoverbackground);
      mounted = false;
      run_all(dispose);
    }
  };
}
const defaultClass$c = "w-full group relative flex items-center px-3 py-2 text-sm font-medium rounded-md overflow-hidden text-secondary-content !outline-none !border-none !ring-0";
function handleKeydown(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    e.stopPropagation();
    const { target } = e;
    if (target && target instanceof HTMLLIElement)
      target.click();
  }
}
function instance$f($$self, $$props, $$invalidate) {
  let finalClass;
  let { $$slots: slots = {}, $$scope } = $$props;
  const $$slots = compute_slots(slots);
  let { use = [] } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { label } = $$props;
  $$self.$$set = ($$new_props) => {
    $$invalidate(4, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("label" in $$new_props)
      $$invalidate(1, label = $$new_props.label);
    if ("$$scope" in $$new_props)
      $$invalidate(6, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    $$invalidate(2, finalClass = twMerge(defaultClass$c, $$props.class));
  };
  $$props = exclude_internal_props($$props);
  return [use, label, finalClass, forwardEvents, $$props, $$slots, $$scope, slots];
}
class Item extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$f, create_fragment$f, safe_not_equal, { use: 0, label: 1 });
  }
}
function create_fragment$e(ctx) {
  let div2;
  let div1;
  let textContent = `<div class="w-full border-t border-border"></div>`;
  let useActions_action;
  let mounted;
  let dispose;
  let div2_levels = [
    { class: (
      /*finalClass*/
      ctx[1]
    ) },
    exclude(
      /*$$props*/
      ctx[3],
      ["use", "class"]
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
      div1.innerHTML = textContent;
      this.h();
    },
    l(nodes) {
      div2 = claim_element(nodes, "DIV", { class: true });
      var div2_nodes = children(div2);
      div1 = claim_element(div2_nodes, "DIV", {
        class: true,
        "aria-hidden": true,
        ["data-svelte-h"]: true
      });
      if (get_svelte_dataset(div1) !== "svelte-qa7ndr")
        div1.innerHTML = textContent;
      div2_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div1, "class", "absolute inset-0 flex items-center");
      attr(div1, "aria-hidden", "true");
      set_attributes(div2, div_data_2);
    },
    m(target, anchor) {
      insert_hydration(target, div2, anchor);
      append_hydration(div2, div1);
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
            ctx[2].call(null, div2)
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      set_attributes(div2, div_data_2 = get_spread_update(div2_levels, [
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
        detach(div2);
      }
      mounted = false;
      run_all(dispose);
    }
  };
}
const defaultClass$b = "relative my-2 h-px";
function instance$e($$self, $$props, $$invalidate) {
  let finalClass;
  let { use = [] } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  $$self.$$set = ($$new_props) => {
    $$invalidate(3, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
  };
  $$self.$$.update = () => {
    $$invalidate(1, finalClass = twMerge(defaultClass$b, $$props.class));
  };
  $$props = exclude_internal_props($$props);
  return [use, finalClass, forwardEvents, $$props];
}
let Divider$2 = class Divider extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$e, create_fragment$e, safe_not_equal, { use: 0 });
  }
};
const Dropdown2 = Dropdown$1;
Dropdown2.Items = Items;
Dropdown2.Items.Item = Item;
Dropdown2.Items.Divider = Divider$2;
Dropdown2.Items.Item.Icon = Icon$1;
const get_icon_slot_changes$1 = (dirty) => ({});
const get_icon_slot_context$1 = (ctx) => ({});
const get_label_slot_changes$2 = (dirty) => ({});
const get_label_slot_context$2 = (ctx) => ({});
function create_if_block$3(ctx) {
  let div;
  let t0;
  let t1;
  let current;
  const label_slot_template = (
    /*#slots*/
    ctx[7].label
  );
  const label_slot = create_slot(
    label_slot_template,
    ctx,
    /*$$scope*/
    ctx[6],
    get_label_slot_context$2
  );
  const icon_slot_template = (
    /*#slots*/
    ctx[7].icon
  );
  const icon_slot = create_slot(
    icon_slot_template,
    ctx,
    /*$$scope*/
    ctx[6],
    get_icon_slot_context$1
  );
  const default_slot_template = (
    /*#slots*/
    ctx[7].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[6],
    null
  );
  return {
    c() {
      div = element("div");
      if (label_slot)
        label_slot.c();
      t0 = space();
      if (icon_slot)
        icon_slot.c();
      t1 = space();
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      if (label_slot)
        label_slot.l(div_nodes);
      t0 = claim_space(div_nodes);
      if (icon_slot)
        icon_slot.l(div_nodes);
      t1 = claim_space(div_nodes);
      if (default_slot)
        default_slot.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "relative flex");
      toggle_class(
        div,
        "justify-start",
        /*position*/
        ctx[1] === "left"
      );
      toggle_class(
        div,
        "justify-center",
        /*position*/
        ctx[1] === "center"
      );
      toggle_class(
        div,
        "justify-end",
        /*position*/
        ctx[1] === "right"
      );
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (label_slot) {
        label_slot.m(div, null);
      }
      append_hydration(div, t0);
      if (icon_slot) {
        icon_slot.m(div, null);
      }
      append_hydration(div, t1);
      if (default_slot) {
        default_slot.m(div, null);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (label_slot) {
        if (label_slot.p && (!current || dirty & /*$$scope*/
        64)) {
          update_slot_base(
            label_slot,
            label_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[6],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[6]
            ) : get_slot_changes(
              label_slot_template,
              /*$$scope*/
              ctx2[6],
              dirty,
              get_label_slot_changes$2
            ),
            get_label_slot_context$2
          );
        }
      }
      if (icon_slot) {
        if (icon_slot.p && (!current || dirty & /*$$scope*/
        64)) {
          update_slot_base(
            icon_slot,
            icon_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[6],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[6]
            ) : get_slot_changes(
              icon_slot_template,
              /*$$scope*/
              ctx2[6],
              dirty,
              get_icon_slot_changes$1
            ),
            get_icon_slot_context$1
          );
        }
      }
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        64)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[6],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[6]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[6],
              dirty,
              null
            ),
            null
          );
        }
      }
      if (!current || dirty & /*position*/
      2) {
        toggle_class(
          div,
          "justify-start",
          /*position*/
          ctx2[1] === "left"
        );
      }
      if (!current || dirty & /*position*/
      2) {
        toggle_class(
          div,
          "justify-center",
          /*position*/
          ctx2[1] === "center"
        );
      }
      if (!current || dirty & /*position*/
      2) {
        toggle_class(
          div,
          "justify-end",
          /*position*/
          ctx2[1] === "right"
        );
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(label_slot, local);
      transition_in(icon_slot, local);
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(label_slot, local);
      transition_out(icon_slot, local);
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (label_slot)
        label_slot.d(detaching);
      if (icon_slot)
        icon_slot.d(detaching);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_fragment$d(ctx) {
  let div2;
  let div1;
  let textContent = `<div class="w-full border-t border-border"></div>`;
  let t;
  let useActions_action;
  let current;
  let mounted;
  let dispose;
  let if_block = (
    /*$$slots*/
    (ctx[5].label || /*$$slots*/
    ctx[5].icon || /*$$slots*/
    ctx[5].default) && create_if_block$3(ctx)
  );
  let div2_levels = [
    { class: (
      /*finalClass*/
      ctx[2]
    ) },
    exclude(
      /*$$props*/
      ctx[4],
      ["use", "class"]
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
      div1.innerHTML = textContent;
      t = space();
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes) {
      div2 = claim_element(nodes, "DIV", { class: true });
      var div2_nodes = children(div2);
      div1 = claim_element(div2_nodes, "DIV", {
        class: true,
        "aria-hidden": true,
        ["data-svelte-h"]: true
      });
      if (get_svelte_dataset(div1) !== "svelte-qa7ndr")
        div1.innerHTML = textContent;
      t = claim_space(div2_nodes);
      if (if_block)
        if_block.l(div2_nodes);
      div2_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div1, "class", "absolute inset-0 flex items-center");
      attr(div1, "aria-hidden", "true");
      set_attributes(div2, div_data_2);
    },
    m(target, anchor) {
      insert_hydration(target, div2, anchor);
      append_hydration(div2, div1);
      append_hydration(div2, t);
      if (if_block)
        if_block.m(div2, null);
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
            ctx[3].call(null, div2)
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (
        /*$$slots*/
        ctx2[5].label || /*$$slots*/
        ctx2[5].icon || /*$$slots*/
        ctx2[5].default
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*$$slots*/
          32) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$3(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div2, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      set_attributes(div2, div_data_2 = get_spread_update(div2_levels, [
        (!current || dirty & /*finalClass*/
        4) && { class: (
          /*finalClass*/
          ctx2[2]
        ) },
        dirty & /*$$props*/
        16 && exclude(
          /*$$props*/
          ctx2[4],
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
      mounted = false;
      run_all(dispose);
    }
  };
}
const defaultClass$a = "relative my-4";
function instance$d($$self, $$props, $$invalidate) {
  let finalClass;
  let { $$slots: slots = {}, $$scope } = $$props;
  const $$slots = compute_slots(slots);
  let { use = [] } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { position = "center" } = $$props;
  $$self.$$set = ($$new_props) => {
    $$invalidate(4, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("position" in $$new_props)
      $$invalidate(1, position = $$new_props.position);
    if ("$$scope" in $$new_props)
      $$invalidate(6, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    $$invalidate(2, finalClass = twMerge(defaultClass$a, $$props.class));
  };
  $$props = exclude_internal_props($$props);
  return [use, position, finalClass, forwardEvents, $$props, $$slots, $$scope, slots];
}
let Divider$1 = class Divider2 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$d, create_fragment$d, safe_not_equal, { use: 0, position: 1 });
  }
};
function create_fragment$c(ctx) {
  let span;
  let svg;
  let useActions_action;
  let span_style_value;
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
      ctx[10],
      [
        "use",
        "data",
        "class",
        "fill",
        "viewBox",
        "width",
        "height",
        "stroke",
        "style"
      ]
    )
  ];
  let svg_data = {};
  for (let i = 0; i < svg_levels.length; i += 1) {
    svg_data = assign(svg_data, svg_levels[i]);
  }
  return {
    c() {
      span = element("span");
      svg = svg_element("svg");
      this.h();
    },
    l(nodes) {
      span = claim_element(nodes, "SPAN", { class: true, style: true });
      var span_nodes = children(span);
      svg = claim_svg_element(span_nodes, "svg", {
        xmlns: true,
        width: true,
        height: true,
        viewBox: true,
        stroke: true,
        fill: true,
        color: true
      });
      var svg_nodes = children(svg);
      svg_nodes.forEach(detach);
      span_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_svg_attributes(svg, svg_data);
      attr(
        span,
        "class",
        /*finalClass*/
        ctx[7]
      );
      attr(span, "style", span_style_value = /*$$props*/
      ctx[10].style);
    },
    m(target, anchor) {
      insert_hydration(target, span, anchor);
      append_hydration(span, svg);
      svg.innerHTML = /*elements*/
      ctx[8];
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
            ctx[9].call(null, svg)
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*elements*/
      256)
        svg.innerHTML = /*elements*/
        ctx2[8];
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
        1024 && exclude(
          /*$$props*/
          ctx2[10],
          [
            "use",
            "data",
            "class",
            "fill",
            "viewBox",
            "width",
            "height",
            "stroke",
            "style"
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
      if (dirty & /*finalClass*/
      128) {
        attr(
          span,
          "class",
          /*finalClass*/
          ctx2[7]
        );
      }
      if (dirty & /*$$props*/
      1024 && span_style_value !== (span_style_value = /*$$props*/
      ctx2[10].style)) {
        attr(span, "style", span_style_value);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(span);
      }
      mounted = false;
      run_all(dispose);
    }
  };
}
const defaultClass$9 = "px-2 bg-surface text-content";
function extractViewBox(svg) {
  const regex = /viewBox="([\d\- ]+)"/;
  const res = regex.exec(svg);
  if (!res)
    return "0 0 24 24";
  return res[1];
}
function instance$c($$self, $$props, $$invalidate) {
  let elements;
  let finalClass;
  let { use = [] } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { data = "" } = $$props;
  let { viewBox = extractViewBox(data) } = $$props;
  let { size = "24px" } = $$props;
  let { width = size } = $$props;
  let { height = size } = $$props;
  let { color = "currentColor" } = $$props;
  let { stroke = void 0 } = $$props;
  let { fill = color } = $$props;
  $$self.$$set = ($$new_props) => {
    $$invalidate(10, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("data" in $$new_props)
      $$invalidate(11, data = $$new_props.data);
    if ("viewBox" in $$new_props)
      $$invalidate(1, viewBox = $$new_props.viewBox);
    if ("size" in $$new_props)
      $$invalidate(12, size = $$new_props.size);
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
    2048) {
      $$invalidate(8, elements = data.replace(/<svg ([^>]*)>/, "").replace("</svg>", ""));
    }
    $$invalidate(7, finalClass = twMerge(defaultClass$9, $$props.class));
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
    finalClass,
    elements,
    forwardEvents,
    $$props,
    data,
    size
  ];
}
class Icon extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$c, create_fragment$c, safe_not_equal, {
      use: 0,
      data: 11,
      viewBox: 1,
      size: 12,
      width: 2,
      height: 3,
      color: 4,
      stroke: 5,
      fill: 6
    });
  }
}
function create_fragment$b(ctx) {
  let span;
  let useActions_action;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = (
    /*#slots*/
    ctx[5].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[4],
    null
  );
  let span_levels = [
    { class: (
      /*finalClass*/
      ctx[1]
    ) },
    exclude(
      /*$$props*/
      ctx[3],
      ["use", "class"]
    )
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
            ctx[2].call(null, span)
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        16)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[4],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[4]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[4],
              dirty,
              null
            ),
            null
          );
        }
      }
      set_attributes(span, span_data = get_spread_update(span_levels, [
        (!current || dirty & /*finalClass*/
        2) && { class: (
          /*finalClass*/
          ctx2[1]
        ) },
        dirty & /*$$props*/
        8 && exclude(
          /*$$props*/
          ctx2[3],
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
        detach(span);
      }
      if (default_slot)
        default_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
const defaultClass$8 = "text-sm px-2 bg-surface text-content";
function instance$b($$self, $$props, $$invalidate) {
  let finalClass;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { use = [] } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  $$self.$$set = ($$new_props) => {
    $$invalidate(3, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("$$scope" in $$new_props)
      $$invalidate(4, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    $$invalidate(1, finalClass = twMerge(defaultClass$8, $$props.class));
  };
  $$props = exclude_internal_props($$props);
  return [use, finalClass, forwardEvents, $$props, $$scope, slots];
}
let Label$1 = class Label extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$b, create_fragment$b, safe_not_equal, { use: 0 });
  }
};
const Divider3 = Divider$1;
Divider3.Icon = Icon;
Divider3.Label = Label$1;
const get_content_right_slot_changes = (dirty) => ({});
const get_content_right_slot_context = (ctx) => ({});
const get_right_icon_slot_changes = (dirty) => ({});
const get_right_icon_slot_context = (ctx) => ({});
const get_left_icon_slot_changes = (dirty) => ({});
const get_left_icon_slot_context = (ctx) => ({});
const get_content_left_slot_changes = (dirty) => ({});
const get_content_left_slot_context = (ctx) => ({});
function create_if_block_2$1(ctx) {
  let span;
  let current;
  const left_icon_slot_template = (
    /*#slots*/
    ctx[8]["left-icon"]
  );
  const left_icon_slot = create_slot(
    left_icon_slot_template,
    ctx,
    /*$$scope*/
    ctx[7],
    get_left_icon_slot_context
  );
  return {
    c() {
      span = element("span");
      if (left_icon_slot)
        left_icon_slot.c();
      this.h();
    },
    l(nodes) {
      span = claim_element(nodes, "SPAN", { class: true });
      var span_nodes = children(span);
      if (left_icon_slot)
        left_icon_slot.l(span_nodes);
      span_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(span, "class", "text-sm absolute left-0.5 flex items-center justify-center h-4 w-4");
    },
    m(target, anchor) {
      insert_hydration(target, span, anchor);
      if (left_icon_slot) {
        left_icon_slot.m(span, null);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (left_icon_slot) {
        if (left_icon_slot.p && (!current || dirty & /*$$scope*/
        128)) {
          update_slot_base(
            left_icon_slot,
            left_icon_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[7],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[7]
            ) : get_slot_changes(
              left_icon_slot_template,
              /*$$scope*/
              ctx2[7],
              dirty,
              get_left_icon_slot_changes
            ),
            get_left_icon_slot_context
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(left_icon_slot, local);
      current = true;
    },
    o(local) {
      transition_out(left_icon_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
      if (left_icon_slot)
        left_icon_slot.d(detaching);
    }
  };
}
function create_if_block_1$2(ctx) {
  let span;
  let current;
  const right_icon_slot_template = (
    /*#slots*/
    ctx[8]["right-icon"]
  );
  const right_icon_slot = create_slot(
    right_icon_slot_template,
    ctx,
    /*$$scope*/
    ctx[7],
    get_right_icon_slot_context
  );
  return {
    c() {
      span = element("span");
      if (right_icon_slot)
        right_icon_slot.c();
      this.h();
    },
    l(nodes) {
      span = claim_element(nodes, "SPAN", { class: true });
      var span_nodes = children(span);
      if (right_icon_slot)
        right_icon_slot.l(span_nodes);
      span_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(span, "class", "text-sm absolute right-0.5 flex items-center justify-center h-4 w-4");
    },
    m(target, anchor) {
      insert_hydration(target, span, anchor);
      if (right_icon_slot) {
        right_icon_slot.m(span, null);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (right_icon_slot) {
        if (right_icon_slot.p && (!current || dirty & /*$$scope*/
        128)) {
          update_slot_base(
            right_icon_slot,
            right_icon_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[7],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[7]
            ) : get_slot_changes(
              right_icon_slot_template,
              /*$$scope*/
              ctx2[7],
              dirty,
              get_right_icon_slot_changes
            ),
            get_right_icon_slot_context
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(right_icon_slot, local);
      current = true;
    },
    o(local) {
      transition_out(right_icon_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
      if (right_icon_slot)
        right_icon_slot.d(detaching);
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
        ctx[2]
      );
      this.h();
    },
    l(nodes) {
      p = claim_element(nodes, "P", { class: true, id: true });
      var p_nodes = children(p);
      t = claim_text(
        p_nodes,
        /*error*/
        ctx[2]
      );
      p_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(p, "class", "!mt-2 text-sm text-danger");
      attr(p, "id", p_id_value = /*name*/
      ctx[1] + "-error");
    },
    m(target, anchor) {
      insert_hydration(target, p, anchor);
      append_hydration(p, t);
      current = true;
    },
    p(ctx2, dirty) {
      if (!current || dirty & /*error*/
      4)
        set_data(
          t,
          /*error*/
          ctx2[2]
        );
      if (!current || dirty & /*name*/
      2 && p_id_value !== (p_id_value = /*name*/
      ctx2[1] + "-error")) {
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
function create_fragment$a(ctx) {
  let div2;
  let div1;
  let t0;
  let div0;
  let button;
  let span;
  let span_class_value;
  let t1;
  let input;
  let t2;
  let t3;
  let div0_class_value;
  let t4;
  let t5;
  let current;
  let mounted;
  let dispose;
  const content_left_slot_template = (
    /*#slots*/
    ctx[8]["content-left"]
  );
  const content_left_slot = create_slot(
    content_left_slot_template,
    ctx,
    /*$$scope*/
    ctx[7],
    get_content_left_slot_context
  );
  let if_block0 = (
    /*$$slots*/
    ctx[6]["left-icon"] && create_if_block_2$1(ctx)
  );
  let if_block1 = (
    /*$$slots*/
    ctx[6]["right-icon"] && create_if_block_1$2(ctx)
  );
  const content_right_slot_template = (
    /*#slots*/
    ctx[8]["content-right"]
  );
  const content_right_slot = create_slot(
    content_right_slot_template,
    ctx,
    /*$$scope*/
    ctx[7],
    get_content_right_slot_context
  );
  let if_block2 = (
    /*error*/
    ctx[2] && create_if_block$2(ctx)
  );
  return {
    c() {
      div2 = element("div");
      div1 = element("div");
      if (content_left_slot)
        content_left_slot.c();
      t0 = space();
      div0 = element("div");
      button = element("button");
      span = element("span");
      t1 = space();
      input = element("input");
      t2 = space();
      if (if_block0)
        if_block0.c();
      t3 = space();
      if (if_block1)
        if_block1.c();
      t4 = space();
      if (content_right_slot)
        content_right_slot.c();
      t5 = space();
      if (if_block2)
        if_block2.c();
      this.h();
    },
    l(nodes) {
      div2 = claim_element(nodes, "DIV", { class: true });
      var div2_nodes = children(div2);
      div1 = claim_element(div2_nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      if (content_left_slot)
        content_left_slot.l(div1_nodes);
      t0 = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      button = claim_element(div0_nodes, "BUTTON", {
        "aria-label": true,
        type: true,
        class: true
      });
      var button_nodes = children(button);
      span = claim_element(button_nodes, "SPAN", { "aria-hidden": true, class: true });
      children(span).forEach(detach);
      t1 = claim_space(button_nodes);
      input = claim_element(button_nodes, "INPUT", {
        type: true,
        class: true,
        name: true,
        id: true
      });
      t2 = claim_space(button_nodes);
      if (if_block0)
        if_block0.l(button_nodes);
      t3 = claim_space(button_nodes);
      if (if_block1)
        if_block1.l(button_nodes);
      button_nodes.forEach(detach);
      div0_nodes.forEach(detach);
      t4 = claim_space(div1_nodes);
      if (content_right_slot)
        content_right_slot.l(div1_nodes);
      div1_nodes.forEach(detach);
      t5 = claim_space(div2_nodes);
      if (if_block2)
        if_block2.l(div2_nodes);
      div2_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(span, "aria-hidden", "true");
      attr(span, "class", span_class_value = "relative z-10 inline-block bg-surface h-5 w-5 rounded-full shadow transform transition-transform ease-in-out duration-150 border border-border " + /*translate*/
      ctx[3]);
      attr(input, "type", "checkbox");
      attr(input, "class", "hidden");
      attr(
        input,
        "name",
        /*name*/
        ctx[1]
      );
      attr(
        input,
        "id",
        /*name*/
        ctx[1]
      );
      input.checked = /*on*/
      ctx[0];
      attr(button, "aria-label", "toggle");
      attr(button, "type", "button");
      attr(button, "class", "relative inline-flex items-center justify-between flex-shrink-0 h-full w-full border-2 border-transparent rounded-full cursor-pointer ease-in-out outline-none focus:outline-none");
      toggle_class(button, "bg-default", !/*on*/
      ctx[0]);
      toggle_class(
        button,
        "bg-primary",
        /*on*/
        ctx[0]
      );
      attr(div0, "class", div0_class_value = "border border-border relative inline-flex flex-shrink-0 h-[1.6rem] rounded-full cursor-pointer outline-none focus:outline-none " + /*width*/
      ctx[4]);
      attr(div1, "class", "flex items-center");
      attr(div2, "class", "flex flex-col");
    },
    m(target, anchor) {
      insert_hydration(target, div2, anchor);
      append_hydration(div2, div1);
      if (content_left_slot) {
        content_left_slot.m(div1, null);
      }
      append_hydration(div1, t0);
      append_hydration(div1, div0);
      append_hydration(div0, button);
      append_hydration(button, span);
      append_hydration(button, t1);
      append_hydration(button, input);
      append_hydration(button, t2);
      if (if_block0)
        if_block0.m(button, null);
      append_hydration(button, t3);
      if (if_block1)
        if_block1.m(button, null);
      append_hydration(div1, t4);
      if (content_right_slot) {
        content_right_slot.m(div1, null);
      }
      append_hydration(div2, t5);
      if (if_block2)
        if_block2.m(div2, null);
      current = true;
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*toggle*/
          ctx[5]
        );
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (content_left_slot) {
        if (content_left_slot.p && (!current || dirty & /*$$scope*/
        128)) {
          update_slot_base(
            content_left_slot,
            content_left_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[7],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[7]
            ) : get_slot_changes(
              content_left_slot_template,
              /*$$scope*/
              ctx2[7],
              dirty,
              get_content_left_slot_changes
            ),
            get_content_left_slot_context
          );
        }
      }
      if (!current || dirty & /*translate*/
      8 && span_class_value !== (span_class_value = "relative z-10 inline-block bg-surface h-5 w-5 rounded-full shadow transform transition-transform ease-in-out duration-150 border border-border " + /*translate*/
      ctx2[3])) {
        attr(span, "class", span_class_value);
      }
      if (!current || dirty & /*name*/
      2) {
        attr(
          input,
          "name",
          /*name*/
          ctx2[1]
        );
      }
      if (!current || dirty & /*name*/
      2) {
        attr(
          input,
          "id",
          /*name*/
          ctx2[1]
        );
      }
      if (!current || dirty & /*on*/
      1) {
        input.checked = /*on*/
        ctx2[0];
      }
      if (
        /*$$slots*/
        ctx2[6]["left-icon"]
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty & /*$$slots*/
          64) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_2$1(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(button, t3);
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
        ctx2[6]["right-icon"]
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty & /*$$slots*/
          64) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_1$2(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(button, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
      if (!current || dirty & /*on*/
      1) {
        toggle_class(button, "bg-default", !/*on*/
        ctx2[0]);
      }
      if (!current || dirty & /*on*/
      1) {
        toggle_class(
          button,
          "bg-primary",
          /*on*/
          ctx2[0]
        );
      }
      if (!current || dirty & /*width*/
      16 && div0_class_value !== (div0_class_value = "border border-border relative inline-flex flex-shrink-0 h-[1.6rem] rounded-full cursor-pointer outline-none focus:outline-none " + /*width*/
      ctx2[4])) {
        attr(div0, "class", div0_class_value);
      }
      if (content_right_slot) {
        if (content_right_slot.p && (!current || dirty & /*$$scope*/
        128)) {
          update_slot_base(
            content_right_slot,
            content_right_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[7],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[7]
            ) : get_slot_changes(
              content_right_slot_template,
              /*$$scope*/
              ctx2[7],
              dirty,
              get_content_right_slot_changes
            ),
            get_content_right_slot_context
          );
        }
      }
      if (
        /*error*/
        ctx2[2]
      ) {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
          if (dirty & /*error*/
          4) {
            transition_in(if_block2, 1);
          }
        } else {
          if_block2 = create_if_block$2(ctx2);
          if_block2.c();
          transition_in(if_block2, 1);
          if_block2.m(div2, null);
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
      transition_in(content_left_slot, local);
      transition_in(if_block0);
      transition_in(if_block1);
      transition_in(content_right_slot, local);
      transition_in(if_block2);
      current = true;
    },
    o(local) {
      transition_out(content_left_slot, local);
      transition_out(if_block0);
      transition_out(if_block1);
      transition_out(content_right_slot, local);
      transition_out(if_block2);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div2);
      }
      if (content_left_slot)
        content_left_slot.d(detaching);
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
      if (content_right_slot)
        content_right_slot.d(detaching);
      if (if_block2)
        if_block2.d();
      mounted = false;
      dispose();
    }
  };
}
function instance$a($$self, $$props, $$invalidate) {
  let width;
  let translate;
  let { $$slots: slots = {}, $$scope } = $$props;
  const $$slots = compute_slots(slots);
  let { name } = $$props;
  let { on = false } = $$props;
  let { error = void 0 } = $$props;
  function toggle() {
    $$invalidate(0, on = !on);
  }
  function toggleOn() {
    $$invalidate(0, on = true);
  }
  function toggleOff() {
    $$invalidate(0, on = false);
  }
  setContext("toggle-name", name);
  setContext("toggle-on", toggleOn);
  setContext("toggle-off", toggleOff);
  $$self.$$set = ($$props2) => {
    if ("name" in $$props2)
      $$invalidate(1, name = $$props2.name);
    if ("on" in $$props2)
      $$invalidate(0, on = $$props2.on);
    if ("error" in $$props2)
      $$invalidate(2, error = $$props2.error);
    if ("$$scope" in $$props2)
      $$invalidate(7, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*on*/
    1) {
      $$invalidate(3, translate = on && ($$slots["left-icon"] || $$slots["right-icon"]) ? "translate-x-[calc(100%+0.1rem)]" : !on ? "translate-x-[0.1rem]" : "translate-x-[calc(100%-0.1rem)]");
    }
  };
  $$invalidate(4, width = $$slots["left-icon"] || $$slots["right-icon"] ? "w-[48px]" : "w-[2.8rem]");
  return [on, name, error, translate, width, toggle, $$slots, $$scope, slots];
}
let Toggle$1 = class Toggle extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$a, create_fragment$a, safe_not_equal, { name: 1, on: 0, error: 2 });
  }
};
const get_description_slot_changes$2 = (dirty) => ({});
const get_description_slot_context$2 = (ctx) => ({});
const get_label_slot_changes$1 = (dirty) => ({});
const get_label_slot_context$1 = (ctx) => ({});
function create_fragment$9(ctx) {
  let button;
  let t;
  let button_id_value;
  let useActions_action;
  let current;
  let mounted;
  let dispose;
  const label_slot_template = (
    /*#slots*/
    ctx[7].label
  );
  const label_slot = create_slot(
    label_slot_template,
    ctx,
    /*$$scope*/
    ctx[6],
    get_label_slot_context$1
  );
  const description_slot_template = (
    /*#slots*/
    ctx[7].description
  );
  const description_slot = create_slot(
    description_slot_template,
    ctx,
    /*$$scope*/
    ctx[6],
    get_description_slot_context$2
  );
  let button_levels = [
    { type: "button" },
    { tabindex: "-1" },
    {
      id: button_id_value = /*name*/
      ctx[3] + "-label-left"
    },
    { class: (
      /*finalClass*/
      ctx[1]
    ) },
    exclude(
      /*$$props*/
      ctx[5],
      ["use", "class", "id", "on:click"]
    )
  ];
  let button_data = {};
  for (let i = 0; i < button_levels.length; i += 1) {
    button_data = assign(button_data, button_levels[i]);
  }
  return {
    c() {
      button = element("button");
      if (label_slot)
        label_slot.c();
      t = space();
      if (description_slot)
        description_slot.c();
      this.h();
    },
    l(nodes) {
      button = claim_element(nodes, "BUTTON", {
        type: true,
        tabindex: true,
        id: true,
        class: true
      });
      var button_nodes = children(button);
      if (label_slot)
        label_slot.l(button_nodes);
      t = claim_space(button_nodes);
      if (description_slot)
        description_slot.l(button_nodes);
      button_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(button, button_data);
    },
    m(target, anchor) {
      insert_hydration(target, button, anchor);
      if (label_slot) {
        label_slot.m(button, null);
      }
      append_hydration(button, t);
      if (description_slot) {
        description_slot.m(button, null);
      }
      if (button.autofocus)
        button.focus();
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            button,
            "click",
            /*toggleOff*/
            ctx[4]
          ),
          action_destroyer(useActions_action = useActions.call(
            null,
            button,
            /*use*/
            ctx[0]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[2].call(null, button)
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (label_slot) {
        if (label_slot.p && (!current || dirty & /*$$scope*/
        64)) {
          update_slot_base(
            label_slot,
            label_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[6],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[6]
            ) : get_slot_changes(
              label_slot_template,
              /*$$scope*/
              ctx2[6],
              dirty,
              get_label_slot_changes$1
            ),
            get_label_slot_context$1
          );
        }
      }
      if (description_slot) {
        if (description_slot.p && (!current || dirty & /*$$scope*/
        64)) {
          update_slot_base(
            description_slot,
            description_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[6],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[6]
            ) : get_slot_changes(
              description_slot_template,
              /*$$scope*/
              ctx2[6],
              dirty,
              get_description_slot_changes$2
            ),
            get_description_slot_context$2
          );
        }
      }
      set_attributes(button, button_data = get_spread_update(button_levels, [
        { type: "button" },
        { tabindex: "-1" },
        { id: button_id_value },
        (!current || dirty & /*finalClass*/
        2) && { class: (
          /*finalClass*/
          ctx2[1]
        ) },
        dirty & /*$$props*/
        32 && exclude(
          /*$$props*/
          ctx2[5],
          ["use", "class", "id", "on:click"]
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
      transition_in(label_slot, local);
      transition_in(description_slot, local);
      current = true;
    },
    o(local) {
      transition_out(label_slot, local);
      transition_out(description_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      if (label_slot)
        label_slot.d(detaching);
      if (description_slot)
        description_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
const defaultClass$7 = "mr-3 cursor-pointer";
function instance$9($$self, $$props, $$invalidate) {
  let finalClass;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { use = [] } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  const name = getContext("toggle-name");
  const toggleOff = getContext("toggle-off");
  $$self.$$set = ($$new_props) => {
    $$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("$$scope" in $$new_props)
      $$invalidate(6, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    $$invalidate(1, finalClass = twMerge(defaultClass$7, $$props.class));
  };
  $$props = exclude_internal_props($$props);
  return [use, finalClass, forwardEvents, name, toggleOff, $$props, $$scope, slots];
}
class ContentLeft extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$9, create_fragment$9, safe_not_equal, { use: 0 });
  }
}
const get_description_slot_changes$1 = (dirty) => ({});
const get_description_slot_context$1 = (ctx) => ({});
const get_label_slot_changes = (dirty) => ({});
const get_label_slot_context = (ctx) => ({});
function create_fragment$8(ctx) {
  let button;
  let t;
  let button_id_value;
  let useActions_action;
  let current;
  let mounted;
  let dispose;
  const label_slot_template = (
    /*#slots*/
    ctx[7].label
  );
  const label_slot = create_slot(
    label_slot_template,
    ctx,
    /*$$scope*/
    ctx[6],
    get_label_slot_context
  );
  const description_slot_template = (
    /*#slots*/
    ctx[7].description
  );
  const description_slot = create_slot(
    description_slot_template,
    ctx,
    /*$$scope*/
    ctx[6],
    get_description_slot_context$1
  );
  let button_levels = [
    { type: "button" },
    { tabindex: "-1" },
    {
      id: button_id_value = /*name*/
      ctx[3] + "-label-right"
    },
    { class: (
      /*finalClass*/
      ctx[1]
    ) },
    exclude(
      /*$$props*/
      ctx[5],
      ["use", "class", "id", "on:click"]
    )
  ];
  let button_data = {};
  for (let i = 0; i < button_levels.length; i += 1) {
    button_data = assign(button_data, button_levels[i]);
  }
  return {
    c() {
      button = element("button");
      if (label_slot)
        label_slot.c();
      t = space();
      if (description_slot)
        description_slot.c();
      this.h();
    },
    l(nodes) {
      button = claim_element(nodes, "BUTTON", {
        type: true,
        tabindex: true,
        id: true,
        class: true
      });
      var button_nodes = children(button);
      if (label_slot)
        label_slot.l(button_nodes);
      t = claim_space(button_nodes);
      if (description_slot)
        description_slot.l(button_nodes);
      button_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(button, button_data);
    },
    m(target, anchor) {
      insert_hydration(target, button, anchor);
      if (label_slot) {
        label_slot.m(button, null);
      }
      append_hydration(button, t);
      if (description_slot) {
        description_slot.m(button, null);
      }
      if (button.autofocus)
        button.focus();
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            button,
            "click",
            /*toggleOn*/
            ctx[4]
          ),
          action_destroyer(useActions_action = useActions.call(
            null,
            button,
            /*use*/
            ctx[0]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[2].call(null, button)
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (label_slot) {
        if (label_slot.p && (!current || dirty & /*$$scope*/
        64)) {
          update_slot_base(
            label_slot,
            label_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[6],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[6]
            ) : get_slot_changes(
              label_slot_template,
              /*$$scope*/
              ctx2[6],
              dirty,
              get_label_slot_changes
            ),
            get_label_slot_context
          );
        }
      }
      if (description_slot) {
        if (description_slot.p && (!current || dirty & /*$$scope*/
        64)) {
          update_slot_base(
            description_slot,
            description_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[6],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[6]
            ) : get_slot_changes(
              description_slot_template,
              /*$$scope*/
              ctx2[6],
              dirty,
              get_description_slot_changes$1
            ),
            get_description_slot_context$1
          );
        }
      }
      set_attributes(button, button_data = get_spread_update(button_levels, [
        { type: "button" },
        { tabindex: "-1" },
        { id: button_id_value },
        (!current || dirty & /*finalClass*/
        2) && { class: (
          /*finalClass*/
          ctx2[1]
        ) },
        dirty & /*$$props*/
        32 && exclude(
          /*$$props*/
          ctx2[5],
          ["use", "class", "id", "on:click"]
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
      transition_in(label_slot, local);
      transition_in(description_slot, local);
      current = true;
    },
    o(local) {
      transition_out(label_slot, local);
      transition_out(description_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      if (label_slot)
        label_slot.d(detaching);
      if (description_slot)
        description_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
const defaultClass$6 = "ml-3 cursor-pointer";
function instance$8($$self, $$props, $$invalidate) {
  let finalClass;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { use = [] } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  const name = getContext("toggle-name");
  const toggleOn = getContext("toggle-on");
  $$self.$$set = ($$new_props) => {
    $$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("$$scope" in $$new_props)
      $$invalidate(6, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    $$invalidate(1, finalClass = twMerge(defaultClass$6, $$props.class));
  };
  $$props = exclude_internal_props($$props);
  return [use, finalClass, forwardEvents, name, toggleOn, $$props, $$scope, slots];
}
class ContentRight extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$8, create_fragment$8, safe_not_equal, { use: 0 });
  }
}
function create_fragment$7(ctx) {
  let span;
  let useActions_action;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = (
    /*#slots*/
    ctx[5].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[4],
    null
  );
  let span_levels = [
    { class: (
      /*finalClass*/
      ctx[1]
    ) },
    exclude(
      /*$$props*/
      ctx[3],
      ["use", "class"]
    )
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
            ctx[2].call(null, span)
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        16)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[4],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[4]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[4],
              dirty,
              null
            ),
            null
          );
        }
      }
      set_attributes(span, span_data = get_spread_update(span_levels, [
        (!current || dirty & /*finalClass*/
        2) && { class: (
          /*finalClass*/
          ctx2[1]
        ) },
        dirty & /*$$props*/
        8 && exclude(
          /*$$props*/
          ctx2[3],
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
        detach(span);
      }
      if (default_slot)
        default_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
const defaultClass$5 = "text-sm font-medium text-content";
function instance$7($$self, $$props, $$invalidate) {
  let finalClass;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { use = [] } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  $$self.$$set = ($$new_props) => {
    $$invalidate(3, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("$$scope" in $$new_props)
      $$invalidate(4, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    $$invalidate(1, finalClass = twMerge(defaultClass$5, $$props.class));
  };
  $$props = exclude_internal_props($$props);
  return [use, finalClass, forwardEvents, $$props, $$scope, slots];
}
class Label2 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$7, create_fragment$7, safe_not_equal, { use: 0 });
  }
}
function create_fragment$6(ctx) {
  let span;
  let useActions_action;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = (
    /*#slots*/
    ctx[5].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[4],
    null
  );
  let span_levels = [
    { class: (
      /*finalClass*/
      ctx[1]
    ) },
    exclude(
      /*$$props*/
      ctx[3],
      ["use", "class"]
    )
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
            ctx[2].call(null, span)
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        16)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[4],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[4]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[4],
              dirty,
              null
            ),
            null
          );
        }
      }
      set_attributes(span, span_data = get_spread_update(span_levels, [
        (!current || dirty & /*finalClass*/
        2) && { class: (
          /*finalClass*/
          ctx2[1]
        ) },
        dirty & /*$$props*/
        8 && exclude(
          /*$$props*/
          ctx2[3],
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
        detach(span);
      }
      if (default_slot)
        default_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
const defaultClass$4 = "text-sm text-secondary-content";
function instance$6($$self, $$props, $$invalidate) {
  let finalClass;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { use = [] } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  $$self.$$set = ($$new_props) => {
    $$invalidate(3, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("$$scope" in $$new_props)
      $$invalidate(4, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    $$invalidate(1, finalClass = twMerge(defaultClass$4, $$props.class));
  };
  $$props = exclude_internal_props($$props);
  return [use, finalClass, forwardEvents, $$props, $$scope, slots];
}
let Description$1 = class Description extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$6, create_fragment$6, safe_not_equal, { use: 0 });
  }
};
const Toggle2 = Toggle$1;
Toggle2.ContentLeft = ContentLeft;
Toggle2.ContentRight = ContentRight;
Toggle2.LeftIcon = Icon$1;
Toggle2.RightIcon = Icon$1;
Toggle2.ContentLeft.Label = Label2;
Toggle2.ContentLeft.Description = Description$1;
Toggle2.ContentRight.Label = Label2;
Toggle2.ContentRight.Description = Description$1;
const get_content_slot_changes = (dirty) => ({});
const get_content_slot_context = (ctx) => ({});
const get_avatar_slot_changes = (dirty) => ({});
const get_avatar_slot_context = (ctx) => ({});
function create_fragment$5(ctx) {
  let div;
  let t0;
  let t1;
  let useActions_action;
  let current;
  let mounted;
  let dispose;
  const avatar_slot_template = (
    /*#slots*/
    ctx[5].avatar
  );
  const avatar_slot = create_slot(
    avatar_slot_template,
    ctx,
    /*$$scope*/
    ctx[4],
    get_avatar_slot_context
  );
  const content_slot_template = (
    /*#slots*/
    ctx[5].content
  );
  const content_slot = create_slot(
    content_slot_template,
    ctx,
    /*$$scope*/
    ctx[4],
    get_content_slot_context
  );
  const default_slot_template = (
    /*#slots*/
    ctx[5].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[4],
    null
  );
  let div_levels = [
    { class: (
      /*finalClass*/
      ctx[1]
    ) },
    exclude(
      /*$$props*/
      ctx[3],
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
      if (avatar_slot)
        avatar_slot.c();
      t0 = space();
      if (content_slot)
        content_slot.c();
      t1 = space();
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      if (avatar_slot)
        avatar_slot.l(div_nodes);
      t0 = claim_space(div_nodes);
      if (content_slot)
        content_slot.l(div_nodes);
      t1 = claim_space(div_nodes);
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
      if (avatar_slot) {
        avatar_slot.m(div, null);
      }
      append_hydration(div, t0);
      if (content_slot) {
        content_slot.m(div, null);
      }
      append_hydration(div, t1);
      if (default_slot) {
        default_slot.m(div, null);
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
            ctx[2].call(null, div)
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (avatar_slot) {
        if (avatar_slot.p && (!current || dirty & /*$$scope*/
        16)) {
          update_slot_base(
            avatar_slot,
            avatar_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[4],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[4]
            ) : get_slot_changes(
              avatar_slot_template,
              /*$$scope*/
              ctx2[4],
              dirty,
              get_avatar_slot_changes
            ),
            get_avatar_slot_context
          );
        }
      }
      if (content_slot) {
        if (content_slot.p && (!current || dirty & /*$$scope*/
        16)) {
          update_slot_base(
            content_slot,
            content_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[4],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[4]
            ) : get_slot_changes(
              content_slot_template,
              /*$$scope*/
              ctx2[4],
              dirty,
              get_content_slot_changes
            ),
            get_content_slot_context
          );
        }
      }
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        16)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[4],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[4]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[4],
              dirty,
              null
            ),
            null
          );
        }
      }
      set_attributes(div, div_data = get_spread_update(div_levels, [
        (!current || dirty & /*finalClass*/
        2) && { class: (
          /*finalClass*/
          ctx2[1]
        ) },
        dirty & /*$$props*/
        8 && exclude(
          /*$$props*/
          ctx2[3],
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
      transition_in(avatar_slot, local);
      transition_in(content_slot, local);
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(avatar_slot, local);
      transition_out(content_slot, local);
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (avatar_slot)
        avatar_slot.d(detaching);
      if (content_slot)
        content_slot.d(detaching);
      if (default_slot)
        default_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
const defaultClass$3 = "flex";
function instance$5($$self, $$props, $$invalidate) {
  let finalClass;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { use = [] } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  $$self.$$set = ($$new_props) => {
    $$invalidate(3, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("$$scope" in $$new_props)
      $$invalidate(4, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    $$invalidate(1, finalClass = twMerge(defaultClass$3, $$props.class));
  };
  $$props = exclude_internal_props($$props);
  return [use, finalClass, forwardEvents, $$props, $$scope, slots];
}
let Media$1 = class Media extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$5, create_fragment$5, safe_not_equal, { use: 0 });
  }
};
const Placeholder_svelte_svelte_type_style_lang = "";
const get_icon_slot_changes = (dirty) => ({});
const get_icon_slot_context = (ctx) => ({});
function create_if_block_1$1(ctx) {
  let span;
  let icon;
  let span_class_value;
  let current;
  icon = new Icon$1({
    props: { data: account, size: (
      /*iconSize*/
      ctx[2]
    ) }
  });
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
      attr(span, "class", span_class_value = null_to_empty(
        /*iconContainerClass*/
        ctx[3]
      ) + " svelte-13m79ia");
    },
    m(target, anchor) {
      insert_hydration(target, span, anchor);
      mount_component(icon, span, null);
      current = true;
    },
    p(ctx2, dirty) {
      const icon_changes = {};
      if (dirty & /*iconSize*/
      4)
        icon_changes.size = /*iconSize*/
        ctx2[2];
      icon.$set(icon_changes);
      if (!current || dirty & /*iconContainerClass*/
      8 && span_class_value !== (span_class_value = null_to_empty(
        /*iconContainerClass*/
        ctx2[3]
      ) + " svelte-13m79ia")) {
        attr(span, "class", span_class_value);
      }
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
        detach(span);
      }
      destroy_component(icon);
    }
  };
}
function create_if_block$1(ctx) {
  let t;
  let current;
  const icon_slot_template = (
    /*#slots*/
    ctx[10].icon
  );
  const icon_slot = create_slot(
    icon_slot_template,
    ctx,
    /*$$scope*/
    ctx[9],
    get_icon_slot_context
  );
  const default_slot_template = (
    /*#slots*/
    ctx[10].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[9],
    null
  );
  return {
    c() {
      if (icon_slot)
        icon_slot.c();
      t = space();
      if (default_slot)
        default_slot.c();
    },
    l(nodes) {
      if (icon_slot)
        icon_slot.l(nodes);
      t = claim_space(nodes);
      if (default_slot)
        default_slot.l(nodes);
    },
    m(target, anchor) {
      if (icon_slot) {
        icon_slot.m(target, anchor);
      }
      insert_hydration(target, t, anchor);
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (icon_slot) {
        if (icon_slot.p && (!current || dirty & /*$$scope*/
        512)) {
          update_slot_base(
            icon_slot,
            icon_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[9],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[9]
            ) : get_slot_changes(
              icon_slot_template,
              /*$$scope*/
              ctx2[9],
              dirty,
              get_icon_slot_changes
            ),
            get_icon_slot_context
          );
        }
      }
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        512)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[9],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[9]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[9],
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
      transition_in(icon_slot, local);
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(icon_slot, local);
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
      if (icon_slot)
        icon_slot.d(detaching);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_fragment$4(ctx) {
  let div;
  let current_block_type_index;
  let if_block;
  let useActions_action;
  let div_transition;
  let current;
  let mounted;
  let dispose;
  const if_block_creators = [create_if_block$1, create_if_block_1$1];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*$$slots*/
      ctx2[7].icon || /*$$slots*/
      ctx2[7].default
    )
      return 0;
    if (
      /*placeholder*/
      ctx2[5]
    )
      return 1;
    return -1;
  }
  if (~(current_block_type_index = select_block_type(ctx))) {
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  let div_levels = [
    { class: (
      /*finalClass*/
      ctx[1]
    ) },
    exclude(
      /*$$props*/
      ctx[6],
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
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      if (if_block)
        if_block.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(div, div_data);
      toggle_class(div, "svelte-13m79ia", true);
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(div, null);
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
          if_block.m(div, null);
        } else {
          if_block = null;
        }
      }
      set_attributes(div, div_data = get_spread_update(div_levels, [
        (!current || dirty & /*finalClass*/
        2) && { class: (
          /*finalClass*/
          ctx2[1]
        ) },
        dirty & /*$$props*/
        64 && exclude(
          /*$$props*/
          ctx2[6],
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
      toggle_class(div, "svelte-13m79ia", true);
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      if (local) {
        add_render_callback(() => {
          if (!current)
            return;
          if (!div_transition)
            div_transition = create_bidirectional_transition(div, fade, {}, true);
          div_transition.run(1);
        });
      }
      current = true;
    },
    o(local) {
      transition_out(if_block);
      if (local) {
        if (!div_transition)
          div_transition = create_bidirectional_transition(div, fade, {}, false);
        div_transition.run(0);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d();
      }
      if (detaching && div_transition)
        div_transition.end();
      mounted = false;
      run_all(dispose);
    }
  };
}
const defaultClass$2 = "absolute text-content inset-0 h-full w-full flex items-center justify-center overflow-hidden bg-default";
const circleClass$1 = "rounded-full";
const roundedClass$1 = "rounded-md";
const defaultIconContainerClass = "absolute text-content h-full w-full";
const xsContainerClass = "bottom-[-0.25rem]";
const smContainerClass = "bottom-[-0.35rem]";
const mdContainerClass = "bottom-[-0.5rem]";
const lgContainerClass = "text-6xl bottom-[-0.6rem]";
const xlContainerClass = "bottom-[-0.75rem]";
const xsIconSize = "24px";
const smIconSize = "32px";
const mdIconSize = "40px";
const lgIconSize = "48px";
const xlIconSize = "64px";
function instance$4($$self, $$props, $$invalidate) {
  let iconContainerClass;
  let iconSize;
  let finalClass;
  let { $$slots: slots = {}, $$scope } = $$props;
  const $$slots = compute_slots(slots);
  let { use = [] } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { loading = false } = $$props;
  const shape = getContext("media-avatar-shape");
  const size = getContext("media-avatar-size");
  const placeholder = getContext("media-avatar-placeholder");
  $$self.$$set = ($$new_props) => {
    $$invalidate(6, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("loading" in $$new_props)
      $$invalidate(8, loading = $$new_props.loading);
    if ("$$scope" in $$new_props)
      $$invalidate(9, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    $$invalidate(1, finalClass = twMerge(defaultClass$2, loading ? "loading" : false, shape === "circle" ? circleClass$1 : false, shape === "rounded" ? roundedClass$1 : false, $$props.class));
  };
  $$invalidate(3, iconContainerClass = twMerge(defaultIconContainerClass, size === "xs" ? xsContainerClass : false, size === "sm" ? smContainerClass : false, size === "md" ? mdContainerClass : false, size === "lg" ? lgContainerClass : false, size === "xl" ? xlContainerClass : false));
  $$invalidate(2, iconSize = twMerge(size === "xs" ? xsIconSize : false, size === "sm" ? smIconSize : false, size === "md" ? mdIconSize : false, size === "lg" ? lgIconSize : false, size === "xl" ? xlIconSize : false));
  $$props = exclude_internal_props($$props);
  return [
    use,
    finalClass,
    iconSize,
    iconContainerClass,
    forwardEvents,
    placeholder,
    $$props,
    $$slots,
    loading,
    $$scope,
    slots
  ];
}
class Placeholder extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$4, safe_not_equal, { use: 0, loading: 8 });
  }
}
const get_indicator_slot_changes = (dirty) => ({});
const get_indicator_slot_context = (ctx) => ({});
const get_placeholder_slot_changes = (dirty) => ({});
const get_placeholder_slot_context = (ctx) => ({});
function create_if_block_5(ctx) {
  let span1;
  let span0;
  let t;
  let useActions_action;
  let mounted;
  let dispose;
  let span1_levels = [
    { class: (
      /*finalClass*/
      ctx[9]
    ) },
    exclude(
      /*$$props*/
      ctx[11],
      ["use", "class"]
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
      t = text(
        /*initials*/
        ctx[4]
      );
      this.h();
    },
    l(nodes) {
      span1 = claim_element(nodes, "SPAN", { class: true });
      var span1_nodes = children(span1);
      span0 = claim_element(span1_nodes, "SPAN", { class: true });
      var span0_nodes = children(span0);
      t = claim_text(
        span0_nodes,
        /*initials*/
        ctx[4]
      );
      span0_nodes.forEach(detach);
      span1_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(span0, "class", "font-bold leading-none text-current text-xl");
      set_attributes(span1, span_data_1);
    },
    m(target, anchor) {
      insert_hydration(target, span1, anchor);
      append_hydration(span1, span0);
      append_hydration(span0, t);
      if (!mounted) {
        dispose = [
          action_destroyer(useActions_action = useActions.call(
            null,
            span1,
            /*use*/
            ctx[0]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[10].call(null, span1)
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*initials*/
      16)
        set_data(
          t,
          /*initials*/
          ctx2[4]
        );
      set_attributes(span1, span_data_1 = get_spread_update(span1_levels, [
        dirty & /*finalClass*/
        512 && { class: (
          /*finalClass*/
          ctx2[9]
        ) },
        dirty & /*$$props*/
        2048 && exclude(
          /*$$props*/
          ctx2[11],
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
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(span1);
      }
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block(ctx) {
  let span;
  let current_block_type_index;
  let if_block;
  let t;
  let useActions_action;
  let current;
  let mounted;
  let dispose;
  const if_block_creators = [create_if_block_1, create_if_block_2, create_if_block_4];
  const if_blocks = [];
  function select_block_type_1(ctx2, dirty) {
    if (
      /*loaded*/
      ctx2[5]
    )
      return 0;
    if (
      /*failed*/
      ctx2[6]
    )
      return 1;
    if (
      /*loading*/
      ctx2[7]
    )
      return 2;
    return -1;
  }
  if (~(current_block_type_index = select_block_type_1(ctx))) {
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  const indicator_slot_template = (
    /*#slots*/
    ctx[17].indicator
  );
  const indicator_slot = create_slot(
    indicator_slot_template,
    ctx,
    /*$$scope*/
    ctx[16],
    get_indicator_slot_context
  );
  let span_levels = [
    { class: (
      /*finalContainerClass*/
      ctx[8]
    ) },
    exclude(
      /*$$props*/
      ctx[11],
      ["use", "class", "src"]
    )
  ];
  let span_data = {};
  for (let i = 0; i < span_levels.length; i += 1) {
    span_data = assign(span_data, span_levels[i]);
  }
  return {
    c() {
      span = element("span");
      if (if_block)
        if_block.c();
      t = space();
      if (indicator_slot)
        indicator_slot.c();
      this.h();
    },
    l(nodes) {
      span = claim_element(nodes, "SPAN", { class: true });
      var span_nodes = children(span);
      if (if_block)
        if_block.l(span_nodes);
      t = claim_space(span_nodes);
      if (indicator_slot)
        indicator_slot.l(span_nodes);
      span_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(span, span_data);
    },
    m(target, anchor) {
      insert_hydration(target, span, anchor);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(span, null);
      }
      append_hydration(span, t);
      if (indicator_slot) {
        indicator_slot.m(span, null);
      }
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
            ctx[10].call(null, span)
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_1(ctx2);
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
          if_block.m(span, t);
        } else {
          if_block = null;
        }
      }
      if (indicator_slot) {
        if (indicator_slot.p && (!current || dirty & /*$$scope*/
        65536)) {
          update_slot_base(
            indicator_slot,
            indicator_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[16],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[16]
            ) : get_slot_changes(
              indicator_slot_template,
              /*$$scope*/
              ctx2[16],
              dirty,
              get_indicator_slot_changes
            ),
            get_indicator_slot_context
          );
        }
      }
      set_attributes(span, span_data = get_spread_update(span_levels, [
        (!current || dirty & /*finalContainerClass*/
        256) && { class: (
          /*finalContainerClass*/
          ctx2[8]
        ) },
        dirty & /*$$props*/
        2048 && exclude(
          /*$$props*/
          ctx2[11],
          ["use", "class", "src"]
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
      transition_in(if_block);
      transition_in(indicator_slot, local);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      transition_out(indicator_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d();
      }
      if (indicator_slot)
        indicator_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_4(ctx) {
  let placeholder_1;
  let current;
  placeholder_1 = new Placeholder({ props: { loading: true } });
  return {
    c() {
      create_component(placeholder_1.$$.fragment);
    },
    l(nodes) {
      claim_component(placeholder_1.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(placeholder_1, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(placeholder_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(placeholder_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(placeholder_1, detaching);
    }
  };
}
function create_if_block_2(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block_3, create_else_block];
  const if_blocks = [];
  function select_block_type_2(ctx2, dirty) {
    if (
      /*$$slots*/
      ctx2[12].placeholder
    )
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type_2(ctx);
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
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_2(ctx2);
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
function create_if_block_1(ctx) {
  let img;
  let img_style_value;
  let img_src_value;
  return {
    c() {
      img = element("img");
      this.h();
    },
    l(nodes) {
      img = claim_element(nodes, "IMG", {
        class: true,
        style: true,
        src: true,
        alt: true
      });
      this.h();
    },
    h() {
      attr(
        img,
        "class",
        /*finalClass*/
        ctx[9]
      );
      attr(img, "style", img_style_value = /*$$props*/
      ctx[11].style);
      if (!src_url_equal(img.src, img_src_value = /*src*/
      ctx[2] || ""))
        attr(img, "src", img_src_value);
      attr(
        img,
        "alt",
        /*alt*/
        ctx[3]
      );
    },
    m(target, anchor) {
      insert_hydration(target, img, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*finalClass*/
      512) {
        attr(
          img,
          "class",
          /*finalClass*/
          ctx2[9]
        );
      }
      if (dirty & /*$$props*/
      2048 && img_style_value !== (img_style_value = /*$$props*/
      ctx2[11].style)) {
        attr(img, "style", img_style_value);
      }
      if (dirty & /*src*/
      4 && !src_url_equal(img.src, img_src_value = /*src*/
      ctx2[2] || "")) {
        attr(img, "src", img_src_value);
      }
      if (dirty & /*alt*/
      8) {
        attr(
          img,
          "alt",
          /*alt*/
          ctx2[3]
        );
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(img);
      }
    }
  };
}
function create_else_block(ctx) {
  let placeholder_1;
  let current;
  placeholder_1 = new Placeholder({});
  return {
    c() {
      create_component(placeholder_1.$$.fragment);
    },
    l(nodes) {
      claim_component(placeholder_1.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(placeholder_1, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(placeholder_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(placeholder_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(placeholder_1, detaching);
    }
  };
}
function create_if_block_3(ctx) {
  let current;
  const placeholder_slot_template = (
    /*#slots*/
    ctx[17].placeholder
  );
  const placeholder_slot = create_slot(
    placeholder_slot_template,
    ctx,
    /*$$scope*/
    ctx[16],
    get_placeholder_slot_context
  );
  return {
    c() {
      if (placeholder_slot)
        placeholder_slot.c();
    },
    l(nodes) {
      if (placeholder_slot)
        placeholder_slot.l(nodes);
    },
    m(target, anchor) {
      if (placeholder_slot) {
        placeholder_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (placeholder_slot) {
        if (placeholder_slot.p && (!current || dirty & /*$$scope*/
        65536)) {
          update_slot_base(
            placeholder_slot,
            placeholder_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[16],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[16]
            ) : get_slot_changes(
              placeholder_slot_template,
              /*$$scope*/
              ctx2[16],
              dirty,
              get_placeholder_slot_changes
            ),
            get_placeholder_slot_context
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(placeholder_slot, local);
      current = true;
    },
    o(local) {
      transition_out(placeholder_slot, local);
      current = false;
    },
    d(detaching) {
      if (placeholder_slot)
        placeholder_slot.d(detaching);
    }
  };
}
function create_fragment$3(ctx) {
  let div;
  let current_block_type_index;
  let if_block;
  let current;
  const if_block_creators = [create_if_block, create_if_block_5];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*src*/
      ctx2[2]
    )
      return 0;
    if (
      /*initials*/
      ctx2[4]
    )
      return 1;
    return -1;
  }
  if (~(current_block_type_index = select_block_type(ctx))) {
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  return {
    c() {
      div = element("div");
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      if (if_block)
        if_block.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "first:mr-4 last:ml-4 flex-shrink-0");
      toggle_class(
        div,
        "self-center",
        /*align*/
        ctx[1] === "center"
      );
      toggle_class(
        div,
        "self-end",
        /*align*/
        ctx[1] === "bottom"
      );
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(div, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
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
          if_block.m(div, null);
        } else {
          if_block = null;
        }
      }
      if (!current || dirty & /*align*/
      2) {
        toggle_class(
          div,
          "self-center",
          /*align*/
          ctx2[1] === "center"
        );
      }
      if (!current || dirty & /*align*/
      2) {
        toggle_class(
          div,
          "self-end",
          /*align*/
          ctx2[1] === "bottom"
        );
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
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d();
      }
    }
  };
}
const srcClass = "inline-block absolute";
const srcContainerClass = "inline-block relative align-middle";
const initialClass = "inline-flex items-center justify-center align-middle bg-default text-default-content";
const xsClass = "h-6 w-6";
const smClass = "h-8 w-8";
const mdClass = "h-10 w-10";
const lgClass = "h-12 w-12";
const xlClass = "h-16 w-16";
const circleClass = "rounded-full";
const roundedClass = "rounded-md";
function instance$3($$self, $$props, $$invalidate) {
  let finalClass;
  let finalContainerClass;
  let { $$slots: slots = {}, $$scope } = $$props;
  const $$slots = compute_slots(slots);
  let { use = [] } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { size = "md" } = $$props;
  let { align = "top" } = $$props;
  let { src = void 0 } = $$props;
  let { alt = "avatar" } = $$props;
  let { shape = "circle" } = $$props;
  let { initials = void 0 } = $$props;
  let { placeholder = true } = $$props;
  let loaded = false;
  let failed = false;
  let loading = true;
  setContext("media-avatar-shape", shape);
  setContext("media-avatar-size", size);
  setContext("media-avatar-placeholder", placeholder);
  onMount(() => {
    if (src) {
      const image = new Image();
      image.src = src;
      $$invalidate(7, loading = true);
      image.onload = () => {
        $$invalidate(7, loading = false);
        $$invalidate(5, loaded = true);
      };
      image.onerror = () => {
        $$invalidate(7, loading = false);
        $$invalidate(6, failed = true);
      };
    }
  });
  $$self.$$set = ($$new_props) => {
    $$invalidate(11, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("size" in $$new_props)
      $$invalidate(13, size = $$new_props.size);
    if ("align" in $$new_props)
      $$invalidate(1, align = $$new_props.align);
    if ("src" in $$new_props)
      $$invalidate(2, src = $$new_props.src);
    if ("alt" in $$new_props)
      $$invalidate(3, alt = $$new_props.alt);
    if ("shape" in $$new_props)
      $$invalidate(14, shape = $$new_props.shape);
    if ("initials" in $$new_props)
      $$invalidate(4, initials = $$new_props.initials);
    if ("placeholder" in $$new_props)
      $$invalidate(15, placeholder = $$new_props.placeholder);
    if ("$$scope" in $$new_props)
      $$invalidate(16, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    $$invalidate(9, finalClass = twMerge(src && !initials ? srcClass : false, initials && !src ? initialClass : false, size === "xs" ? xsClass : false, size === "sm" ? smClass : false, size === "md" ? mdClass : false, size === "lg" ? lgClass : false, size === "xl" ? xlClass : false, shape === "circle" ? circleClass : false, shape === "rounded" ? roundedClass : false, $$props.class));
    $$invalidate(8, finalContainerClass = twMerge(src && !initials ? srcContainerClass : false, size === "xs" ? xsClass : false, size === "sm" ? smClass : false, size === "md" ? mdClass : false, size === "lg" ? lgClass : false, size === "xl" ? xlClass : false, shape === "circle" ? circleClass : false, shape === "rounded" ? roundedClass : false, $$props.class));
  };
  $$props = exclude_internal_props($$props);
  return [
    use,
    align,
    src,
    alt,
    initials,
    loaded,
    failed,
    loading,
    finalContainerClass,
    finalClass,
    forwardEvents,
    $$props,
    $$slots,
    size,
    shape,
    placeholder,
    $$scope,
    slots
  ];
}
class Avatar extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, {
      use: 0,
      size: 13,
      align: 1,
      src: 2,
      alt: 3,
      shape: 14,
      initials: 4,
      placeholder: 15
    });
  }
}
const get_description_slot_changes = (dirty) => ({});
const get_description_slot_context = (ctx) => ({});
const get_title_slot_changes = (dirty) => ({});
const get_title_slot_context = (ctx) => ({});
function create_fragment$2(ctx) {
  let div;
  let t0;
  let t1;
  let div_class_value;
  let useActions_action;
  let current;
  let mounted;
  let dispose;
  const title_slot_template = (
    /*#slots*/
    ctx[4].title
  );
  const title_slot = create_slot(
    title_slot_template,
    ctx,
    /*$$scope*/
    ctx[3],
    get_title_slot_context
  );
  const description_slot_template = (
    /*#slots*/
    ctx[4].description
  );
  const description_slot = create_slot(
    description_slot_template,
    ctx,
    /*$$scope*/
    ctx[3],
    get_description_slot_context
  );
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
  let div_levels = [
    {
      class: div_class_value = /*$$props*/
      ctx[2].class
    },
    exclude(
      /*$$props*/
      ctx[2],
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
      if (title_slot)
        title_slot.c();
      t0 = space();
      if (description_slot)
        description_slot.c();
      t1 = space();
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      if (title_slot)
        title_slot.l(div_nodes);
      t0 = claim_space(div_nodes);
      if (description_slot)
        description_slot.l(div_nodes);
      t1 = claim_space(div_nodes);
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
      if (title_slot) {
        title_slot.m(div, null);
      }
      append_hydration(div, t0);
      if (description_slot) {
        description_slot.m(div, null);
      }
      append_hydration(div, t1);
      if (default_slot) {
        default_slot.m(div, null);
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
            ctx[1].call(null, div)
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (title_slot) {
        if (title_slot.p && (!current || dirty & /*$$scope*/
        8)) {
          update_slot_base(
            title_slot,
            title_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[3],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[3]
            ) : get_slot_changes(
              title_slot_template,
              /*$$scope*/
              ctx2[3],
              dirty,
              get_title_slot_changes
            ),
            get_title_slot_context
          );
        }
      }
      if (description_slot) {
        if (description_slot.p && (!current || dirty & /*$$scope*/
        8)) {
          update_slot_base(
            description_slot,
            description_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[3],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[3]
            ) : get_slot_changes(
              description_slot_template,
              /*$$scope*/
              ctx2[3],
              dirty,
              get_description_slot_changes
            ),
            get_description_slot_context
          );
        }
      }
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
      set_attributes(div, div_data = get_spread_update(div_levels, [
        (!current || dirty & /*$$props*/
        4 && div_class_value !== (div_class_value = /*$$props*/
        ctx2[2].class)) && { class: div_class_value },
        dirty & /*$$props*/
        4 && exclude(
          /*$$props*/
          ctx2[2],
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
      transition_in(title_slot, local);
      transition_in(description_slot, local);
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(title_slot, local);
      transition_out(description_slot, local);
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (title_slot)
        title_slot.d(detaching);
      if (description_slot)
        description_slot.d(detaching);
      if (default_slot)
        default_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { use = [] } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  $$self.$$set = ($$new_props) => {
    $$invalidate(2, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("$$scope" in $$new_props)
      $$invalidate(3, $$scope = $$new_props.$$scope);
  };
  $$props = exclude_internal_props($$props);
  return [use, forwardEvents, $$props, $$scope, slots];
}
class Content extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, { use: 0 });
  }
}
function create_fragment$1(ctx) {
  let p;
  let useActions_action;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = (
    /*#slots*/
    ctx[5].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[4],
    null
  );
  let p_levels = [
    { class: (
      /*finalClass*/
      ctx[1]
    ) },
    exclude(
      /*$$props*/
      ctx[3],
      ["use", "class"]
    )
  ];
  let p_data = {};
  for (let i = 0; i < p_levels.length; i += 1) {
    p_data = assign(p_data, p_levels[i]);
  }
  return {
    c() {
      p = element("p");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      p = claim_element(nodes, "P", { class: true });
      var p_nodes = children(p);
      if (default_slot)
        default_slot.l(p_nodes);
      p_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(p, p_data);
    },
    m(target, anchor) {
      insert_hydration(target, p, anchor);
      if (default_slot) {
        default_slot.m(p, null);
      }
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(useActions_action = useActions.call(
            null,
            p,
            /*use*/
            ctx[0]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[2].call(null, p)
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        16)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[4],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[4]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[4],
              dirty,
              null
            ),
            null
          );
        }
      }
      set_attributes(p, p_data = get_spread_update(p_levels, [
        (!current || dirty & /*finalClass*/
        2) && { class: (
          /*finalClass*/
          ctx2[1]
        ) },
        dirty & /*$$props*/
        8 && exclude(
          /*$$props*/
          ctx2[3],
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
        detach(p);
      }
      if (default_slot)
        default_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
const defaultClass$1 = "mt-1 text-secondary-content";
function instance$1($$self, $$props, $$invalidate) {
  let finalClass;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { use = [] } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  $$self.$$set = ($$new_props) => {
    $$invalidate(3, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("$$scope" in $$new_props)
      $$invalidate(4, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    $$invalidate(1, finalClass = twMerge(defaultClass$1, $$props.class));
  };
  $$props = exclude_internal_props($$props);
  return [use, finalClass, forwardEvents, $$props, $$scope, slots];
}
class Description2 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, { use: 0 });
  }
}
function create_fragment(ctx) {
  let h4;
  let useActions_action;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = (
    /*#slots*/
    ctx[5].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[4],
    null
  );
  let h4_levels = [
    { class: (
      /*finalClass*/
      ctx[1]
    ) },
    exclude(
      /*$$props*/
      ctx[3],
      ["use", "class"]
    )
  ];
  let h4_data = {};
  for (let i = 0; i < h4_levels.length; i += 1) {
    h4_data = assign(h4_data, h4_levels[i]);
  }
  return {
    c() {
      h4 = element("h4");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      h4 = claim_element(nodes, "H4", { class: true });
      var h4_nodes = children(h4);
      if (default_slot)
        default_slot.l(h4_nodes);
      h4_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(h4, h4_data);
    },
    m(target, anchor) {
      insert_hydration(target, h4, anchor);
      if (default_slot) {
        default_slot.m(h4, null);
      }
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(useActions_action = useActions.call(
            null,
            h4,
            /*use*/
            ctx[0]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[2].call(null, h4)
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        16)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[4],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[4]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[4],
              dirty,
              null
            ),
            null
          );
        }
      }
      set_attributes(h4, h4_data = get_spread_update(h4_levels, [
        (!current || dirty & /*finalClass*/
        2) && { class: (
          /*finalClass*/
          ctx2[1]
        ) },
        dirty & /*$$props*/
        8 && exclude(
          /*$$props*/
          ctx2[3],
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
        detach(h4);
      }
      if (default_slot)
        default_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
const defaultClass = "font-bold text-content";
function instance($$self, $$props, $$invalidate) {
  let finalClass;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { use = [] } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  $$self.$$set = ($$new_props) => {
    $$invalidate(3, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("$$scope" in $$new_props)
      $$invalidate(4, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    $$invalidate(1, finalClass = twMerge(defaultClass, $$props.class));
  };
  $$props = exclude_internal_props($$props);
  return [use, finalClass, forwardEvents, $$props, $$scope, slots];
}
class Title extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, { use: 0 });
  }
}
const Media2 = Media$1;
Media2.Avatar = Avatar;
Media2.Content = Content;
Media2.Content.Title = Title;
Media2.Content.Description = Description2;
export {
  Drawer as D,
  Media2 as M,
  Portal as P,
  Toggle2 as T,
  Dropdown2 as a,
  Divider3 as b,
  clickOutside as c,
  floatingUI as f
};
