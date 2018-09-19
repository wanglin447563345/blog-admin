import Vue from "vue";
import Vuex from "vuex";
import { type_sum } from "./service/Api";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    series_data: [],
    legend_data: [],
    list_data: []
  },
  mutations: {
    get_type_sum(state, payload) {
      state.series_data = payload.series_data;
      state.legend_data = payload.series_data;
      state.list_data = payload.list_data;
    }
  },
  actions: {
    getTypeSum: function(context) {
      type_sum().then(data => {
        if (data.errno === 0) {
          context.commit("get_type_sum", data.data);
        } else {
          this.$message.error(data.errmsg);
        }
      });
    }
  }
});
