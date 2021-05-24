/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import config from '../config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    auth: {},
    categories: [],
    recipes: [],
  },
  getters: {
    user: (state) => state.user,
    auth: (state) => state.auth,
    categories: (state) => state.categories,
    recipes: (state) => state.recipes,
  },
  mutations: {
    user(state, value) {
      state.user = value;
    },
    auth(state, value) {
      state.auth = value;
    },
    categories(state, value) {
      state.categories = value;
    },
    recipes(state, value) {
      state.recipes = value;
    },
  },
  actions: {
    init({ commit }) {
      this._vm.$http.get(`${config.hostname}/categories.json`).then((res) => {
        commit('categories', res.data);
      }).catch((err) => {
        console.error('axios err', err);
      });
      this._vm.$http.get(`${config.hostname}/recipes.json`).then((res) => {
        console.log('recipes', res.data);
        commit('recipes', res.data);
      }).catch((err) => {
        console.error('axios err', err);
      });
    },
  },
  modules: {
  },
});
