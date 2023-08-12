import { s as safe_not_equal, z as component_subscribe, o as onMount } from "../chunks/scheduler.ede5dfaf.js";
import { S as SvelteComponent, i as init } from "../chunks/index.a7daac98.js";
import { p as page } from "../chunks/stores.b64b975b.js";
import { A as AthomCloudAPI, h as homey, g as goto } from "../chunks/AthomCloudAPI.06203c9d.js";
function instance($$self, $$props, $$invalidate) {
  let $page;
  component_subscribe($$self, page, ($$value) => $$invalidate(0, $page = $$value));
  let code;
  onMount(async () => {
    if (code != null) {
      const cloudApi = new AthomCloudAPI({
        clientId: "5a8d4ca6eb9f7a2c9d6ccf6d",
        clientSecret: "e3ace394af9f615857ceaa61b053f966ddcfb12a"
      });
      const loggedIn = await cloudApi.isLoggedIn();
      if (!loggedIn) {
        if (cloudApi.hasAuthorizationCode()) {
          await cloudApi.authenticateWithAuthorizationCode();
          const user = await cloudApi.getAuthenticatedUser();
          const firstHomey = await user.getFirstHomey();
          const homeyApi = await firstHomey.authenticate();
          homey.set(homeyApi);
        }
      } else {
        goto("/");
      }
    }
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
