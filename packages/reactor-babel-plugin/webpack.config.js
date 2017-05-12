const webpack = require('webpack');
const path = require('path');

const config = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'reactor-babel-plugin.js',
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
    }
}

module.exports = config;