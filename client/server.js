const express = require('express'),
    webpack = require('webpack'),
    path = require('path'),
    webpackConfig = require('../webpack.config.devserver'),
    WebpackDevServer = require('webpack-dev-server'),
    webpackMiddleWare = require('webpack-dev-middleware'),
    webpackHotMiddleWare = require('webpack-hot-middleware');

const port = process.env.PORT || 9999;
const app = express();


const compiler = webpack(webpackConfig);

app.use(webpackMiddleWare(compiler, {
  publicPath: webpackConfig.output.publicPath,
  historyApiFallBack: true,
  hot: true,
  stats: { colors: true }
}));

app.use(webpackHotMiddleWare(compiler, {
  log: console.log('hot is running')
}));

app.listen(port);
console.log(`postIt App Restful Api server started on: ${port}`);

app.use(express.static(__dirname + '/dist'));

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});
