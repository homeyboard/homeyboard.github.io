import { w as writable } from "./singletons.e168a4d6.js";
import { n as v4 } from "./v4.eedf8624.js";
function createDashboards() {
  const prefix = "dashboard-";
  const initialValue = Object.keys(localStorage).filter((key) => key.startsWith(prefix)).reduce((existing, key) => {
    const id = key.slice(prefix.length);
    const d = JSON.parse(localStorage[key]);
    existing[id] = d;
    return existing;
  }, {});
  if (localStorage.dashboards !== void 0) {
    const d = {
      id: v4(),
      source: "localstorage",
      title: "Dashboard (migrated)",
      items: JSON.parse(localStorage.dashboards)
    };
    const key = prefix + d.id;
    localStorage[key] = JSON.stringify(d);
    delete localStorage.dashboards;
    initialValue[d.id] = d;
  }
  const { subscribe, set, update } = writable(initialValue);
  return {
    subscribe,
    update: (d) => {
      const key = prefix + d.id;
      localStorage[key] = JSON.stringify(d);
      update((existing) => {
        const copy = { ...existing };
        copy[d.id] = d;
        return copy;
      });
    },
    delete: (d) => {
      const key = prefix + d.id;
      if (localStorage[key] !== void 0) {
        delete localStorage[key];
      }
      update((existing) => {
        if (existing[d.id] !== void 0) {
          const copy = { ...existing };
          delete copy[d.id];
          return copy;
        }
        return existing;
      });
    }
  };
}
function createTemplates() {
  const prefix = "templates-";
  const initialValue = Object.keys(localStorage).filter((key) => key.startsWith(prefix)).reduce((existing, key) => {
    const id = key.slice(prefix.length);
    const d = JSON.parse(localStorage[key]);
    existing[id] = d;
    return existing;
  }, {});
  const { subscribe, set, update } = writable(initialValue);
  return {
    subscribe,
    update: (t) => {
      const key = prefix + t.id;
      localStorage[key] = JSON.stringify(t);
      update((existing) => {
        const copy = { ...existing };
        copy[t.id] = t;
        return copy;
      });
    },
    delete: (t) => {
      const key = prefix + t.id;
      if (localStorage[key] !== void 0) {
        delete localStorage[key];
      }
      update((existing) => {
        if (existing[t.id] !== void 0) {
          const copy = { ...existing };
          delete copy[t.id];
          return copy;
        }
        return existing;
      });
    }
  };
}
const dashboards = createDashboards();
const templates = createTemplates();
export {
  dashboards as d,
  templates as t
};
