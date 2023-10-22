import { k as client_method, j as derived, w as writable } from "./singletons.ab42ed09.js";
import { p as page } from "./stores.dcd34f7b.js";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function getAugmentedNamespace(n) {
  if (n.__esModule)
    return n;
  var f = n.default;
  if (typeof f == "function") {
    var a = function a2() {
      if (this instanceof a2) {
        var args = [null];
        args.push.apply(args, arguments);
        var Ctor = Function.bind.apply(f, args);
        return new Ctor();
      }
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else
    a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
const goto = /* @__PURE__ */ client_method("goto");
const driverId = "homey:app:skogsaas.dashboards:dashboard";
const webhookUrl = "https://webhooks.athom.com/webhook/";
const webhookId = "64e39774cf7cc10b916174a7";
const clientId = "64db40c9dfd48293e883f17c";
const clientSecret = "4bafb4b84b94c86bde946a085bec643e130df5c0";
function createHomeys() {
  const { subscribe, set, update } = writable({});
  return {
    subscribe,
    set,
    add: (h) => update((existing) => {
      const result = { ...existing };
      result[h.id] = h;
      return result;
    })
  };
}
function createBaseUrl() {
  return derived([homey, page], ([$homey, $page], set) => {
    if ($homey !== void 0) {
      $homey.baseUrl.then((u) => set(u));
    } else if (localStorage.homeyId !== void 0) {
      set(localStorage.homeyId);
    } else if ({}.VITE_HOMEY_URL) {
      set({}.VITE_HOMEY_URL);
    } else {
      set($page.url.origin);
    }
  });
}
function createDevices() {
  const { subscribe, set, update } = writable({});
  return {
    subscribe,
    set,
    onDevice: (patch) => update((existing) => onDevice(existing, patch))
    //onCapability: (deviceId: string, event: CapabilityEvent) => update((existing: DeviceMap) => onCapability(existing, deviceId, event))
  };
}
function onDevice(existing, patch) {
  const deviceId = patch.id;
  const copy = { ...existing };
  copy[deviceId] = { ...existing[deviceId], ...patch };
  return copy;
}
function createVariables() {
  const { subscribe, set, update } = writable({});
  return {
    subscribe,
    set,
    onUpdate: (patch) => update((existing) => onVariable(existing, patch))
  };
}
function onVariable(existing, patch) {
  const variableId = patch.id;
  const copy = { ...existing };
  copy[variableId] = { ...existing[variableId], ...patch };
  return copy;
}
function createBasicFlows() {
  const { subscribe, set, update } = writable({});
  return {
    subscribe,
    set,
    onCreate: (flow) => update((existing) => ({ ...existing })),
    onDelete: (flow) => update((existing) => {
      const copy = { ...existing };
      delete copy[flow.id];
      return copy;
    })
  };
}
function createAdvancedFlows() {
  const { subscribe, set, update } = writable({});
  return {
    subscribe,
    set,
    onCreate: (flow) => update((existing) => ({ ...existing })),
    onDelete: (flow) => update((existing) => {
      const copy = { ...existing };
      delete copy[flow.id];
      return copy;
    })
  };
}
function createZones() {
  const { subscribe, set, update } = writable({});
  return {
    subscribe,
    set
  };
}
const user = writable(void 0);
const homeys = createHomeys();
const homey = writable(void 0);
const baseUrl = createBaseUrl();
const session = writable(void 0);
const scopes = derived(session, (s) => (s == null ? void 0 : s.scopes) ?? [], []);
const devices = createDevices();
const variables = createVariables();
const flowFolders = writable({});
const basicFlows = createBasicFlows();
const advancedFlows = createAdvancedFlows();
const zones = createZones();
const insights = writable({});
const dashboards = derived(
  devices,
  (d) => Object.values(d).filter((e) => e.driverId === driverId).reduce((existing, dev) => {
    let dashboard = {
      id: dev.data.id,
      // The custom device.data.id is used instead of the device.id, as the device id is not accessible for the installable app.
      source: "homey",
      title: dev.name,
      items: []
    };
    existing[dashboard.id] = { ...dashboard, ...dev.settings };
    return existing;
  }, {}),
  {}
);
export {
  clientSecret as a,
  homey as b,
  clientId as c,
  baseUrl as d,
  dashboards as e,
  session as f,
  devices as g,
  homeys as h,
  flowFolders as i,
  basicFlows as j,
  advancedFlows as k,
  insights as l,
  goto as m,
  getDefaultExportFromCjs as n,
  webhookId as o,
  commonjsGlobal as p,
  getAugmentedNamespace as q,
  scopes as s,
  user as u,
  variables as v,
  webhookUrl as w,
  zones as z
};
