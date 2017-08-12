'use strict';

var webpack = require('webpack');
var baseConfig = require('./webpack.config.base');

var config = Object.create(baseConfig);
config.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  })
];

config.module.loaders.push({
    test: /\.scss$/,
    loaders: ['style', 'css', 'sass'],
    exclude: /node_modules/
});

config.target = 'web';
config.devtool = 'source-map';
config.output.filename = 'bundle.js';

module.exports = config;
