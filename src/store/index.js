/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import config from '../config';
import router from '@/router';

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
    user(state, value) {
      state.user = value;
    },
    auth(state, value) {
      state.auth = value;
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
  },
  modules: {
  },
});
