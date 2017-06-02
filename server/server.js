const express = require('express'),
  route = require('./routes/route'),
  bodyParser = require('body-parser'),
  port = process.env.PORT || 9999,
  app = express();

// for parsing application/x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: true }));
 // for parsing application/json)
app.use(bodyParser.json());


  //  TESTING THIS BECAUSE OF HEROKU
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
