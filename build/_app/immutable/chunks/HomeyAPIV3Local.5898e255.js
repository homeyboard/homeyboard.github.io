import { w as writable } from "./singletons.2584eb3f.js";
import { r as requireHomeyAPIV3Local, g as getDefaultExportFromCjs } from "./AthomCloudAPI.75f5d69d.js";
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
function createHomeyId() {
  const { subscribe, set } = writable(localStorage.homeyId);
  return {
    subscribe,
    set: (homeyId2) => {
      if (homeyId2 !== void 0) {
        localStorage.homeyId = homeyId2;
      } else {
        delete localStorage.homeyId;
      }
      set(homeyId2);
    }
  };
}
const apiKey = createApiKey();
const homeyId = createHomeyId();
var HomeyAPIV3LocalExports = requireHomeyAPIV3Local();
const HomeyAPIV3Local = /* @__PURE__ */ getDefaultExportFromCjs(HomeyAPIV3LocalExports);
export {
  HomeyAPIV3Local as H,
  apiKey as a,
  homeyId as h
};
