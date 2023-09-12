import { s as safe_not_equal, f as element, g as claim_element, h as children, d as detach, j as attr, i as insert_hydration, x as component_subscribe, l as text, m as claim_text, D as append_hydration, n as set_data, C as noop, a as space, e as empty, u as get_svelte_dataset, c as claim_space, p as binding_callbacks, v as add_flush_callback } from "../chunks/scheduler.3830f32a.js";
import { S as SvelteComponent, i as init, t as transition_out, c as check_outros, a as transition_in, g as group_outros, f as bind, b as create_component, d as claim_component, m as mount_component, e as destroy_component } from "../chunks/index.9ba3e62c.js";
import "../chunks/singletons.5608acee.js";
import { p as page } from "../chunks/stores.c1febb7e.js";
import { b as homey, s as scopes, e as dashboards$1, w as webhookUrl, m as webhookId } from "../chunks/homey.c1ff599f.js";
import { d as dashboards, I as Input, B as Button, P as Progress } from "../chunks/Progress.6247a021.js";
import { d as dashboard } from "../chunks/index.fb849005.js";
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
    ctx[12](value);
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
    ctx[13]
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
    ctx[14]
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
      1048576) {
        button0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      button0.$set(button0_changes);
      const button1_changes = {};
      if (dirty & /*changes*/
      32)
        button1_changes.disabled = !/*changes*/
        ctx2[5];
      if (dirty & /*$$scope*/
      1048576) {
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
      attr(div, "class", "flex flex-col justify-center mx-auto max-w-md");
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
function instance($$self, $$props, $$invalidate) {
  let dashboards$2;
  let dashboardId;
  let resolvedDashboard;
  let $homey;
  let $scopes;
  let $page;
  let $localDashboards;
  let $homeyDashboards;
  component_subscribe($$self, homey, ($$value) => $$invalidate(15, $homey = $$value));
  component_subscribe($$self, scopes, ($$value) => $$invalidate(16, $scopes = $$value));
  component_subscribe($$self, page, ($$value) => $$invalidate(9, $page = $$value));
  component_subscribe($$self, dashboards, ($$value) => $$invalidate(10, $localDashboards = $$value));
  component_subscribe($$self, dashboards$1, ($$value) => $$invalidate(11, $homeyDashboards = $$value));
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
  function input_value_binding(value) {
    title = value;
    $$invalidate(0, title);
  }
  const click_handler = () => $$invalidate(4, deleteDashboardOpen = true);
  const click_handler_1 = () => saveDashboard();
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$homeyDashboards, $localDashboards*/
    3072) {
      $$invalidate(8, dashboards$2 = { ...$homeyDashboards, ...$localDashboards });
    }
    if ($$self.$$.dirty & /*$page*/
    512) {
      $$invalidate(1, dashboardId = $page.url.searchParams.get("id"));
    }
    if ($$self.$$.dirty & /*dashboardId, dashboards*/
    258) {
      $$invalidate(7, resolvedDashboard = dashboardId !== null ? dashboards$2[dashboardId] : void 0);
    }
    if ($$self.$$.dirty & /*resolvedDashboard*/
    128) {
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
    resolvedDashboard,
    dashboards$2,
    $page,
    $localDashboards,
    $homeyDashboards,
    input_value_binding,
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
