'use strict';

const config = require('./webpack.config.base');
const ExtJSReactorWebpackPlugin = require('@extjs/reactor-webpack-plugin');

module.exports = Object.assign(config, {
    plugins: [
        new ExtJSReactorWebpackPlugin(Object.assign({}, require('./extjs.config'), { 
            sdk: 'ext/ext',
            packageDirs: ['ext/packages']
        }))
    ].concat(config.plugins),

    devServer: {
        contentBase: "./build",
        noInfo: true,
        hot: true
    }
});
