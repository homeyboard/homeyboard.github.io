import { s as safe_not_equal, e as empty, i as insert_hydration, d as detach, z as create_slot, f as element, g as claim_element, h as children, j as attr, G as toggle_class, k as set_style, D as append_hydration, I as listen, V as stop_propagation, A as update_slot_base, B as get_all_dirty_from_scope, C as get_slot_changes, J as run_all, O as bubble, R as prevent_default, r as createEventDispatcher, K as assign, L as exclude_internal_props } from "./scheduler.db654109.js";
import { S as SvelteComponent, i as init, a as transition_in, g as group_outros, t as transition_out, c as check_outros, b as create_component, d as claim_component, m as mount_component, e as destroy_component } from "./index.15d54fde.js";
import { a as Icon } from "./index.76367d7c.js";
function create_if_block(ctx) {
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
function create_fragment$1(ctx) {
  let if_block_anchor;
  let current;
  let if_block = (
    /*open*/
    ctx[0] && create_if_block(ctx)
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
          if_block = create_if_block(ctx2);
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
function instance$1($$self, $$props, $$invalidate) {
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
    init(this, options, instance$1, create_fragment$1, safe_not_equal, { open: 0, position: 1, size: 2 });
  }
}
function create_fragment(ctx) {
  let button;
  let icon;
  let current;
  let mounted;
  let dispose;
  icon = new Icon({
    props: {
      size: (
        /*size*/
        ctx[2]
      ),
      data: (
        /*data*/
        ctx[0]
      ),
      color: (
        /*color*/
        ctx[1]
      )
    }
  });
  return {
    c() {
      button = element("button");
      create_component(icon.$$.fragment);
      this.h();
    },
    l(nodes) {
      button = claim_element(nodes, "BUTTON", { class: true });
      var button_nodes = children(button);
      claim_component(icon.$$.fragment, button_nodes);
      button_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(
        button,
        "class",
        /*finalClass*/
        ctx[3]
      );
    },
    m(target, anchor) {
      insert_hydration(target, button, anchor);
      mount_component(icon, button, null);
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            button,
            "pointerdown",
            /*pointerdown_handler*/
            ctx[5]
          ),
          listen(button, "click", stop_propagation(prevent_default(
            /*click_handler*/
            ctx[6]
          )))
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      const icon_changes = {};
      if (dirty & /*size*/
      4)
        icon_changes.size = /*size*/
        ctx2[2];
      if (dirty & /*data*/
      1)
        icon_changes.data = /*data*/
        ctx2[0];
      if (dirty & /*color*/
      2)
        icon_changes.color = /*color*/
        ctx2[1];
      icon.$set(icon_changes);
      if (!current || dirty & /*finalClass*/
      8) {
        attr(
          button,
          "class",
          /*finalClass*/
          ctx2[3]
        );
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
        detach(button);
      }
      destroy_component(icon);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let finalClass;
  let { data } = $$props;
  let { color = "currentColor" } = $$props;
  let { size = "24px" } = $$props;
  const dispatcher = createEventDispatcher();
  function pointerdown_handler(event) {
    bubble.call(this, $$self, event);
  }
  const click_handler = (e) => dispatcher("click", e);
  $$self.$$set = ($$new_props) => {
    $$invalidate(7, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("data" in $$new_props)
      $$invalidate(0, data = $$new_props.data);
    if ("color" in $$new_props)
      $$invalidate(1, color = $$new_props.color);
    if ("size" in $$new_props)
      $$invalidate(2, size = $$new_props.size);
  };
  $$self.$$.update = () => {
    $$invalidate(3, finalClass = "btn group inline-flex justify-center outline-none border-none items-center border shadow-md bg-default rounded-full p-1 h-[" + size + "] w-[" + size + "] " + $$props.class);
  };
  $$props = exclude_internal_props($$props);
  return [data, color, size, finalClass, dispatcher, pointerdown_handler, click_handler];
}
class IconButton extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, { data: 0, color: 1, size: 2 });
  }
}
export {
  Drawer as D,
  IconButton as I
};
