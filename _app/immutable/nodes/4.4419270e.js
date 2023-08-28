import { s as safe_not_equal, M as component_subscribe, o as onMount } from "../chunks/scheduler.8ee754c3.js";
import { S as SvelteComponent, i as init } from "../chunks/index.09d54507.js";
import { p as page } from "../chunks/stores.2bbe4c5c.js";
import { A as AthomCloudAPI } from "../chunks/AthomCloudAPI.cd8078a7.js";
import { l as goto, c as clientId, a as clientSecret, b as homey } from "../chunks/homey.dcb48ed1.js";
import { e as base } from "../chunks/singletons.0aae1b48.js";
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
