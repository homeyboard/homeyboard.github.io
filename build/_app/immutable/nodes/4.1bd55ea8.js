import { s as safe_not_equal, r as createEventDispatcher, e as empty, i as insert_hydration, d as detach, f as element, l as text, g as claim_element, h as children, m as claim_text, D as append_hydration, n as set_data, a as space, c as claim_space, p as binding_callbacks, j as attr, w as add_flush_callback, y as component_subscribe, v as noop, u as get_svelte_dataset } from "../chunks/scheduler.a4b1dbd5.js";
import { S as SvelteComponent, i as init, b as create_component, d as claim_component, m as mount_component, a as transition_in, t as transition_out, e as destroy_component, g as group_outros, c as check_outros, f as bind } from "../chunks/index.6d45844e.js";
import { g as goto } from "../chunks/navigation.9ae3601a.js";
import { e as base } from "../chunks/singletons.16b38e2a.js";
import { p as page } from "../chunks/stores.7ee4de34.js";
import { b as homey, s as scopes, e as dashboards$1, w as webhookUrl, m as webhookId } from "../chunks/homey.e5ef1543.js";
import { B as Button, d as dashboards, I as Input, P as Progress } from "../chunks/Progress.03b03b55.js";
import { P as Portal, M as Modal, d as dashboard } from "../chunks/index.a41c2443.js";
function create_if_block$1(ctx) {
  let modal;
  let current;
  modal = new Modal({
    props: {
      handleClose: (
        /*onCancel*/
        ctx[6]
      ),
      $$slots: { content: [create_content_slot] },
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
      if (dirty & /*$$scope, confirmText, cancelText, text, title*/
      286) {
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
function create_default_slot_5(ctx) {
  let h2;
  let t;
  return {
    c() {
      h2 = element("h2");
      t = text(
        /*title*/
        ctx[1]
      );
    },
    l(nodes) {
      h2 = claim_element(nodes, "H2", {});
      var h2_nodes = children(h2);
      t = claim_text(
        h2_nodes,
        /*title*/
        ctx[1]
      );
      h2_nodes.forEach(detach);
    },
    m(target, anchor) {
      insert_hydration(target, h2, anchor);
      append_hydration(h2, t);
    },
    p(ctx2, dirty) {
      if (dirty & /*title*/
      2)
        set_data(
          t,
          /*title*/
          ctx2[1]
        );
    },
    d(detaching) {
      if (detaching) {
        detach(h2);
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
      $$slots: { default: [create_default_slot_5] },
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
      if (dirty & /*$$scope, title*/
      258) {
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
function create_default_slot_4(ctx) {
  let t;
  return {
    c() {
      t = text(
        /*text*/
        ctx[2]
      );
    },
    l(nodes) {
      t = claim_text(
        nodes,
        /*text*/
        ctx[2]
      );
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*text*/
      4)
        set_data(
          t,
          /*text*/
          ctx2[2]
        );
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_body_slot(ctx) {
  let modal_content_body;
  let current;
  modal_content_body = new Modal.Content.Body({
    props: {
      slot: "body",
      $$slots: { default: [create_default_slot_4] },
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
      if (dirty & /*$$scope, text*/
      260) {
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
function create_default_slot_3(ctx) {
  let t;
  return {
    c() {
      t = text(
        /*cancelText*/
        ctx[3]
      );
    },
    l(nodes) {
      t = claim_text(
        nodes,
        /*cancelText*/
        ctx[3]
      );
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*cancelText*/
      8)
        set_data(
          t,
          /*cancelText*/
          ctx2[3]
        );
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_default_slot_2(ctx) {
  let t;
  return {
    c() {
      t = text(
        /*confirmText*/
        ctx[4]
      );
    },
    l(nodes) {
      t = claim_text(
        nodes,
        /*confirmText*/
        ctx[4]
      );
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*confirmText*/
      16)
        set_data(
          t,
          /*confirmText*/
          ctx2[4]
        );
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
      $$slots: { default: [create_default_slot_3] },
      $$scope: { ctx }
    }
  });
  button0.$on(
    "click",
    /*onCancel*/
    ctx[6]
  );
  button1 = new Button({
    props: {
      $$slots: { default: [create_default_slot_2] },
      $$scope: { ctx }
    }
  });
  button1.$on(
    "click",
    /*onConfirm*/
    ctx[5]
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
      if (dirty & /*$$scope, cancelText*/
      264) {
        button0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      button0.$set(button0_changes);
      const button1_changes = {};
      if (dirty & /*$$scope, confirmText*/
      272) {
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
      if (dirty & /*$$scope, confirmText, cancelText*/
      280) {
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
function create_content_slot(ctx) {
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
      if (dirty & /*$$scope, confirmText, cancelText, text, title*/
      286) {
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
      if (dirty & /*$$scope, confirmText, cancelText, text, title, open*/
      287) {
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
  let { title = "Confirm" } = $$props;
  let { text: text2 } = $$props;
  let { cancelText = "Cancel" } = $$props;
  let { confirmText = "Confirm" } = $$props;
  const dispatch = createEventDispatcher();
  function onConfirm() {
    dispatch("confirm", true);
    $$invalidate(0, open = false);
    dispatch("open", open);
  }
  function onCancel() {
    dispatch("cancel", true);
    $$invalidate(0, open = false);
    dispatch("open", open);
  }
  $$self.$$set = ($$props2) => {
    if ("open" in $$props2)
      $$invalidate(0, open = $$props2.open);
    if ("title" in $$props2)
      $$invalidate(1, title = $$props2.title);
    if ("text" in $$props2)
      $$invalidate(2, text2 = $$props2.text);
    if ("cancelText" in $$props2)
      $$invalidate(3, cancelText = $$props2.cancelText);
    if ("confirmText" in $$props2)
      $$invalidate(4, confirmText = $$props2.confirmText);
  };
  return [open, title, text2, cancelText, confirmText, onConfirm, onCancel];
}
class ConfirmDialog extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, {
      open: 0,
      title: 1,
      text: 2,
      cancelText: 3,
      confirmText: 4
    });
  }
}
function create_else_block_1(ctx) {
  let h1;
  let t0;
  let t1;
  return {
    c() {
      h1 = element("h1");
      t0 = text("Unable to find dashboard: ");
      t1 = text(
        /*dashboardId*/
        ctx[1]
      );
      this.h();
    },
    l(nodes) {
      h1 = claim_element(nodes, "H1", { class: true });
      var h1_nodes = children(h1);
      t0 = claim_text(h1_nodes, "Unable to find dashboard: ");
      t1 = claim_text(
        h1_nodes,
        /*dashboardId*/
        ctx[1]
      );
      h1_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(h1, "class", "text-center pt-8 pb-8");
    },
    m(target, anchor) {
      insert_hydration(target, h1, anchor);
      append_hydration(h1, t0);
      append_hydration(h1, t1);
    },
    p(ctx2, dirty) {
      if (dirty & /*dashboardId*/
      2)
        set_data(
          t1,
          /*dashboardId*/
          ctx2[1]
        );
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(h1);
      }
    }
  };
}
function create_if_block(ctx) {
  let h1;
  let textContent = "Settings";
  let t1;
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block_1, create_else_block];
  const if_blocks = [];
  function select_block_type_1(ctx2, dirty) {
    if (
      /*dashboard*/
      ctx2[2].source === "localstorage"
    )
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type_1(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      h1 = element("h1");
      h1.textContent = textContent;
      t1 = space();
      if_block.c();
      if_block_anchor = empty();
      this.h();
    },
    l(nodes) {
      h1 = claim_element(nodes, "H1", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(h1) !== "svelte-1jlhp41")
        h1.textContent = textContent;
      t1 = claim_space(nodes);
      if_block.l(nodes);
      if_block_anchor = empty();
      this.h();
    },
    h() {
      attr(h1, "class", "text-center pt-8 pb-8");
    },
    m(target, anchor) {
      insert_hydration(target, h1, anchor);
      insert_hydration(target, t1, anchor);
      if_blocks[current_block_type_index].m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
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
        detach(h1);
        detach(t1);
        detach(if_block_anchor);
      }
      if_blocks[current_block_type_index].d(detaching);
    }
  };
}
function create_else_block(ctx) {
  let p;
  let textContent = "Only local dashboards has settings for now. If you want to edit the name of this dashboard, rename the dashboard in the Homey app.";
  return {
    c() {
      p = element("p");
      p.textContent = textContent;
    },
    l(nodes) {
      p = claim_element(nodes, "P", { ["data-svelte-h"]: true });
      if (get_svelte_dataset(p) !== "svelte-llzcx4")
        p.textContent = textContent;
    },
    m(target, anchor) {
      insert_hydration(target, p, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(p);
      }
    }
  };
}
function create_if_block_1(ctx) {
  let input;
  let updating_value;
  let t0;
  let div;
  let button0;
  let t1;
  let button1;
  let t2;
  let current;
  function input_value_binding(value) {
    ctx[13](value);
  }
  let input_props = {
    name: "name",
    placeholder: "Dashboard name"
  };
  if (
    /*title*/
    ctx[0] !== void 0
  ) {
    input_props.value = /*title*/
    ctx[0];
  }
  input = new Input({ props: input_props });
  binding_callbacks.push(() => bind(input, "value", input_value_binding));
  button0 = new Button({
    props: {
      type: "danger",
      $$slots: { default: [create_default_slot_1] },
      $$scope: { ctx }
    }
  });
  button0.$on(
    "click",
    /*click_handler*/
    ctx[14]
  );
  button1 = new Button({
    props: {
      disabled: !/*changes*/
      ctx[5],
      $$slots: { default: [create_default_slot] },
      $$scope: { ctx }
    }
  });
  button1.$on(
    "click",
    /*click_handler_1*/
    ctx[15]
  );
  let if_block = (
    /*savingDashboard*/
    ctx[3] && create_if_block_2()
  );
  return {
    c() {
      create_component(input.$$.fragment);
      t0 = space();
      div = element("div");
      create_component(button0.$$.fragment);
      t1 = space();
      create_component(button1.$$.fragment);
      t2 = space();
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes) {
      claim_component(input.$$.fragment, nodes);
      t0 = claim_space(nodes);
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(button0.$$.fragment, div_nodes);
      t1 = claim_space(div_nodes);
      claim_component(button1.$$.fragment, div_nodes);
      t2 = claim_space(div_nodes);
      if (if_block)
        if_block.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "flex justify-between mt-4");
    },
    m(target, anchor) {
      mount_component(input, target, anchor);
      insert_hydration(target, t0, anchor);
      insert_hydration(target, div, anchor);
      mount_component(button0, div, null);
      append_hydration(div, t1);
      mount_component(button1, div, null);
      append_hydration(div, t2);
      if (if_block)
        if_block.m(div, null);
      current = true;
    },
    p(ctx2, dirty) {
      const input_changes = {};
      if (!updating_value && dirty & /*title*/
      1) {
        updating_value = true;
        input_changes.value = /*title*/
        ctx2[0];
        add_flush_callback(() => updating_value = false);
      }
      input.$set(input_changes);
      const button0_changes = {};
      if (dirty & /*$$scope*/
      4194304) {
        button0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      button0.$set(button0_changes);
      const button1_changes = {};
      if (dirty & /*changes*/
      32)
        button1_changes.disabled = !/*changes*/
        ctx2[5];
      if (dirty & /*$$scope*/
      4194304) {
        button1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      button1.$set(button1_changes);
      if (
        /*savingDashboard*/
        ctx2[3]
      ) {
        if (if_block) {
          if (dirty & /*savingDashboard*/
          8) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_2();
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div, null);
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
      transition_in(input.$$.fragment, local);
      transition_in(button0.$$.fragment, local);
      transition_in(button1.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(input.$$.fragment, local);
      transition_out(button0.$$.fragment, local);
      transition_out(button1.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t0);
        detach(div);
      }
      destroy_component(input, detaching);
      destroy_component(button0);
      destroy_component(button1);
      if (if_block)
        if_block.d();
    }
  };
}
function create_default_slot_1(ctx) {
  let t;
  return {
    c() {
      t = text("Delete");
    },
    l(nodes) {
      t = claim_text(nodes, "Delete");
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
function create_default_slot(ctx) {
  let t;
  return {
    c() {
      t = text("Save");
    },
    l(nodes) {
      t = claim_text(nodes, "Save");
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
function create_if_block_2(ctx) {
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
      create_component(progress.$$.fragment);
    },
    l(nodes) {
      claim_component(progress.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(progress, target, anchor);
      current = true;
    },
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
      destroy_component(progress, detaching);
    }
  };
}
function create_fragment(ctx) {
  let div;
  let current_block_type_index;
  let if_block;
  let t;
  let confirmdialog;
  let updating_open;
  let current;
  const if_block_creators = [create_if_block, create_else_block_1];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*dashboard*/
      ctx2[2] !== void 0
    )
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  function confirmdialog_open_binding(value) {
    ctx[16](value);
  }
  let confirmdialog_props = {
    text: "Are you sure you want to delete this dashboard?",
    title: "Confirm delete",
    confirmText: "Delete",
    cancelText: "Cancel"
  };
  if (
    /*deleteDashboardOpen*/
    ctx[4] !== void 0
  ) {
    confirmdialog_props.open = /*deleteDashboardOpen*/
    ctx[4];
  }
  confirmdialog = new ConfirmDialog({ props: confirmdialog_props });
  binding_callbacks.push(() => bind(confirmdialog, "open", confirmdialog_open_binding));
  confirmdialog.$on(
    "confirm",
    /*confirm_handler*/
    ctx[17]
  );
  return {
    c() {
      div = element("div");
      if_block.c();
      t = space();
      create_component(confirmdialog.$$.fragment);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      if_block.l(div_nodes);
      div_nodes.forEach(detach);
      t = claim_space(nodes);
      claim_component(confirmdialog.$$.fragment, nodes);
      this.h();
    },
    h() {
      attr(div, "class", "flex flex-col justify-center mx-auto max-w-md");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if_blocks[current_block_type_index].m(div, null);
      insert_hydration(target, t, anchor);
      mount_component(confirmdialog, target, anchor);
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
      const confirmdialog_changes = {};
      if (!updating_open && dirty & /*deleteDashboardOpen*/
      16) {
        updating_open = true;
        confirmdialog_changes.open = /*deleteDashboardOpen*/
        ctx2[4];
        add_flush_callback(() => updating_open = false);
      }
      confirmdialog.$set(confirmdialog_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      transition_in(confirmdialog.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      transition_out(confirmdialog.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
        detach(t);
      }
      if_blocks[current_block_type_index].d();
      destroy_component(confirmdialog, detaching);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let dashboards$2;
  let dashboardId;
  let resolvedDashboard;
  let $homey;
  let $scopes;
  let $page;
  let $localDashboards;
  let $homeyDashboards;
  component_subscribe($$self, homey, ($$value) => $$invalidate(18, $homey = $$value));
  component_subscribe($$self, scopes, ($$value) => $$invalidate(19, $scopes = $$value));
  component_subscribe($$self, page, ($$value) => $$invalidate(10, $page = $$value));
  component_subscribe($$self, dashboards, ($$value) => $$invalidate(11, $localDashboards = $$value));
  component_subscribe($$self, dashboards$1, ($$value) => $$invalidate(12, $homeyDashboards = $$value));
  let dashboard$1;
  let savingDashboard = false;
  let deleteDashboardOpen = false;
  let title = "";
  let changes;
  function onDashboard(d) {
    if (d !== void 0) {
      dashboard.set(d);
      $$invalidate(2, dashboard$1 = d);
      $$invalidate(0, title = dashboard$1.title);
    }
  }
  function hasChanges(_title) {
    return _title !== (dashboard$1 == null ? void 0 : dashboard$1.title);
  }
  async function saveDashboard() {
    if (dashboard$1 !== void 0) {
      $$invalidate(3, savingDashboard = true);
      if (dashboard$1.source === "localstorage") {
        const d = { ...dashboard$1, title };
        dashboards.update(d);
      } else if (dashboard$1.source === "homey") {
        const settings = { items: dashboard$1.items };
        let success = false;
        try {
          const url = webhookUrl + webhookId + "?homey=" + $homey.id + "&operation=save_dashboard&dashboardId=" + dashboard$1.id;
          const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(settings)
          });
          if (response.ok) {
            success = true;
          }
        } catch (e) {
        }
        if (!success) {
          if ($scopes.includes("homey") || $scopes.includes("homey.app")) {
            try {
              const app = await $homey.apps.getApp({ id: "skogsaas.dashboards" });
              if (app !== void 0) {
                await app.put({
                  path: "/dashboards/" + dashboard$1.id,
                  body: settings
                });
                success = true;
              }
            } catch (e) {
            }
          }
        }
      }
    }
    $$invalidate(3, savingDashboard = false);
  }
  async function deleteDashboard() {
    if (dashboard$1 === void 0) {
      return;
    }
    dashboards.delete(dashboard$1);
    dashboard.set(void 0);
    await goto(base + "/");
  }
  function input_value_binding(value) {
    title = value;
    $$invalidate(0, title);
  }
  const click_handler = () => $$invalidate(4, deleteDashboardOpen = true);
  const click_handler_1 = () => saveDashboard();
  function confirmdialog_open_binding(value) {
    deleteDashboardOpen = value;
    $$invalidate(4, deleteDashboardOpen);
  }
  const confirm_handler = () => deleteDashboard();
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$homeyDashboards, $localDashboards*/
    6144) {
      $$invalidate(9, dashboards$2 = { ...$homeyDashboards, ...$localDashboards });
    }
    if ($$self.$$.dirty & /*$page*/
    1024) {
      $$invalidate(1, dashboardId = $page.url.searchParams.get("id"));
    }
    if ($$self.$$.dirty & /*dashboardId, dashboards*/
    514) {
      $$invalidate(8, resolvedDashboard = dashboardId !== null ? dashboards$2[dashboardId] : void 0);
    }
    if ($$self.$$.dirty & /*resolvedDashboard*/
    256) {
      onDashboard(resolvedDashboard);
    }
    if ($$self.$$.dirty & /*title*/
    1) {
      $$invalidate(5, changes = hasChanges(title));
    }
  };
  return [
    title,
    dashboardId,
    dashboard$1,
    savingDashboard,
    deleteDashboardOpen,
    changes,
    saveDashboard,
    deleteDashboard,
    resolvedDashboard,
    dashboards$2,
    $page,
    $localDashboards,
    $homeyDashboards,
    input_value_binding,
    click_handler,
    click_handler_1,
    confirmdialog_open_binding,
    confirm_handler
  ];
}
class Page extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {});
  }
}
export {
  Page as component
};
