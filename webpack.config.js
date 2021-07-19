const HtmlPlugin = require('html-webpack-plugin');
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
        after: function (app, server, compiler) {
            console.log('the server has started :)')
        },
    },
};
