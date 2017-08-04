const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
    entry: {
        main: "./src/index.js",
        other: "./src/other.js"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js',
        // publicPath: process.env.NODE_ENV === "production" ? "http://localhost" : "/"
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: "css-loader"
            })
            // use: ["style-loader","css-loader"]
        }, {
            test: /\.(png|gif|jpg|svg)$/,
            use: ["file-loader?name=img/[name].[ext]"]
        }, {
            test: /\.html/,
            use: ["html-loader"]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./index.html"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common', // Specify the common bundle's name.
            filename:"common/[name]-[hash].js"
        }),
        new ManifestPlugin(),
        new ExtractTextPlugin({
            filename: "css/[name].css"
        })
    ]
}
