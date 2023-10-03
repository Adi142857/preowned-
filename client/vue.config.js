const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
module.exports = defineConfig({
  proxy: {
    '/api': {
      target: 'http://localhost:3000', // Use VUE_APP_URL here
      changeOrigin: true,
    },
  },
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    plugins: [
      new NodePolyfillPlugin()
    ]
  },
  
})
