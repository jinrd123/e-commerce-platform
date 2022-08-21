import {reqCategoryList,reqGetBannerList} from '@/api';
const state = {
    //state中数据默认初始值别瞎写，服务器返回对象写对象，服务器返回数组写数组（根据接口返回值初始化）
    categoryList: [],
    //轮播图数据
    bannerList: [],
};
const mutations = {
    CATEGORYLIST(state,value) {
        state.categoryList = value;
    },
    GETBANNERLIST(state,value) {
        state.bannerList = value;
    }
};
const actions = {
    //通过API接口函数调用，向服务器发送请求获取数据
    async categoryList(context) {
        let result = await reqCategoryList();
        if(result.code === 200) {
            context.commit('CATEGORYLIST',result.data);
        }
    },
    //获取轮播图数据
    async getBannerList(context) {
        let result = await reqGetBannerList();
        if(result.code === 200) {
            context.commit('GETBANNERLIST',result.data);
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