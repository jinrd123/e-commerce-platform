import { reqGetSearchInfo } from "@/api";
const state = { 
    searchList: {}, 
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    }
};
const actions = {
    async getSearchList({ commit }, params = {}) {
        let result = await reqGetSearchInfo(params);
        if (result.code === 200) {
            commit("GETSEARCHLIST", result.data);
        }
    }
};
const getters = {
    goodsList(state) {
        //searchList如果为空对象，goodList就是undefined，不能进行遍历，所以要保证goodsList至少是一个空数组
        return state.searchList.goodsList||[];
    },
    trademarkList(state) {
        return state.searchList.trademarkList;
    },
    attrsList(state) {
        return state.searchList.attrsList;
    }
};

export default {
    state,
    mutations,
    actions,
    getters,
}