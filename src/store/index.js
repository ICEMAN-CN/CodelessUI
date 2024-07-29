import Vue from 'vue'
import Vuex from 'vuex'
import utils from '../assets/js/utils'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    projectId: [],
    saleType: "",
  },
  getters: {
    getProjectId(state) {
      return state.projectId;
    },
    getSaleType(state) {
      return state.saleType;
    }
  },
  mutations: {
    setProjectId(state, data) {
      let ids = state.projectId.filter(item => {
        return item.projectId == data.projectId;
      });
      if(ids.length <= 0) {
        state.projectId.push(data);
      }
    },
    removeProjectId(state) {
      state.projectId = [];
    },
    setSaleType(state, data) {
      state.saleType = data;
    },
  },
  actions: {
  },
  modules: {
  }
})
