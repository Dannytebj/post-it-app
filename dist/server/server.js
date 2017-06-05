'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _route = require('./routes/route');

var _route2 = _interopRequireDefault(_route);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 9999,
    app = (0, _express2.default)();
// for parsing application/x-www-form-urlencoded)
app.use(_bodyParser2.default.urlencoded({ extended: true }));
// for parsing application/json)
app.use(_bodyParser2.default.json());

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

//  Welcome
app.get('/', function (req, res, next) {
  res.status(200);
  res.send('Hello');
  next();
});

//  Register Our ROUTES
// All of our routes will be prefixed with /server
app.use(_route2.default);
app.listen(port);
console.log('postIt App Restful Api server started on: ' + port);