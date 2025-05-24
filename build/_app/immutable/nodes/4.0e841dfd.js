import { s as safe_not_equal, u as component_subscribe, o as onMount } from "../chunks/scheduler.eb13839d.js";
import { S as SvelteComponent, i as init } from "../chunks/index.b52a7f1f.js";
import { g as goto } from "../chunks/navigation.6eae7c83.js";
import { f as favorite } from "../chunks/favorite.c2c4616e.js";
import { e as base } from "../chunks/singletons.2584eb3f.js";
function instance($$self, $$props, $$invalidate) {
  let $favorite;
  component_subscribe($$self, favorite, ($$value) => $$invalidate(0, $favorite = $$value));
  onMount(async () => {
    if ($favorite !== void 0) {
      await goto(base + "/board/?id=" + $favorite);
    } else {
      await goto(base);
    }
  });
  return [];
}
class Page extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, null, safe_not_equal, {});
  }
}
export {
  Page as component
};
