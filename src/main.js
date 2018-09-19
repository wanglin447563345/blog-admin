import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import cookie from "js-cookie";


Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    // 判断该路由是否需要登录权限
    const userInfo = cookie.get("userInfo");
    if (userInfo) {
      // 判断当前的token是否存在 ； 登录存入的token
      next();
    } else {
      next({
        path: "/user/login"
        //query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
