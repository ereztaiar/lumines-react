const HtmlPlugin = require('html-webpack-plugin');

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
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ],
            }
        ],
    },

    resolve: {
        extensions: ['.js', '.jsx', '.json', '.css'],
    },

    plugins: [
        new HtmlPlugin({
            title: 'Lumines React',
            favicon: './src/assets/paths/favicon.svg',
        }),

    ],
    experiments: {
        asyncWebAssembly: true,
    }
};
