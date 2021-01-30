import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home/index";
import Recommend from "../views/Recommend/index";
import Singer from "../views/Singer/index";
import Ranking from "../views/Ranking/index";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    // component: () => import(/* webpackChunkName: "home" */ "../views/Home/index"),
    component: Home,
    children: [
      {
        path: "recommend",
        name: "Recommend",
        // component: () => import(/* webpackChunkName: "home" */ "../views/Recommend/index"),
        component: Recommend,
        meta: {
          keepAlive: true,
        },
      },
      {
        path: "singer",
        name: "Singer",
        // component: () => import(/* webpackChunkName: "home" */ "../views/Singer/index"),
        component: Singer,
        meta: {
          keepAlive: true,
        },
      },
      {
        path: "ranking",
        name: "Ranking",
        // component: () => import(/* webpackChunkName: "home" */ "../views/Ranking/index"),
        component: Ranking,
        meta: {
          keepAlive: true,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
