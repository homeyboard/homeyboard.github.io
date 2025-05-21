import { j as derived, w as writable } from "./singletons.75e21b2d.js";
import { p as page } from "./stores.aa567822.js";
const driverId = "homey:app:skogsaas.dashboards:dashboard";
const webhookUrl = "https://webhooks.athom.com/webhook/";
const webhookId = "64e39774cf7cc10b916174a7";
const clientId = "64db40c9dfd48293e883f17c";
const clientSecret = "4bafb4b84b94c86bde946a085bec643e130df5c0";
const BuiltInTemplates = [
  {
    id: "builtin-capability",
    title: "Capability",
    root: {
      id: "2f8b292d-c0f2-415d-a628-fab11445e74a",
      type: "switch",
      version: 1,
      "switch": "capability",
      switchArg: "${template.capabilityUri}",
      "case": "type",
      cases: [
        {
          id: "1554c4ee-5dad-428c-8827-c5ea86c0aa4f",
          operator: "equal",
          value: "boolean",
          item: {
            id: "f94e57fe-6acf-4c95-96f2-640439dca70a",
            type: "switch",
            version: 1,
            "switch": "capability",
            switchArg: "${template.capabilityUri}",
            "case": "getable",
            cases: [
              {
                id: "28b155ff-2d9a-4960-a255-d915132014ae",
                operator: "equal",
                value: "1",
                item: {
                  id: "57c2e7fb-fe97-4148-9bfd-fe4acf516262",
                  type: "toggle",
                  version: 1,
                  uri: "${template.capabilityUri}",
                  label: "${template.label}"
                }
              },
              {
                id: "d465b96c-3c4e-441b-8916-25f2c9c64fe6",
                operator: "equal",
                value: "0",
                item: {
                  id: "ccf5eb25-aad6-4ac5-9e75-c18e5703a7f2",
                  type: "sensor",
                  version: 1,
                  uri: "${template.capabilityUri}",
                  label: "${template.label}"
                }
              }
            ]
          }
        },
        {
          id: "2eb77424-ef6b-42be-a147-4879d1fbb208",
          operator: "equal",
          value: "number",
          item: {
            id: "89bed907-5ca1-4da9-b147-c4dbf29c2041",
            type: "switch",
            version: 1,
            "switch": "capability",
            switchArg: "${template.capabilityUri}",
            "case": "setable",
            cases: [
              {
                id: "84f15646-3f7c-40cb-99ec-869db165a72d",
                operator: "equal",
                value: "1",
                item: {
                  id: "dbdd2337-9c38-4887-b463-ae2f481a6f66",
                  type: "slider",
                  version: 3,
                  uri: "${template.capabilityUri}",
                  labelPosition: "left",
                  valuePosition: "right",
                  hideMinMax: false,
                  label: "${template.label}"
                }
              },
              {
                id: "9c3c12d3-14a0-46c7-839f-85c6142f33bf",
                operator: "equal",
                value: "0",
                item: {
                  id: "59fcefbc-14a7-4536-8678-dea26c170a03",
                  type: "sensor",
                  version: 1,
                  uri: "${template.capabilityUri}",
                  label: "${template.label}"
                }
              }
            ]
          }
        },
        {
          id: "69a3500a-3e73-456c-9aec-aed9953a2dfa",
          operator: "equal",
          value: "string",
          item: {
            id: "44175474-1272-4a6b-9074-d4d74bae8ede",
            type: "sensor",
            version: 1,
            uri: "${template.capabilityUri}",
            label: "${template.label}"
          }
        },
        {
          id: "54fea3bc-193c-4c9a-b1ea-7e633a7ccafb",
          operator: "equal",
          value: "enum",
          item: {
            id: "570f92c3-e38a-453f-9b27-98e99c4fc8c6",
            type: "sensor",
            version: 1,
            uri: "${template.capabilityUri}",
            label: "${template.label}"
          }
        }
      ]
    },
    "arguments": [
      {
        id: "capabilityUri",
        label: "Capability",
        type: "capabilityUri"
      },
      {
        id: "label",
        label: "Label",
        type: "string"
      }
    ]
  },
  {
    id: "builtin-zone-lights",
    title: "Zone Lights",
    root: {
      id: "01699d74-560d-4450-8502-ebc569491e39",
      type: "foreach",
      version: 1,
      item: {
        id: "ab4fbac2-0737-44d4-b359-5bc497e0875c",
        type: "template",
        version: 1,
        templateId: "builtin-capability",
        "arguments": [
          {
            argId: "capabilityUri",
            value: "${device.uri}:onoff"
          },
          {
            argId: "label",
            value: "${device.name}"
          }
        ]
      },
      slug: "device",
      each: "device",
      "in": "zone",
      inArg: "${template.zone}",
      where: [
        {
          id: "cb6b8189-2993-4a48-b7ac-e63db7b68077",
          key: "class",
          operator: "equal",
          value: "light"
        },
        {
          id: "8d595384-2d2f-4cb9-9680-db56918764cb",
          key: "virtualClass",
          operator: "equal",
          value: "light"
        }
      ],
      whereOp: "or",
      gap: "gap-0.5"
    },
    "arguments": [
      {
        id: "zone",
        label: "Zone",
        type: "zoneId"
      }
    ]
  }
];
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
    } else if (localStorage.homeyUrl !== void 0) {
      set(localStorage.homeyUrl);
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
    onUpdate: (patch) => update((existing) => onDeviceUpdate(existing, patch))
    //onCapability: (deviceId: string, event: CapabilityEvent) => update((existing: DeviceMap) => onCapability(existing, deviceId, event))
  };
}
function onDeviceUpdate(existingMap, patch) {
  const deviceId = patch.id;
  const copy = { ...existingMap };
  const device = copy[deviceId];
  Object.keys(patch).filter((key) => key !== "id" && key !== "uri").forEach((key) => device[key] = patch[key]);
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
function onVariable(existingMap, patch) {
  const variableId = patch.id;
  const copy = { ...existingMap };
  const variable = copy[variableId];
  Object.keys(patch).filter((key) => key !== "id" && key !== "uri").forEach((key) => variable[key] = patch[key]);
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
function createImages() {
  const { subscribe, set, update } = writable({});
  return {
    subscribe,
    set,
    onCreate: (img) => update((existing) => ({ ...existing })),
    onDelete: (img) => update((existing) => {
      const copy = { ...existing };
      delete copy[img.id];
      return copy;
    })
  };
}
const user = writable(void 0);
const homeys = createHomeys();
const homey = writable(void 0);
const connection = writable("disconnect");
const baseUrl = createBaseUrl();
const session = writable(void 0);
const scopes = derived(session, (s) => (s == null ? void 0 : s.scopes) ?? [], []);
const devices = createDevices();
const variables = createVariables();
const flowFolders = writable({});
const basicFlows = createBasicFlows();
const advancedFlows = createAdvancedFlows();
const zones = createZones();
const images = createImages();
const insights = writable({});
const stores = derived(
  devices,
  (device) => Object.values(device).filter((e) => e.driverId === driverId).reduce((existing, dev) => {
    const settings = dev.settings;
    let store = {
      id: dev.data.id,
      // Use the data.id as store id, and not the device.id
      version: 1,
      title: dev.name,
      dashboards: settings.dashboards ?? [],
      templates: settings.templates ?? []
    };
    if (settings.hasOwnProperty("items")) {
      store.dashboards.push({ ...settings, title: dev.name });
    } else if (settings.hasOwnProperty("root")) {
      store.dashboards.push({ ...settings, title: dev.name });
    }
    existing[store.id] = store;
    return existing;
  }, {}),
  {}
);
const dashboards = derived(
  stores,
  (storeMap) => Object.values(storeMap).flatMap((store) => store.dashboards).filter((dashboard) => dashboard == null ? void 0 : dashboard.id).reduce((existing, dashboard) => {
    existing[dashboard.id] = dashboard;
    return existing;
  }, {}),
  {}
);
const templates = derived(
  stores,
  (storeMap) => Object.values(storeMap).flatMap((store) => store.templates).concat(BuiltInTemplates.map((t) => {
    t.builtin = true;
    return t;
  })).reduce((existing, template) => {
    existing[template.id] = template;
    return existing;
  }, {}),
  {}
);
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}
const byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}
const randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const native = {
  randomUUID
};
function v4(options, buf, offset) {
  if (native.randomUUID && !buf && !options) {
    return native.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
function createAlerts() {
  const { subscribe, set, update } = writable([]);
  return {
    subscribe,
    set,
    plain: (title, text, timeout) => {
      const alert = createAlert(title, text, timeout, void 0, "");
      update((existing) => [...existing, alert]);
    },
    info: (title, text, timeout) => {
      const alert = createAlert(title, text, timeout, "information", "alert-info");
      update((existing) => [...existing, alert]);
    },
    warn: (title, text, timeout) => {
      const alert = createAlert(title, text, timeout, "alert", "alert-warning");
      update((existing) => [...existing, alert]);
    },
    error: (title, text, timeout) => {
      const alert = createAlert(title, text, timeout, "skull-crossbones", "alert-error");
      update((existing) => [...existing, alert]);
    },
    success: (title, text, timeout) => {
      const alert = createAlert(title, text, timeout, "check", "alert-success");
      update((existing) => [...existing, alert]);
    },
    remove: (id) => update((existing) => existing.filter((alert) => alert.id !== id))
  };
}
function createAlert(title, text, timeout, icon, classes) {
  return {
    id: v4(),
    expires: Date.now() + timeout,
    title,
    text,
    icon,
    classes
  };
}
const alerts = createAlerts();
export {
  alerts as a,
  basicFlows as b,
  connection as c,
  devices as d,
  advancedFlows as e,
  flowFolders as f,
  images as g,
  baseUrl as h,
  insights as i,
  homey as j,
  dashboards as k,
  homeys as l,
  clientId as m,
  clientSecret as n,
  v4 as o,
  stores as p,
  scopes as q,
  webhookId as r,
  session as s,
  templates as t,
  user as u,
  variables as v,
  webhookUrl as w,
  zones as z
};
