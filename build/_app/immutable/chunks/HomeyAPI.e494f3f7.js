import { w as writable } from "./singletons.e82a08e6.js";
import { n as getDefaultExportFromCjs } from "./homey.15e95c4d.js";
import { r as requireHomeyAPI } from "./AthomCloudAPI.ea430822.js";
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
