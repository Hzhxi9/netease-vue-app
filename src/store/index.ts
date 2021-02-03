import { createStore } from "vuex";

import music from "./module";

import getters from "./getters";

export default createStore({
  getters,
  modules: {
    music,
  },
});
