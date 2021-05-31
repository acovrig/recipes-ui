/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import cookie from 'vue-cookie';
import config from '../config';
// import router from '@/router';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: {},
    user: {},
    categories: [],
    recipes: [],
  },
  getters: {
    user: (state) => state.user,
    auth: (state) => state.auth,
    categories: (state) => state.categories,
    recipes: (state) => (filter) => {
      if ((filter || {}).category) {
        return state.recipes.filter((r) => (r.categories || []).indexOf(parseInt(filter.category, 10)) !== -1);
      }
      return state.recipes;
    },
    recipe: (state) => (id) => state.recipes.filter((recipe) => recipe.id === parseInt(id, 10))[0],
    category: (state) => (id) => state.categories.filter((category) => category.id === parseInt(id, 10))[0],
  },
  mutations: {
    user(state, user) {
      Vue.set(state, 'user', user);
      if (user === undefined || user === null) {
        localStorage.removeItem('user');
      } else {
        localStorage.setItem('user', JSON.stringify(user));
      }
    },
    auth(state, auth) {
      Vue.set(state, 'auth', auth);
      if (auth === undefined || auth === null) {
        cookie.set('session', null);
      } else {
        cookie.set('session', JSON.stringify(auth), { expires: '14D' });
      }
    },
    SET_CATEGORIES(state, value) {
      state.categories = value.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    },
    SET_RECIPES(state, value) {
      state.recipes = value.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    },
    updateRecipe(state, recipe) {
      Vue.set(state, 'recipes', _.unionBy([recipe], state.recipes, 'id'));
    },
  },
  actions: {
    init({ commit }) {
      try {
        let auth = cookie.get('session');
        let user = localStorage.getItem('user');
  
        if (auth !== undefined && auth !== null) auth = JSON.parse(auth);
        if (user !== undefined && user !== null) user = JSON.parse(user);
  
        commit('auth', auth);
        commit('user', user);
      } catch (e) {
        console.error(e);
      }
      axios.get(`${config.hostname}/categories.json`).then((res) => {
        commit('SET_CATEGORIES', res.data);
      }).catch((err) => {
        console.error('axios err', err);
      });
    },
  },
  modules: {
  },
});
