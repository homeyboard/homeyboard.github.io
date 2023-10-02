import { w as writable } from "./singletons.6f834d91.js";
import { s as safe_not_equal, z as create_slot, f as element, g as claim_element, h as children, d as detach, i as insert_hydration, N as action_destroyer, A as update_slot_base, B as get_all_dirty_from_scope, C as get_slot_changes, S as is_function, t as tick, j as attr, G as listen, H as add_render_callback, J as assign, K as exclude_internal_props, a as space, c as claim_space, R as set_attributes, D as append_hydration, O as run_all, P as compute_slots, T as get_current_component, M as toggle_class, Q as setContext, I as getContext } from "./scheduler.a4b1dbd5.js";
import { S as SvelteComponent, i as init, a as transition_in, t as transition_out, k as create_bidirectional_transition, c as check_outros, p as create_out_transition, g as group_outros, o as create_in_transition, b as create_component, d as claim_component, m as mount_component, e as destroy_component } from "./index.6d45844e.js";
import { t as twMerge, f as fade, e as exclude, b as trapFocus, u as useActions, g as get_spread_update, h as forwardEventsBuilder, s as scale } from "./Progress.65323467.js";
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
function create_fragment$6(ctx) {
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
function instance$6($$self, $$props, $$invalidate) {
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
    init(this, options, instance$6, create_fragment$6, safe_not_equal, { target: 0 });
  }
}
function create_fragment$5(ctx) {
  let button;
  let button_style_value;
  let button_transition;
  let current;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      this.h();
    },
    l(nodes) {
      button = claim_element(nodes, "BUTTON", {
        type: true,
        tabindex: true,
        class: true,
        style: true
      });
      children(button).forEach(detach);
      this.h();
    },
    h() {
      attr(button, "type", "button");
      attr(button, "tabindex", "-1");
      attr(
        button,
        "class",
        /*finalClass*/
        ctx[1]
      );
      attr(button, "style", button_style_value = /*$$props*/
      ctx[2].style);
    },
    m(target, anchor) {
      insert_hydration(target, button, anchor);
      current = true;
      if (!mounted) {
        dispose = listen(button, "click", function() {
          if (is_function(
            /*handleClose*/
            ctx[0]
          ))
            ctx[0].apply(this, arguments);
        });
        mounted = true;
      }
    },
    p(new_ctx, [dirty]) {
      ctx = new_ctx;
      if (!current || dirty & /*finalClass*/
      2) {
        attr(
          button,
          "class",
          /*finalClass*/
          ctx[1]
        );
      }
      if (!current || dirty & /*$$props*/
      4 && button_style_value !== (button_style_value = /*$$props*/
      ctx[2].style)) {
        attr(button, "style", button_style_value);
      }
    },
    i(local) {
      if (current)
        return;
      if (local) {
        add_render_callback(() => {
          if (!current)
            return;
          if (!button_transition)
            button_transition = create_bidirectional_transition(button, fade, {}, true);
          button_transition.run(1);
        });
      }
      current = true;
    },
    o(local) {
      if (local) {
        if (!button_transition)
          button_transition = create_bidirectional_transition(button, fade, {}, false);
        button_transition.run(0);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      if (detaching && button_transition)
        button_transition.end();
      mounted = false;
      dispose();
    }
  };
}
const defaultClass$5 = "overlay fixed inset-0 bg-background bg-opacity-10 backdrop-blur-sm transition-opacity pointer-events-auto";
function instance$5($$self, $$props, $$invalidate) {
  let finalClass;
  let { handleClose } = $$props;
  $$self.$$set = ($$new_props) => {
    $$invalidate(2, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("handleClose" in $$new_props)
      $$invalidate(0, handleClose = $$new_props.handleClose);
  };
  $$self.$$.update = () => {
    $$invalidate(1, finalClass = twMerge(defaultClass$5, $$props.class));
  };
  $$props = exclude_internal_props($$props);
  return [handleClose, finalClass, $$props];
}
class Backdrop extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$5, create_fragment$5, safe_not_equal, { handleClose: 0 });
  }
}
const get_content_slot_changes = (dirty) => ({});
const get_content_slot_context = (ctx) => ({});
const get_backdrop_slot_changes = (dirty) => ({});
const get_backdrop_slot_context = (ctx) => ({});
function create_else_block(ctx) {
  let backdrop;
  let current;
  backdrop = new Backdrop({
    props: { handleClose: (
      /*handleClose*/
      ctx[1]
    ) }
  });
  return {
    c() {
      create_component(backdrop.$$.fragment);
    },
    l(nodes) {
      claim_component(backdrop.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(backdrop, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const backdrop_changes = {};
      if (dirty & /*handleClose*/
      2)
        backdrop_changes.handleClose = /*handleClose*/
        ctx2[1];
      backdrop.$set(backdrop_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(backdrop.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(backdrop.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(backdrop, detaching);
    }
  };
}
function create_if_block(ctx) {
  let current;
  const backdrop_slot_template = (
    /*#slots*/
    ctx[8].backdrop
  );
  const backdrop_slot = create_slot(
    backdrop_slot_template,
    ctx,
    /*$$scope*/
    ctx[7],
    get_backdrop_slot_context
  );
  return {
    c() {
      if (backdrop_slot)
        backdrop_slot.c();
    },
    l(nodes) {
      if (backdrop_slot)
        backdrop_slot.l(nodes);
    },
    m(target, anchor) {
      if (backdrop_slot) {
        backdrop_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (backdrop_slot) {
        if (backdrop_slot.p && (!current || dirty & /*$$scope*/
        128)) {
          update_slot_base(
            backdrop_slot,
            backdrop_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[7],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[7]
            ) : get_slot_changes(
              backdrop_slot_template,
              /*$$scope*/
              ctx2[7],
              dirty,
              get_backdrop_slot_changes
            ),
            get_backdrop_slot_context
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(backdrop_slot, local);
      current = true;
    },
    o(local) {
      transition_out(backdrop_slot, local);
      current = false;
    },
    d(detaching) {
      if (backdrop_slot)
        backdrop_slot.d(detaching);
    }
  };
}
function create_fragment$4(ctx) {
  let div1;
  let current_block_type_index;
  let if_block;
  let t0;
  let div0;
  let t1;
  let t2;
  let button;
  let useActions_action;
  let div0_intro;
  let div0_outro;
  let div1_transition;
  let current;
  let mounted;
  let dispose;
  const if_block_creators = [create_if_block, create_else_block];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*$$slots*/
      ctx2[6].backdrop
    )
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  const content_slot_template = (
    /*#slots*/
    ctx[8].content
  );
  const content_slot = create_slot(
    content_slot_template,
    ctx,
    /*$$scope*/
    ctx[7],
    get_content_slot_context
  );
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
  let div0_levels = [
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
  let div_data = {};
  for (let i = 0; i < div0_levels.length; i += 1) {
    div_data = assign(div_data, div0_levels[i]);
  }
  return {
    c() {
      div1 = element("div");
      if_block.c();
      t0 = space();
      div0 = element("div");
      if (content_slot)
        content_slot.c();
      t1 = space();
      if (default_slot)
        default_slot.c();
      t2 = space();
      button = element("button");
      this.h();
    },
    l(nodes) {
      div1 = claim_element(nodes, "DIV", {
        class: true,
        role: true,
        "aria-modal": true
      });
      var div1_nodes = children(div1);
      if_block.l(div1_nodes);
      t0 = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      if (content_slot)
        content_slot.l(div0_nodes);
      t1 = claim_space(div0_nodes);
      if (default_slot)
        default_slot.l(div0_nodes);
      t2 = claim_space(div0_nodes);
      button = claim_element(div0_nodes, "BUTTON", { class: true });
      children(button).forEach(detach);
      div0_nodes.forEach(detach);
      div1_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(button, "class", "h-0 w-0 border-none outline-none ring-0 focus:border-none focus:outline-none focus:ring-0");
      set_attributes(div0, div_data);
      attr(div1, "class", "relative z-10 pointer-events-none");
      attr(div1, "role", "dialog");
      attr(div1, "aria-modal", "true");
    },
    m(target, anchor) {
      insert_hydration(target, div1, anchor);
      if_blocks[current_block_type_index].m(div1, null);
      append_hydration(div1, t0);
      append_hydration(div1, div0);
      if (content_slot) {
        content_slot.m(div0, null);
      }
      append_hydration(div0, t1);
      if (default_slot) {
        default_slot.m(div0, null);
      }
      append_hydration(div0, t2);
      append_hydration(div0, button);
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            window,
            "keydown",
            /*captureEscapeEvent*/
            ctx[4]
          ),
          action_destroyer(trapFocus.call(null, div0)),
          action_destroyer(useActions_action = useActions.call(
            null,
            div0,
            /*use*/
            ctx[0]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[3].call(null, div0)
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
        if_block.m(div1, t0);
      }
      if (content_slot) {
        if (content_slot.p && (!current || dirty & /*$$scope*/
        128)) {
          update_slot_base(
            content_slot,
            content_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[7],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[7]
            ) : get_slot_changes(
              content_slot_template,
              /*$$scope*/
              ctx2[7],
              dirty,
              get_content_slot_changes
            ),
            get_content_slot_context
          );
        }
      }
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
      set_attributes(div0, div_data = get_spread_update(div0_levels, [
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
      transition_in(content_slot, local);
      transition_in(default_slot, local);
      if (local) {
        add_render_callback(() => {
          if (!current)
            return;
          if (div0_outro)
            div0_outro.end(1);
          div0_intro = create_in_transition(div0, scale, { start: 0.9, duration: 250, delay: 150 });
          div0_intro.start();
        });
      }
      if (local) {
        add_render_callback(() => {
          if (!current)
            return;
          if (!div1_transition)
            div1_transition = create_bidirectional_transition(div1, fade, {}, true);
          div1_transition.run(1);
        });
      }
      current = true;
    },
    o(local) {
      transition_out(if_block);
      transition_out(content_slot, local);
      transition_out(default_slot, local);
      if (div0_intro)
        div0_intro.invalidate();
      if (local) {
        div0_outro = create_out_transition(div0, scale, { start: 0.95, duration: 150 });
      }
      if (local) {
        if (!div1_transition)
          div1_transition = create_bidirectional_transition(div1, fade, {}, false);
        div1_transition.run(0);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      if_blocks[current_block_type_index].d();
      if (content_slot)
        content_slot.d(detaching);
      if (default_slot)
        default_slot.d(detaching);
      if (detaching && div0_outro)
        div0_outro.end();
      if (detaching && div1_transition)
        div1_transition.end();
      mounted = false;
      run_all(dispose);
    }
  };
}
const defaultClass$4 = "fixed inset-0 p-4 sm:p-6 md:p-20";
function instance$4($$self, $$props, $$invalidate) {
  let finalClass;
  let { $$slots: slots = {}, $$scope } = $$props;
  const $$slots = compute_slots(slots);
  let { use = [] } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { handleClose } = $$props;
  function captureEscapeEvent(e) {
    if (e.key === "Escape" && e.code === "Escape" && !e.shiftKey) {
      handleClose();
      e.preventDefault();
      e.stopPropagation();
    }
  }
  $$self.$$set = ($$new_props) => {
    $$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("handleClose" in $$new_props)
      $$invalidate(1, handleClose = $$new_props.handleClose);
    if ("$$scope" in $$new_props)
      $$invalidate(7, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    $$invalidate(2, finalClass = twMerge(defaultClass$4, $$props.class));
  };
  $$props = exclude_internal_props($$props);
  return [
    use,
    handleClose,
    finalClass,
    forwardEvents,
    captureEscapeEvent,
    $$props,
    $$slots,
    $$scope,
    slots
  ];
}
let Modal$1 = class Modal extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$4, safe_not_equal, { use: 0, handleClose: 1 });
  }
};
const get_actions_slot_changes = (dirty) => ({});
const get_actions_slot_context = (ctx) => ({});
const get_footer_slot_changes = (dirty) => ({});
const get_footer_slot_context = (ctx) => ({});
const get_body_slot_changes = (dirty) => ({});
const get_body_slot_context = (ctx) => ({});
const get_cover_slot_changes = (dirty) => ({});
const get_cover_slot_context = (ctx) => ({});
const get_header_slot_changes = (dirty) => ({});
const get_header_slot_context = (ctx) => ({});
function create_fragment$3(ctx) {
  let div;
  let t0;
  let t1;
  let t2;
  let t3;
  let t4;
  let useActions_action;
  let current;
  let mounted;
  let dispose;
  const header_slot_template = (
    /*#slots*/
    ctx[8].header
  );
  const header_slot = create_slot(
    header_slot_template,
    ctx,
    /*$$scope*/
    ctx[7],
    get_header_slot_context
  );
  const cover_slot_template = (
    /*#slots*/
    ctx[8].cover
  );
  const cover_slot = create_slot(
    cover_slot_template,
    ctx,
    /*$$scope*/
    ctx[7],
    get_cover_slot_context
  );
  const body_slot_template = (
    /*#slots*/
    ctx[8].body
  );
  const body_slot = create_slot(
    body_slot_template,
    ctx,
    /*$$scope*/
    ctx[7],
    get_body_slot_context
  );
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
  const footer_slot_template = (
    /*#slots*/
    ctx[8].footer
  );
  const footer_slot = create_slot(
    footer_slot_template,
    ctx,
    /*$$scope*/
    ctx[7],
    get_footer_slot_context
  );
  const actions_slot_template = (
    /*#slots*/
    ctx[8].actions
  );
  const actions_slot = create_slot(
    actions_slot_template,
    ctx,
    /*$$scope*/
    ctx[7],
    get_actions_slot_context
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
      if (header_slot)
        header_slot.c();
      t0 = space();
      if (cover_slot)
        cover_slot.c();
      t1 = space();
      if (body_slot)
        body_slot.c();
      t2 = space();
      if (default_slot)
        default_slot.c();
      t3 = space();
      if (footer_slot)
        footer_slot.c();
      t4 = space();
      if (actions_slot)
        actions_slot.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      if (header_slot)
        header_slot.l(div_nodes);
      t0 = claim_space(div_nodes);
      if (cover_slot)
        cover_slot.l(div_nodes);
      t1 = claim_space(div_nodes);
      if (body_slot)
        body_slot.l(div_nodes);
      t2 = claim_space(div_nodes);
      if (default_slot)
        default_slot.l(div_nodes);
      t3 = claim_space(div_nodes);
      if (footer_slot)
        footer_slot.l(div_nodes);
      t4 = claim_space(div_nodes);
      if (actions_slot)
        actions_slot.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(div, div_data);
      toggle_class(
        div,
        "border",
        /*bordered*/
        ctx[1]
      );
      toggle_class(
        div,
        "border-border",
        /*bordered*/
        ctx[1]
      );
      toggle_class(
        div,
        "shadow-none",
        /*elevation*/
        ctx[2] === "none"
      );
      toggle_class(
        div,
        "shadow-sm",
        /*elevation*/
        ctx[2] === "sm"
      );
      toggle_class(
        div,
        "shadow-md",
        /*elevation*/
        ctx[2] === "md"
      );
      toggle_class(
        div,
        "shadow-lg",
        /*elevation*/
        ctx[2] === "lg"
      );
      toggle_class(
        div,
        "shadow-xl",
        /*elevation*/
        ctx[2] === "xl"
      );
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (header_slot) {
        header_slot.m(div, null);
      }
      append_hydration(div, t0);
      if (cover_slot) {
        cover_slot.m(div, null);
      }
      append_hydration(div, t1);
      if (body_slot) {
        body_slot.m(div, null);
      }
      append_hydration(div, t2);
      if (default_slot) {
        default_slot.m(div, null);
      }
      append_hydration(div, t3);
      if (footer_slot) {
        footer_slot.m(div, null);
      }
      append_hydration(div, t4);
      if (actions_slot) {
        actions_slot.m(div, null);
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
      if (header_slot) {
        if (header_slot.p && (!current || dirty & /*$$scope*/
        128)) {
          update_slot_base(
            header_slot,
            header_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[7],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[7]
            ) : get_slot_changes(
              header_slot_template,
              /*$$scope*/
              ctx2[7],
              dirty,
              get_header_slot_changes
            ),
            get_header_slot_context
          );
        }
      }
      if (cover_slot) {
        if (cover_slot.p && (!current || dirty & /*$$scope*/
        128)) {
          update_slot_base(
            cover_slot,
            cover_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[7],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[7]
            ) : get_slot_changes(
              cover_slot_template,
              /*$$scope*/
              ctx2[7],
              dirty,
              get_cover_slot_changes
            ),
            get_cover_slot_context
          );
        }
      }
      if (body_slot) {
        if (body_slot.p && (!current || dirty & /*$$scope*/
        128)) {
          update_slot_base(
            body_slot,
            body_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[7],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[7]
            ) : get_slot_changes(
              body_slot_template,
              /*$$scope*/
              ctx2[7],
              dirty,
              get_body_slot_changes
            ),
            get_body_slot_context
          );
        }
      }
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
      if (footer_slot) {
        if (footer_slot.p && (!current || dirty & /*$$scope*/
        128)) {
          update_slot_base(
            footer_slot,
            footer_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[7],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[7]
            ) : get_slot_changes(
              footer_slot_template,
              /*$$scope*/
              ctx2[7],
              dirty,
              get_footer_slot_changes
            ),
            get_footer_slot_context
          );
        }
      }
      if (actions_slot) {
        if (actions_slot.p && (!current || dirty & /*$$scope*/
        128)) {
          update_slot_base(
            actions_slot,
            actions_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[7],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[7]
            ) : get_slot_changes(
              actions_slot_template,
              /*$$scope*/
              ctx2[7],
              dirty,
              get_actions_slot_changes
            ),
            get_actions_slot_context
          );
        }
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
      toggle_class(
        div,
        "border",
        /*bordered*/
        ctx2[1]
      );
      toggle_class(
        div,
        "border-border",
        /*bordered*/
        ctx2[1]
      );
      toggle_class(
        div,
        "shadow-none",
        /*elevation*/
        ctx2[2] === "none"
      );
      toggle_class(
        div,
        "shadow-sm",
        /*elevation*/
        ctx2[2] === "sm"
      );
      toggle_class(
        div,
        "shadow-md",
        /*elevation*/
        ctx2[2] === "md"
      );
      toggle_class(
        div,
        "shadow-lg",
        /*elevation*/
        ctx2[2] === "lg"
      );
      toggle_class(
        div,
        "shadow-xl",
        /*elevation*/
        ctx2[2] === "xl"
      );
    },
    i(local) {
      if (current)
        return;
      transition_in(header_slot, local);
      transition_in(cover_slot, local);
      transition_in(body_slot, local);
      transition_in(default_slot, local);
      transition_in(footer_slot, local);
      transition_in(actions_slot, local);
      current = true;
    },
    o(local) {
      transition_out(header_slot, local);
      transition_out(cover_slot, local);
      transition_out(body_slot, local);
      transition_out(default_slot, local);
      transition_out(footer_slot, local);
      transition_out(actions_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (header_slot)
        header_slot.d(detaching);
      if (cover_slot)
        cover_slot.d(detaching);
      if (body_slot)
        body_slot.d(detaching);
      if (default_slot)
        default_slot.d(detaching);
      if (footer_slot)
        footer_slot.d(detaching);
      if (actions_slot)
        actions_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
const defaultClass$3 = "bg-surface text-content rounded-md mx-auto max-w-xl transform overflow-hidden rounded-md pointer-events-auto max-h-full flex flex-col";
function instance$3($$self, $$props, $$invalidate) {
  let finalClass;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { use = [] } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { divided = true } = $$props;
  let { bordered = true } = $$props;
  let { elevation = "md" } = $$props;
  setContext("card-divided", divided);
  $$self.$$set = ($$new_props) => {
    $$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("divided" in $$new_props)
      $$invalidate(6, divided = $$new_props.divided);
    if ("bordered" in $$new_props)
      $$invalidate(1, bordered = $$new_props.bordered);
    if ("elevation" in $$new_props)
      $$invalidate(2, elevation = $$new_props.elevation);
    if ("$$scope" in $$new_props)
      $$invalidate(7, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    $$invalidate(3, finalClass = twMerge(defaultClass$3, $$props.class));
  };
  $$props = exclude_internal_props($$props);
  return [
    use,
    bordered,
    elevation,
    finalClass,
    forwardEvents,
    $$props,
    divided,
    $$scope,
    slots
  ];
}
class Content extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, {
      use: 0,
      divided: 6,
      bordered: 1,
      elevation: 2
    });
  }
}
const get_extra_slot_changes = (dirty) => ({});
const get_extra_slot_context = (ctx) => ({});
function create_fragment$2(ctx) {
  let div;
  let t;
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
  const extra_slot_template = (
    /*#slots*/
    ctx[5].extra
  );
  const extra_slot = create_slot(
    extra_slot_template,
    ctx,
    /*$$scope*/
    ctx[4],
    get_extra_slot_context
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
      if (default_slot)
        default_slot.c();
      t = space();
      if (extra_slot)
        extra_slot.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      if (default_slot)
        default_slot.l(div_nodes);
      t = claim_space(div_nodes);
      if (extra_slot)
        extra_slot.l(div_nodes);
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
      append_hydration(div, t);
      if (extra_slot) {
        extra_slot.m(div, null);
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
      if (extra_slot) {
        if (extra_slot.p && (!current || dirty & /*$$scope*/
        16)) {
          update_slot_base(
            extra_slot,
            extra_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[4],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[4]
            ) : get_slot_changes(
              extra_slot_template,
              /*$$scope*/
              ctx2[4],
              dirty,
              get_extra_slot_changes
            ),
            get_extra_slot_context
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
      transition_in(default_slot, local);
      transition_in(extra_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      transition_out(extra_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (default_slot)
        default_slot.d(detaching);
      if (extra_slot)
        extra_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
const defaultClass$2 = "first:rounded-t-md last:rounded-b-md px-4 py-5 sm:px-6 h-16";
const extrasClass = "flex flex-row items-center justify-between";
const dividedClass = "border-b border-border last:border-b-none";
function instance$2($$self, $$props, $$invalidate) {
  let finalClass;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { use = [] } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  const divided = getContext("card-divided");
  $$self.$$set = ($$new_props) => {
    $$invalidate(3, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("$$scope" in $$new_props)
      $$invalidate(4, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    $$invalidate(1, finalClass = twMerge(defaultClass$2, $$props.extras ? extrasClass : false, divided ? dividedClass : false, $$props.class));
  };
  $$props = exclude_internal_props($$props);
  return [use, finalClass, forwardEvents, $$props, $$scope, slots];
}
class Header extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, { use: 0 });
  }
}
function create_fragment$1(ctx) {
  let div;
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
      run_all(dispose);
    }
  };
}
const defaultClass$1 = "first:rounded-t-md last:rounded-b-md px-4 py-5 sm:px-6 flex-grow overflow-y-auto";
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
class Body extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, { use: 0 });
  }
}
function create_fragment(ctx) {
  let div;
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
  let div_levels = [
    { class: (
      /*finalClass*/
      ctx[1]
    ) },
    exclude(
      /*$$props*/
      ctx[4],
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
      toggle_class(
        div,
        "border-t",
        /*divided*/
        ctx[3]
      );
      toggle_class(
        div,
        "border-border",
        /*divided*/
        ctx[3]
      );
      toggle_class(
        div,
        "last:border-t-none",
        /*divided*/
        ctx[3]
      );
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
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
      set_attributes(div, div_data = get_spread_update(div_levels, [
        (!current || dirty & /*finalClass*/
        2) && { class: (
          /*finalClass*/
          ctx2[1]
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
      toggle_class(
        div,
        "border-t",
        /*divided*/
        ctx2[3]
      );
      toggle_class(
        div,
        "border-border",
        /*divided*/
        ctx2[3]
      );
      toggle_class(
        div,
        "last:border-t-none",
        /*divided*/
        ctx2[3]
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
      run_all(dispose);
    }
  };
}
const defaultClass = "px-4 py-5 sm:px-6 h-16 first:rounded-t-md last:rounded-b-md border border-l-0 border-b-0 border-r-0";
function instance($$self, $$props, $$invalidate) {
  let finalClass;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { use = [] } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  const divided = getContext("card-divided");
  $$self.$$set = ($$new_props) => {
    $$invalidate(4, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("$$scope" in $$new_props)
      $$invalidate(5, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    $$invalidate(1, finalClass = twMerge(defaultClass, $$props.class));
  };
  $$props = exclude_internal_props($$props);
  return [use, finalClass, forwardEvents, divided, $$props, $$scope, slots];
}
class Footer extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, { use: 0 });
  }
}
const Modal2 = Modal$1;
Modal2.Backdrop = Backdrop;
Modal2.Content = Content;
Modal2.Content.Header = Header;
Modal2.Content.Body = Body;
Modal2.Content.Footer = Footer;
export {
  Modal2 as M,
  Portal as P,
  dashboard as d,
  editing as e,
  grid as g
};
