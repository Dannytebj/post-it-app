var express = require('express');
app = express();
bodyParser = require('body-parser');

//CONFIGURE FIREBASE DATABASE
var admin = require('firebase-admin');
var serviceAccount = require('./serviceAccountKey.json');
  admin.initializeApp({
  credential:admin.credential.cert(serviceAccount),
  databaseURL:"https://postitapp-f266c.firebaseio.com/"
});
var db = admin.database();
var ref = db.ref("postit/db");
//Creating a Db users
var usersRef = ref.child("users");
usersRef.set({
  dannyb:{
    full_name:"Daniel Atebije",
    email:"dannyb@tebj.com",
    password:"abc123"
  },
  ifedapo:{
    full_name:"Ifedapo Naths",
    email:"ifenaths@myself.com",
    password:"abc123"
  }

});// end of DB

app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded)
app.use(bodyParser.json()); // for parsing application/json)
var port = process.env.PORT || 3000;


//ROUTES FOR API
var router = express.Router();

//Middleware to use for all requests
router.get('/', function (req, res) {
  res.json({message: 'Hooray! welcome to postIt Api' });
});

// Other routes go here

//Register Our ROUTES
// All of our routes will be prefixed with /Api
app.use('/server', router);
app.listen(port);
console.log('postIt App Restful Api server started on: '+ port);
