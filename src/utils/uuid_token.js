import { v4 as uuidv4 } from 'uuid';
export const getUUID = () => {
    //先从本地存储获取uuid（看一下本地存储是否有）
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    //如果没有，我们就生成一个游客临时id，并且本地存储
    if(!uuid_token) {
        uuid_token = uuidv4();
        localStorage.setItem('UUIDTOKEN',uuid_token);
    }
    return uuid_token;
}