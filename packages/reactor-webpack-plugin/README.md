# Ext JS Reactor Webpack Plugin

This [Webpack](http://webpack.github.io/) plugin produces a minimized build of the [Sencha Ext JS](https://www.sencha.com/products/extjs) framework containing only those classes used by your React app.  Use with the react-extjs custom renderer for React.

## How it works
The plugin crawls your React source code looking for JSX tags that match Ext JS xtypes as well as calls to Ext.create() and Ext.require() to compile a list of classes used by your app.  It then uses [Sencha Cmd](https://www.sencha.com/products/extjs/cmd-download/) to produce an optimized build of Ext JS containing only those classes and corresponding CSS.  You include the built js and css
files into your index.html.

## Dependencies
You must have Ext JS 6.2+ and Sencha Cmd 6.2+ to use this plugin.

## Options
The ExtJSReactorWebpackPlugin constructor takes an object with the following properties:

* debug [boolean] True to output debug information.  Defaults to false.
* sdk [string] The path to the Ext JS SDK
* toolkit [string] "modern" or "classic".  Defaults to "modern".
* theme [string] The name of the theme package to use. Defaults to "theme-triton".
* packages [string[]] Packages to include.  Values correspond to the names of directories in the packages directory of your SDK.
* output [string] The path to the directory where the Ext JS minimized bundle should be written
* test [RegExp] All files matching this pattern will be searched for usage of Ext classes to include in the build.  Defaults to `/\.jsx?$/`

## Example

```javascript
'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtJSReactorWebpackPlugin = require('@extjs/reactor-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    entry: [
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'index.js'
    },
    plugins: [
        new ExtJSReactorWebpackPlugin({
            debug: true,
            toolkit: 'modern',
            sdk: 'ext',
            theme: 'theme-triton',
            packages: ['ux', 'calendar'],
            output: path.join('build', 'ext')
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                include: [
                    path.join(__dirname, 'src')
                ]
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                exclude: /\/favicon.ico$/,
                loader: 'file',
                query: {
                    name: 'static/media/[name].[hash:8].[ext]'
                }
            }
        ]
    }
};
```
