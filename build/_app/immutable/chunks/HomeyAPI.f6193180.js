import { w as writable } from "./singletons.85b0969f.js";
import { n as getDefaultExportFromCjs } from "./homey.afd422d2.js";
import { r as requireHomeyAPI } from "./AthomCloudAPI.aff56878.js";
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
