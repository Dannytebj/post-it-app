import express from 'express';
import webpack from 'webpack';
import firebase from 'firebase';
import expressValidator from 'express-validator';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import path from 'path';
import bodyParser from 'body-parser';
import socketio from 'socket.io';
import Config from '../webpack.config';
import routes from './routes/index';
import socketConfig from './utils/socketConfig';
import config from './config/config';


/**
 * Node Server file for PostIt App
 * 
 */
const port = process.env.PORT || 9999;
const app = express();
const publicPath = express.static(path.join(__dirname, '../client/public'));
app.use('/', publicPath);

// for parsing application/x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: true }));
// for parsing application/json)
app.use(bodyParser.json());

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

app.use(expressValidator());

app.use(routes);

const compiler = webpack(Config);
app.use(webpackMiddleware(compiler, {
  publicPath: Config.output.publicPath,
}));

firebase.initializeApp(config);

const server = app.listen(port, () => {
  console.log(`postIt App Restful Api server started on: ${port}`);  // eslint-disable-line
});

const io = socketio(server);
io.on('connection', (socket) => {
  console.log('Connected'); // eslint-disable-line
  socket.on('disconnect', () => {
    console.log('Disconnected'); // eslint-disable-line
  });
});

socketConfig.socketInstance(io);

app.use(webpackHotMiddleware(compiler));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

module.exports = app;

