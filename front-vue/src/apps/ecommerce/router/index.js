import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    children: [
      {
        name: "home",
        path: "",
        component: ()=> import("../modules/Home/views/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
