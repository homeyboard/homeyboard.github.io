import { w as writable } from "./singletons.2584eb3f.js";
function createFavorite() {
  const { subscribe, set } = writable(localStorage.favorite);
  return {
    subscribe,
    set: (favorite2) => {
      if (favorite2 !== void 0) {
        localStorage.favorite = favorite2;
      } else {
        delete localStorage.favorite;
      }
      set(favorite2);
    }
  };
}
const favorite = createFavorite();
export {
  favorite as f
};
