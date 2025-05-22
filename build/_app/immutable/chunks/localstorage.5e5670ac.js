import { w as webhookUrl, r as webhookId, o as v4 } from "./alerting.1ec0368e.js";
import { w as writable } from "./singletons.7956b62b.js";
async function saveDashboard(homeyId, storeId, dashboard) {
  try {
    const url = webhookUrl + webhookId + "?homey=" + homeyId + "&operation=save_dashboard&storeId=" + storeId + "&dashboardId=" + dashboard.id;
    const request = { method: "POST", body: JSON.stringify(dashboard) };
    const response = await fetch(url, request);
    if (response.ok) {
      return true;
    }
  } catch (e) {
  }
  return false;
}
async function deleteDashboard(homeyId, storeId, dashboard) {
  try {
    const url = webhookUrl + webhookId + "?homey=" + homeyId + "&operation=delete_dashboard&storeId=" + storeId + "&dashboardId=" + dashboard.id;
    const request = { method: "POST" };
    const response = await fetch(url, request);
    if (response.ok) {
      return true;
    }
  } catch (e) {
  }
  return false;
}
async function saveTemplate(homeyId, storeId, template) {
  try {
    const url = webhookUrl + webhookId + "?homey=" + homeyId + "&operation=save_template&storeId=" + storeId + "&templateId=" + template.id;
    const request = { method: "POST", body: JSON.stringify(template) };
    const response = await fetch(url, request);
    if (response.ok) {
      return true;
    }
  } catch (e) {
  }
  return false;
}
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
  deleteDashboard as a,
  saveTemplate as b,
  dashboards as d,
  saveDashboard as s,
  templates as t
};
