import {reqCategoryList} from '@/api';
const state = {
    //state中数据默认初始值别瞎写，服务器返回对象写对象，服务器返回数组写数组（根据接口返回值初始化）
    categoryList: [],
};
const mutations = {
    CATEGORYLIST(state,value) {
        state.categoryList = value;
    }
};
const actions = {
    //通过API接口函数调用，向服务器发送请求获取数据
    async categoryList(context) {
        let result = await reqCategoryList();
        if(result.code === 200) {
            context.commit('CATEGORYLIST',result.data);
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