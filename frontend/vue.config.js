const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: 8080,
    https: false,
    proxy: {//配置跨域
      '/api': {
        target: 'http://127.0.0.1:3005',//这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true,//允许跨域
        pathRewrite: {
          '/api': ''//请求的时候使用这个api就可以
        }
      }
    }
  },
})
