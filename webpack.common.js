const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'client/src/index.js'),
  plugins: [
    new webpack.ProvidePlugin({
      jquery: "jquery",
    }),
  ],
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        include: [path.join(__dirname, 'client')],
        loaders: ['react-hot-loader', 'babel-loader'],
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
  },
};
