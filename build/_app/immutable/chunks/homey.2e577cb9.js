import { k as derived, w as writable } from "./singletons.f80bfd01.js";
import { p as page } from "./stores.67d0b73f.js";
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
const homeys = createHomeys();
const homey = writable(void 0);
const baseUrl = createBaseUrl();
const session = writable(void 0);
const scopes = derived(session, (s) => (s == null ? void 0 : s.scopes) ?? [], []);
const devices = createDevices();
const basicFlows = createBasicFlows();
const advancedFlows = createAdvancedFlows();
const zones = createZones();
const insights = writable({});
const dashboards = derived(
  devices,
  (d) => Object.values(d).filter((e) => e.driverId === driverId).reduce((existing, dev) => {
    const dashboard = {
      id: dev.data.id,
      // The custom device.data.id is used instead of the device.id, as the device id is not accessible for the installable app.
      source: "homey",
      title: dev.name,
      items: dev.settings.items ?? []
    };
    existing[dashboard.id] = dashboard;
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
  basicFlows as i,
  advancedFlows as j,
  insights as k,
  webhookId as l,
  scopes as s,
  webhookUrl as w,
  zones as z
};
