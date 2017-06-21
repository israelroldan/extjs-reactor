const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtJSReactorWebpackPlugin = require('@extjs/reactor-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const sourcePath = path.join(__dirname, './src');
const port = 8087;

module.exports = function (env) {
    const nodeEnv = env && env.prod ? 'production' : 'development';
    const isProd = nodeEnv === 'production';
    const local = env && env.local;

    const plugins = [
        new ExtJSReactorWebpackPlugin({
            sdk: local ? 'ext' : undefined,
            packages: local ? ['reactor'] : undefined,
            production: isProd
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: nodeEnv
        }),
        new CopyWebpackPlugin([{
            from: path.join(__dirname, 'resources'), 
            to: 'resources'
        }])
    ];

    if (isProd) {
        plugins.push(
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    screw_ie8: true
                }
            })
        );
    } else {
        plugins.push(
            new webpack.HotModuleReplacementPlugin()
        );
    }

    plugins.push(new HtmlWebpackPlugin({
        template: 'index.html',
        hash: true
    }), new OpenBrowserPlugin({ 
        url: `http://localhost:${port}`
    }));

    return {
        
        devtool: isProd ? 'source-map' : 'cheap-module-source-map',
        context: sourcePath,

        entry: [
            './index.js'
        ],

        output: {
            path: path.join(__dirname, 'build'),
            filename: 'bundle.js'
        },

        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: [
                        'babel-loader'
                    ],
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader', 
                        'css-loader'
                    ]
                }
            ]
        },

        resolve: {
            // The following is only needed when running this boilerplate within the extjs-reactor repo with lerna bootstrap.  You can remove this from your own projects.
            alias: {
                "react-dom": path.resolve('./node_modules/react-dom'),
                "react": path.resolve('./node_modules/react')
            }
        },

        plugins,

        stats: {
            colors: {
                green: '\u001b[32m',
            }
        },

        devServer: {
            contentBase: './build',
            historyApiFallback: true,
            host: '0.0.0.0',
            disableHostCheck: true,
            port,
            compress: isProd,
            inline: !isProd,
            hot: !isProd,
            stats: {
                assets: true,
                children: false,
                chunks: false,
                hash: false,
                modules: false,
                publicPath: false,
                timings: true,
                version: false,
                warnings: true,
                colors: {
                    green: '\u001b[32m'
                }
            },
        }
    };
};