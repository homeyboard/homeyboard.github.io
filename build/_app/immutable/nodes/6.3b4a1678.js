import { s as safe_not_equal, f as element, a as space, g as claim_element, h as children, c as claim_space, v as get_svelte_dataset, d as detach, j as attr, i as insert_hydration, w as append_hydration, r as listen, C as destroy_each, L as createEventDispatcher, M as init_binding_group, l as text, m as claim_text, J as set_input_value, N as select_option, n as set_data, D as run_all, x as noop, y as create_slot, z as update_slot_base, A as get_all_dirty_from_scope, B as get_slot_changes, u as component_subscribe, e as empty, G as head_selector, o as onMount, p as binding_callbacks, K as add_flush_callback } from "../chunks/scheduler.eb13839d.js";
import { S as SvelteComponent, i as init, b as create_component, d as claim_component, m as mount_component, a as transition_in, g as group_outros, c as check_outros, t as transition_out, e as destroy_component, f as bind } from "../chunks/index.b52a7f1f.js";
import { g as goto } from "../chunks/navigation.d8976ee0.js";
import { e as base } from "../chunks/singletons.7956b62b.js";
import { p as page } from "../chunks/stores.72899cda.js";
import { o as v4, t as templates, j as homey, p as stores, a as alerts } from "../chunks/alerting.1ec0368e.js";
import { t as templates$1, b as saveTemplate } from "../chunks/localstorage.5e5670ac.js";
import { e as editing } from "../chunks/editing.4e6f3a10.js";
import { e as ensure_array_like, I as Icon, p as mdiInformation, o as mdiTrashCan, a as mdiPostageStamp } from "../chunks/utils.01552eec.js";
import { T as TextPicker, b as WidgetEditor, S as StoreDialog } from "../chunks/StoreDialog.ed6ed57c.js";
function get_each_context$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[20] = list[i];
  child_ctx[22] = i;
  return child_ctx;
}
function create_if_block$2(ctx) {
  let option;
  return {
    c() {
      option = element("option");
      this.h();
    },
    l(nodes) {
      option = claim_element(nodes, "OPTION", {});
      children(option).forEach(detach);
      this.h();
    },
    h() {
      option.__value = void 0;
      set_input_value(option, option.__value);
    },
    m(target, anchor) {
      insert_hydration(target, option, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(option);
      }
    }
  };
}
function create_each_block$1(ctx) {
  let div4;
  let input;
  let input_value_value;
  let value_has_changed = false;
  let t0;
  let div0;
  let t1_value = (
    /*a*/
    ctx[20].id + ""
  );
  let t1;
  let t2;
  let div3;
  let textpicker0;
  let t3;
  let textpicker1;
  let t4;
  let label;
  let div1;
  let textContent = `<span class="label-text">Type</span>`;
  let t6;
  let select;
  let option0;
  let textContent_1 = "String";
  let option1;
  let textContent_2 = "Number";
  let option2;
  let textContent_3 = "Boolean";
  let option3;
  let textContent_4 = "Zone";
  let option4;
  let textContent_5 = "Device";
  let option5;
  let textContent_6 = "Capability";
  let option6;
  let textContent_7 = "Image";
  let option7;
  let textContent_8 = "Icon";
  let select_value_value;
  let t15;
  let div2;
  let icon0;
  let t16;
  let span1;
  let t17;
  let code;
  let t18;
  let t19_value = "{";
  let t19;
  let t20;
  let t21_value = (
    /*a*/
    ctx[20].id + ""
  );
  let t21;
  let t22_value = "}";
  let t22;
  let t23;
  let button;
  let icon1;
  let t24;
  let t25;
  let current;
  let binding_group;
  let mounted;
  let dispose;
  function value_handler_1(...args) {
    return (
      /*value_handler_1*/
      ctx[13](
        /*index*/
        ctx[22],
        ...args
      )
    );
  }
  textpicker0 = new TextPicker({
    props: {
      label: "ID",
      placeholder: "ID",
      value: (
        /*a*/
        ctx[20].id
      )
    }
  });
  textpicker0.$on("value", value_handler_1);
  function value_handler_2(...args) {
    return (
      /*value_handler_2*/
      ctx[14](
        /*index*/
        ctx[22],
        ...args
      )
    );
  }
  textpicker1 = new TextPicker({
    props: {
      label: "Label",
      placeholder: "",
      value: (
        /*a*/
        ctx[20].label
      )
    }
  });
  textpicker1.$on("value", value_handler_2);
  let if_block = (
    /*a*/
    ctx[20].type === void 0 && create_if_block$2()
  );
  function change_handler(...args) {
    return (
      /*change_handler*/
      ctx[15](
        /*index*/
        ctx[22],
        ...args
      )
    );
  }
  icon0 = new Icon({ props: { data: mdiInformation } });
  icon1 = new Icon({ props: { data: mdiTrashCan } });
  function click_handler_1() {
    return (
      /*click_handler_1*/
      ctx[16](
        /*index*/
        ctx[22]
      )
    );
  }
  binding_group = init_binding_group(
    /*$$binding_groups*/
    ctx[12][0]
  );
  return {
    c() {
      div4 = element("div");
      input = element("input");
      t0 = space();
      div0 = element("div");
      t1 = text(t1_value);
      t2 = space();
      div3 = element("div");
      create_component(textpicker0.$$.fragment);
      t3 = space();
      create_component(textpicker1.$$.fragment);
      t4 = space();
      label = element("label");
      div1 = element("div");
      div1.innerHTML = textContent;
      t6 = space();
      select = element("select");
      if (if_block)
        if_block.c();
      option0 = element("option");
      option0.textContent = textContent_1;
      option1 = element("option");
      option1.textContent = textContent_2;
      option2 = element("option");
      option2.textContent = textContent_3;
      option3 = element("option");
      option3.textContent = textContent_4;
      option4 = element("option");
      option4.textContent = textContent_5;
      option5 = element("option");
      option5.textContent = textContent_6;
      option6 = element("option");
      option6.textContent = textContent_7;
      option7 = element("option");
      option7.textContent = textContent_8;
      t15 = space();
      div2 = element("div");
      create_component(icon0.$$.fragment);
      t16 = space();
      span1 = element("span");
      t17 = text("This argument can be referenced in any child widget settings by writing: ");
      code = element("code");
      t18 = text("$");
      t19 = text(t19_value);
      t20 = text("template.");
      t21 = text(t21_value);
      t22 = text(t22_value);
      t23 = space();
      button = element("button");
      create_component(icon1.$$.fragment);
      t24 = text("Remove");
      t25 = space();
      this.h();
    },
    l(nodes) {
      div4 = claim_element(nodes, "DIV", { class: true });
      var div4_nodes = children(div4);
      input = claim_element(div4_nodes, "INPUT", { type: true, name: true });
      t0 = claim_space(div4_nodes);
      div0 = claim_element(div4_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      t1 = claim_text(div0_nodes, t1_value);
      div0_nodes.forEach(detach);
      t2 = claim_space(div4_nodes);
      div3 = claim_element(div4_nodes, "DIV", { class: true });
      var div3_nodes = children(div3);
      claim_component(textpicker0.$$.fragment, div3_nodes);
      t3 = claim_space(div3_nodes);
      claim_component(textpicker1.$$.fragment, div3_nodes);
      t4 = claim_space(div3_nodes);
      label = claim_element(div3_nodes, "LABEL", { class: true });
      var label_nodes = children(label);
      div1 = claim_element(label_nodes, "DIV", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(div1) !== "svelte-aoufrt")
        div1.innerHTML = textContent;
      t6 = claim_space(label_nodes);
      select = claim_element(label_nodes, "SELECT", { class: true, placeholder: true });
      var select_nodes = children(select);
      if (if_block)
        if_block.l(select_nodes);
      option0 = claim_element(select_nodes, "OPTION", { ["data-svelte-h"]: true });
      if (get_svelte_dataset(option0) !== "svelte-j7lsa6")
        option0.textContent = textContent_1;
      option1 = claim_element(select_nodes, "OPTION", { ["data-svelte-h"]: true });
      if (get_svelte_dataset(option1) !== "svelte-n80m5q")
        option1.textContent = textContent_2;
      option2 = claim_element(select_nodes, "OPTION", { ["data-svelte-h"]: true });
      if (get_svelte_dataset(option2) !== "svelte-ymhg32")
        option2.textContent = textContent_3;
      option3 = claim_element(select_nodes, "OPTION", { ["data-svelte-h"]: true });
      if (get_svelte_dataset(option3) !== "svelte-ljkayp")
        option3.textContent = textContent_4;
      option4 = claim_element(select_nodes, "OPTION", { ["data-svelte-h"]: true });
      if (get_svelte_dataset(option4) !== "svelte-16eot1")
        option4.textContent = textContent_5;
      option5 = claim_element(select_nodes, "OPTION", { ["data-svelte-h"]: true });
      if (get_svelte_dataset(option5) !== "svelte-1nq0dvi")
        option5.textContent = textContent_6;
      option6 = claim_element(select_nodes, "OPTION", { ["data-svelte-h"]: true });
      if (get_svelte_dataset(option6) !== "svelte-1iywg89")
        option6.textContent = textContent_7;
      option7 = claim_element(select_nodes, "OPTION", { ["data-svelte-h"]: true });
      if (get_svelte_dataset(option7) !== "svelte-120fhtt")
        option7.textContent = textContent_8;
      select_nodes.forEach(detach);
      label_nodes.forEach(detach);
      t15 = claim_space(div3_nodes);
      div2 = claim_element(div3_nodes, "DIV", { role: true, class: true });
      var div2_nodes = children(div2);
      claim_component(icon0.$$.fragment, div2_nodes);
      t16 = claim_space(div2_nodes);
      span1 = claim_element(div2_nodes, "SPAN", {});
      var span1_nodes = children(span1);
      t17 = claim_text(span1_nodes, "This argument can be referenced in any child widget settings by writing: ");
      code = claim_element(span1_nodes, "CODE", {});
      var code_nodes = children(code);
      t18 = claim_text(code_nodes, "$");
      t19 = claim_text(code_nodes, t19_value);
      t20 = claim_text(code_nodes, "template.");
      t21 = claim_text(code_nodes, t21_value);
      t22 = claim_text(code_nodes, t22_value);
      code_nodes.forEach(detach);
      span1_nodes.forEach(detach);
      div2_nodes.forEach(detach);
      t23 = claim_space(div3_nodes);
      button = claim_element(div3_nodes, "BUTTON", { class: true });
      var button_nodes = children(button);
      claim_component(icon1.$$.fragment, button_nodes);
      t24 = claim_text(button_nodes, "Remove");
      button_nodes.forEach(detach);
      div3_nodes.forEach(detach);
      t25 = claim_space(div4_nodes);
      div4_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(input, "type", "radio");
      attr(input, "name", "arguments");
      input.__value = input_value_value = /*a*/
      ctx[20];
      set_input_value(input, input.__value);
      attr(div0, "class", "collapse-title text-lg font-medium");
      attr(div1, "class", "label");
      option0.__value = "string";
      set_input_value(option0, option0.__value);
      option1.__value = "number";
      set_input_value(option1, option1.__value);
      option2.__value = "boolean";
      set_input_value(option2, option2.__value);
      option3.__value = "zoneId";
      set_input_value(option3, option3.__value);
      option4.__value = "deviceId";
      set_input_value(option4, option4.__value);
      option5.__value = "capabilityUri";
      set_input_value(option5, option5.__value);
      option6.__value = "imageId";
      set_input_value(option6, option6.__value);
      option7.__value = "iconId";
      set_input_value(option7, option7.__value);
      attr(select, "class", "select w-full");
      attr(select, "placeholder", "Type");
      attr(label, "class", "form-control w-full");
      attr(div2, "role", "alert");
      attr(div2, "class", "alert mt-2");
      attr(button, "class", "btn btn-warning btn-outline w-full mt-2");
      attr(div3, "class", "collapse-content");
      attr(div4, "class", "collapse collapse-arrow bg-base-300 mt-2");
      binding_group.p(input);
    },
    m(target, anchor) {
      insert_hydration(target, div4, anchor);
      append_hydration(div4, input);
      input.checked = input.__value === /*arg*/
      ctx[3];
      append_hydration(div4, t0);
      append_hydration(div4, div0);
      append_hydration(div0, t1);
      append_hydration(div4, t2);
      append_hydration(div4, div3);
      mount_component(textpicker0, div3, null);
      append_hydration(div3, t3);
      mount_component(textpicker1, div3, null);
      append_hydration(div3, t4);
      append_hydration(div3, label);
      append_hydration(label, div1);
      append_hydration(label, t6);
      append_hydration(label, select);
      if (if_block)
        if_block.m(select, null);
      append_hydration(select, option0);
      append_hydration(select, option1);
      append_hydration(select, option2);
      append_hydration(select, option3);
      append_hydration(select, option4);
      append_hydration(select, option5);
      append_hydration(select, option6);
      append_hydration(select, option7);
      select_option(
        select,
        /*a*/
        ctx[20].type
      );
      append_hydration(div3, t15);
      append_hydration(div3, div2);
      mount_component(icon0, div2, null);
      append_hydration(div2, t16);
      append_hydration(div2, span1);
      append_hydration(span1, t17);
      append_hydration(span1, code);
      append_hydration(code, t18);
      append_hydration(code, t19);
      append_hydration(code, t20);
      append_hydration(code, t21);
      append_hydration(code, t22);
      append_hydration(div3, t23);
      append_hydration(div3, button);
      mount_component(icon1, button, null);
      append_hydration(button, t24);
      append_hydration(div4, t25);
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            input,
            "change",
            /*input_change_handler*/
            ctx[11]
          ),
          listen(select, "change", change_handler),
          listen(button, "click", click_handler_1)
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (!current || dirty & /*args, undefined*/
      4 && input_value_value !== (input_value_value = /*a*/
      ctx[20])) {
        input.__value = input_value_value;
        set_input_value(input, input.__value);
        value_has_changed = true;
      }
      if (value_has_changed || dirty & /*arg, args*/
      12) {
        input.checked = input.__value === /*arg*/
        ctx[3];
      }
      if ((!current || dirty & /*args*/
      4) && t1_value !== (t1_value = /*a*/
      ctx[20].id + ""))
        set_data(t1, t1_value);
      const textpicker0_changes = {};
      if (dirty & /*args*/
      4)
        textpicker0_changes.value = /*a*/
        ctx[20].id;
      textpicker0.$set(textpicker0_changes);
      const textpicker1_changes = {};
      if (dirty & /*args*/
      4)
        textpicker1_changes.value = /*a*/
        ctx[20].label;
      textpicker1.$set(textpicker1_changes);
      if (
        /*a*/
        ctx[20].type === void 0
      ) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block$2();
          if_block.c();
          if_block.m(select, option0);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      if (!current || dirty & /*args, undefined*/
      4 && select_value_value !== (select_value_value = /*a*/
      ctx[20].type)) {
        select_option(
          select,
          /*a*/
          ctx[20].type
        );
      }
      if ((!current || dirty & /*args*/
      4) && t21_value !== (t21_value = /*a*/
      ctx[20].id + ""))
        set_data(t21, t21_value);
    },
    i(local) {
      if (current)
        return;
      transition_in(textpicker0.$$.fragment, local);
      transition_in(textpicker1.$$.fragment, local);
      transition_in(icon0.$$.fragment, local);
      transition_in(icon1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(textpicker0.$$.fragment, local);
      transition_out(textpicker1.$$.fragment, local);
      transition_out(icon0.$$.fragment, local);
      transition_out(icon1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div4);
      }
      destroy_component(textpicker0);
      destroy_component(textpicker1);
      if (if_block)
        if_block.d();
      destroy_component(icon0);
      destroy_component(icon1);
      binding_group.r();
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_fragment$2(ctx) {
  let div3;
  let input0;
  let t0;
  let div1;
  let textpicker;
  let t1;
  let div0;
  let button;
  let textContent = "Add argument";
  let t3;
  let t4;
  let input1;
  let t5;
  let div2;
  let textarea;
  let textarea_value_value;
  let current;
  let mounted;
  let dispose;
  textpicker = new TextPicker({
    props: {
      label: "Title",
      placeholder: "Title",
      value: (
        /*title*/
        ctx[1]
      )
    }
  });
  textpicker.$on(
    "value",
    /*value_handler*/
    ctx[9]
  );
  let each_value = ensure_array_like(
    /*args*/
    ctx[2]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      div3 = element("div");
      input0 = element("input");
      t0 = space();
      div1 = element("div");
      create_component(textpicker.$$.fragment);
      t1 = space();
      div0 = element("div");
      button = element("button");
      button.textContent = textContent;
      t3 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t4 = space();
      input1 = element("input");
      t5 = space();
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
      div0 = claim_element(div1_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      button = claim_element(div0_nodes, "BUTTON", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(button) !== "svelte-1bi9qra")
        button.textContent = textContent;
      div0_nodes.forEach(detach);
      t3 = claim_space(div1_nodes);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(div1_nodes);
      }
      div1_nodes.forEach(detach);
      t4 = claim_space(div3_nodes);
      input1 = claim_element(div3_nodes, "INPUT", {
        type: true,
        name: true,
        role: true,
        class: true,
        "aria-label": true
      });
      t5 = claim_space(div3_nodes);
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
      attr(button, "class", "btn btn-ghost");
      attr(div0, "class", "flex justify-center mt-2");
      attr(div1, "role", "tabpanel");
      attr(div1, "class", "tab-content pt-2");
      attr(input1, "type", "radio");
      attr(input1, "name", "tabs");
      attr(input1, "role", "tab");
      attr(input1, "class", "tab");
      attr(input1, "aria-label", "JSON");
      attr(textarea, "placeholder", "JSON");
      attr(textarea, "class", "textarea textarea-bordered w-full max-w-xs h-max");
      textarea.value = textarea_value_value = JSON.stringify(
        /*template*/
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
      append_hydration(div1, div0);
      append_hydration(div0, button);
      append_hydration(div1, t3);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div1, null);
        }
      }
      append_hydration(div3, t4);
      append_hydration(div3, input1);
      append_hydration(div3, t5);
      append_hydration(div3, div2);
      append_hydration(div2, textarea);
      current = true;
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*click_handler*/
          ctx[10]
        );
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      const textpicker_changes = {};
      if (dirty & /*title*/
      2)
        textpicker_changes.value = /*title*/
        ctx2[1];
      textpicker.$set(textpicker_changes);
      if (dirty & /*removeArgument, args, updateType, undefined, updateArgumentLabel, updateArgumentId, arg*/
      492) {
        each_value = ensure_array_like(
          /*args*/
          ctx2[2]
        );
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$1(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block$1(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(div1, null);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
      if (!current || dirty & /*template*/
      1 && textarea_value_value !== (textarea_value_value = JSON.stringify(
        /*template*/
        ctx2[0]
      ))) {
        textarea.value = textarea_value_value;
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(textpicker.$$.fragment, local);
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      transition_out(textpicker.$$.fragment, local);
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div3);
      }
      destroy_component(textpicker);
      destroy_each(each_blocks, detaching);
      mounted = false;
      dispose();
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let { template } = $$props;
  const dispatch = createEventDispatcher();
  let title;
  let args;
  let arg;
  function onTemplate(_template) {
    $$invalidate(1, title = _template.title);
    $$invalidate(2, args = _template.arguments ?? []);
    $$invalidate(3, arg = args.length > 0 ? args[0] : void 0);
  }
  function onChange(_title, _arguments) {
    if (_title !== template.title || _arguments !== template.arguments) {
      $$invalidate(0, template = {
        ...template,
        title: _title,
        arguments: _arguments
      });
      dispatch("template", template);
    }
  }
  function addArgument() {
    const a = {
      id: v4().substring(0, 8),
      label: void 0,
      type: "string",
      default: void 0
    };
    $$invalidate(2, args = [...args, a]);
  }
  function removeArgument(index) {
    $$invalidate(2, args = args.filter((a, i) => i !== index));
  }
  function updateArgumentId(index, id) {
    const a = { ...args[index], id };
    const copy = [...args];
    copy[index] = a;
    $$invalidate(2, args = copy);
  }
  function updateArgumentLabel(index, label) {
    const a = { ...args[index], label };
    const copy = [...args];
    copy[index] = a;
    $$invalidate(2, args = copy);
  }
  function updateType(index, type) {
    const a = { ...args[index], type };
    const copy = [...args];
    copy[index] = a;
    $$invalidate(2, args = copy);
  }
  const $$binding_groups = [[]];
  const value_handler = (e) => $$invalidate(1, title = e.detail);
  const click_handler = () => addArgument();
  function input_change_handler() {
    arg = this.__value;
    $$invalidate(3, arg);
  }
  const value_handler_1 = (index, e) => updateArgumentId(index, e.detail);
  const value_handler_2 = (index, e) => updateArgumentLabel(index, e.detail);
  const change_handler = (index, e) => updateType(index, e.currentTarget.value);
  const click_handler_1 = (index) => removeArgument(index);
  $$self.$$set = ($$props2) => {
    if ("template" in $$props2)
      $$invalidate(0, template = $$props2.template);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*template*/
    1) {
      onTemplate(template);
    }
    if ($$self.$$.dirty & /*title, args*/
    6) {
      onChange(title, args);
    }
  };
  return [
    template,
    title,
    args,
    arg,
    addArgument,
    removeArgument,
    updateArgumentId,
    updateArgumentLabel,
    updateType,
    value_handler,
    click_handler,
    input_change_handler,
    $$binding_groups,
    value_handler_1,
    value_handler_2,
    change_handler,
    click_handler_1
  ];
}
class TemplateEditor extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, { template: 0 });
  }
}
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[5] = list[i];
  child_ctx[7] = i;
  return child_ctx;
}
function create_else_block$1(ctx) {
  let div;
  let textContent = `<span class="text-6xl p-4 block">👻</span> <span>No templates here. Only ghosts in the machine...</span>`;
  return {
    c() {
      div = element("div");
      div.innerHTML = textContent;
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(div) !== "svelte-1cs8twu")
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
function create_if_block$1(ctx) {
  let div1;
  let div0;
  let current;
  let each_value = ensure_array_like(
    /*templates*/
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
      if (dirty & /*templates*/
      1) {
        each_value = ensure_array_like(
          /*templates*/
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
function create_if_block_1$1(ctx) {
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
  let button;
  let icon;
  let t0;
  let t1_value = (
    /*template*/
    ctx[5].title + ""
  );
  let t1;
  let t2;
  let span;
  let t3;
  let if_block_anchor;
  let current;
  let mounted;
  let dispose;
  icon = new Icon({ props: { data: mdiPostageStamp } });
  function click_handler() {
    return (
      /*click_handler*/
      ctx[4](
        /*template*/
        ctx[5]
      )
    );
  }
  let if_block = (
    /*i*/
    ctx[7] < /*templates*/
    ctx[0].length - 1 && create_if_block_1$1()
  );
  return {
    c() {
      button = element("button");
      create_component(icon.$$.fragment);
      t0 = space();
      t1 = text(t1_value);
      t2 = space();
      span = element("span");
      t3 = space();
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
      this.h();
    },
    l(nodes) {
      button = claim_element(nodes, "BUTTON", { class: true });
      var button_nodes = children(button);
      claim_component(icon.$$.fragment, button_nodes);
      t0 = claim_space(button_nodes);
      t1 = claim_text(button_nodes, t1_value);
      t2 = claim_space(button_nodes);
      span = claim_element(button_nodes, "SPAN", { class: true });
      children(span).forEach(detach);
      button_nodes.forEach(detach);
      t3 = claim_space(nodes);
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
      this.h();
    },
    h() {
      attr(span, "class", "mx-auto");
      attr(button, "class", "btn btn-ghost w-full");
    },
    m(target, anchor) {
      insert_hydration(target, button, anchor);
      mount_component(icon, button, null);
      append_hydration(button, t0);
      append_hydration(button, t1);
      append_hydration(button, t2);
      append_hydration(button, span);
      insert_hydration(target, t3, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
      if (!mounted) {
        dispose = listen(button, "click", click_handler);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if ((!current || dirty & /*templates*/
      1) && t1_value !== (t1_value = /*template*/
      ctx[5].title + ""))
        set_data(t1, t1_value);
      if (
        /*i*/
        ctx[7] < /*templates*/
        ctx[0].length - 1
      ) {
        if (if_block)
          ;
        else {
          if_block = create_if_block_1$1();
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
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
        detach(t3);
        detach(if_block_anchor);
      }
      destroy_component(icon);
      if (if_block)
        if_block.d(detaching);
      mounted = false;
      dispose();
    }
  };
}
function create_fragment$1(ctx) {
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
    ctx[3].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[2],
    null
  );
  const if_block_creators = [create_if_block$1, create_else_block$1];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*templates*/
      ctx2[0] !== void 0 && /*templates*/
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
      attr(div1, "class", "card w-full max-w-sm shadow-2xl bg-base-100");
      attr(div2, "class", "hero-content flex-col lg:flex-row-reverse flex");
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
        4)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[2],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[2]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[2],
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
function instance$1($$self, $$props, $$invalidate) {
  let $homeyTemplates;
  component_subscribe($$self, templates, ($$value) => $$invalidate(1, $homeyTemplates = $$value));
  let { $$slots: slots = {}, $$scope } = $$props;
  let templates$12;
  const click_handler = (template) => goto(base + "/template/?id=" + template.id);
  $$self.$$set = ($$props2) => {
    if ("$$scope" in $$props2)
      $$invalidate(2, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$homeyTemplates*/
    2) {
      $$invalidate(0, templates$12 = Object.values({ ...$homeyTemplates }));
    }
  };
  return [templates$12, $homeyTemplates, $$scope, slots, click_handler];
}
class TemplateListHero extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, {});
  }
}
function create_else_block(ctx) {
  let div;
  let templatelisthero;
  let current;
  templatelisthero = new TemplateListHero({
    props: {
      $$slots: { default: [create_default_slot_1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      div = element("div");
      create_component(templatelisthero.$$.fragment);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(templatelisthero.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "flex min-h-screen justify-center");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      mount_component(templatelisthero, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      const templatelisthero_changes = {};
      if (dirty & /*$$scope, templateId*/
      4194305) {
        templatelisthero_changes.$$scope = { dirty, ctx: ctx2 };
      }
      templatelisthero.$set(templatelisthero_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(templatelisthero.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(templatelisthero.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_component(templatelisthero);
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
        /*template*/
        ((_a = ctx[1]) == null ? void 0 : _a.title) ?? "Template title"
      ),
      saveTitle: "Save",
      settingsTitle: "Template",
      settingsIcon: mdiPostageStamp,
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
    ctx[13]
  );
  widgeteditor.$on(
    "save",
    /*save_handler*/
    ctx[14]
  );
  function storedialog_open_binding(value) {
    ctx[15](value);
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
    ctx[16]
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
      if (dirty & /*template*/
      2)
        widgeteditor_changes.title = /*template*/
        ((_a2 = ctx2[1]) == null ? void 0 : _a2.title) ?? "Template title";
      if (dirty & /*root*/
      4)
        widgeteditor_changes.root = /*root*/
        ctx2[2];
      if (dirty & /*$$scope, template*/
      4194306) {
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
  let div;
  let h1;
  let textContent = "👋 Hello there!";
  let t1;
  let p;
  let textContent_1 = "Want to create a new template?";
  let t3;
  let button;
  let textContent_2 = "Let's go! 🧑‍💻";
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
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
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      h1 = claim_element(div_nodes, "H1", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(h1) !== "svelte-2vc6w8")
        h1.textContent = textContent;
      t1 = claim_space(div_nodes);
      p = claim_element(div_nodes, "P", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(p) !== "svelte-1igiv7e")
        p.textContent = textContent_1;
      t3 = claim_space(div_nodes);
      button = claim_element(div_nodes, "BUTTON", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(button) !== "svelte-1l056hf")
        button.textContent = textContent_2;
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(h1, "class", "text-5xl font-bold");
      attr(p, "class", "py-6");
      attr(button, "class", "btn btn-primary");
      attr(div, "class", "text-center");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, h1);
      append_hydration(div, t1);
      append_hydration(div, p);
      append_hydration(div, t3);
      append_hydration(div, button);
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*click_handler*/
          ctx[17]
        );
        mounted = true;
      }
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_1(ctx) {
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
      t2 = text("Cannot find the template with id: ");
      code = element("code");
      t3 = text(
        /*templateId*/
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
      t2 = claim_text(p_nodes, "Cannot find the template with id: ");
      code = claim_element(p_nodes, "CODE", {});
      var code_nodes = children(code);
      t3 = claim_text(
        code_nodes,
        /*templateId*/
        ctx[0]
      );
      code_nodes.forEach(detach);
      p_nodes.forEach(detach);
      t4 = claim_space(nodes);
      div = claim_element(nodes, "DIV", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(div) !== "svelte-1vhj9mv")
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
      if (dirty & /*templateId*/
      1)
        set_data(
          t3,
          /*templateId*/
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
function create_default_slot_1(ctx) {
  let div;
  function select_block_type_1(ctx2, dirty) {
    if (
      /*templateId*/
      ctx2[0] !== null
    )
      return create_if_block_1;
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
  let templateeditor;
  let updating_template;
  let current;
  function templateeditor_template_binding(value) {
    ctx[12](value);
  }
  let templateeditor_props = {};
  if (
    /*template*/
    ctx[1] !== void 0
  ) {
    templateeditor_props.template = /*template*/
    ctx[1];
  }
  templateeditor = new TemplateEditor({ props: templateeditor_props });
  binding_callbacks.push(() => bind(templateeditor, "template", templateeditor_template_binding));
  return {
    c() {
      create_component(templateeditor.$$.fragment);
    },
    l(nodes) {
      claim_component(templateeditor.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(templateeditor, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const templateeditor_changes = {};
      if (!updating_template && dirty & /*template*/
      2) {
        updating_template = true;
        templateeditor_changes.template = /*template*/
        ctx2[1];
        add_flush_callback(() => updating_template = false);
      }
      templateeditor.$set(templateeditor_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(templateeditor.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(templateeditor.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(templateeditor, detaching);
    }
  };
}
function create_fragment(ctx) {
  let title_value;
  let t;
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  document.title = title_value = /*template*/
  ctx[1] !== void 0 ? (
    /*template*/
    ctx[1].title
  ) : "Template";
  const if_block_creators = [create_if_block, create_else_block];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*template*/
      ctx2[1] !== void 0
    )
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      t = space();
      if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      const head_nodes = head_selector("svelte-14i199f", document.head);
      head_nodes.forEach(detach);
      t = claim_space(nodes);
      if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
      if_blocks[current_block_type_index].m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if ((!current || dirty & /*template, undefined*/
      2) && title_value !== (title_value = /*template*/
      ctx2[1] !== void 0 ? (
        /*template*/
        ctx2[1].title
      ) : "Template")) {
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
        detach(t);
        detach(if_block_anchor);
      }
      if_blocks[current_block_type_index].d(detaching);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let templateId;
  let $homey;
  let $stores;
  let $editing;
  let $localtemplates;
  let $homeyTemplates;
  let $page;
  component_subscribe($$self, homey, ($$value) => $$invalidate(18, $homey = $$value));
  component_subscribe($$self, stores, ($$value) => $$invalidate(19, $stores = $$value));
  component_subscribe($$self, editing, ($$value) => $$invalidate(20, $editing = $$value));
  component_subscribe($$self, templates$1, ($$value) => $$invalidate(9, $localtemplates = $$value));
  component_subscribe($$self, templates, ($$value) => $$invalidate(10, $homeyTemplates = $$value));
  component_subscribe($$self, page, ($$value) => $$invalidate(11, $page = $$value));
  let templates$2;
  let template;
  let root;
  let storeOpen = false;
  onMount(async () => {
    if ($homey === void 0) {
      await goto(base + "/");
    }
  });
  function onTemplate(_templates, _templateId) {
    const _template = _templates[_templateId ?? ""];
    if (_template !== void 0 && (template === void 0 || template !== _template && !$editing)) {
      $$invalidate(1, template = _template);
      $$invalidate(2, root = template == null ? void 0 : template.root);
    }
  }
  async function onSave() {
    var _a;
    if (template !== void 0) {
      const storeId = (_a = Object.values($stores).find((store) => store.templates.some((t) => t.id === templateId))) == null ? void 0 : _a.id;
      if (storeId !== void 0) {
        try {
          await saveTemplate($homey.id, storeId, template);
          alerts.success("Saved!", "The template was saved.", 5e3);
        } catch (error) {
          alerts.error("Error!", "Could not save template: " + error, 1e4);
        }
      } else {
        $$invalidate(3, storeOpen = true);
      }
    }
  }
  async function onStoreSelect(storeId) {
    try {
      await saveTemplate($homey.id, storeId, template);
      alerts.success("Saved!", "The template was saved.", 5e3);
    } catch (error) {
      alerts.error("Error!", "Could not save template: " + error, 1e4);
    }
  }
  function onRoot(_root) {
    if (template === void 0)
      return;
    $$invalidate(2, root = _root);
    $$invalidate(1, template = { ...template, root });
  }
  function create() {
    $$invalidate(1, template = {
      id: v4(),
      title: "New template",
      root: void 0,
      arguments: []
    });
    $$invalidate(2, root = template.root);
    editing.set(true);
  }
  function templateeditor_template_binding(value) {
    template = value;
    $$invalidate(1, template);
  }
  const root_handler = (e) => onRoot(e.detail);
  const save_handler = (e) => onSave();
  function storedialog_open_binding(value) {
    storeOpen = value;
    $$invalidate(3, storeOpen);
  }
  const storeId_handler = (e) => onStoreSelect(e.detail);
  const click_handler = () => create();
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$page*/
    2048) {
      $$invalidate(0, templateId = $page.url.searchParams.get("id"));
    }
    if ($$self.$$.dirty & /*$homeyTemplates, $localtemplates*/
    1536) {
      $$invalidate(8, templates$2 = { ...$homeyTemplates, ...$localtemplates });
    }
    if ($$self.$$.dirty & /*templates, templateId*/
    257) {
      onTemplate(templates$2, templateId);
    }
  };
  return [
    templateId,
    template,
    root,
    storeOpen,
    onSave,
    onStoreSelect,
    onRoot,
    create,
    templates$2,
    $localtemplates,
    $homeyTemplates,
    $page,
    templateeditor_template_binding,
    root_handler,
    save_handler,
    storedialog_open_binding,
    storeId_handler,
    click_handler
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
