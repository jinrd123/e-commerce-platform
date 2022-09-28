import { reqCartList, reqDeleteCartById } from "@/api";
const state = {
    cartList: [],
};
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;
    }
};
const actions = {
    async getCartList({commit}) {
        //获取购物车列表数据
        let result = await reqCartList();
        if(result.code == 200) {
            commit('GETCARTLIST', result.data);
        }
    },
    //删除购物车某一个产品
    async deleteCartListBySkuId({commit}, skuId) {
        let result = await reqDeleteCartById(skuId);
        if(result.code == 200) {
            return 'ok';
        }else {
            return Promise.reject(new Error('faile'));
        }
    }
};
const getters = {
    cartList(state) {
        return state.cartList[0] || {};
    }
};
export default {
    state,
    mutations,
    actions,
    getters,
}