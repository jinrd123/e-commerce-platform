//Vuerouter是Vue的一个插件，所以让Vue使用这个插件需要引入Vue和Vuerouter
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
//配置路由，需要各路由组件,所以引入所有路由组件
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';

//先把VueRouter原型对象的push方法的函数体保存一份
let originPush = VueRouter.prototype.push;

let originReplace = VueRouter.prototype.replace;

//重写push|replace
//参数结构与原来的push保持一致，第一个表示跳转的目标位置，后面俩为回调
VueRouter.prototype.push = function(location,resolve,reject) {
    if(resolve && reject) {
        originPush.call(this,location,resolve,reject);
    }else {
        originPush.call(this,location,()=>{},()=>{});
    }
}

VueRouter.prototype.replace = function(location,resolve,reject) {
    if(resolve && reject) {
        originReplace.call(this,location,resolve,reject);
    }else {
        originReplace.call(this,location,()=>{},()=>{});
    }
}

//配置路由
export default new VueRouter({
    routes: [
        {
            path:"/home",
            component: Home,
            meta:{
                show:true,
            }
        },
        {
            name:'search',
            path: "/search/:keyword?",
            component: Search,
            meta:{
                show:true,
            }
        },
        {
            path: "/login",
            component: Login,
            meta:{
                show:false,
            }
        },
        {
            path: "/register",
            component: Register,
            meta:{
                show:false,
            }
        },
        {
            path: "/",
            redirect: "/home",
        }
    ]
})
//路由配置完，相当于一个文件模块，我们需要去入口文件里给Vue实例使用
