module.exports = {
  devServer: {
    proxy: {
      '/capitalization': {
        target: 'http://10.200.147.122:7109',
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
