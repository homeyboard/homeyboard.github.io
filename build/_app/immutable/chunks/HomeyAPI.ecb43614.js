import { w as writable } from "./singletons.cdd7f699.js";
import { n as getDefaultExportFromCjs } from "./homey.a0b15e9a.js";
import { r as requireHomeyAPI } from "./AthomCloudAPI.090d7e1e.js";
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
