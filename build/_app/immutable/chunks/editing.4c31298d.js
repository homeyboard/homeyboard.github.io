import { w as writable } from "./singletons.2584eb3f.js";
function createEditing() {
  const { subscribe, set, update } = writable(false);
  return {
    subscribe,
    set,
    toggle: () => update((existing) => !existing)
  };
}
const editing = createEditing();
const selection = writable(void 0);
const copying = writable(void 0);
export {
  copying as c,
  editing as e,
  selection as s
};
