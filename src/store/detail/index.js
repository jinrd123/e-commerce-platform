import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api";
import { getUUID } from "@/utils/uuid_token";
const state = {
    goodInfo: {},
    //游客临时身份
    uuid_token: getUUID()
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
    },
    async addOrUpdateShopCart({commit}, {skuId,skuNum}) {
        //加入购物车返回的结果
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        //加入购物车是我们前台带着参数通知服务器的操作，服务器返回的数据里也没有data项，所以我们自然也不用vuex3连环存储数据
        if(result.code == 200) {
            return "ok";
        } else {
            return Promise.reject(new Error("faile"))
        }
    }
};
const getters = {
    //Detail左上角路径导航信息的简化
    categoryView(state) {
        //goodInfo中并不一定存在（请求失败时）categoryView，所以或一个空对象
        return state.goodInfo.categoryView||{};
    },
    //产品信息的简化
    skuInfo(state) {
        return state.goodInfo.skuInfo||{};
    },
    //产品售卖属性的简化
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList||[];
    }
};
export default {
    state,
    actions,
    mutations,
    getters,
}