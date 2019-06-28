const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const merge = require('webpack-merge')
const webpack = require('webpack')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const common = require('./webpack.base.js')
const config = require('../config')

const isProd = process.env.NODE_ENV === 'production'

const webpackConfig = merge(common, {
  entry: {
    app: './src/entry-client.js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },
      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true
    }
  },
  // https://webpack.js.org/plugins/split-chunks-plugin/
  plugins: [
    new webpack.DefinePlugin({
      'process.env': isProd ? config.build.env : config.dev.env
    }),
    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin(),
    new CleanWebpackPlugin(),
  ]
})

if (config.build.bundleAnalyzerReport) {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
