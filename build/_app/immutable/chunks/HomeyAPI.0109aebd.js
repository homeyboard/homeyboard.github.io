import { w as writable } from "./singletons.53fafe45.js";
import { n as getDefaultExportFromCjs } from "./homey.3873f1f6.js";
import { r as requireHomeyAPI } from "./AthomCloudAPI.ea0bf8ad.js";
function createApiKey() {
  const { subscribe, set } = writable(localStorage.apikey);
  return {
    subscribe,
    set: (apikey) => {
      localStorage.apikey = apikey;
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
