//引入封装好的axios--->requests
import requests from "./request";

//引入请求mock数据的axios
import mockRequest from './mockRequest';

//箭头函数，函数体发送就是用axios发送请求
export const reqCategoryList = () => requests({
    url: '/product/getBaseCategoryList',
    method: 'get',
});

//请求mock轮播图数据的函数
export const reqGetBannerList = () => mockRequest.get('/banner');

//请求Floor组件数据的函数
export const reqGetFloorList = () => mockRequest.get('/floor');

//请求Search组件数据:调用axios方法发送请求(需要一个配置对象,去官网查看配置对象的属性)
//axios方法的配置对象的data项必须有，起码是个空对象，所以调用reqGetSearchInfo函数时，至少传入一个空对象
export const reqGetSearchInfo = (params) => requests({
    url: "/list",
    method: "post",
    data: params,
})
//自己备份一个mockRequest请求mock的search组件的数据
export const reqGetSearchInfo_mock = (params) => mockRequest({
    url: "/list",
    method: "post",
    data: params,
})
//获取商品详情信息
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' });

//将产品添加到购物车中（或者更新一个产品的个数）
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({url: `/cart/addToCart/${skuId}/${skuNum}`, method:"post"});

//获取购物车列表数据接口
export const reqCartList = () => requests({url:'/cart/cartList', method:'get'});

//删除购物车产品的接口
export const reqDeleteCartById = (skuId) => requests({url:`/cart/deleteCart/${skuId}`, method:'delete'});

//修改产品的选中状态
export const reqUpdateCheckedById = (skuId, isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`, method:'get'});

//注册获取验证码
export const reqGetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`, method:'get'});

//用户注册请求
export const reqUserRegister = (data) => requests({url:'/user/passport/register', data, method:'post'});

//用户登录请求
export const reqUserLogin = (data) => requests({url:'/user/passport/login', data, method:'post'});

//登录之后（请求不需要参数，token在请求头中携带）获取用户的信息
export const reqUserInfo = () => requests({url:'/user/passport/auth/getUserInfo', method:'get'});

//退出登录
export const reqLogout = () => requests({url:'/user/passport/logout', methode:'get'});

//获取用户地址信息
export const reqAddressInfo = () => requests({url:'/user/userAddress/auth/findUserAddressList', method:'get'});

//获取商品清单
export const reqOrderInfo = () => requests({url:'/order/auth/trade', method:'get'});