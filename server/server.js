const express = require('express'),
  bodyParser = require('body-parser'),
  routes = require('./routes/'),
  path = require('path'),
  firebase = require('firebase'),
  dotenv = require('dotenv'),
  // isAuthenticated = require('./middleware/authentication'),
  webpack = require('webpack'),
  webpackMiddleware = require('webpack-dev-middleware'),
  webpackHotMiddleware = require('webpack-hot-middleware'),
  dbConfig = require('./config/config'),
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
// Initialize firebase App
dotenv.config();
const config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId
};
firebase.initializeApp(config);

// ===========Authentication function=================== //
const isAuthenticated = () => new Promise((resolve) => {
  firebase.auth().onAuthStateChanged((currentUser) => {
    if (currentUser) {
      resolve(currentUser);
    }
    resolve({});
  });
});

app.use((req, res, next) => {
  // Aunthenticate Routes first
  isAuthenticated()
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

// app.get('/*', (req, res, next) => {
//   res.sendFile(path.join(__dirname, '../client/src/index.js'));
//   next();
// });
app.listen(port);
console.log(`postIt App Restful Api server started on: ${port}`);
module.exports = app;
