import Vue from "vue";
import Vuex from "vuex";
import VueGtag from "vue-gtag";

Vue.use(Vuex);

Vue.use(VueGtag, {
  config: { id: `${process.env.VUE_APP_GTAG}` }
});

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {}
});
