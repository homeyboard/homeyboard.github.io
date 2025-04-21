import { s as safe_not_equal, u as component_subscribe, o as onMount } from "../chunks/scheduler.a7fc7cea.js";
import { S as SvelteComponent, i as init } from "../chunks/index.20c35f04.js";
import { p as page } from "../chunks/stores.fdf73280.js";
import { A as AthomCloudAPI } from "../chunks/AthomCloudAPI.75f5d69d.js";
import { g as goto } from "../chunks/navigation.93be9e73.js";
import { e as base } from "../chunks/singletons.e168a4d6.js";
import { l as clientId, m as clientSecret, h as homey } from "../chunks/v4.eedf8624.js";
import { a as alerts } from "../chunks/alerting.6c127aa6.js";
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
        } else {
          alerts.error("Error!", "No authorization code found.", 1e4);
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
