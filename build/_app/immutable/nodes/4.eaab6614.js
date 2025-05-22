import { s as safe_not_equal, u as component_subscribe, o as onMount } from "../chunks/scheduler.eb13839d.js";
import { S as SvelteComponent, i as init } from "../chunks/index.b52a7f1f.js";
import { g as goto } from "../chunks/navigation.d8976ee0.js";
import { f as favorite } from "../chunks/favorite.0da53c0d.js";
import { e as base } from "../chunks/singletons.7956b62b.js";
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
