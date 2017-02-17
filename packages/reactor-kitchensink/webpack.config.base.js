'use strict';

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',

    entry: [
        './src/index'
    ],

    output: {
        path: path.join(__dirname, 'build'),
        filename: 'index.js'
    },

    resolve: {
        alias: {
            "react": path.resolve('./node_modules/react'),
            "react-dom": path.resolve('./node_modules/react-dom')
        }
    },

    plugins: [
        new CopyWebpackPlugin([{ from: 'resources', to: 'resources' }]),        
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            cache: true
        })
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    path.join(__dirname, 'src')
                ]
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                exclude: /\/favicon.ico$/,
                loader: 'file-loader',
                query: {
                    name: 'static/media/[name].[hash:8].[ext]'
                }
            }
        ]
    }
};
