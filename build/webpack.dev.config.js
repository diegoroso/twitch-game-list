const webpack   = require('webpack')
    , base      = require('./webpack.base.config')

const config = Object.assign({}, base, {
    plugins: (base.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(
                process.env.NODE_ENV || 'development'
            ),
            'process.env.BROWSER': JSON.stringify(true)
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'client-vendor-bundle.js'
        })
    ])
})

module.exports = config
