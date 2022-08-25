import {reqCategoryList,reqGetBannerList, reqGetFloorList} from '@/api';
const state = {
    //state中数据默认初始值别瞎写，服务器返回对象写对象，服务器返回数组写数组（根据接口返回值初始化）
    categoryList: [],
    //轮播图数据
    bannerList: [],
    //Floor组件数据
    floorList: [],
};
const mutations = {
    CATEGORYLIST(state,value) {
        state.categoryList = value;
    },
    GETBANNERLIST(state,value) {
        state.bannerList = value;
    },
    GETFLOORLIST(state,value) {
        state.floorList = value;
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
    },
    //获取floor组件数据
    async getFloorList({commit}) {
        let result = await reqGetFloorList();
        if(result.code === 200) {
            commit("GETFLOORLIST",result.data);
        }
    }
};
const getters = {
    categoryList(state) {
        return state.categoryList;
    }
};

export default {
    state,
    mutations,
    actions,
    getters,
}