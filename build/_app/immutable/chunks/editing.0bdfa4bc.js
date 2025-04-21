import { w as writable } from "./singletons.e168a4d6.js";
function createEditing() {
  const { subscribe, set, update } = writable(false);
  return {
    subscribe,
    set,
    toggle: () => update((existing) => !existing)
  };
}
const editing = createEditing();
export {
  editing as e
};
