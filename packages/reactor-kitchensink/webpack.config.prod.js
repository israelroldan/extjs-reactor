'use strict';

const webpack = require('webpack');
const ExtJSReactorWebpackPlugin = require('@extjs/reactor-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.config.base');

module.exports = Object.assign(config, {
    devtool: 'cheap-module-source-map',
    plugins: [
        new ExtJSReactorWebpackPlugin(Object.assign({}, require('./extjs.config'), { production: true })),
        new CopyWebpackPlugin([{ from: 'resources', to: 'resources' }]),        
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                warnings: false,
                screw_ie8: false
            }
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            hash: true
        })    
    ]
});
