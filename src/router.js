import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
      name: "home",
      component: () => import("./layout/DashboardLayout.vue"),
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("./views/Dashboard.vue")
        },
        {
          path: "/article-list",
          name: "article-list",
          component: () => import("./views/ArticleList.vue")
        },
        {
          path: "/article-add",
          name: "article-add",
          component: () => import("./views/ArticleAdd.vue")
        },
        {
          path: "/discuss-list",
          name: "discuss-list",
          component: () => import("./views/DiscussList.vue")
        },
        {
          path: "/user-list",
          name: "user-list",
          component: () => import("./views/UserList.vue")
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./layout/UserLayout.vue")
    }
  ]
});
