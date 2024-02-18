const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // mode: 'development',
    mode: 'production',
    // devServer: {
    //     contentBase: path.resolve(__dirname, './src'),
    //     historyApiFallback: true
    // },
    entry: {
        mainPage: path.resolve(__dirname, "./src/index.tsx"),
        popup: path.resolve(__dirname, "./src/popup.tsx"),
    },
    output: {
        filename: '[name].bundle.js',
        // filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader'],
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true  // 只进行语法转换，不进行类型校验，提高构建速度
                        }
                    }
                ],
                include: [
                    path.resolve(__dirname ,'src')
                ] ,
                exclude:  [
                    path.resolve(__dirname ,'node_modules')  // 排除 node_modules 目录
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.mp3$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'assets/focusSounds',
                        name: '[name].[ext]'
                    }
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '云开新标签页',
            filename: 'mainPage.html',
            template: 'public/index.html',
            chunks: ['mainPage'],
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new HtmlWebpackPlugin({
            title: '云开新标签页弹窗',
            filename: 'popup.html',
            template: 'public/popup.html',
            chunks: ['popup'],
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets'),
                    to: path.resolve(__dirname, 'dist/assets'),
                },
                {
                    from: path.resolve(__dirname, 'src/extensionFiles'),
                    to: path.resolve(__dirname, 'dist/'),
                },
            ]
        }),
        new CleanWebpackPlugin()
    ]
}

