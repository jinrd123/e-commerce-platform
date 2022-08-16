import Vue from 'vue'
import App from './App.vue'

import router from '@/router'

import axios from 'axios';

import TypeNav from '@/components/TypeNav';

import store from '@/store';
Vue.component(TypeNav.name,TypeNav);
Vue.prototype.$http = axios;
Vue.config.productionTip = false
// //测试请求是否发送成功
// import {reqCategoryList} from '@/api';
// reqCategoryList();
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
