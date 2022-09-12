import { reqGoodsInfo } from "@/api";
const state = {
    goodInfo: {},
};
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    }
};
const actions = {
    //获取产品信息的action
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code === 200) {
            commit("GETGOODINFO", result.data);
        }
    }
};
const getters = {
    categoryView(state) {
        //goodInfo中并不一定存在（请求失败时）categoryView，所以或一个空对象
        return state.goodInfo.categoryView||{};
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo||{};
    }
};
export default {
    state,
    actions,
    mutations,
    getters,
}