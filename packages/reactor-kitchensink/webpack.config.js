const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtJSReactorWebpackPlugin = require('@extjs/reactor-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const sourcePath = path.join(__dirname, './src');

module.exports = function (env) {
    const nodeEnv = env && env.prod ? 'production' : 'development';
    const isProd = nodeEnv === 'production';
    const local = env && env.local;
    const disableTreeShaking = env && env.treeShaking === 'false';

    const plugins = [
        new ExtJSReactorWebpackPlugin({
            sdk: local ? 'ext' : undefined,
            packages: local ? [
                'font-ext', 
                'ux', 
                'd3',
                'pivot-d3',
                'font-awesome', 
                'exporter', 
                'pivot', 
                'calendar', 
                'charts'
            ] : undefined,
            theme: 'theme-kitchensink',
            overrides: [
                path.join('.', 'ext-react', 'overrides')
            ],
            production: isProd,
            treeShaking: !disableTreeShaking
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: nodeEnv
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor", 
            filename: "vendor.bundle.js",
            minChunks: function (module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf("node_modules") !== -1;
            }            
        }),
        new CopyWebpackPlugin([{
            from: path.join(__dirname, 'resources'), 
            to: 'resources'
        }]),
        new WebpackShellPlugin({
            dev: false,
            onBuildEnd: ['node extract-code.js']
        }),
        new webpack.NamedModulesPlugin()
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
        cache: true,
        hash: true
    }), new OpenBrowserPlugin({ 
        url: 'http://localhost:8084' 
    }));

    return {
        cache: true,
        devtool: isProd ? 'source-map' : 'cheap-module-source-map',
        context: sourcePath,

        entry: {
            vendor: ['react', 'prop-types', 'react-redux', 'react-dom', 'react-router-dom', 'history', 'redux', 'd3', 'highlightjs'],
            app: './index.js'
        },

        output: {
            path: path.join(__dirname, 'build'),
            filename: '[name].js'
        },

        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules|dist)/,
                    use: {
                        loader: 'babel-loader'
                    }
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
            port: 8084,
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