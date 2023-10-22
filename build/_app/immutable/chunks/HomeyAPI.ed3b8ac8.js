import { w as writable } from "./singletons.ab42ed09.js";
import { n as getDefaultExportFromCjs } from "./homey.d0a41d03.js";
import { r as requireHomeyAPI } from "./AthomCloudAPI.5acd348f.js";
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
