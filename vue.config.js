module.exports = {
  transpileDependencies: ['vuetify'],
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    disableHostCheck: true
  }
}
