const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const isProduction = process.argv[process.argv.indexOf('--mode') + 1] === 'production';

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: process.env.ASSET_PATH || './',
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.s?css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.svg$/i,
                type: 'asset/resource',
                use: 'svgo-loader',
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            title: 'Covid dashboard',
            favicon: path.resolve(__dirname, 'src', 'assets', 'favicon', 'favicon.svg'),
            publicPath: '',
            meta: {
                'theme-color': '#282C34',
            },
        }),
        new ESLintPlugin(),
    ],
    devtool: isProduction ? false : 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 9000,
        open: true,
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
};
