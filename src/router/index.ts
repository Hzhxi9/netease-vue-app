import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home/index"),
    children: [
      {
        path: "recommend",
        name: "Recommend",
        component: () => import(/* webpackChunkName: "home" */ "../views/Recommend/index"),
      },
      {
        path: "singer",
        name: "Singer",
        component: () => import(/* webpackChunkName: "home" */ "../views/Singer/index"),
      },
      {
        path: "ranking",
        name: "Ranking",
        component: () => import(/* webpackChunkName: "home" */ "../views/Ranking/index"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
