const HtmlPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
                use: ['file-loader'],
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
        }),

    ],
    devServer: {
        hot: true,
        host: '0.0.0.0',
        port: 3030,
        disableHostCheck: true,
        after: function (app, server, compiler) {
            console.log('the server has started :)')
        },
    },
};
