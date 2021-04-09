const cssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    target: ['web', 'es3'],
    plugins: [new MiniCssExtractPlugin(), new TerserPlugin()],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
                type: 'asset/resource',
                loader: 'file-loader',
                options: {
                    runtimeChunk: 'single',
                    outputPath: 'images',
                    name: '[name].[ext]',
                },
            },
        ],
    },
    optimization: {
        minimizer: [new cssMinimizerPlugin(), new TerserPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        }),
        new HtmlWebpackPlugin({
            filename: '404.html',
            template: 'src/404.html'
        }),
        ],
    },
};