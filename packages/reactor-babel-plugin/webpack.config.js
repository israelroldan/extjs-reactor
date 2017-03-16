const webpack = require('webpack');

const config = {
    entry: './src/index.js',
    output: {
        path: './dist',
        filename: 'reactor-babel-plugin.min.js',
        library: 'ReactorBabelPlugin',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [{
            test: /(\.js)$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
}

module.exports = config;