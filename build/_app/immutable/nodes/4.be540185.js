import { s as safe_not_equal, u as component_subscribe, o as onMount } from "../chunks/scheduler.a7fc7cea.js";
import { S as SvelteComponent, i as init } from "../chunks/index.20c35f04.js";
import { g as goto } from "../chunks/navigation.93be9e73.js";
import { f as favorite } from "../chunks/favorite.3a5032e5.js";
import { e as base } from "../chunks/singletons.e168a4d6.js";
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
