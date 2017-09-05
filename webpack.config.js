const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    context: path.join(__dirname, './'),
  entry: [
    path.join(__dirname, 'client/src/index.js'),
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client'
  ],
    output: {

    path: path.join(__dirname, './'),
    publicPath: '/',
    filename: 'bundle.js',
  },
devServer: {
    contentBase: './client/src/index.js',
    inline: true,
    hot: true,
    port: 8081,
    historyApiFallback: true
  },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['react-hot-loader', 'babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                loaders: [
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
            template: './client/index.html', // Move the index.html file...
        })
  ]
}