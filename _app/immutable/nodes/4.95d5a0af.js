import { s as safe_not_equal, z as component_subscribe, o as onMount } from "../chunks/scheduler.ede5dfaf.js";
import { S as SvelteComponent, i as init } from "../chunks/index.a7daac98.js";
import { p as page } from "../chunks/stores.ac35caac.js";
import { g as goto, A as AthomCloudAPI, c as clientId, e as clientSecret, h as homey } from "../chunks/AthomCloudAPI.a85178bf.js";
import { e as base } from "../chunks/singletons.c125f7ea.js";
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
    console.log(base);
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
