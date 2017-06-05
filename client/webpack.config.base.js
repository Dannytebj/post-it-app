'use strict';

var path = require('path');

module.exports = {
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ },
      {
        test: /(\.webm|\.mp4|\.m4v|\.ogv)$/,
        loader: 'file-loader?name=video/[name].[hash:6].[ext]'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loaders:[
            'file-loader?hash=sha512&digest=hex&name=assets/images/[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  output: {
    path: __dirname + '/dist'
  },
  resolve: {
    alias: {
      assets: path.resolve('./src/assets'),
      components: path.resolve('./src/components'),
      utils: path.resolve('./src/utils'),
      hocs: path.resolve('./src/hocs')
    },
    extensions: ['', '.js']
  }
};
