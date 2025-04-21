import { s as safe_not_equal, y as create_slot, f as element, a as space, g as claim_element, h as children, d as detach, c as claim_space, j as attr, i as insert_hydration, w as append_hydration, z as update_slot_base, A as get_all_dirty_from_scope, B as get_slot_changes, u as component_subscribe, v as get_svelte_dataset, x as noop, C as destroy_each, l as text, e as empty, m as claim_text, r as listen, n as set_data, D as run_all } from "./scheduler.a7fc7cea.js";
import { S as SvelteComponent, i as init, g as group_outros, t as transition_out, c as check_outros, a as transition_in, b as create_component, d as claim_component, m as mount_component, e as destroy_component } from "./index.20c35f04.js";
import { e as ensure_array_like, I as Icon, i as getIcon, l as mdiDotsVertical, n as mdiStar } from "./utils.3c8237ea.js";
import { g as goto } from "./navigation.93be9e73.js";
import { e as base } from "./singletons.e168a4d6.js";
import { f as favorite } from "./favorite.3a5032e5.js";
import { j as dashboards$1 } from "./v4.eedf8624.js";
import { d as dashboards } from "./localstorage.379dfb0c.js";
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[9] = list[i];
  child_ctx[11] = i;
  return child_ctx;
}
function create_else_block(ctx) {
  let div;
  let textContent = `<span class="text-6xl p-4 block">🐳</span> <p>Here&#39;s a whale to look at, because you have no dashboards yet anyway 🤷</p>`;
  return {
    c() {
      div = element("div");
      div.innerHTML = textContent;
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(div) !== "svelte-oqj5fd")
        div.innerHTML = textContent;
      this.h();
    },
    h() {
      attr(div, "class", "text-center py-2");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_if_block(ctx) {
  let div1;
  let div0;
  let current;
  let each_value = ensure_array_like(
    /*dashboards*/
    ctx[0]
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
      div1 = element("div");
      div0 = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      this.h();
    },
    l(nodes) {
      div1 = claim_element(nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(div0_nodes);
      }
      div0_nodes.forEach(detach);
      div1_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div0, "class", "card-body");
      attr(div1, "class", "card w-96 bg-base-100 shadow-xl");
    },
    m(target, anchor) {
      insert_hydration(target, div1, anchor);
      append_hydration(div1, div0);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div0, null);
        }
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & /*dashboards, favoriteDashboard, $favorite*/
      7) {
        each_value = ensure_array_like(
          /*dashboards*/
          ctx2[0]
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
            each_blocks[i].m(div0, null);
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
        detach(div1);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_if_block_2(ctx) {
  let icon;
  let current;
  icon = new Icon({ props: { data: mdiStar } });
  return {
    c() {
      create_component(icon.$$.fragment);
    },
    l(nodes) {
      claim_component(icon.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(icon, target, anchor);
      current = true;
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
      destroy_component(icon, detaching);
    }
  };
}
function create_if_block_1(ctx) {
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
      attr(div, "class", "divider divider-neutral my-1");
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
function create_each_block(ctx) {
  let div;
  let button;
  let icon0;
  let t0;
  let t1_value = (
    /*dashboard*/
    ctx[9].title + ""
  );
  let t1;
  let t2;
  let t3;
  let details;
  let summary;
  let icon1;
  let t4;
  let ul;
  let li;
  let a;
  let icon2;
  let t5;
  let t6;
  let if_block1_anchor;
  let current;
  let mounted;
  let dispose;
  icon0 = new Icon({
    props: {
      data: getIcon(
        /*dashboard*/
        ctx[9].iconId ?? "view-dashboard"
      )
    }
  });
  function click_handler() {
    return (
      /*click_handler*/
      ctx[7](
        /*dashboard*/
        ctx[9]
      )
    );
  }
  let if_block0 = (
    /*$favorite*/
    ctx[1] === /*dashboard*/
    ctx[9].id && create_if_block_2()
  );
  icon1 = new Icon({ props: { data: mdiDotsVertical } });
  icon2 = new Icon({ props: { data: mdiStar } });
  function click_handler_1(...args) {
    return (
      /*click_handler_1*/
      ctx[8](
        /*dashboard*/
        ctx[9],
        ...args
      )
    );
  }
  let if_block1 = (
    /*i*/
    ctx[11] < /*dashboards*/
    ctx[0].length - 1 && create_if_block_1()
  );
  return {
    c() {
      div = element("div");
      button = element("button");
      create_component(icon0.$$.fragment);
      t0 = space();
      t1 = text(t1_value);
      t2 = space();
      if (if_block0)
        if_block0.c();
      t3 = space();
      details = element("details");
      summary = element("summary");
      create_component(icon1.$$.fragment);
      t4 = space();
      ul = element("ul");
      li = element("li");
      a = element("a");
      create_component(icon2.$$.fragment);
      t5 = text("Favorite");
      t6 = space();
      if (if_block1)
        if_block1.c();
      if_block1_anchor = empty();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      button = claim_element(div_nodes, "BUTTON", { class: true });
      var button_nodes = children(button);
      claim_component(icon0.$$.fragment, button_nodes);
      t0 = claim_space(button_nodes);
      t1 = claim_text(button_nodes, t1_value);
      button_nodes.forEach(detach);
      t2 = claim_space(div_nodes);
      if (if_block0)
        if_block0.l(div_nodes);
      t3 = claim_space(div_nodes);
      details = claim_element(div_nodes, "DETAILS", { class: true });
      var details_nodes = children(details);
      summary = claim_element(details_nodes, "SUMMARY", { class: true });
      var summary_nodes = children(summary);
      claim_component(icon1.$$.fragment, summary_nodes);
      summary_nodes.forEach(detach);
      t4 = claim_space(details_nodes);
      ul = claim_element(details_nodes, "UL", { class: true });
      var ul_nodes = children(ul);
      li = claim_element(ul_nodes, "LI", {});
      var li_nodes = children(li);
      a = claim_element(li_nodes, "A", {});
      var a_nodes = children(a);
      claim_component(icon2.$$.fragment, a_nodes);
      t5 = claim_text(a_nodes, "Favorite");
      a_nodes.forEach(detach);
      li_nodes.forEach(detach);
      ul_nodes.forEach(detach);
      details_nodes.forEach(detach);
      div_nodes.forEach(detach);
      t6 = claim_space(nodes);
      if (if_block1)
        if_block1.l(nodes);
      if_block1_anchor = empty();
      this.h();
    },
    h() {
      attr(button, "class", "btn btn-ghost flex-1 flex justify-start");
      attr(summary, "class", "btn btn-ghost");
      attr(ul, "class", "menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow");
      attr(details, "class", "dropdown");
      attr(div, "class", "flex flex-row items-center");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, button);
      mount_component(icon0, button, null);
      append_hydration(button, t0);
      append_hydration(button, t1);
      append_hydration(div, t2);
      if (if_block0)
        if_block0.m(div, null);
      append_hydration(div, t3);
      append_hydration(div, details);
      append_hydration(details, summary);
      mount_component(icon1, summary, null);
      append_hydration(details, t4);
      append_hydration(details, ul);
      append_hydration(ul, li);
      append_hydration(li, a);
      mount_component(icon2, a, null);
      append_hydration(a, t5);
      insert_hydration(target, t6, anchor);
      if (if_block1)
        if_block1.m(target, anchor);
      insert_hydration(target, if_block1_anchor, anchor);
      current = true;
      if (!mounted) {
        dispose = [
          listen(button, "click", click_handler),
          listen(a, "click", click_handler_1)
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const icon0_changes = {};
      if (dirty & /*dashboards*/
      1)
        icon0_changes.data = getIcon(
          /*dashboard*/
          ctx[9].iconId ?? "view-dashboard"
        );
      icon0.$set(icon0_changes);
      if ((!current || dirty & /*dashboards*/
      1) && t1_value !== (t1_value = /*dashboard*/
      ctx[9].title + ""))
        set_data(t1, t1_value);
      if (
        /*$favorite*/
        ctx[1] === /*dashboard*/
        ctx[9].id
      ) {
        if (if_block0) {
          if (dirty & /*$favorite, dashboards*/
          3) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_2();
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(div, t3);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      if (
        /*i*/
        ctx[11] < /*dashboards*/
        ctx[0].length - 1
      ) {
        if (if_block1)
          ;
        else {
          if_block1 = create_if_block_1();
          if_block1.c();
          if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(icon0.$$.fragment, local);
      transition_in(if_block0);
      transition_in(icon1.$$.fragment, local);
      transition_in(icon2.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(icon0.$$.fragment, local);
      transition_out(if_block0);
      transition_out(icon1.$$.fragment, local);
      transition_out(icon2.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
        detach(t6);
        detach(if_block1_anchor);
      }
      destroy_component(icon0);
      if (if_block0)
        if_block0.d();
      destroy_component(icon1);
      destroy_component(icon2);
      if (if_block1)
        if_block1.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_fragment(ctx) {
  let div3;
  let div2;
  let div0;
  let t;
  let div1;
  let current_block_type_index;
  let if_block;
  let current;
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
  const if_block_creators = [create_if_block, create_else_block];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*dashboards*/
      ctx2[0] !== void 0 && /*dashboards*/
      ctx2[0].length > 0
    )
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      div3 = element("div");
      div2 = element("div");
      div0 = element("div");
      if (default_slot)
        default_slot.c();
      t = space();
      div1 = element("div");
      if_block.c();
      this.h();
    },
    l(nodes) {
      div3 = claim_element(nodes, "DIV", { class: true });
      var div3_nodes = children(div3);
      div2 = claim_element(div3_nodes, "DIV", { class: true });
      var div2_nodes = children(div2);
      div0 = claim_element(div2_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      if (default_slot)
        default_slot.l(div0_nodes);
      div0_nodes.forEach(detach);
      t = claim_space(div2_nodes);
      div1 = claim_element(div2_nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      if_block.l(div1_nodes);
      div1_nodes.forEach(detach);
      div2_nodes.forEach(detach);
      div3_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div0, "class", "text-center lg:text-left");
      attr(div1, "class", "card shrink-0 w-full max-w-sm shadow-2xl bg-base-100");
      attr(div2, "class", "hero-content flex-col lg:flex-row-reverse");
      attr(div3, "class", "hero bg-base-200");
    },
    m(target, anchor) {
      insert_hydration(target, div3, anchor);
      append_hydration(div3, div2);
      append_hydration(div2, div0);
      if (default_slot) {
        default_slot.m(div0, null);
      }
      append_hydration(div2, t);
      append_hydration(div2, div1);
      if_blocks[current_block_type_index].m(div1, null);
      current = true;
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
        if_block.m(div1, null);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div3);
      }
      if (default_slot)
        default_slot.d(detaching);
      if_blocks[current_block_type_index].d();
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let dashboards$2;
  let $localDashboards;
  let $homeyDashboards;
  let $favorite;
  component_subscribe($$self, dashboards, ($$value) => $$invalidate(3, $localDashboards = $$value));
  component_subscribe($$self, dashboards$1, ($$value) => $$invalidate(4, $homeyDashboards = $$value));
  component_subscribe($$self, favorite, ($$value) => $$invalidate(1, $favorite = $$value));
  let { $$slots: slots = {}, $$scope } = $$props;
  function favoriteDashboard(dashboard) {
    favorite.set(dashboard.id);
  }
  const click_handler = (dashboard) => goto(base + "/board/?id=" + dashboard.id);
  const click_handler_1 = (dashboard, e) => favoriteDashboard(dashboard);
  $$self.$$set = ($$props2) => {
    if ("$$scope" in $$props2)
      $$invalidate(5, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$homeyDashboards, $localDashboards*/
    24) {
      $$invalidate(0, dashboards$2 = Object.values({ ...$homeyDashboards, ...$localDashboards }));
    }
  };
  return [
    dashboards$2,
    $favorite,
    favoriteDashboard,
    $localDashboards,
    $homeyDashboards,
    $$scope,
    slots,
    click_handler,
    click_handler_1
  ];
}
class DashboardListHero extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {});
  }
}
export {
  DashboardListHero as D
};
