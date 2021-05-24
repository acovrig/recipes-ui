import Vue from 'vue';
import './registerServiceWorker';
import axios from 'axios';
import VueAxios from 'vue-axios';
import vueCookie from 'vue-cookie';
import status from 'http-status';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBook,
  faTag,
  faTrash,
  faEdit,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';
import {
  faCheckSquare,
  faSquare,
} from '@fortawesome/free-regular-svg-icons';
import { pick } from 'lodash';
import App from './App.vue';
import { router } from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.prototype.moment = moment;
Vue.prototype.$http = axios.create();
// Vue.prototype.$cookie = vueCookie.create();
Vue.config.productionTip = false;

library.add(faCheckSquare, faSquare, faBook, faTag, faTrash, faEdit, faExternalLinkAlt);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(VueAxios, axios);
Vue.use(vueCookie);

Vue.prototype.$http.interceptors.response.use((res) => {
  if (res.headers['access-token']) {
    const authHeaders = pick(res.headers, ['access-token', 'client', 'expiry', 'uuid', 'token-type']);
    store.commit('auth', authHeaders);

    let session = vueCookie.get('session');

    if (session) {
      session = JSON.parse(session);
      session.tokens = authHeaders;
      vueCookie.set('session', JSON.stringify(session), { expires: '14D' });
    }
  }

  return res;
}, (err) => {
  if (router.currentRoute.name !== 'Login' && err.response.status === status.UNAUTHORIZED) {
    store.commit('user', null);
    router.push({ name: 'Login' });
  }
  return Promise.reject(err);
});

Vue.prototype.$http.interceptors.request.use((config) => {
  const headers = store.getters.auth;
  const conf = config;

  conf.headers = headers;
  return conf;
});

new Vue({
  router,
  store,
  render: (h) => h(App),
  vuetify,

  mounted() {
    this.$store.dispatch('init');
  },
}).$mount('#app');
