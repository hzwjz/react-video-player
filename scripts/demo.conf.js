/**
 * demo webpack config
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: path.resolve(__dirname, '../res'),
    assetsPublicPath: '/',
    devtool: 'cheap-module-eval-source-map',
    host: 'localhost',
    port: 8080, 
    autoOpenBrowser: true,
    errorOverlay: true,
    proxy: {
        '/api': 'http://localhost:8002/'
    },
    cssSourceMap: true,
    notifyOnErrors: true
};

let resolve = dir => path.join(__dirname, '../', dir);

module.exports = {
    mode: 'development',

    context: path.resolve(__dirname, '../'),

    entry: {
        index: ['@babel/polyfill', './examples/index'],
    },

    output: {
        // 不同mode不同
        path: config.assetsRoot,
        filename: '[name].js',
        publicPath: config.assetsPublicPath
    },

    // externals: {
        // 外部库暂无
    // },

    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@': resolve('src'),
        },
        modules: ['./src/', 'node_modules']
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: config.cssSourceMap
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: config.cssSourceMap
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: config.cssSourceMap
                        }
                    }
                ]
            },
            {
                test: /\.(html|htm)$/,
                loader: 'html-loader',
                options: {
                    attrs: ['data-src']
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000, // 超出则使用file-loader
                    name: '[name].[hash:7].[ext]',
                    outputPath: resolve('img')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[hash:7].[ext]',
                    outputPath: resolve('media')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[hash:7].[ext]',
                    outputPath: resolve('fonts')
                }
            }
        ]
    },

    // optimization:{
        
    // },
    
    devtool: config.devtool,

    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: {
            rewrites: [
                {from: /.*/, to: path.join(config.assetsPublicPath, 'index.html')},
            ],
        },

        hot: true,
        contentBase: [config.assetsRoot, config.assetsSubDirectory],
        publicPath: config.assetsPublicPath,
        compress: true,
        
        host: config.host,
        port: config.port,
        open: config.autoOpenBrowser,

        overlay: config.errorOverlay ? {warnings: false, errors: true} : false,
        // proxy: config.proxy,
        quiet: false,

        watchOptions: {
            ignored: [/node_modules/]
        }
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        
        new HtmlWebpackPlugin({
            title: 'index page',
            filename: 'index.html',
            template: './examples/index.html',
            chunks: ['index'],
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),

    ]
}