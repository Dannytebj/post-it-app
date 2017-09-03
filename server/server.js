const express = require('express'),
  bodyParser = require('body-parser'),
  routes = require('./routes/'),
  path = require('path'),
  authentication = require('./middleware/authentication'),
  webpack = require('webpack'),
  webpackMiddleware = require('webpack-dev-middleware'),
  webpackHotMiddleware = require('webpack-hot-middleware'),
  Config = require('../webpack.config');

/**
 * Node Server file for PostIt App
 * 
 */
const port = process.env.PORT || 9999;
const app = express();
const compiler = webpack(Config);
app.use(webpackMiddleware(compiler, {
  publicPath: Config.output.publicPath,
  historyApiFallback: true,
  stats: { colors: true }
}));
// Add headers
app.use((req, res, next) => {
  // Aunthenticate Routes first
  authentication.authenticateUser()
    .then((currentUser) => {
      req.currentUser = currentUser;
      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', '*');
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers',
        'X-Requested-With,content-type');
      // Set to true if you need the website to include cookies 
      // in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, ' +
         'content-type, Authorization');
      next();
    });
});
app.use(webpackHotMiddleware(compiler));
const publicPath = express.static(path.join(__dirname, '../client/src/js'));
app.use('/', publicPath);
// for parsing application/x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: true }));
// for parsing application/json)
app.use(bodyParser.json());
app.use(routes);

app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../client/src/index.js'));
  next();
});
app.listen(port);
console.log(`postIt App Restful Api server started on: ${port}`);
module.exports = app;
