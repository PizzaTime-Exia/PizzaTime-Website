import Vue from 'vue';
import Pizza from './app/Pizza.vue';
import LoginHook from './app/LoginHook.vue';

import './index.css';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      components: {
        default: Pizza
      }
    },
    {
      path: '/login/:name/:token',
      components: {
        default: LoginHook
      }
    }
  ]
});

export default new Vue({
  el: '#root',
  router,
  render: h => h('router-view')
});
