import { createApp } from "vue";
import { NavBar, Icon, Tab, Tabs, Popup, Swipe, SwipeItem, Image as VanImage, Button } from "vant";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/assets/styles/normalize.css";

const app = createApp(App);

[NavBar, Icon, Tab, Tabs, Popup, Swipe, SwipeItem, VanImage, Button].forEach((name) => {
  app.use(name);
});

app
  .use(store)
  .use(router)
  .mount("#app");
