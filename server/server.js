const express = require('express'),
  route = require('./routes/route'),
  bodyParser = require('body-parser'),
  port = process.env.PORT || 9999,
  _ = require('underscore'),
  app = express();

   allowCrossDomain = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  let origin = req.headers.origin;
  if (_.contains(app.get('allowed_origins'), origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
}

app.use(allowCrossDomain);


// for parsing application/x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: true }));
 // for parsing application/json)
app.use(bodyParser.json());


  //  Welcome
app.get('/', (req, res, next) => {
  res.status(200);
  res.send('Hello');
  next();
});

//  Register Our ROUTES
// All of our routes will be prefixed with /server
app.use(route);
app.listen(port);
console.log('postIt App Restful Api server started on: ' + port);
