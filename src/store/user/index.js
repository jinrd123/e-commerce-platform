//登陆与注册的模块
import { reqGetCode, reqUserLogin, reqUserRegister, reqUserInfo, reqLogout } from "@/api";
const state = {
    code: '',
    token: localStorage.getItem('token'),
    userInfo: {},
};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    USERLOGIN(state, token) {
        state.token = token;
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    //清除vuex以及本地存储的登录数据
    CLEAR(state) {
        state.token = '';
        state.userInfo = {};
        localStorage.removeItem("TOKEN");
    }
};
const actions = {
    //获取验证码
    async getCode({commit}, phone) {
        //获取验证码这个接口会把验证码返回，但正常情况下后台会把验证码发送到用户手机上，这项工作本身与前端无关，为了省钱我们直接返回
        let result = await reqGetCode(phone);
        //其实如果正常情况下服务器把验证码发送到用户手机上的话，我们就不用commit了，我们commit的目的是拿到验证码数据然后自动帮用户填上
        if(result.code === 200) {
            commit('GETCODE', result.data);
            return 'ok';
        }else {
            return Promise.reject(new Error('验证码发送失败'));
        }
    },
    //用户注册
    async userRegister({commit}, user) {
        let result = await reqUserRegister(user);
        if(result.code == 200) {
            return 'ok';
        }else {
            return Promise.reject(new Error('fail'));
        }
    },
    //登录业务
    async userLogin({commit}, data) {
        let result = await reqUserLogin(data);
        if(result.code === 200) {
            commit('USERLOGIN', result.data.token);
            //本地存储token
            localStorage.setItem("TOKEN", result.data.token);
            return 'ok';
        }else {
            return Promise.reject(new Error('fail'));
        }
    },
    //登陆后获取用户信息
    async getUserInfo({commit}) {
        let result = await reqUserInfo();
        if(result.code == 200) {
            //提交用户信息
            commit('GETUSERINFO', result.data);
            return 'ok';
        }else {
            return Promise.reject(new Error('fail'));
        }
    },
    //退出登录
    async userLogout({commit}) {
        let result = await reqLogout();
        if(result.code == 200) {
            commit("CLEAR");
            return 'ok';
        }else {
            return Promise.reject(new Error("fail"));
        }
    }
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters,
}