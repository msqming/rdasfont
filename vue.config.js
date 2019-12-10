const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  outputDir: process.env.outputDir,
  lintOnSave: true,
  publicPath:  process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  assetsDir: 'dist',
  devServer: {
    // open: process.platform === 'darwin',
    // host: 'http://localhost:8080/',
    port: 8000,
    open: true, //配置自动启动浏览器
    proxy: {
      '/api': {
        // target: 'http://xcx.ap-edu.club/', //对应自己的接口
        // target: 'http://19.87.12.237:8000/', //对应自己的接口
        target: 'http://112.74.15.118:8000/', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}
