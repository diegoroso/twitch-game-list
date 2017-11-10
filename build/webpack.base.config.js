const webpack = require('webpack')
, path = require('path')
, vueConf = require('./vue-loader')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const src = path.join(__dirname, '..', 'src')
const app = path.join(src, 'app')

module.exports = {
    devtool: 'source-map',

    entry: {
        app: path.join(src, 'main.js'),
        vendor: Object.keys(require('../package').dependencies)
    },

    output: {
        path: path.join(__dirname, '..', 'dist'),
        publicPath: '/',
        filename: '[name].js'
    },

    resolve: {
        modules: [path.resolve(__dirname, '..', 'node_modules')],
        alias: {
            _app: app,
            _src: src,
            _img: path.join(src, 'assets', 'images'),
            _npm: path.join(__dirname, '..', 'node_modules'),
            _scss: path.join(src, 'assets', 'scss'),
            _store: path.join(src, 'store'),
            _views: path.join(app, 'views'),
            _mixins: path.join(app, 'mixins'),
            _config: path.join(__dirname, '..', 'config'),
            _services: path.join(src, 'services'),
            _components: path.join(app, 'components')
        }
    },

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /.(vue|js)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueConf
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loaders: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(eot|otf|ttf|woff|woff2)(\?v=[a-z0-9=\.]+)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'template.html'
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            minChunks: Infinity
        })
    ]
}
