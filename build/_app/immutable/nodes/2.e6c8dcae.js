import { _ as __vitePreload } from "../chunks/preload-helper.60b963d6.js";
import { s as safe_not_equal, H as HtmlTagHydration, e as empty, a as space, f as element, G as head_selector, I as claim_html_tag, d as detach, c as claim_space, g as claim_element, h as children, j as attr, w as append_hydration, i as insert_hydration, u as component_subscribe, o as onMount, v as get_svelte_dataset, x as noop, l as text, m as claim_text, r as listen, D as run_all, J as set_input_value, n as set_data, k as set_style } from "../chunks/scheduler.eb13839d.js";
import { I as Icon, j as mdiKey, k as mdiAccount, h as handle_promise, u as update_await_block_branch } from "../chunks/utils.01552eec.js";
import { S as SvelteComponent, i as init, t as transition_out, c as check_outros, a as transition_in, g as group_outros, b as create_component, d as claim_component, m as mount_component, e as destroy_component } from "../chunks/index.b52a7f1f.js";
import { h as baseUrl, j as homey, m as clientId, n as clientSecret } from "../chunks/alerting.10c3ed01.js";
import { H as HomeyAPIV3Local, a as apiKey, h as homeyId } from "../chunks/HomeyAPIV3Local.9e38f924.js";
import { g as goto } from "../chunks/navigation.bb3d6a65.js";
import { e as base } from "../chunks/singletons.75e21b2d.js";
import { A as AthomCloudAPI } from "../chunks/AthomCloudAPI.75f5d69d.js";
import { p as page } from "../chunks/stores.aa567822.js";
import { D as DashboardListHero } from "../chunks/DashboardListHero.2a4a5060.js";
const pwaInfo = { "pwaInDevEnvironment": false, "webManifest": { "href": "./manifest.webmanifest", "useCredentials": false, "linkTag": '<link rel="manifest" href="./manifest.webmanifest">' } };
function create_else_block(ctx) {
  let div;
  let current_block_type_index;
  let if_block;
  let current;
  const if_block_creators = [create_if_block_1, create_else_block_2];
  const if_blocks = [];
  function select_block_type_1(ctx2, dirty) {
    if (
      /*active*/
      ctx2[0] === "#direct"
    )
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type_1(ctx);
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
      attr(div, "class", "hero min-h-screen bg-base-200");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if_blocks[current_block_type_index].m(div, null);
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
function create_if_block(ctx) {
  let div;
  let dashboardlisthero;
  let current;
  dashboardlisthero = new DashboardListHero({
    props: {
      $$slots: { default: [create_default_slot] },
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
      if (dirty & /*$$scope*/
      16777216) {
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
function create_else_block_2(ctx) {
  let div2;
  let div0;
  let h1;
  let textContent = "Welcome!";
  let t1;
  let p0;
  let textContent_1 = "Online authentication can be used with both the newer Homey Pro 2023 and older models.";
  let t3;
  let button0;
  let icon;
  let t4;
  let t5;
  let div1;
  let p1;
  let textContent_2 = "With online authentication, scopes cannot be selected individually. If you want to limit access, \r\n                            use local login with API-key, only available for Homey Pro 2023.";
  let t7;
  let button1;
  let textContent_3 = "Head over to Athom to sign in";
  let current;
  let mounted;
  let dispose;
  icon = new Icon({ props: { data: mdiKey } });
  return {
    c() {
      div2 = element("div");
      div0 = element("div");
      h1 = element("h1");
      h1.textContent = textContent;
      t1 = space();
      p0 = element("p");
      p0.textContent = textContent_1;
      t3 = space();
      button0 = element("button");
      create_component(icon.$$.fragment);
      t4 = text("\r\n                            Login using an API-key instead");
      t5 = space();
      div1 = element("div");
      p1 = element("p");
      p1.textContent = textContent_2;
      t7 = space();
      button1 = element("button");
      button1.textContent = textContent_3;
      this.h();
    },
    l(nodes) {
      div2 = claim_element(nodes, "DIV", { class: true });
      var div2_nodes = children(div2);
      div0 = claim_element(div2_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      h1 = claim_element(div0_nodes, "H1", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(h1) !== "svelte-1d36na2")
        h1.textContent = textContent;
      t1 = claim_space(div0_nodes);
      p0 = claim_element(div0_nodes, "P", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(p0) !== "svelte-1hzp7qy")
        p0.textContent = textContent_1;
      t3 = claim_space(div0_nodes);
      button0 = claim_element(div0_nodes, "BUTTON", { class: true });
      var button0_nodes = children(button0);
      claim_component(icon.$$.fragment, button0_nodes);
      t4 = claim_text(button0_nodes, "\r\n                            Login using an API-key instead");
      button0_nodes.forEach(detach);
      div0_nodes.forEach(detach);
      t5 = claim_space(div2_nodes);
      div1 = claim_element(div2_nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      p1 = claim_element(div1_nodes, "P", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(p1) !== "svelte-gugh2q")
        p1.textContent = textContent_2;
      t7 = claim_space(div1_nodes);
      button1 = claim_element(div1_nodes, "BUTTON", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(button1) !== "svelte-1he02f9")
        button1.textContent = textContent_3;
      div1_nodes.forEach(detach);
      div2_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(h1, "class", "text-5xl font-bold");
      attr(p0, "class", "py-6");
      attr(button0, "class", "btn btn-ghost");
      attr(div0, "class", "text-center lg:text-left max-w-xs");
      attr(p1, "class", "pb-6");
      attr(button1, "class", "btn btn-primary");
      attr(div1, "class", "card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 p-4");
      attr(div2, "class", "hero-content flex-col lg:flex-row");
    },
    m(target, anchor) {
      insert_hydration(target, div2, anchor);
      append_hydration(div2, div0);
      append_hydration(div0, h1);
      append_hydration(div0, t1);
      append_hydration(div0, p0);
      append_hydration(div0, t3);
      append_hydration(div0, button0);
      mount_component(icon, button0, null);
      append_hydration(button0, t4);
      append_hydration(div2, t5);
      append_hydration(div2, div1);
      append_hydration(div1, p1);
      append_hydration(div1, t7);
      append_hydration(div1, button1);
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            button0,
            "click",
            /*click_handler_2*/
            ctx[14]
          ),
          listen(
            button1,
            "click",
            /*oauthLogin*/
            ctx[9]
          )
        ];
        mounted = true;
      }
    },
    p: noop,
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
        detach(div2);
      }
      destroy_component(icon);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_1(ctx) {
  let div5;
  let div0;
  let h1;
  let textContent = "Welcome!";
  let t1;
  let p0;
  let textContent_1 = "Direct authentication can only be used on the Homey Pro 2023 model. Older models do not have the API-Key feature.";
  let t3;
  let button0;
  let icon;
  let t4;
  let t5;
  let div4;
  let form;
  let p1;
  let textContent_2 = "You can obtain the Homey-ID by navigating to:";
  let t7;
  let div1;
  let textContent_3 = `<ul><li>Homey</li> <li>Settings</li> <li>General</li> <li>Cloud</li></ul>`;
  let t15;
  let div2;
  let label;
  let textContent_4 = `<span class="label-text">Homey ID</span>`;
  let t17;
  let input;
  let t18;
  let t19;
  let div3;
  let t20;
  let t21;
  let button1;
  let t22;
  let button1_disabled_value;
  let t23;
  let promise;
  let current;
  let mounted;
  let dispose;
  icon = new Icon({ props: { data: mdiAccount } });
  let if_block0 = (
    /*localHomeyId*/
    ctx[4].length > 0 && /*localHomeyId*/
    ctx[4].length !== 24 && create_if_block_6()
  );
  let if_block1 = (
    /*localHomeyId*/
    ctx[4].length === 24 && create_if_block_4(ctx)
  );
  let info = {
    ctx,
    current: null,
    token: null,
    hasCatch: true,
    pending: create_pending_block,
    then: create_then_block,
    catch: create_catch_block_3,
    value: 19,
    error: 23
  };
  handle_promise(promise = /*localKeyLoading*/
  ctx[3], info);
  return {
    c() {
      div5 = element("div");
      div0 = element("div");
      h1 = element("h1");
      h1.textContent = textContent;
      t1 = space();
      p0 = element("p");
      p0.textContent = textContent_1;
      t3 = space();
      button0 = element("button");
      create_component(icon.$$.fragment);
      t4 = text("\r\n                            Login using Athom credentials instead");
      t5 = space();
      div4 = element("div");
      form = element("form");
      p1 = element("p");
      p1.textContent = textContent_2;
      t7 = space();
      div1 = element("div");
      div1.innerHTML = textContent_3;
      t15 = space();
      div2 = element("div");
      label = element("label");
      label.innerHTML = textContent_4;
      t17 = space();
      input = element("input");
      t18 = space();
      if (if_block0)
        if_block0.c();
      t19 = space();
      div3 = element("div");
      t20 = space();
      if (if_block1)
        if_block1.c();
      t21 = space();
      button1 = element("button");
      t22 = text("Verify");
      t23 = space();
      info.block.c();
      this.h();
    },
    l(nodes) {
      div5 = claim_element(nodes, "DIV", { class: true });
      var div5_nodes = children(div5);
      div0 = claim_element(div5_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      h1 = claim_element(div0_nodes, "H1", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(h1) !== "svelte-1d36na2")
        h1.textContent = textContent;
      t1 = claim_space(div0_nodes);
      p0 = claim_element(div0_nodes, "P", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(p0) !== "svelte-7rwoz0")
        p0.textContent = textContent_1;
      t3 = claim_space(div0_nodes);
      button0 = claim_element(div0_nodes, "BUTTON", { class: true });
      var button0_nodes = children(button0);
      claim_component(icon.$$.fragment, button0_nodes);
      t4 = claim_text(button0_nodes, "\r\n                            Login using Athom credentials instead");
      button0_nodes.forEach(detach);
      div0_nodes.forEach(detach);
      t5 = claim_space(div5_nodes);
      div4 = claim_element(div5_nodes, "DIV", { class: true });
      var div4_nodes = children(div4);
      form = claim_element(div4_nodes, "FORM", { class: true });
      var form_nodes = children(form);
      p1 = claim_element(form_nodes, "P", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(p1) !== "svelte-1xtivuf")
        p1.textContent = textContent_2;
      t7 = claim_space(form_nodes);
      div1 = claim_element(form_nodes, "DIV", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(div1) !== "svelte-1n17ogo")
        div1.innerHTML = textContent_3;
      t15 = claim_space(form_nodes);
      div2 = claim_element(form_nodes, "DIV", { class: true });
      var div2_nodes = children(div2);
      label = claim_element(div2_nodes, "LABEL", {
        class: true,
        for: true,
        ["data-svelte-h"]: true
      });
      if (get_svelte_dataset(label) !== "svelte-z6bk16")
        label.innerHTML = textContent_4;
      t17 = claim_space(div2_nodes);
      input = claim_element(div2_nodes, "INPUT", { type: true, id: true, class: true });
      t18 = claim_space(div2_nodes);
      if (if_block0)
        if_block0.l(div2_nodes);
      div2_nodes.forEach(detach);
      t19 = claim_space(form_nodes);
      div3 = claim_element(form_nodes, "DIV", { class: true });
      children(div3).forEach(detach);
      t20 = claim_space(form_nodes);
      if (if_block1)
        if_block1.l(form_nodes);
      t21 = claim_space(form_nodes);
      button1 = claim_element(form_nodes, "BUTTON", { class: true });
      var button1_nodes = children(button1);
      t22 = claim_text(button1_nodes, "Verify");
      button1_nodes.forEach(detach);
      t23 = claim_space(form_nodes);
      info.block.l(form_nodes);
      form_nodes.forEach(detach);
      div4_nodes.forEach(detach);
      div5_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(h1, "class", "text-5xl font-bold");
      attr(p0, "class", "py-6");
      attr(button0, "class", "btn btn-secondary");
      attr(div0, "class", "text-center lg:text-left max-w-xs");
      attr(p1, "class", "pt-6");
      attr(div1, "class", "text-sm breadcrumbs");
      attr(label, "class", "label");
      attr(label, "for", "localHomeyId");
      attr(input, "type", "text");
      attr(input, "id", "localHomeyId");
      attr(input, "class", "input input-primary");
      attr(div2, "class", "form-control");
      attr(div3, "class", "divider");
      attr(button1, "class", "btn btn-primary mt-6");
      button1.disabled = button1_disabled_value = /*localKey*/
      ctx[1] === "" || /*localHomeyId*/
      ctx[4].length != 24;
      attr(form, "class", "card-body max-w-xs");
      attr(div4, "class", "card shrink-0 w-full max-w-sm shadow-2xl bg-base-100");
      attr(div5, "class", "hero-content flex-col lg:flex-row-reverse");
    },
    m(target, anchor) {
      insert_hydration(target, div5, anchor);
      append_hydration(div5, div0);
      append_hydration(div0, h1);
      append_hydration(div0, t1);
      append_hydration(div0, p0);
      append_hydration(div0, t3);
      append_hydration(div0, button0);
      mount_component(icon, button0, null);
      append_hydration(button0, t4);
      append_hydration(div5, t5);
      append_hydration(div5, div4);
      append_hydration(div4, form);
      append_hydration(form, p1);
      append_hydration(form, t7);
      append_hydration(form, div1);
      append_hydration(form, t15);
      append_hydration(form, div2);
      append_hydration(div2, label);
      append_hydration(div2, t17);
      append_hydration(div2, input);
      set_input_value(
        input,
        /*localHomeyId*/
        ctx[4]
      );
      append_hydration(div2, t18);
      if (if_block0)
        if_block0.m(div2, null);
      append_hydration(form, t19);
      append_hydration(form, div3);
      append_hydration(form, t20);
      if (if_block1)
        if_block1.m(form, null);
      append_hydration(form, t21);
      append_hydration(form, button1);
      append_hydration(button1, t22);
      append_hydration(form, t23);
      info.block.m(form, info.anchor = null);
      info.mount = () => form;
      info.anchor = null;
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            button0,
            "click",
            /*click_handler*/
            ctx[10]
          ),
          listen(
            input,
            "input",
            /*input_input_handler*/
            ctx[11]
          ),
          listen(
            button1,
            "click",
            /*verifyApiKey*/
            ctx[7]
          )
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*localHomeyId*/
      16 && input.value !== /*localHomeyId*/
      ctx[4]) {
        set_input_value(
          input,
          /*localHomeyId*/
          ctx[4]
        );
      }
      if (
        /*localHomeyId*/
        ctx[4].length > 0 && /*localHomeyId*/
        ctx[4].length !== 24
      ) {
        if (if_block0)
          ;
        else {
          if_block0 = create_if_block_6();
          if_block0.c();
          if_block0.m(div2, null);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (
        /*localHomeyId*/
        ctx[4].length === 24
      ) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_4(ctx);
          if_block1.c();
          if_block1.m(form, t21);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (!current || dirty & /*localKey, localHomeyId*/
      18 && button1_disabled_value !== (button1_disabled_value = /*localKey*/
      ctx[1] === "" || /*localHomeyId*/
      ctx[4].length != 24)) {
        button1.disabled = button1_disabled_value;
      }
      info.ctx = ctx;
      if (dirty & /*localKeyLoading*/
      8 && promise !== (promise = /*localKeyLoading*/
      ctx[3]) && handle_promise(promise, info))
        ;
      else {
        update_await_block_branch(info, ctx, dirty);
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
        detach(div5);
      }
      destroy_component(icon);
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
      info.block.d();
      info.token = null;
      info = null;
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_if_block_6(ctx) {
  let label;
  let textContent = `<span class="label-text-alt">Must be 24 characters</span>`;
  return {
    c() {
      label = element("label");
      label.innerHTML = textContent;
      this.h();
    },
    l(nodes) {
      label = claim_element(nodes, "LABEL", {
        class: true,
        for: true,
        ["data-svelte-h"]: true
      });
      if (get_svelte_dataset(label) !== "svelte-1bj2ey9")
        label.innerHTML = textContent;
      this.h();
    },
    h() {
      attr(label, "class", "label");
      attr(label, "for", "localHomeyId");
    },
    m(target, anchor) {
      insert_hydration(target, label, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(label);
      }
    }
  };
}
function create_if_block_4(ctx) {
  let p;
  let textContent = "You can then create a API-key at:";
  let t1;
  let div0;
  let textContent_1 = `<ul><li><a href="https://my.homey.app" target="_blank">my.homey.app</a></li> <li>Settings</li> <li>API Keys</li></ul>`;
  let t7;
  let div1;
  let label;
  let textContent_2 = `<span class="label-text">Homey API-Key</span>`;
  let t9;
  let input;
  let t10;
  let mounted;
  let dispose;
  let if_block = (
    /*localKeyError*/
    ctx[2] !== void 0 && create_if_block_5(ctx)
  );
  return {
    c() {
      p = element("p");
      p.textContent = textContent;
      t1 = space();
      div0 = element("div");
      div0.innerHTML = textContent_1;
      t7 = space();
      div1 = element("div");
      label = element("label");
      label.innerHTML = textContent_2;
      t9 = space();
      input = element("input");
      t10 = space();
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes) {
      p = claim_element(nodes, "P", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(p) !== "svelte-1gv6chq")
        p.textContent = textContent;
      t1 = claim_space(nodes);
      div0 = claim_element(nodes, "DIV", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(div0) !== "svelte-1lee5kb")
        div0.innerHTML = textContent_1;
      t7 = claim_space(nodes);
      div1 = claim_element(nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      label = claim_element(div1_nodes, "LABEL", {
        class: true,
        for: true,
        ["data-svelte-h"]: true
      });
      if (get_svelte_dataset(label) !== "svelte-1rh5w13")
        label.innerHTML = textContent_2;
      t9 = claim_space(div1_nodes);
      input = claim_element(div1_nodes, "INPUT", { type: true, id: true, class: true });
      t10 = claim_space(div1_nodes);
      if (if_block)
        if_block.l(div1_nodes);
      div1_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(p, "class", "pt-6");
      attr(div0, "class", "text-sm breadcrumbs");
      attr(label, "class", "label");
      attr(label, "for", "localKey");
      attr(input, "type", "text");
      attr(input, "id", "localKey");
      attr(input, "class", "input input-primary");
      attr(div1, "class", "form-control");
    },
    m(target, anchor) {
      insert_hydration(target, p, anchor);
      insert_hydration(target, t1, anchor);
      insert_hydration(target, div0, anchor);
      insert_hydration(target, t7, anchor);
      insert_hydration(target, div1, anchor);
      append_hydration(div1, label);
      append_hydration(div1, t9);
      append_hydration(div1, input);
      set_input_value(
        input,
        /*localKey*/
        ctx[1]
      );
      append_hydration(div1, t10);
      if (if_block)
        if_block.m(div1, null);
      if (!mounted) {
        dispose = listen(
          input,
          "input",
          /*input_input_handler_1*/
          ctx[12]
        );
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*localKey*/
      2 && input.value !== /*localKey*/
      ctx2[1]) {
        set_input_value(
          input,
          /*localKey*/
          ctx2[1]
        );
      }
      if (
        /*localKeyError*/
        ctx2[2] !== void 0
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_5(ctx2);
          if_block.c();
          if_block.m(div1, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    d(detaching) {
      if (detaching) {
        detach(p);
        detach(t1);
        detach(div0);
        detach(t7);
        detach(div1);
      }
      if (if_block)
        if_block.d();
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_5(ctx) {
  let label;
  let span;
  let t;
  return {
    c() {
      label = element("label");
      span = element("span");
      t = text(
        /*localKeyError*/
        ctx[2]
      );
      this.h();
    },
    l(nodes) {
      label = claim_element(nodes, "LABEL", { class: true, for: true });
      var label_nodes = children(label);
      span = claim_element(label_nodes, "SPAN", { class: true });
      var span_nodes = children(span);
      t = claim_text(
        span_nodes,
        /*localKeyError*/
        ctx[2]
      );
      span_nodes.forEach(detach);
      label_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(span, "class", "label-text-alt");
      attr(label, "class", "label");
      attr(label, "for", "localKey");
    },
    m(target, anchor) {
      insert_hydration(target, label, anchor);
      append_hydration(label, span);
      append_hydration(span, t);
    },
    p(ctx2, dirty) {
      if (dirty & /*localKeyError*/
      4)
        set_data(
          t,
          /*localKeyError*/
          ctx2[2]
        );
    },
    d(detaching) {
      if (detaching) {
        detach(label);
      }
    }
  };
}
function create_catch_block_3(ctx) {
  let p;
  let t_value = (
    /*error*/
    ctx[23] + ""
  );
  let t;
  return {
    c() {
      p = element("p");
      t = text(t_value);
      this.h();
    },
    l(nodes) {
      p = claim_element(nodes, "P", { style: true });
      var p_nodes = children(p);
      t = claim_text(p_nodes, t_value);
      p_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_style(p, "color", "red");
    },
    m(target, anchor) {
      insert_hydration(target, p, anchor);
      append_hydration(p, t);
    },
    p(ctx2, dirty) {
      if (dirty & /*localKeyLoading*/
      8 && t_value !== (t_value = /*error*/
      ctx2[23] + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching) {
        detach(p);
      }
    }
  };
}
function create_then_block(ctx) {
  let if_block_anchor;
  let if_block = (
    /*instance*/
    ctx[19] !== void 0 && create_if_block_2(ctx)
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
    },
    p(ctx2, dirty) {
      if (
        /*instance*/
        ctx2[19] !== void 0
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_2(ctx2);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
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
function create_if_block_2(ctx) {
  let promise;
  let t0;
  let promise_1;
  let t1;
  let p;
  let button;
  let textContent = "Continue";
  let mounted;
  let dispose;
  let info = {
    ctx,
    current: null,
    token: null,
    hasCatch: false,
    pending: create_pending_block_3,
    then: create_then_block_3,
    catch: create_catch_block_2,
    value: 22
  };
  handle_promise(promise = /*instance*/
  ctx[19].system.getSystemName(), info);
  let info_1 = {
    ctx,
    current: null,
    token: null,
    hasCatch: false,
    pending: create_pending_block_1,
    then: create_then_block_1,
    catch: create_catch_block_1,
    value: 20
  };
  handle_promise(promise_1 = /*instance*/
  ctx[19].sessions.getSessionMe(), info_1);
  function click_handler_1() {
    return (
      /*click_handler_1*/
      ctx[13](
        /*instance*/
        ctx[19]
      )
    );
  }
  return {
    c() {
      info.block.c();
      t0 = space();
      info_1.block.c();
      t1 = space();
      p = element("p");
      button = element("button");
      button.textContent = textContent;
      this.h();
    },
    l(nodes) {
      info.block.l(nodes);
      t0 = claim_space(nodes);
      info_1.block.l(nodes);
      t1 = claim_space(nodes);
      p = claim_element(nodes, "P", {});
      var p_nodes = children(p);
      button = claim_element(p_nodes, "BUTTON", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(button) !== "svelte-1hgm26b")
        button.textContent = textContent;
      p_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(button, "class", "btn btn-primary");
    },
    m(target, anchor) {
      info.block.m(target, info.anchor = anchor);
      info.mount = () => t0.parentNode;
      info.anchor = t0;
      insert_hydration(target, t0, anchor);
      info_1.block.m(target, info_1.anchor = anchor);
      info_1.mount = () => t1.parentNode;
      info_1.anchor = t1;
      insert_hydration(target, t1, anchor);
      insert_hydration(target, p, anchor);
      append_hydration(p, button);
      if (!mounted) {
        dispose = listen(button, "click", click_handler_1);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      info.ctx = ctx;
      if (dirty & /*localKeyLoading*/
      8 && promise !== (promise = /*instance*/
      ctx[19].system.getSystemName()) && handle_promise(promise, info))
        ;
      else {
        update_await_block_branch(info, ctx, dirty);
      }
      info_1.ctx = ctx;
      if (dirty & /*localKeyLoading*/
      8 && promise_1 !== (promise_1 = /*instance*/
      ctx[19].sessions.getSessionMe()) && handle_promise(promise_1, info_1))
        ;
      else {
        update_await_block_branch(info_1, ctx, dirty);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(t0);
        detach(t1);
        detach(p);
      }
      info.block.d(detaching);
      info.token = null;
      info = null;
      info_1.block.d(detaching);
      info_1.token = null;
      info_1 = null;
      mounted = false;
      dispose();
    }
  };
}
function create_catch_block_2(ctx) {
  return {
    c: noop,
    l: noop,
    m: noop,
    p: noop,
    d: noop
  };
}
function create_then_block_3(ctx) {
  let p;
  let t0;
  let b;
  let t1_value = (
    /*name*/
    ctx[22] + ""
  );
  let t1;
  return {
    c() {
      p = element("p");
      t0 = text("... connected to ");
      b = element("b");
      t1 = text(t1_value);
    },
    l(nodes) {
      p = claim_element(nodes, "P", {});
      var p_nodes = children(p);
      t0 = claim_text(p_nodes, "... connected to ");
      b = claim_element(p_nodes, "B", {});
      var b_nodes = children(b);
      t1 = claim_text(b_nodes, t1_value);
      b_nodes.forEach(detach);
      p_nodes.forEach(detach);
    },
    m(target, anchor) {
      insert_hydration(target, p, anchor);
      append_hydration(p, t0);
      append_hydration(p, b);
      append_hydration(b, t1);
    },
    p(ctx2, dirty) {
      if (dirty & /*localKeyLoading*/
      8 && t1_value !== (t1_value = /*name*/
      ctx2[22] + ""))
        set_data(t1, t1_value);
    },
    d(detaching) {
      if (detaching) {
        detach(p);
      }
    }
  };
}
function create_pending_block_3(ctx) {
  return {
    c: noop,
    l: noop,
    m: noop,
    p: noop,
    d: noop
  };
}
function create_catch_block_1(ctx) {
  return {
    c: noop,
    l: noop,
    m: noop,
    p: noop,
    d: noop
  };
}
function create_then_block_1(ctx) {
  let p0;
  let t0;
  let b0;
  let t1_value = (
    /*session*/
    ctx[20].userName + ""
  );
  let t1;
  let t2;
  let p1;
  let t3;
  let b1;
  let t4_value = (
    /*session*/
    ctx[20].type + ""
  );
  let t4;
  let t5;
  let t6_value = (
    /*session*/
    ctx[20].clientName + ""
  );
  let t6;
  let t7;
  let p2;
  let t8;
  let b2;
  let t9_value = (
    /*session*/
    ctx[20].scopes + ""
  );
  let t9;
  let t10;
  let show_if;
  let if_block_anchor;
  function select_block_type_2(ctx2, dirty) {
    if (dirty & /*localKeyLoading*/
    8)
      show_if = null;
    if (show_if == null)
      show_if = !!/*session*/
      (ctx2[20].scopes.includes("homey.app") || /*session*/
      ctx2[20].scopes.includes("homey"));
    if (show_if)
      return create_if_block_3;
    return create_else_block_1;
  }
  let current_block_type = select_block_type_2(ctx, -1);
  let if_block = current_block_type(ctx);
  return {
    c() {
      p0 = element("p");
      t0 = text("... logged in as ");
      b0 = element("b");
      t1 = text(t1_value);
      t2 = space();
      p1 = element("p");
      t3 = text("... with ");
      b1 = element("b");
      t4 = text(t4_value);
      t5 = space();
      t6 = text(t6_value);
      t7 = space();
      p2 = element("p");
      t8 = text("... scopes ");
      b2 = element("b");
      t9 = text(t9_value);
      t10 = space();
      if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      p0 = claim_element(nodes, "P", {});
      var p0_nodes = children(p0);
      t0 = claim_text(p0_nodes, "... logged in as ");
      b0 = claim_element(p0_nodes, "B", {});
      var b0_nodes = children(b0);
      t1 = claim_text(b0_nodes, t1_value);
      b0_nodes.forEach(detach);
      p0_nodes.forEach(detach);
      t2 = claim_space(nodes);
      p1 = claim_element(nodes, "P", {});
      var p1_nodes = children(p1);
      t3 = claim_text(p1_nodes, "... with ");
      b1 = claim_element(p1_nodes, "B", {});
      var b1_nodes = children(b1);
      t4 = claim_text(b1_nodes, t4_value);
      t5 = claim_space(b1_nodes);
      t6 = claim_text(b1_nodes, t6_value);
      b1_nodes.forEach(detach);
      p1_nodes.forEach(detach);
      t7 = claim_space(nodes);
      p2 = claim_element(nodes, "P", {});
      var p2_nodes = children(p2);
      t8 = claim_text(p2_nodes, "... scopes ");
      b2 = claim_element(p2_nodes, "B", {});
      var b2_nodes = children(b2);
      t9 = claim_text(b2_nodes, t9_value);
      b2_nodes.forEach(detach);
      p2_nodes.forEach(detach);
      t10 = claim_space(nodes);
      if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      insert_hydration(target, p0, anchor);
      append_hydration(p0, t0);
      append_hydration(p0, b0);
      append_hydration(b0, t1);
      insert_hydration(target, t2, anchor);
      insert_hydration(target, p1, anchor);
      append_hydration(p1, t3);
      append_hydration(p1, b1);
      append_hydration(b1, t4);
      append_hydration(b1, t5);
      append_hydration(b1, t6);
      insert_hydration(target, t7, anchor);
      insert_hydration(target, p2, anchor);
      append_hydration(p2, t8);
      append_hydration(p2, b2);
      append_hydration(b2, t9);
      insert_hydration(target, t10, anchor);
      if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*localKeyLoading*/
      8 && t1_value !== (t1_value = /*session*/
      ctx2[20].userName + ""))
        set_data(t1, t1_value);
      if (dirty & /*localKeyLoading*/
      8 && t4_value !== (t4_value = /*session*/
      ctx2[20].type + ""))
        set_data(t4, t4_value);
      if (dirty & /*localKeyLoading*/
      8 && t6_value !== (t6_value = /*session*/
      ctx2[20].clientName + ""))
        set_data(t6, t6_value);
      if (dirty & /*localKeyLoading*/
      8 && t9_value !== (t9_value = /*session*/
      ctx2[20].scopes + ""))
        set_data(t9, t9_value);
      if (current_block_type === (current_block_type = select_block_type_2(ctx2, dirty)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      }
    },
    d(detaching) {
      if (detaching) {
        detach(p0);
        detach(t2);
        detach(p1);
        detach(t7);
        detach(p2);
        detach(t10);
        detach(if_block_anchor);
      }
      if_block.d(detaching);
    }
  };
}
function create_else_block_1(ctx) {
  let p;
  let textContent = `<span style="color: orange;">Warning:</span> Missing scopes to resolve installed
                                                apps. If the Dashboard app is not installed, all dashboards will be loaded and stored
                                                locally in your browser.`;
  return {
    c() {
      p = element("p");
      p.innerHTML = textContent;
    },
    l(nodes) {
      p = claim_element(nodes, "P", { ["data-svelte-h"]: true });
      if (get_svelte_dataset(p) !== "svelte-10ybqsj")
        p.innerHTML = textContent;
    },
    m(target, anchor) {
      insert_hydration(target, p, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(p);
      }
    }
  };
}
function create_if_block_3(ctx) {
  let await_block_anchor;
  let promise;
  let info = {
    ctx,
    current: null,
    token: null,
    hasCatch: true,
    pending: create_pending_block_2,
    then: create_then_block_2,
    catch: create_catch_block,
    value: 21
  };
  handle_promise(promise = /*instance*/
  ctx[19].apps.getApp({ id: "skogsaas.dashboards" }), info);
  return {
    c() {
      await_block_anchor = empty();
      info.block.c();
    },
    l(nodes) {
      await_block_anchor = empty();
      info.block.l(nodes);
    },
    m(target, anchor) {
      insert_hydration(target, await_block_anchor, anchor);
      info.block.m(target, info.anchor = anchor);
      info.mount = () => await_block_anchor.parentNode;
      info.anchor = await_block_anchor;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      info.ctx = ctx;
      dirty & /*localKeyLoading*/
      8 && promise !== (promise = /*instance*/
      ctx[19].apps.getApp({ id: "skogsaas.dashboards" })) && handle_promise(promise, info);
    },
    d(detaching) {
      if (detaching) {
        detach(await_block_anchor);
      }
      info.block.d(detaching);
      info.token = null;
      info = null;
    }
  };
}
function create_catch_block(ctx) {
  let p;
  let textContent = `<span style="color: red;">Error:</span> The dashboard app is not installed. 
                                                    Without this app, dashboards will be loaded and stored locally in your browser.`;
  return {
    c() {
      p = element("p");
      p.innerHTML = textContent;
    },
    l(nodes) {
      p = claim_element(nodes, "P", { ["data-svelte-h"]: true });
      if (get_svelte_dataset(p) !== "svelte-4agx1n")
        p.innerHTML = textContent;
    },
    m(target, anchor) {
      insert_hydration(target, p, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(p);
      }
    }
  };
}
function create_then_block_2(ctx) {
  let t;
  return {
    c() {
      t = text("... the Dashboard app is installed");
    },
    l(nodes) {
      t = claim_text(nodes, "... the Dashboard app is installed");
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
function create_pending_block_2(ctx) {
  let t;
  return {
    c() {
      t = text("... looking for the Dashboard app");
    },
    l(nodes) {
      t = claim_text(nodes, "... looking for the Dashboard app");
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
function create_pending_block_1(ctx) {
  return {
    c: noop,
    l: noop,
    m: noop,
    p: noop,
    d: noop
  };
}
function create_pending_block(ctx) {
  let span;
  return {
    c() {
      span = element("span");
      this.h();
    },
    l(nodes) {
      span = claim_element(nodes, "SPAN", { class: true });
      children(span).forEach(detach);
      this.h();
    },
    h() {
      attr(span, "class", "loading loading-infinity loading-lg");
    },
    m(target, anchor) {
      insert_hydration(target, span, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}
function create_default_slot(ctx) {
  let span0;
  let textContent = "Dashboards";
  let t1;
  let p;
  let textContent_1 = `A dashboard store can be created by using the native Homey App. This is required in order to have a place to store your dashboards.<br/> <span class="text-warning">NOTE:</span> This requires you to install the Dashboards companion app.`;
  return {
    c() {
      span0 = element("span");
      span0.textContent = textContent;
      t1 = space();
      p = element("p");
      p.innerHTML = textContent_1;
      this.h();
    },
    l(nodes) {
      span0 = claim_element(nodes, "SPAN", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(span0) !== "svelte-pvyl4w")
        span0.textContent = textContent;
      t1 = claim_space(nodes);
      p = claim_element(nodes, "P", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(p) !== "svelte-10x1ht0")
        p.innerHTML = textContent_1;
      this.h();
    },
    h() {
      attr(span0, "class", "text-5xl font-bold");
      attr(p, "class", "py-6");
    },
    m(target, anchor) {
      insert_hydration(target, span0, anchor);
      insert_hydration(target, t1, anchor);
      insert_hydration(target, p, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(span0);
        detach(t1);
        detach(p);
      }
    }
  };
}
function create_fragment(ctx) {
  let html_tag;
  let html_anchor;
  let t;
  let div;
  let current_block_type_index;
  let if_block;
  let current;
  const if_block_creators = [create_if_block, create_else_block];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*$homey*/
      ctx2[6] !== void 0
    )
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      html_tag = new HtmlTagHydration(false);
      html_anchor = empty();
      t = space();
      div = element("div");
      if_block.c();
      this.h();
    },
    l(nodes) {
      const head_nodes = head_selector("svelte-cukvek", document.head);
      html_tag = claim_html_tag(head_nodes, false);
      html_anchor = empty();
      head_nodes.forEach(detach);
      t = claim_space(nodes);
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      if_block.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      document.title = "Home";
      html_tag.a = html_anchor;
      attr(div, "class", "flex flex-col justify-center mx-auto w-full");
    },
    m(target, anchor) {
      html_tag.m(
        /*webManifestLink*/
        ctx[5],
        document.head
      );
      append_hydration(document.head, html_anchor);
      insert_hydration(target, t, anchor);
      insert_hydration(target, div, anchor);
      if_blocks[current_block_type_index].m(div, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (!current || dirty & /*webManifestLink*/
      32)
        html_tag.p(
          /*webManifestLink*/
          ctx2[5]
        );
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
        html_tag.d();
        detach(t);
        detach(div);
      }
      detach(html_anchor);
      if_blocks[current_block_type_index].d();
    }
  };
}
function instance_1($$self, $$props, $$invalidate) {
  let webManifestLink;
  let $baseUrl;
  let $page;
  let $homey;
  component_subscribe($$self, baseUrl, ($$value) => $$invalidate(16, $baseUrl = $$value));
  component_subscribe($$self, page, ($$value) => $$invalidate(17, $page = $$value));
  component_subscribe($$self, homey, ($$value) => $$invalidate(6, $homey = $$value));
  let active = "";
  let localKey = "";
  let localKeyError;
  let localKeyLoading;
  let localHosting = false;
  let localHomeyId = "";
  onMount(async () => {
    if (pwaInfo) {
      const { registerSW } = await __vitePreload(() => import("../chunks/virtual_pwa-register.7728e411.js"), true ? ["..\\chunks\\virtual_pwa-register.7728e411.js","..\\chunks\\preload-helper.60b963d6.js"] : void 0, import.meta.url);
      registerSW({
        immediate: true,
        onRegistered(r) {
          r && setInterval(
            () => {
              console.log("Checking for sw update");
              r.update();
            },
            60 * 6e4
          );
          console.log(`SW Registered: ${r}`);
        },
        onRegisterError(error) {
          console.log("SW registration error", error);
        }
      });
    }
    const apiKey2 = $page.url.searchParams.get("api-key");
    if ($page.url.origin.includes(".homey.homeylocal.com") || $page.url.origin.includes(".connect.athom.com") || $page.url.hostname.includes(".local") || {}.VITE_HOMEY_URL) {
      localHosting = true;
    }
    if (apiKey2) {
      $$invalidate(1, localKey = apiKey2);
      $$invalidate(0, active = "#direct");
    }
  });
  function verifyApiKey() {
    $$invalidate(3, localKeyLoading = connectApiKey());
  }
  async function connectApiKey() {
    $$invalidate(2, localKeyError = void 0);
    try {
      const url = localHosting ? $baseUrl : "https://" + localHomeyId + ".connect.athom.com";
      const props = {
        token: localKey,
        debug: function debug() {
        },
        baseUrl: url,
        strategy: []
      };
      const instance = new HomeyAPIV3Local(props);
      return instance;
    } catch (e) {
      $$invalidate(2, localKeyError = "" + e);
    }
  }
  async function setHomey(instance) {
    apiKey.set(localKey);
    homeyId.set(localHomeyId);
    homey.set(instance);
    await goto(base + "/");
  }
  async function oauthLogin() {
    const cloudApi = new AthomCloudAPI({
      clientId,
      clientSecret,
      redirectUrl: "https://homeyboard.github.io/oauth2/callback"
    });
    const loggedIn = await cloudApi.isLoggedIn();
    if (!loggedIn) {
      if (cloudApi.hasAuthorizationCode()) {
        await cloudApi.authenticateWithAuthorizationCode();
      } else {
        window.location = cloudApi.getLoginUrl();
        return;
      }
    }
    const user = await cloudApi.getAuthenticatedUser();
    const firstHomey = await user.getFirstHomey();
    const homeyApi = await firstHomey.authenticate();
    homey.set(homeyApi);
    await goto(base + "/");
  }
  const click_handler = () => $$invalidate(0, active = "#online");
  function input_input_handler() {
    localHomeyId = this.value;
    $$invalidate(4, localHomeyId);
  }
  function input_input_handler_1() {
    localKey = this.value;
    $$invalidate(1, localKey);
  }
  const click_handler_1 = (instance) => setHomey(instance);
  const click_handler_2 = () => $$invalidate(0, active = "#direct");
  $$invalidate(5, webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : "");
  return [
    active,
    localKey,
    localKeyError,
    localKeyLoading,
    localHomeyId,
    webManifestLink,
    $homey,
    verifyApiKey,
    setHomey,
    oauthLogin,
    click_handler,
    input_input_handler,
    input_input_handler_1,
    click_handler_1,
    click_handler_2
  ];
}
class Page extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance_1, create_fragment, safe_not_equal, {});
  }
}
export {
  Page as component
};
