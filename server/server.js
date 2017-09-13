import express from 'express';
import webpack from 'webpack';
import firebase from 'firebase';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import path from 'path';
import bodyParser from 'body-parser';
import Config from '../webpack.config';
import routes from './routes/index';
// import dotenv from 'dotenv';
import config from './config/config';


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

firebase.initializeApp(config);

app.use((req, res, next) => {
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
