import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    redirect: "/recommend",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home/index"),
    children: [
      {
        path: "recommend",
        name: "Recommend",
        component: () => import(/* webpackChunkName: "home" */ "../views/Recommend/index"),
        meta: {
          keepAlive: true,
        },
      },
      {
        path: "singer",
        name: "Singer",
        component: () => import(/* webpackChunkName: "home" */ "../views/Singer/index"),
        meta: {
          keepAlive: true,
        },
      },
      {
        path: "ranking",
        name: "Ranking",
        component: () => import(/* webpackChunkName: "home" */ "../views/Ranking/index"),
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
