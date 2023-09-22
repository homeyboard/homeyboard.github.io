import { w as writable } from "./singletons.9d706c6d.js";
import { g as getDefaultExportFromCjs } from "./_commonjsHelpers.7a7fcd32.js";
import { r as requireHomeyAPI } from "./AthomCloudAPI.7350c8ae.js";
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