const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  context: __dirname,
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, 'client/src/index.js'),
  ],
  target: 'web',
  output: {

    path: path.join(__dirname, './client/src/public/js'),
    publicPath: path.join(__dirname, '/client/src/public'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: `${__dirname}/server`,
  },
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
  externals: {
    jquery: 'jQuery',
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    // new HtmlWebpackPlugin({
    //   template: './server/index.html', // Move the index.html file...
    // }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
