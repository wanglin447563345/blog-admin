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
          component: () => import("./views/Dashboard.vue"),
          meta: {
            requireAuth: true // 判断是否需要登录
          }
        },
        {
          path: "/article-type",
          name: "article-type",
          component: () => import("./views/ArticleType.vue"),
          meta: {
            requireAuth: true // 判断是否需要登录
          }
        },
        {
          path: "/article-list",
          name: "article-list",
          component: () => import("./views/ArticleList.vue"),
          meta: {
            requireAuth: true // 判断是否需要登录
          }
        },
        {
          path: "/article-add",
          name: "article-add",
          component: () => import("./views/ArticleAdd.vue"),
          meta: {
            requireAuth: true // 判断是否需要登录
          }
        },
        {
          path: "/discuss-list",
          name: "discuss-list",
          component: () => import("./views/DiscussList.vue"),
          meta: {
            requireAuth: true // 判断是否需要登录
          }
        },
        {
          path: "/user-list",
          name: "user-list",
          component: () => import("./views/UserList.vue"),
          meta: {
            requireAuth: true // 判断是否需要登录
          }
        },
        {
          path: "/change-password",
          name: "change-password",
          component: () => import("./views/ChangePassword.vue"),
          meta: {
            requireAuth: true // 判断是否需要登录
          }
        }
      ]
    },
    {
      path: "/user",
      redirect: "/user/login",
      name: "user",
      component: () => import("./layout/UserLayout.vue"),
      children: [
        {
          path: "/user/login",
          name: "login",
          component: () => import("./views/Login.vue"),
          meta: {
            requireAuth: false // 判断是否需要登录
          }
        },
        {
          path: "/user/register",
          name: "register",
          component: () => import("./views/Register.vue"),
          meta: {
            requireAuth: false // 判断是否需要登录
          }
        }
      ]
    }
  ]
});
