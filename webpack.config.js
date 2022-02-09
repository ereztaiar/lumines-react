const HtmlPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const boxen = require('boxen');

module.exports = {
    devtool: 'source-map',
    entry: {
        main: './src/index.js',
    },
    output: {
        publicPath: '/',
        globalObject: 'this',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                modules: false,
                            }
                        ],
                        '@babel/preset-react',
                    ],
                    plugins: [
                        '@babel/plugin-proposal-class-properties',
                        [
                            '@babel/transform-runtime',
                            {
                                regenerator: true,
                            },
                        ],
                    ],
                },
            },
            {
                test: /\.png|jpg|wav|svg$/,
                type: 'asset/resource'
                //loader: 'url-loader',
               // options: {
               //     limit:1,
               //     name: 'images/[contenthash]-[name].[ext]'
                //}
               // use: ['file-loader?name=[contenthash]/[name].[ext]'],
            },
            {
                test: /\.css|\.less$/i,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[name]_[local]_[hash:base64:5]'
                            }
                        }
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            }

        ],
    },

    resolve: {
        extensions: ['.js', '.jsx', '.json', '.css'],
        alias: {
            Assets: path.resolve(__dirname, "src", "assets"),
            Components: path.resolve(__dirname, "src", "components"),
            Hooks: path.resolve(__dirname, "src", "hooks"),
            Skins: path.resolve(__dirname, "src", "skins"),
            Styles: path.resolve(__dirname, "src", "styles"),
            Util: path.resolve(__dirname, "src", "util"),
        }
    },

    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlPlugin({
            title: 'Lumines React',
            favicon: './src/assets/paths/favicon.svg',
        })

    ],
    /*devServer: {
        https: true,
        cert: './webpack/lumines.cert',
        key: './webpack/lumines.key',
        hot: true,
        host: '0.0.0.0',
        port: 3030,
        disableHostCheck: true,
        useLocalIp: true,
        after: function (app, server, compiler) {
            server.middleware.waitUntilValid(() => {
                console.log(
                    boxen('Lumines is ready!', {
                        borderColor: 'magenta',
                        backgroundColor: '#fe6f15',
                        borderStyle: 'doubleSingle',
                        float: 'center',
                        align: 'center',
                        margin: 1,
                        padding: 1
                    })
                );
            })
        },

    },*/
};
