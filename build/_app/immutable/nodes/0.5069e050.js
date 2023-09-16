import { s as safe_not_equal, r as createEventDispatcher, e as empty, i as insert_hydration, d as detach, l as text, m as claim_text, p as binding_callbacks, a as space, f as element, c as claim_space, g as claim_element, u as get_svelte_dataset, j as attr, v as add_flush_callback, w as head_selector, h as children, x as component_subscribe, o as onMount, y as create_slot, z as update_slot_base, A as get_all_dirty_from_scope, B as get_slot_changes, C as noop, D as append_hydration, n as set_data, E as destroy_each } from "../chunks/scheduler.c054974b.js";
import { S as SvelteComponent, i as init, b as create_component, d as claim_component, m as mount_component, a as transition_in, t as transition_out, e as destroy_component, g as group_outros, c as check_outros, f as bind } from "../chunks/index.036fb736.js";
import { m as mdiMenu, a as mdiPlus, b as mdiViewDashboardEdit, c as mdiCog, L as List, e as ensure_array_like, d as mdiViewDashboard, f as mdiDeathStarVariant } from "../chunks/index.1e076659.js";
import { A as AthomCloudAPI, g as goto } from "../chunks/AthomCloudAPI.ff7cf0cf.js";
import { e as base } from "../chunks/singletons.524b2ef1.js";
import { c as clientId, a as clientSecret, u as user, h as homeys, b as homey, s as scopes, d as baseUrl, e as dashboards$1, f as session, g as devices, i as flowFolders, j as basicFlows, k as advancedFlows, l as insights, z as zones } from "../chunks/homey.4fd8cabd.js";
import { I as Input, B as Button, d as dashboards, v as v4, P as Progress } from "../chunks/Progress.a7487f94.js";
import { M as Modal, d as dashboard, e as editing } from "../chunks/index.64d4d3eb.js";
import { a as apiKey, H as HomeyAPI } from "../chunks/HomeyAPI.5612b6f0.js";
import { P as Portal, D as Drawer, a as Dropdown, b as Divider, T as Toggle, M as Media } from "../chunks/index.d7a1f219.js";
const ssr = false;
const trailingSlash = "always";
const prerender = true;
const _layout = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  prerender,
  ssr,
  trailingSlash
}, Symbol.toStringTag, { value: "Module" }));
function create_if_block$1(ctx) {
  let modal;
  let current;
  modal = new Modal({
    props: {
      handleClose: (
        /*onCancel*/
        ctx[3]
      ),
      $$slots: { content: [create_content_slot$1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(modal.$$.fragment);
    },
    l(nodes) {
      claim_component(modal.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(modal, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const modal_changes = {};
      if (dirty & /*$$scope, value*/
      66) {
        modal_changes.$$scope = { dirty, ctx: ctx2 };
      }
      modal.$set(modal_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(modal.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(modal.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(modal, detaching);
    }
  };
}
function create_default_slot_5$1(ctx) {
  let t;
  return {
    c() {
      t = text("New local dashboard");
    },
    l(nodes) {
      t = claim_text(nodes, "New local dashboard");
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
function create_header_slot(ctx) {
  let modal_content_header;
  let current;
  modal_content_header = new Modal.Content.Header({
    props: {
      slot: "header",
      $$slots: { default: [create_default_slot_5$1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(modal_content_header.$$.fragment);
    },
    l(nodes) {
      claim_component(modal_content_header.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(modal_content_header, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const modal_content_header_changes = {};
      if (dirty & /*$$scope*/
      64) {
        modal_content_header_changes.$$scope = { dirty, ctx: ctx2 };
      }
      modal_content_header.$set(modal_content_header_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(modal_content_header.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(modal_content_header.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(modal_content_header, detaching);
    }
  };
}
function create_default_slot_4$1(ctx) {
  let input;
  let updating_value;
  let t0;
  let p;
  let textContent = `NOTE:
                        Local dashboards are stored in the exact browser they are created in. This means that the dashboard will not
                        be available on any other devices. If you want the dashboard to be available on other devices, use the native Homey App
                        and add a new device of type <i>Dashboard</i>. This requires you to install the Homey Dashboards app.`;
  let current;
  function input_value_binding(value) {
    ctx[4](value);
  }
  let input_props = {
    name: "name",
    placeholder: "Dashboard name"
  };
  if (
    /*value*/
    ctx[1] !== void 0
  ) {
    input_props.value = /*value*/
    ctx[1];
  }
  input = new Input({ props: input_props });
  binding_callbacks.push(() => bind(input, "value", input_value_binding));
  return {
    c() {
      create_component(input.$$.fragment);
      t0 = space();
      p = element("p");
      p.innerHTML = textContent;
      this.h();
    },
    l(nodes) {
      claim_component(input.$$.fragment, nodes);
      t0 = claim_space(nodes);
      p = claim_element(nodes, "P", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(p) !== "svelte-40p3bc")
        p.innerHTML = textContent;
      this.h();
    },
    h() {
      attr(p, "class", "mt-4");
    },
    m(target, anchor) {
      mount_component(input, target, anchor);
      insert_hydration(target, t0, anchor);
      insert_hydration(target, p, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const input_changes = {};
      if (!updating_value && dirty & /*value*/
      2) {
        updating_value = true;
        input_changes.value = /*value*/
        ctx2[1];
        add_flush_callback(() => updating_value = false);
      }
      input.$set(input_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(input.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(input.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t0);
        detach(p);
      }
      destroy_component(input, detaching);
    }
  };
}
function create_body_slot(ctx) {
  let modal_content_body;
  let current;
  modal_content_body = new Modal.Content.Body({
    props: {
      slot: "body",
      $$slots: { default: [create_default_slot_4$1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(modal_content_body.$$.fragment);
    },
    l(nodes) {
      claim_component(modal_content_body.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(modal_content_body, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const modal_content_body_changes = {};
      if (dirty & /*$$scope, value*/
      66) {
        modal_content_body_changes.$$scope = { dirty, ctx: ctx2 };
      }
      modal_content_body.$set(modal_content_body_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(modal_content_body.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(modal_content_body.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(modal_content_body, detaching);
    }
  };
}
function create_default_slot_3$1(ctx) {
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
function create_default_slot_2$1(ctx) {
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
function create_default_slot_1$1(ctx) {
  let button0;
  let t;
  let button1;
  let current;
  button0 = new Button({
    props: {
      $$slots: { default: [create_default_slot_3$1] },
      $$scope: { ctx }
    }
  });
  button0.$on(
    "click",
    /*onCancel*/
    ctx[3]
  );
  button1 = new Button({
    props: {
      disabled: (
        /*value*/
        ctx[1].length < 3
      ),
      $$slots: { default: [create_default_slot_2$1] },
      $$scope: { ctx }
    }
  });
  button1.$on(
    "click",
    /*onCreate*/
    ctx[2]
  );
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
function create_footer_slot(ctx) {
  let modal_content_footer;
  let current;
  modal_content_footer = new Modal.Content.Footer({
    props: {
      slot: "footer",
      $$slots: { default: [create_default_slot_1$1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(modal_content_footer.$$.fragment);
    },
    l(nodes) {
      claim_component(modal_content_footer.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(modal_content_footer, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const modal_content_footer_changes = {};
      if (dirty & /*$$scope, value*/
      66) {
        modal_content_footer_changes.$$scope = { dirty, ctx: ctx2 };
      }
      modal_content_footer.$set(modal_content_footer_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(modal_content_footer.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(modal_content_footer.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(modal_content_footer, detaching);
    }
  };
}
function create_content_slot$1(ctx) {
  let modal_content;
  let current;
  modal_content = new Modal.Content({
    props: {
      slot: "content",
      $$slots: {
        footer: [create_footer_slot],
        body: [create_body_slot],
        header: [create_header_slot]
      },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(modal_content.$$.fragment);
    },
    l(nodes) {
      claim_component(modal_content.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(modal_content, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const modal_content_changes = {};
      if (dirty & /*$$scope, value*/
      66) {
        modal_content_changes.$$scope = { dirty, ctx: ctx2 };
      }
      modal_content.$set(modal_content_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(modal_content.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(modal_content.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(modal_content, detaching);
    }
  };
}
function create_default_slot$1(ctx) {
  let if_block_anchor;
  let current;
  let if_block = (
    /*open*/
    ctx[0] && create_if_block$1(ctx)
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
          if_block = create_if_block$1(ctx2);
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
function create_fragment$1(ctx) {
  let portal;
  let current;
  portal = new Portal({
    props: {
      $$slots: { default: [create_default_slot$1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(portal.$$.fragment);
    },
    l(nodes) {
      claim_component(portal.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(portal, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const portal_changes = {};
      if (dirty & /*$$scope, value, open*/
      67) {
        portal_changes.$$scope = { dirty, ctx: ctx2 };
      }
      portal.$set(portal_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(portal.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(portal.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(portal, detaching);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let { open } = $$props;
  let value = "";
  const dispatch = createEventDispatcher();
  function onCreate() {
    dispatch("value", value);
    $$invalidate(1, value = "");
    $$invalidate(0, open = false);
    dispatch("open", open);
  }
  function onCancel() {
    $$invalidate(1, value = "");
    $$invalidate(0, open = false);
    dispatch("open", open);
  }
  function input_value_binding(value$1) {
    value = value$1;
    $$invalidate(1, value);
  }
  $$self.$$set = ($$props2) => {
    if ("open" in $$props2)
      $$invalidate(0, open = $$props2.open);
  };
  return [open, value, onCreate, onCancel, input_value_binding];
}
class AddDashboardDialog extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, { open: 0 });
  }
}
const app = "";
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[48] = list[i];
  return child_ctx;
}
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[48] = list[i];
  return child_ctx;
}
function get_each_context_2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[53] = list[i];
  return child_ctx;
}
function create_else_block(ctx) {
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[17].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[36],
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
        if (default_slot.p && (!current || dirty[1] & /*$$scope*/
        32)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[36],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[36]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[36],
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
function create_if_block_1(ctx) {
  let t0;
  let adddashboarddialog;
  let updating_open;
  let t1;
  let drawer;
  let updating_open_1;
  let t2;
  let t3;
  let current;
  let if_block0 = (
    /*menuOpen*/
    ctx[1] == false && /*toolbarOpen*/
    ctx[2] == false && create_if_block_9(ctx)
  );
  function adddashboarddialog_open_binding(value) {
    ctx[19](value);
  }
  let adddashboarddialog_props = {};
  if (
    /*addDashboardOpen*/
    ctx[4] !== void 0
  ) {
    adddashboarddialog_props.open = /*addDashboardOpen*/
    ctx[4];
  }
  adddashboarddialog = new AddDashboardDialog({ props: adddashboarddialog_props });
  binding_callbacks.push(() => bind(adddashboarddialog, "open", adddashboarddialog_open_binding));
  adddashboarddialog.$on(
    "value",
    /*value_handler*/
    ctx[20]
  );
  function drawer_open_binding(value) {
    ctx[27](value);
  }
  let drawer_props = {
    position: "left",
    size: "xs",
    class: "overflow-auto",
    $$slots: { default: [create_default_slot_2] },
    $$scope: { ctx }
  };
  if (
    /*menuOpen*/
    ctx[1] !== void 0
  ) {
    drawer_props.open = /*menuOpen*/
    ctx[1];
  }
  drawer = new Drawer({ props: drawer_props });
  binding_callbacks.push(() => bind(drawer, "open", drawer_open_binding));
  let if_block1 = (
    /*toolbarOpen*/
    ctx[2] && create_if_block_2(ctx)
  );
  const default_slot_template = (
    /*#slots*/
    ctx[17].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[36],
    null
  );
  return {
    c() {
      if (if_block0)
        if_block0.c();
      t0 = space();
      create_component(adddashboarddialog.$$.fragment);
      t1 = space();
      create_component(drawer.$$.fragment);
      t2 = space();
      if (if_block1)
        if_block1.c();
      t3 = space();
      if (default_slot)
        default_slot.c();
    },
    l(nodes) {
      if (if_block0)
        if_block0.l(nodes);
      t0 = claim_space(nodes);
      claim_component(adddashboarddialog.$$.fragment, nodes);
      t1 = claim_space(nodes);
      claim_component(drawer.$$.fragment, nodes);
      t2 = claim_space(nodes);
      if (if_block1)
        if_block1.l(nodes);
      t3 = claim_space(nodes);
      if (default_slot)
        default_slot.l(nodes);
    },
    m(target, anchor) {
      if (if_block0)
        if_block0.m(target, anchor);
      insert_hydration(target, t0, anchor);
      mount_component(adddashboarddialog, target, anchor);
      insert_hydration(target, t1, anchor);
      mount_component(drawer, target, anchor);
      insert_hydration(target, t2, anchor);
      if (if_block1)
        if_block1.m(target, anchor);
      insert_hydration(target, t3, anchor);
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (
        /*menuOpen*/
        ctx2[1] == false && /*toolbarOpen*/
        ctx2[2] == false
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty[0] & /*menuOpen, toolbarOpen*/
          6) {
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
      const adddashboarddialog_changes = {};
      if (!updating_open && dirty[0] & /*addDashboardOpen*/
      16) {
        updating_open = true;
        adddashboarddialog_changes.open = /*addDashboardOpen*/
        ctx2[4];
        add_flush_callback(() => updating_open = false);
      }
      adddashboarddialog.$set(adddashboarddialog_changes);
      const drawer_changes = {};
      if (dirty[0] & /*toolbarOpen, $dashboard, dashboards, $user*/
      420 | dirty[1] & /*$$scope*/
      32) {
        drawer_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_open_1 && dirty[0] & /*menuOpen*/
      2) {
        updating_open_1 = true;
        drawer_changes.open = /*menuOpen*/
        ctx2[1];
        add_flush_callback(() => updating_open_1 = false);
      }
      drawer.$set(drawer_changes);
      if (
        /*toolbarOpen*/
        ctx2[2]
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty[0] & /*toolbarOpen*/
          4) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_2(ctx2);
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
      if (default_slot) {
        if (default_slot.p && (!current || dirty[1] & /*$$scope*/
        32)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[36],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[36]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[36],
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
      transition_in(if_block0);
      transition_in(adddashboarddialog.$$.fragment, local);
      transition_in(drawer.$$.fragment, local);
      transition_in(if_block1);
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(adddashboarddialog.$$.fragment, local);
      transition_out(drawer.$$.fragment, local);
      transition_out(if_block1);
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t0);
        detach(t1);
        detach(t2);
        detach(t3);
      }
      if (if_block0)
        if_block0.d(detaching);
      destroy_component(adddashboarddialog, detaching);
      destroy_component(drawer, detaching);
      if (if_block1)
        if_block1.d(detaching);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_if_block(ctx) {
  let div;
  let progress;
  let current;
  progress = new Progress({
    props: {
      size: "xs",
      indeterminate: true,
      value: 0
    }
  });
  return {
    c() {
      div = element("div");
      create_component(progress.$$.fragment);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(progress.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "w-full");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      mount_component(progress, div, null);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(progress.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(progress.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(progress);
    }
  };
}
function create_if_block_9(ctx) {
  let button;
  let current;
  button = new Button({
    props: {
      class: "absolute left-0 top-0 z-10 text-primary-content bg-primary h-[42px] w-[42px] rounded-none rounded-br-full",
      $$slots: { icon: [create_icon_slot_10] },
      $$scope: { ctx }
    }
  });
  button.$on(
    "click",
    /*click_handler*/
    ctx[18]
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
      if (dirty[1] & /*$$scope*/
      32) {
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
function create_icon_slot_10(ctx) {
  let button_icon;
  let current;
  button_icon = new Button.Icon({ props: { slot: "icon", data: mdiMenu } });
  return {
    c() {
      create_component(button_icon.$$.fragment);
    },
    l(nodes) {
      claim_component(button_icon.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(button_icon, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(button_icon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button_icon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(button_icon, detaching);
    }
  };
}
function create_if_block_7(ctx) {
  let media;
  let t;
  let if_block_anchor;
  let current;
  media = new Media({
    props: {
      $$slots: { default: [create_default_slot_15] },
      $$scope: { ctx }
    }
  });
  let if_block = (
    /*$user*/
    ctx[7].homeys.length > 1 && create_if_block_8(ctx)
  );
  return {
    c() {
      create_component(media.$$.fragment);
      t = space();
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      claim_component(media.$$.fragment, nodes);
      t = claim_space(nodes);
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      mount_component(media, target, anchor);
      insert_hydration(target, t, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const media_changes = {};
      if (dirty[0] & /*$user*/
      128 | dirty[1] & /*$$scope*/
      32) {
        media_changes.$$scope = { dirty, ctx: ctx2 };
      }
      media.$set(media_changes);
      if (
        /*$user*/
        ctx2[7].homeys.length > 1
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty[0] & /*$user*/
          128) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_8(ctx2);
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
      transition_in(media.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(media.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
        detach(if_block_anchor);
      }
      destroy_component(media, detaching);
      if (if_block)
        if_block.d(detaching);
    }
  };
}
function create_default_slot_18(ctx) {
  let t_value = (
    /*$user*/
    ctx[7].firstname + ""
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
      if (dirty[0] & /*$user*/
      128 && t_value !== (t_value = /*$user*/
      ctx2[7].firstname + ""))
        set_data(t, t_value);
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
    /*$user*/
    ctx[7].email + ""
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
      if (dirty[0] & /*$user*/
      128 && t_value !== (t_value = /*$user*/
      ctx2[7].email + ""))
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
  let media_content_title;
  let t;
  let media_content_description;
  let current;
  media_content_title = new Media.Content.Title({
    props: {
      $$slots: { default: [create_default_slot_18] },
      $$scope: { ctx }
    }
  });
  media_content_description = new Media.Content.Description({
    props: {
      $$slots: { default: [create_default_slot_17] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(media_content_title.$$.fragment);
      t = space();
      create_component(media_content_description.$$.fragment);
    },
    l(nodes) {
      claim_component(media_content_title.$$.fragment, nodes);
      t = claim_space(nodes);
      claim_component(media_content_description.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(media_content_title, target, anchor);
      insert_hydration(target, t, anchor);
      mount_component(media_content_description, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const media_content_title_changes = {};
      if (dirty[0] & /*$user*/
      128 | dirty[1] & /*$$scope*/
      32) {
        media_content_title_changes.$$scope = { dirty, ctx: ctx2 };
      }
      media_content_title.$set(media_content_title_changes);
      const media_content_description_changes = {};
      if (dirty[0] & /*$user*/
      128 | dirty[1] & /*$$scope*/
      32) {
        media_content_description_changes.$$scope = { dirty, ctx: ctx2 };
      }
      media_content_description.$set(media_content_description_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(media_content_title.$$.fragment, local);
      transition_in(media_content_description.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(media_content_title.$$.fragment, local);
      transition_out(media_content_description.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
      destroy_component(media_content_title, detaching);
      destroy_component(media_content_description, detaching);
    }
  };
}
function create_default_slot_15(ctx) {
  let media_avatar;
  let t;
  let media_content;
  let current;
  media_avatar = new Media.Avatar({
    props: { src: (
      /*$user*/
      ctx[7].avatar.small
    ) }
  });
  media_content = new Media.Content({
    props: {
      $$slots: { default: [create_default_slot_16] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(media_avatar.$$.fragment);
      t = space();
      create_component(media_content.$$.fragment);
    },
    l(nodes) {
      claim_component(media_avatar.$$.fragment, nodes);
      t = claim_space(nodes);
      claim_component(media_content.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(media_avatar, target, anchor);
      insert_hydration(target, t, anchor);
      mount_component(media_content, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const media_avatar_changes = {};
      if (dirty[0] & /*$user*/
      128)
        media_avatar_changes.src = /*$user*/
        ctx2[7].avatar.small;
      media_avatar.$set(media_avatar_changes);
      const media_content_changes = {};
      if (dirty[0] & /*$user*/
      128 | dirty[1] & /*$$scope*/
      32) {
        media_content_changes.$$scope = { dirty, ctx: ctx2 };
      }
      media_content.$set(media_content_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(media_avatar.$$.fragment, local);
      transition_in(media_content.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(media_avatar.$$.fragment, local);
      transition_out(media_content.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
      destroy_component(media_avatar, detaching);
      destroy_component(media_content, detaching);
    }
  };
}
function create_if_block_8(ctx) {
  let divider;
  let t;
  let list;
  let current;
  divider = new Divider({
    props: {
      $$slots: { label: [create_label_slot_4] },
      $$scope: { ctx }
    }
  });
  list = new List({
    props: {
      $$slots: { default: [create_default_slot_12] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(divider.$$.fragment);
      t = space();
      create_component(list.$$.fragment);
    },
    l(nodes) {
      claim_component(divider.$$.fragment, nodes);
      t = claim_space(nodes);
      claim_component(list.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(divider, target, anchor);
      insert_hydration(target, t, anchor);
      mount_component(list, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const divider_changes = {};
      if (dirty[1] & /*$$scope*/
      32) {
        divider_changes.$$scope = { dirty, ctx: ctx2 };
      }
      divider.$set(divider_changes);
      const list_changes = {};
      if (dirty[0] & /*$user*/
      128 | dirty[1] & /*$$scope*/
      32) {
        list_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list.$set(list_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(divider.$$.fragment, local);
      transition_in(list.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(divider.$$.fragment, local);
      transition_out(list.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
      destroy_component(divider, detaching);
      destroy_component(list, detaching);
    }
  };
}
function create_default_slot_14(ctx) {
  let t;
  return {
    c() {
      t = text("Homeys");
    },
    l(nodes) {
      t = claim_text(nodes, "Homeys");
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
function create_label_slot_4(ctx) {
  let divider_label;
  let current;
  divider_label = new Divider.Label({
    props: {
      slot: "label",
      $$slots: { default: [create_default_slot_14] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(divider_label.$$.fragment);
    },
    l(nodes) {
      claim_component(divider_label.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(divider_label, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const divider_label_changes = {};
      if (dirty[1] & /*$$scope*/
      32) {
        divider_label_changes.$$scope = { dirty, ctx: ctx2 };
      }
      divider_label.$set(divider_label_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(divider_label.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(divider_label.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(divider_label, detaching);
    }
  };
}
function create_icon_slot_9(ctx) {
  let list_item_leading_icon;
  let current;
  list_item_leading_icon = new List.Item.Leading.Icon({
    props: { slot: "icon", data: mdiDeathStarVariant }
  });
  return {
    c() {
      create_component(list_item_leading_icon.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_leading_icon.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_leading_icon, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(list_item_leading_icon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_leading_icon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_leading_icon, detaching);
    }
  };
}
function create_leading_slot_4(ctx) {
  let list_item_leading;
  let current;
  list_item_leading = new List.Item.Leading({
    props: {
      slot: "leading",
      $$slots: { icon: [create_icon_slot_9] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(list_item_leading.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_leading.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_leading, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const list_item_leading_changes = {};
      if (dirty[1] & /*$$scope*/
      32) {
        list_item_leading_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list_item_leading.$set(list_item_leading_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list_item_leading.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_leading.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_leading, detaching);
    }
  };
}
function create_default_slot_13(ctx) {
  let t_value = (
    /*h*/
    ctx[53].name + ""
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
      if (dirty[0] & /*$user*/
      128 && t_value !== (t_value = /*h*/
      ctx2[53].name + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_title_slot_4(ctx) {
  let list_item_content_title;
  let current;
  list_item_content_title = new List.Item.Content.Title({
    props: {
      slot: "title",
      $$slots: { default: [create_default_slot_13] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(list_item_content_title.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_content_title.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_content_title, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const list_item_content_title_changes = {};
      if (dirty[0] & /*$user*/
      128 | dirty[1] & /*$$scope*/
      32) {
        list_item_content_title_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list_item_content_title.$set(list_item_content_title_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list_item_content_title.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_content_title.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_content_title, detaching);
    }
  };
}
function create_content_slot_4(ctx) {
  let list_item_content;
  let current;
  list_item_content = new List.Item.Content({
    props: {
      slot: "content",
      $$slots: { title: [create_title_slot_4] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(list_item_content.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_content.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_content, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const list_item_content_changes = {};
      if (dirty[0] & /*$user*/
      128 | dirty[1] & /*$$scope*/
      32) {
        list_item_content_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list_item_content.$set(list_item_content_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list_item_content.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_content.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_content, detaching);
    }
  };
}
function create_each_block_2(ctx) {
  let list_item;
  let current;
  function click_handler_1() {
    return (
      /*click_handler_1*/
      ctx[21](
        /*h*/
        ctx[53]
      )
    );
  }
  list_item = new List.Item({
    props: {
      class: "pt-2 pb-2 cursor-pointer",
      $$slots: {
        content: [create_content_slot_4],
        leading: [create_leading_slot_4]
      },
      $$scope: { ctx }
    }
  });
  list_item.$on("click", click_handler_1);
  return {
    c() {
      create_component(list_item.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item, target, anchor);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const list_item_changes = {};
      if (dirty[0] & /*$user*/
      128 | dirty[1] & /*$$scope*/
      32) {
        list_item_changes.$$scope = { dirty, ctx };
      }
      list_item.$set(list_item_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list_item.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item, detaching);
    }
  };
}
function create_default_slot_12(ctx) {
  let each_1_anchor;
  let current;
  let each_value_2 = ensure_array_like(
    /*$user*/
    ctx[7].homeys
  );
  let each_blocks = [];
  for (let i = 0; i < each_value_2.length; i += 1) {
    each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
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
      if (dirty[0] & /*selectHomey, $user*/
      16512) {
        each_value_2 = ensure_array_like(
          /*$user*/
          ctx2[7].homeys
        );
        let i;
        for (i = 0; i < each_value_2.length; i += 1) {
          const child_ctx = get_each_context_2(ctx2, each_value_2, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block_2(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        group_outros();
        for (i = each_value_2.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value_2.length; i += 1) {
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
function create_default_slot_11(ctx) {
  let t;
  return {
    c() {
      t = text("Dashboards");
    },
    l(nodes) {
      t = claim_text(nodes, "Dashboards");
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
function create_label_slot_3(ctx) {
  let divider_label;
  let current;
  divider_label = new Divider.Label({
    props: {
      slot: "label",
      $$slots: { default: [create_default_slot_11] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(divider_label.$$.fragment);
    },
    l(nodes) {
      claim_component(divider_label.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(divider_label, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const divider_label_changes = {};
      if (dirty[1] & /*$$scope*/
      32) {
        divider_label_changes.$$scope = { dirty, ctx: ctx2 };
      }
      divider_label.$set(divider_label_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(divider_label.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(divider_label.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(divider_label, detaching);
    }
  };
}
function create_icon_slot_8(ctx) {
  let list_item_leading_icon;
  let current;
  list_item_leading_icon = new List.Item.Leading.Icon({
    props: { slot: "icon", data: mdiViewDashboard }
  });
  return {
    c() {
      create_component(list_item_leading_icon.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_leading_icon.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_leading_icon, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(list_item_leading_icon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_leading_icon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_leading_icon, detaching);
    }
  };
}
function create_leading_slot_3(ctx) {
  let list_item_leading;
  let current;
  list_item_leading = new List.Item.Leading({
    props: {
      slot: "leading",
      $$slots: { icon: [create_icon_slot_8] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(list_item_leading.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_leading.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_leading, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const list_item_leading_changes = {};
      if (dirty[1] & /*$$scope*/
      32) {
        list_item_leading_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list_item_leading.$set(list_item_leading_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list_item_leading.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_leading.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_leading, detaching);
    }
  };
}
function create_default_slot_10(ctx) {
  let t_value = (
    /*d*/
    ctx[48].title + ""
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
      32 && t_value !== (t_value = /*d*/
      ctx2[48].title + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_title_slot_3(ctx) {
  let list_item_content_title;
  let current;
  list_item_content_title = new List.Item.Content.Title({
    props: {
      slot: "title",
      $$slots: { default: [create_default_slot_10] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(list_item_content_title.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_content_title.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_content_title, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const list_item_content_title_changes = {};
      if (dirty[0] & /*dashboards*/
      32 | dirty[1] & /*$$scope*/
      32) {
        list_item_content_title_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list_item_content_title.$set(list_item_content_title_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list_item_content_title.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_content_title.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_content_title, detaching);
    }
  };
}
function create_content_slot_3(ctx) {
  let list_item_content;
  let current;
  list_item_content = new List.Item.Content({
    props: {
      slot: "content",
      $$slots: { title: [create_title_slot_3] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(list_item_content.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_content.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_content, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const list_item_content_changes = {};
      if (dirty[0] & /*dashboards*/
      32 | dirty[1] & /*$$scope*/
      32) {
        list_item_content_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list_item_content.$set(list_item_content_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list_item_content.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_content.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_content, detaching);
    }
  };
}
function create_each_block_1(ctx) {
  let list_item;
  let current;
  function click_handler_2() {
    return (
      /*click_handler_2*/
      ctx[22](
        /*d*/
        ctx[48]
      )
    );
  }
  list_item = new List.Item({
    props: {
      class: "pt-2 pb-2 cursor-pointer",
      $$slots: {
        content: [create_content_slot_3],
        leading: [create_leading_slot_3]
      },
      $$scope: { ctx }
    }
  });
  list_item.$on("click", click_handler_2);
  return {
    c() {
      create_component(list_item.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item, target, anchor);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const list_item_changes = {};
      if (dirty[0] & /*dashboards*/
      32 | dirty[1] & /*$$scope*/
      32) {
        list_item_changes.$$scope = { dirty, ctx };
      }
      list_item.$set(list_item_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list_item.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item, detaching);
    }
  };
}
function create_default_slot_9(ctx) {
  let each_1_anchor;
  let current;
  let each_value_1 = ensure_array_like(
    /*dashboards*/
    ctx[5]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
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
      if (dirty[0] & /*openDashboard, dashboards*/
      2080) {
        each_value_1 = ensure_array_like(
          /*dashboards*/
          ctx2[5]
        );
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_1(ctx2, each_value_1, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block_1(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        group_outros();
        for (i = each_value_1.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value_1.length; i += 1) {
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
function create_default_slot_8(ctx) {
  let t;
  return {
    c() {
      t = text("Tools");
    },
    l(nodes) {
      t = claim_text(nodes, "Tools");
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
function create_label_slot_2(ctx) {
  let divider_label;
  let current;
  divider_label = new Divider.Label({
    props: {
      slot: "label",
      $$slots: { default: [create_default_slot_8] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(divider_label.$$.fragment);
    },
    l(nodes) {
      claim_component(divider_label.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(divider_label, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const divider_label_changes = {};
      if (dirty[1] & /*$$scope*/
      32) {
        divider_label_changes.$$scope = { dirty, ctx: ctx2 };
      }
      divider_label.$set(divider_label_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(divider_label.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(divider_label.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(divider_label, detaching);
    }
  };
}
function create_if_block_6(ctx) {
  let list_item0;
  let t;
  let list_item1;
  let current;
  list_item0 = new List.Item({
    props: {
      class: "pt-2 pb-2 cursor-pointer",
      $$slots: {
        content: [create_content_slot_2],
        leading: [create_leading_slot_2]
      },
      $$scope: { ctx }
    }
  });
  list_item0.$on(
    "click",
    /*click_handler_3*/
    ctx[23]
  );
  list_item1 = new List.Item({
    props: {
      class: "pt-2 pb-2 cursor-pointer",
      $$slots: {
        content: [create_content_slot_1],
        leading: [create_leading_slot_1]
      },
      $$scope: { ctx }
    }
  });
  list_item1.$on(
    "click",
    /*click_handler_4*/
    ctx[24]
  );
  return {
    c() {
      create_component(list_item0.$$.fragment);
      t = space();
      create_component(list_item1.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item0.$$.fragment, nodes);
      t = claim_space(nodes);
      claim_component(list_item1.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item0, target, anchor);
      insert_hydration(target, t, anchor);
      mount_component(list_item1, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const list_item0_changes = {};
      if (dirty[1] & /*$$scope*/
      32) {
        list_item0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list_item0.$set(list_item0_changes);
      const list_item1_changes = {};
      if (dirty[1] & /*$$scope*/
      32) {
        list_item1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list_item1.$set(list_item1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list_item0.$$.fragment, local);
      transition_in(list_item1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item0.$$.fragment, local);
      transition_out(list_item1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
      destroy_component(list_item0, detaching);
      destroy_component(list_item1, detaching);
    }
  };
}
function create_icon_slot_7(ctx) {
  let list_item_leading_icon;
  let current;
  list_item_leading_icon = new List.Item.Leading.Icon({
    props: {
      slot: "icon",
      color: "content",
      data: mdiViewDashboardEdit
    }
  });
  return {
    c() {
      create_component(list_item_leading_icon.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_leading_icon.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_leading_icon, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(list_item_leading_icon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_leading_icon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_leading_icon, detaching);
    }
  };
}
function create_leading_slot_2(ctx) {
  let list_item_leading;
  let current;
  list_item_leading = new List.Item.Leading({
    props: {
      slot: "leading",
      class: "bg-surface",
      $$slots: { icon: [create_icon_slot_7] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(list_item_leading.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_leading.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_leading, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const list_item_leading_changes = {};
      if (dirty[1] & /*$$scope*/
      32) {
        list_item_leading_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list_item_leading.$set(list_item_leading_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list_item_leading.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_leading.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_leading, detaching);
    }
  };
}
function create_default_slot_7(ctx) {
  let t;
  return {
    c() {
      t = text("Edit widgets");
    },
    l(nodes) {
      t = claim_text(nodes, "Edit widgets");
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
function create_title_slot_2(ctx) {
  let list_item_content_title;
  let current;
  list_item_content_title = new List.Item.Content.Title({
    props: {
      slot: "title",
      $$slots: { default: [create_default_slot_7] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(list_item_content_title.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_content_title.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_content_title, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const list_item_content_title_changes = {};
      if (dirty[1] & /*$$scope*/
      32) {
        list_item_content_title_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list_item_content_title.$set(list_item_content_title_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list_item_content_title.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_content_title.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_content_title, detaching);
    }
  };
}
function create_content_slot_2(ctx) {
  let list_item_content;
  let current;
  list_item_content = new List.Item.Content({
    props: {
      slot: "content",
      $$slots: { title: [create_title_slot_2] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(list_item_content.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_content.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_content, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const list_item_content_changes = {};
      if (dirty[1] & /*$$scope*/
      32) {
        list_item_content_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list_item_content.$set(list_item_content_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list_item_content.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_content.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_content, detaching);
    }
  };
}
function create_icon_slot_6(ctx) {
  let list_item_leading_icon;
  let current;
  list_item_leading_icon = new List.Item.Leading.Icon({
    props: {
      slot: "icon",
      color: "content",
      data: mdiCog
    }
  });
  return {
    c() {
      create_component(list_item_leading_icon.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_leading_icon.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_leading_icon, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(list_item_leading_icon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_leading_icon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_leading_icon, detaching);
    }
  };
}
function create_leading_slot_1(ctx) {
  let list_item_leading;
  let current;
  list_item_leading = new List.Item.Leading({
    props: {
      slot: "leading",
      class: "bg-surface",
      $$slots: { icon: [create_icon_slot_6] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(list_item_leading.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_leading.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_leading, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const list_item_leading_changes = {};
      if (dirty[1] & /*$$scope*/
      32) {
        list_item_leading_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list_item_leading.$set(list_item_leading_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list_item_leading.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_leading.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_leading, detaching);
    }
  };
}
function create_default_slot_6(ctx) {
  let t;
  return {
    c() {
      t = text("Dashboard settings");
    },
    l(nodes) {
      t = claim_text(nodes, "Dashboard settings");
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
function create_title_slot_1(ctx) {
  let list_item_content_title;
  let current;
  list_item_content_title = new List.Item.Content.Title({
    props: {
      slot: "title",
      $$slots: { default: [create_default_slot_6] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(list_item_content_title.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_content_title.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_content_title, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const list_item_content_title_changes = {};
      if (dirty[1] & /*$$scope*/
      32) {
        list_item_content_title_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list_item_content_title.$set(list_item_content_title_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list_item_content_title.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_content_title.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_content_title, detaching);
    }
  };
}
function create_content_slot_1(ctx) {
  let list_item_content;
  let current;
  list_item_content = new List.Item.Content({
    props: {
      slot: "content",
      $$slots: { title: [create_title_slot_1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(list_item_content.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_content.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_content, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const list_item_content_changes = {};
      if (dirty[1] & /*$$scope*/
      32) {
        list_item_content_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list_item_content.$set(list_item_content_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list_item_content.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_content.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_content, detaching);
    }
  };
}
function create_icon_slot_5(ctx) {
  let list_item_leading_icon;
  let current;
  list_item_leading_icon = new List.Item.Leading.Icon({
    props: {
      slot: "icon",
      color: "content",
      data: mdiPlus
    }
  });
  return {
    c() {
      create_component(list_item_leading_icon.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_leading_icon.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_leading_icon, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(list_item_leading_icon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_leading_icon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_leading_icon, detaching);
    }
  };
}
function create_leading_slot(ctx) {
  let list_item_leading;
  let current;
  list_item_leading = new List.Item.Leading({
    props: {
      slot: "leading",
      class: "bg-surface",
      $$slots: { icon: [create_icon_slot_5] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(list_item_leading.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_leading.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_leading, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const list_item_leading_changes = {};
      if (dirty[1] & /*$$scope*/
      32) {
        list_item_leading_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list_item_leading.$set(list_item_leading_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list_item_leading.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_leading.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_leading, detaching);
    }
  };
}
function create_default_slot_5(ctx) {
  let t;
  return {
    c() {
      t = text("Add local dashboard");
    },
    l(nodes) {
      t = claim_text(nodes, "Add local dashboard");
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
function create_title_slot(ctx) {
  let list_item_content_title;
  let current;
  list_item_content_title = new List.Item.Content.Title({
    props: {
      slot: "title",
      $$slots: { default: [create_default_slot_5] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(list_item_content_title.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_content_title.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_content_title, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const list_item_content_title_changes = {};
      if (dirty[1] & /*$$scope*/
      32) {
        list_item_content_title_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list_item_content_title.$set(list_item_content_title_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list_item_content_title.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_content_title.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_content_title, detaching);
    }
  };
}
function create_content_slot(ctx) {
  let list_item_content;
  let current;
  list_item_content = new List.Item.Content({
    props: {
      slot: "content",
      $$slots: { title: [create_title_slot] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(list_item_content.$$.fragment);
    },
    l(nodes) {
      claim_component(list_item_content.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_item_content, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const list_item_content_changes = {};
      if (dirty[1] & /*$$scope*/
      32) {
        list_item_content_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list_item_content.$set(list_item_content_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list_item_content.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_item_content.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_item_content, detaching);
    }
  };
}
function create_default_slot_4(ctx) {
  let t;
  let list_item;
  let current;
  let if_block = (
    /*$dashboard*/
    ctx[8] !== void 0 && create_if_block_6(ctx)
  );
  list_item = new List.Item({
    props: {
      class: "pt-2 pb-2 cursor-pointer",
      $$slots: {
        content: [create_content_slot],
        leading: [create_leading_slot]
      },
      $$scope: { ctx }
    }
  });
  list_item.$on(
    "click",
    /*click_handler_5*/
    ctx[25]
  );
  return {
    c() {
      if (if_block)
        if_block.c();
      t = space();
      create_component(list_item.$$.fragment);
    },
    l(nodes) {
      if (if_block)
        if_block.l(nodes);
      t = claim_space(nodes);
      claim_component(list_item.$$.fragment, nodes);
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, t, anchor);
      mount_component(list_item, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
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
          if_block = create_if_block_6(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(t.parentNode, t);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      const list_item_changes = {};
      if (dirty[1] & /*$$scope*/
      32) {
        list_item_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list_item.$set(list_item_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      transition_in(list_item.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      transition_out(list_item.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
      if (if_block)
        if_block.d(detaching);
      destroy_component(list_item, detaching);
    }
  };
}
function create_label_slot_1(ctx) {
  let divider_label;
  let current;
  divider_label = new Divider.Label({ props: { slot: "label" } });
  return {
    c() {
      create_component(divider_label.$$.fragment);
    },
    l(nodes) {
      claim_component(divider_label.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(divider_label, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(divider_label.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(divider_label.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(divider_label, detaching);
    }
  };
}
function create_default_slot_3(ctx) {
  let t;
  return {
    c() {
      t = text("Toolbar open");
    },
    l(nodes) {
      t = claim_text(nodes, "Toolbar open");
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
function create_label_slot(ctx) {
  let toggle_contentleft_label;
  let current;
  toggle_contentleft_label = new Toggle.ContentLeft.Label({
    props: {
      slot: "label",
      $$slots: { default: [create_default_slot_3] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(toggle_contentleft_label.$$.fragment);
    },
    l(nodes) {
      claim_component(toggle_contentleft_label.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(toggle_contentleft_label, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const toggle_contentleft_label_changes = {};
      if (dirty[1] & /*$$scope*/
      32) {
        toggle_contentleft_label_changes.$$scope = { dirty, ctx: ctx2 };
      }
      toggle_contentleft_label.$set(toggle_contentleft_label_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(toggle_contentleft_label.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(toggle_contentleft_label.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(toggle_contentleft_label, detaching);
    }
  };
}
function create_content_left_slot(ctx) {
  let toggle_contentleft;
  let current;
  toggle_contentleft = new Toggle.ContentLeft({
    props: {
      slot: "content-left",
      $$slots: { label: [create_label_slot] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(toggle_contentleft.$$.fragment);
    },
    l(nodes) {
      claim_component(toggle_contentleft.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(toggle_contentleft, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const toggle_contentleft_changes = {};
      if (dirty[1] & /*$$scope*/
      32) {
        toggle_contentleft_changes.$$scope = { dirty, ctx: ctx2 };
      }
      toggle_contentleft.$set(toggle_contentleft_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(toggle_contentleft.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(toggle_contentleft.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(toggle_contentleft, detaching);
    }
  };
}
function create_default_slot_2(ctx) {
  let t0;
  let divider0;
  let t1;
  let list0;
  let t2;
  let divider1;
  let t3;
  let list1;
  let t4;
  let divider2;
  let t5;
  let toggle;
  let updating_on;
  let current;
  let if_block = (
    /*$user*/
    ctx[7] !== void 0 && create_if_block_7(ctx)
  );
  divider0 = new Divider({
    props: {
      $$slots: { label: [create_label_slot_3] },
      $$scope: { ctx }
    }
  });
  list0 = new List({
    props: {
      $$slots: { default: [create_default_slot_9] },
      $$scope: { ctx }
    }
  });
  divider1 = new Divider({
    props: {
      $$slots: { label: [create_label_slot_2] },
      $$scope: { ctx }
    }
  });
  list1 = new List({
    props: {
      $$slots: { default: [create_default_slot_4] },
      $$scope: { ctx }
    }
  });
  divider2 = new Divider({
    props: {
      $$slots: { label: [create_label_slot_1] },
      $$scope: { ctx }
    }
  });
  function toggle_on_binding(value) {
    ctx[26](value);
  }
  let toggle_props = {
    name: "toolbarOpen",
    $$slots: {
      "content-left": [create_content_left_slot]
    },
    $$scope: { ctx }
  };
  if (
    /*toolbarOpen*/
    ctx[2] !== void 0
  ) {
    toggle_props.on = /*toolbarOpen*/
    ctx[2];
  }
  toggle = new Toggle({ props: toggle_props });
  binding_callbacks.push(() => bind(toggle, "on", toggle_on_binding));
  return {
    c() {
      if (if_block)
        if_block.c();
      t0 = space();
      create_component(divider0.$$.fragment);
      t1 = space();
      create_component(list0.$$.fragment);
      t2 = space();
      create_component(divider1.$$.fragment);
      t3 = space();
      create_component(list1.$$.fragment);
      t4 = space();
      create_component(divider2.$$.fragment);
      t5 = space();
      create_component(toggle.$$.fragment);
    },
    l(nodes) {
      if (if_block)
        if_block.l(nodes);
      t0 = claim_space(nodes);
      claim_component(divider0.$$.fragment, nodes);
      t1 = claim_space(nodes);
      claim_component(list0.$$.fragment, nodes);
      t2 = claim_space(nodes);
      claim_component(divider1.$$.fragment, nodes);
      t3 = claim_space(nodes);
      claim_component(list1.$$.fragment, nodes);
      t4 = claim_space(nodes);
      claim_component(divider2.$$.fragment, nodes);
      t5 = claim_space(nodes);
      claim_component(toggle.$$.fragment, nodes);
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, t0, anchor);
      mount_component(divider0, target, anchor);
      insert_hydration(target, t1, anchor);
      mount_component(list0, target, anchor);
      insert_hydration(target, t2, anchor);
      mount_component(divider1, target, anchor);
      insert_hydration(target, t3, anchor);
      mount_component(list1, target, anchor);
      insert_hydration(target, t4, anchor);
      mount_component(divider2, target, anchor);
      insert_hydration(target, t5, anchor);
      mount_component(toggle, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (
        /*$user*/
        ctx2[7] !== void 0
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty[0] & /*$user*/
          128) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_7(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(t0.parentNode, t0);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      const divider0_changes = {};
      if (dirty[1] & /*$$scope*/
      32) {
        divider0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      divider0.$set(divider0_changes);
      const list0_changes = {};
      if (dirty[0] & /*dashboards*/
      32 | dirty[1] & /*$$scope*/
      32) {
        list0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list0.$set(list0_changes);
      const divider1_changes = {};
      if (dirty[1] & /*$$scope*/
      32) {
        divider1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      divider1.$set(divider1_changes);
      const list1_changes = {};
      if (dirty[0] & /*$dashboard*/
      256 | dirty[1] & /*$$scope*/
      32) {
        list1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list1.$set(list1_changes);
      const divider2_changes = {};
      if (dirty[1] & /*$$scope*/
      32) {
        divider2_changes.$$scope = { dirty, ctx: ctx2 };
      }
      divider2.$set(divider2_changes);
      const toggle_changes = {};
      if (dirty[1] & /*$$scope*/
      32) {
        toggle_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_on && dirty[0] & /*toolbarOpen*/
      4) {
        updating_on = true;
        toggle_changes.on = /*toolbarOpen*/
        ctx2[2];
        add_flush_callback(() => updating_on = false);
      }
      toggle.$set(toggle_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      transition_in(divider0.$$.fragment, local);
      transition_in(list0.$$.fragment, local);
      transition_in(divider1.$$.fragment, local);
      transition_in(list1.$$.fragment, local);
      transition_in(divider2.$$.fragment, local);
      transition_in(toggle.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      transition_out(divider0.$$.fragment, local);
      transition_out(list0.$$.fragment, local);
      transition_out(divider1.$$.fragment, local);
      transition_out(list1.$$.fragment, local);
      transition_out(divider2.$$.fragment, local);
      transition_out(toggle.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t0);
        detach(t1);
        detach(t2);
        detach(t3);
        detach(t4);
        detach(t5);
      }
      if (if_block)
        if_block.d(detaching);
      destroy_component(divider0, detaching);
      destroy_component(list0, detaching);
      destroy_component(divider1, detaching);
      destroy_component(list1, detaching);
      destroy_component(divider2, detaching);
      destroy_component(toggle, detaching);
    }
  };
}
function create_if_block_2(ctx) {
  let header;
  let button0;
  let t0;
  let dropdown;
  let updating_visible;
  let t1;
  let t2;
  let div;
  let button1;
  let t3;
  let current;
  button0 = new Button({
    props: {
      $$slots: { icon: [create_icon_slot_4] },
      $$scope: { ctx }
    }
  });
  button0.$on(
    "click",
    /*click_handler_6*/
    ctx[28]
  );
  function dropdown_visible_binding(value) {
    ctx[31](value);
  }
  let dropdown_props = {
    $$slots: {
      items: [create_items_slot],
      trigger: [create_trigger_slot]
    },
    $$scope: { ctx }
  };
  if (
    /*dashboardMenuOpen*/
    ctx[3] !== void 0
  ) {
    dropdown_props.visible = /*dashboardMenuOpen*/
    ctx[3];
  }
  dropdown = new Dropdown({ props: dropdown_props });
  binding_callbacks.push(() => bind(dropdown, "visible", dropdown_visible_binding));
  let if_block0 = (
    /*$dashboard*/
    ctx[8] !== void 0 && create_if_block_4(ctx)
  );
  button1 = new Button({
    props: {
      $$slots: { icon: [create_icon_slot_2] },
      $$scope: { ctx }
    }
  });
  button1.$on(
    "click",
    /*click_handler_10*/
    ctx[33]
  );
  let if_block1 = (
    /*$dashboard*/
    ctx[8] !== void 0 && create_if_block_3(ctx)
  );
  return {
    c() {
      header = element("header");
      create_component(button0.$$.fragment);
      t0 = space();
      create_component(dropdown.$$.fragment);
      t1 = space();
      if (if_block0)
        if_block0.c();
      t2 = space();
      div = element("div");
      create_component(button1.$$.fragment);
      t3 = space();
      if (if_block1)
        if_block1.c();
      this.h();
    },
    l(nodes) {
      header = claim_element(nodes, "HEADER", { class: true });
      var header_nodes = children(header);
      claim_component(button0.$$.fragment, header_nodes);
      t0 = claim_space(header_nodes);
      claim_component(dropdown.$$.fragment, header_nodes);
      t1 = claim_space(header_nodes);
      if (if_block0)
        if_block0.l(header_nodes);
      t2 = claim_space(header_nodes);
      div = claim_element(header_nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(button1.$$.fragment, div_nodes);
      t3 = claim_space(div_nodes);
      if (if_block1)
        if_block1.l(div_nodes);
      div_nodes.forEach(detach);
      header_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "flex flex-grow justify-end");
      attr(header, "class", "w-full sticky z-0 drop-shadow-lg p-4 bg-primary flex flex-row");
    },
    m(target, anchor) {
      insert_hydration(target, header, anchor);
      mount_component(button0, header, null);
      append_hydration(header, t0);
      mount_component(dropdown, header, null);
      append_hydration(header, t1);
      if (if_block0)
        if_block0.m(header, null);
      append_hydration(header, t2);
      append_hydration(header, div);
      mount_component(button1, div, null);
      append_hydration(div, t3);
      if (if_block1)
        if_block1.m(div, null);
      current = true;
    },
    p(ctx2, dirty) {
      const button0_changes = {};
      if (dirty[1] & /*$$scope*/
      32) {
        button0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      button0.$set(button0_changes);
      const dropdown_changes = {};
      if (dirty[0] & /*dashboards, $dashboard, dashboardMenuOpen*/
      296 | dirty[1] & /*$$scope*/
      32) {
        dropdown_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_visible && dirty[0] & /*dashboardMenuOpen*/
      8) {
        updating_visible = true;
        dropdown_changes.visible = /*dashboardMenuOpen*/
        ctx2[3];
        add_flush_callback(() => updating_visible = false);
      }
      dropdown.$set(dropdown_changes);
      if (
        /*$dashboard*/
        ctx2[8] !== void 0
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty[0] & /*$dashboard*/
          256) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_4(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(header, t2);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      const button1_changes = {};
      if (dirty[1] & /*$$scope*/
      32) {
        button1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      button1.$set(button1_changes);
      if (
        /*$dashboard*/
        ctx2[8] !== void 0
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty[0] & /*$dashboard*/
          256) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_3(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div, null);
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
      transition_in(button0.$$.fragment, local);
      transition_in(dropdown.$$.fragment, local);
      transition_in(if_block0);
      transition_in(button1.$$.fragment, local);
      transition_in(if_block1);
      current = true;
    },
    o(local) {
      transition_out(button0.$$.fragment, local);
      transition_out(dropdown.$$.fragment, local);
      transition_out(if_block0);
      transition_out(button1.$$.fragment, local);
      transition_out(if_block1);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(header);
      }
      destroy_component(button0);
      destroy_component(dropdown);
      if (if_block0)
        if_block0.d();
      destroy_component(button1);
      if (if_block1)
        if_block1.d();
    }
  };
}
function create_icon_slot_4(ctx) {
  let button_icon;
  let current;
  button_icon = new Button.Icon({ props: { slot: "icon", data: mdiMenu } });
  return {
    c() {
      create_component(button_icon.$$.fragment);
    },
    l(nodes) {
      claim_component(button_icon.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(button_icon, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(button_icon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button_icon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(button_icon, detaching);
    }
  };
}
function create_icon_slot_3(ctx) {
  let button_icon;
  let current;
  button_icon = new Button.Icon({
    props: { slot: "icon", data: mdiViewDashboard }
  });
  return {
    c() {
      create_component(button_icon.$$.fragment);
    },
    l(nodes) {
      claim_component(button_icon.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(button_icon, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(button_icon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button_icon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(button_icon, detaching);
    }
  };
}
function create_trigger_slot(ctx) {
  let button;
  let current;
  button = new Button({
    props: {
      slot: "trigger",
      $$slots: { icon: [create_icon_slot_3] },
      $$scope: { ctx }
    }
  });
  button.$on(
    "click",
    /*click_handler_8*/
    ctx[30]
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
      if (dirty[1] & /*$$scope*/
      32) {
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
function create_if_block_5(ctx) {
  let dropdown_items_item;
  let current;
  function click_handler_7() {
    return (
      /*click_handler_7*/
      ctx[29](
        /*d*/
        ctx[48]
      )
    );
  }
  dropdown_items_item = new Dropdown.Items.Item({ props: { label: (
    /*d*/
    ctx[48].title
  ) } });
  dropdown_items_item.$on("click", click_handler_7);
  return {
    c() {
      create_component(dropdown_items_item.$$.fragment);
    },
    l(nodes) {
      claim_component(dropdown_items_item.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(dropdown_items_item, target, anchor);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const dropdown_items_item_changes = {};
      if (dirty[0] & /*dashboards*/
      32)
        dropdown_items_item_changes.label = /*d*/
        ctx[48].title;
      dropdown_items_item.$set(dropdown_items_item_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(dropdown_items_item.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(dropdown_items_item.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(dropdown_items_item, detaching);
    }
  };
}
function create_each_block(ctx) {
  let if_block_anchor;
  let current;
  let if_block = (
    /*$dashboard*/
    (ctx[8] === void 0 || /*$dashboard*/
    ctx[8].id !== /*d*/
    ctx[48].id) && create_if_block_5(ctx)
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
        /*$dashboard*/
        ctx2[8] === void 0 || /*$dashboard*/
        ctx2[8].id !== /*d*/
        ctx2[48].id
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty[0] & /*$dashboard, dashboards*/
          288) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_5(ctx2);
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
  let each_1_anchor;
  let current;
  let each_value = ensure_array_like(
    /*dashboards*/
    ctx[5]
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
      if (dirty[0] & /*dashboards, openDashboard, $dashboard*/
      2336) {
        each_value = ensure_array_like(
          /*dashboards*/
          ctx2[5]
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
function create_items_slot(ctx) {
  let dropdown_items;
  let current;
  dropdown_items = new Dropdown.Items({
    props: {
      slot: "items",
      $$slots: { default: [create_default_slot_1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(dropdown_items.$$.fragment);
    },
    l(nodes) {
      claim_component(dropdown_items.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(dropdown_items, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const dropdown_items_changes = {};
      if (dirty[0] & /*dashboards, $dashboard*/
      288 | dirty[1] & /*$$scope*/
      32) {
        dropdown_items_changes.$$scope = { dirty, ctx: ctx2 };
      }
      dropdown_items.$set(dropdown_items_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(dropdown_items.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(dropdown_items.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(dropdown_items, detaching);
    }
  };
}
function create_if_block_4(ctx) {
  let button;
  let current;
  button = new Button({
    props: {
      $$slots: { default: [create_default_slot] },
      $$scope: { ctx }
    }
  });
  button.$on(
    "click",
    /*click_handler_9*/
    ctx[32]
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
      if (dirty[0] & /*$dashboard*/
      256 | dirty[1] & /*$$scope*/
      32) {
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
function create_default_slot(ctx) {
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
function create_icon_slot_2(ctx) {
  let button_icon;
  let current;
  button_icon = new Button.Icon({ props: { slot: "icon", data: mdiPlus } });
  return {
    c() {
      create_component(button_icon.$$.fragment);
    },
    l(nodes) {
      claim_component(button_icon.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(button_icon, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(button_icon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button_icon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(button_icon, detaching);
    }
  };
}
function create_if_block_3(ctx) {
  let button0;
  let t;
  let button1;
  let current;
  button0 = new Button({
    props: {
      $$slots: { icon: [create_icon_slot_1] },
      $$scope: { ctx }
    }
  });
  button0.$on(
    "click",
    /*click_handler_11*/
    ctx[34]
  );
  button1 = new Button({
    props: {
      $$slots: { icon: [create_icon_slot] },
      $$scope: { ctx }
    }
  });
  button1.$on(
    "click",
    /*click_handler_12*/
    ctx[35]
  );
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
      if (dirty[1] & /*$$scope*/
      32) {
        button0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      button0.$set(button0_changes);
      const button1_changes = {};
      if (dirty[1] & /*$$scope*/
      32) {
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
function create_icon_slot_1(ctx) {
  let button_icon;
  let current;
  button_icon = new Button.Icon({
    props: { slot: "icon", data: mdiViewDashboardEdit }
  });
  return {
    c() {
      create_component(button_icon.$$.fragment);
    },
    l(nodes) {
      claim_component(button_icon.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(button_icon, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(button_icon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button_icon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(button_icon, detaching);
    }
  };
}
function create_icon_slot(ctx) {
  let button_icon;
  let current;
  button_icon = new Button.Icon({ props: { slot: "icon", data: mdiCog } });
  return {
    c() {
      create_component(button_icon.$$.fragment);
    },
    l(nodes) {
      claim_component(button_icon.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(button_icon, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(button_icon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button_icon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(button_icon, detaching);
    }
  };
}
function create_fragment(ctx) {
  let t;
  let div;
  let current_block_type_index;
  let if_block;
  let current;
  const if_block_creators = [create_if_block, create_if_block_1, create_else_block];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*loading*/
      ctx2[0]
    )
      return 0;
    if (
      /*$homey*/
      ctx2[6] !== void 0
    )
      return 1;
    return 2;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      t = space();
      div = element("div");
      if_block.c();
      this.h();
    },
    l(nodes) {
      const head_nodes = head_selector("svelte-t9xcep", document.head);
      head_nodes.forEach(detach);
      t = claim_space(nodes);
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      if_block.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      document.title = "Dashboard";
      attr(div, "class", "w-full h-full");
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
      insert_hydration(target, div, anchor);
      if_blocks[current_block_type_index].m(div, null);
      current = true;
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
        detach(t);
        detach(div);
      }
      if_blocks[current_block_type_index].d();
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
  let $user;
  let $dashboard;
  component_subscribe($$self, homey, ($$value) => $$invalidate(6, $homey = $$value));
  component_subscribe($$self, scopes, ($$value) => $$invalidate(38, $scopes = $$value));
  component_subscribe($$self, apiKey, ($$value) => $$invalidate(39, $apiKey = $$value));
  component_subscribe($$self, baseUrl, ($$value) => $$invalidate(40, $baseUrl = $$value));
  component_subscribe($$self, dashboards, ($$value) => $$invalidate(15, $localDashboards = $$value));
  component_subscribe($$self, dashboards$1, ($$value) => $$invalidate(16, $homeyDashboards = $$value));
  component_subscribe($$self, user, ($$value) => $$invalidate(7, $user = $$value));
  component_subscribe($$self, dashboard, ($$value) => $$invalidate(8, $dashboard = $$value));
  let { $$slots: slots = {}, $$scope } = $$props;
  let loading = true;
  let menuOpen = false;
  let toolbarOpen = false;
  let dashboardMenuOpen = false;
  let addDashboardOpen = false;
  onMount(async () => {
    await loadData();
  });
  async function loadData() {
    $$invalidate(0, loading = true);
    await connectHomey();
    if ($homey !== void 0) {
      await loadSession();
      await loadDevices();
      await loadFlows();
      await loadZones();
      await loadInsights();
    }
    $$invalidate(0, loading = false);
  }
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
          const usr = await cloudApi.getAuthenticatedUser();
          const firstHomey = await usr.getFirstHomey();
          const instance2 = await firstHomey.authenticate();
          user.set(usr);
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
    }
    $$invalidate(0, loading = false);
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
            capability.lastUpdated = event.transactionTime;
          });
        });
        devices.set(d);
      }
    } catch (e) {
    }
  }
  async function loadFlows() {
    try {
      if ($scopes.includes("homey") || $scopes.includes("homey.flow") || $scopes.includes("homey.flow.readonly") || $scopes.includes("homey.flow.start")) {
        await $homey.flow.connect();
        const folders = await $homey.flow.getFlowFolders();
        const basic = await $homey.flow.getFlows();
        const advanced = await $homey.flow.getAdvancedFlows();
        flowFolders.set(folders);
        basicFlows.set(basic);
        advancedFlows.set(advanced);
        $homey.flow.on("flow.create", (e) => basicFlows.onCreate(e));
        $homey.flow.on("flow.delete", (e) => basicFlows.onDelete(e));
        $homey.flow.on("advancedflow.create", (e) => advancedFlows.onCreate(e));
        $homey.flow.on("advancedflow.delete", (e) => advancedFlows.onDelete(e));
      }
    } catch (e) {
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
    }
  }
  function toggleEdit() {
    editing.toggle();
    $$invalidate(1, menuOpen = false);
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
  function openDashboard(dash) {
    $$invalidate(1, menuOpen = false);
    $$invalidate(3, dashboardMenuOpen = false);
    return goto(base + "/board?id=" + dash.id);
  }
  function openDashboardSettings(dash) {
    $$invalidate(1, menuOpen = false);
    return goto(base + "/board/settings?id=" + dash.id);
  }
  function openAddDashboard() {
    $$invalidate(1, menuOpen = false);
    $$invalidate(4, addDashboardOpen = true);
  }
  async function selectHomey(h) {
    const instance2 = await h.authenticate();
    homey.set(instance2);
    dashboard.set(void 0);
    await goto(base + "/");
    $$invalidate(1, menuOpen = false);
  }
  const click_handler = () => $$invalidate(1, menuOpen = true);
  function adddashboarddialog_open_binding(value) {
    addDashboardOpen = value;
    $$invalidate(4, addDashboardOpen);
  }
  const value_handler = (v) => addDashboard(v.detail);
  const click_handler_1 = (h) => selectHomey(h);
  const click_handler_2 = (d) => openDashboard(d);
  const click_handler_3 = () => toggleEdit();
  const click_handler_4 = () => openDashboardSettings($dashboard);
  const click_handler_5 = () => openAddDashboard();
  function toggle_on_binding(value) {
    toolbarOpen = value;
    $$invalidate(2, toolbarOpen);
  }
  function drawer_open_binding(value) {
    menuOpen = value;
    $$invalidate(1, menuOpen);
  }
  const click_handler_6 = () => $$invalidate(1, menuOpen = true);
  const click_handler_7 = (d) => openDashboard(d);
  const click_handler_8 = () => $$invalidate(3, dashboardMenuOpen = !dashboardMenuOpen);
  function dropdown_visible_binding(value) {
    dashboardMenuOpen = value;
    $$invalidate(3, dashboardMenuOpen);
  }
  const click_handler_9 = () => goto(base + "/board?id=" + $dashboard.id);
  const click_handler_10 = () => $$invalidate(4, addDashboardOpen = true);
  const click_handler_11 = () => toggleEdit();
  const click_handler_12 = () => goto(base + "/board/settings?id=" + $dashboard.id);
  $$self.$$set = ($$props2) => {
    if ("$$scope" in $$props2)
      $$invalidate(36, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & /*$homeyDashboards, $localDashboards*/
    98304) {
      $$invalidate(5, dashboards$2 = Object.values({ ...$homeyDashboards, ...$localDashboards }));
    }
  };
  return [
    loading,
    menuOpen,
    toolbarOpen,
    dashboardMenuOpen,
    addDashboardOpen,
    dashboards$2,
    $homey,
    $user,
    $dashboard,
    toggleEdit,
    addDashboard,
    openDashboard,
    openDashboardSettings,
    openAddDashboard,
    selectHomey,
    $localDashboards,
    $homeyDashboards,
    slots,
    click_handler,
    adddashboarddialog_open_binding,
    value_handler,
    click_handler_1,
    click_handler_2,
    click_handler_3,
    click_handler_4,
    click_handler_5,
    toggle_on_binding,
    drawer_open_binding,
    click_handler_6,
    click_handler_7,
    click_handler_8,
    dropdown_visible_binding,
    click_handler_9,
    click_handler_10,
    click_handler_11,
    click_handler_12,
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
