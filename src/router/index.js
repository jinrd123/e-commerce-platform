//Vuerouter是Vue的一个插件，所以让Vue使用这个插件需要引入Vue和Vuerouter
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
//配置路由，需要各路由组件,所以引入所有路由组件
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';

//先把VueRouter原型对象的push方法的函数体保存一份
let originPush = VueRouter.prototype.push;

let originReplace = VueRouter.prototype.replace;

//重写push|replace
//参数结构与原来的push保持一致，第一个表示跳转的目标位置，后面俩为回调
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}

//配置路由
let router = new VueRouter({
    routes: [
        {
            path: "/trade",
            component: Trade,
            meta: {
                show: true,
            },
        },
        {
            path: "/shopcart",
            component: ShopCart,
            meta: {
                show: true,
            },
        },
        {
            path: "/addcartsuccess",
            name: 'addcartsuccess',
            component: AddCartSuccess,
            meta: {
                show: true,
            },
        },
        {
            path: "/home",
            component: Home,
            meta: {
                show: true,
            },
        },
        {
            name: 'search',
            path: "/search/:keyword?",
            component: Search,
            meta: {
                show: true,
            }
        },
        {
            path: "/login",
            component: Login,
            meta: {
                show: false,
            }
        },
        {
            path: "/register",
            component: Register,
            meta: {
                show: false,
            }
        },
        {
            path: "/",
            redirect: "/home",
        },
        {
            path: "/detail/:skuid",
            component: Detail,
            meta: {
                show: true,
            },
        },
    ],
    //跳转到一个新路由时滚动条位置的设置：新路由页面中滚动条在最上面
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return { y: 0 };
    }
})
//路由配置完，相当于一个文件模块，我们需要去入口文件里给Vue实例使用

import store from '@/store';
//全局路由守卫：前置守卫（在路由转跳之前执行逻辑）
router.beforeEach(async (to, from, next) => {
    let token = localStorage.getItem("TOKEN");
    //根据userInfo的一个属性来判断目前是否有用户信息（userInfo保底为空对象，if判断恒为真）
    let name = store.state.user.userInfo.name;
    if(token) {//如果已经登录
        //去登陆页面就重定向到home页面
        if(to.path == '/login') {
            next('/home');
        }else {//登录状态下去的页面不是login，而是其它页面，这里需要处理的逻辑是：获取用户信息
            //有用户信息直接转跳；没用户信息先获取用户信息再转跳
            if(name) {
                next();
            }else {
                try{
                    await store.dispatch('getUserInfo');
                    next();
                } catch(error) {
                    //登录状态下，没有用户名，然后我们捞取用户名，捞取失败的可能情况：token过期了
                    //token失效了，获取不到用户信息：清除token，重新登录
                    await store.dispatch('userLogout');
                    next('/login');
                }
            }
        }
    }else {//如果没有登陆

        //未登录的相关逻辑还没有处理
        
        next();
    }
})

export default router;