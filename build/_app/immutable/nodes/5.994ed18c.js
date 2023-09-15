import { s as safe_not_equal, x as component_subscribe, o as onMount } from "../chunks/scheduler.c054974b.js";
import { S as SvelteComponent, i as init } from "../chunks/index.036fb736.js";
import { p as page } from "../chunks/stores.f900d548.js";
import { g as goto, A as AthomCloudAPI } from "../chunks/AthomCloudAPI.e9445f4c.js";
import { e as base } from "../chunks/singletons.20061ed7.js";
import { c as clientId, a as clientSecret, b as homey } from "../chunks/homey.3813e625.js";
function instance($$self, $$props, $$invalidate) {
  let $page;
  component_subscribe($$self, page, ($$value) => $$invalidate(0, $page = $$value));
  let code;
  onMount(async () => {
    if (code != null) {
      const cloudApi = new AthomCloudAPI({ clientId, clientSecret });
      const loggedIn = await cloudApi.isLoggedIn();
      if (!loggedIn) {
        if (cloudApi.hasAuthorizationCode()) {
          await cloudApi.authenticateWithAuthorizationCode();
          const user = await cloudApi.getAuthenticatedUser();
          const firstHomey = await user.getFirstHomey();
          const homeyApi = await firstHomey.authenticate();
          homey.set(homeyApi);
        }
      }
    }
    await goto(base + "/");
  });
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*$page*/
    1) {
      code = $page.url.searchParams.get("code");
    }
  };
  return [$page];
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