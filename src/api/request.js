//对于axios进行二次封装
import axios from "axios";
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
//在当前模块中引入store
import store from '@/store';

//1.利用axios对象的方法create创建一个axios实例，而且我们create一个axios实例的时候可以进行配置
const requests = axios.create({
    //给服务器地址增加上默认路径api
    baseURL:"/api",
    //请求超过5s就默认失败
    timeout:5000
})

//请求拦截器
requests.interceptors.request.use((config)=>{
    nprogress.start();
    //config:配置对象，对象里面有一个属性很重要：headers--请求头
    if(store.state.detail.uuid_token) {
        //给请求头添加一个字段（userTempId）
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    //携带token
    if(localStorage.getItem('TOKEN')) {
        config.headers.token = localStorage.getItem('TOKEN');
    }
    return config;
});

//响应拦截器
requests.interceptors.response.use((res)=>{
    nprogress.done();
    //成功的回调函数，接收服务器发来的响应数据
    return res.data;
},(error)=>{
    //失败的回调函数
    //终结promise链
    return Promise.reject(new Error('faile'));
});

//暴露出处理好的axios实例对象requests
export default requests;