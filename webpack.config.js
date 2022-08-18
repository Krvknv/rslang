const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, './src/index'),
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist'),
        clean: true,
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'rs-lang',
            filename: 'index.html',
            template: 'src/index.html',
        }),
        new ESLintPlugin({ extensions: 'ts' }),
        new CleanWebpackPlugin(),
        new FaviconsWebpackPlugin('src/assets/png/favicon.png'),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets'),
                    to: path.resolve(__dirname, 'dist/assets'),
                },
            ],
        }),
    ],
    module: {
        rules: [
            { test: /\.ts$/i, use: 'ts-loader' },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                use: ['file-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            // {
            //     test: /\.ts?$/,
            //     loader: 'babel-loader',
            // },
            // {
            //     test: /\.js$/,
            //     use: ['source-map-loader'],
            //     enforce: 'pre',
            // },
        ],
    },
    resolve: {
        extensions: ['.js', '.ts', '.css'],
    },
};
