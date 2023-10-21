import { w as writable } from "./singletons.ad67ada8.js";
import { n as getDefaultExportFromCjs } from "./homey.8b6451fd.js";
import { r as requireHomeyAPI } from "./AthomCloudAPI.da8d81cc.js";
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
