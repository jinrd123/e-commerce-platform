//引入封装好的axios--->requests
import requests from "./request";
//箭头函数，函数体发送就是用axios发送请求
export const reqCategoryList = () => requests({
    url:'/product/getBaseCategoryList',
    method:'get',
});