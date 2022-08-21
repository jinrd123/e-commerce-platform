//引入封装好的axios--->requests
import requests from "./request";

//引入请求mock数据的axios
import mockRequest from './mockRequest';

//箭头函数，函数体发送就是用axios发送请求
export const reqCategoryList = () => requests({
    url:'/product/getBaseCategoryList',
    method:'get',
});

//请求mock轮播图数据的函数
export const reqGetBannerList = () => mockRequest.get('/banner');