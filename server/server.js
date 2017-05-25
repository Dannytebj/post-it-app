const express = require('express'),
  route = require('./routes/route'),
  bodyParser = require('body-parser'),
  port = process.env.PORT || 6969,
  // router = express.Router(),
  app = express();

// for parsing application/x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: true }));
 // for parsing application/json)
app.use(bodyParser.json());


  //  ROUTES FOR API
// routes = require('../routes/index.js'),


//  Register Our ROUTES
// All of our routes will be prefixed with /server
app.use(route);
app.listen(port);
console.log('postIt App Restful Api server started on: ' + port);
