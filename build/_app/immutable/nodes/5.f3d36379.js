import { s as safe_not_equal, u as component_subscribe, o as onMount } from "../chunks/scheduler.eb13839d.js";
import { S as SvelteComponent, i as init } from "../chunks/index.b52a7f1f.js";
import { p as page } from "../chunks/stores.72899cda.js";
import { A as AthomCloudAPI } from "../chunks/AthomCloudAPI.75f5d69d.js";
import { g as goto } from "../chunks/navigation.d8976ee0.js";
import { e as base } from "../chunks/singletons.7956b62b.js";
import { m as clientId, n as clientSecret, j as homey, a as alerts } from "../chunks/alerting.1ec0368e.js";
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
