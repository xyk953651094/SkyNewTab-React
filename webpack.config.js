const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',  // production
    // devServer: {
    //     contentBase: path.resolve(__dirname, './src'),
    //     historyApiFallback: true
    // },
    entry: {
        mainpage: path.resolve(__dirname, "./src/index.tsx"),
    },
    output: {
        // filename: '[name].bundle.js',
        filename: '[name].js',
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
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'SkyNewTab',
            filename: 'mainpage.html',
            // template: 'src/devtools.html',  // ???
            // chunks: ['mainpage']
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

