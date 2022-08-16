const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  //配置代理解决跨域问题
  devServer: {
    proxy: {
        //api代表如果前端发送的请求路径中如果有api，那么就把这个请求发送给target对应的服务器（相当于webpack提供的服务器对真正的服务器进行代理）
        '/api': {
            target:'http://gmall-h5-api.atguigu.cn'
        }
    }
}
})
