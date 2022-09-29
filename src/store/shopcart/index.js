import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";
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
    },
    //修改购物车某一个产品的选中状态
    async updateCheckedById({commit}, {skuId, isChecked}) {
        let result = await reqUpdateCheckedById(skuId, isChecked);
        if(result.code == 200) {
            return 'ok';
        }else {
            return Promise.reject(new Error("fail"));
        }
    },
    //删除全部勾选的产品
    deleteAllCheckedCart({dispatch, getters}) {
        //context:小仓库  commit：提交给mutations  getters：计算属性  dispatch：派发actions  state：当前仓库数据
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            if(item.isChecked == 1) {
                let promise = dispatch('deleteCartListBySkuId', item.skuId);
                PromiseAll.push(promise);
                console.log("删除了一个")
            }
        });
        return Promise.all(PromiseAll);
    },
    //点击全选的函数（全选或者全不选）
    checkAll({dispatch, getters}, currentState) {
        let PromiseAll = [];
        //带给服务器的参数是0|1，而不是布尔值，需要转换
        let params = currentState ? '1' : '0';
        getters.cartList.cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckedById', {skuId:item.skuId, isChecked:params});
            PromiseAll.push(promise);
        })
        return Promise.all(PromiseAll);
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