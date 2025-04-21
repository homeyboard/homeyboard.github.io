import { s as safe_not_equal, p as binding_callbacks, f as element, a as space, l as text, g as claim_element, h as children, c as claim_space, v as get_svelte_dataset, m as claim_text, d as detach, j as attr, i as insert_hydration, w as append_hydration, r as listen, K as add_flush_callback, D as run_all, L as createEventDispatcher, G as head_selector, u as component_subscribe, o as onMount, x as noop, n as set_data } from "../chunks/scheduler.a7fc7cea.js";
import { S as SvelteComponent, i as init, f as bind, b as create_component, d as claim_component, m as mount_component, a as transition_in, t as transition_out, e as destroy_component, c as check_outros, g as group_outros } from "../chunks/index.20c35f04.js";
import { g as goto } from "../chunks/navigation.93be9e73.js";
import { e as base } from "../chunks/singletons.e168a4d6.js";
import { p as page } from "../chunks/stores.fdf73280.js";
import { n as v4, h as homey, o as stores, j as dashboards$1 } from "../chunks/v4.eedf8624.js";
import { d as dashboards } from "../chunks/localstorage.379dfb0c.js";
import { e as editing } from "../chunks/editing.0bdfa4bc.js";
import { T as TextPicker, I as IconPicker, i as info, a as info$1, s as saveDashboard, d as deleteDashboard, W as Widget, b as WidgetEditor, S as StoreDialog } from "../chunks/StoreDialog.6cc8aef8.js";
import { m as mdiViewDashboard } from "../chunks/utils.3c8237ea.js";
import { D as DashboardListHero } from "../chunks/DashboardListHero.7cece5e0.js";
import { a as alerts } from "../chunks/alerting.6c127aa6.js";
function create_fragment$1(ctx) {
  let div3;
  let input0;
  let t0;
  let div1;
  let textpicker;
  let updating_value;
  let t1;
  let iconpicker;
  let updating_iconId;
  let t2;
  let div0;
  let span;
  let textContent = "Danger!";
  let t4;
  let input1;
  let t5;
  let button;
  let t6;
  let button_disabled_value;
  let t7;
  let input2;
  let t8;
  let div2;
  let textarea;
  let textarea_value_value;
  let current;
  let mounted;
  let dispose;
  function textpicker_value_binding(value) {
    ctx[5](value);
  }
  let textpicker_props = { label: "Title", placeholder: "Title" };
  if (
    /*title*/
    ctx[1] !== void 0
  ) {
    textpicker_props.value = /*title*/
    ctx[1];
  }
  textpicker = new TextPicker({ props: textpicker_props });
  binding_callbacks.push(() => bind(textpicker, "value", textpicker_value_binding));
  function iconpicker_iconId_binding(value) {
    ctx[6](value);
  }
  let iconpicker_props = {};
  if (
    /*iconId*/
    ctx[2] !== void 0
  ) {
    iconpicker_props.iconId = /*iconId*/
    ctx[2];
  }
  iconpicker = new IconPicker({ props: iconpicker_props });
  binding_callbacks.push(() => bind(iconpicker, "iconId", iconpicker_iconId_binding));
  return {
    c() {
      div3 = element("div");
      input0 = element("input");
      t0 = space();
      div1 = element("div");
      create_component(textpicker.$$.fragment);
      t1 = space();
      create_component(iconpicker.$$.fragment);
      t2 = space();
      div0 = element("div");
      span = element("span");
      span.textContent = textContent;
      t4 = space();
      input1 = element("input");
      t5 = space();
      button = element("button");
      t6 = text("Delete dashboard");
      t7 = space();
      input2 = element("input");
      t8 = space();
      div2 = element("div");
      textarea = element("textarea");
      this.h();
    },
    l(nodes) {
      div3 = claim_element(nodes, "DIV", { role: true, class: true });
      var div3_nodes = children(div3);
      input0 = claim_element(div3_nodes, "INPUT", {
        type: true,
        name: true,
        role: true,
        class: true,
        "aria-label": true
      });
      t0 = claim_space(div3_nodes);
      div1 = claim_element(div3_nodes, "DIV", { role: true, class: true });
      var div1_nodes = children(div1);
      claim_component(textpicker.$$.fragment, div1_nodes);
      t1 = claim_space(div1_nodes);
      claim_component(iconpicker.$$.fragment, div1_nodes);
      t2 = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      span = claim_element(div0_nodes, "SPAN", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(span) !== "svelte-3ecg8b")
        span.textContent = textContent;
      t4 = claim_space(div0_nodes);
      input1 = claim_element(div0_nodes, "INPUT", { type: true, class: true });
      t5 = claim_space(div0_nodes);
      button = claim_element(div0_nodes, "BUTTON", { class: true });
      var button_nodes = children(button);
      t6 = claim_text(button_nodes, "Delete dashboard");
      button_nodes.forEach(detach);
      div0_nodes.forEach(detach);
      div1_nodes.forEach(detach);
      t7 = claim_space(div3_nodes);
      input2 = claim_element(div3_nodes, "INPUT", {
        type: true,
        name: true,
        role: true,
        class: true,
        "aria-label": true
      });
      t8 = claim_space(div3_nodes);
      div2 = claim_element(div3_nodes, "DIV", { role: true, class: true });
      var div2_nodes = children(div2);
      textarea = claim_element(div2_nodes, "TEXTAREA", {
        placeholder: true,
        class: true,
        rows: true
      });
      children(textarea).forEach(detach);
      div2_nodes.forEach(detach);
      div3_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(input0, "type", "radio");
      attr(input0, "name", "tabs");
      attr(input0, "role", "tab");
      attr(input0, "class", "tab");
      attr(input0, "aria-label", "Settings");
      input0.checked = true;
      attr(span, "class", "text-error");
      attr(input1, "type", "checkbox");
      attr(input1, "class", "checkbox checkbox-error");
      attr(button, "class", "btn btn-error");
      button.disabled = button_disabled_value = !/*enableDelete*/
      ctx[3];
      attr(div0, "class", "alert");
      attr(div1, "role", "tabpanel");
      attr(div1, "class", "tab-content pt-2");
      attr(input2, "type", "radio");
      attr(input2, "name", "tabs");
      attr(input2, "role", "tab");
      attr(input2, "class", "tab");
      attr(input2, "aria-label", "JSON");
      attr(textarea, "placeholder", "JSON");
      attr(textarea, "class", "textarea textarea-bordered w-full max-w-xs h-max");
      textarea.value = textarea_value_value = JSON.stringify(
        /*settings*/
        ctx[0]
      );
      attr(textarea, "rows", "10");
      attr(div2, "role", "tabpanel");
      attr(div2, "class", "tab-content pt-2");
      attr(div3, "role", "tablist");
      attr(div3, "class", "tabs tabs-bordered tabs-lg");
    },
    m(target, anchor) {
      insert_hydration(target, div3, anchor);
      append_hydration(div3, input0);
      append_hydration(div3, t0);
      append_hydration(div3, div1);
      mount_component(textpicker, div1, null);
      append_hydration(div1, t1);
      mount_component(iconpicker, div1, null);
      append_hydration(div1, t2);
      append_hydration(div1, div0);
      append_hydration(div0, span);
      append_hydration(div0, t4);
      append_hydration(div0, input1);
      input1.checked = /*enableDelete*/
      ctx[3];
      append_hydration(div0, t5);
      append_hydration(div0, button);
      append_hydration(button, t6);
      append_hydration(div3, t7);
      append_hydration(div3, input2);
      append_hydration(div3, t8);
      append_hydration(div3, div2);
      append_hydration(div2, textarea);
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            input1,
            "change",
            /*input1_change_handler*/
            ctx[7]
          ),
          listen(
            button,
            "click",
            /*click_handler*/
            ctx[8]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      const textpicker_changes = {};
      if (!updating_value && dirty & /*title*/
      2) {
        updating_value = true;
        textpicker_changes.value = /*title*/
        ctx2[1];
        add_flush_callback(() => updating_value = false);
      }
      textpicker.$set(textpicker_changes);
      const iconpicker_changes = {};
      if (!updating_iconId && dirty & /*iconId*/
      4) {
        updating_iconId = true;
        iconpicker_changes.iconId = /*iconId*/
        ctx2[2];
        add_flush_callback(() => updating_iconId = false);
      }
      iconpicker.$set(iconpicker_changes);
      if (dirty & /*enableDelete*/
      8) {
        input1.checked = /*enableDelete*/
        ctx2[3];
      }
      if (!current || dirty & /*enableDelete*/
      8 && button_disabled_value !== (button_disabled_value = !/*enableDelete*/
      ctx2[3])) {
        button.disabled = button_disabled_value;
      }
      if (!current || dirty & /*settings*/
      1 && textarea_value_value !== (textarea_value_value = JSON.stringify(
        /*settings*/
        ctx2[0]
      ))) {
        textarea.value = textarea_value_value;
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(textpicker.$$.fragment, local);
      transition_in(iconpicker.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(textpicker.$$.fragment, local);
      transition_out(iconpicker.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div3);
      }
      destroy_component(textpicker);
      destroy_component(iconpicker);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let { settings } = $$props;
  const dispatch = createEventDispatcher();
  let title;
  let iconId;
  let enableDelete = false;
  function onSettings(s) {
    $$invalidate(1, title = s.title);
    $$invalidate(2, iconId = s.iconId);
  }
  function onChange(_title, _iconId) {
    if (settings.title !== _title || settings.iconId !== _iconId) {
      const s = {
        ...settings,
        title: _title,
        iconId: _iconId
      };
      dispatch("settings", s);
    }
  }
  function deleteDashboard2() {
    dispatch("delete");
  }
  function textpicker_value_binding(value) {
    title = value;
    $$invalidate(1, title);
  }
  function iconpicker_iconId_binding(value) {
    iconId = value;
    $$invalidate(2, iconId);
  }
  function input1_change_handler() {
    enableDelete = this.checked;
    $$invalidate(3, enableDelete);
  }
  const click_handler = (e) => deleteDashboard2();
  $$self.$$set = ($$props2) => {
    if ("settings" in $$props2)
      $$invalidate(0, settings = $$props2.settings);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*settings*/
    1) {
      onSettings(settings);
    }
    if ($$self.$$.dirty & /*title, iconId*/
    6) {
      onChange(title, iconId);
    }
  };
  return [
    settings,
    title,
    iconId,
    enableDelete,
    deleteDashboard2,
    textpicker_value_binding,
    iconpicker_iconId_binding,
    input1_change_handler,
    click_handler
  ];
}
class DashboardEditor extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, { settings: 0 });
  }
}
function migrate(dashboard) {
  if (dashboard === void 0)
    return void 0;
  while (dashboard.version !== 2) {
    dashboard = migrateOnce(dashboard);
  }
  return dashboard;
}
function migrateOnce(dashboard) {
  switch (dashboard.version) {
    case 2:
      return dashboard;
    case void 0:
    default:
      return migrate_v1_v2(dashboard);
  }
}
function migrate_v1_v2(v1) {
  const items = (v1.items ?? []).map((item) => migrateGridItem_v1_v2(item));
  const options = {
    cellHeight: 50,
    columnOpts: {
      layout: "scale",
      columnMax: 24,
      breakpoints: [
        { c: 3, w: 768 },
        { c: 6, w: 1024 },
        { c: 12, w: 1280 },
        { c: 24, w: void 0 }
      ]
    },
    float: true,
    margin: 10
  };
  const grid = info.create();
  grid.items = items;
  grid.options = options;
  const dashboard = {
    id: v1.id,
    version: 2,
    title: v1.title,
    iconId: void 0,
    backgroundImage: v1.backgroundImage,
    style: void 0,
    root: grid
  };
  return dashboard;
}
function migrateGridItem_v1_v2(v1) {
  function createCard(widgets) {
    return {
      id: v4(),
      type: "card",
      version: 1,
      items: widgets,
      padding: "p-0"
    };
  }
  const items = v1.card.map((w) => {
    if (w.type !== "capability") {
      return w;
    }
    const c = w;
    const t = info$1.create();
    t.templateId = "builtin-capability";
    t.arguments = [{ argId: "capabilityUri", value: c.capabilityUri }];
    return t;
  });
  return {
    id: v1.id,
    settings: createCard(items),
    position: {
      x: v1[24].x,
      y: v1[24].y,
      w: v1[24].w,
      h: v1[24].h
    }
  };
}
function create_else_block(ctx) {
  let div;
  let dashboardlisthero;
  let current;
  dashboardlisthero = new DashboardListHero({
    props: {
      $$slots: { default: [create_default_slot_1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      div = element("div");
      create_component(dashboardlisthero.$$.fragment);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(dashboardlisthero.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "flex min-h-screen justify-center");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      mount_component(dashboardlisthero, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      const dashboardlisthero_changes = {};
      if (dirty & /*$$scope, dashboard, dashboardId*/
      268435459) {
        dashboardlisthero_changes.$$scope = { dirty, ctx: ctx2 };
      }
      dashboardlisthero.$set(dashboardlisthero_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(dashboardlisthero.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(dashboardlisthero.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(dashboardlisthero);
    }
  };
}
function create_if_block_1(ctx) {
  let div;
  let widget;
  let current;
  widget = new Widget({
    props: {
      settings: (
        /*root*/
        ctx[2]
      ),
      context: (
        /*context*/
        ctx[4]
      )
    }
  });
  return {
    c() {
      div = element("div");
      create_component(widget.$$.fragment);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(widget.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "p-2");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      mount_component(widget, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      const widget_changes = {};
      if (dirty & /*root*/
      4)
        widget_changes.settings = /*root*/
        ctx2[2];
      if (dirty & /*context*/
      16)
        widget_changes.context = /*context*/
        ctx2[4];
      widget.$set(widget_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(widget.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(widget.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(widget);
    }
  };
}
function create_if_block(ctx) {
  var _a;
  let widgeteditor;
  let t;
  let storedialog;
  let updating_open;
  let current;
  widgeteditor = new WidgetEditor({
    props: {
      title: (
        /*dashboard*/
        ((_a = ctx[1]) == null ? void 0 : _a.title) ?? "Dashboard title"
      ),
      settingsTitle: "Dashboard",
      settingsIcon: mdiViewDashboard,
      root: (
        /*root*/
        ctx[2]
      ),
      $$slots: { default: [create_default_slot] },
      $$scope: { ctx }
    }
  });
  widgeteditor.$on(
    "root",
    /*root_handler*/
    ctx[18]
  );
  widgeteditor.$on(
    "save",
    /*save_handler*/
    ctx[19]
  );
  function storedialog_open_binding(value) {
    ctx[20](value);
  }
  let storedialog_props = {};
  if (
    /*storeOpen*/
    ctx[3] !== void 0
  ) {
    storedialog_props.open = /*storeOpen*/
    ctx[3];
  }
  storedialog = new StoreDialog({ props: storedialog_props });
  binding_callbacks.push(() => bind(storedialog, "open", storedialog_open_binding));
  storedialog.$on(
    "storeId",
    /*storeId_handler*/
    ctx[21]
  );
  return {
    c() {
      create_component(widgeteditor.$$.fragment);
      t = space();
      create_component(storedialog.$$.fragment);
    },
    l(nodes) {
      claim_component(widgeteditor.$$.fragment, nodes);
      t = claim_space(nodes);
      claim_component(storedialog.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(widgeteditor, target, anchor);
      insert_hydration(target, t, anchor);
      mount_component(storedialog, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      var _a2;
      const widgeteditor_changes = {};
      if (dirty & /*dashboard*/
      2)
        widgeteditor_changes.title = /*dashboard*/
        ((_a2 = ctx2[1]) == null ? void 0 : _a2.title) ?? "Dashboard title";
      if (dirty & /*root*/
      4)
        widgeteditor_changes.root = /*root*/
        ctx2[2];
      if (dirty & /*$$scope, dashboard*/
      268435458) {
        widgeteditor_changes.$$scope = { dirty, ctx: ctx2 };
      }
      widgeteditor.$set(widgeteditor_changes);
      const storedialog_changes = {};
      if (!updating_open && dirty & /*storeOpen*/
      8) {
        updating_open = true;
        storedialog_changes.open = /*storeOpen*/
        ctx2[3];
        add_flush_callback(() => updating_open = false);
      }
      storedialog.$set(storedialog_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(widgeteditor.$$.fragment, local);
      transition_in(storedialog.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(widgeteditor.$$.fragment, local);
      transition_out(storedialog.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
      destroy_component(widgeteditor, detaching);
      destroy_component(storedialog, detaching);
    }
  };
}
function create_else_block_1(ctx) {
  let h1;
  let textContent = "👋 Hello there!";
  let t1;
  let p;
  let textContent_1 = "Want to create a new dashboard?";
  let t3;
  let div;
  let button;
  let textContent_2 = "Hell yeah! 🎸";
  let mounted;
  let dispose;
  return {
    c() {
      h1 = element("h1");
      h1.textContent = textContent;
      t1 = space();
      p = element("p");
      p.textContent = textContent_1;
      t3 = space();
      div = element("div");
      button = element("button");
      button.textContent = textContent_2;
      this.h();
    },
    l(nodes) {
      h1 = claim_element(nodes, "H1", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(h1) !== "svelte-2vc6w8")
        h1.textContent = textContent;
      t1 = claim_space(nodes);
      p = claim_element(nodes, "P", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(p) !== "svelte-1cmzjqu")
        p.textContent = textContent_1;
      t3 = claim_space(nodes);
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      button = claim_element(div_nodes, "BUTTON", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(button) !== "svelte-1750z7s")
        button.textContent = textContent_2;
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(h1, "class", "text-5xl font-bold");
      attr(p, "class", "py-6");
      attr(button, "class", "btn btn-primary");
      attr(div, "class", "w-full text-center");
    },
    m(target, anchor) {
      insert_hydration(target, h1, anchor);
      insert_hydration(target, t1, anchor);
      insert_hydration(target, p, anchor);
      insert_hydration(target, t3, anchor);
      insert_hydration(target, div, anchor);
      append_hydration(div, button);
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*click_handler_1*/
          ctx[23]
        );
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(h1);
        detach(t1);
        detach(p);
        detach(t3);
        detach(div);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_3(ctx) {
  let h1;
  let textContent = "🤖 Does not compute!";
  let t1;
  let p;
  let t2;
  let code;
  let t3;
  let t4;
  let div;
  let textContent_1 = `<span class="text-5xl">🤷</span>`;
  return {
    c() {
      h1 = element("h1");
      h1.textContent = textContent;
      t1 = space();
      p = element("p");
      t2 = text("Cannot find the dashboard with id: ");
      code = element("code");
      t3 = text(
        /*dashboardId*/
        ctx[0]
      );
      t4 = space();
      div = element("div");
      div.innerHTML = textContent_1;
      this.h();
    },
    l(nodes) {
      h1 = claim_element(nodes, "H1", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(h1) !== "svelte-iurezv")
        h1.textContent = textContent;
      t1 = claim_space(nodes);
      p = claim_element(nodes, "P", { class: true });
      var p_nodes = children(p);
      t2 = claim_text(p_nodes, "Cannot find the dashboard with id: ");
      code = claim_element(p_nodes, "CODE", {});
      var code_nodes = children(code);
      t3 = claim_text(
        code_nodes,
        /*dashboardId*/
        ctx[0]
      );
      code_nodes.forEach(detach);
      p_nodes.forEach(detach);
      t4 = claim_space(nodes);
      div = claim_element(nodes, "DIV", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(div) !== "svelte-18o67bb")
        div.innerHTML = textContent_1;
      this.h();
    },
    h() {
      attr(h1, "class", "text-5xl font-bold");
      attr(p, "class", "py-6");
      attr(div, "class", "w-full mt-8 text-center");
    },
    m(target, anchor) {
      insert_hydration(target, h1, anchor);
      insert_hydration(target, t1, anchor);
      insert_hydration(target, p, anchor);
      append_hydration(p, t2);
      append_hydration(p, code);
      append_hydration(code, t3);
      insert_hydration(target, t4, anchor);
      insert_hydration(target, div, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*dashboardId*/
      1)
        set_data(
          t3,
          /*dashboardId*/
          ctx2[0]
        );
    },
    d(detaching) {
      if (detaching) {
        detach(h1);
        detach(t1);
        detach(p);
        detach(t4);
        detach(div);
      }
    }
  };
}
function create_if_block_2(ctx) {
  let h1;
  let textContent = "🤷 Empty!";
  let t1;
  let p;
  let textContent_1 = "This dashboard is empty.";
  let t3;
  let button;
  let textContent_2 = "Edit 🪚";
  let mounted;
  let dispose;
  return {
    c() {
      h1 = element("h1");
      h1.textContent = textContent;
      t1 = space();
      p = element("p");
      p.textContent = textContent_1;
      t3 = space();
      button = element("button");
      button.textContent = textContent_2;
      this.h();
    },
    l(nodes) {
      h1 = claim_element(nodes, "H1", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(h1) !== "svelte-nomci8")
        h1.textContent = textContent;
      t1 = claim_space(nodes);
      p = claim_element(nodes, "P", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(p) !== "svelte-loin6k")
        p.textContent = textContent_1;
      t3 = claim_space(nodes);
      button = claim_element(nodes, "BUTTON", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(button) !== "svelte-kn46hw")
        button.textContent = textContent_2;
      this.h();
    },
    h() {
      attr(h1, "class", "text-5xl font-bold");
      attr(p, "class", "py-6");
      attr(button, "class", "btn btn-primary");
    },
    m(target, anchor) {
      insert_hydration(target, h1, anchor);
      insert_hydration(target, t1, anchor);
      insert_hydration(target, p, anchor);
      insert_hydration(target, t3, anchor);
      insert_hydration(target, button, anchor);
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*click_handler*/
          ctx[22]
        );
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(h1);
        detach(t1);
        detach(p);
        detach(t3);
        detach(button);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_default_slot_1(ctx) {
  let div;
  function select_block_type_1(ctx2, dirty) {
    if (
      /*dashboard*/
      ctx2[1] !== void 0
    )
      return create_if_block_2;
    if (
      /*dashboardId*/
      ctx2[0] !== null
    )
      return create_if_block_3;
    return create_else_block_1;
  }
  let current_block_type = select_block_type_1(ctx);
  let if_block = current_block_type(ctx);
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
      attr(div, "class", "p-4");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if_block.m(div, null);
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type_1(ctx2)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(div, null);
        }
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if_block.d();
    }
  };
}
function create_default_slot(ctx) {
  let dashboardeditor;
  let current;
  dashboardeditor = new DashboardEditor({
    props: { settings: (
      /*dashboard*/
      ctx[1]
    ) }
  });
  dashboardeditor.$on(
    "settings",
    /*settings_handler*/
    ctx[16]
  );
  dashboardeditor.$on(
    "delete",
    /*delete_handler*/
    ctx[17]
  );
  return {
    c() {
      create_component(dashboardeditor.$$.fragment);
    },
    l(nodes) {
      claim_component(dashboardeditor.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(dashboardeditor, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const dashboardeditor_changes = {};
      if (dirty & /*dashboard*/
      2)
        dashboardeditor_changes.settings = /*dashboard*/
        ctx2[1];
      dashboardeditor.$set(dashboardeditor_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(dashboardeditor.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(dashboardeditor.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(dashboardeditor, detaching);
    }
  };
}
function create_fragment(ctx) {
  let title_value;
  let t;
  let div;
  let current_block_type_index;
  let if_block;
  let current;
  document.title = title_value = /*dashboard*/
  ctx[1] !== void 0 ? (
    /*dashboard*/
    ctx[1].title
  ) : "Dashboard";
  const if_block_creators = [create_if_block, create_if_block_1, create_else_block];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*$editing*/
      ctx2[5] && /*dashboard*/
      ctx2[1] !== void 0
    )
      return 0;
    if (
      /*root*/
      ctx2[2] !== void 0
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
      const head_nodes = head_selector("svelte-1u5dy9d", document.head);
      head_nodes.forEach(detach);
      t = claim_space(nodes);
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      if_block.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "w-full h-full pb-16 md:pb-0");
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
      insert_hydration(target, div, anchor);
      if_blocks[current_block_type_index].m(div, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      if ((!current || dirty & /*dashboard, undefined*/
      2) && title_value !== (title_value = /*dashboard*/
      ctx2[1] !== void 0 ? (
        /*dashboard*/
        ctx2[1].title
      ) : "Dashboard")) {
        document.title = title_value;
      }
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
  let dashboardId;
  let $homey;
  let $stores;
  let $editing;
  let $localDashboards;
  let $homeyDashboards;
  let $page;
  component_subscribe($$self, homey, ($$value) => $$invalidate(25, $homey = $$value));
  component_subscribe($$self, stores, ($$value) => $$invalidate(26, $stores = $$value));
  component_subscribe($$self, editing, ($$value) => $$invalidate(5, $editing = $$value));
  component_subscribe($$self, dashboards, ($$value) => $$invalidate(13, $localDashboards = $$value));
  component_subscribe($$self, dashboards$1, ($$value) => $$invalidate(14, $homeyDashboards = $$value));
  component_subscribe($$self, page, ($$value) => $$invalidate(15, $page = $$value));
  let dashboards$2;
  let dashboard;
  let root;
  let storeOpen = false;
  let migrated = false;
  let context;
  onMount(async () => {
    if ($homey === void 0) {
      await goto(base + "/");
    }
  });
  function onDashboard(_dashboards, _dashboardId) {
    const _dashboard = dashboards$2[_dashboardId ?? ""];
    if (_dashboard !== void 0 && (dashboard === void 0 || dashboard !== _dashboard && !$editing)) {
      const d = migrate(_dashboard);
      migrated = d !== _dashboard;
      if (migrated) {
        alerts.plain("Tip!", "This dashboard has been updated to a newer version. If everything looks good, coinsider saving the dashboard.", 1e4);
      }
      $$invalidate(1, dashboard = d);
      $$invalidate(2, root = d.root);
    } else if (_dashboardId === null) {
      $$invalidate(1, dashboard = void 0);
      $$invalidate(2, root = void 0);
    }
  }
  async function onSave() {
    var _a;
    if (dashboard !== void 0) {
      const storeId = (_a = Object.values($stores).find((store) => store.dashboards.some((dash) => (dash == null ? void 0 : dash.id) === (dashboard == null ? void 0 : dashboard.id)))) == null ? void 0 : _a.id;
      if (storeId !== void 0) {
        try {
          await saveDashboard($homey.id, storeId, dashboard);
          alerts.success("Saved!", "The dashboard was saved.", 5e3);
          editing.set(false);
        } catch (error) {
          alerts.error("Error!", "Could not save dashboard: " + error, 1e4);
        }
      } else {
        $$invalidate(3, storeOpen = true);
      }
    }
  }
  async function onStoreSelect(storeId) {
    try {
      await saveDashboard($homey.id, storeId, dashboard);
      alerts.success("Saved!", "The dashboard was saved.", 5e3);
      editing.set(false);
    } catch (error) {
      alerts.error("Error!", "Could not save dashboard: " + error, 1e4);
    }
  }
  async function onDelete() {
    var _a;
    if (dashboard !== void 0) {
      const storeId = (_a = Object.values($stores).find((store) => store.dashboards.some((dash) => (dash == null ? void 0 : dash.id) === (dashboard == null ? void 0 : dashboard.id)))) == null ? void 0 : _a.id;
      if (storeId !== void 0) {
        try {
          await deleteDashboard($homey.id, storeId, dashboard);
          await goto(base + "/board/");
        } catch (error) {
          alerts.error("Error!", "Could not delete dashboard: " + error, 1e4);
        }
      } else {
        alerts.error("Error!", "Could not find store for dashboard", 1e4);
      }
    }
  }
  function onSettings(_dashboard) {
    $$invalidate(1, dashboard = { ..._dashboard, root });
  }
  function onRoot(_root) {
    if (dashboard === void 0)
      return;
    $$invalidate(2, root = _root);
    $$invalidate(1, dashboard = { ...dashboard, root });
  }
  function create() {
    $$invalidate(1, dashboard = {
      id: v4(),
      version: 2,
      title: "New dashboard",
      root: void 0
    });
    $$invalidate(2, root = dashboard.root);
    editing.set(true);
  }
  const settings_handler = (e) => onSettings(e.detail);
  const delete_handler = (e) => onDelete();
  const root_handler = (e) => onRoot(e.detail);
  const save_handler = (e) => onSave();
  function storedialog_open_binding(value) {
    storeOpen = value;
    $$invalidate(3, storeOpen);
  }
  const storeId_handler = (e) => onStoreSelect(e.detail);
  const click_handler = () => editing.set(true);
  const click_handler_1 = () => create();
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$page*/
    32768) {
      $$invalidate(0, dashboardId = $page.url.searchParams.get("id"));
    }
    if ($$self.$$.dirty & /*$homeyDashboards, $localDashboards*/
    24576) {
      $$invalidate(12, dashboards$2 = { ...$homeyDashboards, ...$localDashboards });
    }
    if ($$self.$$.dirty & /*dashboards, dashboardId*/
    4097) {
      onDashboard(dashboards$2, dashboardId);
    }
  };
  $$invalidate(4, context = {
    editable: false,
    readonly: false,
    breadcrumbs: [],
    select: () => {
    }
  });
  return [
    dashboardId,
    dashboard,
    root,
    storeOpen,
    context,
    $editing,
    onSave,
    onStoreSelect,
    onDelete,
    onSettings,
    onRoot,
    create,
    dashboards$2,
    $localDashboards,
    $homeyDashboards,
    $page,
    settings_handler,
    delete_handler,
    root_handler,
    save_handler,
    storedialog_open_binding,
    storeId_handler,
    click_handler,
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
