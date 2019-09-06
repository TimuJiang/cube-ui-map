module.exports = {
  publicPath: 'c3-page',
  devServer: {
    proxy: {
      '/capitalization': {
        target: 'http://dt.test.geely.com',
        changeOrigin: true
      }
    }
  },

  runtimeCompiler: true,
  productionSourceMap: false,

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  }
}
