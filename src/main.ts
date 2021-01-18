import { createApp } from "vue";
import { NavBar } from "vant";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/assets/styles/normalize.css";

import "vant/lib/nav-bar/style/less";

const app = createApp(App);

app.use(NavBar);

app
  .use(store)
  .use(router)
  .mount("#app");
