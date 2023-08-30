import { s as safe_not_equal, p as binding_callbacks, J as add_flush_callback, K as createEventDispatcher, a as space, c as claim_space, i as insert_hydration, d as detach, l as text, m as claim_text, n as set_data, f as element, g as claim_element, h as children, j as attr, N as append_hydration, M as component_subscribe, H as noop, e as empty, Q as get_svelte_dataset, k as set_style } from "../chunks/scheduler.9514346f.js";
import { S as SvelteComponent, i as init, f as bind, b as create_component, d as claim_component, m as mount_component, a as transition_in, t as transition_out, e as destroy_component, c as check_outros, g as group_outros } from "../chunks/index.6fa96164.js";
import { g as goto } from "../chunks/navigation.772a0448.js";
import { e as base } from "../chunks/singletons.f80bfd01.js";
import { p as page } from "../chunks/stores.67d0b73f.js";
import { b as homey, s as scopes, e as dashboards$1, w as webhookUrl, l as webhookId } from "../chunks/homey.2e577cb9.js";
import { B as Button, C as CommonLabel, h as dashboards, T as Textfield, i as CircularProgress } from "../chunks/Textfield.d226c201.js";
import { D as Dialog, T as Title, C as Content, A as Actions, d as dashboard, a as CommonIcon } from "../chunks/Actions.88e01790.js";
function create_default_slot_7(ctx) {
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
function create_default_slot_6(ctx) {
  let t;
  return {
    c() {
      t = text(
        /*text*/
        ctx[1]
      );
    },
    l(nodes) {
      t = claim_text(
        nodes,
        /*text*/
        ctx[1]
      );
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*text*/
      2)
        set_data(
          t,
          /*text*/
          ctx2[1]
        );
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_default_slot_5(ctx) {
  let t;
  return {
    c() {
      t = text(
        /*cancelText*/
        ctx[2]
      );
    },
    l(nodes) {
      t = claim_text(
        nodes,
        /*cancelText*/
        ctx[2]
      );
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*cancelText*/
      4)
        set_data(
          t,
          /*cancelText*/
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
function create_default_slot_4$1(ctx) {
  let label;
  let current;
  label = new CommonLabel({
    props: {
      $$slots: { default: [create_default_slot_5] },
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
      if (dirty & /*$$scope, cancelText*/
      132) {
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
      t = text(
        /*confirmText*/
        ctx[3]
      );
    },
    l(nodes) {
      t = claim_text(
        nodes,
        /*confirmText*/
        ctx[3]
      );
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*confirmText*/
      8)
        set_data(
          t,
          /*confirmText*/
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
      if (dirty & /*$$scope, confirmText*/
      136) {
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
      action: "cancel",
      $$slots: { default: [create_default_slot_4$1] },
      $$scope: { ctx }
    }
  });
  button1 = new Button({
    props: {
      action: "confirm",
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
      if (dirty & /*$$scope, cancelText*/
      132) {
        button0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      button0.$set(button0_changes);
      const button1_changes = {};
      if (dirty & /*$$scope, confirmText*/
      136) {
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
      $$slots: { default: [create_default_slot_7] },
      $$scope: { ctx }
    }
  });
  content = new Content({
    props: {
      style: "margin: 5px;",
      $$slots: { default: [create_default_slot_6] },
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
      128) {
        title_changes.$$scope = { dirty, ctx: ctx2 };
      }
      title.$set(title_changes);
      const content_changes = {};
      if (dirty & /*$$scope, text*/
      130) {
        content_changes.$$scope = { dirty, ctx: ctx2 };
      }
      content.$set(content_changes);
      const actions_changes = {};
      if (dirty & /*$$scope, confirmText, cancelText*/
      140) {
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
    ctx[5](value);
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
    ctx[4]
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
      if (dirty & /*$$scope, confirmText, cancelText, text*/
      142) {
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
  let { text: text2 } = $$props;
  let { cancelText = "Cancel" } = $$props;
  let { confirmText = "Confirm" } = $$props;
  const dispatch = createEventDispatcher();
  function closeHandler(e) {
    dispatch(e.detail.action, true);
  }
  function dialog_open_binding(value) {
    open = value;
    $$invalidate(0, open);
  }
  $$self.$$set = ($$props2) => {
    if ("open" in $$props2)
      $$invalidate(0, open = $$props2.open);
    if ("text" in $$props2)
      $$invalidate(1, text2 = $$props2.text);
    if ("cancelText" in $$props2)
      $$invalidate(2, cancelText = $$props2.cancelText);
    if ("confirmText" in $$props2)
      $$invalidate(3, confirmText = $$props2.confirmText);
  };
  return [open, text2, cancelText, confirmText, closeHandler, dialog_open_binding];
}
class ConfirmDialog extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, {
      open: 0,
      text: 1,
      cancelText: 2,
      confirmText: 3
    });
  }
}
const _page_svelte_svelte_type_style_lang = "";
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
    },
    l(nodes) {
      h1 = claim_element(nodes, "H1", {});
      var h1_nodes = children(h1);
      t0 = claim_text(h1_nodes, "Unable to find dashboard: ");
      t1 = claim_text(
        h1_nodes,
        /*dashboardId*/
        ctx[1]
      );
      h1_nodes.forEach(detach);
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
      h1 = claim_element(nodes, "H1", { style: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(h1) !== "svelte-1d8y84p")
        h1.textContent = textContent;
      t1 = claim_space(nodes);
      if_block.l(nodes);
      if_block_anchor = empty();
      this.h();
    },
    h() {
      set_style(h1, "text-align", "center");
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
  let textContent = "Only local dashboards has settings for now. If you want to edit the name of the Homey device dashboard, use the Homey app.";
  return {
    c() {
      p = element("p");
      p.textContent = textContent;
    },
    l(nodes) {
      p = claim_element(nodes, "P", { ["data-svelte-h"]: true });
      if (get_svelte_dataset(p) !== "svelte-xobrbg")
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
  let textfield;
  let updating_value;
  let t0;
  let div;
  let button0;
  let t1;
  let confirmdialog;
  let updating_open;
  let t2;
  let button1;
  let current;
  function textfield_value_binding(value) {
    ctx[13](value);
  }
  let textfield_props = {
    style: "width: 100%",
    label: "Dashboard name"
  };
  if (
    /*title*/
    ctx[0] !== void 0
  ) {
    textfield_props.value = /*title*/
    ctx[0];
  }
  textfield = new Textfield({ props: textfield_props });
  binding_callbacks.push(() => bind(textfield, "value", textfield_value_binding));
  button0 = new Button({
    props: {
      color: "secondary",
      $$slots: { default: [create_default_slot_2] },
      $$scope: { ctx }
    }
  });
  button0.$on(
    "click",
    /*click_handler*/
    ctx[14]
  );
  function confirmdialog_open_binding(value) {
    ctx[15](value);
  }
  let confirmdialog_props = {
    text: "Are you sure you want to delete this dashboard?"
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
    ctx[16]
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
    ctx[17]
  );
  return {
    c() {
      create_component(textfield.$$.fragment);
      t0 = space();
      div = element("div");
      create_component(button0.$$.fragment);
      t1 = space();
      create_component(confirmdialog.$$.fragment);
      t2 = space();
      create_component(button1.$$.fragment);
      this.h();
    },
    l(nodes) {
      claim_component(textfield.$$.fragment, nodes);
      t0 = claim_space(nodes);
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(button0.$$.fragment, div_nodes);
      t1 = claim_space(div_nodes);
      claim_component(confirmdialog.$$.fragment, div_nodes);
      t2 = claim_space(div_nodes);
      claim_component(button1.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "action-buttons svelte-fix7nq");
    },
    m(target, anchor) {
      mount_component(textfield, target, anchor);
      insert_hydration(target, t0, anchor);
      insert_hydration(target, div, anchor);
      mount_component(button0, div, null);
      append_hydration(div, t1);
      mount_component(confirmdialog, div, null);
      append_hydration(div, t2);
      mount_component(button1, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      const textfield_changes = {};
      if (!updating_value && dirty & /*title*/
      1) {
        updating_value = true;
        textfield_changes.value = /*title*/
        ctx2[0];
        add_flush_callback(() => updating_value = false);
      }
      textfield.$set(textfield_changes);
      const button0_changes = {};
      if (dirty & /*$$scope*/
      4194304) {
        button0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      button0.$set(button0_changes);
      const confirmdialog_changes = {};
      if (!updating_open && dirty & /*deleteDashboardOpen*/
      16) {
        updating_open = true;
        confirmdialog_changes.open = /*deleteDashboardOpen*/
        ctx2[4];
        add_flush_callback(() => updating_open = false);
      }
      confirmdialog.$set(confirmdialog_changes);
      const button1_changes = {};
      if (dirty & /*changes*/
      32)
        button1_changes.disabled = !/*changes*/
        ctx2[5];
      if (dirty & /*$$scope, savingDashboard*/
      4194312) {
        button1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      button1.$set(button1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(textfield.$$.fragment, local);
      transition_in(button0.$$.fragment, local);
      transition_in(confirmdialog.$$.fragment, local);
      transition_in(button1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(textfield.$$.fragment, local);
      transition_out(button0.$$.fragment, local);
      transition_out(confirmdialog.$$.fragment, local);
      transition_out(button1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t0);
        detach(div);
      }
      destroy_component(textfield, detaching);
      destroy_component(button0);
      destroy_component(confirmdialog);
      destroy_component(button1);
    }
  };
}
function create_default_slot_4(ctx) {
  let t;
  return {
    c() {
      t = text("delete");
    },
    l(nodes) {
      t = claim_text(nodes, "delete");
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
function create_default_slot_2(ctx) {
  let icon;
  let t;
  let label;
  let current;
  icon = new CommonIcon({
    props: {
      class: "material-icons",
      $$slots: { default: [create_default_slot_4] },
      $$scope: { ctx }
    }
  });
  label = new CommonLabel({
    props: {
      $$slots: { default: [create_default_slot_3] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(icon.$$.fragment);
      t = space();
      create_component(label.$$.fragment);
    },
    l(nodes) {
      claim_component(icon.$$.fragment, nodes);
      t = claim_space(nodes);
      claim_component(label.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(icon, target, anchor);
      insert_hydration(target, t, anchor);
      mount_component(label, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const icon_changes = {};
      if (dirty & /*$$scope*/
      4194304) {
        icon_changes.$$scope = { dirty, ctx: ctx2 };
      }
      icon.$set(icon_changes);
      const label_changes = {};
      if (dirty & /*$$scope*/
      4194304) {
        label_changes.$$scope = { dirty, ctx: ctx2 };
      }
      label.$set(label_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(icon.$$.fragment, local);
      transition_in(label.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(icon.$$.fragment, local);
      transition_out(label.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
      destroy_component(icon, detaching);
      destroy_component(label, detaching);
    }
  };
}
function create_if_block_2(ctx) {
  let circularprogress;
  let current;
  circularprogress = new CircularProgress({
    props: {
      style: "height: 28px; width: 28px;",
      indeterminate: true
    }
  });
  return {
    c() {
      create_component(circularprogress.$$.fragment);
    },
    l(nodes) {
      claim_component(circularprogress.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(circularprogress, target, anchor);
      current = true;
    },
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
      destroy_component(circularprogress, detaching);
    }
  };
}
function create_default_slot_1(ctx) {
  let t;
  let if_block_anchor;
  let current;
  let if_block = (
    /*savingDashboard*/
    ctx[3] && create_if_block_2()
  );
  return {
    c() {
      t = text("Save\r\n                            ");
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      t = claim_text(nodes, "Save\r\n                            ");
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
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
        detach(t);
        detach(if_block_anchor);
      }
      if (if_block)
        if_block.d(detaching);
    }
  };
}
function create_default_slot(ctx) {
  let label;
  let current;
  label = new CommonLabel({
    props: {
      $$slots: { default: [create_default_slot_1] },
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
      if (dirty & /*$$scope, savingDashboard*/
      4194312) {
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
function create_fragment(ctx) {
  let div1;
  let div0;
  let current_block_type_index;
  let if_block;
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
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      if_block.c();
      this.h();
    },
    l(nodes) {
      div1 = claim_element(nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      if_block.l(div0_nodes);
      div0_nodes.forEach(detach);
      div1_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div0, "class", "content svelte-fix7nq");
      attr(div1, "class", "align-center svelte-fix7nq");
    },
    m(target, anchor) {
      insert_hydration(target, div1, anchor);
      append_hydration(div1, div0);
      if_blocks[current_block_type_index].m(div0, null);
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
        if_block.m(div0, null);
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
        detach(div1);
      }
      if_blocks[current_block_type_index].d();
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
  function textfield_value_binding(value) {
    title = value;
    $$invalidate(0, title);
  }
  const click_handler = () => $$invalidate(4, deleteDashboardOpen = true);
  function confirmdialog_open_binding(value) {
    deleteDashboardOpen = value;
    $$invalidate(4, deleteDashboardOpen);
  }
  const confirm_handler = async () => deleteDashboard();
  const click_handler_1 = () => saveDashboard();
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
    textfield_value_binding,
    click_handler,
    confirmdialog_open_binding,
    confirm_handler,
    click_handler_1
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
