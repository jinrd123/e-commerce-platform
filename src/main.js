import Vue from 'vue'
import App from './App.vue'

import router from '@/router'

import axios from 'axios';

import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel';
import store from '@/store';
//执行mock文件，创建虚拟接口
import "@/mock/mockServe.js";
//引入轮播图样式
import "swiper/css/swiper.css"
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.prototype.$http = axios;
Vue.config.productionTip = false
// //测试请求是否发送成功
// import {reqCategoryList} from '@/api';
// reqCategoryList();
new Vue({
  router,
  store,
  beforeMount() {
    Vue.prototype.$bus = this;
  },
  render: h => h(App),
}).$mount('#app')
