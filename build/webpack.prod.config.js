const webpack           = require('webpack')
    , path              = require('path')
    , base              = require('./webpack.base.config')
    , vueConfig         = require('./configs/vue-loader.config')
    , ExtractTextPlugin = require('extract-text-webpack-plugin')

base.module.rules = base.module.rules.map(m => {
    if (m.test == String(/\.scss$/)) {
        m.loader = ExtractTextPlugin.extract({
            use: 'css-loader!sass-loader',
            fallback: 'vue-style-loader'
        })
    }

    if (m.test == String(/\.css$/)) {
        m.loader = ExtractTextPlugin.extract({
            use: 'css-loader',
            fallback: 'vue-style-loader'
        })
    }

    return m
})

vueConfig.loaders = {
    css: ExtractTextPlugin.extract({
        use: 'css-loader',
        fallback: 'vue-style-loader'
    }),
    scss: ExtractTextPlugin.extract({
        use: 'css-loader!sass-loader',
        fallback: 'vue-style-loader'
    })
}

const config = Object.assign({}, base, {
    output: Object.assign({}, base.output, {
        filename: '[name].[hash].js'
    })
})

config.plugins.push(
    new ExtractTextPlugin({
        filename: '[name].[contenthash].css',
        allChunks: true,
        ignoreOrder: true
    }),
    new webpack.LoaderOptionsPlugin({
        minimize: true
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
)


module.exports = config

