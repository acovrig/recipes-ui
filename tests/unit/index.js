import { createLocalVue } from '@vue/test-utils';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
import { routes } from '@/router';
import store from '@/store';

global.localVue = createLocalVue();

global.localVue.use(VueAxios, axios);
global.localVue.use(VueRouter);

global.router = new VueRouter({ routes, mode: 'abstract' });
global.store = store;
