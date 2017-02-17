'use strict';

const config = require('./webpack.config.base');
const ExtJSReactorWebpackPlugin = require('@extjs/reactor-webpack-plugin');

module.exports = Object.assign({}, config, {
    plugins: [
        new ExtJSReactorWebpackPlugin(require('./extjs.config'))
    ].concat(config.plugins),

    devServer: {
        contentBase: "./build",
        noInfo: true,
        hot: true
    }
});
