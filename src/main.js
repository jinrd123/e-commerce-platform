import Vue from 'vue'
import App from './App.vue'

import router from '@/router'

import axios from 'axios';

import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel';
import Pagination from '@/components/Pagination';
import store from '@/store';
//执行mock文件，创建虚拟接口
import "@/mock/mockServe.js";
//引入轮播图样式
import "swiper/css/swiper.css"
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name,Pagination);
Vue.prototype.$http = axios;
Vue.config.productionTip = false
//引入接口文件夹里面的全部请求函数
import * as API from '@/api';
new Vue({
  router,
  store,
  beforeMount() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  render: h => h(App),
}).$mount('#app')
