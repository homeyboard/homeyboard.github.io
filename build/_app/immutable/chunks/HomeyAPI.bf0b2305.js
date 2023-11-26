import { w as writable } from "./singletons.83b90f6f.js";
import { n as getDefaultExportFromCjs } from "./homey.e3954e74.js";
import { r as requireHomeyAPI } from "./AthomCloudAPI.a5af295e.js";
function createApiKey() {
  const { subscribe, set } = writable(localStorage.apikey);
  return {
    subscribe,
    set: (apikey) => {
      if (apikey !== void 0) {
        localStorage.apikey = apikey;
      } else {
        delete localStorage.apikey;
      }
      set(apikey);
    }
  };
}
const apiKey = createApiKey();
var HomeyAPIExports = requireHomeyAPI();
const HomeyAPI = /* @__PURE__ */ getDefaultExportFromCjs(HomeyAPIExports);
export {
  HomeyAPI as H,
  apiKey as a
};
