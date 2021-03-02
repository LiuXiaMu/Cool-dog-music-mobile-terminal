const path = require('path'); // 引入path模块
function resolve(dir) {
  return path.resolve(__dirname, dir) //path.join(_dirname)设置绝对路径
}
module.exports = {
  devServer: {
    open: true, //是否自动弹出浏览器页面
    proxy: {
      '/api': {
        target: 'http://m.kugou.com/', //API服务器的地址
        secure: true, // 允许https请求
        changeOrigin: true, // 跨域访问设置，true代表跨域
        pathRewrite: { "^/api": "" }
      },
      "/geci": {
        target: "https://m3ws.kugou.com",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/geci": ""
        }
      }
    },
    overlay: {
      warnings: false,
      errors: false
    },
  },


  chainWebpack: (config) => {
    config.resolve.alias
      //第一个参数：别名 第二个参数：路径
      .set('@', resolve('src'))
      .set('components', resolve('src/components'))
      .set('assets', resolve('src/assets'))
      .set('views', resolve('src/views'))
      .set('network', resolve('src/network'))

  },


};


