import { w as writable } from "./singletons.e168a4d6.js";
import { n as v4 } from "./v4.eedf8624.js";
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
  alerts as a
};
