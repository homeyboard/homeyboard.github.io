import { s as safe_not_equal, f as element, g as claim_element, h as children, d as detach, j as attr, i as insert_hydration, x as component_subscribe, o as onMount, a as space, u as get_svelte_dataset, c as claim_space, e as empty, l as text, m as claim_text, D as append_hydration, C as noop, p as binding_callbacks, v as add_flush_callback, E as destroy_each, k as set_style, n as set_data } from "../chunks/scheduler.c054974b.js";
import { C as Card, T as Tabs, h as handle_promise, u as update_await_block_branch } from "../chunks/index.01ab2a8b.js";
import { g as mdiEmoticonSadOutline, L as List, e as ensure_array_like } from "../chunks/index.ac923ad4.js";
import { S as SvelteComponent, i as init, t as transition_out, c as check_outros, a as transition_in, g as group_outros, b as create_component, d as claim_component, m as mount_component, e as destroy_component, f as bind } from "../chunks/index.036fb736.js";
import { d as baseUrl, e as dashboards$1, b as homey, c as clientId, a as clientSecret } from "../chunks/homey.43c20b8f.js";
import { d as dashboards, a as Icon, B as Button, I as Input, P as Progress } from "../chunks/Progress.ba128a1b.js";
import { H as HomeyAPI, a as apiKey } from "../chunks/HomeyAPI.f9cc9e91.js";
import { g as goto, A as AthomCloudAPI } from "../chunks/AthomCloudAPI.cf1d55ed.js";
import { e as base } from "../chunks/singletons.345c2e8a.js";
import { p as page } from "../chunks/stores.de833e0c.js";
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[22] = list[i];
  return child_ctx;
}
function create_else_block_1(ctx) {
  let h1;
  let textContent = "Login";
  let t1;
  let card;
  let current;
  card = new Card({
    props: {
      $$slots: { default: [create_default_slot_4] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      h1 = element("h1");
      h1.textContent = textContent;
      t1 = space();
      create_component(card.$$.fragment);
      this.h();
    },
    l(nodes) {
      h1 = claim_element(nodes, "H1", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(h1) !== "svelte-bavm3o")
        h1.textContent = textContent;
      t1 = claim_space(nodes);
      claim_component(card.$$.fragment, nodes);
      this.h();
    },
    h() {
      attr(h1, "class", "inline text-center pt-8 pb-8");
    },
    m(target, anchor) {
      insert_hydration(target, h1, anchor);
      insert_hydration(target, t1, anchor);
      mount_component(card, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const card_changes = {};
      if (dirty & /*$$scope, localKeyLoading, localKey, localHosting, localHomeyId, localKeyError, active*/
      1073741887) {
        card_changes.$$scope = { dirty, ctx: ctx2 };
      }
      card.$set(card_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(card.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(card.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(h1);
        detach(t1);
      }
      destroy_component(card, detaching);
    }
  };
}
function create_if_block(ctx) {
  let h1;
  let textContent = "Welcome!";
  let t1;
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block_1, create_else_block];
  const if_blocks = [];
  function select_block_type_1(ctx2, dirty) {
    if (
      /*dashboards*/
      ctx2[6] !== void 0 && /*dashboards*/
      ctx2[6].length > 0
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
      if (get_svelte_dataset(h1) !== "svelte-1dmbei2")
        h1.textContent = textContent;
      t1 = claim_space(nodes);
      if_block.l(nodes);
      if_block_anchor = empty();
      this.h();
    },
    h() {
      attr(h1, "class", "inline text-center pt-8 pb-8");
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
function create_default_slot_13(ctx) {
  let t;
  return {
    c() {
      t = text("Local");
    },
    l(nodes) {
      t = claim_text(nodes, "Local");
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
function create_default_slot_12(ctx) {
  let t;
  return {
    c() {
      t = text("Online");
    },
    l(nodes) {
      t = claim_text(nodes, "Online");
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
function create_default_slot_11(ctx) {
  let tabs_tab0;
  let t;
  let tabs_tab1;
  let current;
  tabs_tab0 = new Tabs.Tab({
    props: {
      key: "#local",
      href: "#local",
      $$slots: { default: [create_default_slot_13] },
      $$scope: { ctx }
    }
  });
  tabs_tab0.$on(
    "click",
    /*click_handler_1*/
    ctx[14]
  );
  tabs_tab1 = new Tabs.Tab({
    props: {
      key: "#online",
      href: "#online",
      $$slots: { default: [create_default_slot_12] },
      $$scope: { ctx }
    }
  });
  tabs_tab1.$on(
    "click",
    /*click_handler_2*/
    ctx[15]
  );
  return {
    c() {
      create_component(tabs_tab0.$$.fragment);
      t = space();
      create_component(tabs_tab1.$$.fragment);
    },
    l(nodes) {
      claim_component(tabs_tab0.$$.fragment, nodes);
      t = claim_space(nodes);
      claim_component(tabs_tab1.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(tabs_tab0, target, anchor);
      insert_hydration(target, t, anchor);
      mount_component(tabs_tab1, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const tabs_tab0_changes = {};
      if (dirty & /*$$scope*/
      1073741824) {
        tabs_tab0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      tabs_tab0.$set(tabs_tab0_changes);
      const tabs_tab1_changes = {};
      if (dirty & /*$$scope*/
      1073741824) {
        tabs_tab1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      tabs_tab1.$set(tabs_tab1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(tabs_tab0.$$.fragment, local);
      transition_in(tabs_tab1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(tabs_tab0.$$.fragment, local);
      transition_out(tabs_tab1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
      destroy_component(tabs_tab0, detaching);
      destroy_component(tabs_tab1, detaching);
    }
  };
}
function create_if_block_6(ctx) {
  let p0;
  let textContent = "Online authentication can be used with both the newer Homey Pro 2023 and older models.";
  let t1;
  let p1;
  let textContent_1 = "With online authentication, scopes cannot be selected individually. If you want to limit access, \r\n                            use local login with API-key, only available for Homey Pro 2023.";
  let t3;
  let button;
  let current;
  button = new Button({
    props: {
      type: "primary",
      $$slots: { default: [create_default_slot_10] },
      $$scope: { ctx }
    }
  });
  button.$on(
    "click",
    /*oauthLogin*/
    ctx[10]
  );
  return {
    c() {
      p0 = element("p");
      p0.textContent = textContent;
      t1 = space();
      p1 = element("p");
      p1.textContent = textContent_1;
      t3 = space();
      create_component(button.$$.fragment);
    },
    l(nodes) {
      p0 = claim_element(nodes, "P", { ["data-svelte-h"]: true });
      if (get_svelte_dataset(p0) !== "svelte-nqdrsn")
        p0.textContent = textContent;
      t1 = claim_space(nodes);
      p1 = claim_element(nodes, "P", { ["data-svelte-h"]: true });
      if (get_svelte_dataset(p1) !== "svelte-1b8adqu")
        p1.textContent = textContent_1;
      t3 = claim_space(nodes);
      claim_component(button.$$.fragment, nodes);
    },
    m(target, anchor) {
      insert_hydration(target, p0, anchor);
      insert_hydration(target, t1, anchor);
      insert_hydration(target, p1, anchor);
      insert_hydration(target, t3, anchor);
      mount_component(button, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const button_changes = {};
      if (dirty & /*$$scope*/
      1073741824) {
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
      if (detaching) {
        detach(p0);
        detach(t1);
        detach(p1);
        detach(t3);
      }
      destroy_component(button, detaching);
    }
  };
}
function create_if_block_2(ctx) {
  let p0;
  let textContent = "Local authentication can only be used on the Homey Pro 2023 model. Older models do not have the API-Key feature.";
  let t1;
  let t2;
  let p1;
  let textContent_1 = `Obtain an API-Key by navigating to <b>Homey -&gt; Settings -&gt; API Keys</b>.`;
  let t6;
  let input;
  let updating_value;
  let t7;
  let button;
  let t8;
  let await_block_anchor;
  let promise;
  let current;
  let if_block = !/*localHosting*/
  ctx[4] && create_if_block_5(ctx);
  function input_value_binding_1(value) {
    ctx[17](value);
  }
  let input_props = {
    name: "local-key",
    error: (
      /*localKeyError*/
      ctx[2]
    ),
    label: "Homey API-Key",
    $$slots: { label: [create_label_slot] },
    $$scope: { ctx }
  };
  if (
    /*localKey*/
    ctx[1] !== void 0
  ) {
    input_props.value = /*localKey*/
    ctx[1];
  }
  input = new Input({ props: input_props });
  binding_callbacks.push(() => bind(input, "value", input_value_binding_1));
  button = new Button({
    props: {
      type: "primary",
      disabled: (
        /*localKey*/
        ctx[1] === "" || !/*localHosting*/
        ctx[4] && /*localHomeyId*/
        ctx[5].length != 24
      ),
      $$slots: { default: [create_default_slot_7] },
      $$scope: { ctx }
    }
  });
  button.$on(
    "click",
    /*verifyApiKey*/
    ctx[8]
  );
  let info = {
    ctx,
    current: null,
    token: null,
    hasCatch: true,
    pending: create_pending_block,
    then: create_then_block,
    catch: create_catch_block_3,
    value: 25,
    error: 29,
    blocks: [, , ,]
  };
  handle_promise(promise = /*localKeyLoading*/
  ctx[3], info);
  return {
    c() {
      p0 = element("p");
      p0.textContent = textContent;
      t1 = space();
      if (if_block)
        if_block.c();
      t2 = space();
      p1 = element("p");
      p1.innerHTML = textContent_1;
      t6 = space();
      create_component(input.$$.fragment);
      t7 = space();
      create_component(button.$$.fragment);
      t8 = space();
      await_block_anchor = empty();
      info.block.c();
      this.h();
    },
    l(nodes) {
      p0 = claim_element(nodes, "P", { ["data-svelte-h"]: true });
      if (get_svelte_dataset(p0) !== "svelte-po2h7t")
        p0.textContent = textContent;
      t1 = claim_space(nodes);
      if (if_block)
        if_block.l(nodes);
      t2 = claim_space(nodes);
      p1 = claim_element(nodes, "P", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(p1) !== "svelte-n0p1a")
        p1.innerHTML = textContent_1;
      t6 = claim_space(nodes);
      claim_component(input.$$.fragment, nodes);
      t7 = claim_space(nodes);
      claim_component(button.$$.fragment, nodes);
      t8 = claim_space(nodes);
      await_block_anchor = empty();
      info.block.l(nodes);
      this.h();
    },
    h() {
      attr(p1, "class", "pt-8");
    },
    m(target, anchor) {
      insert_hydration(target, p0, anchor);
      insert_hydration(target, t1, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, t2, anchor);
      insert_hydration(target, p1, anchor);
      insert_hydration(target, t6, anchor);
      mount_component(input, target, anchor);
      insert_hydration(target, t7, anchor);
      mount_component(button, target, anchor);
      insert_hydration(target, t8, anchor);
      insert_hydration(target, await_block_anchor, anchor);
      info.block.m(target, info.anchor = anchor);
      info.mount = () => await_block_anchor.parentNode;
      info.anchor = await_block_anchor;
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (!/*localHosting*/
      ctx[4]) {
        if (if_block) {
          if_block.p(ctx, dirty);
          if (dirty & /*localHosting*/
          16) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_5(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(t2.parentNode, t2);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      const input_changes = {};
      if (dirty & /*localKeyError*/
      4)
        input_changes.error = /*localKeyError*/
        ctx[2];
      if (dirty & /*$$scope*/
      1073741824) {
        input_changes.$$scope = { dirty, ctx };
      }
      if (!updating_value && dirty & /*localKey*/
      2) {
        updating_value = true;
        input_changes.value = /*localKey*/
        ctx[1];
        add_flush_callback(() => updating_value = false);
      }
      input.$set(input_changes);
      const button_changes = {};
      if (dirty & /*localKey, localHosting, localHomeyId*/
      50)
        button_changes.disabled = /*localKey*/
        ctx[1] === "" || !/*localHosting*/
        ctx[4] && /*localHomeyId*/
        ctx[5].length != 24;
      if (dirty & /*$$scope*/
      1073741824) {
        button_changes.$$scope = { dirty, ctx };
      }
      button.$set(button_changes);
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
      transition_in(if_block);
      transition_in(input.$$.fragment, local);
      transition_in(button.$$.fragment, local);
      transition_in(info.block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      transition_out(input.$$.fragment, local);
      transition_out(button.$$.fragment, local);
      for (let i = 0; i < 3; i += 1) {
        const block = info.blocks[i];
        transition_out(block);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(p0);
        detach(t1);
        detach(t2);
        detach(p1);
        detach(t6);
        detach(t7);
        detach(t8);
        detach(await_block_anchor);
      }
      if (if_block)
        if_block.d(detaching);
      destroy_component(input, detaching);
      destroy_component(button, detaching);
      info.block.d(detaching);
      info.token = null;
      info = null;
    }
  };
}
function create_default_slot_10(ctx) {
  let t;
  return {
    c() {
      t = text("Sign in");
    },
    l(nodes) {
      t = claim_text(nodes, "Sign in");
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
function create_if_block_5(ctx) {
  let p;
  let textContent = `Obtain the Homey-ID by navigating to <b>Homey -&gt; Settings -&gt; General</b> and scroll down to the Cloud section.`;
  let t3;
  let input;
  let updating_value;
  let current;
  function input_value_binding(value) {
    ctx[16](value);
  }
  let input_props = {
    name: "local-homey-id",
    error: (
      /*localHomeyId*/
      ctx[5].length > 0 && /*localHomeyId*/
      ctx[5].length !== 24 ? "Must be 24 characters" : ""
    ),
    label: "Homey ID",
    $$slots: { label: [create_label_slot_1] },
    $$scope: { ctx }
  };
  if (
    /*localHomeyId*/
    ctx[5] !== void 0
  ) {
    input_props.value = /*localHomeyId*/
    ctx[5];
  }
  input = new Input({ props: input_props });
  binding_callbacks.push(() => bind(input, "value", input_value_binding));
  return {
    c() {
      p = element("p");
      p.innerHTML = textContent;
      t3 = space();
      create_component(input.$$.fragment);
      this.h();
    },
    l(nodes) {
      p = claim_element(nodes, "P", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(p) !== "svelte-f2y3p2")
        p.innerHTML = textContent;
      t3 = claim_space(nodes);
      claim_component(input.$$.fragment, nodes);
      this.h();
    },
    h() {
      attr(p, "class", "pt-8");
    },
    m(target, anchor) {
      insert_hydration(target, p, anchor);
      insert_hydration(target, t3, anchor);
      mount_component(input, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const input_changes = {};
      if (dirty & /*localHomeyId*/
      32)
        input_changes.error = /*localHomeyId*/
        ctx2[5].length > 0 && /*localHomeyId*/
        ctx2[5].length !== 24 ? "Must be 24 characters" : "";
      if (dirty & /*$$scope*/
      1073741824) {
        input_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_value && dirty & /*localHomeyId*/
      32) {
        updating_value = true;
        input_changes.value = /*localHomeyId*/
        ctx2[5];
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
        detach(p);
        detach(t3);
      }
      destroy_component(input, detaching);
    }
  };
}
function create_default_slot_9(ctx) {
  let t;
  return {
    c() {
      t = text("Homey ID");
    },
    l(nodes) {
      t = claim_text(nodes, "Homey ID");
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
function create_label_slot_1(ctx) {
  let input_label;
  let current;
  input_label = new Input.Label({
    props: {
      slot: "label",
      $$slots: { default: [create_default_slot_9] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(input_label.$$.fragment);
    },
    l(nodes) {
      claim_component(input_label.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(input_label, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const input_label_changes = {};
      if (dirty & /*$$scope*/
      1073741824) {
        input_label_changes.$$scope = { dirty, ctx: ctx2 };
      }
      input_label.$set(input_label_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(input_label.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(input_label.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(input_label, detaching);
    }
  };
}
function create_default_slot_8(ctx) {
  let t;
  return {
    c() {
      t = text("Homey API-key");
    },
    l(nodes) {
      t = claim_text(nodes, "Homey API-key");
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
  let input_label;
  let current;
  input_label = new Input.Label({
    props: {
      slot: "label",
      $$slots: { default: [create_default_slot_8] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(input_label.$$.fragment);
    },
    l(nodes) {
      claim_component(input_label.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(input_label, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const input_label_changes = {};
      if (dirty & /*$$scope*/
      1073741824) {
        input_label_changes.$$scope = { dirty, ctx: ctx2 };
      }
      input_label.$set(input_label_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(input_label.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(input_label.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(input_label, detaching);
    }
  };
}
function create_default_slot_7(ctx) {
  let t;
  return {
    c() {
      t = text("Verify");
    },
    l(nodes) {
      t = claim_text(nodes, "Verify");
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
function create_catch_block_3(ctx) {
  let p;
  let t_value = (
    /*error*/
    ctx[29] + ""
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
      ctx2[29] + ""))
        set_data(t, t_value);
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(p);
      }
    }
  };
}
function create_then_block(ctx) {
  let if_block_anchor;
  let current;
  let if_block = (
    /*instance*/
    ctx[25] !== void 0 && create_if_block_3(ctx)
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
        /*instance*/
        ctx2[25] !== void 0
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*localKeyLoading*/
          8) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_3(ctx2);
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
function create_if_block_3(ctx) {
  let promise;
  let t0;
  let promise_1;
  let t1;
  let p;
  let button;
  let current;
  let info = {
    ctx,
    current: null,
    token: null,
    hasCatch: false,
    pending: create_pending_block_3,
    then: create_then_block_3,
    catch: create_catch_block_2,
    value: 28
  };
  handle_promise(promise = /*instance*/
  ctx[25].system.getSystemName(), info);
  let info_1 = {
    ctx,
    current: null,
    token: null,
    hasCatch: false,
    pending: create_pending_block_1,
    then: create_then_block_1,
    catch: create_catch_block_1,
    value: 26
  };
  handle_promise(promise_1 = /*instance*/
  ctx[25].sessions.getSessionMe(), info_1);
  function click_handler_3() {
    return (
      /*click_handler_3*/
      ctx[18](
        /*instance*/
        ctx[25]
      )
    );
  }
  button = new Button({
    props: {
      type: "primary",
      $$slots: { default: [create_default_slot_6] },
      $$scope: { ctx }
    }
  });
  button.$on("click", click_handler_3);
  return {
    c() {
      info.block.c();
      t0 = space();
      info_1.block.c();
      t1 = space();
      p = element("p");
      create_component(button.$$.fragment);
    },
    l(nodes) {
      info.block.l(nodes);
      t0 = claim_space(nodes);
      info_1.block.l(nodes);
      t1 = claim_space(nodes);
      p = claim_element(nodes, "P", {});
      var p_nodes = children(p);
      claim_component(button.$$.fragment, p_nodes);
      p_nodes.forEach(detach);
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
      mount_component(button, p, null);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      info.ctx = ctx;
      if (dirty & /*localKeyLoading*/
      8 && promise !== (promise = /*instance*/
      ctx[25].system.getSystemName()) && handle_promise(promise, info))
        ;
      else {
        update_await_block_branch(info, ctx, dirty);
      }
      info_1.ctx = ctx;
      if (dirty & /*localKeyLoading*/
      8 && promise_1 !== (promise_1 = /*instance*/
      ctx[25].sessions.getSessionMe()) && handle_promise(promise_1, info_1))
        ;
      else {
        update_await_block_branch(info_1, ctx, dirty);
      }
      const button_changes = {};
      if (dirty & /*$$scope*/
      1073741824) {
        button_changes.$$scope = { dirty, ctx };
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
      destroy_component(button);
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
    ctx[28] + ""
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
      ctx2[28] + ""))
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
    ctx[26].userName + ""
  );
  let t1;
  let t2;
  let p1;
  let t3;
  let b1;
  let t4_value = (
    /*session*/
    ctx[26].type + ""
  );
  let t4;
  let t5;
  let t6_value = (
    /*session*/
    ctx[26].clientName + ""
  );
  let t6;
  let t7;
  let p2;
  let t8;
  let b2;
  let t9_value = (
    /*session*/
    ctx[26].scopes + ""
  );
  let t9;
  let t10;
  let show_if;
  let if_block_anchor;
  function select_block_type_3(ctx2, dirty) {
    if (dirty & /*localKeyLoading*/
    8)
      show_if = null;
    if (show_if == null)
      show_if = !!/*session*/
      (ctx2[26].scopes.includes("homey.app") || /*session*/
      ctx2[26].scopes.includes("homey"));
    if (show_if)
      return create_if_block_4;
    return create_else_block_2;
  }
  let current_block_type = select_block_type_3(ctx, -1);
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
      ctx2[26].userName + ""))
        set_data(t1, t1_value);
      if (dirty & /*localKeyLoading*/
      8 && t4_value !== (t4_value = /*session*/
      ctx2[26].type + ""))
        set_data(t4, t4_value);
      if (dirty & /*localKeyLoading*/
      8 && t6_value !== (t6_value = /*session*/
      ctx2[26].clientName + ""))
        set_data(t6, t6_value);
      if (dirty & /*localKeyLoading*/
      8 && t9_value !== (t9_value = /*session*/
      ctx2[26].scopes + ""))
        set_data(t9, t9_value);
      if (current_block_type === (current_block_type = select_block_type_3(ctx2, dirty)) && if_block) {
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
function create_else_block_2(ctx) {
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
      if (get_svelte_dataset(p) !== "svelte-j7uter")
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
function create_if_block_4(ctx) {
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
    value: 27
  };
  handle_promise(promise = /*instance*/
  ctx[25].apps.getApp({ id: "skogsaas.dashboards" }), info);
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
      ctx[25].apps.getApp({ id: "skogsaas.dashboards" })) && handle_promise(promise, info);
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
      if (get_svelte_dataset(p) !== "svelte-tpbsqz")
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
function create_default_slot_6(ctx) {
  let t;
  return {
    c() {
      t = text("Continue");
    },
    l(nodes) {
      t = claim_text(nodes, "Continue");
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
function create_pending_block(ctx) {
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
      destroy_component(progress, detaching);
    }
  };
}
function create_default_slot_5(ctx) {
  let tabs;
  let t;
  let div;
  let current_block_type_index;
  let if_block;
  let current;
  tabs = new Tabs({
    props: {
      currentTab: (
        /*active*/
        ctx[0]
      ),
      variant: "full-width",
      $$slots: { default: [create_default_slot_11] },
      $$scope: { ctx }
    }
  });
  const if_block_creators = [create_if_block_2, create_if_block_6];
  const if_blocks = [];
  function select_block_type_2(ctx2, dirty) {
    if (
      /*active*/
      ctx2[0] === "#local"
    )
      return 0;
    if (
      /*active*/
      ctx2[0] === "#online"
    )
      return 1;
    return -1;
  }
  if (~(current_block_type_index = select_block_type_2(ctx))) {
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  return {
    c() {
      create_component(tabs.$$.fragment);
      t = space();
      div = element("div");
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes) {
      claim_component(tabs.$$.fragment, nodes);
      t = claim_space(nodes);
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      if (if_block)
        if_block.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "pt-8");
    },
    m(target, anchor) {
      mount_component(tabs, target, anchor);
      insert_hydration(target, t, anchor);
      insert_hydration(target, div, anchor);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(div, null);
      }
      current = true;
    },
    p(ctx2, dirty) {
      const tabs_changes = {};
      if (dirty & /*active*/
      1)
        tabs_changes.currentTab = /*active*/
        ctx2[0];
      if (dirty & /*$$scope, active*/
      1073741825) {
        tabs_changes.$$scope = { dirty, ctx: ctx2 };
      }
      tabs.$set(tabs_changes);
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_2(ctx2);
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
    },
    i(local) {
      if (current)
        return;
      transition_in(tabs.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(tabs.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
        detach(div);
      }
      destroy_component(tabs, detaching);
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d();
      }
    }
  };
}
function create_default_slot_4(ctx) {
  let card_content;
  let current;
  card_content = new Card.Content({
    props: {
      $$slots: { default: [create_default_slot_5] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(card_content.$$.fragment);
    },
    l(nodes) {
      claim_component(card_content.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(card_content, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const card_content_changes = {};
      if (dirty & /*$$scope, localKeyLoading, localKey, localHosting, localHomeyId, localKeyError, active*/
      1073741887) {
        card_content_changes.$$scope = { dirty, ctx: ctx2 };
      }
      card_content.$set(card_content_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(card_content.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(card_content.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(card_content, detaching);
    }
  };
}
function create_else_block(ctx) {
  let h5;
  let t0;
  let icon;
  let t1;
  let p0;
  let textContent = "Add one by navigating Menu -> New";
  let t3;
  let p1;
  let textContent_1 = `Or by adding a dashboard device on your homey.<br/> <span style="color: orange;">NOTE:</span> Requires installed app.`;
  let current;
  icon = new Icon({ props: { data: mdiEmoticonSadOutline } });
  return {
    c() {
      h5 = element("h5");
      t0 = text("Oh no, you have no dashboards! ");
      create_component(icon.$$.fragment);
      t1 = space();
      p0 = element("p");
      p0.textContent = textContent;
      t3 = space();
      p1 = element("p");
      p1.innerHTML = textContent_1;
    },
    l(nodes) {
      h5 = claim_element(nodes, "H5", {});
      var h5_nodes = children(h5);
      t0 = claim_text(h5_nodes, "Oh no, you have no dashboards! ");
      claim_component(icon.$$.fragment, h5_nodes);
      h5_nodes.forEach(detach);
      t1 = claim_space(nodes);
      p0 = claim_element(nodes, "P", { ["data-svelte-h"]: true });
      if (get_svelte_dataset(p0) !== "svelte-kwkpmk")
        p0.textContent = textContent;
      t3 = claim_space(nodes);
      p1 = claim_element(nodes, "P", { ["data-svelte-h"]: true });
      if (get_svelte_dataset(p1) !== "svelte-on4lef")
        p1.innerHTML = textContent_1;
    },
    m(target, anchor) {
      insert_hydration(target, h5, anchor);
      append_hydration(h5, t0);
      mount_component(icon, h5, null);
      insert_hydration(target, t1, anchor);
      insert_hydration(target, p0, anchor);
      insert_hydration(target, t3, anchor);
      insert_hydration(target, p1, anchor);
      current = true;
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
        detach(h5);
        detach(t1);
        detach(p0);
        detach(t3);
        detach(p1);
      }
      destroy_component(icon);
    }
  };
}
function create_if_block_1(ctx) {
  let card;
  let current;
  card = new Card({
    props: {
      $$slots: { default: [create_default_slot] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(card.$$.fragment);
    },
    l(nodes) {
      claim_component(card.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(card, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const card_changes = {};
      if (dirty & /*$$scope, dashboards*/
      1073741888) {
        card_changes.$$scope = { dirty, ctx: ctx2 };
      }
      card.$set(card_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(card.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(card.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(card, detaching);
    }
  };
}
function create_default_slot_3(ctx) {
  let t0_value = (
    /*dashboard*/
    ctx[22].title + ""
  );
  let t0;
  let t1;
  return {
    c() {
      t0 = text(t0_value);
      t1 = space();
    },
    l(nodes) {
      t0 = claim_text(nodes, t0_value);
      t1 = claim_space(nodes);
    },
    m(target, anchor) {
      insert_hydration(target, t0, anchor);
      insert_hydration(target, t1, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*dashboards*/
      64 && t0_value !== (t0_value = /*dashboard*/
      ctx2[22].title + ""))
        set_data(t0, t0_value);
    },
    d(detaching) {
      if (detaching) {
        detach(t0);
        detach(t1);
      }
    }
  };
}
function create_each_block(ctx) {
  let list_item;
  let current;
  function click_handler() {
    return (
      /*click_handler*/
      ctx[13](
        /*dashboard*/
        ctx[22]
      )
    );
  }
  list_item = new List.Item({
    props: {
      class: "cursor-pointer",
      $$slots: { default: [create_default_slot_3] },
      $$scope: { ctx }
    }
  });
  list_item.$on("click", click_handler);
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
      if (dirty & /*$$scope, dashboards*/
      1073741888) {
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
function create_default_slot_2(ctx) {
  let each_1_anchor;
  let current;
  let each_value = ensure_array_like(
    /*dashboards*/
    ctx[6]
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
      if (dirty & /*dashboards*/
      64) {
        each_value = ensure_array_like(
          /*dashboards*/
          ctx2[6]
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
function create_default_slot_1(ctx) {
  let list;
  let current;
  list = new List({
    props: {
      $$slots: { default: [create_default_slot_2] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(list.$$.fragment);
    },
    l(nodes) {
      claim_component(list.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const list_changes = {};
      if (dirty & /*$$scope, dashboards*/
      1073741888) {
        list_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list.$set(list_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list, detaching);
    }
  };
}
function create_default_slot(ctx) {
  let card_content;
  let current;
  card_content = new Card.Content({
    props: {
      $$slots: { default: [create_default_slot_1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(card_content.$$.fragment);
    },
    l(nodes) {
      claim_component(card_content.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(card_content, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const card_content_changes = {};
      if (dirty & /*$$scope, dashboards*/
      1073741888) {
        card_content_changes.$$scope = { dirty, ctx: ctx2 };
      }
      card_content.$set(card_content_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(card_content.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(card_content.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(card_content, detaching);
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
      /*$homey*/
      ctx2[7] !== void 0
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
function instance_1($$self, $$props, $$invalidate) {
  let dashboards$2;
  let $baseUrl;
  let $page;
  let $localDashboards;
  let $homeyDashboards;
  let $homey;
  component_subscribe($$self, baseUrl, ($$value) => $$invalidate(19, $baseUrl = $$value));
  component_subscribe($$self, page, ($$value) => $$invalidate(20, $page = $$value));
  component_subscribe($$self, dashboards, ($$value) => $$invalidate(11, $localDashboards = $$value));
  component_subscribe($$self, dashboards$1, ($$value) => $$invalidate(12, $homeyDashboards = $$value));
  component_subscribe($$self, homey, ($$value) => $$invalidate(7, $homey = $$value));
  let active = "";
  let localKey = "";
  let localKeyError;
  let localKeyLoading;
  let localHosting = true;
  let localHomeyId = "";
  onMount(async () => {
    const apiKey2 = $page.url.searchParams.get("api-key");
    console.log($page.url.origin);
    if ($page.url.origin.includes(".homey.homeylocal.com") || $page.url.origin.includes(".connect.athom.com")) {
      $$invalidate(4, localHosting = true);
    }
    if (apiKey2) {
      $$invalidate(1, localKey = apiKey2);
      $$invalidate(0, active = "#local");
    }
  });
  function verifyApiKey() {
    $$invalidate(3, localKeyLoading = connectApiKey());
  }
  async function connectApiKey() {
    $$invalidate(2, localKeyError = void 0);
    try {
      const url = localHosting ? $baseUrl : "https://" + localHomeyId + ".connect.athom.com";
      const instance = await HomeyAPI.createLocalAPI({ address: url, token: localKey });
      return instance;
    } catch (e) {
      $$invalidate(2, localKeyError = "" + e);
    }
  }
  async function setHomey(instance) {
    if (!localHosting) {
      localStorage.homeyId = localHomeyId;
    }
    apiKey.set(localKey);
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
  const click_handler = (dashboard) => goto(base + "/board?id=" + dashboard.id);
  const click_handler_1 = () => $$invalidate(0, active = "#local");
  const click_handler_2 = () => $$invalidate(0, active = "#online");
  function input_value_binding(value) {
    localHomeyId = value;
    $$invalidate(5, localHomeyId);
  }
  function input_value_binding_1(value) {
    localKey = value;
    $$invalidate(1, localKey);
  }
  const click_handler_3 = (instance) => setHomey(instance);
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$homeyDashboards, $localDashboards*/
    6144) {
      $$invalidate(6, dashboards$2 = Object.values({ ...$homeyDashboards, ...$localDashboards }));
    }
  };
  return [
    active,
    localKey,
    localKeyError,
    localKeyLoading,
    localHosting,
    localHomeyId,
    dashboards$2,
    $homey,
    verifyApiKey,
    setHomey,
    oauthLogin,
    $localDashboards,
    $homeyDashboards,
    click_handler,
    click_handler_1,
    click_handler_2,
    input_value_binding,
    input_value_binding_1,
    click_handler_3
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
