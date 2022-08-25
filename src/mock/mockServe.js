//先引入mockjs模块
import Mock from 'mockjs';
//把JSON数据格式引入进来[JSON数据格式根本没有对外暴露，但是可以引入]
//因为webpack默认对外暴露的文件类型：图片、JSON格式数据
import banner from './banner.json';
import floor from './floor.json';
import searchInfo from './searchInfo.json';

//mock数据:第一个参数请求地址   第二个参数：请求数据
Mock.mock("/mock/banner", { code: 200, data: banner });//模拟首页大的轮播图的数据
Mock.mock("/mock/floor", { code: 200, data: floor });
//自己备份一个search组件的数据
Mock.mock("/mock/list", { code: 200, data: searchInfo });