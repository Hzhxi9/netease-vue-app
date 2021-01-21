import { createApp } from "vue";
import {
  NavBar,
  Icon,
  Tab,
  Tabs,
  Popup,
  Swipe,
  SwipeItem,
  Image as VanImage,
  Button,
  Skeleton,
  Loading,
  Tabbar,
  TabbarItem,
  IndexBar,
  IndexAnchor,
  Cell,
} from "vant";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/assets/styles/normalize.css";
import "@/assets/iconfont/iconfont.css";
import "animate.css";

const app = createApp(App);

[
  NavBar,
  Icon,
  Tab,
  Tabs,
  Popup,
  Swipe,
  SwipeItem,
  VanImage,
  Button,
  Skeleton,
  Loading,
  Tabbar,
  TabbarItem,
  IndexBar,
  IndexAnchor,
  Cell,
].forEach((name) => {
  app.use(name);
});

app
  .use(store)
  .use(router)
  .mount("#app");
