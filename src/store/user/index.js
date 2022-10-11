//登陆与注册的模块
import { reqGetCode, reqUserRegister } from "@/api";
const state = {
    code: '',
};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
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
    }
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters,
}