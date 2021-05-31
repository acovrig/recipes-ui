import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/logout',
    component: {
      beforeRouteEnter(_, from, next) {
        const dest = {
          path: '/',
        };
        store.commit('user', {});
        store.commit('auth', {});
        next(dest);
      },
    },
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import(/* webpackChunkName: "account" */ '../views/Account.vue'),
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import(/* webpackChunkName: "categories" */ '../views/Categories.vue'),
  },
  {
    path: '/categories/:id',
    name: 'Category',
    component: () => import(/* webpackChunkName: "category" */ '../views/Category.vue'),
  },
  {
    path: '/recipes',
    name: 'Recipes',
    component: () => import(/* webpackChunkName: "recipies" */ '../views/Recipes.vue'),
  },
  {
    path: '/recipes/:id',
    name: 'Recipe',
    component: () => import(/* webpackChunkName: "showrecipe" */ '../views/Recipe.vue'),
  },
  {
    path: '/auto',
    name: 'Auto',
    component: () => import(/* webpackChunkName: "auto" */ '../views/Auto.vue'),
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export { router, routes };
