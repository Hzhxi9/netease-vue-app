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
} from "vant";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/assets/styles/normalize.css";
import "animate.css";

const app = createApp(App);

[NavBar, Icon, Tab, Tabs, Popup, Swipe, SwipeItem, VanImage, Button, Skeleton, Loading].forEach(
  (name) => {
    app.use(name);
  }
);

app
  .use(store)
  .use(router)
  .mount("#app");
